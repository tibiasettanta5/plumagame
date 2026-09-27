import { createPuzzleGenerator } from '../../shared/wizard/createPuzzleGenerator'
import { buildGuideSteps } from '../../i18n'
import { futoshikiToSvg, generateFutoshiki } from './generate'
import { FutoshikiGuideSimView, FUTOSHIKI_SIMS } from './FutoshikiGuide'

export const FutoshikiGenerator = createPuzzleGenerator({
  titleKey: 'game.futoshiki',
  game: 'futoshiki',
  countLabelKey: 'wizard.countTitle.futoshiki',
  yesSolutionsKey: 'sol.yes.generic',
  noSolutionsKey: 'sol.no.generic',
  restartKey: 'restart.futoshiki',
  nounKey: 'noun.futoshiki',
  filePrefix: 'futoshiki',
  generate: generateFutoshiki,
  toSvg: (p, show) => futoshikiToSvg(p, show),
  summaryExtra: (p, _d, t) => [{ label: t('wizard.grid'), value: `${p.size}×${p.size}` }],
  guide: {
    getSteps: (t) => buildGuideSteps(t, 'futoshiki', FUTOSHIKI_SIMS),
    renderSim: (sim) => <FutoshikiGuideSimView kind={sim} />,
  },
})
