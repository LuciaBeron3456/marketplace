import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFetchUser } from '../hooks/useFetchUser'

export const SellerRoute = ({ children }) => {
  const customer = useFetchUser()

  if (customer?.controlAcceso === 'Comprador') {
    return <Navigate to='/perfil' />
  }

  return children
}
