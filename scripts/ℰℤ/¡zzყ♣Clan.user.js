// ==UserScript==
// @name         ¡zzყ♣Clan
// @description  ¡zzყ♣Extension Edited by ℰℤ
// @version      1.1
// @author       ℰℤ
// @match        https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @namespace
// @namespace https://greasyfork.org/users/21673
// ==/UserScript==
 
window.stop(), document.documentElement.innerHTML = null, GM_xmlhttpRequest({
    method: "GET",
    url: "http://extension.¡zzყ♣.com",
    onload: function(e) {
    document.open(), document.write(e.responseText), document.close()
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
        $(".agario-profile-panel:nth-last-child(1):not(.hotkeys)").before('<div id="textBox" class="agario-panel agario-side-panel">Edited By NEL99</div>')
        $("div#mainPanel.agario-panel").append('<br>').append('<br>').append('<br>').append('<hr>').append('<br>').append('<div id="privateServerBox" class=""></div>')
        //$("div#mainPanel.agario-panel").append('<input type="text" placeholder="Party token" class="partyToken form-control">');
        //$("div#mainPanel.agario-panel").append('<button class="btn btn-primary joinParty" onclick="joinParty($(".partyToken").val());">Entrar</button>');
        //$("div#mainPanel.agario-panel").append('<button class="btn btn-success createParty" style="margin-bottom: 5px;" onclick="$(\'#helloContainer\').attr(\'data-party-state\', (\'3\'));createParty();">Crear nueva party</button>');
        $(".agario-profile-panel:nth-last-child(1):not(.hotkeys)").after('<div id="CikandSiWYTChannelBox" class="agario-panel agario-side-panel"></div>');
        // Add SorryiWin and Cik YT Channel Box
        $("#CikandSiWYTChannelBox").append('<script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="UCZo9WmnFPWw38q65Llu5Lug" data-layout="full" data-theme="dark" data-count="default" style="text-indent: 0px; margin: 0px; padding: 0px; border-style: none; float: none; line-height: normal; font-size: 1px; vertical-align: baseline; display: inline-block; width: 163px; height: 48px; background: transparent;"><iframe frameborder="0" hspace="0" marginheight="0" marginwidth="0" scrolling="no" style="position: static; top: 0px; width: 163px; margin: 0px; border-style: none; left: 0px; visibility: visible; height: 48px;"></div>');
        $("#privateServerBox").append('<select id="privateServer" class="form-control privateServer" style="height: 35px; display: block; width: 100; float: left; margin-bottom: 10px"></select>');
        // Set the first value in the input select dropdown as a disabled label option
           // Add the connect button after the select dropdown, this updates the partyToken for minimap/chat in private servers!
        $("#privateServer").after('<button class="btn btn-nosx joinPrivate1" style="margin-bottom: 12px" onclick="$(\'.partyToken\').val($(\'#privateServer\').val()); connect($(\'#privateServer\').val());">Connect</button>');
        // Attempt to grab the list of private servers currently running
        $.getJSON("", function(json){
            // loop through the json array returned
            $.each(json, function(i, obj){
                // add each option name and associated value to our privateserver dropdown
            });
        })
        // handle failures loading the server list with an error message
        // add some css style formatting for our new objects and classes
        $("head link[rel='stylesheet']").last().after("<style>.joinPrivate1 { width: 100%; background: #ffc400!important}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.joinPrivate1:hover { background: #c29500!important}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.focus,.btn-nosx:focus {    color: #fff;    background-color: #79822b;    border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx:hover {    color: #fff;    background-color: #8b9531;    border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.active.focus,.btn-nosx.active:focus,.btn-nosx.active:hover,.btn-nosx:active.focus,.btn-nosx:active:focus { color: #fff; background-color: #79822b; border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx:active:hover,.open>.dropdown-toggle.btn-nosx.focus,.open>.dropdown-toggle.btn-nosx:focus,.open>.dropdown-toggle.btn-nosx:hover { color: #fff; background-color: #79822b; border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.active,.btn-nosx:active,.open>.dropdown-toggle.btn-nosx {    background-image: none}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx .badge { color: #79822b; background-color: #fff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.disabled,.btn-nosx.disabled.active,.btn-nosx.disabled.focus,.btn-nosx.disabled:active,.btn-nosx.disabled:focus { background-color: #79822b; border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx.disabled:hover,.btn-nosx[disabled],.btn-nosx[disabled].active,.btn-nosx[disabled].focus,.btn-nosx[disabled]:active { background-color: #79822b; border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>.btn-nosx[disabled]:focus,.btn-nosx[disabled]:hover,fieldset[disabled] .btn-nosx,fieldset[disabled] .btn-nosx.active { background-color: #79822b; border-color: #ffffff}</style>");
        $("head link[rel='stylesheet']").last().after("<style>fieldset[disabled] .btn-nosx.focus,fieldset[disabled] .btn-nosx:active,fieldset[disabled] .btn-nosx:focus,fieldset[disabled] .btn-nosx:hover { background-color: #79822b; border-color: #ffffff}</style>");
        $("span.yt").replaceWith('<script src="https://apis.google.com/js/platform.js"></script><div class="g-ytsubscribe" data-channelid="UCZo9WmnFPWw38q65Llu5Lug" data-layout="full" data-theme="dark" data-count="default"></div>')
        // Remove some annoying google ads
        $(".adsbygoogle").remove();
        // set the title to Agario Tag
        $("h2.title").replaceWith('<h2 class="title">AgarPlus.io v2</h2>');
        // Leaderboard's name
        $("span.title").replaceWith('<span class="title">Agarplus v2</span>');   $("#privateServer").append('<option value="Private Servers" disabled default selected style="display: none;">Servidores Privados</option><option value="ws://dmr.secureobscure.com:4444">Server 1</option><option value="ws://dmr.secureobscure.com:4001">Server 2</option><option value="ws://dmr.secureobscure.com:4002">Server 3</option>');
  
       
    }
})();