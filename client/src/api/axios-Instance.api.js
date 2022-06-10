import axios from 'axios'
console.log(process.env.REACT_APP_BASE_API_UR)
export const api = axios.create({baseURL : "http://localhost:4001"})

api.interceptors.request.use( (req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error)
})

export const createUser = (userCredentials) => api.post("/", userCredentials, options)
export const createMessage = (message) => api.post("/api/message", message, options)

export const fetchUserNames = () => api.get("/api/users", options)
export const fetchAuthUser = () => api.get('/user', options)
export const fetchMessages = () => api.get('/api/message', options)

const options = {
  withCredentials: false,
}