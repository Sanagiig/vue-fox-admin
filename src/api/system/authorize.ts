import { MsgMode } from '@/enums/httpEnum';
import { http } from '@/utils/http/axios';
import { UpdateRoleAuthoritiesReq, UpdateUserRolesReq } from './model/authorizeModel';

enum Api {
  UpdateUserRoles = '/authorize/updateUserRoles',
  UpdateRoleAuthorities = '/authorize/updateRoleAuthorities',
}

// export function updateUserRoles(params: UpdateUserRolesReq) {
//   return http.patch<void>(
//     { url: Api.UpdateUserRoles, params },
//     { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
//   );
// }

// export function updateRoleAuthorities(params: UpdateRoleAuthoritiesReq) {
//   return http.patch<void>(
//     { url: Api.UpdateRoleAuthorities, params },
//     { successMessageMode: MsgMode.MESSAGE, errorMessageMode: MsgMode.MESSAGE },
//   );
// }
