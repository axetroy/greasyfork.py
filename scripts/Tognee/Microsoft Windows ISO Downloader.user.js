// ==UserScript==
// @name        Microsoft Windows ISO Downloader
// @namespace   http://tampermonkey.net/
// @version     0.2.5
// @description dumps from https://tb.rg-adguard.net/products.html
// @author      Tognee (Original Script from u/captainpixystick/)
// @match       https://www.microsoft.com/*/software-download/windows10ISO
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand
// ==/UserScript==

var slt = {
	"Windows 7" : {
		'28' : "Starter",
		 '2' : "Home Basic",
		 '6' : "Home Premium",
		 '4' : "Professional",
		 '8' : "Ultimate"
	},
	"Windows 8.1" : {
		'52' : "Home",
		'68' : "Professional",
		'48' : "Single Language"
	},
	"Windows 10 (Threshold 1 - 1507)" : {
		'79' : "Home & Professional",
		'82' : "Single Language"
	},
	"Windows 10 November Update (Threshold 2 - 1604)" : {
		'178' : "Home & Professional",
		'184' : "Single Language"
	},
	"Windows 10 Anniversary Update (Redstone 1 - 1607)" : {
		'244' : "Home & Professional",
		'246' : "Single Language"
	},
	"Windows 10 Creators Update (Redstone 2 - 1703)" : {
		'361' : "Home & Professional",
		'363' : "Single Language"
	},
	"Windows 10 Fall Creators Update (Redstone 3 - 1709)" : {
		'484' : "Home & Professional"
	},
	"Windows 10 April 2018 Update (Redstone 4 - 1803)" : {
		'651' : "Home & Professional"
	},
	"Windows 10 October 2018 Update (Redstone 5 - 1809)" : {
		'1019' : "Home & Professional"
	}
};
var eb = document.getElementById("product-edition");
var ops = '<option value="" selected="selected">Select edition</option>';
for(var op in slt){
	ops+= '<optgroup label="'+op+'">';
	for(var op2 in slt[op]){
		ops += '<option value="'+op2+'">'+slt[op][op2]+'</option>';
    }
}
eb.innerHTML = ops;