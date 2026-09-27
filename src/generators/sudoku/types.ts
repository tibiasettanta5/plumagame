export type SudokuSize = 4 | 6 | 9

export type Difficulty = 'easy' | 'medium' | 'hard'

export type ExportFormat = 'jpg' | 'pdf'

export type SudokuGrid = number[][]

export type SudokuPuzzle = {
  size: SudokuSize
  boxRows: number
  boxCols: number
  puzzle: SudokuGrid
  solution: SudokuGrid
  seed: string
  difficulty: Difficulty
}

export const SIZE_OPTIONS: Record<
  SudokuSize,
  { label: string; hint: string; boxRows: number; boxCols: number }
> = {
  4: {
    label: '4×4',
    hint: 'Per i più piccoli — caselle 2×2',
    boxRows: 2,
    boxCols: 2,
  },
  6: {
    label: '6×6',
    hint: 'Intermedio — caselle 2×3',
    boxRows: 2,
    boxCols: 3,
  },
  9: {
    label: '9×9',
    hint: 'Classico — caselle 3×3',
    boxRows: 3,
    boxCols: 3,
  },
}

/** Celle vuote obiettivo (unicità garantita ove possibile in tempo utile). */
export const EMPTY_CELLS: Record<SudokuSize, Record<Difficulty, number>> = {
  4: { easy: 5, medium: 7, hard: 9 },
  6: { easy: 12, medium: 18, hard: 22 },
  9: { easy: 35, medium: 42, hard: 48 },
}

export const DIFFICULTY_PRESETS: Record<
  Difficulty,
  { label: string; hint: string }
> = {
  easy: { label: 'Facile', hint: 'Più numeri già inseriti' },
  medium: { label: 'Medio', hint: 'Equilibrio tra indizi e sfida' },
  hard: { label: 'Difficile', hint: 'Pochi numeri di partenza' },
}
