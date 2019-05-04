// ==UserScript==
// @name         YouTube - Maximise Profile Pictures
// @author       RandomUsername404
// @namespace    https://greasyfork.org/en/users/105361-randomusername404
// @version      1.0
// @description  Mouseover a profile picture to display it fullscreen, in the highest quality available.
// @run-at       document-start
// @include      https://www.youtube.com/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// @icon         https://www.youtube.com/yts/img/favicon_96-vflW9Ec0w.png
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function($) {

    $(document).on("mouseover", ".yt-thumb-square, #author-thumbnail", function (event) {

        var pictureLink = $(this).find('img').attr('src');
   	 	var toRemove = pictureLink.split("/photo.jpg").shift().split("/").pop() + "/";
    	pictureLink = pictureLink.replace(toRemove,"");

    	var image = document.createElement("img");
        image.src = pictureLink;
        image.id = "profilePicture";
        $(image).css( {"position":"fixed","height":$(window).height(),"top":"50%","left":"50%","transform":"translate(-50%, -50%)","z-index":"5"} );
        $("html").append(image);

        $("body").css("opacity","0.2");

    });

    $(document).on("mouseout", ".yt-thumb-square, #author-thumbnail", function (event) {

        document.getElementById("profilePicture").remove();
        $("body").css("opacity","1");

    });
});