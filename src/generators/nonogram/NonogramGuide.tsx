import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import { generateNonogram, nonogramToSvg, type NonogramPuzzle } from './generate'

export type NonogramGuideSim =
  | 'intro'
  | 'clues'
  | 'fill'
  | 'empty'
  | 'done'

export const NONOGRAM_SIMS: NonogramGuideSim[] = [
  'intro',
  'clues',
  'fill',
  'empty',
  'done',
]

const DEMO = generateNonogram('easy', 'guide-nonogram-demo')
const CELL = 32

function emptyMarkers(puzzle: NonogramPuzzle): string {
  const { size, solution, rowClues, colClues } = puzzle
  const maxRowClue = Math.max(...rowClues.map((c) => c.length), 1)
  const maxColClue = Math.max(...colClues.map((c) => c.length), 1)
  const clueW = maxRowClue * 16
  const clueH = maxColClue * 16
  const pad = 12
  const parts: string[] = []

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (solution[r][c]) continue
      const x = pad + clueW + c * CELL
      const y = pad + clueH + r * CELL
      parts.push(
        `<rect class="guide-pulse" x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="#e4efe9"/>`,
        `<text class="guide-pulse" x="${x + CELL / 2}" y="${y + CELL / 2 + 5}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="14" fill="#2f5d50">·</text>`,
      )
    }
  }
  return parts.join('')
}

function markupFor(kind: NonogramGuideSim): string {
  const showSolution = kind === 'fill' || kind === 'empty' || kind === 'done'
  let markup = nonogramToSvg(DEMO, showSolution, CELL)
  if (kind === 'empty') {
    markup = markup.replace(/<\/svg>\s*$/i, `${emptyMarkers(DEMO)}</svg>`)
  }
  return markup
}

export function NonogramGuideSimView({ kind }: { kind: NonogramGuideSim }) {
  const className = kind === 'clues' ? 'guide-clue-pulse' : undefined
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} className={className} />
    </GuideSimFrame>
  )
}
