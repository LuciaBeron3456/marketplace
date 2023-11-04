import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('logged')

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return children
}
