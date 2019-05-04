// ==UserScript==
// @name         Кнопка "Показать в полном размере" для Google Картинки
// @namespace    https://github.com/Kenya-West/make-gis-great-again
// @version      1.2
// @description  Этот скрипт добавляет кнопку "Показать в полном размере"  для Google Картинки.
// @author       Bae Junehyeon
// @run-at       document-end
// @include      http*://*.google.tld/search*tbm=isch*
// ==/UserScript==


function addButton(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.classList.contains('irc_ris')) {
      let container = node.closest('.irc_c');
      let thumbnail = document.querySelector('img[name="' + container.dataset.itemId + '"]');
      let meta = thumbnail.closest('.rg_bx').querySelector('.rg_meta');

      let metadata = JSON.parse(meta.innerHTML);
      let src = metadata.ou;

      let buttons = container.querySelector('.irc_but_r tr');

      let button = buttons.querySelector('td.mgisga');
      if (button === null) {
        let openButton = buttons.querySelector('td');

        button = openButton.cloneNode(true);
        button.classList.add('mgisga');
        button.querySelector('._WKw').innerText = 'Показать в полном размере';

        let link = button.querySelector('a');
        link.href = src;
        link.className = '';
        link.removeAttribute('data-cthref');
        link.removeAttribute('jsaction');

        openButton.after(button);
      }

      let link = button.querySelector('a');
      link.href = src;
    }
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    const addedNodes = mutation.addedNodes || [];

    addedNodes.forEach((newNode) => {
      addButton(newNode);
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

addButton(document.body);