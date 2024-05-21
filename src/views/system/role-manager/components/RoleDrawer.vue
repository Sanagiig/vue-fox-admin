<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from '../../data/role.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { createRole, getRoleById, updateRole } from '@/api/system/role';
  import { IRoleInfo } from '@/api/system/model/roleModel';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const roleDetail = ref<IRoleInfo>({} as any);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    isUpdate.value = !!data?.isUpdate;

    resetData();
    setDrawerProps({ confirmLoading: false });

    if (unref(isUpdate)) {
      roleDetail.value = (await getRoleById(data.record.id))! || {};
      setFieldsValue(roleDetail.value);
      updateFormConfig();
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

  function resetData() {
    resetFields();
    updateFormConfig();
    roleDetail.value = {} as any;
  }

  async function createUserByData(userData: any) {
    const user = Object.assign({ id: roleDetail.value.id }, userData);

    return await createRole(user);
  }

  async function updateUserByData(userData: any) {
    const user = Object.assign({}, roleDetail.value, userData, {
      createdAt: undefined,
      updatedAt: undefined,
    });

    return await updateRole(user);
  }

  function updateFormConfig() {
    const rolenameField = Object.assign(
      {},
      formSchema.find((item) => item.field == 'code'),
    );

    rolenameField.componentProps = Object.assign({}, rolenameField.componentProps, {
      disabled: !!roleDetail.value.code && unref(isUpdate),
    });
    updateSchema(rolenameField);
  }

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    try {
      await validate();
      const role = getFieldsValue();
      console.log('role', role);
      if (!unref(isUpdate)) {
        await createUserByData(role);
      } else {
        await updateUserByData(role);
      }
      // TODO custom api
      console.log(role);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
