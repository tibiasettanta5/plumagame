import type { Dict } from '../types'

export const de: Dict = {
  'common.continue': 'Weiter',
  'common.next': 'Weiter',
  'common.yes': 'Ja',
  'common.no': 'Nein',
  'common.waiting': 'Bitte warten…',
  'common.preview': 'Vorschau',
  'common.howToPlay': 'Spielanleitung',
  'common.startCreating': 'Jetzt erstellen',
  'common.backHome': '← Alle Spiele',
  'common.ready': 'Alles bereit',
  'common.checkDownload': 'Auswahl prüfen, dann herunterladen oder drucken.',
  'common.solutions': 'Lösungen',
  'common.format': 'Format',
  'common.quantity': 'Anzahl',
  'common.difficulty': 'Schwierigkeit',
  'common.errorDownload': 'Download fehlgeschlagen. Bitte erneut versuchen.',
  'common.preparingDownload': 'Download wird vorbereitet…',
  'common.generatingN': '{n} werden erstellt…',
  'common.downloaded': 'Heruntergeladen: {n} Datei(en) ({format}).',
  'common.downloadedWithSolutions':
    'Heruntergeladen: {n} + Lösungen ({format}).',
  'common.downloadN': '{n} herunterladen',
  'common.printN': '{n} drucken',
  'common.preparingPrint': 'Druck wird vorbereitet…',
  'common.printed': 'Druckdialog geöffnet.',
  'common.errorPrint': 'Druckfehler. Bitte erneut versuchen.',
  'common.guide': 'Anleitung · {game}',
  'common.comeSiGioca': 'Spielanleitung',

  'home.headline': 'Einzigartige Spiele zum Ausdrucken',
  'home.sub':
    'Spiel wählen, Schwierigkeit und Anzahl festlegen, dann PDF oder JPG für den Drucker laden.',

  'game.maze': 'Labyrinthe',
  'game.maze.blurb': 'Einzigartige Wege mit Figuren am Start und am Ziel.',
  'game.sudoku': 'Sudoku',
  'game.sudoku.blurb': 'Raster 4×4, 6×6 oder 9×9, mit Schwierigkeit und Lösungen.',
  'game.nonogram': 'Nonogram / Picross',
  'game.nonogram.blurb': 'Zeilen- und Spaltenhinweise enthüllen ein Bild.',
  'game.kakuro': 'Kakuro',
  'game.kakuro.blurb': 'Summen und Ziffern wie ein Zahlenkreuzworträtsel.',
  'game.futoshiki': 'Futoshiki',
  'game.futoshiki.blurb': 'Lateinisches Quadrat mit Ungleichheiten zwischen Feldern.',
  'game.hashi': 'Hashi',
  'game.hashi.blurb': 'Verbinden Sie Inseln mit ein oder zwei Brücken.',
  'game.battleship': 'Schiffe versenken',
  'game.battleship.blurb': 'Druckbare leere Raster mit Flottenliste zum Platzieren.',

  'diff.easy': 'Leicht',
  'diff.easy.hint': 'Einfacher zu lösen',
  'diff.medium': 'Mittel',
  'diff.medium.hint': 'Ausgewogene Herausforderung',
  'diff.hard': 'Schwer',
  'diff.hard.hint': 'Anspruchsvoller',
  'diff.custom': 'Benutzerdefiniert',
  'diff.custom.hint': 'Felderanzahl selbst wählen',
  'diff.title': 'Wie schwer soll es sein?',
  'diff.sub': 'Schwierigkeitsgrad wählen.',
  'diff.subMaze': 'Voreinstellung oder eigenes Raster wählen.',
  'diff.subSudoku': 'Hängt davon ab, wie viele Zahlen schon vorgegeben sind.',

  'wizard.countTitle': 'Wie viele sollen erzeugt werden?',
  'wizard.countTitle.mazes': 'Wie viele Labyrinthe möchten Sie erzeugen?',
  'wizard.countTitle.sudoku': 'Wie viele Sudokus möchten Sie erzeugen?',
  'wizard.countTitle.nonogram': 'Wie viele Nonograms möchten Sie erzeugen?',
  'wizard.countTitle.kakuro': 'Wie viele Kakuro-Rätsel möchten Sie?',
  'wizard.countTitle.futoshiki': 'Wie viele Futoshiki-Rätsel möchten Sie?',
  'wizard.countTitle.hashi': 'Wie viele Hashi-Rätsel möchten Sie?',
  'wizard.countTitle.battleship': 'Wie viele Raster möchten Sie erzeugen?',
  'wizard.countSub':
    '1 bis 3, gleiche Schwierigkeit, aber nicht identisch.',
  'wizard.solutionsTitle': 'Auch Lösungen einschließen?',
  'wizard.solutionsSub':
    'Wenn ja, sehen Sie sie in der Vorschau und laden sie mit herunter.',
  'wizard.solutionsYes': 'Rätsel + Lösungen',
  'wizard.solutionsNo': 'Nur Rätsel',
  'wizard.formatTitle': 'Welches Download-Format?',
  'wizard.pdf': 'PDF',
  'wizard.pdf.hint': 'Am besten zum Drucken',
  'wizard.jpg': 'JPG',
  'wizard.jpg.hint': 'Einzelbilder oder ZIP',
  'wizard.gridTitle': 'Welches Raster?',
  'wizard.gridSub': 'Sudoku-Größe wählen.',
  'wizard.size4': '4×4',
  'wizard.size4.hint': 'Für Kleine — 2×2-Blöcke',
  'wizard.size6': '6×6',
  'wizard.size6.hint': 'Mittel — 2×3-Blöcke',
  'wizard.size9': '9×9',
  'wizard.size9.hint': 'Klassisch — 3×3-Blöcke',
  'wizard.themeTitle': 'Welche Figuren am Start und am Ziel?',
  'wizard.themeSub': 'Paar wählen: Start links, Ziel rechts.',
  'wizard.customSizeTitle': 'Wie viele Felder im Raster?',
  'wizard.customSizeSub':
    'Horizontal = Breite, vertikal = Höhe. Von {min} bis {max}.',
  'wizard.cellsH': 'Felder horizontal',
  'wizard.cellsV': 'Felder vertikal',
  'wizard.newMaze': 'Neues Labyrinth',
  'wizard.newSudoku': 'Neues Sudoku',
  'wizard.restart': 'Von vorn',
  'wizard.grid': 'Raster',
  'wizard.characters': 'Figuren',
  'wizard.ships': 'Schiffe',
  'wizard.islands': 'Inseln',
  'wizard.shape': 'Form',

  'noun.mazes': 'Labyrinthe',
  'noun.sudoku': 'Sudokus',
  'noun.nonogram': 'Nonograms',
  'noun.kakuro': 'Kakuro',
  'noun.futoshiki': 'Futoshiki',
  'noun.hashi': 'Hashi',
  'noun.grids': 'Raster',
  'noun.sheets': 'Blätter',

  'aff.disclosure':
    'Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.',
  'aff.ready': 'Ihre Dateien sind bereit',
  'aff.print.preparing': 'Druck in Vorbereitung',
  'aff.print.ready': 'Bereit zum Drucken',
  'aff.error': 'Etwas ist schiefgelaufen',
  'aff.gen.maze': 'Ihre Labyrinthe werden erstellt',
  'aff.gen.sudoku': 'Ihre Sudokus werden erstellt',
  'aff.gen.nonogram': 'Ihre Nonograms werden erstellt',
  'aff.gen.kakuro': 'Ihre Kakuro werden erstellt',
  'aff.gen.futoshiki': 'Ihre Futoshiki werden erstellt',
  'aff.gen.hashi': 'Ihre Hashi werden erstellt',
  'aff.gen.battleship': 'Ihre Raster werden erstellt',
  'aff.close': 'Schließen',
  'aff.hook': 'Das könnte Sie auch interessieren:',

  'guide.sudoku.0.t': 'Was ist Sudoku?',
  'guide.sudoku.0.b':
    'Ein Logikrätsel auf einem Raster. Füllen Sie leere Felder mit den richtigen Zahlen — ohne Wiederholungen.',
  'guide.sudoku.1.t': 'Raster und Blöcke',
  'guide.sudoku.1.b':
    'Klassisches Sudoku ist 9×9 und teilt sich in neun 3×3-Blöcke (hier hervorgehoben). Dickere Linien trennen die Blöcke.',
  'guide.sudoku.2.t': 'Zeilenregel',
  'guide.sudoku.2.b':
    'In jeder Zeile kommen die Zahlen 1 bis 9 genau einmal vor. Hier eine gültige Zeile ohne Duplikate.',
  'guide.sudoku.3.t': 'Spaltenregel',
  'guide.sudoku.3.b':
    'Gleiches für jede Spalte: 1 bis 9, jeweils nur einmal. Schauen Sie auf die markierte Spalte.',
  'guide.sudoku.4.t': 'Vorgegebene Zahlen',
  'guide.sudoku.4.b':
    'Beim Drucken sind einige Felder schon ausgefüllt. Das sind Startvorgaben — nicht löschen. Sie füllen nur leere Felder.',
  'guide.sudoku.5.t': 'So spielt man',
  'guide.sudoku.5.b':
    'Wählen Sie ein leeres Feld und probieren Sie eine Zahl, die in derselben Zeile, Spalte oder im 3×3-Block noch fehlt. Hier ist 5 gültig.',
  'guide.sudoku.6.t': 'Sie sind bereit',
  'guide.sudoku.6.b':
    'Erstellen Sie druckbare Sudokus: Größe, Schwierigkeit und Anzahl. Weiter drücken zum Start.',

  'guide.maze.0.t': 'Was ist ein Labyrinth?',
  'guide.maze.0.b':
    'Ein Weg zwischen Wänden. Starten Sie am Eingang und erreichen Sie den Ausgang, ohne Wände zu durchqueren.',
  'guide.maze.1.t': 'Start und Ziel',
  'guide.maze.1.b':
    'Eingang und Ausgang sind mit Ihren gewählten Figuren markiert. Sie betreten von einer Seite und verlassen von der anderen.',
  'guide.maze.2.t': 'Die Wände',
  'guide.maze.2.b':
    'Schwarze Linien sind Wände — man darf sie nicht überqueren. Folgen Sie den offenen Gängen.',
  'guide.maze.3.t': 'Der Weg',
  'guide.maze.3.b':
    'Es gibt immer mindestens einen Weg von Start bis Ziel. Sackgassen kommen vor: Wenn Sie feststecken, gehen Sie zurück.',
  'guide.maze.4.t': 'Drucken und lösen',
  'guide.maze.4.b':
    'Lösen Sie auf Papier mit Bleistift. Mit Lösungen erhalten Sie auch den korrekten Weg zum Vergleich.',
  'guide.maze.5.t': 'Sie sind bereit',
  'guide.maze.5.b':
    'Erstellen Sie Labyrinthe: Figuren, Schwierigkeit und Anzahl. Weiter drücken zum Start.',

  'guide.nonogram.0.t': 'Was ist ein Nonogram?',
  'guide.nonogram.0.b':
    'Ein Rasterrätsel: Die richtigen Felder füllen und ein Bild erscheint. Auch Picross genannt.',
  'guide.nonogram.1.t': 'Die Hinweise',
  'guide.nonogram.1.b':
    'Zahlen außerhalb des Rasters sagen, wie viele gefüllte Felder in der Zeile oder Spalte stehen — in Gruppen mit mindestens einem Leerfeld dazwischen.',
  'guide.nonogram.2.t': 'Felder füllen',
  'guide.nonogram.2.b':
    'Steht „3“, füllen Sie drei Felder hintereinander. „1 2“ bedeutet eine Gruppe aus 1 und eine aus 2 mit Lücke.',
  'guide.nonogram.3.t': 'Leere Felder',
  'guide.nonogram.3.b':
    'Felder, die nicht zum Bild gehören, bleiben weiß. Markieren kann helfen.',
  'guide.nonogram.4.t': 'Sie sind bereit',
  'guide.nonogram.4.b': 'Erstellen Sie druckbare Nonograms. Weiter drücken zum Start.',

  'guide.kakuro.0.t': 'Was ist Kakuro?',
  'guide.kakuro.0.b':
    'Wie ein Kreuzworträtsel, aber mit Ziffern 1–9. Schwarze Felder enthalten die einzuhaltenden Summen.',
  'guide.kakuro.1.t': 'Die Summen',
  'guide.kakuro.1.b':
    'Die Zahl oben rechts in einem schwarzen Feld ist die Summe der Zeile nach rechts. Unten links die Spaltensumme nach unten.',
  'guide.kakuro.2.t': 'Keine Wiederholungen',
  'guide.kakuro.2.b':
    'In jedem Abschnitt (zwischen schwarzen Feldern) wiederholen sich Ziffern nicht. Nur 1–9 sind erlaubt.',
  'guide.kakuro.3.t': 'So vervollständigen',
  'guide.kakuro.3.b':
    'Beginnen Sie bei den strengsten Summen und füllen Sie weiße Felder, bis jede Summe stimmt. Hier ein gelöstes Beispiel.',
  'guide.kakuro.4.t': 'Sie sind bereit',
  'guide.kakuro.4.b': 'Erstellen Sie druckbare Kakuro. Weiter drücken zum Start.',

  'guide.futoshiki.0.t': 'Was ist Futoshiki?',
  'guide.futoshiki.0.b':
    'Ein lateinisches Quadrat mit Ungleichheiten: Füllen Sie 1–N ohne Wiederholung in Zeile und Spalte.',
  'guide.futoshiki.1.t': 'Eine Ziffer pro Zeile und Spalte',
  'guide.futoshiki.1.b':
    'Wie bei Sudoku kommt jede Zahl einmal pro Zeile und Spalte vor. Bei 4×4 verwenden Sie 1–4.',
  'guide.futoshiki.2.t': 'Die Zeichen < und >',
  'guide.futoshiki.2.b':
    'Zwischen zwei Feldern kann größer/kleiner stehen. Die Zahlen müssen dem Vergleich entsprechen.',
  'guide.futoshiki.3.t': 'So löst man es',
  'guide.futoshiki.3.b':
    'Nutzen Sie vorgegebene Ziffern und Vergleiche, um leere Felder zu finden. Beispiel mit Lösung hier.',
  'guide.futoshiki.4.t': 'Sie sind bereit',
  'guide.futoshiki.4.b': 'Erstellen Sie druckbare Futoshiki. Weiter drücken zum Start.',

  'guide.hashi.0.t': 'Was ist Hashi?',
  'guide.hashi.0.b':
    'Auch Brücken genannt. Verbinden Sie Inseln mit horizontalen oder vertikalen Brücken — keine Diagonalen.',
  'guide.hashi.1.t': 'Die Inseln',
  'guide.hashi.1.b':
    'Jeder Kreis ist eine Insel. Die Zahl gibt an, wie viele Brücken sie insgesamt berühren müssen.',
  'guide.hashi.2.t': 'Die Brücken',
  'guide.hashi.2.b':
    'Zwischen zwei Inseln zeichnen Sie ein oder zwei Brücken. Brücken kreuzen sich nicht und gehen nicht über andere Inseln.',
  'guide.hashi.3.t': 'Eins oder zwei',
  'guide.hashi.3.b':
    'Eine Linie = eine Brücke. Zwei parallele Linien = zwei Brücken. Am Ende bilden alle Inseln ein verbundenes Netz.',
  'guide.hashi.4.t': 'Sie sind bereit',
  'guide.hashi.4.b': 'Erstellen Sie druckbare Hashi. Weiter drücken zum Start.',

  'guide.battleship.0.t': 'Was ist Schiffe versenken?',
  'guide.battleship.0.b':
    'Spieler verstecken und suchen Schiffe auf einem Raster. Jedes Schiff belegt mehrere Felder.',
  'guide.battleship.1.t': 'Das Raster',
  'guide.battleship.1.b':
    'Felder haben Buchstaben (Spalten) und Zahlen (Zeilen), sodass man beim Schießen „B4“ sagen kann.',
  'guide.battleship.2.t': 'Die Flotte',
  'guide.battleship.2.b':
    'Unter dem Raster sind Schiffe als Quadrate gezeichnet: jedes Quadrat = ein Feld. Zählen Sie Teile für die Länge jedes Schiffs.',
  'guide.battleship.3.t': 'Platzierung',
  'guide.battleship.3.b':
    'Schiffe liegen horizontal oder vertikal, nie diagonal. Meist berühren sie sich nicht, auch nicht an Ecken.',
  'guide.battleship.4.t': 'Spielablauf',
  'guide.battleship.4.b':
    'Abwechselnd schießt man auf ein Feld. Treffer = Schiff; Wasser = leer. Wer die ganze gegnerische Flotte versenkt, gewinnt. Drucken Sie zwei Raster und spielen Sie gegen einen Freund.',
  'guide.battleship.5.t': 'Sie sind bereit',
  'guide.battleship.5.b': 'Erstellen Sie druckbare Raster. Weiter drücken zum Start.',

  'sol.yes.maze': 'Labyrinthe + Lösungen',
  'sol.no.maze': 'Nur Labyrinthe',
  'sol.yes.sudoku': 'Sudoku + Lösungen',
  'sol.no.sudoku': 'Nur Sudoku',
  'sol.yes.generic': 'Rätsel + Lösungen',
  'sol.no.generic': 'Nur Rätsel',
  'sol.yes.hashi': 'Rätsel + Brückenlösungen',
  'sol.no.hashi': 'Nur Inseln',
  'sol.yes.battleship': 'Raster + Schiffspositionen',
  'sol.no.battleship': 'Leere Raster mit Flottenliste',

  'restart.maze': 'Neues Labyrinth',
  'restart.sudoku': 'Neues Sudoku',
  'restart.nonogram': 'Neues Nonogram',
  'restart.kakuro': 'Neues Kakuro',
  'restart.futoshiki': 'Neues Futoshiki',
  'restart.hashi': 'Neues Hashi',
  'restart.battleship': 'Neues Raster',
  'seo.title': 'Plumagame — Einzigartige Spiele zum Ausdrucken',
  'seo.description':
    'Erstellen Sie einzigartige druckbare Spiele: Labyrinthe, Sudoku, Nonogram, Kakuro, Futoshiki, Hashi und Schiffe versenken. Schwierigkeit und Anzahl wählen, PDF oder JPG laden.',
  'seo.keywords':
    'Spiele zum Ausdrucken, Labyrinthe, Sudoku, Nonogram, Kakuro, PDF, Plumagame',
  'footer.tagline':
    'Einzigartige druckbare Spiele im Browser — kostenlos, ohne Konto.',
  'footer.games': 'Verfügbare Spiele',
  'footer.legal': 'Rechtliches',
  'footer.privacy': 'Datenschutz',
  'footer.cookies': 'Cookies',
  'footer.affiliate': 'Affiliate-Hinweis',
  'footer.contact': 'Kontakt',
  'footer.rights': 'Alle Rechte vorbehalten.',
  'legal.privacy.title': 'Datenschutzerklärung',
  'legal.privacy.body':
    'Plumagame erzeugt Spiele in Ihrem Browser. Wir legen keine Benutzerkonten an und speichern Ihre Dateien nicht auf unseren Servern.\n\nTechnische Daten können vom Hosting-Anbieter verarbeitet werden. Bei Analyse- oder Werbe-Tools aktualisieren wir diese Seite.',
  'legal.cookies.title': 'Cookies',
  'legal.cookies.body':
    'Plumagame braucht keine Login-Cookies. Technischer Browser-Speicher kann genutzt werden.\n\nNicht notwendige Cookies würden wir nur mit Einwilligung setzen, soweit gesetzlich nötig.',
  'legal.affiliate.title': 'Affiliate-Hinweis',
  'legal.affiliate.body':
    'Als Amazon-Partner kann Plumagame Provisionen aus qualifizierten Käufen über Produktlinks verdienen.\n\nPreise und Verfügbarkeit setzt Amazon. Über die Links entstehen Ihnen keine Mehrkosten.',
  'footer.writeUs': 'Schreiben Sie uns',
  'contact.title': 'Kontakt',
  'contact.intro': 'Senden Sie eine Nachricht — wir antworten per E-Mail.',
  'contact.name': 'Name',
  'contact.email': 'Ihre E-Mail',
  'contact.message': 'Nachricht',
  'contact.send': 'Nachricht senden',
  'contact.sending': 'Wird gesendet…',
  'contact.success': 'Danke! Ihre Nachricht wurde gesendet.',
  'contact.error': 'Senden fehlgeschlagen. Bitte erneut versuchen.',
  'contact.subject': 'Kontaktformular',
  'contact.spam': 'Anti-Spam: Was ist {a} + {b}?',
  'contact.spamError': 'Anti-Spam-Prüfung fehlgeschlagen. Bitte erneut versuchen.',
  'legal.privacy.contactHint': 'Für Datenschutzanfragen:',
}
