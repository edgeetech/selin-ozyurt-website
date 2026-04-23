import { renderWithProviders as render, screen, fireEvent } from '../test-utils'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import ContactPage from './ContactPage'

// Turkish is the default language configured in setupTests.ts

describe('ContactPage', () => {
  // ── Basic render ──────────────────────────────────────────────────────────

  it('renders without crash', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.body).toBeTruthy()
  })

  // ── i18n: all visible text comes from translation keys ────────────────────

  it('renders page title from i18n key (contact.title)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value for contact.title is "İletişim"
    expect(screen.getByRole('heading', { level: 1, name: 'İletişim' })).toBeInTheDocument()
  })

  it('renders page subtitle from i18n key (contact.subtitle)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "Bize ulaşın"
    expect(screen.getByText('Bize ulaşın')).toBeInTheDocument()
  })

  it('renders info section heading from i18n key (contact.infoHeading)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'İletişim Bilgileri' })).toBeInTheDocument()
  })

  it('renders form section heading from i18n key (contact.formHeading)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { name: 'Mesaj Gönderin' })).toBeInTheDocument()
  })

  it('renders address value from i18n key (contact.addressValue)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByText('Adana, Türkiye')).toBeInTheDocument()
  })

  // ── Form fields present ───────────────────────────────────────────────────

  it('renders Name input field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.getElementById('name')).toBeInTheDocument()
  })

  it('renders Email input field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.getElementById('email')).toBeInTheDocument()
  })

  it('renders Message textarea field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.getElementById('message')).toBeInTheDocument()
  })

  it('renders submit button with i18n label (contact.form.submit)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "Mesaj Gönder"
    expect(screen.getByRole('button', { name: 'Mesaj Gönder' })).toBeInTheDocument()
  })

  it('renders Name label from i18n key (contact.form.namePlaceholder)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Label text is "İsim" (Turkish), associated with the name input via htmlFor
    expect(screen.getByLabelText('İsim')).toBeInTheDocument()
  })

  it('renders Email label from i18n key (contact.form.emailPlaceholder)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('E-posta')).toBeInTheDocument()
  })

  it('renders Message label from i18n key (contact.form.messagePlaceholder)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(screen.getByLabelText('Mesaj')).toBeInTheDocument()
  })

  // ── Form validation ───────────────────────────────────────────────────────

  it('shows name required error (i18n key contact.errors.nameRequired) on empty submit', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen adınızı girin.')).toBeInTheDocument()
  })

  it('shows email required error (i18n key contact.errors.emailRequired) on empty submit', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen e-posta adresinizi girin.')).toBeInTheDocument()
  })

  it('shows message required error (i18n key contact.errors.messageRequired) on empty submit', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen bir mesaj girin.')).toBeInTheDocument()
  })

  it('shows all three validation errors simultaneously on empty submit', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getAllByRole('alert')).toHaveLength(3)
  })

  it('shows invalid email error (i18n key contact.errors.emailInvalid) when email lacks @', () => {
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

  it('does not submit (no success message) when form is invalid', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('clears name error when user starts typing in name field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen adınızı girin.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('İsim'), { target: { name: 'name', value: 'A' } })
    expect(screen.queryByText('Lütfen adınızı girin.')).not.toBeInTheDocument()
  })

  it('clears email error when user starts typing in email field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen e-posta adresinizi girin.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { name: 'email', value: 'a@b.com' } })
    expect(screen.queryByText('Lütfen e-posta adresinizi girin.')).not.toBeInTheDocument()
  })

  it('clears message error when user starts typing in message field', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.getByText('Lütfen bir mesaj girin.')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Mesaj'), { target: { name: 'message', value: 'Hi' } })
    expect(screen.queryByText('Lütfen bir mesaj girin.')).not.toBeInTheDocument()
  })

  it('shows success message (i18n key contact.successMessage) after valid submission', () => {
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
    expect(
      screen.getByText('Mesajınız için teşekkürler. En kısa sürede size geri döneceğim.')
    ).toBeInTheDocument()
  })

  it('hides form after successful submission', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByLabelText('İsim'), { target: { name: 'name', value: 'Test User' } })
    fireEvent.change(screen.getByLabelText('E-posta'), { target: { name: 'email', value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText('Mesaj'), { target: { name: 'message', value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    expect(screen.queryByRole('button', { name: 'Mesaj Gönder' })).not.toBeInTheDocument()
  })

  // ── Contact info rendered via ref (phone/email present in DOM) ────────────

  it('renders phone span with aria-label from i18n key (contact.phoneAriaLabel)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "Telefon numarası"
    const phoneSpan = document.querySelector('[aria-label="Telefon numarası"]')
    expect(phoneSpan).toBeInTheDocument()
  })

  it('renders email span with aria-label from i18n key (contact.emailAriaLabel)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "E-posta adresi"
    const emailSpan = document.querySelector('[aria-label="E-posta adresi"]')
    expect(emailSpan).toBeInTheDocument()
  })

  it('injects decoded phone number into span via useEffect ref', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const phoneSpan = document.querySelector('[aria-label="Telefon numarası"]')
    // Decoded phone: reverse of '0021 654 123 )0(09 0+'
    expect(phoneSpan?.textContent).toBe('+0 90(0) 321 456 1200')
  })

  it('injects decoded email address into span via useEffect ref', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const emailSpan = document.querySelector('[aria-label="E-posta adresi"]')
    // Decoded email: reverse of 'moc.trayuzniles@ofni'
    expect(emailSpan?.textContent).toBe('info@selinzuyart.com')
  })

  // ── Secondary location (Cambridge, UK) ───────────────────────────────────

  it('renders secondary location heading from i18n key (contact.address2Label)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value for contact.address2Label: "İkinci Ofis"
    expect(screen.getByRole('heading', { level: 3, name: 'İkinci Ofis' })).toBeInTheDocument()
  })

  it('renders Cambridge map region with aria-label from i18n key (contact.map2Title)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "Ofis Konumu — Cambridge, Birleşik Krallık"
    expect(
      screen.getByRole('region', { name: 'Ofis Konumu — Cambridge, Birleşik Krallık' })
    ).toBeInTheDocument()
  })

  it('Cambridge map is centred on Cambridge, UK (52.2053, 0.1218)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const maps = document.querySelectorAll('[data-testid="map-container"]')
    expect(maps.length).toBe(2)
    expect(maps[1].getAttribute('data-center')).toBe('52.2053,0.1218')
    const markers = document.querySelectorAll('[data-testid="map-marker"]')
    expect(markers[1].getAttribute('data-position')).toBe('52.2053,0.1218')
  })

  // ── OpenStreetMap raster map (Leaflet, no WebGL) ─────────────────────────

  it('renders OpenStreetMap raster tile layer (no iframe, no WebGL)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    expect(document.querySelector('iframe')).not.toBeInTheDocument()
    const tiles = document.querySelectorAll('[data-testid="tile-layer"]')
    expect(tiles.length).toBe(2)
    expect(tiles[0].getAttribute('data-url')).toContain('tile.openstreetmap.org')
  })

  it('Adana map is centred on Adana (37.0, 35.3213)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const maps = document.querySelectorAll('[data-testid="map-container"]')
    expect(maps[0].getAttribute('data-center')).toBe('37,35.3213')
    expect(maps[0].getAttribute('data-zoom')).toBe('12')
    const markers = document.querySelectorAll('[data-testid="map-marker"]')
    expect(markers[0].getAttribute('data-position')).toBe('37,35.3213')
  })

  it('Adana map has aria-label from i18n key (contact.mapTitle)', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    // Turkish value: "Ofis Konumu — Adana, Türkiye"
    expect(
      screen.getByRole('region', { name: 'Ofis Konumu — Adana, Türkiye' })
    ).toBeInTheDocument()
  })

  // ── Accessibility ─────────────────────────────────────────────────────────

  it('name input has aria-invalid=false when no error', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    const nameInput = document.getElementById('name')
    expect(nameInput).toHaveAttribute('aria-invalid', 'false')
  })

  it('name input has aria-invalid=true after empty submit', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    const nameInput = document.getElementById('name')
    expect(nameInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('error spans have role=alert for accessibility', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Mesaj Gönder' }))
    const alerts = screen.getAllByRole('alert')
    expect(alerts.length).toBeGreaterThanOrEqual(1)
  })
})
