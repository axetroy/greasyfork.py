// ==UserScript==
// @name           hwm_inventory_new_lot
// @namespace      hwm_pahan
// @author         Pahan
// @description    Выставление лота из инвентаря, сохранение цены для предмета
// @icon           http://dcdn.heroeswm.ru/avatars/30/nc-5/30547.gif
// @version        1.80.3
// @homepage       https://greasyfork.org/en/scripts/374876-hwm-inventory-new-lot
// @encoding       utf-8
// @include        https://www.heroeswm.ru/inventory.php*
// @include        https://www.heroeswm.ru/auction_new_lot.php*
// @include        https://www.heroeswm.ru/transfer.php*
// @include        https://www.lordswm.com/inventory.php*
// @include        https://www.lordswm.com/auction_new_lot.php*
// @include        https://www.lordswm.ru/transfer.php*
// @include        http://178.248.235.15/inventory.php*
// @include        http://178.248.235.15/auction_new_lot.php*
// @include        http://178.248.235.15/transfer.php*
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// ==/UserScript==

//fix by CheckT
// old homepage https://greasyfork.org/uk/scripts/13223-hwm-inventory-new-lot

(function(){

  // settings
  var LNewLotDurationDef = '3';
  // settings end

  initGm();
  var gm_prefix = 'hwmnil_';

  var GlobalLocalizedString = getGlobalLocalizedString();
  setStyle();

  ProcessMain();

  return; //only functions below

  function ProcessMain() {
    if (location.href.indexOf('/inventory.php') > -1) {
      AddNewLotHrefs();

      addEvent(getClickDiv(), "click", SetTimer_ProcessMain);
      installClickDivHook();

    } else if (location.href.indexOf('/auction_new_lot.php') > -1) {
      InitNewLotForm();
    }
  }

  function URLAttrValueGet(attr_name, aurl){
   attr_name = attr_name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]" + attr_name + "=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( aurl );
   if( results == null )
    return '';
   else
    return results[1];
  }

  function Ajax(AMethod, AURL, AParams, ACallBackFunc){
    var LRequest = new XMLHttpRequest();
    LRequest.open(AMethod, AURL, true);
    LRequest.overrideMimeType('text/html; charset=windows-1251');
    LRequest.send(AParams);
    LRequest.onreadystatechange = function(){
      if (LRequest.readyState == 4){
        ACallBackFunc(LRequest.responseText);
      }
    };
  }

  function setEdit(id, key){
    var LValue = parseInt($(id).value);
    gm_set(key, LValue);
  }

  function GetProchkaInfo(ALink) {
    var LElem = ALink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var regex = /\:\s+(\d+\/\d+)\<br\>/;
    var regex_res = regex.exec(LElem.innerHTML);
    if(regex_res)
      return regex_res[1];
    else
      return '';
  }

  function CheckIfShowLink(ALink){
    if(gm_get_bool('only_chest')){
      var LElem = ALink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      return LElem.innerHTML.indexOf('inv_s_s1.gif') > -1;
        //https://dcdn.heroeswm.ru/i/inv_s_s0.gif - не в сундуке
        //https://dcdn.heroeswm.ru/i/inv_s_s1.gif - в сундуке
    }
    return true;
  }

  function CheckCanSell(ALink) {
    var LElem = ALink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var LLinks = LElem.querySelectorAll('a[href*="art_transfer.php"]');
    return (LLinks && (LLinks.length == 1));
  }

  function AddNewLotHref(ALink, AURL, ADurationDisp, ADuration) {
    ALink.parentNode.appendChild(document.createTextNode(' '));
    var LNewLotHref = document.createElement('a');
    LNewLotHref.href = AURL + '&d=' + ADuration;
    LNewLotHref.innerHTML = ADurationDisp;
    ALink.parentNode.appendChild(LNewLotHref);
  }

  function SetTimer_ProcessMain() {
    setTimeout(AddNewLotHrefs, 30);
  }

  function AddNewLotHrefs() {
    var LLinks = document.querySelectorAll('a[href^="art_info.php"]');
    var LLink;
    if (LLinks) {
      for(var i = 0; i < LLinks.length; i++) {
        LLink = LLinks[i];

        if (CheckCanSell(LLink) && CheckIfShowLink(LLink)) {
          var LName = LLink.children[0].innerHTML + ' ' + GetProchkaInfo(LLink);
          var LURL = '/auction_new_lot.php?art=' + encodeURIComponent(LName);

          var LLinksTest = LLink.parentNode.querySelectorAll('a[href^="' + LURL + '"]');
          if (LLinksTest && (LLinksTest.length > 0))
            continue;

          LLink.parentNode.appendChild(document.createElement('br'));
  //        LLink.parentNode.appendChild(document.createTextNode('»»'));
          LLink.parentNode.appendChild(document.createTextNode(GlobalLocalizedString.Sell));

  //        LNewLotHref = document.createElement('a');
  //        LNewLotHref.href = LURL;
  //        LNewLotHref.innerHTML = GlobalLocalizedString.Sell;
  //        LLink.parentNode.appendChild(LNewLotHref);

          if(!gm_get_bool('hide_30m'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._30m, '30m');
          if(!gm_get_bool('hide_1h'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._1h, '1h');
          if(!gm_get_bool('hide_3h'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._3h, '3h');
          if(!gm_get_bool('hide_6h'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._6h, '6h');
          if(!gm_get_bool('hide_12h'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._12h, '12h');
          if(!gm_get_bool('hide_1d'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._1d, '1d');
          if(!gm_get_bool('hide_2d'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._2d, '2d');
          if(!gm_get_bool('hide_3d'))
            AddNewLotHref(LLink, LURL, GlobalLocalizedString._3d, '3d');
        }
      }
    }
  }

  function PriceTrimNewLotForm() {
    var LPriceEl = document.forms.f.price;
    LPriceEl.value = LPriceEl.value.trim().replace(/[^\d]/g, '');
  }

  function SavePrice() {
    var LSelect = document.forms.f.item;
    var LPrice = parseInt(document.forms.f.price.value);
    var LName = LSelect.options[LSelect.selectedIndex].text.split(' (')[0].split(' [i]')[0];
    var LInfo;
    if (LName != '') {
      LInfo = document.createTextNode('');

      LInfo = $('save_price_info');
      if (!LInfo) {
        LInfo = document.createElement('b');
        LInfo.id = 'save_price_info';
        $('id_save_price').parentNode.appendChild(LInfo);
      }
      if (LPrice && (LPrice != 0) && (LPrice != '')) {
        gm_set(LName, LPrice);
        LInfo.innerHTML = 'Сохранена цена ' + LPrice + ' для артефакта "' + LName + '"';
      } else {
        gm_del(LName);
        LInfo.innerHTML = 'Удалена цена для артефакта "' + LName + '"';
      }
    }
  }

  function InitNewLotForm() {
    if (document.forms.f.sign) {
      if (gm_get_bool('one_click'))
        document.forms.f.submit();
    } else {
      var LSelect = document.forms.f.item;
      addEvent(LSelect, 'change', LoadPrice);
      var LArt = decodeURIComponent(URLAttrValueGet('art', location.href));
      var LArtTrim = DeleteCRLF(LArt);
      var LArtFull = '';
      var LOption ;
      if (LArt != '') {
        for(var i = 0; i < LSelect.options.length; i++) {
          LOption = LSelect.options[i];
          if ((LOption.text.indexOf(LArt) == 0) || (LOption.text.indexOf(LArtTrim) == 0)) {
            LArtFull = LOption.text;
            LSelect.selectedIndex = LOption.index;
          }
        }
      }

      var LCountEl = document.forms.f.count;
      var LCount = 1;
      if (LArtFull != '') {
        var regex = /\((\d+)\)/;
        var regex_res = regex.exec(LArtFull);
        if (regex_res)
          LCount = Math.min(parseInt(regex_res[1]), 3);
      }
      LCountEl.value = LCount;

      var LPriceEl = document.forms.f.price;
      addEvent(LPriceEl, "change", PriceTrimNewLotForm);
      addEvent(LPriceEl, "keyup", PriceTrimNewLotForm);
      addEvent(LPriceEl, "paste", PriceTrimNewLotForm);
      LoadPrice();

      var LNewDiv = document.createElement('b');
      LNewDiv.innerHTML = '<input type="button" style="width:80;" id="id_save_price" value="Сохранить">';
      LPriceEl.parentNode.insertBefore(LNewDiv, LPriceEl.nextSibling);
      addClickEvent('id_save_price', SavePrice);

      LNewDiv = document.createElement('b');
      LNewDiv.innerHTML =
        '<input type="button" style="width:25;height:25;font-size=10px;padding:0;margin:0;" id="id_decrement_price" value="-">' +
        '<input type="button" style="width:25;height:25;font-size=10px;padding:0;margin:0;" id="id_increment_price" value="+">';
      LPriceEl.parentNode.insertBefore(LNewDiv, LPriceEl.nextSibling);
      addClickEvent('id_decrement_price', DecrementPrice);
      addClickEvent('id_increment_price', IncrementPrice);

      var LDurationEl = document.forms.f.duration;
      var LDuration = LNewLotDurationDef;
      var LDurationParam = URLAttrValueGet('d', location.href);
      switch (LDurationParam) {
        case '30m': LDuration = 1; break;
        case '1h':  LDuration = 2; break;
        case '3h':  LDuration = 3; break;
        case '6h':  LDuration = 4; break;
        case '12h': LDuration = 5; break;
        case '1d':  LDuration = 6; break;
        case '2d':  LDuration = 7; break;
        case '3d':  LDuration = 8; break;
        default:    LDuration = LNewLotDurationDef;
      }

      for(i = 0; i < LDurationEl.options.length; i++) {
        LOption = LDurationEl.options[i];
        if (LOption.value == LDuration) {
          LDurationEl.selectedIndex = LOption.index;
        }
      }

      var LSubmits = document.querySelectorAll('input[type="submit"]');
      if (LSubmits && LSubmits.length > 0) {
        var LSubmit = LSubmits[0];
        var LDiv = document.createElement('div');
        LDiv.innerHTML = '<div class="btn_settings" id="' +
            gm_prefix+'hwm_options">Настройки hwm_inventory_new_lot</div>';
        LSubmit.parentNode.insertBefore(LDiv, LSubmit.nextSibling);
        addClickEvent(gm_prefix+'hwm_options', open_setting_form);
      }
    }
  }
//--------------------------------
  function open_setting_form() {
    var bg = $(gm_prefix+'bgOverlay') ;
    var bgc = $(gm_prefix+'bgCenter') ;
    if( !bg ) {
      bg = document.createElement('div') ;
      bg.id = gm_prefix+'bgOverlay';
      document.body.appendChild( bg );
      bg.className = 'dialogOverlay';
      addEvent(bg, 'click', close_setting_form);

      bgc = document.createElement('div') ;
      bgc.id = gm_prefix+'bgCenter' ;
      document.body.appendChild( bgc );
      bgc.className = 'dialog';

      bgc.innerHTML =
        '<div style="border:1px solid #abc;padding:5px;margin:2px;">' +
        '  <div class="btn_close" id="'+gm_prefix+'bt_close" title="Закрыть">x</div>' +
        '  <center>' +
        '    <table>' +
        '      <tr><td><div id="'+gm_prefix+'dialog_content">' +
        '<div><b>Настройки:</b></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'one_click" title=""> Выставлять лот в один клик</div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'only_chest" title=""> Ссылки только для сундука</div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_30m" title=""> Не показывать ссылку 30м</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_1h" title=""> Не показывать ссылку 1ч</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_3h" title=""> Не показывать ссылку 3ч</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_6h" title=""> Не показывать ссылку 6ч</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_12h" title=""> Не показывать ссылку 12ч</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_1d" title=""> Не показывать ссылку 1д</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_2d" title=""> Не показывать ссылку 2д</div></div>' +
        '<div><input type="checkbox" id="'+gm_prefix+'hide_3d" title=""> Не показывать ссылку 3д</div></div>' +
                '</td></tr>' +
        '    </table>' +
        '  </center>' +
        '</div>';

      addClickEvent(gm_prefix+'bt_close', close_setting_form);
    }
    bg.style.display = bgc.style.display = 'block' ;

    add_switch('one_click');
    add_switch('only_chest');
    add_switch('hide_30m');
    add_switch('hide_1h');
    add_switch('hide_3h');
    add_switch('hide_6h');
    add_switch('hide_12h');
    add_switch('hide_1d');
    add_switch('hide_2d');
    add_switch('hide_3d');
  }

  function close_setting_form() {
      var bg = $(gm_prefix+'bgOverlay') ;
      if( bg ) {
        bg.style.display = 'none' ;
        $(gm_prefix+'bgCenter').style.display = 'none' ;
      }
  }

  function add_switch(name){
    var link = $(gm_prefix+name);
    link.checked = gm_get_bool(name);
    addEvent(link, "click", do_switch);
  }

  function do_switch(){
    var id = this.id;
    if(!id || id.indexOf(gm_prefix) !== 0)
      return;
    var name = id.substring(gm_prefix.length);
    gm_set_bool(name, !gm_get_bool(name));
  }

  function LoadPrice() {
    var LSelect = document.forms.f.item;
    var LPriceEl = document.forms.f.price;
    var LName = LSelect.options[LSelect.selectedIndex].text.split(' (')[0].split(' [i]')[0];

    //LPriceEl.value = gm_get(LName, '0');
    LPriceEl.value = loadValue(LName);
  }

  function loadValue(LName){
    //fix old settings if exists
    var old_value = GM_get_once(LName);
    var new_value = gm_get(LName);
    if(old_value && !new_value){
      new_value = old_value;
      gm_set(LName, new_value);
    }
    return new_value ? new_value : '0';
  }


  function DecrementPrice() {
    var LPriceEl = document.forms.f.price;
    LPriceEl.value = parseInt(LPriceEl.value) - 1;
  }

  function IncrementPrice() {
    var LPriceEl = document.forms.f.price;
    LPriceEl.value = parseInt(LPriceEl.value) + 1;
  }

  function setStyle(){
    GM_addStyle('.dialog {background-color: #F6F3EA; border-radius: 5px; box-sizing: border-box; box-shadow: 0 0 0px 12px rgba(200, 200, 200, 0.5); left: calc(50% - 300px); max-height: calc(100% - 100px); overflow: auto; padding: 15px; position: fixed; top: 50px; z-index: 1105;}');
    GM_addStyle('.dialogOverlay {background-color: rgba(0, 0, 0, 0.7); height: 100%; left: 0; position: fixed; top: 0; width: 100%;}');
    GM_addStyle('.btn_close {position:absolute;left:calc(100% - 45px);float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;}');
    GM_addStyle('.btn_settings {text-decoration:underline;cursor:pointer;font-weight:bold;font-size:10px;width:500px;}');
    GM_addStyle('.small_text {font-weight:bold;font-size:10px;}');
  }

  function getGlobalLocalizedString(){
    var GlobalCultureName = location.href.match('lordswm') ? "en-US" : "ru-RU";
    var GlobalStrings = {
        "ru-RU" : {
            Sell : "Прод:",
            _30m : "30м",
            _1h : "1ч",
            _3h : "3ч",
            _6h : "6ч",
            _12h : "12ч",
            _1d : "1д",
            _2d : "2д",
            _3d : "3д",
        },
        "en-US" : {
            Sell : "Sell:",
            _30m : "30m",
            _1h : "1h",
            _3h : "3h",
            _6h : "6h",
            _12h : "12h",
            _1d : "1d",
            _2d : "2d",
            _3d : "3d",
        }
      };
    return GlobalStrings[GlobalCultureName];
  }

  function Trim(AText){
    return AText.replace(/^\s+|\s+$|^(&nbsp;)+|(&nbsp;)+$/g, '');
  }

  function DeleteCRLF(AText){
    return AText.replace(/[\n\r]/g, ' ').replace(/\s{2,}/g, ' ');
  }

  function Assert(ACondition, AMessage){
    if (ACondition)
      return;
    localStorage['trade.status'] = 'Stoped';
    alert('ERROR: ' + AMessage);
    throw new Error(AMessage);
  }

  function FloatFormat(AFloat){
    return Math.round(AFloat).toString();
  }

  function IntFormatWithThouthandSeparator(num){
      var n = num.toString(), p = n.indexOf('.');
      return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function($0, i){
          return p<0 || i<p ? ($0+',') : $0;
      });
  }

  function addEvent(elem, evType, fn) {
    if(elem){
      if (elem.addEventListener)
        elem.addEventListener(evType, fn, false);
      else if (elem.attachEvent)
        elem.attachEvent("on" + evType, fn);
      else
        elem["on" + evType] = fn;
    }
  }

  function addChangeEvent(id, func){
    var elem = $(id);
    if(elem && func)
      addEvent(elem, "change", func);
  }

  function addClickEvent(id, func){
    var elem = $(id);
    if(elem && func)
      addEvent(elem, "click", func);
  }

  function $(id) { return document.querySelector("#"+id); }

  function initGm(){
    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
      this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
      };
      this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
      };
      this.GM_deleteValue=function (key) {
        return delete localStorage[key];
      };
    }
    if (!this.GM_listValues || (this.GM_listValues.toString && this.GM_listValues.toString().indexOf("not supported")>-1)) {
      this.GM_listValues=function () {
        var keys=[];
        for (var key in localStorage){
          keys.push(key);
        }
        return keys;
      };
    }
  }

  function GM_get_once(key, def){
    var val = GM_getValue(key, def);
    GM_deleteValue(key);
    return val;
  }

  function GM_load_num(key, def){
    var val = Number(GM_getValue(key, def));
    return isNaN(val) ? def : val;
  }

  // 1 -> true; otherwise false
  function GM_load_bool_from_num(key){
    var val = Number(GM_getValue(key, 0));
    return isNaN(val) ? false : val==1;
  }

  // true -> 1; otherwise 0
  function GM_save_num_from_bool(key, val){
    GM_setValue(key, val ? 1 : 0);
  }

  function gm_get(key, def){
    return GM_getValue(gm_prefix+key, def);
  }

  function gm_set(key, val){
    return GM_setValue(gm_prefix+key, val);
  }

  function gm_del(key, def){
    var val = GM_getValue(gm_prefix+key);
    GM_deleteValue(gm_prefix+key);
    return val ? val : def;
  }

  function gm_get_num(key, val){
    return GM_load_num(gm_prefix+key, val);
  }

  function gm_set_bool(key, val){
    return GM_save_num_from_bool(gm_prefix+key, val);
  }

  function gm_get_bool(key, val){
    return GM_load_bool_from_num(gm_prefix+key);
  }

  function gm_list(){
    var keys = GM_listValues();
    var filtered = [];
    for ( var i = 0, len = keys.length; i < len; i++ ) {
      var key = keys[i];
      if(key.indexOf(gm_prefix) === 0)
        filtered.push(key);
    }
    return filtered;
  }

  function installClickDivHook(){
    if(!window.ct_clickdiv_hooked && !window.inject_ClickDivHook){
      var elem = document.createElement('script');
      elem.type = "text/javascript";
      elem.innerHTML = inject_ClickDivHook.toString() + "\n inject_ClickDivHook()";
      document.querySelector("head").appendChild(elem);
    }
  }

  function inject_ClickDivHook(){
    if(!window.ct_clickdiv_hooked){
      window.ct_clickdiv_hooked = true;
      window.saved_show_arts_by_cat = window.show_arts_by_cat;  //сохраняем текущий show_arts_by_cat
      window.show_arts_by_cat = function(cat,r){
        window.saved_show_arts_by_cat(cat,r);         //вызываем сохранённую версию
        document.getElementById('click_div').click(); //кликаем
      }
    }
  }

  function getClickDiv(){
    var click_div = document.querySelector("#click_div");
    if(!click_div) {
      click_div = document.createElement('div');
      click_div.id = "click_div";
      click_div.style.display = "none";
      document.querySelector("body").appendChild(click_div);
    }
    return click_div;
  }

})();
