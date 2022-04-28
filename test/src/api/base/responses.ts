export interface Response<T> {
  success: true
  data: T
}

export interface FailResponse {
  success: false
  err_code: number
  err_msg: string
}
