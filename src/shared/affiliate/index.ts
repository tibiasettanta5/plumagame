export { AFFILIATE_ENABLED, AFFILIATE_DISCLOSURE, AMAZON_TAG } from './config'
export {
  buildAffiliateUrl,
  buildAffiliateSearchUrl,
  buildAmazonProductImageUrl,
  resolvePopupProduct,
  resolveProductHref,
  type ResolvedPopupProduct,
} from './buildAffiliateUrl'
export { extractAsinFromAmazonLink } from './parseAmazonLink'
export {
  POPUP_PRODUCTS,
  POPUP_PRODUCTS_MAZE,
  POPUP_PRODUCTS_BY_GAME,
  type PopupAmazonProduct,
  type PopupGame,
} from './popupProducts.config'
export { fakeGenerationMs, runFakeProgress, sleep } from './fakeGeneration'
export {
  AffiliateFooter,
  AffiliatePopup,
  getPopupProducts,
  type DownloadPhase,
} from './AffiliateKit'
