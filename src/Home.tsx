import { useState } from 'react'
import { useT } from './i18n'
import './Home.css'
import { BrandLogo } from './shared/BrandLogo'
import { ContactModal } from './shared/ContactModal'
import { GamePreview } from './shared/GamePreview'
import {
  LegalModal,
  SiteFooter,
  type LegalPage,
} from './shared/SiteFooter'

export type GameId =
  | 'maze'
  | 'sudoku'
  | 'nonogram'
  | 'kakuro'
  | 'futoshiki'
  | 'hashi'
  | 'battleship'

const GAMES: { id: GameId; titleKey: string; blurbKey: string }[] = [
  { id: 'maze', titleKey: 'game.maze', blurbKey: 'game.maze.blurb' },
  { id: 'sudoku', titleKey: 'game.sudoku', blurbKey: 'game.sudoku.blurb' },
  { id: 'nonogram', titleKey: 'game.nonogram', blurbKey: 'game.nonogram.blurb' },
  { id: 'kakuro', titleKey: 'game.kakuro', blurbKey: 'game.kakuro.blurb' },
  { id: 'futoshiki', titleKey: 'game.futoshiki', blurbKey: 'game.futoshiki.blurb' },
  { id: 'hashi', titleKey: 'game.hashi', blurbKey: 'game.hashi.blurb' },
  {
    id: 'battleship',
    titleKey: 'game.battleship',
    blurbKey: 'game.battleship.blurb',
  },
]

type Props = {
  onSelect: (game: GameId) => void
}

export function Home({ onSelect }: Props) {
  const t = useT()
  const [legal, setLegal] = useState<LegalPage | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="home-app">
      <div className="home-inner">
        <header className="home-brand">
          <BrandLogo className="brand-logo--home" />
          <h1>{t('home.headline')}</h1>
          <p className="home-sub">{t('home.sub')}</p>
        </header>

        <main className="home-games" id="giochi">
          <h2 className="visually-hidden">{t('footer.games')}</h2>
          {GAMES.map((g) => (
            <button
              key={g.id}
              type="button"
              className="home-game-card"
              onClick={() => onSelect(g.id)}
            >
              <GamePreview gameId={g.id} />
              <span className="home-game-card-text">
                <strong>{t(g.titleKey)}</strong>
                <span>{t(g.blurbKey)}</span>
              </span>
            </button>
          ))}
        </main>
      </div>

      <SiteFooter
        onOpenLegal={setLegal}
        onOpenContact={() => setContactOpen(true)}
      />
      {legal && (
        <LegalModal
          page={legal}
          onClose={() => setLegal(null)}
          onOpenContact={() => setContactOpen(true)}
        />
      )}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  )
}
