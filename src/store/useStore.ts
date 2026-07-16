import { create } from 'zustand';

export type AppState = 'LOADING' | 'IDLE' | 'TRANSITION' | 'PORTFOLIO';
export type PortfolioModule = 'ABOUT' | 'SKILLS' | 'PROJECTS' | 'EDUCATION' | null;

interface GlobalState {
  appState: AppState;
  activeModule: PortfolioModule;
  is2DMode: boolean;
  setAppState: (state: AppState) => void;
  setActiveModule: (module: PortfolioModule) => void;
  set2DMode: (is2D: boolean) => void;
  resetToIdle: () => void;
}

export const useStore = create<GlobalState>((set) => ({
  appState: 'LOADING', // Starts in loading state
  activeModule: null,
  is2DMode: false,
  
  setAppState: (state) => set({ appState: state }),
  setActiveModule: (module) => set({ activeModule: module }),
  set2DMode: (is2D) => set({ is2DMode: is2D }),
  
  resetToIdle: () => set({ appState: 'IDLE', activeModule: null }),
}));
