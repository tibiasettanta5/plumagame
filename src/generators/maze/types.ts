export type Direction = 'N' | 'E' | 'S' | 'W'

export type Walls = Record<Direction, boolean>

export type Point = {
  x: number
  y: number
}

export type Cell = {
  x: number
  y: number
  walls: Walls
}

export type Maze = {
  width: number
  height: number
  cells: Cell[][]
  entrance: Point
  exit: Point
  entranceSide: Direction
  exitSide: Direction
  seed: string
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'custom'

export type ExportFormat = 'jpg' | 'pdf'

export const SIZE_MIN = 5
export const SIZE_MAX = 50

export const DIFFICULTY_PRESETS: Record<
  Exclude<Difficulty, 'custom'>,
  { width: number; height: number; label: string; hint: string }
> = {
  easy: {
    width: 10,
    height: 10,
    label: 'Facile',
    hint: '10×10 celle',
  },
  medium: {
    width: 15,
    height: 20,
    label: 'Medio',
    hint: '15×20 celle',
  },
  hard: {
    width: 25,
    height: 30,
    label: 'Difficile',
    hint: '25×30 celle',
  },
}

export function sizeForDifficulty(
  d: Difficulty,
  customWidth: number,
  customHeight: number,
): { width: number; height: number } {
  if (d === 'custom') return { width: customWidth, height: customHeight }
  return {
    width: DIFFICULTY_PRESETS[d].width,
    height: DIFFICULTY_PRESETS[d].height,
  }
}
