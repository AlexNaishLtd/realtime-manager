import { create } from 'zustand';

interface DashboardState {
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  toggleSearch: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isNavOpen: false,
  setNavOpen: (open) => set(() => ({ isNavOpen: open })),
  isSearchOpen: false,
  toggleSearch: (open) => set(() => ({ isSearchOpen: open }))
}));
