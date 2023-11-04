import { useMutation } from '@tanstack/react-query'
import { axiosService } from '../axiosService'

// AXIOS requests
const userTerms = async ({ email, password }) => {
  return axiosService.post('/auth/terms/', { email, password })
}

const resetPassword = async (data) => {
  return axiosService.post('/auth/recovery/v2', data)
}

const userLogin = async (log) => {
  return axiosService.post('/auth/login', log)
}

// React Query Hooks
export const useUserTerms = () => {
  return useMutation({
    mutationKey: ['terms'],
    mutationFn: (log) => userTerms(log)
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['reset_pass'],
    mutationFn: (email) => resetPassword(email)
  })
}

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (log) => userLogin(log)
  })
}
