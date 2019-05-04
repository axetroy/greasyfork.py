// ==UserScript==
// @name         一亩三分地 Filter revised version
// @namespace    http://tampermonkey.net/
// @version      0.0
// @description  This is a revised version of the original filter linked as follows.
//               original link: http://www.1point3acres.com/bbs/forum.php?mod=viewthread&tid=446715&extra=page%3D3%26filter%3Dauthor%26orderby%3Ddateline%26sortid%3D311%26sortid%3D311%26orderby%3Ddateline
// @author       You
// @match        http://www.1point3acres.com/bbs/forum.*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var table = document.getElementById("threadlisttableid");
    // console.log(table.rows.length);    // debug

    for (var i = table.rows.length - 1; i > 0; i--) {
        var text = table.rows[i].innerHTML.toString();
        if (text.includes('在线笔试')){
            table.rows[i].remove();
            continue;
        }

    }
})();