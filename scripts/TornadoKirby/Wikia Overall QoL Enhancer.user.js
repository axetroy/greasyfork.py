// ==UserScript==
// @name         Wikia Overall QoL Enhancer
// @namespace    TornadoKirbyGoodScripts
// @version      1.2
// @description  Make Wikia wikis less of a pain, by trimming out annoying elements and reworking the global navigation bar.
// @author       TornadoKirby
// @include      *.fandom.com/wiki/*
// @include      *.wikia.com/wiki/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js#sha256=FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=
// ==/UserScript==

/* global $, jQuery */

(function() {
    'use strict';
    
    //first things first, trim the fat
    $("div #WikiaBar").remove();
    if ($(".featured-video")) {
        $(".featured-video").remove();
    }
    
    //next, let's try doing some custom styling crap
    $('head').append(`<style id="wNavFixerCSS">
    .wds-community-header { width: 100%; z-index: 5000101; }
    .wds-community-header__sitename { margin: 0px; }
    .wds-tabs__tab { margin: 0px; margin-left: 11px; transition: margin-left .2s; } 
    .wds-search-is-active .wds-tabs__tab { margin-left: 0px; }
    .wds-tabs__tab-label { margin: 0px; font-size: 14px; transition: font-size .2s; }
    .wds-search-is-active .wds-tabs__tab-label { font-size: 0px; }
    .wds-search-is-active .wds-tabs__tab-label .wds-icon-tiny { display: none; }
    .wds-community-header__wiki-buttons { margin: 0 0 0 20px; }
</style>`);
    
    //start by getting everything we need from global nav
    var $globalNavWrapper = $(".wds-global-navigation-wrapper");
    var $globalNavLogo = $(".wds-global-navigation__logo");
    var $globalNavDiv = $("#globalNavigation");
    var $globalNavDivLR = $("#globalNavigation > div > div");
    var $globalNavLinks = $(".wds-global-navigation__links");
    var $globalNavProfile = $(".wds-global-navigation__user-menu");
    var $globalNavNewBtn = $(".wds-global-navigation__start-a-wiki");

    //continue by getting everything from local nav
    var $localNavHeader = $(".wds-community-header");
    var $localNavLogo = $(".wds-community-header__wordmark");
    var $localNavName = $(".wds-community-header__sitename");
    var $localNavCounter = $(".wds-community-header__counter");
    var $localNavNewBtn = $(".wds-community-header__wiki-buttons");
    var $localNavProper = $(".wds-community-header__local-navigation");

    /*
        and now the fun begins
    */
    
    var lnLogoHeight;

    if ($localNavLogo.length > 0) {
        lnLogoHeight = $localNavLogo.height();
        
        $globalNavLogo.replaceWith($localNavLogo);
        $localNavLogo.css({"position": "relative", "z-index": "10", "margin": "5px 0 5px 0",});
    } else {
        lnLogoHeight = 55;
        
        $globalNavLogo.replaceWith($localNavName);
        $localNavName.css({"position": "relative", "z-index": "10"});
    }
    
    $globalNavWrapper.css("height", (lnLogoHeight+10)+"px");
    $globalNavDiv.css("height", (lnLogoHeight+10)+"px");
    $globalNavDivLR.css("height", (lnLogoHeight+10)+"px");
    
    var lnHeaderBGImg = window.getComputedStyle(document.querySelector('.wds-community-header'), '::before').getPropertyValue('background-image');
    
    $globalNavDiv.css({"background-image": lnHeaderBGImg, "background-color": "rgba(0,0,0,0)", "font-family": "inherit"});
    $globalNavDivLR.css({"background-color": "rgba(0,0,0,0)"});
    
    $($globalNavDivLR[0]).css("display", "flex");
    $globalNavLinks.replaceWith($localNavProper.css("display", "flex"));
    $localNavHeader.remove();
    
    $globalNavDiv.addClass("wds-community-header");
    
    $(".wds-global-navigation__search").css("color", $($(".wds-community-header .wds-tabs__tab-label")[0]).css("color"));
    $(".wds-global-navigation__search > div:nth-child(2)").css("border-color", $($(".wds-community-header .wds-tabs__tab-label")[0]).css("color"));
    $(".wds-global-navigation__search > div:nth-child(2) > .wds-global-navigation__search-submit").css("border-color", $($(".wds-community-header .wds-tabs__tab-label")[0]).css("color"));
    $(".wds-global-navigation__search > div:nth-child(2) > .wds-global-navigation__search-submit").css("background-color", "rgba(0,0,0,0)");
    
    $globalNavProfile.replaceWith($localNavCounter);
    $globalNavNewBtn.replaceWith($localNavNewBtn);
    
    if ($("#WikiaTopAds").css("display") === "none") {
        $("#WikiaPage").css("margin-top","20px");
    }
})();