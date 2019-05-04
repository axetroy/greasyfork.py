// ==UserScript==
// @name           mobile.de, autoscout24 Entfernungsrechner
// @description    Berechnet Entfernung von Ihrem Wohnort bis zum angebotenen Fahrzeug. Funktioniert sowohl auf der Suchergebnis-Seite als auch auf der mit Details.
// @namespace      softwarecanoe.de
// @include        http://suchen.mobile.de/*
// @include 	   http://*.autoscout24.*
// @version        1.3
// @copyright      Eugen Kremer
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// ==/UserScript==
(function(){
	function debug(msg){
		console.log(msg);
	}
	
	function SetStart(){
		if (typeof(GM_getValue)=="undefined")
			return;
		
		var start = GM_getValue("addr");
		start = prompt("Geben Sie die Startadresse ein", start);
		GM_setValue("addr", start);
	} 

	function GetStart(){
		var start = null;
		if (typeof(GM_getValue)!="undefined")
			start = GM_getValue("addr");
			
		return start;
	}

	GM_registerMenuCommand("Mobile.de Settings", SetStart);

	function OnLoadResponse(responseDetails) {
		if (responseDetails.readyState !=4)
			return;
			
		var json  = eval("("+responseDetails.responseText+")");
		
		var distanz = json.routes[0].legs[0].distance;
		var dauer = json.routes[0].legs[0].duration;

		this.divEl.innerHTML = dauer.text+" - "+distanz.text;
	}

	function SendRequest(start, ziel, resultEl){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://maps.google.de/maps/api/directions/json?language=de&mode=driving&origin='+start+'&destination='+ziel+'&sensor=false',
			ziel:ziel,
			divEl: resultEl,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			},
			onload: OnLoadResponse
		});
	}

	function CreateAnchor(parent, start, ziel){
		var aEl = document.createElement('a');
		aEl.style.display = "block";
		
		parent.appendChild(aEl);

		if (start){
			aEl.href = "http://maps.google.de/maps?f=d&source=s_d&saddr="+start+"&daddr="+ziel+"&hl=de&ie=UTF8";
			aEl.target = "_blank";
			SendRequest(start, ziel, aEl);
		} else {
			aEl.href = "javascript: void(null);";
			aEl.addEventListener("click", function(){ SetStart(); document.location.href = document.location.href;}, false);
			aEl.innerHTML = "Startpunkt setzen!";
		}
	}

	function AddDistanceAndDuration(){// autoscout searchresult
		var p = document.querySelectorAll(".listItem .truncc span:nth-child(1)");
		if (!p || p.length==0)
			return;

		var handler  = p[0];

		var ziel = handler.textContent;

		var start = GetStart();

		CreateAnchor(handler, start, ziel);
	}
	function AddDistanceAndDuration5(){// autoscout details
		var p = document.querySelectorAll(".contact-container div:nth-child(2)");
		if (!p || p.length==0)
			return;

		var handler  = p[0];

		var ziel = handler.textContent;

		var start = GetStart();

		CreateAnchor(handler, start, ziel);
	}
	function AddDistanceAndDuration4(){ // mobile.de details page
		var p = document.querySelectorAll("#vcardAddress");
		if (!p || p.length==0)
			return;

		var handler  = p[0];
		var ziel = handler.textContent;
		
		var start = GetStart();

		CreateAnchor(handler, start, ziel);
	}

	function AddDistanceAndDuration2(){ // mobile.de search results 
		var list = document.querySelectorAll(".cBox-body--resultitem .g-col-10 .u-margin-bottom-9");

		if (!list || list.length == 0)
			return;

		var start = GetStart();

		for(var i=0, c=list.length; i<c; i++){
			var ziel = list[i];
			AddDistanceAndDurationFor(start, ziel.textContent, ziel);
		}
	}

	function AddDistanceAndDuration3(){
		var list = document.querySelectorAll("div.maps-location td.maps-data div");
		
		if (!list || list.length == 0)
			return;
			
		var start = GetStart();

		var ziel = list[0].textContent.replace(/\s{2,}/g,' ');
		
		if (ziel.length < 1 )
			return;
			
		var divEl = document.createElement("div");
		divEl.style.cssFloat = "right";
		
		var container = document.getElementById("detailRight");
		container.insertBefore(divEl, container.firstChild);
		
		CreateAnchor(divEl, start, ziel);
				
	}

	function AddDistanceAndDurationFor(start, ziel, textNode){
		// create new node containing destination and duration
		var divEl = document.createElement("div");
		
		textNode.appendChild(divEl);

		CreateAnchor(divEl, start, ziel);
	}
	window.addEventListener('load', 
		function() { 
			try{
				AddDistanceAndDuration();
				AddDistanceAndDuration2();
				AddDistanceAndDuration3();
				AddDistanceAndDuration4();
				AddDistanceAndDuration5();
			}catch(e){
				if (typeof(console)!='undefined')
					console.log(e);
			} 
		},
		true
	);
	
})();