// ==UserScript==
// @name         ƳƊ❥? ????? ??
// @description  Suscriber Edition
// @version      Beta 0.1
// @namespace    xxxx
// @author       Beast YT
// @match        *.gota.io/web/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==

window.stop();
document.documentElement.innerHTML = "";

GM_xmlhttpRequest({
	url: "http://gota.io/web",
	method: "GET",
	onload: function(req){
		let response = req.responseText;
		response = response.replace(/<script\s*src="gota\.js\?v=\d\.\d\.\d"><\/script>/i, '<script src="https://pastebin.com/raw/wHyrNfUG"></script>');
		response = response.replace(/(Show\s*Border<\/span><br>)/i, '$1 <input type="checkbox" class="checkbox-options" id="cShowSectors"><span>Show Sectors</span><br>');
 		document.open();
		document.write(response);
		document.close();
	}
});

//BeastYT - YD Clan Extension Beta V0.1 Suscriber Edition
//Thanks for the help "https://www.youtube.com/channel/UCbTdW6LN7HHq845y1QvF5HA":