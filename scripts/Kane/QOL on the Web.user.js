// ==UserScript==
// @name        QOL on the Web
// @namespace   Pogmog
// @description Just some general quality of (my) life changes. Reddit: disable pinned top-bar. YouTube: disable end cards, enfoce theatre-mode. Facebook: enforce most-recent. Duckduckgo: soften the ads.
// @version     1.51
// @include     https://old.reddit.com/r/*
// @include     https://www.reddit.com/*
// @include     https://www.youtube.com/*
// @include     https://www.facebook.com/*
// @include     https://duckduckgo.com/?q=*
// @grant       none
// ==/UserScript==

// Options
var reddit_switch_to_old = true;
var reddit_disable_pinned = true;
var youtube_always_theatre = true;
var youtube_disable_endcards = true;
var facebook_force_recent = true;
var duckduckgo_ad_soften = true;

var urlCheck = document.URL;

if (urlCheck.includes("reddit.com/"))
{
  if (urlCheck.includes("old.reddit.com/r/"))
	{
    if (reddit_disable_pinned)
    {
      // Reddit: hide the PINNED thing that pops up when you scroll down.
      var sheet = document.createElement('style')
      sheet.innerHTML = ".pinnable-placeholder .pinned {display: none;}";
      document.body.appendChild(sheet);
    }
  }
  else if (urlCheck.includes("www.reddit.com/"))
	{
  		if (reddit_switch_to_old)
      {
        	var new_url = urlCheck.replace("www.reddit.com", "old.reddit.com");
        	window.location.href = new_url;
      }
  }
}
else if (urlCheck.includes("duckduckgo.com"))
{
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '#ads {border: solid darkcyan 2px;opacity: 0.5;border-radius: 10px;}';
  document.getElementsByTagName('head')[0].appendChild(style);
}
else if (urlCheck.includes("youtube.com/watch"))
{
  if (youtube_disable_endcards)
  {
    // Get rid of YouTube's annoying ENDCARDS
    var sheet = document.createElement('style')
    sheet.innerHTML = ".ytp-ce-element {display: none;}";
    document.body.appendChild(sheet);
  }
  if (youtube_always_theatre)
  {
    // This code was lifted from r-a-y, namespace: "r-a-y/youtube/theater"
    window.addEventListener("yt-navigate-finish", function(event) {
        var newPlayer = document.querySelector('button.ytp-size-button');
        if ( newPlayer && null === document.querySelector('ytd-watch').getAttribute('theater') ) {
          newPlayer.click();
        }
      });
  } 
}
else if (urlCheck.includes("facebook.com"))
{
  if (facebook_force_recent)
  {
    // Check the main URL is the most recent
    if (urlCheck == "https://www.facebook.com/") window.location.href = "https://www.facebook.com/?sk=h_chr";
    
    // Change all FB links to be the most_recent type.
    var fb_links = document.links; 
    for (var i=0; i<fb_links.length; i++)
    {
      //Set up link to variable
      var p = fb_links[i].href;
      //If link is the raw FB link, replace.
      if(p == "https://www.facebook.com/" || p == "https://www.facebook.com/?ref=tn_tnmn" || p == "https://www.facebook.com/?ref=logo") 
      {
        //Change to "most recent".
        fb_links[i].href = "https://www.facebook.com/?sk=h_chr";
      }
    }
  }
}