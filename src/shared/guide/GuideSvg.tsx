/** Strip XML declaration so markup can be inlined in the DOM. */
export function inlineSvgMarkup(markup: string): string {
  return markup.replace(/^<\?xml[^>]*>\s*/i, '').trim()
}

/** Inject content just before the closing </svg> tag. */
export function injectIntoSvg(markup: string, extra: string): string {
  return markup.replace(/<\/svg>\s*$/i, `${extra}</svg>`)
}

export function GuideSvg({
  markup,
  className,
}: {
  markup: string
  className?: string
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: inlineSvgMarkup(markup) }}
      aria-hidden
    />
  )
}
