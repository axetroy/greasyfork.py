// ==UserScript==
// @name Geocaching log Premium for free
// @namespace *
// @include https://www.geocaching.com/geocache/*
// @version 1.0.4
// @author jonasled
// @homepage https://jonasled.tk
// @description A Script that adds a log Button to geocachings premium Cache, if you have no Premium.
// ==/UserScript==

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}



var element = getElementByXpath('//*[@id="ctl00_divContentMain"]/section[2]/a');
if (typeof(element) != 'undefined' && element != null)
{
    var GcCode = getElementByXpath('//*[@id="ctl00_divContentMain"]/div[1]/ul[1]/li[3]').innerText;

    var div = document.createElement("div");
    var url = 'https://www.geocaching.com/play/geocache/' + GcCode + '/log';

    div.innerHTML = '<br><a href="' + url + '" class="btn btn-primary">Geocache loggen</a>';
    insertAfter(div, getElementByXpath('//*[@id="ctl00_divContentMain"]/section[2]'));
}