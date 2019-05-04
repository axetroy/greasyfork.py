// ==UserScript==
// @name           Clock1
// @description   Clock in basso alle pagine colore blu e rosso
// @author        figuccio
// @version       0.2
// @include     *
// @namespace https://greasyfork.org/users/237458
// ==/UserScript==

if (window.top != window.self) return;

var box = document.createElement("div");
box.setAttribute("style", "bottom: 20px; margin:10px;color:red;border-radius:10px;border:2px solid green; font-family:sans-serif; font-size:16pt; background-color:blue; position:fixed; text-align:center; z-index:99999;");

document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
    var s = d.getSeconds();
    var D = d.getDate();//giorno settimana

   var DataAttuale = new Date();
  var Giorni = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"]
  var NumeroGiornoAttuale = DataAttuale.getDay();
  var GiornoAttuale = Giorni[NumeroGiornoAttuale];

    var Datamese = new Date();
  var Mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]
  var NumeroMeseAttuale = DataAttuale.getMonth();
  var MeseAttuale = Mesi[NumeroMeseAttuale];
         //anno
var mydate=new Date()
var year=mydate.getYear()
if (year < 1000)
year+=1900
var day=mydate.getDay()
var month=mydate.getMonth()+1
if (month<10)
month="0"+month
var daym=mydate.getDate()
if (daym<10)


	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
	box.innerHTML =GiornoAttuale + " " +D + " "+MeseAttuale + " " +year + " " + h + ":" + m + ":" + s
}

tick();
setInterval(tick, 1000);



