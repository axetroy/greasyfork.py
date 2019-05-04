// ==UserScript==
// @name         KINOGO download
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Download films from kinogo
// @author       KoctrX
// @match        http://kinogo.cc/*
// @grant        none
// ==/UserScript==

class downloadKinogoFilms {
	constructor(elementClass, paramName) {
		this.elementClass = elementClass;
		this.paramName = paramName;
	}

	getTextValue() {
		let param = document.getElementsByTagName('param');
		for(let p of param) {
			if(p.getAttribute('name') === this.paramName) {
				return p.value;
			}
		}
	}

	getUrlForFilm() {
		let value = this.getTextValue().split('&');

		for(let v of value) {
			let temp = v.split('file=');
			if(temp.length >= 2) {
				return temp[1];
			}
		}
		return false;
	};

	renderButton() {
		let element = document.getElementsByClassName(this.elementClass)[0];
		let style = `background: #fbfbfbb3;padding: 3px;text-decoration: none;color: #000;`;

		let a = document.createElement('a');
		a.setAttribute('style', style);
		a.setAttribute('target', '_blank');
		a.setAttribute('href', this.getUrlForFilm());
		a.innerHTML = 'Скачать';
		element.appendChild(a);
	}
}

var advertising = () => {
	let a = document.getElementsByTagName('noindex');
	for(let t of a) { t.innerHTML = ''; }
};

function renderSearchTorrent() {
    let filmName = document.getElementsByClassName('shortstorytitle')[0].children[1].innerText;
    let down = new downloadKinogoFilms('tabs','flashvars');
    down.renderButton();
    let style = 'text-decoration: none;';
    document.getElementsByClassName('shortstorytitle')[0].children[1].innerHTML = filmName;
    document.getElementsByClassName('shortstorytitle')[0].children[1].innerHTML += `<hr><a style="${style}" href="https://rutracker.net/forum/search_cse.php?q=${filmName}" target="_blank">${filmName} - <span style="color: #f00;">rutraker.org</span></a>`;
    document.getElementsByClassName('shortstorytitle')[0].children[1].innerHTML += `<br><a style="${style}" href="https://www.google.com/search?q=Скачать ${filmName} торрентом" target="_blank">${filmName} - <span style="color: #f00;">google.com</span></a>`;
    document.getElementsByClassName('shortstorytitle')[0].children[1].innerHTML += `<br><a style="${style}" href="${down.getUrlForFilm()}" target="_blank">${filmName} - <span style="color: #53c170;">kinogo</span></a>`;
}

(function() {
    advertising();
    renderSearchTorrent();
})();