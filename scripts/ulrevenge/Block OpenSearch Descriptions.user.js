// ==UserScript==
// @name            Block OpenSearch Descriptions
// @author
// @description     Block sites from adding search engines to Chrome.
// @downloadURL
// @grant
// @icon
// @include         http*://*
// @require
// @run-at          document-start
// @updateURL
// @version         1.0
// @namespace https://greasyfork.org/users/218540
// ==/UserScript==

//document.querySelector('[type="application/opensearchdescription+xml"]').remove();
//////////////////////////////////////////////////////////////////////////////
// Code from https://github.com/gregsadetsky/chrome-dont-add-custom-search-engines/blob/master/src/content.js
// OpenSearch - e.g., https://martin-thoma.com/search-engine-autodiscovery/
// Uses CSS4 selectors, Chrome 49+
function onDOMContentLoaded()
{
    document.querySelectorAll('[type="application/opensearchdescription+xml" i]').forEach(
        function (it) {
            it.removeAttribute('type');
            console.info({"Spoiled by type removal": it});
        }
    );

    // Suggestion service, https://www.chromium.org/tab-to-search
    document.querySelectorAll('url[rel="suggestions" i]').forEach(
        function (it) {
            it.removeAttribute('rel');
            console.info({"Spoiled by rel removal": it});
        }
    );
}
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);