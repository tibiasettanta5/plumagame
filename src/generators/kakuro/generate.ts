import { createRng, shuffle } from '../../shared/rng'
import type { Difficulty } from '../../shared/wizard/commonSteps'

/** 0 = nero/indizio, >0 = cifra soluzione (cella bianca) */
export type KakuroPuzzle = {
  size: number
  /** cell type: 'black' | 'clue' | 'white' */
  cells: Array<
    | { type: 'black' }
    | { type: 'clue'; right?: number; down?: number }
    | { type: 'white'; value: number; given: boolean }
  >[]
  seed: string
  difficulty: Difficulty
}

const SIZE: Record<Difficulty, number> = { easy: 5, medium: 7, hard: 9 }

function emptyPattern(size: number, rng: () => number): boolean[][] {
  // true = white (playable)
  const grid = Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => {
      if (r === 0 || c === 0) return false
      return rng() > 0.28
    }),
  )
  // ensure some whites
  for (let i = 0; i < size; i++) {
    if (i > 0) {
      grid[1][i] = true
      grid[i][1] = true
    }
  }
  return grid
}

function fillRuns(
  white: boolean[][],
  size: number,
  rng: () => number,
): number[][] {
  const values = Array.from({ length: size }, () => Array(size).fill(0))

  // Fill row runs
  for (let r = 0; r < size; r++) {
    let c = 0
    while (c < size) {
      if (!white[r][c]) {
        c++
        continue
      }
      let end = c
      while (end < size && white[r][end]) end++
      const len = end - c
      const digits = shuffle(
        Array.from({ length: 9 }, (_, i) => i + 1),
        rng,
      ).slice(0, len)
      for (let i = 0; i < len; i++) values[r][c + i] = digits[i]
      c = end
    }
  }

  // Fix column uniqueness conflicts lightly by re-rolling conflicts
  for (let pass = 0; pass < 40; pass++) {
    let ok = true
    for (let c = 0; c < size; c++) {
      let r = 0
      while (r < size) {
        if (!white[r][c]) {
          r++
          continue
        }
        let end = r
        while (end < size && white[end][c]) end++
        const seen = new Set<number>()
        for (let i = r; i < end; i++) {
          if (seen.has(values[i][c])) {
            ok = false
            const digits = shuffle(
              Array.from({ length: 9 }, (_, i) => i + 1),
              rng,
            )
            values[i][c] = digits[0]
          }
          seen.add(values[i][c])
        }
        r = end
      }
    }
    if (ok) break
  }
  return values
}

function runSum(
  white: boolean[][],
  values: number[][],
  r: number,
  c: number,
  dir: 'right' | 'down',
): number {
  let sum = 0
  let rr = r
  let cc = c
  if (dir === 'right') cc++
  else rr++
  while (
    rr < white.length &&
    cc < white.length &&
    white[rr][cc]
  ) {
    sum += values[rr][cc]
    if (dir === 'right') cc++
    else rr++
  }
  return sum
}

export function generateKakuro(
  difficulty: Difficulty,
  seed: string,
): KakuroPuzzle {
  const rng = createRng(seed)
  const size = SIZE[difficulty]
  const white = emptyPattern(size, rng)
  const values = fillRuns(white, size, rng)

  const givenRate =
    difficulty === 'easy' ? 0.25 : difficulty === 'medium' ? 0.12 : 0.05

  const cells: KakuroPuzzle['cells'] = []
  for (let r = 0; r < size; r++) {
    const row: KakuroPuzzle['cells'][0] = []
    for (let c = 0; c < size; c++) {
      if (white[r][c]) {
        row.push({
          type: 'white',
          value: values[r][c],
          given: rng() < givenRate,
        })
      } else {
        const right =
          c + 1 < size && white[r][c + 1]
            ? runSum(white, values, r, c, 'right')
            : undefined
        const down =
          r + 1 < size && white[r + 1][c]
            ? runSum(white, values, r, c, 'down')
            : undefined
        if (right || down) row.push({ type: 'clue', right, down })
        else row.push({ type: 'black' })
      }
    }
    cells.push(row)
  }

  return { size, cells, seed, difficulty }
}

export function kakuroToSvg(
  puzzle: KakuroPuzzle,
  showSolution: boolean,
  cellSize = 40,
): string {
  const { size, cells } = puzzle
  const pad = 12
  const width = pad * 2 + size * cellSize
  const height = width
  const parts: string[] = []

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = cells[r][c]
      const x = pad + c * cellSize
      const y = pad + r * cellSize
      if (cell.type === 'black') {
        parts.push(
          `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#1a1a1a"/>`,
        )
      } else if (cell.type === 'clue') {
        parts.push(
          `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#1a1a1a"/>`,
          `<line x1="${x}" y1="${y}" x2="${x + cellSize}" y2="${y + cellSize}" stroke="#fff" stroke-width="1"/>`,
        )
        if (cell.right != null) {
          parts.push(
            `<text x="${x + cellSize * 0.72}" y="${y + cellSize * 0.38}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="${cellSize * 0.28}" fill="#fff" font-weight="600">${cell.right}</text>`,
          )
        }
        if (cell.down != null) {
          parts.push(
            `<text x="${x + cellSize * 0.3}" y="${y + cellSize * 0.78}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="${cellSize * 0.28}" fill="#fff" font-weight="600">${cell.down}</text>`,
          )
        }
      } else {
        parts.push(
          `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#fff" stroke="#1a1a1a"/>`,
        )
        if (showSolution || cell.given) {
          parts.push(
            `<text x="${x + cellSize / 2}" y="${y + cellSize / 2 + cellSize * 0.2}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="${cellSize * 0.45}" font-weight="700" fill="${showSolution && !cell.given ? '#2f5d50' : '#1a1a1a'}">${cell.value}</text>`,
          )
        }
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#fff"/>
  ${parts.join('\n  ')}
</svg>`
}
