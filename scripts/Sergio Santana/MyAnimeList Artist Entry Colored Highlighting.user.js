// ==UserScript==
// @name         MyAnimeList Artist Entry Colored Highlighting
// @namespace    https://greasyfork.org/en/users/238602
// @version      1.1
// @description  Highlights shows when accessing an artist entry on the database. The color is chosen based on how the user has marked the show (watching, watched, on-hold, dropped or planned to watch).
// @icon         https://gitlab.com/SergioSantana/mal-highlighter/raw/master/icon.png
// @author       Sergio Santana
// @match        https://myanimelist.net/people/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	// Colors to highlight each show
	var colors = [
		"", // Unused
		"#A5FA8E",  // Watching = Green
		"#C6CFF9",	// Watched  = Blue
		"#FAF38E",	// On-Hold  = Yellow
		"#FF847C",	// Dropped  = Red
		"",	// Unused
		"#CBCBCB"	// Plan to Watch = Gray
	];

	var animeStatus; // HashTable containing all anime the user has added to their list
	var mangaStatus; // HashTable containing all manga the user has added to their list
	var allParsed;   // Boolean to know if all user's shows have been parsed
	document.onload = init();
	function init() {
		var tables = document.getElementsByTagName("table");
		var nTable = 1;
		var userName = document.getElementsByClassName("header-profile-link")[0].text;
		
		var url, offset, urlEnd, nextUrl;
		var request;
		
		// Check what we need to highlight
		var allMedia = document.getElementsByTagName("td");
		var htmlString = allMedia[1].innerHTML;
		var hasVoice = !htmlString.includes("No voice acting roles have been added to this person.");
		var hasAnime = !htmlString.includes("No staff positions have been added to this person.");
		var hasManga = !htmlString.includes("No published manga have been added to this person.");
		
		// HIGHLIGHT ANIME
		if (hasVoice || hasAnime)
		{
			animeStatus = checkCache('animeTime', 'animeStatus');

			if (!animeStatus)
			{
				console.log("Downloading user's anime list. This may take some time.");
				animeStatus = {};

				url = 'https://myanimelist.net/animelist/' + userName + '/load.json?offset=';
				offset = 0;
				urlEnd = '&status=7';
				
				request = new XMLHttpRequest();
				request.onload = function() {
					var result = JSON.parse(request.responseText);
					for (var i = 0; i < result.length; ++i)
					{
						animeStatus[result[i].anime_title] = result[i].status;
					}
					
					allParsed = (result.length < 300);
				};
				request.onerror = function() {
					console.log("ERROR: Couldn't fetch user list.");
					allParsed = true;
				};
				
				allParsed = false;
				while (!allParsed)
				{
					 nextUrl = url + offset + urlEnd;
					//console.log("Creating request for \n" + nextUrl);
					request.open("GET", nextUrl, false); // async == false
					request.send(null);
					offset = offset + 300;
				}
				localStorage.setItem('animeTime',  Date.now());
				localStorage.setItem('animeStatus', JSON.stringify(animeStatus));
			}

			if (hasVoice)
			{
				highlightTitles(tables[nTable], animeStatus);
				++nTable;
			}
			if (hasAnime)
			{
				highlightTitles(tables[nTable], animeStatus);
				++nTable;
			}
		}
		
		// HIGHLIGHT MANGA
		if (hasManga)
		{
			mangaStatus = checkCache('mangaTime', 'mangaStatus');
			
			if (!mangaStatus)
			{
				console.log("Downloading user's manga list. This may take some time.");
				mangaStatus = {};

				url = 'https://myanimelist.net/mangalist/' + userName + '/load.json?offset=';
				offset = 0;
				urlEnd = '&status=7';
				
				request = new XMLHttpRequest();
				request.onload = function() {
					var result = JSON.parse(request.responseText);
					for (var i = 0; i < result.length; ++i)
					{
						mangaStatus[result[i].manga_title] = result[i].status;
					}
					
					allParsed = (result.length < 300);
				};
				request.onerror = function() {
					console.log("ERROR: Couldn't fetch user list.");
					allParsed = true;
				};
				
				allParsed = false;
				while (!allParsed)
				{
					nextUrl = url + offset + urlEnd;
					//console.log("Creating request for \n" + nextUrl);
					request.open("GET", nextUrl, false); // async == false
					request.send(null);
					offset = offset + 300;
				}
				localStorage.setItem('mangaTime',  Date.now());
				localStorage.setItem('mangaStatus', JSON.stringify(mangaStatus));
			}
			
			highlightTitles(tables[nTable], mangaStatus);
		}
	}

	function checkCache(stringTime, stringStatus)
	{
		var lastTime = localStorage.getItem(stringTime);
		var timeLimit = (Date.now() - 2*60*1000);
		if (lastTime && lastTime > timeLimit)
		{
			console.log("Using data from cache. Wait 2 minutes to update the list.");
			var result = localStorage.getItem(stringStatus);
			return JSON.parse(result);
		}
		
		return null;
	}

	function highlightTitles(table, userList) {
		var contents = table.getElementsByTagName("tr");
		if (contents.length === 0)
			return;
		
		for (var i = 0; i < contents.length; i++)
		{
			var td = contents[i].getElementsByTagName("td");
			if (td.length === 0)
				continue;
				
			var nameShow = td[1].getElementsByTagName("a");
			var status = userList[nameShow[0].text]
			if (!status)
				continue;
			
			var color = colors[status];
			contents[i].setAttribute("style", "background-color: " + color + ";");
		}
	}
})();