(function () {
  'use strict';

  // ==UserScript==
  // @name        JSON formatter
  // @namespace   http://gerald.top
  // @author      Gerald <i@gerald.top>
  // @icon        http://cn.gravatar.com/avatar/a0ad718d86d21262ccd6ff271ece08a3?s=80
  // @description Format JSON data in a beautiful way.
  // @description:zh-CN 更加漂亮地显示JSON数据。
  // @version     2.0.4
  // @require https://cdn.jsdelivr.net/npm/@violentmonkey/dom@1
  // @require https://cdn.jsdelivr.net/npm/lossless-json@1.0.3
  // @match       *://*/*
  // @match       file:///*
  // @grant       GM_getValue
  // @grant       GM_setValue
  // @grant       GM_addStyle
  // @grant       GM_registerMenuCommand
  // @grant       GM_setClipboard
  // ==/UserScript==

  const css = "*{margin:0;padding:0}body,html{font-family:Menlo,Microsoft YaHei,Tahoma}#json-formatter{position:relative;margin:0;padding:2em 1em 1em 2em;font-size:14px;line-height:1.5}#json-formatter>pre{white-space:pre-wrap}#json-formatter>pre:not(.show-commas) .comma,#json-formatter>pre:not(.show-quotes) .quote{display:none}.subtle{color:#999}.number{color:#ff8c00}.null{color:grey}.key{color:brown}.string{color:green}.boolean{color:#1e90ff}.bracket{color:#00f}.item{cursor:pointer}.content{padding-left:2em}.collapse>span>.content{display:inline;padding-left:0}.collapse>span>.content>*{display:none}.collapse>span>.content:before{content:\"...\"}.complex{position:relative}.complex:before{content:\"\";position:absolute;top:1.5em;left:-.5em;bottom:.7em;margin-left:-1px;border-left:1px dashed #999}.complex.collapse:before{display:none}.folder{color:#999;position:absolute;top:0;left:-1em;width:1em;text-align:center;transform:rotate(90deg);transition:transform .3s;cursor:pointer}.collapse>.folder{transform:rotate(0)}.summary{color:#999;margin-left:1em}:not(.collapse)>.summary{display:none}.tips{position:absolute;padding:.5em;border-radius:.5em;box-shadow:0 0 1em grey;background:#fff;z-index:1;white-space:nowrap;color:#000}.tips-key{font-weight:700}.tips-val{color:#1e90ff}.tips-link{color:#6a5acd}.menu{position:fixed;top:0;right:0;background:#fff;padding:5px;user-select:none;z-index:10}.menu>span{display:inline-block;padding:4px 8px;margin-right:5px;border-radius:4px;background:#ddd;border:1px solid #ddd;cursor:pointer}.menu>span.toggle:not(.active){background:none}";

  const h = VM.createElement;
  const gap = 5;
  const formatter = {
    options: [{
      key: 'show-quotes',
      title: '"',
      def: true
    }, {
      key: 'show-commas',
      title: ',',
      def: true
    }]
  };
  const config = { ...formatter.options.reduce((res, item) => {
      res[item.key] = item.def;
      return res;
    }, {}),
    ...GM_getValue('config')
  };
  if (['application/json', 'text/plain', 'application/javascript', 'text/javascript'].includes(document.contentType)) formatJSON();
  GM_registerMenuCommand('Toggle JSON format', formatJSON);

  function createQuote() {
    return h("span", {
      className: "subtle quote"
    }, "\"");
  }

  function createComma() {
    return h("span", {
      className: "subtle comma"
    }, ",");
  }

  function loadJSON() {
    const raw = document.body.innerText; // LosslessJSON is much slower than native JSON, so we just use it for small JSON files.

    const JSON = raw.length > 1024000 ? window.JSON : window.LosslessJSON;

    try {
      // JSON
      const content = JSON.parse(raw);
      return {
        raw,
        content
      };
    } catch (e) {// not JSON
    }

    try {
      // JSONP
      const parts = raw.match(/^(.*?\w\s*\()(.+)(\)[;\s]*)$/);
      const content = JSON.parse(parts[2]);
      return {
        raw,
        content,
        prefix: h("span", {
          className: "subtle"
        }, parts[1].trim()),
        suffix: h("span", {
          className: "subtle"
        }, parts[3].trim())
      };
    } catch (e) {// not JSONP
    }
  }

  function formatJSON() {
    if (formatter.formatted) return;
    formatter.formatted = true;
    formatter.data = loadJSON();
    if (!formatter.data) return;
    formatter.style = GM_addStyle(css);
    formatter.root = h("div", {
      id: "json-formatter"
    });
    document.body.innerHTML = '';
    document.body.append(formatter.root);
    initTips();
    initMenu();
    bindEvents();
    generateNodes(formatter.data, formatter.root);
  }

  function generateNodes(data, container) {
    const rootSpan = h("span", null);
    const root = h("div", null, rootSpan);
    const pre = h("pre", null, root);
    formatter.pre = pre;
    const queue = [{
      el: rootSpan,
      elBlock: root,
      ...data
    }];

    while (queue.length) {
      const item = queue.shift();
      const {
        el,
        content,
        prefix,
        suffix
      } = item;
      if (prefix) el.append(prefix);

      if (Array.isArray(content)) {
        queue.push(...generateArray(item));
      } else if (isObject(content)) {
        queue.push(...generateObject(item));
      } else {
        const type = typeOf(content);
        if (type === 'string') el.append(createQuote());
        const node = h("span", {
          className: `${type} item`,
          "data-type": type,
          "data-value": toString(content)
        }, toString(content));
        el.append(node);
        if (type === 'string') el.append(createQuote());
      }

      if (suffix) el.append(suffix);
    }

    container.append(pre);
    updateView();
  }

  function isObject(item) {
    if (item instanceof window.LosslessJSON.LosslessNumber) return false;
    return item && typeof item === 'object';
  }

  function typeOf(item) {
    if (item == null) return 'null';
    if (item instanceof window.LosslessJSON.LosslessNumber) return 'number';
    return typeof item;
  }

  function toString(content) {
    if (content instanceof window.LosslessJSON.LosslessNumber) return content.toString();
    return `${content}`;
  }

  function setFolder(el, length) {
    if (length) {
      el.classList.add('complex');
      el.append(h("div", {
        className: "folder"
      }, '\u25b8'), h("span", {
        className: "summary"
      }, `// ${length} items`));
    }
  }

  function generateArray({
    el,
    elBlock,
    content
  }) {
    const elContent = content.length && h("div", {
      className: "content"
    });
    setFolder(elBlock, content.length);
    el.append(h("span", {
      className: "bracket"
    }, "["), elContent || ' ', h("span", {
      className: "bracket"
    }, "]"));
    return content.map((item, i) => {
      const elValue = h("span", null);
      const elChild = h("div", null, elValue);
      elContent.append(elChild);
      if (i < content.length - 1) elChild.append(createComma());
      return {
        el: elValue,
        elBlock: elChild,
        content: item
      };
    });
  }

  function generateObject({
    el,
    elBlock,
    content
  }) {
    const keys = Object.keys(content);
    const elContent = keys.length && h("div", {
      className: "content"
    });
    setFolder(elBlock, keys.length);
    el.append(h("span", {
      className: "bracket"
    }, '{'), elContent || ' ', h("span", {
      className: "bracket"
    }, '}'));
    return keys.map((key, i) => {
      const elValue = h("span", null);
      const elChild = h("div", null, createQuote(), h("span", {
        className: "key item",
        "data-type": typeof key
      }, key), createQuote(), ': ', elValue);
      if (i < keys.length - 1) elChild.append(createComma());
      elContent.append(elChild);
      return {
        el: elValue,
        content: content[key],
        elBlock: elChild
      };
    });
  }

  function updateView() {
    formatter.options.forEach(({
      key
    }) => {
      formatter.pre.classList[config[key] ? 'add' : 'remove'](key);
    });
  }

  function removeEl(el) {
    el.remove();
  }

  function initMenu() {
    const handleCopy = () => {
      GM_setClipboard(formatter.data.raw);
    };

    const handleMenuClick = e => {
      const el = e.target;
      const {
        key
      } = el.dataset;

      if (key) {
        config[key] = !config[key];
        GM_setValue('config', config);
        el.classList.toggle('active');
        updateView();
      }
    };

    formatter.root.append(h("div", {
      className: "menu",
      onClick: handleMenuClick
    }, h("span", {
      onClick: handleCopy
    }, "Copy"), formatter.options.map(item => h("span", {
      className: `toggle${config[item.key] ? ' active' : ''}`,
      dangerouslySetInnerHTML: {
        __html: item.title
      },
      "data-key": item.key
    }))));
  }

  function initTips() {
    const tips = h("div", {
      className: "tips",
      onClick: e => {
        e.stopPropagation();
      }
    });

    const hide = () => removeEl(tips);

    document.addEventListener('click', hide, false);
    formatter.tips = {
      node: tips,
      hide,

      show(range) {
        const {
          scrollTop
        } = document.body;
        const rects = range.getClientRects();
        let rect;

        if (rects[0].top < 100) {
          rect = rects[rects.length - 1];
          tips.style.top = `${rect.bottom + scrollTop + gap}px`;
          tips.style.bottom = '';
        } else {
          [rect] = rects;
          tips.style.top = '';
          tips.style.bottom = `${formatter.root.offsetHeight - rect.top - scrollTop + gap}px`;
        }

        tips.style.left = `${rect.left}px`;
        const {
          type,
          value
        } = range.startContainer.dataset;
        tips.innerHTML = '';
        tips.append(h("span", {
          className: "tips-key"
        }, "type"), ': ', h("span", {
          className: "tips-val",
          dangerouslySetInnerHTML: {
            __html: type
          }
        }));

        if (type === 'string' && /^(https?|ftps?):\/\/\S+/.test(value)) {
          tips.append(h("br", null), h("a", {
            className: "tips-link",
            href: value,
            target: "_blank",
            rel: "noopener noreferrer"
          }, "Open link"));
        }

        formatter.root.append(tips);
      }

    };
  }

  function selectNode(node) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.setStartBefore(node.firstChild);
    range.setEndAfter(node.firstChild);
    selection.addRange(range);
    return range;
  }

  function bindEvents() {
    formatter.root.addEventListener('click', e => {
      e.stopPropagation();
      const {
        target
      } = e;

      if (target.classList.contains('item')) {
        formatter.tips.show(selectNode(target));
      } else {
        formatter.tips.hide();
      }

      if (target.classList.contains('folder')) {
        target.parentNode.classList.toggle('collapse');
      }
    }, false);
  }

}());
