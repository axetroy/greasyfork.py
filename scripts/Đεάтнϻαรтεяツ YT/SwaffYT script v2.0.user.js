// ==UserScript==
// @name         SwaffYT script v2.0
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  NO LAG GOTA.IO PLAY!
// @author       Swaff
// @match        https://gota.io/web/*
// @grant        GM_addStyle
// @contributor  Swaff
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @icon         https://i.imgur.com/9RhhIRo.png
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";

GM_xmlhttpRequest({
	url: "http://gota.io/web",
	method: "GET",
	onload: function(req){
		let response = req.responseText;
		response = response.replace(/<script\s*src="gota\.js\?v=\d\.\d\.\d"><\/script>/i, '<script src="https://hastebin.com/raw/otamoridex.md"></script>');
		response = response.replace(/(Show\s*Border<\/span><br>)/i, '$1 <input type="checkbox" class="checkbox-options" id="cShowSectors"><span>Show Sectors</span><br>');
 		document.open();
		document.write(response);
		document.close();