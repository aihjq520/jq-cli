export const toFixed = (value: number | string | undefined, fixed = 8) => {
  if (value === undefined) {
    return 0
  }
  if (typeof value === 'number') {
    return Number(value.toFixed(fixed))
  }
  return Number(Number(value).toFixed(fixed))
}

export const addFunc = (
  arr: (number | undefined)[] | (string | undefined)[],
  fixed = 4
) => {
  let sum = 0
  arr.forEach((item, _) => {
    sum += toFixed(item, fixed)
  })
  return toFixed(sum, fixed)
}

export const deFunc = (bf: number, af: number, fixed = 4) => {
  return toFixed(toFixed(bf, fixed) - toFixed(af, fixed), fixed)
}

export const numToLocale = (value: number | string | undefined, max = 4) => {
  if (value === 0 || value === '0' || value === undefined) {
    return '0'
  }
  let val = value
  if (typeof value === 'string' && Number(val)) {
    val = Number(val) || '0'
  }
  return (
    val.toLocaleString('en-US', {
      maximumFractionDigits: max
    }) || '0'
  )
}

/**
 *数据加载函数，加载中则返回"---"，否则返回进位后的数据
 */
export const numberLoading = (
  isLoading: boolean,
  value: number | string | undefined,
  fixed = 4
) => {
  if (isLoading) {
    return '---'
  }

  return numToLocale(value, fixed)
}

export const isValidNum = (text: string) => {
  return /^([0-9]+\.[0-9]{0,8}|[1-9]+\d*|[[0]\.[0-9]{0,8}|0)$/.test(text)
}

export const isValidInt = (text: string) => {
  return /^([0-9]*)+$/.test(text)
}

export const encryptEmail = (email: string) => {
  if (String(email).indexOf('@') > 0) {
    return email.replace(
      /(.{2,4})([\w.\\_\\+\\-]+)(\w)(@\w+\.[a-z]+(\.[a-z]+)?)/,
      '$1**$4'
    )
  } else {
    return email
  }
}

/** 遍历出枚举的值 */
export const getEnumValueArr = <T extends number | string>(obj: {
  [k: string]: any
}) => {
  const enumValueArr: T[] = []
  Object.entries(obj).forEach((type) => {
    // 取出key不是数字的value
    if (isNaN(Number(type[0]))) {
      enumValueArr.push(type[1])
    }
  })
  return enumValueArr as T[]
}
