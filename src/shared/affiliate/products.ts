export type AffiliateProduct = {
  id: string
  title: string
  blurb: string
  /** ASIN Amazon.it — obbligatorio per immagine prodotto nel popup. */
  asin: string
  /** Query di ricerca di backup. */
  searchQuery: string
  category: 'paper' | 'colors' | 'printer' | 'storage' | 'book'
}

/**
 * Catalogo prodotti Amazon.
 * Sostituisci gli ASIN con quelli del tuo account Associates (verifica disponibilità).
 * Cosa compare nel popup: `popupProducts.config.ts`
 */
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'paper-a4',
    title: 'Navigator Universal - Carta A4',
    blurb: 'Risma 500 fogli 80 g/m², ideale per stampare labirinti nitidi.',
    asin: 'B00IW5Y8S6',
    searchQuery: 'risma carta A4 Navigator 80g',
    category: 'paper',
  },
  {
    id: 'markers',
    title: 'Stabilo Pen 68 - Pennarelli',
    blurb: 'Colori brillanti per tracciare i percorsi dopo la stampa.',
    asin: 'B000J0D2CI',
    searchQuery: 'Stabilo Pen 68 pennarelli',
    category: 'colors',
  },
  {
    id: 'printer',
    title: 'Stampante HP DeskJet',
    blurb: 'Compatta Wi‑Fi, perfetta per stampare fogli A4 a casa.',
    asin: 'B09S3XN65R',
    searchQuery: 'stampante HP DeskJet A4 wifi',
    category: 'printer',
  },
  {
    id: 'folder',
    title: 'Cartelletta portadocumenti A4',
    blurb: 'Per tenere in ordine labirinti stampati e da colorare.',
    asin: 'B07G3QJH8K',
    searchQuery: 'cartelletta portadocumenti A4',
    category: 'storage',
  },
  {
    id: 'activity-book',
    title: 'Libro labirinti per bambini',
    blurb: 'Altri labirinti pronti da risolvere, oltre a quelli generati qui.',
    asin: 'B08X6J5L2Y',
    searchQuery: 'libro labirinti bambini',
    category: 'book',
  },
]
