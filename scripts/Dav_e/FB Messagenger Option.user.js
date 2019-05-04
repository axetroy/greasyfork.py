// ==UserScript==
// @name         FB Messagenger Option
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds the option to open the current chat window in messenger.
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const setAttributes = (el, attrs) => {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    const addButton = (i) => {
        let newOption = document.createElement('li'),
            optionBtn = document.createElement('a');

        newOption.className = '_3a61';

        setAttributes(optionBtn, {
            'class': '_3olv newOption',
            'data-hover': 'tooltip',
            'data-tooltip-alignv': 'top',
            'data-tooltip-content': 'Open this chat in messenger'
        });

        optionBtn.href = '#';

        newOption.appendChild(optionBtn);
        i.insertBefore(newOption, i.firstChild);

        optionBtn.addEventListener('click', function(){
            let link = i.previousSibling.firstChild.childNodes[1].href.split('/').pop();
            window.open(`https://www.facebook.com/messages/t/${link}`, '_blank');
        });
    }

    const updateWindows = () => {
        console.log('');
        let chatWindows = Array.from(document.getElementsByClassName('fbNubFlyoutInner')).slice(1).slice(0, -1);
        chatWindows.forEach(i => {
            let titlebarItems = i.firstChild.firstChild.childNodes[1];

            while(titlebarItems.firstChild && titlebarItems.childNodes.length !== 2){
                titlebarItems.removeChild(titlebarItems.firstChild);
            }

            addButton(titlebarItems);
        });
    }

    const checkChats = (mutationsList) => {
        for(let mutation of mutationsList){
            if(mutation.addedNodes.length !== 0){
                updateWindows();
            }
        }
    }

    const observer = new MutationObserver(checkChats);

    document.body.onload = function(){
        updateWindows();
        observer.observe(
            document.getElementById('u_0_2b').firstChild,
            {childList:true}
        );
    }
})();