// ==UserScript==
// @name PayWall remove
// @include http://www.titanic-magazin.de/*
// @include https://www.titanic-magazin.de/*
// @grant GM_addStyle
// @description Entfernt die PayWall auf titanic-magazin.de
// @version 1.0.2
// @namespace https://greasyfork.org/users/186952
// ==/UserScript==
GM_addStyle ( `
    .test-paywall-overlay {
       display: none;
    }
    #steady-widget-container{
      display:none;
  }
.test-adblock-overlay{
display:none;
}
` );
