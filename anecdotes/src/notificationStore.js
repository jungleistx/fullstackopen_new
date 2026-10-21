import { create } from "zustand";


let timeoutId = null

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    notify: (message) => {
      clearTimeout(timeoutId)
      set({ message })
      timeoutId = setTimeout(() => set({ message: '' }), 5000)
    },
    clear: () => {
      clearTimeout(timeoutId)
      set({ message: '' })
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
