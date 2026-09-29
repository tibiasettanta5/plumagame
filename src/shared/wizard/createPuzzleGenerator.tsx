import { useMemo, useState, type ReactNode } from 'react'
import { useT } from '../../i18n'
import type { PopupGame } from '../../shared/affiliate/popupProducts.config'
import { exportSvgPuzzlesAsJpg, exportSvgPuzzlesAsPdf, printSvgPuzzles } from '../../shared/exportSvg'
import { GuideLayout, type GuideStep } from '../../shared/guide'
import { randomSeed } from '../../shared/rng'
import { WizardShell } from '../../shared/wizard'
import {
  CountStep,
  DifficultyStep,
  FormatStep,
  SolutionsStep,
  SummaryStep,
  usePrintWizard,
  type Difficulty,
} from '../../shared/wizard/commonSteps'

type Props = {
  onBackHome?: () => void
}

export function createPuzzleGenerator<T, TSim extends string = string>(opts: {
  titleKey: string
  game: PopupGame
  countLabelKey: string
  yesSolutionsKey?: string
  noSolutionsKey?: string
  /** Se false, salta lo step soluzioni e non le include mai. Default true. */
  allowSolutions?: boolean
  restartKey: string
  nounKey: string
  filePrefix: string
  generate: (difficulty: Difficulty, seed: string) => T
  toSvg: (puzzle: T, showSolution: boolean) => string
  summaryExtra?: (
    puzzle: T,
    difficulty: Difficulty,
    t: (k: string) => string,
  ) => { label: string; value: string }[]
  previewNote?: (puzzle: T) => ReactNode
  guide?: {
    getSteps: (t: (k: string) => string) => GuideStep<TSim>[]
    renderSim: (sim: TSim) => ReactNode
  }
}) {
  function Generator({ onBackHome }: Props) {
    const t = useT()
    const [phase, setPhase] = useState<'guide' | 'wizard'>('wizard')
    const [guideStep, setGuideStep] = useState(0)
    const allowSolutions = opts.allowSolutions !== false
    const w = usePrintWizard([], { skipSolutions: !allowSolutions })
    const puzzle = useMemo(
      () => opts.generate(w.difficulty, w.seed),
      [w.difficulty, w.seed],
    )

    const includeSolutions = allowSolutions && w.includeSolutions
    const svg = opts.toSvg(puzzle, includeSolutions)
    const inline = svg.replace(/^<\?xml[^>]*>\s*/, '')
    const title = t(opts.titleKey)
    const guideSteps = opts.guide ? opts.guide.getSteps(t) : []

    async function handleDownload() {
      await w.runDownload({
        batchCount: w.batchCount,
        format: w.format,
        includeSolutions,
        statusPlural: t(opts.nounKey),
        t,
        delivery: 'download',
        download: async () => {
          const items =
            w.batchCount === 1
              ? [puzzle]
              : Array.from({ length: w.batchCount }, () =>
                  opts.generate(w.difficulty, randomSeed()),
                )
          const toSvg = (item: unknown, showSolution: boolean) =>
            opts.toSvg(item as T, showSolution)
          if (w.format === 'jpg') {
            await exportSvgPuzzlesAsJpg({
              items,
              includeSolutions,
              filePrefix: opts.filePrefix,
              zipName: `${opts.filePrefix}.zip`,
              toSvg,
            })
          } else {
            await exportSvgPuzzlesAsPdf({
              items,
              includeSolutions,
              fileName: `${opts.filePrefix}.pdf`,
              toSvg,
            })
          }
        },
      })
    }

    async function handlePrint() {
      await w.runDownload({
        batchCount: w.batchCount,
        format: w.format,
        includeSolutions,
        statusPlural: t(opts.nounKey),
        t,
        delivery: 'print',
        download: async () => {
          const items =
            w.batchCount === 1
              ? [puzzle]
              : Array.from({ length: w.batchCount }, () =>
                  opts.generate(w.difficulty, randomSeed()),
                )
          await printSvgPuzzles({
            items,
            includeSolutions,
            toSvg: (item, showSolution) => opts.toSvg(item as T, showSolution),
          })
        },
      })
    }

    function startGuide() {
      setGuideStep(0)
      setPhase('guide')
    }

    function advanceGuide() {
      if (!opts.guide) return
      if (guideStep >= guideSteps.length - 1) {
        setPhase('wizard')
        return
      }
      setGuideStep((s) => s + 1)
    }

    if (phase === 'guide' && opts.guide) {
      const current = guideSteps[guideStep]
      return (
        <GuideLayout
          gameLabel={title}
          steps={guideSteps}
          stepIndex={guideStep}
          onNext={advanceGuide}
          onBackHome={onBackHome}
          sim={opts.guide.renderSim(current.sim)}
        />
      )
    }

    let question: ReactNode = null
    if (w.step === 'difficulty') {
      question = <DifficultyStep onSelect={w.selectDifficulty} />
    } else if (w.step === 'count') {
      question = (
        <CountStep
          label={t(opts.countLabelKey)}
          batchCount={w.batchCount}
          setBatchCount={w.setBatchCount}
          onContinue={() => w.goToNext('count')}
        />
      )
    } else if (w.step === 'solutions' && allowSolutions) {
      question = (
        <SolutionsStep
          yesLabel={t(opts.yesSolutionsKey ?? 'wizard.solutionsYes')}
          noLabel={t(opts.noSolutionsKey ?? 'wizard.solutionsNo')}
          onYes={() => {
            w.setIncludeSolutions(true)
            w.goToNext('solutions')
          }}
          onNo={() => {
            w.setIncludeSolutions(false)
            w.goToNext('solutions')
          }}
        />
      )
    } else if (w.step === 'format') {
      question = (
        <FormatStep
          onPdf={() => {
            w.setFormat('pdf')
            w.setStep('summary')
          }}
          onJpg={() => {
            w.setFormat('jpg')
            w.setStep('summary')
          }}
        />
      )
    } else if (w.step === 'summary') {
      question = (
        <SummaryStep
          rows={[
            {
              label: t('common.difficulty'),
              value: t(`diff.${w.difficulty}`),
            },
            ...(opts.summaryExtra?.(puzzle, w.difficulty, t) ?? []),
            { label: t('common.quantity'), value: String(w.batchCount) },
            ...(allowSolutions
              ? [
                  {
                    label: t('common.solutions'),
                    value: includeSolutions ? t('common.yes') : t('common.no'),
                  },
                ]
              : []),
            { label: t('common.format'), value: w.format.toUpperCase() },
          ]}
          busy={w.busy}
          downloadLabel={t('common.downloadN', {
            n: `${w.batchCount} ${t(opts.nounKey)}`,
          })}
          printLabel={t('common.printN', {
            n: `${w.batchCount} ${t(opts.nounKey)}`,
          })}
          restartLabel={t(opts.restartKey)}
          onRestart={() => w.restart()}
          onDownload={handleDownload}
          onPrint={handlePrint}
          status={w.status}
        />
      )
    }

    return (
      <WizardShell
        title={title}
        onBackHome={onBackHome}
        onStartGuide={opts.guide ? startGuide : undefined}
        stepIndex={w.stepIndex}
        stepTotal={w.stepTotal}
        question={<div key={w.step}>{question}</div>}
        preview={
          <div className="preview-svg">
            <div dangerouslySetInnerHTML={{ __html: inline }} />
            {opts.previewNote?.(puzzle)}
          </div>
        }
        affiliateOpen={w.affiliatePopupOpen}
        downloadPhase={w.downloadPhase}
        downloadProgress={w.downloadProgress}
        onCloseAffiliate={() => w.setAffiliatePopupOpen(false)}
        game={opts.game}
        delivery={w.deliveryMode}
      />
    )
  }

  return Generator
}
