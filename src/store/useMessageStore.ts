import { create } from 'zustand'

type MessageType = 'success' | 'error'

interface MessageState {
  message: string | null
  show: boolean
  type: MessageType
  setMessage: (message: string, type: MessageType) => void
  clearMessage: () => void
}

export const useMessageStore = create<MessageState>((set) => ({
  message: null,
  show: false,
  type: 'success',
  setMessage: (message, type) => set({ message, show: true, type }),
  clearMessage: () => set({ message: null, show: false }),
}))