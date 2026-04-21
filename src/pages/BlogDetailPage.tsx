import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '../data/blogPosts'
import PageSeo from '../components/PageSeo'
import styles from './BlogDetailPage.module.scss'

function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <main className={styles.page}>
        <p className={styles.back}>
          <Link to="/blog" className={styles.backLink}>
            {t('blog.back')}
          </Link>
        </p>
        <p className={styles.notFound}>{t('notFound.message')}</p>
      </main>
    )
  }

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publishedAt))

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.publishedAt,
    url: `https://www.selinozyurt.com/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Selin Özyurt',
      url: 'https://www.selinozyurt.com',
    },
  }

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.blogDetail.title', { title: post.title })}
        description={t('seo.blogDetail.description', { excerpt: post.excerpt })}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.imageUrl}
        jsonLd={blogPostingJsonLd}
      />
      <p className={styles.back}>
        <Link to="/blog" className={styles.backLink}>
          {t('blog.back')}
        </Link>
      </p>

      <article className={styles.article}>
        <header className={styles.header}>
          <time className={styles.date} dateTime={post.publishedAt}>
            {t('blog.publishedOn', { date: formattedDate })}
          </time>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>
        </header>

        <img
          src={post.imageUrl}
          alt={post.title}
          className={styles.image}
        />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  )
}

export default BlogDetailPage
