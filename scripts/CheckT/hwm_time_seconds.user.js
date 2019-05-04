// ==UserScript==
// @name           hwm_time_seconds
// @namespace      Demin_95725
// @author         Demin
// @description    Время с секундами
// @homepage       https://greasyfork.org/en/scripts/374609-hwm-time-seconds
// @icon           https://i.imgur.com/LZJFLgt.png
// @version        3.2.5
// @encoding       utf-8
// @include        https://www.heroeswm.ru/*
// @include        https://www.lordswm.com/*
// @include        http://178.248.235.15/*
// @exclude        */rightcol.php*
// @exclude        */ch_box.php*
// @exclude        */chat*
// @exclude        */ticker.html*
// @exclude        */frames*
// @exclude        */brd.php*
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// ==/UserScript==

// (c) 2011-2014, demin  ( https://www.heroeswm.ru/pl_info.php?id=15091 )
// fix by CheckT
// old homepage https://greasyfork.org/users/1602-demin

(function() {

  var url_cur = location.href;
  var url = location.protocol+'//'+location.hostname+'/';

  initGm();

  var hm;
  var td_i;
  var online;
  
  init();
  return;

  function init(){
    if ( document.querySelector("body") ) {

      if( !GM_getValue("95725_hwm_time_sec_add") ) GM_setValue("95725_hwm_time_sec_add" , '0');
      if( !GM_getValue("95725_time_error_gm") ) GM_setValue("95725_time_error_gm", '0');
      if( !GM_getValue("95725_time_error2_gm") ) GM_setValue("95725_time_error2_gm", '0');
      if( !GM_getValue("95725_last_synch_gm") ) GM_setValue("95725_last_synch_gm", '1318000000000');

      var time_serv = /([^,]*)(, \d+ online.*)/;
      var time_top = /(\d+):(\d+), \d+ online/;
      var all_td = document.getElementsByTagName('td');
      var td_len = all_td.length;
      var td_ih;
      
      for (var i=0; i<td_len; i++) {
        td_i = all_td[i];
        td_ih = td_i.innerHTML;
        if (td_ih.indexOf("<td")!=-1)
          continue;

        if (td_ih.search(time_top)!=-1) {
          online = (time_serv.exec(td_ih))[2];
          hm = time_top.exec(td_ih);

          td_add = document.createElement( 'td' );
          td_add.setAttribute('align', 'right');
          td_add.setAttribute('id', 'jsset_ts');
          td_add.setAttribute('valign', 'bottom');
          td_add.setAttribute('width', '60');
          td_add.innerHTML="";
          td_i.parentNode.insertBefore(td_add, td_i);
          addEvent($("jsset_ts"), "click", settings);

          if (Number(GM_getValue("95725_last_synch_gm", '0')) + 21600000 < (new Date().getTime()))
            get_time();
          else if ( GM_getValue("95725_time_sec_gm") )
            show_time();
          else
            get_time();

          break;
        }
      }
    }
  }
 
  function show_time() {
    var time_sec = Number(GM_getValue("95725_time_sec_gm"));

    // true time
    var ct = Math.round( ((new Date().getTime())-time_sec)/1000 );
    var dd = Math.floor( ct / 86400 );
    var dh = Math.floor( ( ct - dd * 86400 ) / 3600 );
    var dm = Math.floor( ( ct - dd * 86400 - dh * 3600 ) / 60 );
    var ds = ct % 60;

    if ( (dh!=hm[1]) || (dm-hm[2])>1 || hm[2]>dm ) {
      if ( (dh-hm[1]==1 || hm[1]-dh==23) && (hm[2]-dm==59) ) {
        showtop();
      } else {
        GM_setValue("95725_time_sec_gm", '');
        var err4 = Number(GM_getValue("95725_time_error2_gm"))+1;
        GM_setValue("95725_time_error2_gm", ''+err4);
        //alert(hm[1]+':'+hm[2]+' - '+dh+':'+dm+':'+ds);
        get_time();
      }
    } else {
      GM_setValue("95725_time_error2_gm", '0');
      showtop();
    }
  }

  function get_time() {
    if ( Number(GM_getValue("95725_time_error_gm"))<4 && Number(GM_getValue("95725_time_error2_gm"))<4 ) {
      if ( Number(GM_getValue("95725_last_synch_gm", '0')) + 60000 < (new Date().getTime()) ) {
        GM_setValue("95725_last_synch_gm", ''+(new Date().getTime()));
        var objXMLHttpReqTime = new XMLHttpRequest();
        objXMLHttpReqTime.open('GET', 'time.php' + '?rand=' + (Math.random()* 1000000), true);
        objXMLHttpReqTime.onreadystatechange = function() { handleHttpResponseTime(objXMLHttpReqTime); }
        objXMLHttpReqTime.send(null);
      } else {
        setTimeout(function() { get_time(); }, 60000);
      }
    }
  }

  function handleHttpResponseTime(obj) {
    if (obj.readyState == 4 && obj.status == 200) {
      if ( sec_serv = /now (\d+)/.exec(obj.responseText) ) {
        // 1318550400000  75600000
        sec_serv = Number( sec_serv[1] ) * 1000 + Number( GM_getValue("95725_hwm_time_sec_add") ) * 1000 - 1318626000000;
        sec_serv = new Date().getTime() - sec_serv;
        GM_setValue("95725_time_sec_gm", '' + sec_serv);
        GM_setValue("95725_time_error_gm", '0');
        show_time();
      } else {
        var err3 = Number(GM_getValue("95725_time_error_gm"))+1;
        GM_setValue("95725_time_error_gm", ''+err3);
        setTimeout(function() { get_time(); }, 60000);
      }
    }
  }

  function showtop() {
    var time_sec = Number(GM_getValue("95725_time_sec_gm"));
    var ct = Math.round( ((new Date().getTime())-time_sec)/1000 );
    var dd = Math.floor( ct / 86400 );
    var dh = Math.floor( ( ct - dd * 86400 ) / 3600 );
    var dm = Math.floor( ( ct - dd * 86400 - dh * 3600 ) / 60 );
    var ds = ct % 60;
    td_i.innerHTML = dh + ':' + ( (dm < 10) ? '0' : '' ) + dm + ':' + ( (ds < 10) ? '0' : '') + ds + online;
    setTimeout(function() {showtop(td_i)}, 1000);
  }

  function settings_close() {
    var bg = $('bgOverlay');
    var bgc = $('bgCenter');
    bg.parentNode.removeChild(bg);
    bgc.parentNode.removeChild(bgc);
  }

  function settings() {
    var bg = $('bgOverlay');
    var bgc = $('bgCenter');
    var bg_height = ScrollHeight();

    if ( !bg ){
      bg = document.createElement('div');
      document.body.appendChild( bg );

      bgc = document.createElement('div');
      document.body.appendChild( bgc );
    }

    bg.id = 'bgOverlay';
    bg.style.position = 'absolute';
    bg.style.left = '0px';
    bg.style.width = '100%';
    bg.style.background = "#000000";
    bg.style.opacity = "0.5";
    bg.style.zIndex = "7";

    bgc.id = 'bgCenter';
    bgc.style.position = 'absolute';
    bgc.style.left = ( ( ClientWidth() - 650 ) / 2 ) + 'px';
    bgc.style.width = '650px';
    bgc.style.background = "#F6F3EA";
    bgc.style.zIndex = "8";

    addEvent(bg, "click", settings_close);

    if ( url.match('lordswm') ) {
      var st_1 = 'Adding';
      var st_2 = 'second(s) to the sync (page load time from the server)';
      var st_3 = 'Restart the script';
      var st_author = 'Script author';
    } else {
      st_1 = '\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C';
      st_2 = '\u0441\u0435\u043A\u0443\u043D\u0434(\u044B) \u043D\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E (\u0432\u0440\u0435\u043C\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430)';
      st_3 = '\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0441\u043A\u0440\u0438\u043F\u0442';
      st_author = '\u0410\u0432\u0442\u043E\u0440 \u0441\u043A\u0440\u0438\u043F\u0442\u0430';
    }

    bgc.innerHTML = '<div style="border:1px solid #abc;padding:5px;margin:2px;"><div style="float:right;border:1px solid #abc;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close_tr" title="Close">x</div><table>'+
    '<tr><td>'+st_1+' <input id="hwm_time_add" value="'+
    GM_getValue("95725_hwm_time_sec_add")+
    '" size="1" maxlength="2"> '+st_2+'</b> <input type="submit" id="hwm_time_add_ok" value="ok"><br><br></td></tr>'+

    '<tr><td><input type="submit" id="ref48" value="'+st_3+'"></td></tr>'+

    '</table><table width=100%>'+
    '<tr><td style="text-align:right">'+st_author+': <a href="pl_info.php?id=15091">Demin</a></td></tr>'+
    '</table></div>';

    addEvent($("bt_close_tr"), "click", settings_close);
    addEvent($("hwm_time_add_ok"), "click", hwm_time_add_f);
    addEvent($("ref48"), "click", ref48_f);

    bg.style.top = '0px';
    bg.style.height = bg_height + 'px';
    bgc.style.top = ( window.pageYOffset + 150 ) + 'px';
    bg.style.display = '';
    bgc.style.display = '';
  }

  function hwm_time_add_f(){
    if ( Number( $("hwm_time_add").value ) >= 0 )
      GM_setValue( "95725_hwm_time_sec_add" , '' + $("hwm_time_add").value );
  }

  function ref48_f(){
    GM_setValue("95725_time_error_gm", '0');
    GM_setValue("95725_time_error2_gm", '0');
    GM_setValue("95725_time_sec_gm", '');
    GM_setValue("95725_last_synch_gm", '');
  }

  function ClientHeight() {
    return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
  }

  function ClientWidth() {
    return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientWidth:document.body.clientWidth;
  }

  function ScrollHeight() {
    return Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
  }

  function $(id) { return document.querySelector("#"+id); }

  function addEvent(elem, evType, fn) {
    if(elem && fn){
      if (elem.addEventListener)
        elem.addEventListener(evType, fn, false);
      else if (elem.attachEvent)
        elem.attachEvent("on" + evType, fn);
      else
        elem["on" + evType] = fn;
    }
  }

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
})();
