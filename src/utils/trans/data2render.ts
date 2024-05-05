import { AuthTypeEnum, StatusEnum } from '@/enums/baseEnum';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';

export function status2CustomRender(status: StatusEnum) {
  let color = 'gray';
  let text = '默认';

  switch (status) {
    case StatusEnum.ACTIVE:
      color = 'green';
      text = '启用';
      break;
    case StatusEnum.DISABLED:
      color = 'red';
      text = '禁用';
      break;
  }

  return h(Tag, { color }, () => text);
}

export function authType2CustomRender(authType: AuthTypeEnum) {
  let color = 'gray';
  let text = '默认';
  switch (authType) {
    case AuthTypeEnum.MENU:
      color = 'green';
      text = '菜单';
      break;
    case AuthTypeEnum.AUTH_CODE:
      color = 'blue';
      text = '权限码';
      break;
  }

  return h(Tag, { color }, () => text);
}
