import { useEffect, useState } from 'react'
import { useT } from '../../i18n'
import {
  AFFILIATE_ENABLED,
} from './config'
import {
  resolvePopupProduct,
  type ResolvedPopupProduct,
} from './buildAffiliateUrl'
import {
  POPUP_PRODUCTS_BY_GAME,
  type PopupGame,
} from './popupProducts.config'
import './AffiliateKit.css'

export type DownloadPhase = 'generating' | 'ready' | 'error'

const GENERATING_KEY: Record<PopupGame, string> = {
  maze: 'aff.gen.maze',
  sudoku: 'aff.gen.sudoku',
  nonogram: 'aff.gen.nonogram',
  kakuro: 'aff.gen.kakuro',
  futoshiki: 'aff.gen.futoshiki',
  hashi: 'aff.gen.hashi',
  battleship: 'aff.gen.battleship',
}

function ProductCard({
  product,
  index,
}: {
  product: ResolvedPopupProduct
  index: number
}) {
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgFailed(false)
  }, [product.imageUrl])

  return (
    <a
      className="aff-product"
      href={product.href}
      target="_blank"
      rel="nofollow sponsored noopener"
      style={{ animationDelay: `${0.12 + index * 0.1}s` }}
    >
      <span className="aff-product-visual">
        {product.imageUrl && !imgFailed ? (
          <img
            key={product.imageUrl}
            src={product.imageUrl}
            alt={product.title}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="aff-product-visual-empty" />
        )}
      </span>
      <span className="aff-product-info">
        <strong className="aff-product-title">{product.title}</strong>
        {product.description.trim() ? (
          <span className="aff-product-desc">{product.description}</span>
        ) : null}
        <span className="aff-product-foot">
          {product.price.trim() ? (
            <span className="aff-product-price">{product.price}</span>
          ) : null}
        </span>
      </span>
    </a>
  )
}

export function getPopupProducts(game: PopupGame = 'maze'): ResolvedPopupProduct[] {
  return (POPUP_PRODUCTS_BY_GAME[game] ?? []).map(resolvePopupProduct)
}

type AffiliatePopupProps = {
  open: boolean
  phase: DownloadPhase
  progress: number
  onClose: () => void
  /** Quale gioco sta generando — testo e prodotti del popup */
  game?: PopupGame
}

export function AffiliatePopup({
  open,
  phase,
  progress,
  onClose,
  game = 'maze',
}: AffiliatePopupProps) {
  const t = useT()
  const products = getPopupProducts(game)
  const canDismiss = phase !== 'generating'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canDismiss) onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, canDismiss])

  if (!open) return null

  const showProducts = AFFILIATE_ENABLED && products.length > 0

  return (
    <div
      className="aff-shell"
      role="presentation"
      onClick={() => {
        if (canDismiss) onClose()
      }}
    >
      <div
        className="aff-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aff-panel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aff-panel-top">
          <h2 id="aff-panel-title" className="aff-panel-status">
            {phase === 'generating' && t(GENERATING_KEY[game])}
            {phase === 'ready' && t('aff.ready')}
            {phase === 'error' && t('aff.error')}
          </h2>
          <div className="aff-meter" aria-live="polite">
            <div className="aff-meter-bar">
              <div
                className="aff-meter-fill"
                style={{ width: `${phase === 'error' ? 100 : progress}%` }}
                data-phase={phase}
              />
            </div>
          </div>
          {canDismiss && (
            <button
              type="button"
              className="aff-panel-x"
              onClick={onClose}
              aria-label={t('aff.close')}
            >
              ×
            </button>
          )}
        </div>

        {showProducts && (
          <div className="aff-showcase">
            <p className="aff-hook">{t('aff.hook')}</p>
            <div
              className="aff-showcase-list"
              data-count={Math.min(products.length, 3)}
            >
              {products.map((p, i) => (
                <ProductCard key={`${p.link}-${i}`} product={p} index={i} />
              ))}
            </div>
            <p className="aff-disclosure">{t('aff.disclosure')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function AffiliateFooter() {
  const t = useT()
  if (!AFFILIATE_ENABLED) return null
  return (
    <p className="aff-footer-note">
      {t('aff.disclosure')}{' '}
      <a href="https://www.amazon.it/" target="_blank" rel="noopener noreferrer">
        Amazon.it
      </a>
    </p>
  )
}
