import { IBaseInfo } from '@/api/common/info';

export interface IAuthorityInfo extends IBaseInfo {
  parentId: string;
  authorityName: string;
  authorityType: string;
  authorityVal: string;
  description: string;
  children?: IAuthorityInfo[];
}
