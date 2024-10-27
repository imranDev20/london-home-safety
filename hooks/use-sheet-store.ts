// store/use-sheet-store.ts
import { create } from "zustand";

type SheetStore = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const useSheetStore = create<SheetStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
