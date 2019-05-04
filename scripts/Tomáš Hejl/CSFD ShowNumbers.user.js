// ==UserScript==
// @name         CSFD ShowNumbers
// @namespace    thetom.csfd
// @version      1.5
// @description  U všech odkazů na filmy na webu CSFD načte a ukáže celkové hodnocení filmu v procentech.
// @author       TheTomCZ <hejl.tomas@gmail.com>
// @match        https://www.csfd.cz/*
// @require       http://code.jquery.com/jquery-2.2.1.min.js
// @homepage     https://greasyfork.org/en/scripts/17888-csfd-shownumbers
// @grant        none
// ==/UserScript==

$.noConflict();
jQuery(function() {
    'use strict';
    var prefix = "tt.";
	var timeprefix = "tt.from.";
    var counter = 0;
	var currYear = (new Date().getFullYear());
	
	function getId(urlOrig){
		var numsInUrl = urlOrig.match(/\/[0-9]+\-/g);
		var numLen = numsInUrl.length;
		var lastNum = numsInUrl[numLen-1];
		var id = parseInt(lastNum.substr(1,lastNum.length-2));
		return id;
	}
	
	function savePctg(id,pctg){
		pctg = pctg.replace("%","");
		localStorage.setItem(prefix+id, pctg );
		localStorage.setItem(timeprefix+id, jQuery.now() );
		return pctg;
	}
	
	function loadPctg(url, counter, id){
		jQuery("#ttctr"+counter).load(url + " .average", function(data){
			try{
				data = jQuery.parseJSON(data);
				if(data.redirect){
					loadPctg(data.redirect, counter, id);
					return;
				}
			} catch (err){
			}
			var pctg = jQuery(this).text();
			pctg = savePctg(id,pctg);
			jQuery(this).text(pctg);
		});	
	}
	
	
	// prepare style for included h2 from loaded html
	jQuery("head").append("<style>.film h2{display:inline;font-size:inherit!important;font-weight:inherit!important} .film{position:relative;} .film .pctg{position: relative;left:-15px;top:-1px;font-size:8px;color:white}</style>");
	
	// na stránce je hodnocení filmu!
	if(jQuery(".average").size()){
		var currId = getId(location.href);
		savePctg(currId,jQuery(".average").text());
	}
	
	// get each movie link in the page
	jQuery("a.film").each(function(){
		if( jQuery(this).hasClass("c0") ){
			return; // skip movies with no percentage
		}
		counter++;
		var urlOrig = jQuery(this).attr("href");
		var id = getId(urlOrig);
        var year = jQuery(this).siblings(".film-year").text();
		
		// prepare span to include percentage
		jQuery(this).prepend("<span class='pctg' id='ttctr"+counter+"'></span>"); 
		
		// maxAge - for new movies, load percentage every 2 days, for older movies not so frequently
		var maxAge = 1000*60*60*24*2; // 2 days
		if(year==currYear-1){ // last year
			maxAge *= 3; // 6 days
		}
		if(year<maxAge-1){ // age 1y+
			maxAge *= 90; // cca 6 months
		}
		// if I have stored percentage & it is not yet of maxAge
        if( localStorage.hasOwnProperty(prefix+id) && localStorage.getItem(prefix+id) && localStorage.getItem(timeprefix+id)>jQuery.now()-maxAge ){
			// load the stored number
			var pctg = localStorage.getItem(prefix+id);
			if(pctg.indexOf("%")!==-1){
				pctg = pctg.replace("%","");
			}
			jQuery("#ttctr"+counter).text(pctg);
		} else {
			// load page, parse percentage, store with timestamp for next time
			loadPctg(urlOrig, counter, id);
		}
		
	});
});