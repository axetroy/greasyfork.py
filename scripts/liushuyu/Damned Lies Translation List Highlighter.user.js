// ==UserScript==
// @name         Damned Lies Translation List Highlighter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Highlight the entries in the task list which are not finished and nobody works on it
// @author       liushuyu
// @match        https://l10n.gnome.org/languages/*/ui/
// @grant        none
// ==/UserScript==

function loadDetailPage(a, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.a = a; // HACK: store the element
    xhr.overrideMimeType('text/html');
    xhr.onload = function(event) {
        if (xhr.readyState !== xhr.DONE || xhr.status !== 200) {
            return;
        }
        var parser = new DOMParser();
        var detail_page = parser.parseFromString(xhr.responseText, 'text/html');
        var uploads = detail_page.getElementsByClassName('uploaded_file');
        var someone_completed = false;

        for (let upload of uploads) {
            var stats = upload.getElementsByTagName('span')[0];
            if (!stats) continue;
            stats = stats.innerText.split('/');
            if (stats[1] === '0' || stats[2] === '0') {
                someone_completed = true;
                break;
            }
        }

        if (!someone_completed) {
            console.log(a.getElementsByTagName('a')[0].innerText);
            a.setAttribute("style", "background: #f0f8ff;");
        }
    }; // ! onload
    xhr.send();
}


(function() {
    'use strict';
    var x = document.getElementById('stats-table');
    var y = x.getElementsByTagName('tbody')[0];
    var z = y.children;

    var not_completed = [];
    for (var i = 0; i < z.length; i++) {
        var a = z[i];
        if (a.id !== '' && a.className != 'completed-module') {
            var url = a.getElementsByTagName('a')[0];
            url = url.getAttribute('href');

            loadDetailPage(a, url);

        } // ! if
    } // ! for

})();
