// ==UserScript==
// @name         ALM indicate visited links
// @namespace    http://bosch.com
// @version      v1.0
// @description  use different colour for visited links in ALM
// @author       LSB2BP
// @match        https://rb-alm-11-p.de.bosch.com/ccm/web/projects/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

GM_addStyle ( `
    a:visited {
        color: #00BCD4;
    }
` );