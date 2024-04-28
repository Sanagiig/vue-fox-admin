import { IBaseInfo } from '@/api/common/info';

export interface IRoleInfo extends IBaseInfo {
  roleName: string;
  description: string;
}
