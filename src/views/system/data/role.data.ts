import { BasicColumn, FormSchema } from '@/components/Table';
import { useDataDicStore } from '@/store/modules/data';
import { status2CustomRender } from '@/utils/trans/data2render';

const { getByCode } = useDataDicStore();
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '角色编码',
    dataIndex: 'code',
    width: 200,
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
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: '角色名称',
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
        { label: '停用', value: 'disabled' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: '角色编码',
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
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
  },
];
