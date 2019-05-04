// ==UserScript==
// @name         Discord Background Changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Dav_e
// @match        *://discordapp.com/channels/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const setBackground = (bg) => {
        //Main Backgrounds
        [
            'appMount-3VJmYg',
            'layers-3iHuyZ',
            'layer-3QrUeG',
            'container-2lgZY8',
            'channels-Ie2l6A',
            'chat-3bRxxu'
        ].forEach(i => {
            document.getElementsByClassName(i)[0].style.backgroundColor = 'transparent';
        });
        document.querySelectorAll('.chat-3bRxxu form')[0].style.backgroundColor = 'transparent';

        /*
        Styles in order:
        Channel Titles
        Server List
        Text & Voice Channels
        User Info (below channels)
        Text Channel Messages
        Channel Header
        Members List
        Channel Message Form
        */

        document.getElementById('app-mount').style.cssText = `background: url(${bg}) no-repeat center center / cover fixed;`;

        let newStyles = document.createElement('style');
        newStyles.innerHTML = `
.iconCollapsed-3hFp_8, .iconDefault-3Gr8d2, .nameCollapsed-34uFWo, .nameDefault-2DI02H {color:#fff!important}
.guildsWrapper-5TJh6A {background-color: rgba(47,49,54,.8)!important}
.container-PNkimc {background-color: rgba(47,49,54,.6)!important}
.container-2Thooq {background-color: rgba(32,34,37,.75)!important)}
.messagesWrapper-3lZDfY {background-color: rgba(0,0,0,.2)!important}
.title-3qD0b- {background-color: rgba(54,57,63,.9)!important}
.members-1998pB {background-color: rgba(47,49,54,.5)!important}
.content-yTz4x3 {background-color: rgba(54,57,63,.5)!important`;
        document.head.appendChild(newStyles);
    }

    const createForm = () => {
        let column = document.getElementsByClassName('content-column')[0].firstChild;

        let container = document.createElement('div'),
            title = document.createElement('h2'),
            form = document.createElement('div'),
            header = document.createElement('h5'),
            input = document.createElement('input'),
            button = document.createElement('button');

        title.setAttribute('class', 'defaultColor-1_ajX0 h2-2gWE-o marginBottom20-32qID7 weightSemiBold-NJexzi height20-mO2eIN');
        title.appendChild(document.createTextNode('Custom Background'));

        form.setAttribute('class', 'flex-vertical cardPrimary-1Hv-to card-3Qj_Yx');
        form.style.padding = '20px';

        header.setAttribute('class', 'h5-18_1nd marginBottom8-AtZOdT weightSemiBold-NJexzi height16-2Lv3qA size12-3R0845');
        header.appendChild(document.createTextNode('Background'));

        input.placeholder = 'Enter image URL';
        input.setAttribute('class', 'inputDefault-_djjkz input-cIJ7To size16-14cGz5 marginBottom8-AtZOdT');
        input.id = 'backgroundURLInput';

        button.setAttribute('class', 'button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeSmall-2cSMqn');
        button.appendChild(document.createTextNode('Apply'));

        [header, input, button].forEach(i => form.appendChild(i));
        [title, form].forEach(i => container.appendChild(i));

        column.appendChild(container);

        button.addEventListener('click', function(){
            //https://images3.alphacoders.com/124/thumb-1920-124699.jpg
            let bg = document.getElementById('backgroundURLInput').value;
            if(bg === "") return;
            setBackground(bg);
        });
    }

    const clearColumn = () => {
        let column = document.getElementsByClassName('content-column')[0].firstChild;

        while(column.firstChild){
            column.removeChild(column.firstChild);
        }

        createForm();
    }

    const createOption = () => {
        let optionList = document.getElementsByClassName('side-8zPYf6')[0],
            option = document.createElement('div'),
            header = document.createElement('div'),
            separator = document.createElement('div');

        option.setAttribute('class', 'itemDefault-3Jdr52 item-PXvHYJ notSelected-1N1G5p');
        header.className = 'header-2RyJ0Y';
        separator.setAttribute('class', 'separator-gCa7yv marginTop8-1DLZ1n marginBottom8-AtZOdT');

        header.appendChild(document.createTextNode('Background'));
        option.appendChild(document.createTextNode('Change Background'));

        optionList.insertBefore(header, optionList.firstChild);
        optionList.insertBefore(option, header.nextSibling);
        optionList.insertBefore(separator, option.nextSibling);

        option.addEventListener('mousedown', function(){
            let hasClass = false;
            this.classList.forEach(i => {
                if(i === 'itemSelected-1qLhcL' || i === 'selected-3s45Ha') hasClass = true;
            });
            if(!hasClass){
                clearColumn();
            } else {
                //hideForm();
                console.log('Nice');
            }
        });
    }

    const settingsHaveOpened = (mutationsList) => {
        for(let mutation of mutationsList){
            if(mutation.addedNodes.length !== 0){
                createOption();
            }
        }
    }

    const observer = new MutationObserver(settingsHaveOpened);

    document.body.onload = function(){
        observer.observe(
            document.getElementsByClassName('layers-3iHuyZ')[0],
            {childList:true}
        );
    }

})();