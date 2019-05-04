//
// ==UserScript==
// @name           HWM Durability Artifacts Green Color ( HWM cyfral strength )
// @author         A. N. Onim
// @collaborator   sw.East
// @description    Показывает прочность артов + прогресс бар
// @namespace      https://openuserjs.org/users/chesheerk/scripts
// @homepageURL    https://www.heroeswm.ru/pl_info.php?id=3541252
// @supportURL     https://www.heroeswm.ru/pl_info.php?id=3541252
// @version        0.4
// @icon           http://i.imgur.com/GScgZzY.jpg
// @include        *//*.heroeswm.*/home.php
// @include        *//178.248.235.15/home.php
// @include        *//*.lordswm.*/home.php
// @include        *//*.heroeswm.*/pl_info.php*
// @include        *//178.248.235.15/pl_info.php*
// @include        *//*.lordswm.*/pl_info.php*
// @include        *//*.heroeswm.*/inventory.php
// @include        *//178.248.235.15/inventory.php
// @include        *//*.lordswm.*/inventory.php
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant          GM_addStyle
// @copyright      2013-2018, sw.East (https://www.heroeswm.ru/pl_info.php?id=3541252)
// @license        MIT
// @run-at         document-end
// ==/UserScript==

/**
 * ============= Style =============
 */

GM_addStyle ( `

div[id^='slot'] {
    overflow: hidden;
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
}
div[id^='slot'] img {
    display: block;
}
div[id^='slot'] a img {
    -webkit-transition: all .2s linear;
       -moz-transition: all .2s linear;
         -o-transition: all .2s linear;
        -ms-transition: all .2s linear;
            transition: all .2s linear;
}
div[id^='slot']:hover a img {
    -webkit-transform: scale(1.05,1.05);
       -moz-transform: scale(1.05,1.05);
         -o-transform: scale(1.05,1.05);
        -ms-transform: scale(1.05,1.05);
            transform: scale(1.05,1.05);
    opacity: 1;
}
.cyfral_bar_wrap {
    width: 16px;
    margin: 0;
    position: absolute;
    background-color: #727272;
    z-index: 1;
    text-decoration: none !important;
    -webkit-box-shadow: 1px 1px 1px 0 rgba(114,114,114,1);
       -moz-box-shadow: 1px 1px 1px 0 rgba(114,114,114,1);
            box-shadow: 1px 1px 1px 0 rgba(114,114,114,1);
}
.progress_bar {
    height: 16px;
    z-index: 1;
    float: left;
    text-decoration: none !important;
    background-color: #8bc34a;
    -moz-box-shadow: inset 0 0 1px #ddd;
    opacity: .9;
    -moz-transition: all 1s ease;
    -moz-animation-duration: 1s;
    -moz-animation-name: slidein;
}
.bar:hover {-moz-animation: animate-stripes 3s linear infinite;}
div #breadcrumbs, #breadcrumbs li.subnav {z-index: 100 !important;}
@-moz-keyframes slidein {
    from {
        width: 100%;
    }
}
@-moz-keyframes animate-stripes {
    0% {
        background-position: 0 0;
    } 100% {
        background-position: 0 22px;
    }
}
.cyfral_bar {
    color: #fff;
    margin: -1px 0 0 -2px;
    padding: 1px;
    font-size: 10px;
    text-align: center;
    text-decoration: none !important;
    cursor: pointer;
    z-index: 2;
    position: absolute;
    text-decoration: none;
    height: 16px;
    width: 16px;
    -ms-transition: opacity .4s ease-in-out, visibility .4s ease-in-out;
}
div[id^='slot'] a {text-decoration: none;}
div[id^='slot'] img {display: block;}
div[id^='slot'] img {display: block;}

` );

/* Style End */

var url = 'https://www.heroeswm.ru/' ;
var url_cur = location.href ;
var item_hard_regexp = /: (\d+)\/(\d+)/
var item_name_regexp = /uid=(\d+)/
var item_id_regexp = /pull_off=(\d+)/



if( url_cur == 'https://www.heroeswm.ru/inventory.php' || url_cur == 'https://www.lordswm.com/inventory.php' )
{
    for (var loop = 0; loop < 2; loop++) {
	if (loop == 1) {
		var els = getI( "//img[contains(@src, 'i/transparent.gif')]" ) ;
	} else {
		var els = getI( "//img[contains(@src, 'i/artifacts/')]" ) ;
	}
	var elo = '' ;
	for( var i = 0; i < els.snapshotLength; i++ )
	{
		var el = els.snapshotItem(i);
		an = item_id_regexp.exec( el.href ) ;
		if( an )
		{
			if( elo == an[1])
				continue
			else
				elo = an[1]
		}
		if (el.previousSibling || el.parentNode.previousSibling || el.parentNode.parentNode.previousSibling || (loop > 0 && el.parentNode.parentNode.parentNode.previousSibling)) {
			continue;
		}
		p = item_hard_regexp.exec( el.parentNode.innerHTML ) ;
        var cyfral = Math.round(p[1] * 100 / p[2]);	
		if (p) {
	  
		d = document.createElement( 'div' );
		d.innerHTML = "<div class=\"cyfral_bar_wrap\">"+
                        "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                        "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+        
                     "</div>"; 

		el.parentNode.insertBefore( d , el ) ;
		}
	}
    }
    if (unsafeWindow.arts_fud) {
      var length = unsafeWindow.arts_fud.length;
      for (i = 0; i < length; i++) {
  	  var p = item_hard_regexp.exec( unsafeWindow.arts_fd_none[i] ) ;
      var cyfral = Math.round(p[1] * 100 / p[2]);

	  var str = "<div class=\"cyfral_bar_wrap\">"+
                        "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                        "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+        
                     "</div>"; 
	  if (unsafeWindow.arts_fud[i]) unsafeWindow.arts_fud[i] = str + unsafeWindow.arts_fud[i];
	  if (unsafeWindow.arts_fd_ok[i]) unsafeWindow.arts_fd_ok[i] = str + unsafeWindow.arts_fd_ok[i];
	  if (unsafeWindow.arts_fd_none[i]) unsafeWindow.arts_fd_none[i] = str + unsafeWindow.arts_fd_none[i];
      }
    }
} else
{
	var els = getI( "//a[contains(@href, 'art_info.php')]" ) ;
	var elo = '', status ;
	for( var i = 0; i < els.snapshotLength; i++ )
	{
		var el = els.snapshotItem(i);
		an = item_name_regexp.exec( el.href ) ;
		if( an )
		{
			if( elo == an[1] )
				continue
			else
				elo = an[1]
		}
		p = item_hard_regexp.exec( el.parentNode.innerHTML ) ;
        var cyfral = Math.round(p[1] * 100 / p[2]);
		if (p) {
			d = document.createElement( 'div' );
			d.innerHTML = "<div class=\"cyfral_bar_wrap\">"+
                              "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                              "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+
                          "</div>";

			el.parentNode.insertBefore( d , el ) ;
		}
	}
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $( id ) { return document.getElementById( id ); }