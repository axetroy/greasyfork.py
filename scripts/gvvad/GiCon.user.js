// ==UserScript==
// @name           GiCon
// @version        0.1.5
// @description    Add favicon`s on google search page.
// @description:ru Добавляет иконки сайтов в поисковый ответ.
// @author         gvvad
// @run-at         document-start
// @include        http*://google.*/*
// @include        http*://www.google.*/*
// @include        http*://google.*.*/*
// @include        http*://www.google.*.*/*
// @noframes
// @grant          none
// @license        GPL-3.0-only; http://www.gnu.org/licenses/gpl-3.0.txt
// @namespace      https://greasyfork.org/users/100160
// ==/UserScript==

(function() {
    'use strict';

    //custom css rule for icon
    try {
        let styl = document.createElement("style");
        document.head.append(styl);
        styl.sheet.insertRule(".gicofav{position:absolute; top:0.2em; left:-1.8em;}");
    } catch(e) {
        console.error("GiCon:css rule error!");
        return;
    }

    //shedule on page load event
    document.documentElement.addEventListener("load", function() {
        try {
            let lst = document.querySelectorAll("#rcnt .g") || [];
            if (!lst.length) return;

            let reg = /:\/\/(.+?)(?:\/|$)/;

            let nimg = document.createElement("img");
            nimg.classList.add("gicofav");

            for (let item of lst) {
                try {
                    if (item.querySelector(".gicofav")) {
                        continue;
                    }
                    let rc = item.querySelector(".rc");
                    if (!rc) continue;

                    let nhref = reg.exec(item.querySelector(".r a").href)[1];
                    nimg.setAttribute("src", "http://www.google.com/s2/favicons?domain=" + nhref);

                    rc.insertBefore(nimg, rc.childNodes[0]);
                } catch(e) {
                    continue;
                }
            }
        } catch(e) {
            console.error("GiCon:unexpected error!");
        }
    }, true);
})();