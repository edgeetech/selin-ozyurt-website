import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import PageSeo from '../components/PageSeo'
import styles from './ContactPage.module.scss'

const ADANA: [number, number] = [37.0, 35.3213]
const CAMBRIDGE: [number, number] = [52.2053, 0.1218]
const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

// Phone and email are stored reversed to prevent scraping.
// They are decoded and injected via ref.textContent on mount — never rendered as plain HTML text.
const PHONE_REVERSED = '0021 654 123 )0(09 0+' // reversed: +0 90 (0) 321 456 0012
const EMAIL_REVERSED = 'moc.trayuzniles@ofni'  // reversed: info@selinozyurt.com

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function ContactPage() {
  const { t } = useTranslation()
  const phoneRef = useRef<HTMLSpanElement>(null)
  const emailRef = useRef<HTMLSpanElement>(null)

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.textContent = PHONE_REVERSED.split('').reverse().join('')
    }
    if (emailRef.current) {
      emailRef.current.textContent = EMAIL_REVERSED.split('').reverse().join('')
    }
  }, [])

  function validate(values: FormState): FormErrors {
    const errs: FormErrors = {}
    if (!values.name.trim()) errs.name = t('contact.errors.nameRequired')
    if (!values.email.trim()) {
      errs.email = t('contact.errors.emailRequired')
    } else if (!values.email.includes('@')) {
      errs.email = t('contact.errors.emailInvalid')
    }
    if (!values.message.trim()) errs.message = t('contact.errors.messageRequired')
    return errs
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear per-field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  return (
    <main className={styles.page}>
      <PageSeo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        canonicalPath="/contact"
      />
      {/* Page title */}
      <section className={styles.header}>
        <h1 className={styles.title}>{t('contact.title')}</h1>
        <p className={styles.subtitle}>{t('contact.subtitle')}</p>
      </section>

      {/* Two-column layout: info + form */}
      <div className={styles.body}>
        {/* Contact info column */}
        <section className={styles.info} aria-label={t('contact.infoAriaLabel')}>
          <h2 className={styles.infoHeading}>{t('contact.infoHeading')}</h2>

          <dl className={styles.detailList}>
            <div className={styles.detailItem}>
              <dt className={styles.detailLabel}>{t('contact.phoneLabel')}</dt>
              <dd className={styles.detailValue}>
                {/* textContent injected by useEffect; no raw value in HTML */}
                <span ref={phoneRef} aria-label={t('contact.phoneAriaLabel')} />
              </dd>
            </div>
            <div className={styles.detailItem}>
              <dt className={styles.detailLabel}>{t('contact.emailLabel')}</dt>
              <dd className={styles.detailValue}>
                {/* textContent injected by useEffect; no raw value in HTML */}
                <span ref={emailRef} aria-label={t('contact.emailAriaLabel')} />
              </dd>
            </div>
            <div className={styles.detailItem}>
              <dt className={styles.detailLabel}>{t('contact.addressLabel')}</dt>
              <dd className={styles.detailValue}>{t('contact.addressValue')}</dd>
            </div>
          </dl>

          {/* OpenStreetMap raster tiles (no WebGL) — centred on Adana, Turkey (37.0, 35.3213) */}
          <div
            className={styles.mapWrapper}
            role="region"
            aria-label={t('contact.mapTitle')}
          >
            <MapContainer
              center={ADANA}
              zoom={12}
              scrollWheelZoom={false}
              className={styles.map}
              style={{ width: '100%', height: 400 }}
              aria-label={t('contact.mapTitle')}
            >
              <TileLayer url={OSM_TILE_URL} attribution={OSM_ATTRIBUTION} />
              <Marker position={ADANA} />
            </MapContainer>
          </div>

          {/* Secondary location — Cambridge, UK */}
          <div className={styles.secondaryLocation}>
            <h3 className={styles.secondaryLocationHeading}>{t('contact.address2Label')}</h3>
            <dl className={styles.detailList}>
              <div className={styles.detailItem}>
                <dt className={styles.detailLabel}>{t('contact.address2Label')}</dt>
                <dd className={styles.detailValue}>{t('contact.address2Value')}</dd>
              </div>
            </dl>
            {/* OpenStreetMap raster tiles (no WebGL) — centred on Cambridge, UK (52.2053, 0.1218) */}
            <div
              className={styles.mapWrapper}
              role="region"
              aria-label={t('contact.map2Title')}
            >
              <MapContainer
                center={CAMBRIDGE}
                zoom={12}
                scrollWheelZoom={false}
                className={styles.map}
                style={{ width: '100%', height: 300 }}
                aria-label={t('contact.map2Title')}
              >
                <TileLayer url={OSM_TILE_URL} attribution={OSM_ATTRIBUTION} />
                <Marker position={CAMBRIDGE} />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Contact form column */}
        <section className={styles.formSection} aria-label={t('contact.formAriaLabel')}>
          <h2 className={styles.formHeading}>{t('contact.formHeading')}</h2>

          {submitted ? (
            <p className={styles.successMessage} role="status">
              {t('contact.successMessage')}
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="name">
                  {t('contact.form.namePlaceholder')}
                </label>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span id="name-error" className={styles.errorText} role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="email">
                  {t('contact.form.emailPlaceholder')}
                </label>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="email-error" className={styles.errorText} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="message">
                  {t('contact.form.messagePlaceholder')}
                </label>
                <textarea
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <span id="message-error" className={styles.errorText} role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.submitButton}>
                {t('contact.form.submit')}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

export default ContactPage
