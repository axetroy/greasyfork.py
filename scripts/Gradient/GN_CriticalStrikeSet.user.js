// ==UserScript==
// @name        GN_CriticalStrikeSet
// @namespace   Gradient
// @description Переключение наборов критических ударов
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/.+/
// @exclude     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost)\.php.*/
// @version     1.0.3
// ==/UserScript==

"use strict";

//----------------------------------------------------------------------------//

(function(){ // wrapper start
  
//----------------------------------------------------------------------------//
// UnifiedLibrary 1.7.0 start
//----------------------------------------------------------------------------//

var script_name = 'GN_CriticalStrikeSet'; // Enter your script name here

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
  
this.send_async_post = function(url, params){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params); 
};
  
//----------------------------------------------------------------------------//  
 
this.save_value = function(desc, value){
  var div = document.getElementById('GN_GM_Handler');
  div.setAttribute('desc',      desc);
  div.setAttribute('value',     value);
  div.setAttribute('operation', 'save');
  
  div.click();
  
  if(div.getAttribute('state') != 'complete')
    this.show_error('Ошибка при сохранении значения');
};
  
//----------------------------------------------------------------------------//  

this.load_value = function(value, def){
  var div = document.getElementById('GN_GM_Handler');
  div.setAttribute('desc',      value);
  div.setAttribute('operation', 'load');
  
  div.click();
  
  if(div.getAttribute('state') != 'complete')
    this.show_error('Ошибка при загрузке значения');

  return (div.getAttribute('is_null') == 'true' ? def : div.getAttribute('value'));
};

//----------------------------------------------------------------------------//

var current_id = null;

this.current_id = function(){
  return current_id;
};

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

this.show_el = function(el, visible){
  el.style.display = visible ? '' : 'none';
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
  
var load_value      = SU.load_value;
var save_value      = SU.save_value; 
var send_async_post = SU.send_async_post;
var show_el         = SU.show_el;
var reload_page     = SU.reload_page;
var current_user_id = SU.current_id();
  
var strike_set = JSON.parse(load_value(script_name + current_user_id, '[]'));
  
var MAX_COUNT = 20;
  
start_work();
  
function start_work(){
  if(strike_set.length)
    draw_navlinks();
  
  if(document.location.toString().indexOf('castle.php') != -1)
    draw_construct_table();
}
  
//----------------------------------------------------------------------------//
  
function draw_navlinks(){
  var navlinks_tr = document.querySelector('body > center > center');
  
  var no_skills = navlinks_tr !== null;
  
  if(!navlinks_tr)
    navlinks_tr = document.querySelector('body > center > table > tbody > tr');
  var is_empty = !no_skills && navlinks_tr.childElementCount == 1 && !navlinks_tr.firstChild.childElementCount;
  
  if(is_empty)
    navlinks_tr.removeChild(navlinks_tr.firstChild);
  
  var td = null;
  
  if(!no_skills){
    td = document.createElement('td');
    navlinks_tr.appendChild(td);
  }
  
  var a = document.createElement('a');
  a.className   = 'pi';
  a.href        = 'castle.php';
  a.title       = 'Перейти в замок';
  a.textContent = 'Наборы критов ▼';
  if(!is_empty)
    a.textContent = ' | ' + a.textContent;
  
  a.addEventListener('mouseover', function(e){
    draw_links_div(td || a);
    
    var div = document.getElementById(script_name + 'LinksDiv');
    show_el(div, true);
  });
  a.addEventListener('mouseout', function(e){
    var div = document.getElementById(script_name + 'LinksDiv');
    show_el(div, false);
  });
  
  var parent = no_skills ? navlinks_tr : td;
  parent.appendChild(a);
  
  draw_links_div(td || a);
}
  
//----------------------------------------------------------------------------//
  
function draw_links_div(pseudo_parent){
  var old_div = document.getElementById(script_name + 'LinksDiv');
  if(old_div)
    old_div.parentNode.removeChild(old_div);
  
  var div = document.createElement('div');
  div.id = script_name + 'LinksDiv';
  
  var rect = pseudo_parent.getBoundingClientRect();

  div.style.position = 'fixed';
  div.style.top      = rect.bottom + 'px';
  div.style.left     = rect.left + 'px';
  div.style.zIndex   = 100;
  
  document.body.appendChild(div);
  
  var table = document.createElement('table');
  table.style.backgroundColor = '#6b6b69';
  div.appendChild(table);
  
  draw_links_content(table);
  show_el(div, false);
  
  div.addEventListener('mouseover', function(e){
    var div = document.getElementById(script_name + 'LinksDiv');
    show_el(div, true);
  });
  div.addEventListener('mouseout', function(e){
    var div = document.getElementById(script_name + 'LinksDiv');
    show_el(div, false);
  });
}
  
//----------------------------------------------------------------------------//
  
function draw_links_content(parent){
  strike_set.forEach(function(current){
    draw_link_row(parent, current);
  });
}   
  
//----------------------------------------------------------------------------//
  
function draw_link_row(parent, current){
  var tr = document.createElement('tr');
  parent.appendChild(tr);
  
  var max_length = 0;
  strike_set.forEach(function(current){
    var length = current.name.length;
    
    if(max_length < length)
      max_length = length;
  });

  var td = document.createElement('td');
  tr.appendChild(td);
  
  if(max_length < MAX_COUNT/2)
    td.style.width = '100px';
  
  var font = document.createElement('font');
  font.textContent = current.name;
  font.style.color = current.selected ? '#90EE90': '#f5c137';
  font.addEventListener('click', function(e){
    strike_set.forEach(function(c){
      c.selected = c.csid == current.csid;
    });
    
    var fonts = parent.querySelectorAll('font');
    for(var i = 0; i < fonts.length; ++i)
      fonts[i].style.color = '#f5c137';
    
    font.style.color = '#90EE90';
    
    save_value(script_name + current_user_id, JSON.stringify(strike_set));
    
    send_async_post('castle.php', current.request);
    
    var div = document.getElementById(script_name + 'LinksDiv');
    show_el(div, false);
  });
  td.appendChild(font);
      
  td = document.createElement('td');
  td.textContent = '(i)';
  td.title = current.info;
  tr.appendChild(td);
}   
  
//----------------------------------------------------------------------------//
  
function draw_construct_table(){
  var strike_set_form = get_strike_set_form();
  
  if(!strike_set_form)
    return;
  
  draw_table(strike_set_form.parentNode.parentNode);
}
  
//----------------------------------------------------------------------------//
  
function get_strike_set_form(){
  return document.querySelector('form[name="vrag"]');
}
  
//----------------------------------------------------------------------------//
  
function draw_table(previous){
  var tr = document.createElement('tr');
  previous.parentNode.insertBefore(tr, previous.nextSibling);
  
  var td = document.createElement('td');
  td.setAttribute('align', 'center');
  td.setAttribute('colspan', '2');
  tr.appendChild(td);
  
  var table = document.createElement('table');
  table.id = script_name + 'Table';
  td.appendChild(table);
  
  draw_header(table);
  draw_content(table);
  draw_buttons(table);
} 
  
//----------------------------------------------------------------------------//
  
function draw_header(parent){
  var tr = document.createElement('tr');
  parent.appendChild(tr);

  var td = document.createElement('td');
  td.setAttribute('colspan', '3');
  td.textContent = 'Наименование набора';
  tr.appendChild(td);
}
  
//----------------------------------------------------------------------------//
  
function draw_content(parent){
  strike_set.forEach(function(current){
    draw_row(parent, current);
  });
}  
  
//----------------------------------------------------------------------------//
  
function draw_row(parent, current){
  var buttons = document.getElementById(script_name + 'Buttons');
  
  var tr = document.createElement('tr');
  tr.setAttribute('csid', current.csid);
  
  if(!buttons)
    parent.appendChild(tr);
  else
    parent.insertBefore(tr, buttons);

  var td = document.createElement('td');
  tr.appendChild(td);
  
  var input = document.createElement('input');
  input.type  = 'text';
  input.value = current.name;
  input.setAttribute('maxlength', MAX_COUNT + '');
  td.appendChild(input);
  
  td = document.createElement('td');
  td.textContent = '(i)';
  td.title = current.info;
  tr.appendChild(td);
  
  td = document.createElement('td');
  tr.appendChild(td); 
  
  input = document.createElement('input');
  input.type  = 'button';
  input.value = 'X';
  input.title = 'Удалить';
  input.addEventListener('click', function(e){
    remove_row(tr, current.csid);
  });
  td.appendChild(input);
} 
  
//----------------------------------------------------------------------------//
  
function remove_row(el, csid){
  strike_set = strike_set.filter(function(current){
    return current.csid != csid;
  });
  
  el.parentNode.removeChild(el);
}
  
//----------------------------------------------------------------------------//
  
function draw_buttons(parent){
  var tr = document.createElement('tr');
  tr.id = script_name + 'Buttons';
  parent.appendChild(tr);

  var td = document.createElement('td');
  tr.appendChild(td);
  
  var input = document.createElement('input');
  input.id    = script_name + 'Saver';
  input.type  = 'button';
  input.value = 'Сохранить';
  input.addEventListener('click', function(e){
    save_values(parent);
  });
  td.appendChild(input);
  
  input = document.createElement('input');
  input.id    = script_name + 'Adder';
  input.type  = 'button';
  input.value = 'Добавить';
  input.addEventListener('click', function(e){
    add_row(parent);
  });
  td.appendChild(input);
}
  
//----------------------------------------------------------------------------//
  
function save_values(parent){
  var trs = parent.querySelectorAll('tr[csid]');

  for(var i = 0; i < trs.length; ++i)
    set_name(+trs[i].getAttribute('csid'), trs[i].firstChild.firstChild.value.trim());

  strike_set = strike_set.filter(function(current){
    return current.name !== '';
  });

  save_value(script_name + current_user_id, JSON.stringify(strike_set));
  reload_page();
}
  
//----------------------------------------------------------------------------//
  
function set_name(csid, name){
  strike_set.forEach(function(current){
    if(current.csid == csid)
      current.name = name;
  });
}
  
//----------------------------------------------------------------------------//
  
function add_row(parent){
  var current_strike_set = get_current_strike_set();
  
  var set = {
    csid:     Date.now(),
    name:     '',
    request:  current_strike_set.request,
    info:     current_strike_set.info,
    selected: false
  };

  strike_set.push(set);
  
  draw_row(parent, set);
}
  
//----------------------------------------------------------------------------//
  
function get_current_strike_set(){
  var form = get_strike_set_form();
  var selects = form.querySelectorAll('select[name^="v"]');
  
  var request = 'action=setvrag';
  var info    = [];
  
  for(var i = 0; i < selects.length; ++i){
    var name  = selects[i].getAttribute('name');
    var value = selects[i].options[selects[i].selectedIndex].value;
    var text  = selects[i].options[selects[i].selectedIndex].text;
    
    request += '&' + name + '=' + value;
    
    if(text.trim().length)
      info.push(text); 
  }
  
  return { request: request, info: info.join('\n') };
}
  
//----------------------------------------------------------------------------//

}());  // wrapper end

//----------------------------------------------------------------------------//