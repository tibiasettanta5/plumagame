import { useMemo, useState } from 'react'
import { buildGuideSteps, useT } from '../../i18n'
import {
  AffiliateFooter,
  AffiliatePopup,
  fakeGenerationMs,
  runFakeProgress,
  type DownloadPhase,
} from '../../shared/affiliate'
import { exportSudokusAsJpg, exportSudokusAsPdf, type SudokuExportItem } from './exportSudokus'
import { generateSudoku } from './generateSudoku'
import { randomSeed } from './rng'
import { SUDOKU_GUIDE_SIMS, SudokuGuideSim } from './SudokuGuide'
import { SudokuSvg } from './SudokuSvg'
import {
  type Difficulty,
  type ExportFormat,
  type SudokuSize,
} from './types'
import { GuideLayout } from '../../shared/guide'
import { BrandLogo } from '../../shared/BrandLogo'
import '../../shared/wizard/wizard.css'
import './SudokuGenerator.css'
import '../../shared/guide/guide.css'

type Step = 'size' | 'difficulty' | 'count' | 'solutions' | 'format' | 'summary'

const STEP_ORDER: Step[] = ['size', 'difficulty', 'count', 'solutions', 'format', 'summary']

const SIZE_KEYS: SudokuSize[] = [4, 6, 9]
const DIFFICULTY_KEYS: Difficulty[] = ['easy', 'medium', 'hard']

type Props = {
  onBackHome?: () => void
}

export function SudokuGenerator({ onBackHome }: Props) {
  const t = useT()
  const guideSteps = useMemo(
    () => buildGuideSteps(t, 'sudoku', SUDOKU_GUIDE_SIMS),
    [t],
  )
  const [phase, setPhase] = useState<'guide' | 'wizard'>('wizard')
  const [guideStep, setGuideStep] = useState(0)
  const [step, setStep] = useState<Step>('size')
  const [size, setSize] = useState<SudokuSize>(9)
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

  const puzzle = useMemo(
    () => generateSudoku(size, difficulty, seed),
    [size, difficulty, seed],
  )

  const cellSize = Math.max(
    28,
    Math.min(56, Math.floor(520 / puzzle.size)),
  )

  const stepIndex = Math.max(0, STEP_ORDER.indexOf(step))
  const stepTotal = STEP_ORDER.length
  const progressLabel = `${stepIndex + 1} / ${stepTotal}`

  function goToNext(from: Step) {
    const i = STEP_ORDER.indexOf(from)
    if (i >= 0 && i < STEP_ORDER.length - 1) setStep(STEP_ORDER[i + 1])
    else setStep('summary')
  }

  function selectSize(s: SudokuSize) {
    setSize(s)
    setSeed(randomSeed())
    goToNext('size')
  }

  function selectDifficulty(d: Difficulty) {
    setDifficulty(d)
    setSeed(randomSeed())
    goToNext('difficulty')
  }

  function buildBatch(): SudokuExportItem[] {
    const items: SudokuExportItem[] = []
    for (let i = 0; i < batchCount; i++) {
      items.push({
        puzzle: generateSudoku(size, difficulty, randomSeed()),
      })
    }
    return items
  }

  async function handleDownload() {
    setBusy(true)
    setDownloadPhase('generating')
    setDownloadProgress(0)
    setAffiliatePopupOpen(true)
    setStatus(
      batchCount > 1
        ? t('common.generatingN', { n: `${batchCount} ${t('noun.sudoku')}` })
        : t('common.preparingDownload'),
    )

    try {
      await runFakeProgress(fakeGenerationMs(batchCount), setDownloadProgress)

      const items =
        batchCount === 1 ? [{ puzzle }] : buildBatch()

      if (format === 'jpg') {
        await exportSudokusAsJpg(items, includeSolutions)
      } else {
        await exportSudokusAsPdf(items, includeSolutions)
      }

      setDownloadProgress(100)
      setDownloadPhase('ready')
      setStatus(
        includeSolutions
          ? t('common.downloadedWithSolutions', {
              n: items.length,
              format: format.toUpperCase(),
            })
          : t('common.downloaded', {
              n: items.length,
              format: format.toUpperCase(),
            }),
      )
    } catch (err) {
      console.error(err)
      setDownloadPhase('error')
      setStatus(t('common.errorDownload'))
    } finally {
      setBusy(false)
    }
  }

  function restartWizard() {
    setPhase('wizard')
    setGuideStep(0)
    setStep('size')
    setStatus(null)
    setAffiliatePopupOpen(false)
    setDownloadPhase('generating')
    setDownloadProgress(0)
    setSeed(randomSeed())
  }

  function startGuide() {
    setGuideStep(0)
    setPhase('guide')
  }

  function advanceGuide() {
    if (guideStep >= guideSteps.length - 1) {
      setPhase('wizard')
      setStep('size')
      return
    }
    setGuideStep((s) => s + 1)
  }

  if (phase === 'guide') {
    const current = guideSteps[guideStep]
    return (
      <GuideLayout
        className="sudoku-app"
        gameLabel={t('game.sudoku')}
        steps={guideSteps}
        stepIndex={guideStep}
        onNext={advanceGuide}
        onBackHome={onBackHome}
        sim={<SudokuGuideSim kind={current.sim} />}
      />
    )
  }

  return (
    <>
    <div className="sudoku-app">
      <aside className="wizard-panel">
        <header className="sudoku-brand">
          {onBackHome && (
            <button type="button" className="home-link" onClick={onBackHome}>
              {t('common.backHome')}
            </button>
          )}
          <BrandLogo />
          <h1>{t('game.sudoku')}</h1>
          <button type="button" className="guide-launch" onClick={startGuide}>
            {t('common.howToPlay')}
          </button>
        </header>

        <div className="wizard-progress" aria-label={`Passo ${progressLabel}`}>
          <div className="wizard-progress-track">
            <div
              className="wizard-progress-fill"
              style={{ width: `${((stepIndex + 1) / stepTotal) * 100}%` }}
            />
          </div>
          <span className="wizard-progress-label">{progressLabel}</span>
        </div>

        <div className="wizard-question" key={step}>
          {step === 'size' && (
            <>
              <h2 className="q-title">{t('wizard.gridTitle')}</h2>
              <p className="q-sub">{t('wizard.gridSub')}</p>
              <div className="answer-stack">
                {SIZE_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="answer-card"
                    onClick={() => selectSize(key)}
                  >
                    <strong>{t(`wizard.size${key}`)}</strong>
                    <span>{t(`wizard.size${key}.hint`)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'difficulty' && (
            <>
              <h2 className="q-title">{t('diff.title')}</h2>
              <p className="q-sub">{t('diff.subSudoku')}</p>
              <div className="answer-stack">
                {DIFFICULTY_KEYS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    className="answer-card"
                    onClick={() => selectDifficulty(key)}
                  >
                    <strong>{t(`diff.${key}`)}</strong>
                    <span>{t(`diff.${key}.hint`)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'count' && (
            <>
              <h2 className="q-title">{t('wizard.countTitle.sudoku')}</h2>
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
              <button
                type="button"
                className="btn accent"
                onClick={() => goToNext('count')}
              >
                {t('common.continue')}
              </button>
            </>
          )}

          {step === 'solutions' && (
            <>
              <h2 className="q-title">{t('wizard.solutionsTitle')}</h2>
              <p className="q-sub">{t('wizard.solutionsSub')}</p>
              <div className="answer-stack">
                <button
                  type="button"
                  className="answer-card"
                  onClick={() => {
                    setIncludeSolutions(true)
                    goToNext('solutions')
                  }}
                >
                  <strong>{t('common.yes')}</strong>
                  <span>{t('sol.yes.sudoku')}</span>
                </button>
                <button
                  type="button"
                  className="answer-card"
                  onClick={() => {
                    setIncludeSolutions(false)
                    goToNext('solutions')
                  }}
                >
                  <strong>{t('common.no')}</strong>
                  <span>{t('sol.no.sudoku')}</span>
                </button>
              </div>
            </>
          )}

          {step === 'format' && (
            <>
              <h2 className="q-title">{t('wizard.formatTitle')}</h2>
              <div className="answer-stack">
                <button
                  type="button"
                  className="answer-card"
                  onClick={() => {
                    setFormat('pdf')
                    setStep('summary')
                  }}
                >
                  <strong>{t('wizard.pdf')}</strong>
                  <span>{t('wizard.pdf.hint')}</span>
                </button>
                <button
                  type="button"
                  className="answer-card"
                  onClick={() => {
                    setFormat('jpg')
                    setStep('summary')
                  }}
                >
                  <strong>{t('wizard.jpg')}</strong>
                  <span>{t('wizard.jpg.hint')}</span>
                </button>
              </div>
            </>
          )}

          {step === 'summary' && (
            <>
              <h2 className="q-title">{t('common.ready')}</h2>
              <p className="q-sub">{t('common.checkDownload')}</p>
              <ul className="summary-list">
                <li>
                  <span>{t('wizard.grid')}</span>
                  <strong>{t(`wizard.size${size}`)}</strong>
                </li>
                <li>
                  <span>{t('common.difficulty')}</span>
                  <strong>{t(`diff.${difficulty}`)}</strong>
                </li>
                <li>
                  <span>{t('common.quantity')}</span>
                  <strong>{batchCount}</strong>
                </li>
                <li>
                  <span>{t('common.solutions')}</span>
                  <strong>{includeSolutions ? t('common.yes') : t('common.no')}</strong>
                </li>
                <li>
                  <span>{t('common.format')}</span>
                  <strong>{format.toUpperCase()}</strong>
                </li>
              </ul>
              <div className="actions">
                <button
                  type="button"
                  className="btn"
                  onClick={restartWizard}
                  disabled={busy}
                >
                  {t('restart.sudoku')}
                </button>
                <button
                  type="button"
                  className="btn accent"
                  onClick={handleDownload}
                  disabled={busy}
                >
                  {busy
                    ? t('common.waiting')
                    : t('common.downloadN', {
                        n: `${batchCount} ${t('noun.sudoku')}`,
                      })}
                </button>
              </div>
              {status && <p className="hint">{status}</p>}
            </>
          )}
        </div>

        <AffiliateFooter />
      </aside>

      <main className="sudoku-stage">
        <p className="preview-caption">{t('common.preview')}</p>
        <section className="preview-panel">
          <div className="preview-frame">
            <SudokuSvg
              puzzle={puzzle}
              showSolution={includeSolutions}
              cellSize={cellSize}
            />
          </div>
        </section>
      </main>
    </div>

      <AffiliatePopup
        open={affiliatePopupOpen}
        phase={downloadPhase}
        progress={downloadProgress}
        game="sudoku"
        onClose={() => setAffiliatePopupOpen(false)}
      />
    </>
  )
}
