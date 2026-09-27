import {
  characterAnchor,
  characterImageMarkup,
  CharacterImage,
  characterMargin,
  characterSizeFor,
  getThemeDataUrls,
  type CharacterTheme,
} from './characters'
import type { Maze, Point } from './types'

type MazeSvgProps = {
  maze: Maze
  theme: CharacterTheme
  solution?: Point[]
  showSolution?: boolean
  cellSize?: number
  className?: string
}

function mazeGeometry(maze: Maze, cellSize: number) {
  const margin = characterMargin(cellSize)
  const stroke = Math.max(1.8, cellSize * 0.14)
  const width = maze.width * cellSize + margin * 2
  const height = maze.height * cellSize + margin * 2
  const charSize = characterSizeFor(cellSize)

  const lines: Array<{ x1: number; y1: number; x2: number; y2: number }> = []
  for (let y = 0; y < maze.height; y++) {
    for (let x = 0; x < maze.width; x++) {
      const cell = maze.cells[y][x]
      const ox = margin + x * cellSize
      const oy = margin + y * cellSize
      if (cell.walls.N) lines.push({ x1: ox, y1: oy, x2: ox + cellSize, y2: oy })
      if (cell.walls.W) lines.push({ x1: ox, y1: oy, x2: ox, y2: oy + cellSize })
      if (x === maze.width - 1 && cell.walls.E) {
        lines.push({
          x1: ox + cellSize,
          y1: oy,
          x2: ox + cellSize,
          y2: oy + cellSize,
        })
      }
      if (y === maze.height - 1 && cell.walls.S) {
        lines.push({
          x1: ox,
          y1: oy + cellSize,
          x2: ox + cellSize,
          y2: oy + cellSize,
        })
      }
    }
  }

  const start = characterAnchor(
    maze.entranceSide,
    maze.entrance.x,
    maze.entrance.y,
    cellSize,
    margin,
    charSize,
  )
  const end = characterAnchor(
    maze.exitSide,
    maze.exit.x,
    maze.exit.y,
    cellSize,
    margin,
    charSize,
  )

  return { margin, stroke, width, height, charSize, lines, start, end }
}

export function MazeSvg({
  maze,
  theme,
  solution = [],
  showSolution = false,
  cellSize = 20,
  className,
}: MazeSvgProps) {
  const { stroke, width, height, charSize, lines, start, end, margin } = mazeGeometry(
    maze,
    cellSize,
  )

  const pathD =
    showSolution && solution.length > 1
      ? solution
          .map((p, i) => {
            const cx = margin + p.x * cellSize + cellSize / 2
            const cy = margin + p.y * cellSize + cellSize / 2
            return `${i === 0 ? 'M' : 'L'} ${cx} ${cy}`
          })
          .join(' ')
      : null

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Labirinto"
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />

      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke="#c45c26"
          strokeWidth={stroke * 1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />
      )}

      <g stroke="#111111" strokeWidth={stroke} strokeLinecap="square" fill="none">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>

      <g transform={`translate(${start.x},${start.y})`}>
        <CharacterImage href={theme.startSrc} size={charSize} />
      </g>
      <g transform={`translate(${end.x},${end.y})`}>
        <CharacterImage href={theme.endSrc} size={charSize} />
      </g>
    </svg>
  )
}

export async function mazeToSvgMarkup(
  maze: Maze,
  theme: CharacterTheme,
  options: { solution?: Point[]; showSolution?: boolean; cellSize?: number } = {},
): Promise<string> {
  const cellSize =
    options.cellSize ??
    Math.max(12, Math.min(28, Math.floor(900 / Math.max(maze.width, maze.height))))
  const { stroke, width, height, charSize, lines, start, end, margin } = mazeGeometry(
    maze,
    cellSize,
  )
  const assets = await getThemeDataUrls(theme)

  const lineSvg = lines
    .map((l) => `<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}"/>`)
    .join('')

  let path = ''
  const solution = options.solution ?? []
  if (options.showSolution && solution.length > 1) {
    const d = solution
      .map((p, i) => {
        const cx = margin + p.x * cellSize + cellSize / 2
        const cy = margin + p.y * cellSize + cellSize / 2
        return `${i === 0 ? 'M' : 'L'}${cx} ${cy}`
      })
      .join(' ')
    path = `<path d="${d}" fill="none" stroke="#c45c26" stroke-width="${stroke * 1.5}" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>`
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="${width}" height="${height}" fill="#ffffff"/>
${path}
<g stroke="#111111" stroke-width="${stroke}" stroke-linecap="square" fill="none">${lineSvg}</g>
${characterImageMarkup(assets.start, start.x, start.y, charSize)}
${characterImageMarkup(assets.end, end.x, end.y, charSize)}
</svg>`
}
