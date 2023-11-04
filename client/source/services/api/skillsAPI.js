import { useQuery } from '@tanstack/react-query'

import { axiosService } from '../axiosService'


// AXIOS requests
const getSkills = async () => {
  const response = await axiosService.get('/skills')
  return response
}

// React Query Hooks
export const useGetSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills()
  })
}


const searchSkills = async (query) => {
  const response = await axiosService.get(`/skills/search/query?query=${query}`)
  return response
}

// React Query Hooks
export const useSearchSkills = (query) => {
  return useQuery({
    queryKey: ['skills', query],
    queryFn: () => searchSkills(query),
    enabled: Boolean(query)
  })
}