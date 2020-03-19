import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js';
// change to module
Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    user,
  },
  state: {
     loader: {
       login: false
     }
  },
  mutations: {
      LOADER(state, payload) {
        state.loader.login = payload;
      },
  }
  
  
})

export default store