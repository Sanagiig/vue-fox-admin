<template>
  <div>
    <BasicTable @register="registerTable" @selection-change="updateRoleList">
      <template #headerTop>
        <div class="roles-block">
          <div>当前角色：</div>
          <Tag
            class="flex"
            v-for="(item, idx) in roleList"
            :color="getTagColor(item)"
            :key="item.id"
          >
            {{ item.name }}
            <Icon
              class="close-icon"
              icon="material-symbols:close"
              @click="handleTagClose(item, idx)"
            />
          </Tag>
        </div>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { getRolePagination, getRolesByUserId } from '@/api/system/role';
  import { columns, searchFormSchema } from '../../data/role.data';
  import { IRoleInfo } from '../../../../api/system/model/roleModel';
  import Icon from '@/components/Icon/Icon.vue';

  defineOptions({ name: 'RoleManagement' });

  const props = defineProps<{ userId: string }>();
  const otherTableParams = ref<any>({});
  const roleList = ref<IRoleInfo[]>([]);
  const [
    registerTable,
    { reload, getDataSource, getSelectRows, setSelectedRowKeys, clearSelectedRowKeys, setLoading },
  ] = useTable({
    title: '角色列表',
    api: async (params: any) => {
      return await getRolePagination({ ...params, ...otherTableParams.value });
    },
    rowSelection: { type: 'checkbox' },
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    immediate: false,
    bordered: true,
  });

  function getTagColor(tag: IRoleInfo) {
    switch (tag.code) {
      case 'admin':
        return 'purple';
      default:
        return 'orange';
    }
  }

  async function getUserRoleList() {
    try {
      setLoading(true);
      roleList.value = (await getRolesByUserId(props.userId)) || ([] as any);
      updateTableSelect();
    } catch (e) {
      console.error('err:', e);
    } finally {
      setLoading(false);
    }
  }

  function updateTableSelect() {
    const ids = roleList.value.map((r) => r.id);
    setSelectedRowKeys(ids);
  }

  function updateRoleList() {
    const selRoles = getSelectRows();
    const newRoles = [...roleList.value];
    const tableRoles: IRoleInfo[] = getDataSource();

    tableRoles.forEach((r) => {
      const sel: any = selRoles.find((item) => item.id == r.id);
      const roleIdx = newRoles.findIndex((item) => item.id == r.id);

      if (roleIdx == -1 && sel) {
        newRoles.push(sel);
      }

      if (roleIdx != -1 && !sel) {
        newRoles.splice(roleIdx, 1);
      }
    });

    roleList.value = newRoles;
  }

  function reloadTable() {
    clearSelectedRowKeys();
    reload();
  }

  function handleTagClose(tag: IRoleInfo, idx: number) {
    roleList.value.splice(idx, 1);
    updateTableSelect();
  }

  watch(
    () => props.userId,
    () => {
      if (props.userId) {
        otherTableParams.value = { userId: props.userId };
        getUserRoleList();
        reloadTable();
        updateTableSelect();
      }
    },
  );
</script>
<style lang="scss" scoped>
  .close-icon {
    cursor: pointer;
  }

  .roles-block {
    display: flex;
    padding: 20px 10px;
    border-radius: 10px;
    background: #d8e0ed;
  }
</style>
