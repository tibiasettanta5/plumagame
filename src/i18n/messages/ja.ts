import type { Dict } from '../types'

export const ja: Dict = {
  'common.continue': '続ける',
  'common.next': '次へ',
  'common.yes': 'はい',
  'common.no': 'いいえ',
  'common.waiting': '少々お待ちください…',
  'common.preview': 'プレビュー',
  'common.howToPlay': '遊び方',
  'common.startCreating': '作成を始める',
  'common.backHome': '← すべてのゲーム',
  'common.ready': '準備完了',
  'common.checkDownload': '選択内容を確認してダウンロードしてください',
  'common.solutions': '解答',
  'common.format': '形式',
  'common.quantity': '枚数',
  'common.difficulty': '難易度',
  'common.errorDownload': 'ダウンロードに失敗しました。もう一度お試しください',
  'common.preparingDownload': 'ダウンロードを準備中…',
  'common.generatingN': '{n} を生成中…',
  'common.downloaded': 'ダウンロード完了：{n} ファイル（{format}）',
  'common.downloadedWithSolutions':
    'ダウンロード完了：{n} + 解答（{format}）',
  'common.downloadN': '{n} をダウンロード',
  'common.guide': 'ガイド · {game}',
  'common.comeSiGioca': '遊び方',

  'home.headline': '印刷できるオリジナルゲームを作成',
  'home.sub':
    'ゲームを選び、難易度と枚数を決めて、印刷用の PDF または JPG をダウンロード',

  'game.maze': '迷路',
  'game.maze.blurb': 'スタートとゴールにキャラクター付きの一意なコース',
  'game.sudoku': '数独',
  'game.sudoku.blurb': '4×4、6×6、9×9。難易度と解答付き',
  'game.nonogram': 'Nonogram / ピクロス',
  'game.nonogram.blurb': '行・列のヒントで絵を完成させます',
  'game.kakuro': 'カックロ',
  'game.kakuro.blurb': '数字のクロスワードのような和付きパズル',
  'game.futoshiki': '不等式数独（Futoshiki）',
  'game.futoshiki.blurb': '不等号付きのラテンスクエア',
  'game.hashi': '橋を架けろ（Hashi）',
  'game.hashi.blurb': '島を1本または2本の橋でつなぎます',
  'game.battleship': 'Battleship',
  'game.battleship.blurb': '配置用の艦隊リスト付き・印刷用の空グリッド',

  'diff.easy': 'かんたん',
  'diff.easy.hint': '解きやすい',
  'diff.medium': 'ふつう',
  'diff.medium.hint': 'バランスの取れた難しさ',
  'diff.hard': 'むずかしい',
  'diff.hard.hint': 'より挑戦的',
  'diff.custom': 'カスタム',
  'diff.custom.hint': 'マス数を自分で指定',
  'diff.title': 'どのくらい難しくしますか？',
  'diff.sub': '挑戦レベルを選んでください',
  'diff.subMaze': 'プリセットまたはカスタムグリッドを選べます',
  'diff.subSudoku': '最初から書かれた数字の数によります',

  'wizard.countTitle': '何枚生成しますか？',
  'wizard.countTitle.mazes': '迷路を何枚生成しますか？',
  'wizard.countTitle.sudoku': '数独を何枚生成しますか？',
  'wizard.countTitle.nonogram': 'Nonogram を何枚生成しますか？',
  'wizard.countTitle.kakuro': 'カックロを何枚生成しますか？',
  'wizard.countTitle.futoshiki': 'Futoshiki を何枚生成しますか？',
  'wizard.countTitle.hashi': 'Hashi を何枚生成しますか？',
  'wizard.countTitle.battleship': 'グリッドを何枚生成しますか？',
  'wizard.countSub':
    '1〜3枚、同じ難易度ですが、内容は互いに異なります',
  'wizard.solutionsTitle': '解答も含めますか？',
  'wizard.solutionsSub':
    'はいの場合、プレビューで確認でき、ファイルと一緒にダウンロードされます',
  'wizard.solutionsYes': '問題 + 解答',
  'wizard.solutionsNo': '問題のみ',
  'wizard.formatTitle': 'ダウンロード形式は？',
  'wizard.pdf': 'PDF',
  'wizard.pdf.hint': '印刷に最適',
  'wizard.jpg': 'JPG',
  'wizard.jpg.hint': '単体画像または ZIP',
  'wizard.gridTitle': 'どのグリッドにしますか？',
  'wizard.gridSub': '数独のサイズを選んでください',
  'wizard.size4': '4×4',
  'wizard.size4.hint': '低学年向け — 2×2 ブロック',
  'wizard.size6': '6×6',
  'wizard.size6.hint': '中級 — 2×3 ブロック',
  'wizard.size9': '9×9',
  'wizard.size9.hint': '定番 — 3×3 ブロック',
  'wizard.themeTitle': 'スタートとゴールのキャラクターは？',
  'wizard.themeSub': 'ペアを選ぶ：左がスタート、右がゴール',
  'wizard.customSizeTitle': 'グリッドのマス数は？',
  'wizard.customSizeSub':
    '横 = 幅、縦 = 高さ。{min} 〜 {max}',
  'wizard.cellsH': '横のマス数',
  'wizard.cellsV': '縦のマス数',
  'wizard.newMaze': '新しい迷路',
  'wizard.newSudoku': '新しい数独',
  'wizard.restart': '最初から',
  'wizard.grid': 'グリッド',
  'wizard.characters': 'キャラクター',
  'wizard.ships': '艦船',
  'wizard.islands': '島',
  'wizard.shape': '形',

  'noun.mazes': '迷路',
  'noun.sudoku': '数独',
  'noun.nonogram': 'Nonogram',
  'noun.kakuro': 'カックロ',
  'noun.futoshiki': 'Futoshiki',
  'noun.hashi': 'Hashi',
  'noun.grids': 'グリッド',
  'noun.sheets': '枚',

  'aff.disclosure':
    'Amazon アソシエイトとして、対象となる購入から報酬を得ています',
  'aff.ready': 'ファイルの準備ができました',
  'aff.error': '問題が発生しました',
  'aff.gen.maze': '迷路を生成しています',
  'aff.gen.sudoku': '数独を生成しています',
  'aff.gen.nonogram': 'Nonogram を生成しています',
  'aff.gen.kakuro': 'カックロを生成しています',
  'aff.gen.futoshiki': 'Futoshiki を生成しています',
  'aff.gen.hashi': 'Hashi を生成しています',
  'aff.gen.battleship': 'グリッドを生成しています',
  'aff.close': '閉じる',
  'aff.hook': 'こちらもおすすめ：',

  'guide.sudoku.0.t': '数独とは？',
  'guide.sudoku.0.b':
    'マス目の論理パズルです。空マスに正しい数字を重複なく入れます',
  'guide.sudoku.1.t': 'グリッドとブロック',
  'guide.sudoku.1.b':
    '定番の数独は 9×9 で、9 個の 3×3 ブロック（ここで強調）に分かれます。太線がブロックの境です',
  'guide.sudoku.2.t': '行のルール',
  'guide.sudoku.2.b':
    '各行に 1〜9 がそれぞれ1回ずつ。重複のない有効な行の例です',
  'guide.sudoku.3.t': '列のルール',
  'guide.sudoku.3.b':
    '列も同様に 1〜9 が各1回。強調した列を見てください',
  'guide.sudoku.4.t': '最初からある数字',
  'guide.sudoku.4.b':
    '印刷用数独には最初から数字が入ったマスがあります。消さず、空マスだけ埋めます',
  'guide.sudoku.5.t': '遊び方',
  'guide.sudoku.5.b':
    '空マスを選び、同じ行・列・3×3 ブロックにない数字を試します。ここでは 5 が有効です',
  'guide.sudoku.6.t': '準備OK',
  'guide.sudoku.6.b':
    '印刷用数独を作成できます。サイズ・難易度・枚数を選び、「次へ」で開始',

  'guide.maze.0.t': '迷路とは？',
  'guide.maze.0.b':
    '壁に囲まれた通路です。入口から出口へ、壁を越えずに進みます',
  'guide.maze.1.t': 'スタートとゴール',
  'guide.maze.1.b':
    '出入口は選んだキャラクターで示されます。一方から入り、反対側から出ます',
  'guide.maze.2.t': '壁',
  'guide.maze.2.b':
    '黒線が壁で、越えられません。開いている通路を進んでください',
  'guide.maze.3.t': '道筋',
  'guide.maze.3.b':
    '必ずゴールへの道があります。行き止まりもあるので、詰まったら戻ります',
  'guide.maze.4.t': '印刷して解く',
  'guide.maze.4.b':
    '紙に鉛筆で解きます。解答付きなら正解ルートも確認できます',
  'guide.maze.5.t': '準備OK',
  'guide.maze.5.b':
    '迷路を作成：キャラクター、難易度、枚数。「次へ」で開始',

  'guide.nonogram.0.t': 'Nonogram とは？',
  'guide.nonogram.0.b':
    'マスを塗ると絵が現れるパズル。ピクロスとも呼ばれます',
  'guide.nonogram.1.t': 'ヒント',
  'guide.nonogram.1.b':
    '外側の数字は、その行・列の塗るマスの数（グループは最低1マス空けて区切る）を示します',
  'guide.nonogram.2.t': '塗る',
  'guide.nonogram.2.b':
    '「3」なら連続3マス。「1 2」は1マスの塊と2マスの塊の間に空き',
  'guide.nonogram.3.t': '空マス',
  'guide.nonogram.3.b':
    '絵に含まれないマスは白のまま。×などで空マスを示すと便利です',
  'guide.nonogram.4.t': '準備OK',
  'guide.nonogram.4.b': '印刷用 Nonogram を作成。「次へ」で開始',

  'guide.kakuro.0.t': 'カックロとは？',
  'guide.kakuro.0.b':
    'クロスワードのように数字 1〜9 を使います。黒マスに和のヒントがあります',
  'guide.kakuro.1.t': '和',
  'guide.kakuro.1.b':
    '黒マス右上は右方向の行の和、左下は下方向の列の和です',
  'guide.kakuro.2.t': '重複なし',
  'guide.kakuro.2.b':
    '黒マスで区切られた各列・行では数字は重複しません。1〜9 のみ',
  'guide.kakuro.3.t': '完成のしかた',
  'guide.kakuro.3.b':
    '制約の強い和から白マスを埋め、すべての和が合うようにします。解いた例です',
  'guide.kakuro.4.t': '準備OK',
  'guide.kakuro.4.b': '印刷用カックロを作成。「次へ」で開始',

  'guide.futoshiki.0.t': 'Futoshiki とは？',
  'guide.futoshiki.0.b':
    '不等号付きラテンスクエア。各行・列に 1〜N を重複なく入れます',
  'guide.futoshiki.1.t': '行・列に1つずつ',
  'guide.futoshiki.1.b':
    '数独と同様、各行・列で各数字は1回。4×4 なら 1〜4',
  'guide.futoshiki.2.t': '< と >',
  'guide.futoshiki.2.b':
    '隣接マス間に大小記号があり、数字はその関係を満たす必要があります',
  'guide.futoshiki.3.t': '解き方',
  'guide.futoshiki.3.b':
    '既知の数字と不等号から空マスを推理します。解答付きの例です',
  'guide.futoshiki.4.t': '準備OK',
  'guide.futoshiki.4.b': '印刷用 Futoshiki を作成。「次へ」で開始',

  'guide.hashi.0.t': 'Hashi（橋を架けろ）とは？',
  'guide.hashi.0.b':
    '島を水平・垂直の橋でつなぎます。斜めは不可',
  'guide.hashi.1.t': '島',
  'guide.hashi.1.b':
    '丸が島です。数字はそこに接する橋の本数（合計）です',
  'guide.hashi.2.t': '橋',
  'guide.hashi.2.b':
    '2つの島の間に1本または2本の橋。交差せず、他の島の上も通りません',
  'guide.hashi.3.t': '1本か2本',
  'guide.hashi.3.b':
    '1本線 = 橋1本。平行2本 = 橋2本。最終的にすべての島が1つの網でつながります',
  'guide.hashi.4.t': '準備OK',
  'guide.hashi.4.b': '印刷用 Hashi を作成。「次へ」で開始',

  'guide.battleship.0.t': 'Battleship とは？',
  'guide.battleship.0.b':
    'グリッド上で艦船を隠し、当て合うゲーム。各艦は複数マスを占めます',
  'guide.battleship.1.t': 'グリッド',
  'guide.battleship.1.b':
    '列は文字、行は数字で「B4」のように指定します',
  'guide.battleship.2.t': '艦隊',
  'guide.battleship.2.b':
    '下に艦船がマス単位で表示されます。マス数で長さが分かります',
  'guide.battleship.3.t': '配置',
  'guide.battleship.3.b':
    '艦は横または縦のみ。通常、角を含め隣接しません',
  'guide.battleship.4.t': '遊び方',
  'guide.battleship.4.b':
    '交互にマスを指定。命中 = 艦、外れ = 海。全艦を沈めた方の勝ち。グリッドを2枚印刷して友達と対戦しましょう',
  'guide.battleship.5.t': '準備OK',
  'guide.battleship.5.b': '印刷用グリッドを作成。「次へ」で開始',

  'sol.yes.maze': '迷路 + 解答',
  'sol.no.maze': '迷路のみ',
  'sol.yes.sudoku': '数独 + 解答',
  'sol.no.sudoku': '数独のみ',
  'sol.yes.generic': '問題 + 解答',
  'sol.no.generic': '問題のみ',
  'sol.yes.hashi': '問題 + 橋の解答',
  'sol.no.hashi': '島のみ',
  'sol.yes.battleship': 'グリッド + 艦の位置',
  'sol.no.battleship': '空グリッドと艦隊リスト',

  'restart.maze': '新しい迷路',
  'restart.sudoku': '新しい数独',
  'restart.nonogram': '新しい Nonogram',
  'restart.kakuro': '新しいカックロ',
  'restart.futoshiki': '新しい Futoshiki',
  'restart.hashi': '新しい Hashi',
  'restart.battleship': '新しいグリッド',
  'seo.title': 'Plumagame — 印刷できるオリジナルゲーム',
  'seo.description':
    '迷路、数独、ノノグラム、カックロ、Futoshiki、Hashi、戦艦ゲームなど、印刷用のオリジナルゲームを作成。難易度と枚数を決め、PDF または JPG をダウンロード',
  'seo.keywords': '印刷ゲーム, 迷路, 数独, ノノグラム, PDF, Plumagame',
  'footer.tagline': 'ブラウザで無料の印刷用ゲームを作成 — 登録不要',
  'footer.games': '利用できるゲーム',
  'footer.legal': '法的情報',
  'footer.privacy': 'プライバシー',
  'footer.cookies': 'Cookie',
  'footer.affiliate': 'アフィリエイト表示',
  'footer.contact': 'お問い合わせ',
  'footer.rights': '無断転載を禁じます',
  'legal.privacy.title': 'プライバシーポリシー',
  'legal.privacy.body':
    'Plumagame はブラウザ上でゲームを生成します。アカウントは作らず、生成ファイルをサーバーに保存しません。\n\nホスティングに必要な技術データが処理される場合があります。分析や広告を使う場合は本ページを更新します',
  'legal.cookies.title': 'Cookie',
  'legal.cookies.body':
    'Plumagame はログイン用 Cookie を必要としません。ブラウザの技術的な保存領域を使う場合があります。\n\n必須でない Cookie を導入する場合は、法令に従い同意を求めます',
  'legal.affiliate.title': 'アフィリエイト表示',
  'legal.affiliate.body':
    'Amazon のアソシエイトとして、本サイトの商品リンク経由の適格な購入から Plumagame が報酬を得る場合があります。\n\n価格と在庫は Amazon が定めます。リンク利用による追加料金はありません',
  'footer.writeUs': 'お問い合わせ',
  'contact.title': 'お問い合わせ',
  'contact.intro': 'メッセージを送信 — メールで返信します',
  'contact.name': 'お名前',
  'contact.email': 'メールアドレス',
  'contact.message': 'メッセージ',
  'contact.send': '送信',
  'contact.sending': '送信中…',
  'contact.success': '送信しました。ありがとうございます',
  'contact.error': '送信に失敗しました。再度お試しください',
  'contact.subject': 'お問い合わせフォーム',
  'contact.spam': 'スパム防止：{a} + {b} は？',
  'contact.spamError': 'スパムチェックに失敗しました。再試行してください',
  'legal.privacy.contactHint': 'プライバシーに関するお問い合わせ：',
}
