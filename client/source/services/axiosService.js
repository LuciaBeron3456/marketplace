import axios from 'axios'

import Cookies from 'js-cookie'

const API_KEY = import.meta.env.VITE_API_KEY

export const axiosService = axios.create({
  baseURL: `http://localhost:3000/openscience/api/v1`
})

const authRequestInterceptor = (config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
    config.headers.token = token
  }
  config.headers.Accept = 'application/json'
  config.headers.api = API_KEY
  return config
}

const responseDataInterceptor = (response) => {
  return response.data;
}

axiosService.interceptors.request.use(authRequestInterceptor)

axiosService.interceptors.response.use(responseDataInterceptor)