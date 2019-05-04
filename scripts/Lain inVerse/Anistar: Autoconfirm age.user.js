// ==UserScript==
// @name         Anistar: Autoconfirm age
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Автоматически устанавливает cookie подтверждающее возраст на страницах Anistar. Полезно если не хранятся cookie.
// @author       lainverse
// @match        *://anistar.me/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    for (let age of ['14', '16', '18'])
        document.cookie = `${age}=yes`;
})();