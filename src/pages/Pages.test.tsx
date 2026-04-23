import { renderWithProviders as render, screen, fireEvent } from '../test-utils'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '../i18n'
import ProjectsPage from './ProjectsPage'
import ProjectDetailPage from './ProjectDetailPage'
import ContactPage from './ContactPage'
import AboutPage from './AboutPage'

describe('ProjectsPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('renders the Projects heading (Turkish default)', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Projeler' })).toBeInTheDocument()
  })

  it('renders all 5 filter buttons (All + 4 categories)', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    // Turkish locale labels
    expect(screen.getByRole('button', { name: 'Tümü' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Konut' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ticari' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'İç Mekan' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Peyzaj' })).toBeInTheDocument()
  })

  it('shows all 8 project cards by default', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    // Each card is a link with an aria-label containing the project title
    expect(screen.getByRole('link', { name: /Bosphorus Villa/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Levent Tower/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Belgrade Forest Garden/i })).toBeInTheDocument()
  })

  it('renders project titles inside cards', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Bosphorus Villa' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Levent Tower' })).toBeInTheDocument()
  })

  it('card titles are present in the DOM without any interaction (always visible)', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    // All 8 project titles must be in the DOM immediately — no hover required
    expect(screen.getByRole('heading', { name: 'Bosphorus Villa' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ataköy Residence' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Levent Tower' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Grand Bazaar Boutique' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nişantaşı Loft' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Kalamış Penthouse' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Belgrade Forest Garden' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Prince's Islands Retreat" })).toBeInTheDocument()
  })

  it('card categories are present in the DOM without any interaction (always visible)', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    // Category spans must exist in the DOM at initial render — not hidden behind hover
    // Turkish locale is active by default in tests
    expect(screen.getAllByText('Konut').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Ticari').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('İç Mekan').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Peyzaj').length).toBeGreaterThanOrEqual(1)
  })

  it('each card has both a category span and an h2 title inside the card overlay', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    // Every project link must contain an h2 (title) — proves overlay is always in DOM
    const links = screen.getAllByRole('link').filter(
      (el) => el.getAttribute('href')?.startsWith('/projects/')
    )
    expect(links.length).toBe(8)
    links.forEach((link) => {
      expect(link.querySelector('h2')).toBeInTheDocument()
      expect(link.querySelector('span')).toBeInTheDocument()
    })
  })

  it('clicking Konut filter shows only Residential cards', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Konut' }))
    // Residential projects should be present
    expect(screen.getByRole('heading', { name: 'Bosphorus Villa' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ataköy Residence' })).toBeInTheDocument()
    // Non-residential projects should not be present
    expect(screen.queryByRole('heading', { name: 'Levent Tower' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Belgrade Forest Garden' })).not.toBeInTheDocument()
  })

  it('clicking Ticari filter shows only Commercial cards', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Ticari' }))
    expect(screen.getByRole('heading', { name: 'Levent Tower' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Grand Bazaar Boutique' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Bosphorus Villa' })).not.toBeInTheDocument()
  })

  it('card link navigates to /projects/:id', () => {
    render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    )
    const link = screen.getByRole('link', { name: /Bosphorus Villa/i })
    expect(link).toHaveAttribute('href', '/projects/bosphorus-villa')
  })
})

describe('ProjectDetailPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/projects/bosphorus-villa']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('shows the project title in the heading', () => {
    render(
      <MemoryRouter initialEntries={['/projects/bosphorus-villa']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Bosphorus Villa' })).toBeInTheDocument()
  })

  it('shows the back link', () => {
    render(
      <MemoryRouter initialEntries={['/projects/bosphorus-villa']}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Routes>
      </MemoryRouter>
    )
    const backLink = screen.getByRole('link', { name: /Projelere Dön/i })
    expect(backLink).toHaveAttribute('href', '/projects')
  })
})

describe('ContactPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('renders the Contact heading (Turkish default)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'İletişim' })).toBeInTheDocument()
  })

  it('shows validation errors when form is submitted empty', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen adınızı girin.')).toBeInTheDocument()
    expect(screen.getByText('Lütfen e-posta adresinizi girin.')).toBeInTheDocument()
    expect(screen.getByText('Lütfen bir mesaj girin.')).toBeInTheDocument()
  })

  it('shows invalid email error when email has no @', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByLabelText('İsim'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { name: 'email', value: 'notanemail' } })
    fireEvent.change(screen.getByLabelText('Mesaj'), { target: { name: 'message', value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen geçerli bir e-posta adresi girin.')).toBeInTheDocument()
  })

  it('shows success message after valid form submission', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByLabelText('İsim'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Mesaj'), { target: { name: 'message', value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Mesajınız için teşekkürler. En kısa sürede size geri döneceğim.')).toBeInTheDocument()
  })

  it('clears field error when user types in the field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Submit empty to trigger errors
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen adınızı girin.')).toBeInTheDocument()
    // Type in name field — error should clear
    fireEvent.change(screen.getByLabelText('İsim'), { target: { name: 'name', value: 'A' } })
    expect(screen.queryByText('Lütfen adınızı girin.')).not.toBeInTheDocument()
  })

  it('renders the OpenStreetMap raster map (Leaflet, no iframe/WebGL)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.querySelector('iframe')).not.toBeInTheDocument()
    const tile = document.querySelector('[data-testid="tile-layer"]')
    expect(tile).toBeInTheDocument()
    expect(tile?.getAttribute('data-url')).toContain('tile.openstreetmap.org')
  })

  it('renders Name, Email, Message fields and Submit button', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.getElementById('name')).toBeInTheDocument()
    expect(document.getElementById('email')).toBeInTheDocument()
    expect(document.getElementById('message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mesaj Gönder' })).toBeInTheDocument()
  })

  it('renders phone and email ref containers (JS-injected)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const phoneSpan = document.querySelector('[aria-label="Telefon numarası"]')
    const emailSpan = document.querySelector('[aria-label="E-posta adresi"]')
    expect(phoneSpan).toBeInTheDocument()
    expect(emailSpan).toBeInTheDocument()
  })
})

describe('AboutPage', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  it('renders the hero title (Turkish default)', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Hakkımda' })).toBeInTheDocument()
  })

  it('renders the bio section heading (Turkish default)', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Hikayem' })).toBeInTheDocument()
  })

  it('renders the philosophy section heading (Turkish default)', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Tasarım Felsefem' })).toBeInTheDocument()
  })
})
