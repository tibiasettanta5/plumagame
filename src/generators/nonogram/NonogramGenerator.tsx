import { createPuzzleGenerator } from '../../shared/wizard/createPuzzleGenerator'
import { buildGuideSteps } from '../../i18n'
import { generateNonogram, nonogramToSvg } from './generate'
import { NonogramGuideSimView, NONOGRAM_SIMS } from './NonogramGuide'

export const NonogramGenerator = createPuzzleGenerator({
  titleKey: 'game.nonogram',
  game: 'nonogram',
  countLabelKey: 'wizard.countTitle.nonogram',
  yesSolutionsKey: 'sol.yes.generic',
  noSolutionsKey: 'sol.no.generic',
  restartKey: 'restart.nonogram',
  nounKey: 'noun.nonogram',
  filePrefix: 'nonogram',
  generate: generateNonogram,
  toSvg: (p, show) => nonogramToSvg(p, show),
  summaryExtra: (p, _d, t) => [{ label: t('wizard.grid'), value: `${p.size}×${p.size}` }],
  guide: {
    getSteps: (t) => buildGuideSteps(t, 'nonogram', NONOGRAM_SIMS),
    renderSim: (sim) => <NonogramGuideSimView kind={sim} />,
  },
})
