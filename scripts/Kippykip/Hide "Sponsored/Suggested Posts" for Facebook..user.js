// ==UserScript==
// @name         Hide "Sponsored/Suggested Posts" for Facebook.
// @namespace    http://kippykip.com/
// @version      1.0
// @description  Get rid of those annoying suggested posts.
// @author       Kippykip
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

//Whenever the page changes
document.addEventListener("DOMNodeInserted", SearchPosts, false);
function SearchPosts()
{
    var TMP_Post = document.getElementsByClassName('_4ikz');
    for(var i = 0; i < TMP_Post.length; i++)
    {
        if(TMP_Post[i].getElementsByClassName('uiStreamSponsoredLink')[0] !== undefined)
        {
            //Some old debugging code, you can play with it if you want.
            //alert ("FOUND AD!: " + TMP_Post[i].getElementsByClassName('uiStreamSponsoredLink')[0].innerHTML);
            //TMP_Post[i].getElementsByClassName('uiStreamSponsoredLink')[0].innerHTML = 'SHITTY FUCKING DUMB CUNT AD';
            TMP_Post[i].remove();
        }
    }

}