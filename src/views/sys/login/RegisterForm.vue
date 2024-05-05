<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="nickname" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.nickname"
          :placeholder="t('sys.login.nickname')"
        />
      </FormItem>
      <FormItem name="username" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.username"
          :placeholder="t('sys.login.username')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem name="phone" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.phone"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <!-- <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem> -->

      <Row class="enter-x">
        <Col :span="12">
          <FormItem name="captchaCode" class="enter-x">
            <Input
              size="large"
              v-model:value="formData.captchaCode"
              :placeholder="t('sys.login.inputCaptcha')"
              class="fix-auto-fill"
            />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem :style="{ 'text-align': 'right' }">
            <img class="h-40px" :src="captchaData.base64Str" alt="" @click="refreshCaptcha" />
          </FormItem>
        </Col>
      </Row>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, watch, toRaw } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, Row, Col } from 'ant-design-vue';
  import { StrengthMeter } from '@/components/StrengthMeter';
  // import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { getCaptcha } from '@/api/system/base';
  import { registerApi } from '../../../api/system/user';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    nickname: '',
    username: '',
    password: '',
    confirmPassword: '',
    captchaId: '',
    captchaCode: '',
    phone: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  const captchaData = ref({
    id: '',
    base64Str: '',
    captchaLen: 0,
  });

  const refreshCaptcha = async () => {
    const data = await getCaptcha();
    captchaData.value = data;
    formData.captchaId = data.id;
    console.log('data', data);
  };

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;

    const params: any = { ...toRaw(formData) };
    delete params.confirmPassword;

    await registerApi(params);
    handleBackLogin();
  }

  watch(getShow, () => {
    if (getShow.value) {
      refreshCaptcha();
    }
  });
</script>
