import store from '../store'
import env from '../env/index.js';
import NProgress from 'nprogress'
import axios from 'axios'

const token = localStorage.getItem('user');
 if (token) {
   store.commit('SET_USER_DATA', token)
 }
const apiClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: false, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
  }
})
 apiClient.interceptors.response.use(
   response => response,
   error => {
     if (error.response.status === 401) {
      store.dispatch('logout')
     }
     return Promise.reject(error)
   }
 )

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})
apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})
export default apiClient