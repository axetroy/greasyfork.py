// ==UserScript==
// @name         ゆうちょダイレクト ログイン補完
// @namespace   https://greasyfork.org/users/5795-ikeyan
// @version      0.1
// @description  ゆうちょダイレクトのお客さま番号を保存・自動補完させる
// @author       ikeyan
// @include       https://direct*.jp-bank.japanpost.jp/tp1web/U010101WAK.do*
// @include        https://direct*.jp-bank.japanpost.jp/tp1web/pc/U010902SCR.do*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    switch (location.pathname) {
        case "/tp1web/U010101WAK.do": {
            const id1Input = document.querySelector('[name="okyakusamaBangou1"]');
            const id2Input = document.querySelector('[name="okyakusamaBangou2"]');
            const id3Input = document.querySelector('[name="okyakusamaBangou3"]');
            navigator.credentials.get({password: true}).then(data => {
                const m = data.id.match(/^(\d{4})-(\d{4})-(\d{5})$/);
                if (m) {
                    id1Input.value = m[1];
                    id2Input.value = m[2];
                    id3Input.value = m[3];
                };
            });
            break;
        }
        case "/tp1web/pc/U010902SCR.do": {
            const loginButton = document.querySelector('input[name="U010302"][value="ログイン"]');
            const passwordInput = document.querySelector('[type="password"]');
            loginButton.addEventListener("click", function () {
                var id = document.body.textContent.match(/お客さま番号\s*([0-9-]+)/)[1];
                var password = passwordInput.value;
                navigator.credentials.store(new PasswordCredential({id, password}));
            });
            break;
        }
    }
})();