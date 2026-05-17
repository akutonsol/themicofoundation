import hero from './hero'
import trustedBy from './trustedBy'
import legacyImpact from './legacyImpact'
import project from './project'
import communityImpact from './communityImpact'
import teamMessage from './teamMessage'           // ← Changed from './message'
import messagesSection from './messagesSection'
import donation from './donation'
import peopleImpact from './peopleImpact'
import newsEvent from './newsEvent'
import newsletterSettings from './newsletterSettings'
import publication from './publication'
import faq from './faq'
import testimonial from './testimonial'

export const schema = {
  types: [
    hero,
    trustedBy,
    legacyImpact,
    project,
    communityImpact,
    teamMessage,              // ← Changed from 'message'
    messagesSection,
    donation,
    peopleImpact,
    newsEvent,
    newsletterSettings,
    publication,
    faq,
    testimonial,
  ],
}