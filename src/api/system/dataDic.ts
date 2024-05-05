import { http } from '@/utils/http/axios';
import type { IDataDicInfo } from './model/dataDicModel';

import { MsgMode } from '@/enums/httpEnum';
import { PageResult } from '@/api/common/result';
import { IPageInfo } from '@/api/common/params';

enum Api {
  Create = '/dataDic/createDataDic',
  DeleteById = '/dataDic/deleteDataDicById',
  DeleteDataDics = '/dataDic/deleteDataDicList',
  UpdateDataDic = '/dataDic/updateDataDic',
  GetDataDic = '/dataDic/getDataDic',
  GetDataDicById = '/dataDic/getDataDicById',
  GetDataDicListByParents = '/dataDic/getDataDicListByParentIds',
  GetDataDicPagination = '/dataDic/getDataDicPagination',
  GetDataDicListByCode = '/dataDic/getDataDicListByCode',
}

export function createDataDic(params: IDataDicInfo) {
  return http.post<IDataDicInfo | void>(
    { url: Api.Create, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteDataDicById(id: string) {
  return http.delete<void>(
    { url: Api.DeleteById, params: { id } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteDataDicByIds(ids: string[]) {
  return http.delete<void>(
    { url: Api.DeleteDataDics, params: { ids } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateDataDic(params: IDataDicInfo) {
  return http.patch<IDataDicInfo | void>(
    { url: Api.UpdateDataDic, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getDataDic(params: IDataDicInfo) {
  return http.get<IDataDicInfo | void>(
    { url: Api.GetDataDic, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getDataDicById(id: string) {
  return http.get<IDataDicInfo | void>(
    { url: Api.GetDataDicById, params: { id } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getDataDicListByParentIds(parentIds: string[]) {
  return http.get<IDataDicInfo | void>(
    { url: Api.GetDataDicListByParents, params: { parentIds } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getDataDicPagination(params: IDataDicInfo & IPageInfo) {
  return http.get<PageResult<IDataDicInfo>>(
    { url: Api.GetDataDicPagination, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getDataDicListByCode(code: string) {
  return http.get<IDataDicInfo[]>(
    { url: Api.GetDataDicListByCode, params: { code } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}
