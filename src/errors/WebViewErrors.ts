import { ErrorCode, EC3APPError } from './EC3APPError';

export class WebviewError extends EC3APPError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_ERROR, message);
  }
}

export class WebviewNotReadyError extends EC3APPError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_NOT_READY_ERROR, message);
  }
}

export class WebviewResponseError extends EC3APPError {
  constructor(message: string) {
    super(ErrorCode.WEBVIEW_RESPONSE_ERROR, message);
  }
}
