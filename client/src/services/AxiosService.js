import env from '../env/index.js';
import NProgress from 'nprogress'
import axios from 'axios'
import store from '../store'

const token = localStorage.getItem('user')
console.log(token)
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