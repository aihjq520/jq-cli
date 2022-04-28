import dayjs from 'dayjs'

export interface TimeType {
  seconds: number
  nanos: number
}

export enum DateFormat {
  YMD_Hms = 'YYYY-MM-DD HH:mm:ss',
  YMD = 'YYYY-MM-DD',
  YMDCHS = 'YYYY年MM月DD日'
}

export const dateFormat = (date: TimeType, template: DateFormat) => {
  if (!date || !date.seconds) return ''
  return dayjs.unix(date.seconds).format(template)
}
