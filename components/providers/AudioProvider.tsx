'use client'
import { createContext, useContext } from 'react'
import { useAudio } from '@/lib/useAudio'
import { useWeddingData } from '@/context/WeddingDataContext'

interface AudioContextValue {
  isPlaying: boolean
  toggle: () => void
  showHint: boolean
}

const AudioContext = createContext<AudioContextValue>({ isPlaying: false, toggle: () => {}, showHint: false })

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const weddingData = useWeddingData()
  const value = useAudio(weddingData.invitationMusic)
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudioContext = () => useContext(AudioContext)
