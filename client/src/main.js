import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem('user')
    // console.log(userString)
    if (userString) {

      this.$store.commit('SET_USER_DATA', userString)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$store.dispatch('logout')
        }
        return Promise.reject(error)
      }
    )
  },

  render: h => h(App)
}).$mount('#app')
