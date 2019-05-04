// ==UserScript==
// @name         huomao no login HD
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       https://steamcn.com/suid-466640, https://steamcommunity.com/profiles/76561198137433074/
// @match        http://www.huomao.com/*
// @match        https://www.huomao.com/*
// @grant        none
// ==/UserScript==

(function() {
    $(document).ready(function(){
        var delLoginPopItvl = setInterval(function(){
            if($('div.h5plauer_login_check.show').length > 0){
                $('div.h5plauer_login_check.show').remove();
                clearInterval(delLoginPopItvl);
            }
        }, 1000);

        window.hmh5.noLoginStateSave = function(){return false;};
        $('div#chat2-box').attr("class", "guess-box hidden");
    });
})();
