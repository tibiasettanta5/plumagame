import { createRng } from './rng'
import type { Cell, Direction, Maze, Point, Walls } from './types'
import { SIZE_MAX, SIZE_MIN } from './types'

const OPPOSITE: Record<Direction, Direction> = {
  N: 'S',
  S: 'N',
  E: 'W',
  W: 'E',
}

const DELTA: Record<Direction, Point> = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
}

const DIRS: Direction[] = ['N', 'E', 'S', 'W']

function createCell(x: number, y: number): Cell {
  return {
    x,
    y,
    walls: { N: true, E: true, S: true, W: true },
  }
}

function createGrid(width: number, height: number): Cell[][] {
  const cells: Cell[][] = []
  for (let y = 0; y < height; y++) {
    const row: Cell[] = []
    for (let x = 0; x < width; x++) {
      row.push(createCell(x, y))
    }
    cells.push(row)
  }
  return cells
}

function inBounds(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && y >= 0 && x < width && y < height
}

function carve(a: Cell, b: Cell, dir: Direction): void {
  a.walls[dir] = false
  b.walls[OPPOSITE[dir]] = false
}

function shuffle<T>(items: T[], rand: () => number): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickIndex(rand: () => number, length: number): number {
  return Math.floor(rand() * length)
}

/** Border cells on a given side. */
function borderCells(width: number, height: number, side: Direction): Point[] {
  const pts: Point[] = []
  if (side === 'N') {
    for (let x = 0; x < width; x++) pts.push({ x, y: 0 })
  } else if (side === 'S') {
    for (let x = 0; x < width; x++) pts.push({ x, y: height - 1 })
  } else if (side === 'W') {
    for (let y = 0; y < height; y++) pts.push({ x: 0, y })
  } else {
    for (let y = 0; y < height; y++) pts.push({ x: width - 1, y })
  }
  return pts
}

function openOuterWall(cell: Cell, side: Direction): void {
  cell.walls[side] = false
}

/**
 * Growing Tree with mixed newest/random selection — organic layouts,
 * no long DFS corridors that look patterned. Random opposite-border
 * entrance/exit each time.
 */
export function generateMaze(width: number, height: number, seed: string): Maze {
  const w = Math.max(SIZE_MIN, Math.min(SIZE_MAX, Math.floor(width)))
  const h = Math.max(SIZE_MIN, Math.min(SIZE_MAX, Math.floor(height)))
  const cells = createGrid(w, h)
  const rand = createRng(seed)
  const visited = Array.from({ length: h }, () => Array(w).fill(false))

  const startX = pickIndex(rand, w)
  const startY = pickIndex(rand, h)
  const active: Point[] = [{ x: startX, y: startY }]
  visited[startY][startX] = true

  // Bias: sometimes prefer newest (long runs), sometimes random (bushy).
  // Mix per-step so each maze looks different.
  while (active.length > 0) {
    const preferNewest = rand() < 0.35
    const idx = preferNewest ? active.length - 1 : pickIndex(rand, active.length)
    const current = active[idx]
    const dirs = shuffle(DIRS, rand)
    let carved = false

    for (const dir of dirs) {
      const nx = current.x + DELTA[dir].x
      const ny = current.y + DELTA[dir].y
      if (!inBounds(nx, ny, w, h) || visited[ny][nx]) continue

      carve(cells[current.y][current.x], cells[ny][nx], dir)
      visited[ny][nx] = true
      active.push({ x: nx, y: ny })
      carved = true
      break
    }

    if (!carved) active.splice(idx, 1)
  }

  const entrySide = shuffle(DIRS, rand)[0]
  const exitSide = OPPOSITE[entrySide]
  const entrance = borderCells(w, h, entrySide)[pickIndex(rand, borderCells(w, h, entrySide).length)]
  let exit = borderCells(w, h, exitSide)[pickIndex(rand, borderCells(w, h, exitSide).length)]

  // Avoid same cell if grid is tiny / opposite borders meet at corners oddly
  let guard = 0
  while (exit.x === entrance.x && exit.y === entrance.y && guard < 20) {
    exit = borderCells(w, h, exitSide)[pickIndex(rand, borderCells(w, h, exitSide).length)]
    guard += 1
  }

  openOuterWall(cells[entrance.y][entrance.x], entrySide)
  openOuterWall(cells[exit.y][exit.x], exitSide)

  return {
    width: w,
    height: h,
    cells,
    entrance,
    exit,
    entranceSide: entrySide,
    exitSide,
    seed,
  }
}

export function openNeighbors(maze: Maze, x: number, y: number): Point[] {
  const cell = maze.cells[y][x]
  const result: Point[] = []
  for (const dir of DIRS) {
    if (cell.walls[dir as keyof Walls]) continue
    const nx = x + DELTA[dir].x
    const ny = y + DELTA[dir].y
    if (inBounds(nx, ny, maze.width, maze.height)) {
      result.push({ x: nx, y: ny })
    }
  }
  return result
}
