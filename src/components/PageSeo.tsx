import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://www.selinozyurt.com'

interface PageSeoProps {
  title: string
  description: string
  canonicalPath: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: object
}

function PageSeo({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  jsonLd,
}: PageSeoProps) {
  const { t } = useTranslation()

  const defaultOgImage = t('seo.ogImage')
  const canonicalUrl = `${BASE_URL}${canonicalPath}`
  const resolvedOgTitle = ogTitle ?? title
  const resolvedOgDescription = ogDescription ?? description
  const resolvedOgImage = ogImage ?? defaultOgImage

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:site_name" content={t('seo.siteName')} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

export default PageSeo
