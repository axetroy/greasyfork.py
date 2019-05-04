// ==UserScript==
// @name         God
// @description  Suscriber Edition
// @version      2.2.0
// @namespace    xxxx
// @author       DeathYt
// @match        gota.io
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

//DeathYt - Death Clan Extension beta 1.0.7 
//Thanks for the help "https://www.youtube.com/channel/UCbTdW6LN7HHq845y1QvF5HA":