// ==UserScript==
// @name        Base64でTwitter出来るようになるやつ
// @namespace    https://to-hutohu.com
// @version      0.4
// @description  ツイート入力部分にBase64に変換するボタンを追加します。またBase64でつぶやかれたツイートが自動的に元の文字列に戻ります。
// @author       to-hutohu
// @match        https://tweetdeck.twitter.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let seted = false;
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', true, true);

    setInterval(() => {
        document.querySelectorAll('.js-tweet-text').forEach(el => { try{el.textContent = decodeURIComponent(escape(atob(el.textContent)));}catch(e){}});

        const textArea = document.querySelector('body > div.js-app.application.is-condensed.hide-detail-view-inline > div.js-app-content.app-content.is-open > div:nth-child(1) > div > div > div > div.position-rel.compose-text-container.padding-a--10.br--4 > textarea');


        if(textArea !== null && !seted) {
            const element = document.querySelector('body > div.js-app.application.is-condensed.hide-detail-view-inline > div.js-app-content.app-content.is-open > div:nth-child(1) > div > div > div > div.cf.margin-t--12.margin-b--30');
            const button = document.createElement('button');
            button.classList.add('js-send-button');
            button.classList.add('Button--primary');
            button.classList.add('btn-extra-height');

            button.innerText = 'Base64';

            button.onclick = () => {
                textArea.value = btoa(unescape(encodeURIComponent(textArea.value)));

                setTimeout(() => {
                    textArea.dispatchEvent(evt);
                }, 1);
            };
            element.appendChild(button);
            seted = true;
        }
    }, 500);
})();