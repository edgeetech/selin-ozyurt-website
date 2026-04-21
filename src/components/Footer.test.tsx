import { renderWithProviders as render, screen } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import '../i18n'
import i18n from '../i18n'
import enLocale from '../locales/en.json'
import trLocale from '../locales/tr.json'
import esLocale from '../locales/es.json'
import Footer from './Footer'

// ── Helper ────────────────────────────────────────────────────────────────────

function renderFooter() {
  return render(<Footer />)
}

// ── Rendering ────────────────────────────────────────────────────────────────

describe('Footer rendering', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders a <footer> element', () => {
    renderFooter()
    expect(document.querySelector('footer')).toBeInTheDocument()
  })

  it('renders a social nav landmark with aria-label', () => {
    renderFooter()
    expect(screen.getByRole('navigation', { name: 'Social media links' })).toBeInTheDocument()
  })

  it('renders exactly 3 social links', () => {
    renderFooter()
    // The nav contains 3 <a> elements
    const nav = screen.getByRole('navigation', { name: 'Social media links' })
    const links = nav.querySelectorAll('a')
    expect(links).toHaveLength(3)
  })

  it('renders an Instagram link', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Follow on Instagram' })).toBeInTheDocument()
  })

  it('renders a LinkedIn link', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toBeInTheDocument()
  })

  it('renders an Email link', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Send an email' })).toBeInTheDocument()
  })

  it('renders copyright paragraph', () => {
    renderFooter()
    const year = new Date().getFullYear()
    const para = document.querySelector('p')
    expect(para).toBeInTheDocument()
    expect(para?.textContent).toContain(String(year))
    expect(para?.textContent).toContain('Selin Özyurt')
  })
})

// ── Link hrefs ────────────────────────────────────────────────────────────────

describe('Footer social link hrefs', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('Instagram link points to the correct URL', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'Follow on Instagram' })
    expect(link).toHaveAttribute('href', 'https://instagram.com/selinozyurt')
  })

  it('LinkedIn link points to the correct URL', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'Connect on LinkedIn' })
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/selinozyurt')
  })

  it('Email link uses a mailto: href', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'Send an email' })
    expect(link.getAttribute('href')).toMatch(/^mailto:/)
  })

  it('Email link href is the correct mailto address', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'Send an email' })
    expect(link).toHaveAttribute('href', 'mailto:info@selinozyurt.com')
  })
})

// ── External link security attributes ────────────────────────────────────────

describe('Footer external links security attributes', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('Instagram link has target="_blank"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Follow on Instagram' })).toHaveAttribute('target', '_blank')
  })

  it('Instagram link has rel="noopener noreferrer"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Follow on Instagram' })).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('LinkedIn link has target="_blank"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toHaveAttribute('target', '_blank')
  })

  it('LinkedIn link has rel="noopener noreferrer"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('Email (mailto) link does NOT have target="_blank"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Send an email' })).not.toHaveAttribute('target')
  })

  it('Email (mailto) link does NOT have rel="noopener noreferrer"', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Send an email' })).not.toHaveAttribute('rel')
  })
})

// ── i18n aria-labels ──────────────────────────────────────────────────────────

describe('Footer social link aria-labels via i18n', () => {
  it('renders correct Turkish aria-labels for social links', async () => {
    await i18n.changeLanguage('tr')
    renderFooter()
    expect(screen.getByRole('link', { name: "Instagram'da takip edin" })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: "LinkedIn'de bağlanın" })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'E-posta gönderin' })).toBeInTheDocument()
  })

  it('renders correct Spanish aria-labels for social links', async () => {
    await i18n.changeLanguage('es')
    renderFooter()
    expect(screen.getByRole('link', { name: 'Seguir en Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Conectar en LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Enviar un correo electrónico' })).toBeInTheDocument()
  })

  it('renders correct English aria-labels for social links', async () => {
    await i18n.changeLanguage('en')
    renderFooter()
    expect(screen.getByRole('link', { name: 'Follow on Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Send an email' })).toBeInTheDocument()
  })
})

// ── i18n copyright text ───────────────────────────────────────────────────────

describe('Footer copyright text via i18n', () => {
  const year = new Date().getFullYear()

  it('shows English copyright text', async () => {
    await i18n.changeLanguage('en')
    renderFooter()
    const para = document.querySelector('p')
    expect(para?.textContent).toBe(`© ${year} Selin Özyurt.`)
  })

  it('shows Turkish copyright text', async () => {
    await i18n.changeLanguage('tr')
    renderFooter()
    const para = document.querySelector('p')
    expect(para?.textContent).toBe(`© ${year} Selin Özyurt.`)
  })

  it('shows Spanish copyright text', async () => {
    await i18n.changeLanguage('es')
    renderFooter()
    const para = document.querySelector('p')
    expect(para?.textContent).toBe(`© ${year} Selin Özyurt.`)
  })
})

// ── Locale file key presence ──────────────────────────────────────────────────

describe('Locale files contain required footer and socials keys', () => {
  const locales = [
    { name: 'en.json', locale: enLocale },
    { name: 'tr.json', locale: trLocale },
    { name: 'es.json', locale: esLocale },
  ]

  locales.forEach(({ name, locale }) => {
    it(`${name} contains footer.copyright`, () => {
      expect(locale.footer.copyright).toBeDefined()
      expect(typeof locale.footer.copyright).toBe('string')
      expect(locale.footer.copyright.length).toBeGreaterThan(0)
    })

    it(`${name} contains socials.ariaInstagram`, () => {
      expect(locale.socials.ariaInstagram).toBeDefined()
      expect(typeof locale.socials.ariaInstagram).toBe('string')
      expect(locale.socials.ariaInstagram.length).toBeGreaterThan(0)
    })

    it(`${name} contains socials.ariaLinkedIn`, () => {
      expect(locale.socials.ariaLinkedIn).toBeDefined()
      expect(typeof locale.socials.ariaLinkedIn).toBe('string')
      expect(locale.socials.ariaLinkedIn.length).toBeGreaterThan(0)
    })

    it(`${name} contains socials.ariaEmail`, () => {
      expect(locale.socials.ariaEmail).toBeDefined()
      expect(typeof locale.socials.ariaEmail).toBe('string')
      expect(locale.socials.ariaEmail.length).toBeGreaterThan(0)
    })

    it(`${name} contains socials.navAriaLabel`, () => {
      expect(locale.socials.navAriaLabel).toBeDefined()
      expect(typeof locale.socials.navAriaLabel).toBe('string')
      expect(locale.socials.navAriaLabel.length).toBeGreaterThan(0)
    })
  })
})
