import React from 'react'
import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'

function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <HelmetProvider>{children}</HelmetProvider>
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders }
