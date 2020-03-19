import axios from 'axios'
import NProgress from 'nprogress' // <--- Import the library
import env from '../env/index.js';


const apiClient = axios.create({
  baseURL: env.API_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})
apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})
export default apiClient