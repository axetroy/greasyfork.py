// ==UserScript==
// @name         Troubleshoot Qualtrics Links in HITs
// @namespace    salembeats
// @version      1.4
// @description  Latest update: Less verbose when no issues detected. Less extra targeting.
// @author       Cuyler Stuwe (salembeats)
// @include      *
// @grant        none
// @run-at       document-start
// ==/UserScript==

if(window === window.top) {return;}
if(!document.referrer.includes("worker.mturk.com/projects/")) {return;}
if(!document.referrer.includes("tasks")) {return;}

function isQualtricsLink(link) {
	return ( link.innerText.toLowerCase().includes("qualtrics") ||
			link.href.toLowerCase().includes("qualtrics") );
}

function appendTroubleshootingButtonsToQualtricsLink(link) {

	let displayedURL;
	try {
		displayedURL = new URL(link.innerText.toLowerCase().trim().replace(/$www\./, "http://www."));
	} catch(err) {}

	let hrefURL;
	try {
		hrefURL = new URL(link.href);
	} catch(err) {}

	let urlWithRepairedArugments;

	let isHrefURLMalformed = !Boolean(hrefURL);
	let isHrefAmpBeforeQuestion = Boolean( link.href.match(/&.*\?/) );
	let isHrefAmpPresentWithoutQuestion = ( link.href.includes("&") && !link.href.includes("?") );
	let isLinkedURLDifferentFromDisplayedURL = (Boolean(displayedURL) && Boolean(hrefURL) && (displayedURL.href.toLowerCase() !== hrefURL.href.toLowerCase()));

	let hasMalformedGETParameters = isHrefAmpBeforeQuestion || isHrefAmpPresentWithoutQuestion;

	let areIssuesDetected = isHrefURLMalformed || hasMalformedGETParameters || isLinkedURLDifferentFromDisplayedURL;

	if(hasMalformedGETParameters) {

		if(isHrefAmpPresentWithoutQuestion) {
			urlWithRepairedArguments = link.href.replace("&", "?");
		}
		else if(isHrefAmpBeforeQuestion) {
			let ampIndex      = link.href.indexOf("&");
			let questionIndex = link.href.indexOf("?");
			urlWithRepairedArguments[ampIndex]      = "?";
			urlWithRepairedArguments[questionIndex] = "&";
		}
		else if(isHrefURLMalformed) {
			urlWithRepairedArguments = `javascript:void(0)`;
		}
	}

	link.insertAdjacentHTML("afterend", `

        <style>
            .qualtrics-troubleshooting-container.problem {
                background: pink;
            }

            .qualtrics-troubleshooting-container.no-problem {
                background: palegreen;
                user-select: none;
            }
        </style>

        <span class="qualtrics-troubleshooting-container ${areIssuesDetected ? "problem" : "no-problem"}">
        <span>Troubleshooting: </span>
        ${areIssuesDetected ? "" : `<span>✓</span>`}
        ${isLinkedURLDifferentFromDisplayedURL ? `<a class="qualtrics-troubleshooting-link" href="${displayedURL.href}">Try Displayed URL</a>` : ""}
        ${hasMalformedGETParameters ? `<a class="qualtrics-troubleshooting-link" href="${urlWithRepairedArguments}">Fix Malformed GET Parameters</a>` : ""}
        ${isHrefURLMalformed ? `<span>URL appears to be totally invalid and beyond simple repair. Please inspect manually.</span>` : ""}
        </span>
    `);
}

let qualtricsLinks;

let frameObserver = new MutationObserver(mutations => {

	for(let mutation of mutations) {
		for(let addedNode of mutation.addedNodes) {
			if(addedNode.tagName &&
			   addedNode.tagName.toLowerCase() === "a" &&
			   isQualtricsLink(addedNode)) {
                appendTroubleshootingButtonsToQualtricsLink(addedNode);
				if(!qualtricsLinks.includes(addedNode)) {
					qualtricsLinks.push(addedNode);
				}
			}
		}
	}

});

function main() {

	let initialPageLinks = document.querySelectorAll("a");

	qualtricsLinks = Array.from(initialPageLinks).filter( isQualtricsLink );

	for(let qualtricsLink of qualtricsLinks) {
		appendTroubleshootingButtonsToQualtricsLink(qualtricsLink);
	}

	frameObserver.observe(document, {childList: true, subtree: true});
}

main();