import { useState } from 'react'
import { HiCpuChip, HiSparkles, HiXMark } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'
import styles from './AIBanner.module.scss'

function AIBanner() {
  const { t } = useTranslation()
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('ai-banner-dismissed') === 'true')

  function dismissBanner() {
    localStorage.setItem('ai-banner-dismissed', 'true')
    setDismissed(true)
  }

  if (dismissed) {
    return null
  }

  return (
    <section className={styles.bannerShell} aria-label={t('aiBanner.ariaLabel')}>
      <div className={styles.banner} role="note" aria-label={t('aiBanner.ariaLabel')}>
        <div className={styles.iconGroup} aria-hidden="true">
          <HiSparkles className={styles.icon} />
          <HiCpuChip className={styles.icon} />
        </div>
        <div className={styles.content}>
          <span className={styles.title}>{t('aiBanner.title')}</span>
          <p className={styles.message}>
            {t('aiBanner.message')}
            <span className={styles.statusTag}>{t('aiBanner.status')}</span>
          </p>
        </div>
        <button
          type="button"
          className={styles.dismissButton}
          onClick={dismissBanner}
          aria-label={t('aiBanner.dismiss')}
        >
          <HiXMark className={styles.dismissIcon} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

export default AIBanner
