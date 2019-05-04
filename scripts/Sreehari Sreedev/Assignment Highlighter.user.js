// ==UserScript==
// @name         Assignment Highlighter
// @namespace    http://tampermonkey.net/
// @version      666
// @description  highlight schoolloop assignments that are due the next day!
// @author       Sreehari S
// @match        https://*.schoolloop.com/portal/student_home
// @match        http://*.schoolloop.com/portal/student_home
// @grant        none
// ==/UserScript==
if (location.protocol != 'https:')  //No more HTTP schoolloop!
{
 location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}
(function() {
    'use strict';
    var date =new Date();
    //use the constructor to create by milliseconds
    var today = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    //mm = parseInt(mm).toString();
    var yy = today.getFullYear().toString().substr(-2);
    var toExpect = mm + "/" + dd + "/" + yy;
    while(document.body.innerHTML.includes(toExpect)) {
     document.body.innerHTML = document.body.innerHTML.replace(toExpect,'<mark><strong>' + toExpect.replace('/', '<span>/</span>').replace('/', '<span>/</span>') + '</strong></mark>');
    }
})();