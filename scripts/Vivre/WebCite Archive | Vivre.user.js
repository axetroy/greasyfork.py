// ==UserScript==
// @name             WebCite Archive | Vivre
// @description    Send single or multiple archive-request/s to www.webcitation.org. w/o mail
// @version          0.2 - 04.05.2016
// @author           Vivre
// @namespace	   https://greasyfork.org/en/users/31346-vivre
// @include         http*
// @grant            GM_registerMenuCommand
// ==/UserScript==
// https://greasyfork.org/en/scripts/19361-webcite-archive-vivre


// ***********************************************************************
// USAGE: call functions via GM-menu entries
// 1 - webarchive Multi-url -> opens a form on current page to insert multiple URLs
// to be submitted as archive-requests
// 2 - webarchive This Page -> sends current page-URL as archive-request
// Options: 
// - send with or without your email for success-returnmail [adjust settings !]
// - apply your own words/language to buttons and menu texts
//
// NOTE & WARNING: URL-limitation
// Be carefull with the multi-requests, as each url will open its own target page.
// Therefore I've included a maxPages-check that only allows processing/accessing
// 20 urls/pages at a time. You may en-/decrease that fixed amount in the settings below.
// Also consider that a sudden massiv multi-request from the same IP might raise alarms
// on the server-side .... just saying
// 
// enjoy ~ Vivre
// ***********************************************************************
// 
// version  0.2 - 04.05.2016: style adjustments, additional options for own language, 
// 	enhanced hint: showing current settings and auto-fade-out
// version  0.1 - 03.05.2016: initial release
// 
// ***********************************************************************



// ##################  SETTINGs

var myMail = 'myMail@mail.com';		//  change to your e-mail

var useMail_Single = 0;		//  0/1 dis-/enable usage of your mail for single page request
var useMail_Multi = 0;		//  0/1 dis-/enable usage of your mail for multiple page requests

var maxPages = 20;		// maximum processed links per function-call [submit], encrease at own risk

// here you may change the apearing button-texts and GM-menu-entries to your own words/language
var buttonSubmit = "submit links to webcitation";
var buttonClose = "dismiss & close";

var menuThisPage = "webarchive This Page";
var menuMultiUrl = "webarchive Multi-url";


var webcitation = 'http://www.webcitation.org/archive?url=';

// #####################################



// ##################  current page archiving request

function webarchiveSingle() {
	if (useMail_Single) {
		var currLink = webcitation + encodeURIComponent(document.location) + '&email=' + myMail;
	} else {
		var currLink = webcitation + encodeURIComponent(document.location);
	}
	window.open(currLink);
//	alert(currLink);
}; // end waSingle


// ##################  multiple pages archiving requests

function webarchiveMulti() {

	function submitLinks() {
		var linkis = document.getElementById('wcLinks').value;
		linkis = linkis.replace(/\n/g, ',');
		var allLinks = linkis.split(',');
		var limit = 0;

		for each(var val in allLinks) {
			if (val != '' && val.match('http') && limit < maxPages) {
				if (useMail_Multi) {
					var currLink = webcitation + encodeURIComponent(val) + '&email=' + myMail;
				} else {
					var currLink = webcitation + encodeURIComponent(val);
				}
		 		window.open(currLink);
//				alert(currLink);
				limit = limit +1;
			};
		}; 
	};


	function removeForm() {
		var del = document.getElementById('wcDiv');
		del.parentNode.removeChild(del);
	};


// ##################  Setup form

	var hint = "insert links here - one per line --- if ready click submit above";
	hint = hint + "\n\nCurrent settings:\nmyMail = " + myMail + "\nuseMail_Single = " + useMail_Single+ "\nuseMail_Multi = " + useMail_Multi +  "\nmaxPages = " + maxPages ;


	if (hint) {
		var div1 = document.createElement("div");
		div1.setAttribute('id', 'wcDiv');
		div1.setAttribute('style', ' margin-left: 10px; width: 680px; border: 3px solid #52829C; background-color: #6AA8CA; margin-top:10px; margin-bottom:30px; padding: 4px 4px 4px 4px;')

		var but1 = document.createElement("button");
		but1.setAttribute('style', 'font-weight: bold; font-size: 13px; font-family: serif; color: white; border: 2px solid #52829C; background-color: green; margin-left: 30px; ');
		but1.innerHTML = buttonSubmit;		  // "submit links to webcitation"
		but1.addEventListener('click', submitLinks, false);

		var but2 = document.createElement("button");
		but2.setAttribute('style', 'font-weight: bold; font-size: 13px; font-family: serif; color: white; border: 2px solid #52829C; background-color: maroon; margin-left: 330px; ');
		but2.innerHTML = buttonClose;		  // "dismiss & close"
		but2.addEventListener('click', removeForm, false);

		allLi = document.createElement("textarea");
		allLi.setAttribute('id', 'wcLinks');
		allLi.setAttribute("style", "width: 660px;  height: 130px; font-size: 11px; margin-left: 8px; margin-top: 4px; margin-bottom: 2px;");
		allLi.textContent = hint;

		div1.appendChild(but1);
		div1.appendChild(but2);
		div1.appendChild(allLi);
		document.body.appendChild(div1);

		window.scrollTo(0, document.getElementById('wcDiv').offsetTop);
		setTimeout(function() {document.getElementById('wcLinks').textContent = ''}, 5000);
	};

}; // end waMulti



// ##################  Register GM-menu-entries

GM_registerMenuCommand(menuThisPage, webarchiveSingle);	  // "webarchive This Page"
GM_registerMenuCommand(menuMultiUrl, webarchiveMulti);	  // "webarchive Multi-url"



// alert('end of script'); 
