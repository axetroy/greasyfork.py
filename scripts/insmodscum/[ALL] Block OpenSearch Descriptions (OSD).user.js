// ==UserScript==
// @name            [ALL] Block OpenSearch Descriptions (OSD)
// @author
// @description     Block sites from adding search engines to Chrome.
// @downloadURL
// @grant
// @homepageURL     https://bitbucket.org/INSMODSCUM/userscripts-scripts/src
// @icon
// @include         http*://*
// @namespace       insmodscum 
// @require
// @run-at          document-start
// @updateURL
// @version         1.0
// ==/UserScript==

document.querySelector('[type="application/opensearchdescription+xml"]').remove();