// ==UserScript==
// @name         cnbeta-blocker
// @namespace    https://github.com/cologler
// @version      0.2.0.0
// @description  block cnbeta bad comments.
// @author       cologler
// @match        http://www.cnbeta.com/articles/*.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var D = [
        // common
        '你TM智障',

        // Microsoft
        '软狗', '废品wp'
    ];

    var click = function(el) {
        let etype = 'click';
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };

    var handleCommet = function(item) {
        let content = item.querySelector('.comment-html').innerHTML;
        for (var j = 0; j < D.length; j++) {
            if (content.indexOf(D[j]) >= 0) {
                console.log('cnbeta-blocker: disliked <' + content + '>')
                item.style.display = "none";
                let dlarray = item.querySelectorAll('.dislike');
                let di = dlarray[dlarray.length - 1];
                click(di);
                break;
            }
        }
    };

    window.addEventListener('DOMNodeInserted', function(e) {
        if (e.target.hasAttribute && e.target.hasAttribute('id') && e.target.id.startsWith('J_Comment_Item')) {
            handleCommet(e.target);
        }
    });
})();