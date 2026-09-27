import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import { generateKakuro, kakuroToSvg, type KakuroPuzzle } from './generate'

export type KakuroGuideSim = 'intro' | 'clues' | 'digits' | 'fill' | 'done'

export const KAKURO_SIMS: KakuroGuideSim[] = [
  'intro',
  'clues',
  'digits',
  'fill',
  'done',
]

const DEMO = generateKakuro('easy', 'guide-kakuro-demo')
const CELL = 40

function firstWhite(puzzle: KakuroPuzzle): { r: number; c: number } | null {
  for (let r = 0; r < puzzle.size; r++) {
    for (let c = 0; c < puzzle.size; c++) {
      if (puzzle.cells[r][c].type === 'white') return { r, c }
    }
  }
  return null
}

function digitHighlight(puzzle: KakuroPuzzle): string {
  const cell = firstWhite(puzzle)
  if (!cell) return ''
  const pad = 12
  const x = pad + cell.c * CELL
  const y = pad + cell.r * CELL
  return `<rect class="guide-pulse" x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="#e4efe9" fill-opacity="0.85"/>`
}

function markupFor(kind: KakuroGuideSim): string {
  const showSolution = kind === 'fill' || kind === 'done'
  let markup = kakuroToSvg(DEMO, showSolution, CELL)
  if (kind === 'digits') {
    markup = markup.replace(/<\/svg>\s*$/i, `${digitHighlight(DEMO)}</svg>`)
  }
  return markup
}

export function KakuroGuideSimView({ kind }: { kind: KakuroGuideSim }) {
  const className = kind === 'clues' ? 'guide-clue-pulse' : undefined
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} className={className} />
    </GuideSimFrame>
  )
}
