import { create } from 'zustand'

interface ProgressState {
    progress: number
    setProgress: (progress: number) => void,
    sections: number
}

export const useProgressStore = create<ProgressState>()((set) => ({
    progress: 0,
    setProgress: (updated) => set(() => ({ progress: updated })),
    sections: 5,
}))

interface HeightState {
    height: number
    setHeight: (height: number) => void
}

export const useHeightStore = create<HeightState>()((set) => ({
    height: 0,
    setHeight: (updated) => set(() => ({ height: updated })),
}))