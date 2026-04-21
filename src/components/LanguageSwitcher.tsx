import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.scss'

interface Language {
  code: string
  label: string
  flag: string
}

interface LanguageSwitcherProps {
  dropUp?: boolean
}

const LANGUAGES: Language[] = [
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
]

function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeLanguageCode = (i18n.resolvedLanguage ?? i18n.language).split('-')[0]

  const currentLang = LANGUAGES.find((l) => l.code === activeLanguageCode) ?? LANGUAGES[0]

  function changeLanguage(code: string) {
    localStorage.setItem('lang', code)
    i18n.changeLanguage(code)
    setOpen(false)
  }

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
        title={t('language.label')}
      >
        <span aria-hidden="true">{currentLang.flag}</span>
        <span className={styles.langCode}>{currentLang.label}</span>
        <span className={styles.chevron} aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul
          className={`${styles.dropdown}${dropUp ? ` ${styles.dropUp}` : ''}`}
          role="listbox"
          aria-label={t('language.label')}
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === activeLanguageCode}
              className={`${styles.option}${lang.code === activeLanguageCode ? ` ${styles['option--active']}` : ''}`}
              onClick={() => changeLanguage(lang.code)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  changeLanguage(lang.code)
                }
              }}
              tabIndex={0}
            >
              <span aria-hidden="true">{lang.flag}</span>
              <span>{t(`language.${lang.code}`)}</span>
              {lang.code === activeLanguageCode && (
                <span className={styles.check} aria-hidden="true">✓</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSwitcher
