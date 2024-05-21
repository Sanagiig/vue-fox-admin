import { FormSchema } from '@/components/Form';
import { useDataDicStore } from '@/store/modules/data';

const { getByCode } = useDataDicStore();

export const formSchema: FormSchema[] = [
  {
    field: 'headerImg',
    label: '头像',
    required: true,
    component: 'Input',
  },
  {
    field: 'nickname',
    label: '昵称',
    required: true,
    component: 'Input',
  },
  {
    field: 'username',
    label: '用户名',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'phone',
    label: '手机号',
    required: true,
    component: 'Input',
  },
  {
    field: 'email',
    label: '电子邮箱',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'ApiSelect',
    componentProps: {
      labelField: 'name',
      valueField: 'code',
      api: async () => await getByCode('status'),
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
];
