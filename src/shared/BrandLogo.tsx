import './BrandLogo.css'

type Props = {
  className?: string
}

/** Logo Plumagame — sostituisce la vecchia scritta “Giochi stampabili”. */
export function BrandLogo({ className = '' }: Props) {
  return (
    <img
      src="/plumagame-logo.png"
      alt="Plumagame"
      className={`brand-logo ${className}`.trim()}
      width={505}
      height={91}
      decoding="async"
    />
  )
}
