// ==UserScript==
// @name         Discord Context Menus
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Better context menus
// @author       You
// @match        *://discordapp.com/channels/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const apply_styles = (message) => {
        message.onmouseover = () => {
            message.style.cssText = 'background-color:rgba(0,0,0,.1);cursor:pointer';
        }
        message.onmouseout = () => {
            message.style.cssText = '';
        }
    }

    const update_messages = () => {
        let messages = document.querySelectorAll('.containerCozyBounded-1rKFAn .markup-2BOw-j');
        Array.from(messages).forEach(message => {
            message.onclick = (e) => {
                let optionsBtn = message.previousSibling.firstChild.lastChild;
                optionsBtn.click();
                let contextMenu = document.getElementsByClassName('container-3cGP6G')[0].parentNode;
                contextMenu.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;`;
            }
            message.oncontextmenu = (e) => {
                let optionsBtn = message.previousSibling.firstChild.lastChild;
                optionsBtn.click();
                let lastBtn = document.getElementsByClassName('container-3cGP6G')[0].lastChild;
                if(lastBtn.firstChild.innerHTML.toLowerCase() === 'delete'){
                    lastBtn.click();
                } else {
                    lastBtn.parentNode.parentNode.style.visibility = 'hidden';
                    optionsBtn.classList.remove('popout-open');
                }
            }
            apply_styles(message);
        });
    }

    const checkChannel = (changes) => {
        for(let change of changes){
            if(change.addedNodes.length){
                setTimeout(update_messages, 100);
            }
        }
    }

    const channel = new MutationObserver(checkChannel);

    window.onload = () => {
        setTimeout(function(){
            let elem = document.getElementsByClassName('content-yTz4x3')[0].firstChild;
            channel.observe(elem, {childList: true});
            update_messages();
            console.log('%c[Discord++]'+'%c has loaded', 'color:#5a6db1', 'color:#000');
        }, 2000);
    }

})();