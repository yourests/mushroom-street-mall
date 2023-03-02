// 防抖处理函数, 忽略短时间内的多次请求, 停止请求一段时间后再调用, 提高系统的性能和效率
export function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}