import { BasicColumn, FormSchema } from '@/components/Table';
import { status2CustomRender } from '@/utils/trans/data2render';
import { useDataDicStore } from '@/store/modules/data';

const { getByCode } = useDataDicStore();

export enum DrawerTypeEnum {
  ADD = 'add',
  EDIT = 'edit',
  EDIT_SUB = 'editSub',
}

export const columns: BasicColumn[] = [
  {
    title: '父级名称',
    dataIndex: 'parentName',
    width: 200,
    customRender({ value }) {
      return `${value || '-'}`;
    },
  },
  {
    title: '字典名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '字典编码',
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
    field: 'name',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'code',
    label: '字典值',
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
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'parentName',
    label: '父级名称',
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'name',
    label: '字典名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: '字典编码',
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
