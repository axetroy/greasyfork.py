// ==UserScript==
// @name        Enable Animated Avatars on ComicVine
// @namespace   http://baron-chronos.tumblr.com/
// @description Those who use gifs as their avatars on ComicVine, will now have their avatars' animations activated.
// @include     *comicvine.gamespot.com*
// @version     1
// @grant       GM_addStyle
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function(){
  $("div.js-message").each(function(){ //Iterates through every post on the current page.
    var currentPost = $(this);
    var userName = currentPost.find("div.message-wrap > div.message-inner > div.message-title > a.message-user"); //Retrieves the name of the user whose post it is.
    var currentAvatar = currentPost.find("div.avatar-user > a.avatar > img"); //Gets the current avatar.
    if (currentAvatar.attr("src").indexOf(".gif") > -1) { //if the avatar is a gif, then...
      var animatedAvatar = currentAvatar.attr("src").replace("square_avatar", "square_medium"); //ComicVine, on uploading an animated gif, creates multiple, different-sized versions of the image, some of which (such as the avatar-sized) are not animated. This line of code gets the URL of an animated, if larger, version of the avatar.
      currentAvatar.attr("src", animatedAvatar); //This line replaces the avatar with its animated counterpart.
    }
  });
});