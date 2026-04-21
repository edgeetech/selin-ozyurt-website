import { renderWithProviders as render, screen } from './test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import './i18n'
import App from './App'
import HomePage from './pages/HomePage'

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('renders a nav element', () => {
    render(<App />)
    const nav = document.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('renders nav links for home, projects, and contact (Turkish default)', () => {
    render(<App />)
    expect(screen.getByText('Anasayfa')).toBeInTheDocument()
    expect(screen.getByText('Projeler')).toBeInTheDocument()
    expect(screen.getByText('İletişim')).toBeInTheDocument()
  })
})

describe('HomePage', () => {
  it('shows Version A hero (Turkish default)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    expect(screen.getByText('Mimarlık en saf haliyle.')).toBeInTheDocument()
  })
})
