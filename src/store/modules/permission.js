import router, { asyncRoutes, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [],
    points: [],
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    },
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRoutes.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      console.log(routes)
      context.commit('setRoutes', routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    setPointsAction(context, payload) {
      context.commit('setPoints', payload)
    },
  },
}
