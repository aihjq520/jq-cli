import { ApiBaseOptions } from './base/apiBase'
import CommonApi from './common'

export const apiOptions = new ApiBaseOptions()
export const commonApi = new CommonApi(apiOptions)
