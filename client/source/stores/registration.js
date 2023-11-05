import { create } from 'zustand'

export const useRegistrationStore = create((set) => ({
  step: 1,
  customerRol: 'Comprador',
  customerTerms: false,
  cuitCounter: null,
  bnaValidation: false,
  error: '',
  customerData: {
    cuitAdmin: '',
    cuitEmpresa: '',
    telefono: '',
    nombre: '',
    genero: '',
    email: '',
    repetirEmail: '',
    password: '',
    alias: ''
  },
  bnaValidateData: null,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: state.step - 1 })),
  updateCustomerData: data => {
    set(state => ({
      customerData: {
        ...state.customerData,
        ...data.data
      }
    }))
  },
  updateRol: rol => set(() => ({
    customerRol: rol
  })),
  updateBnaData: data => {
    set(() => ({bnaValidateData: data}))
  },
  updateBnaValidation: state => set(() => ({
    bnaValidation: state
  })),
  setError: state => set(() => ({
    error: state
  }))
}))
