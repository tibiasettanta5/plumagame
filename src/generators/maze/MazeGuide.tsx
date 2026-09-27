import { useMemo } from 'react'
import { GuideSimFrame } from '../../shared/guide'
import { generateMaze } from './generateMaze'
import { MazeSvg } from './MazeSvg'
import { solveMaze } from './solveMaze'
import { getTheme } from './themes'

export type MazeGuideSim =
  | 'intro'
  | 'startEnd'
  | 'walls'
  | 'path'
  | 'print'
  | 'done'

export const MAZE_GUIDE_SIMS: MazeGuideSim[] = [
  'intro',
  'startEnd',
  'walls',
  'path',
  'print',
  'done',
]

const GUIDE_SEED = 'guide-maze-demo'
const GUIDE_SIZE = 8
const GUIDE_CELL = 28

export function MazeGuideSimView({ kind }: { kind: MazeGuideSim }) {
  const theme = useMemo(() => getTheme('mouse-cheese'), [])
  const maze = useMemo(
    () => generateMaze(GUIDE_SIZE, GUIDE_SIZE, GUIDE_SEED),
    [],
  )
  const solution = useMemo(() => solveMaze(maze), [maze])

  const showSolution = kind === 'path' || kind === 'print' || kind === 'done'
  const frameClass =
    kind === 'path'
      ? 'maze-guide-path-pulse'
      : kind === 'startEnd'
        ? 'maze-guide-chars-pulse'
        : kind === 'walls'
          ? 'maze-guide-walls-pulse'
          : undefined

  return (
    <GuideSimFrame>
      <div className={frameClass}>
        <MazeSvg
          maze={maze}
          theme={theme}
          solution={solution}
          showSolution={showSolution}
          cellSize={GUIDE_CELL}
        />
      </div>
    </GuideSimFrame>
  )
}
