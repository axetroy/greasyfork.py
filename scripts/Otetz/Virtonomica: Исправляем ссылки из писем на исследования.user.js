// ==UserScript==
// @name         Virtonomica: Исправляем ссылки из писем на исследования
// @namespace    virtonomica
// @version      0.05
// @description  Разработчики игры сделали доброе дело — объединили кучу писем одной тематики, но об удобстве подумать забыли ;)
// @author       Otetz
// @include      http*://virtonomic*.*/*/main/user/privat/persondata/message/system/*
// @icon         http://virtonomica.ru/img/unit_types/24/lab.gif
// ==/UserScript==

var run = function() {
    var subject = $('table td:nth-child(1) > table tr:nth-child(3) > td')[0].innerText;
    if (subject != 'Эврика!' && subject != 'Предварительное исследование завершено!' && subject != 'Гипотеза верна!')
        return;
    
    $('table.unit-list-2014 > tbody > tr').each(function() {
        var cell = $('td:nth-child(3)', this)[0];
        var link = cell.children[0].href
        //var unit_id = /\/(\d+)$/.exec(link)[1];
        var inv_link = link + '/investigation'
        $('&nbsp;<a href="' + inv_link + '" target="_blank"><img src="/img/icon/invention.gif" width="16" height="16" style="vertical-align: baseline;" title="Исследования"></a>').appendTo(cell);
    });
}

// Хак, что бы получить полноценный доступ к DOM
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
