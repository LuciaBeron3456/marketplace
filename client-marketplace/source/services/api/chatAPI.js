import { useMutation, useQuery } from '@tanstack/react-query'

import { axiosService } from '../axiosService'

import { queryClient } from '../queryClient'

const createMessage = async (payload) => {
  const { roomId, textMessage, userId } = payload
  return await axiosService.post('/messages', { roomId, textMessage, userId })
}

const getMessagesByRoom = async (id) => {
  return await axiosService.get(`/messages/${id}`)
}

const getRoomsByUser = async (id) => {
  return await axiosService.get(`/rooms/user/${id}`)
}

const createRoom = async (payload) => {
  const { buyerId, sellerId } = payload
  return await axiosService.post('/rooms', { buyerId, sellerId })
}

const searchMessages = async (query) => {
  return await axiosService.get(`/messages/search/query?${query}`)
}

const getSearch = async (filters = '') => {
  const response = await axiosService.get(`/rooms/search/query?${filters}`)
  return response
}

export const useCreateMessage = () => {
  return useMutation({
    mutationKey: ['messages'],
    mutationFn: (payload) => createMessage(payload)
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['messages'])
    // }
  }
  )
}

export const useGetMessagesByRoom = (id, fetch) => {
  return useQuery({
    queryKey: ['messages' + id],
    queryFn: () => getMessagesByRoom(id),
    enabled: fetch
  })
}

export const useSearchMessages = (query, fetch) => {
  return useQuery({
    queryKey: ['messages-search', query],
    queryFn: () => searchMessages(query),
    cacheTime: 0,
    enabled: Boolean(fetch)
  })
}

export const useGetRoomsByUser = (id, fetch) => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => getRoomsByUser(id),
    enabled: Boolean(fetch)
  })
}

export const useCreateRoom = () => {
  return useMutation({
    mutationKey: ['rooms'],
    mutationFn: (payload) => createRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms'])
    }
  }
  )
}

export const useGetSearchRoomsByBudget = (filters) => {
  return useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => getSearch(filters),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications'])
      queryClient.invalidateQueries(['notifications-amount'])
    }
  })
}
