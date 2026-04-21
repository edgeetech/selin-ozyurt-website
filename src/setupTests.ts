import '@testing-library/jest-dom'
import './i18n'
import i18n from 'i18next'
import { beforeAll, vi } from 'vitest'
import React from 'react'

// react-helmet-async requires a HelmetProvider in the tree.
// In unit tests we render components in isolation, so we mock the library
// to no-ops so all tests that include PageSeo don't crash.
vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  Helmet: () => null,
}))

beforeAll(async () => {
  await i18n.changeLanguage('tr')
})
