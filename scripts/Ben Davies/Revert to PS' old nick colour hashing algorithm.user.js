// ==UserScript==
// @name        Revert to PS' old nick colour hashing algorithm
// @version     0.0.1
// @namespace   http://play.pokemonshowdown.com/
//              https://play.pokemonshowdown.com/
//              http://*.psim.us/
//              https://*.psim.us/
// @description tl;dr the nick colours are slightly different now and I don't like thing
// @includes    *
// ==/UserScript==

window.hashColor = function hashColor(name) {
	if (colorCache[name]) return colorCache[name];
	var hash;
	if (window.Config && Config.customcolors && Config.customcolors[name]) {
		if (Config.customcolors[name].color) {
			return (colorCache[name] = 'color:' + Config.customcolors[name].color + ';');
		}
		hash = MD5(Config.customcolors[name]);
	} else {
		hash = MD5(name);
	}
	var H = parseInt(hash.substr(4, 4), 16) % 360;
	var S = parseInt(hash.substr(0, 4), 16) % 50 + 50;
	var L = Math.floor(parseInt(hash.substr(8, 4), 16) % 20 / 2 + 30);
	colorCache[name] = "color:hsl(" + H + "," + S + "%," + L + "%);";
	return colorCache[name];
};