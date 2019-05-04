// ==UserScript==
// @name TWLeoTools
// @namespace TomRobert
// @author Leotas (updated by Tom Robert)
// @description Useful tools for The West!
// @include https://*.the-west.*/game.php*
// @include https://*.the-west.*/index.php?page=logout
// @version	1.23.3
// @grant none
// ==/UserScript==
if (location.href.indexOf('index.php?page=logout') != - 1) {
  location.href = '/';
}
if (location.href.indexOf('game.php') != - 1) {
  (function (fn) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = '(' + fn.toString() + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
  }) (function () {
    TWLTstart = {
      version: '1.23.3',
      name: 'TWLeoTools',
      author: 'Leotas (updated by Tom Robert)',
      minGame: '2.04',
      maxGame: Game.version.toString(),
      website: 'https://greasyfork.org/scripts/7238',
      updateUrl: 'https://raw.githack.com/TomRobert/tw/master/sU.js',
      updateAd: 'http://adf.ly/1OMM8P',
    };
    langs = {
      en_US: {
        language: 'None (English)',
        ApiGui1: 'This script contains many features to simplify your everyday life in The West:</b><ul style="margin-left:15px;"><li>Useful shortcuts</li><li>Logout button</li><li>Remove the taskbar</li><li>Skill points in job windows</li><li>Switch title and player name in town hall</li><li>Duelmap</li><li>Highlight daily login bonus day 5</li><li>Town name in market window</li><li>Reminder at the market</li><li>Hide completed achievements</li><li>Better recipe market</li><li>CTRL+click shows the item on TW-DB.info</li><li>And more...</li><li>More Informations: ',
        ApiGui2: 'Open script page',
        FeatLogout: 'Add a logout button on the right side',
        FeatStatus: 'Remove the taskbar',
        FeatshowAP: 'Show your actual skill points in job windows',
        FeatChangeCity: 'Switch title and player name in the town hall',
        FeatshowDuel: 'Add Duelmap tab in duel window',
        FeatmarkDaily: 'Highlight daily login bonus on day 5 to not miss it',
        FeatmarketTown: 'Show town name in market window',
        FeatmarketMess: 'Get a message when there are items or money to pick up on actual market',
        Featachieve: 'Hide completed achievements in achievements window',
        FeatmarketFind: 'Improve the purchase of recipes on market',
        FeatMoveJobs: 'Move the queued jobs a bit to the left',
        FeatBlinkingEv: 'Stop the blinking of the event, County Fair buttons on the left side',
        FeatFortTracker: 'Turn off fort battle reminder',
        FeatNoFriends: 'Hide "Friend online" pop-ups',
        settings1: 'Open settings',
        settings2: 'Open settings and information window',
        ghosttown1: 'Go to ghost town ',
        ghosttown2: 'Open ghost town',
        ghosttown3: 'Open ghost town and center it on map',
        indiantown1: 'Go to Indian village ',
        indiantown2: 'Open Indian village',
        indiantown3: 'Open Indian village and center it on map',
        openmarket: 'Open market',
        forum: 'Open town forum',
        info: 'Info',
        contact: 'Contact',
        features: 'Features',
        name: 'Name',
        author: 'Author: </b>',
        version: 'Version: </b>',
        gameversion: 'Gameversions: </b>',
        website: 'Website: </b>',
        weblink: 'Weblink',
        save: 'Save',
        saveMessage: 'Settings added. To see the changes press F5 to reload the game.',
        allprofessions: 'All Professions',
        fieldcook: 'Field Cook',
        tonicpeddler: 'Tonic Peddler',
        blacksmith: 'Blacksmith',
        mastersaddler: 'Master Saddler',
        market1: 'Items on market',
        market2: 'There are items/money on this market. What do you want to pick up?',
        all: 'All',
        onlyBids: 'Only bids',
        nothing: 'Nothing',
        town: 'Town',
        level: 'Level',
        duelLevel: 'Duelling level',
        exp: 'Exp',
        distance: 'Distance',
        startduel: 'Start Duel',
        centerMap: 'Center map',
        duelmap: 'Duelmap',
        duelradius: 'Duel radius',
        minutes: 'minutes',
        hour: '1 hour',
        hours: 'hours',
        searchOpp: 'Search for opponents',
        logout: 'Logout',
        update: 'Update',
        updateAvailable: 'A new version of the script is available',
      },
      de_DE: {
        language: 'German (Deutsch)',
        ApiGui1: 'Das Script beinhaltet verschiedene Funktionen um den Alltag bei The West zu vereinfachen:</b><ul style="margin-left:15px;"><li>Nützliche Shortcuts</li><li>Logout-Button</li><li>Taskleiste der TW-Fenster entfernen</li><li>Anzeige der AP im Job-Fenster</li><li>Titel und Spielername in der Stadthalle tauschen</li><li>Duellkarte</li><li>Täglichen Loginbonus 5 hervorheben</li><li>Stadtname im Marktfenster</li><li>Markt-Erinnerung</li><li>Abgeschlossene Erfolge ausblenden</li><li>Verbesserter Markt bei den Rezepten</li><li>CTRL+click zeigt den Gegenstand auf TW-DB.info</li><li>Und mehr...</li><li>Weitere Informationen: ',
        ApiGui2: 'Skriptfenster öffnen',
        FeatLogout: 'Erstellt einen Logout-Button rechts in der Menüleiste',
        FeatStatus: 'Entfernt die Fensterleiste der Fenster im unteren Teil',
        FeatshowAP: 'Zeige die Arbeitspunkte im Job-Fenster',
        FeatChangeCity: 'Tausche Titel und Spielername in der Stadthalle',
        FeatshowDuel: 'Ergänze im Duellfenster einen Tab, der eine Duellkarte zeigt',
        FeatmarkDaily: 'Markiere Täglicher Loginbonus am Tag 5 besonders, um ihn nicht zu übersehen',
        FeatmarketTown: 'Zeige im Marktfenster, zu welcher Stadt es gehört',
        FeatmarketMess: 'Wenn du an einem Markt stehst, wo etwas abgeholt werden kann, erscheint eine Meldung',
        Featachieve: 'Verstecke abgeschlossene Erfolge im Erfolgsfenster für eine bessere Übersicht',
        FeatmarketFind: 'Verbessert den Kauf von Rezepten im Markt',
        FeatMoveJobs: 'Verschiebe eingestellte Arbeiten ein wenig nach links',
        FeatBlinkingEv: 'Das Blinken der Event-, Wanderzirkus-Buttons am linken Rand entfernen',
        FeatFortTracker: 'Fortkampftracker abschalten',
        FeatNoFriends: '"Freund online" Pop-ups deaktivieren',
        settings1: 'Einstellungen öffnen',
        settings2: 'Öffnet das Informations- und Einstellungsfenster',
        ghosttown1: 'Gehe zur Geisterstadt ',
        ghosttown2: 'Öffne Geisterstadt',
        ghosttown3: 'Öffnet das Fenster der Geisterstadt und zentriert es auf der Map',
        indiantown1: 'Gehe zum Indianerdorf ',
        indiantown2: 'Öffne Indianerdorf',
        indiantown3: 'Öffnet das Fenster des Indianerdorfes und zentriert es auf der Map',
        openmarket: 'Öffne Marktfenster',
        forum: 'Öffne Stadtforum',
        info: 'Info',
        contact: 'Kontakt',
        features: 'Features',
        name: 'Name',
        author: 'Autor: </b>',
        version: 'Version: </b>',
        gameversion: 'Gameversionen: </b>',
        website: 'Webseite: </b>',
        weblink: 'Link',
        save: 'Speichern',
        saveMessage: 'Einstellungen wurden gespeichert. Neu laden/einloggen, um Änderungen zu aktualisieren.',
        allprofessions: 'Alle Berufe',
        fieldcook: 'Feldkoch',
        tonicpeddler: 'Quacksalber',
        blacksmith: 'Schmied',
        mastersaddler: 'Sattelmeister',
        market1: 'Gegenstände auf dem Markt',
        market2: 'Es sind noch Gegenstände/Geld auf diesem Markt. Was soll abgeholt werden?',
        all: 'Alles',
        onlyBids: 'Nur Gebote',
        nothing: 'Nichts',
        town: 'Stadt',
        level: 'Stufe',
        duelLevel: 'Duellstufe',
        exp: 'EP',
        distance: 'Distanz',
        startduel: 'Starte Duell',
        centerMap: 'Zentriere Map',
        duelmap: 'Duellkarte',
        duelradius: 'Duellradius',
        minutes: 'Minuten',
        hour: '1 Stunde',
        hours: 'Stunden',
        searchOpp: 'Duellgegner suchen',
        logout: 'Logout',
        update: 'Update',
        updateAvailable: 'Für das Script ist eine neue Version erhältlich',
      },
      pl_PL: {
        language: 'Polish (polski)',
        ApiGui1: 'This script contains many features to simplify your everyday life in The West:</b><ul style="margin-left:15px;"><li>Useful shortcuts</li><li>Logout button</li><li>Remove the taskbar</li><li>Skill points in job windows</li><li>Switch title and player name in town hall</li><li>Duelmap</li><li>Highlight daily login bonus day 5</li><li>Town name in market window</li><li>Reminder at the market</li><li>Hide completed achievements</li><li>Better recipe market</li><li>CTRL+click shows the item on TW-DB.info</li><li>And more...</li><li>Więcej informacji: ',
        ApiGui2: 'Otwórz w nowej karcie',
        FeatLogout: 'Dodanie przycisku po prawej stronie, wyloguj się.',
        FeatStatus: 'Usuwa pasek z oknami w dolnej częsci gry.',
        FeatshowAP: 'Pokazuje Punkty Parcy (PP) w oknie danej pracy.',
        FeatChangeCity: 'Zamienia tytuł gracza na początku, w karcie graczy w ratuszu.',
        FeatshowDuel: 'Dodaje dodatkową zakładkę pojedynków, w pojedynkach.',
        FeatmarkDaily: 'Oznacza dodatkową ramką 5 dzień logowania.',
        FeatmarketTown: 'Dodaje nazwę miasta w karcie targu.',
        FeatmarketMess: 'Jeżeli znajdyjesz się w mieście gdzie coś jest do odebrania. Pojawia się komunikat.',
        Featachieve: 'Ukrywa zaliczone osiągnięcia.',
        FeatmarketFind: 'Dodaje dodatkowe przyciski z receptami w karcie targ.',
        FeatMoveJobs: 'Move the queued jobs a bit to the left',
        FeatBlinkingEv: 'Stop the blinking of the event, County Fair buttons on the left side',
        FeatFortTracker: 'Turn off fort battle reminder',
        FeatNoFriends: 'Hide "Friend online" pop-ups',
        settings1: 'Otwórz ustawienia',
        settings2: 'Otwiera okno ustawień oraz informacji o skrypcie.',
        ghosttown1: 'Idź do Miasta Widmo, dojście ',
        ghosttown2: 'Otwórz zadania w Mieście Widmo',
        ghosttown3: 'Otwiera okno z zadaniami w Mieście Widmo',
        indiantown1: 'Idź do Wioski Indiańskiej, dojście ',
        indiantown2: 'Otwórz zadania w Wiosce Indiańskiej',
        indiantown3: 'Otwiera okno z zadaniami w Wiosce Indiańskiej.',
        openmarket: 'Otwórz targ',
        forum: 'Otwórz forum',
        info: 'Informacja',
        contact: 'Kontakt',
        features: 'Ustawienia',
        name: 'Nazwa',
        author: 'Autor: </b>',
        version: 'Wersja: </b>',
        gameversion: 'Wersja gry: </b>',
        website: 'Strona: </b>',
        weblink: 'Dyskusja',
        save: 'Zapisz',
        saveMessage: 'Ustawienia zostały zapisane. Odśwież stronę wcelu wprowadzenia aktualizacji.',
        allprofessions: 'Wszystko',
        fieldcook: 'Kucharz polowy',
        tonicpeddler: 'Znachor',
        blacksmith: 'Kowal',
        mastersaddler: 'Rymarz',
        market1: 'Przedmioty na targu',
        market2: 'Na tym targu znajdują się przedmioty/kasa, odebrać?',
        all: 'Wszystko',
        onlyBids: 'Tylko oferty',
        nothing: 'Nic',
        town: 'Miasto',
        level: 'Poziom',
        duelLevel: 'Poziom pojedynków',
        exp: 'Exp',
        distance: 'Odległość',
        startduel: 'Akcja',
        centerMap: 'Wyśrodkowanie',
        duelmap: 'Mapa pojedynków',
        duelradius: 'Zasięg',
        minutes: 'Minut',
        hour: '1 Godzina',
        hours: 'Godzin',
        searchOpp: 'Szukaj przeciwników',
        logout: 'Logout',
        update: 'Aktualizacja',
        updateAvailable: 'Nowa wersja skryptu jest dostępna',
      },
      es_ES: {
        language: 'Spanish (español)',
        ApiGui1: 'El script incluye varias funciones que simplifican la vida cotidiana en The West:</b><ul style="margin-left:15px;"><li>Useful shortcuts</li><li>Logout button</li><li>Remove the taskbar</li><li>Skill points in job windows</li><li>Switch title and player name in town hall</li><li>Duelmap</li><li>Highlight daily login bonus day 5</li><li>Town name in market window</li><li>Reminder at the market</li><li>Hide completed achievements</li><li>Better recipe market</li><li>CTRL+click shows the item on TW-DB.info</li><li>And more...</li><li>Más información: ',
        ApiGui2: 'Abrir ventana del script',
        FeatLogout: 'Crea un botón de cierre de sesión a la derecha en la barra de menúe',
        FeatStatus: 'Oculta la barra inferior de las ventanas',
        FeatshowAP: 'Ver los puntos de trabajo en la ventana de trabajo',
        FeatChangeCity: 'Cambiar título y nombre del jugador en el ayuntamiento',
        FeatshowDuel: 'Completar la ventana de duelos con una pestaña que muestra el mapa de duelos',
        FeatmarkDaily: 'Marcar el Bonus-Conexión-5 Días especialmente para que no te lo pierdas',
        FeatmarketTown: 'Mostrar en la ventana de mercado, la ciudad al que pertenece',
        FeatmarketMess: 'Si llegas a un mercado donde tienes algo que puede ser recogido, aparece un mensaje',
        Featachieve: 'Ocultar logros completados en la ventana de logros para una mejor visión',
        FeatmarketFind: 'Mejorar la compra de recetas en el mercado',
        FeatMoveJobs: 'Mueve la cola de trabajos un poco a la izquierda',
        FeatBlinkingEv: 'Detiene el parpadeo del evento, botones de la feria de condado en el lado izquierdo',
        FeatFortTracker: 'Apaga el recordatorio de la batalla de fuerte',
        FeatNoFriends: 'Esconde  los avisos de "Amigo conectado"',
        settings1: 'Abrir preferencias',
        settings2: 'Abre la ventana de información y ajustes',
        ghosttown1: 'Ir a la Ciudad Fantasma ',
        ghosttown2: 'Abrir Ciudad Fantasma',
        ghosttown3: 'Abre la ventana de la Ciudad Fantasma y la centra en el mapa',
        indiantown1: 'Ir al Pueblo Indio Waupee ',
        indiantown2: 'Abrir Pueblo Indio Waupee',
        indiantown3: 'Abre la ventana del Pueblo Indio Waupee y lo centra en el mapa',
        openmarket: 'Abrir Mercado',
        forum: 'Abrir el foro de la ciudad',
        info: 'Información',
        contact: 'Contacto',
        features: 'Funciones',
        name: 'Nombre',
        author: 'Autor: </b>',
        version: 'Versión: </b>',
        gameversion: 'Versión Juego: </b>',
        website: 'Web: </b>',
        weblink: 'Weblink',
        save: 'Guardar',
        saveMessage: 'La configuración se ha guardado. Refrescar/Loguearse, para actualizar los cambios.',
        allprofessions: 'Todos Oficios',
        fieldcook: 'Cocinero',
        tonicpeddler: 'Vendedor tónicos',
        blacksmith: 'Herrero',
        mastersaddler: 'Maestro de Guarnición',
        market1: 'Productos en el Mercado',
        market2: 'Todavía hay productos/dinero en el Mercado. ¿Desea recogerlos?',
        all: 'Todos',
        onlyBids: 'Solo Ofertas',
        nothing: 'Ninguno',
        town: 'Ciudad',
        level: 'Nivel',
        duelLevel: 'Nivel Duelo',
        exp: 'Exp',
        distance: 'Distancia',
        startduel: 'Iniciar Duelo',
        centerMap: 'Centrar Mapa',
        duelmap: 'Mapa Duelos',
        duelradius: 'Radio duelos',
        minutes: 'Minutos',
        hour: '1 Hora',
        hours: 'Horas',
        searchOpp: 'Buscar Duelo',
        logout: 'Cerrar sesión',
        update: 'Actualización',
        updateAvailable: 'Una nueva versión del script está disponible',
      },
    };
    LTlang = langs.hasOwnProperty(Game.locale) ? langs[Game.locale] : langs.en_US;
    TWLT = {
    };
    TWLT.Skript = {
      Data: {
      },
      Features: {
        logout: [
          LTlang.FeatLogout,
          false
        ],
        statusbar: [
          LTlang.FeatStatus,
          false
        ],
        showAP: [
          LTlang.FeatshowAP,
          true
        ],
        changeCityhall: [
          LTlang.FeatChangeCity,
          false
        ],
        showDuellMap: [
          LTlang.FeatshowDuel,
          true
        ],
        markDaily5: [
          LTlang.FeatmarkDaily,
          true
        ],
        marketTownName: [
          LTlang.FeatmarketTown,
          true
        ],
        marketMessage: [
          LTlang.FeatmarketMess,
          true
        ],
        achievementHide: [
          LTlang.Featachieve,
          false
        ],
        marketFind: [
          LTlang.FeatmarketFind,
          true
        ],
        moveJobs: [
          LTlang.FeatMoveJobs,
          true
        ],
        blinkingEvent: [
          LTlang.FeatBlinkingEv,
          false
        ],
        fortbattleTracker: [
          LTlang.FeatFortTracker,
          false
        ],
        noFriends: [
          LTlang.FeatNoFriends,
          false
        ],
      },
      Images: {
        recipe: 'data:image/png;base64,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',
        settings: 'data:image/png;base64,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',
        logout: 'data:image/png;base64,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'
      },
      init: function () {
        var WestAPI = TheWestApi.register('LeoTools', TWLTstart.name, TWLTstart.minGame, TWLTstart.maxGame, TWLTstart.author, TWLTstart.website);
        WestAPI.setGui('<br><i>Language detected: </i>' + LTlang.language + '<br><br><b>' + LTlang.ApiGui1 + '<a href="javascript:TWLT.GUI.open();">' + LTlang.ApiGui2 + '</a></li></ul><br><i>' + TWLTstart.name + ' v' + TWLTstart.version + '</i>');
        var menuContainer = $('<div id="TWLT-menu" class="menulink" onclick="TWLT.GUI.openSelectbox();" title="' + TWLTstart.name + '" />').css('background-image', 'url(' + TWLT.Skript.Images.settings + ')').css('background-position', '0px 0px').mouseenter(function () {
          $(this).css('background-position', '-25px 0px');
        }).mouseleave(function () {
          $(this).css('background-position', '0px 0px');
        });
        $('#ui_menubar').append($('<div class="ui_menucontainer" />').append(menuContainer).append('<div class="menucontainer_bottom" />'));
        var data = localStorage.getItem('TWLT');
        if (data !== null) TWLT.Skript.Data = JSON.parse(data);
        for (var k in TWLT.Skript.Features)
        {
          if (TWLT.Skript.getFeature(k)) {
            try {
              TWLT[k.substr(0, 1).toUpperCase() + k.substr(1, k.length - 1)].init();
            } catch (e) {
            }
          }
        }
      },
      getFeature: function (name) {
        return (TWLT.Skript.Data[name] !== undefined) ? TWLT.Skript.Data[name] : TWLT.Skript.Features[name][1];
      },
      setFeature: function (name, value) {
        TWLT.Skript.Data[name] = value;
        localStorage.setItem('TWLT', JSON.stringify(TWLT.Skript.Data));
      }
    };
    TWLT.GUI = {
      openSelectbox: function () {
        var selectbox = new west.gui.Selectbox();
        selectbox.setHeader('TWLT');
        selectbox.setWidth(300);
        selectbox.addItem(0, LTlang.settings1, LTlang.settings2);
        selectbox.addItem(1, LTlang.ghosttown1 + window.Map.calcWayTime(TWLT.ShowDuellMap.getLastQueuePosition(), {
          x: 1728,
          y: 2081
        }).formatDuration(), LTlang.ghosttown1);
        selectbox.addItem(2, LTlang.ghosttown2, LTlang.ghosttown3);
        selectbox.addItem(3, LTlang.indiantown1 + window.Map.calcWayTime(TWLT.ShowDuellMap.getLastQueuePosition(), {
          x: 28002,
          y: 16658
        }).formatDuration(), LTlang.indiantown1);
        selectbox.addItem(4, LTlang.indiantown2, LTlang.indiantown3);
        selectbox.addItem(5, LTlang.openmarket, LTlang.openmarket);
        selectbox.addItem(6, LTlang.forum, LTlang.forum);
        selectbox.addListener(function (e) {
          switch (e) {
            case 0:
              TWLT.GUI.open();
              break;
            case 1:
              QuestEmployerWindow.startWalk({
                key: 'ghosttown',
                x: '1728',
                y: '2081'
              });
              break;
            case 2:
              Map.center(1728, 2081);
              QuestEmployerWindow.showEmployer('ghosttown', '1728', '2081');
              break;
            case 3:
              QuestEmployerWindow.startWalk({
                key: 'indianvillage',
                x: '28002',
                y: '16658'
              });
              break;
            case 4:
              Map.center(28002, 16658);
              QuestEmployerWindow.showEmployer('indianvillage', '28002', '16658');
              break;
            case 5:
              MarketWindow.open(Character.homeTown.town_id);
              break;
            case 6:
              ForumWindow.open();
              break;
          }
        });
        var position = $('div#TWLT-menu').offset();
        selectbox.setPosition(position.left - 325, position.top - 20);
        selectbox.show();
      },
      window: {
      },
      checkbox: {
      },
      open: function () {
        TWLT.GUI.window = wman.open('TWLT').setMiniTitle(TWLTstart.name).setTitle('TheWest - LeoTools');
        TWLT.GUI.window.addTab(LTlang.info + ' & ' + LTlang.contact, 'TWLTContact', TWLT.GUI.openKontakt);
        TWLT.GUI.window.addTab(LTlang.features, 'TWLTFeatures', TWLT.GUI.openFeatures);
        TWLT.GUI.openKontakt();
      },
      openKontakt: function () {
        TWLT.GUI.window.clearContentPane();
        TWLT.GUI.window.activateTab('TWLTContact');
        var content = $('<br><h1>' + LTlang.info + '</h1><ul style="list-style-type:none;line-height:18px;margin-left:5px;"><li><b>' + LTlang.name + ': </b>' + TWLTstart.name + '</li><li><b>' + LTlang.author + TWLTstart.author + '</li><li><b>' + LTlang.version + TWLTstart.version + '</li><li><b>' + LTlang.gameversion + TWLTstart.minGame + ' - ' + TWLTstart.maxGame + '</li><li><b>' + LTlang.website + '<a href="' + TWLTstart.website + '" target="_blank">' + LTlang.weblink + '</a></li></ul>' +
        '<br><h1>' + LTlang.contact + '</h1><ul style="margin-left:15px;line-height:18px;"><li>Send a message to <a target=\'_blanck\' href="http://om.the-west.de/west/de/player/?ref=west_invite_linkrl&player_id=647936&world_id=13&hash=7dda">Tom Robert on German world Arizona</a></li>' +
        '<li>Contact me on <a target=\'_blanck\' href="https://greasyfork.org/forum/messages/add/Tom Robert">Greasy Fork</a></li>' +
        '<li>Message me on one of these The West Forum:<br>/ <a target=\'_blanck\' href="https://forum.the-west.de/private.php?do=newpm&u=24502">deutsches Forum</a> / ' +
        '<a target=\'_blanck\' href="https://forum.the-west.net/private.php?do=newpm&u=37219">English forum</a> / <a target=\'_blanck\' href="https://forum.the-west.pl/private.php?do=newpm&u=32083">forum polski</a> / ' +
        '<a target=\'_blanck\' href="https://forum.the-west.es/private.php?do=newpm&u=13770">foro español</a> /<br>/ <a target=\'_blanck\' href="https://forum.the-west.ru/private.php?do=newpm&u=27430">Русский форум</a> / ' +
        '<a target=\'_blanck\' href="https://forum.the-west.fr/private.php?do=newpm&u=17783">forum français</a> / <a target=\'_blanck\' href="https://forum.the-west.it/private.php?do=newpm&u=14287">forum italiano</a> / ' +
        '<a target=\'_blanck\' href="https://forum.beta.the-west.net/private.php?do=newpm&u=4072">beta forum</a> /<br>I will get an e-mail when you sent me the message <img src="../images/chat/emoticons/smile.png"></li></ul>');
        TWLT.GUI.window.appendToContentPane(content);
      },
      openFeatures: function () {
        TWLT.GUI.window.clearContentPane();
        TWLT.GUI.window.activateTab('TWLTFeatures');
        var scrollpane = new west.gui.Scrollpane;
        scrollpane.appendContent('<br><h1>' + LTlang.features + '</h1><br>');
        for (var k in TWLT.Skript.Features)
        {
          TWLT.GUI.checkbox[k] = new west.gui.Checkbox();
          checkbox = TWLT.GUI.checkbox[k];
          checkbox.setLabel(TWLT.Skript.Features[k][0]);
          checkbox.setSelected(TWLT.Skript.getFeature(k));
          checkbox.appendTo(scrollpane.getContentPane());
          scrollpane.appendContent('<br><div style="height:5px;" />');
        }
        scrollpane.appendContent('<br>');
        $(scrollpane.getMainDiv()).css('height', '330px');
        var button = new west.gui.Button(LTlang.save, function () {
          for (var k in TWLT.GUI.checkbox)
          {
            TWLT.Skript.setFeature(k, TWLT.GUI.checkbox[k].isSelected());
          }
          new UserMessage(LTlang.saveMessage, UserMessage.TYPE_SUCCESS).show();
        });
        $(TWLT.GUI.window.getContentPane()).append(scrollpane.getMainDiv()).append(button.getMainDiv());
      },
    };
    TWLT.MarketFind = {
      init: function () {
        var buttons_recipe = $('<div class="TWLTFind"><a href=\'javascript:TWLT.MarketFind.filterRecipe(0);\'><img title="' + LTlang.allprofessions + '" alt="allprofessions" style="width: 30px;" src="' + TWLT.Skript.Images.recipe + '" /></a><a href=\'javascript:TWLT.MarketFind.filterRecipe(1);\'><img title="' + LTlang.fieldcook + '" alt="fieldcook" style="width: 30px;" src="../images/items/recipe/recipe_cook.png" /></a><a href=\'javascript:TWLT.MarketFind.filterRecipe(2);\'><img title="' + LTlang.tonicpeddler + '" alt="tonicpeddler" style="width: 30px;" src="../images/items/recipe/recipe_quack.png" /></a><a href=\'javascript:TWLT.MarketFind.filterRecipe(3);\'><img title="' + LTlang.blacksmith + '" alt="blacksmith" style="width: 30px;" src="../images/items/recipe/recipe_smith.png" /></a><a href=\'javascript:TWLT.MarketFind.filterRecipe(4);\'><img title="' + LTlang.mastersaddler + '" alt="mastersaddler" style="width: 30px;" src="../images/items/recipe/recipe_sattle.png" /></a></div>');
        var inject = function (category, data) {
          $('.TWLTFind').remove();
          if (category == 'recipe') {
            $('.searchbox').before(buttons_recipe);
            $('.searchbox').css('margin-bottom', '0');
            var items = [
            ];
            for (var i = 0; i < data.length; i++)
            {
              items[i] = ItemManager.get(data[i]);
            }
            items.sort(function (a, b) {
              return a.min_level - b.min_level;
            });
            TWLT.MarketFind.Recipe = items;
            for (var i = 0; i < items.length; i++)
            {
              data[i] = items[i].item_id;
            }
            return data;
          }
          $('.searchbox').css('margin-bottom', '18px');
          return data;
        };
        var oldUpdateCategory = MarketWindow.Buy.updateCategory;
        MarketWindow.Buy.updateCategory = function (category, data) {
          data = inject(category, data);
          return oldUpdateCategory.call(this, category, data);
        };
        MarketWindow.getClearName = function (obj) {
          if (obj.type == 'recipe') {
            var name = ItemManager.get(obj.craftitem).name;
            return isDefined(name) ? name : obj.name;
          }
          return obj.name;
        };
      },
      filterRecipe: function (profession_id) {
        var data = $('#mpb_recipe_content p');
        data.show();
        if (profession_id == 0) return;
        for (var i = 0; i < TWLT.MarketFind.Recipe.length; i++)
        {
          if (profession_id != TWLT.MarketFind.Recipe[i].profession_id) $(data[i]).hide();
        }
      }
    };
    TWLT.AchievementHide = {
      init: function () {
        var hideUnErfolge = function () {
          var erfolge = $('.achievement');
          erfolge.hide();
          var unerfolge = $('.achievement .achievement_unachieved');
          unerfolge.parent().show();
        };
        var oldUpdateContent = AchievementExplorer.prototype.updateContent;
        AchievementExplorer.prototype.updateContent = function (data) {
          var tmp = oldUpdateContent.call(this, data);
          hideUnErfolge();
          return tmp;
        };
      }
    };
    TWLT.MarketMessage = {
      init: function () {
        Ajax.get('map', 'get_minimap', {
        }, function (json) {
          if (json.error) return new UserMessage(json.msg).show();
          TWLT.MarketMessage.Towns = json.towns;
          EventHandler.listen('position_change', function () {
            TWLT.MarketMessage.check();
          });
          TWLT.MarketMessage.check();
        });
      },
      check: function () {
        var town_id;
        var offers;
        var bids;
        var fetch = function (action) {
          Ajax.remoteCall('building_market', action, {
          }, function (resp) {
            if (resp.error) new UserMessage(resp.msg, UserMessage.TYPE_ERROR).show();
            if (!resp.error) {
              Character.setDeposit(resp.deposit);
              Character.setMoney(resp.cash);
              return new MessageSuccess(resp.msg).show();
            }
          });
        };
        var fetchAll = function (what) {
          if (what == 1) fetch('fetch_town_offers');
          fetch('fetch_town_bids');
          EventHandler.signal('inventory_changed');
        };
        var showDialog = function () {
          var dialog = new west.gui.Dialog(LTlang.market1, LTlang.market2, west.gui.Dialog.SYS_QUESTION);
          dialog.addButton(LTlang.all, function () {
            fetchAll(1);
          }).addButton(LTlang.onlyBids, function () {
            fetchAll(0);
          }).addButton(LTlang.nothing, function () {
          });
          dialog.show();
        };
        var checkItems = function () {
          for (var i = 0; i < bids.length; i++) {
            if (bids[i].market_town_id == town_id && (bids[i].auction_ends_in < 0 || (bids[i].current_bid == bids[i].max_price && bids[i].current_bid != null))) {
              showDialog();
              return;
            }
          }
          for (var i = 0; i < offers.length; i++) {
            if (offers[i].market_town_id == town_id && (offers[i].auction_ends_in < 0 || (offers[i].current_bid == offers[i].max_price && offers[i].current_bid !== null))) {
              showDialog();
              return;
            }
          }
        };
        var get_offers = function () {
          Ajax.remoteCall('building_market', 'fetch_offers', {
            page: 0
          }, function (json) {
            offers = json.msg.search_result;
            checkItems();
          });
        };
        var get_bids = function () {
          Ajax.remoteCall('building_market', 'fetch_bids', {
          }, function (json) {
            bids = json.msg.search_result;
            get_offers();
          });
        };
        for (var k in TWLT.MarketMessage.Towns)
        {
          if (TWLT.MarketMessage.Towns[k].x == Character.position.x && TWLT.MarketMessage.Towns[k].y == Character.position.y) {
            town_id = TWLT.MarketMessage.Towns[k].town_id;
            get_bids();
          }
        }
      }
    };
    TWLT.MarketTownName = {
      Towns: {
      },
      init: function () {
        Ajax.get('map', 'get_minimap', {
        }, function (json) {
          if (json.error) return new UserMessage(json.msg).show();
          TWLT.MarketTownName.Towns = json.towns;
        });
        var sShowTab = MarketWindow.showTab.toString();
        sShowTab = sShowTab.substr(0, sShowTab.length - 1);
        sShowTab += 'if (MarketWindow.townId != undefined) MarketWindow.window.setTitle(MarketWindow.window.titler.text+" - "+TWLT.MarketTownName.Towns[MarketWindow.townId].name);';
        eval('MarketWindow.showTab = ' + sShowTab + '};');
      }
    };
    TWLT.MarkDaily5 = {
      init: function () {
        var addBorder = function () {
          var rows = $('.reward-row');
          var row = $(rows[4]);
          if (row.hasClass('today')) row.css('border', '20px solid red');
        };
        var oldLoginbonusShow = west.player.LoginBonus.prototype.show;
        west.player.LoginBonus.prototype.show = function () {
          var tmp = oldLoginbonusShow.call(this);
          if (tmp !== undefined) return tmp;
          addBorder();
        };
      }
    };
    TWLT.ShowDuellMap = {
      Player: {
      },
      getLastQueuePosition: function () {
        var posx = Character.position.x;
        var posy = Character.position.y;
        if (TaskQueue.queue.length >= 1) {
          var data = TaskQueue.queue[TaskQueue.queue.length - 1].wayData;
          if (data.x) {
            posx = data.x;
            posy = data.y;
          }
        }
        return {
          x: posx,
          y: posy
        };
      },
      init: function () {
        Ajax.remoteCallMode('character', 'get_info', {
        }, function (resp) {
          Character.setDuelLevel(resp.duelLevel);
        });
        var fillPage = function () {
          $('#TWLTDuellMapTable').empty();
          $('#TWLTDuellMapPlayers').empty();
          $('#TWLTDuellMapTable').append('<tr><th>' + LTlang.name + '</th><th>' + LTlang.town + '</th><th>' + LTlang.level + '</th><th>' + LTlang.duelLevel + '</th><th>' + LTlang.exp + '</th><th>' + LTlang.distance + '</th><th>' + LTlang.startduel + '</th><th>' + LTlang.centerMap + '</th></tr>');
          for (var k in TWLT.ShowDuellMap.Player) {
            var data = TWLT.ShowDuellMap.Player[k];
            var content = $('<tr></tr>');
            content.append('<td><a href="#" onclick="PlayerProfileWindow.open(' + data.player_id + ');">' + data.player_name + '</a></td>');
            content.append('<td><a href="#" onclick="TownWindow.open(' + data.town_x + ',' + data.town_y + ');">' + data.town_name + '</a></td>');
            content.append('<td>' + data.level + '</td>');
            content.append('<td>' + data.duellevel + '</td>');
            content.append('<td>' + Math.round((7 * data.duellevel - 5 * Character.duelLevel + 5) * Character.duelMotivation * 3) + '</td>');
            content.append('<td>' + window.Map.calcWayTime(TWLT.ShowDuellMap.getLastQueuePosition(), {
              x: data.character_x,
              y: data.character_y
            }).formatDuration() + '</td>');
            content.append('<td><a href="#" onclick="SaloonWindow.startDuel(' + data.player_id + ', ' + data.alliance_id + ', false, DuelsWindow);">' + LTlang.startduel + '</a></td>');
            content.append('<td><a href="#" onclick="Map.center(' + data.character_x + ', ' + data.character_y + ');">' + LTlang.centerMap + '</a></td>');
            $('#TWLTDuellMapTable').append(content);
            content = $('<div style="position:absolute;border:1px solid black;background:#FF0000;width:4px;height:4px;left:' + (data.character_x / 46592 * 770 - 2) + 'px;top:' + (data.character_y / 20480 * 338 - 2) + 'px;" />');
            eval('content.click(function () { SaloonWindow.startDuel(' + data.player_id + ', ' + data.alliance_id + ', false, DuelsWindow); });');
            content.addMousePopup('<b>' + data.player_name + '</b> ' + window.Map.calcWayTime(TWLT.ShowDuellMap.getLastQueuePosition(), {
              x: data.character_x,
              y: data.character_y
            }).formatDuration());
            $('#TWLTDuellMapPlayers').append(content);
          }
          $('<div style="position:absolute;border:1px solid black;background:#00CCFF;width:4px;height:4px;left:' + (Character.position.x / 46592 * 770 - 2) + 'px;top:' + (Character.position.y / 20480 * 338 - 2) + 'px;" />').addMousePopup('Deine Position').appendTo('#TWLTDuellMapPlayers');
        };
        var getPlayer = function (i, distance) {
          if (i == - 1) {
            TWLT.ShowDuellMap.Player = {
            };
            i++;
          }
          Ajax.remoteCall('duel', 'search_op', {
            next: true,
            order_by: 'ASC',
            sort: 'range',
            page: i,
            distance: distance * 60
          }, function (json) {
            for (var j = 0; j < json.oplist.pclist.length; j++) {
              TWLT.ShowDuellMap.Player[json.oplist.pclist[j].player_name] = json.oplist.pclist[j];
            }
            if (json.oplist.next) {
              getPlayer(++i, distance);
              return;
            }
            fillPage();
          });
        };
        var showTab = function (win, id) {
          DuelsWindow.window.setSize(840, 655).addClass('premium-buy');
          DuelsWindow.window.activateTab(id).$('div.tw2gui_window_content_pane > *').each(function (i, e) {
            if ($(e).hasClass('duels-' + id)) {
              $(e).children().fadeIn();
              $(e).show();
            } else {
              $(e).children().fadeOut();
              $(e).hide();
            }
          });
          DuelsWindow.window.setTitle(LTlang.duelmap);
        };
        var initDuellmap = function () {
          DuelsWindow.window.addTab(LTlang.duelmap, 'TWLTDuellmap', showTab);
          var area = $('<div class="duels-TWLTDuellmap" style="display:none;"></div>').appendTo(DuelsWindow.window.getContentPane());
          var content = $('<div style="height:350px;top:10px;position:relative"></div>');
          var left = 0;
          var top = 0;
          for (var i = 1; i <= 15; i++)
          {
            var img = $('<img style="position:absolute;border:1px solid #000;width:110px;height:169px;left:' + left + 'px;top:' + top + 'px;" src="' + Game.cdnURL + '/images/map/minimap/county_' + i + '.jpg" />');
            left += 110;
            if (i === 7) {
              left = 0;
              top = 169;
            }
            if (i === 4 || i === 11) {
              img.css('height', '114px');
            }
            if (i === 11) {
              img.css('top', top + 55 + 'px');
            }
            if (i === 15) {
              img.css({
                height: '110px',
                left: '330px',
                top: '114px'
              });
            }
            content.append(img);
          }
          content.append('<div id="TWLTDuellMapPlayers"></div>');
          content.appendTo(area);
          var scrollpane = new west.gui.Scrollpane().appendTo(area);
          $(scrollpane.getMainDiv()).css('height', '200px');
          scrollpane.appendContent(LTlang.duelradius + '    ');
          var combobox = new west.gui.Combobox().setWidth(120).addItem('15', '15 ' + LTlang.minutes).addItem('30', '30 ' + LTlang.minutes).addItem('60', LTlang.hour).addItem('120', '2 ' + LTlang.hours).addItem('240', '4 ' + LTlang.hours).addItem('360', '6 ' + LTlang.hours).select('120').appendTo(scrollpane.getContentPane());
          var button = new west.gui.Button(LTlang.searchOpp).appendTo(scrollpane.getContentPane()).click(function () {
            getPlayer( - 1, combobox.getValue());
          });
          scrollpane.appendContent('<table border="1" id="TWLTDuellMapTable"></table>');
          getPlayer( - 1, 10);
        };
        var oldOpen = DuelsWindow.open;
        DuelsWindow.open = function () {
          var tmp = oldOpen.call(this);
          if (tmp !== undefined) return tmp;
          initDuellmap();
        };
        var oldShowTab = DuelsWindow.showTab;
        DuelsWindow.showTab = function (id) {
          var tmp = oldShowTab.call(this, id);
          if (tmp !== undefined) return tmp;
          DuelsWindow.window.removeClass('premium-buy').setSize(748, 472);
        };
      }
    };
    TWLT.ChangeCityhall = {
      init: function () {
        var swap = function (that) {
          var rows = $('.' + that.window.id + ' .row .cell.cell_2.name,.' + that.window.id + ' .row .cell.cell_2.name_foreign');
          rows.empty();
          for (var i = 0; i <= that.data.length; i++)
          {
            var player = that.data[i];
            $(rows[i]).append('<span>&nbsp;' + (player.title !== undefined ? player.title : '') + '</span><a href="#" onClick="PlayerProfileWindow.open(' + player.player_id + ')">' + player.name + '</a>');
          }
        };
        var oldFillContent = CityhallWindow.Residents.fillContent;
        CityhallWindow.Residents.fillContent = function () {
          var tmp = oldFillContent.call(this);
          if (tmp !== undefined) return tmp;
          swap(this);
        };
      }
    };
    TWLT.ShowAP = {
      init: function () {
        var addAP = function (that) {
          job = that.job;
          var getJobFeaturedCls = function () {
            if (LinearQuestHandler.hasTutorialQuest()) return '';
            if (job.is_gold) return 'gold';
            if (job.is_silver) return 'silver';
            return '';
          };
          var aps = that.currSkillpoints - that.job.workpoints;
          var jobicon = '<div class="job" title="' + job.get('description').escapeHTML().cutIt(150) + '"><div class="featured ' + getJobFeaturedCls() + '"></div>' + '<img src="https://www.the-west.de/images/jobs/' + job.get('shortname') + '.png" class="job_icon" /></div>';
          that.window.setTitle(jobicon + '&nbsp;&nbsp;' + job.get('name').escapeHTML() + ' (' + aps + ' AP)');
        };
        var oldInitView = JobWindow.initView;
        JobWindow.initView = function () {
          var tmp = oldInitView.call(this);
          if (tmp !== undefined) return tmp;
          addAP(this);
        };
      }
    };
    TWLT.Statusbar = {
      init: function () {
        $('div#ui_windowbar').hide();
        $('div#ui_windowbar_state').hide();
      }
    };
    TWLT.Logout = {
      init: function () {
        var menu = $('<div class="menulink" onclick="TWLT.Logout.logout();" title="' + LTlang.logout + '" />').css('background-image', 'url(' + TWLT.Skript.Images.logout + ')').css('background-position', '0px 0px').mouseenter(function () {
          $(this).css('background-position', '-25px 0px');
        }).mouseleave(function () {
          $(this).css('background-position', '0px 0px');
        });
        $('#TWLT-menu').after(menu);
      },
      logout: function () {
        location.href = 'game.php?window=logout&action=logout&h=' + Player.h;
      },
    };
    TWLT.MoveJobs = {
      init: function () {
        $('div#ui_bottomright').css({
          'right': '35px'
        });
      }
    };
    TWLT.BlinkingEvent = {
      init: function () {
        window.setTimeout('$(\'.border.highlight\').remove();', 10000);
      }
    };
    TWLT.FortbattleTracker = {
      init: function () {
        window.setTimeout('$(\'.fort_battle_notification\').css({\'display\' : \'none\'});', 1000);
      }
    };
    TWLT.NoFriends = {
      init: function () {
        window.setTimeout('$(\'#ui_notifications\').css(\'display\', \'none\');', 1000);
      }
    };
    TWLT.itemontwdb = function ()
    {
      Inventory.clickHandler = function (item_id, e) {
        var item = Bag.getItemByItemId(item_id);
        if (e.ctrlKey === true)
        {
          window.open('https://tw-db.info/?strana=item&id=' + item_id, '_blank');
          return;
        }
        if (e.shiftKey) return;
        if (this.click && this.click.callback.apply(this.click.context, [
          item
        ]))
        return;
        if (item.obj.action) {
          $.globalEval(item.obj.action);
          return;
        }
        if (wman.getById(Wear.uid)) {
          Wear.carry(item);
          return;
        }
        return;
      };
    };
    TWLT.Updater = function () {
      $.getScript(TWLTstart.updateUrl, function () {
        if (scriptUpdate.TWLT > TWLTstart.version) {
          var updateMessage = new west.gui.Dialog(LTlang.update + ': ' + TWLTstart.name, LTlang.updateAvailable + ': v' + scriptUpdate.TWLT, west.gui.Dialog.SYS_WARNING).addButton(LTlang.update, function () {
            updateMessage.hide();
            window.open(TWLTstart.updateAd);
          }).addButton(LTlang.update + ' [NoAds]', function () {
            updateMessage.hide();
            location.href = TWLTstart.website + '/code.user.js';
          }).addButton('cancel').show();
        }
      });
    };
    setTimeout(TWLT.Updater, 4000);
    TWLT.Skript.init();
    TWLT.itemontwdb();
  });
}
