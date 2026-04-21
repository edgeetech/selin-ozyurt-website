import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogPost } from '../data/blogPosts'
import styles from './BlogCard.module.scss'

interface BlogCardProps {
  post: BlogPost
}

function BlogCard({ post }: BlogCardProps) {
  const { t, i18n } = useTranslation()

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(post.publishedAt))

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={styles.card}
      aria-label={t('blog.cardAriaLabel', { title: post.title })}
    >
      <img
        src={post.imageUrl}
        alt=""
        aria-hidden="true"
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <time className={styles.cardDate} dateTime={post.publishedAt}>
          {t('blog.publishedOn', { date: formattedDate })}
        </time>
        <h2 className={styles.cardTitle}>{post.title}</h2>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <span className={styles.cardReadMore}>{t('blog.readMore')}</span>
      </div>
    </Link>
  )
}

export default BlogCard
