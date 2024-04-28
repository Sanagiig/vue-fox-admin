/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 500,
  TIMEOUT = 401,
}

/**
 * @description: request method
 */
export enum RequestEnum {
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  CONNECT = 'CONNECT',
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export enum MsgMode {
  NONE = 'none',
  MODAL = 'modal',
  MESSAGE = 'message',
}
