import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import socials from '../data/socials'
import styles from './NavBar.module.scss'

function NavBar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handleOutsideClick(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      aria-label={t('nav.home')}
    >
      <button
        className={styles.hamburger}
        aria-label={isOpen ? t('nav.menuClose') : t('nav.menuOpen')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      <ul className={`${styles.list} ${isOpen ? styles.navOpen : ''}`}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={closeMenu}
          >
            {t('nav.home')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={closeMenu}
          >
            {t('nav.projects')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={closeMenu}
          >
            {t('nav.blog')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={closeMenu}
          >
            {t('nav.contact')}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={closeMenu}
          >
            {t('nav.about')}
          </NavLink>
        </li>
        <li className={styles.mobileRow}>
          <div className={styles.socialsGroup}>
            {socials.map((entry) => (
              <a
                key={entry.platform}
                href={entry.href}
                aria-label={t(entry.ariaLabelKey)}
                className={styles.socialLink}
                {...(entry.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <entry.icon aria-hidden="true" className={styles.socialIcon} />
              </a>
            ))}
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
