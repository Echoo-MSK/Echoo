import { create } from 'zustand';

export type ModalType = "createServer" | "joinServer";

// Define the data structure (already correct)
interface ModalData {
  onSuccess?: (newServer: any) => void;
}

interface ModalState {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  // **MODIFIED:** Update onOpen signature to accept optional data
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: {}, // Initial state
  isOpen: false,
  // Implementation correctly accepts data (already correct)
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  // **MODIFIED:** Update onClose to reset data
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));