import { createRng } from './rng'
import {
  EMPTY_CELLS,
  SIZE_OPTIONS,
  type Difficulty,
  type SudokuGrid,
  type SudokuPuzzle,
  type SudokuSize,
} from './types'

function emptyGrid(size: number): SudokuGrid {
  return Array.from({ length: size }, () => Array(size).fill(0))
}

function cloneGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map((row) => row.slice())
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const arr = items.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function isValid(
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number,
  boxRows: number,
  boxCols: number,
): boolean {
  const size = grid.length
  for (let i = 0; i < size; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false
  }
  const boxRow = Math.floor(row / boxRows) * boxRows
  const boxCol = Math.floor(col / boxCols) * boxCols
  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      if (grid[boxRow + r][boxCol + c] === num) return false
    }
  }
  return true
}

function candidates(
  grid: SudokuGrid,
  row: number,
  col: number,
  boxRows: number,
  boxCols: number,
): number[] {
  const size = grid.length
  const out: number[] = []
  for (let n = 1; n <= size; n++) {
    if (isValid(grid, row, col, n, boxRows, boxCols)) out.push(n)
  }
  return out
}

/** Cella vuota con meno candidati (MRV) — accelera moltissimo il solver. */
function findBestEmpty(
  grid: SudokuGrid,
  boxRows: number,
  boxCols: number,
): { row: number; col: number; nums: number[] } | null {
  let best: { row: number; col: number; nums: number[] } | null = null
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] !== 0) continue
      const nums = candidates(grid, r, c, boxRows, boxCols)
      if (nums.length === 0) return { row: r, col: c, nums: [] }
      if (!best || nums.length < best.nums.length) {
        best = { row: r, col: c, nums }
        if (nums.length === 1) return best
      }
    }
  }
  return best
}

function fillGrid(
  grid: SudokuGrid,
  boxRows: number,
  boxCols: number,
  rng: () => number,
): boolean {
  const empty = findBestEmpty(grid, boxRows, boxCols)
  if (!empty) return true
  if (empty.nums.length === 0) return false
  const nums = shuffle(empty.nums, rng)
  const { row, col } = empty
  for (const num of nums) {
    grid[row][col] = num
    if (fillGrid(grid, boxRows, boxCols, rng)) return true
    grid[row][col] = 0
  }
  return false
}

function countSolutions(
  grid: SudokuGrid,
  boxRows: number,
  boxCols: number,
  limit = 2,
): number {
  const empty = findBestEmpty(grid, boxRows, boxCols)
  if (!empty) return 1
  if (empty.nums.length === 0) return 0
  let count = 0
  for (const num of empty.nums) {
    grid[empty.row][empty.col] = num
    count += countSolutions(grid, boxRows, boxCols, limit)
    grid[empty.row][empty.col] = 0
    if (count >= limit) return count
  }
  return count
}

function hasUniqueSolution(
  grid: SudokuGrid,
  boxRows: number,
  boxCols: number,
): boolean {
  return countSolutions(cloneGrid(grid), boxRows, boxCols, 2) === 1
}

function digHoles(
  solution: SudokuGrid,
  size: SudokuSize,
  difficulty: Difficulty,
  boxRows: number,
  boxCols: number,
  rng: () => number,
): SudokuGrid {
  const puzzle = cloneGrid(solution)
  const targetEmpty = EMPTY_CELLS[size][difficulty]
  const cells = shuffle(
    Array.from({ length: size * size }, (_, i) => ({
      r: Math.floor(i / size),
      c: i % size,
    })),
    rng,
  )

  let emptied = 0
  for (const { r, c } of cells) {
    if (emptied >= targetEmpty) break
    const backup = puzzle[r][c]
    if (backup === 0) continue
    puzzle[r][c] = 0
    if (hasUniqueSolution(puzzle, boxRows, boxCols)) {
      emptied += 1
    } else {
      puzzle[r][c] = backup
    }
  }
  return puzzle
}

export function generateSudoku(
  size: SudokuSize,
  difficulty: Difficulty,
  seed: string,
): SudokuPuzzle {
  const { boxRows, boxCols } = SIZE_OPTIONS[size]
  const rng = createRng(seed)
  const solution = emptyGrid(size)
  if (!fillGrid(solution, boxRows, boxCols, rng)) {
    throw new Error('Impossibile generare una griglia Sudoku valida')
  }
  const puzzle = digHoles(solution, size, difficulty, boxRows, boxCols, rng)
  return {
    size,
    boxRows,
    boxCols,
    puzzle,
    solution,
    seed,
    difficulty,
  }
}
