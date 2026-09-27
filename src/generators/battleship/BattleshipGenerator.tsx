import { createPuzzleGenerator } from '../../shared/wizard/createPuzzleGenerator'
import { buildGuideSteps } from '../../i18n'
import { BattleshipGuideSimView, BATTLESHIP_SIMS } from './BattleshipGuide'
import { battleshipToSvg, generateBattleship } from './generate'

export const BattleshipGenerator = createPuzzleGenerator({
  titleKey: 'game.battleship',
  game: 'battleship',
  countLabelKey: 'wizard.countTitle.battleship',
  allowSolutions: false,
  restartKey: 'restart.battleship',
  nounKey: 'noun.grids',
  filePrefix: 'battaglia-navale',
  generate: generateBattleship,
  toSvg: (p, show) => battleshipToSvg(p, show),
  summaryExtra: (p, _d, t) => [
    { label: t('wizard.grid'), value: `${p.size}×${p.size}` },
    { label: t('wizard.ships'), value: String(p.fleet.length) },
  ],
  guide: {
    getSteps: (t) => buildGuideSteps(t, 'battleship', BATTLESHIP_SIMS),
    renderSim: (sim) => <BattleshipGuideSimView kind={sim} />,
  },
})
