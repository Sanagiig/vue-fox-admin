import { IBaseInfo } from '@/api/common/info';
import { IRoleInfo } from './roleModel';

export interface IUserInfo extends IBaseInfo {
  username: string;
  nickname: string;
  headerImg: string;
  baseColor: string;
  activeColor: string;
  roles: IRoleInfo[];
  phone: string;
  email: string;
  enable: number;
}

export type RegisterReq = Omit<IUserInfo, 'id' | 'createdAt' | 'updatedAt'>;

export type LoginReq = {
  username: string;
  password: string;
  captchaId: string;
  captchaCode: string;
};

/**
 * @description: Login interface return value
 */
export type LoginRes = {
  user: IUserInfo;
  token: string;
  expiresAt: string;
};
