// ==UserScript==
// @name         Disable 'disable right click'
// @namespace    https://github.com/mosaicer
// @author       mosaicer
// @description  Disables the ugly feature that disables right click
// @version      1.4
// @include      *
// @run-at       document-end
// @grant        GM_addStyle
// ==/UserScript==
(function() {
  'use strict';

  var scriptTag = document.createElement('script');

  scriptTag.setAttribute('type', 'text/javascript');
  scriptTag.textContent = "$(function() {\n" +
    // "  $('[oncontextmenu]').removeAttr('oncontextmenu');\n" +
    // "  $('[onselectstart=\"return false;\"]').removeAttr('onselectstart');\n" +
    // "  $('[onmousedown=\"return false;\"]').removeAttr('onmousedown');\n" +
    // "  $('[oncopy]').removeAttr('oncopy');\n" +
    // "  $('[unselectable]').removeAttr('unselectable');\n" +
    "  $('body').off('copy contextmenu selectstart').unbind('contextmenu');\n" +
    "});";

  document.getElementsByTagName('body')[0].appendChild(scriptTag);

  [].forEach.call(document.querySelectorAll('[oncontextmenu]'),
    function (targetNode) {
      targetNode.removeAttribute('oncontextmenu');
    }
  );

  [].forEach.call(document.querySelectorAll('[onselectstart="return false;"]'),
    function (targetNode) {
      targetNode.removeAttribute('onselectstart');
    }
  );

  [].forEach.call(document.querySelectorAll('[onmousedown="return false;"]'),
    function (targetNode) {
      targetNode.removeAttribute('onselectstart');
    }
  );

  [].forEach.call(document.querySelectorAll('[oncopy]'),
    function (targetNode) {
      targetNode.removeAttribute('oncopy');
    }
  );

  [].forEach.call(document.querySelectorAll('[unselectable]'),
    function (targetNode) {
      targetNode.removeAttribute('unselectable');
    }
  );

  if (document.onmousedown === 'rightclick') {
    document.onmousedown = '';
  }

  if (document.oncontextmenu) {
    document.oncontextmenu = '';
  }

  GM_addStyle('* {user-select: text !important; -moz-user-select: text !important; -webkit-user-select: text !important; -webkit-user-drag: text !important; -khtml-user-select: text !important; -khtml-user-drag: text !important; pointer-events: auto !important;}');
}());