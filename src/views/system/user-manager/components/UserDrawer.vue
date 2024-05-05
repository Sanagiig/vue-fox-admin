<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    :width="drawerWidth"
    @ok="handleSubmit"
  >
    <BasicForm v-show="isFormDrawer" @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
    <UserRoleEditTable :userId="userDetail.id" v-show="isTableDrawer" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema, DrawerTypeEnum } from '../../data/user.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTree, TreeItem } from '@/components/Tree';

  import { createUser, getUserById, updateUser } from '@/api/system/user';
  import { IUserInfo } from '@/api/system/model/userModel';
  import UserRoleEditTable from '@/views/system/components/userRoleEditTable/index.vue';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const type = ref<DrawerTypeEnum>(DrawerTypeEnum.ADD);
  const treeData = ref<TreeItem[]>([]);
  const userDetail = ref<IUserInfo>({} as any);

  const isFormDrawer = computed(() => {
    return [DrawerTypeEnum.ADD, DrawerTypeEnum.EDIT].includes(type.value);
  });
  const isTableDrawer = computed(() => {
    return [DrawerTypeEnum.UPDATE_ROLE].includes(type.value);
  });
  const drawerWidth = computed(() => {
    return isFormDrawer.value ? '500px' : '80%';
  });

  const isRemoteDetail = computed(() =>
    [DrawerTypeEnum.ADD, DrawerTypeEnum.UPDATE_ROLE].includes(type.value),
  );

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    type.value = data.type;
    resetData();
    setDrawerProps({ confirmLoading: false });

    if (isRemoteDetail.value) {
      const user = await getUserById(data.record.id);
      userDetail.value = user! || {};
      setFieldsValue(user || {});
    }
  });

  const getTitle = computed(() => {
    switch (type.value) {
      case DrawerTypeEnum.ADD:
        return '新增用户';
      case DrawerTypeEnum.EDIT:
        return '编辑用户';
      case DrawerTypeEnum.UPDATE_ROLE:
        return '角色编辑';
      default:
        return '编辑';
    }
  });

  function resetData() {
    resetFields();
    updateFormConfig();
    userDetail.value = {} as any;
  }

  function updateFormConfig() {
    const usernameField = Object.assign(
      {},
      formSchema.find((item) => item.field == 'username'),
    );

    usernameField.componentProps.disabled = unref(isUpdate);
    updateSchema(usernameField);
  }

  async function createUserByData() {
    const userData: any = await validate();
    // 默认密码
    const user = Object.assign({}, userDetail.value, userData);

    return await createUser(user);
  }

  async function updateUserByData() {
    const userData: any = await validate();
    const user = Object.assign({}, userDetail.value, userData);

    return await updateUser(user);
  }

  async function updateUserRole() {}

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    try {
      switch (type.value) {
        case DrawerTypeEnum.ADD:
          await createUserByData();
          break;
        case DrawerTypeEnum.EDIT:
          await updateUserByData();
          break;
        case DrawerTypeEnum.UPDATE_ROLE:
          await updateUserRole();
          break;
      }
      closeDrawer();
      emit('success');
    } catch (e) {
      console.error('err:', e);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
