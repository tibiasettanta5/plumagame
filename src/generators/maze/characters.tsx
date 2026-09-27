import type { Direction } from './types'

export type ThemeId =
  | 'mouse-cheese'
  | 'child-home'
  | 'astronaut-planet'
  | 'knight-castle'
  | 'cat-fish'
  | 'bee-flower'
  | 'pirate-treasure'
  | 'robot-chip'
  | 'bunny-carrot'
  | 'puppy-bone'

export type CharacterTheme = {
  id: ThemeId
  label: string
  startLabel: string
  endLabel: string
  startSrc: string
  endSrc: string
}

/** Center of character, fully outside the maze opening. */
export function characterAnchor(
  side: Direction,
  cellX: number,
  cellY: number,
  cellSize: number,
  margin: number,
  charSize: number,
): { x: number; y: number } {
  const cx = margin + cellX * cellSize + cellSize / 2
  const cy = margin + cellY * cellSize + cellSize / 2
  // Keep the full image square clear of the outer wall
  const offset = charSize / 2 + Math.max(10, cellSize * 0.35)

  if (side === 'N') return { x: cx, y: margin + cellY * cellSize - offset }
  if (side === 'S') return { x: cx, y: margin + (cellY + 1) * cellSize + offset }
  if (side === 'W') return { x: margin + cellX * cellSize - offset, y: cy }
  return { x: margin + (cellX + 1) * cellSize + offset, y: cy }
}

export function characterSizeFor(cellSize: number): number {
  return Math.max(52, Math.min(80, cellSize * 2.8))
}

/** Margin = full character extent beyond the grid. */
export function characterMargin(cellSize: number): number {
  const charSize = characterSizeFor(cellSize)
  return Math.ceil(charSize + Math.max(14, cellSize * 0.5))
}

export function CharacterImage({ href, size }: { href: string; size: number }) {
  return (
    <image
      href={href}
      x={-size / 2}
      y={-size / 2}
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
    />
  )
}

const dataUrlCache = new Map<string, string>()

async function urlToDataUrl(url: string): Promise<string> {
  const hit = dataUrlCache.get(url)
  if (hit) return hit
  const res = await fetch(url)
  const blob = await res.blob()
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Lettura immagine fallita'))
    reader.readAsDataURL(blob)
  })
  dataUrlCache.set(url, dataUrl)
  return dataUrl
}

export async function getThemeDataUrls(
  theme: CharacterTheme,
): Promise<{ start: string; end: string }> {
  const [start, end] = await Promise.all([
    urlToDataUrl(theme.startSrc),
    urlToDataUrl(theme.endSrc),
  ])
  return { start, end }
}

export function characterImageMarkup(
  dataUrl: string,
  cx: number,
  cy: number,
  size: number,
): string {
  const x = cx - size / 2
  const y = cy - size / 2
  return `<image href="${dataUrl}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`
}
