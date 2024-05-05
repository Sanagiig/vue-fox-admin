import { http } from '@/utils/http/axios';
import { IAuthorityInfo } from './model/authorityModel';

import { MsgMode } from '@/enums/httpEnum';
import { PageResult } from '@/api/common/result';
import { IPageInfo } from '@/api/common/params';

enum Api {
  Create = '/authority/createAuthority',
  DeleteById = '/authority/deleteAuthorityById',
  DeleteAuthoritys = '/authority/deleteAuthorityList',
  UpdateAuthority = '/authority/updateAuthority',
  GetAuthority = '/authority/getAuthority',
  GetAuthorityById = '/authority/getAuthorityById',
  GetAuthorityPagination = '/authority/getAuthorityPagination',
  GetAuthorityChildren = '/authority/getAuthorityChildren',
  GetAuthorityTree = '/authority/getAuthorityTree',
}

export function createAuthority(params: IAuthorityInfo) {
  return http.post<IAuthorityInfo | void>(
    { url: Api.Create, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteAuthorityById(id: string) {
  return http.delete<void>(
    { url: Api.DeleteById, params: { id } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}
export function deleteAuthorityByIds(ids: string[]) {
  return http.delete<void>(
    { url: Api.DeleteAuthoritys, params: { ids } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateAuthority(params: IAuthorityInfo) {
  return http.patch<IAuthorityInfo | void>(
    { url: Api.UpdateAuthority, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getAuthority(params: IAuthorityInfo) {
  return http.get<IAuthorityInfo | void>(
    { url: Api.GetAuthority, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getAuthorityById(id: string) {
  return http.get<IAuthorityInfo | void>(
    { url: Api.GetAuthorityById, params: { id } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getAuthorityPagination(params: IAuthorityInfo & IPageInfo) {
  return http.get<PageResult<IAuthorityInfo>>(
    { url: Api.GetAuthorityPagination, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getAuthorityChildren(params: Partial<IAuthorityInfo>) {
  return http.get<PageResult<IAuthorityInfo[]>>(
    { url: Api.GetAuthorityChildren, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getAuthorityTree(params: Partial<IAuthorityInfo>) {
  return http.get<PageResult<IAuthorityInfo[]>>(
    { url: Api.GetAuthorityTree, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}
