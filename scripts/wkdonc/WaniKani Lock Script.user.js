// ==UserScript==
// @name          WaniKani Lock Script
// @namespace     https://www.wanikani.com
// @author        Doncr
// @description   Allows you to lock a set number of items from your review queue so you can keep on top of the rest.
// @version       0.0.8
// @include       *://www.wanikani.com/*
// @grant         none
// @run-at        document-body
// ==/UserScript==

(function (xhr) {

    if (window.lockScriptInitialised) {
        return;
    }

    window.lockScriptInitialised = true;

    var localStorageConfigKey = "lockScriptCache";
    var localStorageAPIKeyKey = "apikeyv2";

    function getConfig() {

        var config = localStorage.getItem(localStorageConfigKey);

        if (config) {
            return JSON.parse(config);
        } else {
            return {
                availableAt: {},
                lockCount: 0,
            };
        }
    }

    function setConfig(config) {
        localStorage.setItem(localStorageConfigKey, JSON.stringify(config));
    }

    function getAPIKey() {
        return localStorage.getItem(localStorageAPIKeyKey);
    }

    function reloadCache() {

        var apiKey = getAPIKey();

        if (apiKey.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {

            // Clear out any availability data from the cache.

            var config = getConfig();

            config.availableAt = {};
            delete config.availableUpdatedAt;

            setConfig(config);

            updateAssignmentsCache();
        }
    }

    function setAPIKey() {

        var apiKey = window.jQuery('#lockScriptAPIKey').val();

        if (apiKey.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {

            if (apiKey != getAPIKey()) {
                localStorage.setItem(localStorageAPIKeyKey, apiKey);
            }

            reloadCache();

        } else if (apiKey.match(/^[0-9a-f]{32}$/)) {

            alert("It looks like you entered the API Version 1 key. You need to use the API Version 2 key.");

        } else {

            alert("Invalid API key format. You need to use the API Version 2 key.");
        }
    }

    function updateAssignmentsCache() {

        var cache = getConfig();

        if (getAPIKey()) {

            var uri = "https://api.wanikani.com/v2/assignments";

            if (cache.availableUpdatedAt) {
                uri = uri + "?updated_after=" + cache.availableUpdatedAt;
            }

            while (uri) {

                var response = window.jQuery.ajax({
                    headers: { "Authorization": "Token token=" + getAPIKey() },
                    dataType: "json",
                    async: false,
                    url: uri
                });

                var json = response.responseJSON;

                if (json.data_updated_at) {
                    cache.availableUpdatedAt = json.data_updated_at;
                }

                json.data.forEach(function (datum) {

                    var key = datum.data.subject_id.toString();
                    var avail = datum.data.available_at;
                    var srs_stage = datum.data.srs_stage;
                    var hidden = datum.data.hidden;

                    if ((avail != null) && (srs_stage > 0) && (srs_stage < 9) && (!hidden)) {
                        var value = Date.parse(avail) / 1000;
                        cache.availableAt[key] = { "t": value, "l": srs_stage };
                    } else {
                        delete cache.availableAt[key];
                    }
                });

                uri = json.pages.next_url;
            }

            // Reduce lockCount if there aren't that many items left in the real review queue.

            var now = Date.now() / 1000;
            var realQueueSize = Object.values(cache.availableAt).filter(function (item) { return item.t < now; }).length;

            if (cache.lockCount > realQueueSize) {
                cache.lockCount = realQueueSize;
            }

            window.managedToUpdateLockCache = true;
            window.realQueueSize = realQueueSize;
        }

        setConfig(cache);
    }

    function modifyReviewQueue(queueText) {

        var queue = JSON.parse(queueText);
        var config = getConfig();
        var availableAt = config.availableAt;
        var lockCount = parseInt(config.lockCount);

        if (lockCount > 0) {

            var queueByTime = queue.map(function (item) { return item.id }).sort(function (a, b) {
                var sortMethod1 = availableAt[a].t - availableAt[b].t;

                if (sortMethod1 != 0) {
                    return sortMethod1;
                }

                return a - b;
            });

            queueByTime = queueByTime.slice(lockCount);

            var queueByTimeKeys = {};

            queueByTime.forEach(function (item) {
                queueByTimeKeys[item] = true;
            });

            queue = queue.filter(function (item) {
                return queueByTimeKeys[item.id.toString()];
            });

            window.lockScriptFilter = true;
            window.lockScriptLockCount = config.lockCount;
        }

        return JSON.stringify(queue);
    }

    var originalResponseText = Object.getOwnPropertyDescriptor(xhr, 'responseText');

    Object.defineProperty(xhr, 'responseText', {

        get: function () {

            // Use the original responseText property accessor so we can get the
            // actual response from WK.

            var responseText = originalResponseText.get.apply(this);

            if (this.responseURL == "https://www.wanikani.com/review/queue") {
                updateAssignmentsCache();
                responseText = modifyReviewQueue(responseText);
            }

            return responseText;
        }
    });

    // DOM fiddling

    function graphMarkup() {
        return '' +
'<style>' +
'  #lockRangeInput {' +
'    padding: 0;' +
'    margin: 0;' +
'    height: calc(1em + 6px);' +
'    vertical-align: bottom;' +
'    max-width: 100%;' +
'    -webkit-appearance: none;' +
'    background: #d3d3d3;' +
'    outline: none;' +
'  }' +
'' +
'  #lockNumberInput {' +
'    margin-left: calc(1em);' +
'    width: calc(4em);' +
'    border: 1px solid #444;' +
'    padding: 2px;' +
'    margin: 0;' +
'    height: 1em;' +
'    vertical-align: bottom;' +
'    text-align: right;' +
'  }' +
'' +
'  #lockRangeInput::-webkit-slider-thumb {' +
'    -webkit-appearance: none;' +
'    appearance: none;' +
'    width: 25px;' +
'    height: 20px;' +
'    background: #444;' +
'    cursor: pointer;' +
'  }' +
'' +
'  #lockRangeInput::-ms-thumb {' +
'    appearance: none;' +
'    width: 25px;' +
'    height: 20px;' +
'    background: #444;' +
'    cursor: pointer;' +
'  }' +
'' +
'  #lockRangeInput::-moz-range-thumb {' +
'    border: none;' +
'    border-radius: 0;' +
'    width: 25px;' +
'    height: 20px;' +
'    background: #444;' +
'    cursor: pointer;' +
'  }' +
'' +
'  #lockRangeInput::-moz-range-track {' +
'    border-radius: 0;' +
'    height: 7px;' +
'    background: transparent;' +
'  }' +
'  ' +
'  #lockScriptSettings {' +
'      border: none;' +
'      background: none;' +
'      color: white;' +
'      padding: 4px 8px 4px 8px;' +
'      margin: -4px 0 -4px 0;' +
'  }' +
'  ' +
'  #lockScriptSettings:hover {' +
'     background: #666;' +
'   }' +
'  #lockScriptOptionsPane fieldset {' +
'     margin: 1em 0 1em 0;' +
'  }' +
'</style>' +
'<div class="pure-g-r">' +
'    <div class="pure-u-1" id="incorrect" style="display: block;">' +
'      <h2 style="background: #444"><span style="float: right"><button id="lockScriptSettings"><i class="icon-gear"></button></i></span><i class="icon-lock" style="margin: 0.14em"></i> Lock</h2>' +
'      <div class="master">' +
'        <h3><span>Locked</span></h3>' +
'        <ul></ul>' +
'      </div>' +
'      <div><div class="apprentice active"><h3><span><strong id="lockScriptTitleNumber" title="Locked Items">0</strong> Locked</span></h3></div>' +
'        <div style="display: none" id="lockScriptOptionsPane">' +
'          <fieldset><legend>Personal Access Token</legend>Personal Access Token: <input style="font-family: monospace; width: 300px;" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" id="lockScriptAPIKey">' +
'          <input type="button" value="Set Personal Access Token" id="setAPIKey"><br>(See' +
'          <a href="https://www.wanikani.com/settings/personal_access_tokens">Account settings</a> to get a token. ' +
'          You might as well use the default read-only token because the Lock Script doesn\'t need to make any changes to your account).</fieldset>' +
'          <fieldset><legend>Reload cache</legend> Hopefully you won\'t need to use this but it is worth a shot if the lock script seems to be confused.<br>' +
'          <input type="button" value="Reload cache" id="reloadCache"></fieldset>' +
'          <fieldset><legend>Number of locked items</legend> Can\'t seem to get the right number using the slider? Enter the exact number here: <input id="lockNumberInput" type="number" name="quantity" min="0" max="100" value="0"></fieldset>' +
'        </div>' +
'<div>' +
'  <i class="icon-unlock" style="font-size: 1.2em; color: #a2a2a2; margin-right: 0.4em"></i>' +
'  <input class="slider" id="lockRangeInput" style="width: calc(100% - 4em)" type="range" min="0" max="48" value="0">' +
'  <i class="icon-lock" style="font-size: 1.2em; color: #a2a2a2; margin-left: 0.4em"></i>' +
'</div>' +
'      </div>' +
'    </div>' +
'  </div>' +
    '';
    }

    function lockCountMarkup(numLocked) {
        return '' +
            '<span class="review-lock-count" style="background-color: black; color: white; display: inline-block; line-height: 3em; padding-left: 16px; padding-right: 2px; margin-right: -1px;">' +
            '  <i style="margin-right: 8px" class="icon-lock"></i>' +
            '  <span id="review-queue-lock-count">' + numLocked + '</span>' +
            '</span>';
    }

    function setLockCount(newCount) {

        newCount = parseInt(newCount);

        if (isNaN(newCount)) {
            newCount = 0;
        }

        if (newCount < 0) {
            newCount = 0;
        }

        if (newCount > window.realQueueSize) {
            newCount = window.realQueueSize;
        }

        var config = getConfig();
        config.lockCount = newCount;
        setConfig(config);

        window.jQuery('#lockScriptTitleNumber').text(newCount);
        window.jQuery('#review-queue-lock-count').text(newCount);
        window.jQuery('#review-queue-count').text(window.realQueueSize - newCount);
    }

    document.body.addEventListener('DOMSubtreeModified', function (event) {

        var attrs = event.target.attributes;

        if (window.location.pathname == "/review") {

            if ((event.target.tagName == 'DIV') &&
                (attrs.class && attrs.class.value == 'review-stats-value')) {

                if (!window.lockMarkupAdded) {

                    window.lockMarkupAdded = true;

                    updateAssignmentsCache();

                    window.jQuery('#review-stats').parent('.pure-g-r').after(graphMarkup);

                    var config = getConfig();

                    window.jQuery('#setAPIKey').click(setAPIKey);
                    window.jQuery('#reloadCache').click(reloadCache);

                    var availableCount = 0;
                    var now = Date.now() / 1000;

                    Object.keys(config.availableAt).forEach(function (key) {
                        if (config.availableAt[key].t < now) {
                            availableCount++;
                        }
                    });

                    window.jQuery('#lockScriptAPIKey').val(getAPIKey());

                    if ( window.managedToUpdateLockCache) {

                        window.jQuery('#lockRangeInput').val(config.lockCount);
                        window.jQuery('#lockNumberInput').val(config.lockCount);

                        var numLocked = config.lockCount;
                        var numUnlocked = availableCount - config.lockCount;

                        window.jQuery('#review-queue-count').before(lockCountMarkup(numLocked));
                        window.jQuery('#review-queue-count').text(numUnlocked);

                        window.jQuery('#lockRangeInput').attr('max', window.realQueueSize);
                    }

                    window.jQuery('#lockScriptSettings').on('click', function () {
                        window.jQuery('#lockScriptOptionsPane').toggle();
                    });

                    var slider = window.jQuery("#lockRangeInput");
                    var input = window.jQuery("#lockNumberInput");

                    slider.on("input", function () {
                        input.val(slider.val());
                        setLockCount(slider.val());
                    });

                    input.on("input", function () {
                        slider.val(input.val());
                        setLockCount(input.val());
                    });
                }
            }
        }

        if (window.location.pathname == "/review/session") {

            if ((event.target.tagName == 'DIV') &&
                (attrs.id && attrs.id.value == 'loading') &&
                (attrs.style && attrs.style.value == "display: none;")) {

                if (window.lockScriptFilter) {
                    window.jQuery('#stats').prepend("<i class='icon-lock'></i><span>" +
                        window.lockScriptLockCount + "</span>");
                }
            }
        }

    }, false);

})(XMLHttpRequest.prototype);