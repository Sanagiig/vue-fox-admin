import { IBaseInfo } from '@/api/common/info';

export interface IAuthorityInfo extends IBaseInfo {
  authorityName: string;
  authorityType: string;
  authorityVal: string;
  description: string;
}
