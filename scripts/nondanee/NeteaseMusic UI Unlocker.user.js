// ==UserScript==
// @name         NeteaseMusic UI Unlocker
// @namespace    https://github.com/nondanee
// @version      0.1.1
// @description  Simple UI Unblock for Netease cloud music Website
// @author       nondanee
// @match        https://music.163.com/*
// @grant        none
// ==/UserScript==

if(window.top != window.self){
	(() => {
		const searchFunction = (object, keyword) =>
			Object.keys(object)
			.filter(key => object[key] && typeof object[key] == 'function')
			.find(key => String(object[key]).match(keyword))

		const keyOne = searchFunction(window.nej.e, '\.dataset;if')
		const keyTwo = searchFunction(window.nm.x, '\..copyrightId==')
		const keyThree = searchFunction(window.nm.x, '\.privilege;if')
		const functionOne = window.nej.e[keyOne]

		window.nej.e[keyOne] = (z, name) => {
			if (name == 'copyright' || name == 'resCopyright') return 1
			return functionOne(z, name)
		}
		window.nm.x[keyTwo] = () => false
		window.nm.x[keyThree] = song => {
			song.status = 0
			if (song.privilege) song.privilege.pl = 320000
			return 0
		}

		const table = document.querySelector('table tbody')
		if(table){
			Array.from(table.childNodes)
			.filter(element => element.classList.contains('js-dis'))
			.forEach(element => element.classList.remove('js-dis'))
		}
	})()
}
