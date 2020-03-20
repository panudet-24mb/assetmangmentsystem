import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import 'nprogress/nprogress.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      this.$store.commit('SET_USER_DATA', userString)
    }
   
  
  },
  

  render: h => h(App)
}).$mount('#app')


