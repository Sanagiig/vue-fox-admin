import type { Rule } from 'ant-design-vue/lib/form/interface';

export function requireWithMsg(message: string, validator?: Rule['validator']): Rule[] {
  const res: Rule[] = [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];

  if (validator) {
    res.push({ trigger: 'change', validator });
  }

  return res;
}
