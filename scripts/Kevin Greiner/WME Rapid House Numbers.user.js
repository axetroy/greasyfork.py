/* global GM_info */
/* global W */
/* global Waze */
/* global I18n */
/* global unsafeWindow */

// ==UserScript==
// @name           WME Rapid House Numbers
// @description    A House Number script with its controls in the House Number mini-editor.  It injects the next value in a sequence into each new HN; it also provides acclerators 'h', '1' ... '9' on the Add house number command.
// @namespace      http://compsol.cc
// @version        1.10
// @include        https://www.waze.com/*/editor*
// @include        https://www.waze.com/editor*
// @include        https://beta.waze.com/*
// @exclude        https://www.waze.com/*user/*editor/*
// @author         Kevin Greiner 2017 (kjg53)
// @license        MIT
// ==/UserScript==

(function() {
    var scriptName = GM_info.script.name;
    var version = GM_info.script.version;
    var oWaze=W;
    var oI18n=I18n;

    console.log(scriptName + ": Loading ");

    {
        var changeLog = [
            {version: "1.0", message: ""},
            {version: "1.1", message: "The changelog now handles missing entries."},
            {version: "1.2", message: "Now does full reset when exiting House Number Editor."},
            {version: "1.3", message: "Fixed typo in change log."},
            {version: "1.4", message: "The accelerator key bindings are removed upon exiting the House Number editor."},
            {version: "1.5", message: "The primary accelerator has been changed from 'a' to 'h'.  The keys '1' .. '9' are now accelerators that create the next house number then incremment next by the value of the key."},
            {version: "1.6", message: "Disabled numeric accelerators in text fields."},
            {version: "1.7", message: "Added support for numpads.  Event handler now removed when the House Number editor is exited."},
            {version: "1.8", message: "Removed info dialog."},
            {version: "1.9", message: "Increased width of increment field."},
            {version: "1.10", message: "The increment is now persisted between sessions."}
        ];

        var versionKey = scriptName.replace( /\s/g, "") + "Version";
        var checkStorageKey = versionKey + 'Ck';

        var secret = new Date().getTime();
        window.localStorage.setItem(checkStorageKey, secret);
        if (window.localStorage.getItem(checkStorageKey) == secret) {
            var previousVersion = window.localStorage.getItem(versionKey);

            var i = 0;
            if (previousVersion) {
                try {
                    while (changeLog[i++].version != previousVersion) {}
                } catch(e) {
                    i = 0;
                }
            }

            var announcement = scriptName;
            while (i < changeLog.length) {
                var log = changeLog[i++];
                var msg = "V" + log.version + ": " + log.message;
                announcement = announcement + "\n" + msg;
            }

            if (announcement != scriptName) {
                alert(announcement);
                window.localStorage.setItem(versionKey, version);
            }
        }
    }

    function rapidHN_bootstrap() {
        if (typeof unsafeWindow !== "undefined")
        {
            oWaze=unsafeWindow.W;
            oI18n=unsafeWindow.I18n;
        }

        if (typeof oWaze === "undefined" || typeof oWaze.map === "undefined" || typeof oWaze.selectionManager === "undefined" || typeof oI18n === "undefined" || typeof oI18n.translations === "undefined")
        {
            console.log(scriptName + " dependencies not ready. Waiting...");
            setTimeout(rapidHN_bootstrap, 500);
            return;
        }

        setTimeout(initialize, 999);
    }

    function initialize() {
        var addHouseNumber;
        var observeHouseNumbersLayer;
        var oneTimeIncrement;
        var ZERO = 48;
        var ONE = 49;
        var NINE = 57;
        var NUMPAD1 = 97;
        var NUMPAD9 = 105;
        var LETTER_H = 'H'.charCodeAt(0);
        var ACCEL_TARGETS = 'div.rapidHN-control input,div.edit-area';

        function cleanUpObserveHouseNumbersLayer() {
            if (observeHouseNumbersLayer !== undefined) {
                addHouseNumber.css('font-weight', 'normal');
                addHouseNumber.css('color', 'inherit');
                $('div.rapidHN-control').off('keydown.rapidHN', rapidAccelerator);
                $(W.map.div).off('keydown.rapidHN', rapidAccelerator);
                $('div#rapidHN-control').removeAttr('rapidHN-listening');
                observeHouseNumbersLayer.disconnect();
                observeHouseNumbersLayer = undefined;
            }
        }

        function rapidAccelerator(event) {
            if (!event.shiftKey && !event.altKey && !event.metaKey) {
                var execute = false;
                if (event.target.localName != 'input' && ONE <= event.which && event.which <= NINE) {
                    oneTimeIncrement = event.which - ONE + 1;
                    execute = true;
                } else if (event.target.localName != 'input' && NUMPAD1 <= event.which && event.which <= NUMPAD9) {
                    oneTimeIncrement = event.which - NUMPAD1 + 1;
                    execute = true;
                } else if (event.which == LETTER_H) {
                    oneTimeIncrement = undefined;
                    execute = true;
                }

                if (execute) {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    $(event.target).on('change');
                    event.target.blur();
                    addHouseNumber.click();
                }
            }
        }

        console.log(scriptName + " initializing.");

        var obs = new MutationObserver(function(mutations, observer) {
            var div = $('div#edit-buttons div');
            var foundControls = $('.rapidHN-control', div);
            addHouseNumber = $('.add-house-number', div);

            if (addHouseNumber.length) {
                if (!foundControls.length) {
                    var initialIncrement = (window.localStorage.getItem("rapidHNincrement") || 4).toString();
                    addHouseNumber.after('<div class="toolbar-button rapidHN-control" style="float:left; padding-right: 3px"><span class="menu-title">Next #</span><input type="number" name="nextHN" id="rapidHN-next" style="margin: 3px; height:20px; width: 64px; text-align: right"></div>',
                                         '<div class="toolbar-button rapidHN-control" style="float:left"><span class="menu-title" style="text-align: right">Increment</span><input type="number" name="incrementHN" id="rapidHN-increment" value="' + initialIncrement + '" style="margin: 3px; height:20px; width: 45px; text-align: right" step="1"></div>');
                    $('input#rapidHN-increment').change(function() {
                        var inc = $(this);
                        window.localStorage.setItem("rapidHNincrement", inc.val());
                    });

                    var controls = $('div.rapidHN-control');
                    $('input', controls).on('change', function(event) {
                        var active = true;
                        $('input', controls).each(function() {
                            if (active) {
                                var i = parseInt($(this).val(), 10);
                                active = !isNaN(i) && i !== 0;
                            }
                        });

                        if (active) {
                            if (observeHouseNumbersLayer === undefined) {
                                addHouseNumber.css('font-weight', 'bold');
                                addHouseNumber.css('color', '#2196f3');

                                observeHouseNumbersLayer = new MutationObserver(function(mutations, observer){
                                    mutations.forEach(function(mutation) {
                                        var input = $('div.olLayerDiv.house-numbers-layer div.house-number div.content.active:not(".new") input.number');
                                        if (input.val() === "") {
                                            var next = $('input#rapidHN-next');
                                            var n = parseInt(next.val());

                                            var i;
                                            if (oneTimeIncrement === undefined) {
                                                var inc = $('input#rapidHN-increment');
                                                i = parseInt(inc.val());
                                            } else {
                                                i = oneTimeIncrement;
                                                oneTimeIncrement = undefined;
                                            }

                                            input.val(n).change();
                                            next.val(n + i);
                                            // Move focus from input field to WazeMap to prevent accidental additions to the injected HN.
                                            $("div#WazeMap").focus();
                                        }
                                    });
                                });
                                observeHouseNumbersLayer.observe( $('div.olLayerDiv.house-numbers-layer')[0], { childList:false, subtree:true, attributes: true });
                            }
                            if ($('div#rapidHN-control').attr('rapidHN-listening') == undefined) {
                                $('div.rapidHN-control').on('keydown.rapidHN', rapidAccelerator);
                                $(W.map.div).on('keydown.rapidHN', rapidAccelerator);
                                var eventList = $._data(W.map.div, "events");
                                eventList.keydown.unshift(eventList.keydown.pop());
                                $('div#rapidHN-control').attr('rapidHN-listening', true);
                            }
                        } else {
                            cleanUpObserveHouseNumbersLayer();
                        }
                    });
                }
            } else {
                cleanUpObserveHouseNumbersLayer();
            }
        });
        // have the observer observe for changes in children
        obs.observe( $('div#edit-buttons')[0], { childList:true, subtree:false });

        console.log(scriptName + " initialized.");
    }

    rapidHN_bootstrap();
})();
