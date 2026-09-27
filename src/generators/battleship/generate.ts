import { createRng, shuffle } from '../../shared/rng'
import type { Difficulty } from '../../shared/wizard/commonSteps'

export type BattleshipPuzzle = {
  size: number
  /** solution grid: 0 empty, 1 ship */
  solution: number[][]
  /** fleet description */
  fleet: { name: string; len: number }[]
  seed: string
  difficulty: Difficulty
}

const FLEETS: Record<Difficulty, { name: string; len: number }[]> = {
  easy: [
    { name: 'Motovedetta', len: 2 },
    { name: 'Sottomarino', len: 3 },
    { name: 'Corazzata', len: 4 },
  ],
  medium: [
    { name: 'Motovedetta', len: 2 },
    { name: 'Cacciatorpediniere', len: 3 },
    { name: 'Sottomarino', len: 3 },
    { name: 'Corazzata', len: 4 },
  ],
  hard: [
    { name: 'Motovedetta', len: 2 },
    { name: 'Cacciatorpediniere', len: 3 },
    { name: 'Sottomarino', len: 3 },
    { name: 'Corazzata', len: 4 },
    { name: 'Portaerei', len: 5 },
  ],
}

const SIZE: Record<Difficulty, number> = { easy: 8, medium: 10, hard: 10 }

function canPlace(
  grid: number[][],
  r: number,
  c: number,
  len: number,
  horiz: boolean,
): boolean {
  const size = grid.length
  for (let i = 0; i < len; i++) {
    const rr = horiz ? r : r + i
    const cc = horiz ? c + i : c
    if (rr < 0 || cc < 0 || rr >= size || cc >= size) return false
    if (grid[rr][cc]) return false
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const ar = rr + dr
        const ac = cc + dc
        if (ar < 0 || ac < 0 || ar >= size || ac >= size) continue
        if (grid[ar][ac]) return false
      }
    }
  }
  return true
}

function placeShip(
  grid: number[][],
  len: number,
  rng: () => number,
): boolean {
  const size = grid.length
  for (let attempt = 0; attempt < 80; attempt++) {
    const horiz = rng() < 0.5
    const r = Math.floor(rng() * size)
    const c = Math.floor(rng() * size)
    if (!canPlace(grid, r, c, len, horiz)) continue
    for (let i = 0; i < len; i++) {
      const rr = horiz ? r : r + i
      const cc = horiz ? c + i : c
      grid[rr][cc] = 1
    }
    return true
  }
  return false
}

export function generateBattleship(
  difficulty: Difficulty,
  seed: string,
): BattleshipPuzzle {
  const rng = createRng(seed)
  const size = SIZE[difficulty]
  const fleet = FLEETS[difficulty]
  const solution = Array.from({ length: size }, () => Array(size).fill(0))

  const order = shuffle(fleet.slice(), rng)
  for (const ship of order) {
    placeShip(solution, ship.len, rng)
  }

  return { size, solution, fleet, seed, difficulty }
}

/** Disegna una nave come catena di quadrati (esempio di occupazione celle). */
function shipIconSvg(
  x: number,
  y: number,
  len: number,
  unit: number,
): string {
  const gap = 2
  const parts: string[] = []
  for (let i = 0; i < len; i++) {
    const sx = x + i * (unit + gap)
    const isBow = i === 0
    const isStern = i === len - 1
    if (isBow) {
      // prua arrotondata a sinistra
      parts.push(
        `<path d="M ${sx + unit * 0.35} ${y} L ${sx + unit} ${y} L ${sx + unit} ${y + unit} L ${sx + unit * 0.35} ${y + unit} Q ${sx} ${y + unit / 2} ${sx + unit * 0.35} ${y} Z" fill="#2f5d50" stroke="#1a1a1a" stroke-width="1"/>`,
      )
    } else if (isStern) {
      parts.push(
        `<rect x="${sx}" y="${y}" width="${unit}" height="${unit}" rx="2" fill="#2f5d50" stroke="#1a1a1a" stroke-width="1"/>`,
      )
    } else {
      parts.push(
        `<rect x="${sx}" y="${y}" width="${unit}" height="${unit}" fill="#2f5d50" stroke="#1a1a1a" stroke-width="1"/>`,
      )
    }
  }
  // piccola cabina sul secondo pezzo se abbastanza lunga
  if (len >= 3) {
    const cx = x + (unit + gap) + unit * 0.25
    parts.push(
      `<rect x="${cx}" y="${y + 3}" width="${unit * 0.5}" height="${unit * 0.35}" fill="#fff" opacity="0.85"/>`,
    )
  }
  return parts.join('')
}

export function battleshipToSvg(
  puzzle: BattleshipPuzzle,
  showSolution: boolean,
  cellSize = 32,
): string {
  const { size, solution, fleet } = puzzle
  const pad = 28
  const label = 18
  const gridW = size * cellSize
  const unit = 18
  const rowH = 36
  const legendH = 36 + fleet.length * rowH
  const maxShipW = Math.max(...fleet.map((f) => f.len)) * (unit + 2)
  const width = Math.max(pad * 2 + label + gridW, pad * 2 + 160 + maxShipW)
  const height = pad * 2 + label + gridW + legendH

  const letters = 'ABCDEFGHIJKLMNOPQRST'
  const parts: string[] = []

  for (let c = 0; c < size; c++) {
    parts.push(
      `<text x="${pad + label + c * cellSize + cellSize / 2}" y="${pad + 12}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">${letters[c]}</text>`,
    )
  }
  for (let r = 0; r < size; r++) {
    parts.push(
      `<text x="${pad + label - 8}" y="${pad + label + r * cellSize + cellSize / 2 + 4}" text-anchor="end" font-family="Montserrat,sans-serif" font-size="12" font-weight="600" fill="#1a1a1a">${r + 1}</text>`,
    )
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = pad + label + c * cellSize
      const y = pad + label + r * cellSize
      const ship = showSolution && solution[r][c]
      parts.push(
        `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${ship ? '#2f5d50' : '#fff'}" stroke="#1a1a1a" stroke-width="1"/>`,
      )
    }
  }

  const legendY = pad + label + gridW + 26
  parts.push(
    `<text x="${pad}" y="${legendY}" font-family="Montserrat,sans-serif" font-size="13" font-weight="700" fill="#1a1a1a">${showSolution ? 'Soluzione — flotta' : 'Flotta (ogni quadrato = 1 casella)'}</text>`,
  )

  fleet.forEach((f, i) => {
    const y = legendY + 14 + i * rowH
    const iconX = pad
    const iconY = y
    parts.push(shipIconSvg(iconX, iconY, f.len, unit))
    const textX = iconX + f.len * (unit + 2) + 12
    parts.push(
      `<text x="${textX}" y="${iconY + unit * 0.72}" font-family="Montserrat,sans-serif" font-size="13" font-weight="600" fill="#1a1a1a">${f.name}</text>`,
      `<text x="${textX}" y="${iconY + unit * 0.72 + 14}" font-family="Montserrat,sans-serif" font-size="11" fill="#6b6560">${f.len} quadrat${f.len === 1 ? 'o' : 'i'}</text>`,
    )
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#fff"/>
  ${parts.join('\n  ')}
</svg>`
}
