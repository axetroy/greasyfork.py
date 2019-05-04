// ==UserScript==
// @name			更加人性化的【广大网络教学平台】
// @namespace		zyb_1998@outlook.com
// @description		解除超星平台自动暂停播放的限制（适用于广州大学，也可能适用于其他大学）
// @author			WJXXBSH
// @version			1.52
// @run-at			document-start
// @grant			none
// @require			https://greasyfork.org/scripts/18715-hooks/code/Hooks.js?version=126794
// @require			https://greasyfork.org/scripts/29782-docsready/code/docsReady.js?version=195016
// @include			*://mooc1-1.chaoxing.com/*
// @match			*://mooc1-1.chaoxing.com/*
// @license			BSD 2-Clause
// @homepageURL		https://github.com/WJXXBSH/Humanized-GZHU-Network-teaching-platform/
// ==/UserScript==

( function () {
	"use strict";
	function hookJQuery( onPlayerInit, contextWindow ) {
		if ( !contextWindow ) {
			contextWindow = window;
		}
		Hooks.set( contextWindow, "jQuery", function ( target, propertyName, ignored, jQuery ) {
			Hooks.set( jQuery.fn, "cxplayer", function ( target, propertyName, oldValue, newValue ) {
				return Hooks.apply( newValue, function ( target, thisArg, args ) {
					var config = args[ 0 ], $player;
					config.datas.pauseAdvertList = [];
					config.datas.preAdvertList = [];
					config.datas.isAutoPlayNext = true;
					config.datas.isDefaultPlay = true;
					config.datas.enableFastForward = true;
					config.datas.errorBackTime = false;
					$player = Hooks.Reply.apply( arguments );
					$player.switchWindow = function () {
					};
					$player.bind( "onPause", function () {
						$player.playMovie();
					} );
					onPlayerInit( $player, config );
					return $player;
				} );
			} );
			Hooks.set( jQuery.fn, "pauseMovie", function ( target, methodName, oldValue, newValue ) {
				return function () {
				};
			} );
			return Hooks.Reply.set( arguments );
		} );
	};
	function next( contextDocument ) {
		var selections, nextSelectionIndex;
		function findCurIdx( nodeList ) {
			return Array.from( nodeList ).findIndex( function ( chapter ) {
				return chapter.classList.contains( "currents" );
			} );
		};
		contextDocument = contextDocument || document;
		selections = contextDocument.querySelectorAll( "#mainid .tabtags span" );
		nextSelectionIndex = findCurIdx( selections ) + 1;
	};
	function tryNext( contextDocument ) {
		if ( window.parent.document.querySelector( ".ans-job-finished" ) ) {
			next( window.top.document );
		}
	};
	if ( ( /\/ananas\/modules\/video\/index.html/ ).test( window.location.pathname ) ) {
		hookJQuery( function ( $player, config ) {
			$player.bind( "onInitComplete", tryNext );
			$player.bind( "onEnd", function ( event, index, config ) {
				var executed = false;
				window.jQuery( document ).ajaxComplete( function () {
					if ( !executed ) {
						executed = true;
						tryNext();
					}
				} );
			} );
            $player.bind( "onError", function() {
				let state = [ "error", "playing", "paused", "hanging", "stop" ][ $player.getPlayState() ];
                if ( 4 === $player.getPlayState() ) {
                    window.location.reload();
                }
			} );
		} );
	}
	else if ( ( /\/ananas\/modules\/work\/index.html/ ).test( window.location.pathname ) ) {
		domReady( function () {
			frameReady( tryNext, document.querySelector( "#frame_content" ) );
		} );
	}
	else if ( ( /\/knowledge\/cards/ ).test( window.location.pathname ) ) {
		domReady( function () {
			if ( !document.querySelector( "iframe" ) ) {
				next( window.top.document );
			}
		} );
	}
	/*function nextChapter() {
		var document = window.document,
			chapters = document.querySelectorAll(
				"#coursetree .ncells h1," +
				"#coursetree .ncells h2," +
				"#coursetree .ncells h3," +
				"#coursetree .ncells h4," +
				"#coursetree .ncells h5," +
				"#coursetree .ncells h6"
			),
			lastestChapter = Array.prototype.find.call( chapters, function ( chapter ) {
				return !chapter.querySelector( ".blue" ) && !chapter.querySelector( ".lock" );
			} );
		if ( lastestChapter ) {
			lastestChapter.click();
			return true;
		}
		else {
			return false;
		}
	}*/
} )();
