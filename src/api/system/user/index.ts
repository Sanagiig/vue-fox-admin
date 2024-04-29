import { http } from '@/utils/http/axios';
import { IUserInfo, LoginReq, LoginRes, RegisterReq } from '../model/userModel';

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

export function createUser(params: LoginReq) {
  return http.post<IUserInfo | void>(
    { url: Api.Create, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function deleteUserById(params: LoginReq) {
  return http.delete<void>(
    { url: Api.DeleteById, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}
export function deleteUserByIds(params: LoginReq) {
  return http.delete<void>(
    { url: Api.DeleteUsers, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function updateUser(params: LoginReq) {
  return http.get<IUserInfo | void>(
    { url: Api.UpdateUser, params },
    { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getUser(params: LoginReq) {
  return http.get<IUserInfo | void>(
    { url: Api.GetUser, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getUserById(params: LoginReq) {
  return http.get<IUserInfo | void>(
    { url: Api.GetUserById, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}

export function getUserPagination(params: IUserInfo & IPageInfo) {
  return http.get<PageResult<IUserInfo>>(
    { url: Api.GetUserPagination, params },
    { errorMessageMode: MsgMode.MESSAGE },
  );
}
