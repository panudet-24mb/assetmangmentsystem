import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loader: {
      login :false
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {

      state.user = userData
      localStorage.setItem('user', userData)
      axios.defaults.headers.common['Authorization'] = `${
        userData
      }`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    },
    LOADER(state, payload) {
      state.loader.login = payload;
    },
  },
  actions: {
    register({
      commit
    }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({commit}, credentials) {
      return axios
        .post('http://localhost:3000/api/v1/user/login', credentials)
        .then(({
          data
        }) => {
            let user_api = data.data.api_token
          commit('SET_USER_DATA', user_api)
        })
    },
    logout({
      commit
    }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})






// export default new Vuex.Store({
//   state: {
//     isLogin: false,
//     token: null,
//     user: null,
//   },
//   mutations: {
//     SET_USER_DATA(state, Localtoken) {
//         state.isLogin = true;
//         state.token = Localtoken;
//         state.user = '';
//      },
    
//     resetState(state) {
//       state.isLogin = false;
//       state.token = null;
//       state.user = null;
//       localStorage.removeItem('user');
//       location.reload();
//       this.$router.push('/');
      
//     }
//   },
//   actions: {
//     clearState({ commit }) {
//       commit('resetState');
//       this.$router.push('/');
    
//     }
      
    // },
    // Autologin({ commit }, Localtoken) {
    //   return axios.get("http://localhost:3000/api/v1/user/infomation", {
    //         headers: {
    //           'Authorization': Localtoken,
    //           'Content-Type': 'application/json'
    //         }
    //       })
    //     .then(({
    //       data
    //     }) => {
         
    //       commit('SET_USER_DATA', data)
    //       this.$router.push('/dashboard');
    //     })
    // }

//   }
// });
