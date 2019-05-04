// ==UserScript==
// @name         RealityGamin
// @namespace    https://realitygaming.fr/
// @include      https://realitygaming.fr/*
// @version      0.1
// @description  Bloc Note sur RGFR
// @author       Weyzen
// @match        https://realitygaming.fr/*
// @grant        none
// ==/UserScript==

le double click action - edit a person.
    	gridPanel.on('rowdblclick', function(gridPanel, rowIndex, e) {
	    	var selectedReference = siteDataStore.data.items[rowIndex].data.reference;  
 
	    	alert("***editer par reference "+ selectedReference);
 
	    	new EditSite(siteDataStore, selectedReference);  
		});