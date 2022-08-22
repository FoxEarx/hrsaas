import router, { asyncRoutes } from '@/router'
import store from '@/store'
const whitesList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  if (store.state.user.token) {
    if (!store.state.user.userInfo.userId) {
      const { roles } = await store.dispatch('user/getUserInfo')
      console.log(roles)
      await store.dispatch('permission/filterRoutes', roles)
      await store.dispatch('permission/setPointsAction', roles.points)
      next(to.path)
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
