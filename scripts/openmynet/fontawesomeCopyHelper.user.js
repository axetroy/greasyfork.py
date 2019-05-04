// ==UserScript==
// @name        fontawesomeCopyHelper
// @namespace   fontawesome
// @description fontawesome 辅助复制
// @include     http://fontawesome.io/icons/
// @version     1.0.0
// @grant       none
// ==/UserScript==
var list = document.querySelectorAll('section .fa-hover');
if (list && list.length) {
  list.forEach(function (item) {
    var i = item.querySelector('i')
    item.querySelector('a').setAttribute('href', '#' + i.classList[1]);
    (function (_i) {
      var i = _i.outerHTML
      item.addEventListener('click', function () {
        alert(i)
      })
    }) (i);
  })
}
