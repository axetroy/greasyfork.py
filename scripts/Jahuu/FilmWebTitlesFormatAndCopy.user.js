// ==UserScript==
// @name        FilmWebTitlesFormatAndCopy
// @namespace   jahuu.info
// @author      Jahuu
// @description Prosty skrypt do sformatowania i przygotowania tytułu filmu do skopiowania - używam do spójnego nazywania filmów w swojej kolekcji. / Simple script, to format and prepare to copy title of movie.
// @include     *filmweb.pl*
// @version     0.9.1
// @grant       none
// ==/UserScript==

var elements = document.getElementsByClassName('inline filmTitle');
var output1 = document.getElementById("sidebar");
for (var i = 0; i < elements.length; i++) {
 var elementWithTitle = elements[i].innerHTML;
}
var pos1Title = elementWithTitle.indexOf('>')+1;
var pos2Title = elementWithTitle.lastIndexOf('<');
var Title = elementWithTitle.slice(pos1Title,pos2Title).replace(':','_');

var elements = document.getElementsByClassName('halfSize');
for (var i = 0; i < elements.length; i++) {
 var elementWithDate = elements[i].innerHTML;
}
var pos2Date = elementWithDate.indexOf(')')+1;
var date = elementWithDate.slice(0,pos2Date);

var elements = document.getElementsByClassName('s-42 vertical-align light');
for (var i = 0; i < elements.length; i++) {
 var elementWithRating = elements[i].innerHTML;
}
var pos1Rating = elementWithRating.indexOf('>')+2;
var pos2Rating = elementWithRating.lastIndexOf('<');
var Rating = elementWithRating.slice(pos1Rating,pos2Rating);
var DivCustom = '<div style="background: none repeat scroll 0% 0% #000;font-size: 13px;height: 26px;line-height: 26px;padding: 0px;"><input style="background: none repeat scroll 0% 0% #000;font-size: 13px;color: white; width: 300px; border: none; height: 26px;line-height: 26px;padding: 0px;" type="text" id="divcustom" value="'+Title+' '+date+'['+Rating+']"></div>'+output1.innerHTML

output1.innerHTML = DivCustom;
document.getElementById("divcustom").select();
