import Cookies from 'js-cookie'
import React from 'react'
import { Navigate } from 'react-router-dom'


export const PrivateRoute = ({ children }) => {
  const isAuthenticated = Cookies.get('logged')

  if (!isAuthenticated) {
    return <Navigate to='/ingreso' />
  }

  return children
}
