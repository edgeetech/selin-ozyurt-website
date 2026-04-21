import { renderWithProviders as render, screen, fireEvent } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import BlogPage from './BlogPage'
import { blogPosts } from '../data/blogPosts'

describe('BlogPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('renders the hero title (Turkish: Günlük)', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Günlük' })).toBeInTheDocument()
  })

  it('renders the hero subtitle in Turkish', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(
      screen.getByText('Mimarlık, malzeme ve tasarım üzerine düşünceler')
    ).toBeInTheDocument()
  })

  it('renders all blog post cards', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getAllByRole('link')).toHaveLength(blogPosts.length)
  })

  it('renders all 5 blog post titles', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    blogPosts.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument()
    })
  })

  it('renders blog post excerpts', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    blogPosts.forEach((post) => {
      expect(screen.getByText(post.excerpt)).toBeInTheDocument()
    })
  })

  it('renders a search input', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const searchInput = screen.getByRole('searchbox')
    expect(searchInput).toBeInTheDocument()
  })

  it('search input has aria-label in Turkish', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'aria-label',
      'Blog yazılarını ara'
    )
  })

  it('search input has placeholder in Turkish', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Yazıları ara…'
    )
  })

  it('filtering by title shows matching post', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Biophilic' } })
    expect(
      screen.getByRole('heading', {
        name: 'Biophilic Design: Bringing Nature Into Architecture',
      })
    ).toBeInTheDocument()
    // Other posts should not be shown
    expect(
      screen.queryByRole('heading', {
        name: "Adaptive Reuse: Giving New Life to Adana's Historic Structures",
      })
    ).not.toBeInTheDocument()
  })

  it('filtering by excerpt content shows matching post', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'rain gardens' } })
    expect(
      screen.getByRole('heading', {
        name: 'Water as Structure: Landscape Architecture and the Hydrological Cycle',
      })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('search is case-insensitive', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'BIOPHILIC' } })
    expect(
      screen.getByRole('heading', {
        name: 'Biophilic Design: Bringing Nature Into Architecture',
      })
    ).toBeInTheDocument()
  })

  it('search with no matches shows noResults message', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'xyzzy-no-match-ever' } })
    expect(
      screen.getByText('Aramanızla eşleşen yazı bulunamadı.')
    ).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('clearing search restores all 5 posts', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Biophilic' } })
    expect(screen.getAllByRole('link')).toHaveLength(1)
    fireEvent.change(input, { target: { value: '' } })
    expect(screen.getAllByRole('link')).toHaveLength(blogPosts.length)
  })

  it('each card links to /blog/:slug', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    const links = screen.getAllByRole('link')
    links.forEach((link, i) => {
      expect(link).toHaveAttribute('href', `/blog/${blogPosts[i].slug}`)
    })
  })

  it('renders hero title in English when lang is en', async () => {
    await i18n.changeLanguage('en')
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Journal' })).toBeInTheDocument()
  })

  it('renders hero title in Spanish when lang is es', async () => {
    await i18n.changeLanguage('es')
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Diario' })).toBeInTheDocument()
  })

  it('renders the grid section with correct aria-label', () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    )
    expect(
      screen.getByRole('region', { name: 'Blog yazı listesi' })
    ).toBeInTheDocument()
  })
})
