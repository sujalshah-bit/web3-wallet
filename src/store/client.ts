
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  isOpen: boolean;
  eth: number;
  sol: number;
  toggle: () => void;
  open: () => void;
  close: () => void;
  setEth: (balance: number) => void;
  setSolana: (balance: number) => void;
}

export const useSidebarStore = create(
  persist<SidebarState>(
    (set) => ({
      isOpen: false,
      eth: 123, // Default value, I have choosen this value because balance will be 0 by default to check whether it is updating or not therefore i have taken this as random numbers
      sol: 123, // Default value, I have choosen this value because balance will be 0 by default to check whether it is updating or not therefore i have taken this as random numbers
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setEth: (balance) => set(() => ({ eth: balance })),
      setSolana: (balance) => set(() => ({ sol: balance })),
    }),
    {
      name: 'sidebar-storage', 
      skipHydration:true
    }
  )
);

export default useSidebarStore;