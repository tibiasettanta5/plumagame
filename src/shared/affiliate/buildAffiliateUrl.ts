import { AMAZON_MARKETPLACE, AMAZON_TAG } from './config'
import { extractAsinFromAmazonLink } from './parseAmazonLink'
import type { PopupAmazonProduct } from './popupProducts.config'

export type ResolvedPopupProduct = PopupAmazonProduct & {
  asin: string | null
  href: string
  imageUrl: string | null
}

export function buildAffiliateUrl(asin: string): string {
  const clean = asin.trim()
  const url = new URL(`https://${AMAZON_MARKETPLACE}/dp/${encodeURIComponent(clean)}`)
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG)
  return url.toString()
}

export function buildAffiliateSearchUrl(query: string): string {
  const url = new URL(`https://${AMAZON_MARKETPLACE}/s`)
  url.searchParams.set('k', query)
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG)
  return url.toString()
}

/** Immagine prodotto Amazon Associates (IT). */
export function buildAmazonProductImageUrl(
  asin: string,
  size: '_SL160_' | '_SL250_' = '_SL250_',
): string {
  const url = new URL('https://ws-eu.amazon-adsystem.com/widgets/q')
  url.searchParams.set('_encoding', 'UTF8')
  url.searchParams.set('MarketPlace', 'IT')
  url.searchParams.set('ASIN', asin.trim().toUpperCase())
  url.searchParams.set('ServiceVersion', '20070822')
  url.searchParams.set('ID', 'AsinImage')
  url.searchParams.set('WS', '1')
  url.searchParams.set('Format', size)
  if (AMAZON_TAG) url.searchParams.set('tag', AMAZON_TAG)
  return url.toString()
}

/**
 * Href cliccabile: se il link è già un URL http(s) lo usa (aggiunge tag se manca);
 * altrimenti costruisce /dp/ASIN.
 */
export function resolveProductHref(link: string, asin: string | null): string {
  const raw = link.trim()
  try {
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
    const url = new URL(withProto)
    if (AMAZON_TAG && !url.searchParams.has('tag')) {
      url.searchParams.set('tag', AMAZON_TAG)
    }
    return url.toString()
  } catch {
    if (asin) return buildAffiliateUrl(asin)
    return raw
  }
}

export function resolvePopupProduct(product: PopupAmazonProduct): ResolvedPopupProduct {
  const asin = extractAsinFromAmazonLink(product.link)
  const manualImage = product.image?.trim() || null
  return {
    ...product,
    asin,
    href: resolveProductHref(product.link, asin),
    // Solo immagine esplicita dal config (locale o URL). Niente auto-Amazon: spesso bloccata.
    imageUrl: manualImage,
  }
}
