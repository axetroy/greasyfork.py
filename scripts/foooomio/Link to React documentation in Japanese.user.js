// ==UserScript==
// @name         Link to React documentation in Japanese
// @namespace    https://foooomio.net/
// @version      0.1
// @description  Reactのドキュメントに日本語版へのリンクを追加します
// @author       foooomio
// @license      MIT License
// @match        https://reactjs.org/*
// @match        https://ja.reactjs.org/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const isJa = location.hostname === 'ja.reactjs.org';

  document.body.innerHTML += `
<div id="translation-link">
  <a href="#">${ isJa ? '英語版へ' : '日本語版へ' }</a>
</div>

<style>
#translation-link {
  --header-width: 1220px;
  position: fixed;
  top: 0;
  left: calc(50% + var(--header-width) / 2);
  height: 60px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  z-index: 1;
}
#translation-link a:hover {
  color: #61dafb;
}
@media (max-width: 1279px) {
  #translation-link {
    height: 50px;
  }
}
@media (max-width: 1399px) {
  #translation-link {
    --header-width: calc(90% - 40px);
  }
}
</style>
`;

  document.querySelector('#translation-link a').addEventListener('click', () => {
    location.hostname = isJa ? 'reactjs.org' : 'ja.reactjs.org';
  });
})();
