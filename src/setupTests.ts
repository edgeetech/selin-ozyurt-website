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

// Leaflet/react-leaflet use DOM APIs unavailable in jsdom; mock to lightweight divs
// so tests can still assert on map presence, labels, and coordinates.
vi.mock('react-leaflet', () => ({
  MapContainer: ({
    children,
    className,
    style,
    center,
    zoom,
    'aria-label': ariaLabel,
  }: {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    center?: [number, number]
    zoom?: number
    'aria-label'?: string
    [key: string]: unknown
  }) =>
    React.createElement(
      'div',
      {
        className,
        style,
        'aria-label': ariaLabel,
        'data-testid': 'map-container',
        'data-center': center ? center.join(',') : undefined,
        'data-zoom': zoom,
      },
      children,
    ),
  TileLayer: ({ url }: { url: string }) =>
    React.createElement('div', { 'data-testid': 'tile-layer', 'data-url': url }),
  Marker: ({ position }: { position: [number, number] }) =>
    React.createElement('div', {
      'data-testid': 'map-marker',
      'data-position': position.join(','),
    }),
}))

beforeAll(async () => {
  await i18n.changeLanguage('tr')
})
