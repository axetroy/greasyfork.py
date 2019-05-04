// ==UserScript==
// @name         HWM_ShowAvailableExchange
// @namespace    Небылица
// @version      1.2
// @description  Показывает на странице ГЛ, если накопились существа на обмен
// @author       Небылица
// @include      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/(leader_guild|leader_army_exchange)\.php/
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    "use strict";

    // Вспомогательные функции
    function sendGETRequest(url, mimeType, callback){ // Универсалка для отправки GET-запроса к url с выставлением заданного MIME Type и исполнением функции callback при получении ответа
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        if (typeof mimeType === "string"){
            xhr.overrideMimeType(mimeType);
        }

        if (typeof callback === "function"){
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status === 200){
                    callback.apply(xhr);
                }
            };
        }

        xhr.send();
    }
    function colorLink(){ // Раскрашивает ссылку на обмен
        document.querySelector("a[href='leader_army_exchange.php']").style.color = "blue";
    }
    function processHTML(HTMLString, doColoring){ // Проверяет наличие стеков на обмен, по необходимости раскрашивает ссылку и запоминает результат и время – скармливать код страницы обменов
        if (HTMLString.match(/Обменять\s\d/)){
                if (doColoring){
                    colorLink();
                }
                GM_setValue("exchangeAvailable" + plIdSubKey, true);
            } else{
                GM_setValue("exchangeAvailable" + plIdSubKey, false);
            }

            GM_setValue("checkMoment" + plIdSubKey, currentMomentOnServer.getTime());
    }
    //

    // получаем id текущего персонажа и кусок ключа по нему
    var plId = document.querySelector("li > a[href^='pl_hunter_stat.php']").getAttribute("href").split("id=")[1],
        plIdSubKey = "|#" + plId,
    // определяем текущий момент времени
        currentMoment = new Date(),
        currentMomentOnServer = new Date(Date.now() + currentMoment.getTimezoneOffset()*60000 + 10800000),
    // и создаём переменную-временной флаг
        checkMoment = GM_getValue("checkMoment" + plIdSubKey) || 0;

    switch (location.pathname){
        case "/leader_guild.php":
            // делаем открытие ссылки на обмены в новой вкладке, если есть задания
            if (document.querySelector("input[value='Пропустить']")){
                document.querySelector("a[href='leader_army_exchange.php']").setAttribute("target", "_blank");
            }

            if (currentMomentOnServer.getTime() - checkMoment > 300000){ // если предыдущая проверка была не менее, чем 5 минут назад
                // запрашиваем страницу обменов и обрабатываем результат
                sendGETRequest("leader_army_exchange.php", "text/html; charset=windows-1251", function(){
                    processHTML(this.responseText, true);
                });
            } else{ // иначе раскрашиваем ссылку сразу при наличии положительного сохранённого значения
                if (GM_getValue("exchangeAvailable" + plIdSubKey)){
                    colorLink();
                }
            }
            break;

        case "/leader_army_exchange.php":
            // на странице обменов проверяем всё время, без кулдаунов
            processHTML(document.documentElement.innerHTML, false);
            break;
    }
})();