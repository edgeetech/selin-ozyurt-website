import { describe, it, expect, beforeEach } from 'vitest'
import i18n from '../i18n'
import enLocale from '../locales/en.json'
import { fireEvent, renderWithProviders as render, screen } from '../test-utils'
import AIBanner from './AIBanner'

describe('AIBanner', () => {
  beforeEach(async () => {
    localStorage.clear()
    await i18n.changeLanguage('en')
  })

  it('renders the AI banner below the navbar layout as a note', () => {
    render(<AIBanner />)

    expect(screen.getByRole('note', { name: enLocale.aiBanner.ariaLabel })).toBeInTheDocument()
    expect(screen.getByText(enLocale.aiBanner.message)).toBeInTheDocument()
    expect(screen.getByText(enLocale.aiBanner.status)).toBeInTheDocument()
  })

  it('can be dismissed', () => {
    render(<AIBanner />)

    fireEvent.click(screen.getByRole('button', { name: enLocale.aiBanner.dismiss }))

    expect(screen.queryByRole('note', { name: enLocale.aiBanner.ariaLabel })).not.toBeInTheDocument()
    expect(localStorage.getItem('ai-banner-dismissed')).toBe('true')
  })
})
