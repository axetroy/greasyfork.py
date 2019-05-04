// ==UserScript==
// @name Нова Пошта + VipSMS
// @description Упрощает рассылку накладных через VipSMS.net
// @author Bogdan Gerasymenko
// @license MIT
// @version 1.10
// @include http://vipsms.net/*
// @namespace novaposhtavip
// ==/UserScript==
(function (window, undefined) {
    // Нормализация окна
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    // Не запускать во фреймах
    if (w.self != w.top) {
        return;
    }
    // Дополнительная проверка наряду с @include
    if (/http:\/\/vipsms.net/.test(w.location.href)) {
        // Шаблон SMS-рассылки
        $( ".pad-dialog" ).hide();
        $('#SmsEntry_message').val('Ваше замовлення надіслано!\nНомер накладної:\n');
    }
})(window);