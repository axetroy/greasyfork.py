(function () {
  'use strict';

  // ==UserScript==
  // @name translator
  // @namespace https://lufei.so
  // @supportURL https://github.com/intellilab/translator.user.js
  // @description 划词翻译
  // @version 1.5.14
  // @run-at document-start
  // @grant GM_xmlhttpRequest
  // @require https://cdn.jsdelivr.net/npm/vm.jsx
  // @include *
  // ==/UserScript==

  var css = ".panel{color:#333;font-size:14px;max-width:300px;position:fixed;z-index:10000}.body{background-color:#fff;border:1px solid #eaeaea;border-radius:4px;color:#555;font-family:monospace,consolas;line-height:24px;padding:8px;position:relative;word-break:break-all}.header{border-bottom:1px dashed #aaa;padding:0 0 8px}.header>a{color:#7cbef0;cursor:pointer;font-size:12px;margin-left:8px}.detail{font-size:12px;line-height:22px;list-style:none;margin:8px 0 0;padding:0}.detail>li{line-height:26px}";

  var h = VM.createElement;
  var translator = initialize();

  function render(data) {
    var body = translator.body,
        audio = translator.audio;
    body.innerHTML = '';
    var basic = data.basic,
        query = data.query,
        translation = data.translation;

    if (basic) {
      var explains = basic.explains,
          us = basic['us-phonetic'],
          uk = basic['uk-phonetic'];
      var noPhonetic = '&hearts;';

      var handleClick = function handleClick(e) {
        var type = e.target.dataset.type;

        if (type) {
          audio.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(query)}&type=${type}`;
        }
      };

      var header = h("div", {
        className: "header",
        onClick: handleClick
      }, h("span", null, query), h("a", {
        "data-type": "1",
        dangerouslySetInnerHTML: {
          __html: `uk: [${uk || noPhonetic}]`
        }
      }), h("a", {
        "data-type": "2",
        dangerouslySetInnerHTML: {
          __html: `us: [${us || noPhonetic}]`
        }
      }), h("a", {
        target: "_blank",
        href: `http://dict.youdao.com/search?q=${encodeURIComponent(query)}`
      }, "\u8BE6\u60C5"));
      body.append(header);

      if (explains) {
        var lis = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = explains[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            lis.push(h("li", {
              dangerouslySetInnerHTML: {
                __html: item
              }
            }));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var ul = h("ul", {
          className: "detail"
        }, lis);
        body.append(ul);
      }
    } else if (translation) {
      var div = h("div", {
        dangerouslySetInnerHTML: {
          __html: translation[0]
        }
      });
      body.append(div);
    }
  }

  function translate(e) {
    var sel = window.getSelection();
    var text = sel.toString();
    if (/^\s*$/.test(text)) return;
    var _document = document,
        activeElement = _document.activeElement;
    if (['input', 'textarea'].indexOf(activeElement.tagName.toLowerCase()) < 0 && !activeElement.contains(sel.getRangeAt(0).startContainer)) return;
    var query = {
      type: 'data',
      doctype: 'json',
      version: '1.1',
      relatedUrl: 'http://fanyi.youdao.com/',
      keyfrom: 'fanyiweb',
      key: null,
      translate: 'on',
      q: text,
      ts: Date.now()
    };
    var qs = Object.keys(query).map(function (key) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`;
    }).join('&');
    GM_xmlhttpRequest({
      method: 'GET',
      url: `https://fanyi.youdao.com/openapi.do?${qs}`,

      onload(res) {
        var data = JSON.parse(res.responseText);

        if (!data.errorCode) {
          render(data);
          var root = translator.root,
              panel = translator.panel;
          var _window = window,
              innerWidth = _window.innerWidth,
              innerHeight = _window.innerHeight;

          if (e.clientY > innerHeight * 0.5) {
            panel.style.top = 'auto';
            panel.style.bottom = `${innerHeight - e.clientY + 10}px`;
          } else {
            panel.style.top = `${e.clientY + 10}px`;
            panel.style.bottom = 'auto';
          }

          if (e.clientX > innerWidth * 0.5) {
            panel.style.left = 'auto';
            panel.style.right = `${innerWidth - e.clientX}px`;
          } else {
            panel.style.left = `${e.clientX}px`;
            panel.style.right = 'auto';
          }

          document.body.append(root);
        }
      }

    });
  }

  function debounce(func, delay) {
    var timer;

    function exec() {
      timer = null;
      func.apply(void 0, arguments);
    }

    return function () {
      if (timer) clearTimeout(timer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      timer = setTimeout.apply(void 0, [exec, delay].concat(args));
    };
  }

  function initialize() {
    var audio = h("audio", {
      autoplay: true
    });
    var root = h("div", {
      id: "translator.user.js"
    });
    var shadow = root.attachShadow({
      mode: 'open'
    });
    var panel = h("div", {
      className: "panel"
    });
    var panelBody = h("div", {
      className: "body"
    });
    shadow.append(h("style", null, css), panel);
    panel.append(panelBody);
    var debouncedTranslate = debounce(translate);
    var isSelecting;
    document.addEventListener('mousedown', function (e) {
      isSelecting = false;
      if (e.target === root) return;
      root.remove();
      panelBody.innerHTML = '';
    }, true);
    document.addEventListener('mousemove', function () {
      isSelecting = true;
    }, true);
    document.addEventListener('mouseup', function (e) {
      if (panel.contains(e.target) || !isSelecting) return;
      debouncedTranslate(e);
    }, true);
    document.addEventListener('dblclick', function (e) {
      if (panel.contains(e.target)) return;
      debouncedTranslate(e);
    }, true);
    return {
      audio,
      root,
      panel,
      body: panelBody
    };
  }

}());
