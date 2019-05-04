// ==UserScript==
// @name        GN_EcostatFindPossiblePlaceForResourceSale
// @namespace   Gradient
// @description Поиск предприятий, которые могут купить ресурсы
// @include     /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/ecostat_details\.php\?id=(1|2|3|4|5|6|8|77|80|11|55|10|81|9)/
// @version     1.0.1
// ==/UserScript==

"use strict";

(function() { // wrapper start

//----------------------------------------------------------------------------//
  
var do_work = true;
var current_res = '';
  
start_work();
  
//----------------------------------------------------------------------------//
  
function start_work(){
  var trs = document.querySelectorAll('table > tbody > tr > td[width="50%"][valign="top"]');

  if(trs.length != 2)
    return;
  
  draw_buttons(trs[1]);
}
  
//----------------------------------------------------------------------------//
  
function draw_buttons(parent){
  var input = document.createElement('input');
  input.type  = 'button';
  input.value = 'Считать данные';

  var matches = /.+"(.+?)".+/.exec(parent.firstChild.data);

  if(!matches)
    throw 'No matches';
  
  current_res = matches[1];
  
  input.addEventListener('click', function(e){
    do_work = true;
    fill_content(parent);
  });

  parent.insertBefore(input, parent.firstChild.nextSibling);
  parent.insertBefore(document.createElement('br'), input);
  
  var stopper = document.createElement('input');
  stopper.type  = 'button';
  stopper.value = 'Остановить работу';
  
  stopper.addEventListener('click', function(e){
    do_work = false;
  });

  parent.insertBefore(stopper, input.nextSibling);
}
  
//----------------------------------------------------------------------------//
  
function fill_content(parent){
  var header_tr = parent.querySelector('table > tbody > tr');

  if(!header_tr)
    throw 'Header not found';
  
  clear_old(parent);

  var header = header_tr.lastChild.cloneNode(true);
  header.firstChild.textContent = 'Кол-во';
  header_tr.appendChild(header);

  var trs = header_tr.parentNode.querySelectorAll('tr.wb');

  if(!trs.length)
    return;
  
  insert_tr(trs[0]);
}
  
//----------------------------------------------------------------------------//
  
function clear_old(parent){
  var trs = parent.querySelectorAll('table > tbody > tr');
  
  for(var i = 0, e = trs.length; i < e; ++i)
    while(trs[i].childNodes.length > 3)
      trs[i].removeChild(trs[i].lastChild);
}
  
//----------------------------------------------------------------------------//
  
function insert_tr(tr){
  var url = tr.firstChild.querySelector('a[href*="object-info.php?id="]');

  var clone = tr.lastChild.cloneNode(false);
  clone.textContent = '';
  tr.appendChild(clone);

  fill_tr(url, tr);
}
  
//----------------------------------------------------------------------------//
  
function fill_tr(url, element)
{
  if(!element || !do_work)
    return;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.overrideMimeType('text/plain; charset=windows-1251');
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var count = get_resource_count(xhr.responseText);
        element.lastChild.textContent = count;
        
        if(count == 'Error')
          element.lastChild.style.backgroundColor = 'red';
        else if(count >= 1)
          element.lastChild.style.backgroundColor = 'lightgreen';
        
        insert_tr(element.nextSibling);
      }
    }
  };
  
  xhr.send(null);
}
  
//----------------------------------------------------------------------------//
  
function get_resource_count(response){
  var re = new RegExp('<tr align=center class=wblight><td align=left class=wb>.+?' + current_res + '</td>.+?>(<font color=red>)*?([0-9\\.]+?)(</font>)*?\\s/\\s([0-9\\.]+?)</td>', 'gmi');
  var matches = re.exec(response);
  
  return matches ? (+matches[4] - +matches[2]).toFixed(2) : 'Error';
}

//----------------------------------------------------------------------------//
  
})(); // wrapper end