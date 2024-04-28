import { defineStore } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { PageEnum } from '@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';

import { h } from 'vue';
import { IUserInfo, LoginReq } from '@/api/system/model/userModel';
import { login } from '@/api/system/user';
import { IRoleInfo } from '@/api/system/model/roleModel';

interface UserState {
  userInfo: Nullable<IUserInfo>;
  token?: string;
  roleList: IRoleInfo[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): IUserInfo {
      return state.userInfo || getAuthCache<IUserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: IRoleInfo[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: IUserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(params: LoginReq): Promise<IUserInfo | null> {
      try {
        const userInfo = await login(params);
        const { token, user } = userInfo;

        // save token
        this.setToken(token);
        this.setUserInfo(user);
        this.setRoleList(user.roles);

        router.replace({
          path: router.currentRoute.value.query?.redirect?.toString() || PageEnum.BASE_HOME,
        });
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);

      if (goLogin) {
        // 直接回登陆页
        router.replace(PageEnum.BASE_LOGIN);
      } else {
        // 回登陆页带上当前路由地址
        router.replace({
          path: PageEnum.BASE_LOGIN,
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          },
        });
      }
    },
    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          // 主动登出，不带redirect地址
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
