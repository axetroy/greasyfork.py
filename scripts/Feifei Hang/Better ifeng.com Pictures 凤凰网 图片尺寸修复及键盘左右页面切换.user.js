// ==UserScript==
// @name        Better ifeng.com Pictures 凤凰网 图片尺寸修复及键盘左右页面切换
// @namespace   feifeihang.info
// @description 如题
// @include     http://*.ifeng.com/*
// @include     https://*.ifeng.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function (window, document, undefined) {
  var LEFT = 37;
  var RIGHT = 39;
  var style = document.createElement('style');
  var css = 'body {width: 100% !important;}' +
  '#picDiv {border: none;}' +
  '#photoimg {display: block !important;} img#photo {width: 100% !important;}';
  style.appendChild(document.createTextNode(css));
  document.body.appendChild(style);
  // set #imgBox width to window.innerWidth - 20px.
  var box = document.querySelector('#imgBox');
  if (box) {
    box.style.maxWidth = box.style.width = (window.innerWidth - 20) + 'px !important';
    window.addEventListener('resize', function () {
      box.style.maxWidth = box.style.width = (window.innerWidth - 20) + 'px !important';
    }, true);
    // bind left and right arrow keys for turning pages if there are page-turning anchors.
    var prev = document.querySelector('a.picPrev');
    var next = document.querySelector('a.picNext');
    if (prev || next) {
      window.addEventListener('keypress', function (evt) {
        // only turn page if no inputs or textareas are active.
        var inputs = document.querySelectorAll('input[type=text], textarea');
        inputs = Array.prototype.slice.apply(inputs);
        if (inputs.indexOf(document.activeElement) === - 1) {
          if (evt.keyCode === LEFT && prev) {
            evt.preventDefault();
            prev.click();
          } 
          else if (evt.keyCode === RIGHT && next) {
            evt.preventDefault();
            next.click();
          }
        }
      });
    }
  }
}) (window, document);
