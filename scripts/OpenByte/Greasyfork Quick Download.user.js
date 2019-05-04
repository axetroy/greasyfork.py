// ==UserScript==
// @name            Greasyfork Quick Download
// @namespace       openbyte/gfqd
// @author          OpenByte
// @description     Adds a download button on the scripts page of Greasyfork.
// @icon            https://i.imgur.com/DXkJd5f.png
// @require         https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @include         http*://greasyfork.org/*/users/*
// @include         http*://greasyfork.org/*/scripts*
// @include        	http*://*.greasyfork.org/*/users/*
// @include         http*://*.greasyfork.org/*/scripts*
// @run-at          document-end
// @license         MIT License
// @encoding        utf-8
// @version         1.2.0
// @grant           GM_addStyle
// @grant           GM.addStyle
// ==/UserScript==



(async () => {

    const list = document.querySelectorAll(".script-list li:not(.filtered)");

    let removeQuery = function (url) {
      	let i = url.indexOf("?");
        return i !== -1 ? url.substring(0, i) : url;
    };
    let removeLanguage = function (url) {
        let i = url.indexOf("greasyfork.org/");
        return url.substring(0, i + 15) + url.substring(url.indexOf("/", i + 16) + 1);
    };

    for (let e of list) {
        if (e.getElementsByClassName("some-container").length !== 0 || e.getAttribute("data-script-type") === "library")
            continue;
        let article = e.getElementsByTagName("article")[0];
        let head = article.getElementsByTagName("h2")[0];
        let link = head.getElementsByTagName("a")[0];
        head.outerHTML = `
                        <div class="some-container">
                                ${head.outerHTML}
                                <a href="${removeLanguage(removeQuery(link.href)) + "/code/" + encodeURIComponent(e.getAttribute("data-script-name")) + ".user.js"}">
                                    <img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQxLjcxMiA0MS43MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQxLjcxMiA0MS43MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBkPSJNMzEuNTg2LDIxLjhjMC40NDQtMC40NDQsMC40NDQtMS4xNDMsMC0xLjU4N2MtMC40MjktMC40NDQtMS4xNDMtMC40NDQtMS41NzEsMGwtOC4wNDcsOC4wMzJWMS43MDYgIGMwLTAuNjE5LTAuNDkyLTEuMTI3LTEuMTExLTEuMTI3Yy0wLjYxOSwwLTEuMTI3LDAuNTA4LTEuMTI3LDEuMTI3djI2LjUzOWwtOC4wMzEtOC4wMzJjLTAuNDQ0LTAuNDQ0LTEuMTU5LTAuNDQ0LTEuNTg3LDAgIGMtMC40NDQsMC40NDQtMC40NDQsMS4xNDMsMCwxLjU4N2w5Ljk1Miw5Ljk1MmMwLjQyOSwwLjQyOSwxLjE0MywwLjQyOSwxLjU4NywwTDMxLjU4NiwyMS44eiBNMzkuNDc0LDI5LjA4NiAgYzAtMC42MTksMC40OTItMS4xMTEsMS4xMTEtMS4xMTFjMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMXYxMC45MmMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDEuMTExICBDMC40OTIsNDEuMTMzLDAsNDAuNjI1LDAsNDAuMDA2di0xMC45MmMwLTAuNjE5LDAuNDkyLTEuMTExLDEuMTExLTEuMTExczEuMTI3LDAuNDkyLDEuMTI3LDEuMTExdjkuODA5aDM3LjIzNlYyOS4wODZ6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=' />
                                </a>
                        </div>`;
    }

    GM.addStyle(".some-container { display: flex; flex-direction: row; align-items: center; } .some-container a { margin-left: auto; } .some-container img { height: 40px; }}");

})();