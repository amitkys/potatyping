import { create } from "zustand";
import { inscriptLayout } from "@/lib/layouts/inscript";

interface TypingState {
  layout: Record<string, string>;
  setLayout: (layout: Record<string, string>) => void;
}

export const useTypingStore = create<TypingState>((set) => ({
  layout: inscriptLayout, // default
  setLayout: (layout) => set({ layout }),
}));
