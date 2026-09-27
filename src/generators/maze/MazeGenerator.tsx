import { useMemo, useState } from 'react'
import { buildGuideSteps, useT } from '../../i18n'
import {
  AffiliateFooter,
  AffiliatePopup,
  fakeGenerationMs,
  runFakeProgress,
  type DownloadPhase,
} from '../../shared/affiliate'
import { GuideLayout } from '../../shared/guide'
import { BrandLogo } from '../../shared/BrandLogo'
import type { ThemeId } from './characters'
import { exportMazesAsJpg, exportMazesAsPdf, type MazeExportItem } from './exportMazes'
import { generateMaze } from './generateMaze'
import { MAZE_GUIDE_SIMS, MazeGuideSimView } from './MazeGuide'
import { MazeSvg } from './MazeSvg'
import { randomSeed } from './rng'
import { solveMaze } from './solveMaze'
import { CHARACTER_THEMES, getTheme } from './themes'
import {
  DIFFICULTY_PRESETS,
  SIZE_MAX,
  SIZE_MIN,
  sizeForDifficulty,
  type Difficulty,
  type ExportFormat,
} from './types'
import './MazeGenerator.css'
import '../../shared/guide/guide.css'

type Step =
  | 'theme'
  | 'difficulty'
  | 'customSize'
  | 'count'
  | 'solutions'
  | 'format'
  | 'summary'

const PRESET_KEYS = Object.keys(DIFFICULTY_PRESETS) as Array<keyof typeof DIFFICULTY_PRESETS>

const STEP_ORDER_BASE: Step[] = [
  'theme',
  'difficulty',
  'customSize',
  'count',
  'solutions',
  'format',
  'summary',
]

function clampSize(value: number) {
  return Math.max(SIZE_MIN, Math.min(SIZE_MAX, Math.round(value) || SIZE_MIN))
}

function difficultySummary(
  t: (key: string) => string,
  d: Difficulty,
  w: number,
  h: number,
): string {
  if (d === 'custom') return `${t('diff.custom')} (${w}×${h})`
  const preset = DIFFICULTY_PRESETS[d]
  return `${t(`diff.${d}`)} (${preset.width}×${preset.height})`
}

type Props = {
  onBackHome?: () => void
}

export function MazeGenerator({ onBackHome }: Props) {
  const t = useT()
  const guideSteps = useMemo(
    () => buildGuideSteps(t, 'maze', MAZE_GUIDE_SIMS),
    [t],
  )
  const [phase, setPhase] = useState<'guide' | 'wizard'>('wizard')
  const [guideStep, setGuideStep] = useState(0)
  const [step, setStep] = useState<Step>('theme')
  const [themeId, setThemeId] = useState<ThemeId>('mouse-cheese')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [customWidth, setCustomWidth] = useState(12)
  const [customHeight, setCustomHeight] = useState(12)
  const [batchCount, setBatchCount] = useState(1)
  const [includeSolutions, setIncludeSolutions] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('pdf')
  const [seed, setSeed] = useState(() => randomSeed())
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [affiliatePopupOpen, setAffiliatePopupOpen] = useState(false)
  const [downloadPhase, setDownloadPhase] = useState<DownloadPhase>('generating')
  const [downloadProgress, setDownloadProgress] = useState(0)

  const theme = useMemo(() => getTheme(themeId), [themeId])
  const previewSize = sizeForDifficulty(difficulty, customWidth, customHeight)
  const maze = useMemo(
    () => generateMaze(previewSize.width, previewSize.height, seed),
    [previewSize.width, previewSize.height, seed],
  )
  const solution = useMemo(() => solveMaze(maze), [maze])
  const cellSize = Math.max(
    8,
    Math.min(28, Math.floor(560 / Math.max(previewSize.width, previewSize.height))),
  )

  const activeSteps = useMemo(() => {
    return STEP_ORDER_BASE.filter((s) => {
      if (s === 'customSize') return difficulty === 'custom'
      return true
    })
  }, [difficulty])

  const stepIndex = Math.max(0, activeSteps.indexOf(step))
  const stepTotal = activeSteps.length
  const progressLabel = `${stepIndex + 1} / ${stepTotal}`

  function stepsFor(opts: { difficulty: Difficulty }): Step[] {
    return STEP_ORDER_BASE.filter((s) => {
      if (s === 'customSize') return opts.difficulty === 'custom'
      return true
    })
  }

  function goToNext(
    from: Step,
    overrides?: Partial<{ difficulty: Difficulty }>,
  ) {
    const list = stepsFor({
      difficulty: overrides?.difficulty ?? difficulty,
    })
    const i = list.indexOf(from)
    if (i >= 0 && i < list.length - 1) setStep(list[i + 1])
    else setStep('summary')
  }

  function selectTheme(id: ThemeId) {
    setThemeId(id)
    setSeed(randomSeed())
    goToNext('theme')
  }

  function selectDifficulty(d: Difficulty) {
    setDifficulty(d)
    setSeed(randomSeed())
    if (d === 'custom') setStep('customSize')
    else goToNext('difficulty', { difficulty: d })
  }

  function buildBatch(): MazeExportItem[] {
    const size = sizeForDifficulty(difficulty, customWidth, customHeight)
    const items: MazeExportItem[] = []
    for (let i = 0; i < batchCount; i++) {
      const m = generateMaze(size.width, size.height, randomSeed())
      items.push({ maze: m, solution: solveMaze(m) })
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
        ? t('common.generatingN', { n: `${batchCount} ${t('noun.mazes')}` })
        : t('common.preparingDownload'),
    )

    try {
      // Finta generazione: popup visibile con prodotti Amazon mentre aspetta
      await runFakeProgress(fakeGenerationMs(batchCount), setDownloadProgress)

      const items =
        batchCount === 1
          ? [{ maze, solution: solveMaze(maze) }]
          : buildBatch()

      if (format === 'jpg') {
        await exportMazesAsJpg(items, theme, includeSolutions)
      } else {
        await exportMazesAsPdf(items, theme, includeSolutions)
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

  const difficultySummaryText = difficultySummary(
    t,
    difficulty,
    customWidth,
    customHeight,
  )

  function startGuide() {
    setGuideStep(0)
    setPhase('guide')
  }

  function advanceGuide() {
    if (guideStep >= guideSteps.length - 1) {
      setPhase('wizard')
      return
    }
    setGuideStep((s) => s + 1)
  }

  if (phase === 'guide') {
    const current = guideSteps[guideStep]
    return (
      <GuideLayout
        className="maze-app"
        gameLabel={t('game.maze')}
        steps={guideSteps}
        stepIndex={guideStep}
        onNext={advanceGuide}
        onBackHome={onBackHome}
        sim={<MazeGuideSimView kind={current.sim} />}
      />
    )
  }

  return (
    <>
    <div className="maze-app">
      <aside className="wizard-panel">
        <header className="maze-brand">
          {onBackHome && (
            <button type="button" className="home-link" onClick={onBackHome}>
              {t('common.backHome')}
            </button>
          )}
          <BrandLogo />
          <h1>{t('game.maze')}</h1>
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
          {step === 'theme' && (
            <>
              <h2 className="q-title">{t('wizard.themeTitle')}</h2>
              <p className="q-sub">{t('wizard.themeSub')}</p>
              <div className="theme-grid">
                {CHARACTER_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={themeId === t.id ? 'theme-card active' : 'theme-card'}
                    onClick={() => selectTheme(t.id)}
                  >
                    <span className="theme-thumbs">
                      <img src={t.startSrc} alt="" />
                      <img src={t.endSrc} alt="" />
                    </span>
                    <span className="theme-label">{t.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'difficulty' && (
            <>
              <h2 className="q-title">{t('diff.title')}</h2>
              <p className="q-sub">{t('diff.subMaze')}</p>
              <div className="answer-stack">
                {PRESET_KEYS.map((key) => (
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
                <button
                  type="button"
                  className="answer-card"
                  onClick={() => selectDifficulty('custom')}
                >
                  <strong>{t('diff.custom')}</strong>
                  <span>{t('diff.custom.hint')}</span>
                </button>
              </div>
            </>
          )}

          {step === 'customSize' && (
            <>
              <h2 className="q-title">{t('wizard.customSizeTitle')}</h2>
              <p className="q-sub">
                {t('wizard.customSizeSub', { min: SIZE_MIN, max: SIZE_MAX })}
              </p>
              <div className="field-row">
                <label className="field">
                  <span>{t('wizard.cellsH')}</span>
                  <input
                    type="number"
                    min={SIZE_MIN}
                    max={SIZE_MAX}
                    value={customWidth}
                    onChange={(e) => {
                      setCustomWidth(clampSize(Number(e.target.value)))
                      setSeed(randomSeed())
                    }}
                  />
                </label>
                <label className="field">
                  <span>{t('wizard.cellsV')}</span>
                  <input
                    type="number"
                    min={SIZE_MIN}
                    max={SIZE_MAX}
                    value={customHeight}
                    onChange={(e) => {
                      setCustomHeight(clampSize(Number(e.target.value)))
                      setSeed(randomSeed())
                    }}
                  />
                </label>
              </div>
              <button
                type="button"
                className="btn accent"
                onClick={() => goToNext('customSize')}
              >
                {t('common.continue')}
              </button>
            </>
          )}

          {step === 'count' && (
            <>
              <h2 className="q-title">{t('wizard.countTitle.mazes')}</h2>
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
                  <span>{t('sol.yes.maze')}</span>
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
                  <span>{t('sol.no.maze')}</span>
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
                  <span>{t('wizard.characters')}</span>
                  <strong>{theme.label}</strong>
                </li>
                <li>
                  <span>{t('common.difficulty')}</span>
                  <strong>{difficultySummaryText}</strong>
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
                  onClick={() => {
                    setStep('theme')
                    setStatus(null)
                    setAffiliatePopupOpen(false)
                    setDownloadPhase('generating')
                    setDownloadProgress(0)
                    setSeed(randomSeed())
                  }}
                  disabled={busy}
                >
                  {t('restart.maze')}
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
                        n: `${batchCount} ${t('noun.mazes')}`,
                      })}
                </button>
              </div>
              {status && <p className="hint">{status}</p>}
            </>
          )}
        </div>

        <AffiliateFooter />
      </aside>

      <main className="maze-stage">
        <p className="preview-caption">{t('common.preview')}</p>
        <section className="preview-panel">
          <div className="preview-frame">
            <MazeSvg
              maze={maze}
              theme={theme}
              solution={solution}
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
        game="maze"
        onClose={() => setAffiliatePopupOpen(false)}
      />
    </>
  )
}
