// ==UserScript==
// @name         FreeMonero.online - (Semi-automático)
// @namespace    https://www.youtube.com/channel/UCGE9I-eHlADj1SirsijcoZw
// @version      1.1
// @description  Ganhe monero automaticamente
// @author       Análise Criptomoedas - https://www.youtube.com/channel/UCGE9I-eHlADj1SirsijcoZw
// @match        https://freemonero.online/
// @grant        none
// ==/UserScript==

// CADASTRE-SE NO SITE COM A REFERENCIA 35951

(function() {
    window.setInterval(function() {
	    if ($('#roll').text() == 'Click to win!') {
		    $('#roll').click();
	    }
    }, 5000);
})();