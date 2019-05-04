// ==UserScript==
// @name         ao3 tweak formatting
// @namespace    https://greasyfork.org/en/users/36620
// @version      2.2
// @description  quick tools for text formatting
// @author       scriptfairy
// @include      /https?://archiveofourown\.org/works/\d+/
// @grant        none
// ==/UserScript==

function doubleBreak() {
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/<br>/g,'<br><br>').replace(/<br\/>/g,'<br><br>');
}

function deSpace() {
    var noBreak = document.createElement("style");
    noBreak.innerText = '#chapters br+br {display:none}';
    noBreak.type = 'text/css';
    document.head.appendChild(noBreak);
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/&nbsp;/g, ' ');
}

function stripAlign() {
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/align="left"/g, '').replace(/align="center"/g, '').replace(/align="right"/g, '');
}

function stripItalics() {
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/<em>/g,'').replace(/<\i>/g,'');
}

function deAsterisk() {
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/\*/g,'<i>').replace(/<i>\s/g,'</i>').replace(/<i>[^A-Za-z0-9]/g,'</i>');
}

function noTypewriter() {
    document.getElementById('chapters').innerHTML = document.getElementById('chapters').innerHTML.replace(/&nbsp;&nbsp;/g,'&nbsp;').replace(/ &nbsp;/g,' ');
}


//

var links = document.createElement('div');
links.innerHTML = '<span id="tweakFormat" class="click">Tweak Format</span><ul class="format-options"><li><a id="deSpace">remove line breaks</a></li><li><a id="doubleBreak">insert line breaks</a></li><li><a id="noTypewriter">remove double spaces</a></li><li><a id="stripAlign">align to default</a></li><li><a id="stripItalics">strip italics</a></li><li><a id="deAsterisk">*word* to <em>word</em> (exp.)</a></li></ul>';
links.classList.add('tweak-format');

var linksFormat = document.createElement('style');
linksFormat.innerText = '.tweak-format {text-align:right; font-size:small; cursor:pointer} .tweak-format .click+.format-options {display:none;} .tweak-format .click::before {content:"\\25b6 \\0020";} .tweak-format .clicked+.format-options {display:block;} .tweak-format .clicked::before {content:"\\25bc \\0020";}';
linksFormat.type = 'text/css';

document.head.appendChild(linksFormat);
document.getElementById('chapters').parentNode.insertBefore(links, document.getElementById('chapters'));

document.getElementById('deAsterisk').onclick = function() {deAsterisk();};
document.getElementById('stripItalics').onclick = function() {stripItalics();};
document.getElementById('stripAlign').onclick = function() {stripAlign();};
document.getElementById('doubleBreak').onclick = function() {doubleBreak();};
document.getElementById('deSpace').onclick = function() {deSpace();};
document.getElementById('noTypewriter').onclick = function() {noTypewriter();};

document.getElementById('tweakFormat').onclick = function() {
    if (this.classList.contains('click')) {
        this.classList.remove('click');
        this.classList += ' clicked';
    } else {
        this.classList.remove('clicked');
        this.classList += ' click';
    }
};