import { useTranslation } from 'react-i18next'
import socials from '../data/socials'
import styles from './Footer.module.scss'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <nav className={styles.socials} aria-label={t('socials.navAriaLabel')}>
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
            <entry.icon aria-hidden="true" className={styles.icon} />
            <span className={styles.platformName}>{entry.platform}</span>
          </a>
        ))}
      </nav>
      <p className={styles.copyright}>
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  )
}

export default Footer
