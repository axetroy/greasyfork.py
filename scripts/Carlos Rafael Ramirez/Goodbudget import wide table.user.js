// ==UserScript==
// @name       Goodbudget import wide table
// @namespace  http://www.tecnologiadigerida.com
// @version    0.1
// @description  The bank import transaction table is pretty small, this script will make it wider
// @match      https://goodbudget.com/import/confirm
// @copyright  2014+ Carlos Ramirez
// ==/UserScript==

document.evaluate('/html/body/div[2]', document).iterateNext().style.width="1500px";

var receivers = document.getElementsByClassName("receiver"); 
for(var i =0, il = receivers.length;i<il;i++){     
    receivers[i].style.width = "260px";  
}

document.getElementsByClassName("span8")[0].style.width="inherit";
