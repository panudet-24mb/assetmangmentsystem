import axios from 'axios'
import env from '../../env/index.js'
export const state = {
  state: {
    user: null,
    auth: null
  }
}
  export const mutations = {
    SET_USER_DATA(state, userData,users_auth) {
      state.user = userData
      state.auth = users_auth
      localStorage.setItem('user', userData)
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    },
  
  }


export const actions = {
  register({
    commit
  }, credentials) {
    return axios
      .post(env.API_URL+'register', credentials)
      .then(({
        data
      }) => {
        commit('SET_USER_DATA', data)
      })
  },
   

    login({
      commit
    }, credentials) {
      return axios
        .post(env.API_URL+'/auth/signin', credentials)
        .then(({
          data
        }) => {
          console.log(data)
          let user_api = data.accessToken
          let users_auth = data.auth
          commit('SET_USER_DATA', user_api,users_auth)
        })
    },
    logout({
      commit
    }) {
      commit('CLEAR_USER_DATA')
    }
}
  
export const getters = {
  loggedIn(state) {
      return !!state.user
  },
  GetToken(state) {
    return state.user
  }
}
  
