// ==UserScript==
// @name         GOTA EXTENSIÓN CLAN 【₱€】 + Macro Donut
// @version      1.7.3
// @namespace    theoxt.com
// @description  Peruvian Extension By Theo - Macros, Hats, Skins, Animations, Smooth, more
// @raidcall	 11522949
// @discord		 https://discord.gg/c9Pv8YD
// @author       Theo & Swykz & Donut
// @match        https://gota.io/web/*
// @icon         https://i.imgur.com/zkqjlO2.jpg
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// ==/UserScript==



(function(){
    if (window.top != window.self) return;

    if (!('code' in KeyboardEvent.prototype)) {
        return alert("Sorry, your browser is incompatible with Gota.io Features by Donut. You're recommended to install the newest version of Google Chrome or Mozilla Firefox browsers.");
    }

    function getVersionParts(v, validate = false) {
        var parts = v.split('.');
        if (validate) for (var i = 0; i < parts.length; i++) if (!/^\d+$/.test(parts[i])) return false;
        return parts;
    }

    function compareVersions(v1, v2) {
        var v1parts = getVersionParts(v1), v2parts = getVersionParts(v2);

        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);

        while (v1parts.length < v2parts.length) v1parts.push(0);
        while (v2parts.length < v1parts.length) v2parts.push(0);

        for (var i = 0; i < v1parts.length; ++i) {
            if (v1parts[i] > v2parts[i]) return 1;
            else if (v1parts[i] < v2parts[i]) return -1;
        }
        return 0;
    }

    var importantUpdates = ['1.5.3', '1.6', '1.6.3'];
    importantUpdates.sort(compareVersions);

    var version = '1.6.10', storageVersion = localStorage['donut-version'], notify = false;
    if (!storageVersion || !getVersionParts(storageVersion, true) || compareVersions(version, storageVersion) == 1 && (importantUpdates.lastIndexOf(version) >= 0 || compareVersions(importantUpdates[importantUpdates.length - 1], storageVersion) == 1)) notify = true;
    else localStorage['donut-version'] = version;

    var styles = {
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

window.();
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
