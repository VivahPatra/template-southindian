'use client'
import { createContext, useContext } from 'react'
import { useAudio } from '@/lib/useAudio'
import { weddingData } from '@/data/wedding-data'

interface AudioContextValue {
  isPlaying: boolean
  toggle: () => void
}

const AudioContext = createContext<AudioContextValue>({ isPlaying: false, toggle: () => {} })

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const value = useAudio(weddingData.invitationMusic)
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudioContext = () => useContext(AudioContext)
