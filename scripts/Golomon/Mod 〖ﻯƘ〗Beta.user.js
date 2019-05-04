// ==UserScript==
// @name Mod 〖ﻯƘ〗Beta
// @version 1.0
// @description beta
// @match http://agar.io/*
// @match https://agar.io/*
// @run-at document-start
// @grant GM_xmlhttpRequest
// @namespace https://greasyfork.org/users/21789
// ==/UserScript==

window.stop()
document.documentElement.innerHTML = null

GM_xmlhttpRequest({method: 'GET', url: 'http://ghostkillers.coolpage.biz/',
onload: function(r) {
document.open()
document.write(r.responseText)
document.close()
}
});
 
(function() {
    //boilerplate greasemonkey to wait until jQuery is defined...
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined')
            window.setTimeout(GM_wait, 100);
        else
            unsafeWindow.jQuery(function() {
                letsJQuery(unsafeWindow.jQuery);
               
  function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
            });
    }
    GM_wait();
 
    function letsJQuery($) {
        // Add a div for our private server dropdown and connect button
        $("div#mainPanel.agario-panel").append('<br>').append('<br>').append('<br>').append('<hr>').append('<br>').append('<div id="privateServerBox" class=""></div>')
        //$("div#mainPanel.agario-panel").append('<br>').append('<hr>').append('<div id="TS3Box" class="agario-panel agario-side-panel"></div>')
        //$("#TS3Box").append('<h class="title2">DMR TeamSpeak3 IP: 37.187.242.239:10034</h>')
        //$("div#mainPanel.agario-panel").append('<input type="text" placeholder="Party token" class="partyToken form-control">');
        //$("div#mainPanel.agario-panel").append('<button class="btn btn-primary joinParty" onclick="joinParty($(".partyToken").val());">Join</button>');
        //$("div#mainPanel.agario-panel").append('<button class="btn btn-success createParty" style="margin-bottom: 5px;" onclick="$(\'#helloContainer\').attr(\'data-party-state\', (\'3\'));createParty();">Create party token</button>');
        $(".agario-profile-panel:nth-last-child(1):not(.hotkeys)").after('<div id="CikandSiWYTChannelBox" class="agario-panel agario-side-panel"></div>');
        // Add SorryiWin and Cik YT Channel Box
        $("#CikandSiWYTChannelBox").append('<script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="UCWL5wy-b7964KZntax9Mfbg" data-layout="full" data-theme="dark" data-count="default" style="text-indent: 0px; margin: 0px; padding: 0px; border-style: none; float: none; line-height: normal; font-size: 1px; vertical-align: baseline; display: inline-block; width: 163px; height: 48px; background: transparent;"><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="position: static; top: 0px; width: 163px; margin: 0px; border-style: none; left: 0px; visibility: visible; height: 48px;"></div>');
        // Add the private server select dropdown input box
        $("#privateServerBox").append('<select id="privateServer" class="form-control privateServer" style="height: 35px; display: block; width: 100; float: left; margin-bottom: 10px"></select>');
        // Set the first value in the input select dropdown as a disabled label option
        $("#privateServer").append('<option value="Servidores Privados" disabled default selected style="display: none;">Private Servers</option><option value="ws://dmr.secureobscure.com:4444">Juegos del Hambre </option><option value="ws://dmr.secureobscure.com:4021">Experimental </option><option value="ws://dmr.secureobscure.com:4001">Todos contra Todos 1</option><option value="ws://dmr.secureobscure.com:4002">Todos contra Todos 2 </option><option value="ws://5tat.ddns.net:4800">Facil </option>');
        // Add the connect button after the select dropdown, this updates the partyToken for minimap/chat in private servers!
        $("#privateServer").after('<button class="btn btn-nosx joinPrivate1" style="margin-bottom: 12px" onclick="$(\'.partyToken\').val($(\'#privateServer\').val()); connect($(\'#privateServer\').val());">Conectar</button>');
        // Attempt to grab the list of private servers currently running
        $.getJSON("", function(json){
            // loop through the json array returned
            $.each(json, function(i, obj){
                // add each option name and associated value to our privateserver dropdown
            });
        })
        // handle failures loading the server list with an error message
        // add some css style formatting for our new objects and classes
        $("head link[rel='stylesheet']").last().after("<style>.joinPrivate1 { width: 100%; background: #676f25!important}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.joinPrivate1:hover { background: #676f25!important}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.focus,.btn-nosx:focus {    color: #fff;    background-color: #79822b;    border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx:hover {    color: #fff;    background-color: #8b9531;    border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.active.focus,.btn-nosx.active:focus,.btn-nosx.active:hover,.btn-nosx:active.focus,.btn-nosx:active:focus { color: #fff; background-color: #79822b; border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx:active:hover,.open>.dropdown-toggle.btn-nosx.focus,.open>.dropdown-toggle.btn-nosx:focus,.open>.dropdown-toggle.btn-nosx:hover { color: #fff; background-color: #79822b; border-color: #421F63}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.active,.btn-nosx:active,.open>.dropdown-toggle.btn-nosx {    background-image: none}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx .badge { color: #79822b; background-color: #fff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.disabled,.btn-nosx.disabled.active,.btn-nosx.disabled.focus,.btn-nosx.disabled:active,.btn-nosx.disabled:focus { background-color: #79822b; border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.disabled:hover,.btn-nosx[disabled],.btn-nosx[disabled].active,.btn-nosx[disabled].focus,.btn-nosx[disabled]:active { background-color: #79822b; border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx[disabled]:focus,.btn-nosx[disabled]:hover,fieldset[disabled] .btn-nosx,fieldset[disabled] .btn-nosx.active { background-color: #79822b; border-color: #79822b}</style>");
        $("head link[rel='stylesheet']").last().after("<style>fieldset[disabled] .btn-nosx.focus,fieldset[disabled] .btn-nosx:active,fieldset[disabled] .btn-nosx:focus,fieldset[disabled] .btn-nosx:hover { background-color: #79822b; border-color: #79822b}</style>");
        $("span.yt").replaceWith('<script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="UCWL5wy-b7964KZntax9Mfbg" data-layout="full" data-theme="blue" data-count="default"></div>')
        // Remove some annoying google ads
        $(".adsbygoogle").remove();
        // set the title to 〖ﻯƘ〗 Tag
        $("h2.title").replaceWith('<h2 class="title">ＣＬＡＮ〖ﻯƘ〗</h2>');
        // Leaderboard's name
        $("span.title").replaceWith('<span class="title"> 〖ﻯƘ〗ŦOP</span>');
       
    }
})();