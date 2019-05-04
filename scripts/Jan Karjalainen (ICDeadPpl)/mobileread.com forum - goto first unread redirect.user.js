// ==UserScript==
// @name       mobileread.com forum - goto first unread redirect
// @namespace  http://www.fmbv.nu/
// @version    0.2
// @description  mobileread.com forum - goes to first unread post.
// @match      http://www.mobileread.com/forums*
// @match      https://www.mobileread.com/forums*
// @copyright  2015, Jan Karjalainen
// @grant       none
// ==/UserScript==


(function() {

    try {

        textLink="View First Unread";

        nPage=-1;
        
	// opens 1.st such a link in tab

        for( i=0; i < document.links.length; i++ )

            if( document.links[ i ].innerHTML.match( textLink ))

		window.location.href=document.links[i].href
    }

    catch (e) {

        GM_log( 'mobileread.com forum - goto first unread Redirect - script exception: ' + e );
        alert ( 'mobileread.com - goto first unread Redirect - script exception: ' + e );

    }

}

)();
