import astronaut from '../../assets/characters/astronaut.png'
import bee from '../../assets/characters/bee.png'
import bone from '../../assets/characters/bone.png'
import bunny from '../../assets/characters/bunny.png'
import carrot from '../../assets/characters/carrot.png'
import castle from '../../assets/characters/castle.png'
import cat from '../../assets/characters/cat.png'
import cheese from '../../assets/characters/cheese.png'
import child from '../../assets/characters/child.png'
import chip from '../../assets/characters/chip.png'
import fish from '../../assets/characters/fish.png'
import flower from '../../assets/characters/flower.png'
import home from '../../assets/characters/home.png'
import knight from '../../assets/characters/knight.png'
import mouse from '../../assets/characters/mouse.png'
import pirate from '../../assets/characters/pirate.png'
import planet from '../../assets/characters/planet.png'
import puppy from '../../assets/characters/puppy.png'
import robot from '../../assets/characters/robot.png'
import treasure from '../../assets/characters/treasure.png'
import type { CharacterTheme, ThemeId } from './characters'

export const CHARACTER_THEMES: CharacterTheme[] = [
  {
    id: 'mouse-cheese',
    label: 'Topo e formaggio',
    startLabel: 'Topo',
    endLabel: 'Formaggio',
    startSrc: mouse,
    endSrc: cheese,
  },
  {
    id: 'child-home',
    label: 'Bambina e casa',
    startLabel: 'Bambina',
    endLabel: 'Casa',
    startSrc: child,
    endSrc: home,
  },
  {
    id: 'astronaut-planet',
    label: 'Astronauta e pianeta',
    startLabel: 'Astronauta',
    endLabel: 'Pianeta',
    startSrc: astronaut,
    endSrc: planet,
  },
  {
    id: 'knight-castle',
    label: 'Cavaliere e castello',
    startLabel: 'Cavaliere',
    endLabel: 'Castello',
    startSrc: knight,
    endSrc: castle,
  },
  {
    id: 'cat-fish',
    label: 'Gatto e pesce',
    startLabel: 'Gatto',
    endLabel: 'Pesce',
    startSrc: cat,
    endSrc: fish,
  },
  {
    id: 'bee-flower',
    label: 'Ape e fiore',
    startLabel: 'Ape',
    endLabel: 'Fiore',
    startSrc: bee,
    endSrc: flower,
  },
  {
    id: 'pirate-treasure',
    label: 'Pirata e tesoro',
    startLabel: 'Pirata',
    endLabel: 'Tesoro',
    startSrc: pirate,
    endSrc: treasure,
  },
  {
    id: 'robot-chip',
    label: 'Robot e cristallo',
    startLabel: 'Robot',
    endLabel: 'Cristallo',
    startSrc: robot,
    endSrc: chip,
  },
  {
    id: 'bunny-carrot',
    label: 'Coniglio e carota',
    startLabel: 'Coniglio',
    endLabel: 'Carota',
    startSrc: bunny,
    endSrc: carrot,
  },
  {
    id: 'puppy-bone',
    label: 'Cucciolo e osso',
    startLabel: 'Cucciolo',
    endLabel: 'Osso',
    startSrc: puppy,
    endSrc: bone,
  },
]

export function getTheme(id: ThemeId): CharacterTheme {
  return CHARACTER_THEMES.find((t) => t.id === id) ?? CHARACTER_THEMES[0]
}
