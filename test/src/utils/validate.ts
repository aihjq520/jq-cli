const phoneValidate = (phone: string) => {
  if (phone.length !== 11) {
    return false
  }
  return /^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[235-8]\d{2})|4\d{3}|9[0135-9]\d{2}|66\d{2})\d{6}$/.test(
    phone
  )
}

const emailValidate = (email: string) => {
  return /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(
    email
  )
}

/**
 * 校验密码正确性(字母或数字6-18位)
 * @param pwd
 */
const isValidPwd = (pwd: string) => {
  return /^[0-9A-Za-z]{6,18}$/.test(pwd)
}

/**
 * 校验FIL地址
 * @param address
 */
const addressFilValidate = (address: string) =>
  /^f[0-9a-zA-Z]{40}$/.test(address)

/**
 * 校验USDT地址
 * @param address
 */
const addressUsdtValidate = (address: string) => {
  return /^T[0-9a-zA-Z]{34}$/.test(address)
}

export {
  emailValidate,
  isValidPwd,
  phoneValidate,
  addressFilValidate,
  addressUsdtValidate
}
