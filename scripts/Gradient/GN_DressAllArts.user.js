// ==UserScript==
// @name        GN_DressAllArts
// @namespace   Gradient
// @description Принять и надеть все подвешенные артефакты
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/inventory\.php/
// @version     1.0.3
// ==/UserScript==

"use strict";

//----------------------------------------------------------------------------//

(function(){ // wrapper start
  
//----------------------------------------------------------------------------//
// UnifiedLibrary 1.7.0 start
//----------------------------------------------------------------------------//

var script_name = 'GN_DressAllArts'; // Enter your script name here

//----------------------------------------------------------------------------//
// SysUtils
//----------------------------------------------------------------------------//

var GN_SysUtils = new SysUtils(script_name);
var SU = GN_SysUtils;

//----------------------------------------------------------------------------//

function SysUtils(name){  // wrapper start

//----------------------------------------------------------------------------//
  
this.show_error = function(error_string, use_alert){
  if(use_alert)
    alert(error_string);
  
  throw new Error(error_string);
};
  
if(arguments.length != 1)
  this.show_error('Wrong SysUtils arguments');
  
if(!arguments[0])
  this.show_error('Empty SysUtils argument');
  
//----------------------------------------------------------------------------//

var current_id = null;

//----------------------------------------------------------------------------//

function check_mandatory_scripts(alerter){
  var persistent_storage_sign = document.getElementById('GN_GM_Handler');
  var common_values_sign      = document.getElementById('GN_CommonValuesSign');
  var alert_sign              = document.getElementById('GN_AlertSign');
  
  if(!alert_sign){
    alert_sign = document.createElement('div');
    alert_sign.id = 'GN_AlertSign';
    alert_sign.setAttribute('alerted', 'false');
    document.body.appendChild(alert_sign);
  }
  
  var alerted = alert_sign.getAttribute('alerted') != 'false';
      
  if(!persistent_storage_sign){
    alert_sign.setAttribute('alerted', 'true');
    alerter('Скрипт ' + name + ' требует для своей работы скрипт управления данными (GN_PersistentStorage), который должен стоять первым в порядке выполнения скриптов.\n'
          + 'Подробнее здесь: "https://greasyfork.org/ru/scripts/14049-Как-устанавливать-скрипты-читать-здесь"', !alerted);
  }
  
  if(!common_values_sign){
    alert_sign.setAttribute('alerted', 'true');
    alerter('Скрипт ' + name + ' требует для своей работы скрипт, хранящий данные (GN_CommonValuesFiller), который должен стоять вторым в порядке выполнения скриптов.\n'
          + 'Подробнее здесь: "https://greasyfork.org/ru/scripts/14049-Как-устанавливать-скрипты-читать-здесь"', !alerted);
  }
}

this.check_login = function(){
  var re = /.*?pl_id=(\d+)[^\d]*?/gmi;
  var matches = re.exec(document.cookie.toString());
  
  if(!matches)
    this.show_error('Пользователь не авторизован');
    
  current_id = +matches[1];
  
  check_mandatory_scripts(this.show_error);
};
  
//----------------------------------------------------------------------------//

this.reload_page = function(){
  document.location.href = document.location.href;
};  

//----------------------------------------------------------------------------//

this.check_login();

//----------------------------------------------------------------------------//  
  
} // wrapper end

//----------------------------------------------------------------------------//
// UnifiedLibrary end
//----------------------------------------------------------------------------//

var show_error  = SU.show_error;
var reload_page = SU.reload_page;  
  
var receivable_artefacts = [];
var known_uids           = [];  
var is_work_started      = false;  
  
start_work();
  
//----------------------------------------------------------------------------//
  
function start_work(){
  var parent = document.querySelector('table.wblight[width="990"] > tbody > tr > td.wb[width="350"] > table > tbody > tr:last-of-type > td > table > tbody');
  
  if(!parent)
    show_error('Не найдена таблица с артефактами для передачи');
  
  get_receivable(parent);
  
  if(receivable_artefacts.length)
    draw_buttons(parent);
}
  
//----------------------------------------------------------------------------//
  
function draw_buttons(parent){
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.className = 'wb';
  td.textContent = 'Подвешенные артефакты:';
  tr.appendChild(td);
  
  td = document.createElement('td');
  td.className = 'wb';
  td.setAttribute('align', 'right');
  tr.appendChild(td);
  
  var accept = document.createElement('u');
  accept.id          = script_name + 'Accept';
  accept.textContent = 'Принять и надеть все';
  accept.onclick     = accept_all;
  
  var b = document.createElement('b');
  b.appendChild(accept);
  td.appendChild(b);
  
  td.appendChild(document.createTextNode('\xA0\xA0'));

  var decline = document.createElement('u');
  decline.id          = script_name + 'Decline';
  decline.textContent = 'Отклонить';
  decline.onclick     = decline_all;
  
  b = document.createElement('b');
  b.appendChild(decline);
  td.appendChild(b);
  
  var p_parent = parent.parentNode.parentNode.parentNode.parentNode;
  p_parent.insertBefore(tr, p_parent.lastChild.previousSibling);  
}
  
//----------------------------------------------------------------------------//
  
function get_receivable(parent){
  var trades = parent.querySelectorAll('a[href*="trade_accept.php?tid="]');
  
  for(var i = 0; i < trades.length; ++i){
    var trade_tr = trades[i].parentNode.parentNode;
    var desc_tr  = trade_tr.previousSibling;
    var art_tr   = desc_tr.previousSibling;
    
    var desc = desc_tr.innerHTML.replace('(\r|\n)', '');
    
    if(/Прочноcть: <b>0\/\d+<\/b>/gmi.test(desc)){
      //console.error('Incorrect durability: ' + desc);
      continue;
    }
    
    var re = /<b>'(\d+)' боев<\/b>/gmi;
    var matches = re.exec(desc);
    
    if(!matches || !+matches[1]){
      //console.error('Too few battles: ' + desc);
      continue;      
    }
    
    var obj = {
      desc:      desc,
      trade_url: trades[i],
      bcount:    +matches[1],
      name:      art_tr.querySelector('td > b').textContent,
      owner:     art_tr.querySelector('a > b').textContent,
      url:       desc_tr.querySelector('a[href*="art_info.php?id="] > img[width="50"]').parentNode.href  
    };
    
    re = /Прочноcть: <b>(\d+)\/(\d+)<\/b>/gmi;
    matches = re.exec(desc);
    
    obj.cur_dur = +matches[1];
    obj.max_dur = +matches[2];
    
    re = /(\d+)/;
    matches = re.exec(art_tr.querySelector('a').href);
    
    obj.owner_id = +matches[1];
    
    receivable_artefacts.push(obj);
  }
}
  
//----------------------------------------------------------------------------//
  
function accept_all(){
  if(is_work_started)
    return;
  
  document.body.style.cursor = 'wait';
  
  ['Accept', 'Decline'].forEach(function(current){
    var el = document.getElementById(script_name + current);
    el.setAttribute('disabled', '');
  });
  
  is_work_started = true; 
  
  var counter = {
    current: receivable_artefacts.length - 1
  };

  accept_next(counter);  
}
  
//----------------------------------------------------------------------------//
  
function accept_next(counter){
  var url = receivable_artefacts[counter.current].trade_url; 
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.overrideMimeType('text/plain; charset=windows-1251');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        if(--counter.current >= 0)
          accept_next(counter);
        else{
          receivable_artefacts.forEach(function(current){
            var re      = /uid=(\d+)/;
            var matches = re.exec(current.url);
            
            if(matches)
              known_uids.push(+matches[1]);
          });
          
          var dcounter = {
            current: known_uids.length - 1
          };
          
          known_uids.length == receivable_artefacts.length ? dress_next(dcounter) : get_ids_from_inventory();
        }
      }
    }
  };

  xhr.send(null); 
}
  
//----------------------------------------------------------------------------//
  
function get_ids_from_inventory(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/inventory.php', true);
  xhr.overrideMimeType('text/plain; charset=windows-1251');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var response = xhr.response.replace('(\r|\n)', '');
        
        // TODO: art type (avoid, f.e, sword a/b and bow a/b from same owner)
        receivable_artefacts.forEach(function(current){
          if(!/uid=(\d+)/.test(current.url)){
            var re = new RegExp('.+Прочноcть: ' + current.cur_dur + '\/' + current.max_dur + '<br>Владелец: <a class=pi href=\'pl_info\\.php\\?id=' 
                              + current.owner_id + '\'><b>' + current.owner + '<\/b>.+?inventory\\.php\\?art_return=(\\d+).+', 'gmi');

            var matches = re.exec(response);
            known_uids.push(+matches[1]);
          }     
        });
        
        if(known_uids.length != receivable_artefacts.length)
          show_error('Counts not matches');
        
        var dcounter = {
          current: known_uids.length - 1
        };

        dress_next(dcounter);
      }
    }
  };

  xhr.send(null); 
}
  
//----------------------------------------------------------------------------//
  
function dress_next(counter){
  var uid = known_uids[counter.current];
  var url = '/inventory.php?dress=' + uid + '&js=1&rand=' + Math.random()*1000000;
  
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.overrideMimeType('text/plain; charset=windows-1251');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        if(--counter.current >= 0)
          dress_next(counter);
        else
        {
          document.body.style.cursor = 'default';
          reload_page();
        }
      }
    }
  };

  xhr.send(null); 
}
  
//----------------------------------------------------------------------------//
 
function decline_all(){
  if(is_work_started)
    return;
  
  if(!confirm('Вы уверены, что хотите отклонить все подвешенные для боя артефакты?'))
    return;
  
  document.body.style.cursor = 'wait';
  
  ['Accept', 'Decline'].forEach(function(current){
    var el = document.getElementById(script_name + current);
    el.setAttribute('disabled', '');
  });
  
  is_work_started = true;
  
  var counter = {
    current: receivable_artefacts.length - 1
  };

  decline_next(counter);  
}
  
//----------------------------------------------------------------------------//
  
function decline_next(counter){
  var re      = /trade_accept\.php\?tid=(\d+)/;
  var matches = re.exec(receivable_artefacts[counter.current].trade_url);
  var url     = '/trade_cancel.php?tid=' + matches[1];

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.overrideMimeType('text/plain; charset=windows-1251');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        if(--counter.current >= 0)
          decline_next(counter);
        else
        {
          document.body.style.cursor = 'default';
          reload_page();
        }
      }
    }
  };

  xhr.send(null); 
}

//----------------------------------------------------------------------------//
  
}());  // wrapper end

//----------------------------------------------------------------------------//