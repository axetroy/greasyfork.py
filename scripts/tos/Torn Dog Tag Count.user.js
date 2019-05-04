// ==UserScript==
// @name         Torn Dog Tag Count
// @namespace    blank
// @description  Highlight previously stolen tags
// @version      0.4.1
// @match        *.torn.com/competition.php
// @grant        none
// ==/UserScript==

function checkTagCount(){
    if(document.getElementsByClassName('dog-tag-list')[0]){
        var tagCount = parseInt(document.getElementsByClassName('dog-tag-list')[0].getAttribute('data-from'));
        const tagInfo = document.getElementsByClassName('dog-tag-cont');
        for(var i=0; i < tagInfo.length; i++){
            if(tagInfo[i].getElementsByClassName('tooltip')){
                if(tagInfo[i].getElementsByClassName('user')[0].children.length > 2){
                    tagInfo[i].style.backgroundColor = "#d7e1cc";
                }
            }
        }
    }
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            checkTagCount();
        }
    }
});
const wrapper = document.querySelector('#mainContainer .content-wrapper');
observer.observe(wrapper, { subtree: true, childList: true });