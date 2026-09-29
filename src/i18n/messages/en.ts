import type { Dict } from '../types'

/** Dizionario master (inglese). */
export const en: Dict = {
  'common.continue': 'Continue',
  'common.next': 'Next',
  'common.yes': 'Yes',
  'common.no': 'No',
  'common.waiting': 'Please wait…',
  'common.preview': 'Preview',
  'common.howToPlay': 'How to play',
  'common.startCreating': 'Start creating',
  'common.backHome': '← All games',
  'common.ready': 'All set',
  'common.checkDownload': 'Check your choices and download.',
  'common.solutions': 'Solutions',
  'common.format': 'Format',
  'common.quantity': 'Quantity',
  'common.difficulty': 'Difficulty',
  'common.errorDownload': 'Download error. Please try again.',
  'common.preparingDownload': 'Preparing download…',
  'common.generatingN': 'Generating {n}…',
  'common.downloaded': 'Downloaded: {n} file(s) ({format}).',
  'common.downloadedWithSolutions':
    'Downloaded: {n} + solutions ({format}).',
  'common.downloadN': 'Download {n}',
  'common.printN': 'Print {n}',
  'common.preparingPrint': 'Preparing print…',
  'common.printed': 'Print dialog opened.',
  'common.errorPrint': 'Print error. Please try again.',
  'common.guide': 'Guide · {game}',
  'common.comeSiGioca': 'How to play',

  'home.headline': 'Create unique printable games',
  'home.sub':
    'Pick a game, set difficulty and how many, then download PDF or JPG ready for your printer.',

  'game.maze': 'Mazes',
  'game.maze.blurb': 'Unique paths with characters at the start and end.',
  'game.sudoku': 'Sudoku',
  'game.sudoku.blurb': '4×4, 6×6 or 9×9 grids, with difficulty and solutions.',
  'game.nonogram': 'Nonogram / Picross',
  'game.nonogram.blurb': 'Row and column clues reveal a picture.',
  'game.kakuro': 'Kakuro',
  'game.kakuro.blurb': 'Sums and digits like a numeric crossword.',
  'game.futoshiki': 'Futoshiki',
  'game.futoshiki.blurb': 'A Latin square with inequalities between cells.',
  'game.hashi': 'Hashi',
  'game.hashi.blurb': 'Connect islands with one or two bridges.',
  'game.battleship': 'Battleship',
  'game.battleship.blurb': 'Printable empty grids with a fleet list to place.',

  'diff.easy': 'Easy',
  'diff.easy.hint': 'Easier to solve',
  'diff.medium': 'Medium',
  'diff.medium.hint': 'Balanced challenge',
  'diff.hard': 'Hard',
  'diff.hard.hint': 'More challenging',
  'diff.custom': 'Custom',
  'diff.custom.hint': 'Choose the number of cells yourself',
  'diff.title': 'How hard should it be?',
  'diff.sub': 'Choose the challenge level.',
  'diff.subMaze': 'Pick a preset or a custom grid.',
  'diff.subSudoku': 'It depends on how many numbers are already filled.',

  'wizard.countTitle': 'How many do you want to generate?',
  'wizard.countTitle.mazes': 'How many mazes do you want to generate?',
  'wizard.countTitle.sudoku': 'How many sudokus do you want to generate?',
  'wizard.countTitle.nonogram': 'How many nonograms do you want to generate?',
  'wizard.countTitle.kakuro': 'How many kakuro puzzles do you want?',
  'wizard.countTitle.futoshiki': 'How many futoshiki puzzles do you want?',
  'wizard.countTitle.hashi': 'How many hashi puzzles do you want?',
  'wizard.countTitle.battleship': 'How many grids do you want to generate?',
  'wizard.countSub':
    'From 1 to 3, all the same difficulty, but not identical to each other.',
  'wizard.solutionsTitle': 'Include solutions too?',
  'wizard.solutionsSub':
    'If yes, you will see them in the preview and download them with the files.',
  'wizard.solutionsYes': 'Puzzles + solutions',
  'wizard.solutionsNo': 'Puzzles only',
  'wizard.formatTitle': 'Which download format?',
  'wizard.pdf': 'PDF',
  'wizard.pdf.hint': 'Best for printing',
  'wizard.jpg': 'JPG',
  'wizard.jpg.hint': 'Single images or ZIP',
  'wizard.print': 'Print',
  'wizard.print.hint': 'Send to your printer now',
  'wizard.gridTitle': 'Which grid do you want?',
  'wizard.gridSub': 'Choose the Sudoku size.',
  'wizard.size4': '4×4',
  'wizard.size4.hint': 'For little ones — 2×2 boxes',
  'wizard.size6': '6×6',
  'wizard.size6.hint': 'Intermediate — 2×3 boxes',
  'wizard.size9': '9×9',
  'wizard.size9.hint': 'Classic — 3×3 boxes',
  'wizard.themeTitle': 'Which characters at the start and end?',
  'wizard.themeSub': 'Pick a pair: start on the left, goal on the right.',
  'wizard.customSizeTitle': 'How many cells in the grid?',
  'wizard.customSizeSub':
    'Horizontal = width, vertical = height. From {min} to {max}.',
  'wizard.cellsH': 'Cells horizontally',
  'wizard.cellsV': 'Cells vertically',
  'wizard.newMaze': 'New maze',
  'wizard.newSudoku': 'New sudoku',
  'wizard.restart': 'Start over',
  'wizard.grid': 'Grid',
  'wizard.characters': 'Characters',
  'wizard.ships': 'Ships',
  'wizard.islands': 'Islands',
  'wizard.shape': 'Shape',

  'noun.mazes': 'mazes',
  'noun.sudoku': 'sudoku',
  'noun.nonogram': 'nonograms',
  'noun.kakuro': 'kakuro',
  'noun.futoshiki': 'futoshiki',
  'noun.hashi': 'hashi',
  'noun.grids': 'grids',
  'noun.sheets': 'sheets',

  'aff.disclosure':
    'As an Amazon Associate I earn from qualifying purchases.',
  'aff.ready': 'Your files are ready',
  'aff.print.preparing': 'Print in preparation',
  'aff.print.ready': 'Ready to print',
  'aff.error': 'Something went wrong',
  'aff.gen.maze': 'Generating your mazes',
  'aff.gen.sudoku': 'Generating your sudoku',
  'aff.gen.nonogram': 'Generating your nonograms',
  'aff.gen.kakuro': 'Generating your kakuro',
  'aff.gen.futoshiki': 'Generating your futoshiki',
  'aff.gen.hashi': 'Generating your hashi',
  'aff.gen.battleship': 'Generating your grids',
  'aff.close': 'Close',
  'aff.hook': 'You might also like:',

  // Sudoku guide
  'guide.sudoku.0.t': 'What is Sudoku?',
  'guide.sudoku.0.b':
    'It is a logic puzzle on a grid. Fill every empty cell with the right numbers, with no repeats.',
  'guide.sudoku.1.t': 'The grid and boxes',
  'guide.sudoku.1.b':
    'Classic Sudoku is 9×9 and splits into nine 3×3 boxes (highlighted here). Thicker lines separate the boxes.',
  'guide.sudoku.2.t': 'Row rule',
  'guide.sudoku.2.b':
    'In every row, numbers 1 to 9 appear once each. Here is a valid row with no repeats.',
  'guide.sudoku.3.t': 'Column rule',
  'guide.sudoku.3.b':
    'The same for every column: 1 to 9, each only once. Look at the highlighted column.',
  'guide.sudoku.4.t': 'Given numbers',
  'guide.sudoku.4.b':
    'When you print a Sudoku, some cells are already filled. Those are starting clues — do not erase them. You only complete empty cells.',
  'guide.sudoku.5.t': 'How to play',
  'guide.sudoku.5.b':
    'Pick an empty cell and try a number that is not already in the same row, column, or 3×3 box. Here 5 is valid.',
  'guide.sudoku.6.t': 'You are ready',
  'guide.sudoku.6.b':
    'Now you can create printable Sudokus: size, difficulty, and how many grids. Press Next to begin.',

  // Maze guide
  'guide.maze.0.t': 'What is a maze?',
  'guide.maze.0.b':
    'A path between walls. Start at the entrance and reach the exit without crossing walls.',
  'guide.maze.1.t': 'Start and end',
  'guide.maze.1.b':
    'Entrance and exit are marked with the characters you choose. You enter on one side and leave on the other.',
  'guide.maze.2.t': 'The walls',
  'guide.maze.2.b':
    'Black lines are walls — you cannot cross them. Follow the open corridors.',
  'guide.maze.3.t': 'The path',
  'guide.maze.3.b':
    'There is always at least one path from start to finish. Dead ends happen: if stuck, go back.',
  'guide.maze.4.t': 'Print and solve',
  'guide.maze.4.b':
    'Solve on paper with a pencil. If you include solutions, you also get the correct path to check.',
  'guide.maze.5.t': 'You are ready',
  'guide.maze.5.b':
    'Create your mazes: characters, difficulty, and how many. Press Next to begin.',

  // Nonogram
  'guide.nonogram.0.t': 'What is a Nonogram?',
  'guide.nonogram.0.b':
    'A grid puzzle: fill the right cells and a picture appears. Also called Picross.',
  'guide.nonogram.1.t': 'The clues',
  'guide.nonogram.1.b':
    'Numbers outside the grid say how many filled cells are in that row or column, in groups separated by at least one empty cell.',
  'guide.nonogram.2.t': 'Fill cells',
  'guide.nonogram.2.b':
    'If a clue says “3”, fill three cells in a row. “1 2” means a group of 1 and a group of 2 with a gap.',
  'guide.nonogram.3.t': 'Empty cells',
  'guide.nonogram.3.b':
    'Cells that are not part of the picture stay white. Marking them can help.',
  'guide.nonogram.4.t': 'You are ready',
  'guide.nonogram.4.b': 'Create printable Nonograms. Press Next to begin.',

  // Kakuro
  'guide.kakuro.0.t': 'What is Kakuro?',
  'guide.kakuro.0.b':
    'Like a crossword, but with digits 1–9. Black cells hold the sums to match.',
  'guide.kakuro.1.t': 'The sums',
  'guide.kakuro.1.b':
    'The number at the top-right of a black cell is the sum of the row to the right. Bottom-left is the column sum downward.',
  'guide.kakuro.2.t': 'No repeats',
  'guide.kakuro.2.b':
    'In each run (between black cells), digits do not repeat. Only 1–9 are allowed.',
  'guide.kakuro.3.t': 'How to finish',
  'guide.kakuro.3.b':
    'Start from the tightest sums and fill white cells until every sum matches. Here is a solved example.',
  'guide.kakuro.4.t': 'You are ready',
  'guide.kakuro.4.b': 'Create printable Kakuro. Press Next to begin.',

  // Futoshiki
  'guide.futoshiki.0.t': 'What is Futoshiki?',
  'guide.futoshiki.0.b':
    'A Latin square with inequalities: fill 1–N with no repeats in any row or column.',
  'guide.futoshiki.1.t': 'One digit per row and column',
  'guide.futoshiki.1.b':
    'Like Sudoku, each number appears once per row and column. On 4×4 you use 1–4.',
  'guide.futoshiki.2.t': 'The < and > signs',
  'guide.futoshiki.2.b':
    'Between two cells there may be greater/less. The numbers must respect that comparison.',
  'guide.futoshiki.3.t': 'How to solve',
  'guide.futoshiki.3.b':
    'Use given digits and comparisons to deduce empty cells. Here is an example with solution.',
  'guide.futoshiki.4.t': 'You are ready',
  'guide.futoshiki.4.b': 'Create printable Futoshiki. Press Next to begin.',

  // Hashi
  'guide.hashi.0.t': 'What is Hashi?',
  'guide.hashi.0.b':
    'Also called Bridges. Connect islands with horizontal or vertical bridges — no diagonals.',
  'guide.hashi.1.t': 'The islands',
  'guide.hashi.1.b':
    'Each circle is an island. The number is how many bridges must touch it in total.',
  'guide.hashi.2.t': 'The bridges',
  'guide.hashi.2.b':
    'Between two islands you may draw one or two bridges. Bridges cannot cross or pass over other islands.',
  'guide.hashi.3.t': 'One or two',
  'guide.hashi.3.b':
    'One line = one bridge. Two parallel lines = two bridges. In the end all islands form one connected network.',
  'guide.hashi.4.t': 'You are ready',
  'guide.hashi.4.b': 'Create printable Hashi. Press Next to begin.',

  // Battleship
  'guide.battleship.0.t': 'What is Battleship?',
  'guide.battleship.0.b':
    'Players hide and hunt ships on a grid. Each ship covers a set number of squares.',
  'guide.battleship.1.t': 'The grid',
  'guide.battleship.1.b':
    'Cells use letters (columns) and numbers (rows), so you can call “B4” when you fire.',
  'guide.battleship.2.t': 'The fleet',
  'guide.battleship.2.b':
    'Under the grid, ships are drawn as squares: each square = one cell. Count pieces to see each ship’s length.',
  'guide.battleship.3.t': 'How to place them',
  'guide.battleship.3.b':
    'Ships go horizontally or vertically, never diagonally. Usually they do not touch, even at corners.',
  'guide.battleship.4.t': 'How to play',
  'guide.battleship.4.b':
    'Take turns firing at a cell. Hit = ship; miss = water. Sink the whole fleet to win. Print two grids and play against a friend.',
  'guide.battleship.5.t': 'You are ready',
  'guide.battleship.5.b': 'Create printable grids. Press Next to begin.',

  'sol.yes.maze': 'Mazes + solutions',
  'sol.no.maze': 'Mazes only',
  'sol.yes.sudoku': 'Sudoku + solutions',
  'sol.no.sudoku': 'Sudoku only',
  'sol.yes.generic': 'Puzzles + solutions',
  'sol.no.generic': 'Puzzles only',
  'sol.yes.hashi': 'Puzzles + bridge solutions',
  'sol.no.hashi': 'Islands only',
  'sol.yes.battleship': 'Grids + ship positions',
  'sol.no.battleship': 'Empty grids with fleet list',

  'restart.maze': 'New maze',
  'restart.sudoku': 'New sudoku',
  'restart.nonogram': 'New nonogram',
  'restart.kakuro': 'New kakuro',
  'restart.futoshiki': 'New futoshiki',
  'restart.hashi': 'New hashi',
  'restart.battleship': 'New grid',
  'seo.title': 'Plumagame — Unique printable games',
  'seo.description':
    'Create unique printable games: mazes, sudoku, nonogram, kakuro, futoshiki, hashi, and battleship. Set difficulty and quantity, download PDF or JPG.',
  'seo.keywords':
    'printable games, mazes, sudoku, nonogram, kakuro, printable puzzles, PDF, Plumagame',
  'footer.tagline':
    'Generate unique printable games in your browser — free, no account needed.',
  'footer.games': 'Available games',
  'footer.legal': 'Legal',
  'footer.privacy': 'Privacy',
  'footer.cookies': 'Cookies',
  'footer.affiliate': 'Affiliate disclosure',
  'footer.contact': 'Contact',
  'footer.rights': 'All rights reserved.',
  'legal.privacy.title': 'Privacy policy',
  'legal.privacy.body':
    'Plumagame generates games in your browser. We do not create user accounts and we do not store the puzzles you generate on our servers.\n\nTechnical data needed to serve the site (such as standard server logs) may be processed by the hosting provider. If we use analytics or advertising tools in the future, this page will be updated.',
  'legal.cookies.title': 'Cookies',
  'legal.cookies.body':
    'Plumagame works without requiring login cookies. The site may use technical storage needed for basic browser operation.\n\nIf non-essential cookies (analytics or advertising) are introduced later, we will ask for consent where required by law.',
  'legal.affiliate.title': 'Affiliate disclosure',
  'legal.affiliate.body':
    'As an Amazon Associate, Plumagame may earn from qualifying purchases when you click product links shown on this site.\n\nPrices and availability are set by Amazon and may change. Buying through those links does not cost you extra.',
  'footer.writeUs': 'Write to us',
  'contact.title': 'Contact us',
  'contact.intro': 'Send a message — we will reply by email.',
  'contact.name': 'Name',
  'contact.email': 'Your email',
  'contact.message': 'Message',
  'contact.send': 'Send message',
  'contact.sending': 'Sending…',
  'contact.success': 'Thanks! Your message was sent.',
  'contact.error': 'Could not send the message. Please try again.',
  'contact.subject': 'Contact form',
  'contact.spam': 'Anti-spam: how much is {a} + {b}?',
  'contact.spamError': 'Anti-spam check failed. Please try again.',
  'legal.privacy.contactHint': 'For privacy requests:',
}
