// ==UserScript==
// @name         Neptun beléptető
// @namespace    http://abs.ezw.me
// @version      1.0
// @description  Gotta go fast
// @author       ABS
// @match        https://frame.neptun.bme.hu/hallgatoi/login.aspx
// ==/UserScript==

document.getElementById('user').value = 'felhasználónév';
document.getElementById('pwd').value = 'jelszó';
document.getElementById('btnSubmit').click();