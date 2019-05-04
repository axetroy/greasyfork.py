// ==UserScript==
// @name           Virtonomica: кнопка строительства
// @version        1.00
// @namespace      virtonomica
// @description    Добавляет кнопку строительства на все страницы Виртономики
// @include        http*://virtonomic*.*

// Убираем со страницы строительства, чтобы не конфликтовать с скриптом

// @exclude        http*://virtonomic*.*/*/create/*
// ==/UserScript==

var run = function() {

    //Выцепляем реалм и номер компании из ссылки на дашборд
    var href12 = $('a.dashboard').attr('href');
    var companyNumber = href12.replace(/\D/g,'');
    var realmName = href12.split('main')[0];
    
   //Создаём элемент, добавляем ссылку на страницу строительства, размещаем в верхней панели
    var bldbtn = document.createElement('li');
    bldbtn.innerHTML = '<a href="'+realmName+'main/unit/create/'+companyNumber+'"><img src="/img/icon/unit_build.png" style="vertical-align:middle;" alt="Создать подразделение" title="Создать подразделение" height="20px"></a>';
    
    $('li.right').before(bldbtn);
};

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);