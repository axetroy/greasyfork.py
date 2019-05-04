// ==UserScript==
// @name			Auto pagination
// @description		Automatically reaches for "next" page when the bottom of a given page has been reached (where applicable)
// @include			http://gamestorrent.co/page/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js
// @author			iceman94
// @copyright		2017+, iceman94
// @version			0.1
// @grant			none
// @namespace https://greasyfork.org/users/148290
// ==/UserScript==


//=======================================================================================================
// Cross-browsers load function
// Tests in this order :
// -support for jQuery API
// |-uses $(window).load method if available
// |-uses $(window).ready method if available
// -support for DOMContentLoaded event (compatible only with the following browsers :
// Chrome >= 0.2; Firefox >= 1.0; IE >= 9.0; Opera >= 9.0; Safari >= 3.1)
// -support for document.attachEvent
// -uses setTimeout w/ 5000ms delay
//=======================================================================================================

function XBLoad(func, verbose)
{
    verbose = verbose || false;

    if (window.jQuery)
    {
        if ($(window).load)
        {
            if (verbose == true) { console.log('Javascript loaded using $(window).load method'); };
            return $(window).load(function() { func(); });
        }
        else if ($(window).ready)
        {
            if (verbose == true) { console.log('Javascript loaded using $(window).ready method'); };
            return $(window).ready(function() { func(); });
        };        
    }
    else if (document.addEventListener)
    {
        if (verbose == true) { console.log('Javascript loaded using document.addEventListener method'); };
        document.addEventListener('DOMContentLoaded', function(event)
        {
            return func();
        });
    }
    else if (document.attachEvent)
    {
        if (verbose == true) { console.log('Javascript loaded using document.attachEvent method'); };
        document.attachEvent('load', function()
        {
            return func();
        });
    }
    else
    {
        if (verbose == true) { console.log('Javascript loaded using setTimeout method'); };
        return setTimeout(function() { func(); }, 5000);
    };
};


//=======================================================================================================
// Setting up functions
//=======================================================================================================

// Function to test if an URL is correctly formatted and reachable

function isUrl(url)
{
    if (window.XMLHttpRequest)
    {
        request = new XMLHttpRequest();
    }
    else
    {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    };

    try
    {
        request.open('GET', url, false);
        request.send();
        
        if (request.status !== 200) 
        {
            return false;
        };
    }
    catch(e)
    {
        return false;
    };

    return true;
};

// Detects which attribute work with the target browser
function testAttr()
{
	var method;
	
	if(document.body.scrollTop)
	{
		method = 'chrome';
	} else if(document.documentElement.scrollTop)
	{
		method = 'firefox';
	} else {
		method = 'unsupported';
	};
	
	return method;
};

// Retrieves top scroll position (i.e. 0 = top)
function getScrollPos()
{
	var scrollP;
	
	switch(testAttr())
	{
		case 'chrome':
			scrollP = document.body.scrollTop;
			break;
		case 'firefox':
			scrollP = document.documentElement.scrollTop;
			break;
		default:
			console.log('[getScrollPos] Only Firefox/Chrome based browsers are supported.');
	};
	
	return scrollP;
};

// Retrieves client (i.e. browser) height
function getWinHeight()
{
	var winH;
	
	switch(testAttr())
	{
		case 'chrome':
			winH = document.body.clientHeight;
			break;
		case 'firefox':
			winH = document.documentElement.clientHeight;
			break;
		default:
			console.log('[getWinHeight] Only Firefox/Chrome based browsers are supported.');
	};
	
	return winH;
};

// Retrieves page height
function getScrollHeight()
{
	var scrollH;
	
	switch(testAttr())
	{
		case 'chrome':
			scrollH = document.body.scrollHeight;
			break;
		case 'firefox':
			scrollH = document.documentElement.scrollHeight;
			break;
		default:
			console.log('[getScrollHeight] Only Firefox/Chrome based browsers are supported.');
	};
	
	return scrollH;
};

// Modify actual top scroll position to avoid triggering a script loop
function setScrollPos()
{
	switch(testAttr())
	{
		case 'chrome':
			document.body.scrollTop = document.body.scrollTop - ((document.body.scrollTop * 5) / 100) ;
			break;
		case 'firefox':
			document.documentElement.scrollTop = document.documentElement.scrollTop - ((document.documentElement.scrollTop * 5) / 100);
			break;
		default:
			console.log('[setScrollPos] Only Firefox/Chrome based browsers are supported.');
	};
};

// Tests if scroll position has reached the bottom of the page
function isBottomReached()
{
	var result;
	
	if(getScrollPos() + getWinHeight() == getScrollHeight())
	{
		//console.log('Bottom of the page reached!');
		result = true;
	} else {
		result = false;
	};

	return result;
};

// Returns position of "Next" button in page
function findNextPage()
{
	var elmtObj = new Object();
	
	//Is there an element w/ a ClassName called 'next'?
	if(document.getElementsByClassName('next')[0])
	{
		elmtObj.type = 'tag';
		elmtObj.content = document.getElementsByClassName('next')[0];
		//console.log('[findNextPage] ', document.getElementsByClassName('next')[0]);
		return elmtObj;
	};
	
	//Is there a tag w/ an attribute called 'next-page-url'?
	var coll = document.getElementsByTagName('div');
	var l = coll.length;
	for (var i=0; i<l; i++)
	{
		if(coll[i] && coll[i].getAttribute('next-page-url'))
		{
			elmtObj.type = 'uri';
			elmtObj.content = coll[i].getAttribute('next-page-url');
			//console.log('[findNextPage] ', coll[i].getAttribute('next-page-url'));
			return elmtObj;
		};
	};
	
	//Is there a page (i.e. URI) ending w/ a number that follows the actual one?	
	//TBD
};

// Fetches next page based on target's element: tag (anchor, div, img...), attribute (src, class...), URI...
function goNext(tgtArr)
{
	// WIP - May change to handle a wide variety of element
	var type = findNextPage().type || undefined;
	var content = findNextPage().content || undefined;
	
	window.onscroll = function()
	{
		if(isBottomReached() === true)
		{
			switch(type)
			{
				case 'tag':
					setScrollPos();
					content.click();
					break;
				case 'attribute':
					console.log('[goNext] "attribute" method not yet implemented.');
					break;	
				case 'uri':
					setScrollPos();
					window.location = content;
					break;
				default:
					console.log('[goNext] This type of element is actually not (yet?) managed by this script.');
			};
		} else {
			//Do nothing for now
		}
		
		return false;
	};
};


//=======================================================================================================
// Showtime !
//=======================================================================================================

XBLoad(goNext());
