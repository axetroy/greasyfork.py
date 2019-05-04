// ==UserScript==
// @name           NJPW World Infinite Video Scrolling
// @version        1.0.5.4
// @description    Infinite scrolling for the NJPW World video library, powered by Metafizzy's Infinite-Scroll.js
// @namespace      http://about.me/daveyjacobson
// @author         Davey Jacobson <daveyjake21@gmail.com>
// @match          *://njpwworld.com/search/*
// @include        *://njpwworld.com/search/tag/mic_82*
// @require        https://unpkg.com/infinite-scroll@3/dist/infinite-scroll.pkgd.min.js
// @icon           https://njpwworld-img-cache2.akamaized.net/favicon.ico
// @grant          none
// @noframes
// ==/UserScript==
(function( win, undefined ) {
    'use strict';

    // Standard globals.
    var doc  = document,
        html = doc.documentElement,
        head = doc.head,
        body = doc.body;

    // Begin NJPW Infinite Scroll.
    var njpwInfScroll = {
        latestUrl: 'latest?page=',
        englishUrl: 'mic_82?page=',
        containerParent: '.contents-left',
        container: '.second-movie-box',
        target: '.movieArea',
        paginate: '.pager',
        nextPage: 'a.next',
        pageLoadStatusClass: '.page-load-status',
        pageLoadStatus: '<style id="infAnimation">.loader-wheel{font-size:64px;position:relative;height:1em;width:1em;padding-left:.45em;overflow:hidden;margin:0 auto;animation:loader-wheel-rotate .5s steps(12) infinite}.loader-wheel i{display:block;position:absolute;height:.3em;width:.1em;border-radius:.05em;background:#333;opacity:.8;transform:rotate(-30deg);transform-origin:center .5em}@keyframes loader-wheel-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}</style><p class="infinite-scroll-request"><div class="loader-wheel"><i><i><i><i><i><i><i><i><i><i><i><i></i></i></i></i></i></i></i></i></i></i></i></i></div></p><p class="infinite-scroll-last">End of content</p><p class="infinite-scroll-error">No more pages to load</p>',

        /**
         * jQuery's `$.extend` in pure vanilla JS.
         *
         * @author Chris Ferdinandi <chris@gomakethings.com>
         * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend}
         *
         * For a deep extend, set the `deep` argument to `true`.
         */
        extend: function () {
            // Variables
            var extended = {},
                deep = false,
                i = 0,
                length = arguments.length;

            // Check if a deep merge
            if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
                deep = arguments[0];
                i++;
            }
            // Merge the object into the extended object
            var merge = function (obj) {
                for ( var prop in obj ) {
                    if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                        // If deep merge and property is an object, merge properties
                        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                            extended[prop] = extend( true, extended[prop], obj[prop] );
                        } else {
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };
            // Loop through each object and conduct a merge
            for ( ; i < length; i++ ) {
                var obj = arguments[i];
                merge(obj);
            }

            return extended;
        },

        /**
         * New Mutation Observer
         *
         * @memberof njpwInfScroll
         * @function
         * @uses     njpwInfScroll#parseArgs
         *
         * @param {Object} args {
         *      Default function arguments.
         *
         *      @type {String}          targetNode Element selector string.
         *      @type {Function|String} callback   Custom callback function.
         *      @type {Bool}            foundation Checks if `callback` is Foundation selector.
         * }
         */
        mutant: function( args ) {
            var defaults = {
                'targetNode': '',
                'callback': '',
                'childList': true,
                'attributes': false,
                'subtree': true
            };

            args = this.parseArgs( args, defaults );

            // Check for any abnormalities.
            var // Make sure we know the node selector we're dealing with.
                isClass  = ( '#' === args.targetNode.charAt(0) ? false : true ),
                // Get the proper method based on the node.
                method   = ( false === isClass ? 'getElementById' : 'getElementsByClassName' ),
                // Clean up the selector.
                selector = ( null !== args.targetNode.charAt(0).match( /(\#|\.)/ ) ? args.targetNode.slice(1) : args.targetNode ),
                // Select the node that will be observed for mutations.
                element  = ( 'getElementById' === method ? doc[ method ]( selector ) : doc[ method ]( selector )[0] ),
                // Options for the observer (which mutations to observe).
                config   = { attributes: args.attributes, childList: args.childList, subtree: args.subtree };

            // Listener function to execute when mutations are observed.
            var listen = function( mutationsList, observer ) {
                for ( var mutation of mutationsList ) {
                    if ( args.childList && 'childList' === mutation.type )
                    {
                        if ( args.callback && 'function' === typeof( args.callback ) )
                        {
                            args.callback();
                        }
                        else
                        {
                            console.log( mutation );
                        }
                    }
                    else if ( args.attributes && 'attributes' === mutation.type )
                    {
                        console.log( mutation.attributeName );
                    }
                    else
                    {
                        console.log( mutation );
                    }
                }
            };
            // Create an observer instance linked to the callback function
            win.observer = new MutationObserver( listen );
            // Start observing the target node for configured mutations
            observer.observe( element, config );
        },

        /**
         * Disconnect `mutant` listener.
         *
         * @return void
         */
        mutantDisconnect: function() {
            if ( ! win.observer ) {
                return;
            }
            else {
                observer.disconnect();
            }
        },

        /**
         * `ParseArgs` for JavaScript; like `wp_parse_args`.
         *
         * @memberof njpwInfScroll
         * @function
         * @uses     njpwInfScroll#extend
         *
         * @param {Object} args     Function parameters.
         * @param {Object} defaults Function parameter default values.
         */
        parseArgs: function( args, defaults ) {
            if ( typeof args !== 'object' )
            {
                args = {};
            }

            if ( typeof defaults !== 'object' )
            {
                defaults = {};
            }
            return this.extend( {}, defaults, args );
        },

        /**
         * Add the necessary nodes and styles.
         *
         * @memberof njpwInfScroll
         * @function
         */
        stylesAndSettings: function() {
            var self = this;
            // Regex for the URL paths.
            var english = new RegExp( self.englishUrl ),
                latest  = new RegExp( self.latestUrl );

            // The node location to insert the actual `spinning wheel` HTML.
            var videoWall  = doc.querySelectorAll( this.containerParent )[0],
                videoPaged = ( location.pathname.match( latest ) ? videoWall.children[3] : videoWall.children[2] ),
                spinWheel  = doc.createElement( 'div' );
            // Spinning Wheel attributes.
            spinWheel.className = this.pageLoadStatusClass.slice(1);
            spinWheel.innerHTML = this.pageLoadStatus;
            spinWheel.style.marginTop = '-25px';
            spinWheel.style.marginBottom = '25px';
            spinWheel.style.textAlign = 'center';
            // Insert `spinning wheel`.
            videoWall.insertBefore( spinWheel, videoPaged );
        },
        init: function() {
            var self = this,
                loadInfScroll = function() {
                    if ( win.InfiniteScroll ) {
                        var infScroll = new InfiniteScroll( self.container, {
                            path: function() {
                                if ( location.pathname.match( /latest/ ) ) {
                                    return self.latestUrl + ( this.loadCount + 1 );
                                }
                                else if ( location.pathname.match( /mic_82/ ) ) {
                                    return self.englishUrl + ( this.loadCount + 1 );
                                }
                            },
                            append: self.target,
                            checkLastPage: self.nextPage,
                            hideNav: self.paginate,
                            status: self.pageLoadStatusClass,
                            history: false,
                            debug: false
                        });
                    }
                },
                args = {
                    targetNode: self.container,
                    callback: loadInfScroll
                };

            this.stylesAndSettings();
            this.mutant( args );

            var urlPaths = ['/search/latest', '/search/tag/mic_82'];

            if ( ! urlPaths.includes( location.pathname ) ) {
                this.mutantDisconnect();
            }
        }
    };
    njpwInfScroll.init();
})(window);
