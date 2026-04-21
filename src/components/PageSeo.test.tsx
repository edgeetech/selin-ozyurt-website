import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '../i18n'
import i18n from '../i18n'
import PageSeo from './PageSeo'
import enLocale from '../locales/en.json'
import trLocale from '../locales/tr.json'
import esLocale from '../locales/es.json'

// react-helmet-async is mocked in setupTests.ts to a no-op Helmet.
// These tests verify: (a) the component renders without crashing with
// all prop combinations, and (b) the seo i18n namespace is fully populated
// across all three locale files.

describe('PageSeo component', () => {
  it('renders without crashing with required props only', () => {
    const { container } = render(
      <PageSeo
        title="Test Title"
        description="Test description"
        canonicalPath="/test"
      />
    )
    // Helmet is mocked to null — the component itself should mount cleanly
    expect(container).toBeTruthy()
  })

  it('renders without crashing with all optional props provided', () => {
    const { container } = render(
      <PageSeo
        title="Blog Post Title"
        description="Blog post description"
        canonicalPath="/blog/test-post"
        ogTitle="OG Blog Title"
        ogDescription="OG blog description"
        ogImage="https://example.com/image.jpg"
        ogType="article"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: 'Test' }}
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders without crashing when ogType is website', () => {
    const { container } = render(
      <PageSeo
        title="Home"
        description="Home page"
        canonicalPath="/"
        ogType="website"
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders without crashing when jsonLd is undefined (default)', () => {
    const { container } = render(
      <PageSeo
        title="Contact"
        description="Contact page"
        canonicalPath="/contact"
      />
    )
    expect(container).toBeTruthy()
  })

  it('renders without crashing with a JSON-LD Person schema', () => {
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Selin Özyurt',
      jobTitle: 'Architect',
      url: 'https://www.selinozyurt.com',
    }
    const { container } = render(
      <PageSeo
        title="Selin Özyurt — Architect"
        description="Home page description"
        canonicalPath="/"
        jsonLd={personSchema}
      />
    )
    expect(container).toBeTruthy()
  })
})

// Verify all seo i18n keys exist across the three locales
describe('PageSeo i18n locale keys — seo namespace', () => {
  const locales = [
    { name: 'en.json', locale: enLocale },
    { name: 'tr.json', locale: trLocale },
    { name: 'es.json', locale: esLocale },
  ]

  const topLevelKeys: Array<keyof typeof enLocale.seo> = [
    'siteName',
    'ogImage',
    'home',
    'projects',
    'projectDetail',
    'blog',
    'blogDetail',
    'contact',
    'about',
    'notFound',
  ]

  locales.forEach(({ name, locale }) => {
    topLevelKeys.forEach((key) => {
      it(`${name} contains seo.${key} key`, () => {
        expect(locale.seo[key]).toBeDefined()
      })
    })

    it(`${name} seo.siteName is a non-empty string`, () => {
      expect(typeof locale.seo.siteName).toBe('string')
      expect(locale.seo.siteName.length).toBeGreaterThan(0)
    })

    it(`${name} seo.ogImage is a non-empty string URL`, () => {
      expect(typeof locale.seo.ogImage).toBe('string')
      expect(locale.seo.ogImage.length).toBeGreaterThan(0)
    })

    const pageKeys: Array<'home' | 'projects' | 'projectDetail' | 'blog' | 'blogDetail' | 'contact' | 'about' | 'notFound'> = [
      'home', 'projects', 'projectDetail', 'blog', 'blogDetail', 'contact', 'about', 'notFound',
    ]

    pageKeys.forEach((pageKey) => {
      it(`${name} seo.${pageKey}.title is a non-empty string`, () => {
        const page = locale.seo[pageKey] as { title: string; description: string }
        expect(typeof page.title).toBe('string')
        expect(page.title.length).toBeGreaterThan(0)
      })

      it(`${name} seo.${pageKey}.description is a non-empty string`, () => {
        const page = locale.seo[pageKey] as { title: string; description: string }
        expect(typeof page.description).toBe('string')
        expect(page.description.length).toBeGreaterThan(0)
      })
    })
  })
})

// Verify the i18n test setup resolves seo namespace keys correctly
describe('PageSeo i18n runtime key resolution', () => {
  it('resolves seo.siteName in Turkish (default test locale)', async () => {
    await i18n.changeLanguage('tr')
    const val = i18n.t('seo.siteName')
    expect(val).not.toBe('seo.siteName') // must not fall back to key
    expect(val.length).toBeGreaterThan(0)
  })

  it('resolves seo.home.title in English', async () => {
    await i18n.changeLanguage('en')
    const val = i18n.t('seo.home.title')
    expect(val).not.toBe('seo.home.title')
    expect(val.length).toBeGreaterThan(0)
  })

  it('resolves seo.home.title in Spanish', async () => {
    await i18n.changeLanguage('es')
    const val = i18n.t('seo.home.title')
    expect(val).not.toBe('seo.home.title')
    expect(val.length).toBeGreaterThan(0)
  })

  it('resolves seo.blog.title in Turkish', async () => {
    await i18n.changeLanguage('tr')
    const val = i18n.t('seo.blog.title')
    expect(val).not.toBe('seo.blog.title')
    expect(val.length).toBeGreaterThan(0)
  })

  it('resolves seo.contact.description in Turkish', async () => {
    await i18n.changeLanguage('tr')
    const val = i18n.t('seo.contact.description')
    expect(val).not.toBe('seo.contact.description')
    expect(val.length).toBeGreaterThan(0)
  })
})
