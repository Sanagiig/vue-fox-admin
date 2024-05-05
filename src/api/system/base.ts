import { http } from '@/utils/http/axios';
import { GetCaptchaRes } from './model/baseModel';

enum Api {
  GetCaptcha = '/base/getCaptcha',
  CheckCaptcha = '/base/checkCaptcha',
}

export function getCaptcha() {
  return http.get<GetCaptchaRes>({ url: Api.GetCaptcha });
}
