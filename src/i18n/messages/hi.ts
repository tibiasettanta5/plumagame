import type { Dict } from '../types'

export const hi: Dict = {
  'common.continue': 'जारी रखें',
  'common.next': 'आगे',
  'common.yes': 'हाँ',
  'common.no': 'नहीं',
  'common.waiting': 'कृपया प्रतीक्षा करें…',
  'common.preview': 'पूर्वावलोकन',
  'common.howToPlay': 'कैसे खेलें',
  'common.startCreating': 'बनाना शुरू करें',
  'common.backHome': '← सभी गेम',
  'common.ready': 'सब तैयार',
  'common.checkDownload': 'अपनी पसंद जाँचें, फिर डाउनलोड या प्रिंट करें',
  'common.solutions': 'हल',
  'common.format': 'फ़ॉर्मैट',
  'common.quantity': 'संख्या',
  'common.difficulty': 'कठिनाई',
  'common.errorDownload': 'डाउनलोड में त्रुटि। फिर कोशिश करें',
  'common.preparingDownload': 'डाउनलोड तैयार हो रहा है…',
  'common.generatingN': '{n} बनाए जा रहे हैं…',
  'common.downloaded': 'डाउनलोड: {n} फ़ाइल ({format})',
  'common.downloadedWithSolutions':
    'डाउनलोड: {n} + हल ({format})',
  'common.downloadN': '{n} डाउनलोड करें',
  'common.printN': '{n} प्रिंट करें',
  'common.preparingPrint': 'प्रिंट तैयार हो रहा है…',
  'common.printed': 'प्रिंट डायलॉग खोला गया।',
  'common.errorPrint': 'प्रिंट में त्रुटि। फिर कोशिश करें',
  'common.guide': 'गाइड · {game}',
  'common.comeSiGioca': 'कैसे खेलें',

  'home.headline': 'प्रिंट के लिए अनोखे गेम बनाएँ',
  'home.sub':
    'गेम चुनें, कठिनाई और संख्या सेट करें, फिर प्रिंटर के लिए PDF या JPG डाउनलोड करें',

  'game.maze': 'भूलभुलैया',
  'game.maze.blurb': 'शुरुआत और अंत में पात्रों वाले अनोखे रास्ते',
  'game.sudoku': 'सुडोकू',
  'game.sudoku.blurb': '4×4, 6×6 या 9×9 ग्रिड, कठिनाई और हल के साथ',
  'game.nonogram': 'Nonogram / Picross',
  'game.nonogram.blurb': 'पंक्ति और स्तंभ संकेत से चित्र बनता है',
  'game.kakuro': 'Kakuro',
  'game.kakuro.blurb': 'योग और अंक, जैसे संख्या क्रॉसवर्ड',
  'game.futoshiki': 'Futoshiki',
  'game.futoshiki.blurb': 'कोष्ठकों के बीच असमानताओं वाला लैटिन वर्ग',
  'game.hashi': 'Hashi',
  'game.hashi.blurb': 'द्वीपों को एक या दो पुलों से जोड़ें',
  'game.battleship': 'Battleship',
  'game.battleship.blurb': 'रखने के लिए बेड़े सूची वाली खाली प्रिंट ग्रिड',

  'diff.easy': 'आसान',
  'diff.easy.hint': 'हल करना सरल',
  'diff.medium': 'मध्यम',
  'diff.medium.hint': 'चुनौती और स्पष्टता का संतुलन',
  'diff.hard': 'कठिन',
  'diff.hard.hint': 'ज़्यादा चुनौतीपूर्ण',
  'diff.custom': 'कस्टम',
  'diff.custom.hint': 'कोष्ठकों की संख्या खुद चुनें',
  'diff.title': 'कितनी कठिन हो?',
  'diff.sub': 'चुनौती का स्तर चुनें',
  'diff.subMaze': 'प्रीसेट या कस्टम ग्रिड चुन सकते हैं',
  'diff.subSudoku': 'पहले से भरे अंकों की संख्या पर निर्भर करता है',

  'wizard.countTitle': 'कितने बनाने हैं?',
  'wizard.countTitle.mazes': 'कितनी भूलभुलैया बनानी हैं?',
  'wizard.countTitle.sudoku': 'कितने सुडोकू बनाने हैं?',
  'wizard.countTitle.nonogram': 'कितने nonogram बनाने हैं?',
  'wizard.countTitle.kakuro': 'कितने kakuro चाहिए?',
  'wizard.countTitle.futoshiki': 'कितने futoshiki चाहिए?',
  'wizard.countTitle.hashi': 'कितने hashi चाहिए?',
  'wizard.countTitle.battleship': 'कितनी ग्रिड बनानी हैं?',
  'wizard.countSub':
    '1 से 3, सभी एक जैसी कठिनाई, लेकिन एक-दूसरे जैसे नहीं',
  'wizard.solutionsTitle': 'क्या हल भी शामिल करें?',
  'wizard.solutionsSub':
    'हाँ हो तो पूर्वावलोकन में दिखेंगे और फ़ाइलों के साथ डाउनलोड होंगे',
  'wizard.solutionsYes': 'पहेलियाँ + हल',
  'wizard.solutionsNo': 'केवल पहेलियाँ',
  'wizard.formatTitle': 'किस फ़ॉर्मैट में डाउनलोड?',
  'wizard.pdf': 'PDF',
  'wizard.pdf.hint': 'प्रिंट के लिए सर्वोत्तम',
  'wizard.jpg': 'JPG',
  'wizard.jpg.hint': 'अलग-अलग चित्र या ZIP',
  'wizard.gridTitle': 'कौन-सी ग्रिड चाहिए?',
  'wizard.gridSub': 'सुडोकू का आकार चुनें',
  'wizard.size4': '4×4',
  'wizard.size4.hint': 'छोटों के लिए — 2×2 ब्लॉक',
  'wizard.size6': '6×6',
  'wizard.size6.hint': 'मध्य — 2×3 ब्लॉक',
  'wizard.size9': '9×9',
  'wizard.size9.hint': 'क्लासिक — 3×3 ब्लॉक',
  'wizard.themeTitle': 'शुरुआत और अंत में कौन-से पात्र?',
  'wizard.themeSub': 'एक जोड़ी चुनें: बाएँ शुरुआत, दाएँ लक्ष्य',
  'wizard.customSizeTitle': 'ग्रिड में कितने कोष्ठ?',
  'wizard.customSizeSub':
    'क्षैतिज = चौड़ाई, ऊर्ध्व = ऊँचाई। {min} से {max}',
  'wizard.cellsH': 'क्षैतिज कोष्ठ',
  'wizard.cellsV': 'ऊर्ध्व कोष्ठ',
  'wizard.newMaze': 'नई भूलभुलैया',
  'wizard.newSudoku': 'नया सुडोकू',
  'wizard.restart': 'फिर से शुरू',
  'wizard.grid': 'ग्रिड',
  'wizard.characters': 'पात्र',
  'wizard.ships': 'जहाज',
  'wizard.islands': 'द्वीप',
  'wizard.shape': 'आकार',

  'noun.mazes': 'भूलभुलैया',
  'noun.sudoku': 'सुडोकू',
  'noun.nonogram': 'nonogram',
  'noun.kakuro': 'kakuro',
  'noun.futoshiki': 'futoshiki',
  'noun.hashi': 'hashi',
  'noun.grids': 'ग्रिड',
  'noun.sheets': 'पृष्ठ',

  'aff.disclosure':
    'Amazon सहयोगी के रूप में, मैं योग्य खरीद पर कमाई करता/करती हूँ',
  'aff.ready': 'आपकी फ़ाइलें तैयार हैं',
  'aff.print.preparing': 'प्रिंट तैयार हो रहा है',
  'aff.print.ready': 'प्रिंट के लिए तैयार',
  'aff.error': 'कुछ गलत हो गया',
  'aff.gen.maze': 'आपकी भूलभुलैया बन रही हैं',
  'aff.gen.sudoku': 'आपके सुडोकू बन रहे हैं',
  'aff.gen.nonogram': 'आपके nonogram बन रहे हैं',
  'aff.gen.kakuro': 'आपके kakuro बन रहे हैं',
  'aff.gen.futoshiki': 'आपके futoshiki बन रहे हैं',
  'aff.gen.hashi': 'आपके hashi बन रहे हैं',
  'aff.gen.battleship': 'आपकी ग्रिड बन रही हैं',
  'aff.close': 'बंद करें',
  'aff.hook': 'यह भी पसंद आ सकता है:',

  'guide.sudoku.0.t': 'सुडोकू क्या है?',
  'guide.sudoku.0.b':
    'ग्रिड पर तार्किक पहेली। खाली कोष्ठ सही अंकों से भरें, दोहराव नहीं',
  'guide.sudoku.1.t': 'ग्रिड और ब्लॉक',
  'guide.sudoku.1.b':
    'क्लासिक सुडोकू 9×9 है और नौ 3×3 ब्लॉकों (यहाँ हाइलाइट) में बँटा है। मोटी रेखाएँ ब्लॉक अलग करती हैं',
  'guide.sudoku.2.t': 'पंक्ति नियम',
  'guide.sudoku.2.b':
    'हर पंक्ति में 1 से 9 प्रत्येक एक बार। यहाँ एक वैध पंक्ति, बिना दोहराव',
  'guide.sudoku.3.t': 'स्तंभ नियम',
  'guide.sudoku.3.b':
    'हर स्तंभ में भी 1 से 9, प्रत्येक एक बार। हाइलाइट स्तंभ देखें',
  'guide.sudoku.4.t': 'दिए गए अंक',
  'guide.sudoku.4.b':
    'प्रिंट सुडोकू में कुछ कोष्ठ पहले से भरे होते हैं — ये शुरुआती संकेत हैं, मिटाएँ नहीं। केवल खाली भरें',
  'guide.sudoku.5.t': 'कैसे खेलें',
  'guide.sudoku.5.b':
    'खाली कोष्ठ चुनें और वह अंक आज़माएँ जो उसी पंक्ति, स्तंभ या 3×3 ब्लॉक में न हो। यहाँ 5 मान्य है',
  'guide.sudoku.6.t': 'आप तैयार हैं',
  'guide.sudoku.6.b':
    'प्रिंट योग्य सुडोकू बनाएँ: आकार, कठिनाई और संख्या। शुरू करने के लिए «आगे» दबाएँ',

  'guide.maze.0.t': 'भूलभुलैया क्या है?',
  'guide.maze.0.b':
    'दीवारों के बीच रास्ता। प्रवेश से निकास तक, दीवार पार किए बिना',
  'guide.maze.1.t': 'शुरुआत और अंत',
  'guide.maze.1.b':
    'प्रवेश और निकास आपके चुने पात्रों से चिह्नित। एक तरफ से अंदर, दूसरी तरफ बाहर',
  'guide.maze.2.t': 'दीवारें',
  'guide.maze.2.b':
    'काली रेखाएँ दीवार हैं — पार नहीं कर सकते। खुले गलियारों से चलें',
  'guide.maze.3.t': 'रास्ता',
  'guide.maze.3.b':
    'शुरू से अंत तक कम से कम एक रास्ता हमेशा होता है। बंद गलियाँ मिल सकती हैं: अटकें तो वापस जाएँ',
  'guide.maze.4.t': 'प्रिंट और हल',
  'guide.maze.4.b':
    'कागज़ पर पेंसिल से हल करें। हल के साथ सही रास्ता भी मिलता है',
  'guide.maze.5.t': 'आप तैयार हैं',
  'guide.maze.5.b':
    'भूलभुलैया बनाएँ: पात्र, कठिनाई, संख्या। «आगे» से शुरू करें',

  'guide.nonogram.0.t': 'Nonogram क्या है?',
  'guide.nonogram.0.b':
    'ग्रिड पहेली: सही कोष्ठ भरने पर चित्र दिखता है। Picross भी कहते हैं',
  'guide.nonogram.1.t': 'संकेत',
  'guide.nonogram.1.b':
    'बाहर की संख्याएँ बताती हैं उस पंक्ति/स्तंभ में भरे कोष्ठ, समूहों में, कम से कम एक खाली से अलग',
  'guide.nonogram.2.t': 'कोष्ठ भरें',
  'guide.nonogram.2.b':
    '«3» हो तो लगातार तीन भरें। «1 2» का मतलब 1 का समूह और 2 का, बीच में खाली जगह',
  'guide.nonogram.3.t': 'खाली कोष्ठ',
  'guide.nonogram.3.b':
    'चित्र का हिस्सा नहीं — सफेद रहें। निशान लगाना मदद करता है',
  'guide.nonogram.4.t': 'आप तैयार हैं',
  'guide.nonogram.4.b': 'प्रिंट Nonogram बनाएँ। «आगे» से शुरू',

  'guide.kakuro.0.t': 'Kakuro क्या है?',
  'guide.kakuro.0.b':
    'क्रॉसवर्ड जैसा, पर अंक 1–9। काले कोष्ठ में योग दिए होते हैं',
  'guide.kakuro.1.t': 'योग',
  'guide.kakuro.1.b':
    'काले कोष्ठ के ऊपर-दाएँ संख्या दाएँ पंक्ति का योग; नीचे-बाएँ स्तंभ का नीचे योग',
  'guide.kakuro.2.t': 'दोहराव नहीं',
  'guide.kakuro.2.b':
    'हर धारा (काले कोष्ठों के बीच) में अंक दोहराए नहीं। केवल 1–9',
  'guide.kakuro.3.t': 'कैसे पूरा करें',
  'guide.kakuro.3.b':
    'सबसे कठिन योग से शुरू करें और सफेद कोष्ठ भरें जब तक सब मिले। हल उदाहरण यहाँ',
  'guide.kakuro.4.t': 'आप तैयार हैं',
  'guide.kakuro.4.b': 'प्रिंट Kakuro बनाएँ। «आगे» से शुरू',

  'guide.futoshiki.0.t': 'Futoshiki क्या है?',
  'guide.futoshiki.0.b':
    'असमानता वाला लैटिन वर्ग: 1–N भरें, पंक्ति/स्तंभ में दोहराव नहीं',
  'guide.futoshiki.1.t': 'प्रति पंक्ति और स्तंभ एक अंक',
  'guide.futoshiki.1.b':
    'सुडोकू की तरह, हर संख्या पंक्ति और स्तंभ में एक बार। 4×4 पर 1–4',
  'guide.futoshiki.2.t': '< और > चिह्न',
  'guide.futoshiki.2.b':
    'दो कोष्ठों के बीच बड़ा/छोटा हो सकता है। अंक उस तुलना का पालन करें',
  'guide.futoshiki.3.t': 'कैसे हल करें',
  'guide.futoshiki.3.b':
    'दिए अंक और तुलना से खाली कोष्ठ निकालें। हल सहित उदाहरण',
  'guide.futoshiki.4.t': 'आप तैयार हैं',
  'guide.futoshiki.4.b': 'प्रिंट Futoshiki बनाएँ। «आगे» से शुरू',

  'guide.hashi.0.t': 'Hashi क्या है?',
  'guide.hashi.0.b':
    '«पुल» भी कहते हैं। द्वीपों को क्षैतिज/ऊर्ध्व पुलों से जोड़ें — तिरछे नहीं',
  'guide.hashi.1.t': 'द्वीप',
  'guide.hashi.1.b':
    'हर वृत्त एक द्वीप। संख्या बताती है कुल कितने पुल लगें',
  'guide.hashi.2.t': 'पुल',
  'guide.hashi.2.b':
    'दो द्वीपों के बीच एक या दो पुल। काटते नहीं, दूसरे द्वीपों पर नहीं',
  'guide.hashi.3.t': 'एक या दो',
  'guide.hashi.3.b':
    'एक रेखा = एक पुल। समानांतर दो = दो पुल। अंत में सभी द्वीप जुड़े हों',
  'guide.hashi.4.t': 'आप तैयार हैं',
  'guide.hashi.4.b': 'प्रिंट Hashi बनाएँ। «आगे» से शुरू',

  'guide.battleship.0.t': 'Battleship क्या है?',
  'guide.battleship.0.b':
    'खिलाड़ी ग्रिड पर जहाज छुपाते और ढूँढते हैं। हर जहाज कई कोष्ठ लेता है',
  'guide.battleship.1.t': 'ग्रिड',
  'guide.battleship.1.b':
    'कोष्ठ अक्षर (स्तंभ) और अंक (पंक्ति) से, जैसे «B4» गोली चलाते समय',
  'guide.battleship.2.t': 'बेड़ा',
  'guide.battleship.2.b':
    'नीचे जहाज वर्गों में: एक वर्ग = एक कोष्ठ। लंबाई गिनने के लिए टुकड़े गिनें',
  'guide.battleship.3.t': 'कैसे रखें',
  'guide.battleship.3.b':
    'जहाज क्षैतिज या ऊर्ध्व, तिरछे नहीं। आमतौर पर छूते भी नहीं, कोने से भी नहीं',
  'guide.battleship.4.t': 'कैसे खेलें',
  'guide.battleship.4.b':
    'बारी-बारी एक कोष्ठ पर गोली। लगी = जहाज; चूक = पानी। पूरा बेड़ा डुबाओ तो जीत। दो ग्रिड प्रिंट करें और मित्र के साथ खेलें',
  'guide.battleship.5.t': 'आप तैयार हैं',
  'guide.battleship.5.b': 'प्रिंट ग्रिड बनाएँ। «आगे» से शुरू',

  'sol.yes.maze': 'भूलभुलैया + हल',
  'sol.no.maze': 'केवल भूलभुलैया',
  'sol.yes.sudoku': 'सुडोकू + हल',
  'sol.no.sudoku': 'केवल सुडोकू',
  'sol.yes.generic': 'पहेलियाँ + हल',
  'sol.no.generic': 'केवल पहेलियाँ',
  'sol.yes.hashi': 'पहेलियाँ + पुल हल',
  'sol.no.hashi': 'केवल द्वीप',
  'sol.yes.battleship': 'ग्रिड + जहाज स्थिति',
  'sol.no.battleship': 'खाली ग्रिड + बेड़ा सूची',

  'restart.maze': 'नई भूलभुलैया',
  'restart.sudoku': 'नया सुडोकू',
  'restart.nonogram': 'नया nonogram',
  'restart.kakuro': 'नया kakuro',
  'restart.futoshiki': 'नया futoshiki',
  'restart.hashi': 'नया hashi',
  'restart.battleship': 'नई ग्रिड',
  'seo.title': 'Plumagame — प्रिंट के लिए अनोखे गेम',
  'seo.description':
    'प्रिंट के लिए अनोखे गेम बनाएँ: भूलभुलैया, सुडोकू, नोनोग्राम, काकुरो, फुतोशिकी, हाशी और बैटलशिप। कठिनाई और संख्या सेट करें, PDF या JPG डाउनलोड करें',
  'seo.keywords': 'प्रिंट गेम, भूलभुलैया, सुडोकू, नोनोग्राम, PDF, Plumagame',
  'footer.tagline': 'ब्राउज़र में मुफ़्त प्रिंट गेम बनाएँ — बिना रजिस्ट्रेशन',
  'footer.games': 'उपलब्ध गेम',
  'footer.legal': 'कानूनी',
  'footer.privacy': 'गोपनीयता',
  'footer.cookies': 'कुकीज़',
  'footer.affiliate': 'एफिलिएट जानकारी',
  'footer.contact': 'संपर्क',
  'footer.rights': 'सर्वाधिकार सुरक्षित',
  'legal.privacy.title': 'गोपनीयता नीति',
  'legal.privacy.body':
    'Plumagame आपके ब्राउज़र में गेम बनाता है। हम खाते नहीं बनाते और आपकी फ़ाइलें सर्वर पर नहीं रखते।\n\nहोस्टिंग के लिए तकनीकी डेटा प्रोसेस हो सकता है। विश्लेषण या विज्ञापन पर यह पेज अपडेट होगा',
  'legal.cookies.title': 'कुकीज़',
  'legal.cookies.body':
    'Plumagame लॉगिन कुकी के बिना चलता है। ब्राउज़र का तकनीकी संग्रह इस्तेमाल हो सकता है।\n\nगैर-आवश्यक कुकी पर कानून अनुसार सहमति माँगी जाएगी',
  'legal.affiliate.title': 'एफिलिएट जानकारी',
  'legal.affiliate.body':
    'Amazon सहयोगी के रूप में, साइट के लिंक से योग्य खरीद पर Plumagame को कमीशन मिल सकता है।\n\nकीमत और उपलब्धता Amazon तय करता है। इन लिंक से आपकी लागत नहीं बढ़ती',
  'footer.writeUs': 'हमें लिखें',
  'contact.title': 'संपर्क करें',
  'contact.intro': 'संदेश भेजें — हम ईमेल से जवाब देंगे',
  'contact.name': 'नाम',
  'contact.email': 'आपका ईमेल',
  'contact.message': 'संदेश',
  'contact.send': 'भेजें',
  'contact.sending': 'भेजा जा रहा है…',
  'contact.success': 'धन्यवाद! संदेश भेज दिया गया',
  'contact.error': 'भेजने में विफल। फिर कोशिश करें',
  'contact.subject': 'संपर्क फ़ॉर्म',
  'contact.spam': 'एंटीस्पैम: {a} + {b} कितना है?',
  'contact.spamError': 'एंटीस्पैम जाँच विफल। फिर कोशिश करें',
  'legal.privacy.contactHint': 'गोपनीयता अनुरोधों के लिए:',
}
