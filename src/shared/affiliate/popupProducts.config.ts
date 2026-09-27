/**
 * Prodotti Amazon nel popup (stessi per tutti i giochi).
 *
 * IMMAGINI (obbligatorio locale):
 * 1. File in public/affiliate/
 * 2. image: '/affiliate/NOME-FILE.estensione'
 */
export type PopupAmazonProduct = {
  link: string
  image: string
  title: string
  description: string
  price: string
}

export type PopupGame =
  | 'maze'
  | 'sudoku'
  | 'nonogram'
  | 'kakuro'
  | 'futoshiki'
  | 'hashi'
  | 'battleship'

/** Elenco unico usato da tutti i popup download. */
export const POPUP_PRODUCTS: PopupAmazonProduct[] = [
  {
    link: 'https://link.amazon/B0cCMU5R8',
    image: '/affiliate/71JCPmS3rGL._AC_SL1500_.jpg',
    title: 'Carta per stampante, formato A4, 80 g, bianco, 500 fogli',
    description: '',
    price: '',
  },
  {
    link: 'https://link.amazon/B0hXB98As',
    image: '/affiliate/71CeTaUkzoS._AC_SL1500_.jpg',
    title: 'GIOTTO TURBO COLOR 24 pennarelli',
    description: '',
    price: '',
  },
]

/** @deprecated alias — usa POPUP_PRODUCTS */
export const POPUP_PRODUCTS_MAZE = POPUP_PRODUCTS

export const POPUP_PRODUCTS_BY_GAME: Record<PopupGame, PopupAmazonProduct[]> = {
  maze: POPUP_PRODUCTS,
  sudoku: POPUP_PRODUCTS,
  nonogram: POPUP_PRODUCTS,
  kakuro: POPUP_PRODUCTS,
  futoshiki: POPUP_PRODUCTS,
  hashi: POPUP_PRODUCTS,
  battleship: POPUP_PRODUCTS,
}
