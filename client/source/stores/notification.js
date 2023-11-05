import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  showNotification: data => set(() => ({
    message: data.message,
    type: data.type,
    hideProgressBar: data.hideProgressBar,
    autoclose: data.autoclose,
    position: data.position
  }))
}))
