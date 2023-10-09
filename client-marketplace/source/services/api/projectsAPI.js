import { useMutation, useQuery } from '@tanstack/react-query'
import { useNotificationStore } from '../../stores/notification'

import { axiosService } from '../axiosService'

import { queryClient } from '../queryClient'

// AXIOS requests
const getProjects = async (filters = 'offset=0') => {
  const response = await axiosService.get(`/projects?${filters}`)
  return response
}

const getProductsList = async (filters = '') => {
  const response = await axiosService.get(`/products?limit=15${filters}`)
  return response
}

const getProjectById = async (id) => {
  return axiosService.get(`/projects/${id}`)
}

const getProjectsByUserId = async (id) => {
  return axiosService.get(`/projects/user/${id}`)
}

// React Query Hooks
export const useGetProjects = (filters, fetch = true) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProjects(filters),
    cacheTime: 0,
    enabled: Boolean(fetch)
  })
}

export const useGetProjectById = (id) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
    staleTime: Infinity,
    enabled: Boolean(id),
    retry: false,
    cacheTime: 0
  })
}

export const useGetProjectsByUserId = (id) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectsByUserId(id),
    cacheTime: 0
  })
}

const createProject = (body) => {
  return axiosService.post(`/projects`, body)
}

export const useCreateProject = () => {
  return useMutation({
    mutationKey: ['project'],
    mutationFn: (body) => createProject(body),
    onSuccess: () => {
      queryClient.invalidateQueries(['project'])
      useNotificationStore.setState({ notifications: [{ position: 'bottom-center', hideProgressBar: true, message: 'Proyecto successfuly created', type: 'success' }] })
    },
    onError: () => {
      useNotificationStore.setState({ notifications: [{ position: 'bottom-center', hideProgressBar: true, message: 'There was an error', type: 'error' }] })
    }
  })
}


export const useGetProjectsList = (filters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProductsList(filters)
  })
}


