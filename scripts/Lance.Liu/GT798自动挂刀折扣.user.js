// ==UserScript==
// @name         GT798自动挂刀折扣
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://gt798.com/?m=trade*
// @grant        none
// ==/UserScript==

var target_discount=25;
items=document.getElementsByClassName('badge');
for (i=0;i<items.length;i++)
{
    discount=items[i].innerText.split('%')[0];
    items[i].innerText +=" "+ Math.round((100-Number(discount))*1.15*100)/100 +"折";
    if(Number(discount)>target_discount)
    {
        items[i].parentElement.parentElement.parentElement.style.backgroundColor='#000';
    }
}