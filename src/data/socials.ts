import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import type { IconType } from 'react-icons'

export interface SocialEntry {
  platform: string
  href: string
  ariaLabelKey: string
  icon: IconType
}

const socials: SocialEntry[] = [
  {
    platform: 'Instagram',
    href: 'https://instagram.com/selinozyurt',
    ariaLabelKey: 'socials.ariaInstagram',
    icon: FaInstagram,
  },
  {
    platform: 'LinkedIn',
    href: 'https://linkedin.com/in/selinozyurt',
    ariaLabelKey: 'socials.ariaLinkedIn',
    icon: FaLinkedin,
  },
  {
    platform: 'Email',
    href: 'mailto:info@selinozyurt.com',
    ariaLabelKey: 'socials.ariaEmail',
    icon: MdEmail,
  },
]

export default socials
