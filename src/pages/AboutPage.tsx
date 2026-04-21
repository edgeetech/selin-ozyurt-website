import { useTranslation } from 'react-i18next'
import PageSeo from '../components/PageSeo'
import styles from './AboutPage.module.scss'

function AboutPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        canonicalPath="/about"
      />
      {/* Hero */}
      <section className={styles.hero}>
        <img
          src="https://placehold.co/1600x900/c17a5a/ffffff?text=Selin+%C3%96zyurt"
          alt={t('aboutHeroTitle')}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('aboutHeroTitle')}</h1>
          <p className={styles.heroSubtitle}>{t('aboutHeroSubtitle')}</p>
        </div>
      </section>

      {/* Biography */}
      <section className={styles.bio}>
        <h2 className={styles.bioHeading}>{t('aboutBioHeading')}</h2>
        <p className={styles.bioParagraph}>{t('aboutBioParagraph1')}</p>
        <p className={styles.bioParagraph}>{t('aboutBioParagraph2')}</p>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophy}>
        <div className={styles.philosophyInner}>
          <h2 className={styles.philosophyHeading}>{t('aboutPhilosophyHeading')}</h2>
          <p className={styles.philosophyText}>{t('aboutPhilosophyText')}</p>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
