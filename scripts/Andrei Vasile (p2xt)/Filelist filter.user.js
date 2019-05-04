// ==UserScript==
// @name Filelist filter
// @description Filelist filter for TV series and number of downloads
// @include http://filelist.ro/*
// @version 0.0.1.20180911084422
// @namespace https://greasyfork.org/users/162242
// ==/UserScript==

var wordListing = [
"Marvels.Agents.of.S.H.I.E.L.D.S",
"Marvel's.Agents.of.S.H.I.E.L.D.S",
"Arrow.S",
"Gotham.S",
"Game.of.Thrones.S",
"Sleepy.Hollow.S",
"South.Park.S",
"Supernatural.S",
"The.Flash.2014.S",
"The.Flash.S",
"Daredevil.S",
"Modern.Family.S",
"The.Walking.Dead.S",
"Lucifer.S",
"Westworld.S",
"Vikings.S"
];

var selection1 = 500;
var selection2 = 999;
var selection3 = 1999;
var selectionColor1 = "#003366";
var selectionColor2 = "#002900";
var selectionColor3 = "#6B0000";

var ul = document.getElementById("nav").children[0];
var li = document.createElement('li');
li.className = "fleft";
ul.appendChild(li);
var a = document.createElement('a');
var linkText = document.createTextNode("Activate");
a.appendChild(linkText);
a.title = "Activate the filter";
a.href = "javascript:void(0)";
a.setAttribute("id", "CustomButton");
a.addEventListener("click", myScript);
li.appendChild(a);

function myScript() {
	var torrentrow = document.getElementsByClassName("torrentrow");
	
	if(document.getElementById("CustomButton").innerHTML == "Activate") {
		document.getElementById("CustomButton").innerHTML = "Deactivate";

		for (i = 0; i < torrentrow.length; i++) {
			if(typeof torrentrow[i].children !== 'undefined'){
				var title = torrentrow[i].children[1].children[0].children[0].innerText;
				var snatched = torrentrow[i].children[7].children[0].children[0].textContent;
				snatched = snatched.replace(",", "");
				snatched = snatched.replace("times", "");
				snatched = parseInt(snatched);
				for (k = 0; k < wordListing.length; k++) {
					if (title.match(wordListing[k])) {
						torrentrow[i].children[1].children[0].children[0].style.textDecoration = "underline overline";
						torrentrow[i].children[1].children[0].children[0].style.color = "#33CCFF";
					}
				}
				if (snatched > selection3) {
					torrentrow[i].style.backgroundColor = selectionColor3;
				} else if (snatched > selection2) {
					torrentrow[i].style.backgroundColor = selectionColor2;
				} else if (snatched > selection1) {
					torrentrow[i].style.backgroundColor = selectionColor1;
				}
			}
		}
	
	} else {
		document.getElementById("CustomButton").innerHTML = "Activate";
		
		for (j = 0; j < torrentrow.length; j++) {
			torrentrow[j].children[1].children[0].children[0].style.textDecoration = "none";
			torrentrow[j].removeAttribute("style");
			torrentrow[j].children[1].children[0].children[0].removeAttribute("style");
		}
	}
}
console_log("Filelist custom script loaded...");