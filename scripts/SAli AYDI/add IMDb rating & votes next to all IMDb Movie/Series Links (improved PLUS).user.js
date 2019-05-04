// ==UserScript==
// @name         add IMDb rating & votes next to all IMDb Movie/Series Links (improved PLUS)
// @description  Adds movie ratings and number of voters to any imdb link on any webpage. Modified version of http://userscripts.org/scripts/show/96884
// @author         Stealed and modified from [StackOverflow community (especially Brock Adams)]
// @version        2017-02-26
// @include        *
// @grant        GM_xmlhttpRequest
// @namespace    Extra2016     
// ==/UserScript==


var maxLinksAtATime     = 100; //-- pages can have 100's of links to fetch. Don't spam server or browser.
var fetchedLinkCnt      = 0;

function processIMDB_Links () {
    //--- Get only links that could be to IMBD movie/TV pages.
    var linksToIMBD_Shows   = document.querySelectorAll ("a[href*='/title/']");

    for (var J = 0, L = linksToIMBD_Shows.length;  J < L;  J++) {
        var currentLink = linksToIMBD_Shows[J];

        /*--- Strict tests for the correct IMDB link to keep from spamming the page
            with erroneous results.
        */
        if (    ! /^(?:www\.)?IMDB\.com$/i.test (currentLink.hostname)
            ||  ! /^\/title\/tt\d+\/?$/i.test (currentLink.pathname)
        )
            continue;

        if (! currentLink.getAttribute ("data-gm-fetched") ){
            if (fetchedLinkCnt >= maxLinksAtATime){
                //--- Position the "continue" button.
                continueBttn.style.display = 'inline';
                currentLink.parentNode.insertBefore (continueBttn, currentLink);
                break;
            }

            fetchTargetLink (currentLink); //-- AJAX-in the ratings for a given link.

            //---Mark the link with a data attribute, so we know it's been fetched.
            currentLink.setAttribute ("data-gm-fetched", "true");
            fetchedLinkCnt++;
        }
    }
}

function fetchTargetLink (linkNode) {
    //--- This function provides a closure so that the callbacks can work correctly.

    /*--- Must either call AJAX in a closure or pass a context.
        But Tampermonkey does not implement context correctly!
        (Tries to JSON serialize a DOM node.)
    */
    GM_xmlhttpRequest ( {
        method:     'get',
        url:        linkNode.href,
        //context:    linkNode,
        onload:     function (response) {
            prependIMDB_Rating (response, linkNode);
        },
        
        onabort:     function (response) {
            prependIMDB_Rating (response, linkNode);
        }
    } );
}

function prependIMDB_Rating (resp, targetLink) {
    var isError     = true;
    var ratingTxt   = "** Unknown Error!";

    if (resp.status != 200  &&  resp.status != 304) {
        ratingTxt   = '** ' + resp.status + ' Error!';
    }
    else {
        var ratingM = resp.responseText.match (/itemprop\=\"ratingValue\"\>(.*)\<\/span\>\<\/strong\>/);
        var votesM  = resp.responseText.match (/itemprop\=\"ratingCount\"\>(.*)\<\/span\>/);

      //  if (/\(awaiting \d+ votes\)|\(voting begins after release\)/i.test (resp.responseText) ) {
        if (/\(awaiting \d+ votes\)|\(voting begins after release\)|in development,/i.test (resp.responseText) ) {
            
                ratingTxt   = "NR";
                isError     = false;
                colnumber = 0;
        } else {
           if (ratingM  &&  ratingM.length > 1  &&  votesM  &&  votesM.length > 1) {
            isError     = false;
            
           justrate = ratingM[1];
               //.substr(0, ratingM[1].indexOf("/"));
           // ratingTxt   = ratingM[1] + " - " + votesM[1];
           ratingTxt   = justrate + " - " + votesM[1];
           colnumber = Math.round(justrate);
           }
        }
    }

    
    
    
    
    color = ["#Faa", "#Faa","#Faa", "#Faa","#Faa", "#F88","#Faa", "#ff7","#7e7", "#5e5", "#0e0", "#ddd"]
    var resltSpan       = document.createElement ("span");
    resltSpan.innerHTML = '<b><font style="border-radius: 5px;padding: 1px;border: #575757 solid 1px; background-color:' + color[colnumber] + ';">' + ' [' + ratingTxt + '] </font></b>&nbsp;';
    // resltSpan.innerHTML = '<b><font style="background-color:' + justrate + '">' + ' [' + ratingTxt + '] </font></b>&nbsp;';


    if (isError)
        resltSpan.style.color = 'red';

    //var targetLink      = resp.context;
    //console.log ("targetLink: ", targetLink);

    targetLink.parentNode.insertBefore (resltSpan, targetLink);
}

//--- Create the continue button
var continueBttn        = document.createElement ("button");
continueBttn.innerHTML  = "Get ratings";

continueBttn.addEventListener ("click", function (){
        fetchedLinkCnt              = 0;
        continueBttn.style.display  = 'none';
        processIMDB_Links ();
    },
    false
);

processIMDB_Links ();