// ==UserScript==
// @name         TurkerHub Volume Mixer
// @namespace    salembeats
// @version      1
// @description  Why mute people, when you can just turn them down?
// @author       Cuyler Stuwe (salembeats)
// @include      https://turkerhub.com/threads/*/*
// @grant        none
// ==/UserScript==

const SLIDER_MIN = 1;
const SLIDER_MAX = 1000;
const SLIDER_DEFAULT = 500;

const DEFAULT_AVATAR_SIZE_PX = 96;

const SELECTOR_USERNAME_ANCHOR = ".messageUserBlock a.username";
const SELECTOR_AVATAR_IMG = ".messageUserBlock div.avatarHolder img";
const SELECTOR_MESSAGE_BLOCK = "li.message";
const SELECTOR_MESSAGE_CONTENTS = "blockquote";
const SELECTOR_VOLUME_SLIDER = "input.volume";

let allUsernameAnchors = document.querySelectorAll(SELECTOR_USERNAME_ANCHOR);

allUsernameAnchors.forEach(el => el.insertAdjacentHTML(`afterend`, `
    <div style="width: 100%; text-align: center;">Volume:</div>
	<input class="volume" data-for="${el.innerText}" style="width: 100%;" type="range" min="${SLIDER_MIN}" max="${SLIDER_MAX}" value="${SLIDER_DEFAULT}"><br/>
    <div style="text-align: center;"><input type="button" value="Mute"> <input type="button" value="Solo"> <input type="button" value="Rec"></div>
`));

let allVolumeSliders = document.querySelectorAll(SELECTOR_VOLUME_SLIDER);

allVolumeSliders.forEach(slider => slider.addEventListener('input', handleVolumeSliderChange));

function handleVolumeSliderChange(event) {

    let targetUsername = event.target.dataset.for;
    let allMessageBlocks = document.querySelectorAll(SELECTOR_MESSAGE_BLOCK);

    allMessageBlocks.forEach(block => {

        let username = block.querySelector(SELECTOR_USERNAME_ANCHOR).innerText;

        if(username === targetUsername) {

            let proportion = event.target.value / SLIDER_MAX;
            applyScalingToMessageBlock(proportion, block);

        }

    });

}

function applyScalingToMessageBlock(zeroToOneProportion, messageBlock) {

    let postAvatar = messageBlock.querySelector(SELECTOR_AVATAR_IMG);
    let messageContentsContainer = messageBlock.querySelector(SELECTOR_MESSAGE_CONTENTS);

    let newAvatarSizeStyle = `${zeroToOneProportion * DEFAULT_AVATAR_SIZE_PX}px`;

    postAvatar.style.width = newAvatarSizeStyle;
    postAvatar.style.height = newAvatarSizeStyle;

    messageContentsContainer.style.fontSize = `${zeroToOneProportion}em`;
}