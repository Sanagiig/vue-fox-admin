import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '@/api/demo/system';
import { useMessage } from '@/hooks/web/useMessage';

type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: '_index',
    width: 50,
    customRender({ index }) {
      return `${index + 1}`;
    },
  },
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
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: '停用',
        unCheckedChildren: '启用',
        loading: record.pendingStatus,
        onChange(checked: CheckedType) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
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
    field: 'enable',
    label: '状态',
    component: 'Select',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 8 },
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
    field: 'enable',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'InputTextArea',
  },
];
