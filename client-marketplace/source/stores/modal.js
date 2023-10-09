import { create } from 'zustand'

export const useModalStore = create((set) => ({
  display: false,
  content: null,
  heading: '',
  size: 'medium',
  closeOnClickOutside: false,
  showModal: data => set(() => ({ display: true, content: data.content, closeOnClickOutside: data.closeOnClickOutside, heading: data.heading, size: data.size })),
  hideModal: () => set(() => ({ display: false, type: null }))
}))
