import { createRng, shuffle } from '../../shared/rng'
import type { Difficulty } from '../../shared/wizard/commonSteps'

export type Island = { r: number; c: number; n: number }
export type Bridge = { a: number; b: number; count: 1 | 2 }

export type HashiPuzzle = {
  rows: number
  cols: number
  islands: Island[]
  bridges: Bridge[]
  seed: string
  difficulty: Difficulty
}

const DIM: Record<Difficulty, { rows: number; cols: number; islands: number }> = {
  easy: { rows: 5, cols: 5, islands: 6 },
  medium: { rows: 7, cols: 7, islands: 10 },
  hard: { rows: 9, cols: 9, islands: 14 },
}

function canPlace(
  islands: Island[],
  r: number,
  c: number,
  rows: number,
  cols: number,
): boolean {
  if (r < 0 || c < 0 || r >= rows || c >= cols) return false
  return !islands.some((i) => i.r === r && i.c === c)
}

export function generateHashi(
  difficulty: Difficulty,
  seed: string,
): HashiPuzzle {
  const rng = createRng(seed)
  const { rows, cols, islands: target } = DIM[difficulty]
  const islands: Island[] = []

  // Place islands with spacing
  let attempts = 0
  while (islands.length < target && attempts < 400) {
    attempts++
    const r = Math.floor(rng() * rows)
    const c = Math.floor(rng() * cols)
    if (!canPlace(islands, r, c, rows, cols)) continue
    if (islands.some((i) => Math.abs(i.r - r) + Math.abs(i.c - c) < 2)) continue
    islands.push({ r, c, n: 0 })
  }

  const bridges: Bridge[] = []
  const connected = new Set<string>()

  // Try to connect nearest neighbors horizontally/vertically
  const order = shuffle(
    Array.from({ length: islands.length }, (_, i) => i),
    rng,
  )
  for (const i of order) {
    for (const j of order) {
      if (i >= j) continue
      const A = islands[i]
      const B = islands[j]
      const sameRow = A.r === B.r
      const sameCol = A.c === B.c
      if (!sameRow && !sameCol) continue
      // check clear path
      let clear = true
      if (sameRow) {
        const c0 = Math.min(A.c, B.c) + 1
        const c1 = Math.max(A.c, B.c)
        for (let c = c0; c < c1; c++) {
          if (islands.some((x) => x.r === A.r && x.c === c)) clear = false
        }
      } else {
        const r0 = Math.min(A.r, B.r) + 1
        const r1 = Math.max(A.r, B.r)
        for (let r = r0; r < r1; r++) {
          if (islands.some((x) => x.r === r && x.c === A.c)) clear = false
        }
      }
      if (!clear) continue
      // avoid crossing existing bridges (simple: skip if too many bridges already on island)
      if (bridges.filter((b) => b.a === i || b.b === i).length >= 3) continue
      if (bridges.filter((b) => b.a === j || b.b === j).length >= 3) continue
      const count: 1 | 2 = rng() < 0.35 ? 2 : 1
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`
      if (connected.has(key)) continue
      bridges.push({ a: i, b: j, count })
      connected.add(key)
    }
  }

  // Set island numbers from bridges
  for (let i = 0; i < islands.length; i++) {
    islands[i].n = bridges
      .filter((b) => b.a === i || b.b === i)
      .reduce((s, b) => s + b.count, 0)
  }

  // Remove islands with 0 (isolated)
  const keep = islands
    .map((isl, i) => ({ isl, i }))
    .filter(({ isl }) => isl.n > 0)
  const indexMap = new Map(keep.map((k, ni) => [k.i, ni]))
  const filteredIslands = keep.map((k) => k.isl)
  const filteredBridges = bridges
    .filter((b) => indexMap.has(b.a) && indexMap.has(b.b))
    .map((b) => ({
      a: indexMap.get(b.a)!,
      b: indexMap.get(b.b)!,
      count: b.count,
    }))

  return {
    rows,
    cols,
    islands: filteredIslands.length ? filteredIslands : [{ r: 0, c: 0, n: 1 }],
    bridges: filteredBridges,
    seed,
    difficulty,
  }
}

export function hashiToSvg(
  puzzle: HashiPuzzle,
  showSolution: boolean,
  cellSize = 44,
): string {
  const { rows, cols, islands, bridges } = puzzle
  const pad = 24
  const width = pad * 2 + cols * cellSize
  const height = pad * 2 + rows * cellSize
  const parts: string[] = []

  const pos = (r: number, c: number) => ({
    x: pad + c * cellSize + cellSize / 2,
    y: pad + r * cellSize + cellSize / 2,
  })

  if (showSolution) {
    for (const b of bridges) {
      const A = islands[b.a]
      const B = islands[b.b]
      const p1 = pos(A.r, A.c)
      const p2 = pos(B.r, B.c)
      const horizontal = A.r === B.r
      if (b.count === 1) {
        parts.push(
          `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#2f5d50" stroke-width="3"/>`,
        )
      } else {
        const off = horizontal ? 4 : 0
        const offY = horizontal ? 0 : 4
        parts.push(
          `<line x1="${p1.x - offY}" y1="${p1.y - off}" x2="${p2.x - offY}" y2="${p2.y - off}" stroke="#2f5d50" stroke-width="2.5"/>`,
          `<line x1="${p1.x + offY}" y1="${p1.y + off}" x2="${p2.x + offY}" y2="${p2.y + off}" stroke="#2f5d50" stroke-width="2.5"/>`,
        )
      }
    }
  }

  for (const isl of islands) {
    const p = pos(isl.r, isl.c)
    parts.push(
      `<circle cx="${p.x}" cy="${p.y}" r="${cellSize * 0.32}" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>`,
      `<text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="${cellSize * 0.32}" font-weight="700" fill="#1a1a1a">${isl.n}</text>`,
    )
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#fff"/>
  ${parts.join('\n  ')}
</svg>`
}
