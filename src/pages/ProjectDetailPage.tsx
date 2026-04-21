import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects'
import PageSeo from '../components/PageSeo'
import styles from './ProjectDetailPage.module.scss'

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <main className={styles.page}>
        <p className={styles.back}>
          <Link to="/projects" className={styles.backLink}>
            {t('projects.detail.back')}
          </Link>
        </p>
        <p className={styles.notFound}>{t('notFound.message')}</p>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.projectDetail.title', { title: project.title })}
        description={t('seo.projectDetail.description', { description: project.description })}
        canonicalPath={`/projects/${project.id}`}
        ogImage={project.imageUrl}
      />
      <p className={styles.back}>
        <Link to="/projects" className={styles.backLink}>
          {t('projects.detail.back')}
        </Link>
      </p>

      <article className={styles.article}>
        <header className={styles.header}>
          <span className={styles.category}>
            {t(`projects.categories.${project.category.toLowerCase()}`)}
          </span>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.description}>{project.description}</p>
        </header>

        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.image}
        />

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </article>
    </main>
  )
}

export default ProjectDetailPage
