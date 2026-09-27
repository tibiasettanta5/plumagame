import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import { generateHashi, hashiToSvg, type HashiPuzzle } from './generate'

export type HashiGuideSim = 'intro' | 'islands' | 'bridges' | 'double' | 'done'

export const HASHI_SIMS: HashiGuideSim[] = [
  'intro',
  'islands',
  'bridges',
  'double',
  'done',
]

const DEMO = generateHashi('easy', 'guide-hashi-demo')
const CELL = 44

function singlesOnly(puzzle: HashiPuzzle): HashiPuzzle {
  return {
    ...puzzle,
    bridges: puzzle.bridges
      .filter((b) => b.count === 1)
      .map((b) => ({ ...b, count: 1 as const })),
  }
}

function markupFor(kind: HashiGuideSim): string {
  if (kind === 'intro' || kind === 'islands') {
    return hashiToSvg(DEMO, false, CELL)
  }
  if (kind === 'bridges') {
    const singles = singlesOnly(DEMO)
    if (singles.bridges.length === 0 && DEMO.bridges[0]) {
      return hashiToSvg(
        { ...DEMO, bridges: [{ ...DEMO.bridges[0], count: 1 as const }] },
        true,
        CELL,
      )
    }
    return hashiToSvg(singles.bridges.length ? singles : DEMO, true, CELL)
  }
  // double + done: full real solution
  return hashiToSvg(DEMO, true, CELL)
}

export function HashiGuideSimView({ kind }: { kind: HashiGuideSim }) {
  const className =
    kind === 'islands'
      ? 'hashi-guide-islands'
      : kind === 'double'
        ? 'hashi-guide-double'
        : undefined
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} className={className} />
    </GuideSimFrame>
  )
}
