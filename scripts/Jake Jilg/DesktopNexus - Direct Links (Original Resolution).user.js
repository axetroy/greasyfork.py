// ==UserScript==
// @name        DesktopNexus - Direct Links (Original Resolution)
// @namespace   https://jaketheblog.tumblr.com/desktopnexus
// @description Shows direct link to the original resolution; no warped resize or crop.
// @include     http*://*.desktopnexus.com/*
// @include     http*://*.desktopnexus.com/*/*?retrieveTheThing
// @version     3
// @grant       none
// ==/UserScript==
var originalResLinks = function(){
  var noRepeat = [];
  var linksInsideParent = function(child){
    var a;
    var href;
    var parent;
  	for(var i = 0; i < child.length; i++){
      if(child[i].getElementsByTagName("a").length === 0){
        continue;
      }
      href = child[i].getElementsByTagName("a")[0].href;
      parent = child[i].getElementsByTagName("a")[0].parentNode;
      if(
        	parent.getElementsByTagName("a").length > 1 &&
        	parent.getElementsByClassName("arrow").length === 0 &&
        	parent.getElementsByClassName("thumbpopup").length === 0		
      ){
         continue;
      }
      if(href.match(/^https?:\/\/.*\.facebook.com/) !== null){
         continue;
      }
      if(href.match(/\/wallpapers\/$/) !== null){
         continue;
      }
      if(href.match(/(groups\/|\/discussion\/(new)?)$/) !== null){
         continue;
      }
      if(href.match(/all\/$/) !== null){
         continue;
      }
      if(noRepeat.indexOf(href) !== -1){
      	continue;
      }
      noRepeat.push(href);
      a = document.createElement("a");
      a.className = "full-res-link";
    	if(href.match(/\/(wallpaper)\/\d+\//) !== null){
        a.appendChild(document.createTextNode("Original URL"));
        a.href = href + "?retrieveTheThing";
        a.addEventListener("click", function(e){
        	window.origImageProcess = window.open(
              this.href,
              "origUrlFetch",
              "width=500,height=500"
            );
            e.preventDefault();
        });
        parent.appendChild(a);
      }else{
        a.href = href;
        a.appendChild(document.createTextNode("Image Group"));
        parent.appendChild(a);
      }
    }
  };
  var css = document.createElement("style");
  var style = {
      "background-color":"rgba(200,200,255,0.8)",
      "color":"#0066ff",
      "display":"block",
      "text-align":"center",
      "border":"1px solid rgba(255,255,255,0.8)",
      "width":"100%",
      "font-weight":"normal"
    };
  css.setAttribute("type", "text/css");
  css.appendChild(document.createTextNode(".full-res-link{"));
  for(r in style){
    css.appendChild(
      document.createTextNode(r + ":" + style[r] + ";")
   	);
  }
 	css.appendChild(document.createTextNode("}"));
  document.head.appendChild(css);
  var retrieveReg = /\/(wallpaper)\/(\d+)\/\?retrieveTheThing/;
  var resReg = /(Original Resolution:\s|Resolution:\s)(\d+)x(\d+)/;
  var dlh = document.location.href;
	if(dlh.match(/\/(wallpaper|groups)\/\d+\//)===null){
    var mc = document.getElementById("middlecolumn");
    if(mc === null){
      mc = document.getElementsByClassName("mainCol")[0];
    }
    if(mc !== null && typeof mc !== "undefined"){
      var rbi = mc.getElementsByClassName("rboxInner")[1];
      if(typeof rbi !== "undefined" && rbi.getElementsByTagName("td").length > 0){
		    linksInsideParent(rbi.getElementsByTagName("td"));
      }else{
	      linksInsideParent(mc.getElementsByTagName("div"));
      }
    }
	}else if(dlh.match(retrieveReg)!==null
	&& document.body.innerText.match(resReg)!==null){ // on special ?retrieveTheThing
		var subdomain = dlh.match(/^https?:\/\/([^\.]+)/)[1];
		var id = dlh.match(retrieveReg)[2];
		var res = document.body.innerText.match(resReg);
		var width = parseInt(res[2]);
		var height = parseInt(res[3]);
		window.resizeTo(
			(width < screen.width ? width: screen.width ),
			(height < screen.height ? height: screen.height )
		);
    document.head.innerHTML = "";
    document.body.innerHTML = "";
    var gif = document.createElement("img");
    gif.src = 'data:image/gif;base64,R0lGODlhEAAQAPEDAE+g5MLe9f///xqE3SH/C05FVFNDQVB' + 
				'FMi4wAwEAAAAh+QQJCgADACwAAAAAEAAQAAACJpyPqcvtD2MCIQAYhAhY80dZUnghQHlU4nGeZt' + 
				'XGLmvJw7zEkJ4UACH5BAkKAAMALAAAAgAKAA4AAAIh3BABxhMiQjMvzpMWQ+qmPnFSqGgXgJpbe' + 
				'rLomrKhPA8FACH5BAkKAAMALAAAAAAKAA4AAAIinA8RcBciggEpQTnUSmvq5lENJYIkY5LgcK4I' + 
				'mpajuspGAQAh+QQJCgADACwAAAAADgAKAAACIpwPEHB9AZlLFK5oaFpKiJBRTeCBg9Yoyyk5qeg' + 
				'icBzSRwEAIfkECQoAAwAsAgAAAA4ACgAAAiCcBwnHp9vQeilA+oI1j2ntQOEWNYAmloEgBOWxti' + 
				'+HFgAh+QQJCgADACwGAAAACgAOAAACIhwwqXa43Jo60K34ak4n2Bl4WRhm3QeEXxIIQjC68JOKQ' + 
				'wEAIfkECQoAAwAsBgACAAoADgAAAiCcDXCbudgelKepZ2XGsQb3BGKAiIlpBILwfZfKauhTAAAh' + 
				'+QQFCgADACwCAAYADgAKAAACIZyPA5C929Bj8UAQAjXTBCEE0uOBmjZR2JmJZLKKlYI2BQA7';/*GIF*/
    document.body.appendChild(gif);
    document.body.appendChild(document.createTextNode("Loading original image..."));
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           window.resizeTo(width,height);
           document.location.href = xhttp.responseText;
        }
    };
    xhttp.open(
      	"GET", 
        "/get_wallpaper_download_url.php?id=" + id + "&w=" + width + "&h=" + height,
      	true
   	);
    xhttp.send();
	}
};
originalResLinks();