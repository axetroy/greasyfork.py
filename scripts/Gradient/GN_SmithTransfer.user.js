// ==UserScript==
// @name        GN_SmithTransfer
// @namespace   Gradient
// @description Передача на ремонт в один клик
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/inventory\.php.*/
// @version     1.0.2
// ==/UserScript==

"use strict";

//----------------------------------------------------------------------------//

(function(){ // wrapper start

//----------------------------------------------------------------------------//
// UnifiedLibrary 1.7.0 start
//----------------------------------------------------------------------------//

var script_name = 'GN_SmithTransfer'; // Enter your script name here

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

this.compare = function(a, b){
  return (a == b) ? 0 : (a > b ? 1 : -1);
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
// CommonValues
//----------------------------------------------------------------------------//

var GN_CommonValues = new CommonValues();

//----------------------------------------------------------------------------//

function CommonValues(){  // wrapper start
  
//----------------------------------------------------------------------------//
// Artefacts
//----------------------------------------------------------------------------//
  
this.artefacts = JSON.parse(SU.load_value('GN_CommonValues_Artefacts', '[]'));

//----------------------------------------------------------------------------//
  
this.get_artefact = function(id){
  for(var i = 0; i < this.artefacts.length; ++i)
    if(this.artefacts[i].id == id)
      return this.artefacts[i];
  
  return null;
};

//----------------------------------------------------------------------------//
  
} // wrapper end

//----------------------------------------------------------------------------//
// UnifiedLibrary end
//----------------------------------------------------------------------------//

var compare     = SU.compare;
var load_value  = SU.load_value;
var save_value  = SU.save_value;
var reload_page = SU.reload_page;
var show_error  = SU.show_error;

var CV = GN_CommonValues;

var smiths = [
  new Smith(303920, 'Gradient', 0.9, 1.05),
];

smiths.sort(function(a, b){
  return compare(a.name, b.name);
});

var empty_option   = 'all_values';
var sign           = '';
var inventory_arts = filter_arts();
var settings       = load_settings();
  
//----------------------------------------------------------------------------//
    
function Smith(id_, name_, efficiency_, cost_){
  this.id         = +id_;
  this.name       = name_;
  this.efficiency = +efficiency_;
  this.cost       = +cost_;
}

function get_smith(id){
  for(var i = 0; i < smiths.length; ++i)
    if(smiths[i].id == id)
      return smiths[i];

  return null;
}

//----------------------------------------------------------------------------//
  
start_work();
  
//----------------------------------------------------------------------------//
  
function start_work(){
  var header_sign = document.querySelector('table.wblight table.wb[width="350"] td.wb[width="250"]');
  
  if(!(header_sign && header_sign.parentNode))
    show_error('Не найден элемент привязки для таблицы настроек');
  
  header_sign = header_sign.parentNode;
  
  draw_table(header_sign);
  set_settings();
}
  
//----------------------------------------------------------------------------//
  
function filter_arts(){
  var arts = unsafeWindow.arts;
  var arts1 = unsafeWindow.arts1;
  var arts_fd_none = unsafeWindow.arts_fd_none;
  
  var sorted = [];
  
  for(var i = 0; i < arts.length; ++i)
    sorted.push(arts[i] + arts1[i] + arts_fd_none[i]);
  
  sorted = sorted.filter(function(current){
    return current.indexOf('Прочноcть: <font color=red>0</font>') != -1 && current.indexOf('Владелец') == -1 && current.indexOf('no_transfer.gif') == -1;
  });
  
  var result = [];

  sorted.forEach(function(current){
    var art_re       = /art_info\.php\?id=([^&']+)?/gmi;
    var id_re        = /change_star1\((\d+),/gmi;
    var name_re      = /<b>(.+?)<\/b>/gmi;
    var toughness_re = /Прочноcть: <font color=red>0<\/font>\/(\d+)/gmi;

    result.push({id: +id_re.exec(current)[1], art_id: art_re.exec(current)[1], name: name_re.exec(current)[1], toughness: '0/' + toughness_re.exec(current)[1]});
  });

  return result;
}

//----------------------------------------------------------------------------//
    
function draw_table(prevSibling){
  var tr = document.createElement('tr');
  prevSibling.parentNode.insertBefore(tr, prevSibling.nextSibling);
  
  var parent = document.createElement('td');
  parent.setAttribute('colspan', '2');
  tr.appendChild(parent);
  
  var table = document.createElement('table');
  table.setAttribute('align', 'center');
  parent.appendChild(table);
  
  tr = document.createElement('tr');
  table.appendChild(tr);
  
  var td = document.createElement('td');
  tr.appendChild(td);
  
  td.appendChild(document.createTextNode('Артефакт:'));
  
  td = document.createElement('td');
  tr.appendChild(td);

  var select = document.createElement('select');
  select.id          = script_name + 'ArtSelect';
  select.style.width = '200px';
  select.title       = 'Выбор артефакта для передачи';
  td.appendChild(select);

  var option = document.createElement('option');
  option.setAttribute('value', empty_option);
  select.appendChild(option);

  inventory_arts.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);
    option.appendChild(document.createTextNode(current.name + ' [' + current.toughness + ']'));

    select.appendChild(option);
  });
  
  tr = document.createElement('tr');
  table.appendChild(tr);

  td = document.createElement('td');
  tr.appendChild(td);

  td.appendChild(document.createTextNode('Кузнец:'));
  
  td = document.createElement('td');
  tr.appendChild(td);

  select = document.createElement('select');
  select.id          = script_name + 'SmithSelect';
  select.style.width = '200px';
  select.title       = 'Выбор кузнеца для передачи';
  td.appendChild(select);

  option = document.createElement('option');
  option.setAttribute('value', empty_option);
  select.appendChild(option);

  smiths.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);
    option.appendChild(document.createTextNode(current.name + ' [' + (current.efficiency*100).toFixed(0) + '% / за ' + (current.cost*100).toFixed(0) + '%]'));

    select.appendChild(option);
  });
  
  tr = document.createElement('tr');
  table.appendChild(tr);
  
  td = document.createElement('td');
  tr.appendChild(td);

  td.appendChild(document.createTextNode('Описание:'));
  
  td = document.createElement('td');
  tr.appendChild(td);
  
  var description = document.createElement('input');
  description.id    = script_name + 'Desc';
  description.type  = 'text';
  description.value = settings.description;
  description.title = 'Описание передачи кузнецу, %1% - заменяется на имя артефакта';
  description.style.width = '200px';
  td.appendChild(description);
  
  tr = document.createElement('tr');
  table.appendChild(tr);
  
  td = document.createElement('td');
  td.setAttribute('colspan', '2');
  td.setAttribute('align', 'center');
  tr.appendChild(td);
  
  var transfer = document.createElement('input');
  transfer.type  = 'button';
  transfer.value = 'Передать';
  transfer.addEventListener('click', function(e){
    if(save_settings())
      transfer_art();
  });
  td.appendChild(transfer);
}
  
//----------------------------------------------------------------------------//
  
function transfer_art(){
  document.body.style.cursor = 'wait';
  
  var smith = get_smith(settings.smith_id);
  
  var select = document.getElementById(script_name + 'ArtSelect');
  var art_id = select.options[select.selectedIndex].value;

  send_art_to_smith('/art_transfer.php', 
                    'id=' + art_id + '&nick=' + encodeCP1251(smith.name) + '&gold=1&wood=0&ore=0&mercury=0&sulphur=0&crystal=0&gem=0&sendtype=2&dtime=0.01&bcount=0&rep=on&art_id=&sign=' + sign);
}
  
//----------------------------------------------------------------------------//

function send_art_to_smith(url, params)
{
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        transfer_gold();
      }
    }
  };

  xhr.send(null);
}
  
//----------------------------------------------------------------------------//
  
function transfer_gold(){
  var smith = get_smith(settings.smith_id);
  
  var select = document.getElementById(script_name + 'ArtSelect');
  var art_id = select.options[select.selectedIndex].value;
  var inv_art = get_inventory_art(art_id);
  var art = CV.get_artefact(inv_art.art_id);

  var gold = +(smith.cost*art.repair_cost).toFixed() + 1;
  
  var desc = settings.description.replace('%1%', inv_art.name);

  send_gold_to_smith('/transfer.php', 
                    'nick=' + encodeCP1251(smith.name) + '&gold=' + gold + '&wood=0&ore=0&mercury=0&sulphur=0&crystal=0&gem=0&desc=' + encodeCP1251(desc) + '&sign=' + sign);
}
  
//----------------------------------------------------------------------------//

function send_gold_to_smith(url, params)
{
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        reload_page();
      }
    }
  };

  xhr.send(null);
}

//----------------------------------------------------------------------------//
  
function get_inventory_art(id){
  for(var i = 0; i < inventory_arts.length; ++i)
    if(inventory_arts[i].id == id)
      return inventory_arts[i];

  return null;
}
  
//----------------------------------------------------------------------------//

function load_settings(){
  var settings_ = load_value(script_name + 'Settings');

  if(settings_)
    return JSON.parse(settings_);

  settings_ = {
    smith_id:    empty_option,
    description: "За ремонт '%1%', спасибо"
  };

  return settings_;
}

//----------------------------------------------------------------------------//

function save_settings(){
  var errors = [];
  
  if(!sign)
    errors.push("Замените в теле скрипта var sign = ''; на var sign = 'Тут ваш уникальный идентификатор, его можно найти в магазине артефактов (см любую ссылку Купить)'");
  
  var select = document.getElementById(script_name + 'ArtSelect');
  if(select.options[select.selectedIndex].value == empty_option)
    errors.push('Не выбран артефакт для передачи');

  select = document.getElementById(script_name + 'SmithSelect');
  if(select.options[select.selectedIndex].value == empty_option)
    errors.push('Не выбран кузнец для ремонта');
  
  if(errors.length){
    alert('Ошибки при передаче:\n\n' + errors.join('\n'));
    return false;
  }

  settings.smith_id = select.options[select.selectedIndex].value;

  var description = document.getElementById(script_name + 'Desc');
  settings.description = description.value;

  save_value(script_name + 'Settings', JSON.stringify(settings));
  return true;
}

//----------------------------------------------------------------------------//

function set_settings(){
  var el = document.getElementById(script_name + 'SmithSelect');

  for(var i = 0; i < el.options.length; ++i)
    if(el.options[i].value == settings.smith_id){
      el.options[i].selected = true;
      break;
    }
}
  
//----------------------------------------------------------------------------//
  
function encodeCP1251(text)
{
  var cp1251_to_utf8 = 
  {
    'А': '%C0', 
    'Б': '%C1',
    'В': '%C2',
    'Г': '%C3',
    'Д': '%C4',
    'Е': '%C5',
    'Ж': '%C6',
    'З': '%C7',
    'И': '%C8',
    'Й': '%C9',
    'К': '%CA',
    'Л': '%CB',
    'М': '%CC',
    'Н': '%CD',
    'О': '%CE',
    'П': '%CF',
  
    'Р': '%D0', 
    'С': '%D1',
    'Т': '%D2',
    'У': '%D3',
    'Ф': '%D4',
    'Х': '%D5',
    'Ц': '%D6',
    'Ч': '%D7',
    'Ш': '%D8',
    'Щ': '%D9',
    'Ъ': '%DA',
    'Ы': '%DB',
    'Ь': '%DC',
    'Э': '%DD',
    'Ю': '%DE',
    'Я': '%DF',
  
    'а': '%E0', 
    'б': '%E1',
    'в': '%E2',
    'г': '%E3',
    'д': '%E4',
    'е': '%E5',
    'ж': '%E6',
    'з': '%E7',
    'и': '%E8',
    'й': '%E9',
    'к': '%EA',
    'л': '%EB',
    'м': '%EC',
    'н': '%ED',
    'о': '%EE',
    'п': '%EF',
  
    'р': '%F0', 
    'с': '%F1',
    'т': '%F2',
    'у': '%F3',
    'ф': '%F4',
    'х': '%F5',
    'ц': '%F6',
    'ч': '%F7',
    'ш': '%F8',
    'щ': '%F9',
    'ъ': '%FA',
    'ы': '%FB',
    'ь': '%FC',
    'э': '%FD',
    'ю': '%FE',
    'я': '%FF',
  
    'Ё': '%A8',
    'ё': '%B8',
  
    ' ': '%20', 
    '!': '%21',
    '(': '%28',
    ')': '%29',
    '*': '%2A',
    '+': '%2B',
    ',': '%2C',
    '-': '%2D',
    '.': '%2E',
    '/': '%2F'              
  };
      
  var result = '';
  for(var i = 0; i < text.length; ++i)
  {
    var is_in_array = cp1251_to_utf8[text[i]] !== undefined;

    if(is_in_array)                                
      result += cp1251_to_utf8[text[i]];
    else
      result += text[i];
  }    
    
  return result;
}

//----------------------------------------------------------------------------//

}());  // wrapper end

//----------------------------------------------------------------------------//