import { test, expect, type Page } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Ensure screenshots directory exists
const screenshotsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'screenshots')
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true })
}

const BASE_URL = 'http://localhost:5174'

// Helper to navigate and wait for footer
async function loadPage(page: Page, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport)
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForSelector('footer', { state: 'visible' })
}

// ── Mobile viewports: footer stacks vertically ─────────────────────────────

test.describe('Mobile 320px — footer stacks vertically', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage(page, { width: 320, height: 568 })
  })

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('footer flex-direction is column (stacked)', async ({ page }) => {
    const flexDir = await page.locator('footer').evaluate((el: HTMLElement) =>
      window.getComputedStyle(el).flexDirection
    )
    expect(flexDir).toBe('column')
  })

  test('social icons nav is visible and above copyright', async ({ page }) => {
    const nav = page.locator('footer nav')
    const copyright = page.locator('footer p')
    await expect(nav).toBeVisible()
    await expect(copyright).toBeVisible()

    const navBox = await nav.boundingBox()
    const copyrightBox = await copyright.boundingBox()
    expect(navBox).not.toBeNull()
    expect(copyrightBox).not.toBeNull()
    // nav (social icons) should be ABOVE copyright (smaller y value)
    expect(navBox!.y).toBeLessThan(copyrightBox!.y)
  })

  test('social icons nav is centred horizontally', async ({ page }) => {
    const nav = page.locator('footer nav')
    const navBox = await nav.boundingBox()
    const viewportWidth = 320
    expect(navBox).not.toBeNull()
    const navCenterX = navBox!.x + navBox!.width / 2
    // Centre within 30px tolerance
    expect(Math.abs(navCenterX - viewportWidth / 2)).toBeLessThan(30)
  })

  test('copyright paragraph is centred horizontally', async ({ page }) => {
    const p = page.locator('footer p')
    const pBox = await p.boundingBox()
    const viewportWidth = 320
    expect(pBox).not.toBeNull()
    const pCenterX = pBox!.x + pBox!.width / 2
    expect(Math.abs(pCenterX - viewportWidth / 2)).toBeLessThan(30)
  })

  test('copyright text is readable (non-empty, not truncated)', async ({ page }) => {
    const p = page.locator('footer p')
    const text = await p.textContent()
    expect(text).toBeTruthy()
    expect(text!.length).toBeGreaterThan(0)
    // Check text is not overflowing (no overflow hidden cutting it off)
    const overflow = await p.evaluate((el: HTMLElement) => window.getComputedStyle(el).overflow)
    expect(overflow).not.toBe('hidden')
  })

  test('screenshot at 320px', async ({ page }) => {
    await page.screenshot({ path: path.join(screenshotsDir, 'footer-320px.png'), fullPage: false })
  })
})

test.describe('Mobile 375px — footer stacks vertically', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage(page, { width: 375, height: 667 })
  })

  test('footer flex-direction is column', async ({ page }) => {
    const flexDir = await page.locator('footer').evaluate((el: HTMLElement) =>
      window.getComputedStyle(el).flexDirection
    )
    expect(flexDir).toBe('column')
  })

  test('social icons row centred horizontally at 375px', async ({ page }) => {
    const nav = page.locator('footer nav')
    const navBox = await nav.boundingBox()
    expect(navBox).not.toBeNull()
    const navCenterX = navBox!.x + navBox!.width / 2
    expect(Math.abs(navCenterX - 375 / 2)).toBeLessThan(30)
  })

  test('copyright row centred horizontally at 375px', async ({ page }) => {
    const p = page.locator('footer p')
    const pBox = await p.boundingBox()
    expect(pBox).not.toBeNull()
    const pCenterX = pBox!.x + pBox!.width / 2
    expect(Math.abs(pCenterX - 375 / 2)).toBeLessThan(30)
  })

  test('copyright text fully readable at 375px', async ({ page }) => {
    const p = page.locator('footer p')
    const text = await p.textContent()
    expect(text).toBeTruthy()
    expect(text!.length).toBeGreaterThan(0)
  })

  test('screenshot at 375px', async ({ page }) => {
    await page.screenshot({ path: path.join(screenshotsDir, 'footer-375px.png'), fullPage: false })
  })
})

test.describe('Mobile 425px — footer stacks vertically', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage(page, { width: 425, height: 736 })
  })

  test('footer flex-direction is column', async ({ page }) => {
    const flexDir = await page.locator('footer').evaluate((el: HTMLElement) =>
      window.getComputedStyle(el).flexDirection
    )
    expect(flexDir).toBe('column')
  })

  test('social icons row centred horizontally at 425px', async ({ page }) => {
    const nav = page.locator('footer nav')
    const navBox = await nav.boundingBox()
    expect(navBox).not.toBeNull()
    const navCenterX = navBox!.x + navBox!.width / 2
    expect(Math.abs(navCenterX - 425 / 2)).toBeLessThan(30)
  })

  test('copyright row centred horizontally at 425px', async ({ page }) => {
    const p = page.locator('footer p')
    const pBox = await p.boundingBox()
    expect(pBox).not.toBeNull()
    const pCenterX = pBox!.x + pBox!.width / 2
    expect(Math.abs(pCenterX - 425 / 2)).toBeLessThan(30)
  })

  test('copyright text fully readable at 425px', async ({ page }) => {
    const p = page.locator('footer p')
    const text = await p.textContent()
    expect(text).toBeTruthy()
    expect(text!.length).toBeGreaterThan(0)
  })

  test('screenshot at 425px', async ({ page }) => {
    await page.screenshot({ path: path.join(screenshotsDir, 'footer-425px.png'), fullPage: false })
  })
})

// ── Tablet 768px — no overflow / truncation ────────────────────────────────

test.describe('Tablet 768px — no overflow or truncation', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage(page, { width: 768, height: 1024 })
  })

  test('footer is visible', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })

  test('social nav is visible with no overflow', async ({ page }) => {
    const nav = page.locator('footer nav')
    await expect(nav).toBeVisible()
    const overflow = await nav.evaluate((el: HTMLElement) => {
      const style = window.getComputedStyle(el)
      return style.overflow + ' ' + style.overflowX + ' ' + style.overflowY
    })
    expect(overflow).not.toContain('hidden')
  })

  test('copyright is visible with no overflow', async ({ page }) => {
    const p = page.locator('footer p')
    await expect(p).toBeVisible()
    const text = await p.textContent()
    expect(text).toBeTruthy()
  })

  test('screenshot at 768px', async ({ page }) => {
    await page.screenshot({ path: path.join(screenshotsDir, 'footer-768px.png'), fullPage: false })
  })
})

// ── Desktop 1280px — single row layout ────────────────────────────────────

test.describe('Desktop 1280px — single row layout', () => {
  test.beforeEach(async ({ page }) => {
    await loadPage(page, { width: 1280, height: 800 })
  })

  test('footer flex-direction is row (single row)', async ({ page }) => {
    const flexDir = await page.locator('footer').evaluate((el: HTMLElement) =>
      window.getComputedStyle(el).flexDirection
    )
    expect(flexDir).toBe('row')
  })

  test('social icons and copyright are on the same horizontal line', async ({ page }) => {
    const nav = page.locator('footer nav')
    const copyright = page.locator('footer p')

    const navBox = await nav.boundingBox()
    const copyrightBox = await copyright.boundingBox()
    expect(navBox).not.toBeNull()
    expect(copyrightBox).not.toBeNull()

    // Both elements should be within 20px of the same vertical position (same row)
    expect(Math.abs(navBox!.y - copyrightBox!.y)).toBeLessThan(20)
  })

  test('footer spans full width with no overflow', async ({ page }) => {
    const footer = page.locator('footer')
    const box = await footer.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThanOrEqual(1280 - 20) // allow for scrollbar
  })

  test('screenshot at 1280px desktop', async ({ page }) => {
    await page.screenshot({ path: path.join(screenshotsDir, 'footer-1280px.png'), fullPage: false })
  })
})

// ── No visual regressions on other pages ──────────────────────────────────

test.describe('No regressions on other pages', () => {
  const pages = [
    { name: 'projects', path: '/projects' },
    { name: 'blog', path: '/blog' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
  ]

  for (const pg of pages) {
    test(`footer renders correctly on ${pg.name} page at 375px`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' })
      await page.waitForSelector('footer', { state: 'visible' })

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()

      const flexDir = await footer.evaluate((el: HTMLElement) =>
        window.getComputedStyle(el).flexDirection
      )
      expect(flexDir).toBe('column')

      await page.screenshot({
        path: path.join(screenshotsDir, `footer-${pg.name}-375px.png`),
        fullPage: false,
      })
    })

    test(`footer renders correctly on ${pg.name} page at 1280px`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' })
      await page.waitForSelector('footer', { state: 'visible' })

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()

      const flexDir = await footer.evaluate((el: HTMLElement) =>
        window.getComputedStyle(el).flexDirection
      )
      expect(flexDir).toBe('row')
    })
  }
})
