'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import { WeddingConfig } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

/** Editor form data shape sent via postMessage from the showcase editor */
interface EditorFormData {
  groomFirst?: boolean
  groomName?: string
  brideName?: string
  groomParents?: string
  brideParents?: string
  groomSubtitle?: string
  brideSubtitle?: string
  weddingDate?: string
  hashtag?: string
  tagline?: string
  heroSubtitle?: string
  invitationHeading?: string
  invitationSubtitle?: string
  invitationBlessing?: string
  invitationText?: string
  rsvpHeading?: string
  rsvpText?: string
  heroImage?: string
  bridePhoto?: string
  groomPhoto?: string
  backgroundMusic?: string
  galleryImages?: Array<{ src: string; alt?: string; span?: number }>
  events?: Array<{
    id: string
    name: string
    emoji?: string
    image?: string
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
  infoCards?: Array<{ icon?: string; title?: string; description?: string }>
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
  merged.tagline = str(editor.tagline, base.tagline) as string | undefined
  merged.heroSubtitle = str(editor.heroSubtitle, base.heroSubtitle) as string | undefined
  merged.contactPhone = str(editor.rsvpPhone, base.contactPhone) as string
  merged.invitationHeading = str(editor.invitationHeading, base.invitationHeading) as string | undefined
  merged.invitationSubtitle = str(editor.invitationSubtitle, base.invitationSubtitle) as string | undefined
  merged.invitationBlessing = str(editor.invitationBlessing, base.invitationBlessing) as string | undefined
  merged.invitationText = str(editor.invitationText, base.invitationText) as string | undefined
  merged.rsvpHeading = str(editor.rsvpHeading, base.rsvpHeading) as string | undefined
  merged.rsvpText = str(editor.rsvpText, base.rsvpText) as string | undefined
  merged.rsvpDeadline = str(editor.rsvpDeadline, base.rsvpDeadline) as string | undefined

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
        image: str(editorEvent.image, baseEvent?.image || '') as string,
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

  // Section visibility
  if (editor.sections) {
    merged.sections = editor.sections as Record<string, boolean>
  }

  // Info cards
  if (editor.infoCards && editor.infoCards.length > 0) {
    merged.infoCards = editor.infoCards.map((editorCard: { icon?: string; title?: string; description?: string }, i: number) => {
      const baseCard = base.infoCards[i]
      return {
        icon: str(editorCard.icon, baseCard?.icon || '📌') as string,
        title: str(editorCard.title, baseCard?.title || '') as string,
        titleHindi: baseCard?.titleHindi || '',
        description: str(editorCard.description, baseCard?.description || '') as string,
      }
    })
  }

  // Name order swap
  if (editor.groomFirst === false) {
    merged.groomFirst = false
    const tmpName = merged.groomName; merged.groomName = merged.brideName; merged.brideName = tmpName
    const tmpParents = merged.groomParents; merged.groomParents = merged.brideParents; merged.brideParents = tmpParents
    if ("groomSubtitle" in merged && "brideSubtitle" in merged) { const tmpSub = merged.groomSubtitle; merged.groomSubtitle = merged.brideSubtitle; merged.brideSubtitle = tmpSub }
  }
  return merged
}

export function WeddingDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeddingConfig>(defaultData)
  const [ready, setReady] = useState(true)

  useEffect(() => {
    const inIframe = window.parent !== window
    if (inIframe) setReady(false)

    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'VIVAHPATRA_UPDATE' && event.data.data) {
        const editorData = event.data.data as EditorFormData
        setData((prev) => mapEditorToConfig(editorData, prev))
        setReady(true)
      }
    }

    window.addEventListener('message', handleMessage)

    if (inIframe) {
      window.parent.postMessage({ type: 'VIVAHPATRA_READY' }, '*')
      setTimeout(() => setReady(true), 4000)
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!ready) return null

  return (
    <WeddingDataContext.Provider value={data}>
      {children}
    </WeddingDataContext.Provider>
  )
}

export function useWeddingData(): WeddingConfig {
  return useContext(WeddingDataContext)
}
