import { http } from '@/utils/http/axios';
import { IUserInfo, LoginReq, LoginRes, RegisterReq, UpdateUserRolesReq } from './model/userModel';

import { MsgMode } from '@/enums/httpEnum';
import { PageResult } from '@/api/common/result';
import { IPageInfo } from '@/api/common/params';

enum Api {
  Register = '/user/register',
  Create = '/user/createUser',
  Login = '/user/login',
  DeleteById = '/user/deleteUserById',
  DeleteUsers = '/user/deleteUserList',
  UpdateUser = '/user/updateUser',
  UpdateUserRoles = '/user/updateUserRoles',
  GetSelf = '/user/getSelf',
  GetUser = '/user/getUser',
  GetUserById = '/user/getUserById',
  GetUserPagination = '/user/getUserPagination',
}

export function registerApi(params: RegisterReq) {
  return http.post<unknown>(
    { url: Api.Register, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function login(params: LoginReq) {
  return http.post<LoginRes>(
    { url: Api.Login, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function createUser(params: IUserInfo & { password: string }) {
  return http.post<IUserInfo | void>(
    { url: Api.Create, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteUserById(id: string) {
  return http.delete<void>(
    { url: Api.DeleteById, params: { id } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}
export function deleteUserByIds(ids: string[]) {
  return http.delete<void>(
    { url: Api.DeleteUsers, params: { ids } },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateUser(params: IUserInfo) {
  return http.patch<IUserInfo | void>(
    { url: Api.UpdateUser, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateUserRoles(params: UpdateUserRolesReq) {
  return http.patch<void>(
    { url: Api.UpdateUserRoles, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getSelf() {
  return http.get<IUserInfo | void>({ url: Api.GetSelf }, { errorMessageMode: MsgMode.MESSAGE });
}

export function getUser(params: IUserInfo) {
  return http.get<IUserInfo | void>(
    { url: Api.GetUser, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getUserById(id: string) {
  return http.get<IUserInfo | void>(
    { url: Api.GetUserById, params: { id } },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getUserPagination(params: IUserInfo & IPageInfo) {
  return http.get<PageResult<IUserInfo>>(
    { url: Api.GetUserPagination, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}
