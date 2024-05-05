import { BasicColumn, FormSchema } from '@/components/Table';
import { status2CustomRender } from '@/utils/trans/data2render';
import { useDataDicStore } from '@/store/modules/data';

export enum DrawerTypeEnum {
  ADD = 'add',
  EDIT = 'edit',
  UPDATE_ROLE = 'updateRole',
}

const { getByCode } = useDataDicStore();
export const columns: BasicColumn[] = [
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 180,
  },
  {
    title: '账号',
    dataIndex: 'username',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return status2CustomRender(record.status);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: '电子邮箱',
    component: 'Input',
    colProps: { span: 8 },
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
];

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
