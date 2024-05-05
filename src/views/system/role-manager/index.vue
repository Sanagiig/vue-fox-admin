<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" danger @click="handleDeleteBatch">批量删除</a-button>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDrawer } from '@/components/Drawer';
  import RoleDrawer from './components/RoleDrawer.vue';
  import { deleteRoleById, deleteRoleByIds, getRolePagination } from '@/api/system/role';
  import { columns, searchFormSchema } from '../data/role.data';

  defineOptions({ name: 'RoleManagement' });

  const { createMessage, createConfirm } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, getSelectRowKeys, clearSelectedRowKeys, setLoading }] = useTable({
    title: '角色列表',
    api: getRolePagination,
    rowSelection: { type: 'checkbox' },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function reloadTable() {
    clearSelectedRowKeys();
    reload();
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      isUpdate: true,
      record,
    });
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await deleteRoleById(id);
      reload();
    } catch (e) {
      console.error('err:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteBatch() {
    const selKeys = getSelectRowKeys() as string[];
    if (!selKeys.length) {
      createMessage.warn('请选择要操作的数据');
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '删除数据后将无法恢复，请确认',
      onOk: async () => {
        try {
          await deleteRoleByIds(selKeys);
          reloadTable();
        } catch (e) {
          console.error(e);
        } finally {
          console.log('fi');
        }
      },
    });
  }

  function handleSuccess() {
    reloadTable();
  }
</script>
