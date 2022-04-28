export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const debounce = (fn: () => void, delay: number) => {
  let timer: NodeJS.Timeout // 维护一个 timer
  return function () {
    console.log(11)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn()
    }, delay)
  }
}

export const throttle = (fn: () => void, immediate = false, wait = 1000) => {
  let flag = true
  let timer = null
  return function () {
    if (flag) {
      //是否立即执行
      immediate && fn()
      //关闭通道，等待定时器执行完后再开启
      flag = false
      timer = setTimeout(() => {
        !immediate && fn()
        flag = true
      }, wait)
    }
  }
}
