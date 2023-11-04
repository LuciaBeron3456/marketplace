import { useQuery } from '@tanstack/react-query'

import { axiosService } from '../axiosService'

// AXIOS requests
const getSearch = async (filters = '') => {
  const response = await axiosService.get(`/search?${filters}`)
  return response
}

// React Query Hooks
export const useGetSearch = (filters, fetch) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getSearch(filters),
    enabled: Boolean(fetch)
  })
}
