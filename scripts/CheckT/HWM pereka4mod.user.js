// ==UserScript==
// @name          HWM pereka4mod
// @namespace     Pereka4
// @author        dw4rf & Casperovskii
// @version       2.6.2
// @description   Add progress bar for sum of faction exp. and balance coef.
// @homepage      https://greasyfork.org/ru/scripts/374658-hwm-pereka4mod
// @include       https://www.heroeswm.ru/home.php*
// @include       https://www.heroeswm.ru/pl_info.php*
// @include       https://www.lordswm.com/home.php*
// @include       https://www.lordswm.com/pl_info.php*
// @include       http://178.248.235.15/home.php*
// @include       http://178.248.235.15/pl_info.php*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// ==/UserScript==

// слегка модифицирован CheckT: проставлены актуальные цифры умелок, добавлен 22 уровень, убраны лишние include
//  для K-MELEON: обёрнуто в function(), небольшой рефакторинг


(function(){
  if (typeof GM_deleteValue != 'function') {
      this.GM_getValue=function (key,def) {return localStorage[key] || def;};
      this.GM_setValue=function (key,value) {return localStorage[key]=value;};
      this.GM_deleteValue=function (key) {return delete localStorage[key];};
  };

  this.GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  };

    var srednya_umka = 0;
    var umk_min = 0;
    var umk_max = 0;
    var sum_umk = 0;

    var lang_ru = new Array();
    lang_ru['Knight']               = '\u0420\u044B\u0446\u0430\u0440\u044C';
    lang_ru['Necromancer']          = '\u041D\u0435\u043A\u0440\u043E\u043C\u0430\u043D\u0442';
    lang_ru['Wizard']               = '\u041C\u0430\u0433';
    lang_ru['Elf']                  = '\u042D\u043B\u044C\u0444';
    lang_ru['Barbarian']            = '\u0412\u0430\u0440\u0432\u0430\u0440';
    lang_ru['Dark elf']             = '\u0422\u0435\u043C\u043D\u044B\u0439 \u044D\u043B\u044C\u0444';
    lang_ru['Demon']                = '\u0414\u0435\u043C\u043E\u043D';
    lang_ru['Dwarf']                = '\u0413\u043D\u043E\u043C';
    lang_ru['Steepe barbarian']     = '\u0421\u0442\u0435\u043f\u043d\u043e\u0439 \u0432\u0430\u0440\u0432\u0430\u0440';
    lang_ru['Combat level']         = '\u0411\u043E\u0435\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C';
    function T(testo){
      return lang_ru[testo];
    }

    //Фракции
    var factions = [
      T('Knight'),T('Necromancer'),T('Wizard'),T('Elf'),T('Barbarian'),T('Dark elf'),T('Demon'),T('Dwarf'),T('Steepe barbarian')
    ];

    //Боевой уровень (22 уровня)
    var combat_exp_lvl = [
      0,1500,4500,15000,32000,90000,190000,400000,860000,1650000,
      3000000,5000000,8500000,14500000,25000000,43000000,70000000,
      108000000,160000000,230000000,325000000,500000000
    ];

    //Умение фракции (12 уровней)
    var racial_skill_lvl = [
      20,50,90,160,280,
      500,900,1600,2900,5300,9600,17300
    ];

    //Средние умения фракций на 3-22 уровне
    var sred_umk = [
      70,130,200,340,560,950,1510,2260,3240,4510,6350,
      9210,13960,21070,31060,43820,59740,80040,104720,167260
    ];
    var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;         // Постоянные для первого элемента XPath
    var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;    // Постоянные элементы списка XPath

  showExpBar();


    /**
     * Поиск по документу с помощью XPath
     *
     * Ввод:
     *  xpath       Выражение для поиска
     *  xpres       Тип поиска
     *
     * Вывод:
     *  Ссылка на найденный объект
     */
    function find(xpath, xpres,startnode){
        if (!startnode) {startnode=document;}
        var ret = document.evaluate(xpath, startnode, null, xpres, null);
        return  xpres == XPFirst ? ret.singleNodeValue : ret;
    }

    /**
     * Добавляет узел после 1 условия
     *
     * Ввод:
     *  refChild    узел ссылки
     *  newChild  узлы, которые будут добавлены
     */
    function insertAfter(newChild, refChild) {
        node.parentNode.insertBefore(newChild, refChild.nextSibling);
    }

    /**
     * Создание элемента
     *
     * Ввод:
     *  tag         Название нового элемента
     *  content     Содержание нового элемента в текстовом формате
     *
     * Вывод:
     *  Ссылка на созданный элемент
     */
    function elem(tag, content){
        var ret = document.createElement(tag);
        ret.innerHTML = content;
        return ret;
    }

    /**
     * Создание прогресс бара
     *
     * Ввод:
     *  Текущий опыт
     *  Текущее умение фракции
     *  Уровень
     *
     * Вывод:
     *  HTML для создания прогресс бара
     */
    function makeProgressBar(exp_attuale, min_umka, max_umka){
        exp_attuale = exp_attuale - min_umka;
        max_umka = max_umka - min_umka;
        var perc = exp_attuale * 100 / max_umka;
        var progress_bar_html;
        var perc_rounded = Math.round(perc);
        var cssStyle = "";
        if (perc<100 && perc>0) {
          cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";

          GM_addStyle(cssStyle);
          progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
              "<div class=\"bar\" style=\"max-width:150px;width:"+ perc_rounded +"%\"></div>"+
              "<span>\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: "+ perc_rounded +"%</span>"+
              "</div>"+"<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc_rounded+"% </div>" +
              "<div>&nbsp;&nbsp;\u0412 \u043D\u043E\u0440\u043C\u0435!</div>";
        }else if (perc>100){
          cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
          GM_addStyle(cssStyle);

          progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
            "<div class=\"bar\" style=\"max-width:150px;width:"+ perc_rounded +"%\"></div>"+
            "<span>\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: "+ perc_rounded +"%</span>"+
            "</div>"+
            "<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc_rounded+"% </div>"+
            "<div><br>&nbsp;&nbsp;\u041F\u0435\u0440\u0435\u043A\u0430\u0447!<br>&nbsp;&nbsp;\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043E\u043F\u044B\u0442\u0430: +"+Math.round(((sum_umk/srednya_umka/1.6)-1)*1000)/10+"%</div>";
        } else if (perc<0) {
            perc = 0;
            cssStyle += ".bar_wrap {width:150px; margin:3px 0 3px 9px;border: 1px solid #1C1C1C;background-color: #8C7526;box-shadow: 0 0 1px #666, inset 0 1px 1px #222;-webkit-box-shadow: 0 0 1px #666, inset 0 1px 1px #222;background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);background-image: -webkit-linear-gradient(#65541B, #8C7526 50%, #65541B);}.bar {height: 5px;background-color: #f9e37e;border-right: 1px solid #282828;box-shadow: inset 0 0 1px #ddd;-webkit-box-shadow: inset 0 0 1px #ddd;background-image: -moz-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);background-image: -webkit-linear-gradient(#e7ae6b, #be8d55 50%, #a57b4b 51%, #ae804c);-moz-transition: all 1s ease;-webkit-transition: all 1s ease;}@-moz-keyframes slidein {from {width: 100%}}@-webkit-keyframes slidein {from {width: 100%}}.bar:hover {-moz-animation: animate-stripes 3s linear infinite;-webkit-animation: animate-stripes 3s linear infinite;}@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}@-webkit-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}.htooltip, .htooltip:visited, .tooltip:active {color: #0077AA;text-decoration: none;}.htooltip:hover {color: #0099CC;}.htooltip span {background-color: rgba(0,0,0, 0.8);border-radius: 5px 5px 0px 0px;-webkit-border-radius: 5px 5px 0px 0px;box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);-webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);color: #fff;margin-left: -1px;margin-top: -24px;opacity: 0;padding: 2px 5px;position: absolute;text-decoration: none;visibility: hidden;z-index: 10;-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;}.htooltip:hover span {position: absolute;opacity: 1;visibility: visible;}";
          GM_addStyle(cssStyle);
          progress_bar_html = "<div class=\"bar_wrap htooltip\">"+
            "<div class=\"bar\" style=\"max-width:150px;width:"+ perc_rounded +"%\"></div>"+
            "<span>\u041F\u0440\u043E\u0433\u0440\u0435\u0441\u0441: "+ perc_rounded +"%</span>"+
            "</div>"+
            "<div style='font-size: 8px; font-weight: bold; margin: -11px 0 0 165px'>"+perc_rounded+"% </div>"+
            "<div><br>&nbsp;&nbsp;\u041D\u0435\u0434\u043E\u043A\u0430\u0447!<br>&nbsp;&nbsp;\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0443\u043C\u0435\u043D\u0438\u0439: +"+Math.round(((srednya_umka/sum_umk)-1)*1000)/10+"%</div>";
        }
        return progress_bar_html;
    }

    function showExpBar(){
        var tabelle = find("//table", XPList);
        var player_info = "";
        var skill_info = "";
        var player_faction = "";
        if (location.href.indexOf('home.php') != -1) {
            //Поиск страницы
            for (var i = 25; i < tabelle.snapshotLength; i++){
                if (!tabelle.snapshotItem(i)) continue;
                if (!tabelle.snapshotItem(i).childNodes[0]) continue;
                if (!tabelle.snapshotItem(i).childNodes[0].childNodes[0]) continue;
                //Player level
                if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0]) {
                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0].innerHTML.indexOf(T('Combat level') +":") > 0) {
                        player_info = tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[0];
                    }
                }
                //Skill Info
                if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1]) {
                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1].innerHTML.indexOf(T('Knight') +":") > 0) {
                        skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[0].childNodes[1];
                    }
                }
            }
          } else if (location.href.indexOf('pl_info.php') != -1) {
              //Поиск страницы
              for (i = 25; i < tabelle.snapshotLength; i++){
                  if (!tabelle.snapshotItem(i)) continue;
                  if (!tabelle.snapshotItem(i).childNodes[0]) continue;
                  //Player Info
                  if (tabelle.snapshotItem(i).childNodes[0].childNodes[2]) {
                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0]) {
                        if (tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0].textContent.indexOf(T('Combat level') +":") > 0) {
                            player_info = tabelle.snapshotItem(i).childNodes[0].childNodes[2].childNodes[0];
                        }
                    }
                }
                //Skill Info
                if (tabelle.snapshotItem(i).childNodes[0].childNodes[1]) {
                    if (tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1]) {
                        if (tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1].textContent.indexOf(T('Knight')) > 0) {
                            skill_info = tabelle.snapshotItem(i).childNodes[0].childNodes[1].childNodes[1];
                        }
                    }
                }
            }
         }

        //========== Combat Level
        var lvl_info = player_info.textContent.split("\u00BB")[1];
        lvl_info.search(/(.*)\((.*)\)(.*)/);
        var lvl_attuale = eval(RegExp.$1.replace(T('Combat level') +": ","")); //БУ
        var exp_attuale = 0;
        var skills = skill_info.innerHTML.split(">&nbsp;&nbsp;");
        //========== Player Faction(s)

        var active_faction_index = factions.indexOf(player_faction);
    // show ALL factions
        for(var faction_index=0; faction_index<factions.length; faction_index++){
          lvl_info = skills[faction_index];
          lvl_info.search(/\((\d*.?\d*)\)/);
          exp_attuale = RegExp.$1;
          sum_umk = sum_umk + Number(exp_attuale);
        }
        sum_umk = Math.round(sum_umk*100)/100;
        var nomerumki = (lvl_attuale - 3);
        srednya_umka = sred_umk[nomerumki];
        var coeff;
        if(lvl_attuale==3){
            coeff=2.5;
        }else if(lvl_attuale==4){
            coeff=2.2;
        }else if(lvl_attuale==5){
            coeff=1.9;
        }else{
            coeff=1.6;
        }
        umk_min = sred_umk[nomerumki]/coeff;
        umk_max = sred_umk[nomerumki]*coeff;

        var progress_bar_html='';
        if (lvl_attuale>2){
          progress_bar_html = makeProgressBar(sum_umk, umk_min, umk_max);
        }
        if (faction_index<factions.length-1) {
            var next_faction = factions[faction_index + 1];
                skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;"+ next_faction, progress_bar_html +"&nbsp;&nbsp;"+ next_faction);
                skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;<b>"+ next_faction, progress_bar_html +"&nbsp;&nbsp;<b>"+ next_faction);
        } else {
            skill_info.innerHTML = skill_info.innerHTML.replace("<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432","<br>&nbsp;&nbsp;<span style='font-weight: bold;'>\u0421\u0443\u043C\u043C\u0430 \u0443\u043C\u0435\u043D\u0438\u0439:</span> "+ sum_umk + progress_bar_html +"<br>&nbsp;&nbsp;\u0413\u0438\u043B\u044C\u0434\u0438\u044F \u041E\u0445\u043E\u0442\u043D\u0438\u043A\u043E\u0432");
        }
  };

})();