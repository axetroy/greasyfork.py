// ==UserScript==
// @name           Pixiv Direct Links
// @namespace      https://greasyfork.org/scripts/4555
// @description    Turns thumbnail titles into direct or mode=manga links, adds direct image links on mode=manga pages, and disables lazy-loading on manga images.
// @include        *://www.pixiv.net/*
// @grant          none
// @version        2018.06.03
// ==/UserScript==

//Turn thumbnail titles into direct links (single images) or mode=manga links.  Some kinds of thumbnails aren't covered, and an isolated few (like #17099702) don't work.
var directTitles = false;

//Append direct links below images on mode=manga pages
var directManga = true;

//Force pixiv's 'book view' style for manga sequences to something like the normal view.  Clicking a page won't scroll the window to the next page.
var breakBookView = false;

//Disable lazy loading images.  These appear on mode=manga pages, rankings, and the "Recommended" section of the bookmarks page.
var dontSayLazy = true;

//----------------------------------------------------------------//

if( typeof(custom) != "undefined" )
	custom();

if( location.search.indexOf("mode=manga_big") > 0 || location.search.indexOf("mode=big") > 0 )
{
	//Make the 'big'/'manga_big' image link to itself instead of closing the window
	let image = document.getElementsByTagName("img")[0];
	if( image )
	{
		let link = document.createElement("a");
		link.href = image.src;
		link.appendChild( document.createElement("img") ).src = image.src;
		document.body.innerHTML = "";
		document.body.appendChild( link );
	}
}
else if( location.search.indexOf("mode=manga") > 0 )
{
	let container = document.getElementsByClassName("full-size-container");
	if( directManga && container.length )
	{
		//Check the mode=manga_big page for the first page, since the sample extension is always "jpg".
		let req = new XMLHttpRequest();
		req.open( "GET", location.href.replace(/page=\d+&?/,'').replace('mode=manga','mode=manga_big&page=0'), true );
		req.onload = function()
		{
			let firstImage = req.responseXML.querySelector("img[src*='_p0.']").src;
			for( let i = 0; i < container.length; i++ )
			{
				//Add direct link below each page
				let link = document.createElement("a");
				link.textContent = "direct link";
				link.style.display = "block";
				link.href = firstImage.replace( "_p0.", "_p"+i+"." );
				container[i].parentNode.appendChild( link );
			}
		};
		req.responseType = "document";
		req.send(null);
	}
	else if( breakBookView && document.head.innerHTML.indexOf("pixiv.context.images") > 0 )
	{
		//Book view (e.g. #54139174, #57045668)

		let mangaSection = document.createElement("section");
		mangaSection.className = "manga";
		
		let scripts = document.head.getElementsByTagName("script");
		let hits = 0;
		for( let i = 0; i < scripts.length; i++ )
		{
			let urls = scripts[i].innerHTML.match( /pixiv.context.images[^"]+"([^"]+)".*pixiv.context.originalImages[^"]+"([^"]+)"/ );
			if( urls )
			{
				let full = urls[2].replace( /\\\//g, "/");
				mangaSection.innerHTML += '<div class="item-container"><a href="'+full+'" class="full-size-container"><i class="_icon-20 _icon-full-size"></i></a><img style="width:auto;height:auto;max-width:1200px;max-height:1200px" src="'+full+'" class="image">'+( directManga ? '<a href="'+full+'" style="display:block">direct link</a>' : '' )+'</div>';
				hits++;
			}
		}
		
		if( hits > 0 )
		{
			let sheet = document.createElement("link");
			sheet.setAttribute("rel","stylesheet");
			sheet.setAttribute("href","https://source.pixiv.net/www/css/member_illust_manga.css");
			document.head.appendChild( sheet );
			document.getElementsByTagName("html")[0].className = "verticaltext no-textcombine no-ie";
			document.body.innerHTML = "";
			document.body.appendChild( mangaSection );
		}
	}
}
else if( window == window.top )//not inside iframe
{
	if( directTitles )
	{
		//Link dem titles.
		linkThumbTitles(document);
		new MutationObserver( function(mutationSet)
		{
			mutationSet.forEach( function(mutation)
            {
                for( let i = 0; i < mutation.addedNodes.length; i++ )
                    if( mutation.addedNodes[i].nodeType == Node.ELEMENT_NODE )
                        linkThumbTitles( mutation.addedNodes[i] );
            } );
		}).observe( document.body, { childList:true, subtree:true } );
	}
	
    //Open in same window
    setTimeout( function()
    {
        let medLink = document.querySelector('div[role="presentation"] a');
        if( medLink )
            medLink.removeAttribute("target");
    }, 500 );
}

if( dontSayLazy && unlazyImage() && window == window.top )
{
	//Initial page has lazy images; listen for more images added later
	new MutationObserver( function(mutationSet)
	{
		mutationSet.forEach( function(mutation)
		{
			for( let i = 0; i < mutation.addedNodes; i++ )
                if( mutation.addedNodes[i].nodeType == Node.ELEMENT_NODE )
                    unlazyImage( mutation.addedNodes[i] );
		} );
	}).observe( document.body, { childList:true, subtree:true } );
}

//----------------------------------------------------------------//

function unlazyImage(target)
{
	let images = ( target || document ).querySelectorAll("img[data-src]");
	for( let i = 0; i < images.length; i++ )
		images[i].src = images[i].getAttribute("data-src");
    //console.debug('PDL - Found '+images.length+' lazy links');
	return images.length;
}

function linkThumbTitles(target)
{
    //search.php
    let foundTitle = target.querySelectorAll("a[href*='mode=medium'][href*='illust_id='][title]");
    for( let j = 0; j < foundTitle.length; j++ )
        directLinkSingle( foundTitle[j] );

    //bookmark.php, member_illust.php, new_illust.php, member.php (uploads), mypage.php (new works)
    foundTitle = target.querySelectorAll("a[href*='mode=medium'][href*='illust_id='] > .title");
    for( let j = 0; j < foundTitle.length; j++ )
        directLinkSingle( foundTitle[j].parentNode );

    //ranking.php
    foundTitle = target.querySelectorAll(".ranking-item a.title[href*='mode=medium'][href*='illust_id=']");
    for( let j = 0; j < foundTitle.length; j++ )
        directLinkSingle( foundTitle[j] );

    //member_illust.php (what image was responding to)
    foundTitle = target.querySelector(".worksImageresponseInfo a.response-out-work[href*='mode=medium'][href*='illust_id=']");
    if( foundTitle )
        directLinkSingle( foundTitle );

    //response.php, member_illust.php (before/after thumbnails), ?member.php (bookmarks)?
    let image = target.querySelectorAll("li a[href*='mode=medium'][href*='illust_id='] img");
    for( let j = 0; j < image.length; j++ )
    {
        let page, title;
        for( page = image[j].parentNode; page.tagName != "A"; page = page.parentNode );

        //The prev/next thumbnails on mode=medium pages have text before/after the image.  Text also follows the image on image responses listings.
        if( !(title = page.getElementsByClassName("title")[0]) && (title = page.lastChild).nodeName != '#text' && (title = page.firstChild).nodeName != '#text' )
            continue;//Can't find title element

        //Start title link at mode=medium and change later.
        let titleLink = document.createElement("a");
        titleLink.href = page.href;
        titleLink.style.color = "#333333";//Style used on some pages

        //Move the title out of the thumbnail link
        page.removeChild(title);
        titleLink.appendChild(title);
        page.parentNode.insertBefore( titleLink, page.nextSibling );

        directLinkSingle( titleLink );
    }
}

//Query an image's mode=medium page.
function directLinkSingle(titleLink)
{
	let illustID;
	if( !titleLink || !titleLink.href || !(illustID = titleLink.href.match(/illust_id=(\d+)/)) )
		return;

	let req = new XMLHttpRequest();
	req.open( "GET", location.protocol+"//www.pixiv.net/member_illust.php?mode=medium&illust_id="+illustID[1], true );
	req.onload = function()
	{
        let scripts = req.responseXML.head.getElementsByTagName("script");
        for( let i = 0; i < scripts.length; i++ )
        {
            //JSON requires double quotes around property names, forbids trailing commas, etc...  The illust info can't be simply parsed as a raw JSON object, so just grab the values we need.
            let originalURL = scripts[i].textContent.match(/"original":"(http[^"]+)"/);
            if( originalURL )
            {
                originalURL = originalURL[1].replace(/\\\//g,'/');
                
                //Do nothing for ugoira (animated) images
                if( originalURL.indexOf("ugoira") > 0 )
                    return;
                
                //There are several pageCount properties; we just want the last one.
                let pageCount = 0, rCount = RegExp( '"pageCount": *(\\d+)', 'g' ), search;
                while( (search = rCount.exec( scripts[i].textContent )) !== null )
                    pageCount = parseInt(search[1]);
                
                if( pageCount <= 1 )
                    titleLink.href = originalURL;
                else
                {
                    titleLink.href = "/member_illust.php?mode=manga&illust_id="+illustID[1];
                    
                    //Add title text with number of pages
                    pageCount = " ("+pageCount+" pages)";
                    if( titleLink.firstChild.nodeName == '#text' )
                        titleLink.title = pageCount;
                    else
                        titleLink.firstChild.title += pageCount;
                }
                return;
            }
        }
        console.log("Unable to find direct image link for illust #"+illustID[1]);
	};
	req.responseType = "document";
	req.send(null);
}
