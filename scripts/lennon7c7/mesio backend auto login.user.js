// ==UserScript==
// @name         mesio backend auto login
// @namespace    https://mesio.cn/
// @version      1.0
// @description  cause I'm busy
// @author       Lennon
// @match        *.juzikuaidai.com:36081/*
// @match        *.youbo.mesio.cn/*
// @match        *localhost/*
// @require      http://code.jquery.com/jquery-2.1.1.min.js
// @run-at       document-end
// @icon         http://juzikuaidai.com/favicon.ico
// ==/UserScript==
(function() {
    'use strict';

    var elementUsername = $('#loginform-username');
    var elementPassword = $('#loginform-password');
    var elementButton = $('button[name="login-button"]');
    if(!elementUsername.length || !elementPassword.length || !elementButton.length){
        return false;
    }

    setTimeout(function () {
        elementButton.click();
    }, 800);
})();