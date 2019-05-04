// ==UserScript==
// @name         Export Beautify
// @namespace    SaltPacket
// @version      0.1.0
// @description  Changes export JSON format to be pretty-printed.
// @author       SaltPacket
// @match        https://designedfor.sakura.ne.jp/nikuma-n/school-idol-festival/export.html
// @grant        none
// ==/UserScript==

const exportOutput = document.getElementById('dat-export-json');
const accountSelect = document.getElementById('dat-account');

document.getElementById('do-export')
  .addEventListener('click', (event) => {
  event.stopPropagation();

  const account = accountSelect.value;
  const data = localStorage.getItem(account);
  if (data) {
    exportOutput.value = JSON.stringify(JSON.parse(data), null, 4)
  }
});
