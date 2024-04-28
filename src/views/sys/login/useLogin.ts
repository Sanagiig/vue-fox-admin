import type { FormInstance } from 'ant-design-vue/lib/form/Form';
import type {
  RuleObject,
  NamePath,
  Rule as ValidationRule,
} from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';
import { phoneValidator } from '@/utils/validator/template/str';
import { requireWithMsg } from '@/utils/validator/template';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

// 这里也可以优化
// import { createGlobalState } from '@vueuse/core'

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
  const validate = computed(() => {
    const form = unref(formRef);
    return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
  });

  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validate, validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const getNickNameFormRule = computed(() => requireWithMsg(t('sys.login.nickNamePlaceholder')));
  const getUsernameFormRule = computed(() => requireWithMsg(t('sys.login.accountPlaceholder')));
  const getPasswordFormRule = computed(() => requireWithMsg(t('sys.login.passwordPlaceholder')));
  const getCaptchaFormRule = computed(() => requireWithMsg(t('sys.login.captchaPlaceholder')));
  const getMobileFormRule = computed(() =>
    requireWithMsg(t('sys.login.mobilePlaceholder'), phoneValidator),
  );

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  };

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.passwordPlaceholder'));
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const nickNameFormRule = unref(getNickNameFormRule);
    const usernameFormRule = unref(getUsernameFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const captchaFormRule = unref(getCaptchaFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          nickname: nickNameFormRule,
          username: usernameFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          phone: mobileFormRule,
          captchaCode: captchaFormRule,
          policy: [{ validator: validatePolicy, trigger: 'change' }],
        };
      case LoginStateEnum.LOGIN:
        return {
          username: usernameFormRule,
          password: passwordFormRule,
          captchaCode: captchaFormRule,
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          username: usernameFormRule,
          mobileFormRule,
          captchaCode: captchaFormRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return {};

      // login form rules
      default:
        return {
          username: usernameFormRule,
          password: passwordFormRule,
          captchaCode: captchaFormRule,
        };
    }
  });
  return { getFormRules };
}
