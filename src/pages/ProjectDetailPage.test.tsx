import { renderWithProviders as render, screen } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import ProjectDetailPage from './ProjectDetailPage'
import { projects } from '../data/projects'

function renderWithId(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/projects/${id}`]}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProjectDetailPage — basic render', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders without crashing for a known id', () => {
    renderWithId('bosphorus-villa')
    expect(document.body).toBeTruthy()
  })

  it('renders the project title as an h1 heading', () => {
    renderWithId('bosphorus-villa')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Bosphorus Villa' })
    ).toBeInTheDocument()
  })

  it('renders the project description', () => {
    renderWithId('bosphorus-villa')
    expect(
      screen.getByText(/contemporary villa on the European shore/)
    ).toBeInTheDocument()
  })

  it('renders a hero image with the project title as alt text', () => {
    renderWithId('bosphorus-villa')
    const heroImg = document.querySelector('img')
    expect(heroImg).toBeInTheDocument()
    expect(heroImg?.getAttribute('alt')).toBe('Bosphorus Villa')
    expect(heroImg?.getAttribute('src')).toContain('unsplash.com')
  })

  it('renders the back link pointing to /projects (Turkish)', () => {
    renderWithId('bosphorus-villa')
    const backLink = screen.getByRole('link', { name: /Projelere Dön/i })
    expect(backLink).toHaveAttribute('href', '/projects')
  })

  it('renders the back link in English when lang is en', async () => {
    await i18n.changeLanguage('en')
    renderWithId('bosphorus-villa')
    const backLink = screen.getByRole('link', { name: /Back to Projects/i })
    expect(backLink).toHaveAttribute('href', '/projects')
  })

  it('renders the back link in Spanish when lang is es', async () => {
    await i18n.changeLanguage('es')
    renderWithId('bosphorus-villa')
    const backLink = screen.getByRole('link', { name: /Volver a Proyectos/i })
    expect(backLink).toHaveAttribute('href', '/projects')
  })

  it('renders the category label using a translation key (Turkish)', async () => {
    await i18n.changeLanguage('tr')
    renderWithId('bosphorus-villa')
    // Bosphorus Villa is Residential → tr: "Konut"
    expect(screen.getByText('Konut')).toBeInTheDocument()
  })

  it('renders rich HTML content via dangerouslySetInnerHTML (h2 headings)', () => {
    renderWithId('bosphorus-villa')
    const h2s = document.querySelectorAll('h2')
    expect(h2s.length).toBeGreaterThanOrEqual(2)
    const texts = Array.from(h2s).map((h) => h.textContent)
    expect(texts).toContain('Site and Setting')
    expect(texts).toContain('Material Strategy')
  })

  it('renders a <figure> with an <img> and <figcaption> inside content', () => {
    renderWithId('bosphorus-villa')
    const figure = document.querySelector('figure')
    expect(figure).toBeInTheDocument()
    const figImg = figure?.querySelector('img')
    expect(figImg).toBeInTheDocument()
    expect(figImg?.getAttribute('src')).toContain('unsplash.com')
    expect(figImg?.getAttribute('alt')).not.toBe('')
    const figcaption = figure?.querySelector('figcaption')
    expect(figcaption).toBeInTheDocument()
    expect(figcaption?.textContent).toContain('lower terrace at dusk')
  })
})

describe('ProjectDetailPage — unknown slug', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders the not-found message for an unknown id', () => {
    renderWithId('non-existent-project')
    expect(
      screen.getByText('Aradığınız sayfa mevcut değil veya taşınmış olabilir.')
    ).toBeInTheDocument()
  })

  it('renders the back link even when the project is not found', () => {
    renderWithId('non-existent-project')
    const backLink = screen.getByRole('link', { name: /Projelere Dön/i })
    expect(backLink).toHaveAttribute('href', '/projects')
  })
})

describe('ProjectDetailPage — all 8 slugs render correctly', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders a detail page for every project in the data array', () => {
    projects.forEach((project) => {
      const { unmount } = renderWithId(project.id)
      expect(
        screen.getByRole('heading', { level: 1, name: project.title })
      ).toBeInTheDocument()
      unmount()
    })
  })

  it('every project detail page has a hero image with a valid Unsplash URL', () => {
    projects.forEach((project) => {
      const { unmount } = renderWithId(project.id)
      const heroImg = document.querySelector('img')
      expect(heroImg).toBeInTheDocument()
      expect(heroImg?.getAttribute('src')).toContain('unsplash.com')
      unmount()
    })
  })

  it('every project detail page has at least one h2 inside content', () => {
    projects.forEach((project) => {
      const { unmount } = renderWithId(project.id)
      const h2s = document.querySelectorAll('h2')
      expect(h2s.length).toBeGreaterThanOrEqual(1)
      unmount()
    })
  })

  it('every project detail page has a figure image in the rich content', () => {
    projects.forEach((project) => {
      const { unmount } = renderWithId(project.id)
      const figure = document.querySelector('figure')
      expect(figure).toBeInTheDocument()
      const figImg = figure?.querySelector('img')
      expect(figImg).toBeInTheDocument()
      expect(figImg?.getAttribute('src')).toContain('unsplash.com')
      unmount()
    })
  })
})

describe('ProjectDetailPage — individual slugs spot checks', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders Ataköy Residence', () => {
    renderWithId('atakoy-residence')
    expect(screen.getByRole('heading', { level: 1, name: 'Ataköy Residence' })).toBeInTheDocument()
  })

  it('renders Levent Tower with Commercial category', async () => {
    await i18n.changeLanguage('en')
    renderWithId('levent-tower')
    expect(screen.getByRole('heading', { level: 1, name: 'Levent Tower' })).toBeInTheDocument()
    expect(screen.getByText('Commercial')).toBeInTheDocument()
  })

  it('renders Grand Bazaar Boutique', () => {
    renderWithId('grand-bazaar-boutique')
    expect(screen.getByRole('heading', { level: 1, name: 'Grand Bazaar Boutique' })).toBeInTheDocument()
  })

  it('renders Nişantaşı Loft with Interior category (Turkish)', () => {
    renderWithId('nisantasi-loft')
    expect(screen.getByRole('heading', { level: 1, name: 'Nişantaşı Loft' })).toBeInTheDocument()
    expect(screen.getByText('İç Mekan')).toBeInTheDocument()
  })

  it('renders Kalamış Penthouse', () => {
    renderWithId('kalamis-penthouse')
    expect(screen.getByRole('heading', { level: 1, name: 'Kalamış Penthouse' })).toBeInTheDocument()
  })

  it('renders Belgrade Forest Garden with Landscape category (Turkish)', () => {
    renderWithId('belgrade-forest-garden')
    expect(screen.getByRole('heading', { level: 1, name: 'Belgrade Forest Garden' })).toBeInTheDocument()
    expect(screen.getByText('Peyzaj')).toBeInTheDocument()
  })

  it("renders Prince's Islands Retreat", () => {
    renderWithId('princes-islands-retreat')
    expect(screen.getByRole('heading', { level: 1, name: "Prince's Islands Retreat" })).toBeInTheDocument()
  })
})

describe('ProjectDetailPage — translation keys coverage', () => {
  it('projects.detail.back key exists in all three locales', async () => {
    const en = (await import('../locales/en.json')).default
    const tr = (await import('../locales/tr.json')).default
    const es = (await import('../locales/es.json')).default
    // TypeScript can't narrow JSON deeply, so use optional chaining
    type LocaleShape = { projects?: { detail?: { back?: string } } }
    expect((en as LocaleShape).projects?.detail?.back).toBeTruthy()
    expect((tr as LocaleShape).projects?.detail?.back).toBeTruthy()
    expect((es as LocaleShape).projects?.detail?.back).toBeTruthy()
  })

  it('projects.categories keys exist in all three locales for all 4 categories', async () => {
    const en = (await import('../locales/en.json')).default
    const tr = (await import('../locales/tr.json')).default
    const es = (await import('../locales/es.json')).default
    type CatShape = { projects?: { categories?: Record<string, string> } }
    const categories = ['residential', 'commercial', 'interior', 'landscape']
    for (const cat of categories) {
      expect((en as CatShape).projects?.categories?.[cat]).toBeTruthy()
      expect((tr as CatShape).projects?.categories?.[cat]).toBeTruthy()
      expect((es as CatShape).projects?.categories?.[cat]).toBeTruthy()
    }
  })
})
