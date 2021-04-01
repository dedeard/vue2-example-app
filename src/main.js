import Vue from 'vue'
import VueRouteMiddleware from 'vue-route-middleware'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import plugins from '@/plugins'
import ApiService from './common/api.service'
import { CHECK_AUTH, LISTEN_ONLINE_USER } from './store/action.types'
import { SET_BOOT_LOADING } from './store/mutation.types'
import AuthMiddleware from './router/middlewares/auth'
import GuestMiddleware from './router/middlewares/guest'

Vue.config.productionTip = false

ApiService.init()

Vue.use(plugins)

store.dispatch(LISTEN_ONLINE_USER)

let authCheck = false
router.beforeEach((to, from, next) => {
  if (!authCheck) {
    store.dispatch(CHECK_AUTH).then(() => {
      authCheck = true
      store.commit(SET_BOOT_LOADING, false)
      next()
    })
  } else {
    next()
  }
})

router.beforeEach(VueRouteMiddleware({ AuthMiddleware, GuestMiddleware }))

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
