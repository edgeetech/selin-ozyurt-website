import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageSeo from '../components/PageSeo'
import styles from './NotFoundPage.module.scss'

/**
 * NotFoundPage — rendered by React Router for any unmatched route (`path="*"`).
 *
 * Follows Version A (minimalist/monochrome) design language:
 * - Large serif 404 display
 * - Short descriptive message
 * - Accessible link back to the homepage
 *
 * All user-visible text is sourced from i18n keys under the `notFound` namespace.
 */
function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        canonicalPath="/404"
      />
      <p className={styles.code} aria-label={t('notFound.codeAriaLabel')}>
        404
      </p>

      <div className={styles.divider} aria-hidden="true" />

      <h1 className={styles.title}>{t('notFound.title')}</h1>

      <p className={styles.message}>{t('notFound.message')}</p>

      <Link to="/" className={styles.homeLink}>
        {t('notFound.homeLink')}
      </Link>
    </main>
  )
}

export default NotFoundPage
