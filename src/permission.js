import router from '@/router'
import store from '@/store'
const whitesList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    if (!store.state.user.userInfo.userId) {
      store.dispatch('user/getUserInfo')
    }

    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whitesList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
