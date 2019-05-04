// ==UserScript==
// @name         New Board Name KA-RA-CHAN
// @version      0.1
// @description  Zmień nazwe boarda
// @author       anonymouse
// @match        http://karachan.org/b/
// @grant        none
// @namespace https://greasyfork.org/users/43855
// ==/UserScript==



//TU WPISZ NOWĄ NAZWE BOARDA

var boardName= "Rucham psa jak sra";






document.getElementsByClassName("boardTitle")[0].innerHTML = "/b/ - "+boardName ;
document.title = "/b/ - "+boardName;