// ==UserScript==
// @name           hwm_links_to_auction
// @namespace      hwm_links_to_auction
// @include        https://www.heroeswm.ru/auction.php*
// @include        https://www.lordswm.com/auction.php*
// @include        http://178.248.235.15/auction.php*
// @description    Shows some links to offers in auction
// @homepage       https://greasyfork.org/en/scripts/374616-hwm-links-to-auction
// @version        2.223.1
// ==/UserScript==

// fix by CheckT
// v 2.22.4 Исправлены наименования секторов
// v 2.22.5 добавлен @homepage
// v 2.223.1 Включены изменения стиля от ElMarado

(function () {

  var href=location.href;
  if( href.indexOf("cat=my")==-1 && !href.endsWith("auction.php") )
    return;

  var url = location.protocol + '//' + location.host;

  var elements = new Array('abrasive', 'snake_poison', 'tiger_tusk', 'ice_crystal', 'moon_stone', 'fire_crystal', 'meteorit', 'witch_flower', 'wind_flower', 'fern_flower', 'badgrib');
  var res = {
    'b_wood' : 1,
    'b_ore' : 2,
    'b_mercury' : 3,
    'b_sulphur' : 4,
    'b_crystal' : 5,
    'b_gem' : 6
    };
  var sectors = {
    "Empire Capital":"01",
    "East River":"02",
    "Tiger Lake":"03",
    "Rogues' Wood":"04",
    "Wolf Dale":"05",
    "Peaceful Camp":"06",
    "Lizard Lowland":"07",
    "Green Wood":"08",
    "Eagle Nest":"09",
    "Portal Ruins":"10",
    "Dragons' Caves":"11",
    "Shining Spring":"12",
    "Sunny Sity":"13",
    "Magma Mines":"14",
    "Bear Mountain":"15",
    "Fairy Trees":"16",
    "Harbour City":"17",
    "Mithril Coast":"18",
    "GreatWall":"19",
    "Titans' Valley":"20",
    "Fishing Village":"21",
    "Kingdom Capital":"22",
    "Ungovernable Steppe":"23",
    "Crystal Garden":"24",
    "East Island":"25",
    "Wilderness":"26",
    "Sublime Arbor":"27"
  };

  var type_arts, art, search_s, elem, link_art, bool_el;
  var ems2, ems;
  ems = document.querySelectorAll( "b > a[href*='auction_lot_protocol.php']"); //получили массив выставленных лотов

  for (var i=0;i<ems.length;i++) {
    elem = ems[i].parentNode.parentNode.parentNode.childNodes[0].childNodes[0];
    while (elem.tagName == 'DIV') 
      elem=elem.childNodes[0];
    if (elem.tagName == 'IMG'){ //ресы и элементы
      art = elem.getAttribute('src');
      art = art.substring(art.lastIndexOf("/")+1,art.length-4);
      bool_el = false;
      for (var j=0;j<elements.length;j++) {
        if (elements[j] == art) {
          bool_el = true;
        }
      }
      if (bool_el) {
        link_art = url+'/auction.php?cat=elements&art_type='+art;
      } else if (res[art] != null) {
        link_art = url+'/auction.php?cat=res&type='+res[art];
      } else if (art == 'house_cert'){
        ems2 = ems[i].parentNode.parentNode.childNodes[3].data.replace(/(^\s+|\s+$)/g,'');
        link_art = url+'/auction.php?cat=cert&sort=0&art_type=sec_'+sectors[ems2];
      }
    } else {
      if (elem.tagName == 'A'){ //простые арты
        art = elem.getAttribute('href');
        if (art.indexOf("&") != -1)
          art = art.substring(art.indexOf("=")+1, art.indexOf("&"))
        else
          art = art.substring(art.indexOf("=")+1);
      }
      if (elem.tagName == 'TABLE'){ //сложносоставные или именные арты
        elem = elem.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        if (elem.tagName == 'TABLE') { //сложносоставные именные арты
          elem = elem.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
        }
        art = elem.getAttribute('href');
        art = art.substring(art.indexOf("=")+1,art.indexOf("&"));
      }
      search_s = "option[value*='"+art+"']";
      ems2 = document.querySelectorAll(search_s);
      if (ems2.length > 0) {
        type_arts = ems2[0].getAttribute('value');
        type_arts = type_arts.substring(0,type_arts.indexOf("#"));
        link_art = url+'/auction.php?cat='+type_arts+'&art_type='+art;
      }
    }
    elem = ems[i].parentNode.parentNode;
    elem.appendChild(document.createElement('br'));
    var newa = document.createElement('a');
    newa.innerHTML = '<B>на рынок</B> &gt;&gt;';
    newa.href = link_art;
    newa.setAttribute('class', 'pi');
    elem.appendChild(newa);
  }
})();