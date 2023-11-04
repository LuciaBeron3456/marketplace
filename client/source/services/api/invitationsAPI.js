import { useMutation, useQuery } from '@tanstack/react-query'

import { axiosService } from '../axiosService'

import { queryClient } from '../queryClient'

// AXIOS requests
// const getReviews = async () => {
//   const response = await axiosService.get('/reviews')
//   return response
// }

// const updateReview = async (payload) => {
//   const { id, body } = payload
//   return await axiosService.patch(`/reviews/${id}`, body)
// }

const createInvitation = async (payload) => {
  return await axiosService.post('/invitations', payload)
}

// const getInvitationsSent = async (id) => {
//   return await axiosService.get(`/reviews/product/${id}`)
// }

// const getInvitationsToCollaborate = async (id) => {
//     return await axiosService.get(`/reviews/product/${id}`)
// }

// const getInvitationsToJoin = async (id) => {
//     return await axiosService.get(`/reviews/product/${id}`)
// }

// React Query Hooks
export const useGetReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews()
  })
}

export const useCreateInvitation = () => {
  return useMutation({
    mutationKey: ['invitations'],
    mutationFn: (payload) => createInvitation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['invitations'])
    }
  }
  )
}
