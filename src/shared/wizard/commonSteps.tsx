import { useState } from 'react'
import { useT, type TFunction } from '../../i18n'
import {
  fakeGenerationMs,
  runFakeProgress,
  type DownloadPhase,
} from '../affiliate'
import type { ExportFormat } from '../exportSvg'
import { randomSeed } from '../rng'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type DeliveryMode = 'download' | 'print'

export type CommonStep = 'difficulty' | 'count' | 'solutions' | 'format' | 'summary'

type DownloadArgs = {
  batchCount: number
  format: ExportFormat
  includeSolutions: boolean
  statusPlural: string
  download: () => Promise<void>
  t: TFunction
  delivery?: DeliveryMode
}

export function usePrintWizard(
  extraSteps: string[] = [],
  options?: { skipSolutions?: boolean },
) {
  const common = options?.skipSolutions
    ? (['difficulty', 'count', 'format', 'summary'] as const)
    : (['difficulty', 'count', 'solutions', 'format', 'summary'] as const)
  const stepOrder = [...extraSteps, ...common] as string[]
  const [step, setStep] = useState(stepOrder[0])
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [batchCount, setBatchCount] = useState(1)
  const [includeSolutions, setIncludeSolutions] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('pdf')
  const [seed, setSeed] = useState(() => randomSeed())
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [affiliatePopupOpen, setAffiliatePopupOpen] = useState(false)
  const [downloadPhase, setDownloadPhase] = useState<DownloadPhase>('generating')
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('download')

  const stepIndex = Math.max(0, stepOrder.indexOf(step))
  const stepTotal = stepOrder.length

  function goToNext(from: string) {
    const i = stepOrder.indexOf(from)
    if (i >= 0 && i < stepOrder.length - 1) setStep(stepOrder[i + 1])
    else setStep('summary')
  }

  function selectDifficulty(d: Difficulty) {
    setDifficulty(d)
    setSeed(randomSeed())
    goToNext('difficulty')
  }

  function restart(firstStep = stepOrder[0]) {
    setStep(firstStep)
    setStatus(null)
    setAffiliatePopupOpen(false)
    setDownloadPhase('generating')
    setDownloadProgress(0)
    setDeliveryMode('download')
    setSeed(randomSeed())
  }

  async function runDownload(args: DownloadArgs) {
    const { t } = args
    const delivery = args.delivery ?? 'download'
    setDeliveryMode(delivery)
    setBusy(true)
    setDownloadPhase('generating')
    setDownloadProgress(0)
    setAffiliatePopupOpen(true)
    setStatus(
      delivery === 'print'
        ? t('common.preparingPrint')
        : args.batchCount > 1
          ? t('common.generatingN', {
              n: `${args.batchCount} ${args.statusPlural}`,
            })
          : t('common.preparingDownload'),
    )
    try {
      await runFakeProgress(fakeGenerationMs(args.batchCount), setDownloadProgress)
      await args.download()
      setDownloadProgress(100)
      setDownloadPhase('ready')
      setStatus(
        delivery === 'print'
          ? t('common.printed')
          : args.includeSolutions
            ? t('common.downloadedWithSolutions', {
                n: args.batchCount,
                format: args.format.toUpperCase(),
              })
            : t('common.downloaded', {
                n: args.batchCount,
                format: args.format.toUpperCase(),
              }),
      )
    } catch (err) {
      console.error(err)
      setDownloadPhase('error')
      setStatus(
        delivery === 'print' ? t('common.errorPrint') : t('common.errorDownload'),
      )
    } finally {
      setBusy(false)
    }
  }

  return {
    step,
    setStep,
    stepOrder,
    stepIndex,
    stepTotal,
    difficulty,
    setDifficulty,
    batchCount,
    setBatchCount,
    includeSolutions,
    setIncludeSolutions,
    format,
    setFormat,
    seed,
    setSeed,
    busy,
    status,
    affiliatePopupOpen,
    setAffiliatePopupOpen,
    downloadPhase,
    downloadProgress,
    deliveryMode,
    goToNext,
    selectDifficulty,
    restart,
    runDownload,
  }
}
export function DifficultyStep({
  onSelect,
  subKey = 'diff.sub',
}: {
  onSelect: (d: Difficulty) => void
  subKey?: string
}) {
  const t = useT()
  const keys: Difficulty[] = ['easy', 'medium', 'hard']
  return (
    <>
      <h2 className="q-title">{t('diff.title')}</h2>
      <p className="q-sub">{t(subKey)}</p>
      <div className="answer-stack">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            className="answer-card"
            onClick={() => onSelect(key)}
          >
            <strong>{t(`diff.${key}`)}</strong>
            <span>{t(`diff.${key}.hint`)}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export function CountStep({
  label,
  batchCount,
  setBatchCount,
  onContinue,
}: {
  label: string
  batchCount: number
  setBatchCount: (n: number) => void
  onContinue: () => void
}) {
  const t = useT()
  return (
    <>
      <h2 className="q-title">{label}</h2>
      <p className="q-sub">{t('wizard.countSub')}</p>
      <div className="quick-counts">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className={batchCount === n ? 'chip active' : 'chip'}
            onClick={() => setBatchCount(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" className="btn accent" onClick={onContinue}>
        {t('common.continue')}
      </button>
    </>
  )
}

export function SolutionsStep({
  yesLabel,
  noLabel,
  onYes,
  onNo,
}: {
  yesLabel: string
  noLabel: string
  onYes: () => void
  onNo: () => void
}) {
  const t = useT()
  return (
    <>
      <h2 className="q-title">{t('wizard.solutionsTitle')}</h2>
      <p className="q-sub">{t('wizard.solutionsSub')}</p>
      <div className="answer-stack">
        <button type="button" className="answer-card" onClick={onYes}>
          <strong>{t('common.yes')}</strong>
          <span>{yesLabel}</span>
        </button>
        <button type="button" className="answer-card" onClick={onNo}>
          <strong>{t('common.no')}</strong>
          <span>{noLabel}</span>
        </button>
      </div>
    </>
  )
}

export function FormatStep({
  onPdf,
  onJpg,
}: {
  onPdf: () => void
  onJpg: () => void
}) {
  const t = useT()
  return (
    <>
      <h2 className="q-title">{t('wizard.formatTitle')}</h2>
      <div className="answer-stack">
        <button type="button" className="answer-card" onClick={onPdf}>
          <strong>{t('wizard.pdf')}</strong>
          <span>{t('wizard.pdf.hint')}</span>
        </button>
        <button type="button" className="answer-card" onClick={onJpg}>
          <strong>{t('wizard.jpg')}</strong>
          <span>{t('wizard.jpg.hint')}</span>
        </button>
      </div>
    </>
  )
}

export function SummaryStep({
  rows,
  busy,
  downloadLabel,
  printLabel,
  restartLabel,
  onRestart,
  onDownload,
  onPrint,
  status,
}: {
  rows: { label: string; value: string }[]
  busy: boolean
  downloadLabel: string
  printLabel: string
  restartLabel: string
  onRestart: () => void
  onDownload: () => void
  onPrint: () => void
  status: string | null
}) {
  const t = useT()
  return (
    <>
      <h2 className="q-title">{t('common.ready')}</h2>
      <p className="q-sub">{t('common.checkDownload')}</p>
      <ul className="summary-list">
        {rows.map((r) => (
          <li key={r.label}>
            <span>{r.label}</span>
            <strong>{r.value}</strong>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button type="button" className="btn" onClick={onRestart} disabled={busy}>
          {restartLabel}
        </button>
        <button type="button" className="btn" onClick={onPrint} disabled={busy}>
          {busy ? t('common.waiting') : printLabel}
        </button>
        <button
          type="button"
          className="btn accent"
          onClick={onDownload}
          disabled={busy}
        >
          {busy ? t('common.waiting') : downloadLabel}
        </button>
      </div>
      {status && <p className="hint">{status}</p>}
    </>
  )
}
