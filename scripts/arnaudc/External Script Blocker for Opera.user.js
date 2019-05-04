// ==UserScript==
// @name	External Script Blocker for Opera
// @author	Arnaud C <arnaudc.dev@gmail.com>
// @version	1
// @description	Similar to Firefox's extension NoScript. Blocks all external scripts by default. This prevents most ads from showing up and also increases security.
// @namespace https://greasyfork.org/users/3859
// ==/UserScript==

// Installation
// ------------
// Copy this fichier to your UserJavascript Folder
// To determine its location, go to Tools > Preferences > Advanced > Content > Javascript Options
// 
// Make sure UserJavascript is enabled, type in the adress bar : opera:config#UserPrefs|UserJavaScript
// This Script needs to have access to HTTPS in order to function on secure pages, type in the adress bar : opera:config#UserPrefs|UserJavaScriptonHTTPS
//
// How this works
// --------------
// This script blocks all external javascript by default. Only inline and same domain scripts are allowed.
// You can add exceptions for each site.
// It is advised to disable Javascript globally, and to enable it per site via Manage Site Preferences. On each site enabled, this script then goes in action.
// ==/UserScript==

var AllowArray = [];
var BlockArray = [];
var AllowArrayCreated = false;
var menuBuilt = false;

function ResetCSSLI(Element)
	{
	Element.style.display = "list-item";
	Element.style.padding = "0px";
	Element.style.margin = "0px";
	};

function ResetCSSInput(Element)
	{
	Element.style.borderWidth = "2px";
	Element.style.padding = "1px";
	Element.style.textAlign = "default";
	};

function ResetCSS(Element)
	{
	Element.style.fontFamily = "Verdana, Geneva, sans-serif";
	Element.style.fontSize = "13px";
	Element.style.fontWeight = "400";
	Element.style.fontStyle = "normal";
	Element.style.textIndent = "0";
	Element.style.textTransform = "none";
	Element.style.textAlign = "left";
	Element.style.color = "black";
	Element.style.lineHeight = "normal";
	Element.style.padding = "5px";
	Element.style.margin = "5px";
	Element.style.whiteSpace = "nowrap";
	};

// ------------------------------------------------------------------
// Options, lists External Scripts present with Allowed/Blocked state
// ------------------------------------------------------------------

addEventListener("load", function (e)
{

var myMenu, myElement, myP, myUL, myLI;
var i = 0;

if (!document.body)
  {
    return;
  };

function ResetCSSButton(Element)
	{
	Element.style.borderWidth = "2px";
	Element.style.display = "inline-block";
	Element.style.padding = "1px 8px";
	Element.style.textAlign = "center";
	Element.style.height = "30px";
	Element.style.width = "80px";
	Element.style.backgroundColor = "initial";
	};

function ResetCSSP(Element)
	{
	Element.style.display = "block";
	Element.style.margin = "1em 0";
	Element.style.padding = "0px";
	};

function ResetCSSUL(Element)
	{
	Element.style.display = "block";
	Element.style.margin = "1em 0";
	Element.style.listStylePosition = "outside";
	Element.style.padding = "0 0 0 10px";
	Element.style.listStyleType = "none";
	};


var showMenu = function()
	{
	if ( document.getElementById("ESBMenu").style.display == "block" )
		{
		document.getElementById("ESBMenu").style.display = "none"; 
		}
	else document.getElementById("ESBMenu").style.display = "block"; 
	};

var applyESBList = function()
	{
	var myInput;
	var i = 0;
	var oldAllowCount = 0;
	var newAllowCount = 0;

	oldAllowCount = AllowArray.length;
	AllowArray = [];

	i = 0;
	while ( i < oldAllowCount )
		{
		myInput = document.getElementById("ExternalScriptAllow"+i);
		if ( myInput.checked == true) 
			{
			AllowArray.push(myInput.getAttribute("value"));
			console.log("adding : "+myInput.getAttribute("value"));
			newAllowCount++;
			}
		i++;
		}

	i = 0;
	while ( i < BlockArray.length )
		{
		myInput = document.getElementById("ExternalScriptBlock"+i);
		if ( myInput.checked == true) 
			{
			AllowArray.push(myInput.getAttribute("value"));
			newAllowCount++;
			}
		i++;
		}
	
	AllowArray.sort();

	i = 0;
	while ( i < oldAllowCount )
		{
		if (localStorage["ExternalScriptAllow."+i]) { localStorage.removeItem("ExternalScriptAllow."+i) };
		i++;
		}

	i = 0;
	while ( i < newAllowCount )
		{
		localStorage.setItem("ExternalScriptAllow."+i, AllowArray[i]);
		i++;
		}
	
	localStorage.setItem("ExternalScriptAllowCount", newAllowCount.toString());
	location.reload();
	};

console.log("Document Loaded");

// Creation Menu Title
myElement = document.createElement("div");
ResetCSS(myElement);
myElement.style.cursor = "pointer";
myElement.style.width = "350px";
myElement.style.backgroundColor = "#E8E8E8";
myElement.style.textAlign = "center";
myElement.style.border = "1px solid black";
myElement.style.position = "fixed";
myElement.style.top = "0px";
myElement.style.left = "0px";
myElement.style.height = "20px";
myElement.style.verticalAlign = "middle";
myElement.style.zIndex = "2147483647";
myElement.style.margin = "0px";
myElement.style.display = "block";
myElement.onclick = function() { showMenu() };
myElement.appendChild(document.createTextNode("External Script Blocker"));
body = document.getElementsByTagName("body")[0];
document.body.appendChild(myElement);

// Creation Menu
myMenu = document.createElement("form");
myMenu.setAttribute("id", "ESBMenu");
myMenu.setAttribute("name", "ESBMenu");
ResetCSS(myMenu);
myMenu.style.backgroundColor = "white";
myMenu.style.position = "fixed";
myMenu.style.top = "30px";
myMenu.style.left = "0px";
myMenu.style.zIndex = "2147483647";
myMenu.style.display= "none";
myMenu.style.width = "350px";
myMenu.style.border = "1px solid black";
myMenu.style.margin = "0px";
myMenu.appendChild(document.createTextNode("Check a domain to allow it, uncheck to block it."));
myElement = document.createElement("br");
myMenu.appendChild(myElement);
myMenu.appendChild(document.createTextNode("Clicking OK will reload the page."));
myElement = document.createElement("br");
myMenu.appendChild(myElement);
myUL = document.createElement("ul");
myUL.setAttribute("id", "ESBList");
ResetCSS(myUL);
ResetCSSUL(myUL);

// Display of Allowed External Scripts (domains)
i = 0;
while ( i < AllowArray.length )
	{
	myLI = document.createElement("li");
	myUL.appendChild(myLI);
	ResetCSS(myLI);
	ResetCSSLI(myLI);
	myElement = document.createElement("input");
	myElement.setAttribute("type", "checkbox");
	myElement.setAttribute("checked", "checked");
	myElement.setAttribute("id", "ExternalScriptAllow"+i);
	myElement.setAttribute("value", AllowArray[i]);
	ResetCSS(myElement);
	ResetCSSInput(myElement);
	myUL.appendChild(myElement);
	myUL.appendChild(document.createTextNode(AllowArray[i]));
	i++;
	}

// Display of Blocked External Scripts (domains)
i = 0;
while ( i < BlockArray.length )
	{
	myLI = document.createElement("li");
	ResetCSS(myLI);
	ResetCSSLI(myLI);
	myUL.appendChild(myLI);
	myElement = document.createElement("input");
	myElement.setAttribute("type", "checkbox");
	myElement.setAttribute("id", "ExternalScriptBlock"+i);
	myElement.setAttribute("value", BlockArray[i]);
	ResetCSS(myElement);
	ResetCSSInput(myElement);
	myUL.appendChild(myElement);
	myUL.appendChild(document.createTextNode(BlockArray[i]));
	i++;
	}

myMenu.appendChild(myUL);
myP = document.createElement("p");
ResetCSS(myP);
ResetCSSP(myP);
myP.style.textAlign = "center";
myElement = document.createElement("button");
myElement.setAttribute("type", "button");
myElement.setAttribute("value", "OK");
myElement.onclick = function() { applyESBList() };
myElement.appendChild(document.createTextNode("OK"));
ResetCSS(myElement);
ResetCSSButton(myElement);
myP.appendChild(myElement);
myElement = document.createElement("button");
myElement.setAttribute("type", "reset");
myElement.setAttribute("value", "Cancel");
myElement.onclick = function() { showMenu() };
myElement.appendChild(document.createTextNode("Cancel"));
ResetCSS(myElement);
ResetCSSButton(myElement);
myP.appendChild(myElement);
myMenu.appendChild(myP);
body = document.getElementsByTagName("body")[0];
document.body.appendChild(myMenu);
menuBuilt = true;

}, false);


// ----------------------------------------
// Blocks External Scripts, with exceptions
// ----------------------------------------

window.opera.addEventListener( "BeforeExternalScript", function (e) 
{

var ScriptSrc;
var Link;
var Linkhost;
var myUL, myLI, myElement;

ScriptSrc = e.element.src;
Link = document.createElement("a");
Link.href = ScriptSrc;
Linkhost = Link.hostname;

// Retrieve Allowed External Scripts Domains from Local Web Storage

if ( AllowArrayCreated == false ) 
	{
	var i = 0;
	var AllowCount;

	if (localStorage["ExternalScriptAllowCount"])
		{
		AllowCount = parseInt(localStorage["ExternalScriptAllowCount"]);
		while (i < AllowCount)
			{
			AllowArray.push(localStorage["ExternalScriptAllow."+i]);
			i++;
			}
		}	
	AllowArrayCreated = true;
	}

// Allow local scripts (1st line necessary ??)
if ( ScriptSrc.indexOf("http://") != 0 && ScriptSrc.indexOf("https://") != 0 ) { return }
else if ( Linkhost == window.location.hostname ) { return }

// Allow some sites
else if ( AllowArray.indexOf(Linkhost) > -1 ) { return }

// Block the rest
else 
	{
	e.preventDefault();
	if ( BlockArray.indexOf(Linkhost) == -1 ) 
		{
		BlockArray.push(Linkhost);
		console.log("Blocked : "+Linkhost);
		// Adds Blocked Entry to Menu if it shows up after page loaded
		if ( menuBuilt ) 
			{
			myUL = document.getElementById("ESBList");
			myLI = document.createElement("li");
			ResetCSS(myLI);
			ResetCSSLI(myLI);
			myUL.appendChild(myLI);
			myElement = document.createElement("input");
			myElement.setAttribute("type", "checkbox");
			myElement.setAttribute("id", "ExternalScriptBlock"+(BlockArray.length-1));
			myElement.setAttribute("value", BlockArray[BlockArray.length-1]);
			ResetCSS(myElement);
			ResetCSSInput(myElement);
			myUL.appendChild(myElement);
			myUL.appendChild(document.createTextNode(BlockArray[BlockArray.length-1]));
			}
		}
	}

}, false );