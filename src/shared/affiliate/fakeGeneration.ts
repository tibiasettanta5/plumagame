/** Durata minima della “generazione” fittizia (ms), scala con la quantità. */
export function fakeGenerationMs(batchCount: number): number {
  const n = Math.max(1, batchCount)
  return Math.min(14_000, 4_000 + n * 350)
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Anima il progresso 0→100 durante `durationMs`. */
export function runFakeProgress(
  durationMs: number,
  onProgress: (pct: number) => void,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      // Ease-out so it “sente” come generazione
      const eased = 1 - (1 - t) ** 2.2
      onProgress(Math.round(eased * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        onProgress(100)
        resolve()
      }
    }
    frame = requestAnimationFrame(tick)
    void frame
  })
}
