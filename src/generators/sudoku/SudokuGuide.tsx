import { GuideSimFrame, GuideSvg } from '../../shared/guide'
import { generateSudoku } from './generateSudoku'
import { sudokuToSvgMarkup } from './SudokuSvg'
import './SudokuGuide.css'

export type SudokuGuideSimKind =
  | 'intro'
  | 'boxes'
  | 'rowRule'
  | 'colRule'
  | 'givens'
  | 'fill'
  | 'done'

export const SUDOKU_GUIDE_SIMS: SudokuGuideSimKind[] = [
  'intro',
  'boxes',
  'rowRule',
  'colRule',
  'givens',
  'fill',
  'done',
]

const DEMO = generateSudoku(9, 'easy', 'guide-sudoku-demo')
const CELL = 34

function findFirstEmpty(): { r: number; c: number; n: number } {
  for (let r = 0; r < DEMO.size; r++) {
    for (let c = 0; c < DEMO.size; c++) {
      if (!DEMO.puzzle[r][c]) {
        return { r, c, n: DEMO.solution[r][c] }
      }
    }
  }
  return { r: 0, c: 0, n: DEMO.solution[0][0] }
}

function underlays(kind: SudokuGuideSimKind): string {
  const pad = Math.round(CELL * 0.15)
  const parts: string[] = []

  if (kind === 'boxes') {
    const tones = ['#e8f0ec', '#ffffff', '#f3ebe3']
    for (let br = 0; br < 3; br++) {
      for (let bc = 0; bc < 3; bc++) {
        parts.push(
          `<rect x="${pad + bc * 3 * CELL}" y="${pad + br * 3 * CELL}" width="${3 * CELL}" height="${3 * CELL}" fill="${tones[(br + bc) % 3]}" opacity="0.9"/>`,
        )
      }
    }
  }

  if (kind === 'rowRule') {
    parts.push(
      `<rect class="guide-pulse" x="${pad}" y="${pad + 2 * CELL}" width="${9 * CELL}" height="${CELL}" fill="#e4efe9"/>`,
    )
  }

  if (kind === 'colRule') {
    parts.push(
      `<rect class="guide-pulse" x="${pad + 4 * CELL}" y="${pad}" width="${CELL}" height="${9 * CELL}" fill="#e4efe9"/>`,
    )
  }

  if (kind === 'fill') {
    const { r, c } = findFirstEmpty()
    parts.push(
      `<rect class="guide-pulse" x="${pad + c * CELL}" y="${pad + r * CELL}" width="${CELL}" height="${CELL}" fill="#c5ddd2"/>`,
    )
  }

  return parts.join('')
}

function overlays(kind: SudokuGuideSimKind): string {
  if (kind !== 'fill') return ''
  const pad = Math.round(CELL * 0.15)
  const { r, c, n } = findFirstEmpty()
  const fontSize = Math.round(CELL * 0.48)
  const x = pad + c * CELL + CELL / 2
  const y = pad + r * CELL + CELL / 2 + fontSize * 0.35
  return `<text class="guide-pulse" x="${x}" y="${y}" text-anchor="middle" font-family="Montserrat, system-ui, sans-serif" font-size="${fontSize}" font-weight="700" fill="#2f5d50">${n}</text>`
}

function markupFor(kind: SudokuGuideSimKind): string {
  const showSolution =
    kind === 'rowRule' || kind === 'colRule' || kind === 'done'
  let markup = sudokuToSvgMarkup(DEMO, { showSolution, cellSize: CELL })
  const under = underlays(kind)
  if (under) {
    markup = markup.replace(
      /(<rect width="100%" height="100%" fill="#ffffff"\/>)/,
      `$1${under}`,
    )
  }
  const over = overlays(kind)
  if (over) {
    markup = markup.replace(/<\/svg>\s*$/i, `${over}</svg>`)
  }
  return markup
}

export function SudokuGuideSim({ kind }: { kind: SudokuGuideSimKind }) {
  return (
    <GuideSimFrame>
      <GuideSvg markup={markupFor(kind)} className="sudoku-guide-svg" />
    </GuideSimFrame>
  )
}
