// ==UserScript==
// @name         Wise Old King
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.neopets.com/medieval/wiseking.phtml
// @grant        none
// ==/UserScript==

function select_random(css){
options = $(css+" > option");
options[Math.floor(Math.random() * options.length)].selected = true;

}

select_random('#qp1');
select_random('#qp2');
select_random('#qp3');
select_random('#qp4');
select_random('#qp5');
select_random('#qp6');
select_random('#qp7');