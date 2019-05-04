// ==UserScript==
// @name         Twitter Image Download
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds a button to make downloading images from Twitter a tad bit easier.
// @author       You
// @match        https://twitter.com/
// @include      https://twitter.com/*
// @include      https://pbs.twimg.com/media/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    const addDownloadButton = () => {
        let tweets = document.querySelectorAll('.tweet');
        tweets.forEach((t) => {
            let actionList = t.querySelector('.ProfileTweet-actionList');
            if (actionList){
                if (!actionList.querySelector('.ProfileTweet-action--downloadImgs')){
                    let ImgExists = false;
                    let Images = t.querySelectorAll('.AdaptiveMedia-container img');
                    Images.forEach((Img) => {
                        if (Img) {
                            let ImgUrl = Img.src;
                            if (Img.src.includes('blob')) return;
                            ImgExists = true;

                            let btnDownloadImg = document.createElement('A');
                            btnDownloadImg.className = 'img-link';

                            let fileName = ImgUrl.substring(ImgUrl.lastIndexOf('/')+1);

                            btnDownloadImg.addEventListener('click', function(){
                                let imgWindow = window.open(ImgUrl);
                            });

                            actionList.appendChild(btnDownloadImg);
                        }
                    });
                    if (ImgExists){
                        let divDownloadImgs = document.createElement('DIV');
                        divDownloadImgs.className = 'ProfileTweet-action ProfileTweet-action--downloadImgs';

                        let btnDownloadImgs = document.createElement('A');

                        let btnText = document.createTextNode('Image');
                        btnDownloadImgs.appendChild(btnText);

                        btnDownloadImgs.className = 'ProfileTweet-actionButton u-textUserColorHover js-actionButton';

                        btnDownloadImgs.addEventListener('click', function(){
                            actionList.querySelectorAll('.img-link').forEach((btnDownloadImg) => {
                                btnDownloadImg.click();
                            })
                        });

                        divDownloadImgs.appendChild(btnDownloadImgs);
                        actionList.appendChild(divDownloadImgs);
                    }
                }
            }
        });


        if (window.location.href.includes('pbs.twimg.com/media')){
            let linkDownloadImg = document.createElement('A');
            let body = document.querySelector('body');
            let img = body.querySelector('img');
            let imgUrl = img.src;
            let fileName = imgUrl.substring(imgUrl.lastIndexOf('/')+1);
            linkDownloadImg.href = imgUrl;
            linkDownloadImg.download = fileName;
            body.appendChild(linkDownloadImg);
            linkDownloadImg.click();
            alert('File downloaded?');
            //window.close();
            setTimeout(function(){ window.close(); }, 1000);
        }
    }

    window.onload = function(){
        addDownloadButton();
    }

    waitForKeyElements (
        '.AdaptiveMedia-container img',
        addDownloadButton
        );



    function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
})();