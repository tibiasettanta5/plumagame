/** Amazon Associates (IT) — set AMAZON_ASSOCIATE_TAG (o VITE_AMAZON_ASSOCIATE_TAG) */

export const AMAZON_MARKETPLACE = 'www.amazon.it'

export const AMAZON_TAG = (import.meta.env.VITE_AMAZON_ASSOCIATE_TAG as string | undefined)?.trim() ?? ''

/** Kit/links hidden until a real Associates tag is configured. */
export const AFFILIATE_ENABLED = AMAZON_TAG.length > 0

export const AFFILIATE_DISCLOSURE =
  'In qualità di Affiliato Amazon, ricevo un guadagno dagli acquisti idonei.'
