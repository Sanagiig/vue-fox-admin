<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" danger @click="handleDeleteBatch">批量删除</a-button>
        <a-button type="primary" @click="handleCreate"> 新增数据字典 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                ifShow: !parentId,
                icon: 'icon-park-outline:add',
                onClick: handleEditSub.bind(null, record),
              },
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
    <DicDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDrawer } from '@/components/Drawer';
  import DicDrawer from './DicDrawer.vue';
  import {
    deleteDataDicById,
    deleteDataDicByIds,
    getDataDicPagination,
  } from '@/api/system/dataDic';
  import { DrawerTypeEnum, columns, searchFormSchema } from '../../data/dic.data';
  import { computed, watch } from 'vue';

  defineOptions({ name: 'DataDicManagement' });
  const props = defineProps<{ parentId?: string }>();
  const isUserForm = computed(() => !props.parentId);

  const { createMessage, createConfirm } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, getSelectRowKeys, clearSelectedRowKeys, setLoading }] = useTable({
    title: '数据字典列表',
    api: async (data) => {
      const params = Object.assign({}, data, { parentId: props.parentId });
      console.log('params', params);
      return await getDataDicPagination(params);
    },
    rowSelection: { type: 'checkbox' },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: isUserForm,
    showTableSetting: true,
    bordered: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  function reloadTable() {
    clearSelectedRowKeys();
    reload();
  }

  function handleCreate() {
    openDrawer(true, {
      type: DrawerTypeEnum.ADD,
      parentId: props.parentId,
    });
  }

  function handleEditSub(record: Recordable) {
    openDrawer(true, {
      type: DrawerTypeEnum.EDIT_SUB,
      record,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      type: DrawerTypeEnum.EDIT,
      record,
    });
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await deleteDataDicById(id);
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
          await deleteDataDicByIds(selKeys);
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

  watch(
    () => props.parentId,
    () => {
      reloadTable();
    },
  );
</script>
