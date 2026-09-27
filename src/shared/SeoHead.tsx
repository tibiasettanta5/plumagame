import { useEffect } from 'react'
import { useI18n } from '../i18n'
import { SITE } from '../site.config'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/** Meta SEO + JSON-LD aggiornati in base alla lingua rilevata. */
export function SeoHead() {
  const { locale, t } = useI18n()
  const title = t('seo.title')
  const description = t('seo.description')

  useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', t('seo.keywords'))
    setMeta('name', 'author', SITE.name)
    setMeta('name', 'robots', 'index, follow')
    setMeta('name', 'theme-color', '#ffffff')
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:locale', locale === 'zh' ? 'zh_CN' : locale)
    setMeta('property', 'og:url', SITE.url)
    setMeta('property', 'og:image', `${SITE.url}/plumagame-logo.png`)
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setLink('canonical', SITE.url)

    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE.name,
      url: SITE.url,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      description,
      inLanguage: locale,
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        email: SITE.email,
      },
    }

    let script = document.getElementById('plumagame-jsonld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'plumagame-jsonld'
      script.setAttribute('type', 'application/ld+json')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ld)
  }, [locale, t, title, description])

  return null
}
