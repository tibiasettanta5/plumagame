/**
 * Estrae l’ASIN da link Amazon (dp, gp/product, link.amazon/ASIN, ecc.).
 * Esempio: https://link.amazon/B0ffBJVHK → B0FFBJVHK
 */
export function extractAsinFromAmazonLink(link: string): string | null {
  const raw = link.trim()
  if (!raw) return null

  // Solo ASIN (10 caratteri, inizia con B0/B00…)
  if (/^[A-Z0-9]{10}$/i.test(raw)) return raw.toUpperCase()

  try {
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
    const url = new URL(withProto)
    const host = url.hostname.replace(/^www\./, '').toLowerCase()

    // https://link.amazon/B0ffBJVHK  oppure link.amazon.it/...
    if (host === 'link.amazon' || host.startsWith('link.amazon.')) {
      const seg = url.pathname.split('/').filter(Boolean)[0]
      if (seg && /^[A-Z0-9]{8,12}$/i.test(seg)) return seg.toUpperCase()
    }

    // /dp/ASIN /gp/product/ASIN /product/ASIN
    const pathMatch = url.pathname.match(
      /\/(?:dp|gp\/product|gp\/aw\/d|product)\/([A-Z0-9]{10})/i,
    )
    if (pathMatch) return pathMatch[1].toUpperCase()

    // amzn.to / a.co — non risolvibili senza redirect; ultimo segmento se sembra ASIN
    const last = url.pathname.split('/').filter(Boolean).pop()
    if (last && /^[A-Z0-9]{10}$/i.test(last)) return last.toUpperCase()
  } catch {
    return null
  }

  return null
}
