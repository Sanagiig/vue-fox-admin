import { IBaseInfo } from '@/api/common/info';
import { StatusEnum } from '@/enums/baseEnum';

export interface IRoleInfo extends IBaseInfo {
  name: string;
  code: string;
  status: StatusEnum;
  description: string;
}
