import { renderWithProviders as render, screen } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import BlogCard from './BlogCard'
import type { BlogPost } from '../data/blogPosts'
import enLocale from '../locales/en.json'
import trLocale from '../locales/tr.json'
import esLocale from '../locales/es.json'

const mockPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Architecture Post',
  excerpt: 'A compelling excerpt about architecture and design.',
  publishedAt: '2026-01-15T09:00:00Z',
  imageUrl: 'https://example.com/test.jpg',
  content: 'First paragraph.\n\nSecond paragraph.',
}

describe('BlogCard', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('renders as a link to /blog/:slug', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('link has aria-label containing the post title', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    const link = screen.getByRole('link')
    expect(link.getAttribute('aria-label')).toContain('Test Architecture Post')
  })

  it('renders the post title', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Test Architecture Post' })).toBeInTheDocument()
  })

  it('renders the post excerpt', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(screen.getByText('A compelling excerpt about architecture and design.')).toBeInTheDocument()
  })

  it('renders a <time> element with the publishedAt dateTime attribute', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    const time = document.querySelector('time')
    expect(time).toBeInTheDocument()
    expect(time?.getAttribute('dateTime')).toBe('2026-01-15T09:00:00Z')
  })

  it('renders the card image with empty alt and aria-hidden="true"', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    const img = document.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img?.getAttribute('alt')).toBe('')
    expect(img?.getAttribute('aria-hidden')).toBe('true')
    expect(img?.getAttribute('src')).toBe('https://example.com/test.jpg')
  })

  it('renders "Read more" / readMore text (Turkish: Devamını oku)', () => {
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(screen.getByText('Devamını oku')).toBeInTheDocument()
  })

  it('renders "Read more" in English when lang is en', async () => {
    await i18n.changeLanguage('en')
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(screen.getByText('Read more')).toBeInTheDocument()
  })

  it('renders "Leer más" in Spanish when lang is es', async () => {
    await i18n.changeLanguage('es')
    render(
      <MemoryRouter>
        <BlogCard post={mockPost} />
      </MemoryRouter>
    )
    expect(screen.getByText('Leer más')).toBeInTheDocument()
  })
})

describe('BlogCard i18n locale keys — blog namespace', () => {
  const locales = [
    { name: 'en.json', locale: enLocale },
    { name: 'tr.json', locale: trLocale },
    { name: 'es.json', locale: esLocale },
  ]

  const requiredBlogKeys: Array<keyof typeof enLocale.blog> = [
    'heroTitle',
    'heroSubtitle',
    'searchPlaceholder',
    'searchAriaLabel',
    'gridAriaLabel',
    'noResults',
    'readMore',
    'back',
    'publishedOn',
    'cardAriaLabel',
  ]

  locales.forEach(({ name, locale }) => {
    requiredBlogKeys.forEach((key) => {
      it(`${name} contains blog.${key} key`, () => {
        expect(locale.blog[key]).toBeDefined()
        expect(typeof locale.blog[key]).toBe('string')
        expect(locale.blog[key].length).toBeGreaterThan(0)
      })
    })
  })
})
