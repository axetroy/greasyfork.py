// ==UserScript==
// @name        Various torrent links to Episodecalendar
// @description  Adds various torrent links next to every episode in calendar, unwatched and season overview sections
// @namespace   NotNeo
// @icon        https://i.imgur.com/ZVbAdH9.png
// @include     https://episodecalendar.com/*
// @version     3.5
// @require  	https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

/* stored variable removal
GM_deleteValue("usingRARBG");
GM_deleteValue("usingTP");
GM_deleteValue("usingTPB");
GM_deleteValue("usingTorz2");
alert( GM.getValue("usingRARBG") );
alert( GM.getValue("usingTP") );
alert( GM.getValue("usingTPB") );
alert( GM.getValue("usingTorz2") );
*/

//Default settings if there are none stored.
var usingRARBG = true;
var usingTP = false;
var usingTPB = false;
var usingTorz2 = false;
var using1337x = false;
var usingSnahp = false;
var orderBySeeds = true;
var Get1080pOnly = false;

(async function() {
    if( (await GM.getValue("usingRARBG")) != null ) {
        usingRARBG = await GM.getValue("usingRARBG");
    }
    if( (await GM.getValue("usingTP")) != null ) {
        usingTP = await GM.getValue("usingTP");
    }
    if( (await GM.getValue("usingTPB")) != null ) {
        usingTPB = await GM.getValue("usingTPB");
    }
    if( (await GM.getValue("usingTorz2")) != null ) {
        usingTorz2 = await GM.getValue("usingTorz2");
    }
    if( (await GM.getValue("using1337x")) != null ) {
        using1337x = await GM.getValue("using1337x");
    }
    if( (await GM.getValue("orderBySeeds")) != null ) {
        orderBySeeds = await GM.getValue("orderBySeeds");
    }
    if( (await GM.getValue("Get1080pOnly")) != null ) {
        Get1080pOnly = await GM.getValue("Get1080pOnly");
    }
    if( (await GM.getValue("usingSnahp")) != null ) {
        usingSnahp = await GM.getValue("usingSnahp");
    }
})();

if(!usingTP && !usingRARBG && !usingTPB && !usingTorz2 && !using1337x && !usingSnahp) { usingRARBG = true; } //(if all settings are set to false, usingRARBG is set to true)

setTimeout(function(){
    fullScript();
    var URL = window.location.href;
    setInterval(function(){
        var newURL = window.location.href;
        if (newURL != URL) {
            URL = newURL;
            fullScript();
        }
    }, 1000);
}, 1500);

//wait for turbolinks thingy
document.addEventListener("turbolinks:load", function() {
    setTimeout(function(){
        fullScript();
    }, 1500);
});

function UpdateSettings() {
    usingRARBG = document.getElementById("RARBGCheckbox").checked; //saving the changes to runtime variable
    usingTP = document.getElementById("TPCheckbox").checked;
    usingTPB = document.getElementById("TPBCheckbox").checked;
    usingTorz2 = document.getElementById("Torz2Checkbox").checked;
    using1337x = document.getElementById("Checkbox1337x").checked;
    orderBySeeds = document.getElementById("CheckboxOrderBySeeds").checked;
    Get1080pOnly = document.getElementById("CheckboxGet1080pOnly").checked;
    usingSnahp = document.getElementById("CheckboxSnahp").checked;
    GM.setValue("usingRARBG", usingRARBG); //storing the new values to local storage
    GM.setValue("usingTP", usingTP);
    GM.setValue("usingTPB", usingTPB);
    GM.setValue("usingTorz2", usingTorz2);
    GM.setValue("using1337x", using1337x);
    GM.setValue("orderBySeeds", orderBySeeds);
    GM.setValue("Get1080pOnly", Get1080pOnly);
    GM.setValue("usingSnahp", usingSnahp);
}

function fullScript() {
    var vURL = window.location.href;
    if ( vURL.indexOf("episodecalendar.com/users/edit") >= 0 ) { //Settings section ------------------
        if(!document.getElementById("newSetDiv")) {
            var settingsDiv = document.getElementById("settings");

            var newSetTit = document.createElement("h2"); //Creating Settings title -----
            var newSetTitAt = document.createAttribute("class"); //Creating the attribute "class" for title
            newSetTitAt.value = "big margin_bottom"; //setting the attribute value
            newSetTit.setAttributeNode(newSetTitAt); //Giving the attribute to the settings title
            var newSetTitTe = document.createTextNode("Torrent Link Settings"); // Creating a text node for the settings title node
            newSetTit.appendChild(newSetTitTe); //Inserting title text node into the title node

            var newSetDiv = document.createElement("div"); //Creating Settings div -----
            var newSetDivAt = document.createAttribute("class"); //Creating the attribute "class" for div
            var newSetDivAt2 = document.createAttribute("id");
            newSetDivAt2.value = "newSetDiv";
            newSetDivAt.value = "epic-card -no-margin pad margin_bottom_big"; //setting the attribute value
            newSetDiv.setAttributeNode(newSetDivAt); //Giving the attribute to the settings div
            newSetDiv.setAttributeNode(newSetDivAt2);

            settingsDiv.insertBefore(newSetTit, settingsDiv.firstElementChild.nextElementSibling);
            settingsDiv.insertBefore(newSetDiv, settingsDiv.firstElementChild.nextElementSibling.nextElementSibling);
            var innerHTMLForNewSet = '<div class="checkbox-wrapper"><input name="RARBGCheck" type="hidden" value="0"><input type="checkbox" value="1" name="RARBGCheck2" id="RARBGCheckbox"> <label for="RARBGCheckbox">Use RARBG</label></div><br><br>' +
                '<div class="checkbox-wrapper"><input name="TPCheck" type="hidden" value="0"><input type="checkbox" value="1" name="TPCheck2" id="TPCheckbox"> <label for="TPCheckbox">Use TorrentProject2</label></div><br><br>' +
				'<div class="checkbox-wrapper"><input name="TPBCheck" type="hidden" value="0"><input type="checkbox" value="1" name="TPBCheck2" id="TPBCheckbox"> <label for="TPBCheckbox">Use The Pirate Bay</label></div><br><br>' +
				'<div class="checkbox-wrapper"><input name="Torz2Check" type="hidden" value="0"><input type="checkbox" value="1" name="Torz2Check2" id="Torz2Checkbox"> <label for="Torz2Checkbox">Use Torrentz2</label></div><br><br>' +
                '<div class="checkbox-wrapper"><input name="Check1337x" type="hidden" value="0"><input type="checkbox" value="1" name="Check21337x" id="Checkbox1337x"> <label for="Checkbox1337x">Use 1337x</label></div><br><br>' +
                '<div class="checkbox-wrapper"><input name="CheckSnahp" type="hidden" value="0"><input type="checkbox" value="1" name="Check2Snahp" id="CheckboxSnahp"> <label for="CheckboxSnahp">Use Snahp forums</label></div><br><br>' +
                '<div class="checkbox-wrapper"><input name="CheckGet1080pOnly" type="hidden" value="0"><input type="checkbox" value="1" name="Check2Get1080pOnly" id="CheckboxGet1080pOnly"> <label for="CheckboxGet1080pOnly">1080p Only</label></div><br><br>' +
                '<div class="checkbox-wrapper"><input name="CheckOrderBySeeds" type="hidden" value="0"><input type="checkbox" value="1" name="Check2OrderBySeeds" id="CheckboxOrderBySeeds"> <label for="CheckboxOrderBySeeds">Order torrents by seeds</label></div>';
            document.getElementById("newSetDiv").innerHTML = innerHTMLForNewSet;
            document.getElementById("RARBGCheckbox").checked = usingRARBG; //setting checkbox values to the saved values or if none are saved, to the default values
            document.getElementById("TPCheckbox").checked = usingTP;
			document.getElementById("TPBCheckbox").checked = usingTPB;
			document.getElementById("Torz2Checkbox").checked = usingTorz2;
            document.getElementById("Checkbox1337x").checked = using1337x;
            document.getElementById("CheckboxOrderBySeeds").checked = orderBySeeds;
            document.getElementById("CheckboxGet1080pOnly").checked = Get1080pOnly;
            document.getElementById("CheckboxSnahp").checked = usingSnahp;
        }
        document.getElementById("RARBGCheckbox").onchange = UpdateSettings;
        document.getElementById("TPCheckbox").onchange = UpdateSettings;
		document.getElementById("TPBCheckbox").onchange = UpdateSettings;
		document.getElementById("Torz2Checkbox").onchange = UpdateSettings;
        document.getElementById("Checkbox1337x").onchange = UpdateSettings;
        document.getElementById("CheckboxOrderBySeeds").onchange = UpdateSettings;
        document.getElementById("CheckboxGet1080pOnly").onchange = UpdateSettings;
        document.getElementById("CheckboxSnahp").onchange = UpdateSettings;
    }
	else if ( vURL.indexOf("episodecalendar.com/en/calendar") >= 0 ) { //do the following if we are in the calendar section ----------------
        var selected = document.querySelectorAll("span.episode"); //get all episode nodes
        for(var i = 0; i < selected.length; i++) { //Loop through the nodes and do the following to all targets
            var showName = selected[i].previousElementSibling.firstChild.textContent; //Getting showname
            showName = showName.replace("'", "%27");
            var epNumTemp = selected[i].textContent; //Getting the episode number
            epNumTemp = epNumTemp.substring(epNumTemp.length - 7, epNumTemp.length -1);
            epNumTemp = epNumTemp.split("(")[1];
            var epNumTemp1 = epNumTemp.split("x")[0]; //changing the episode number format to: s01e01
            if (epNumTemp1.length < 2) { epNumTemp1 = "0" + epNumTemp1; } //adding prefix 0 if needed
            var epNumTemp2 = epNumTemp.split("x")[1]; //changing the episode number format to: s01e01
            if (epNumTemp2.length < 2) { epNumTemp2 = "0" + epNumTemp2; } //adding prefix 0 if needed
            var epNum = "S" + epNumTemp1 + "E" + epNumTemp2; //changing the episode number format to: s01e01
            //append torrent button
			/*
            if(usingRARBG && usingTP) {
                selected[i].innerHTML += " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + epNum + "'> <img alt='RARBG DL Link' src='https://dyncdn.me/static/20/img/16x16/download.png'> </a> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + epNum + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>";
            } else */
			if(usingTP) {
                selected[i].innerHTML += " <span> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&orderby=seeders" : "") + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>";
            }
			if(usingRARBG) {
                selected[i].innerHTML += " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&order=seeders&by=DESC" : "") + "'> <img alt='RARBG DL Link' src='https://rarbg.to/favicon.ico'> </a> </span>";
            }
			if(usingTPB) {
                selected[i].innerHTML += " <span> <a class='dllink3' href='https://thepiratebay.org/search/" + showName + " " + epNum + " " + (Get1080pOnly ? "1080p" : "") + "/0/99/0" + "'> <img alt='TPB DL Link' src='https://thepiratebay.org/favicon.ico' width='16' height='16'> </a> </span>";
            }
			if(usingTorz2) {
                selected[i].innerHTML += " <span> <a class='dllink4' href='https://torrentz2.eu/search?f=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + "'> <img alt='Torrentz2 DL Link' src='https://torrentz2.eu/favicon.ico' width='14' height='14'> </a> </span>";
            }
            if(using1337x) {
                selected[i].innerHTML += " <span> <a class='dllink5' href='https://1337x.st/" + (orderBySeeds ? "sort-" : "") + "search/" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "/seeders/desc" : "") + "/1/'> <img alt='1337x DL Link' src='https://1337x.st/favicon.ico' width='14' height='14'> </a> </span>";
            }
            if(usingSnahp) {
                selected[i].innerHTML += " <span> <a class='dllink6' href='https://forum.snahp.it/search.php?keywords=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + "'&sf=titleonly> <img alt='Snahp DL Link' src='https://forum.snahp.it/favicon.ico' width='14' height='14'> </a> </span>";
            }
        }
    }
	else if ( vURL.indexOf("episodecalendar.com/en/unwatched") >= 0 ) { //do the following if we are in the unwatched section --------------

        var season = document.querySelectorAll("div.options"); //get all season nodes(the node before the season node) (working with target -> nextNode )
        for(var i = 0; i < season.length; i++) { //Loop through the nodes and do the following to all targets
            //querySelectorAll('[class^="dllink"]');
            if (season[i].nextElementSibling.querySelectorAll('[class^="dllink"]').length < 1) { //check if a button is already there
                var nameAndSeason = season[i].nextElementSibling.firstChild.innerHTML; //getting show name and season
                var showName = nameAndSeason.split(" - ")[0]; //splitting off show name
                showName = showName.replace("'", "%27");
                seasonT = nameAndSeason.split(" - ")[1]; //splitting off season
                shortformSeason = seasonT.split(" ")[1];
                if (shortformSeason.length < 2) {
                    shortformSeason = "S0" + shortformSeason;
                } else {
                    shortformSeason = "S" + shortformSeason;
                }
                //append torrent button for full season
                if(usingTP) {
                    season[i].nextElementSibling.innerHTML = " <span> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&orderby=seeders" : "") + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>" + season[i].nextElementSibling.innerHTML;
                }
				if(usingRARBG) {
                    season[i].nextElementSibling.innerHTML = " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + shortformSeason + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&order=seeders&by=DESC" : "") + "'> <img alt='RARBG DL Link' src='https://rarbg.to/favicon.ico'> </a> </span>" + season[i].nextElementSibling.innerHTML;
                }
				if(usingTPB) {
                    season[i].nextElementSibling.innerHTML = " <span> <a class='dllink3' href='https://thepiratebay.org/search/" + showName + " " + seasonT + " " + (Get1080pOnly ? "1080p" : "") + "/0/99/0" + "'> <img alt='TPB DL Link' src='https://thepiratebay.org/favicon.ico' width='16' height='16'> </a> </span>" + season[i].nextElementSibling.innerHTML;
                }
				if(usingTorz2) {
					season[i].nextElementSibling.innerHTML = " <span> <a class='dllink4' href='https://torrentz2.eu/search?f=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + "'> <img alt='Torrentz2 DL Link' src='https://torrentz2.eu/favicon.ico' width='14' height='14'> </a> </span>" + season[i].nextElementSibling.innerHTML;
				}
                if(using1337x) {
                    season[i].nextElementSibling.innerHTML = " <span> <a class='dllink5' href='https://1337x.st/" + (orderBySeeds ? "sort-" : "") + "search/" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "/seeders/desc" : "") + "/1/'> <img alt='1337x DL Link' src='https://1337x.st/favicon.ico' width='14' height='14'> </a> </span>" + season[i].nextElementSibling.innerHTML;
                }
                if(usingSnahp) {
                    season[i].nextElementSibling.innerHTML = " <span> <a class='dllink6' href='https://forum.snahp.it/search.php?keywords=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + "&sf=titleonly'> <img alt='Snahp DL Link' src='https://forum.snahp.it/favicon.ico' width='14' height='14'> </a> </span>" + season[i].nextElementSibling.innerHTML;
                }
            }
        }
        var selected = document.querySelectorAll("div.epic-list-episode"); //get all episode nodes
        for(var i = 0; i < selected.length; i++) { //Loop through the nodes and do the following to all targets
            if (selected[i].querySelectorAll('[class^="dllink"]').length < 1) { //check if a button is already there
                var epNumTemp = selected[i].textContent; //Getting episode number. For some reason going any deeper nets no results????
                var epNumTemp1 = epNumTemp.split("x")[0]; //Cleaning up episode number string
                var epNumTemp2 = epNumTemp.split("x")[1]; //Cleaning up episode number string
                epNumTemp1 = epNumTemp1.replace(/[^0-9.]/g, ""); //Cleaning up episode number string
                if (epNumTemp1.length < 2) { epNumTemp1 = "0" + epNumTemp1; } //adding prefix 0 if needed
                epNumTemp2 = epNumTemp2.substring(0, 2); //Cleaning up episode number string
                epNumTemp2 = epNumTemp2.replace(/[^0-9.]/g, ""); //Cleaning up episode number string
                if (epNumTemp2.length < 2) { epNumTemp2 = "0" + epNumTemp2; } //adding prefix 0 if needed
                var epNum = "S" + epNumTemp1 + "E" + epNumTemp2; //changing the episode number format to: s01e01
                //append torrent button (again, can't traverse any deeper!?)
                if(usingTP) {
                    selected[i].innerHTML = " <span> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&orderby=seeders" : "") + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingRARBG) {
                    selected[i].innerHTML = " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&order=seeders&by=DESC" : "") + "'> <img alt='RARBG DL Link' src='https://rarbg.to/favicon.ico'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingTPB) {
                    selected[i].innerHTML = " <span> <a class='dllink3' href='https://thepiratebay.org/search/" + showName + " " + epNum + " " + (Get1080pOnly ? "1080p" : "") + "/0/99/0" + "'> <img alt='TPB DL Link' src='https://thepiratebay.org/favicon.ico' width='16' height='16'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingTorz2) {
					selected[i].innerHTML = " <span> <a class='dllink4' href='https://torrentz2.eu/search?f=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + "'> <img alt='Torrentz2 DL Link' src='https://torrentz2.eu/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
				}
                if(using1337x) {
                    selected[i].innerHTML = " <span> <a class='dllink5' href='https://1337x.st/" + (orderBySeeds ? "sort-" : "") + "search/" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "/seeders/desc" : "") + "/1/'> <img alt='1337x DL Link' src='https://1337x.st/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
                }
                if(usingSnahp) {
                    selected[i].innerHTML = " <span> <a class='dllink6' href='https://forum.snahp.it/search.php?keywords=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + "&sf=titleonly'> <img alt='Snahp DL Link' src='https://forum.snahp.it/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
                }
            }
        }
    }
	else if ( vURL.indexOf("episodecalendar.com/en/show/") >= 0 ) { //do the following if we are in the show section -----------------------
        var showName = document.querySelectorAll("h1.hidden")[0].textContent; //Getting the show name
        showName = showName.replace("'", "%27");
        var season = document.querySelectorAll("span.h2"); //getting the season nodes
        for (var i = 0; i < season.length; i++) { //Loop through the nodes and do the following to all targets
            if (season[i].parentNode.querySelectorAll('[class^="dllink"]').length < 1) { //check if a button is already there
                var seasonT = season[i].innerHTML; //get the season
                shortformSeason = seasonT.split(" ")[1];
                if (shortformSeason.length < 2) {
                    shortformSeason = "S0" + shortformSeason;
                } else {
                    shortformSeason = "S" + shortformSeason;
                }
                //append torrent button for full season
				if(usingTorz2) {
					season[i].insertAdjacentHTML("beforebegin", " <span> <a class='dllink4' href='https://torrentz2.eu/search?f=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + "'> <img alt='Torrentz2 DL Link' src='https://torrentz2.eu/favicon.ico' width='14' height='14'> </a> </span>");
				}
				if(usingTPB) {
                    season[i].insertAdjacentHTML("beforebegin", " <span> <a class='dllink3' href='https://thepiratebay.org/search/" + showName + " " + seasonT + " " + (Get1080pOnly ? "1080p" : "") + "/0/99/0" + "'> <img alt='TPB DL Link' src='https://thepiratebay.org/favicon.ico' width='16' height='16'> </a> </span>");
                }
				if(usingRARBG) {
                    season[i].insertAdjacentHTML("beforebegin", " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + shortformSeason + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&order=seeders&by=DESC" : "") + "'> <img alt='RARBG DL Link' src='https://rarbg.to/favicon.ico'> </a> </span>");
                }
                if(usingTP) {
                    season[i].insertAdjacentHTML("beforebegin", "<span> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&orderby=seeders" : "") + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>");
                }
                if(using1337x) {
                    season[i].insertAdjacentHTML("beforebegin", " <span> <a class='dllink5' href='https://1337x.st/" + (orderBySeeds ? "sort-" : "") + "search/" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "/seeders/desc" : "") + "/1/'> <img alt='1337x DL Link' src='https://1337x.st/favicon.ico' width='14' height='14'> </a> </span>");
                }
                if(usingSnahp) {
                    season[i].insertAdjacentHTML("beforebegin", " <span> <a class='dllink6' href='https://forum.snahp.it/search.php?keywords=" + showName + "+" + seasonT + "+" + (Get1080pOnly ? "1080p" : "") + "&sf=titleonly'> <img alt='Snahp DL Link' src='https://forum.snahp.it/favicon.ico' width='14' height='14'> </a> </span>");
                }
            }
        }
        var selected = document.querySelectorAll("div.epic-list-episode"); //get all episode nodes
        for(var i = 0; i < selected.length; i++) { //Loop through the nodes and do the following to all targets
            if (selected[i].querySelectorAll('[class^="dllink"]').length < 1) { //check if a button is already there //there was onlt 1&2 here earlier?
                var epNumTemp = selected[i].textContent; //Getting episode number. For some reason going any deeper nets no results????
                var epNumTemp1 = epNumTemp.split("x")[0]; //Cleaning up episode number string
                var epNumTemp2 = epNumTemp.split("x")[1]; //Cleaning up episode number string
                epNumTemp1 = epNumTemp1.replace(/[^0-9.]/g, ""); //Cleaning up episode number string
                if (epNumTemp1.length < 2) { epNumTemp1 = "0" + epNumTemp1; } //adding prefix 0 if needed
                epNumTemp2 = epNumTemp2.substring(0, 2); //Cleaning up episode number string
                epNumTemp2 = epNumTemp2.replace(/[^0-9.]/g, ""); //Cleaning up episode number string
                if (epNumTemp2.length < 2) { epNumTemp2 = "0" + epNumTemp2; } //adding prefix 0 if needed
                var epNum = "S" + epNumTemp1 + "E" + epNumTemp2; //changing the episode number format to: s01e01
                //append torrent button (again, can't traverse any deeper!?)
                if(usingTP) {
                    selected[i].innerHTML = " <span> <a class='dllink2' href='http://torrentproject2.se/?t=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&orderby=seeders" : "") + "'> <img alt='TorrentProject DL Link' src='https://i.imgur.com/bOql47X.png'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingRARBG) {
                    selected[i].innerHTML = " <span> <a class='dllink' href='https://rarbg.to/torrents.php?search=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + (orderBySeeds ? "&order=seeders&by=DESC" : "") + "'> <img alt='RARBG DL Link' src='https://rarbg.to/favicon.ico'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingTPB) {
                    selected[i].innerHTML = " <span> <a class='dllink3' href='https://thepiratebay.org/search/" + showName + " " + epNum + " " + (Get1080pOnly ? "1080p" : "") + "/0/99/0" + "'> <img alt='TPB DL Link' src='https://thepiratebay.org/favicon.ico' width='16' height='16'> </a> </span>" + selected[i].innerHTML;
                }
				if(usingTorz2) {
					selected[i].innerHTML = " <span> <a class='dllink4' href='https://torrentz2.eu/search?f=" + showName + "+" + epNum + "+" + (Get1080pOnly ? "1080p" : "") + "'> <img alt='Torrentz2 DL Link' src='https://torrentz2.eu/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
				}
                if(using1337x) {
                    selected[i].innerHTML = " <span> <a class='dllink5' href='https://1337x.st/" + (orderBySeeds ? "sort-" : "") + "search/" + showName + "+" + epNum + (orderBySeeds ? "/seeders/desc" : "") + "/1/'> <img alt='1337x DL Link' src='https://1337x.st/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
                }
                if(usingSnahp) {
                    selected[i].innerHTML = " <span> <a class='dllink6' href='https://forum.snahp.it/search.php?keywords=" + showName + "+" + epNum + "&sf=titleonly'> <img alt='Snahp DL Link' src='https://forum.snahp.it/favicon.ico' width='14' height='14'> </a> </span>" + selected[i].innerHTML;
                }
            }
        }
    }


}