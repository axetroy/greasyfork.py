// ==UserScript==
// @name         Tab Pro Player [Demo->FULL]
// @name:de         Tab Pro Player [Demo->FULL]
// @description  Unlocks the Ultimate-guitar player via userscript
// @description:de  Den Ultimate-guitar player per Userscript freischalten


// @namespace    https://greasyfork.org/de/users/7597-djamana
// @version      1.8
// @date    25.01.2017

// @author       Djamana
// @match        *://*.ultimate-guitar.com/*
// http://tabs.ultimate-guitar.com/p/pur/abenteuerland_guitar_pro.htm
// https://tabs.ultimate-guitar.com/print/267915
// http://www.ultimate-guitar.com/search.php?search_type=title&value=Dream+A+Little+Dream+Of+Me
// https://www.ultimate-guitar.com/tabs/chet_atkins_tabs.htm



// @match        *://*.911tabs.com/link/*
//http://www.911tabs.com/link/?5968705

// @grant        none

/*
   == History ==
    1.8 jan '17
      * Fixed version block was shown behind player
      * UG text-ad on prints
      
      
    1.7 jan '17
      * No fake links in versions tab / Top 100 / No fake player 
      * bugfix of 1.6 now also works in Firefox.
      
    1.6 jan '17
      * bugfixing #hide_player, $player_container


    1.5 oct '16
      * Rebuild version links - 'interactive' now really links to Pro Player and not to UG-ad site.
      * Print: Removed UG-Ads
      * Some more ads removing
    
*/

// ==/UserScript==

// Ink & Paper saver for printing
/* Delete this via Search'n'Replace
+ --------------------------------------------------------------------- +", "
| Ultimate Guitar Tabs Archive - your #1 source for tabs!               |", "
| http://www.ultimate-guitar.com/                                       |", "
|                                                                       |", "
| Over 1,000,000 guitar, guitar pro and bass tabs! Also lessons         |", "
| news and guitar forums!                                               |", "
+ --------------------------------------------------------------------- +", "

END

+--------------------------------------------------------------------------+
| This file is the author's own work and represents their interpretation   |
| of the song. You may only use this file for private study, scholarship,  |
| or research.                                                             |
+--------------------------------------------------------------------------+

Ultimate-Guitar.Com © 2017	        
*/


try {

    $('.print-visible').remove();

    $('.js-ug-alert-cookie').remove();
    
}catch(e) {}

try {
    var pre  =document.querySelector("pre"); //$("body>pre")
    
    var RE_UGStartStopLine=/\n+\+ ?-+- ?\+\n+/.source;
    
    pre.innerHTML = pre.innerHTML
        .replace( new RegExp(
            "(?:\n*END)?" 
          + 
          RE_UGStartStopLine + "[^+]*" + RE_UGStartStopLine
          + 
            "(?:Ultimate.*)?"
          ,"g")
        , "");
    
}catch(e) {}


try {
    links_org = $(".versions_column:nth(0)>ul a");
    links_ads = $(".versions_column:nth(1)>ul a");

    for (var i = links_org.length; i--; ) {
        try {

            url = links_org[i].href;

            if (url == "#") url = location.href;

            url = url.replace(/_(:?tab|guitar_pro|power_tab|ukulele_crd|crd|btab|)\.htm/,"_guitar_pro.htm");

            links_ads[i].href = url;
            links_ads[i].onClick="";
        }catch(e) {}

    }
}catch(e) {}


// no Nasty Play/Stop nag..
// #demopop ->"Get full version now!"
// #hide_player -> grey blocker rectangle to cover player
// #play_demo ->Old

$('#demopop,#hide_player').remove();

// ...and other nasty space eaters 
$('.trial_mess,.js-survey-banner').remove();

// NO 'FakePlayer' applies also for normal tab's
$('.b-player-fake-side, .b-player-panel').remove();
$('.js-tab-ad-btn_tabprotools').remove(); //newer version


// NO 'Play <Blah> in Tab Pro Player' (for 911tabs.com only)
$('.tab-links').remove();
// 122px - (42px Banner) -> 80px
$('.tab-iframe').css('padding-top', '80px');



// And the main thing:
try {
    playerParams.demoMode  = false;
    
    playerParams.autoPlay   = true;

    // bugfix 1.6
    window.$player_container = $('#gpa-container').length > 0 ? $('#gpa-container') : $('.js-tp-player-wrapper');

    // comment in if bugfix 1.6 doesn't work (play button doesn't work):
/*    
    playerParams.onSoundsLoaded =
    playerParams.onFlashNotesPlayerReady =
    playerParams.onApplicationReady =
    playerParams.onStartPlay = 
    playerParams.onStopPlay = 
    playerParams.onEndPlay  =  function(){
            // костыль чтоб прятать выпадающее меню от поиска
            //$('div.searchsel').css('z-index', 250000);
            //$('div.t_header').css('z-index', 100);
    };
 */   
    
            $('.tp--player-wrapper').css('z-index', 0); 
}catch(e) {
    // alert (e); 
}


// Remove fake links from search results
// ... and versions container

var pluspattern="a[href*=plus]"
try {
    var pluslinks = $(".js-tp_link.song, .ugtab2, li>div>" + pluspattern).parent();
    pluslinks.nextAll().remove();
    pluslinks.remove();
}catch(e) {}

try {
    //  .adv_bottom, .pro_power is from Pro Player
    $('.ads_footer, .ads_v, .adv_bottom, .pro_power, .top_play_list, .top_play_list_ico, ' + pluspattern).remove();
}catch(e) {}


// Some more ads fixing
// note the .parent() on 'undefined' may raise an error so ...
try {
    $('.head_ad_UG').parent().remove();
}catch(e) {}

//$('td[style*=min-height]').remove()
// ...don't put any more code below (it might get executed only once or never)
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// Na wow !!! 
// Bin ich da jetzt schon Drin oder was?
// Das war ja easy.
// :)