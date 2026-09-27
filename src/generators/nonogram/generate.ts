import { createRng, hashSeed } from '../../shared/rng'
import type { Difficulty } from '../../shared/wizard/commonSteps'
import { patternsForSize } from './patterns'

export type NonogramPuzzle = {
  size: number
  solution: boolean[][]
  rowClues: number[][]
  colClues: number[][]
  seed: string
  difficulty: Difficulty
}

const SIZE: Record<Difficulty, number> = { easy: 5, medium: 8, hard: 10 }

function cluesFromLine(line: boolean[]): number[] {
  const clues: number[] = []
  let run = 0
  for (const cell of line) {
    if (cell) run += 1
    else if (run > 0) {
      clues.push(run)
      run = 0
    }
  }
  if (run > 0) clues.push(run)
  return clues.length ? clues : [0]
}

function cloneGrid(grid: boolean[][]): boolean[][] {
  return grid.map((row) => row.slice())
}

/** Specchia orizzontalmente: varietà senza perdere il senso dell’immagine. */
function mirrorH(grid: boolean[][]): boolean[][] {
  return grid.map((row) => [...row].reverse())
}

function mirrorV(grid: boolean[][]): boolean[][] {
  return [...grid].reverse()
}

export function generateNonogram(
  difficulty: Difficulty,
  seed: string,
): NonogramPuzzle {
  const rng = createRng(seed)
  const size = SIZE[difficulty]
  const pool = patternsForSize(size)
  const idx = hashSeed(seed) % pool.length
  let solution = cloneGrid(pool[idx])

  // Varianti leggere (sempre leggibili)
  if (rng() < 0.5) solution = mirrorH(solution)
  if (rng() < 0.5) solution = mirrorV(solution)

  const rowClues = solution.map((row) => cluesFromLine(row))
  const colClues = Array.from({ length: size }, (_, c) =>
    cluesFromLine(solution.map((row) => row[c])),
  )

  return { size, solution, rowClues, colClues, seed, difficulty }
}

export function nonogramToSvg(
  puzzle: NonogramPuzzle,
  showSolution: boolean,
  cellSize = 28,
): string {
  const { size, solution, rowClues, colClues } = puzzle
  const maxRowClue = Math.max(...rowClues.map((c) => c.length), 1)
  const maxColClue = Math.max(...colClues.map((c) => c.length), 1)
  const clueW = maxRowClue * 16
  const clueH = maxColClue * 16
  const pad = 12
  const gridW = size * cellSize
  const width = pad * 2 + clueW + gridW
  const height = pad * 2 + clueH + gridW

  const parts: string[] = []

  for (let c = 0; c < size; c++) {
    const clues = colClues[c]
    clues.forEach((n, i) => {
      const x = pad + clueW + c * cellSize + cellSize / 2
      const y = pad + clueH - (clues.length - i) * 14
      parts.push(
        `<text x="${x}" y="${y}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="11" font-weight="600" fill="#1a1a1a">${n}</text>`,
      )
    })
  }

  for (let r = 0; r < size; r++) {
    const clues = rowClues[r]
    clues.forEach((n, i) => {
      const x = pad + clueW - (clues.length - i) * 14
      const y = pad + clueH + r * cellSize + cellSize / 2 + 4
      parts.push(
        `<text x="${x}" y="${y}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="11" font-weight="600" fill="#1a1a1a">${n}</text>`,
      )
    })
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = pad + clueW + c * cellSize
      const y = pad + clueH + r * cellSize
      const filled = showSolution && solution[r][c]
      parts.push(
        `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${filled ? '#1a1a1a' : '#fff'}" stroke="#1a1a1a" stroke-width="1"/>`,
      )
    }
  }

  for (let i = 0; i <= size; i++) {
    if (i % 5 !== 0 && i !== 0 && i !== size) continue
    const x = pad + clueW + i * cellSize
    const y = pad + clueH + i * cellSize
    parts.push(
      `<line x1="${pad + clueW}" y1="${y}" x2="${pad + clueW + gridW}" y2="${y}" stroke="#1a1a1a" stroke-width="2"/>`,
      `<line x1="${x}" y1="${pad + clueH}" x2="${x}" y2="${pad + clueH + gridW}" stroke="#1a1a1a" stroke-width="2"/>`,
    )
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#fff"/>
  ${parts.join('\n  ')}
</svg>`
}
