import { createRng, shuffle } from '../../shared/rng'
import type { Difficulty } from '../../shared/wizard/commonSteps'

export type FutoshikiPuzzle = {
  size: number
  solution: number[][]
  puzzle: number[][]
  /** inequalities: '<' or '>' between horizontal neighbors; null if none */
  horiz: (null | '<' | '>')[][]
  /** between vertical neighbors */
  vert: (null | '<' | '>')[][]
  seed: string
  difficulty: Difficulty
}

const SIZE: Record<Difficulty, number> = { easy: 4, medium: 5, hard: 6 }

function latinSquare(size: number, rng: () => number): number[][] {
  const base = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => ((r + c) % size) + 1),
  )
  // shuffle rows and cols
  const rowOrder = shuffle(
    Array.from({ length: size }, (_, i) => i),
    rng,
  )
  const colOrder = shuffle(
    Array.from({ length: size }, (_, i) => i),
    rng,
  )
  const symbolMap = shuffle(
    Array.from({ length: size }, (_, i) => i + 1),
    rng,
  )
  return rowOrder.map((r) =>
    colOrder.map((c) => symbolMap[base[r][c] - 1]),
  )
}

export function generateFutoshiki(
  difficulty: Difficulty,
  seed: string,
): FutoshikiPuzzle {
  const rng = createRng(seed)
  const size = SIZE[difficulty]
  const solution = latinSquare(size, rng)

  const ineqRate =
    difficulty === 'easy' ? 0.55 : difficulty === 'medium' ? 0.4 : 0.3
  const givenRate =
    difficulty === 'easy' ? 0.35 : difficulty === 'medium' ? 0.22 : 0.12

  const horiz: (null | '<' | '>')[][] = Array.from({ length: size }, () =>
    Array(size - 1).fill(null),
  )
  const vert: (null | '<' | '>')[][] = Array.from({ length: size - 1 }, () =>
    Array(size).fill(null),
  )

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size - 1; c++) {
      if (rng() < ineqRate) {
        horiz[r][c] = solution[r][c] < solution[r][c + 1] ? '<' : '>'
      }
    }
  }
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size; c++) {
      if (rng() < ineqRate) {
        vert[r][c] = solution[r][c] < solution[r + 1][c] ? '<' : '>'
      }
    }
  }

  const puzzle = solution.map((row) =>
    row.map((v) => (rng() < givenRate ? v : 0)),
  )

  return { size, solution, puzzle, horiz, vert, seed, difficulty }
}

export function futoshikiToSvg(
  puzzle: FutoshikiPuzzle,
  showSolution: boolean,
  cellSize = 52,
): string {
  const { size, solution, puzzle: grid, horiz, vert } = puzzle
  const gap = 22
  const pad = 16
  const width = pad * 2 + size * cellSize + (size - 1) * gap
  const height = width
  const parts: string[] = []

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = pad + c * (cellSize + gap)
      const y = pad + r * (cellSize + gap)
      const val = showSolution ? solution[r][c] : grid[r][c]
      parts.push(
        `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#fff" stroke="#1a1a1a" stroke-width="2" rx="4"/>`,
      )
      if (val) {
        parts.push(
          `<text x="${x + cellSize / 2}" y="${y + cellSize / 2 + cellSize * 0.2}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="${cellSize * 0.45}" font-weight="700" fill="${showSolution && !grid[r][c] ? '#2f5d50' : '#1a1a1a'}">${val}</text>`,
        )
      }
      if (c < size - 1 && horiz[r][c]) {
        const sx = x + cellSize + gap / 2
        const sy = y + cellSize / 2 + 5
        parts.push(
          `<text x="${sx}" y="${sy}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="18" font-weight="700" fill="#1a1a1a">${horiz[r][c]}</text>`,
        )
      }
      if (r < size - 1 && vert[r][c]) {
        const sx = x + cellSize / 2
        const sy = y + cellSize + gap / 2 + 6
        // rotate conceptually: use ∧ ∨ style via < >
        const sym = vert[r][c] === '<' ? '∧' : '∨'
        parts.push(
          `<text x="${sx}" y="${sy}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="16" font-weight="700" fill="#1a1a1a">${sym}</text>`,
        )
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#fff"/>
  ${parts.join('\n  ')}
</svg>`
}
