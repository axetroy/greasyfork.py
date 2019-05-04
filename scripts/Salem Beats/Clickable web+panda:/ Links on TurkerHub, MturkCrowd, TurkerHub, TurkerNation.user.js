// ==UserScript==
// @name         Clickable web+panda:// Links on TurkerHub, MturkCrowd, TurkerHub, TurkerNation
// @namespace    salembeats
// @version      8.2
// @description  Adds clickable web+panda:// links to TurkerHub with relevant meta information attached. Latest update: Style updates.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @include      https://www.mturkcrowd.com/threads/*
// @include      https://www.mturkcrowd.com/threads/*/*
// @include      http://mturkforum.com/index.php?threads/*
// @include      http://turkernation.com/showthread.php?*
// @grant        unsafeWindow
// @require      https://greasyfork.org/scripts/37451-mturkexportparser/code/MturkExportParser.js?version=244583
// ==/UserScript==

const SHOULD_ADD_PARSER_DEBUG_INFO = false;

const WEB_PANDA_WINDOW_WIDTH  = 520;
const WEB_PANDA_WINDOW_HEIGHT = 350;

if(!String.prototype.titleCaseSingleWord) {
    String.prototype.titleCaseSingleWord = function() {
        return this[0].toUpperCase() + this.substr(1, this.length-1);
    };
}

document.body.insertAdjacentHTML("afterbegin", `
<style>
.mep-title {
font-weight: bold;
}
.mep-results {
}
.found-hit {
font-size: 2.0em;
font-weight: bold;
}
.export-type {
font-size: 2.0em;
}
.web-panda {
font-size: 2.0em;
}
.hit-parser-debug-info {
${(SHOULD_ADD_PARSER_DEBUG_INFO ? "" : "display: none;")}
}
.batch-or-survey {
font-size: 1.5em;
color: black;
}
.displayed-hit-title {
font-size: 1.5em;
font-style: italic;
color: black;
}
.displayed-hit-value {
font-size: 1.5em;
font-style: italic;
color: green;
}
.scraper-metadata-block {
border: 2px dashed green;
background: #98FB98;
padding: 10px;
}
</style>
`);

function appendResults(post, results, type) {

	function add(value, query) {
		if(Boolean(value)) {
			return `${query}=${encodeURIComponent(value)}&`;
		}
		else {return "";}
	}

	function trimTrailingBlankArgument(url) {

		if(url.endsWith("&") || url.endsWith("?") || url.endsWith("=") || url.endsWith("#") ) {
			return url.substr(0, url.length-1);
		}
		else if(url.endsWith(encodeURIComponent("&"))||
				url.endsWith(encodeURIComponent("?")) ||
			    url.endsWith(encodeURIComponent("="))||
			    url.endsWith(encodeURIComponent("#"))) {
				return url.substr(0, url.length - 3);
		}
		else {
			return url;
		}
	}

	let threadBaseURL = window.location.href.match(/[^#]+/)[0];
	let postID = post.id;
	let fullLinkToPost = threadBaseURL + "#" + postID;

	let postHTML = post.innerHTML;
	let postText = post.innerText;

	let webPandaLink = `web+panda://${results.gid}?`;

	let resultsKeys = Object.keys(results);
	for(let resultKey of resultsKeys) {
		if(resultKey === "hitValue") {
			webPandaLink += add((results.hitValue || {toLocaleString: ()=>{return undefined;}}).toLocaleString("US", {minimumFractionDigits: 2}), "hitValue");
		}
		else {
			// GID is already the leading data, contextHTML tends to make the URL parameters string too long.
			if(resultKey !== "gid" && resultKey !== "contextHTML" && resultKey !== "contextURL") {
				webPandaLink += add(results[resultKey], resultKey);
			}
		}
	}

    let xfPermalink;
    let allPostLinks = post.querySelectorAll("a");

    for(let postLink of allPostLinks) {
        if(postLink.href && postLink.href.match(/posts\/\d+\/$/)) {
            xfPermalink = postLink.href;
            break;
        }
    }

    webPandaLink += "contextURL=" + encodeURIComponent(( xfPermalink ? xfPermalink : fullLinkToPost));
	webPandaLink = trimTrailingBlankArgument(webPandaLink);

	post.insertAdjacentHTML("beforeend", `
<div class="scraper-metadata-block">
<div class="hit-parser-debug-info" style="text-align: center;">
<span class="found-hit">Found HIT</span> <span class="export-type">(Export Type: ${type})</span>:
</div>
<div style="text-align: center;">
<div class="hit-parser-debug-info">
<span class="mep-title">gid:</span> <span class="mep-results">${results.gid}</span>
<span class="mep-title">rid:</span> <span class="mep-results">${results.rid}</span>
</div>
<div class="hit-parser-debug-info">
<span class="mep-title">hitTitle:</span> <span class="mep-results">${results.hitTitle}</span>
<span class="mep-title">requesterName:</span> <span class="mep-results">${results.requesterName}</span>
<span class="mep-title">hitValue:</span> <span class="mep-results">$${(results.hitValue || {toLocaleString: ()=>{}}).toLocaleString("US", {minimumFractionDigits: 2})}</span>
</div>
<div>
<span class="batch-or-survey">${( results.batchOrSurvey ? `${results.batchOrSurvey.titleCaseSingleWord()}:` : "" )}</span> <span class="displayed-hit-title">${results.hitTitle} (<span class="displayed-hit-value">$${results.hitValue ? results.hitValue.toLocaleString("US", {minimumFractionDigits: 2}) : ""}</span>)</span>
</div>
<div>
<a class="web-panda" href="${webPandaLink}" data-url="${webPandaLink}">web+panda://${results.gid}</a>
</div>
</div>
</div>
`);
}

function processPost(post) {

	let parser = new MturkExportParser(post);

	if( parser.containsValidExport() ) {

		let results = parser.getAllResults();

		appendResults(post, results, parser.getExportType());
	}

}

let allPosts = document.querySelectorAll("li[id^='post-'],div[id^=post_message_]");


allPosts.forEach( post => {

	processPost(post);

});

document.body.addEventListener("click", e => {

	if(e.target.nodeName && e.target.nodeName.toLowerCase() === "a") {
		if(e.target.classList && e.target.classList.contains("web-panda")) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
			let url = e.target.dataset.url;
			window.open(url, null, `left=1,top=1,width=${WEB_PANDA_WINDOW_WIDTH},height=${WEB_PANDA_WINDOW_HEIGHT}`);
		}
	}
});

let mutationObserver = new MutationObserver(function observe(mutations) {
	for(let mutation of mutations) {
		if(mutation.addedNodes.length > 0) {
			let addedNode = mutation.addedNodes[0];
			if(addedNode.nodeName === "LI" && addedNode.classList.contains("message")) {
				processPost(addedNode);
			}
		}
	}
});

mutationObserver.observe(document.body, {childList: true, subtree: true});

// if(unsafeWindow) {unsafeWindow.TestMturkExportParser = MturkExportParser;}