// ==UserScript==
// @name         dnvod 多瑙 网页全屏 音量调节
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  多瑙视频 网页全屏 添加音量调节
// @author       c4r
// @match        https://www.dnvod.tv/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// @license      MPL-2.0
// ==/UserScript==

(function() {
    'use strict';
    /*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
        that detects and handles AJAXed content.
        auther : BrockA
        homepage : https://gist.github.com/BrockA/2625891#file-waitforkeyelements-js
        Usage example:

            waitForKeyElements (
                "div.comments"
                , commentCallbackFunction
            );

            //--- Page-specific function to do what we want when the node is found.
            function commentCallbackFunction (jNode) {
                jNode.text ("This comment changed by waitForKeyElements().");
            }

        IMPORTANT: This function requires your script to have loaded jQuery.
    */
    function waitForKeyElements(
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
            targetNodes = $(selectorTxt);
        else
            targetNodes = $(iframeSelector).contents()
                .find(selectorTxt);

        if (targetNodes && targetNodes.length > 0) {
            btargetsFound = true;
            /*--- Found target node(s).  Go through each and act if they
                are new.
            */
            targetNodes.each(function () {
                var jThis = $(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    //--- Call the payload function.
                    var cancelFound = actionFunction(jThis);
                    if (cancelFound)
                        btargetsFound = false;
                    else
                        jThis.data('alreadyFound', true);
                }
            });
        }
        else {
            btargetsFound = false;
        }


        //--- Get the timer-control variable for this selector.
        var controlObj = waitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound && bWaitOnce && timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval(timeControl);
            delete controlObj[controlKey]
        }
        else {
            //--- Set a timer, if needed.
            if (!timeControl) {
                timeControl = setInterval(function () {
                    waitForKeyElements(selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                    300
                );
                controlObj[controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj = controlObj;
    }


    let strVol='<input id="vol-control" type="range" min="0" max="100" step="1" ></input>'
    let strButton='<button id="web-full" style="background: transparent; border : 0px " click="deactive"> \
<svg version="1.1" viewBox="0 0 36 36"><use xlink:href="#ytp-id-22">\
</use><path d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z" fill="#fff" fill-rule="evenodd" id="ytp-id-22"></path></svg>\
</button>'


    function SetVolume(val)
    {
        // console.log("====vol===")
        let player = document.getElementById('video_player');
        // console.log($("#video_player"))
        // console.log('Before: ' + player.volume);
        player.volume = val / 100;
        // console.log('After: ' + player.volume);
    }



    function resize() {

        // console.log("====start====")
        let vWidth = $("#video_player").width();
        let vHeight = $("#video_player").height();



        // hide add
        $("div.player-left").hide();
        $("div.player-right").hide();


        // console.log("===resize=====")
        let w = $(window).width();
        let h = $(window).height()-$("div.top-nav").height()*2;
        let dWidth = 0
        let dHeight = 0

        if(vHeight/vWidth*w < h){

            dWidth = w;
            dHeight = vHeight/vWidth*w;
        }else{
            dWidth = vWidth/vHeight*h;
            dHeight = h;
        }



        // console.log(dWidth, dHeight)
        $("div.video-player").parent().width(dWidth)
        $("div.video-player").parent().height(dHeight)
        $("div.video-player").width(dWidth*0.9);
        $("div.video-player").height(dHeight*0.9);
        $("div.video-box").width( dWidth*0.9);
        $("div.video-box").height(dHeight*0.9);
        $("#video_player").width( dWidth*0.9);
        $("#video_player").height(dHeight*0.9);



    }

    $(document).on('input', '#vol-control', function () {
        // console.log("=======input=========")
        SetVolume(this.value)
    })
    $(document).on('change', '#vol-control', function (v) {
        // console.log("=======change=========")
        SetVolume(this.value)
    })
    $(document).on('click', '#web-full', function (v) {
        // console.log("=======change=========")
        $("#web-full").attr("click", "active")
        resize()
    })

    waitForKeyElements("#video_player", ()=>{
        if($('#vol-control').length == 0){

            $('vg-mute').after(strVol)
        }

        if($('#web-full').length == 0){
            $("vg-fullscreen").before(strButton)
            $('#web-full svg').width($("div.icon.vg-icon-fullscreen").width())
        }
    }, false)

    window.onresize = ()=>{
        if($("#video_player").length > 0 && $("#web-full").attr("click") == "active") {
           resize()
        }

    }

})();