// ==UserScript==
// @name         hover.com - Sort domains by regular price.
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Lets you sort domains on hover.com by their regular price.
// @author       You
// @match        https://www.hover.com/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

function sortByRegularPrice(){

var getLiItemPrice = (element) => Number(element.textContent.split('$')[1])
var priceItems = document.querySelectorAll('.results .catslide .regular_price, .results .catslide .col.price')

Array.from(priceItems)
.sort((prevElem, nextElem) => getLiItemPrice(prevElem) - getLiItemPrice(nextElem))
.forEach(elem => {
	var isOnSpecial = elem.classList.contains("regular_price")
	var parentContainer = isOnSpecial ? elem.parentNode.parentNode.parentNode.parentNode : elem.parentNode.parentNode.parentNode
	document.querySelector('.results .catslide>div').appendChild(parentContainer)
})

document.querySelector('.results .heading h2').textContent = 'Sorted Results By Regular Price'

}

GM_registerMenuCommand('Sort Domains By Regular Price', sortByRegularPrice)