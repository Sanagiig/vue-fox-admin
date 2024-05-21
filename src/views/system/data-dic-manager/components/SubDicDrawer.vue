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
  import { formSchema } from '../../data/dic.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { createDataDic, getDataDicById, updateDataDic } from '@/api/system/dataDic';
  import { IDataDicInfo } from '@/api/system/model/dataDicModel';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const dataDicDetail = ref<IDataDicInfo>({} as any);
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
      dataDicDetail.value = (await getDataDicById(data.record.id))! || {};
      setFieldsValue(dataDicDetail.value);
      updateFormConfig();
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增数据字典' : '编辑数据字典'));

  function resetData() {
    resetFields();
    updateFormConfig();
    dataDicDetail.value = {} as any;
  }

  async function createUserByData(userData: any) {
    const user = Object.assign({ parentId: dataDicDetail.value.parentId || '' }, userData);

    return await createDataDic(user);
  }

  async function updateUserByData(userData: any) {
    const user = Object.assign({}, dataDicDetail.value, userData);

    return await updateDataDic(user);
  }

  function updateFormConfig() {
    const dataDicnameField = Object.assign(
      {},
      formSchema.find((item) => item.field == 'dataDicCode'),
    );

    dataDicnameField.componentProps = Object.assign({}, dataDicnameField.componentProps, {
      disabled: !!dataDicDetail.value.code && unref(isUpdate),
    });
    updateSchema(dataDicnameField);
  }

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    try {
      await validate();
      const dataDic = getFieldsValue();
      if (!unref(isUpdate)) {
        await createUserByData(dataDic);
      } else {
        await updateUserByData(dataDic);
      }
      // TODO custom api
      console.log(dataDic);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
