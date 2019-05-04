// ==UserScript==
// @name idontknow
// @namespace Apo
// @author Apo
// @description Some little tweaks for The-West!
// @include https://*.the-west.*/game.php*
// @version 0.1.19
//
// @history 0.1.19 better data saving, export&import
// @history 0.1.18 new forum links, scrollpane and choose language in script window
// @history 0.1.17 topic of alliance-chat added
// @history 0.1.16 Polish corrected (Wojcieszy/Bartosz86), compatibility patch for TW-Toolkit
// @history 0.1.15 Add Dutch (cor696)
// @history 0.1.14 little improvements
// @history 0.1.13 German corrected
// @history 0.1.12 items search fixed and improved
// @history 0.1.11 Fix for the west version 2.21, add update function
// @history 0.1.10 Add Polish (TeeNOmore127)
// @history 0.1.9  Fix for the west beta
// @history 0.1.8  Add German (Tom Robert), remove Kick-o-matic autoload
// @history 0.1.7  Add Spanish (pepe100)
// @history	0.1.6  Add Items controls and search
// @history	0.1.5  Add English
// @history	0.1.4  Add Kick-o-matic autoload
// @nocompat Chrome
// @grant none
// ==/UserScript==
// translation: Vbyec(Russian), pepe100(Spanish), Tom Robert(German&English), TeeNOmore127/Wojcieszy/Bartosz86(Polish), cor696(Dutch)
(function (fn) {
  var script = document.createElement('script');
  script.setAttribute('type', 'application/javascript');
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script);
  document.body.removeChild(script);
}) (function () {
  Tweaker = {
    version: '0.1.19',
    name: 'Tweaker',
    author: 'Vbyec (updated by Tom Robert)',
    minGame: '2.08',
    maxGame: Game.version.toString(),
    website: 'https://greasyfork.org/scripts/7530',
    updateUrl: 'https://raw.githack.com/TomRobert/tw/master/sU.js',
    updateAd: 'http://adf.ly/1OXp26',
    langs: {
      
      en: {
        language: 'Romana',
        ApiGui: '<b>Cum se foloseste:</b><br><u>Ctrl+click:</u> Copy <i>*nickname*</i> to active chat.<br><u>Shift+click:</u> Copy "<i>*nickname* schimba cu </i>" to active chat.<br><u>Backspace+click:</u> Open private chat with current player.<br>Adds some information (total dmg, last hit) to players description in fortbattle.<br>Displays the chat topics at the upper border of the game window.<br>Write "<i>/items</i>" into chat to check out new items.<br>Write "<i>/items.s name</i>" into chat to find items by name.<br>Write "<i>/items.add</i>" into chat to update local DB.',
        save: 'Save',
        saveMessage: 'Successfully saved',
        chooseLang: 'Choose language',
        ex: 'Export',
        exTitle: 'Export localStorage to save it when you reset you internet browser',
        im: 'Import',
        imTitle: 'Import your data which you did export earlier',
        imported: 'Data imported',
        noImport: 'Nothing to import!',
        contact: 'Contact',
        searched: 'Number of items found which include this part in their name: ',
        noNew: 'No new items',
        added: 'Items added to local storage: ',
        noAdd: 'No new item to add to local storage',
        TotalDamage: 'Total damage',
        LastHit: 'Last hit',
        KillShot: 'Kill shot',
        ChangeWith: 'schiba cu',
        UserMessage: 'New items found: ',
        itemsShorthelp: 'Check out new items.',
        itemsHelp: 'Shows the items, which were last added to the game. But you have to set up first a local storage of actual items to detect new items.',
        itemssShorthelp: 'Find items by name.',
        itemssHelp: 'Type in anything to search for items, where that part is included.',
        itemssUsage: 'parte name',
        itemsaddShorthelp: 'Update local DB.',
        itemsaddHelp: 'Add new items to the local storage, which aren\'t registrated yet.',
        update: 'Update',
        updateAvailable: 'A new version of the script is available',
      },
    updateLang: function () {
      var lg = Tweaker.langs;
      Tweaker.lang = lg[localStorage.getItem('scriptsLang')] ? localStorage.getItem('scriptsLang')  : lg[Game.locale.substr(0, 2)] ? Game.locale.substr(0, 2)  : 'en';
      TWlang = lg[Tweaker.lang];
    },
    items: JSON.parse(localStorage.getItem('Tweaker_items')) || {
      count: 0
    },
    room: '',
  };
  Tweaker.updateLang();
  var langBox = new west.gui.Combobox();
  for (var j in Tweaker.langs)
  langBox.addItem(j, Tweaker.langs[j].language);
  langBox.select(Tweaker.lang);
  var saveBtn = new west.gui.Button(TWlang.save, function () {
    localStorage.setItem('scriptsLang', langBox.getValue());
    Tweaker.updateLang();
    new UserMessage(TWlang.saveMessage, UserMessage.TYPE_SUCCESS).show();
  }),
  fmfb = function (l) {
    return 'https://forum.the-west.' + l + '/index.php?conversations/add&to=Tom Robert';
  },
  TweakerAPI = TheWestApi.register('TWeaker', Tweaker.name, Tweaker.minGame, Tweaker.maxGame, Tweaker.author, Tweaker.website),
  scrollP = new west.gui.Scrollpane().appendContent(TWlang.chooseLang + ': ').appendContent(langBox.getMainDiv()).appendContent(saveBtn.getMainDiv()).appendContent('<br><br>Some little tweaks for The West.<br><br>' +
  TWlang.ApiGui + '<br><br><a href="javascript:Tweaker.exportItems();" title="' + TWlang.exTitle + '">' + TWlang.ex + '</a> / <a href="javascript:Tweaker.importItems();" title="' + TWlang.imTitle + '">' + TWlang.im + '</a><br><br><i>' + Tweaker.name + ' v' + Tweaker.version + '</i><br><br><br><b>' + TWlang.contact +
  ':</b><ul style="margin-left:15px;"><li>Send a message to <a target=\'_blanck\' href="http://om.the-west.de/west/de/player/?ref=west_invite_linkrl&player_id=647936&world_id=13&hash=7dda">Tom Robert on German world Arizona</a></li>' +
  '<li>Contact me on <a target=\'_blanck\' href="https://greasyfork.org/forum/messages/add/Tom Robert">Greasy Fork</a></li>' +
  '<li>Message me on one of these The West Forum:<br>/ <a target=\'_blanck\' href="' + fmfb('de') + '">deutsches Forum</a> / ' +
  '<a target=\'_blanck\' href="' + fmfb('net') + '">English forum</a> / <a target=\'_blanck\' href="' + fmfb('pl') + '">forum polski</a> / ' +
  '<a target=\'_blanck\' href="' + fmfb('es') + '">foro español</a> /<br>/ <a target=\'_blanck\' href="' + fmfb('ru') + '">Русский форум</a> / ' +
  '<a target=\'_blanck\' href="' + fmfb('fr') + '">forum français</a> / <a target=\'_blanck\' href="' + fmfb('it') + '">forum italiano</a> / ' +
  '<a target=\'_blanck\' href="https://forum.beta.the-west.net//index.php?conversations/add&to=Tom Robert">beta forum</a> /<br>I will get an e-mail when you sent me the message <img src="../images/chat/emoticons/smile.png"></li></ul>');
  TweakerAPI.setGui(scrollP.getMainDiv());
  // local DataBase of items.
  Tweaker.oldData = function () {
    if (!Tweaker.items.oldData) {
      Tweaker.items.oldData = 'done';
      if (localStorage.getItem('tweakItems_count')) {
        for (var k in localStorage) {
          if (typeof k === 'string' && k.indexOf('tweak_') === 0) {
            Tweaker.items[k.split('_') [1]] = localStorage.getItem(k);
            localStorage.removeItem(k);
          }
        }
        Tweaker.items.count = parseInt(localStorage.getItem('tweakItems_count'));
        localStorage.removeItem('tweakItems_count');
      }
      localStorage.setItem('Tweaker_items', JSON.stringify(Tweaker.items));
    }
  }();
  Tweaker.exportItems = function () {
    (new west.gui.Dialog(TWlang.ex, $('<textarea cols=50 rows=10>' + localStorage.getItem('Tweaker_items') + '</textarea>').click(function () {
      this.select();
    }))).addButton('ok').show();
  };
  Tweaker.importItems = function () {
    var txtarea = $('<textarea cols=50 rows=10></textarea>');
    (new west.gui.Dialog(TWlang.im, txtarea)).addButton('ok', function () {
      try {
        if (JSON.parse(txtarea.val()).count && JSON.parse(txtarea.val()).oldData) {
          localStorage.setItem('Tweaker_items', txtarea.val());
          new UserMessage(TWlang.imported, 'success').show();
        } else {
          new UserMessage(TWlang.noImport, 'error').show();
        }
      } catch (e) {
        new UserMessage('<span>' + e + '</spawn>', 'error').show();
      }
    }).addButton('cancel').show();
  };
  Tweaker.search = function (query) {
    if (Tweaker.items.count === 0) Tweaker.init();
    var counter = 0;
    for (var key in Tweaker.items) {
      if ($.isNumeric(key) && Tweaker.items[key].toLowerCase().indexOf(query.toLowerCase()) >= 0) {
        Tweaker.show_in_chat('item=' + key + ': ' + '[item=' + key + ']');
        counter++;
      }
    }
    Tweaker.show_in_chat('"' + query + '" ---> ' + TWlang.searched + counter);
  };
  Tweaker.show_new = function () {
    var count = 0;
    var counterN = 0;
    for (var i = 0; i < 300000; i++) {
      var item = ItemManager.getByBaseId(i);
      if (item !== undefined) {
        if (Tweaker.items[item.item_id] === undefined) {
          Tweaker.show_in_chat('item=' + item.item_id + ': ' + '[item=' + item.item_id + ']');
          counterN++;
        }
        count++;
      }
    }
    new UserMessage(TWlang.UserMessage + counterN, UserMessage.TYPE_SUCCESS).show();
    if (Tweaker.items.count >= count) {
      Tweaker.show_in_chat(TWlang.noNew);
    }
  };
  Tweaker.init = function () {
    if (Tweaker.items.count === 0) {
      Tweaker.add_all();
    } 
    else {
      Tweaker.show_new();
    }
  };
  Tweaker.add_all = function () {
    var count = 0;
    for (var i = 0; i < 300000; i++) {
      var item = ItemManager.getByBaseId(i);
      if (item !== undefined && Tweaker.items[item.item_id] === undefined) {
        Tweaker.items[item.item_id] = item.name;
        count++;
      }
    }
    if (count > 0) {
      Tweaker.items.count += count;
      localStorage.setItem('Tweaker_items', JSON.stringify(Tweaker.items));
      Tweaker.show_in_chat(TWlang.added + count);
    } 
    else {
      Tweaker.show_in_chat(TWlang.noAdd);
    }
  };
  Tweaker.show_in_chat = function (text) {
    Tweaker.room.addMessage(Game.TextHandler.parse(text) + '<br/>');
  };
  Chat.Operations['^/items$'] = {
    cmd: 'items',
    shorthelp: TWlang.itemsShorthelp,
    help: TWlang.itemsHelp,
    usage: '/items',
    func: function (room, msg) {
      Tweaker.room = room;
      Tweaker.init();
    }
  };
  Chat.Operations['^/items.s (.+)$'] = {
    cmd: 'items.s',
    shorthelp: TWlang.itemssShorthelp,
    help: TWlang.itemssHelp,
    usage: '/items.s ' + TWlang.itemssUsage,
    func: function (room, msg, search) {
      Tweaker.room = room;
      Tweaker.search(search[1]);
    }
  };
  Chat.Operations['^/items.add$'] = {
    cmd: 'items.add',
    shorthelp: TWlang.itemsaddShorthelp,
    help: TWlang.itemsaddHelp,
    usage: '/items.add',
    func: function (room, msg) {
      Tweaker.room = room;
      Tweaker.add_all();
    }
  };
  FortBattleWindow.showBattleOrigin = FortBattleWindow.showBattle;
  FortBattleWindow.showBattle = function (response) {
    FortBattle.cacheAll(response);
    FortBattleWindow.showBattleOrigin.call(this, response);
  };
  // Add players on fort to localStorage
  //rewrite by while
  //@todo get fort position
  FortBattle.cacheAll = function (resp) {
    Ajax.remoteCallMode('players', 'get_data', {
      x: Character.position.x,
      y: Character.position.y,
      page: 0
    }, function (data) {
      data.players.forEach(function (player) {
        if (!localStorage.hasOwnProperty('PlayerId_' + player.player_id)) {
          localStorage.setItem('PlayerId_' + player.player_id, player.name);
        }
      });
      var count = data.pages;
      for (var i = 1; i < count; i++) {
        Ajax.remoteCallMode('players', 'get_data', {
          x: Character.position.x,
          y: Character.position.y,
          page: i
        }, function (data) {
          data.players.forEach(function (player) {
            if (!localStorage.hasOwnProperty('PlayerId_' + player.player_id)) {
              localStorage.setItem('PlayerId_' + player.player_id, player.name);
            }
          });
        });
      }
    });
  };
  // Show advance information about player
  FortBattle.checkCompatibility = function () {
    if (!window.TWToolkit || TWToolkit.Preferences.preferences.fb_info === false) {
      FortBattle.getCharDataSheetOrigin = FortBattle.getCharDataSheet;
      FortBattle.getCharDataSheet = function (data) {
        return FortBattle.getCharDataSheetOrigin(data) + '<br/><div class=\'total_damage\'>' + TWlang.TotalDamage + ':<strong>%totalDmg%</strong> </div>' +
        '<div class=\'last_damage\'>' + TWlang.LastHit + ': <strong>%lastDmg%</strong></div>';
      };
      FortBattle.flashShowCharacterInfoOrigin = FortBattle.flashShowCharacterInfo;
      FortBattle.flashShowCharacterInfo = function (fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata, resp) {
        //Kill shot
        lastDmg = lastDmg == 65535 ? TWlang.KillShot : lastDmg;
        FortBattle.flashShowCharacterInfoOrigin(fortId, playerId, healthNow, healthMax, totalDmg, lastDmg, shotat, bonusdata);
        FortBattle.flashShowCharacterInfoEl(playerId);
      };
    }
  };
  $(document).ready(function () {
    setTimeout(FortBattle.checkCompatibility, 8000);
  });
  FortBattle.flashShowCharacterInfoEl = function (playerId) {
    if (parseInt(Chat.MyId.split('_') [1]) === playerId)
    return;
    setTimeout(function () {
      document.onkeyup = null;
    }, 2500);
    document.onkeyup = function (e) {
      e = e || window.event;
      e.preventDefault();
      var active_chat_input = $('input.message:visible');
      var keyCode = e.keyCode ? e.keyCode : e.charCode;
      var nick = localStorage.getItem('PlayerId_' + playerId);
      switch (keyCode) {
        case 16:
          /* shift */
          if (!nick)
          return;
          active_chat_input.val(active_chat_input.val() + '*' + nick + '* ' + TWlang.ChangeWith + '  ');
          break;
        case 17:
          /* ctrl */
          if (!nick)
          return;
          active_chat_input.val(active_chat_input.val() + '*' + nick + '* ');
          active_chat_input.focus();
          break;
        case 8:
          /* backspace */
          var client = Chat.Resource.Manager.getClient('client_' + playerId);
          var room = Chat.Resource.Manager.acquireRoom(client);
          if (room)
          room.openClick();
          break;
        default:
          break;
      }
      document.onkeyup = null;
      /*smth*/
    };
  };
  EventHandler.listen('chat_init', function () {
    for (var room in Chat.Resource.Manager.getRooms()) {
      var br = room.indexOf('room_alliance') === 0 ? '<br>' : '';
      if ((room.indexOf('room_town') === 0 || room.indexOf('room_alliance') === 0) && Chat.Resource.Manager.getRooms() [room].topic != '') {
        $('<p style=\'left: 50%; position: absolute; top: 44px; margin-left: -305px; color: white; font-weight: bolder; font-size: 18px;\'>' + br + Chat.Resource.Manager.getRooms() [room].title + ': ' + Chat.Resource.Manager.getRooms() [room].topic + '</p>').appendTo('#ui_topbar');
      }
    }
  });
  Tweaker.Updater = function () {
    $.getScript(Tweaker.updateUrl, function () {
      if (scriptUpdate.Tweaker > Tweaker.version) {
        var updateMessage = new west.gui.Dialog(TWlang.update + ': ' + Tweaker.name, '<span>' + TWlang.updateAvailable + '<br><br><b>v' + scriptUpdate.Tweaker + ':</b><br>' + scriptUpdate.TweakerNew + '</span>', west.gui.Dialog.SYS_WARNING).addButton(TWlang.update, function () {
          updateMessage.hide();
          window.open(Tweaker.updateAd);
        }).addButton(TWlang.update + ' [NoAds]', function () {
          updateMessage.hide();
          location.href = Tweaker.website + '/code.user.js';
        }).addButton('cancel').show();
      }
    });
  };
  setTimeout(Tweaker.Updater, 5000);
});