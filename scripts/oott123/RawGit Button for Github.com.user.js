// ==UserScript==
// @name        RawGit Button for Github.com
// @namespace   oott123_raw_git_button_for_github
// @include     https://github.com/*
// @version     3
// @grant       none
// @description add a RawGit button for Github.com
// ==/UserScript==

document.addEventListener('pjax:complete', rawgitButton);
rawgitButton();

function rawgitButton() {
    var rawDom = document.querySelector('#raw-url');
    if (!rawDom) {
        return;
    }
    var url = rawDom.href.replace(/(([^\/]+\/){2})raw\//, (a, b) => b).replace(/^https:\/\/github\.com\//, 'https://rawgit.com/');
    var rawGitDom = document.createElement('a');
    rawGitDom.href = url;
    rawGitDom.textContent = 'RawGit';
    rawGitDom.className = 'btn btn-sm BtnGroup-item';
    rawGitDom.target = '_blank';
    rawDom.parentNode.insertBefore(rawGitDom, rawDom.nextSibling);
}
