// ==UserScript==
// @name        WoTStatScript - x360
// @version     1.9.110
// @description More info for World of Tanks profile page. Adapted for X360 page.
// @author      Orrie
// @namespace   http://forum.wotlabs.net/index.php?/topic/1264-
// @icon        http://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/img/icon.png
// @include     http://worldoftanksxbox360edition.com/*/accounts/*-*/
// @grant       GM_xmlhttpRequest
// @license     MIT License
// ==/UserScript==
/*
	Changelogs: https://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/WoTStatScript-changelog.txt
				https://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/modules/WoTStatScript-x360-changelog.txt
*/
(function () {
// global vars
var d = document;

// get server info
var wg = {host:d.location.host, href:d.location.href, serv:"xbox"};
// script variables
var sc = {
	vers: "1.9.110",
	host: "https://greasyfork.org/en/scripts/6797-wotstatscript-x360",
	user: "http://forum.wotlabs.net/index.php?/user/1618-orrie/",
	top: "http://forum.wotlabs.net/index.php?/topic/1264-",
	wn: "http://www.wnefficiency.net/exp/expected_tank_values_latest.json",
	loc: [
		[d.getElementsByClassName('b-portalmenu_links_list_point')[2].firstElementChild.innerHTML.toLowerCase(), "en"],
		["support", "en"],["podpora", "cz"],["kundendienst", "de"],["soporte", "es"],["aide", "fr"],["pomoc", "pl"],["destek", "tr"],["suporte", "en"],["поддержка", "ru"]
	]
};
// script threadlink
	sc.link = "<div class='b-scriptlink'><a target='_blank' href="+sc.host+">Script</a> version "+sc.vers+" - <a target='_blank' href="+sc.top+">Thread</a></div>";

// determine browser types
var web = {
	gecko: typeof InstallTrigger !== 'undefined',
	opera: !!window.opera || /opera|opr/i.test(navigator.userAgent),
	chrome: !!window.chrome && !!window.chrome.webstore,
	safari: /constructor/i.test(window.HTMLElement)
};

// fetch wnefficiency values - check if array exists in localStorage, otherwise fetch and reload page
var statObj = {},
	wnExpValues = JSON.parse(localStorage.getItem("wnExpValues")),
	wnExpDate = JSON.parse(localStorage.getItem("wnExpDate"))+1728e5 >= Date.now(), // true if timestamp is less than 2 days old, refresh list if false.
	wnExpVers = JSON.parse(localStorage.getItem("wnExpVers")) || "";
if (wnExpVers[0]==sc.vers && wnExpValues && wnExpDate) {
	statObj = wnExpValues;
}
else {
	reqHnd(sc.wn, wnHnd, wnHnd_error);
}

// inserting functions into head as scripts
var scripts = [copyClipboard, compileStats];
for (var _j=0; _j<scripts.length; ++_j) {
var script = elem("script", "wotstatscript", "", "text/javascript");
	script.textContent = scripts[_j].toString();
	d.head.appendChild(script);
}

// modify sidebar structure
var sidebar_class = d.getElementsByClassName('l-sidebar')[0],
	recBlock_class = d.getElementsByClassName('js-recruitsation-block')[0],
	content_class = d.getElementsByClassName('l-content')[0],
	sidemsg_class = elem("div", "l-side-msg", "");
	if (sidebar_class) {
		sidemsg_class.appendChild(recBlock_class);
		sidebar_class.appendChild(sidemsg_class);
	}

// colour scale array
var colArr = {
	//      col        wr  bat    sr  hr  dmg  wn8   wn7   eff   nm
	sUni: [ "#5A3175", 65, 30000, 50, 80, 300, 2900, 2050, 2050, 2000 ], // 99.99% super unicum
	uni:  [ "#83579D", 60, 25000, 46, 75, 270, 2450, 1850, 1800, 1950 ], // 99.90% unicum
	gr8:  [ "#3972C6", 56, 21000, 42, 70, 240, 2000, 1550, 1500, 1750 ], // 99.00% great
	vGud: [ "#4099BF", 54, 17000, 38, 65, 210, 1600, 1350             ], // 95.00% very good
	good: [ "#4D7326", 52, 13000, 34, 60, 180, 1200, 1100, 1200, 1450 ], // 82.00% good
	aAvg: [ "#849B24", 50, 10000, 30, 55, 150,  900                   ], // 63.00% above average
	avg:  [ "#CCB800", 48,  7000, 25, 50, 120,  650,  900,  900, 1250 ], // 40.00% average
	bAvg: [ "#CC7A00", 47,  3000, 20, 45,  90,  450,  700,  600, 1150 ], // 20.00% below average
	bas:  [ "#CD3333", 46,  1000, 15, 40,  60,  300,  500             ], //  6.00% basic
	beg:  [ "#930D0D",  0,     0,  0,  0,   0,    0,    0,    0,    0 ], //  0.00% beginner
	dft:  [ "#6B6B6B" ], // default
	id: { "col": 0, "wr": 1, "bat": 2, "sr": 3, "hr": 4, "dmg": 5, "wn8": 6, "wn7": 7, "eff": 8, "nm": 9 }  // type identifier
};

// localization
// cz-czech   - Crabtr33 and Ragnarocek
// de-german  - ArtiOpa, Crakker and multimill
// fr-french  - SuperPommeDeTerre
// pl-polish  - KeluMocy and pokapokami
// es-spanish - Frodo45127
// tr-turkish - Ufuko
// ru-russian - dimon222
var loc = {
	// thousands separator
	sym: { en: ",", ru: " ", cz: " ", de: ".", fr: " ", pl: " ", es:".", tr: "."},
	// profile page
	p01: { en: "Go to Bottom", ru: "Пролистать вниз", cz: "Konec stránky", de: "nach unten", fr: "Aller à la fin", pl: "Koniec strony", es: "Ir al final", tr: "Aşağı İn" },
	p02: { en: "Go to Top", ru: "Пролистать наверх", cz: "Začátek stránky", de: "nach oben", fr: "Aller au début", pl: "Początek strony", es: "Ir al principio", tr: "Yukarı Çık" },
	p03: { en: "Days Ago", ru: "Дней назад", cz: "dnů", de: "Tage in WOT aktiv", fr: "jours", pl: "Dni temu", es: "Días", tr: "Gün Önce" },
	p04: { en: "Player Stats:", ru: "Статистика игрока:", cz: "Stat. hráče:", de: "Spielerstatistik", fr: "Statistiques du joueur:", pl: "Statystyki gracza:", es: "Estadísticas del jugador:", tr: "Oyuncu Statları" },
	p05: { en: "Signature:", ru: "Подпись:", cz: "Podpis:", de: "Forumsignatur", fr: "Signature:", pl: "Sygnatura do forum:", es: "Firma", tr: "İmza" },
	p06: { en: "Light", ru: "Светлые тона", cz: "Světlý", de: "Signatur Weiß", fr: "Claire", pl: "Jasna", es: "Clara", tr: "Açık" },
	p07: { en: "Dark", ru: "Тёмные тона", cz: "Tmavý", de: "Signatur Schwarz", fr: "Foncée", pl: "Ciemna", es: "Oscura", tr: "Koyu" },
	p08: { en: "Replays:", ru: "Реплеи:", cz: "Záznamy:", de: "Replays", fr: "Replays:", pl: "Powtórki:", es: "Repeticiones:", tr: "Replayler" },
	p09: { en: "Victories", ru: "Победы", cz: "Vítězství", de: "Siege", fr: "Victoires", pl: "Zwycięstw", es: "Victorias", tr: "Zaferler" },
	p10: { en: "Battles Participated", ru: "Участий в битвах", cz: "Počet bitev", de: "Gefechte geführt", fr: "Batailles participées", pl: "Bitew", es: "Batallas jugadas", tr: "Savaş Katılımı" },
	p11: { en: "Average Experience", ru: "Средний опыт", cz: "Průměrné zkušenosti", de: "Durchnittl. Erfahrung", fr: "Expérience moyenne", pl: "Średnie doświadczenie", es: "Experiencia media", tr: "Ortalama Deneyim" },
	p12: { en: "Average Tier", ru: "Средний уровень танка", cz: "Průměrný Tier", de: "Durchschnittl. Stufe", fr: "Tiers moyen", pl: "Średni poziom pojazdu", es: "Tier medio", tr: "Ortalama Seviye" },
	p13: { en: "Win/Loss Ratio", ru: "Отношение Победы/Поражения", cz: "Poměr vítězství/porážek", de: "Verhältnis Siege/ Niederlagen", fr: "Ratio Victoires/Défaites", pl: "Zwycięstwa/porażki", es: "Ratio de victorias/derrotas", tr: "Zafer/Kayıp Oranı" },
	p14: { en: "Performance Ratings", ru: "Рейтинги производительности", cz: "Hodnocení bojového výkonu", de: "Leistungsverhältnis", fr: "Indices de performances", pl: "Statystyki wydajności", es: "Ratios de rendimiento", tr: "Performans Değerleri" },
	p15: { en: "WN8", ru: "WN8", cz: "WN8", de: "WN8", fr: "WN8", pl: "WN8", es: "WN8", tr: "WN8" },
	p16: { en: "Efficiency", ru: "Эффективность", cz: "Efektivita", de: "Effizienz", fr: "Efficacité", pl: "Efficiency", es: "Eficiencia", tr: "Efficiency" },
	p17: { en: "NoobMeter", ru: "NoobMeter", cz: "NoobMeter", de: "NoobMeter", fr: "NoobMeter", pl: "NoobMeter", es: "NoobMeter", tr: "NoobMeter" },
	p18: { en: "Fetching...", ru: "Загрузка...", cz: "Načítám...", de: "abrufen...", fr: "Récupération...", pl: "Pobieranie...", es: "Recuperando...", tr: "Getiriliyor..." },
	p19: { en: "Performance Rating Calculations", ru: "Вычисления рейтинга производительности", cz: "Výpočet hodnocení bojového výkonu", de: "Leistungsberechnung", fr: "Calculs des indicateurs de performances", pl: "Obliczenia statystyk wydajności", es: "Cálculos del ratio de rendimiento", tr: "Performans Değeri Hesaplamaları" },
	p20: { en: "Formula Type", ru: "Тип формулы", cz: "Typ výpočtu", de: "Formel", fr: "Type de formule", pl: "Formuła", es: "Tipo de fórmula", tr: "Formül Tipi" },
	p21: { en: "Total", ru: "Всего", cz: "Celkem", de: "Gesamt", fr: "Total", pl: "Wynik", es: "Total", tr: "Toplam" },
	p22: { en: "Scaled", ru: "Шкала", cz: "Stupnice", de: "Skaliert", fr: "A l'échelle", pl: "Skalowanie", es: "Escala", tr: "Ölçek" },
	p23: { en: "Destroyed", ru: "Уничтожено", cz: "Zničeno", de: "Zerstört", fr: "Détruits", pl: "Fragi", es: "Destruidos", tr: "imha" },
	p24: { en: "Damage", ru: "Урон", cz: "Poškození", de: "Schaden", fr: "Dommages", pl: "Obrażenia", es: "Daño", tr: "Hasar" },
	p25: { en: "Detected", ru: "Обнаружено", cz: "Detekováno", de: "Aufgeklärt", fr: "Détectés", pl: "Wykrycia", es: "Detectados", tr: "Tespit" },
	p26: { en: "Capping", ru: "Захват", cz: "Obsazení", de: "Erobert", fr: "Capture", pl: "Zdobycie bazy", es: "Capturando", tr: "İşgal" },
	p27: { en: "Defense", ru: "Оборона", cz: "Obrana", de: "Verteidigt", fr: "Défense", pl: "Obrona bazy", es: "Defendiendo", tr: "Savunma" },
	p28: { en: "Victories", ru: "Победы", cz: "Vítězství", de: "Siege", fr: "Victoires", pl: "Zwycięstwa", es: "Victorias", tr: "Zaferler" },
	p29: { en: "WN8", ru: "WN8", cz: "WN8", de: "WN8", fr: "WN8", pl: "WN8", es: "WN8", tr: "WN8" },
	p30: { en: "WN7", ru: "WN7", cz: "WN7", de: "WN7", fr: "WN7", pl: "WN7", es: "WN7", tr: "WN7" },
	p31: { en: "Efficiency", ru: "Эффективность", cz: "Efektivita", de: "Effizienz", fr: "Efficacité", pl: "Efficiency", es: "Eficiencia", tr: "Efficiency" },
	p32: { en: "What is WN Efficiency?", ru: "Что такое WN эффективность?", cz: "Co je WN hodnocení?", de: "Was bedeutet WN Effizienz", fr: "Qu'est que l'efficacité WN ?", pl: "Czym jest statystyka wydajności WN?", es: "¿Qué es la eficiencia WN?", tr: "WN Efficiency Nedir?" },
	p33: { en: "Ace Tanker", ru: "Мастер", cz: "Hrdina", de: "Panzer Ass", fr: "As du char", pl: "As Pancerny", es: "As de tanques", tr: "Tank Ası" },
	p34: { en: "1st Class", ru: "1 степень", cz: "1. třídy", de: "1ter Klasse", fr: "Classe 1", pl: "Pierwsza Klasa", es: "Clase I", tr: "1. Sınıf" },
	p35: { en: "2nd Class", ru: "2 степень", cz: "2. třídy", de: "2ter Klasse", fr: "Classe 2", pl: "Druga Klasa", es: "Clase II", tr: "2. Sınıf" },
	p36: { en: "3rd Class", ru: "3 степень", cz: "3. třídy", de: "3ter Klasse", fr: "Classe 3", pl: "Trzecia Klasa", es: "Clase III", tr: "3. Sınıf" },
	p37: { en: "No Badge", ru: "Нет значка", cz: "Nezískáno", de: "kein Orden", fr: "Aucun badge", pl: "Bez odznaki", es: "Sin medalla", tr: "Rozetsiz" },
	p38: { en: "Total Vehicles", ru: "Общее количество танки", cz: "Celkem vozidel", de: "Alle Fahrzeuge", fr: "Nombre total de véhicules", pl: "Całkowita liczba pojazdów", es: "Total de vehículos", tr: "Toplam Araçlar" },
	p39: { en: "Battles Participated:", ru: "Участий в битвах:", cz: "Počet bitev:", de: "An Gefechten teilgenommen", fr: "Batailles participées:", pl: "Bitwy:", es: "Batallas jugadas:", tr: "Savaş Katılımı" },
	p40: { en: "Victories:", ru: "Победы:", cz: "Vítězství:", de: "Siege", fr: "Victoires:", pl: "Zwycięstwa:", es: "Victorias:", tr: "Zaferler" },
	p41: { en: "Defeats:", ru: "Поражения:", cz: "Porážek:", de: "Niederlagen", fr: "Défaites:", pl: "Porażki:", es: "Derrotas:", tr: "Yenilgiler" },
	p42: { en: "Draws:", ru: "Ничья:", cz: "Remíza:", de: "Unentschieden", fr: "Egalités:", pl: "Remisy:", es: "Empates:", tr: "Beraberlikler" },
	p43: { en: "Battles Survived:", ru: "Битв пережито:", cz: "Přežito bitev:", de: "Gefechte überlebt", fr: "Batailles survécues:", pl: "Przetrwane bitwy:", es: "Batallas como superviviente:", tr: "Hayatta Kalma" },
	p44: { en: "Average Battles per Day:", ru: "Среднее число битв за день:", cz: "Průměrný počet bitev za den:", de: "Durschnittliche Gefechte pro Tag", fr: "Nombre moyen de batailles par jour:", pl: "Średnia bitew na dzień:", es: "Media de batallas por día:", tr: "Günlük Ortalama Savaş" },
	p45: { en: "Experience:", ru: "Опыт:", cz: "Zkušenosti:", de: "Erfahrung", fr: "Expérience:", pl: "Doświadczenie:", es: "Experiencia:", tr: "Deneyim" },
	p46: { en: "Average Experience per Battle:", ru: "Средний опыт за битву:", cz: "Průměrné zkušenosti za bitvu:", de: "Durchschnittserfahrung", fr: "Expérience moyenne par bataille:", pl: "Średnie doświadczenie na bitwę:", es: "Experiencia media por batalla:", tr: "Savaş Başına Ortalama Deneyim" },
	p47: { en: "Maximum Experience per Battle:", ru: "Максимальный опыт за битву:", cz: "Maximální zkušenosti za bitvu:", de: "Höchste Gefechtserfahrung", fr: "Expérience maximum par bataille:", pl: "Maksymalne doświadczenie na bitwę:", es: "Experiencia máxima por batalla:", tr: "Savaş Başına Maksimum Deneyim" },
	p48: { en: "Destroyed:", ru: "Уничтожено:", cz: "Zničeno:", de: "Zerstört", fr: "Détruits", pl: "Zniszczeni przeciwnicy:", es: "Destruidos:", tr: "İmhalar" },
	p49: { en: "Deaths:", ru: "Смертей:", cz: "Nepřežil:", de: "Tode", fr: "Morts", pl: "Zniszczony:", es: "Muertes:", tr: "Ölümler" },
	p50: { en: "Detected:", ru: "Обнаружено", cz: "Detekováno:", de: "Aufgeklärt", fr: "Détectés", pl: "Wykrytych:", es: "Detectados:", tr: "Tespitler" },
	p51: { en: "Hit Ratio:", ru: "Коэффициент попаданий:", cz: "Přesnost střelby:", de: "Trefferquote", fr: "Ratio de hit", pl: "Celność:", es: "Ratio de impactos:", tr: "İsabet Oranı" },
	p52: { en: "Damage Caused:", ru: "Урона нанесено:", cz: "Udělené poškození:", de: "Schaden verursacht", fr: "Dommages causés:", pl: "Zadane obrażenia:", es: "Daño causado:", tr: "Yapılan Hasar" },
	p53: { en: "Damage Received:", ru: "Урона получено:", cz: "Přijaté poškození:", de: "Schaden erhalten", fr: "Dommages reçus:", pl: "Otrzymane obrażenia:", es: "Daño recibido:", tr: "Alınan Hasar" },
	p54: { en: "Base Capture Points:", ru: "Очки захвата:", cz: "Bodů obsazení základny:", de: "Eroberungspunkte", fr: "Points de capture de base:", pl: "Punkty przejęcia bazy:", es: "Puntos de captura:", tr: "Bölge İşgali Puanı" },
	p55: { en: "Base Defense Points:", ru: "Очки обороны:", cz: "Bodů obrany základny:", de: "Verteidigungspunkte", fr: "Points de défense de base:", pl: "Punkty obrony bazy:", es: "Puntos de defensa:", tr: "Bölge Savunması Puanı" },
	p56: { en: "Average Tier:", ru: "Средний уровень:", cz: "Průměrný Tier:", de: "Durchschnittliche Stufe", fr: "Tiers moyen:", pl: "Średni poziom pojazdów:", es: "Tier media:", tr: "Ortalama Seviye" },
	p57: { en: "Vehicle Tiers", ru: "Уровни техники", cz: "Tiery vozidel", de: "Fahrzeuge Stufe", fr: "Tiers du véhicule", pl: "Poziomy czołgów", es: "Tier de los vehículos:", tr: "Araç Seviyeleri" },
	p58: { en: "Tier", ru: "Уровень", cz: "Tier", de: "Stufe", fr: "Tiers", pl: "Poziom", es: "Tier", tr: "Seviye" },
	p59: { en: "Total Vehicles:", ru: "Количество техники:", cz: "Celkem vozidel:", de: "Gesamt Fahrzeuge", fr: "Nombre total de véhicules:", pl: "Całkowita liczba pojazdów:", es: "Total de vehículos:", tr: "Toplam Araçlar" },
	p60: { en: "Tankopedia", ru: "Танковедение", cz: "Tankpédie", de: "Tankopedia", fr: "Tankopedia", pl: "Tankopedia", es: "Tankopedia", tr: "Tankopedia" },
	p61: { en: "Tank Statistics", ru: "Статистика танка", cz: "Statistiky vozidel", de: "Panzer Statistik", fr: "Statistiques des chars", pl: "Statystyki czołgu", es: "Estadísticas de tanques", tr: "Tank İstatistikleri" },
	p62: { en: "Premium Tanks", ru: "Премиум танки", cz: "Premium tanky", de: "Premium Panzer", fr: "Chars premiums", pl: "Czołgi premium", es: "Tanques premium", tr: "Premium Tanklar" },
	p63: { en: "Copy stats to Clipboard", ru: "Скопировать в буфер обмена", cz: "Kopírovat Stat. do schránky", de: "Statistiken in Zwischenablage kopieren", fr: "Copier les statistiques vers le presse-papiers", pl: "Kopiuj statystyki do schowka", es: "Copiar estadísticas al portapapeles", tr: "İstatistikleri Panoya Kopyala" },
	p64: { en: "Press Ctrl+C, or Right-Click and Copy", ru: "Нажмите Ctrl+C или ПКМ и Скопировать", cz: "Stiskni Ctrl+C, nebo klikni pravým tl. myši a vyber Kopírovat", de: "STRG+C/ rechter Mausklick und Kopieren", fr: "Appuyez sur Ctrl+C, ou clic droit et Copier", pl: "Naciśnij Ctrl+C, lub prawy klawisz myszy i 'Kopiuj'", es: "Presiona Ctrl+C, o haz clic derecho y pulsa Copiar.", tr: "Ctrl+C Tuşuna Bas, veya Sağ Tıkla ve Kopyala" },
	p65: { en: "WoTStatScript not active, because of player having 0 battles", ru: "Скрипт неактивен, т.к. у игрока 0 битв", cz: "WoTStatScript není aktivní, protože hráč má 0 bitev", de: "WoTStatScript inaktiv wegen fehlender Gefechte", fr: "WoTStatScript n'est pas actif, car le joueur a 0 batailles", pl: "WoTStatScript nieaktywny, ponieważ gracz rozegrał 0 bitew", es: "El script WoTStat no está activo, porque el jugador no ha jugado ninguna batalla.", tr: "WoTStat Scipt aktif değil, çünkü oyuncunun 0 savaşı var." },
	p66: { en: "Clan Stats:", ru: "Статистика клана:", cz: "Stat. klanu:", de: "Clanstatistiken", fr: "Statistiques du clan:", pl: "Statystyki klanu:", es: "Estadísticas del clan:", tr: "Klan İstatistikleri" },
	p67: { en: "Replays:", ru: "Реплеи:", cz: "Záznamy:", de: "Replays", fr: "Replays:", pl: "Powtórki:", es: "Repeticiones:", tr: "Replayler" },
	p68: { en: "Tier 10 Only", ru: "Уровень 10 Только", cz: "Pouze Tier 10", de: "nur Stufe 10", fr: "Seulement les tiers 10", pl: "Tylko 10 tier", es: "Sólo tier 10", tr: "Seviye 10 Tanklar" },
	p69: { en: "Battles missing from API, ratings may be inaccurate", ru: "Отсутствует Battles от API, рейтинги могут быть неточными", cz: "Některé bitvy se z API nenačetly, hodnocení může být nepřesné", de: "Fehlende API Gefechtsdaten, Bewertungen können ungenau sein", fr: "Des batailles manquent de l'API, les indices peuvent être faussés", pl: "Brakujące bitwy, obliczenia mogą być niedokładne", es: "Faltan batallas desde la API, por lo que los ratios pueden no ser muy precisos.", tr: "Savaş bilgileri eksik, hesaplamalar hatalı olabilir." },
	p70: { en: "Hit Ratio", ru: "Коэффициент попаданий", cz: "Přesnost střelby", de: "Trefferquote", fr: "Ratio de hit", pl: "Celność", es: "Ratio de impacto", tr: "İsabet Oranı" },
	p71: { en: "Average Damage", ru: "Средний Урона", cz: "Průměrné poškození", de: "Durchschnittlicher Schaden", fr: "Dommages moyens", pl: "Średnie obrażenia", es: "Daño medio", tr: "Ortalama Hasar" },
	p72: { en: "Stats for", ru: "Cтатистика для", cz: "Statistika hráče", de: "Statistik für", fr: "Statistiques pour ", pl: "Statystyki z", es: "Estadísticas para", tr: "İstatistikler" },
	p73: { en: "Battles:", ru: "Битвы:", cz: "Bitev:", de: "Gefechte", fr: "Batailles:", pl: "Bitew:", es: "Batallas:", tr: "Savaşlar" },
	p74: { en: "Clan History:", ru: "История клана:", cz: "Historie klanů:", de: "Clan Historie", fr: "Clan History:", pl: "Poprzednie klany:", es: "Clan History:", tr: "Clan History:" },
	p75: { en: "No Rating", ru: "Нет рейтинга", cz: "Bez hodnocení", de: "Kein Rating", fr: "No Rating", pl: "Brak klasyfikacji", es: "No Rating", tr: "No Rating" },
	p76: { en: "None", ru: "Никто", cz: "Žádné", de: "Kein", fr: "None", pl: "Brak", es: "None", tr: "None" },
	p77: { en: "Error", ru: "Oшибка", cz: "Chyba", de: "Fehler", fr: "Error", pl: "Błąd", es: "Error", tr: "Error" },
	// clan page
	c01: { en: "Clan Stats:", ru: "Статистика клана:", cz: "Stat. klanu:", de: "Clanstatistiken", fr: "Statistiques du clan:", pl: "Statystyki klanu:", es: "Estadísticas del clan:", tr: "Klan İstatistikleri" },
	c02: { en: "Replays:", ru: "Реплеи:", cz: "Záznamy:", de: "Replays", fr: "Replays:", pl: "Powtórki:", es: "Repeticiones:", tr: "Replayler" }
	//p00: { en: "", ru: "", cz: "", de: "", fr: "", pl: "", es:"", tr: ""},
};

// find page language
for (var _sl=1; _sl<sc.loc.length; _sl++) {
	if (sc.loc[_sl][0] == sc.loc[0][0]) {
		sc.loc = sc.loc[_sl][1];
	}
	else if (_sl == sc.loc.length-1) {
		sc.loc = sc.loc[0][1];
		sidemsg_class.appendChild(elem("div", "b-loc-wrpr", "<div class='b-sidebar-widget clearfix'><div class='b-sidebar-widget_inner b-sidebar-widget_inner__recrut'><h2 class='b-sidebar-widget_title'>Script Translation</h2><p class='b-sidebar-widget_text'>Unsupported language detected!<br>If you want to contribute with translation, contact <a class='b-orange-arrow' href='"+sc.user+"'>Orrie</a></p></div></div>"));
	}
}
// process localization
for (var _l in loc) {
	if (loc.hasOwnProperty(_l)) {
		loc[_l] = loc[_l][sc.loc];
	}
}

// variables for dropbox, css and data uri
var css = {
	box: "border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset;",
	input: "background: rgba(0, 0, 0, 0.09); box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.15) inset, 0 0 38px 1px rgba(0, 0, 0, 0.3) inset, 0 0 23px 1px rgba(255, 255, 255, 0.02), 0 0 5px 1px rgba(0, 0, 0, 0.5) inset; color: #606061;",
	l: [
		"http://dl.dropboxusercontent.com/u/12497046/wot/projects/statscript/img",
		"/static/wot/common/css/scss/context-menu/img/arrow.png",
		"/static/wot/common/css/scss/content/links/img/orange_arrow.png",
		"/static/wot/common/css/scss/content/user/img/speedometr-separator.png",
		"/static/wot/common/css/scss/content/links/img/ico-info.png",
		"/static/wot/common/css/scss/content/links/img/vertical-arrow.png",
		"/static/wot/common/img/common/cont-img-mask.png",
		"/static/wot/common/img/classes/class-ace.png",
		"/static/wot/common/img/classes/class-1.png",
		"/static/wot/common/img/classes/class-2.png",
		"/static/wot/common/img/classes/class-3.png"
	],
	u: {
		menu: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAABCAIAAABmEhQDAAAAHklEQVQoU2MAAj4BAR5ePi6eUTSKhgni4eFjYGAAAN9YIhjam+zlAAAAAElFTkSuQmCC",
		icon1:"data:image/png;base64,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",
		icon2:"data:image/png;base64,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",
		nmLogo:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4y92SPWsUYRSFn/POzE4MgkhMKyKICAEjiUksgoWClY0WYifKDlj4VyxsDGvlgmhtLUiIkoSNiLEWCwN+dmvAnZl3jkV2lxArSz3d/eDe53Iu/NOabb8J6cHkfLGZbXUWq1E8c2c7kxpPhF8unfPu0bk4qqWqz+jggAtFL6uor9hhLqjZnkwHq7ip+/WRJlF50tYs0oLwF5vdPwhKKCHDguiEfpUBkKh6aMIT8MutzmJ3TDFGb/duA7L91HBTgAEYQlqHgeOH9PPt/oUCWCpezVTk7z1sFpwG7gMt4C64a7QCdGUTVF9LQ/l6feXiN80Xmw8aJ/cQxm6AIKkAXgAfgWnbZyVNgp8bjdAIqi8HW1MMeSUs2MG+ZfsTeMdwQrBs+AAgPAQ1gl0BnC82njVOboxPkGujVHhglMuORonYywfid8nXe52ltbGNC8X6JaNTQapjrGNjchH7VutYnvhHJJ3Cg8+mdXSCr4/XOlcH+7xf1d984Fx7I/D/6Dd9b6wCx93gcQAAAABJRU5ErkJggg==",
		rat:"data:image/png;base64,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",
		ratMark:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAANCAQAAADLNWwDAAAAV0lEQVQI12NgEGQQZhBhEALSQEqMQQIIgUxxBqmvRyBMKQa5H3cZpIGyDHIMir/fAkkxBgZFa/0/nxgUgQoZVNLsgExloGpkUSS1SCYgmQuxTQwkCncDAH0wFzVj5p2XAAAAAElFTkSuQmCC",
		tiers:"data:image/png;base64,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",
		bad1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAfCAYAAABtYXSPAAAFVklEQVR42q2Xf0idVRjHu/f95dxVBGvNJlM2lI2hbW5sqMo23SDa2JaOtWBDCuZG2QBawZis0WA4pgtMREUQFXWJiASIGgkgEBWRKSD9GYAVEDQE+qtOzweey7nck12vdODLc5/3fL/f87znx/ve94X/aDEbFc61TXSZtFk2X6PnmGUe2OVYeNZ/aw1BXAWxtN+a66A2p7nXrcYnT/vtZVEQIi3MigONtjAH2qd810N9MzcV2DsIFTmCHfbOMxVjeejQWy+dZS0y86xYUSR48fr169MHDhx4czvFoEOPD372JjefHTu1wM5GflFR0fujo6MmNzf3s97e3pJsioGPDj0++OFriwGW7yyRVp8rSOzZs+fVs2fPfj03N2ck/3xoaKgCYllZWRzs3r3bKy4u9goLCz0iebIPHnx06PHBD1/1j9KWyikkTBYjrbKlpeXvwcHBv2SaKeaLvr6+GsjHjh3zgCyBf/ToUW/fvn0ekTzZBw8+OvT44IdvSjFhWkHO7mcaXwqC4PbMzIwB7e3tJhaLfTkwMNCAoLa2NgCHDx8OGxoa/EOHDvlE8mQfPPjo0Ce98MWfcdzTaWfG152/My8vr6ygoGBgcnLSLCwsmJ6eHmbmK7nT1yCfPHkyBMePH4/Onz8fVFVVBUTyZB88+OjQ44Mfvvgzjo7npy9VLOX0FAr56b1798yjR49Md3e32b9/P8V809nZeQ7y6dOnI1BdXZ3T1NQUnjhxIiSSJ/vgwUeHHh/88MWfcVJOVyy9mEArLZOpfXb37l0zPz9vLl++jAnF/NDV1XUBcmNj4w4gy5F79erVqKamJiKSJ/vgwUeHHh/88MWfcXS84N+KCXVjlQs+qqurMxsbG+bx48dmZGTEYPrkyZNzkM+cOZML6uvrd167di2SGBHJk33w4KNDjw9++OKv48ALbTH2h6+b6uXy8vKnJSUl64uLi6ajo8PIHWPwvRhegCjHdCeQvZGQE5IjMYdInuyDBx8denzwwxd/xtHxfLjpBYXaWSzPiZ/Gx8eN7APDesseYGqXHzx48Ho2xcBHhx4f/PDFn3EYz86M+xqIdPr6Ll26ZNbX141sTjMxMcHMLN+5c6cxm2Lgo0OPD3744q/jRDqu+yrQzhLB22EY/jI2NmbkRJiHDx9isNLW1nb71q1b9YgyNXjw0aHHBz988WccW4zWkLZnIj3/lYL2vXv3/lpRUWHkYUYx38rR7bAFZS4EPjr0+OCHL/46TpS6Z9y3tW7ieDzecvHixefDw8OmsrKSdf5NrrccOXLkQ7cgtxB48NGhxwc/fO3m3fztHRcEinxBred5azdv3jT9/f3m/v37Zmpq6k+5/okYvmULcguhHx58dOjxwQ9f9Q8U8c2KoQVacYXgAzF+Lu8ec/DgQXPjxg3D2u/atWtF+tgPzRSwtLT0jEjOdfrhwUeHHh/88FX/IG1ct6CUv4V5gmrBx3I81xKJxB9RFJn8/HyeFYbNeOXKlRUt4A0iOdfphwcfHXp88MNX/f3NC3H/XEeCAkGd4B3Bp3Jkf29tbTWnTp0y8pQ109PTZnZ21jQ3N68RyblOPzz46NDjo36R8yd+i18Iob7uSwVN8oL7ubS01MgpMcQgCAyPd15+RPLUfvjo0KtPmM2XQSwl+kAN8vTF9q6s/XeCVd/3V2Xw1TAMlwU/Esm5Tj88+OhUH1rPrD7o7LeNxkCPY5XeaavgPUUby0AkB/TDg49O9dYP/6yb+9GVELwiKNJYIigmJ5Kn9Secj8JtNfcLEgR26Yhbyl2fbTcr9pzjb3N7Et1j61mf/6k539FuEXGnL8si/gEY8SzOXUsBvQAAAABJRU5ErkJggg==",
		bad2:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAfCAQAAADHaLwEAAAErklEQVQYGQXAD4yWdR0A8M/39zzv8R4cB4fADmUorjRUmULKNDetVMtcTWdYbra0aJZrjmVZrY1yW26LcmuMZCZrJUbaLEfGRjUczjnHTUXaIADjPzAABLw74O55vg4ACIQQAiEAABAAAAAANSohBIAQAIoCKCAUgAKg0qq1QoVQBAgUFC231mpFqwgpAAqARqCgVdQCIVC0CBW3UVCrhAoFCEARWpWCIpyTAgFaVGgVtdBKKYwJoaUAWnQQ+h968VNfBgAApPa6iz//mn5FkToKgoIQKlCbMOvrd96775aVc7inHtr92+a55vlmRf4uNxy+oY+Vc07fuOhzd680RVFLrZDUSAW1Srlk7lUPzjAys7efPxy9ZeCP0rhhPZbM+MuRBTN6+5vLue32zfOOveeCGuOIgiJUMPHy29994MY19B6btePUwoFXdc1wjX4D1rqn++bho7P39f3H3CkPvj64WEcIIShCIoVJY7fdG9PLpaL3s6tvmHq/p/zckJPW+4Ufme/OvgWr9V3veHlEfZepoJKylopQK5OnVtdcMNWgLAe6w/6kccI9jjvrFdN0nPPuRD2TdHVcmD0w+9QZjUaIgkSr67uPLdllu2foG467DHlUOGXEB3q87IsuMTlMfMGQNzy6aOA3eoVQyQJCMe2ji1sLbfItej5w0gW11Dprkta4fpUPQ/chZ7SutH9Av0qtFQWEEPnOG252g9k4oeO0Lnaba4LWMWmm0VR6LPAVmzVb9SlaKYuQWq3TVwzuP7xZWkXbNe6499CrOKG1117TzQ2xzg7HbBydc9wZqQhRpFDQyS89PWuF5/SI6ixG3GyK804aMMsFl5niQirTrbfU97tXLBZohCxIjTRx58aXrDDdd6S+5oQXHbDEJHuEJ822xVsuauV95nrS8diwTZ8WjSxCgPPe/ueRjb5qF+XA818b2+igtThqj997xZD7muVb1f9zla5fj3nZKakIKiFVinPONWeGrt7et92RfX17tu5/ev4yZ1xmkU3escvjtu38wq5/j47O3+m1kcNrm/X2GTMmKRIpNY6W/df3PqH1yUvf2la2/PKlpec7xpzWY6Inxg7um/bmj/81eOWwb7uzro/Y7ZxGKNQgpcZou+sfhwb7H3Nw5vxn7/9VvDpt+IGHX7fQVo84dOTvK0fHf7rsE7P3KFaPj7ytQUoJUNDR41o/KKevznm5JJfnzPc93rPqm9nJZdlZa2nPxp/kUzkvP511Y5Wb9KoVRQGgqFUmu8my2Nb34YTsz0tzTS5+3/Jn01+v2/S3/ExOyQk5eaTssdLdpuvqCAQBQmgVHb2ucYVr7/jG3Gk71L6n62eHll48aI0tFhoe+/MLthmy3UljQoskAFBJtSkmWTD5mYvmzHLYQYvc6r826JrnmBOjJ39ovVNGjUutFJIAhBQqFBMMuqM8rFuEaERoa23ThmaddXb4SCuFRkgIANRaIVWmucRlpusgjOhRS+mE/9tr2HnjQiskEACAUGmFXv1S6Gg0KjQ6RjTOSq1UpAQIABAIiVoqWiEVoVU0WiGMCyQABACAkCqNokiNIgVSoBUILQBQAQAAAAgpERIhkQAAHwPlu9kMCvbXiAAAAABJRU5ErkJggg=="
	}
};

// matches url with profile page and checks if profile has any battles as script is useless without
var tableBattles = filter(d.getElementsByClassName('b-personal-rating_value')[0].innerHTML, 1),
	profileName_class = d.getElementsByClassName('b-profile-name')[0];
if (tableBattles > 0) {
	// getting userinfo
		wg.name = d.getElementsByTagName('h1')[0].innerHTML;
		wg.id = wg.href.match(/\/(\d+)/)[1];

	// style contents
	var style = elem("style", "wotstatscript", "", "text/css"),
		styleText = [
			// global rules
			"h3, h4 {margin: 0 0 15px; text-align: center;}",
			"h5 {margin: 5px 0 8px;}",
			"p {margin: 0;}",
			"table {width: 100%;}",
			// background image fix
			"#js-background-parallax-translate3d-wrapper {z-index: -1;}",
			// page fix page slowdown
			".l-page {background-position: center 0 !important;}",
			// container wrapper
			".l-container-wrapper {background: none;}",
			// content width
			".l-content {margin: 0 22px 25px; width: 955px}",
			// background rules
			".b-background {display: flex; left: -23px; opacity: 0.5; position: absolute; width: 1000px; z-index: -1;}",
			".b-background img {width: 100%;}",
			// profile wrapper rules
			".b-profile-wrpr {margin: 15px 0 0; min-height: 100px;}",
			".b-profile-wrpr td {font-weight: bold; line-height: 133%;}",
			".b-profile-wrpr .t-profile-table a, .b-profile-wrpr #js-profile-clan-table a {background: url("+css.l[1]+") no-repeat 0 2px; color: #CACBCC; padding: 0 0 0 10px;}",
			".b-profile-wrpr .t-profile-table a:hover, .b-profile-wrpr #js-profile-clan-table a:hover {background: url("+css.l[1]+") no-repeat -244px 2px; color: #FFFFFF;}",
			".b-profile-header {position: absolute; right: 0; top: 0;}",
			".b-scriptlink {"+css.input+" border-left: 1px solid #000000; border-right: 1px solid #000000; display: inline-block; text-align: center; padding: 7px 0 6px; width: 199px;}",
			".b-ratingsClip, .b-ratingsXml {display: inline-block;}",
			".b-ratingsButton {"+css.input+" display: block; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; padding: 7px 7px 6px;}",
			".b-ratingsButton:hover {background-color: #282828; cursor: pointer;}",
			".b-profile-error {background: rgba(204,0,0,0.15); border: 1px solid #510000; box-shadow: 0 0 3px #733232; color: #CACBCC; display: none; margin: 0 3px -6px 0; overflow: hidden; padding: 3px; text-align: center; text-overflow: ellipsis; white-space: nowrap; width: 220px;}",
			".b-profile-error:hover {width: auto;}",
			// profile player rules
			".b-profile-name {float: none; margin: 0; max-width: 370px;}",
			".b-profile-name table {font-family: Arial; width: 210px;}",
			".b-profile-name td:first-child {white-space: nowrap;}",
			".b-header-h1__profile {margin: 0; padding: 0 0 6px;}",
			// profile clan rules
			"#js-clan-block-container {left: 385px; position: absolute; top: 25px;}",
			".b-profile-clan {float: none; max-width: 360px; margin: 0;}",
			".b-photo {min-height: 54px;}",
			"a.b-link-clan, .b-link-clan a {display: inline;}",
			".b-statistic {margin: 0 0 3px;}",
			"#js-clan-block-container table {font-family: Arial; width: 360px;}",
			"#js-clan-block-container td:first-child {white-space: nowrap;}",
			// profile menu rules
			// sidebar rules
			".l-sidebar {margin: 0; position: absolute; right: 0; top: 25px; width: auto;}",
			".b-context-menu {background: url("+css.u.menu+") repeat-y; border-right: 1px solid black; margin: 0; width: 200px;}",
			".b-context-menu_wrapper {padding: 10px 0 5px;}",
			".b-context-menu-list {line-height: 16px;}",
			".b-context-menu-list li {padding: 4px 3px 4px 12px;}",
			// sidebar messages wrapper rules
			".l-side-msg {position: absolute; right: -227px; text-align: center; top: 0px; width: 205px;}",
			".b-sidebar-widget__comparison {background-color: #000000; border: 1px solid #000000; margin: 0; position: absolute; left: 223px; top: -26px; width: 203px;}",
			".b-sidebar-widget {margin: 0;}",
			".b-sidebar-widget_inner {padding: 10px}",
			".b-sidebar-widget_inner__comparison {display: table; margin: 5px auto; padding: 0;}",
			".b-sidebar-widget_title {margin: 0 0 5px; text-align: center;}",
			".b-sidebar-widget_text {margin: 0 0 5px;}",
			".b-box-shadow.js-recruitstation-recommended-widget {margin: 0; width: 242px;}",
			// userblock wrapper rules
			".b-user-block {"+css.box+" margin: 0;}",
			".b-head-block {background: url("+css.l[3]+") no-repeat 50% 100%; padding: 5px 0;}",
			".b-user-block_info {height: 110px; padding: 3px 25px;}",
			".b-personal-link {background-position: 0 12px; clear: left; padding: 10px 0 0 50px;}",
			".b-personal-link_txt {width: 360px;}",
			".b-personal-data {min-height: 180px; padding: 0 20px 15px;}",
			".t-personal-data_ico {padding: 82px 5px 0;}",
			".t-personal-data_ico__hitrate {background: url("+css.u.icon1+") no-repeat 50% 50px;}",
			".t-personal-data_ico__tier {background: url("+css.u.icon2+") no-repeat 50% 50px;}",
			".t-personal-data_value {font-size: 28px; line-height: 100%;}",
			".t-personal-data_value.t-personal-data_value__pr {font-size: 36px;}",
			".b-personal-rating {padding: 20px 50px 15px;}",
			".b-personal-rating_param {display: inline-table; margin: 0 auto !important; text-align: center; width: 25% !important;}",
			".b-personal-rating_value {display: table; margin: 0 auto;}",
			".b-personal-rating-param__tier .b-personal-rating_value {background: url("+css.u.icon2+") no-repeat -2px 13px;}",
			".b-speedometer-body {padding: 20px 50px;}",
			".b-speedometer {width: 33.3333%}",
			// ratings wrapper rules
			".t-ratings-info {margin: 0 auto 15px; table-layout: fixed; text-align: center; width: 70%;}",
			".t-ratings-info th {font-size: 13px; font-weight: bold; line-height: 133%;}",
			".t-ratings-info td {font-family: 'WarHeliosCondCBold','Arial Narrow',arial,sans-serif; font-size: 36px; line-height: 133%}",
			".t-ratings-info .rating-url_nm {background-image: url("+css.u.nmLogo+"); background-position: left center; background-repeat: no-repeat; padding: 0 0 0 20px;}",
			".ratings-table {background: url("+css.l[3]+") no-repeat 50% 0; padding: 20px 25px 10px;}",
			".t-table-ratings {width: 100%;}",
			".t-table-ratings td {line-height: 130%; padding: 9px 12px 2px 0; vertical-align: bottom;}",
			".t-table-ratings .td-value {padding-right: 0; text-align: right; white-space: nowrap;}",
			".t-table-ratings .td-number {color: #BABCBF; font-weight: bold; padding-right: 0; text-align: right; width: 70px;}",
			".t-table-ratings .td-center {line-height: 16px; padding: 9px 0 2px; text-align: center;}",
			".t-table-ratings .td-rating-meter {background: url("+css.l[3]+") no-repeat 50% 100%;}",
			".t-table-ratings .td-rating-meter td {padding: 0;}",
			".t-table-ratings .rating-meter {background: url("+css.u.rat+") no-repeat; border: 1px solid #252527; border-radius: 3px; height: 3px; margin: 0 7px;}",
			".t-table-ratings .rating-meter-dail_line {background: url("+css.u.rat+") no-repeat; box-shadow: 0 0 10px 1px rgba(221, 84, 12, 0.15), 0 0 3px 1px rgba(133, 18, 11, 0.25); height: 3px; width: 0;}",
			".t-table-ratings .rating-meter-marker {background: url("+css.u.ratMark+") no-repeat; float: right; height: 13px; margin: -5px -2px 0 0; width: 5px;}",
			".t-table-ratings .rating-meter_wn8 {background-position: 0 0;}",
			".t-table-ratings .rating-meter_wn8 .rating-meter-dail_line {background-position: 0 -3px;}",
			".t-table-ratings .rating-meter_wn7 {background-position: 0 -6px;}",
			".t-table-ratings .rating-meter_wn7 .rating-meter-dail_line {background-position: 0 -9px;}",
			".t-table-ratings .rating-meter_eff {background-position: 0 -12px;}",
			".t-table-ratings .rating-meter_eff .rating-meter-dail_line {background-position: 0 -15px;}",
			".wnelink {padding: 5px 25px 5px 0; text-align: right;}",
			".wnelink_info {background-image: url("+css.l[4]+"), url("+css.l[2]+"); background-position: 4px 0px, right 0; padding: 0 9px 0 20px;}",
			".wnelink_info:hover {background-position: 4px -17px, right -22px;}",
			// statistics wrapper rules
			".b-statistics-wrpr {margin: 0 0 30px; overflow: auto;}",
			".b-statistics-wrpr .t-dotted td {line-height: 23px; padding: 0;}",
			".b-statistics-wrpr .t-dotted tr:hover td {color: #79797A;}",
			".b-statistics-wrpr .t-dotted td.t-dotted_class-ico {line-height: 13px;}",
			".b-statistics-wrpr .t-dotted td.t-dotted_class-ico img {margin: 2px 0 -1px;}",
			".b-result {margin: 0 10px; width: 315px;}",
			".b-result .t-dotted__fixed {table-layout: auto;}",
			".b-result-classes {margin: 0 10px; width: 265px;}",
			".b-result-classes span {color: #606061; display: inline-block; width: 48px;}",
			".t-dotted td {background: url("+css.l[3]+") no-repeat 50% 100%;}",
			// cake diagram rules
			".b-diagrams-sector {margin: 0 0 25px;}",
			".b-diagrams-sector h3 {text-align: center;}",
			".b-diagram-block {float: left; margin: 0 9px; width: 300px;}",
			".b-diagram-wrpr {float: none; margin: 0 auto;}",
			".t-dotted.t-dotted__diagram {margin-top: 0px; width: 100%;}",
			".t-dotted_diagram-percent {display: inline-block; width: 40px;}",
			".b-diagram-total {margin: 25px 0 0;}",
			".b-diagram-tiers .js-results {display: inline-block; margin: 0 0 0 30px; text-align: right; width: 14px;}",
			".b-diagram-tiers .t-dotted_diagram-percent {margin: 0 0 0 3px; width: 52px;}",
			".b-diagram-ico_tier {background: url("+css.u.tiers+") no-repeat; padding-left: 30px;}",
			".b-diagram-ico_tier-1 {background-position: 4px 1px;}",
			".b-diagram-ico_tier-2 {background-position: 4px -14px;}",
			".b-diagram-ico_tier-3 {background-position: 4px -29px;}",
			".b-diagram-ico_tier-4 {background-position: 4px -45px;}",
			".b-diagram-ico_tier-5 {background-position: 4px -59px;}",
			".b-diagram-ico_tier-6 {background-position: 4px -74px;}",
			".b-diagram-ico_tier-7 {background-position: 4px -89px;}",
			".b-diagram-ico_tier-8 {background-position: 4px -104px;}",
			".b-diagram-ico_tier-9 {background-position: 4px -120px;}",
			".b-diagram-ico_tier-10 {background-position: 4px -134px;}",
			".t-dotted__diagram tr td.t-dotted_diagram-last {width: 0;}",
			// achievement wrapper rules
			".b-achievements-wrpr {margin: 16px 0 0;}",
			".b-vertical-arrow {display: table; margin: 8px auto 0; padding: 2px 10px 0;}",
			".js-short-achievements {margin: 15px 0 50px;}",
			".js-full-achievements {margin: 0 37px 50px;}",
			".b-achivements {display: table; margin: 0 auto; padding: 0 0 20px;}",
			".b-achivements-head {margin-top: 15px;}",
			".b-achivements_item {display: inline-table; float: inherit; margin: 5px 5px 0;}",
			".js-full-achievements #js-achivement-medalBurda {margin-left: 125px;}",
			".js-full-achievements #js-achivement-tankExpert1 {margin-left: 325px;}",
			// global rating rules
			".b-composite-heading {margin: 21px 0 15px 400px; width: 553px;}",
			".b-profile-ratings-date {margin-top: 1px}",
			".b-leadership-info {display: table; margin: 0 auto;}",
			".b-profile-link {display: table; margin: 14px auto 0}",
			".b-msg-important__rating {display: table; margin: 5px auto 0;}",
			".b-rating-dial__user {display: table; margin: 30px auto 22px;}",
			".b-orange-arrow__leadership {display: table; margin: 0 auto;}",
			".b-leadership-rating-text {text-align: center;}",
			".l-leadership-info-alignment {text-align: center;}",
			// vehicle table rules
			".b-vehicles-wrpr {margin: 20px 0;}",
			".b-vehicles-header {display: table; margin: 0 auto 15px}",
			".b-profile-vehicles-tankstat {margin: 0; position: absolute; right: 15px;}",
			".b-profile-vehicles-tankstat_link {background-image: url("+css.u.nmLogo+"), url("+css.l[2]+"); background-position: left center, right 0px; padding: 0 9px 0 20px;}",
			".b-profile-vehicles-tankstat_link:hover {background-position: left center, right -22px;}",
			".t-profile__vehicle .t-profile_right {text-align: center;}",
			".t-profile_dropdown-ico .tablesorter-header-inner {display: inherit;}",
			".t-profile_tankstype-prem td {border-top: 2px dashed #212123;}",
			".t-profile_tankstype-prem .b-tankstype-text {color: #FFC363;}",
			".t-profile_tankstype-prem.t-profile_tankstype__empty .b-tankstype-text {color: rgba(255, 195, 99, 0.3);}",
			".t-profile .t-profile_tankstype td {height: 50px; padding: 0; vertical-align: middle;}",
			".b-tankstype-ico {display: table-cell;}",
			".b-tankstype-ico__lighttank {background-position: 0 -114px;}",
			".b-tankstype-ico__mediumtank {background-position: 0 -173px;}",
			".b-tankstype-ico__heavytank {background-position: 0 5px;}",
			".b-tankstype-ico__at-spg {background-position: 0 -232px;}",
			".b-tankstype-ico__spg {background-position: 0 -54px;}",
			".b-tankstype-ico__prem {background-position: 0 -291px;}",
			".b-tankstype-ico__ten {background: none; color: #BBB7AC; font-size: 17px; font-weight: 100; padding: 0 0 3px; text-align: center;}",
			".b-tankstype-text {display: table-cell; height: inherit; vertical-align: middle;}",
			".t-profile .t-profile_tankstype__item td {height: 40px; padding: 0; vertical-align: middle;}",
			".t-profile .t-profile_tankstype__item:hover td {background: rgba(0, 0, 0, 0.04); border-bottom: 1px solid rgba(255, 255, 255, 0); color: #BABCBF;}",
			".t-profile .t-profile_tankstype td.t-profile_center div.hidden {display: none;}",
			".t-profile .t-profile_tankstype td.t-profile_center span {display: inline-block; margin-left: 10px; text-align: left; width: 40px;}",
			".b-armory-wrapper {height: inherit; margin: 0; padding: 0; width: 160px;}",
			".b-armory-wrapper .b-armory-level {display: table-cell; font-size: inherit; height: inherit; position: inherit; vertical-align: middle; left: 0; top: 0;}",
			".b-armory-wrapper img.png {height: 64px; margin: -50px 0 0 24px;}",
			".b-name-vehicle {color: #BBB7AC; display: table-cell; height: inherit; vertical-align: middle;}",
			".b-name-vehicle.b-gold-name {color: #FFC363;}",
			".b-name-vehicle.b-red-name {color: #D00900;}",
			".t-profile_dropdown-link {display: inherit;}",
			".js-error-data {text-align: center;}",
			".b-msg-error {display: table; margin: 0 auto;}",
			".b-vehicle-detail_txt {margin: 0 auto 4px; text-align: center; width: 768px;}",
			".b-vehicle-detail_link {display: table; margin: 0 auto;}",
			".b-vehicle-slider {margin: 23px 64px 17px}",
			".b-vehicle-slider_inner {width: 741px;}",
			".b-vehicle-slider_prev {left: -12px;}",
			".b-vehicle-slider_next {right: -12px;}",
			".b-vehicle-minitable {margin: 0 43px; width: 350px;}",
			".b-vehicle-minitable__right {float: left;}",
			// profile navigator
			".b-profile-nav {text-align: center;}",
			".wrapper-dropdown .b-profile-nav {padding: 7px 0 0; position: absolute; right: 50%;}",
			".b-profile-nav a {background: url("+css.l[5]+") no-repeat; cursor:pointer; padding: 0 10px;}",
			".b-profile-nav a.top {background-position: 100% 0px;}",
			".b-profile-nav a.top:hover {background-position: 100% -36px;}",
			".b-profile-nav a.bot {background-position: 100% -18px;}",
			".b-profile-nav a.bot:hover {background-position: 100% -54px;}",
			".b-profile-nav span {border-bottom: 1px dashed;}",
			// multiple usage rules
			".b-orange-arrow__heading, .b-profile-ratings_link {margin: 4px 0 0;}"
		];
		style.textContent = styleText.toString().replace(/}(,)/g,"}\n");
		d.head.appendChild(style);
	// applies relevant style for own profile - login name delayed by Wargaming
	var userCheckSeq = 0,
		userChecker = setInterval(function() {
		var loginUser = d.getElementsByClassName('js-my_profile_nickname')[0].innerHTML.replace(/\s+/g, '');
			userCheckSeq ++;
			if (loginUser == wg.name) {
				profile_div.style.minHeight = "130px";
				clearInterval(userChecker);
			}
			else if (userCheckSeq == 5) {
				clearInterval(userChecker);
			}
		}, 1000);
	// end style

	// formula calculations and variables
	// premium tanks up to 0.9.6
	var premArr = [
		// russian
		"tetrarch_ll", "bt-sv", "ltp", "m3_stuart_ll", "t-127", "valentine_ll",
		"a-32", "matilda_ii_ll", "r108_t34_85m", "t44_85", "t44_122", "r112_t54_45", "object_907",
		"churchill_ll", "kv-220_action", "kv-220", "object252", "r113_object_730", "kv-5", "r110_object_260",
		"su76i", "su_85i", "su100y", "su122_44", "r111_isu130",
		// german
		"h39_captured", "g108_pzkpfwii_ausfd", "pzii_j", "t-15",
		"g100_gtraktor_krupp", "s35_captured", "g107_pzkpfwIII_ausfk", "pziv_hydro", "t-25", "pziv_schmalturm", "pzv_pziv", "pzv_pziv_ausf_alfa", "panther_m10", "g106_pzkpfwpanther_ausff", "g105_t-55_nva_ddr",
		"b-1bis_captured", "lowe", "vk7201",
		"g104_stug_iv", "dickermax", "e-25", "jagdtiger_sdkfz_185",
		// american
		"t1_e6", "t2_lt", "t7_combat_car", "m22_locust", "mtls_1g14",
		"a78_m4_improved", "m4a2e4", "ram-ii", "a104_m4a3e8a", "t23e3", "t26_e4_superpershing", "t95_e2", "m60", "t95_e6",
		"t14", "m6a2e1", "t34_hvy",
		"a102_t28_concept",
		// british
		"gb76_mk_vic",
		"gb68_matilda_black_prince", "gb70_n_fv4202_105",
		"gb51_excelsior", "gb63_tog_ii",
		"gb71_at_15a", "gb78_sexton_i",
		// french
		"f69_amx13_57_100",
		"f68_amx_chasseur_de_char_46", "fcm_50t",
		"fcm_36pak40",
		"_105_lefh18b2",
		// chinese
		"ch02_type62", "ch24_type64",
		"ch14_t34_3", "ch01_type59", "ch01_type59_gold",
		"ch23_112", "ch03_wz-111",
		// japanese
		"te_ke", "ke_ni_b",
		"chi_nu_kai", "j18_sta_2_3",
		// xbox360
		"t-34-88",
		"m4a2e4_ripper", "m4a3e8_sherman_fury", "t23", "t26_e4_superpershing_4july", "sexton_i"
	];

	// variable for statistics
	var s = {
			b:{0:{c:0,p:0},1:{c:0,p:0},2:{c:0,p:0},3:{c:0,p:0},4:{c:0,p:0},5:{c:0,p:0}}, // badges
			s:{p:{r:[],b:0,w:0,bg:0},t:{r:[],b:0,w:0,bg:0}}, // custom tank tables
			t:{1:{b:0,c:0},2:{b:0,c:0},3:{b:0,c:0},4:{b:0,c:0},5:{b:0,c:0},6:{b:0,c:0},7:{b:0,c:0},8:{b:0,c:0},9:{b:0,c:0},10:{b:0,c:0}},  // tiers
			v:{a:0,bats:0,tier:0}, // vehicles
			h:{}, // hex colours
			w:{e:{frag:0,dmg:0,spot:0,def:0,win:0},r:{},w:{},n:{}}, // wn8 expected values
			f:{wn8:{},wn7:{},eff:{}} // formulas
		},
		vehList = {};

	// total mastery badge and colouring tank table category rows
	var typeRow_class = d.getElementsByClassName('t-profile_tankstype js-table-dropdown-link');
		for (var _tr=0; _tr<typeRow_class.length; _tr++) {
		var typeBats = filter(typeRow_class[_tr].cells[1].innerHTML,1),
			typeWinrate = filter(typeRow_class[_tr].cells[2].innerHTML,1),
			typeWins = parseFloat((typeBats*(typeWinrate/100)).toFixed(0));

			// modify table
			typeRow_class[_tr].cells[2].innerHTML = colStat(typeWinrate, "wrv", 0, "%")+"<span>"+filter(typeWins,2)+"</span>";
		}

	// average tier, colouring premium tanks and winrates in vehicle tables
	var vehRow_class = d.getElementsByClassName('t-profile_tankstype t-profile_tankstype__item'),
		vehRowStats_class = d.getElementsByClassName('t-profile_slidedown tablesorter-childRow');
		for (var _vr=0; _vr<vehRow_class.length; _vr++) {
		var vehImg = vehRow_class[_vr].cells[0].getElementsByTagName('img')[0],
			vehImgBdg = vehRow_class[_vr].cells[3].getElementsByTagName('img')[0],
			vehSpan = vehRow_class[_vr].cells[0].getElementsByTagName('span'),
			vehImgName = vehImg.src.match(/\w+\-([\w\-]+).png/),
			vehFullName = vehSpan[1].innerHTML,
			vehId = vehRowStats_class[_vr].getAttribute('data-vehicle-cd'),
			vehTier = vehSpan[0].getAttribute('data-veh_level'),
			vehBats = filter(vehRow_class[_vr].cells[1].innerHTML,1),
			vehWinrate = filter(vehRow_class[_vr].cells[2].innerHTML,1),
			vehWins = parseFloat((vehBats*(vehWinrate/100)).toFixed(0)),
			vehBadge = (vehImgBdg) ? vehImgBdg.getAttribute('data-badge_code') : 0,
			vehNation = vehRow_class[_vr].cells[0].firstElementChild.className.match(/\_\_(\w+)/)[1];

			// modify table
			vehImg.src = "http://"+wg.host+"/static/wot/encyclopedia/tankopedia/vehicle/"+vehImgName[0];
			vehRow_class[_vr].cells[2].innerHTML = colStat(vehWinrate, "wrv", 0, "%")+"<span>"+filter(vehWins,2)+"</span>";

			// vehicle badges
			s.b[vehBadge].c ++;

			// vehicle battles per tier and amount
			s.t[vehTier].b += vehBats;
			s.t[vehTier].c ++;
			s.v.tier += vehTier*vehBats;
			s.v.bats += vehBats;
			s.v.a ++;

			// check if vehicle exists in wnefficiency value array - report if not and exclude from wn8
			var vehStat;
			for (var _so=0; _so<statObj.length; _so++) {
				if (statObj[_so].IDNum == vehId) {
					vehStat = statObj[_so];
					// summarize expected stat from every vehicle for WN8
					s.w.e.frag += vehStat.expFrag    *vehBats;
					s.w.e.dmg  += vehStat.expDamage  *vehBats;
					s.w.e.spot += vehStat.expSpot    *vehBats;
					s.w.e.def  += vehStat.expDef     *vehBats;
					s.w.e.win  += vehStat.expWinRate *vehBats;
					break;
				}
				else if (_so==statObj.length-1 && statObj[_so].IDNum !== vehId) {
					vehSpan[1].className += " b-red-name";
					vehSpan[1].innerHTML += " - "+loc.p77+"!";
					console.error("Vehicle named "+vehImgName[1]+" doesn't exist in statObj, please report!");
				}
			}

			// get info for premium table
			if (premArr.indexOf(vehImgName[1]) > -1) {
				s.s.p.b += vehBats;
				s.s.p.w += vehWins;
				vehSpan[1].className += " b-gold-name";
				s.s.p.r.push([vehRow_class[_vr].cloneNode(true), vehRowStats_class[_vr].cloneNode(true)]);
				if (vehRow_class[_vr].cells[3].innerHTML.length > 2) { s.s.p.bg ++; }
			}

			// get info for tier 10 table
			if (vehTier == 10) {
				s.s.t.b += vehBats;
				s.s.t.w += vehWins;
				s.s.t.r.push([vehRow_class[_vr].cloneNode(true), vehRowStats_class[_vr].cloneNode(true)]);
				if (vehRow_class[_vr].cells[3].innerHTML.length > 2) { s.s.t.bg ++; }
			}

			// summarize player vehicles into dedicated array for console
			if (vehStat) {
				vehList[vehImgName[1]] = {
					"infoNameFull": vehFullName,
					"infoName": vehImgName[1],
					"infoId": vehId,
					"vehNation": vehNation,
					"vehTier": vehTier,
					"vehType": "temp", /* vehStat.type, */
					"vehBadge": vehBadge,
					"vehPrem": (premArr.indexOf(vehImgName[1]) > -1) ? 1 : 0,
					"vehStat": {battles: vehBats, battlesWins: parseFloat(vehWins)},
					"vehStatExpected": {frag: vehStat.expFrag, dmg: vehStat.expDamage, spot: vehStat.expSpot, def: vehStat.expDef, win: vehStat.expWinRate}
				};
			}
		}

	// finding statistic tables
	var mb_table = d.getElementsByClassName('b-result-classes')[0].getElementsByClassName('t-dotted')[0],
		or_table = d.getElementsByClassName('b-result')[0].getElementsByClassName('t-dotted')[0],
		bp_table = d.getElementsByClassName('b-result')[1].getElementsByClassName('t-dotted')[0],
		sm_ratio = d.getElementsByClassName('b-speedometer-ratio');

	// fetching info, calculate averages, colourize and store into var s
	// r = raw stats
	s.r = {
		"days": (new Date() - new Date(d.getElementsByClassName('js-date-format')[0].getAttribute('data-timestamp')*1000))/1000/60/60/24,
		"bats": filter(or_table.rows[0].cells[1].innerHTML,1),
		"wins": filter(or_table.rows[1].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
		"loss": filter(or_table.rows[2].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
		"surv": filter(or_table.rows[3].cells[1].innerHTML.match(/([\d.,\s|&nbsp;]+\d+)\s/)[1],1),
		"exp": filter(or_table.rows[4].cells[1].innerHTML,1),
		"expA": filter(or_table.rows[5].cells[1].innerHTML,1),
		"expM": filter(or_table.rows[6].cells[1].innerHTML,1),
		"frag": filter(bp_table.rows[0].cells[1].innerHTML,1),
		"spot": filter(bp_table.rows[1].cells[1].innerHTML,1),
		"hits": parseFloat(bp_table.rows[2].cells[1].innerHTML.replace(/[,]/g,".")),
		"dmgD": filter(bp_table.rows[3].cells[1].innerHTML,1),
		"caps": filter(bp_table.rows[5].cells[1].innerHTML,1),
		"defs": filter(bp_table.rows[6].cells[1].innerHTML,1),
		"dths": filter(sm_ratio[0].innerHTML.match(/\/(.+)$/)[1],1),
		"dmgR": filter(sm_ratio[1].innerHTML.match(/\/(.+)$/)[1],1)
	};
	s.r.draw = s.r.bats-(s.r.wins+s.r.loss);
	s.r.winLR = s.r.wins/s.r.loss;
	// a = average stats
	s.a = {
		"bats": s.r.bats/s.r.days,
		"wins": (s.r.wins/s.r.bats)*100,
		"loss": (s.r.loss/s.r.bats)*100,
		"draw": (s.r.draw/s.r.bats)*100,
		"surv": (s.r.surv/s.r.bats)*100,
		"frag": s.r.frag/s.r.bats,
		"dths": s.r.dths/s.r.bats,
		"spot": s.r.spot/s.r.bats,
		"dmgD": s.r.dmgD/s.r.bats,
		"dmgR": s.r.dmgR/s.r.bats,
		"caps": s.r.caps/s.r.bats,
		"defs": s.r.defs/s.r.bats,
		"tier": s.v.tier/s.v.bats
	};
	// c = coloured stats
	s.c = {
		"winsR": colStat(s.a.wins, "wr", 2, "%"),
		"lossR": colStat(s.a.loss, "wr", 2, "%"),
		"survR": colStat(s.a.surv, "sr", 2, "%"),
		"hitsR": colStat(s.r.hits, "hr", 2, "%"),
		"drawR": colStat(s.a.draw, "",   2, "%"),
		"batsC": colStat(s.r.bats, "bat", 0),
		"dmgTier": colStat(s.a.dmgD/s.a.tier, "dmg", 0, "", s.a.dmgD),
		"api": "<span class='t-dotted_minor'>API:</span> <font color='CD3333'>"+filter(s.v.bats,2)+"</font>"
	};
	// calculate badge percent
	s.b[5].c = s.v.a;
	s.b[5].p = parseFloat((s.v.a/s.v.a*100).toFixed(0));
	for (var _b in s.b) {
		if (s.b.hasOwnProperty(_b)) {
			s.b[_b].p = parseFloat((s.b[_b].c/s.b[5].c*100).toFixed(0));
		}
	}
	// prepare numbers for WN8 formula
	// r = ratios
	s.w.r = {
		"frag": s.w.e.frag/s.v.bats,
		"dmg": s.w.e.dmg/s.v.bats,
		"spot": s.w.e.spot/s.v.bats,
		"def": s.w.e.def/s.v.bats,
		"win": s.w.e.win/s.v.bats
	};
	// w = weighted
	s.w.w = {
		"frag": s.a.frag/s.w.r.frag,
		"dmg": s.a.dmgD/s.w.r.dmg,
		"spot": s.a.spot/s.w.r.spot,
		"def": s.a.defs/s.w.r.def,
		"win": s.a.wins/s.w.r.win
	};
	// n = normalized
	s.w.n.win = Math.max((s.w.w.win-0.71)/(1-0.71),0);
	s.w.n.dmg = Math.max((s.w.w.dmg-0.22)/(1-0.22),0);
	s.w.n.frag = Math.max(Math.min(s.w.n.dmg+0.2,(s.w.w.frag-0.12)/(1-0.12)),0);
	s.w.n.spot = Math.max(Math.min(s.w.n.dmg+0.1,(s.w.w.spot-0.38)/(1-0.38)),0);
	s.w.n.def = Math.max(Math.min(s.w.n.dmg+0.1,(s.w.w.def-0.10)/(1-0.10)),0);

	// calculate ratings
	// WN8
	s.f.wn8 = (function() {
		var frag = 210*s.w.n.dmg*s.w.n.frag,
			dmg  = 980*s.w.n.dmg,
			spot = 155*s.w.n.frag*s.w.n.spot,
			def  = 75*s.w.n.def*s.w.n.frag,
			win  = 145*Math.min(1.8,s.w.n.win),
			rating = frag+dmg+spot+def+win,
			pct = (rating<=colArr.sUni[6]) ? (rating/colArr.sUni[6])*100 : 100,
			scale = (rating<=colArr.sUni[6]) ? Math.max(0, Math.min(100,rating*(rating*(rating*(rating*(rating*(rating*0.00000000000000000009553-0.0000000000000001644)-0.00000000000426)+0.0000000197)-0.00003192)+0.056265)-0.157)) : 100;
		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, rating: rating, pct: pct, scale: scale, ratCol: (isFinite(rating)) ? colStat(rating,"wn8",2) : loc.p18, scaleCol: colStat(scale,"wn8",2) };
	})();
	// WN7 - legacy support
	s.f.wn7 = (function() {
		var frag = s.a.frag*(1240-1040/(Math.pow(Math.min(s.a.tier,6),0.164))),
			dmg  = s.a.dmgD*530/(184*Math.exp(0.24*s.a.tier)+130),
			spot = s.a.spot*125*Math.min(s.a.tier,3)/3,
			def  = Math.min(2.2,s.a.defs)*100,
			win  = (((185/(0.17+Math.exp((s.a.wins-35)*-0.134)))-500)*0.45),
			norm = -Math.abs((((5-Math.min(s.a.tier,5))*125)/(1+Math.exp(s.a.tier-Math.pow(s.r.bats/220,3/s.a.tier))*1.5))),
			rating = frag+dmg+spot+def+win+norm,
			pct = (rating<=colArr.sUni[7]) ? (rating/colArr.sUni[7])*100 : 100,
			scale = (rating<=colArr.sUni[7]) ? Math.max(0, Math.min(100,rating*(rating*(rating*(rating*(rating*(rating*0.00000000000000000466-0.000000000000032413)+0.00000000007524)-0.00000006516)+0.00001307)+0.05153)-3.9)) : 100;
		return { frag: frag, dmg: dmg, spot: spot, def: def, win: win, norm: norm, rating: rating, pct: pct, scale: scale, ratCol: colStat(rating,"wn7",2), scaleCol: colStat(scale,"wn7",2) };
	})();
	// efficiency - improved
	s.f.eff = (function() {
		var frag = s.a.frag*250,
			dmg  = s.a.dmgD*(10/(s.a.tier+2))*(0.23+2*s.a.tier/100),
			spot = s.a.spot*150,
			cap  = (Math.log(s.a.caps+1)/Math.log(1.732))*150,
			def  = s.a.defs*150,
			rating = frag+dmg+spot+cap+def,
			pct = (rating<=colArr.sUni[8]) ? (rating/colArr.sUni[8])*100 : 100,
			scale = (rating<=colArr.sUni[8]) ? Math.max(0, Math.min(100,rating*(rating*(rating*(rating*(rating*(rating*0.00000000000000003388-0.0000000000002469)+0.00000000069335)-0.00000095342)+0.0006656)-0.1485)-0.85)) : 100;
		return { frag: frag, dmg: dmg, spot: spot, cap: cap, def: def, rating: rating, pct: pct, scale: scale, ratCol: colStat(rating,"eff",2), scaleCol: colStat(scale,"eff",2) };
	})();
	// end formula calculations and variables

	// start modifying and enhancing the rest of the page
	// removing elements
	var layoutfix_class = d.getElementsByClassName('b-hr-layoutfix');
		layoutfix_class[0].parentNode.removeChild(layoutfix_class[0]);

	// profile wrapper
	var profile_div = elem("div", "b-profile-wrpr", ""),
		profileHead_div = elem("div", "b-profile-header", sc.link);
		profileName_class.lastElementChild.innerHTML += " - "+s.r.days.toFixed(0)+" "+loc.p03;
		profileName_class.parentNode.insertBefore(profile_div, profileName_class.nextSibling);
		profile_div.appendChild(profileHead_div);
		profile_div.appendChild(profileName_class);

	// profile header - check for missing battles and notify
	var profileError_div = elem("div", "b-profile-error", loc.p69);
		if (s.v.bats != s.r.bats) {
			profileError_div.style.display="inline-block";
		}
		else {
			s.c.api = " ";
		}
		profileHead_div.insertBefore(profileError_div, profileHead_div.firstElementChild);

	// button for saving stats to clipboard
	var ratingsClipboard = loc.p72+" "+wg.name+": \n"+loc.p73+" "+s.r.bats+" \nWR: "+s.a.wins.toFixed(2)+" \nWN8: "+s.f.wn8.rating.toFixed(2)+" \nWN7: "+s.f.wn7.rating.toFixed(2)+" \nEff: "+s.f.eff.rating.toFixed(2),
		ratingsClipboard_div = elem("div", "b-ratingsClip", "<div class='ratingsClip-holder js-noobmeter' style='display:none;'>"+ratingsClipboard+"</div><div class='ratingsClip-holder' style='display:none;'>"+loc.p64+"</div><a class='b-ratingsButton' onclick='copyClipboard()'>"+loc.p63+"</a>");
		profileHead_div.insertBefore(ratingsClipboard_div, profileHead_div.firstElementChild.nextSibling);

	// button for exporting stats
	var saveStat_div = elem("div", "b-ratingsXml js-xml", "<div class='ratingsXml-holder' style='display:none;'>"+loc.p18+"</div><a class='b-ratingsButton js-linkXml' onclick='compileStats()'>Compile Stats for XML</a>");
		profileHead_div.insertBefore(saveStat_div, profileHead_div.firstElementChild.nextSibling);

	// background behind profile wrapper
	var background_div = elem("div", "b-background", "<img src='"+css.l[6]+"'>");
		background_div.style.background = s.h.wn8;
		profile_div.parentNode.insertBefore(background_div, profile_div);

	// page navigation
	var dropdown_class = d.getElementsByClassName('wrapper-dropdown')[0];
		content_class.appendChild(elem("div", "b-profile-nav", "<a class='bot' onclick='window.scrollTo(0, 0)'><span>"+loc.p02+"</span></a>"));
		dropdown_class.appendChild(elem("div", "b-profile-nav", "<a class='top' onclick='window.scrollTo(0, 9999)'><span>"+loc.p01+"</span></a>"));

	// player statistic links
		var profileStat_table = elem("table", "t-profile-table", "<tr><td class='statname'>"+loc.p04+"</td><td><a target='_blank' href='http://wotxbox.ru/?id="+wg.id+"'>WoTXBox</a></td><td><a target='_blank' href='http://wotinfo.net/en/efficiency?playerid="+wg.id+"&playername=&server=xbox'>WoTInfo</a></td></tr><tr><td class='statname'>"+loc.p05+"</td><td><a target='_blank' href='http://wotxbox.ru/sigs/"+wg.id+"_en.png'>WoTXBox</a></td></tr>");
		profileName_class.appendChild(profileStat_table);

	// move sidebar
		profile_div.appendChild(sidebar_class);
	// end profile wrapper

	// modifying personal-rating name and value
	var sm_name_class = d.getElementsByClassName('b-personal-rating_name'),
		sm_value_class = d.getElementsByClassName('b-personal-rating_value');
		sm_name_class[0].innerHTML = loc.p10;
		sm_name_class[1].innerHTML = loc.p09;
		sm_name_class[2].innerHTML = loc.p11;
		sm_value_class[0].innerHTML = s.c.batsC;
		sm_value_class[1].innerHTML = s.c.winsR;

	// personal-rating - avg tier
	var sm_header_exp_class = d.getElementsByClassName('b-personal-rating_param__exp'),
		sm_avgtier_name = elem("li", "b-personal-rating_param b-personal-rating-param__tier", "<p class='b-personal-rating_name'>"+loc.p12+"</p>"),
		sm_avgtier_value = elem("li", "b-personal-rating_param b-personal-rating-param__tier", "<p class='b-personal-rating_value'>"+s.a.tier.toFixed(2)+"</p>");
		sm_header_exp_class[0].parentNode.insertBefore(sm_avgtier_name, sm_header_exp_class[0].nextSibling);
		sm_header_exp_class[1].parentNode.insertBefore(sm_avgtier_value, sm_header_exp_class[1].nextSibling);

	// performance ratings
	var userBlock_wrpr = d.getElementsByClassName('b-userblock-wrpr')[0],
		userBlock = d.getElementsByClassName('b-personal-rating')[0].parentNode,
		persRat = d.getElementsByClassName('b-personal-rating')[0],
		ratingsInfo = elem("table", "t-ratings-info", "<thead><tr><th><a href='http://www.wnefficiency.net/wnexpected/' target='_blank'>"+loc.p15+" v"+wnExpVers[1]+"</a></th><th>"+loc.p30+"</th><th>"+loc.p16+"</th></tr></thead><tbody><tr><td>"+s.f.wn8.ratCol+"</td><td>"+s.f.wn7.ratCol+"</td><td>"+s.f.eff.ratCol+"</td></tr></tbody>");
		persRat.parentNode.insertBefore(ratingsInfo, persRat.nextSibling);

	// speedometer - win/loss ratio
	var smBody_class = d.getElementsByClassName('b-speedometer-body')[0],
		smWinWeight = (isFinite(s.r.winLR)) ? s.r.winLR.toFixed(2) : 1,
		smWinArrow = (isFinite(s.r.winLR)) ? Math.min(30*(s.r.winLR-1),31) : 0;
		smBody_class.appendChild(elem("div", "b-speedometer", "<div class='b-speedometer-arrow' data-deg='"+smWinArrow+"' style='transform: rotate("+smWinArrow+"deg); -webkit-transform: rotate("+smWinArrow+"deg); -ms-transform: rotate("+smWinArrow+"deg);'></div><div class='b-speedometer-round'></div><p class='b-speedometer-title'>"+loc.p13+"</p><p class='b-speedometer-weight'>"+smWinWeight+"</p><p class='b-speedometer-ratio'>"+filter(s.r.wins,2)+" / "+filter(s.r.loss,2)+"</p>"));

	// performance ratings calculations table
	var rTable_div = elem("div", "ratings-table", "<h3>"+loc.p19+"</h3>"),
		rTable = elem("table", "t-table-ratings", ""),
		ratingsArr = [
			[loc.p20, loc.p21, loc.p22, loc.p23, loc.p24, loc.p25, loc.p26, loc.p27, loc.p28],
			["wn8", s.f.wn8.pct, loc.p29, s.f.wn8.ratCol, s.f.wn8.scaleCol, s.f.wn8.frag.toFixed(2), s.f.wn8.dmg.toFixed(2), s.f.wn8.spot.toFixed(2), "–",                    s.f.wn8.def.toFixed(2), s.f.wn8.win.toFixed(2)],
			["wn7", s.f.wn7.pct, loc.p30, s.f.wn7.ratCol, s.f.wn7.scaleCol, s.f.wn7.frag.toFixed(2), s.f.wn7.dmg.toFixed(2), s.f.wn7.spot.toFixed(2), "–",                    s.f.wn7.def.toFixed(2), s.f.wn7.win.toFixed(2)],
			["eff", s.f.eff.pct, loc.p31, s.f.eff.ratCol, s.f.eff.scaleCol, s.f.eff.frag.toFixed(2), s.f.eff.dmg.toFixed(2), s.f.eff.spot.toFixed(2), s.f.eff.cap.toFixed(2), s.f.eff.def.toFixed(2), "–"                   ]
		];
		for (var _r=0; _r<ratingsArr.length; ++_r) {
			var rRow = elem("tr", "", "");
			if (_r === 0) {
				for (var _rh=0; _rh<ratingsArr[_r].length; ++_rh) {
					rRow.appendChild(elem("th", "", ratingsArr[_r][_rh]));
				}
				rTable.appendChild(rRow);
			}
			else {
				for (var _rc=2; _rc<ratingsArr[_r].length; ++_rc) {
					rRow.appendChild(elem("td", "td-center", ratingsArr[_r][_rc]));
				}
				rTable.appendChild(rRow);
				rTable.appendChild(elem("tr", "td-rating-meter", "<td colspan='9'><div class='rating-meter rating-meter_"+ratingsArr[_r][0]+"'><div class='rating-meter-dail_line' style='width:"+ratingsArr[_r][1]+"%;'><div class='rating-meter-marker'></div></div></div></td>"));
			}
		}
		rTable_div.appendChild(rTable);
		userBlock.appendChild(rTable_div);
		// link to WN thread
		userBlock.appendChild(elem("div", "wnelink", "<a class ='b-orange-arrow wnelink_info' target='_blank' href='http://wiki.wnefficiency.net/pages/WN8:_Summary'>"+loc.p32+"</a>"));
	// end performance ratings calculations table

	// statistics wrapper
	var statistics_div = d.getElementsByClassName('b-result-classes')[0].parentNode;
		statistics_div.className = "b-statistics-wrpr";
		userBlock_wrpr.parentNode.insertBefore(statistics_div, userBlock_wrpr.nextSibling);

	// clean the old tables and populate them with new values (master badges, overall results and battle performance)
	var statTables = [
			[
				["<img src='"+css.l[7]+"'>", loc.p33, s.b[4].c+"<span>("+s.b[4].p+"%)</span>"],
				["<img src='"+css.l[8]+"'>", loc.p34, s.b[3].c+"<span>("+s.b[3].p+"%)</span>"],
				["<img src='"+css.l[9]+"'>", loc.p35, s.b[2].c+"<span>("+s.b[2].p+"%)</span>"],
				["<img src='"+css.l[10]+"'>", loc.p36, s.b[1].c+"<span>("+s.b[1].p+"%)</span>"],
				["<img src='"+css.u.bad1+"'>", loc.p37, s.b[0].c+"<span>("+s.b[0].p+"%)</span>"],
				["<img src='"+css.u.bad2+"'>", loc.p38, s.b[5].c+"<span>("+s.b[5].p+"%)</span>"]
			],
			[
				[loc.p39, filter(s.r.bats,2), s.c.api],
				[loc.p40, filter(s.r.wins,2), "("+s.c.winsR+")"],
				[loc.p41, filter(s.r.loss,2), "("+s.c.lossR+")"],
				[loc.p42, filter(s.r.draw,2), "("+s.c.drawR+")"],
				[loc.p43, filter(s.r.surv,2), "("+s.c.survR+")"],
				[loc.p44, "", s.a.bats.toFixed(2)],
				[loc.p45, "", filter(s.r.exp,2)],
				[loc.p46, "", filter(s.r.expA,2)],
				[loc.p47, "", filter(s.r.expM,2)]
			],
			[
				[loc.p48, filter(s.r.frag,2), s.a.frag.toFixed(2)],
				[loc.p49, filter(s.r.dths,2), s.a.dths.toFixed(2)],
				[loc.p50, filter(s.r.spot,2), s.a.spot.toFixed(2)],
				[loc.p51, "", s.c.hitsR],
				[loc.p52, filter(s.r.dmgD,2), s.c.dmgTier],
				[loc.p53, filter(s.r.dmgR,2), filter(s.a.dmgR.toFixed(0),2)],
				[loc.p54, filter(s.r.caps,2), s.a.caps.toFixed(2)],
				[loc.p55, filter(s.r.defs,2), s.a.defs.toFixed(2)],
				[loc.p56, "", s.a.tier.toFixed(2)]
			],
			[
				mb_table,
				or_table,
				bp_table
			]
		];
		mb_table.innerHTML = "";
		or_table.innerHTML = "";
		bp_table.innerHTML = "";
		for (var _s=0; _s<(statTables.length-1); ++_s) {
			for (var _sr=0; _sr<statTables[_s].length; ++_sr) {
				statTables[3][_s].appendChild(elem("tr", "", "<td class='"+((statTables[3][_s] == mb_table) ? 't-dotted_class-ico t-dotted_minor__middle' : 't-dotted_minor')+"'>"+statTables[_s][_sr][0]+"</td><td class='"+((statTables[3][_s] == mb_table) ? 't-dotted_minor t-dotted_minor__middle' : 't-dotted_value')+"'>"+statTables[_s][_sr][1]+"</td><td class='"+((statTables[3][_s] == mb_table) ? 't-dotted_value t-dotted_minor__middle' : 't-dotted_value')+"'>"+statTables[_s][_sr][2]+"</td>"));
			}
		}

	// cake diagrams - adding tier diagram
	var diagSector_class = d.getElementsByClassName('b-diagrams-sector')[0],
		diagTier_div = elem("div", "b-diagram-block b-diagram-tiers js-diagram-block", "<h3>"+loc.p57+"</h3><div class='b-diagram-wrpr'><div class='b-diagram' id='holder-mechanism-tier'></div><div class='b-diagram-round js-diagram-round'><span class='b-diagram-round_title'></span><span class='b-diagram-round_value js-result'>"+s.v.a+"</span></div></div>"),
		diagTier_table = elem("table", "t-dotted t-dotted__diagram js-diagram-mechanism-legend", ""),
		diagTierCol = {1:"496877",2:"2b591f",3:"831818",4:"303766",5:"814f07",6:"1A775F",7:"B0D23A",8:"763D46",9:"936C19",10:"471952"};
		diagTier_div.appendChild(diagTier_table);
		diagSector_class.insertBefore(diagTier_div, diagSector_class.firstElementChild.nextSibling);
		for (var _t in s.t) {
			if (s.t.hasOwnProperty(_t)) {
				if (s.t[_t].c !== 0) {
					diagTier_table.appendChild(elem("tr", "", "<td class='t-dotted_diagram-first'><span class='t-dotted_diagram-bg'></span></td><td><span class='t-dotted_diagram-bg'><span class='t-dotted_diagram-info'><span class='t-diagram_battle'>"+filter(s.t[_t].b,2)+"</span><span class='t-dotted_diagram-percent'>(<span class=''>"+(s.t[_t].b/s.r.bats*100).toFixed(2)+"%</span>)</span><span class='t-diagram_tiers js-results'>"+s.t[_t].c+"</span><span class='t-dotted_diagram-percent'>(<span class='js-value'>"+(s.t[_t].c/s.v.a*100).toFixed(2)+"%</span>)</span></span><span class='b-diagram-ico b-diagram-ico_tier b-diagram-ico_tier-"+_t+"'>"+loc.p58+" "+_t+"</span></span></td><td class='t-dotted_diagram-last'><span class='t-dotted_diagram-bg'><span class='js-colors'>#"+diagTierCol[_t]+"</span></span></td>"));
				}
			}
		}
		diagSector_class.firstElementChild.innerHTML += "<div class='b-diagram-total'><h3>"+loc.p59+" "+s.v.a+"</h3></div>";
		// fix for cake diagram in chrome
		if (web.chrome) {
			$('.js-diagram-block').each(function() {
				var items = [], values = [], colors = [], results = [], legend, result, holder;
				holder = $('.b-diagram', this).attr('id');
				$('.js-diagram-mechanism-legend tr', this).each(function () {
					items.push($(this));
					values.push(parseInt($('.js-value', this).text(), 10));
					colors.push($('.js-colors', this).text());
					results.push($('.js-results', this).text());
					legend = $('.js-diagram-mechanism-legend');
					result = $('#' + holder).next().find('.js-result');
				});
				new Raphael(holder, 630, 630).pieChart(65, 65.5, 53.5, items, values, colors, results, legend, result);
			});
		}

	// achievements wrapper
	var medal_div = elem("div", "b-achievements-wrpr", ""),
		medalHeader_div = elem("div", "b-head-block", ""),
		medalHeader_class = d.getElementsByClassName('js-achievements-header')[0],
		medalClassArr = ["b-profile-item-empty","js-achivements-showhide","js-short-achievements","js-full-achievements"];
		medalHeader_div.appendChild(medalHeader_class);
		medal_div.appendChild(medalHeader_div);
		for (var _m=0; _m<medalClassArr.length; ++_m) {
			var medalChild = d.getElementsByClassName(medalClassArr[_m])[0];
			if (!!medalChild) {
				medal_div.appendChild(medalChild);
			}
		}
		diagSector_class.parentNode.insertBefore(medal_div, diagSector_class.nextSibling);
		diagSector_class.parentNode.insertBefore(layoutfix_class[0], diagSector_class.nextSibling);

	// vehicles wrapper
	var vehTable_class = d.getElementsByClassName('t-profile t-profile__vehicle')[0],
		vehicles_div = elem("div", "b-vehicles-wrpr", ""),
		vehiclesHeader_div = elem("div", "b-vehicles-header", "<a class='b-orange-arrow b-profile-ratings_link' target='_blank' href='/encyclopedia/vehicles/'>"+loc.p60+"</a><span class='b-profile-vehicles-tankstat'><a class='b-orange-arrow b-profile-ratings_link b-profile-vehicles-tankstat_link' target='_blank' href='http://www.noobmeter.com/tankStats/eu'>"+loc.p61+"</a></span>"),
		vehicles_h3_class = vehTable_class.previousElementSibling.previousElementSibling;
		vehicles_h3_class.className = "b-profile-ratings_title";
		vehiclesHeader_div.insertBefore(vehicles_h3_class, vehiclesHeader_div.firstChild);
		vehicles_div.appendChild(vehiclesHeader_div);
		vehTable_class.parentNode.insertBefore(vehicles_div, vehTable_class);
		vehicles_div.appendChild(vehTable_class);

	// add a premium tanks table to the vehicle table
	var premHBody = elem("tbody", "", ""),
		premTBody = elem("tbody", "sortable", "");
		vehTable_class.appendChild(premHBody);
		if (s.s.p.r.length === 0) {
			premHBody.appendChild(elem("tr", "t-profile_tankstype t-profile_tankstype-prem t-profile_tankstype__empty", "<td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__prem'></span><span class='b-tankstype-text'>"+loc.p62+" </span></td><td class='t-profile_right'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_dropdown-ico'><!-- empty --></td>"));
		}
		else {
			premHBody.className = "tablesorter-no-sort";
			premHBody.appendChild(elem("tr", "t-profile_tankstype t-profile_tankstype-prem js-table-dropdown-link", "<td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__prem'></span><span class='b-tankstype-text'>"+loc.p62+" <span class='b-armory-col'>"+s.s.p.r.length+"</span></span></td><td class='t-profile_right'>"+filter(s.s.p.b,2)+"</td><td class='t-profile_center'>"+colStat((s.s.p.w/s.s.p.b)*100, "wrv", 0, "%")+"<span>"+filter(s.s.p.w,2)+"</span></td><td class='t-profile_center'>"+s.s.p.bg+"</td><td class='t-profile_dropdown-ico'><a title='Show/hide vehicles' class='t-profile_dropdown-link' href=''></a></td>"));
			premTBody.style.display="none";
			vehTable_class.appendChild(premTBody);
			for (var _p=0; _p<s.s.p.r.length; ++_p) {
				premTBody.appendChild(s.s.p.r[_p][0]);
				premTBody.appendChild(s.s.p.r[_p][1]);
			}
		}

	// add a tier 10 table to the vehicle table
	var tenHBody = elem("tbody", "", ""),
		tenTBody = elem("tbody", "sortable", "");
		vehTable_class.appendChild(tenHBody);
		if (s.s.t.r.length === 0) {
			tenHBody.appendChild(elem("tr", "t-profile_tankstype t-profile_tankstype__empty", "<td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__ten'>✖</span><span class='b-tankstype-text'>"+loc.p68+" </span></td><td class='t-profile_right'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_center'>&ndash;</td><td class='t-profile_dropdown-ico'><!-- empty --></td>"));
		}
		else {
			tenHBody.className = "tablesorter-no-sort";
			tenHBody.appendChild(elem("tr", "t-profile_tankstype js-table-dropdown-link", "<td width='388' class='t-profile_head'><span class='b-tankstype-ico b-tankstype-ico__ten'>✖</span><span class='b-tankstype-text'>"+loc.p68+" <span class='b-armory-col'>"+s.s.t.r.length+"</span></span></td><td class='t-profile_right'>"+filter(s.s.t.b,2)+"</td><td class='t-profile_center'>"+colStat((s.s.t.w/s.s.t.b)*100, "wrv", 0, "%")+"<span>"+filter(s.s.t.w,2)+"</span></td><td class='t-profile_center'>"+s.s.t.bg+"</td><td class='t-profile_dropdown-ico'><a title='Show/hide vehicles' class='t-profile_dropdown-link' href=''></a></td>"));
			tenTBody.style.display="none";
			vehTable_class.appendChild(tenTBody);
			for (var _x=0; _x<s.s.t.r.length; ++_x) {
				tenTBody.appendChild(s.s.t.r[_x][0]);
				tenTBody.appendChild(s.s.t.r[_x][1]);
			}
		}
	// end vehicles wrapper

	// debugging to browser console
		console.info("Browser Info:\n"+navigator.appCodeName+" - "+navigator.appName+"\n"+navigator.userAgent+"\n", web);
		console.info(ratingsClipboard);
		console.info("Script Settings:\n", sc, "\n\n\n", "Statistics:\n", s);
		console.info("Vehicle Info:\n", vehList);

	// preparing global stats for XML output in compileStats()
	var playerStats = {
		"name": wg.name,
		"userid": wg.id,
		"date": String(10000*new Date().getFullYear() + 100*(new Date().getMonth()+1) + new Date().getDate() +"_"+ new Date().getHours() + new Date().getMinutes() + new Date().getSeconds()),
		"days": s.r.days,
		"vehAmount": s.v.a,
		"statsTotal": {battles: s.r.bats, battlesWins: s.r.wins, battlesLosses: s.r.loss, battlesDraws: s.r.draw, battlesSurvive: s.r.surv, exp: s.r.exp, expMax: s.r.expM, frags: s.r.frag, deaths: s.r.dths, spots: s.r.spot, dmgDlt: s.r.dmgD, dmgRec: s.r.dmgR, hits: s.r.hits, caps: s.r.caps, defs: s.r.defs},
		"statsAvg": {avgBattles: s.a.bats, avgBattlesWin: s.a.wins, avgBattlesLoss: s.a.loss, avgBattlesDraws: s.a.draw, avgBattlesSurv: s.a.surv, avgExp: s.r.expA, avgFrags: s.a.frag, avgDeaths: s.a.dths, avgSpots: s.a.spot, avgDmg: s.a.dmgD, avgDmgRec: s.a.dmgR, avgCaps: s.a.caps, avgDefs: s.a.defs, avgTier: s.a.tier},
		"ratings": {wn8: s.f.wn8, wn7: s.f.wn7, eff: s.f.eff}
	};
	sessionStorage.setItem('tankStats', JSON.stringify(vehList));
	sessionStorage.setItem('playerStats', JSON.stringify(playerStats));
}
else {
	profileName_class.innerHTML += "<div style='width: 950px; top: -15px; text-align: center; position: absolute;'>"+loc.p65+"</div>";
}
// end tableBattles

// helper functions
// filter
function filter(input, type) {
var inputStr = input.toString();
	switch(type) {
		case (1): // input string into number
			return parseFloat(inputStr.replace(/[^\d]/g,""));
		case (2): // output number with locale symbol
			return inputStr.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1"+loc.sym);
		case (3): // remove all symbols
			return inputStr.replace(/[^\w]/g,"");
		default:
			console.error("Error filtering: ", input);
			return input;
	}
}

// colouring
function colStat(input, type, dec, sym, ext) {
var color = colArr.dft[0],
	output = input.toFixed(dec);
	if (sym) {
		output += sym;
	}
	switch(type) {
		case ("bat"):
			output = filter(input,2); break;
		case ("dmg"):
			output = filter(ext.toFixed(0),2); break;
		default: break;
	}
	if (type !== "") {
		if (s.h[type]) {
			color = s.h[type];
		}
		else if (type == "wrv") {
			color = colStatArr(input, "wr");
		}
		else {
			color = colStatArr(input, type);
			s.h[type] = color;
		}
	}
	return "<font color='"+color+"'>"+output+"</font>";
}
function colStatArr(input, type) {
var color;
	for (var _c in colArr) {
		if (colArr.hasOwnProperty(_c)) {
			if (input >= colArr[_c][colArr.id[type]]) {
				color = colArr[_c][0]; break;
			}
		}
	}
	return color || colArr.beg[0];
}

// quick creation of element
function elem(tag, name, html, type) {
var element = d.createElement(tag);
	if (name) {element.className = name;}
	if (html) {element.innerHTML = html;}
	if (type) {element.type = type;}
	return element;
}
// end helper functions

// wnefficiency handler
function wnHnd(resp) {
var respJSON = JSON.parse(resp.responseText),
	vehXbox = [
		//clone base
		[58625, 58113], //T-34-88
		[64801, 52257], //M4A2E4 Ripper
		[64545, 56097], //M4A3E8 Fury
		[2337,  11809], //T23
		[13346, 13345], //T26E4 Freedom
		[54049, 54609]  //Sexton I
	],
	newVeh;
	// remove ISU-130 - PC exclusive for community contributors, and will interfere with T-34-88
	for (var _wd=0; _wd<respJSON.data.length; _wd++) {
		if (respJSON.data[_wd].IDNum == 58625) {
			respJSON.data.splice(_wd, 1);
			break;
		}
	}
	// clone values from base vehicle and push to value array
	for (var _xi=0; _xi<vehXbox.length; _xi++) {
		for (var _wn=0; _wn<respJSON.data.length; _wn++) {
			if (respJSON.data[_wn].IDNum == vehXbox[_xi][1]) {
				newVeh = {
					IDNum: vehXbox[_xi][0],
					expFrag: respJSON.data[_wn].expFrag,
					expDamage: respJSON.data[_wn].expDamage,
					expSpot: respJSON.data[_wn].expSpot,
					expDef: respJSON.data[_wn].expDef,
					expWinRate: respJSON.data[_wn].expWinRate
				};
				respJSON.data.push(newVeh);
				break;
			}
		}
	}
	localStorage.setItem("wnExpValues", JSON.stringify(respJSON.data));
	localStorage.setItem("wnExpDate", Date.now());
	localStorage.setItem("wnExpVers", JSON.stringify([sc.vers, respJSON.header.version]));
	location.reload();
}
function wnHnd_error(err) {
	console.error("Error accessing WNEfficiency.net", err.responseText);
}
// end wnefficiency handler

// retrieval function
function reqHnd(url, handler, error) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		headers: {
			"Accept": "text/xml"
		},
		onload: function(resp) {
			if (resp.readyState == 4 && resp.status == 200 && resp.statusText == "OK") {
				handler(resp);
			}
			else {
				error(resp);
			}
		},
		onerror: function(resp) {
			error(resp);
		}
	});
}

// global functions inserted into head
// clipboard helper
function copyClipboard() {
var cpText = document.getElementsByClassName('ratingsClip-holder')[0].innerHTML,
	cpLoc = document.getElementsByClassName('ratingsClip-holder')[1].innerHTML;
	window.prompt(cpLoc, cpText);
}

// export stats to XML file
function compileStats() {
var d = document, tankId, tankName, tankNumber = 0, xmlCheckSeq = 0, vehicleStats = [],
	tankRow = d.getElementsByClassName('tablesorter-childRow'),
	vehList = JSON.parse(sessionStorage.getItem('tankStats')),
	playerStats = JSON.parse(sessionStorage.getItem('playerStats')),
	saveStatLink = d.getElementsByClassName('js-linkXml')[0],
	xmlloc = d.getElementsByClassName('ratingsXml-holder')[0].innerHTML;
	saveStatLink.textContent = xmlloc;
	saveStatLink.removeAttribute('onclick');
	for (var i=0; i<playerStats.vehAmount; ++i) {
		tankId = parseFloat(tankRow[i].getAttribute("data-vehicle-cd"));
		tankName = tankRow[i].getAttribute("data-vehicle-url").match(/[\w_-]+/g)[3];
		$.ajax({
			url: "/community/accounts/"+playerStats.userid+"/vehicle_details/",
			data: {
				vehicle_cd: tankId
			},
			tankName: tankName,
			dataType: 'json',
			error: function(data, statusText) {
				console.error(statusText, data);
			},
			success: function(data) {
				vehList[this.tankName].vehStat = { battles: vehList[this.tankName].vehStat.battles, battlesWins: vehList[this.tankName].vehStat.battlesWins, frag: data.destroyed, fragAvg: data.average_frags_per_battle, fragRatio: data.frags_death, dmg: data.damage, dmgAvg : data.average_damage_per_battle, dmgRatio: data.damage_caused_received, exp: data.experience, expMax: data.max_experience_per_battle, hitRate: data.hits_ratio };
				vehList[this.tankName].achievements = data.achievements;
				tankNumber += 1;
				vehicleStats.push(vehList[this.tankName]);
			}
		});
	}
	var xmlChecker = setInterval(function() {
		xmlCheckSeq += 1;
		if (tankNumber == playerStats.vehAmount) {
			saveStatLink.download = playerStats.userid+"_"+playerStats.date+".xml";
			saveStatLink.href = window.URL.createObjectURL(new Blob(["<?xml version='1.0' encoding='UTF-8'?>\r<player>\r<personal>\r"+json2xml(playerStats,"\t")+"</personal>\r<vehicles>\r"+json2xml(vehicleStats,"\t")+"</vehicles>\r</player>"], {type: "text/xml"}));
			saveStatLink.textContent = "Save as XML";
			saveStatLink.hostname = "text/xml"+saveStatLink.download+saveStatLink.href;
			saveStatLink.click();
			clearInterval(xmlChecker);
		}
		else if (xmlCheckSeq == 5) {
			clearInterval(xmlChecker);
		}
	}, 2500);
	function json2xml(d, tab) {
		var toXml = function(v, name, ind) {
			if (v !== undefined) {
				if (!isNaN(parseFloat(name))) {
					name = "vehicle";
				}
				var xml = "";
				if (Object.prototype.toString.call(v) == '[object Array]') {
					for (var i=0, n=v.length; i<n; i++) {
						xml += ind+toXml(v[i], name, ind+"\t")+"\n";
					}
				}
				else if (Object.prototype.toString.call(v) == "[object Object]") {
					var hasChild = false;
					xml += ind+"<"+name;
					for (var o in v) {
						if (o.charAt(0) == "@") {
							xml += " "+o.substr(1)+"=\""+v[o].toString()+"\"";
						}
						else {
							hasChild = true;
						}
					}
					xml += hasChild ? ">\r" : "/>\r";
					if (hasChild) {
						for (var c in v) {
							if (c == "#text") {
								xml += v[c];
							}
							else if (c == "#cdata") {
								xml += "<![CDATA["+v[c]+"]]>";
							}
							else if (c.charAt(0) != "@") {
								xml += toXml(v[c], c, ind+"\t");
							}
						}
						xml += (xml.charAt(xml.length-1)=="\n"?ind:"")+"</"+name+">\r";
					}
				}
				else {
					xml += ind+"<"+name+">"+v.toString()+"</"+name+">\r";
				}
				return xml;
			}
		}, xml="";
		for (var m in d) {
			if (d.hasOwnProperty(m)) {
				xml += toXml(d[m], m, "");
			}
		}
		return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
	}
}
// end global functions
}());
