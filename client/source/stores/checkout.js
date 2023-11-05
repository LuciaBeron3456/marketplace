import { create } from 'zustand'

export const useCheckoutStore = create((set) => ({
  planCuotas: [],
  updatePlanCuotas: cuota => set((state) => ({
    planCuotas: [
      ...state.planCuotas,
      cuota
    ]
  })),
  clearCuotas: () => set(() => ({
    planCuotas: []
  }))
}))
