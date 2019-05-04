// ==UserScript==
// @name HTML Sniffer
// @namespace http://gerald.top
// @author Gerald <i@gerald.top>
// @icon	http://cn.gravatar.com/avatar/a0ad718d86d21262ccd6ff271ece08a3?s=80
// @version 0.1.2
// @description A tool to sniff HTML tags and attributes.
// @include *
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

function prevent(e) {
  e.preventDefault();
}

function capture(e) {
  prevent(e);
  if (sniffer.current) {
    sniffer.current.classList.remove(sniffer.CURRENT);
  }
  sniffer.current = e.target;
  sniffer.current.classList.add(sniffer.CURRENT);
  updateDOM();
}

function onmouseover(e) {
  if (sniffer.hovered) {
    sniffer.hovered.classList.remove(sniffer.HOVERED);
  }
  sniffer.hovered = e.target;
  sniffer.hovered.classList.add(sniffer.HOVERED);
}

function safeHTML(html) {
  return html.replace(/[<&]/g, (m) => {
    return {
      '<' : '&lt;',
      '&' : '&amp;',
    }[m];
  });
}

function updateDOM() {
  var current = sniffer.current;
  var tagName = current.tagName.toLowerCase();
  var tags = document.querySelectorAll(tagName);
  var arrayProto = Array.prototype;
  var index = arrayProto.indexOf.call(tags, current);
  dom.domName.textContent = tagName;
  dom.domIndex.innerHTML = `(<span class="dom-index-cur">${index}</span> of <span class="dom-index-total">${tags.length}</span>)`;
  dom.domAttrs.innerHTML = arrayProto.map.call(current.attributes, (attr) => {
    return `
    <li>
      <span class="dom-attr-key">${safeHTML(attr.name)}</span>
      =
      <span class="dom-attr-val">${safeHTML(attr.value)}</span>
    </li>
    `;
  }).join('');
}

function toggleCapture() {
  sniffer.capture = !sniffer.capture;
  if (sniffer.capture) {
    document.addEventListener('mousedown', capture, true);
    document.addEventListener('mouseup', prevent, true);
    document.addEventListener('click', prevent, true);
    document.addEventListener('mouseover', onmouseover, false);
  } else {
    if (sniffer.current) {
      sniffer.current.classList.remove(sniffer.CURRENT);
      sniffer.current = null;
    }
    if (sniffer.hovered) {
      sniffer.hovered.classList.remove(sniffer.HOVERED);
      sniffer.hovered = null;
    }
    document.removeEventListener('mousedown', capture, true);
    document.removeEventListener('mouseup', prevent, true);
    document.removeEventListener('click', prevent, true);
    document.removeEventListener('mouseover', onmouseover, false);
  }
}

function init() {
  GM_addStyle(`
    #hsniffer {
      position: fixed;
      width: 300px;
      height: 300px;
      border: 0;
      box-shadow: 0 0 5px gray;
      z-index: 10000;
    }
    *:not(#hsniffer).hsniffer-highlight {
      background: rgba(0,128,255,.3) !important;
      outline: 2px solid orange !important;
    }
    .hsniffer-current {
      background: rgba(0,128,255,.5) !important;
      outline: 2px solid red !important;
    }
  `);
  initFrame();
  locate(GM_getValue('hs-location'));
}

function locate(pos) {
  pos = pos || {};
  if (pos.left == null) pos.left = 'auto';
  else if (!isNaN(pos.left)) pos.left += 'px';
  if (pos.right == null) {
    pos.right = pos.left == 'auto' ? 0 : 'auto';
  } else if (!isNaN(pos.right)) pos.right += 'px';
  if (pos.bottom == null) pos.bottom = 'auto';
  else if (!isNaN(pos.bottom)) pos.bottom += 'px';
  if (pos.top == null) {
    pos.top = pos.bottom == 'auto' ? 0 : 'auto';
  } else if (!isNaN(pos.top)) pos.top += 'px';
  var frame = dom.frame;
  frame.style.top = pos.top;
  frame.style.left = pos.left;
  frame.style.right = pos.right;
  frame.style.bottom = pos.bottom;
}

function initFrame() {
  var frame = dom.frame = document.createElement('iframe');
  frame.id='hsniffer';
  document.body.appendChild(frame);
  var doc = frame.contentDocument;
  var style = doc.createElement('style');
  style.innerHTML = `
    body {
      min-height: 100%;
      padding: 1em;
      background: wheat;
      cursor: move;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .dom {
      cursor: text;
    }
    ul {
      padding: 20px;
    }
    .dom-name {
      color: brown;
    }
    .dom-index-cur {
      color: blue;
    }
    .dom-attr-key {
      color: dodgerblue;
    }
    .dom-attr-val {
      color: green;
    }
    .dom-buttons {
      margin: 1em 0;
    }
    .btn-sniff {
      padding: .5em;
      border: 2px outset #ccc;
      border-radius: 4px;
      background: #ccc;
      cursor: pointer;
    }
    .btn-sniff.active {
      border: 2px inset #444;
      background: #444;
      color: white;
    }
  `;
  doc.head.appendChild(style);
  doc.body.innerHTML = `
  <h1>HTML Sniffer</h1>
  <div class="dom">
  <div class="dom-buttons">
  <span class="btn-sniff">Sniff</span>
  </div>
  Current DOM: <span class="dom-name"></span> <span class="dom-index"></span>
  <br><ul class="dom-attrs"></ul>
  </div>
  `;
  dom.dom = doc.body.querySelector('.dom');
  dom.domName = doc.body.querySelector('.dom-name');
  dom.domIndex = doc.body.querySelector('.dom-index');
  dom.domAttrs = doc.body.querySelector('.dom-attrs');
  dom.btnSniff = doc.body.querySelector('.btn-sniff');
  doc.addEventListener('mousedown', onMoveStart, false);
  dom.btnSniff.addEventListener('click', (e) => {
    toggleCapture();
    dom.btnSniff.classList.toggle('active');
  }, false);

  var moving;
  function onMoveStart(e) {
    if (dom.dom.contains(e.target)) return;
    e.preventDefault();
    if (moving) return;
    moving = {
      x: e.clientX,
      y: e.clientY,
    };
    doc.addEventListener('mousemove', onMoving, false);
    doc.addEventListener('mouseup', onMoveEnd, false);
  }
  function onMoving(e) {
    var rect = frame.getBoundingClientRect();
    locate({
      left: rect.left + e.clientX - moving.x,
      top: rect.top + e.clientY - moving.y,
    });
  }
  function onMoveEnd(e) {
    var rect = frame.getBoundingClientRect();
    var pos = {};
    var right = document.body.clientWidth - rect.right;
    if (rect.left > right) pos.right = right;
    else pos.left = rect.left;
    var bottom = document.body.clientHeight - rect.bottom;
    if (rect.top > bottom) pos.bottom = bottom;
    else pos.top = rect.top;
    locate(pos);
    GM_setValue('hs-location', pos);
    moving = null;
    doc.removeEventListener('mousemove', onMoving, false);
    doc.removeEventListener('mouseup', onMoveEnd, false);
  }
}

if (window.top === window) {
  var dom = {};
  var sniffer = {
    capture: false,
    HOVERED: 'hsniffer-highlight',
    CURRENT: 'hsniffer-current',
  };
  init();
}
