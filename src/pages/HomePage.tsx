import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import PageSeo from '../components/PageSeo'
import styles from './HomePage.module.scss'

// Minimal, architectural Unsplash photograph — Richard Meier-style white concrete facade
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80'

const RECENT_POST_COUNT = 3

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Selin Özyurt',
  jobTitle: 'Architect',
  url: 'https://www.selinozyurt.com',
  sameAs: [
    'https://www.instagram.com/selinozyurt',
    'https://www.linkedin.com/in/selinozyurt',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Adana',
    addressCountry: 'TR',
  },
}

function HomePage() {
  const { t, i18n } = useTranslation()

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, RECENT_POST_COUNT)

  return (
    <>
      <PageSeo
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        canonicalPath="/"
        ogImage={HERO_IMAGE_URL}
        jsonLd={PERSON_JSON_LD}
      />
      <section
        className={styles.hero}
        style={{ '--hero-bg': `url(${HERO_IMAGE_URL})` } as CSSProperties}
      >
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.inner}>
          <p className={styles.subtitle}>{t('HomePage.subtitle')}</p>
          <h1 className={styles.name}>{t('heading')}</h1>
          <p className={styles.tagline}>{t('HomePage.tagline')}</p>
          <Link to="/projects" className={styles.cta}>
            {t('HomePage.cta')}
          </Link>
        </div>
      </section>

      <section className={styles.strip} aria-label={t('HomePage.recentPosts')}>
        <div className={styles.stripInner}>
          <span className={styles.stripLabel}>{t('HomePage.recentPosts')}</span>
          <ol className={styles.postList}>
            {recentPosts.map((post) => {
              const formattedDate = new Intl.DateTimeFormat(i18n.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(post.publishedAt))

              return (
                <li key={post.slug} className={styles.postItem}>
                  <Link to={`/blog/${post.slug}`} className={styles.postLink}>
                    <span className={styles.postTitle}>{post.title}</span>
                    <time
                      className={styles.postDate}
                      dateTime={post.publishedAt}
                    >
                      {formattedDate}
                    </time>
                  </Link>
                </li>
              )
            })}
          </ol>
          <Link to="/blog" className={styles.allPostsLink}>
            {t('HomePage.allPosts')}
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
