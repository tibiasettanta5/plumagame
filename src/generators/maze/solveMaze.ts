import { openNeighbors } from './generateMaze'
import type { Maze, Point } from './types'

/** BFS shortest path from entrance to exit (unique in a perfect maze). */
export function solveMaze(maze: Maze): Point[] {
  const key = (p: Point) => `${p.x},${p.y}`
  const start = maze.entrance
  const goal = maze.exit
  const queue: Point[] = [start]
  const cameFrom = new Map<string, Point | null>()
  cameFrom.set(key(start), null)

  while (queue.length > 0) {
    const current = queue.shift()!
    if (current.x === goal.x && current.y === goal.y) break

    for (const next of openNeighbors(maze, current.x, current.y)) {
      const k = key(next)
      if (cameFrom.has(k)) continue
      cameFrom.set(k, current)
      queue.push(next)
    }
  }

  const path: Point[] = []
  let cursor: Point | null = goal
  if (!cameFrom.has(key(goal))) return path

  while (cursor) {
    path.push(cursor)
    cursor = cameFrom.get(key(cursor)) ?? null
  }
  path.reverse()
  return path
}
