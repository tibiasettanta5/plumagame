import { BrandLogo } from './BrandLogo'
import { useT } from '../i18n'
import { SITE } from '../site.config'
import './SiteFooter.css'

export type LegalPage = 'privacy' | 'cookies' | 'affiliate'

type Props = {
  onOpenLegal: (page: LegalPage) => void
  onOpenContact: () => void
}

export function SiteFooter({ onOpenLegal, onOpenContact }: Props) {
  const t = useT()
  const year = new Date().getFullYear()
  const years =
    SITE.foundedYear === year ? String(year) : `${SITE.foundedYear}–${year}`

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <BrandLogo className="brand-logo--footer" />
          <p>{t('footer.tagline')}</p>
        </div>

        <nav className="site-footer-nav" aria-label={t('footer.legal')}>
          <p className="site-footer-nav-title">{t('footer.legal')}</p>
          <button type="button" onClick={() => onOpenLegal('privacy')}>
            {t('footer.privacy')}
          </button>
          <button type="button" onClick={() => onOpenLegal('cookies')}>
            {t('footer.cookies')}
          </button>
          <button type="button" onClick={() => onOpenLegal('affiliate')}>
            {t('footer.affiliate')}
          </button>
        </nav>

        <div className="site-footer-contact">
          <p className="site-footer-nav-title">{t('footer.contact')}</p>
          <button type="button" className="site-footer-contact-btn" onClick={onOpenContact}>
            {t('footer.writeUs')}
          </button>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p className="site-footer-copyright">
          Copyright © {years} {SITE.name}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}

type LegalProps = {
  page: LegalPage
  onClose: () => void
  onOpenContact?: () => void
}

export function LegalModal({ page, onClose, onOpenContact }: LegalProps) {
  const t = useT()
  const title = t(`legal.${page}.title`)
  const body = t(`legal.${page}.body`)

  function openContact() {
    onClose()
    onOpenContact?.()
  }

  return (
    <div className="legal-shell" role="presentation" onClick={onClose}>
      <div
        className="legal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="legal-panel-head">
          <h2 id="legal-title">{title}</h2>
          <button type="button" className="legal-close" onClick={onClose} aria-label={t('aff.close')}>
            ×
          </button>
        </header>
        <div className="legal-body">
          {body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {page === 'privacy' && onOpenContact && (
            <p className="legal-contact-cta">
              {t('legal.privacy.contactHint')}{' '}
              <button type="button" className="legal-inline-link" onClick={openContact}>
                {t('footer.writeUs')}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
