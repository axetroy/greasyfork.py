// ==UserScript==
// @name        IsThereCouponForThis
// @name:en        IsThereCouponForThis
// @namespace   https://greasyfork.org/users/2205
// @description Отображает доступные купоны с помощью значка на странице магазина, на виджетах встроенных на форуме и в вишлисте.
// @description:en Show coupons available on game steam store page, on wishlist and on widgets embedded in steamcommunity discussions.
// @include     http://store.steampowered.com/*
// @include     https://store.steampowered.com/*
// @connect     pastebin.com
// @run-at      document-end
// @version     2.5
// @grant       GM.xmlhttpRequest
// @grant       GM_xmlhttpRequest
// @language    English
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

var elemVisible =function( elem ) {
  if (elem===null) {
    return false;
  } else {
    return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
  }
};

var processWishlist = function (subids,couponMap,container){
      NewElement=document.createElement("span");
      NewElement.setAttribute("style","font-size:18px;text-align: center;cursor:default;border-radius: 2px 2px 2px; border: 1px solid; user-select: none !important; pointer-events:auto !important;");
      NewElement.setAttribute("class","platform_img");
      NewElement.setAttribute("tag","coupondata");
      var foundcoupons=0;
      var foundlist="";
      for (var m=0;m<subids.length;m++) {
        if (couponMap.has(subids[m])) {
          if (foundcoupons>0) {
            foundlist=foundlist+", ";
          }
          foundlist=foundlist+couponMap.get(subids[m]);
          foundcoupons++;
        }
      }
      if (foundcoupons>0) {
        NewElement.setAttribute("title","Coupons: "+foundlist);
        NewElement.appendChild(document.createTextNode("$"));
      } else {
        NewElement.setAttribute("title","No Coupons Found");
        NewElement.appendChild(document.createTextNode("X"));
      }
      showplace=container.getElementsByClassName('platform_icons')[0];
      if (showplace.querySelector('[tag="coupondata"]')===null){
        var newchild=showplace.appendChild(NewElement);
        newchild.addEventListener('touchstart', function() {
            this.classList.add('touched');
        }.bind(newchild));
      }
};

var renewWishlist = function(couponMap){
     containers=document.getElementsByClassName('wishlist_row');
     for (var k=0;k<containers.length;k++) {
      var container=containers[k];
      if (container.querySelector('[tag="coupondata"]')!==null){
        continue;
      }
      subidContainer=container.querySelector('[name="subid"]');
      var subids=[];
      if (subidContainer===null) {
        appid=container.getAttribute('data-app-id');
        (function(appid,subids,couponMap,container){
        var cachedPackages=sessionStorage.getItem("ITCFTappid"+appid);
        if (cachedPackages===null) {
        getJSONRL('http://store.steampowered.com/api/appdetails?appids='+appid, function(err, data) {
          if (err !== null) {
            console.log('Something went wrong: ' + err);
          } else {
             subids.lenght=0;
             if (typeof(data[appid].data.packages)!=='undefined') {
               sessionStorage.setItem("ITCFTappid"+appid,data[appid].data.packages.toString());
             for (var w=0;w<data[appid].data.packages.length;w++){
               subids.push(data[appid].data.packages[w].toString());
             }
             processWishlist(subids,couponMap,container);
             } else {
               //if no subid found - store empty line, to prevent further requests.
               //it will be cached only untill browser restart, so it's fine.
               sessionStorage.setItem("ITCFTappid"+appid,"");
             }
          }
        });
        } else { //Cached subids
          if (cachedPackages.length>0) {
          subids.lenght=0;
          packages=cachedPackages.split(",");
            for (var x=0;x<packages.length;x++){
               subids.push(packages[x]);
            }
            processWishlist(subids,couponMap,container);
          }
        }
        })(appid,subids,couponMap,container);
      } else {
        subids.push(subidContainer.value);
        processWishlist(subids,couponMap,container);
      }
    }
};


+function(){
  var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
  sheet=style.sheet;
  sheet.insertRule("[title] {	border-bottom: 1px dashed rgba(0, 0, 0, 0.2); border-radius:2px; position: relative; }",0);
  sheet.insertRule(".touched[title]:hover:after { position: absolute; bottom: 100%; left: -10%; content: attr(title); border: 1px solid rgba(0, 0, 0, 0.2); background-color: white; color: black !important; box-shadow: 1px 1px 3px; padding: 0.3em; z-index: 1; font-size: 11px !important;}",0);

  var couponMap = new Map();
  GM_xmlhttpRequest({
  method: "GET",
  url: "https://pastebin.com/raw/i8ri7Ne7",
  onload: function(response) {
       var couponlist = response.responseText;
       couponlistlines = couponlist.split('\n');
       for (var i=0 ; i<couponlistlines.length ; i++) {
         coupondata=couponlistlines[i].split('\t');
         if (coupondata.length>3) {
           subids=coupondata[3].split(',');
           for (var j=0; j<subids.length; j++) {
             if (couponMap.has(subids[j])) {
                couponMap.set(subids[j],couponMap.get(subids[j])+", "+coupondata[0]);
             } else {
                couponMap.set(subids[j],coupondata[0]);
             }
           }

         }
       }
var timerId = window.setInterval(function WLReady() {
    if (!elemVisible(document.getElementById('throbber'))) {
     clearInterval(timerId);
    //store page
    containers=document.getElementsByClassName('game_area_purchase_game');
    for (var k=0;k<containers.length;k++) {
      var container=containers[k];
      subidcontainer=container.querySelector('[name="subid"]');
      if (subidcontainer!==null) {
        subid=subidcontainer.value;
        NewElement=document.createElement("span");
        NewElement.setAttribute("style","font-size:18px;text-align: center;cursor:default;border-radius: 2px 2px 2px; border: 1px solid; user-select: none !important; pointer-events:auto !important;");
        NewElement.setAttribute("class","platform_img");
        if (couponMap.has(subid)){
          NewElement.setAttribute("title","Coupons: "+couponMap.get(subid));
          NewElement.appendChild(document.createTextNode("$"));
        } else {
          NewElement.setAttribute("title","No Coupons Found");
          NewElement.appendChild(document.createTextNode("X"));
        }
        showplace=container.getElementsByClassName('game_area_purchase_platform')[0];
        var newchild=showplace.insertBefore(NewElement,showplace.firstChild);
        newchild.addEventListener('touchstart', function() {
            this.classList.add('touched');
        }.bind(newchild));
      }
    }
      //forum widgets
      var wcontainer=document.getElementById ('widget');
      if (wcontainer!==null) {
      subid=wcontainer.querySelector('[name="subid"]').value;
      NewElement=document.createElement("span");
      NewElement.setAttribute("style","font-size:18px;text-align: center;cursor:default;border-radius: 2px 2px 2px; border: 1px solid; user-select: none !important; pointer-events:auto !important;");
      NewElement.setAttribute("class","platform_img");
      if (couponMap.has(subid)){
        NewElement.setAttribute("title","Coupons: "+couponMap.get(subid));
        NewElement.appendChild(document.createTextNode("$"));
      } else {
        NewElement.setAttribute("title","No Coupons Found");
        NewElement.appendChild(document.createTextNode("X"));
      }
      showplace=wcontainer.getElementsByClassName('game_area_purchase_platform')[0];
      var newwchild=showplace.appendChild(NewElement);
      newwchild.addEventListener('touchstart', function() {
          this.classList.add('touched');
      }.bind(newwchild));
      }
    //wishlist
     containers=document.getElementsByClassName('wishlist_row');
      if (containers.length>0) {
          renewWishlist(couponMap);
          window.addEventListener('scroll', function(){renewWishlist(couponMap);});
	        window.addEventListener('resize', function(){renewWishlist(couponMap);});
      }

    } //main work
   },100); //SetInterval
  },
  onerror: function() {
      console.log('Error.');
  }
});
}();