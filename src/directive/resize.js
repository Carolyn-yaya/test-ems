export default {
  mounted(el, binding) {
    const throttle = binding.arg === 'throttle'
    let width
    let height
    function get() {
      const style = document.defaultView.getComputedStyle(el)
      
      if (width !== style.width || height !== style.height) {
        checkThrottle(style)
      }
      width = style.width
      height = style.height
    }
    el._vresize = setInterval(get, 100)
    el._throttle = null
    function checkThrottle(style) {
      let delay = 0
      if (throttle) {
        if (el._throttle) {
          clearTimeout(el._throttle)
        }
        delay = 300
      }
      el._throttle = setTimeout(() => {
        binding.value({ width: parseInt(style.width), height: parseInt(style.height) })
      }, delay);
    }
  },
  unmounted(el) {
    clearInterval(el._vresize)
  }
}
