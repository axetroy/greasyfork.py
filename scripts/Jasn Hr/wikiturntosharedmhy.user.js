// ==UserScript==
// @name        wikiturntosharedmhy
// @namespace   wiki.turn.to.share.dmhy
// @description 在Wiki條目中擷取關鍵字跳轉到動漫花園資源網搜尋
// @include     http*://*.wikipedia.org/wiki/*
// @version     1.4
// @grant       none
// ==/UserScript==

var titletext = document.getElementById("firstHeading").innerHTML;
var i,j,k,spln,searchtext;
  
var enarr = [];
var charr = [];       
var jarr = [];

document.getElementById("firstHeading").innerHTML = titletext + "<button id=\"jptodmhy\" style=\"font-size:20px;\">跳到花園搜尋</button>";

document.getElementById("jptodmhy").addEventListener('click', function(event) {
  
  try {
    titletext = document.getElementsByClassName("infobox")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
  } catch (e) {
  }

  var mtb = document.getElementsByClassName("infobox")[0];
  
  for(i=0;i<mtb.rows.length;i++) {
	for(j=0;j<mtb.rows[i].cells.length;j++) {
      
      var tstx = mtb.rows[i].cells[j];
      
  try {
              
    if (tstx.getElementsByTagName("span")[0].class != "flagicon") {
      
      if (tstx.getElementsByTagName("span")[0].lang == "en") {

        try {
          enarr = tstx.getElementsByTagName("span")[0].getElementsByTagName("i")[0].innerHTML.split(" ");
        } catch(err) {
          enarr.push(tstx.getElementsByTagName("span")[0].getElementsByTagName("i")[0].innerHTML);
        }
        
        if (enarr.length > 1) {
          
          spln = Math.round(eval(titletext.length/enarr.length));
          
          for(k=0;k<enarr.length;k++) {
            charr.push(titletext.substr(eval(spln * k),spln));
          }
        
        } else {
          
          charr.push(titletext);
          
        }
        
      }
      
      if (tstx.getElementsByTagName("span")[0].lang == "ja") {
        
        if (enarr.length > 1) {
          
          spln = Math.round(eval(tstx.getElementsByTagName("span")[0].innerHTML.length/enarr.length));
          
          for(var l=0;l<enarr.length;l++) {
            jarr.push(tstx.getElementsByTagName("span")[0].innerHTML.substr(eval(spln * l),spln));
          }
          
        } else {
        jarr.push(tstx.getElementsByTagName("span")[0].innerHTML);
        }

      }
    }

  } catch(e) {
    //console.log(e);
  }
        
  }}

if (enarr.length > 1) {
  
  searchtext = "";
  
  for(i=0;i<enarr.length;i++) {
    
    if (eval(searchtext.length+enarr[i].length) < 60 && enarr[i] != "undefined") searchtext = searchtext + enarr[i];
    if (eval(searchtext.length+charr[i].length+1) < 60 && charr[i] != "undefined") searchtext = searchtext + "|" + charr[i];
    if (eval(searchtext.length+jarr[i].length+1) < 60 && jarr[i] != "undefined") searchtext = searchtext + "|" + jarr[i];
    
    searchtext = searchtext + " ";
  
  }
  
} else {
  
  searchtext = "";
  
  i=0;
  
    if (eval(searchtext.length+enarr[i].length) < 60 && enarr[i] != "undefined") searchtext = searchtext + enarr[i];
    if (eval(searchtext.length+charr[i].length+1) < 60 && charr[i] != "undefined") searchtext = searchtext + "|" + charr[i];
    if (eval(searchtext.length+jarr[i].length+1) < 60 && jarr[i] != "undefined") searchtext = searchtext + "|" + jarr[i];
  
}

//console.log(searchtext);
document.location.href = "https://share.dmhy.org/topics/list?keyword=" + searchtext;
  
});
