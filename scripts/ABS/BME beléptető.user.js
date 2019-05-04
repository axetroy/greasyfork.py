// ==UserScript==
// @name         BME beléptető
// @namespace    http://abs.ezw.me
// @version      1.0
// @description  címtár – kinek van erre ideje?
// @author       ABS
// @match        https://login.bme.hu/idp/Authn/UserPassword
// ==/UserScript==

document.getElementById('login-form_username').value = 'felhasználónév';
document.getElementById('login-form_password').value = 'jelszó';
document.getElementById('login-form').submit();