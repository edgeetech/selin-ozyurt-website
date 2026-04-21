import { renderWithProviders as render, screen } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import BlogDetailPage from './BlogDetailPage'
import { blogPosts } from '../data/blogPosts'

function renderWithSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('BlogDetailPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders without crashing for a known slug', () => {
    renderWithSlug('biophilic-design-principles')
    expect(document.body).toBeTruthy()
  })

  it('renders the post title as a heading', () => {
    renderWithSlug('biophilic-design-principles')
    expect(
      screen.getByRole('heading', {
        name: 'Biophilic Design: Bringing Nature Into Architecture',
      })
    ).toBeInTheDocument()
  })

  it('renders the post excerpt', () => {
    renderWithSlug('biophilic-design-principles')
    expect(
      screen.getByText(
        'Exploring how integrating natural elements into built spaces improves wellbeing, productivity, and connection to the environment.'
      )
    ).toBeInTheDocument()
  })

  it('renders a <time> element with the correct dateTime attribute', () => {
    renderWithSlug('biophilic-design-principles')
    const time = document.querySelector('time')
    expect(time).toBeInTheDocument()
    expect(time?.getAttribute('dateTime')).toBe('2026-01-15T09:00:00Z')
  })

  it('renders the post image with the post title as alt text', () => {
    renderWithSlug('biophilic-design-principles')
    const img = document.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img?.getAttribute('alt')).toBe('Biophilic Design: Bringing Nature Into Architecture')
  })

  it('renders post content paragraphs', () => {
    renderWithSlug('biophilic-design-principles')
    expect(
      screen.getByText(/Biophilic design is more than a trend/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/The core principle is simple/)
    ).toBeInTheDocument()
  })

  it('renders the back link to /blog (Turkish)', () => {
    renderWithSlug('biophilic-design-principles')
    const backLink = screen.getByRole('link', { name: /Blog'a Dön/i })
    expect(backLink).toHaveAttribute('href', '/blog')
  })

  it('renders the back link in English when lang is en', async () => {
    await i18n.changeLanguage('en')
    renderWithSlug('biophilic-design-principles')
    const backLink = screen.getByRole('link', { name: /Back to Blog/i })
    expect(backLink).toHaveAttribute('href', '/blog')
  })

  it('renders the back link in Spanish when lang is es', async () => {
    await i18n.changeLanguage('es')
    renderWithSlug('biophilic-design-principles')
    const backLink = screen.getByRole('link', { name: /Volver al Blog/i })
    expect(backLink).toHaveAttribute('href', '/blog')
  })

  it('renders for the second blog post (adaptive-reuse-adana)', () => {
    renderWithSlug('adaptive-reuse-adana')
    expect(
      screen.getByRole('heading', {
        name: "Adaptive Reuse: Giving New Life to Adana's Historic Structures",
      })
    ).toBeInTheDocument()
  })

  it('renders for the third blog post (materiality-in-residential-architecture)', () => {
    renderWithSlug('materiality-in-residential-architecture')
    expect(
      screen.getByRole('heading', {
        name: 'The Language of Materials in Residential Architecture',
      })
    ).toBeInTheDocument()
  })

  it('renders for the fourth blog post (compact-urban-living)', () => {
    renderWithSlug('compact-urban-living')
    expect(
      screen.getByRole('heading', {
        name: 'Compact Living: Designing for Density Without Sacrifice',
      })
    ).toBeInTheDocument()
  })

  it('renders for the fifth blog post (landscape-architecture-water)', () => {
    renderWithSlug('landscape-architecture-water')
    expect(
      screen.getByRole('heading', {
        name: 'Water as Structure: Landscape Architecture and the Hydrological Cycle',
      })
    ).toBeInTheDocument()
  })

  it('shows notFound message for an unknown slug', () => {
    renderWithSlug('non-existent-post-slug')
    // Should show notFound.message text
    expect(
      screen.getByText(
        'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'
      )
    ).toBeInTheDocument()
  })

  it('shows back link even for unknown slug', () => {
    renderWithSlug('non-existent-post-slug')
    const backLink = screen.getByRole('link', { name: /Blog'a Dön/i })
    expect(backLink).toHaveAttribute('href', '/blog')
  })

  it('renders all 5 blog posts correctly (spot check each has a title)', () => {
    blogPosts.forEach((post) => {
      const { unmount } = renderWithSlug(post.slug)
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
      unmount()
    })
  })
})

describe('BlogDetailPage — rich HTML content (dangerouslySetInnerHTML)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders h2 headings inside the content div', () => {
    renderWithSlug('biophilic-design-principles')
    // The content div should render <h2> elements from raw HTML
    const h2s = document.querySelectorAll('h2')
    expect(h2s.length).toBeGreaterThanOrEqual(2)
    const headingTexts = Array.from(h2s).map((h) => h.textContent)
    expect(headingTexts).toContain('Our Evolutionary Inheritance')
    expect(headingTexts).toContain('Practical Strategies')
  })

  it('renders a <ul> list with <li> items inside the content div', () => {
    renderWithSlug('biophilic-design-principles')
    const listItems = document.querySelectorAll('ul li')
    expect(listItems.length).toBeGreaterThanOrEqual(4)
    const itemTexts = Array.from(listItems).map((li) => li.textContent)
    expect(itemTexts.some((t) => t?.includes('cortisol'))).toBe(true)
  })

  it('renders <strong> elements inside the content', () => {
    renderWithSlug('biophilic-design-principles')
    // JSDOM renders raw HTML; find strong by querying all strong tags
    const allStrongs = document.querySelectorAll('strong')
    expect(allStrongs.length).toBeGreaterThan(0)
    const texts = Array.from(allStrongs).map((s) => s.textContent)
    expect(texts.some((t) => t?.includes('vast majority'))).toBe(true)
  })

  it('renders <em> elements inside the content', () => {
    renderWithSlug('biophilic-design-principles')
    const ems = document.querySelectorAll('em')
    expect(ems.length).toBeGreaterThan(0)
    const texts = Array.from(ems).map((e) => e.textContent)
    expect(texts.some((t) => t?.includes('orienting buildings'))).toBe(true)
  })

  it('renders a <figure> with an <img> and <figcaption> inside content', () => {
    renderWithSlug('biophilic-design-principles')
    const figure = document.querySelector('figure')
    expect(figure).toBeInTheDocument()
    const figImg = figure?.querySelector('img')
    expect(figImg).toBeInTheDocument()
    expect(figImg?.getAttribute('src')).toContain('unsplash.com')
    expect(figImg?.getAttribute('alt')).not.toBe('')
    const figcaption = figure?.querySelector('figcaption')
    expect(figcaption).toBeInTheDocument()
    expect(figcaption?.textContent).toContain('Belgrade Forest Garden')
  })

  it('renders content images with non-empty alt text (accessibility within content)', () => {
    renderWithSlug('biophilic-design-principles')
    const allImgs = Array.from(document.querySelectorAll('img'))
    // Hero image has empty alt; content figure images must have descriptive alt
    const contentImgs = allImgs.filter((img) => img.getAttribute('alt') !== '')
    expect(contentImgs.length).toBeGreaterThanOrEqual(1)
    expect(contentImgs[0].getAttribute('src')).toContain('unsplash.com')
  })

  it('renders an <ol> list in compact-urban-living post', () => {
    renderWithSlug('compact-urban-living')
    const olItems = document.querySelectorAll('ol li')
    expect(olItems.length).toBeGreaterThanOrEqual(3)
    const texts = Array.from(olItems).map((li) => li.textContent)
    expect(texts.some((t) => t?.includes('Borrowed light'))).toBe(true)
  })

  it('renders all 5 posts with at least one h2 in content', () => {
    blogPosts.forEach((post) => {
      const { unmount } = renderWithSlug(post.slug)
      const h2s = document.querySelectorAll('h2')
      expect(h2s.length).toBeGreaterThanOrEqual(1)
      unmount()
    })
  })

  it('renders all 5 posts with a figure image in content', () => {
    blogPosts.forEach((post) => {
      const { unmount } = renderWithSlug(post.slug)
      const figure = document.querySelector('figure')
      expect(figure).toBeInTheDocument()
      const figImg = figure?.querySelector('img')
      expect(figImg).toBeInTheDocument()
      expect(figImg?.getAttribute('src')).toContain('unsplash.com')
      unmount()
    })
  })
})

describe('BlogDetailPage — NavBar Blog link', () => {
  it('NavBar has a Blog nav link', async () => {
    await i18n.changeLanguage('tr')
    const { default: NavBar } = await import('../components/NavBar')
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    // In Turkish 'Blog' key is 'Blog' in tr.json nav
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
  })
})
