import { jsPDF } from 'jspdf'
import JSZip from 'jszip'
import { printJpegPages } from '../../shared/exportSvg'
import type { CharacterTheme } from './characters'
import { mazeToSvgMarkup } from './MazeSvg'
import type { Maze, Point } from './types'

export type MazeExportItem = {
  maze: Maze
  solution: Point[]
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function svgToJpegDataUrl(
  svgMarkup: string,
  scale = 2,
): Promise<{ dataUrl: string; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const match = svgMarkup.match(/width="(\d+(?:\.\d+)?)"[^>]*height="(\d+(?:\.\d+)?)"/)
    const w = match ? Number(match[1]) : 800
    const h = match ? Number(match[2]) : 800
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(w * scale)
      canvas.height = Math.round(h * scale)
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error('Canvas non disponibile'))
        return
      }
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', 0.95),
        w: canvas.width,
        h: canvas.height,
      })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Impossibile renderizzare SVG'))
    }
    img.src = url
  })
}

function pad(n: number, total: number) {
  return String(n).padStart(String(total).length, '0')
}

export async function exportMazesAsJpg(
  items: MazeExportItem[],
  theme: CharacterTheme,
  includeSolutions: boolean,
): Promise<void> {
  if (items.length === 1 && !includeSolutions) {
    const svg = await mazeToSvgMarkup(items[0].maze, theme, { showSolution: false })
    const { dataUrl } = await svgToJpegDataUrl(svg)
    const res = await fetch(dataUrl)
    downloadBlob(await res.blob(), 'labirinto.jpg')
    return
  }

  const zip = new JSZip()
  for (let i = 0; i < items.length; i++) {
    const n = pad(i + 1, items.length)
    const puzzleSvg = await mazeToSvgMarkup(items[i].maze, theme, { showSolution: false })
    const puzzle = await svgToJpegDataUrl(puzzleSvg)
    zip.file(`labirinto-${n}.jpg`, await (await fetch(puzzle.dataUrl)).blob())

    if (includeSolutions) {
      const solSvg = await mazeToSvgMarkup(items[i].maze, theme, {
        solution: items[i].solution,
        showSolution: true,
      })
      const sol = await svgToJpegDataUrl(solSvg)
      zip.file(`labirinto-${n}-soluzione.jpg`, await (await fetch(sol.dataUrl)).blob())
    }
  }
  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, includeSolutions ? 'labirinti-con-soluzioni.zip' : 'labirinti.zip')
}

export async function exportMazesAsPdf(
  items: MazeExportItem[],
  theme: CharacterTheme,
  includeSolutions: boolean,
): Promise<void> {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()
  const margin = 12
  const maxW = pageW - margin * 2
  const maxH = pageH - margin * 2
  const pxToMm = 25.4 / 96

  let first = true
  for (let i = 0; i < items.length; i++) {
    const pages = [
      await mazeToSvgMarkup(items[i].maze, theme, { showSolution: false }),
      ...(includeSolutions
        ? [
            await mazeToSvgMarkup(items[i].maze, theme, {
              solution: items[i].solution,
              showSolution: true,
            }),
          ]
        : []),
    ]

    for (const svg of pages) {
      if (!first) pdf.addPage()
      first = false
      const { dataUrl, w, h } = await svgToJpegDataUrl(svg, 2)
      const imgWmm = (w / 2) * pxToMm
      const imgHmm = (h / 2) * pxToMm
      const scale = Math.min(maxW / imgWmm, maxH / imgHmm)
      const drawW = imgWmm * scale
      const drawH = imgHmm * scale
      const x = (pageW - drawW) / 2
      const y = (pageH - drawH) / 2
      pdf.addImage(dataUrl, 'JPEG', x, y, drawW, drawH)
    }
  }

  pdf.save(items.length === 1 ? 'labirinto.pdf' : 'labirinti.pdf')
}

export async function printMazes(
  items: MazeExportItem[],
  theme: CharacterTheme,
  includeSolutions: boolean,
): Promise<void> {
  const pages: string[] = []
  for (let i = 0; i < items.length; i++) {
    const puzzleSvg = await mazeToSvgMarkup(items[i].maze, theme, {
      showSolution: false,
    })
    pages.push((await svgToJpegDataUrl(puzzleSvg, 2)).dataUrl)
    if (includeSolutions) {
      const solSvg = await mazeToSvgMarkup(items[i].maze, theme, {
        solution: items[i].solution,
        showSolution: true,
      })
      pages.push((await svgToJpegDataUrl(solSvg, 2)).dataUrl)
    }
  }
  await printJpegPages(pages)
}
