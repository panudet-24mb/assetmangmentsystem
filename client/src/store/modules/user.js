import axios from 'axios'
import env from '../../env/index.js'
export const state = {
  state: {
    user: null
  }
}
  export const mutations = {
    SET_USER_DATA(state, userData) {
      state.user = userData
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
        .post(env.API_URL+'/user/login', credentials)
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
}
  
export const getters = {
  loggedIn(state) {
      return !!state.user
    }
}
  
