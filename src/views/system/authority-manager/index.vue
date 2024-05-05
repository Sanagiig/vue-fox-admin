<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" danger @click="handleDeleteBatch">批量删除</a-button>
        <a-button type="primary" @click="handleCreate"> 新增权限 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'icon-park-outline:add',
                onClick: handleAddSub.bind(null, record),
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

    <AuthorityDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDrawer } from '@/components/Drawer';
  import AuthorityDrawer from './components/AuthorityDrawer.vue';
  import {
    deleteAuthorityById,
    deleteAuthorityByIds,
    getAuthorityChildren,
    getAuthorityPagination,
  } from '@/api/system/authority';
  import { columns, searchFormSchema } from '../data/authority.data';
  import { IAuthorityInfo } from '@/api/system/model/authorityModel';

  type Record = IAuthorityInfo & { hasExpanded?: boolean };
  defineOptions({ name: 'AuthorityManagement' });
  const cbStack: Function[] = [];
  const { createMessage, createConfirm } = useMessage();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [
    registerTable,
    { reload, getSelectRowKeys, clearSelectedRowKeys, collapseAll, expandRows, setLoading },
  ] = useTable({
    title: '权限列表',
    api: async (params) => {
      const data = await getAuthorityPagination(params);
      disposeCbStack();
      return data;
    },
    rowSelection: { type: 'checkbox' },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    onExpand: handleExpand,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    isTreeTable: true,
    rowKey: 'id',
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  function reloadTable() {
    cbStack.length = 0;
    clearSelectedRowKeys();
    reload();
  }

  async function handleExpand(isExpand: boolean, record: any) {
    // if (!isExpand || record.hasExpanded) return;
    // if (typeof record === 'string') {
    //   const id = record;
    //   record = findTableDataRecord(id);
    // }
    // const data: any = (await getAuthorityChildren({ parentId: record.id })) as any;
    // console.log('record', record);
    // record.children = data;
    // record.hasExpanded = true;
  }

  function disposeCbStack() {
    if (!cbStack.length) return;
    setTimeout(() => {
      cbStack.forEach((fn) => {
        fn();
      });
      cbStack.length = 0;
    }, 100);
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

  function handleAddSub(record: Recordable) {
    openDrawer(true, {
      parentId: record.id,
      record,
    });
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await deleteAuthorityById(id);
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
        setLoading(true);
        try {
          await deleteAuthorityByIds(selKeys);
          reloadTable();
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
    });
  }

  function handleSuccess(parentId?: string) {
    reloadTable();
    if (parentId) {
      cbStack.push(() => {
        expandRows([parentId]);
        handleExpand(true, parentId);
      });
    }
  }
</script>
