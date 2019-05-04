// ==UserScript==
// @name         Easy Picture-in-Picture
// @namespace    easy-picture-in-picture.user.js
// @version      1.7
// @description  Picture in Picture を簡単に利用できるようにポップアウト ボタンを追加します。
// @author       nafumofu
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     resIcon https://material.io/tools/icons/static/icons/round-picture_in_picture-24px.svg
// @license      MIT License
// ==/UserScript==

class EasyPictureInPicture {
    constructor() {
        if (document.pictureInPictureEnabled) {
            document.body.addEventListener('mousemove', (evt) => this.event(evt), {passive: true});
            document.body.addEventListener('touchstart', (evt) => this.event(evt), {passive: true});
        }
    }
    event(evt) {
        if (!this.eventLocked) {
            this.eventLocked = !!setTimeout(() => {
                this.eventLocked = false;
            }, 50);
            
            var posX = evt.clientX || evt.changedTouches[0].clientX;
            var posY = evt.clientY || evt.changedTouches[0].clientY;
            var elems = document.elementsFromPoint(posX, posY);
            for (let elem of elems) {
                if (elem.tagName === 'VIDEO' && elem.readyState) {
                    this.showButton(elem);
                    break;
                }
            }
        }
    }
    popOut() {
        if (document.pictureInPictureElement === this.epipTarget) {
            document.exitPictureInPicture();
            return
        }
        this.epipTarget.requestPictureInPicture();
    }
    showButton(target) {
        if (!this.epipButton) {
            this.epipButton = this.createButton();
        }
        
        if (!target.disablePictureInPicture) {
            this.epipTarget = target;
            
            var style = this.epipButton.style;
            var compStyle = getComputedStyle(this.epipButton);
            var rect =this.epipTarget.getBoundingClientRect();
            var posY = window.scrollY + rect.top;
            var posX = window.scrollX + rect.left + (rect.width / 2 - parseInt(compStyle.width) / 2);
            
            style.setProperty('top', `${posY}px`, 'important');
            style.setProperty('left', `${posX}px`, 'important');
            style.setProperty('opacity', '1', 'important');
            style.setProperty('pointer-events', 'auto', 'important');
            
            clearTimeout(this.epipTimer);
            this.epipTimer = setTimeout(() => {
                style.setProperty('opacity', '0', 'important');
                style.setProperty('pointer-events', 'none', 'important');
            }, 3000);
        }
    }
    createButton() {
        GM_addStyle(`
        #epip-button {
            all: unset !important;
            z-index: 2147483647 !important;
            position: absolute !important;
            pointer-events: none !important;
            opacity: 0 !important;
            transition: opacity 0.3s !important;
            margin-top: 4px !important;
        }
        #epip-button > svg {
            all: unset !important;
            fill: rgba(255,255,255,0.95) !important;
            background: rgba(0,0,0,0.5) !important;
            width: 20px !important;
            height: 20px !important;
            padding: 6px !important;
            border-radius: 50% !important;
            transform: scale(1,-1) !important;
        }
        `);
        
        var button = document.createElement('button');
        button.id = 'epip-button';
        button.tabIndex = -1;
        button.addEventListener('click', () => this.popOut());
        button.insertAdjacentHTML('afterbegin', GM_getResourceText('resIcon'));
        document.documentElement.append(button);
        return button;
    }
}

new EasyPictureInPicture();
