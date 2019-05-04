// ==UserScript==
// @author      One Shade
// @name        Anime Website Buttons
// @namespace   http://lifenanime.blogspot.ca/
// @include     http://www.anime-planet.com/anime/*
// @include     http://myanimelist.net/anime/*
// @exclude     http://www.anime-planet.com/anime/
// @exclude     http://www.anime-planet.com/anime/all?name=*
// @exclude     http://www.anime-planet.com/anime/recommendations/*
// @description It's a script for the Anime Planet and MAL that adds buttons to search between sites and look for pictures of the anime.
// @version     1.02
// @grant       none
// ==/UserScript==

function findFirstDescendant(parent, tagname)
{
   parent = document.getElementById(parent);
   var descendants = parent.getElementsByTagName(tagname);
   if ( descendants.length )
      return descendants[0];
   return null;
}
function findAllDescendantsTag(target, parent, tagname)
{
  ancestor = target.getElementById(parent);
  var descendants = ancestor.getElementsByTagName(tagname);
  if (descendants.length)
  return descendants;
  return null;
}

//Find h1
if (document.location.host == "www.anime-planet.com")
   {
     var header = findAllDescendantsTag(document, "siteContainer", "h1");
   }
else if (document.location.host == "myanimelist.net")
   {
     var header = findAllDescendantsTag(document, "contentWrapper", "h1"); 
   }

//Cut anime name
if (document.location.host == "www.anime-planet.com")
   {
      var animeName = header[0].innerHTML;
   }
else if (document.location.host == "myanimelist.net")
   {
      var animeName = header[0].textContent;
   }

//Set buttons with information
//MAL Button
var bMali=document.createElement("img");
bMali.src='http://myanimelist.net/favicon.ico';
bMali.setAttribute("style", "width:16px;height:16px;margin-right:2px;");
var bMal=document.createElement("a");
bMal.href='http://myanimelist.net/anime.php?q='+animeName;
bMal.target="_blank";
bMal.title="MyAnimeList";
bMal.appendChild(bMali);

//Anime-Planet Button
var bAPi=document.createElement("img");
bAPi.src='http://www.anime-planet.com/favicon.ico';
bAPi.setAttribute("style", "width:16px;height:16px;margin-right:2px;");
var bAP=document.createElement("a");
bAP.href='http://www.anime-planet.com/anime/all?name='+animeName;
bAP.target="_blank";
bAP.title="Anime-Planet";
bAP.appendChild(bAPi);

//YouTube Button
var bYti=document.createElement("img");
bYti.src='http://icons.iconarchive.com/icons/dakirby309/windows-8-metro/16/Web-Youtube-alt-2-Metro-icon.png';
//bYti.src='http://www.google.com/s2/favicons?domain=https://www.youtube.com/';
bYti.setAttribute("style", "width:16px;height:16px;margin-right:2px;");
var bYt=document.createElement("a");
bYt.href='https://www.youtube.com/results?search_query='+animeName+" trailer";
bYt.target="_blank";
bYt.title="YouTube Trailer";
bYt.appendChild(bYti);

//Torrent Search button
var bTSi=document.createElement("img");
bTSi.src='http://icons.iconarchive.com/icons/dakirby309/windows-8-metro/16/Folders-OS-Downloads-Library-Metro-icon.png';
//bTSi.src='http://www.google.com/s2/favicons?domain=http://www.bittorrent.com/';
bTSi.setAttribute("style", "width:16px;height:16px;margin-right:2px;");
var bTS=document.createElement("a");
bTS.href='https://www.google.ca/search?q='+animeName+" torrent";
bTS.target="_blank";
bTS.title="Search Torrent";
bTS.appendChild(bTSi);

//Google Images button
var bGIi=document.createElement("img");
bGIi.src='http://icons.iconarchive.com/icons/danleech/simple/16/google-icon.png';
//bGIi.src='http://www.google.com/s2/favicons?domain=http://www.google.com/';
bGIi.setAttribute("style", "width:16px;height:16px;margin-right:2px;");
var bGI=document.createElement("a");
bGI.href='https://www.google.ca/search?tbm=isch&biw=&bih=&gbv=2&q='+animeName;
bGI.target="_blank";
bGI.title="Search with Google Images";
bGI.appendChild(bGIi);

//Add Website Buttons
header[0].appendChild(document.createTextNode (" "));
if (document.location.host == "www.anime-planet.com")
   {
      header[0].appendChild(bMal);
   }
else if (document.location.host == "myanimelist.net")
   {
     header[0].appendChild(bAP);
   }
header[0].appendChild(bYt);
header[0].appendChild(bTS);
header[0].appendChild(bGI);