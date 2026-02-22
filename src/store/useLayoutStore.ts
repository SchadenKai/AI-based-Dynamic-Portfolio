import { create } from 'zustand';

export type SectionName = 'about' | 'skills' | 'experience' | 'projects' | 'achievements' | 'writings';

interface LayoutState {
  defaultLayoutOrder: SectionName[];
  layoutOrder: SectionName[];
  highlightIds: string[];
  isConfigured: boolean;
  setDefaultLayout: (order: SectionName[]) => void;
  setLayout: (order: SectionName[], highlights: string[]) => void;
  resetLayout: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  defaultLayoutOrder: ['about', 'skills', 'experience', 'projects', 'achievements', 'writings'],
  layoutOrder: ['about', 'skills', 'experience', 'projects', 'achievements', 'writings'],
  highlightIds: [],
  isConfigured: false,
  setDefaultLayout: (order) => set({
    defaultLayoutOrder: order,
  }),
  setLayout: (order, highlights) => set({
    layoutOrder: order,
    highlightIds: highlights,
    isConfigured: true
  }),
  resetLayout: () => set((state) => ({
    layoutOrder: state.defaultLayoutOrder,
    highlightIds: [],
    isConfigured: false
  })),
}));
