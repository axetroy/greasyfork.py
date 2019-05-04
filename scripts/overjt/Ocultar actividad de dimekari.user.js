// ==UserScript==
// @name         Ocultar actividad de dimekari
// @namespace    https://dimekari.cf/
// @version      0.1
// @description  Elimina la activdad de @dimekari en "En Vivo"
// @author       OverJT
// @match        http://www.taringa.net/mi
// @grant        none
// ==/UserScript==

$(".section-mi #friends-live-activity li a[href=\"/DimeKari\"").parent().remove();
$('#friends-live-activity').bind("DOMSubtreeModified",function(){
    $(".section-mi #friends-live-activity li a[href=\"/DimeKari\"").parent().remove();
});
