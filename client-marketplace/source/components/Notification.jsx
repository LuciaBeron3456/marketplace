import { useEffect, useState } from 'react'

import { toast, ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useNotificationStore } from '../stores/notification'

const Notification = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach(element => {
        toast[element.type](`${element.message}`, {
          position: element.position || toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: element.hideProgressBar,
          autoclose: element.autoclose,
          newestOnTop: false,
          pauseOnHover: true,
          closeOnClick: true
        })
      })
      setShow(true)
    }
  }, [notifications])

  return show && <ToastContainer />
}

export { Notification }
