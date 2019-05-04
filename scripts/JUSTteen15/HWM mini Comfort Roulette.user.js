// ==UserScript==
// @name         HWM mini Comfort Roulette
// @author       JUSTteen15
// @namespace    JUSTteen15
// @version      1.001
// @description  Добавляет три кнопки в рулетки для комфортной игры
// @include      http://www.heroeswm.ru/inforoul.php?id=*
// @icon         http://dcdn.heroeswm.ru/avatars/2210/nc-47/2210892.gif
// @encoding 	 utf-8
// @grant        none
// ==/UserScript==

var zNode= document.createElement ('div');
var url = document.URL;
var id = url.substring(url.lastIndexOf('=')+1);
zNode.innerHTML = '<br/><button id="back" type="button"><<</button><button id="reload" type="button">Обновить</button><button id="next" type="button">>></button>';
zNode.setAttribute ('id', 'myContainer');
document.getElementsByTagName('u')[0].appendChild(zNode);

reload.onclick = ClickButton1;
back.onclick = ClickButton2;
next.onclick = ClickButton3;

function ClickButton1() {location.reload();}
function ClickButton2() {window.location = 'http://www.heroeswm.ru/inforoul.php?id='+(id-1);}
function ClickButton3() {window.location = 'http://www.heroeswm.ru/inforoul.php?id='+(id-1+2);
}
