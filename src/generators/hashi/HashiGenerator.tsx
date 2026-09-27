import { createPuzzleGenerator } from '../../shared/wizard/createPuzzleGenerator'
import { buildGuideSteps } from '../../i18n'
import { generateHashi, hashiToSvg } from './generate'
import { HashiGuideSimView, HASHI_SIMS } from './HashiGuide'

export const HashiGenerator = createPuzzleGenerator({
  titleKey: 'game.hashi',
  game: 'hashi',
  countLabelKey: 'wizard.countTitle.hashi',
  yesSolutionsKey: 'sol.yes.hashi',
  noSolutionsKey: 'sol.no.hashi',
  restartKey: 'restart.hashi',
  nounKey: 'noun.hashi',
  filePrefix: 'hashi',
  generate: generateHashi,
  toSvg: (p, show) => hashiToSvg(p, show),
  summaryExtra: (p, _d, t) => [
    { label: t('wizard.grid'), value: `${p.rows}×${p.cols}` },
    { label: t('wizard.islands'), value: String(p.islands.length) },
  ],
  guide: {
    getSteps: (t) => buildGuideSteps(t, 'hashi', HASHI_SIMS),
    renderSim: (sim) => <HashiGuideSimView kind={sim} />,
  },
})
