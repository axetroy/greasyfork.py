// ==UserScript==
// @name         VNDB Scout
// @version      0.1
// @description  Checks other sites for visual novels
// @author       SentientCrab
// @match        https://vndb.org/v*
// @exclude      https://vndb.org/v/*
// @grant        GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/49589
// ==/UserScript==

var sites = [
  {   'name': 'Nyaa',
      'searchUrl': 'https://nyaa.si/?f=0&c=6_2&q=%rt%',
      'toMatch': 'out of 0 results',
      'returnTrueIf': false},
  {   'name': 'Nyaa-jp',
      'searchUrl': 'https://nyaa.si/?f=0&c=6_2&q=%jt%',
      'toMatch': 'out of 0 results',
      'returnTrueIf': false},
  {   'name': 'Sukebei',
      'searchUrl': 'https://sukebei.nyaa.si/?f=0&c=1_3&q=%rt%',
      'toMatch': 'out of 0 results',
      'returnTrueIf': false},
  {   'name': 'Sukebei-jp',
      'searchUrl': 'https://sukebei.nyaa.si/?f=0&c=1_3&q=%jt%',
      'toMatch': 'out of 0 results',
      'returnTrueIf': false}

   ];

function linkHelp(url, currentSite){
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            var hasVN=false;
            var abc = response.responseText.indexOf(currentSite['toMatch']) != -1;
            var cba = abc ==  currentSite['returnTrueIf'];
            //alert("abc "+abc);
            //alert("false check "+cba);
            if(abc ==  currentSite['returnTrueIf'])
            {
                hasVN=true;
            }
            if(hasVN)
                document.getElementsByClassName("onlineList")[0].innerHTML=' <a target="_blank" rel="noreferrer" href="'+response.finalUrl+'">'+currentSite['name']+'</a>'+document.getElementsByClassName("onlineList")[0].innerHTML;
            else
                document.getElementsByClassName("onlineList")[0].innerHTML+='<s><a style="color:red" target="_blank" rel="noreferrer" href="'+response.finalUrl+'">'+currentSite['name']+'</a></s> ';
        }
    });
}

(function() {
    var romanjiText = document.getElementsByClassName("mainbox")[0].getElementsByTagName("h1")[0].innerHTML;
    var japText = document.getElementsByClassName("alttitle")[0];
    if(japText != undefined)
    {
        japText=japText.textContent;
    }
    var toAdd='';
    for (var siteIndex in sites) {
        if((japText == undefined && sites[siteIndex]['searchUrl'].indexOf("%jt%") != -1) || (japText != undefined && japText.indexOf(romanjiText) != -1))
            continue;
        var toLookup=sites[siteIndex]['searchUrl'].replace("%rt%",romanjiText).replace("%jt%",japText);
        linkHelp(toLookup, sites[siteIndex]);
        //alert(sites[siteIndex]['name']);
    }
    var table = document.getElementsByTagName("tbody")[0];

    table.innerHTML='<tr><td>Online at</td><td><div class="onlineList"> | </div></td></tr>'+table.innerHTML;
})();