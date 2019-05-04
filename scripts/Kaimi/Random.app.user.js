// ==UserScript==
// @name         Random.app
// @version      0.4
// @match        https://yap.by/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @description  Predictable winner generation for Random.app (VKontakte)
// @author       Kaimi
// @homepage     https://kaimi.io/2016/01/tampering-vk-contest-results/
// @namespace https://greasyfork.org/users/228137
// ==/UserScript==

// Winner ID on VK.com
var winnerUid = [75292250];
var f_ptr = VK.api;

vk_api = function(method, options, callback)
{
    if(method == 'getProfiles')
    {
        if(options.uids.indexOf(',') == -1)
            options.uids = winnerUid.shift();
    }

    return f_ptr(method, options, callback);
};

$(document).on
(
    'mouseover',
    '.btn-default',
    function ()
    {
        VK.api = vk_api;
    }
);