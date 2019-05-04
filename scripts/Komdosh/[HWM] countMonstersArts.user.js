// ==UserScript==
// @name         [HWM] countMonstersArts
// @version      0.9.96
// @description  Подсчёт количества наноартов
// @author       Komdosh
// @match        http*://*.heroeswm.ru/arts_for_monsters.php*
// @grant        none
// @namespace https://greasyfork.org/users/13829
// ==/UserScript==
var i=50;
var tr=document.getElementsByTagName("tr");
var count=0;
for(; tr[i]; ++i)
{
    if(tr[i].getElementsByTagName("td").length >0 && /\u0420\u044B\u0446\u0430\u0440\u044C/.test(tr[i].getElementsByTagName("td")[0].innerHTML))
        break;
}
i+=2;
var a=tr[i].getElementsByTagName("a");
for(var j=0; j<a.length; j++)
{
    count+=parseInt(a[j].innerHTML.split('(')[1].split(')')[0]);
}
count+=parseInt(tr[i].getElementsByTagName('b')[0].innerHTML.split('(')[1].split(')')[0]);

var center=document.getElementsByTagName("center");
for(i=0; center[i]; ++i)
{
    if(center[i].getElementsByTagName("b").length > 0 && /\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435/.test(center[i].getElementsByTagName("b")[0].innerHTML))
        break;
}
center[i].getElementsByTagName("b")[0].innerHTML+="<br>Количество артефактов существ: "+count;

if(!localStorage.getItem('HWMCMA')){
    localStorage.setItem('HWMCMA', count);
}

if(localStorage.getItem('HWMCMA') && localStorage.getItem('HWMCMA')<count){
       var all = localStorage.getItem('HWMCMA');
       center[i].getElementsByTagName("b")[0].innerHTML+=" <font color='green' weight='bold'>+"+(count-all)+"</font>";
       localStorage.setItem('HWMCMA', count);
}