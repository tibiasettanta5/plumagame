import { createPuzzleGenerator } from '../../shared/wizard/createPuzzleGenerator'
import { buildGuideSteps } from '../../i18n'
import { generateKakuro, kakuroToSvg } from './generate'
import { KakuroGuideSimView, KAKURO_SIMS } from './KakuroGuide'

export const KakuroGenerator = createPuzzleGenerator({
  titleKey: 'game.kakuro',
  game: 'kakuro',
  countLabelKey: 'wizard.countTitle.kakuro',
  yesSolutionsKey: 'sol.yes.generic',
  noSolutionsKey: 'sol.no.generic',
  restartKey: 'restart.kakuro',
  nounKey: 'noun.kakuro',
  filePrefix: 'kakuro',
  generate: generateKakuro,
  toSvg: (p, show) => kakuroToSvg(p, show),
  summaryExtra: (p, _d, t) => [{ label: t('wizard.grid'), value: `${p.size}×${p.size}` }],
  guide: {
    getSteps: (t) => buildGuideSteps(t, 'kakuro', KAKURO_SIMS),
    renderSim: (sim) => <KakuroGuideSimView kind={sim} />,
  },
})
