import { Outlet } from 'react-router-dom'

import { Footer } from '../components/Layout/Footer'
import { Navbar } from '../components/Layout/Navbar'

const PublicLayout = () => {

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  )
}

export { PublicLayout }
