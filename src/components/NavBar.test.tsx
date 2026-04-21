import { renderWithProviders as render, screen, fireEvent, waitFor } from '../test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import '../i18n'
import i18n from '../i18n'
import enLocale from '../locales/en.json'
import trLocale from '../locales/tr.json'
import esLocale from '../locales/es.json'
import NavBar from './NavBar'
import LanguageSwitcher from './LanguageSwitcher'

describe('NavBar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(document.querySelector('nav')).toBeInTheDocument()
  })

  it('renders a link to Home (Turkish default)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Anasayfa')).toBeInTheDocument()
  })

  it('renders a link to Projects (Turkish default)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Projeler')).toBeInTheDocument()
  })

  it('renders a link to Contact (Turkish default)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('İletişim')).toBeInTheDocument()
  })

  it('renders all 4 nav links (Home, Projects, Contact, About)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    // 4 NavLink items (Home/Projects/Contact/About) plus 3 social <a> links = 7 total
    // We verify by checking the 4 translated nav labels are present as links
    expect(screen.getByRole('link', { name: 'Anasayfa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projeler' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'İletişim' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Hakkımda' })).toBeInTheDocument()
  })

  it('renders the language switcher trigger button', async () => {
    await i18n.changeLanguage('tr')
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
  })
})

describe('NavBar hamburger menu', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  function getHamburgerButton() {
    return screen.getByLabelText(/Gezinti menüsünü/)
  }

  it('hamburger button is present in the DOM', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    expect(button).toBeInTheDocument()
  })

  it('menu is initially closed (aria-expanded is false)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('menu list does not have navOpen class when initially closed', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const ul = document.querySelector('ul')
    expect(ul?.className).not.toContain('navOpen')
  })

  it('clicking hamburger opens the menu (aria-expanded becomes true)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('clicking hamburger adds navOpen class to the nav list', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    const ul = document.querySelector('ul')
    expect(ul?.className).toContain('navOpen')
  })

  it('clicking hamburger again closes the menu (toggle)', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('all nav links (Home, Projects, Contact, About) are present in the DOM', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByText('Anasayfa')).toBeInTheDocument()
    expect(screen.getByText('Projeler')).toBeInTheDocument()
    expect(screen.getByText('İletişim')).toBeInTheDocument()
    expect(screen.getByText('Hakkımda')).toBeInTheDocument()
  })

  it('LanguageSwitcher is present inside the nav', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const trigger = screen.getByRole('button', { name: /menüsünü/i })
    expect(trigger).toBeInTheDocument()
    // LanguageSwitcher trigger button is also present
    const langTrigger = document.querySelector('[aria-haspopup="listbox"]')
    expect(langTrigger).toBeInTheDocument()
  })

  it('clicking a NavLink closes the menu', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    const homeLink = screen.getByText('Anasayfa')
    fireEvent.click(homeLink)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking outside the nav closes the menu', async () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    fireEvent.mouseDown(document.body)
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('aria-label is nav.menuOpen value when menu is closed', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    expect(button).toHaveAttribute('aria-label', 'Gezinti menüsünü aç')
  })

  it('aria-label is nav.menuClose value when menu is open', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Gezinti menüsünü kapat')
  })

  it('aria-label switches back to menuOpen after closing', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = getHamburgerButton()
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Gezinti menüsünü aç')
  })
})

describe('i18n locale keys — nav.menuOpen and nav.menuClose', () => {
  it('en.json contains nav.menuOpen key', () => {
    expect(enLocale.nav.menuOpen).toBeDefined()
    expect(typeof enLocale.nav.menuOpen).toBe('string')
    expect(enLocale.nav.menuOpen.length).toBeGreaterThan(0)
  })

  it('en.json contains nav.menuClose key', () => {
    expect(enLocale.nav.menuClose).toBeDefined()
    expect(typeof enLocale.nav.menuClose).toBe('string')
    expect(enLocale.nav.menuClose.length).toBeGreaterThan(0)
  })

  it('tr.json contains nav.menuOpen key', () => {
    expect(trLocale.nav.menuOpen).toBeDefined()
    expect(typeof trLocale.nav.menuOpen).toBe('string')
    expect(trLocale.nav.menuOpen.length).toBeGreaterThan(0)
  })

  it('tr.json contains nav.menuClose key', () => {
    expect(trLocale.nav.menuClose).toBeDefined()
    expect(typeof trLocale.nav.menuClose).toBe('string')
    expect(trLocale.nav.menuClose.length).toBeGreaterThan(0)
  })

  it('es.json contains nav.menuOpen key', () => {
    expect(esLocale.nav.menuOpen).toBeDefined()
    expect(typeof esLocale.nav.menuOpen).toBe('string')
    expect(esLocale.nav.menuOpen.length).toBeGreaterThan(0)
  })

  it('es.json contains nav.menuClose key', () => {
    expect(esLocale.nav.menuClose).toBeDefined()
    expect(typeof esLocale.nav.menuClose).toBe('string')
    expect(esLocale.nav.menuClose.length).toBeGreaterThan(0)
  })
})

describe('i18n locale keys — language.*', () => {
  const locales = [
    { name: 'en.json', locale: enLocale },
    { name: 'tr.json', locale: trLocale },
    { name: 'es.json', locale: esLocale },
  ]

  const requiredKeys: Array<keyof typeof enLocale.language> = ['label', 'en', 'tr', 'es']

  locales.forEach(({ name, locale }) => {
    requiredKeys.forEach((key) => {
      it(`${name} contains language.${key} key`, () => {
        expect(locale.language[key]).toBeDefined()
        expect(typeof locale.language[key]).toBe('string')
        expect(locale.language[key].length).toBeGreaterThan(0)
      })
    })
  })
})

describe('LanguageSwitcher', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('tr')
  })

  // ── Trigger rendering ─────────────────────────────────────────────────────

  it('trigger renders with current language code (TR when lang is tr)', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger).toBeInTheDocument()
    // The trigger contains the current lang code
    expect(trigger.textContent).toContain('TR')
  })

  it('trigger renders with current language flag (🇹🇷 when lang is tr)', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger.textContent).toContain('🇹🇷')
  })

  it('trigger shows EN code and flag after switching to en', async () => {
    await i18n.changeLanguage('en')
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /select language/i })
    expect(trigger.textContent).toContain('EN')
    expect(trigger.textContent).toContain('🇬🇧')
  })

  // ── Dropdown closed by default ────────────────────────────────────────────

  it('dropdown is closed by default (no listbox in DOM)', () => {
    render(<LanguageSwitcher />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('trigger has aria-expanded="false" when dropdown is closed', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('trigger has aria-haspopup="listbox"', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
  })

  // ── Opening the dropdown ──────────────────────────────────────────────────

  it('clicking trigger opens the dropdown (listbox appears)', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('clicking trigger sets aria-expanded to "true"', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('opened dropdown shows exactly 3 options', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
  })

  it('opened dropdown shows TR, EN, ES options with flags', () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const listbox = screen.getByRole('listbox')
    expect(listbox.textContent).toContain('🇹🇷')
    expect(listbox.textContent).toContain('🇬🇧')
    expect(listbox.textContent).toContain('🇪🇸')
  })

  it('active option has aria-selected="true" (TR is active initially)', () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const trOption = options.find((o) => o.textContent?.includes('🇹🇷'))
    expect(trOption).toHaveAttribute('aria-selected', 'true')
  })

  it('inactive options have aria-selected="false"', () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const nonActive = options.filter((o) => !o.textContent?.includes('🇹🇷'))
    nonActive.forEach((o) => expect(o).toHaveAttribute('aria-selected', 'false'))
  })

  it('active option shows checkmark (✓)', () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const trOption = options.find((o) => o.textContent?.includes('🇹🇷'))
    expect(trOption?.textContent).toContain('✓')
  })

  // ── Selecting an option ───────────────────────────────────────────────────

  it('clicking EN option calls i18n.changeLanguage("en") and sets localStorage', async () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const enOption = options.find((o) => o.textContent?.includes('🇬🇧'))!
    fireEvent.click(enOption)
    await waitFor(() => {
      expect(i18n.language).toBe('en')
    })
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('clicking EN option closes the dropdown', async () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const enOption = options.find((o) => o.textContent?.includes('🇬🇧'))!
    fireEvent.click(enOption)
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('clicking ES option changes language to es and sets localStorage', async () => {
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /dil seçin/i }))
    const options = screen.getAllByRole('option')
    const esOption = options.find((o) => o.textContent?.includes('🇪🇸'))!
    fireEvent.click(esOption)
    await waitFor(() => {
      expect(i18n.language).toBe('es')
    })
    expect(localStorage.getItem('lang')).toBe('es')
  })

  it('clicking TR option (when EN active) sets language back to tr', async () => {
    await i18n.changeLanguage('en')
    render(<LanguageSwitcher />)
    fireEvent.click(screen.getByRole('button', { name: /select language/i }))
    const options = screen.getAllByRole('option')
    const trOption = options.find((o) => o.textContent?.includes('🇹🇷'))!
    fireEvent.click(trOption)
    await waitFor(() => {
      expect(i18n.language).toBe('tr')
    })
    expect(localStorage.getItem('lang')).toBe('tr')
  })

  it('shows EN as active when the current language resolves from en-US', async () => {
    await i18n.changeLanguage('en-US')
    render(<LanguageSwitcher />)

    expect(screen.getByRole('button', { name: /select language/i })).toHaveTextContent('EN')

    fireEvent.click(screen.getByRole('button', { name: /select language/i }))

    const options = screen.getAllByRole('option')
    const enOption = options.find((o) => o.textContent?.includes('🇬🇧'))
    expect(enOption).toHaveAttribute('aria-selected', 'true')
  })

  // ── Keyboard: Escape closes dropdown ─────────────────────────────────────

  it('pressing Escape closes the dropdown', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('pressing Escape sets aria-expanded back to "false"', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })
  })

  // ── Outside-click closes dropdown ─────────────────────────────────────────

  it('mousedown outside the component closes the dropdown', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.mouseDown(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('mousedown inside the component does NOT close the dropdown', async () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    const listbox = screen.getByRole('listbox')
    fireEvent.mouseDown(listbox)
    expect(screen.queryByRole('listbox')).toBeInTheDocument()
  })

  // ── Clicking trigger again toggles closed ────────────────────────────────

  it('clicking trigger again closes the dropdown (toggle)', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    fireEvent.click(trigger)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    fireEvent.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ── Chevron indicator ────────────────────────────────────────────────────

  it('trigger shows ▼ chevron when closed and ▲ when open', () => {
    render(<LanguageSwitcher />)
    const trigger = screen.getByRole('button', { name: /dil seçin/i })
    expect(trigger.textContent).toContain('▼')
    fireEvent.click(trigger)
    expect(trigger.textContent).toContain('▲')
  })
})
