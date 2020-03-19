import axios from 'axios'
import NProgress from 'nprogress' // <--- Import the library


const apiClient = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
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