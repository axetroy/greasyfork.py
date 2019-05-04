// ==UserScript==
// @name        Save GameFAQs as a text file
// @description Save GameFAQs as a text file.
// @namespace   undefined
// @include     https://www.gamefaqs.com/*
// @version     0.3a
// @grant       none
// ==/UserScript==
(function () {
    "use strict";
    var doc = document;
    var faqText = doc.getElementById("faqtext").innerHTML;
    var blob;
    var a = doc.createElement("a");
    var filename = doc.URL.substr(doc.URL.lastIndexOf("/") + 1) + ".txt";
    var location;
    function organizeText(text) {
        var entity = {
            lt: "<",
            gt: ">",
            amp: "&",
            nbsp: " "
        };
        var unreChar = [];
        text = text.replace(/<\/?span.*?>/g, "");
        text = text.replace(/&([^&;]{2,8});/g, function (match, p1) {
            var r = entity[p1];
            if (r) {
                return r;
            } else {
                unreChar.push(match);
                return match;
            }
        });
        if (unreChar.length > 0) {
            a.onclick = function () {
                alert("This document may have some unrecognized characters.\n[" + unreChar[0] + "]");
            };
        }
        return text;
    }
    function getLocation() {
        var p = doc.getElementsByTagName("p");
        var i = 0;
        var length = p.length;
        while (i < length) {
            if (p[i].className === "ffaq_page") {
                return p[i];
            }
            i += 1;
        }
        return doc.body;
    }
    if (faqText) {
        faqText = organizeText(faqText);
        blob = new Blob([faqText], {
            endings: "native"
        });
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.textContent = "Download the Text File";
        location = getLocation();
        location.appendChild(doc.createElement("br"));
        location.appendChild(a);
    }
}());
