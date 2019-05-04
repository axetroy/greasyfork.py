// ==UserScript==
// @name        	Steam Error Widget Helper
// @name:en     	Steam Error Widget Helper
// @namespace   	https://greasyfork.org/users/2205
// @description 	Для виджетов с ошибкой отображает линк на steamdb.info и если возможно - название игры.
// @description:en 	For error widgets shows steamdb.info link and game name (if possible).
// @include     	http://store.steampowered.com/*
// @include     	https://store.steampowered.com/*
// @run-at      	document-end
// @version     	1.2
// @language        English
// ==/UserScript==


var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

//rate limiting
var getJSONRL = function(url, callback) {
  var Rate=1500; //ms between requests;
    var lastCall=localStorage.getItem ('ITCFTRateLimiter');
    if (lastCall!==null) {
      if ((parseInt(lastCall) + Rate) > Date.now()) {
        window.setTimeout(function(){
          getJSONRL(url,callback);
        },parseInt(lastCall)+Rate-Date.now());
      } else { //already time
        getJSON(url,callback);
        localStorage.setItem('ITCFTRateLimiter',Date.now());
      }
    }  else { //first call ever
      getJSON(url,callback);
      localStorage.setItem('ITCFTRateLimiter',Date.now());
    }
};

+function(){

      //forum widgets
      var wcontainer=document.getElementById ('widget');
      if (wcontainer!==null) {
        var appimagecontainers=wcontainer.getElementsByClassName('capsule');
        if (appimagecontainers.length===0) {
         var appid=window.location.href.match(/(http.{0,1}:\/\/store\.steampowered\.com\/)(.*)\/(\d+)(.*)/)[3];
          getJSONRL('/api/appdetails?appids='+appid, function(err, data) {
            if (err !== null) {
              console.log('Something went wrong: ' + err);
            } else {
              var gamename=null;
              if (data[appid].success) {
                if (typeof(data[appid].data.name)!=='undefined') {
		              gamename=data[appid].data.name;
                }
              }
	      NewElement=document.createElement("div");
              NewElement.setAttribute("class","desc");
              NameElement=NewElement.appendChild(document.createElement("p"));
              NameElement.setAttribute("style","font-size: 20px !important; line-height: 28px !important");
              SteamUrlElement=NameElement.appendChild(document.createElement("a"));
              SteamUrlElement.setAttribute("style", "color: #898a8c !important;");
              SteamUrlElement.setAttribute("href","https://store.steampowered.com/app/"+appid);
              SteamUrlElement.setAttribute("target","_blank");
              if (gamename===null) {
                SteamUrlElement.appendChild(document.createTextNode("https://store.steampowered.com/app/"+appid)); 
              } else {
                SteamUrlElement.appendChild(document.createTextNode(gamename));
              }
              UrlElement=NewElement.appendChild(document.createElement("a"));
              UrlElement.setAttribute("href","https://steamdb.info/app/"+appid);
              UrlElement.setAttribute("style","color: #898a8c !important; text-decoration: underline !important; line-height: 20px !important");
              UrlElement.setAttribute("target","_blank");
              UrlElement.appendChild(document.createTextNode("View on Steam Database ("+appid+")"));
             showplace=wcontainer.appendChild(NewElement);
            }
          });
        }
      }
}();