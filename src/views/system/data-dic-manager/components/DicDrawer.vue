<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    :width="drawerWidth"
    @ok="handleSubmit"
  >
    <BasicForm
      v-if="[DrawerTypeEnum.ADD, DrawerTypeEnum.EDIT].includes(type)"
      @register="registerForm"
    />

    <DicTable v-if="[DrawerTypeEnum.EDIT_SUB].includes(type)" :parent="parent" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { DrawerTypeEnum, formSchema } from '../../data/dic.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import DicTable from './DicTable.vue';
  import { createDataDic, getDataDicById, updateDataDic } from '@/api/system/dataDic';
  import { IDataDicInfo } from '@/api/system/model/dataDicModel';

  const emit = defineEmits(['success', 'register']);
  const type = ref<DrawerTypeEnum>(DrawerTypeEnum.ADD);
  const parent = ref<any>({});
  const dataDicDetail = ref<IDataDicInfo>({} as any);
  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    type.value = data.type;
    parent.value = data.parent || {};
    resetData();
    setDrawerProps({ confirmLoading: false });

    await getDetail(data.record?.id);
  });

  const getTitle = computed(() => {
    switch (type.value) {
      case DrawerTypeEnum.ADD:
        return '新增数据字典';
      case DrawerTypeEnum.EDIT:
        return '编辑数据字典';
      case DrawerTypeEnum.EDIT_SUB:
        return '编辑子数据字典';
      default:
        return '默认';
    }
  });

  const drawerWidth = computed(() => {
    const width = [DrawerTypeEnum.EDIT_SUB].includes(type.value) ? '80%' : '500px';
    return width;
  });

  function resetData() {
    resetFields();
    updateFormConfig();
    dataDicDetail.value = {} as any;
  }

  async function getDetail(id: string) {
    switch (type.value) {
      case DrawerTypeEnum.EDIT:
        dataDicDetail.value = (await getDataDicById(id))! || {};
        setFieldsValue(dataDicDetail.value);
        break;
      default:
        dataDicDetail.value = { id } as any;
    }
  }

  async function createUserByData(userData: any) {
    const user = Object.assign({ parentId: parent.value.id || '' }, userData);
    return await createDataDic(user);
  }

  async function updateUserByData(userData: any) {
    const user = Object.assign({}, dataDicDetail.value, userData);
    return await updateDataDic(user);
  }

  function updateFormConfig() {
    if (![DrawerTypeEnum.ADD, DrawerTypeEnum.EDIT].includes(type.value)) return;

    const dataDicnameField = Object.assign(
      {},
      formSchema.find((item) => item.field == 'code'),
    );

    updateSchema(dataDicnameField);
  }

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    try {
      await validate();
      const dataDic = getFieldsValue();
      if (type.value == DrawerTypeEnum.ADD) {
        await createUserByData(dataDic);
      } else {
        await updateUserByData(dataDic);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
