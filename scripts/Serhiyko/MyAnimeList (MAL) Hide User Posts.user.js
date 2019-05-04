// ==UserScript==
// @name        MyAnimeList (MAL) Hide User Posts
// @namespace   http://rainulf.ca/userscripts
// @description Annoying user posts? Block / hide them!
// @include     http://*myanimelist.net/forum/?topicid=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require     http://greasyfork.org/scripts/2855/code/GM_config.js
// @grant       none
// @version     1.1.2
// ==/UserScript==

$.noConflict();

GM_config.init("MAL Hide User Posts - Settings", {
    'blockedUsers': {
        'section': ['Hide user posts', 'Enter one user per line please?'],
        'type': 'textarea',
        'default': '',
        'cols': 20,
        'rows': 10
    }
});



var malHide = (function() {
    var blockedUsers = [], hiddenPosts = 0
      , // -->

    Init = function() {
        var confText = GM_config.get('blockedUsers');
        blockedUsers = confText.split("\n");
        
        jQuery("#myanimelist").append(jQuery("<div></div>")
                .attr("id", "malHideButtons")
                .attr("style", "position:fixed;bottom:0;right:0;"));

        jQuery("#malHideButtons").append(jQuery("<button></button>")
                .attr("class", "inputButton")
                .text("MAL Hide Settings")
                .click(function(){
                    GM_config.open();
                })
        );

        traversePosts();
    },

    isBlocked = function(username) {
        var i = 0;

        for(i in blockedUsers) {
            if(blockedUsers[i] === username) {
                return true;
            }
        }
        return false;
    },

    traversePosts = function() {
        jQuery(".forum_border_around").each(function(index){
            var currentUsername = "", temp = "";

            currentUsername = jQuery("table tr td div a strong", this).text();
            // Posts of blocked users
            if(isBlocked(currentUsername)) {
                hiddenPosts++;
                jQuery(this).attr("class", "toHide");
                // Hide em
                jQuery(this).toggle();
                // Set grey bg
                jQuery("table tr *", this).css("background-color", "#808080");
                // Add fancy to unhide button
                jQuery("table tr td:eq(0)", this)
                    .append("<br>")
                    .append(
                        jQuery("<button></button>")
                        .attr("class", "inputButton")
                        .text("Unhide Posts")
                        .click(function(){
                            temp = jQuery(this).parent().find("div a strong").text();
                            blockedUsers.splice(blockedUsers.indexOf(temp), 1);
                            GM_config.set('blockedUsers', blockedUsers.join("\n"));
                            GM_config.open(); // field[i].node is set to null, so it cannot be save directly
                        })
                    );
            // Posts of non-blocked users
            } else {
                // Add fancy to hide button
                jQuery("table tr td:eq(0)", this)
                    .append("<br>")
                    .append(
                        jQuery("<button></button>")
                        .attr("class", "inputButton")
                        .text("Hide Posts")
                        .click(function(){
                            temp = jQuery(this).parent().find("div a strong").text();
                            blockedUsers.push(temp);
                            GM_config.set('blockedUsers', blockedUsers.join("\n"));
                            GM_config.open(); // field[i].node is set to null, so it cannot be save directly
                        })
                    );
            }
        });

        // Add toggle for hidden posts
        if(hiddenPosts > 0) {
            jQuery("#malHideButtons").append(
                    jQuery("<button></button>")
                    .attr("class", "inputButton")
                    .text("Toggle " + hiddenPosts + " hidden post" + (hiddenPosts > 1 ? "s" : ""))
                    .click(function(){
                        jQuery(".toHide").toggle();
                    })
            );
        }
    }; // <--

    return {
        init: Init
    }
})();

jQuery(document).ready(function() {
    malHide.init();
});