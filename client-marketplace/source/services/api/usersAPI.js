import { useQuery, useMutation } from '@tanstack/react-query'
import { axiosService } from '../axiosService'

// AXIOS requests
const getUser = async () => {
  const response = await axiosService.get('/profile/my-user')
  return response
}

// React Query Hooks
export const useGetUser = (fetch) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: Boolean(fetch)
  })
}

const updateUser = async (payload) => {
  const { id } = payload
  const response = await axiosService.patch(`/users/${id}`, payload)
  return response
}

// React Query Hooks
export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: (payload) => updateUser(payload),
  })
}