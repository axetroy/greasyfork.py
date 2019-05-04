// ==UserScript==
// @name         Activar registro
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Activa para poder registrarte en Taringa sin Facebook
// @author       You
// @match        http*://www.taringa.net/registro
// @grant        none
// ==/UserScript==


 $('head').append('<style> .noCaptcha, .captcha, .divider { display: block !important;} </style>');