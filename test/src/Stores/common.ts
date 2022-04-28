import { apiOptions } from 'api'
import { makeAutoObservable } from 'mobx'

export const TICKET = 'ticket'
export const TOKEN = 'token'
export const USER_ID = 'userID'
export const EMAIL = 'email'

export default class CommonStore {
  private _isLoading = false
  private _isLogin = false
  private _showSpinner = false

  constructor() {
    makeAutoObservable(this)
  }
  showToast = () => {
    this._showSpinner = true
  }

  hiddenToast = () => {
    this._showSpinner = false
  }

  errorHandle = (status: number, data: any) => {
    if (status === 403) {
      return
    }
  }

  initApiOption = (token: string | null, userID: string | null) => {
    userID && token && apiOptions.setCredentials(token, parseInt(userID, 10))
  }

  init = async () => {
    const token = localStorage.getItem(TOKEN)
    const userID = localStorage.getItem(USER_ID)
    const metas = document.getElementsByTagName('meta')
    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === 'env') {
        apiOptions.setEnv(metas[i].getAttribute('content') as string)
      }
    }
    apiOptions.setOnError(this.errorHandle)
    apiOptions.setOnBeforeSend(this.showToast)
    apiOptions.setOnAfterSend(this.hiddenToast)
    if (token && userID) {
      this.initApiOption(token, userID)
      this._isLogin = true
    }

    this._isLoading = true
  }

  removeSession() {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(TICKET)
    localStorage.removeItem(EMAIL)
  }

  logout = () => {
    this._isLogin = false
    this.removeSession()
    window.location.reload()
  }

  get isLoading() {
    return this._isLoading
  }

  set isLoading(value: boolean) {
    this.isLoading = value
  }

  get isLogin() {
    return this._isLogin
  }

  get showSpinner() {
    return this._showSpinner
  }
}
