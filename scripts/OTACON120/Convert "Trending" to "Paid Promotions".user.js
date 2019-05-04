// ==UserScript==
// @name            Convert "Trending" to "Paid Promotions"
// @namespace       OTACON120
// @author          OTACON120
// @license         http://opensource.org/licenses/MIT
// @version         1.0.0
// @description     Changes the "Trending" tab on YouTube to a more accurate text: "Paid Promotions" (as inspired by h3h3productions)
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=otacon120%40gmail%2ecom&lc=US&item_name=OTACON120&no_note=0&cn=Comments%3a&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted
// @match           *://www.youtube.com/*
// @grant           none
// ==/UserScript==
var trendingInterval,
	guideBtn = document.getElementById( 'appbar-guide-button' );

if ( guideBtn ) {
	trendingInterval = setInterval( function() {
		var trendingGuideItem   = document.getElementById( 'trending-guide-item' ),
			trendingLink        = trendingGuideItem.getElementsByClassName( 'guide-item' )[0],
			trendingDisplayName = trendingLink.getElementsByClassName( 'display-name' )[0];

		if ( trendingDisplayName ) {
			trendingLink.title              = 'Formerly Known as "Trending"';
			trendingDisplayName.textContent = 'Paid Promotions';
			clearInterval( trendingInterval );
		}
	}, 500 );
}
