export interface StoryMilestone {
  date: string
  title: string
  titleHindi: string
  description: string
  image?: string
}

export interface WeddingEvent {
  id: string
  name: string
  nameHindi: string
  date: string
  time: string
  venue: string
  venueAddress: string
  venueMapLink: string
  image: string
  color?: string
}

export interface InfoCard {
  icon: string
  title: string
  titleHindi: string
  description: string
}

export interface RSVPConfig {
  whatsappNumber: string
  whatsappMessage: string
  googleFormUrl: string
}

export interface SocialLinks {
  instagram?: string
  youtube?: string
}

export interface SEOConfig {
  title: string
  description: string
  ogImage: string
  url: string
}

export interface WeddingConfig {
  brideName: string
  groomName: string
  brideSubtitle?: string
  groomSubtitle?: string
  groomParents?: string
  brideParents?: string
  weddingDate: Date
  hashtag: string
  tagline?: string
  heroSubtitle?: string
  heroImage: string
  bridePhoto: string
  groomPhoto: string
  galleryImages: string[]
  invitationMusic: string
  invitationHeading?: string
  invitationSubtitle?: string
  invitationBlessing?: string
  invitationText?: string
  rsvpHeading?: string
  rsvpText?: string
  rsvpDeadline?: string
  coupleStory: StoryMilestone[]
  events: WeddingEvent[]
  infoCards: InfoCard[]
  rsvp: RSVPConfig
  socialLinks: SocialLinks
  seo: SEOConfig
  contactPhone: string
  venue: { name: string; address: string; mapLink: string }
}
