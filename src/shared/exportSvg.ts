import { jsPDF } from 'jspdf'
import JSZip from 'jszip'

export type ExportFormat = 'jpg' | 'pdf'

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function svgToJpegDataUrl(
  svgMarkup: string,
  scale = 2,
): Promise<{ dataUrl: string; w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const match = svgMarkup.match(/width="(\d+(?:\.\d+)?)"[^>]*height="(\d+(?:\.\d+)?)"/)
    const w = match ? Number(match[1]) : 800
    const h = match ? Number(match[2]) : 800
    // data: URL è più affidabile del Blob per SVG con unicode (es. ∧ ∨ in Futoshiki)
    const url =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(w * scale)
      canvas.height = Math.round(h * scale)
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas non disponibile'))
        return
      }
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', 0.95),
        w: canvas.width,
        h: canvas.height,
      })
    }
    img.onerror = () => {
      reject(new Error('Impossibile renderizzare SVG'))
    }
    img.src = url
  })
}

function pad(n: number, total: number) {
  return String(n).padStart(String(total).length, '0')
}

export async function exportSvgPuzzlesAsJpg(opts: {
  items: unknown[]
  includeSolutions: boolean
  filePrefix: string
  zipName: string
  toSvg: (item: unknown, showSolution: boolean) => string
}): Promise<void> {
  const { items, includeSolutions, filePrefix, zipName, toSvg } = opts
  if (items.length === 1 && !includeSolutions) {
    const { dataUrl } = await svgToJpegDataUrl(toSvg(items[0], false))
    downloadBlob(await (await fetch(dataUrl)).blob(), `${filePrefix}.jpg`)
    return
  }
  const zip = new JSZip()
  for (let i = 0; i < items.length; i++) {
    const n = pad(i + 1, items.length)
    const puzzle = await svgToJpegDataUrl(toSvg(items[i], false))
    zip.file(`${filePrefix}-${n}.jpg`, await (await fetch(puzzle.dataUrl)).blob())
    if (includeSolutions) {
      const sol = await svgToJpegDataUrl(toSvg(items[i], true))
      zip.file(`${filePrefix}-${n}-soluzione.jpg`, await (await fetch(sol.dataUrl)).blob())
    }
  }
  downloadBlob(await zip.generateAsync({ type: 'blob' }), zipName)
}

export async function exportSvgPuzzlesAsPdf(opts: {
  items: unknown[]
  includeSolutions: boolean
  fileName: string
  toSvg: (item: unknown, showSolution: boolean) => string
}): Promise<void> {
  const { items, includeSolutions, fileName, toSvg } = opts
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
      toSvg(items[i], false),
      ...(includeSolutions ? [toSvg(items[i], true)] : []),
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
      pdf.addImage(dataUrl, 'JPEG', (pageW - drawW) / 2, (pageH - drawH) / 2, drawW, drawH)
    }
  }
  pdf.save(fileName)
}
