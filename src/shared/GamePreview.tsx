import type { ReactNode } from 'react'
import type { GameId } from '../Home'
import './GamePreview.css'

const SIZE = 120
const INK = '#1a1a1a'
const MUTED = '#6b6560'
const ACCENT = '#2f5d50'
const WARM = '#c45c26'
const PAPER = '#fffcf7'

type Props = {
  gameId: GameId
  className?: string
}

function Frame({
  children,
  tint = PAPER,
}: {
  children: ReactNode
  tint?: string
}) {
  return (
    <svg viewBox="0 0 120 120" width={SIZE} height={SIZE} aria-hidden>
      <rect width="120" height="120" fill={tint} />
      {children}
    </svg>
  )
}

function MazePreview() {
  const pad = 14
  const n = 4
  const cell = (120 - pad * 2) / n
  // 4×4: (0,0)→(1,0)→(2,0)→(2,1)→(2,2)→(1,2)→(1,3)→(2,3)→(3,3)
  const wallsH = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 1],
    [2, 0],
    [2, 1],
    [2, 2],
  ]
  const wallsV = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [2, 2],
    [3, 0],
    [3, 1],
    [3, 2],
  ]
  const path = [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ]
  const pts = path
    .map(([r, c], i) => {
      const x = pad + c * cell + cell / 2
      const y = pad + r * cell + cell / 2
      return `${i === 0 ? 'M' : 'L'}${x} ${y}`
    })
    .join(' ')
  const start = {
    x: pad + cell / 2,
    y: pad + cell / 2,
  }
  const end = {
    x: pad + 3.5 * cell,
    y: pad + 3.5 * cell,
  }

  return (
    <Frame tint="#f7fbf9">
      <rect
        x={pad}
        y={pad}
        width={n * cell}
        height={n * cell}
        fill="#fff"
        stroke={INK}
        strokeWidth="2.8"
      />
      {wallsH.map(([r, c]) => (
        <line
          key={`h${r}-${c}`}
          x1={pad + c * cell}
          y1={pad + (r + 1) * cell}
          x2={pad + (c + 1) * cell}
          y2={pad + (r + 1) * cell}
          stroke={INK}
          strokeWidth="2.6"
        />
      ))}
      {wallsV.map(([r, c]) => (
        <line
          key={`v${r}-${c}`}
          x1={pad + (c + 1) * cell}
          y1={pad + r * cell}
          x2={pad + (c + 1) * cell}
          y2={pad + (r + 1) * cell}
          stroke={INK}
          strokeWidth="2.6"
        />
      ))}
      <line
        x1={pad}
        y1={pad + cell * 0.2}
        x2={pad}
        y2={pad + cell * 0.8}
        stroke="#fff"
        strokeWidth="6"
      />
      <line
        x1={pad + n * cell}
        y1={pad + 3 * cell + cell * 0.2}
        x2={pad + n * cell}
        y2={pad + 3 * cell + cell * 0.8}
        stroke="#fff"
        strokeWidth="6"
      />
      <path
        d={pts}
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <circle cx={start.x} cy={start.y} r="6.5" fill={ACCENT} />
      <circle cx={start.x} cy={start.y - 1.4} r="2" fill="#fff" />
      <circle cx={end.x} cy={end.y} r="6.5" fill={WARM} />
      <rect
        x={end.x - 3.2}
        y={end.y - 1}
        width="6.4"
        height="3.2"
        rx="0.9"
        fill="#fff"
        opacity="0.95"
      />
    </Frame>
  )
}

function SudokuPreview() {
  const cell = 12
  const origin = 6
  const clues: [number, number, string][] = [
    [0, 0, '5'],
    [0, 4, '7'],
    [0, 8, '3'],
    [1, 2, '4'],
    [1, 6, '9'],
    [2, 1, '8'],
    [2, 5, '2'],
    [3, 3, '6'],
    [3, 7, '1'],
    [4, 0, '1'],
    [4, 4, '9'],
    [4, 8, '5'],
    [5, 1, '7'],
    [5, 5, '3'],
    [6, 2, '6'],
    [6, 6, '8'],
    [7, 3, '2'],
    [7, 7, '4'],
    [8, 0, '9'],
    [8, 4, '5'],
    [8, 8, '7'],
  ]
  return (
    <Frame>
      <rect
        x={origin}
        y={origin}
        width={9 * cell}
        height={9 * cell}
        fill="#fff"
        stroke={INK}
        strokeWidth="2"
      />
      {Array.from({ length: 9 }, (_, b) => {
        const br = Math.floor(b / 3)
        const bc = b % 3
        if ((br + bc) % 2 !== 0) return null
        return (
          <rect
            key={b}
            x={origin + bc * 3 * cell}
            y={origin + br * 3 * cell}
            width={3 * cell}
            height={3 * cell}
            fill="#f3efe8"
            opacity="0.9"
          />
        )
      })}
      {Array.from({ length: 10 }, (_, i) => {
        const thick = i % 3 === 0
        return (
          <g key={i}>
            <line
              x1={origin}
              y1={origin + i * cell}
              x2={origin + 9 * cell}
              y2={origin + i * cell}
              stroke={INK}
              strokeWidth={thick ? 2 : 0.7}
            />
            <line
              x1={origin + i * cell}
              y1={origin}
              x2={origin + i * cell}
              y2={origin + 9 * cell}
              stroke={INK}
              strokeWidth={thick ? 2 : 0.7}
            />
          </g>
        )
      })}
      {clues.map(([r, c, n]) => (
        <text
          key={`${r}-${c}`}
          x={origin + c * cell + cell / 2}
          y={origin + r * cell + cell / 2 + 0.4}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="8"
          fontWeight="700"
          fill={INK}
        >
          {n}
        </text>
      ))}
    </Frame>
  )
}

function NonogramPreview() {
  const cell = 14
  const ox = 28
  const oy = 28
  const heart = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ]
  const rowClues = [
    ['1', '1'],
    ['5'],
    ['5'],
    ['3'],
    ['1'],
  ]
  const colClues = ['2', '4', '4', '4', '2']
  return (
    <Frame tint="#fbf8f4">
      {rowClues.map((parts, i) =>
        parts.map((clue, j) => (
          <text
            key={`r${i}-${j}`}
            x={ox - 4 - (parts.length - 1 - j) * 8}
            y={oy + i * cell + cell / 2 + 0.5}
            textAnchor="end"
            dominantBaseline="central"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontSize="7"
            fontWeight="700"
            fill={MUTED}
          >
            {clue}
          </text>
        )),
      )}
      {colClues.map((clue, i) => (
        <text
          key={`c${i}`}
          x={ox + i * cell + cell / 2}
          y={oy - 6}
          textAnchor="middle"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="7"
          fontWeight="700"
          fill={MUTED}
        >
          {clue}
        </text>
      ))}
      {heart.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={ox + c * cell}
            y={oy + r * cell}
            width={cell}
            height={cell}
            fill={v ? INK : '#fff'}
            stroke={INK}
            strokeWidth="1.1"
          />
        )),
      )}
    </Frame>
  )
}

function KakuroPreview() {
  const size = 18
  const ox = 12
  const oy = 12
  type Cell =
    | { kind: 'block' }
    | { kind: 'clue'; down?: number; across?: number }
    | { kind: 'num'; v: number }
  const grid: Cell[][] = [
    [
      { kind: 'block' },
      { kind: 'clue', down: 16 },
      { kind: 'clue', down: 17 },
      { kind: 'block' },
      { kind: 'clue', down: 14 },
    ],
    [
      { kind: 'clue', across: 23 },
      { kind: 'num', v: 9 },
      { kind: 'num', v: 7 },
      { kind: 'clue', across: 10, down: 23 },
      { kind: 'num', v: 4 },
    ],
    [
      { kind: 'clue', across: 14 },
      { kind: 'num', v: 8 },
      { kind: 'num', v: 6 },
      { kind: 'num', v: 5 },
      { kind: 'num', v: 3 },
    ],
    [
      { kind: 'block' },
      { kind: 'clue', across: 16 },
      { kind: 'num', v: 9 },
      { kind: 'num', v: 7 },
      { kind: 'block' },
    ],
    [
      { kind: 'block' },
      { kind: 'clue', across: 17 },
      { kind: 'num', v: 8 },
      { kind: 'num', v: 9 },
      { kind: 'block' },
    ],
  ]
  return (
    <Frame>
      {grid.map((row, r) =>
        row.map((cell, c) => {
          const x = ox + c * size
          const y = oy + r * size
          if (cell.kind === 'num') {
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={size}
                  height={size}
                  fill="#fff"
                  stroke={INK}
                  strokeWidth="1.1"
                />
                <text
                  x={x + size / 2}
                  y={y + size / 2 + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Montserrat, system-ui, sans-serif"
                  fontSize="9"
                  fontWeight="700"
                  fill={INK}
                >
                  {cell.v}
                </text>
              </g>
            )
          }
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x}
                y={y}
                width={size}
                height={size}
                fill={INK}
                stroke={INK}
                strokeWidth="1.1"
              />
              {cell.kind === 'clue' && (
                <line
                  x1={x + 1.5}
                  y1={y + 1.5}
                  x2={x + size - 1.5}
                  y2={y + size - 1.5}
                  stroke="#8a8580"
                  strokeWidth="0.9"
                />
              )}
              {cell.kind === 'clue' && cell.across != null && (
                <text
                  x={x + size - 2.4}
                  y={y + 6}
                  textAnchor="end"
                  fontFamily="Montserrat, system-ui, sans-serif"
                  fontSize="6"
                  fontWeight="700"
                  fill="#fff"
                >
                  {cell.across}
                </text>
              )}
              {cell.kind === 'clue' && cell.down != null && (
                <text
                  x={x + 3}
                  y={y + size - 2.4}
                  textAnchor="start"
                  fontFamily="Montserrat, system-ui, sans-serif"
                  fontSize="6"
                  fontWeight="700"
                  fill="#fff"
                >
                  {cell.down}
                </text>
              )}
            </g>
          )
        }),
      )}
    </Frame>
  )
}

function FutoshikiPreview() {
  const n = 4
  const cell = 20
  const gap = 5
  const ox = 8
  const oy = 8
  const numbers: [number, number, string][] = [
    [0, 1, '3'],
    [1, 3, '1'],
    [2, 0, '4'],
    [3, 2, '2'],
  ]
  const ineq: { r: number; c: number; dir: 'h' | 'v'; s: string }[] = [
    { r: 0, c: 0, dir: 'h', s: '<' },
    { r: 0, c: 2, dir: 'h', s: '>' },
    { r: 1, c: 1, dir: 'v', s: '<' },
    { r: 2, c: 2, dir: 'h', s: '<' },
    { r: 2, c: 1, dir: 'v', s: '>' },
  ]
  return (
    <Frame tint="#f6faf7">
      {Array.from({ length: n }, (_, r) =>
        Array.from({ length: n }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={ox + c * (cell + gap)}
            y={oy + r * (cell + gap)}
            width={cell}
            height={cell}
            fill="#fff"
            stroke={INK}
            strokeWidth="1.6"
            rx="2.5"
          />
        )),
      )}
      {numbers.map(([r, c, num]) => (
        <text
          key={`n${r}-${c}`}
          x={ox + c * (cell + gap) + cell / 2}
          y={oy + r * (cell + gap) + cell / 2 + 0.5}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="12"
          fontWeight="700"
          fill={INK}
        >
          {num}
        </text>
      ))}
      {ineq.map(({ r, c, dir, s }, i) => {
        const x =
          dir === 'h'
            ? ox + (c + 1) * (cell + gap) - gap / 2
            : ox + c * (cell + gap) + cell / 2
        const y =
          dir === 'h'
            ? oy + r * (cell + gap) + cell / 2
            : oy + (r + 1) * (cell + gap) - gap / 2
        return (
          <text
            key={i}
            x={x}
            y={y + 0.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill={ACCENT}
          >
            {dir === 'v' ? (s === '<' ? '∧' : '∨') : s}
          </text>
        )
      })}
    </Frame>
  )
}

function HashiPreview() {
  const islands: { x: number; y: number; n: number }[] = [
    { x: 26, y: 26, n: 3 },
    { x: 94, y: 26, n: 2 },
    { x: 26, y: 94, n: 2 },
    { x: 94, y: 94, n: 3 },
    { x: 60, y: 60, n: 4 },
  ]
  return (
    <Frame tint="#f8fafb">
      <g stroke={INK} strokeLinecap="round" fill="none">
        <line x1="36" y1="22" x2="84" y2="22" strokeWidth="2" />
        <line x1="36" y1="30" x2="84" y2="30" strokeWidth="2" />
        <line x1="26" y1="36" x2="26" y2="84" strokeWidth="2.2" />
        <line x1="90" y1="36" x2="90" y2="84" strokeWidth="2" />
        <line x1="98" y1="36" x2="98" y2="84" strokeWidth="2" />
        <line x1="36" y1="94" x2="84" y2="94" strokeWidth="2.2" />
        <line x1="60" y1="49" x2="60" y2="36" strokeWidth="1.9" />
        <line x1="49" y1="60" x2="36" y2="60" strokeWidth="1.9" />
      </g>
      {islands.map(({ x, y, n }) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r="12"
            fill="#fff"
            stroke={INK}
            strokeWidth="2.2"
          />
          <text
            x={x}
            y={y + 0.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Montserrat, system-ui, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill={INK}
          >
            {n}
          </text>
        </g>
      ))}
    </Frame>
  )
}

function BattleshipPreview() {
  const cell = 13
  const cols = 6
  const rows = 6
  const ox = 18
  const oy = 16
  const ships = [
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ],
    [
      [2, 1],
      [3, 1],
      [4, 1],
    ],
    [
      [3, 4],
      [3, 5],
    ],
    [[5, 3]],
  ]
  const misses = [
    [1, 0],
    [2, 3],
    [4, 4],
    [5, 0],
  ]
  const hits = [
    [0, 2],
    [3, 1],
  ]
  return (
    <Frame tint="#f4f8fb">
      {Array.from({ length: cols }, (_, c) => (
        <text
          key={`L${c}`}
          x={ox + c * cell + cell / 2}
          y={oy - 2}
          textAnchor="middle"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="6.5"
          fontWeight="700"
          fill={MUTED}
        >
          {String.fromCharCode(65 + c)}
        </text>
      ))}
      {Array.from({ length: rows }, (_, r) => (
        <text
          key={`N${r}`}
          x={ox - 4}
          y={oy + r * cell + cell / 2}
          textAnchor="end"
          dominantBaseline="central"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="6.5"
          fontWeight="700"
          fill={MUTED}
        >
          {r + 1}
        </text>
      ))}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={ox + c * cell}
            y={oy + r * cell}
            width={cell}
            height={cell}
            fill="#fff"
            stroke={INK}
            strokeWidth="0.95"
          />
        )),
      )}
      {ships.flat().map(([r, c], i) => (
        <rect
          key={`s${i}`}
          x={ox + c * cell + 1.6}
          y={oy + r * cell + 1.6}
          width={cell - 3.2}
          height={cell - 3.2}
          rx="1.8"
          fill={ACCENT}
        />
      ))}
      {hits.map(([r, c], i) => (
        <g key={`h${i}`} stroke={WARM} strokeWidth="1.8" strokeLinecap="round">
          <line
            x1={ox + c * cell + 3.5}
            y1={oy + r * cell + 3.5}
            x2={ox + (c + 1) * cell - 3.5}
            y2={oy + (r + 1) * cell - 3.5}
          />
          <line
            x1={ox + (c + 1) * cell - 3.5}
            y1={oy + r * cell + 3.5}
            x2={ox + c * cell + 3.5}
            y2={oy + (r + 1) * cell - 3.5}
          />
        </g>
      ))}
      {misses.map(([r, c], i) => (
        <circle
          key={`m${i}`}
          cx={ox + c * cell + cell / 2}
          cy={oy + r * cell + cell / 2}
          r="2.2"
          fill="none"
          stroke={MUTED}
          strokeWidth="1.4"
        />
      ))}
    </Frame>
  )
}

const PREVIEWS: Record<GameId, () => ReactNode> = {
  maze: MazePreview,
  sudoku: SudokuPreview,
  nonogram: NonogramPreview,
  kakuro: KakuroPreview,
  futoshiki: FutoshikiPreview,
  hashi: HashiPreview,
  battleship: BattleshipPreview,
}

export function GamePreview({ gameId, className }: Props) {
  const Preview = PREVIEWS[gameId]
  return (
    <div className={['game-preview', className].filter(Boolean).join(' ')}>
      <Preview />
    </div>
  )
}
