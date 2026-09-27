import { useState } from 'react'
import { Home, type GameId } from './Home'
import { BattleshipGenerator } from './generators/battleship/BattleshipGenerator'
import { FutoshikiGenerator } from './generators/futoshiki/FutoshikiGenerator'
import { HashiGenerator } from './generators/hashi/HashiGenerator'
import { KakuroGenerator } from './generators/kakuro/KakuroGenerator'
import { MazeGenerator } from './generators/maze/MazeGenerator'
import { NonogramGenerator } from './generators/nonogram/NonogramGenerator'
import { SudokuGenerator } from './generators/sudoku/SudokuGenerator'

export default function App() {
  const [view, setView] = useState<'home' | GameId>('home')
  const back = () => setView('home')

  if (view === 'maze') return <MazeGenerator onBackHome={back} />
  if (view === 'sudoku') return <SudokuGenerator onBackHome={back} />
  if (view === 'nonogram') return <NonogramGenerator onBackHome={back} />
  if (view === 'kakuro') return <KakuroGenerator onBackHome={back} />
  if (view === 'futoshiki') return <FutoshikiGenerator onBackHome={back} />
  if (view === 'hashi') return <HashiGenerator onBackHome={back} />
  if (view === 'battleship') return <BattleshipGenerator onBackHome={back} />
  return <Home onSelect={setView} />
}
