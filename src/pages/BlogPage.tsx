import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blogPosts'
import BlogCard from '../components/BlogCard'
import PageSeo from '../components/PageSeo'
import styles from './BlogPage.module.scss'

function BlogPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const normalised = query.trim().toLowerCase()

  const filtered = normalised
    ? blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(normalised) ||
          post.excerpt.toLowerCase().includes(normalised),
      )
    : blogPosts

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        canonicalPath="/blog"
      />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('blog.heroTitle')}</h1>
        <p className={styles.heroSubtitle}>{t('blog.heroSubtitle')}</p>
      </section>

      <div className={styles.searchBar}>
        <label htmlFor="blog-search" className={styles.srOnly}>
          {t('blog.searchAriaLabel')}
        </label>
        <input
          id="blog-search"
          type="search"
          className={styles.searchInput}
          placeholder={t('blog.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t('blog.searchAriaLabel')}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.noResults}>{t('blog.noResults')}</p>
      ) : (
        <section className={styles.grid} aria-label={t('blog.gridAriaLabel')}>
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </section>
      )}
    </main>
  )
}

export default BlogPage
