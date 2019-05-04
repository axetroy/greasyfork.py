// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/selenagomez/
// @grant        none
// ==/UserScript==

if (location.href.indexOf("instagram.com")==-1)
{
console.log("Скрипт необходимо запускать в чьём-то профиле Instagram.\nНапример, https://www.instagram.com/timatiofficial/")
}
else if (parseInt(document.getElementsByClassName('g47SY')[1].title.split(' ').join('').split(',').join(''))<3000000)
{
console.log("На аккаунте " + document.getElementsByClassName("AC5d8")[0].innerHTML + " недостаточно подписчиков для работы скрипта.")
console.log("Выбери кого-то, у кого больше 3 миллионов подписчиков. \nНапример, https://www.instagram.com/timatiofficial/");
}
else
{
time=prompt("Введите количество секунд между действиями","30");
a=document.getElementsByClassName("_5f5mN");
function nakr(){a[0].click();b=document.getElementsByClassName("-Cab_");if(b.length>0){b[0].click();}}
setInterval(nakr,time*1000);
console.log("Скрипт запущен.");
console.log("Интервал между действиями равен " + time + " сек.");
console.log("При закрытии данной вкладки работа скрипта будет завершена.");
}