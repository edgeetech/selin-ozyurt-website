import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { projects, type ProjectCategory } from '../data/projects'
import PageSeo from '../components/PageSeo'
import styles from './ProjectsPage.module.scss'

type FilterCategory = 'All' | ProjectCategory

const CATEGORIES: FilterCategory[] = ['All', 'Residential', 'Commercial', 'Interior', 'Landscape']

function ProjectsPage() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.projects.title')}
        description={t('seo.projects.description')}
        canonicalPath="/projects"
      />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('projects.title')}</h1>
      </section>

      <nav className={styles.filterBar} aria-label={t('projects.filterAriaLabel')}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            aria-label={t(`projects.filter.${cat.toLowerCase()}`)}
          >
            {t(`projects.filter.${cat.toLowerCase()}`)}
          </button>
        ))}
      </nav>

      <section className={styles.grid} aria-label={t('projects.gridAriaLabel')}>
        {filtered.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className={styles.card}
            aria-label={`${project.title} — ${t(`projects.categories.${project.category.toLowerCase()}`)}`}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay}>
              <span className={styles.cardCategory}>
                {t(`projects.categories.${project.category.toLowerCase()}`)}
              </span>
              <h2 className={styles.cardTitle}>{project.title}</h2>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default ProjectsPage
