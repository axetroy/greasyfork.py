// ==UserScript==
// @id             Amazon URL Cleaner (https)
// @name           Amazon URL Cleaner (https)
// @author         Michael
// @description    update of Xant1k@bt's script to include https
// @namespace      http://efcl.info/
// @description    replaceState for Amazon
// @include https://*amazon.*/dp/*
// @include https://*amazon.*/*/dp/*
// @include https://*amazon.*/*gp/product/*
// @include https://*amazon.*/exec/obidos/ASIN/*
// @include https://*amazon.*/o/ASIN/*
// @version 0.0.1.20140518104255
// ==/UserScript==
(function(doc) {
    // ASIN.0 in kindle store
    var asin = doc.getElementById("ASIN") || doc.getElementsByName("ASIN.0")[0];
    if (asin) {
        asin = asin.value;
        history.replaceState(null, "Amazon URL Cleaner", "/dp/" + asin + "/");
    }
})(document);