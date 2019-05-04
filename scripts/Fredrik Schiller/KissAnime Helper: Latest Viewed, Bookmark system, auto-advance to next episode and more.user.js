// ==UserScript==
// @name         KissAnime Helper: Latest Viewed, Bookmark system, auto-advance to next episode and more
// @namespace    http://your.homepage.sucks/dont-even-bother
// @version      1.0
// @description  Adds list of latest viewed on front page, creates link to resume show if on anime summary, and styles episode play pages.
// @author       Skymt
// @match        http://kissanime.com/*
// @grant        none
// ==/UserScript==

(function() {
    //Do NOT run this script in iframes! (I know there is a setting for this, at least in tampermonkey, but I don't know that other users know this nor what the deal is with other plugins...)
    if(window.parent != this) return;

    //Declare variables and load shit from local storage
    var bookmarks = localStorage["KAH.Bookmarks"] ? JSON.parse(localStorage["KAH.Bookmarks"]) : {}, currentShow, autoAdvance;
    var latest = localStorage["KAH.Latest"] ? JSON.parse(localStorage["KAH.Latest"]) : [];

    //Add a bookmark selector to the page. (I initally wanted to avoid jQuery but since kiss anime already links it, and the syntax of jQuery rocks...)
    var select = $('<select style="width:100%"></select>').insertBefore('#search');
    select.html(latest.reduce(function(pv, cv) { return pv + '<option value="' + cv.p + '">' + cv.t + '</option>'; }, ''));
    select.prepend('<option>Recently watched...</option>');
    select.change(function() { window.location = $(this).val(); });

    //The god damned ads recycles causes the status bar to show up even when in fullscreen mode. Lets click them hide buttons!
    setTimeout(function() { $('.divCloseBut>a').click(); }, 5000);

    //Check if we can determine the show from the current path (and set it to currentShow if that is the case)
    if(currentShow = window.location.pathname.match('/Anime/([^/]*)/?'), currentShow = (currentShow ? currentShow[1] : undefined)) {
        if(window.location.pathname.endsWith(currentShow) && bookmarks[currentShow]) {
            //We are at an show summary page, and we have a bookmark for that show. 
            //Make the show title not link to itself, but rahter the latest viewed episode, and highlight it green to show we have modified it.
            $('.bigChar').attr('href', bookmarks[currentShow].path).css('color', 'green');
        } else {
            //We are (most likely) on an episode page...
            var v = document.getElementsByTagName('video'),
                n = document.getElementById('btnNext'),
                p = document.getElementById('btnPrevious');
            
            //Ensure that we found the video element, bail in simple confusion if we are not (Users should know they need to run the HTML5 video player, right? - flash is obsolete caveman shenanigans)
            if(v.length === 1) v = v[0]; else return;
                        
            //Hook up some fun stuff
            v.addEventListener('canplay', function() {
                //We only need to do this once, even if the video re-buffers - so remove self as eventlistener.
                v.removeEventListener('canplay', arguments.callee);

                //Restore bookmark time (minus 5 seconds - for you stoners out there)
                if(bookmarks[currentShow] && window.location.pathname == bookmarks[currentShow].path) 
                    v.currentTime = Math.max(bookmarks[currentShow].time - 5, 0);
                
                //Important elements are the video, and nav buttons. Enlarge video element by making its position fixed, and make sure nav buttons are always visible
                v.parentElement.style.zIndex = 1;
                v.style.position = 'fixed';
                
                //We could be on last/first episode - so make sure previous and next buttons actually exists before modifying their styles.
                if(n) with(n.style) { position = 'fixed', top = '5%', right = '5%', zIndex = 2; }
                if(p) with(p.style) { position = 'fixed', top = '5%', left = '5%', zIndex = 2; }
            });
            
            //Auto advance to next episode. To protect bookmark, ask user to continue after three skips (allows about an hour of watching).
            v.addEventListener('ended', function() {
                var counter = parseInt(localStorage["KAH.AutoAdvanceCounter"]) || 1;
                if(counter++ < 3) {
                    localStorage["KAH.AutoAdvanceCounter"] = counter;
                    autoAdvance = true;
                    n.click();
                } else if(confirm('Resume automatic advancement?')) n.click();
            });

            //Make double clicking video toggle fullscreen.
            var cts = 0, timeout;
            v.addEventListener('click', function() {
                if(Date.now() - cts < 200) {
                    if(document.webkitCurrentFullScreenElement) document.webkitExitFullscreen();
                    else v.webkitRequestFullScreen();
                } else {
                    cts = Date.now();
                }

            });
            //Fuck the context menu - make the right mouse button skip a standard anime intro (90s) instead, and double click to revert styles of prev/next buttons and video.
            v.addEventListener('contextmenu', function() {
                if(Date.now() - cts < 200) {
                    clearTimeout(timeout);
                    v.style.position = '';
                    if(n) n.style = '';
                    if(p) p.style = '';
                } else {
                    cts = Date.now();
                    //ok - I lied, lets skip 85 seconds for slow responders!
                    timeout = setTimeout(function() { v.currentTime += 85; }, 200);
                }
                event.preventDefault();
                return false;
            });
            
            //And hitting space should be a nice way to play / pause the video
            document.addEventListener('keydown', function() {
                if(event.keyCode == 32) { 
                    v[v.paused ? 'play' : 'pause'](); 
                    event.preventDefault(); 
                    return false; 
                }
            });
            //Update the latest viewed array
            for(var i = latest.length; i > 0; i--) if(latest[i-1].t.indexOf(currentShow + " |") === 0) latest.splice(i-1, 1); //Remove old instances
            latest.splice(0, 0, { t: [currentShow, window.location.pathname.match('/([^/]*)$')[1]].join(' | ') , p: window.location.pathname }); //Insert this show at the top
            latest.splice(200); localStorage["KAH.Latest"] = JSON.stringify(latest); //Crop it at 200, and put it away for storage.

            //Set a listener to update the bookmark when the page is unloading
            window.addEventListener('beforeunload', function() {
                bookmarks[currentShow] = { path: window.location.pathname, time: v.currentTime };
                localStorage["KAH.Bookmarks"] = JSON.stringify(bookmarks);
                
                //If not automatically loading the next episode - delete the counter for automatic advancement
                if(!autoAdvance) delete localStorage["KAH.AutoAdvanceCounter"];
                //No need to unbind since you know, the entire page is unloading...
            });
        }
    }
})();