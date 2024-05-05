import { IBaseInfo } from '@/api/common/info';
import { StatusEnum } from '@/enums/baseEnum';

export interface IDataDicInfo extends IBaseInfo {
  parentId: string;
  name: string;
  code: string;
  status: StatusEnum;
  description: string;
  children?: IDataDicInfo[];
}
