// ==UserScript==
// @name         WeBL - Add accordion to Active Fighters Page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  accordion
// @author       Play to Lose
// @match        http://webl.vivi.com/cgi-bin/query.fcgi?competition=eko&command=eko_default
// @match        http://webl.vivi.com/cgi-bin/query.fcgi?competition=eko&command=eko_all_fighters_brief
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var doc = document;
    //new style for accordion
    const css = `/* Style the buttons that are used to open and close the accordion panel */
    .accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, .accordion:hover {
    background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
}
.accordion:after {
    content: '+'; /* Unicode character for "plus" sign (+) */
    font-size: 13px;
    color: #777;
    float: right;
    margin-left: 5px;
}

.active:after {
    content: "-"; /* Unicode character for "minus" sign (-) */
}`;
    var style = doc.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	doc.head.appendChild(style);

    // change h4 elements (weight classes) into buttons
    var hfour = doc.getElementsByTagName('H4');
    var arrayLength = hfour.length;
    for (var i= arrayLength; i-->0;) {
        var target = hfour[i];
		var newText = target.innerHTML;
		var newButton = doc.createElement('button');
        var t = doc.createTextNode(newText);
        newButton.className = 'accordion';
	    newButton.appendChild(t);
	    target.parentNode.replaceChild(newButton, target);
    }
    var bquote = doc.getElementsByTagName('BLOCKQUOTE');
        arrayLength = bquote.length;
        for (i= arrayLength; i-->0;) {
        target = bquote[i];
		newText = target.innerHTML;
		var div = doc.createElement('div');
        div.className = 'panel';
        div.innerHTML = newText;
	    target.parentNode.replaceChild(div, target);

    }

    var acc = doc.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
})();