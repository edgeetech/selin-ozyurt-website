import { renderWithProviders as render, screen } from '../test-utils'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import NotFoundPage from './NotFoundPage'

// Turkish is the default language configured in setupTests.ts

describe('NotFoundPage', () => {
  // ── Basic render ──────────────────────────────────────────────────────────

  it('renders without crash', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  // ── 404 code display ──────────────────────────────────────────────────────

  it('renders the 404 code text in the document', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders the 404 code element with aria-label from i18n key (notFound.codeAriaLabel)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    // Turkish value: "Hata kodu 404"
    expect(screen.getByLabelText('Hata kodu 404')).toBeInTheDocument()
  })

  // ── i18n: title and message ───────────────────────────────────────────────

  it('renders heading from i18n key (notFound.title)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    // Turkish value: "Sayfa Bulunamadı"
    expect(screen.getByRole('heading', { level: 1, name: 'Sayfa Bulunamadı' })).toBeInTheDocument()
  })

  it('renders message paragraph from i18n key (notFound.message)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    // Turkish value: "Aradığınız sayfa mevcut değil veya taşınmış olabilir."
    expect(
      screen.getByText('Aradığınız sayfa mevcut değil veya taşınmış olabilir.')
    ).toBeInTheDocument()
  })

  // ── Home link ─────────────────────────────────────────────────────────────

  it('renders a link back to "/" from i18n key (notFound.homeLink)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    // Turkish value: "← Anasayfaya Dön"
    const link = screen.getByRole('link', { name: '← Anasayfaya Dön' })
    expect(link).toBeInTheDocument()
  })

  it('home link points to "/" (root route)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: '← Anasayfaya Dön' })
    expect(link).toHaveAttribute('href', '/')
  })

  // ── i18n: no hardcoded English strings ───────────────────────────────────

  it('does not contain hardcoded English title "Page Not Found"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    // Default language is Turkish — English string must not appear
    expect(screen.queryByText('Page Not Found')).not.toBeInTheDocument()
  })

  it('does not contain hardcoded English message text', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(
      screen.queryByText('The page you are looking for does not exist or has been moved.')
    ).not.toBeInTheDocument()
  })

  it('does not contain hardcoded English home link text "Back to Homepage"', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.queryByText('← Back to Homepage')).not.toBeInTheDocument()
  })

  // ── Locale files contain all required notFound keys ───────────────────────

  it('en.json contains notFound.codeAriaLabel', async () => {
    const en = await import('../locales/en.json')
    expect((en as Record<string, unknown>).notFound).toBeDefined()
    expect((en.notFound as Record<string, string>).codeAriaLabel).toBeTruthy()
  })

  it('en.json contains notFound.title', async () => {
    const en = await import('../locales/en.json')
    expect((en.notFound as Record<string, string>).title).toBeTruthy()
  })

  it('en.json contains notFound.message', async () => {
    const en = await import('../locales/en.json')
    expect((en.notFound as Record<string, string>).message).toBeTruthy()
  })

  it('en.json contains notFound.homeLink', async () => {
    const en = await import('../locales/en.json')
    expect((en.notFound as Record<string, string>).homeLink).toBeTruthy()
  })

  it('tr.json contains notFound.codeAriaLabel', async () => {
    const tr = await import('../locales/tr.json')
    expect((tr as Record<string, unknown>).notFound).toBeDefined()
    expect((tr.notFound as Record<string, string>).codeAriaLabel).toBeTruthy()
  })

  it('tr.json contains notFound.title', async () => {
    const tr = await import('../locales/tr.json')
    expect((tr.notFound as Record<string, string>).title).toBeTruthy()
  })

  it('tr.json contains notFound.message', async () => {
    const tr = await import('../locales/tr.json')
    expect((tr.notFound as Record<string, string>).message).toBeTruthy()
  })

  it('tr.json contains notFound.homeLink', async () => {
    const tr = await import('../locales/tr.json')
    expect((tr.notFound as Record<string, string>).homeLink).toBeTruthy()
  })

  it('es.json contains notFound.codeAriaLabel', async () => {
    const es = await import('../locales/es.json')
    expect((es as Record<string, unknown>).notFound).toBeDefined()
    expect((es.notFound as Record<string, string>).codeAriaLabel).toBeTruthy()
  })

  it('es.json contains notFound.title', async () => {
    const es = await import('../locales/es.json')
    expect((es.notFound as Record<string, string>).title).toBeTruthy()
  })

  it('es.json contains notFound.message', async () => {
    const es = await import('../locales/es.json')
    expect((es.notFound as Record<string, string>).message).toBeTruthy()
  })

  it('es.json contains notFound.homeLink', async () => {
    const es = await import('../locales/es.json')
    expect((es.notFound as Record<string, string>).homeLink).toBeTruthy()
  })

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('page uses <main> as the landmark element', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('heading is an h1 (correct heading structure)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('home link is focusable (no tabIndex=-1)', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: '← Anasayfaya Dön' })
    expect(link).not.toHaveAttribute('tabIndex', '-1')
  })

  it('divider element is aria-hidden to avoid noise for screen readers', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )
    const divider = document.querySelector('[aria-hidden="true"]')
    expect(divider).toBeInTheDocument()
  })
})
