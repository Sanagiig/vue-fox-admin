import { RequestOptions, Result } from '#/axios';
import { MsgMode, ResultEnum } from '@/enums/httpEnum';
import { t } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { isEmpty, isNull, isObject, isString, isUndefined } from '@/utils/is';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { createMessage, createErrorModal, createSuccessModal } = useMessage();

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

export function tipMessage(data: Result, options: RequestOptions) {
  //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
  const { code, msg, errMsg } = data;
  const hasSuccess = code == ResultEnum.SUCCESS && options.successMessageMode;
  const hasErr = code == ResultEnum.ERROR && options.errorMessageMode;
  if (hasSuccess) {
    let message = msg;
    if (isNull(msg) || isUndefined(msg) || isEmpty(msg)) {
      message = t(`sys.api.operationSuccess`);
    }

    switch (options.successMessageMode) {
      case MsgMode.MODAL:
        createSuccessModal({ title: t('sys.api.successTip'), content: message });
        break;
      case MsgMode.MESSAGE:
        createMessage.success(message);
        break;
    }
  }

  if (hasErr || errMsg) {
    let message = msg;
    if (isNull(msg) || isUndefined(msg) || isEmpty(msg)) {
      message = t(`sys.api.operationFailed`);
    }

    switch (options.successMessageMode) {
      case MsgMode.MODAL:
        createErrorModal({ title: t('sys.api.errorTip'), content: message });
        break;
      case MsgMode.MESSAGE:
        createMessage.error(message);
        break;
    }
    throw new Error(errMsg || message);
  }

  if (errMsg) {
    console.error('Server Err:', errMsg);
  }
}
