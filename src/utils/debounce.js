
// 函数节流
let timeout = null
function functionThrottle(fn, wait) {
  if(timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}
export default functionThrottle
