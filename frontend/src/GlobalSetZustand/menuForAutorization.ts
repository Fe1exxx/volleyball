import { create } from "zustand";

interface Menu {
    openMenu: boolean,
    changeStateOpen: () => void,
}

export const useMenu = create<Menu>((set) => ({
    openMenu: false,
    changeStateOpen: () => set((state) => ({openMenu: !state.openMenu}))
}))