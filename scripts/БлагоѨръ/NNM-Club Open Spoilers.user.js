// ==UserScript==
// @name         NNM-Club Open Spoilers
// @description  Создаёт кнопку над первым спойлером, при нажатии на которую открываются все спойлеры на странице NNM-Club. Можно (не проверял, но по логике должно) переделать для другого сайта. Для этого нужно вместо CSS-класса .spoiler-wrap вставить селектор спойлера с нужного сайта.
// @license MIT
// @icon http://nnm-club.me/favicon.ico
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       Nexus с сайта JavaScript.Ru
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  var spoilers = [].slice.call(document.querySelectorAll('.spoiler-wrap'));
  if (!spoilers.length)
    return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = 'Открыть все спойлеры';
  btn.addEventListener('click', function () {
    spoilers.forEach(function (node) {
      node.querySelector('.clickable').dispatchEvent(new Event('click'));
    });
  });
  spoilers[0].insertAdjacentHTML('beforebegin', '<br>');
  spoilers[0].insertAdjacentHTML('beforebegin', '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
  spoilers[0].parentNode.insertBefore(btn, spoilers[0]);
})();