import type { ReactNode } from 'react'
import { useT } from '../../i18n'
import '../wizard/wizard.css'
import './guide.css'

export type GuideStep<TSim extends string = string> = {
  title: string
  body: string
  sim: TSim
}

type PanelProps = {
  gameLabel: string
  steps: GuideStep[]
  stepIndex: number
  onNext: () => void
  onBackHome?: () => void
}

export function GuidePanel({
  gameLabel,
  steps,
  stepIndex,
  onNext,
  onBackHome,
}: PanelProps) {
  const t = useT()
  const step = steps[stepIndex]
  const total = steps.length
  const isLast = stepIndex >= total - 1

  return (
    <aside className="wizard-panel guide-panel">
      <header className="guide-brand">
        {onBackHome && (
          <button type="button" className="home-link" onClick={onBackHome}>
            {t('common.backHome')}
          </button>
        )}
        <p className="guide-brand-eyebrow">{t('common.guide', { game: gameLabel })}</p>
        <h1>{t('common.howToPlay')}</h1>
      </header>

      <div className="wizard-progress" aria-label={`${stepIndex + 1} / ${total}`}>
        <div className="wizard-progress-track">
          <div
            className="wizard-progress-fill"
            style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="wizard-progress-label">
          {stepIndex + 1} / {total}
        </span>
      </div>

      <div className="wizard-question" key={stepIndex}>
        <h2 className="q-title">{step.title}</h2>
        <p className="q-sub guide-body">{step.body}</p>
        <button type="button" className="btn accent" onClick={onNext}>
          {isLast ? t('common.startCreating') : t('common.next')}
        </button>
      </div>
    </aside>
  )
}

export function GuideSimFrame({ children }: { children: ReactNode }) {
  return (
    <div className="guide-sim">
      <div className="preview-panel">
        <div className="preview-frame guide-sim-frame">{children}</div>
      </div>
    </div>
  )
}

type LayoutProps = {
  gameLabel: string
  steps: GuideStep[]
  stepIndex: number
  onNext: () => void
  onBackHome?: () => void
  sim: ReactNode
  className?: string
}

export function GuideLayout({
  gameLabel,
  steps,
  stepIndex,
  onNext,
  onBackHome,
  sim,
  className = 'wizard-app',
}: LayoutProps) {
  return (
    <div className={className}>
      <GuidePanel
        gameLabel={gameLabel}
        steps={steps}
        stepIndex={stepIndex}
        onNext={onNext}
        onBackHome={onBackHome}
      />
      <main className="wizard-stage guide-stage">{sim}</main>
    </div>
  )
}
