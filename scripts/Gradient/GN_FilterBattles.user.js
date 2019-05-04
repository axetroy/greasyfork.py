// ==UserScript==
// @name        GN_FilterBattles
// @namespace   Gradient
// @description Фильтр текущих боев
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/bselect\.php.*/
// @version     1.0.4
// ==/UserScript==

"use strict";

//----------------------------------------------------------------------------//

(function(){ // wrapper start

//----------------------------------------------------------------------------//
// UnifiedLibrary 1.7.0 start
//----------------------------------------------------------------------------//

var script_name = 'GN_FilterBattles'; // Enter your script name here

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
// Battle types
//----------------------------------------------------------------------------//
  
this.enum_sbt = { // sync?
  pvp:       0,
  hunter:    1,
  mercenary: 2,
  thief:     3,
  ranger:    4,
  war:       5,
  event:     6,
  instance:  7,
  other:     8,
  guardian:  9,
  campaign:  10,
  unknown:   11
};
  
this.sorted_battle_types = JSON.parse(SU.load_value('GN_CommonValues_SortedBattleTypes', '[]'));
this.battle_types = JSON.parse(SU.load_value('GN_CommonValues_BattleTypes', '[]'));

//----------------------------------------------------------------------------//
  
this.get_battle_type = function(id){
  for(var i = 0; i < this.battle_types.length; ++i)
    if(this.battle_types[i].id == id)
      return this.battle_types[i];
  
  var new_type = { id: id, sbt: this.enum_sbt.unknown, name: id }; // sync?
  this.battle_types.push(new_type);
  
  return new_type;
};
    
//----------------------------------------------------------------------------//
  
} // wrapper end

//----------------------------------------------------------------------------//
// UnifiedLibrary end
//----------------------------------------------------------------------------//

var compare    = SU.compare;
var load_value = SU.load_value;
var save_value = SU.save_value;
var show_error = SU.show_error;

var CV = GN_CommonValues;

var sorted_battle_types = CV.sorted_battle_types;
sorted_battle_types.sort(function(a, b){
  return compare(a.name, b.name);
});

var battle_types = CV.battle_types;
battle_types.sort(function(a, b){
  return compare(a.name, b.name);
});

var empty_option    = 'all_values';
var current_battles = [];
var settings        = load_settings();
  
//----------------------------------------------------------------------------//
  
start_work();
  
//----------------------------------------------------------------------------//
  
function start_work(){
  var header_sign = document.querySelector('table[width="970"] table > tbody > tr.wbwhite > td.wb');
  
  if(!header_sign)
    show_error('Не найден элемент привязки для таблицы настроек');
  
  get_current_battles(header_sign);
  draw_table(header_sign);
  set_settings();
  accept_filter();
}
  
//----------------------------------------------------------------------------//
  
function get_current_battles(parent){
  var re = /<!--(\d+?)-->.*?<a href="warlog\.php\?warid=(\d+)(&show_for_all=[^"]+)*">\d{2}-\d{2}.+?<br>.*?/gmi;
  var matches = [];
  var content = parent.innerHTML;
  
  while(matches = re.exec(content))
    current_battles.push({ textHTML: matches[0], type: +matches[1], id: +matches[2] });
}
  
//----------------------------------------------------------------------------//
    
function draw_table(parent){
  var table = document.createElement('table');
  table.id = script_name + 'Table';
  table.setAttribute('align', 'center');
  parent.insertBefore(table, parent.firstChild);
  
  var tr = document.createElement('tr');
  table.appendChild(tr);
  
  var td = document.createElement('td');
  tr.appendChild(td);
  
  var settings_table = document.createElement('table');
  settings_table.setAttribute('align', 'center');
  td.appendChild(settings_table);
  
  tr = document.createElement('tr');
  settings_table.appendChild(tr);
    
  td = document.createElement('td');
  tr.appendChild(td);
  
  td.appendChild(document.createTextNode('Тип боя:'));

  td = document.createElement('td');
  tr.appendChild(td);

  var select = document.createElement('select');
  select.id          = script_name + 'SBTSelect';
  select.style.width = '150px';
  select.title       = 'Поиск по общему типу боя';
  select.addEventListener('change', function(e){
    reload_battle_types();
    save_settings();
    accept_filter();
  });
  td.appendChild(select);

  var option = document.createElement('option');
  option.setAttribute('value', empty_option);
  select.appendChild(option);

  sorted_battle_types.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);
    option.appendChild(document.createTextNode(current.name));

    select.appendChild(option);
  });

  td = document.createElement('td');
  tr.appendChild(td);

  td.appendChild(document.createTextNode('Вид боя:'));

  td = document.createElement('td');
  tr.appendChild(td);

  select = document.createElement('select');
  select.id          = script_name + 'BTSelect';
  select.style.width = '150px';
  select.title       = 'Поиск по конкретному виду боя';
  select.addEventListener('change', function(e){
    save_settings();
    accept_filter();
  });
  td.appendChild(select);

  option = document.createElement('option');
  option.setAttribute('value', empty_option);
  select.appendChild(option);

  battle_types.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);
    option.appendChild(document.createTextNode(current.name));

    select.appendChild(option);
  });
  
  td = document.createElement('td');
  tr.appendChild(td);

  td.appendChild(document.createTextNode('Постоянный фильтр:'));

  td = document.createElement('td');
  tr.appendChild(td);

  select = document.createElement('select');
  select.id          = script_name + 'AlwaysShowedSelect';
  select.style.width = '150px';
  select.title       = 'Типы боев, которые всегда будут показываться. Выбираются через РКМ';
  td.appendChild(select);

  option = document.createElement('option');
  option.setAttribute('value', empty_option);
  select.appendChild(option);
  
  battle_types.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);
    option.appendChild(document.createTextNode(current.name));
    
    settings.always_showed.forEach(function(c){
      if(c == current.id){
        option.setAttribute('colored', '');
        option.style.backgroundColor = '#FF8000';
      }
    });
    
    option.addEventListener('contextmenu', function(e){
      e.preventDefault();
      
      var colored = this.hasAttribute('colored');
      var msg = (colored ? 'Удалить' : 'Добавить') + ' фильтр по этому типу: ' + this.textContent + '?';
      if(!confirm(msg))
        return false;
      
      this.style.backgroundColor = colored ? '' : '#FF8000';
      colored ? this.removeAttribute('colored') : this.setAttribute('colored', '');

      save_settings();
      accept_filter();

      return true;
    });

    select.appendChild(option);
  });
  
  tr = document.createElement('tr');
  settings_table.appendChild(tr);
  
  td = document.createElement('td');
  td.setAttribute('colspan', '4');
  td.setAttribute('align', 'center');
  tr.appendChild(td);
}

//----------------------------------------------------------------------------//

function reload_battle_types(){
  var el = document.getElementById(script_name + 'SBTSelect');
  var val = el.options[el.selectedIndex].value;

  el = document.getElementById(script_name + 'BTSelect');
  while(el.options.length)
    el.removeChild(el.options[0]);

  var tmp_bt = battle_types;

  if(val != empty_option)
    tmp_bt = tmp_bt.filter(function(current){
      return current.sbt == val;
    });

  var option = document.createElement('option');
  option.setAttribute('value', empty_option);
  el.appendChild(option);

  tmp_bt.forEach(function(current){
    option = document.createElement('option');
    option.setAttribute('value', current.id);

    var text = document.createTextNode(current.name);
    option.appendChild(text);

    el.appendChild(option);
  });
}
  
//----------------------------------------------------------------------------//
  
function accept_filter(){
  var anchor = document.getElementById(script_name + 'Table');
  var hero_counter = anchor.nextElementSibling.nextElementSibling;
  var parent = hero_counter.parentNode;
  
  while(hero_counter.nextSibling)
    parent.removeChild(hero_counter.nextSibling);
  
  var innerHTML = '';
  
  var found_battles = [];
  settings.always_showed.forEach(function(current){
    current_battles.forEach(function(cur_battle){
      if(cur_battle.type == current)
        found_battles.push(cur_battle.textHTML);
    });
    
    if(found_battles.length){
      var bt = CV.get_battle_type(current);
      innerHTML += type_header(bt.name);
    }
    
    innerHTML += found_battles.join('');
    found_battles = [];
  });
 
  current_battles.forEach(function(current){
    if(is_suitable(current))
      found_battles.push(current.textHTML);
  });
  
  if(found_battles.length)
    innerHTML += type_header('Бои по текущему фильтру');

  innerHTML += found_battles.join('');
  found_battles = [];
  
  var table = document.createElement('table');
  parent.appendChild(table);
  
  var tr = document.createElement('tr');
  table.appendChild(tr);
  
  var td = document.createElement('td');
  tr.appendChild(td);
  td.innerHTML = innerHTML;
}
 
//----------------------------------------------------------------------------//
  
function type_header(name){
  return '<br><b>' + name + ': </b><br>';
}
  
//----------------------------------------------------------------------------//
  
function is_suitable(obj){
  var bt = CV.get_battle_type(obj.type);

  if(settings.sbt != empty_option)
    if(bt.sbt != +settings.sbt)
      return false;
  
  return settings.bt == empty_option || +settings.bt == obj.type;
}

//----------------------------------------------------------------------------//

function load_settings(){
  var settings_ = load_value(script_name + 'Settings');

  // workaround about possibly null array from earlier versions
  if(settings_){
    settings_ = JSON.parse(settings_);
    if(!settings_.always_showed)
      settings_.always_showed = [];
    return settings_;
  }

  settings_ = {
    sbt:           empty_option,
    bt:            empty_option,
    always_showed: []
  };

  return settings_;
}

//----------------------------------------------------------------------------//

function save_settings(){
  var select = document.getElementById(script_name + 'SBTSelect');
  settings.sbt = select.options[select.selectedIndex].value;

  select = document.getElementById(script_name + 'BTSelect');
  settings.bt = select.options[select.selectedIndex].value;
  
  select = document.getElementById(script_name + 'AlwaysShowedSelect');
  settings.always_showed = [];
  for(var i = 0; i < select.options.length; ++i)
    if(select.options[i].hasAttribute('colored'))
      settings.always_showed.push(select.options[i].value);

  save_value(script_name + 'Settings', JSON.stringify(settings));
}

//----------------------------------------------------------------------------//

function set_settings(){
  var el = document.getElementById(script_name + 'SBTSelect');

  for(var i = 0; i < el.options.length; ++i)
    if(el.options[i].value == settings.sbt){
      el.options[i].selected = true;
      break;
    }

  reload_battle_types();

  el = document.getElementById(script_name + 'BTSelect');

  for(var i = 0; i < el.options.length; ++i)
    if(el.options[i].value == settings.bt){
      el.options[i].selected = true;
      break;
    }
}

//----------------------------------------------------------------------------//

}());  // wrapper end

//----------------------------------------------------------------------------//