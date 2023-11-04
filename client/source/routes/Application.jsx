import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '../helpers/ScrollToTop'
import { PublicLayout } from '../layouts/PublicLayout'
import { NotFound } from '../pages/NotFound'
// import { ProfileQuestionsAnswers } from '../pages/ProfileQuestionsAnswers'
import { PrivateRoute } from './PrivateRoute'
import { FindProject } from '../pages/FindProject';
import { SignIn } from '../pages/SignIn';
import { Projects } from '../pages/Projects'
import { Overview } from '../pages/Overview'
import { useGetUser } from '../services/api/usersAPI';
import { useUserStore } from '../stores/user'
import { useModalStore } from '../stores/modal'
import { UserPreferences } from '../components/UserPreferences'
import { ChatPage } from '../pages/ChatPage'


const Application = () => {

  const [fetch, setFetch] = useState(false)
  const setUser = useUserStore(store => store.setUserData)
  const show = useModalStore(store => store.showModal)
  const { data: user } = useGetUser(fetch)

  const logged = Cookies.get('token')

  useEffect(() => {
    if (user) {
      console.log('user', user)
      setUser(user)
    }
    if (user && !user.location) {
      show({ content: <UserPreferences />})
    }
  }, [user])

  useEffect(() => {
    if (logged && !user) {
      console.log('logged', logged)
      setFetch(true)
    }
  }, [logged])

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path='/' element={<FindProject />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/my-projects' element={<Projects />} />
          <Route path='/overview' element={<Overview />} />
          <Route path='/chat' element={<ChatPage />} />

          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/perfil' element={<PrivateRoute></PrivateRoute>}>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { Application }
