/**
 * Tests for the new landing page features added in task 821bb3b7:
 *  - Blog post strip (recent posts with title, date, and link to /blog/:slug)
 *  - Hero section Unsplash architectural background image via CSS custom property
 *  - i18n: HomePage.recentPosts and HomePage.allPosts keys in all three locales
 */
import { renderWithProviders as render, screen, within } from '../test-utils'
import { describe, it, expect, afterAll } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import i18n from 'i18next'
import '../i18n'
import { blogPosts } from '../data/blogPosts'
import HomePage from './HomePage'

// Default language in setupTests.ts is 'tr'

describe('HomePage — blog post strip', () => {
  it('renders the recent posts strip section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // The section has aria-label from t('HomePage.recentPosts') — Turkish: 'Son Yazılar'
    expect(screen.getByRole('region', { name: /son yazılar/i })).toBeInTheDocument()
  })

  it('renders exactly 3 post links in the strip', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const strip = screen.getByRole('region', { name: /son yazılar/i })
    const listItems = within(strip).getAllByRole('listitem')
    expect(listItems).toHaveLength(3)
  })

  it('shows the 3 most-recent posts sorted newest-first', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const sorted = [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)

    sorted.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  it('does NOT show posts that fall outside the 3-most-recent window', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const sorted = [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

    // Posts at index 3+ should not appear in the strip
    sorted.slice(3).forEach((post) => {
      expect(screen.queryByText(post.title)).not.toBeInTheDocument()
    })
  })

  it('each post link navigates to /blog/:slug', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const sorted = [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)

    sorted.forEach((post) => {
      const link = screen.getByText(post.title).closest('a')
      expect(link).toHaveAttribute('href', `/blog/${post.slug}`)
    })
  })

  it('each post item shows a <time> element with a dateTime attribute matching publishedAt', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const sorted = [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)

    const timeElements = screen.getAllByRole('time')
    const dateTimes = timeElements.map((el) => el.getAttribute('dateTime'))

    sorted.forEach((post) => {
      expect(dateTimes).toContain(post.publishedAt)
    })
  })

  it('renders the "All Posts" link pointing to /blog', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Turkish: 'Tüm Yazılar'
    const allPostsLink = screen.getByRole('link', { name: /tüm yazılar/i })
    expect(allPostsLink).toHaveAttribute('href', '/blog')
  })

  it('renders the strip label via t("HomePage.recentPosts") — no hardcoded text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // In Turkish the key resolves to 'Son Yazılar'
    expect(screen.getAllByText('Son Yazılar').length).toBeGreaterThanOrEqual(1)
  })
})

describe('HomePage — hero background image', () => {
  it('applies the --hero-bg CSS custom property on the hero section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // The hero <section> carries the inline style with --hero-bg set to the Unsplash URL
    const heroSection = screen
      .getByRole('region', { name: /son yazılar/i })
      .previousElementSibling as HTMLElement | null

    // Locate the hero section by its style attribute
    const sections = document.querySelectorAll('section')
    const heroEl = Array.from(sections).find((s) =>
      (s as HTMLElement).style.getPropertyValue('--hero-bg').includes('unsplash.com'),
    ) as HTMLElement | undefined

    expect(heroEl).toBeDefined()
    expect((heroEl as HTMLElement).style.getPropertyValue('--hero-bg')).toMatch(/unsplash\.com/)

    void heroSection // silence unused-var lint
  })

  it('hero section contains an overlay element (aria-hidden)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const overlay = document.querySelector('[aria-hidden="true"]')
    expect(overlay).toBeInTheDocument()
  })
})

describe('HomePage — i18n locale coverage', () => {
  it('en locale has HomePage.recentPosts key', async () => {
    await i18n.changeLanguage('en')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Recent Writing').length).toBeGreaterThanOrEqual(1)
    await i18n.changeLanguage('tr')
  })

  it('en locale has HomePage.allPosts key', async () => {
    await i18n.changeLanguage('en')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'All Posts' })).toBeInTheDocument()
    await i18n.changeLanguage('tr')
  })

  it('es locale has HomePage.recentPosts key', async () => {
    await i18n.changeLanguage('es')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Escritura Reciente').length).toBeGreaterThanOrEqual(1)
    await i18n.changeLanguage('tr')
  })

  it('es locale has HomePage.allPosts key', async () => {
    await i18n.changeLanguage('es')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Todos los Artículos' })).toBeInTheDocument()
    await i18n.changeLanguage('tr')
  })

  it('tr locale has HomePage.recentPosts key (default language)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Son Yazılar').length).toBeGreaterThanOrEqual(1)
  })

  it('tr locale has HomePage.allPosts key (default language)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Tüm Yazılar' })).toBeInTheDocument()
  })

  it('no translation key falls back to the raw key string (all three locales)', async () => {
    const keysToCheck = ['HomePage.recentPosts', 'HomePage.allPosts']
    const langs = ['en', 'tr', 'es']

    for (const lang of langs) {
      for (const key of keysToCheck) {
        // If i18n resolves the key, the value must NOT equal the raw key name
        const resolved = i18n.t(key, { lng: lang })
        expect(resolved).not.toBe(key)
        expect(resolved.length).toBeGreaterThan(0)
      }
    }
  })

  it('all blog post titles shown in strip contain no raw i18n key text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Strip uses post.title from blogPosts data directly, not a t() key
    // Verify the rendered titles match the actual data (not a missing-key fallback)
    const sorted = [...blogPosts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3)

    sorted.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
    })
  })

  afterAll(async () => {
    await i18n.changeLanguage('tr')
  })
})
