import { http } from '@/utils/http/axios';
import { IRoleInfo } from './model/roleModel';

import { MsgMode } from '@/enums/httpEnum';
import { PageResult } from '@/api/common/result';
import { IPageInfo } from '@/api/common/params';

enum Api {
  Create = '/role/createRole',
  DeleteById = '/role/deleteRoleById',
  DeleteRoles = '/role/deleteRoleList',
  UpdateRole = '/role/updateRole',
  GetRole = '/role/getRole',
  GetRoleById = '/role/getRoleById',
  GetRolesByUserId = '/role/getRolesByUserId',
  GetRolePagination = '/role/getRolePagination',
}

export function createRole(params: IRoleInfo) {
  return http.post<IRoleInfo | void>(
    { url: Api.Create, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteRoleById(id: string) {
  return http.delete<void>(
    { url: Api.DeleteById, params: { id } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}
export function deleteRoleByIds(ids: string[]) {
  return http.delete<void>(
    { url: Api.DeleteRoles, params: { ids } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateRole(params: IRoleInfo) {
  return http.patch<IRoleInfo | void>(
    { url: Api.UpdateRole, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getRole(params: IRoleInfo) {
  return http.get<IRoleInfo | void>(
    { url: Api.GetRole, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getRoleById(id: string) {
  return http.get<IRoleInfo | void>(
    { url: Api.GetRoleById, params: { id } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getRolesByUserId(id: string) {
  return http.get<IRoleInfo[] | void>(
    { url: Api.GetRolesByUserId, params: { id } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getRolePagination(params: IRoleInfo & IPageInfo) {
  return http.get<PageResult<IRoleInfo>>(
    { url: Api.GetRolePagination, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}
