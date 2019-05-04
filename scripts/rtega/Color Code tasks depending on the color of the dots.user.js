// ==UserScript==
// @name           Color Code tasks depending on the color of the dots
// @namespace      rtega
// @description	   Colors individual task text in the color of the dot
// @include        https://www.google.com/calendar/*
// @include        https://calendar.google.com/*
// @version        1.1
// @grant          none
// ==/UserScript==
document.addEventListener('DOMNodeInserted', function() {


	var checkBox = document.querySelectorAll('span.yzifAd');
	for (var J = checkBox.length-1;  J >= 0;  --J){
        if(checkBox[J].className.search("doneColor") == -1)
        {
            checkBox[J].className = checkBox[J].className + " doneColor";
            checkBox[J].style.color = checkBox[J].parentNode.parentNode.firstChild.firstChild.style.borderColor;
        }
    }
}, false);
