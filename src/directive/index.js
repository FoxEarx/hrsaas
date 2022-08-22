import store from '@/store'
export const imgError = {
  inserted(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  },
}
export const isHas = {
  //bind：指令和dom绑定
  //inserted:指令所绑定的元素
  inserted(el, binding) {
    //el：绑定的元素
    //binding:传递的参数
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  },
}
