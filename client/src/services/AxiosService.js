
import store from '../store'
import axios from 'axios'
import NProgress from 'nprogress' // <--- Import the library
import env from '../env/index.js';

const token = localStorage.getItem('user');


const apiClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : token
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