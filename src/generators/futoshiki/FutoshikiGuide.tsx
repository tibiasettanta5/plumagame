import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import { generateFutoshiki, futoshikiToSvg } from './generate'

export type FutoshikiGuideSim = 'intro' | 'latin' | 'ineq' | 'fill' | 'done'

export const FUTOSHIKI_SIMS: FutoshikiGuideSim[] = [
  'intro',
  'latin',
  'ineq',
  'fill',
  'done',
]

const DEMO = generateFutoshiki('easy', 'guide-futoshiki-demo')
const CELL = 48

function markupFor(kind: FutoshikiGuideSim): string {
  const showSolution =
    kind === 'latin' || kind === 'fill' || kind === 'done'
  return futoshikiToSvg(DEMO, showSolution, CELL)
}

export function FutoshikiGuideSimView({ kind }: { kind: FutoshikiGuideSim }) {
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} />
    </GuideSimFrame>
  )
}
