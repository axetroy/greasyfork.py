// ==UserScript==
// @author       oksuluf@gmail.com
// @name         夜间模式
// @version      1.0.0.102
// @description  保护视力，预防近视，调整亮度，夜间模式
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @namespace   http://extension.suluf.com/
// @run-at      document-start
// ==/UserScript==

(function($) {
  var cover = null;
  var showCoverDefault = getStorage('is_show_cover', 'true') == 'true';
  var opacityDefault = +getStorage('opacity', '0.45');
  var id = '__nightingale_view_cover';

  function getStorage(key, def) {
    return localStorage.getItem(key) || def;
  }

  function setStorage(key, val) {
    localStorage.setItem(key, val);
  }

  function getZIndex() {
    var maxZ = Math.max.apply(null, $.map($('body > *'), function(f, g) {
      return parseInt($(f).css('z-index')) || 1;
    }));

    var maxR = Math.max.apply(null, $.map($('body > *'), function(f, g) {
      if ($(f).css('position') == 'relative') {
        return parseInt($(f).css('z-index')) || 1;
      }
    }));

    maxZ = (maxZ + maxR + 2 >= 2147483647) ? (maxZ + maxR + 2) : 2147483647;
    return maxZ;
  }

  // Init content script
  function initScript() {
    $('#' + id).remove();
    cover = document.createElement('div');
    cover.id = id;
    cover.setAttribute('style',
      'width: 100%; ' +
      'height: 100%; ' +
      'position: fixed !important;' +
      'left: 0 !important;' +
      'opacity: 0 !important;' +
      'bottom: 0 !important;' +
      '-webkit-transition: -webkit-transform 10s ease-in-out;' +
      'overflow: hidden !important;' +
      'background: #000000 !important;' +
      'pointer-events: none !important;'
    );
    cover.style.zIndex = getZIndex();
    cover.style.opacity = showCoverDefault ? localStorage.coverOpacity : 0;
    document.body.appendChild(cover);
    domObserver();
    setOpacity(opacityDefault);
  }

  function setOpacity(opacity) {
    setStorage('opacity', opacity);
    $(cover).animate({
      opacity: showCoverDefault ? opacity : 0
    }, 1000);
  }

  function domObserver(timer) {
    new MutationObserver(function(mutations) {
      timer && clearTimeout(timer);
      timer = setTimeout(function() {
        if ($('#' + id).length === 0) {
          initScript();
        }
      }, 100);
    }).observe(document.body, {
      childList: true
    });
  }

  if (document.readyState == 'complete') {
    initScript();
  } else {
    window.addEventListener('DOMContentLoaded', function() {
      initScript();
    });
  }

  window.addEventListener('keydown', function(e) {
    if (e.altKey && e.keyCode == 116) {
      showCoverDefault = !showCoverDefault;
      setStorage('is_show_cover', showCoverDefault);
      showCoverDefault(opacityDefault);
    } else {
      if (e.altKey && e.keyCode == 38) {
        if (!showCoverDefault || cover.style.opacity <= .15) {
          return
        }
        opacityDefault = Number(cover.style.opacity);
        opacityDefault = (opacityDefault - .1 <= .15) ? .1 : (opacityDefault - .1);
        setOpacity(opacityDefault);
      } else {
        if (e.altKey && e.keyCode == 40) {
          if (!showCoverDefault || cover.style.opacity >= .95) {
            return
          }
          opacityDefault = Number(cover.style.opacity);
          opacityDefault = (opacityDefault + 0.1 <= .95) ? (opacityDefault + .1) : .95;
          setOpacity(opacityDefault);
        } else {
          if (e.altKey && e.keyCode == 117) {
            if (!showCoverDefault) {
              return;
            }
            opacityDefault = 0.45;
            setOpacity(opacityDefault);
          }
        }
      }
    }
  }, true);
})(jQuery.noConflict());
