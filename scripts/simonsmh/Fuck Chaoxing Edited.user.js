// ==UserScript==
// @name			Fuck Chaoxing Edited
// @namespace		xuyiming.open@outlook.com
// @description		解除超星自动暂停播放的限制并添加自动播放下一集的功能 by 依然独特
// @author			simonsmh
// @version			1.1.1
// @grant			none
// @run-at			document-start
// @require			https://greasyfork.org/scripts/18715-hooks/code/Hooks.js?version=126794
// @require			https://greasyfork.org/scripts/29782-docsready/code/docsReady.js?version=195016
// @include			*://*.chaoxing.com/knowledge/cards*
// @include			*://*.chaoxing.com/ananas/modules/video/index.html*
// @include			*://*.chaoxing.com/ananas/modules/work/index.html
// @include			*://*.chaoxing.com/ananas/modules/work/index.html*
// @match			*://*.chaoxing.com/knowledge/cards*
// @match			*://*.chaoxing.com/ananas/modules/video/index.html*
// @match			*://*.chaoxing.com/ananas/modules/work/index.html
// @match			*://*.chaoxing.com/ananas/modules/work/index.html*
// @license			BSD 2-Clause
// @homepageURL		https://gist.github.com/xymopen/eb65046644ff5cb7c0668e5d4f9607d1
// ==/UserScript==

( function () {
	"use strict";

	function hookJQuery( onPlayerInit, contextWindow ) {
		if ( !contextWindow ) {
			contextWindow = window;
		}

		// CXPlayer extends jQuery for its own APIs
		// so hook jQuery to modify these APIs.
		Hooks.set( contextWindow, "jQuery", function ( target, propertyName, ignored, jQuery ) {
			Hooks.set( jQuery.fn, "cxplayer", function ( target, propertyName, oldValue, newValue ) {
				return Hooks.apply( newValue, function ( target, thisArg, args ) {
					var config = args[ 0 ], $player;

					config.datas.pauseAdvertList = [];
					config.datas.preAdvertList = [];
					config.datas.isAutoPlayNext = true;
					config.datas.isDefaultPlay = true;

					if ( config.events &&
						config.events.onAnswerRight &&
						!config.events.onAnswerRight.toString()
							.replace( /(function .*?\(.*?\))/g, "" ).trim()		// remove function signifigure
							.replace( /^\{|\}$/g, "" )
							.replace( /\/\/.*(\r|\n|(\r\n))/g, "" )				// remove single line comment
							.replace( /\/\*.*\*\//mg, "" )						// remove multiple line comment
							.match( /^\s*$/ )
					) {
						console.debug( "onAnswerRight() is not empty. It's unsafe to block the resource URL." );
					}

					$player = Hooks.Reply.apply( arguments );

					$player.switchWindow = function () {
						/* empty */
						console.debug( "[Fuck Chaoxing]moocPlayer.switchWindow() is invoked." );
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
					/* empty */
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

		//if ( nextSelectionIndex < selections.length ) {
			//selections[ nextSelectionIndex ].click();
		//} else {
			( function clickNextChapter() {
				var chapters = contextDocument.querySelectorAll(
					"#coursetree .ncells h1," +
					"#coursetree .ncells h2," +
					"#coursetree .ncells h3," +
					"#coursetree .ncells h4," +
					"#coursetree .ncells h5," +
					"#coursetree .ncells h6"
				),
					curChapterIndex = findCurIdx( chapters ),
					nextChapterIndex = Array.prototype.findIndex.call( chapters, chapter => chapter.querySelector( ".orange01" ) ),
					nextChapter = chapters[ nextChapterIndex ],
					lastestChapterIndex = Array.prototype.findIndex.call( chapters, chapter => chapter.querySelector( ".orange01" ) ),
					lastestChapter = chapters[ lastestChapterIndex ];

				// Upon first entry there may already be a few chapters finished
				// Directly jump to the lastest chapter
				if ( lastestChapterIndex > curChapterIndex &&
					!lastestChapter.querySelector( ".lock" ) ) {
					lastestChapter.click();
				} else if ( nextChapterIndex < chapters.length ) {
					// Wait some time for the next chapter to unlock
					if ( nextChapter.querySelector( ".lock" ) ) {
						setTimeout( clickNextChapter, 1e3 );
					} else {
						nextChapter.click();
					}
				}
			} )();
		//}
	};

	function tryNext( contextDocument ) {
		// Check if we have finished current selection
		if ( window.parent.document.querySelector( ".ans-job-finished" ) ) {
			// Automatically switch to next chapter
			next( window.top.document );
		}
	};

	if ( ( /\/ananas\/modules\/video\/index.html/ ).test( window.location.pathname ) ) {
		hookJQuery( function ( $player, config ) {
			$player.bind( "onInitComplete", tryNext );

			// Automatically switch to next selection
			$player.bind( "onEnd", tryNext );
            
            $player.bind( "onError", function() {
				let state = [ "error", "playing", "paused", "hanging", "stop" ][ $player.getPlayState() ];
                
                if ( 4 === $player.getPlayState() ) {
                    window.location.reload();
                }
			} );

            /*
			[ "onInit", "onInitComplete", "onNotVideoUrl", "onGoPlay", "onShare", "onUnlock", "onTurnOff", "onPointStart", "onPointEnd", "onChangeLine", "onEnd", "onStart", "onDownload", "onPlayProgress", "onSendProgressSuccess", "onSendProgressError", "onError", "onRightIconClick", "onMovieDrag", "onPlay", "onPause", "onAnswerWrong", "onAnswerRight", "sendlogzt", "logFunc" ]
				.forEach( e => $player.bind( e, () => {
					let state = [ "error", "playing", "paused", "hanging", "stop" ][ $player.getPlayState() ];

					console.debug( `[Fuck Chaoxing]${ e } is triggered. Player is ${ state }.` );
				} ) );
                */
		} );
	} else if ( ( /\/ananas\/modules\/work\/index.html/ ).test( window.location.pathname ) ) {
		domReady( function () {
			frameReady( tryNext, document.querySelector( "#frame_content" ) );
		} );
	} else if ( ( /\/knowledge\/cards/ ).test( window.location.pathname ) ) {
		// parent frame of /ananas/modules/video/index.html or /ananas/modules/work/index.html
		// there are some pages where there is no such content frame
		domReady( function () {
			if ( !document.querySelector( "iframe" ) ) {
				next( window.top.document );
			}
		} );
	}
} )();
