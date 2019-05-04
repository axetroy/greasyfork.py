// ==UserScript==
// @name         Acfun login lastpass support
// @namespace    http://seewang.me/
// @version      1.0
// @description  add name field for acfun login page so it can be recognised by lastpass
// @author       cwang22
// @match        http://www.acfun.tv/login/
// @grant        none
// ==/UserScript==
$('#ipt-account-login').attr('name','username');
