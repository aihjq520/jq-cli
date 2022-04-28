import { apiOptions } from 'api'
import JSEncrypt from 'encryptlong'

const REQUEST_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnBcLLJANEHadF4Vblsq+\nRyHMaswKYv13+zRFWaUSl09vlRhqdBdq3pHsPMqWQMz8k7Qa5v4soFp60lhwp0am\nZ0UwXW7o/nFq8PT9hW8sUehq1fZbtVMf1a49gMfS9/jQ6lRblnSqe/joUxKGVnmY\ng9NZCWU1eMcMbEsmfFpNnnGZ+Pia/56pmM4HkVPtjg5Tva9y3Li5ChaPw6ZZvyQj\ndn0cdZqMzj7Q3776H7F6lujuFzvJ1CMPJWY9GB43f7r3nMmr1hEPwDUAVvAGCFlp\nw0m535CHKIH5CVW+xdaa3TMQ2SmhbXaPI8X28OTLCZfnKL2qrQJaA4zTDSNHphzE\n5wIDAQAB\n-----END PUBLIC KEY-----
`

const enc = new JSEncrypt()
enc.setPublicKey(REQUEST_PUBLIC_KEY)

export const rsaEncrypt = (message: any) => {
  if (typeof message === 'object') {
    message = JSON.stringify(message)
  }
  return enc.encryptLong(message)
}

export const encryptPwd = (message: string) => {
  if (apiOptions.env === 'production') {
    return rsaEncrypt(message)
  }
  return message
}
