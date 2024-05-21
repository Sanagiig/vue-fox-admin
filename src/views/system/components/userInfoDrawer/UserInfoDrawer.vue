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
  import { formSchema } from './data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  import { getSelf, getUserById } from '@/api/system/user';
  import { IUserInfo } from '@/api/system/model/userModel';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const id = ref('');
  const userDetail = ref<IUserInfo>({} as any);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetData();
    setDrawerProps({ confirmLoading: false });

    id.value = data.id || '';
    const user = await getUserInfo();
    userDetail.value = user! || {};
    setFieldsValue(user || {});
  });

  const getTitle = computed(() => {
    return '用户信息';
  });

  async function getUserInfo() {
    if (id.value) {
      return await getUserById(id.value);
    }

    return await getSelf();
  }

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

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    try {
      closeDrawer();
      emit('success');
    } catch (e) {
      console.error('err:', e);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
