// ==UserScript==
// @name         Hangouts Enhancer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Enhanced!
// @author       You
// @match        https://hangouts.google.com/
// @grant        none
// ==/UserScript==

(function() {
    var image = "http://www.hdbloggers.net/wp-content/uploads/2016/09/Cool-1080p-HD-Wallpaper.jpg";
    //
    //
    //
    var sel = false;
    var div1 = document.createElement("div");
            document.getElementsByClassName("JAPqpe")[0].appendChild(div1);
            div1.id = "div1";
            div1.innerHTML = //
                `
            <div class="kCtYwe" role="separator"></div>
<div class="eWAaP">Change Background</div>
<content id="changeBG"class="z80M1" role="menuitem" tabindex="-1"><div class="aBBjbd MbhUzd" jsname="ksKsZd" style="top: 12px; left: 121px; width: 256px; height: 256px;"></div><div class="PCdOIb" aria-hidden="true"><img style="width: 24px; height: 24px;" src="http://www.freeiconspng.com/uploads/multimedia-photo-icon-31.png"></div><div class="PCdOIb" aria-hidden="true" style="
    display: none;
"></div><div class="uyYuVb" jscontroller="b7XgIb" jsaction="JIbuQc:sUqOpe"><div class="jO7h3c">Change Image</div></div></content>
<content id="changeBG"class="z80M1" role="menuitem" tabindex="-1"><div class="aBBjbd MbhUzd" jsname="ksKsZd" style="top: 12px; left: 121px; width: 256px; height: 256px;"></div><div class="PCdOIb" aria-hidden="true"><a href="https://ebenandbrad.github.io/" style="text-decoration: none; color: black"><img style="width: 24px; height: 24px;" src="https://ebenandbrad.github.io/favicon.ico"></div><div class="PCdOIb" aria-hidden="true" style="
    display: none;
"></div><div class="uyYuVb" jscontroller="b7XgIb" jsaction="JIbuQc:sUqOpe"><div class="jO7h3c">Website</div></div></content>
`;
    document.getElementById("changeBG").addEventListener("click", clicked);
    document.getElementById("changeBG").addEventListener("mouseover", 'document.getElementById("changeBG").style.backgroundColor = "#eeeeee"');
    function clicked() {
        //document.getElementsByClassName("g-Qx-n5VRYe")[0].style.backgroundImage = "linear-gradient(rgba("+r+", "+g+", "+b+", 0.22) 0%,rgba(255, 255, 255, 0) 75%,rgba(0, 0, 0, 0.22) 100%);";
        if(sel === false){
            var a = document.getElementsByClassName("gb_O")[0];
            var img = document.getElementsByClassName("gb_3")[0];
            img.className = "";
            //img.back
            var mkImg = document.createElement("img");
            mkImg.src="https://lh3.ggpht.com/BnwplGa64eYvmoOMSSuK26UOyQXuPrcv09LKUbG_CsPGI2e4mX7MEbL5O46tqiUgotQ=w300";
            mkImg.className="gb_3";
            a.insertBefore(mkImg, document.getElementsByClassName("gb_4")[0]);
            a.href = "https://beastwick18.github.io/index.html";
            document.getElementById(":0.ec").src = "http://www.hdbloggers.net/wp-content/uploads/2016/09/Cool-1080p-HD-Wallpaper.jpg";
            document.getElementsByClassName("g-Qx-F")[0].style.display = "none";
            document.getElementsByClassName("gb_4")[0].innerHTML = 'Pong';
            sel = true;
            document.getElementsByClassName("g-Ue-ma")[0].innerHTML = `Hi, Faggot!`;
            document.getElementsByClassName("g-Ue-zr-ma")[0].innerHTML = `Fuck You!`;
            //g-Ue-zr-ma
            //http://www.hdbloggers.net/wp-content/uploads/2016/09/Cool-1080p-HD-Wallpaper.jpg
}else if(sel === true){
            alert("Can't change back");
        }
    }
})();