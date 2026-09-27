import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import {
  battleshipToSvg,
  generateBattleship,
  type BattleshipPuzzle,
} from './generate'

export type BattleshipGuideSim =
  | 'intro'
  | 'grid'
  | 'fleet'
  | 'place'
  | 'play'
  | 'done'

export const BATTLESHIP_SIMS: BattleshipGuideSim[] = [
  'intro',
  'grid',
  'fleet',
  'place',
  'play',
  'done',
]

const DEMO = generateBattleship('easy', 'guide-battleship-demo')
const CELL = 30

function findCell(
  puzzle: BattleshipPuzzle,
  ship: boolean,
): { r: number; c: number } | null {
  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (Boolean(puzzle.solution[r][c]) === ship) return { r, c }
    }
  }
  return null
}

function playMarkers(puzzle: BattleshipPuzzle): string {
  const pad = 28
  const label = 18
  const hit = findCell(puzzle, true)
  const miss = findCell(puzzle, false)
  const parts: string[] = []

  if (hit) {
    const x = pad + label + hit.c * CELL
    const y = pad + label + hit.r * CELL
    parts.push(
      `<rect class="guide-pulse" x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="#e74c3c"/>`,
    )
  }
  if (miss) {
    const x = pad + label + miss.c * CELL
    const y = pad + label + miss.r * CELL
    parts.push(
      `<rect class="guide-pulse" x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="#74b9ff"/>`,
    )
  }
  return parts.join('')
}

function markupFor(kind: BattleshipGuideSim): string {
  const showSolution = kind === 'place' || kind === 'play' || kind === 'done'
  let markup = battleshipToSvg(DEMO, showSolution, CELL)
  if (kind === 'play') {
    markup = markup.replace(/<\/svg>\s*$/i, `${playMarkers(DEMO)}</svg>`)
  }
  return markup
}

export function BattleshipGuideSimView({ kind }: { kind: BattleshipGuideSim }) {
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} />
    </GuideSimFrame>
  )
}
