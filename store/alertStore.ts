import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  message: string;
  type: AlertType;
}

interface AlertState {
  alert: Alert | null;
  showAlert: (message: string, type: AlertType) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: null,
  
  showAlert: (message, type) => set({ alert: { message, type } }),
  
  clearAlert: () => set({ alert: null }),
}));