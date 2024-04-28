import { RuleObject } from 'ant-design-vue/lib/form/interface';

export async function phoneValidator(_: RuleObject, val: string) {
  if (val && (val.length != 11 || !/\d{11}/.test(val))) {
    return Promise.reject('请输入11位数字');
  }

  return Promise.resolve();
}
