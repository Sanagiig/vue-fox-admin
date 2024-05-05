import { BasicColumn, FormSchema } from '@/components/Table';
import { authType2CustomRender, status2CustomRender } from '@/utils/trans/data2render';
import { useDataDicStore } from '@/store/modules/data';

const { getByCode } = useDataDicStore();

export const columns: BasicColumn[] = [
  {
    title: '权限名称',
    dataIndex: 'authorityName',
    width: 200,
  },
  {
    title: '权限类型',
    dataIndex: 'authorityType',
    width: 100,
    customRender({ record }) {
      return authType2CustomRender(record.authorityType);
    },
  },
  {
    title: '权限值',
    dataIndex: 'authorityVal',
    width: 280,
  },

  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      return status2CustomRender(record.status);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'authorityName',
    label: '权限名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'authorityType',
    label: '权限类型',
    component: 'ApiSelect',
    componentProps: {
      labelField: 'name',
      valueField: 'code',
      api: async () => await getByCode('authorityType'),
    },
    colProps: { span: 8 },
  },
  {
    field: 'authorityVal',
    label: '权限值',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 'active' },
        { label: '禁用', value: 'disabled' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'authorityName',
    label: '权限名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'authorityType',
    label: '权限类型',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      labelField: 'name',
      valueField: 'code',
      api: async () => await getByCode('authorityType'),
    },
  },
  {
    field: 'authorityVal',
    label: '权限值',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 'active' },
        { label: '停用', value: 'disabled' },
      ],
    },
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
  },
];
