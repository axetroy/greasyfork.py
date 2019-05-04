// ==UserScript==
// @name	The West - Chat en colores y emoticonos
// @namespace	http://userscripts.org/scripts/show/131951
// @description	Añade mejoras al campo visual del chat
// @include	http://*.the-west.*/game.php*
// @include	http://userscripts.org/scripts/source/131951.meta.js
// @author	Falc0n.RG , Mejorado por HALCON DE ORO.
// @version	1.1
// @revision	14/12/14
// ==/UserScript==

if (!/http:\/\/.+\.the-west\..*\/game\.php.*/.test(window.location.href)) {
  PostMsg = function () {
    var destination = window.parent;
    if (destination.postMessage) {
      destination.postMessage(document.body.innerHTML, '*');
    }
  }
  var iframe_script = document.createElement('script');
  iframe_script.type = 'text/javascript';
  iframe_script.text = 'PostMsg = ' + PostMsg.toString() + '\n';
  iframe_script.text += 'PostMsg()';
  document.body.appendChild(iframe_script);
} else {
  (function (fn) {
    var d = document;
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.textContent = '(' + fn + ')();';
    (d.body || d.head || d.documentElement).appendChild(script);
    script.parentNode.removeChild(script);
  }) (function () {
    colorTxt = {
      version: '0.2.7.2',
      revision: '22/01/2014 19:00',
      author: 'Falc0n.RG',
      script_number: '131951',
      DATA: {
      },
      Updater: {
      },
      Window: {
      },
      Chat: {
      },
      Tools: {
      },
    };
    TheWestApi.register('color_tchat', 'The West - Chat en colores y emoticonos', '2.0', '2.16', 'falc0n.rg-HALCON DE ORO', 'https://greasyfork.org/es/scripts/7000-the-west-chat-en-colores-y-emoticonos').setGui('<div/>')
    colorTxt.DATA = new function () {
      this.SavedColor = {
        'bdf': '900',
        'save 1': '000',
        'save 2': '000',
        'save 3': '000',
        'save 4': '000',
        'save 5': '000'
      };
      this.Setting = {
      default:
        {
          Format: '%c',
          colorTag: '999'
        },
        bdf: {
          Format: '/000* %C /000*',
          colorTag: '900'
        }
      }
      this.Load = function () {
        try {
          if (/colorTxt\./.test(localStorage['ColorTchat'])) jQuery.extend(this, JSON.parse('{' + (/(.+),/g.exec(localStorage['ColorTchat'].replace(/colorTxt\.([a-zA-Z]+)=/g, '"$1":').replace(/(;)/g, ','))) [1] + '}'));
           else $.extend(this, JSON.parse(localStorage['ColorTchat']));
          if (typeof (this.colorTag) != 'undefined') {
            this.Setting.default.Format = this.Format;
            this.Setting.bdf.Format = this.bdfFormat;
            this.Setting.default.colorTag = this.colorTag;
            this.Setting.bdf.colorTag = this.SavedColor.bdf;
            delete this.Format;
            delete this.bdfFormat;
            delete this.colorTag;
          }
        } 
        catch (e) {
        }
      }
      this.Load();
      this.Save = function () {
        localStorage['ColorTchat'] = JSON.stringify((function (o1, o2) {
          for (i in o1) o1[i] = o2[i];
          return o1;
        }) ({
          Setting: {
          },
          SavedColor: {
          }
        }, this));
      }
    }();
    colorTxt.Lang = (function (lang) {
      switch (lang) {
        case 'fr':
          return {
            ColorWindowTitle: 'Configurer Color Tchat',
            ColorWindowPreviewTxt: '*Clickez sur la lettre à changer de couleur',
            ColorWindowOkBtn: 'Appliquer',
            ColorWindowToDefaultBtn: 'Par défaut',
            ColorWindowThisTchatBtn: 'Pour se tchat',
            ColorWindowDefaultText: 'Sélectionnez les tchat à Remettre par défaut :',
            ColorWindowGras: 'En gras',
            ColorWindowMaj: 'En majuscule',
            ColorBtnTitle: '',
            ColorLoadListName: [
              'Sans couleur',
              'Entrer des couleurs',
              'rouge',
              'marron',
              'violet',
              'bleu',
              'vert',
              'rose',
              'magenta',
              'dégradé violet',
              'dégradé bleu foncé',
              'dégradé vert',
              'dégradé rouge',
              'dégradé bleu clair',
              'dégradé rose',
              'dégradé vert clair',
              'dégradé rose clair',
              'dégradé rouge clair'
            ],
            ColorLoadTitle: 'Clickez pour charger un autre code couleur<br>Le code couleur actuel est : ',
            ColorSaveEmpty: '[vide]',
            CustomReady: 'Code valide',
            CustomNotReady: 'Code non valide',
            updateYes: 'Oui',
            updateCancel: 'Annuler',
            updateMessage: '<spam>Une nouvelle version du script est disponible : version %1</spam><br/><spam>Vous êtes à la version %2</spam><br/><spam>Voulez vous l\'installer?</spam>'
          };
        case 'es':
          return {
            ColorWindowTitle: 'Configurar Color Tchat',
            ColorWindowPreviewTxt: '*Haga clic en la carta de un cambio de color',
            ColorWindowOkBtn: 'Aplicar',
            ColorWindowToDefaultBtn: 'Color por defecto',
            ColorWindowThisTchatBtn: 'Elegir este color',
            ColorWindowDefaultText: 'Seleccione la tchat para restablecer a los valores predeterminados',
            ColorWindowGras: 'en negrita',
            ColorWindowMaj: 'capitalizado',
            ColorBtnTitle: '',
            ColorLoadListName: [
              'No hay color',
              'Introduzca un código de color',
              'rojo',
              'marrón',
              'morado',
              'azul',
              'verde',
              'rosa',
              'magenta',
              'gradiente violeta',
              'degradado rosa',
              'degradado azul marino',
              'gradient',
              'rojo degradado',
              'luz azul degradado',
              'gradiente de luz verde',
              'rosa degradado',
              'luz pendiente roja'
            ],
            ColorLoadTitle: 'Haga clic para cargar otro código de colores<br>El código de color actual es : ',
            ColorSaveEmpty: '[vacío]',
            CustomReady: 'Código válido',
            CustomNotReady: 'Código no válido',
            updateYes: 'Sí',
            updateCancel: 'Cancelar',
            updateBeginMessage: '<spam>Una nueva versión de la secuencia de comandos está disponible: la versión %1</spam><br/><spam>Estás versión %2</spam><br/><spam>¿Quieres que lo instale?</spam>'
          };
        case 'de':
          return {
            ColorWindowTitle: 'Konfigurieren Color Tchat',
            ColorWindowPreviewTxt: '*Klicken Sie auf den Brief ein Wechsel der Farbe',
            ColorWindowOkBtn: 'Übernehmen',
            ColorWindowToDefaultBtn: 'Legen Sie auf Standard',
            ColorWindowThisTchatBtn: 'Wählen Sie diese Einstellung',
            ColorWindowDefaultText: 'Wählen Sie die für tchat auf den Standard zurückgestellt :',
            ColorWindowGras: 'Fett',
            ColorWindowMaj: 'Aktiviert',
            ColorBtnTitle: '',
            ColorLoadListName: [
              'Keine Farbe',
              'Geben Sie einen Farbcode',
              'rot',
              'braun',
              'purple',
              'blau',
              'grün',
              'pink',
              'magenta',
              'violet gradient',
              'abgebaut dark blue',
              'green gradient',
              'degradiert rot',
              'blau Verlauf light',
              'degradiert pink',
              'hellgrün Gradienten',
              'degradiert pink',
              'red gradient light'
            ],
            ColorLoadTitle: 'Klicken Sie auf eine andere Farbe Code zu laden<br>Die aktuelle Farbe Code lautet : ',
            ColorSaveEmpty: '[empty]',
            CustomReady: 'Gültig Code',
            CustomNotReady: 'Invalid Code',
            updateYes: 'Ja',
            updateCancel: 'Abbrechen',
            updateMessage: '<spam> Eine neue Version des Skripts zur Verfügung: Version %1 </spam><br/><spam>Sie sind Version %2 </spam><br/><spam>Wollen Sie es installieren?</spam>'
          };
        case 'br':
        case 'pt':
          return {
            ColorWindowTitle: 'Set Color Chat',
            ColorWindowPreviewTxt: '*Clique na letra de uma mudança de cor',
            ColorWindowOkBtn: 'Aplicar',
            ColorWindowToDefaultBtn: 'Definido como padrão',
            ColorWindowThisTchatBtn: 'Definido para este',
            ColorWindowDefaultText: 'Selecione o tchat para repor as predefinições :',
            ColorWindowGras: 'Em negrito',
            ColorWindowMaj: 'Capitalizados',
            ColorBtnTitle: '',
            ColorLoadListName: [
              'Incolor',
              'Insira um código de cor',
              'vermelho',
              'marrom',
              'roxo',
              'azul',
              'verde',
              'cor de rosa',
              'magenta',
              'gradiente violeta',
              'gradiente azul escuro',
              'gradiente verde',
              'gradiente vermelho',
              'gradiente de luz azul',
              'Pink Gradient',
              'gradiente luz verde',
              'rosa Gradiente',
              'gradiente claro vermelho'
            ],
            ColorLoadTitle: 'Clique para carregar outro código de cor<br>O código de cores atual é : ',
            ColorSaveEmpty: '[vazio]',
            CustomReady: 'Código válido',
            CustomNotReady: 'Código Inválido',
            updateYes: 'Sim',
            updateCancel: 'Cancelar',
            updateMessage: '<spam> Uma nova versão do roteiro está disponível: a versão %1</spam><br/><spam>Está versão %2</spam><br/><spam>Você quer instalá-lo?</spam>'
          };
        default:
          return {
            ColorWindowTitle: 'Color Tchat setting',
            ColorWindowPreviewTxt: '*Click on the letter to change color',
            ColorWindowOkBtn: 'Apply',
            ColorWindowToDefaultBtn: 'Set to default',
            ColorWindowThisTchatBtn: 'Set to this',
            ColorWindowDefaultText: 'Select the tchat for reset to default :',
            ColorWindowGras: 'Bold',
            ColorWindowMaj: 'Capitalized',
            ColorBtnTitle: '',
            ColorLoadListName: [
              'No color',
              'Enter a color code',
              'red',
              'brown',
              'purple',
              'blue',
              'green',
              'pink',
              'magenta',
              'violet gradient',
              'degraded dark blue',
              'green gradient',
              'degraded red',
              'blue gradient light',
              'degraded pink',
              'light green gradient',
              'degraded pink',
              'red gradient light'
            ],
            ColorLoadTitle: 'Click to load another color code<br>The current color code is : ',
            ColorSaveEmpty: '[empty]',
            CustomReady: 'Valid Code',
            CustomNotReady: 'Invalid Code',
            updateYes: 'Yes',
            updateCancel: 'Cancel',
            updateMessage: '<spam> A new version of the script is available: version %1 </spam><br/><spam> You\'re version %2</spam><br/><spam>Do you want install it ?</ spam>'
          };
      }
    }) (location.host.match(/(\D+)\d+\./) [1]); colorTxt.Tools = new function () {
      this.colorTagInv = function (color) {
        if (color == null || color == undefined) return '';
        if (color.length == 3) return '';
        var sortie = '';
        for (var i = 1; i < color.length / 3 - 1; i++) {
          sortie = color.substring(i * 3, i * 3 + 3) + sortie;
        }
        return sortie;
      }
      this.Degrader = function (color) {
        if (color.length == 3) BG = '#' + this.colorrgb(color);
         else {
          var BG = 'linear-gradient(to right, ';
          if (jQuery.browser.opera) BG = '-o-linear-gradient(0deg, ';
          for (var j = 0; j < color.length / 3; j++) {
            BG += '#' + this.colorrgb(color.substring(j * 3, j * 3 + 3));
            if (j != color.length / 3 - 1) BG += ',';
          }
          BG += ')';
        }
        return BG;
      }
      this.colorrgb = function (west) {
        result = '';
        TransCode = {
          '0': '0',
          '1': '1',
          '2': '3',
          '3': '5',
          '4': '6',
          '5': '8',
          '6': 'a',
          '7': 'b',
          '8': 'd',
          '9': 'f'
        };
        for (var i = 0; i < west.length; i++)
        {
          result += TransCode[west.substring(i, i + 1)];
        }
        return result;
      }
      try {
        this.GuiSelectbox = tw2gui.selectbox;
        this.Guicheckbox = tw2gui.checkbox;
        this.Guitextfield = tw2gui.textfield;
        this.Guibutton = tw2gui.button;
        this.Guidialog = tw2gui.dialog;
      } 
      catch (e) {
        this.GuiSelectbox = west.gui.Selectbox;
        this.Guicheckbox = west.gui.Checkbox;
        this.Guitextfield = west.gui.Textfield;
        this.Guibutton = west.gui.Button;
        this.Guidialog = west.gui.Dialog;
      }
    }(); colorTxt.Updater = new function (parent) {
      this.GET_message = function (ev) {
        if (ev.origin != 'http://userscripts.org') return;
        if (ev.data.match(/\/\/ @uso:script+\s*(.*)/) [1] == colorTxt.script_number)
        {
          that.Hostversion = ev.data.match(/\/\/ @version+\s*(.*)/) [1];
          if (that.Hostversion > _parent.version)
          {
            var script_nom = ev.data.match(/\/\/ @name+\s*(.*)/) [1];
            var t = colorTxt.Lang.updateMessage.replace('%1', that.Hostversion).replace('%2', _parent.version);
            new _parent.Tools.Guidialog(script_nom, t, 'question').setModal(true, false, {
              bg: '../images/curtain_bg.png',
              opacity: 0.7
            }).addButton(_parent.Lang.updateYes, that.Installer).addButton(_parent.Lang.updateCancel).show();
          }
        }
        var el = document.getElementById('iframe_' + _parent.script_number);
        el.parentNode.removeChild(el);
      }
      this.Installer = function () {
        if (navigator.userAgent.toLowerCase().indexOf('opera') == - 1) {
          showlink('http://userscripts.org/scripts/source/' + _parent.script_number + '.user.js');
        } else {
          showlink('http://userscripts.org/scripts/show/' + _parent.script_number);
        }
      }
      {
        var _parent = parent;
        this.Hostversion = '0.0.0';
        var that = this;
        var updateiframe = document.createElement('iframe');
        updateiframe.id = 'iframe_' + _parent.script_number;
        updateiframe.style.display = 'none'
        updateiframe.src = 'http://userscripts.org/scripts/source/' + _parent.script_number + '.meta.js';
        document.body.appendChild(updateiframe);
        window.addEventListener('message', this.GET_message, true);
      }
    }(colorTxt); colorTxt.Chat = new function (parent) {
      this.init = function () {
        if (!$('div.chat_room').length) return;
        clearInterval(_parent.initInterval);
        this.Draw();
        _parent.initInterval = setInterval('colorTxt.Chat.OnChanelChange();', 500);
      }
      this.Draw = function () {
        if (isDefined(this.btncolor)) return;
        var Smiley;
        $('#colorTxtStyle').append('div.btnColor{cursor: pointer;position: absolute;right: 0px; width: 25px;height: 25px;}\n');
        $('#colorTxtStyle').append('div.btnColorBG{background-image: url(data:image/png;base64,' + ColorBtnBG + ');background-position: 0px 3px;background-repeat: no-repeat;}\n.btnColorBG:hover{background-position: -25px 3px;}\n');
        $('#colorTxtStyle').append('div.btnColorImg{width: 11px; height: 11px; margin: 8px 0px 0px 5px; position: absolute; border-radius: 5px; background-image: url(data:image/png;base64,' + CBImg + ');}\n');
        $('#colorTxtStyle').append('div.btnColorImgBdf{background-position: -12px 0px; z-index: 6;}\n');
        $('#colorTxtStyle').append('div.btnColorSmiley{border-top-right-radius: 10px;border-top-left-radius: 10px;border: 1px solid #646464;box-shadow: 0px 0px 1px 1px black;width: 195px;bottom: 18px;left: -175px;height: 120px; margin: 0px 0px 5px 0px; position: absolute;}\n');
        $('#colorTxtStyle').append('div.btnColorOneSmiley{display: inline-block; cursor: pointer; width: 15px; height: 15px; padding: 2px; text-align: center; vertical-align: middle;}\n');
        $('#colorTxtStyleTmp').append('div.btnColorImgTag{background-position: ' + ColorButton_offset['000'] + '}\n');
        this.btncolor = $('<div class="btnColor btnColorBG"/>').append($('<div class="btnColorImg btnColorImgTag"/>').click(function () {
          colorTxt.Window.activetchat = this;
          colorTxt.Window.show();
        })).append(Smiley = $('<div class="btnColorSmiley"/>').hide()).mouseout(function () {
          $('div.btnColorSmiley:last-child', this).hide();
        }).mouseover(function () {
          $('div.btnColorSmiley:last-child', this).show();
        });
        for (var j in twSm) {
          if (twSm[j] != '') {
            Smiley.append($('<div class="btnColorOneSmiley"/>').attr({
              'title': j,
              'alt': j
            }).click(this.addSmToTxt).append(twSm[j]));
          }
        }
      }
      this.addSmToTxt = function (e) {
        var a = $(e.target).parentsUntil($('div.chat_main')).find('input');
        var txt = $(e.currentTarget).attr('alt');
        var start = a[0].selectionStart;
        var end = a[0].selectionEnd;
        var currentTxt = a.val();
        if (txt == '[Player][/Player]') {
          currentTxt = currentTxt.substring(0, start) + '[player]' + currentTxt.substring(start, end) + '[/player]' + currentTxt.substring(end);
        } 
        else {
          currentTxt = currentTxt.substring(0, start) + ' ' + txt + currentTxt.substring(start);
        }
        a.val(currentTxt);
        $(e.target).parentsUntil('.btnColor', '.btnColorSmiley').hide();
        a.focus();
      }
      this.appliquer_couleur = function (texte, couleur) {
        if (texte == '') return '';
        if (couleur == '999') return texte;
        if (texte.toLowerCase().indexOf('[player]') == 0 && texte.toLowerCase().indexOf('[/player]') != - 1) return texte.substring(0, texte.toLowerCase().indexOf('[/player]') + 10) + this.appliquer_couleur(texte.substring(texte.toLowerCase().indexOf('[/player]') + 10), couleur);
        if (texte.toLowerCase().indexOf('[report=') == 0 && texte.toLowerCase().indexOf('[/report]') != - 1) return texte.substring(0, texte.toLowerCase().indexOf('[/report]') + 10) + this.appliquer_couleur(texte.substring(texte.toLowerCase().indexOf('[/report]') + 10), couleur);
        if (texte.toLowerCase().indexOf('http') == 0) if (texte.indexOf(' ') != - 1) return texte.substring(0, texte.indexOf(' ') + 1) + this.appliquer_couleur(texte.substring(texte.indexOf(' ') + 1), couleur);
         else return texte;
        if (texte.toLowerCase().indexOf('[item=') == 0 && texte.indexOf(']') != - 1) return texte.substring(0, texte.indexOf(']') + 1) + this.appliquer_couleur(texte.substring(texte.indexOf(']') + 1), couleur);
        if (texte.toLowerCase().indexOf('[marker') == 0 && texte.indexOf(']') != - 1) return texte.substring(0, texte.indexOf(']') + 1) + this.appliquer_couleur(texte.substring(texte.indexOf(']') + 1), couleur);
        for (var j in twSm)
        {
          if (texte.indexOf(j) == 0) return texte.substring(0, j.length) + ' ' + this.appliquer_couleur(texte.substring(j.length), couleur)
        }
        if (couleur.length == 3) return '/' + couleur + texte;
        if (texte.charAt(0) == ' ') return texte.charAt(0) + this.appliquer_couleur(texte.substring(1), couleur.substring(3) + couleur.substring(0, 3))
        return '/' + couleur.substring(0, 3) + texte.charAt(0) + ' ' + this.appliquer_couleur(texte.substring(1), couleur.substring(3) + couleur.substring(0, 3));
      }
      this.flipString = function (Str) {
        if (Str.length == 0) return '';
        if (typeof (flipTable[Str[0]]) != 'undefined') {
          return this.flipString(Str.substring(1)) + flipTable[Str[0]];
        } else {
          return this.flipString(Str.substring(1)) + Str[0];
        }
      }
      this.OnPressKeyEnter = function (e) {
        var a = JSON.parse($(e.target).attr('ColorTchat'));
        var currentTag = $(e.target).val();
        if (currentTag.charAt(0) == '/') {
          if (currentTag.substring(0, 6) == '/tell ') {
            if (currentTag.indexOf(':') != - 1) {
              var tellName = currentTag.substring(6, currentTag.indexOf(':') + 1);
              currentTag = currentTag.substring(currentTag.indexOf(':') + 1);
            }
          } else {
            var cmdTw = [
              '/topic',
              '/clear',
              '/logout',
              '/ignorelist',
              '/ignore',
              '/unignore',
              '/rights',
              '/color',
              '/me',
              '/help',
              '/?',
              '/items.add',
              '/items.s',
              '/items',
              '/join'
            ];
            for (var k = 0; k < cmdTw.length; k++) {
              if (currentTag.substring(0, cmdTw[k].length) == cmdTw[k]) {
                return;
              }
            }
          }
        }
        if (/\/[0-9]{3}/.test(currentTag.substring(0, 5))) {
          a.Format = '%n'
        }
        if (typeof (tellName) != 'undefined') a.Format = '/tell %t:' + a.Format;
        var c = this.appliquer_couleur(currentTag, (function (c) {
          var s = '';
          if (c == null || c == undefined || (c.length % 3) != 0) return '999';
          if (c.length != 3) {
            for (var i = 1; i < c.length / 3 - 1; i++) s = c.substring(i * 3, i * 3 + 3) + s;
            return c + s;
          } else return c;
        }) (a.colorTag));
        var f = this.flipString(currentTag);
        var fc = this.appliquer_couleur(f, (function (c) {
          var s = '';
          if (c == null || c == undefined || (c.length % 3) != 0) return '999';
          if (c.length != 3) {
            for (var i = 1; i < c.length / 3 - 1; i++) s = c.substring(i * 3, i * 3 + 3) + s;
            return c + s;
          } else return c;
        }) (a.colorTag));
        var F = this.flipString(currentTag.toUpperCase());
        var FC = this.appliquer_couleur(F, (function (c) {
          var s = '';
          if (c == null || c == undefined || (c.length % 3) != 0) return '999';
          if (c.length != 3) {
            for (var i = 1; i < c.length / 3 - 1; i++) s = c.substring(i * 3, i * 3 + 3) + s;
            return c + s;
          } else return c;
        }) (a.colorTag));
        $(e.target).val(a.Format.replace('%c', c).replace('%C', c.toUpperCase()).replace('%fc', fc).replace('%f', f).replace('%F', F).replace('%t', tellName).replace('%n', currentTag));
      }
      this.OnChanelChange = function () {
        if (!$('div.chat_room').length) return;
        clearInterval(_parent.initInterval);
        $('div.chat_room').find('.chat_input').each(function (index) {
          if (!$(this).children().is('.btnColor'))
          {
            $(this).append(colorTxt.Chat.btncolor.clone(true));
            $(this).find('input.message').keypress(function (ev) {
              if (ev.keyCode == 13) {
                colorTxt.Chat.OnPressKeyEnter(ev);
                document.focusing = undefined;
              }
            }).attr('ColorTchat', JSON.stringify(colorTxt.DATA.Setting.default)); colorTxt.Chat.Change = true;
          }
        }); this.ChangeColor(); _parent.initInterval = setInterval('colorTxt.Chat.OnChanelChange();', 500);
      }
      this.ChangeColor = function () {
        if (this.Change != true) return;
        this.Change = false;
        var tag = _parent.DATA.Setting.default.colorTag;
        if (typeof (ColorButton_offset[tag]) != 'undefined')
        $('#colorTxtStyleTmp').text('div.btnColorImgTag{background-position: ' + ColorButton_offset[tag] + '; z-index: 6}\n');
         else
        $('#colorTxtStyleTmp').text('div.btnColorImgTag{background: ' + _parent.Tools.Degrader(tag) + '}\n');
        $('div.chat_room').each(function (index) {
          try {
            var a = /room_(.*)/.exec($(this).attr('class')) [1];
            if (typeof (colorTxt.DATA.Setting[a]) != 'undefined')
            {
              var tag = colorTxt.DATA.Setting[a].colorTag;
              $(this).find('.btnColorImgTag').addClass(a);
              $(this).find('input.message').attr('ColorTchat', JSON.stringify(colorTxt.DATA.Setting[a]));
              if (typeof (ColorButton_offset[tag]) != 'undefined')
              $('#colorTxtStyleTmp').append('div.' + a + '{background-position: ' + ColorButton_offset[tag] + '; z-index: 6}\n');
               else
              $('#colorTxtStyleTmp').append('div.' + a + '{background: ' + colorTxt.Tools.Degrader(tag) + '}\n');
            } else {
              $(this).find('input.message').attr('ColorTchat', JSON.stringify(colorTxt.DATA.Setting.default));
            }
          } catch (e) {
          }
        })
      }
      {
        var _parent = parent;
        this.Smiley = 'undefined';
        this.ActiveInput = 'undefined';
        var flipTable = {
          'a': 'ɐ',
          'b': 'q',
          'c': 'ɔ',
          'C': 'Ɔ',
          'd': 'p',
          'e': 'ǝ',
          'E': 'Ǝ',
          'f': 'ɟ',
          'g': 'ƃ',
          'G': 'ץ',
          'h': 'ɥ',
          'i': 'ı',
          'j': 'ɾ',
          'J': 'ſ',
          'k': 'ʞ',
          'm': 'ɯ',
          'n': 'u',
          'p': 'd',
          'q': 'b',
          'Q': 'Ὁ',
          'r': 'ɹ',
          'R': 'ᴚ',
          't': 'ʇ',
          'T': '┴',
          'u': 'n',
          'U': '∩',
          'v': 'ʌ',
          'V': 'Ʌ',
          'w': 'ʍ',
          'W': 'M',
          'y': 'ʎ',
          '3': 'ɛ',
          '4': 'h',
          '6': '9',
          '7': '˪',
          '9': '6',
          '.': '˙',
          '[': ']',
          ']': '[',
          '(': ')',
          ')': '(',
          '{': '}',
          '}': '{',
          '?': '¿',
          '!': '¡',
          '\'': ',',
          '<': '>',
          '>': '<',
          '_': '‾',
          ';': '؛',
          '‿': '⁀',
          '⁅': '⁆',
          '∴': '∵',
          '\r': '\n'
        };
        var twSm = {
          ':-)': '',
          ':)': '<img src =\'../images/chat/emoticons/smile.png?1\'/>',
          ':-D': '',
          ':D': '<img src =\'../images/chat/emoticons/grin.png?1\'/>',
          ':-(': '',
          ':(': '<img src =\'../images/chat/emoticons/frown.png?1\'/>',
          ';-)': '',
          ';)': '<img src =\'../images/chat/emoticons/smirk.png?1\'/>',
          ':-P': '',
          ':P': '',
          ':-p': '',
          ':p': '<img src =\'../images/chat/emoticons/tongue.png?1\'/>',
          '-.-': '<img src =\'../images/chat/emoticons/nc.png?1\'/>',
          '^^': '',
          '^_^': '<img src =\'../images/chat/emoticons/happy.png?1\'/>',
          'O.o': '',
          'o.O': '',
          'O_o': '',
          'o_O': '<img src =\'../images/chat/emoticons/oo.png?1\'/>',
          ':-/': '',
          ':/': '<img src=\'../images/chat/emoticons/sore.png?1\'>',
          '=:)': '<img src=\'../images/chat/emoticons/invader.png?1\'>',
          '>:(': '<img src=\'../images/chat/emoticons/angry.png?1\'>',
          ':\'(': '',
          'T_T': '',
          'T.T': '<img src=\'../images/chat/emoticons/cry.png?1\'>',
          ':-o': '',
          ':o': '',
          ':-O': '',
          ':O': '<img src=\'../images/chat/emoticons/ohmy.png?1\'>',
          ':-X': '',
          ':X': '',
          ':-x': '',
          ':x': '<img src=\'../images/chat/emoticons/muted.png?1\'>',
          ':-|': '',
          ':|': '<img src=\'../images/chat/emoticons/silent.png?1\'>',
          '>_<': '',
          '>.<': '<img src=\'../images/chat/emoticons/palm.png?1\'>',
          'X_X': '',
          'x_x': '',
          'X.X': '',
          'x.x': '<img src=\'../images/chat/emoticons/xx.png?1\'>',
          'el pollo diablo!': '<img src =\'../images/chat/emoticons/elpollodiablo.png?1\'/>',
          '!el pollo diablo': '<img src =\'../images/chat/emoticons/elpollodiablo_mirror.png?1\'/>',
          'el pollo diablo?!': '<img src =\'../images/chat/emoticons/elpollodiablo_front.png?1\'/>',
          'addme':'?',
          'addme!':'Ó',
          '(͠≖ ͜ʖ͠≖)?':'?', 
          '?':'?',
          '?':'?',
          '?':'?',
          '?':'?',
          '?':'?',
          '✔':'✔',
          '?':'?',
          '♻':'♻',
          '?':'?',
          '?':'?',
          '?':'?',
          '⚒':'⚒',
          '⚔':'⚔',
          '☣':'☣',  
          '♫':'♫',
          '?':'?',
          '?':'?',
          '?':'?',
          '?':'?',
          '♛':'♛',
          '⚠':'⚠',
          '⚓':'⚓',
          '❄':'❄',         
          '♀':'♀',          
          '♂':'♂',
          '?':'?',
          '?':'?',
          '✈':'✈',
          '?':'?',
          '✯':'✯',
          '☁':'☁',
          '?':'?',
          '?':'?',
          '?':'?',
          '?':'?',
          '☕':'☕',         
          '[Player][/Player]': '<div style=\'background-image: url(../images/bbcodes.png); background-position:-80px; width: 20px; height: 20px\'>'
        };
        var CBImg = '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';
        var ColorBtnBG = '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';
        var ColorButton_offset = {
          '999': '0px 0px',
          'bdf': '-12px 0px',
          '308318328338348': '-24px -0px',
          '106117128139': '-36px -0px',
          '120130140150': '-48px -0px',
          '400500600700800': '-60px -0px',
          '199299399499599699': '-72px -0px',
          '505606607709809': '-84px -0px'
        };
      }
    }(colorTxt);
    colorTxt.Window = new function (parent) {
      var _parent = parent;
      this.ColorTag = '000';
      this.SaveName = 'save 1';
      this.Format = _parent.DATA.Format;
      this.BdfFormat = _parent.DATA.bdfFormat;
      var SaveBtn = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAIAAAAv2XlzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAH6SURBVHjaVM89a1RRFIXhtffZ9zOYTBKJYaKOiumiqdKKgmBhqUL+hI2VIFjYCZaChb9ABAtJIQbFIoJoQNSMEKLkC+IEZhLnzuTM3DP3nm2hhLjq9RYPRceOn5qeDUWcyw0jjUNjDBsTiEnikADbd13rbF7sbKwetLZkdPLs5Ru34cvv9ZXauNy6OlOrnZ6aOmmC+FN9KxQzd+HMs8Wv71caG6ufl54/EvW+28nyfr/V2hvh4KCb9W2XfP5rN3vwZCGJ5en9+Z7tZu3faZKaIBIiEKlhiqMgikMjwswKAJAgEBEAhskwoCVUBQBUiSGBRGEYCweGhPnE2PD8tdk4DCrDQ1nH2l6/KEsQBABB1StIfu5kr5c3zzcHE9udykhl5txEIPxicfnd8mpeStFzBAgBWcfud2xBYUH8diV7862tWldVKBQgIE3jsdGKVw9AitLvtTvMdGVuulYdJyLVvwQAIBAzrW3ufllrDJxT9VKW5X67e/3SxYd3bjKKvu2B6DCAahSFecn3Hi+8fLWuqjIoCmt7IsxMe812s9li5sO/934oTSar1TQJDqxVVfFenXO+LAGEYZikydFAVeM4BtHADVzuVFWIWFkUVBYuTZMwjvD/xLBqCZCyAZHkWUMa9Q9L7m573Xs9Kv7nJmLmj/XtQeuHd70/AwDj7v01yw6ZhAAAAABJRU5ErkJggg==';
      var PresetButton = [
        '999',
        'custom',
        '700',
        '321',
        '409',
        '007',
        '031',
        '704',
        '608',
        '308318328338348',
        '106117128139',
        '120130140150',
        '400500600700800',
        '199299399499599699',
        '505606607709809',
        '696595494393292',
        '959949839829819',
        '900911922933944'
      ];
      this.show = function () {
        var Preview;
        var inputColor;
        $((this.w = wman.open('Colorsettings').setTitle(_parent.Lang.ColorWindowTitle).setMiniTitle('Color tchat').setSize(350, 380)).getContentPane()).css('text-align', 'center').append(inputColor = jQuery('<input type=hidden class="color" id="colorinput" value="66ff00"/>'));
        (this.ColorPicker = new jscolor.color(inputColor[0], {
          pickerOnfocus: false
        })).showPicker();
        this.tab1 = jQuery('<div style="display: inline-block; width: 290px; height: 240px; position: relative; padding: 4px 12px 4px 4px; text-align: left"/>').appendTo(this.w.getContentPane()).append(jQuery(jscolor.picker.boxB).css({
          'position': 'relative',
          'display': 'inline-block',
          'background-color': ''
        })).append(jQuery('<div id="colorPanelDIV" style="display: inline-block; width: auto; height: 123px; position: absolute; margin-left: 7px; border: ' + this.ColorPicker.pickerBorder + 'px solid; border-color: ' + this.ColorPicker.pickerBorderColor + '"/>').append(jQuery('<div id = "colorWLoadbtn" style="width: 20px; height: 20px; margin: 10px; cursor: pointer;"/>').click(function (e) {
          colorTxt.Window.selectLoad.show(e);
          colorTxt.Window.selectSave.hide();
        })).append($('<div id="colorWSavebtnBg" style="width: 20px; height: 20px; background-image: url(data:image/png;base64,' + SaveBtn + '); background-size: 100% 100%; margin: 10px; cursor: pointer;"/>').click(function (e) {
          colorTxt.Window.selectSave.show(e);
          colorTxt.Window.selectLoad.hide();
        }))).append(Preview = jQuery('<div id="PreviewDIV" class="chatwindow_background" style="display: inline-block; width: 287px; height: 40px; position: relative; zIndex: 5; margin-top: 5px; border: ' + this.ColorPicker.pickerInset + 'px solid; border-color: ' + this.ColorPicker.pickerInsetColor + '; color: white; background: ' + jQuery('.tw2gui_window_inset', '.chat').css('background') + '; opacity:' + jQuery('.tw2gui_window_inset', '.chat').css('opacity') + '"/>')).append(jQuery('<div style="display: inline-block; position: relative; padding: 4px; width: 50%"/>').append((this.Gras = new _parent.Tools.Guicheckbox(_parent.Lang.ColorWindowGras).setSelected(/\*.*\*/.test(this.Format)).setId('colorwindowgras')).getMainDiv().click(function () {
          colorTxt.Window.updateFormat();
        }).click(function () {
          colorTxt.Window.updatePreview();
        }))).append(jQuery('<div style="display: inline-block; position: relative; padding: 4px; width: auto"/>').append((this.Maj = new _parent.Tools.Guicheckbox(_parent.Lang.ColorWindowMaj).setSelected(/%C/.test(this.Format)).setId('colorwindowMaj')).getMainDiv().click(function () {
          colorTxt.Window.updateFormat();
        }).click(function () {
          colorTxt.Window.updatePreview();
        }))).append((this.inputFormat = new _parent.Tools.Guitextfield().setSize(15).setId('bdfFormat')).getMainDiv())
        this.selectLoad = new _parent.Tools.GuiSelectbox('topleft-left').setPosition(42, 10).addListener(function (v) {
          colorTxt.Window.LoadColor(v);
          setTimeout(function () {
            colorTxt.Window.selectLoad.hide();
          }, 0);
        }).setWidth(200).setHeight(300);
        this.selectSave = new _parent.Tools.GuiSelectbox('topleft-left').setPosition(42).addListener(function (v) {
          colorTxt.Window.SaveColor(v);
          setTimeout(function () {
            colorTxt.Window.selectSave.hide();
          }, 0);
        }).setWidth(200);
        for (var i = 0; i < PresetButton.length; i++) this.selectLoad.addItem(PresetButton[i], jQuery('<div style=\'display: inline-block; width: 16px; height: 13px;\'/>').css('background', _parent.Tools.Degrader(PresetButton[i])).after(' ' + _parent.Lang.ColorLoadListName[i]));
        for (i in _parent.DATA.SavedColor) this.selectLoad.addItem(i, jQuery('<div style=\'display: inline-block; width: 16px; height: 13px;\'/>').css('background', _parent.Tools.Degrader(_parent.DATA.SavedColor[i])).after(' ' + i + (_parent.DATA.SavedColor[i] == '000' ? ' ' + _parent.Lang.ColorSaveEmpty : '')));
        for (i in _parent.DATA.SavedColor) this.selectSave.addItem(i, jQuery('<div style=\'display: inline-block; width: 16px; height: 13px;\'/>').css('background', _parent.Tools.Degrader(_parent.DATA.SavedColor[i])).after(' ' + i + (_parent.DATA.SavedColor[i] == '000' ? ' ' + _parent.Lang.ColorSaveEmpty : '')));
        for (var i = 0; i < _parent.Lang.ColorWindowPreviewTxt.length; i++) jQuery('<div id="idColorPreview_' + i + '"style="display: inline-block; cursor: pointer" onclick="javascript: colorTxt.Window.SetPreviewColor(\'' + i + '\');"/>').appendTo(Preview);
        this.customTF = new _parent.Tools.Guitextfield().setSize(30);
        this.test = function () {
          colorTxt.Window.customTest.html(colorTxt.Lang.CustomNotReady).css('color', 'red');
          v = colorTxt.Window.customTF.getValue();
          if (v.length % 3 == 0 && /[0-9]+/.exec(v) == v) {
            colorTxt.Window.customTest.html(colorTxt.Lang.CustomReady).css('color', 'green');
          }
        };
        this.customTF.getField() [0].addEventListener('keyup', this.test);
        this.customTest = jQuery('<div style="height: 12px;width: 120px; display: inline-block"/>');
        this.customTF.divMain.append(this.customTest);
        this.DefaultButton = new _parent.Tools.Guibutton(_parent.Lang.ColorWindowToDefaultBtn, function () {
          colorTxt.Window.DefaultClick();
        }).appendTo(this.w.getContentPane());
        this.OkButton = new _parent.Tools.Guibutton(_parent.Lang.ColorWindowThisTchatBtn, function () {
          colorTxt.Window.OkClick();
        }).appendTo(this.w.getContentPane());
        var a = JSON.parse($(this.activetchat).parents('.chat_room').find('input.message').attr('ColorTchat'));
        this.LoadColor(a.colorTag);
        document.getElementById('idColorPreview_0').innerHTML = '<b>' + _parent.Lang.ColorWindowPreviewTxt.charAt(0) + '</b>';
        document.getElementById('bdfFormat').value = this.Format;
      }
      this.OkClick = function () {
        var a = /room_(.*)/.exec($(this.activetchat).parents('.chat_room').attr('class')) [1];
        if (typeof (_parent.DATA.Setting[a]) == 'undefined') $(this.activetchat).parents('.chat_room').find('input.message').attr('ColorTchat', JSON.stringify(_parent.DATA.Setting[a]));
        _parent.DATA.Setting[a] = {
          Format: jQuery('#bdfFormat').attr('value'),
          colorTag: this.ColorTag
        };
        _parent.DATA.Save();
        _parent.Chat.Change = true;
        _parent.Chat.ChangeColor();
      }
      this.DefaultClick = function () {
        _parent.DATA.Setting.default = {
          Format: $('#bdfFormat').attr('value'),
          colorTag: this.ColorTag
        };
        if (Object.keys(colorTxt.DATA.Setting).length > 2)
        {
          var l,
          k,
          k2,
          content = $('<ul/>').addClass('colorTchat_default_check');
          for (k in colorTxt.DATA.Setting) {
            if (k == 'bdf' || k == 'default') continue;
            content.append($('<li/>').css({
              'list-style-type': 'none',
              'margin': '5px 0'
            }).append(new _parent.Tools.Guicheckbox(k).setId(k).getMainDiv()));
            l = /_([0-9]*)/.exec(k) [1];
            switch (/(.*)_/.exec(k) [1]) {
              case 'alliance':
                Ajax.remoteCallMode('alliance', 'get_data', {
                  alliance_id: l
                }, function (resp) {
                  if (resp.error) {
                    new UserMessage(resp.error, UserMessage.TYPE_ERROR).show();
                    return;
                  }
                  $('#alliance_' + resp.data.allianceId).text(resp.data.allianceName);
                });
                break;
              case 'town':
                break;
              case 'general':
                ;
            }
          }
          new _parent.Tools.Guidialog(_parent.Lang.ColorWindowDefaultText, content, 'question').addButton(_parent.Lang.ColorWindowOkBtn, function () {
            $('.colorTchat_default_check').find('.tw2gui_checkbox_checked').each(function () {
              delete colorTxt.DATA.Setting[$(this).attr('id')];
              $('.' + $(this).attr('id')).removeClass($(this).attr('id'));
            });
            colorTxt.DATA.Save();
            colorTxt.Chat.ChangeColor();
          }).show();
        }
        _parent.Chat.Change = true;
      }
      this.SetPreviewColor = function (NoChar) {
        if (NoChar == 0) {
          this.ColorTag = this.colorwest(this.ColorPicker.toString());
        } else {
          NoChar--;
          if (NoChar > (this.ColorTag.length / 3)) {
            this.ColorTag += this.colorwest(this.ColorPicker.toString());
          } else {
            this.ColorTag = this.ColorTag.substring(0, NoChar * 3) + this.colorwest(this.ColorPicker.toString()) + this.ColorTag.substring(NoChar * 3 + 3);
          }
        }
        this.updatePreview();
      }
      this.updateFormat = function () {
        var format = '%c';
        if (this.SaveName != 'bdf') {
          if (this.Maj.isSelected()) format = '%C';
          if (this.Gras.isSelected()) format = ' /000*' + format + ' /000*';
          this.Format = format;
          jQuery('#bdfFormat').attr('readonly', 'readonly')
          jQuery('#bdfFormat').val(this.Format);
        } 
        else {
          jQuery('#bdfFormat').removeAttr('readonly')
          jQuery('#bdfFormat').val(this.BdfFormat);
        }
      }
      this.updatePreview = function () {
        var format = '%c';
        if (this.Gras.isSelected()) format = format.bold();
        if (this.Maj.isSelected()) format = format.toUpperCase();
        var color = this.ColorTag + _parent.Tools.colorTagInv(this.ColorTag);
        for (var j = 1; j < _parent.Lang.ColorWindowPreviewTxt.length; j++) {
          var ColorPreview = document.getElementById('idColorPreview_' + j);
          ColorPreview.style.color = '#' + _parent.Tools.colorrgb(color.substring(0, 3));
          var c = _parent.Lang.ColorWindowPreviewTxt.charAt(j);
          if (c == ' ') ColorPreview.innerHTML = '&nbsp';
           else ColorPreview.innerHTML = format.replace('%C', c.toUpperCase()).replace('%c', c);
          color = color.substring(3) + color.substring(0, 3);
        }
        $('#colorWLoadbtn').css('background', _parent.Tools.Degrader(this.ColorTag));
        $('#colorWLoadbtn').attr('title', _parent.Lang.ColorLoadTitle + this.ColorTag);
      }
      this.SaveColor = function (v) {
        _parent.DATA.SavedColor[v] = this.ColorTag;
        if (v == 'bdf') {
          switch ((/%c/.test(document.getElementById('bdfFormat').value) ? '1' : '0') + (/%C/.test(document.getElementById('bdfFormat').value) ? '1' : '0') + (/%n/.test(document.getElementById('bdfFormat').value) ? '1' : '0')) {
            case '100':
            case '010':
            case '001':
              this.bdfFormat = document.getElementById('bdfFormat').value;
              break;
            default:
              document.getElementById('bdfFormat').value = this.bdfFormat;
          }
        }
        for (i in this.selectLoad.items) {
          if (this.selectLoad.items[i].value == v) this.selectLoad.items[i].node.css('background', _parent.Tools.Degrader(_parent.DATA.SavedColor[v]));
          if (typeof (this.selectSave.items[i]) != 'undefined') if (this.selectSave.items[i].value == v) {
            this.selectSave.items[i].node.css('background', _parent.Tools.Degrader(_parent.DATA.SavedColor[v]));
          }
        }
        this.updateFormat();
        _parent.DATA.Save();
      }
      this.LoadColor = function (v) {
        this.SaveName = v;
        if (/save/.test(v) || v == 'bdf') {
          v = _parent.DATA.SavedColor[v];
        }
        if (v == 'custom')
        {
          this.customTF.setValue(this.ColorTag);
          this.test();
          new _parent.Tools.Guidialog(_parent.Lang.ColorLoadListName[1], this.customTF.getMainDiv(), 'question').addButton(_parent.Lang.ColorWindowOkBtn, function () {
            var v = colorTxt.Window.customTF.getValue();
            if (v.length % 3 == 0 && /[0-9]+/.exec(v) == v) colorTxt.Window.LoadColor(v);
          }).addButton(_parent.Lang.updateCancel).show();
          return;
        }
        this.ColorPicker.fromString('#' + _parent.Tools.colorrgb(v.substring(0, 3)));
        this.ColorTag = v;
        this.updateFormat();
        this.updatePreview();
      }
      this.colorwest = function (rgb) {
        Wr = ((parseInt(rgb.substring(0, 2), 16) / 255) * 9).toFixed();
        Wg = ((parseInt(rgb.substring(2, 4), 16) / 255) * 9).toFixed();
        Wb = ((parseInt(rgb.substring(4), 16) / 255) * 9).toFixed();
        return Wr + Wg + Wb;
      }
    }(colorTxt);
    console.log(colorTxt);
    $('head').append($('<style id=\'colorTxtStyle\' />'));
    $('head').append($('<style id=\'colorTxtStyleTmp\' />'));
    $('#colorTxtStyle').append('div.tw2gui_window.chat div.chat_room div.chat_input div.cbg {right: 65px}\n');
    $('#colorTxtStyle').append('div.tw2gui_window.chat div.chat_room div.chat_input a.speak {right: 25px}\n');
    colorTxt.initInterval = setInterval('colorTxt.Chat.init();', 200);
    jscolor = {
      install: function () {
        this.dir = '';
        this.bindClass = 'color';
        this.binding = true;
        this.preloading = true;
        this.images = {
          pad: [
            181,
            101
          ],
          sld: [
            16,
            101
          ],
          cross: [
            15,
            15
          ],
          arrow: [
            7,
            11
          ]
        };
        this.imgRequire = {
        };
        this.imgLoaded = {
        };
        jscolor.addEvent(window, 'load', jscolor.init);
      },
      init: function () {
        if (jscolor.binding) {
          jscolor.bind();
        }
        if (jscolor.preloading) {
          jscolor.preload();
        }
      },
      getDir: function () {
        if (!jscolor.dir) {
          var detected = jscolor.detectDir();
          jscolor.dir = detected !== false ? detected : 'jscolor/';
        }
        return jscolor.dir;
      },
      detectDir: function () {
        var base = location.href;
        var e = document.getElementsByTagName('base');
        for (var i = 0; i < e.length; i += 1) {
          if (e[i].href) {
            base = e[i].href;
          }
        }
        var e = document.getElementsByTagName('script');
        for (var i = 0; i < e.length; i += 1) {
          if (e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
            var src = new jscolor.URI(e[i].src);
            var srcAbs = src.toAbsolute(base);
            srcAbs.path = srcAbs.path.replace(/[^\/]+$/, '');
            srcAbs.query = null;
            srcAbs.fragment = null;
            return srcAbs.toString();
          }
        }
        return false;
      },
      bind: function () {
        var matchClass = new RegExp('(^|\\s)(' + jscolor.bindClass + ')\\s*(\\{[^}]*\\})?', 'i');
        var e = document.getElementsByTagName('input');
        for (var i = 0; i < e.length; i += 1) {
          var m;
          if (!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
            var prop = {
            };
            if (m[3]) {
              try {
                eval('prop=' + m[3]);
              } catch (eInvalidProp) {
              }
            }
            e[i].color = new jscolor.color(e[i], prop);
          }
        }
      },
      preload: function () {
        for (var fn in jscolor.imgRequire) {
          if (jscolor.imgRequire.hasOwnProperty(fn)) {
            jscolor.loadImage(fn);
          }
        }
      },
      requireImage: function (filename) {
        jscolor.imgRequire[filename] = true;
      },
      loadImage: function (filename) {
        if (!jscolor.imgLoaded[filename]) {
          jscolor.imgLoaded[filename] = new Image();
          jscolor.imgLoaded[filename].src = jscolor.getDir() + filename;
        }
      },
      fetchElement: function (mixed) {
        return typeof mixed === 'string' ? document.getElementById(mixed)  : mixed;
      },
      addEvent: function (el, evnt, func) {
        if (el.addEventListener) {
          el.addEventListener(evnt, func, false);
        } else if (el.attachEvent) {
          el.attachEvent('on' + evnt, func);
        }
      },
      fireEvent: function (el, evnt) {
        if (!el) {
          return;
        }
        if (document.createEvent) {
          var ev = document.createEvent('HTMLEvents');
          ev.initEvent(evnt, true, true);
          el.dispatchEvent(ev);
        } else if (document.createEventObject) {
          var ev = document.createEventObject();
          el.fireEvent('on' + evnt, ev);
        } else if (el['on' + evnt]) {
          el['on' + evnt]();
        }
      },
      getElementPos: function (e) {
        var e1 = e,
        e2 = e;
        var x = 0,
        y = 0;
        if (e1.offsetParent) {
          do {
            x += e1.offsetLeft;
            y += e1.offsetTop;
          } while (e1 = e1.offsetParent);
        }
        while ((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
          x -= e2.scrollLeft;
          y -= e2.scrollTop;
        }
        return [x,
        y];
      },
      getElementSize: function (e) {
        return [e.offsetWidth,
        e.offsetHeight];
      },
      getRelMousePos: function (e) {
        var x = 0,
        y = 0;
        if (!e) {
          e = window.event;
        }
        if (typeof e.offsetX === 'number') {
          x = e.offsetX;
          y = e.offsetY;
        } else if (typeof e.layerX === 'number') {
          x = e.layerX;
          y = e.layerY;
        }
        return {
          x: x,
          y: y
        };
      },
      getViewPos: function () {
        if (typeof window.pageYOffset === 'number') {
          return [window.pageXOffset,
          window.pageYOffset];
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
          return [document.body.scrollLeft,
          document.body.scrollTop];
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          return [document.documentElement.scrollLeft,
          document.documentElement.scrollTop];
        } else {
          return [0,
          0];
        }
      },
      getViewSize: function () {
        if (typeof window.innerWidth === 'number') {
          return [window.innerWidth,
          window.innerHeight];
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
          return [document.body.clientWidth,
          document.body.clientHeight];
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
          return [document.documentElement.clientWidth,
          document.documentElement.clientHeight];
        } else {
          return [0,
          0];
        }
      },
      URI: function (uri) {
        this.scheme = null;
        this.authority = null;
        this.path = '';
        this.query = null;
        this.fragment = null;
        this.parse = function (uri) {
          var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
          this.scheme = m[3] ? m[2] : null;
          this.authority = m[5] ? m[6] : null;
          this.path = m[7];
          this.query = m[9] ? m[10] : null;
          this.fragment = m[12] ? m[13] : null;
          return this;
        };
        this.toString = function () {
          var result = '';
          if (this.scheme !== null) {
            result = result + this.scheme + ':';
          }
          if (this.authority !== null) {
            result = result + '//' + this.authority;
          }
          if (this.path !== null) {
            result = result + this.path;
          }
          if (this.query !== null) {
            result = result + '?' + this.query;
          }
          if (this.fragment !== null) {
            result = result + '#' + this.fragment;
          }
          return result;
        };
        this.toAbsolute = function (base) {
          var base = new jscolor.URI(base);
          var r = this;
          var t = new jscolor.URI;
          if (base.scheme === null) {
            return false;
          }
          if (r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
            r.scheme = null;
          }
          if (r.scheme !== null) {
            t.scheme = r.scheme;
            t.authority = r.authority;
            t.path = removeDotSegments(r.path);
            t.query = r.query;
          } else {
            if (r.authority !== null) {
              t.authority = r.authority;
              t.path = removeDotSegments(r.path);
              t.query = r.query;
            } else {
              if (r.path === '') {
                t.path = base.path;
                if (r.query !== null) {
                  t.query = r.query;
                } else {
                  t.query = base.query;
                }
              } else {
                if (r.path.substr(0, 1) === '/') {
                  t.path = removeDotSegments(r.path);
                } else {
                  if (base.authority !== null && base.path === '') {
                    t.path = '/' + r.path;
                  } else {
                    t.path = base.path.replace(/[^\/]+$/, '') + r.path;
                  }
                  t.path = removeDotSegments(t.path);
                }
                t.query = r.query;
              }
              t.authority = base.authority;
            }
            t.scheme = base.scheme;
          }
          t.fragment = r.fragment;
          return t;
        };
        function removeDotSegments(path) {
          var out = '';
          while (path) {
            if (path.substr(0, 3) === '../' || path.substr(0, 2) === './') {
              path = path.replace(/^\.+/, '').substr(1);
            } else if (path.substr(0, 3) === '/./' || path === '/.') {
              path = '/' + path.substr(3);
            } else if (path.substr(0, 4) === '/../' || path === '/..') {
              path = '/' + path.substr(4);
              out = out.replace(/\/?[^\/]*$/, '');
            } else if (path === '.' || path === '..') {
              path = '';
            } else {
              var rm = path.match(/^\/?[^\/]*/) [0];
              path = path.substr(rm.length);
              out = out + rm;
            }
          }
          return out;
        }
        if (uri) {
          this.parse(uri);
        }
      },
      color: function (target, prop) {
        this.required = true;
        this.adjust = true;
        this.hash = false;
        this.caps = true;
        this.slider = true;
        this.valueElement = target;
        this.styleElement = target;
        this.onImmediateChange = null;
        this.hsv = [
          0,
          0,
          1
        ];
        this.rgb = [
          1,
          1,
          1
        ];
        this.pickerOnfocus = true;
        this.pickerMode = 'HSV';
        this.pickerPosition = 'bottom';
        this.pickerSmartPosition = true;
        this.pickerButtonHeight = 20;
        this.pickerClosable = false;
        this.pickerCloseText = 'Close';
        this.pickerButtonColor = 'ButtonText';
        this.pickerFace = 10;
        this.pickerFaceColor = 'ThreeDFace';
        this.pickerBorder = 1;
        this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight';
        this.pickerInset = 1;
        this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow';
        this.pickerZIndex = 10000;
        for (var p in prop) {
          if (prop.hasOwnProperty(p)) {
            this[p] = prop[p];
          }
        }
        this.hidePicker = function () {
          if (isPickerOwner()) {
            removePicker();
          }
        };
        this.showPicker = function () {
          if (!isPickerOwner()) {
            var tp = jscolor.getElementPos(target);
            var ts = jscolor.getElementSize(target);
            var vp = jscolor.getViewPos();
            var vs = jscolor.getViewSize();
            var ps = getPickerDims(this);
            var a,
            b,
            c;
            switch (this.pickerPosition.toLowerCase()) {
              case 'left':
                a = 1;
                b = 0;
                c = - 1;
                break;
              case 'right':
                a = 1;
                b = 0;
                c = 1;
                break;
              case 'top':
                a = 0;
                b = 1;
                c = - 1;
                break;
              default:
                a = 0;
                b = 1;
                c = 1;
                break;
            }
            var l = (ts[b] + ps[b]) / 2;
            if (!this.pickerSmartPosition) {
              var pp = [
                tp[a],
                tp[b] + ts[b] - l + l * c
              ];
          } else {
            var pp = [
              - vp[a] + tp[a] + ps[a] > vs[a] ? ( - vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ? tp[a] + ts[a] - ps[a] : tp[a])  : tp[a],
              - vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ? ( - vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c)  : (tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c)
            ];
        }
        drawPicker(pp[a], pp[b]);
      }
    };
    this.importColor = function () {
      if (!valueElement) {
        this.exportColor();
      } else {
        if (!this.adjust) {
          if (!this.fromString(valueElement.value, leaveValue)) {
            styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
            styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
            styleElement.style.color = styleElement.jscStyle.color;
            this.exportColor(leaveValue | leaveStyle);
          }
        } else if (!this.required && /^\s*$/.test(valueElement.value)) {
          valueElement.value = '';
          styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
          styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
          styleElement.style.color = styleElement.jscStyle.color;
          this.exportColor(leaveValue | leaveStyle);
        } else if (this.fromString(valueElement.value)) {
        } else {
          this.exportColor();
        }
      }
    };
    this.exportColor = function (flags) {
      if (!(flags & leaveValue) && valueElement) {
        var value = this.toString();
        if (this.caps) {
          value = value.toUpperCase();
        }
        if (this.hash) {
          value = '#' + value;
        }
        valueElement.value = value;
      }
      if (!(flags & leaveStyle) && styleElement) {
        styleElement.style.backgroundImage = 'none';
        styleElement.style.backgroundColor = '#' + this.toString();
        styleElement.style.color = 0.213 * this.rgb[0] +
        0.715 * this.rgb[1] +
        0.072 * this.rgb[2] < 0.5 ? '#FFF' : '#000';
      }
      if (!(flags & leavePad) && isPickerOwner()) {
        redrawPad();
      }
      if (!(flags & leaveSld) && isPickerOwner()) {
        redrawSld();
      }
    };
    this.fromHSV = function (h, s, v, flags) {
      h < 0 && (h = 0) || h > 6 && (h = 6);
      s < 0 && (s = 0) || s > 1 && (s = 1);
      v < 0 && (v = 0) || v > 1 && (v = 1);
      this.rgb = HSV_RGB(h === null ? this.hsv[0] : (this.hsv[0] = h), s === null ? this.hsv[1] : (this.hsv[1] = s), v === null ? this.hsv[2] : (this.hsv[2] = v));
      this.exportColor(flags);
    };
    this.fromRGB = function (r, g, b, flags) {
      r < 0 && (r = 0) || r > 1 && (r = 1);
      g < 0 && (g = 0) || g > 1 && (g = 1);
      b < 0 && (b = 0) || b > 1 && (b = 1);
      var hsv = RGB_HSV(r === null ? this.rgb[0] : (this.rgb[0] = r), g === null ? this.rgb[1] : (this.rgb[1] = g), b === null ? this.rgb[2] : (this.rgb[2] = b));
      if (hsv[0] !== null) {
        this.hsv[0] = hsv[0];
      }
      if (hsv[2] !== 0) {
        this.hsv[1] = hsv[1];
      }
      this.hsv[2] = hsv[2];
      this.exportColor(flags);
    };
    this.fromString = function (hex, flags) {
      var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
      if (!m) {
        return false;
      } else {
        if (m[1].length === 6) {
          this.fromRGB(parseInt(m[1].substr(0, 2), 16) / 255, parseInt(m[1].substr(2, 2), 16) / 255, parseInt(m[1].substr(4, 2), 16) / 255, flags);
        } else {
          this.fromRGB(parseInt(m[1].charAt(0) + m[1].charAt(0), 16) / 255, parseInt(m[1].charAt(1) + m[1].charAt(1), 16) / 255, parseInt(m[1].charAt(2) + m[1].charAt(2), 16) / 255, flags);
        }
        return true;
      }
    };
    this.toString = function () {
      return ((256 | Math.round(255 * this.rgb[0])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[1])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[2])).toString(16).substr(1));
    };
    function RGB_HSV(r, g, b) {
      var n = Math.min(Math.min(r, g), b);
      var v = Math.max(Math.max(r, g), b);
      var m = v - n;
      if (m === 0) {
        return [null,
        0,
        v];
      }
      var h = r === n ? 3 + (b - g) / m : (g === n ? 5 + (r - b) / m : 1 + (g - r) / m);
      return [h === 6 ? 0 : h,
      m / v,
      v];
    }
    function HSV_RGB(h, s, v) {
      if (h === null) {
        return [v,
        v,
        v];
      }
      var i = Math.floor(h);
      var f = i % 2 ? h - i : 1 - (h - i);
      var m = v * (1 - s);
      var n = v * (1 - s * f);
      switch (i) {
        case 6:
        case 0:
          return [v,
          n,
          m];
        case 1:
          return [n,
          v,
          m];
        case 2:
          return [m,
          v,
          n];
        case 3:
          return [m,
          n,
          v];
        case 4:
          return [n,
          m,
          v];
        case 5:
          return [v,
          m,
          n];
      }
    }
    function removePicker() {
      delete jscolor.picker.owner;
      document.getElementsByTagName('body') [0].removeChild(jscolor.picker.boxB);
    }
    function drawPicker(x, y) {
      if (!jscolor.picker) {
        jscolor.picker = {
          box: document.createElement('div'),
          boxB: document.createElement('div'),
          pad: document.createElement('div'),
          padB: document.createElement('div'),
          padM: document.createElement('div'),
          sld: document.createElement('div'),
          sldB: document.createElement('div'),
          sldM: document.createElement('div'),
          btn: document.createElement('div'),
          btnS: document.createElement('span'),
          btnT: document.createTextNode(THIS.pickerCloseText)
        };
        for (var i = 0, segSize = 4; i < jscolor.images.sld[1]; i += segSize) {
          var seg = document.createElement('div');
          seg.style.height = segSize + 'px';
          seg.style.fontSize = '1px';
          seg.style.lineHeight = '0';
          jscolor.picker.sld.appendChild(seg);
        }
        jscolor.picker.sldB.appendChild(jscolor.picker.sld);
        jscolor.picker.box.appendChild(jscolor.picker.sldB);
        jscolor.picker.box.appendChild(jscolor.picker.sldM);
        jscolor.picker.padB.appendChild(jscolor.picker.pad);
        jscolor.picker.box.appendChild(jscolor.picker.padB);
        jscolor.picker.box.appendChild(jscolor.picker.padM);
        jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
        jscolor.picker.btn.appendChild(jscolor.picker.btnS);
        jscolor.picker.box.appendChild(jscolor.picker.btn);
        jscolor.picker.boxB.appendChild(jscolor.picker.box);
      }
      var p = jscolor.picker;
      p.box.onmouseup = p.box.onmouseout = function () {
        target.focus();
      };
      p.box.onmousedown = function () {
        abortBlur = true;
      };
      p.box.onmousemove = function (e) {
        if (holdPad || holdSld) {
          holdPad && setPad(e);
          holdSld && setSld(e);
          if (document.selection) {
            document.selection.empty();
          } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
          }
          dispatchImmediateChange();
        }
      };
      p.padM.onmouseup = p.padM.onmouseout = function () {
        if (holdPad) {
          holdPad = false;
          jscolor.fireEvent(valueElement, 'change');
        }
      };
      p.padM.onmousedown = function (e) {
        switch (modeID) {
          case 0:
            if (THIS.hsv[2] === 0) {
              THIS.fromHSV(null, null, 1);
            };
            break;
          case 1:
            if (THIS.hsv[1] === 0) {
              THIS.fromHSV(null, 1, null);
            };
            break;
        }
        holdPad = true;
        setPad(e);
        dispatchImmediateChange();
      };
      p.sldM.onmouseup = p.sldM.onmouseout = function () {
        if (holdSld) {
          holdSld = false;
          jscolor.fireEvent(valueElement, 'change');
        }
      };
      p.sldM.onmousedown = function (e) {
        holdSld = true;
        setSld(e);
        dispatchImmediateChange();
      };
      var dims = getPickerDims(THIS);
      p.box.style.width = dims[0] + 'px';
      p.box.style.height = dims[1] + 'px';
      p.boxB.style.position = 'absolute';
      p.boxB.style.clear = 'both';
      p.boxB.style.left = x + 'px';
      p.boxB.style.top = y + 'px';
      p.boxB.style.zIndex = THIS.pickerZIndex;
      p.boxB.style.border = THIS.pickerBorder + 'px solid';
      p.boxB.style.borderColor = THIS.pickerBorderColor;
      p.boxB.style.background = THIS.pickerFaceColor;
      p.pad.style.width = jscolor.images.pad[0] + 'px';
      p.pad.style.height = jscolor.images.pad[1] + 'px';
      p.padB.style.position = 'absolute';
      p.padB.style.left = THIS.pickerFace + 'px';
      p.padB.style.top = THIS.pickerFace + 'px';
      p.padB.style.border = THIS.pickerInset + 'px solid';
      p.padB.style.borderColor = THIS.pickerInsetColor;
      p.padM.style.position = 'absolute';
      p.padM.style.left = '0';
      p.padM.style.top = '0';
      p.padM.style.width = THIS.pickerFace + 2 * THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
      p.padM.style.height = p.box.style.height;
      p.padM.style.cursor = 'crosshair';
      p.sld.style.overflow = 'hidden';
      p.sld.style.width = jscolor.images.sld[0] + 'px';
      p.sld.style.height = jscolor.images.sld[1] + 'px';
      p.sldB.style.display = THIS.slider ? 'block' : 'none';
      p.sldB.style.position = 'absolute';
      p.sldB.style.right = THIS.pickerFace + 'px';
      p.sldB.style.top = THIS.pickerFace + 'px';
      p.sldB.style.border = THIS.pickerInset + 'px solid';
      p.sldB.style.borderColor = THIS.pickerInsetColor;
      p.sldM.style.display = THIS.slider ? 'block' : 'none';
      p.sldM.style.position = 'absolute';
      p.sldM.style.right = '0';
      p.sldM.style.top = '0';
      p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2 * THIS.pickerInset + 'px';
      p.sldM.style.height = p.box.style.height;
      try {
        p.sldM.style.cursor = 'pointer';
      } catch (eOldIE) {
        p.sldM.style.cursor = 'hand';
      }
      function setBtnBorder() {
        var insetColors = THIS.pickerInsetColor.split(/\s+/);
        var pickerOutsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
        p.btn.style.borderColor = pickerOutsetColor;
      }
      p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
      p.btn.style.position = 'absolute';
      p.btn.style.left = THIS.pickerFace + 'px';
      p.btn.style.bottom = THIS.pickerFace + 'px';
      p.btn.style.padding = '0 15px';
      p.btn.style.height = '18px';
      p.btn.style.border = THIS.pickerInset + 'px solid';
      setBtnBorder();
      p.btn.style.color = THIS.pickerButtonColor;
      p.btn.style.font = '12px sans-serif';
      p.btn.style.textAlign = 'center';
      try {
        p.btn.style.cursor = 'pointer';
      } catch (eOldIE) {
        p.btn.style.cursor = 'hand';
      }
      p.btn.onmousedown = function () {
        THIS.hidePicker();
      };
      p.btnS.style.lineHeight = p.btn.style.height;
      switch (modeID) {
        case 0:
          var padImg = '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';
          break;
        case 1:
          var padImg = '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';
          break;
      }
      p.padM.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=)';
      p.padM.style.backgroundRepeat = 'no-repeat';
      p.sldM.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7)';
      p.sldM.style.backgroundRepeat = 'no-repeat';
      p.pad.style.backgroundImage = 'url(data:image/png;base64,' + padImg + ')';
      p.pad.style.backgroundRepeat = 'no-repeat';
      p.pad.style.backgroundPosition = '0 0';
      redrawPad();
      redrawSld();
      jscolor.picker.owner = THIS;
      document.getElementsByTagName('body') [0].appendChild(p.boxB);
    }
    function getPickerDims(o) {
      var dims = [
        2 * o.pickerInset + 2 * o.pickerFace + jscolor.images.pad[0] + (o.slider ? 2 * o.pickerInset + 2 * jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
        o.pickerClosable ? 4 * o.pickerInset + 3 * o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight : 2 * o.pickerInset + 2 * o.pickerFace + jscolor.images.pad[1]
      ];
      return dims;
    }
    function redrawPad() {
      switch (modeID) {
        case 0:
          var yComponent = 1;
          break;
        case 1:
          var yComponent = 2;
          break;
      }
      var x = Math.round((THIS.hsv[0] / 6) * (jscolor.images.pad[0] - 1));
      var y = Math.round((1 - THIS.hsv[yComponent]) * (jscolor.images.pad[1] - 1));
      jscolor.picker.padM.style.backgroundPosition = (THIS.pickerFace + THIS.pickerInset + x - Math.floor(jscolor.images.cross[0] / 2)) + 'px ' + (THIS.pickerFace + THIS.pickerInset + y - Math.floor(jscolor.images.cross[1] / 2)) + 'px';
      var seg = jscolor.picker.sld.childNodes;
      switch (modeID) {
        case 0:
          var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
          for (var i = 0; i < seg.length; i += 1) {
            seg[i].style.backgroundColor = 'rgb(' + (rgb[0] * (1 - i / seg.length) * 100) + '%,' + (rgb[1] * (1 - i / seg.length) * 100) + '%,' + (rgb[2] * (1 - i / seg.length) * 100) + '%)';
          }
          break;
        case 1:
          var rgb,
          s,
          c = [
            THIS.hsv[2],
            0,
            0
          ];
          var i = Math.floor(THIS.hsv[0]);
          var f = i % 2 ? THIS.hsv[0] - i : 1 - (THIS.hsv[0] - i);
          switch (i) {
            case 6:
            case 0:
              rgb = [
                0,
                1,
                2
              ];
              break;
            case 1:
              rgb = [
                1,
                0,
                2
              ];
              break;
            case 2:
              rgb = [
                2,
                0,
                1
              ];
              break;
            case 3:
              rgb = [
                2,
                1,
                0
              ];
              break;
            case 4:
              rgb = [
                1,
                2,
                0
              ];
              break;
            case 5:
              rgb = [
                0,
                2,
                1
              ];
              break;
          }
          for (var i = 0; i < seg.length; i += 1) {
            s = 1 - 1 / (seg.length - 1) * i;
            c[1] = c[0] * (1 - s * f);
            c[2] = c[0] * (1 - s);
            seg[i].style.backgroundColor = 'rgb(' + (c[rgb[0]] * 100) + '%,' + (c[rgb[1]] * 100) + '%,' + (c[rgb[2]] * 100) + '%)';
        }
        break;
      }
  }
  function redrawSld() {
    switch (modeID) {
      case 0:
        var yComponent = 2;
        break;
      case 1:
        var yComponent = 1;
        break;
    }
    var y = Math.round((1 - THIS.hsv[yComponent]) * (jscolor.images.sld[1] - 1));
    jscolor.picker.sldM.style.backgroundPosition = '0 ' + (THIS.pickerFace + THIS.pickerInset + y - Math.floor(jscolor.images.arrow[1] / 2)) + 'px';
  }
  function isPickerOwner() {
    return jscolor.picker && jscolor.picker.owner === THIS;
  }
  function blurTarget() {
    if (valueElement === target) {
      THIS.importColor();
    }
    if (THIS.pickerOnfocus) {
      THIS.hidePicker();
    }
  }
  function blurValue() {
    if (valueElement !== target) {
      THIS.importColor();
    }
  }
  function setPad(e) {
    var mpos = jscolor.getRelMousePos(e);
    var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
    var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
    switch (modeID) {
      case 0:
        THIS.fromHSV(x * (6 / (jscolor.images.pad[0] - 1)), 1 - y / (jscolor.images.pad[1] - 1), null, leaveSld);
        break;
      case 1:
        THIS.fromHSV(x * (6 / (jscolor.images.pad[0] - 1)), null, 1 - y / (jscolor.images.pad[1] - 1), leaveSld);
        break;
    }
  }
  function setSld(e) {
    var mpos = jscolor.getRelMousePos(e);
    var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
    switch (modeID) {
      case 0:
        THIS.fromHSV(null, null, 1 - y / (jscolor.images.sld[1] - 1), leavePad);
        break;
      case 1:
        THIS.fromHSV(null, 1 - y / (jscolor.images.sld[1] - 1), null, leavePad);
        break;
    }
  }
  function dispatchImmediateChange() {
    if (THIS.onImmediateChange) {
      if (typeof THIS.onImmediateChange === 'string') {
        eval(THIS.onImmediateChange);
      } else {
        THIS.onImmediateChange(THIS);
      }
    }
  }
  var THIS = this;
  var modeID = this.pickerMode.toLowerCase() === 'hvs' ? 1 : 0;
  var abortBlur = false;
  var
  valueElement = jscolor.fetchElement(this.valueElement),
  styleElement = jscolor.fetchElement(this.styleElement);
  var
  holdPad = false,
  holdSld = false;
  var
  leaveValue = 1 << 0,
  leaveStyle = 1 << 1,
  leavePad = 1 << 2,
  leaveSld = 1 << 3;
  jscolor.addEvent(target, 'focus', function () {
    if (THIS.pickerOnfocus) {
      THIS.showPicker();
    }
  });
  jscolor.addEvent(target, 'blur', function () {
    if (!abortBlur) {
      window.setTimeout(function () {
        abortBlur || blurTarget();
        abortBlur = false;
      }, 0);
    } else {
      abortBlur = false;
    }
  });
  if (valueElement) {
    var updateField = function () {
      THIS.fromString(valueElement.value, leaveValue);
      dispatchImmediateChange();
    };
    jscolor.addEvent(valueElement, 'keyup', updateField);
    jscolor.addEvent(valueElement, 'input', updateField);
    jscolor.addEvent(valueElement, 'blur', blurValue);
    valueElement.setAttribute('autocomplete', 'off');
  }
  if (styleElement) {
    styleElement.jscStyle = {
      backgroundImage: styleElement.style.backgroundImage,
      backgroundColor: styleElement.style.backgroundColor,
      color: styleElement.style.color
    };
  }
  this.importColor();
}
};
jscolor.install();
});
}
