'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import { WeddingConfig } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

/** Editor form data shape sent via postMessage from the showcase editor */
interface EditorFormData {
  groomName?: string
  brideName?: string
  groomParents?: string
  brideParents?: string
  groomSubtitle?: string
  brideSubtitle?: string
  weddingDate?: string
  hashtag?: string
  tagline?: string
  invitationText?: string
  heroImage?: string
  bridePhoto?: string
  groomPhoto?: string
  backgroundMusic?: string
  galleryImages?: Array<{ src: string; alt?: string; span?: number }>
  events?: Array<{
    id: string
    name: string
    emoji?: string
    date: string
    time: string
    venue: string
    venueAddress: string
    venueMapLink?: string
    description?: string
    color?: string
  }>
  coupleStory?: Array<{
    date: string
    title: string
    description: string
    icon?: string
    image?: string
  }>
  familyBride?: Array<{ name: string; relation: string; photo?: string; side?: string }>
  familyGroom?: Array<{ name: string; relation: string; photo?: string; side?: string }>
  venueName?: string
  venueAddress?: string
  venueMapUrl?: string
  rsvpPhone?: string
  rsvpMessage?: string
  rsvpDeadline?: string
  instagram?: string
  sections?: Record<string, unknown>
}

/** Only override a string field when the incoming value is non-empty */
function str<T>(incoming: string | undefined, fallback: T): T | string {
  return incoming && incoming.trim() !== '' ? incoming : fallback
}

function mapEditorToConfig(editor: EditorFormData, base: WeddingConfig): WeddingConfig {
  const merged: WeddingConfig = { ...base }

  // Simple string fields
  merged.groomName = str(editor.groomName, base.groomName) as string
  merged.brideName = str(editor.brideName, base.brideName) as string
  merged.groomSubtitle = str(editor.groomSubtitle, base.groomSubtitle) as string | undefined
  merged.brideSubtitle = str(editor.brideSubtitle, base.brideSubtitle) as string | undefined
  merged.groomParents = str(editor.groomParents, base.groomParents) as string | undefined
  merged.brideParents = str(editor.brideParents, base.brideParents) as string | undefined
  merged.hashtag = str(editor.hashtag, base.hashtag) as string
  merged.contactPhone = str(editor.rsvpPhone, base.contactPhone) as string

  // Media fields
  merged.heroImage = str(editor.heroImage, base.heroImage) as string
  merged.bridePhoto = str(editor.bridePhoto, base.bridePhoto) as string
  merged.groomPhoto = str(editor.groomPhoto, base.groomPhoto) as string
  merged.invitationMusic = str(editor.backgroundMusic, base.invitationMusic) as string

  // Wedding date: convert string to Date
  if (editor.weddingDate && editor.weddingDate.trim() !== '') {
    const parsed = new Date(editor.weddingDate)
    if (!isNaN(parsed.getTime())) {
      merged.weddingDate = parsed
    }
  }

  // Gallery images: editor has {src, alt, span}, template uses string[]
  if (editor.galleryImages && editor.galleryImages.length > 0) {
    const mapped = editor.galleryImages
      .map((img) => img.src)
      .filter((src) => src && src.trim() !== '')
    if (mapped.length > 0) {
      merged.galleryImages = mapped
    }
  }

  // Events: merge with existing template events to preserve nameHindi/image
  if (editor.events && editor.events.length > 0) {
    merged.events = editor.events.map((editorEvent, i) => {
      const baseEvent = base.events[i]
      return {
        id: editorEvent.id || baseEvent?.id || `event-${i}`,
        name: str(editorEvent.name, baseEvent?.name || '') as string,
        nameHindi: baseEvent?.nameHindi || '',
        date: str(editorEvent.date, baseEvent?.date || '') as string,
        time: str(editorEvent.time, baseEvent?.time || '') as string,
        venue: str(editorEvent.venue, baseEvent?.venue || '') as string,
        venueAddress: str(editorEvent.venueAddress, baseEvent?.venueAddress || '') as string,
        venueMapLink: str(editorEvent.venueMapLink, baseEvent?.venueMapLink || '') as string,
        image: baseEvent?.image || '',
        color: str(editorEvent.color, baseEvent?.color) as string | undefined,
      }
    })
  }

  // Couple story: merge with existing to preserve titleHindi
  if (editor.coupleStory && editor.coupleStory.length > 0) {
    merged.coupleStory = editor.coupleStory.map((editorItem, i) => {
      const baseItem = base.coupleStory[i]
      return {
        date: str(editorItem.date, baseItem?.date || '') as string,
        title: str(editorItem.title, baseItem?.title || '') as string,
        titleHindi: baseItem?.titleHindi || '',
        description: str(editorItem.description, baseItem?.description || '') as string,
        image: str(editorItem.image, baseItem?.image) as string | undefined,
      }
    })
  }

  // Venue
  if (editor.venueName || editor.venueAddress || editor.venueMapUrl) {
    merged.venue = {
      name: str(editor.venueName, base.venue.name) as string,
      address: str(editor.venueAddress, base.venue.address) as string,
      mapLink: str(editor.venueMapUrl, base.venue.mapLink) as string,
    }
  }

  // RSVP
  if (editor.rsvpPhone || editor.rsvpMessage) {
    merged.rsvp = {
      ...base.rsvp,
      whatsappNumber: str(editor.rsvpPhone, base.rsvp.whatsappNumber) as string,
      whatsappMessage: str(editor.rsvpMessage, base.rsvp.whatsappMessage) as string,
    }
  }

  // Social links
  if (editor.instagram) {
    merged.socialLinks = {
      ...base.socialLinks,
      instagram: str(editor.instagram, base.socialLinks.instagram) as string | undefined,
    }
  }

  return merged
}

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingConfig>(defaultData)

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'VIVAHPATRA_UPDATE' && event.data.data) {
        const editorData = event.data.data as EditorFormData
        setData((prev) => mapEditorToConfig(editorData, prev))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <WeddingDataContext.Provider value={data}>
      {children}
    </WeddingDataContext.Provider>
  )
}

export function useWeddingData(): WeddingConfig {
  return useContext(WeddingDataContext)
}
