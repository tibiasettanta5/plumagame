import { generateMaze } from '../src/generators/maze/generateMaze.ts'
import { solveMaze } from '../src/generators/maze/solveMaze.ts'
import { randomSeed } from '../src/generators/maze/rng.ts'

const m1 = generateMaze(15, 20, 'test-seed')
const m2 = generateMaze(15, 20, 'test-seed')
const m3 = generateMaze(15, 20, 'other-seed')
const p1 = solveMaze(m1)

const same = JSON.stringify(m1.cells) === JSON.stringify(m2.cells)
const different = JSON.stringify(m1.cells) !== JSON.stringify(m3.cells)
const first = p1[0]
const last = p1[p1.length - 1]
const reaches =
  p1.length > 0 &&
  first.x === m1.entrance.x &&
  first.y === m1.entrance.y &&
  last.x === m1.exit.x &&
  last.y === m1.exit.y

const a = randomSeed()
const b = randomSeed()
const uniqueSeeds = a !== b

console.log(
  JSON.stringify({
    same,
    different,
    pathLen: p1.length,
    reaches,
    uniqueSeeds,
    entranceSide: m1.entranceSide,
    exitSide: m1.exitSide,
  }),
)

if (!same || !different || !reaches || !uniqueSeeds) {
  process.exit(1)
}
