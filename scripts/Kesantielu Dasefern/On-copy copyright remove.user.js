// ==UserScript==
// @name         On-copy copyright remove
// @name:ru      Удаление копирайта при копировании
// @namespace    https://dasefern.com/
// @version      0.2
// @description  This script removes copyright from copied text
// @description:ru Скрипт удаляет копирайт при копировании текста
// @author       Kesantielu Dasefern
// @include      *//tengrinews.kz/*
// @include      *//*.sputniknews.kz/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.oncopy = null;
    document.ondrag = null;
    document.body.oncopy = null;
    document.body.ondrag = null;
})();