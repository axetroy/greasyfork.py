// ==UserScript==
// @name         Накрутка подписчиков в Instagram
// @namespace    Накрутка подписчиков в Instagram
// @version      1.3.39
// @description  Предлагаю вашему вниманию скрипт,который сам подписуется и отписуется от известных людей в инстаграм.
// @author       Bladhard
// @match        https://*.instagram.com/*
// @grant        none
// @icon         http://rescu.com.au/wp-content/themes/rescuRB/images/instagram.png
// @exclude      https://*.instagram.com/accounts/*
// @exclude      https://*.instagram.com/p/*
// ==/UserScript==

var inst = location.href.indexOf("instagram.com") == 1;
  var hom = document.getElementsByClassName('_l9ml9');
if (hom.length == 1)
{
    console.log("Определяем страницу - " + document.getElementsByClassName("_rf3jb")[0].innerHTML +  ", наша страница, работа скрипта запрещена. " ); // 1, наша страница. 0, чужая страница.
    console.log("Скрипт необходимо запускать в чьём-то профиле Instagram.");
    alert('Скрипт необходимо запускать в чьём-то профиле Instagram.');
}
else if (parseInt(document.getElementsByClassName("_fd86t")[1].firstChild.parentElement.attributes[1].value.split(" ").join("")) < 3000000) {
    console.log("Определяем страницу - " + document.getElementsByClassName("_rf3jb")[0].innerHTML +  ", правильная страница, работа скрипта разрешена, определяем кол-во подписчиков. " );
    console.log("На аккаунте " + document.getElementsByClassName("_rf3jb")[0].innerHTML + " недостаточно подписчиков для работы скрипта.");
    alert('"На аккаунте "' + document.getElementsByClassName("_rf3jb")[0].innerHTML + '" недостаточно подписчиков для работы скрипта."');
    console.log("Выбери кого-то, у кого больше 3 миллионов подписчиков. Например, instagram.com/timatiofficial");
    alert('Выбери кого-то, у кого больше 3 миллионов подписчиков. Например, instagram.com/timatiofficial');
}
else {
    var time = prompt("Введите количество секунд между действиями", "30");
    if (time === null)
    alert('Запуск скрипта отменен! Для запуска скрипта обновите страницу.');
    else {
    a = document.getElementsByClassName("_qv64e");
    function nakr()
    {
        a[0].click();
    }
    console.log("Определяем страницу - " + document.getElementsByClassName("_rf3jb")[0].innerHTML +  ", правильная страница, работа скрипта разрешена. " );
    console.log("Скрипт запущен.");
    alert('Скрипт запущен. Интервал между действиями равен "' + time + '" сек."');
    console.log("Интервал между действиями равен " + time + " сек.");
    alert('При закрытии данной вкладки работа скрипта будет завершена.');
    console.log("При закрытии данной вкладки работа скрипта будет завершена.");
    }
    setInterval(nakr, time * 1000);
}