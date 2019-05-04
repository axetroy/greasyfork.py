// ==UserScript==
// @name         Load more followed channels (minimised)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Loads many more follower channels and keeps bar minimised.
// @author       nmur
// @match        https://www.twitch.tv/*
// ==/UserScript==

(function() {
    window.addEventListener('load', function() {
        clickSideBarExpandButton();
        clickShowMoreButtonTwice();
        clickSideBarCloseButton();
    }, false);
})();

function clickSideBarExpandButton() {
    var sideBarExpandButton = document.getElementsByClassName("side-nav__toggle-visibility--open")[0];
    if (sideBarExpandButton !== undefined) {
        sideBarExpandButton.click();
    }
}

function clickShowMoreButtonTwice() {
    var showMoreButton = document.getElementsByClassName("side-nav-show-more-toggle__button")[0];
    showMoreButton.click();
    showMoreButton.click();
}

function clickSideBarCloseButton() {
    var sideBarCloseButton = document.getElementsByClassName("side-nav__toggle-visibility")[0];
    sideBarCloseButton.click();
}