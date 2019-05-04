// ==UserScript==
// @name        Youtube - Whitelist by Channel
// @namespace   schippi (modified by AcasShows)
// @include     http*://*.youtube.com/watch*
// @include     http*://youtube.com/watch*
// @description Whitelist Youtube Videos from only channels you wish to support
// @version     1.1
// ==/UserScript==
     
    var u = window.location.href;
    if(u.search("user=") == -1){
       if (!! document.getElementById("ud")) {
          var user = document.getElementById("ud").getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
            window.location.href = u+"&user="+user;
        }
        else if (!! document.getElementById("body")) {
          user = document.getElementById("watch7-user-header").getElementsByTagName("a")[0].getAttribute("href").split("/")[2]
            window.location.href = u+"&user="+user;
        }
       else {
            alert('script failed');
       }
       
    }