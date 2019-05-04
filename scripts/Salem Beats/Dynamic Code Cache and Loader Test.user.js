// ==UserScript==
// @name         Dynamic Code Cache and Loader Test
// @namespace    salembeats
// @version      666666666666
// @description  For anything that needs automatic updates, for people who are too dumb to check for themselves and for things that require more frequent updates than daily.
// @author       Cuyler Stuwe (salembeats)
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_info
// @grant        unsafeWindow
// @include      *
// @connect      greasyfork.org
// ==/UserScript==

if(window !== window.top) {return;}

var cachedCodeSource;
var cachedCodeString;
var code;

// Will be a callback when this becomes a library object.
function modifiedCode(code) {
	// TEST: Uncomment alerts and replace with console logs.
	return code.replace("// alert", "console.log");
}

window.addEventListener("storage", e => {
	if(e.key === "codeSource" && e.newValue) {
		cachedCodeSource = e.newValue;
		cachedCodeString = JSON.parse(cachedCodeSource).code;
		let modifiedCachedCodeString = modifiedCode(cachedCodeString);
		code = new Function(modifiedCachedCodeString);
		code();
	}
});

const JAVASCRIPT_NETWORK_URL =   "https://greasyfork.org/scripts/37534-code-loader-target-test/code/Code%20Loader%20Target%20Test.user.js";
const JAVASCRIPT_NETWORK_URL_2 = "https://greasyfork.org/scripts/37534-code-loader-target-test/code/Code%20Loader%20Target%20Test.user.js";
const STORAGE_METHOD = "localStorage";
const RETRIEVAL_METHOD = "localStorage";

function storeValue(key, value, method) {
	if(method === undefined) {method = "localStorage";}

	if(method === "GM") {
		GM_setValue(key, value);
	}
	else if(method === "localStorage") {
		localStorage.setItem(key,value);
	}
	else if(method === "both") {
		if(GM_setValue) {GM_setValue(key, value);}
		localStorage.setItem(key,value);
	}
}

function getValue(key, value, method) {
	if(method === undefined) {method = "localStorage";}

	if(method === "GM") {
		return GM_getValue(key);
	}
	else if(method === "localStorage") {
		return localStorage.getItem(key);
	}
	else if(method === "primaryGM") {
		return GM_getValue(key) || localStorage.getItem(key);
	}
	else if(method === "primaryLocalStorage") {
		return localStorage.getItem(key) || GM_getValue(key);
	}
}

GM_xmlhttpRequest({
	url: `${JAVASCRIPT_NETWORK_URL}?cacheBuster=${new Date().toString()}`,
	method: "GET",
	onload: function(response) {
		main(response);
	}
});

function getVersionNumberFromCodeString(string) {
	return (string.match(/\/\/\s*@version\s+([0-9]+(?:\.[0-9]+)?)/) || [0, undefined])[1];
}

function canBeExplicitlyCastAsNumber(n) {
  return !isNaN(parseFloat(Number(n))) && isFinite(Number(n));
}

unsafeWindow.canBeExplicitlyCastAsNumber = canBeExplicitlyCastAsNumber;

function isNewerVersion(newcomer, original) {
	if(canBeExplicitlyCastAsNumber(newcomer) && canBeExplicitlyCastAsNumber(original) ) {
		return (Number(newcomer) > Number(original));
	}
}

function main(response) {

	// debugger;

	let networkCodeVersion = getVersionNumberFromCodeString(response.responseText);

	if(!networkCodeVersion) {return;} // Leave if the response or script was borked.

	cachedCodeSource = getValue("codeSource", RETRIEVAL_METHOD);
	if(cachedCodeSource) {
		cachedCodeString = JSON.parse(getValue("codeSource", RETRIEVAL_METHOD)).code;

		let cachedCodeVersion = getVersionNumberFromCodeString(cachedCodeString);

		if(isNewerVersion(networkCodeVersion, cachedCodeVersion)) {
			storeValue("codeSource", JSON.stringify({
				code: response.responseText
			}), STORAGE_METHOD);
		}
		else {
			const modifiedCodeString = modifiedCode( cachedCodeString );
			code = new Function( modifiedCodeString );
			code();
		}
	}
	else {
		storeValue("codeSource", JSON.stringify({
			code: response.responseText
		}), STORAGE_METHOD);
	}
}