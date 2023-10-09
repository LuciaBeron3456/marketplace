import { useQuery } from '@tanstack/react-query'
import { axiosService } from '../axiosService'
import { queryClient } from '../queryClient'

const getProvincias = async () => {
  const provinciasUrl = await axiosService.get(
    '/provinces'
  )
  return provinciasUrl?.data
}

export const useGetProvincias = () => {
  return useQuery({
    queryKey: ['provincias'],
    queryFn: () => getProvincias(),
    onSuccess: () => {
      queryClient.invalidateQueries(['localidades'])
    }
  })
}
