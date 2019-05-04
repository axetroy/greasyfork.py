// ==UserScript==
// @name         TurkerHub FB ReShare
// @namespace    salembeats
// @version      1.4
// @description  FB Share for TH. "Proof of concept" stage - not robust, etc. Works with current MTS exports.
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @include      https://www.facebook.com/dialog/return/close#_=_
// @grant        none
// ==/UserScript==

const WORK_LOGO_URL = "https://www.mturk.com/media/intro/flow_worker.gif";

function getContainingArticleElementOfElement(element) {
    var currentElement = element;
    while(currentElement && currentElement.nodeName !== "ARTICLE") {
        currentElement = currentElement.parentElement;
    }
    return currentElement;
}

if(window.location.href === "https://www.facebook.com/dialog/return/close#_=_") {window.close();}

const URL_PARAM = "u=",
      IMAGE_PARAM = "picture=",
      TITLE_PARAM = "title=",
      QUOTE_PARAM = "quote=",
      DESC_PARAM = "description=",
      CAPTION_PARAM = "caption=",
      BASE_SHARE_TEMPLATE = `https://www.facebook.com/sharer/sharer.php?${URL_PARAM}&${IMAGE_PARAM}&${TITLE_PARAM}&${QUOTE_PARAM}&${DESC_PARAM}&${CAPTION_PARAM}`;

const allAcceptLinks = document.querySelectorAll("a[href*='/accept_random']");

for(let acceptLink of allAcceptLinks) {

    console.log(acceptLink);

    let workerAcceptURL = acceptLink.href;

    let hitTitle = (getContainingArticleElementOfElement(acceptLink).innerText.match(/Title:(.*?)(?:[|]|\n)/) || ["",""])[1].trim();
    if(hitTitle === "") {continue;}
    let moneyMatches = getContainingArticleElementOfElement(acceptLink).innerText.match(/\d{1,2}\.\d{1,2}/g);
    let hitHourly = moneyMatches[0].trim();
    let hitValue = moneyMatches[moneyMatches.length-1].trim();
    let hitRequester = getContainingArticleElementOfElement(acceptLink).innerText.match(/Requester:([^\]]+\])/)[1].trim();
    let hitGID = workerAcceptURL.match(/projects\/([^/]+)\//)[1];

    let hitInfo = `HIT TITLE: ${hitTitle}, REPORTED HOURLY: $${hitHourly}, HIT VALUE: $${hitValue}, REQUESTER: ${hitRequester}, GID: [${hitGID}]`;

    var proxyURL = `https://vast-citadel-78138.herokuapp.com/${encodeURIComponent(hitTitle)}/${encodeURIComponent(hitInfo)}/${encodeURIComponent(WORK_LOGO_URL)}?url=${encodeURIComponent(workerAcceptURL)}`;

    let shareURL = BASE_SHARE_TEMPLATE
    .replace( URL_PARAM,  URL_PARAM + encodeURIComponent( proxyURL ) )
    .replace( QUOTE_PARAM, QUOTE_PARAM + encodeURIComponent( hitInfo ) );

    acceptLink.insertAdjacentHTML("afterend", `
| <a class='post-hit-to-fb' href='${shareURL}'>Share to FB</a>
`);
}

document.querySelectorAll("a.post-hit-to-fb").forEach(fbPostLink => {
    fbPostLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.open(event.target.href);
    });
});