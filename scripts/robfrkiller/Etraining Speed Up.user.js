// ==UserScript==
// @name         Etraining Speed Up
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  這是個專門減少浪費生命的工具
// @author       robfrkiller
// @match        https://tims.etraining.gov.tw/timsonline/index2.aspx
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelectorAll('#DG_ClassInfo [valign=top]').forEach(function (el) {
        var td = el.querySelectorAll('td');
        td[1].innerHTML = '<a target="_blank" href="https://tims.etraining.gov.tw/timsonline/index3.aspx?OCID=' + td[1].innerHTML + '">' + td[1].innerHTML + '</a>';
    });
})();
