import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: {},
  setUserData: user => set(() => ({ user })),
}))
