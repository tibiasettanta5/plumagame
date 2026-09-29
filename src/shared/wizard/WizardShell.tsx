import type { ReactNode } from 'react'
import { useT } from '../../i18n'
import { AffiliateFooter, AffiliatePopup, type DownloadPhase } from '../affiliate'
import type { DeliveryMode } from './commonSteps'
import type { PopupGame } from '../affiliate/popupProducts.config'
import { BrandLogo } from '../BrandLogo'
import '../guide/guide.css'
import './wizard.css'

type Props = {
  title: string
  onBackHome?: () => void
  onStartGuide?: () => void
  stepIndex: number
  stepTotal: number
  question: ReactNode
  preview: ReactNode
  affiliateOpen: boolean
  downloadPhase: DownloadPhase
  downloadProgress: number
  onCloseAffiliate: () => void
  game: PopupGame
  delivery?: DeliveryMode
}

export function WizardShell({
  title,
  onBackHome,
  onStartGuide,
  stepIndex,
  stepTotal,
  question,
  preview,
  affiliateOpen,
  downloadPhase,
  downloadProgress,
  onCloseAffiliate,
  game,
  delivery = 'download',
}: Props) {
  const t = useT()
  const progressLabel = `${stepIndex + 1} / ${stepTotal}`
  return (
    <>
      <div className="wizard-app">
        <aside className="wizard-panel">
          <header className="wizard-brand">
            {onBackHome && (
              <button type="button" className="home-link" onClick={onBackHome}>
                {t('common.backHome')}
              </button>
            )}
            <BrandLogo />
            <h1>{title}</h1>
            {onStartGuide && (
              <button
                type="button"
                className="guide-launch"
                onClick={onStartGuide}
              >
                {t('common.howToPlay')}
              </button>
            )}
          </header>

          <div className="wizard-progress" aria-label={progressLabel}>
            <div className="wizard-progress-track">
              <div
                className="wizard-progress-fill"
                style={{ width: `${((stepIndex + 1) / stepTotal) * 100}%` }}
              />
            </div>
            <span className="wizard-progress-label">{progressLabel}</span>
          </div>

          <div className="wizard-question">{question}</div>
          <AffiliateFooter />
        </aside>

        <main className="wizard-stage">
          <p className="preview-caption">{t('common.preview')}</p>
          <section className="preview-panel">
            <div className="preview-frame">{preview}</div>
          </section>
        </main>
      </div>

      <AffiliatePopup
        open={affiliateOpen}
        phase={downloadPhase}
        progress={downloadProgress}
        game={game}
        delivery={delivery}
        onClose={onCloseAffiliate}
      />
    </>
  )
}
