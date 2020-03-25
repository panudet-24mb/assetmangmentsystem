import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import 'nprogress/nprogress.css'
import VueSmartWidget from 'vue-smart-widget'
Vue.use(VueSmartWidget)



Vue.config.productionTip = false
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})


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


