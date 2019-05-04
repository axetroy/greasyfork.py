// ==UserScript==
// @name         MSO Extender
// @namespace    http://quinny898.co.uk
// @version      1.0
// @description  Addons to the MSO userstyle
// @author       Quinny898
// @match        http://motorwayservicesonline.co.uk/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    if(window.location.href.indexOf("/forums") == -1){
        if(!document.getElementsByClassName("infobox")[0] && !document.getElementsByClassName("unbuilt")[0]){
            document.getElementById("content").style.marginRight = "-300px"
        }
    }else{
        document.getElementById("content").style.marginRight = "20px"
    }
    element =  document.querySelectorAll("[accesskey=b]")[0];
    if(element){
    user = element.innerHTML;
    dropdown = "<div class='dropdown'><input id='checkbox1' type='checkbox' name='checkbox' checked /><label for='checkbox1'>    <div class='drop-ttl'>"+user+"</div>    <ul>        <li><a href=\"http://motorwayservicesonline.co.uk/User:"+user+"\">My Page</a></li>  <li><a href=\"http://motorwayservicesonline.co.uk/User_talk:"+user+"\">My Talk</a></li>   <li><a href=\"http://motorwayservicesonline.co.uk/Special:Contributions/"+user+"\">Contribs</a></li>   <li><a href=\"http://motorwayservicesonline.co.uk/Special:Preferences\">Preferences</a></li> <li><a href=\"http://motorwayservicesonline.co.uk/Special:Watchlist\">Watchlist</a></li> <li><a href=\"http://motorwayservicesonline.co.uk/wiki/index.php?title=Special:UserLogout&returnto=Main%20Page\">Log out</a></li> <li><a href=\"javascript:document.getElementById(\'checkbox1\').click();\">Close</a></li> </label></div>"
    
    document.getElementById("searchform").innerHTML = dropdown + document.getElementById("searchform").innerHTML;
    }else{
    dropdown = "<div class='dropdown'><input id='checkbox1' type='checkbox' name='checkbox' checked /><label for='checkbox1'>    <div class='drop-ttl'>Log in/Register</div>    <ul>        <li><a href=\"http://motorwayservicesonline.co.uk/wiki/index.php?title=Special:UserLogin&returnto=Main%20Page\">Log in</a></li>  <li><a href=\"http://motorwayservicesonline.co.uk/forums/ucp.php?mode=register\">Register</a></li> <li><a href=\"javascript:document.getElementById(\'checkbox1\').click();\">Close</a></li> </label></div>"
            document.getElementById("searchform").innerHTML = dropdown + document.getElementById("searchform").innerHTML;

    }
}, false);
