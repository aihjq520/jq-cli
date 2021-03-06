import { AxiosInstance } from 'axios'
import { sleep } from 'utils'

import { wrapperSend, createRequest } from './request'
import { Response, FailResponse } from './responses'

export type Callback = () => void

export type ErrorHandle = (status: number, data: any) => void

export class ApiBaseOptions {
  token = ''
  userID = 0
  env?: string
  onError?: ErrorHandle
  beforeSend?: Callback
  afterSend?: Callback

  setCredentials(token: string, userID: number) {
    this.token = token
    this.userID = userID
  }

  setEnv(env?: string) {
    this.env = env
  }

  removeCredentials() {
    this.token = ''
    this.userID = 0
  }

  setOnError(onError: ErrorHandle) {
    this.onError = onError
  }

  setOnBeforeSend(onBeforeSend: Callback) {
    this.beforeSend = onBeforeSend
  }

  setOnAfterSend(onAfterSend: Callback) {
    this.afterSend = onAfterSend
  }
}

export type RequestOptions = {
  back?: boolean
  encrypt?: boolean
}

const defaultRequestOptions: RequestOptions = {
  back: true,
  encrypt: true
}

export default class ApiBase {
  request: AxiosInstance
  options: ApiBaseOptions

  constructor(options: ApiBaseOptions, root?: string) {
    this.request = createRequest(root)
    this.options = options
  }

  protected post = async <T = any>(
    url = '',
    body: any = {},
    options?: RequestOptions
  ) => {
    options = {
      ...defaultRequestOptions,
      ...(options || {})
    }

    if (!options.back && this.options?.beforeSend) {
      this.options.beforeSend()
    }

    const [res] = await Promise.all([
      wrapperSend(
        () =>
          this.request.post(url, body, {
            headers: {
              token: this.options.token,
              userid: this.options.userID.toString()
            }
          }),
        this.options?.onError
      ),
      sleep(500)
    ])
    if (!options.back && this.options?.afterSend) {
      this.options.afterSend()
    }
    if (res.success) {
      return res as Response<T>
    } else {
      return res as FailResponse
    }
  }

  protected upload = async <T = any>(
    url = '',
    body: any = {},
    options?: RequestOptions
  ) => {
    if (!options) {
      options = defaultRequestOptions
    }
    if (!options.back && this.options?.beforeSend) {
      this.options.beforeSend()
    }
    const [res] = await Promise.all([
      wrapperSend(async () => {
        return this.request.post(url, body)
      }, this.options?.onError),
      sleep(500)
    ])
    if (!options.back && this.options?.afterSend) {
      this.options.afterSend()
    }
    return res as unknown as T
  }
}
