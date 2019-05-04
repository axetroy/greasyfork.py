// ==UserScript==
// @name         Preview Link
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows you to preview a link
// @author       divide100
// @require https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=46106
// ==/UserScript==
/* jshint -W097 */

var util = {
    log: function () {
        var args = [].slice.call(arguments);
        args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: purple;');
        console.log.apply(console, args);
    },
    q: function(query, context) {
        return (context || document).querySelector(query);
    },
    qq: function(query, context) {
        return [].slice.call((context || document).querySelectorAll(query));
    }
};

var SCRIPT_NAME = "Link Preview";

util.log('Starting');


waitForElems('a', function(link) {
    link.onmouseover = function(e) {
        if(e.shiftKey && e.ctrlKey) {
            var elem = util.q('#mylnkPrev');
            if(!elem) {
                var title = document.createElement('h2');
                title.textContent = e.target.innerText;
                title.style.borderBottom = '1px solid black';
                title.style.textAlign = 'center';

                var iframe = document.createElement('iframe');
                iframe.src = e.target.href;
                iframe.style.width = '750px';
                iframe.style.height = '500px';

                elem = document.createElement('div');
                elem.appendChild(title);
                elem.appendChild(iframe);

                elem.style.border = '1px solid black';
                elem.style.background = 'white';
                elem.style.zIndex = '999';
                elem.style.position = 'absolute';
                elem.style.top = e.y + 'px';
                elem.style.left = e.x + 'px';
                elem.id = 'mylnkPrev';

                document.body.appendChild(elem);
            }
            else {
                elem.style.top = e.y + 'px';
                elem.style.left = e.x + 'px';
                elem.childNodes[0].textContent = e.target.innerText;
                elem.childNodes[1].src = e.target.href;
            }
            elem.style.display = 'inline';
        }
    }
});

window.onclick = function(e) {
    if(e.target.id != 'mylnkPrev')
    {
        var elem = util.q('#mylnkPrev');
        if(elem) {
            elem.style.display = 'none';
        }
    }
};