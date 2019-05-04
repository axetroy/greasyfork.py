// ==UserScript==
// @name         filtro saques
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include        http*://*.tribalwars.net/*
// @include        http*://*.tribalwars.nl/*
// @include        http*://*.plemiona.pl/*
// @include        http*://*.tribalwars.se/*
// @include        http*://*.tribos.com.pt/*
// @include        http*://*.divokekmeny.cz/*
// @include        http*://*.bujokjeonjaeng.org/*
// @include        http*://*.triburile.ro/*
// @include        http*://*.voyna-plemyon.ru/*
// @include        http*://*.fyletikesmaxes.gr/*
// @include        http*://*.tribalwars.no.com/*
// @include        http*://*.divoke-kmene.sk/*
// @include        http*://*.klanhaboru.hu/*
// @include        http*://*.tribalwars.dk/*
// @include        http*://*.plemena.net/*
// @include        http*://*.tribals.it/*
// @include        http*://*.klanlar.org/*
// @include        http*://*.guerretribale.fr/*
// @include        http*://*.guerrastribales.es/*
// @include        http*://*.tribalwars.fi/*
// @include        http*://*.tribalwars.ae/*
// @include        http*://*.tribalwars.co.uk/*
// @include        http*://*.vojnaplemen.si/*
// @include        http*://*.genciukarai.lt/*
// @include        http*://*.wartribes.co.il/*
// @include        http*://*.plemena.com.hr/*
// @include        http*://*.perangkaum.net/*
// @include        http*://*.tribalwars.jp/*
// @include        http*://*.tribalwars.bg/*
// @include        http*://*.tribalwars.asia/*
// @include        http*://*.tribalwars.us/*
// @include        http*://*.tribalwarsmasters.net/*
// @include        http*://*.tribalwars.com.br/*
// @grant        none
// ==/UserScript==

javascript:
if(!YOUTUBETW100)
	var YOUTUBETW100 = {};

//locating the important DOM-Elements
var div = document.getElementById("am_widget_Farm");
var table = $('#plunder_list')[0];
var rows = table.getElementsByTagName("tr");


//variables
var savedMinRess, ressArray, ressInt, cells;


//get last input from local storage
savedMinRess = localStorage.getItem("tm4rkus_savedMinRess");


//add input-field
cells = rows[0].getElementsByTagName("th");
var input = document.createElement("input");
input.size = 6;
input.value = savedMinRess;
input.style.marginRight = "5px";
cells[5].insertBefore(input,cells[5].getElementsByTagName("img")[0]);


//update the list every time the user inserts anything
input.addEventListener("keyup", filter, false);


function filter() {
    savedMinRess = input.value;
    localStorage.setItem("tm4rkus_savedMinRess", savedMinRess);
	
    //iterate through every row
    for (var i = 1; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");
		
        //error prevention
        if (cells.length >= 10) {
			
            /*
			ressArray = cells[5].textContent.split(" ");
			
            //add up ressources
            ressInt = parseInt(ressArray[0]) + parseInt(ressArray[1]) + parseInt(ressArray[2]);
			*/
			
			/*==== scrape and sum resources ====*/
			var cellBackup = String(cells[5].innerHTML);
			var res = $(cells[5]).find('.res, .warn_90, .warn').get();
			var ressInt = 0;
			for(var r=0; r<res.length; r++)
			{
				res[r] = Number($(res[r]).text().replace('.', ''));
				ressInt += res[r];
			}			
			cells[5].innerHTML = cellBackup;
            
            //hide row, if ressources are too low
            if (ressInt < input.value) {
                rows[i].style.display = "none";
            }
            //show row, if otherwise
            else {
                rows[i].style.display = "";
            }
        }
    }
}


filter();