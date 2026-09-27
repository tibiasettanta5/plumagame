import type { SudokuGrid, SudokuPuzzle } from './types'

export type SudokuRenderOptions = {
  showSolution?: boolean
  cellSize?: number
}

function digitFontSize(cellSize: number, size: number): number {
  if (size <= 4) return Math.round(cellSize * 0.55)
  if (size <= 6) return Math.round(cellSize * 0.5)
  return Math.round(cellSize * 0.48)
}

export function sudokuToSvgMarkup(
  puzzle: SudokuPuzzle,
  options: SudokuRenderOptions = {},
): string {
  const { showSolution = false, cellSize = 48 } = options
  const { size, boxRows, boxCols } = puzzle
  const grid: SudokuGrid = showSolution ? puzzle.solution : puzzle.puzzle
  const pad = Math.round(cellSize * 0.15)
  const width = size * cellSize + pad * 2
  const height = size * cellSize + pad * 2
  const fontSize = digitFontSize(cellSize, size)
  const thin = Math.max(1, Math.round(cellSize * 0.04))
  const thick = Math.max(2, Math.round(cellSize * 0.09))

  const lines: string[] = []
  // Outer border
  lines.push(
    `<rect x="${pad}" y="${pad}" width="${size * cellSize}" height="${size * cellSize}" fill="#fff" stroke="#1a1a1a" stroke-width="${thick}"/>`,
  )

  // Grid lines
  for (let i = 1; i < size; i++) {
    const isBox = i % boxCols === 0
    const sw = isBox ? thick : thin
    const x = pad + i * cellSize
    lines.push(
      `<line x1="${x}" y1="${pad}" x2="${x}" y2="${pad + size * cellSize}" stroke="#1a1a1a" stroke-width="${sw}"/>`,
    )
  }
  for (let i = 1; i < size; i++) {
    const isBox = i % boxRows === 0
    const sw = isBox ? thick : thin
    const y = pad + i * cellSize
    lines.push(
      `<line x1="${pad}" y1="${y}" x2="${pad + size * cellSize}" y2="${y}" stroke="#1a1a1a" stroke-width="${sw}"/>`,
    )
  }

  // Digits
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const n = grid[r][c]
      if (!n) continue
      const isGiven = puzzle.puzzle[r][c] !== 0
      const cx = pad + c * cellSize + cellSize / 2
      const cy = pad + r * cellSize + cellSize / 2 + fontSize * 0.35
      const weight = showSolution && !isGiven ? 500 : 700
      const fill =
        showSolution && !isGiven
          ? '#2f5d50'
          : '#1a1a1a'
      lines.push(
        `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Montserrat, system-ui, sans-serif" font-size="${fontSize}" font-weight="${weight}" fill="${fill}">${n}</text>`,
      )
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  ${lines.join('\n  ')}
</svg>`
}

export function SudokuSvg({
  puzzle,
  showSolution = false,
  cellSize = 48,
}: {
  puzzle: SudokuPuzzle
  showSolution?: boolean
  cellSize?: number
}) {
  const markup = sudokuToSvgMarkup(puzzle, { showSolution, cellSize })
  // Strip XML declaration for inline SVG
  const inline = markup.replace(/^<\?xml[^>]*>\s*/, '')
  return (
    <div
      className="sudoku-svg"
      dangerouslySetInnerHTML={{ __html: inline }}
    />
  )
}
