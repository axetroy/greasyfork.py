// ==UserScript==
// @name         天幻 FF1 专题 - 宽屏优化
// @namespace    moe.jixun
// @version      0.1
// @description  大屏优化 - 图片展开、强制插入图片。
// @author       Jixun
// @include      http://ff1.ffsky.cn/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const style = document.createElement("style");
  style.textContent = `

#wrapper, #content, #content-box { width: initial }

#content-box {
  position: absolute;
  left: 200px;
}

html, body {
  background:#fff;
  margin: 0;
}

#footer {
  display: none;
}

`;
  document.head.appendChild(style);

  const links = document.getElementsByTagName("a");
  [].forEach.call(links, link => {
    if (link.textContent.includes("分辨率")) {
      const m = link.textContent.match(/分辨率：(\d+)[*x](\d+)/);

      link.textContent = '';
      if (link.href.endsWith(".htm")) {
        const frame = document.createElement("iframe");
        frame.style.border = 0;
        frame.src = link.href;
        frame.width = parseInt(m[1]) + 16;
        frame.height = parseInt(m[2]) + 16;
        link.parentNode.insertBefore(frame, link);
      } else {
        const img = document.createElement("img");
        img.src = link.href;
        link.appendChild(img);
      }
    }
  });
})();