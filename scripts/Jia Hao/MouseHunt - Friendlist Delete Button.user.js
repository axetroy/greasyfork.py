// ==UserScript==
// @name         MouseHunt - Friendlist Delete Button
// @author       Jia Hao (Limerence#0448 @Discord)
// @namespace    https://greasyfork.org/en/users/165918-jia-hao
// @version      1.5
// @description  Adds a handy "Delete friend" button to your friendlist so you don't have to go into every single profile to unfriend!
// @include      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include      http://www.mousehuntgame.com/*
// @include      https://www.mousehuntgame.com/*
// ==/UserScript==

function initDeleteButton() {

    //Loop through each friend on current page and add the delete friend button
    $(".friendsPage-friendRow-actions").each(function(index, friend) {

        //Initialise the custom button, as well as getting the snuid of current friend index
        var snuid = $(friend).find("a").data("snuid");
        var deleteButton = $("<div class='friend-buttonGroup'><a class='friend-actionButton mousehuntTooltipParent delete default' style='background:url(https://imgur.com/aEAD92b.png);width:60px;height:60px'><div class='mousehuntTooltip top tight noEvents'><div class='friend-actionButton-status default'>Remove friend</div><div class='friend-actionButton-status complete'>Unfriended!</div><div class='mousehuntTooltip-arrow'></div></div></a></div>");
        var fbButton = $("<div class='friend-buttonGroup'><a class='friend-actionButton mousehuntTooltipParent fb default' style='background:url(https://imgur.com/8zvcqVW.png);width:50px;height:50px;margin-bottom:2.5px;'><div class='mousehuntTooltip top tight noEvents'><div class='friend-actionButton-status default'>Facebook Profile</div><div class='mousehuntTooltip-arrow'></div></div></a></div>");

        deleteButton.on('click', function () {

            if ($(this).hasClass('complete')) {
                return false;
            }

            //Deletes friend and adds a checkmark
            hg.utils.User.deleteFriend(snuid, function(){}, function(){});
            $(this).removeClass('default');
            $(this).addClass('complete');

        });

        fbButton.on('click', function() {

            window.open('https://facebook.com/' + snuid);

        });

        //Adds the unfriend button after the raffle button
        $(friend).append(deleteButton);
        $(friend).append(fbButton);

    });
}

$(document).ready(function() {

    //Non AJAX trigger (e.g refreshing on the friends.php page)
    if ((window.location.href).includes("friends.php")) {
        initDeleteButton();
    }

    //AJAX trigger (e.g switching to friend's tab)
    var handle = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            var jsonString = JSON.parse(this.responseText);
            //See if user is at friends page
            if (jsonString.page_title === "MouseHunt | Friends" || jsonString.friends) {
                //If delete buttons already exist on the page, don't create any more. (e.g as a result from switching between friend request tabs)
                if ($(".delete")[0]) {
                    return false;
                }
                initDeleteButton();
            }
        });
        handle.apply(this, arguments);
    };

});