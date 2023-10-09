import { useQuery } from '@tanstack/react-query'

import { axiosService } from '../axiosService'


// AXIOS requests
const getScienceBranch = async () => {
  const response = await axiosService.get('/scienceBranch')
  return response
}

// React Query Hooks
export const useGetScienceBranch = () => {
  return useQuery({
    queryKey: ['scienceBranch'],
    queryFn: () => getScienceBranch()
  })
}


const searchScienceBranch = async (query) => {
  const response = await axiosService.get(`/scienceBranch/search/query?query=${query}`)
  return response
}

// React Query Hooks
export const useSearchScienceBranch = (query) => {
  return useQuery({
    queryKey: ['scienceBranch', query],
    queryFn: () => searchScienceBranch(query),
    enabled: Boolean(query)
  })
}