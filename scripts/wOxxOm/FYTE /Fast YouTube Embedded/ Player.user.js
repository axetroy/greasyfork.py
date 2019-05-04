// ==UserScript==
// @name           FYTE /Fast YouTube Embedded/ Player
// @description    Hugely improves load speed of pages with lots of embedded Youtube videos by instantly showing clickable and immediately accessible placeholders, then the thumbnails are loaded in background. Optionally a fast simple HTML5 direct playback (720p max) can be selected if available for the video.
// @description:ru На порядок ускоряет время загрузки страниц с большим количеством вставленных Youtube-видео. С первого момента загрузки страницы появляются заглушки для видео, которые можно щелкнуть для загрузки плеера, и почти сразу же появляются кавер-картинки с названием видео. В опциях можно включить режим использования упрощенного браузерного плеера (макс. 720p).
// @version        2.9.12
// @include        *
// @exclude        /^https:\/\/(www\.)?youtube\.com\/(?!embed)/
// @exclude        https://accounts.google.*/o/oauth2/postmessageRelay*
// @exclude        https://clients*.google.*/youtubei/*
// @exclude        https://clients*.google.*/static/proxy*
// @author         wOxxOm
// @namespace      wOxxOm.scripts
// @license        MIT License
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @connect        www.youtube.com
// @connect        youtube.com
// @run-at         document-start
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuxkb8AAAAPdFJOUwDvH0biMvjOZFW6pxJ6kh7r3iMAAAPDSURBVGje7ZlNaBNBFMeXhNDWpkKgFg9iYlBB6SGwiPQkftaCYATjTaRKiwi1xVaKXpqTpHhosR66p4pQhb209CQGbSweK/TiRYwfFy+NkWBM2pR2nHm73abJzuceRMj/kEzSvl92Z9689+atpjXUUEMN1WgpoRupbH41nTbNUaxzlkIhe0C+M810Ov8zmzL0RGeNeeDThUEkof72N/Fqe/8LJK07sR173yJS0EbEATxFSurZtm9DilqxAV9VAZuWfbPbLBOFqtSBP9f/WxIAV2Bc6H5owiKPG7p+IpFIRG11LsPbEfyVrhvTqeyX1dfmaBiM9gFgjgwrTzJSfncMFq7s3EExJuu5/rHte3hPBvfkff84sbuEBxPkUiLygCC5hDV7CvpUtt81axICZBN9UwHsxYalOMxhIaIC8IVhFlvJtlALIWQl57Um/LquBpjBpkOwin1qADKLB7RD9moqiPz2TcAMqQGa4OI9Av5op/DrMzXAHmz6mw4IxEQA67AW825/bhngAVoBMEHzZD+aFQCsQUCkAAor/M2wCYAVdwCqxJmANgD8cmJjPQDt5wK22AD0nAVoBsAiE1BMcgAbAJikAqoTYP1CA4BEtBgdgC6yARUuAC3QI7sDiLMAxUk2YAwiIwNAn4YAhGU+YKcOqAUMCgJQziugHGMALmNAhANAWxkaoEgABS4ADdMyiyiglPMIcJ0GKQAayDAAGQEAuu8VUB/gJAH1AS4IgLAwAA24AAoygAeuAPFbqHPHoNwc1HuCJCDncRl7NG8At7Ak48qugVEGsOBxO7snB58T0ngASlwWjomFpMegOusxrFOLBCexsFMbvUzxCyVXRqEkBpjlpXdOgcEqFlsEKpRynFviMIus0md+kcUEDAuUeaxCcysjUGgySt1yTKTUZRTbOaFim17unxUr92doBw4f9zTKObGInZl+//NTW592VP3g+Q4Onh6Ovjfgt5vsPoSCJuDuPRz/58CFmhEtKPIEvY8kZAd3VxRxRJJSyIXcUu0/VOz3okITJRC2ex9kGdB5ecBVZLtgCyt70fUB2nGTTjOu/HFZohsXXLoOrbQKfDps1ePtTj9wSter2oGWoBnYRZqB+bQ5OnLaShpnrNAz6N6R7OW1I1HJjnmPVFuit7eDV1jNvuAkpJNqgJ0DQPCHiv3dqmULfJe3P7hrB/oej3T0S/Tme7tf1Xp/MArPB/Ayp82X5OlAaJfI8wHsJ2/zWXg6EGV4XXB5CbuN3mUYxnQKNI6HU9i3op0y3tpQQw39b/oLfDt0HcsiqWsAAAAASUVORK5CYII=
// @compatible     chrome
// @compatible     firefox
// @compatible     opera
// ==/UserScript==

'use strict';

// keep video info cache for a month since last time it's shown
var CACHE_STALE_DURATION = 30 * 24 * 3600e3;

var playQuality = GM_getValue('quality', 'auto') || 'auto';

if (/^https:\/\/(www\.)?youtube\.com\//.test(location)) {
  if (playQuality !== 'auto') {
    window.addEventListener('load', function _() {
      window.removeEventListener('load', _);
      var player = $('.html5-video-player');
      if (player && typeof player.setPlaybackQuality === 'function')
        player.setPlaybackQuality(playQuality);
    });
  }
  if (!window.chrome || window === window.parent)
    return;
  var fsbtn = document.getElementsByClassName('ytp-fullscreen-button');
  new MutationObserver(function() {
    if (fsbtn[0]) {
      this.disconnect();
      // noinspection SillyAssignmentJS
      fsbtn[0].outerHTML = fsbtn[0].outerHTML.replace('aria-disabled="true"', '');
      fsbtn[0].addEventListener('click', function() {
        window.parent.postMessage('FYTE-toggle-fullscreen', '*');
      });
    }
  }).observe(document, {subtree:true, childList:true});
  return;
}

var resizeMode = GM_getValue('resize', 'Fit to width');
if (typeof resizeMode !== 'string')
  resizeMode = resizeMode ? 'Fit to width' : 'Original';

var resizeWidth = GM_getValue('width', 1280) |0;
var resizeHeight = GM_getValue('height', 720) |0;
updateCustomSize();

var pinnedWidth = GM_getValue('pinnedWidth', 400) |0;

var playDirectly = !!GM_getValue('playHTML5', false);
var playDirectlyShown = !!GM_getValue('playHTML5shown', false);
var skipCustom = !!GM_getValue('skipCustom', true);
var showStoryboard = !!GM_getValue('showStoryboard', true);
var pinnable = GM_getValue('pinnable', 'on');
if (!/^(on|hide|off)$/.test(pinnable))
  pinnable = !!pinnable ? 'on' : 'hide';

var _ = initTL();

var imageLoader = document.createElement('img');
var imageLoader2 = document.createElement('img');

var fytedom = document.getElementsByClassName('instant-youtube-container');
var iframes = document.getElementsByTagName('iframe');
var objects = document.getElementsByTagName('object');
var checked = [];
var persite = (function() {
  var rules = [
    {host: 'developers.google.com',
      match: '[data-video-id]',
      src: function(e) { return '//youtube.com/embed/' + e.dataset.videoId }},
    {host: 'play.google.com', eatparent: 0},
    {host: /(^|\.)google\.\w{2,3}(\.\w{2,3})?$/, class:'g-blk', query: 'a[href*="youtube.com/watch"][data-ved]', eatparent: 1},
    {host: 'pikabu.ru', class:'b-video', match: '[data-url*="youtube.com/embed"]', attr: 'data-url'},
    {host: 'androidauthority.com', eatparent: '.video-container'},
    {host: 'reddit.com',
      match: '[data-url*="youtube.com/"] [src*="/mediaembed"], [data-url*="youtu.be/"] [src*="/mediaembed"]',
      src: function(e) { return e.closest('[data-url*="youtube.com/"], [data-url*="youtu.be/"]').dataset.url }},
    {host: /(www\.)?theverge\.com$/, eatparent: '.p-scalable-video'},
    {host: '9gag.com', eatparent: 0},
    {host: 'reddit.com', match: '[data-url*="youtube.com"] iframe[src*="redditmedia.com/mediaembed"]',
      src: function(e) { return e.closest('[data-url*="youtube.com"]').dataset.url }},
    {host: 'anilist.co', eatparent: '.youtube'},
  ];
  for (var i=0, rule; (i<rules.length) && (rule=rules[i]); i++) {
    var rx = rule.host instanceof RegExp ? rule.host : new RegExp('(^|\\.)' + rule.host.replace(/\./g, '\\.') + '$', 'i');
    if (rx.test(location.hostname)) {
      if (!rule.tag && !rule.class)
        rule.tag = 'iframe';
      if (!rule.match && !rule.query)
        rule.match = '[src*="youtube.com/embed"]';
      return {
        nodes: rule.class ? document.getElementsByClassName(rule.class) : document.getElementsByTagName(rule.tag),
        match: rule.match ?
          function(e) {
            // noinspection JSReferencingMutableVariableFromClosure
            return e.matches(rule.match) ? e : null;
          } :
          function(e) {
            // noinspection JSReferencingMutableVariableFromClosure
            return e.querySelector(rule.query);
          },
        attr: rule.attr,
        src:  rule.src,
        eatparent: rule.eatparent,
      };
    }
  }
})();

findEmbeds([]);
injectStylesIfNeeded();
new MutationObserver(findEmbeds).observe(document, {subtree:true, childList:true});

document.addEventListener('DOMContentLoaded', function(e) {
  injectStylesIfNeeded();
  adjustNodesIfNeeded(e);
  setTimeout(cleanupCache, 60e3);
});
window.addEventListener('resize', adjustNodesIfNeeded, true);
window.addEventListener('message', function(e) {
  if (e.data === 'FYTE-toggle-fullscreen') {
    $$('iframe[allowfullscreen]').some(function(iframe) {
      if (iframe.contentWindow === e.source) {
        goFullscreen(iframe, !(document.webkitIsFullScreen || document.mozIsFullScreen || document.isFullScreen));
        return true;
      }
    });
  }
  else if (e.data === 'iframe-allowfs') {
    $$('iframe:not([allowfullscreen])').some(function(iframe) {
      if (iframe.contentWindow === e.source) {
        iframe.allowFullscreen = true;
        return true;
      }
    });
    if (window !== window.top)
      window.parent.postMessage('iframe-allowfs', '*');
  }
});

function findEmbeds(mutations) {
  var i, len, e, m;
  if (mutations.length === 1) {
    var added = mutations[0].addedNodes;
    if (!added[0] || !added[1] && added[0].nodeType === 3)
      return;
  }
  if (persite)
    for (i=0, len=persite.nodes.length; (i<len) && (e=persite.nodes[i]); i++)
      if ((e = persite.match(e)))
        processEmbed(e, persite.src && persite.src(e) || e.getAttribute(persite.attr));
  for (i=0, len=iframes.length; (i<len) && (e=iframes[i]); i++) {
    if (checked.includes(e)) continue;
    checked.push(e);
    if (/youtube\.com|youtu\.be/i.test(e.src || e.dataset.src))
      processEmbed(e, e.src || e.dataset.src);
  }
  for (i=0, len=objects.length; (i<len) && (e=objects[i]); i++) {
    if (checked.includes(e)) continue;
    checked.push(e);
    if ((m = e.querySelector('embed, [value*="youtu.be"], [value*="youtube.com"]')))
      processEmbed(e, m.src || e.dataset.src || 'https://' + m.value.match(/youtu\.be.*|youtube\.com.*/)[0]);
  }
}

function processEmbed(node, src) {
  function decodeEmbedUrl(url) {
    return url.indexOf('youtube.com%2Fembed') > 0
       ? decodeURIComponent(url.replace(/^.*?(http[^&?=]+?youtube.com%2Fembed[^&]+).*$/i, '$1'))
         : url;
  }
  src = src || node.src || node.href || '';
  var n = node;
  var np = n.parentNode;
  var srcFixed = decodeEmbedUrl(src).replace(/\/(watch\?v=|v\/)/, '/embed/').replace(/^([^?&]+)&/, '$1?');
  if (src.indexOf('cdn.embedly.com/') > 0 ||
    resizeMode !== 'Original' && np && np.children.length === 1 && !np.className && !np.id)
  {
    n = location.hostname === 'disqus.com' ? np.parentNode : np;
    np = n.parentElement;
  }
  if (!np ||
    !np.parentNode ||
    skipCustom && srcFixed.indexOf('enablejsapi=1') > 0 ||
    node.matches('.instant-youtube-embed, .YTLT-embed') ||
    srcFixed.indexOf('/embed/videoseries') > 0 ||
    node.onload // skip some retarded loaders
  )
    return;

  var id = srcFixed.match(/(?:^(?:https?:)?\/\/)(?:www\.)?(?:youtube\.com\/(?:embed\/(?:v=)?|\/.*?[&?\/]v[=\/])|youtu\.be\/)([^\s,.()\[\]?]+?)(?:[&?\/].*|$)/);
  if (!id)
    return;
  id = id[1];

  var autoplay = srcFixed.indexOf('autoplay=1') > 0;

  if (np.localName === 'object')
    n = np, np = n.parentElement;

  var eatparent = persite && persite.eatparent || 0;
  if (typeof eatparent === 'string')
    n = np.closest(eatparent) || n, np = n.parentElement;
  else
    while (eatparent--)
      n = np, np = n.parentElement;

  injectStylesIfNeeded('force');

  var div = document.createElement('div');
  div.className = 'instant-youtube-container';
  div.FYTE = {
    state: 'querying',
    srcEmbed: srcFixed.replace(/&$/, ''),
    originalWidth: /%/.test(node.width) ? 320 : node.width|0 || n.clientWidth|0,
    originalHeight: /%/.test(node.height) ? 200 : node.height|0 || n.clientHeight|0,
    cache: tryJSONparse(localStorage['FYTE-cache-' + id]) || {
      id: id,
    }
  };
  div.FYTE.srcEmbedFixed = div.FYTE.srcEmbed.replace(/^http:/, 'https:').replace(/([&?])(wmode=\w+|feature=oembed)&?/, '$1').replace(/[&?]$/, '');
  div.FYTE.srcWatchFixed = div.FYTE.srcEmbedFixed.replace(/\/embed\//, '/watch?v=').replace(/(\?.*?)\?/, '$1&');

  var cache = div.FYTE.cache;
  cache.lastUsed = Date.now();
  localStorage['FYTE-cache-' + id] = JSON.stringify(cache);

  if (cache.reason)
    div.setAttribute('disabled', '');

  var divSize = calcContainerSize(div, n);
  var origStyle = getComputedStyle(n);
  div.style.cssText = important(
    (autoplay ? '' : 'background-color:transparent; transition:background-color 2s;') +
    (origStyle.hasOwnProperty('position') ? Object.keys(origStyle) : Object.keys(origStyle.__proto__) /*FF*/)
      .filter(function(k) { return !!k.match(/^(position|left|right|top|bottom)$/) })
      .map(function(k) { return k + ':' + origStyle[k] })
      .join(';')
      .replace(/\b[^;:]+:\s*(auto|static|block)\s*(!\s*important)?;/g, '') +
    (origStyle.display === 'inline' ? ';display:inline-block;width:100%' : '') +
    ';min-width:' + Math.min(divSize.w, div.FYTE.originalWidth) + 'px' +
    ';min-height:' + Math.min(divSize.h, div.FYTE.originalHeight) + 'px' +
    (resizeMode === 'Fit to width' ? ';width:100%' : '') +
    ';max-width:' + divSize.w + 'px; height:' + (persite && persite.eatparent === 0 ? '100%;' : divSize.h + 'px;'));
  if (!autoplay) {
    setTimeout(function() { div.style.backgroundColor = '' }, 0);
    setTimeout(function() { div.style.transition = '' }, 2000);
  }

  // consume parents of retardedly positioned videos
  var parentStyle = getComputedStyle(np);
  if (div.style.position.match('absolute|relative')
  && parseFloat(parentStyle.paddingTop) + parseFloat(parentStyle.paddingBottom) < parseFloat(parentStyle.height)) {
    if (np.children.length === 1 &&
      floatPadding(np, parentStyle, 'Top') >= div.FYTE.originalHeight-1 ||
      floatPadding(np, getComputedStyle(np, ':after'), 'Top') >= div.FYTE.originalHeight-1
    ) {
      n = np, np = n.parentElement;
    }
    div.style.cssText = div.style.cssText.replace(/\b(position|left|top|right|bottom):[^;]+/g, '');
  }

  var wrapper = div.appendChild(document.createElement('div'));
  wrapper.className = 'instant-youtube-wrapper';

  var img = wrapper.appendChild(document.createElement('img'));
  if (!autoplay)
    img.src = 'https://i.ytimg.com/vi/' + id + '/' + (cache.cover || 'maxresdefault.jpg');
  img.className = 'instant-youtube-thumbnail';
  img.style.cssText = important((cache.cover ? '' : 'transition:opacity 0.1s ease-out; opacity:0; ') +
    'padding:0; margin:auto; position:absolute; left:0; right:0; top:0; bottom:0; max-width:none; max-height:none;');

  img.onload = function(e) {
    if (img.naturalWidth <= 120 && !cache.cover)
      return img.onerror(e);
    var fitToWidth = true;
    if (img.naturalHeight || cache.coverHeight) {
      if (!cache.coverHeight) {
        cache.coverWidth = img.naturalWidth;
        cache.coverHeight = img.naturalHeight;
        localStorage['FYTE-cache-' + id] = JSON.stringify(cache);
      }
      var ratio = cache.coverWidth / cache.coverHeight;
      if (ratio > 4.1/3 && ratio < divSize.w/divSize.h) {
        img.style.cssText += important('width:auto; height:100%;');
        fitToWidth = false;
      }
    }
    if (fitToWidth) {
      img.style.cssText += important('width:100%; height:auto;');
    }
    if (cache.videoWidth)
      fixThumbnailAR(div);
    if (!autoplay)
      img.style.opacity = 1;
  };
  img.onerror = function() {
    if (img.src.indexOf('maxresdefault') > 0)
      img.src = img.src.replace('maxresdefault','sddefault');
    else if (img.src.indexOf('sddefault') > 0)
      img.src = img.src.replace('sddefault','hqdefault');
  };
  if (cache.coverWidth)
    img.onload();

  translateHTML(wrapper, 'beforeend', '\
    <a class="instant-youtube-title" target="_blank" href="' + div.FYTE.srcWatchFixed + '">' +
      (cache.title || cache.reason ? '<strong>' + (cache.title || cache.reason || '') + '</strong>' +
                                     (cache.duration ? '<span>' + cache.duration + '</span>' : '') +
                                     (cache.fps ? '<i>, ' + cache.fps + 'fps</i>' : '')
                                   : '&nbsp;') + '</a>\
    <svg class="instant-youtube-play-button">\
      <path fill-rule="evenodd" clip-rule="evenodd" fill="#1F1F1F" class="ytp-large-play-button-svg" d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z">\
        <title tl>msgAltPlayerHint</title>\
      </path>\
      <polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="33.3,41.4 33.3,17.75 56,29.6"></polygon>\
    </svg>\
    <span tl class="instant-youtube-alternative">' + (playDirectly ? 'Play with Youtube player' : 'Play directly (up to 720p)') + '</span>\
    <div tl class="instant-youtube-options-button">Options</div>\
  ');

  np.insertBefore(div, n);
  n.remove();

  if (!cache.title && !cache.reason || autoplay && playDirectly)
    fetchInfo();

  if (autoplay)
    return startPlaying(div);

  div.addEventListener('click', clickHandler);
  div.addEventListener('mousedown', clickHandler);
  div.addEventListener('mouseenter', fetchInfo);

  function fetchInfo() {
    div.removeEventListener('mouseenter', fetchInfo);
    if (!div.FYTE.storyboard) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://www.youtube.com/get_video_info?video_id=' + id +
        '&hl=en_US&html5=1&el=embedded&eurl=' + encodeURIComponent(location.href),
        context: div,
        onload: parseVideoInfo
      });
    }
  }
}

function adjustNodesIfNeeded(e) {
  if (!fytedom[0])
    return;
  if (adjustNodesIfNeeded.scheduled)
    clearTimeout(adjustNodesIfNeeded.scheduled);
  adjustNodesIfNeeded.scheduled = setTimeout(function() {
    adjustNodes(e);
    adjustNodesIfNeeded.scheduled = 0;
  }, 16);
}

function adjustNodes(e, clickedContainer) {
  var force = !!clickedContainer;
  var nearest = force ? clickedContainer : null;

  var vids = $$('.instant-youtube-container:not([pinned]):not([stub])');

  if (!nearest && e.type !== 'DOMContentLoaded') {
    var minDistance = window.innerHeight*3/4 |0;
    var nearTargetY = window.innerHeight/2;
    vids.forEach(function(n) {
      var bounds = n.getBoundingClientRect();
      var distance = Math.abs((bounds.bottom + bounds.top)/2 - nearTargetY);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = n;
      }
    });
  }

  if (nearest) {
    var bounds = nearest.getBoundingClientRect();
    var nearestCenterYpct = (bounds.top + bounds.bottom)/2 / window.innerHeight;
  }

  var resized = false;

  vids.forEach(function(n) {
    var size = calcContainerSize(n);
    var w = size.w, h = size.h;

    // prevent parent clipping
    for (var e=n.parentElement, style; e; e=e.parentElement)
      if (e.style.overflow !== 'visible' && (style=getComputedStyle(e)))
        if ((style.overflow+style.overflowX+style.overflowY).match(/hidden|scroll/))
          if (n.offsetTop < e.clientHeight / 2 && n.offsetTop + n.clientHeight > e.clientHeight)
            e.style.cssText = e.style.cssText.replace(/\boverflow(-[xy])?:[^;]+/g, '') +
              important('overflow:visible;overflow-x:visible;overflow-y:visible;');

    if (force && Math.abs(w - parseFloat(n.style.maxWidth)) <= 2)
      return;

    if (n.style.maxWidth !== w + 'px') overrideCSS(n, {'max-width': w + 'px'});
    if (n.style.height !== h + 'px')   overrideCSS(n, {'height': h + 'px'});
    if (parseFloat(n.style.minWidth) > w)  overrideCSS(n, {'min-width': n.style.maxWidth});
    if (parseFloat(n.style.minHeight) > h) overrideCSS(n, {'min-height': n.style.height});

    fixThumbnailAR(n);
    resized = true;
  });

  if (resized && nearest)
    setTimeout(function() {
      var bounds = nearest.getBoundingClientRect();
      var h = bounds.bottom - bounds.top;
      var projectedCenterY = nearestCenterYpct * window.innerHeight;
      var projectedTop = projectedCenterY - h/2;
      var safeTop = Math.min(Math.max(0, projectedTop), window.innerHeight - h);
      window.scrollBy(0, bounds.top - safeTop);
    }, 16);
}

function calcContainerSize(div, origNode) {
  origNode = origNode || div;
  var w, h;
  var np = origNode.parentElement;
  var style = getComputedStyle(np);
  var parentWidth = parseFloat(style.width) - floatPadding(np, style, 'Left') - floatPadding(np, style, 'Right');
  if (+style.columnCount > 1)
    parentWidth = (parentWidth + parseFloat(style.columnGap)) / style.columnCount - parseFloat(style.columnGap);
  switch (resizeMode) {
    case 'Original':
      if (div.FYTE.originalWidth === 320 && div.FYTE.originalHeight === 200) {
        w = parentWidth;
        h = parentWidth / 16 * 9;
      } else {
        w = div.FYTE.originalWidth;
        h = div.FYTE.originalHeight;
      }
      break;
    case 'Custom':
      w = resizeWidth;
      h = resizeHeight;
      break;
    case '1080p':
    case '720p':
    case '480p':
    case '360p':
      h = parseInt(resizeMode);
      w = h / 9 * 16;
      break;
    default: // fit-to-width mode
      var n = origNode;
      do {
        n = n.parentElement;
        // find parent node with nonzero width (i.e. independent of our video element)
      } while (n && !(w = n.clientWidth));
      if (w)
        h = w / 16 * 9;
      else {
        w = origNode.clientWidth;
        h = origNode.clientHeight;
      }
  }
  if (parentWidth > 0 && parentWidth < w) {
    h = parentWidth / w * h;
    w = parentWidth;
  }
  if (resizeMode === 'Fit to width' && h < div.FYTE.originalHeight*0.9)
    h = Math.min(div.FYTE.originalHeight, w / div.FYTE.originalWidth * div.FYTE.originalHeight);

  return {w: window.chrome ? w : Math.round(w), h:h};
}

function parseVideoInfo(response) {
  var div = response.context;
  var txt = response.responseText;
  var info = tryCatch(function() {
    var json = txt.replace(/(\w+)=?(.*?)(&|$)/g, '"$1":"$2",').replace(/^(.+?),?$/, '{$1}');
    return tryJSONparse(json);
  }) || {};
  var cache = div.FYTE.cache;
  var shouldUpdateCache = false;
  var videoSources = [];

  // parse width & height to adjust the thumbnail
  var m = decodeURIComponent(info.adaptive_fmts || '').match(/size=(\d+)x(\d+)\b/) ||
          decodeURIComponent(txt).match(/\/(\d+)x(\d+)\//);

  if (m && (cache.videoWidth !== (m[1]|0) || cache.videoHeight !== (m[2]|0))) {
    fixThumbnailAR(div, m[1]|0, m[2]|0);
    cache.videoWidth = m[1]|0;
    cache.videoHeight = m[2]|0;
    shouldUpdateCache = true;
  }

  // parse video sources
  if (info.url_encoded_fmt_stream_map && info.fmt_list) {
    var streams = {};
    decodeURIComponent(info.url_encoded_fmt_stream_map).split(',').forEach(function(stream) {
      var params = {};
      stream.split('&').forEach(function(kv) {
        params[kv.split('=')[0]] = decodeURIComponent(kv.split('=')[1]);
      });
      streams[params.itag] = params;
    });
    decodeURIComponent(info.fmt_list).split(',').forEach(function(fmt) {
      var itag = fmt.split('/')[0];
      var dimensions = fmt.split('/')[1];
      var stream = streams[itag];
      if (stream) {
        videoSources.push({
          src: stream.url + (stream.s ? '&signature=' + stream.s : ''),
          title: stream.quality + ', ' + dimensions + ', ' + stream.type
        });
      }
    });
  } else {
    var rx = /url=([^=]+?mime%3Dvideo%252F(?:mp4|webm)[^=]+?)(?:,quality|,itag|.u0026)/g;
    var text = decodeURIComponent(txt).split('url_encoded_fmt_stream_map')[1];
    while ((m = rx.exec(text))) {
      videoSources.push({
        src: decodeURIComponent(decodeURIComponent(m[1]))
      });
    }
  }

  var fps = {};
  (decodeURIComponent(info.adaptive_fmts || ''))
    .split(',')
    .filter(function(s) { return /(^|&)type=video/.test(s) && /\b(?:fps=)([\d.]+)/.test(s) })
    .forEach(function(s) { fps[s.match(/\b(?:fps=)([\d.]+)/)[1]] = true });
  fps = Object.keys(fps).join('/');
  if (fps && cache.fps !== fps) {
    cache.fps = fps;
    shouldUpdateCache = true;
  }

  var duration = div.FYTE.duration = info.length_seconds|0 || '';
  if (duration) {
    var d = new Date(null);
    d.setSeconds(duration);
    duration = d.toISOString().replace(/^.+?T[0:]{0,4}(.+?)\..+$/, '$1');
    if (cache.duration !== duration) {
      cache.duration = duration;
      shouldUpdateCache = true;
    }
  }
  if (duration || fps)
    duration = '<span>' + duration + '</span>' +
      (fps ? '<i>, ' + fps + 'fps</i>' : '');

  var title = decodeURIComponent(info.title || info.reason || '').replace(/\+/g, ' ');
  if (title) {
    $(div, '.instant-youtube-title').innerHTML = (title ? '<strong>' + title + '</strong>' : '') + duration;
    if (cache.title !== title) {
      cache.title = title;
      shouldUpdateCache = true;
    }
  }
  if (pinnable !== 'off' && info.title)
    makeDraggable(div);

  if (info.reason) {
    div.setAttribute('disabled', '');
    if (cache.reason !== info.reason) {
      cache.reason = info.reason;
      shouldUpdateCache = true;
    }
  }

  if (videoSources.length)
    div.FYTE.videoSources = videoSources;

  if (info.storyboard_spec && div.FYTE.state !== 'scheduled play') {
    m = decodeURIComponent(decodeURIComponent(info.storyboard_spec)).split('|');
    div.FYTE.storyboard = tryJSONparse(
      m[m.length-1].replace(
        /^(\d+)#(\d+)#(\d+)#(\d+)#(\d+)#.+$/,
        '{"w":$1, "h":$2, "len":$3, "rows":$4, "cols":$5}'
      ));
    if (div.FYTE.storyboard.w * div.FYTE.storyboard.h > 2000) {
      div.FYTE.storyboard.url = m[0].replace('?', '&').replace('$L/$N.jpg',
        (m.length-2) + '/M0.jpg?sigh=' + m[m.length-1].replace(/^.+?#([^#]+)$/, '$1'));
      $(div, '.instant-youtube-options-button').insertAdjacentHTML('beforebegin',
        '<div class="instant-youtube-storyboard"' + (showStoryboard ? '' : ' disabled') + '>' +
          important('<div style="width:' + (div.FYTE.storyboard.w-1) + 'px; height:' + div.FYTE.storyboard.h + 'px;') +
          '">&nbsp;</div>' +
        '</div>');
      if (showStoryboard)
        updateHoverHandler(div);
    }
  }

  injectStylesIfNeeded();

  if (div.FYTE.state === 'scheduled play')
    setTimeout(function() { startPlayingDirectly(div) }, 0);

  div.FYTE.state = '';

  var cover = decodeURIComponent(info.iurlmaxres || info.iurlhq || info.iurl || '').match(/[^\/]+$/);
  if (cover && cache.cover !== cover[0]) {
    cache.cover = cover[0];
    shouldUpdateCache = true;
  }
  if (shouldUpdateCache)
    localStorage['FYTE-cache-' + info.video_id] = JSON.stringify(cache);
}

function fixThumbnailAR(div, w, h) {
  var img = $(div, 'img');
  if (!img)
    return;
  var thw = img.naturalWidth, thh = img.naturalHeight;
  if (w && h) { // means thumbnail is still loading
    div.FYTE.cache.videoWidth = w;
    div.FYTE.cache.videoHeight = h;
  } else {
    w = div.FYTE.cache.videoWidth;
    h = div.FYTE.cache.videoHeight;
    if (!w || !h)
      return;
  }
  var divw = div.clientWidth, divh = div.clientHeight;
  // if both video and thumbnail are 4:3, fit the image to height
  //console.log(div, divw, divh, thw, thh, w, h, h/w*divw / divh - 1, thh/thw*divw / divh - 1);
  if (Math.abs(h/w*divw / divh - 1) > 0.05 && Math.abs(thh/thw*divw / divh - 1) > 0.05) {
    img.style.maxHeight = img.clientHeight + 'px';
    if (!div.FYTE.cache.videoWidth) // skip animation if thumbnail is already loaded
      img.style.transition = 'height 1s ease, margin-top 1s ease';
    setTimeout(function() {
      img.style.maxHeight = 'none';
      img.style.cssText += important(h/w >= divh/divw ? 'width:auto; height:100%;' : 'width:100%; height:auto;');
      setTimeout(function() {
        img.style.transition = '';
      }, 1000);
    }, 0);
  }
}

function updateHoverHandler(div) {
  var sb = $(div, '.instant-youtube-storyboard');
  if (!showStoryboard) {
    if (!sb.getAttribute('disabled'))
      sb.setAttribute('disabled', '');
    return;
  }
  if (sb.hasAttribute('disabled'))
    sb.removeAttribute('disabled');

  sb.addEventListener('click', storyboardClickHandler);

  var oldIndex = null;
  var style = sb.firstElementChild.style;
  sb.addEventListener('mousemove', storyboardHoverHandler);
  sb.addEventListener('mouseout', storyboardHoverHandler);

  div.addEventListener('mouseover', storyboardPreloader);
  div.addEventListener('mouseout', storyboardPreloader);

  var spinner = document.createElement('span');
  spinner.className = 'instant-youtube-loading-spinner';

  function storyboardClickHandler(e) {
    sb.removeEventListener('click', storyboardClickHandler);
    var offsetX = e.offsetX || e.clientX - this.getBoundingClientRect().left;
    div.FYTE.startAt = offsetX / this.clientWidth * div.FYTE.duration |0;
    div.FYTE.srcEmbedFixed = setUrlParams(div.FYTE.srcEmbedFixed, {start: div.FYTE.startAt});
    startPlaying(div, {alternateMode: e.shiftKey});
  }

  function storyboardPreloader(e) {
    if (e.type === 'mouseout') {
      imageLoader.onload = null; imageLoader.src = '';
      spinner.remove();
      return;
    }
    if (!div.FYTE.storyboard || div.FYTE.storyboard.preloaded)
      return;
    var lastpart = (div.FYTE.storyboard.len-1)/(div.FYTE.storyboard.rows * div.FYTE.storyboard.cols) |0;
    if (lastpart <= 0)
      return;
    var part = 0;
    imageLoader.src = setStoryboardUrl(part++);
    imageLoader.onload = function() {
      if (part > lastpart) {
        div.FYTE.storyboard.preloaded = true;
        div.removeEventListener('mouseover', storyboardPreloader);
        div.removeEventListener('mouseout', storyboardPreloader);
        imageLoader.onload = null;
        imageLoader.src = '';
        spinner.remove();
        return;
      }
      imageLoader.src = setStoryboardUrl(part++);
    };
  }

  function setStoryboardUrl(part) {
    return div.FYTE.storyboard.url.replace(/M\d+\.jpg\?/, 'M' + part + '.jpg?');
  }

  function storyboardHoverHandler(e) {
    if (!showStoryboard || !div.FYTE.storyboard)
      return;
    if (e.type === 'mouseout')
      return imageLoader2.onload && imageLoader2.onload();
    var w = div.FYTE.storyboard.w;
    var h = div.FYTE.storyboard.h;
    var cols = div.FYTE.storyboard.cols;
    var rows = div.FYTE.storyboard.rows;
    var len = div.FYTE.storyboard.len;
    var partlen = rows * cols;

    var offsetX = e.offsetX || e.clientX - this.getBoundingClientRect().left;
    var left = Math.min(this.clientWidth - w, Math.max(0, offsetX - w)) |0;
    if (!style.left || parseInt(style.left) !== left) {
      style.left = left + 'px';
      if (spinner.parentElement)
        spinner.style.cssText = important('left:' + (left + w/2 - 10) + 'px; right:auto;');
    }

    var index = Math.min(offsetX / this.clientWidth * (len+1) |0, len - 1);
    if (index === oldIndex)
      return;

    var part = index/partlen|0;
    if (!oldIndex || part !== (oldIndex/partlen|0)) {
      style.cssText = style.cssText.replace(/$|background-image[^;]+;/,
                          'background-image: url(' + setStoryboardUrl(part) + ')!important;');
      if (!div.FYTE.storyboard.preloaded) {
        if (spinner.timer)
          clearTimeout(spinner.timer);
        spinner.timer = setTimeout(function() {
          spinner.timer = 0;
          if (!imageLoader2.src)
            return;
          this.appendChild(spinner);
          spinner.style.cssText = important('left:' + (left + w/2 - 10) + 'px; right:auto;');
        }.bind(this), 50);
        imageLoader2.onload = function() {
          clearTimeout(spinner.timer);
          spinner.remove();
          spinner.timer = 0;
          imageLoader2.onload = null;
          imageLoader2.src = '';
        };
        imageLoader2.src = setStoryboardUrl(part);
      }
    }

    oldIndex = index;
    index = index % partlen;
    style.backgroundPosition = '-' + (index % cols) * w + 'px -' + (index / cols |0) * h + 'px';
  }
}

function clickHandler(e) {
  if (e.target.closest('a')
  ||  e.type === 'mousedown' && e.button !== 1
  ||  e.type === 'click' && e.target.matches('.instant-youtube-options, .instant-youtube-options *'))
    return;
  if (e.type === 'click' && e.target.matches('.instant-youtube-options-button')) {
    showOptions(e);
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  startPlaying(e.target.closest('.instant-youtube-container'), {
    alternateMode: e.shiftKey || e.target.matches('.instant-youtube-alternative'),
    fullscreen: e.button === 1,
  });
}

function startPlaying(div, params) {
  div.removeEventListener('click', clickHandler);
  div.removeEventListener('mousedown', clickHandler);

  $$remove(div, '.instant-youtube-alternative, .instant-youtube-storyboard, .instant-youtube-options-button, .instant-youtube-options');
  $(div, 'svg').outerHTML = '<span class="instant-youtube-loading-spinner"></span>';

  if (pinnable !== 'off') {
    makePinnable(div);
    if (params && params.pin)
      $(div, '[pin="' + params.pin + '"]').click();
  }

  if (window !== window.top)
    window.parent.postMessage('iframe-allowfs', '*');

  if ((!!playDirectly + !!(params && params.alternateMode) === 1)
  && (div.FYTE.videoSources || div.FYTE.state === 'querying')) {
    if (div.FYTE.videoSources)
      startPlayingDirectly(div, params);
    else {
      // playback will start in parseVideoInfo
      div.FYTE.state = 'scheduled play';
      // fallback to iframe in 5s
      setTimeout(function() {
        if (div.FYTE.state) {
          div.FYTE.state = '';
          switchToIFrame.call(div, params);
        }
      }, 5000);
    }
  }
  else
    switchToIFrame.call(div, params);
}

function startPlayingDirectly(div, params) {
  var video = document.createElement('video');
  video.controls = true;
  video.autoplay = true;
  video.style.cssText = important('position:absolute; left:0; top:0; right:0; bottom:0; padding:0; margin:auto; opacity:0; width:100%; height:100%;');
  video.className = 'instant-youtube-embed';
  video.volume = GM_getValue('volume', 0.5);

  div.FYTE.videoSources.forEach(function(src) {
    var srcdom = video.appendChild(document.createElement('source'));
    Object.keys(src).forEach(function(k) { srcdom[k] = src[k] });
    srcdom.onerror = switchToIFrame.bind(div, params);
  });

  overrideCSS($(div, 'img'), {transition: 'opacity 1s', opacity: '0'});

  if (params && params.fullscreen) {
    div.firstElementChild.appendChild(video);
    div.setAttribute('playing', '');
    video.style.opacity = 1;
    goFullscreen(video);
  }

  if (window.chrome) {
    video.addEventListener('click', function() {
      this.paused ? this.play() : this.pause();
    });
  }

  var title = $(div, '.instant-youtube-title');
  if (title) {
    video.onpause = function() { title.removeAttribute('hidden') };
    video.onplay = function() { title.setAttribute('hidden', true) };
  }

  var switchTimer = setTimeout(switchToIFrame.bind(div, params), 5000);

  video.onloadedmetadata = div.FYTE.startAt && function() {
    clearTimeout(switchTimer);
    video.currentTime = div.FYTE.startAt;
  };

  video.onloadeddata = function() {
    clearTimeout(switchTimer);
    pauseOtherVideos(video);
    video.interval = setInterval(function() {
      if (video.volume !== GM_getValue('volume', 0.5))
          GM_setValue('volume', video.volume);
    }, 1000);
    if (params && params.fullscreen)
      return;
    div.setAttribute('playing', '');
    div.firstElementChild.appendChild(video);
    video.style.opacity = 1;
  };
}

function switchToIFrame(params, e) {
  if (this.querySelector('iframe'))
    return;
  var div = this;
  var wrapper = div.firstElementChild;
  var fullscreen = params && params.fullscreen && !e;
  if (e instanceof Event) {
    console.log('[FYTE] Direct linking canceled on %s, switching to IFRAME player', div.FYTE.srcEmbed);
    var video = e.target ? e.target.closest('video') : e.path && e.path[e.path.length-1];
    while (video.lastElementChild)
      video.lastElementChild.remove();
    goFullscreen(video, false);
    video.remove();
  }

  var url = setUrlParams(div.FYTE.srcEmbedFixed, {
    html5: 1,
    autoplay: 1,
    autohide: 2,
    border: 0,
    controls: 1,
    fs: 1,
    showinfo: 1,
    ssl: 1,
    theme: 'dark',
    enablejsapi: 1,
    FYTEfullscreen: fullscreen|0,
  });

  var iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.className = 'instant-youtube-embed';
  iframe.style = important('position:absolute; left:0; top:0; right:0; padding:0; margin:auto; opacity:0;');
  iframe.frameBorder = 0;
  iframe.allow = 'autoplay; fullscreen';
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');

  if (pinnable !== 'off') {
    var pin = $(div, '[pin]');
    pin.parentNode.insertBefore(iframe, pin);
  } else {
    wrapper.appendChild(iframe);
  }

  div.setAttribute('iframe', '');
  div.setAttribute('playing', '');

  iframe = $(div, 'iframe');
  if (fullscreen) {
    goFullscreen(iframe);
    iframe.style.opacity = 1;
  }

  iframe.onload = function() {
    window.addEventListener('message', YTlistener);
    iframe.contentWindow.postMessage('{"event":"listening"}', '*');
  };
  setTimeout(function() {
    iframe.style.opacity = 1;
    window.removeEventListener('message', YTlistener);
  }, 5000);

  function YTlistener(e) {
    if (e.source !== iframe.contentWindow || !e.data)
      return;
    var data = tryJSONparse(e.data);
    if (!data.info || data.info.playerState !== 1)
      return;
    window.removeEventListener('message', YTlistener);
    pauseOtherVideos(iframe);
    iframe.style.opacity = 1;
    $$remove(div, 'span, a');
    $(div, 'img').style.display = 'none';
  }
}

function setUrlParams(url, params) {
  var names = Object.keys(params);
  var parts = url.split('?', 2)
  var query = (parts[1] || '').replace(new RegExp('(?:[?&]|^)(?:' + names.join('|') + ')(?:=[^?&]*)?', 'gi'), '');
  return parts[0] + '?' + query + (query ? '&' : '?') +
    names.map(function(n) { return n + '=' + params[n] }).join('&');
}

function pauseOtherVideos(activePlayer) {
  $$(activePlayer.ownerDocument, '.instant-youtube-embed').forEach(function(v) {
    if (v === activePlayer)
      return;
    switch (v.localName) {
      case 'video':
        if (!v.paused)
          v.pause();
        break;
      case 'iframe':
        try { v.contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}', '*') } catch(e) {}
        break;
    }
  });
}

function goFullscreen(el, enable) {
  if (enable !== false)
    el.webkitRequestFullScreen && el.webkitRequestFullScreen()
    || el.mozRequestFullScreen && el.mozRequestFullScreen()
    || el.requestFullScreen && el.requestFullScreen();
  else
    document.webkitCancelFullScreen && document.webkitCancelFullScreen()
    || document.mozCancelFullScreen && document.mozCancelFullScreen()
    || document.cancelFullScreen && document.cancelFullScreen();
}

function makePinnable(div) {
  div.firstElementChild.insertAdjacentHTML('beforeend',
    '<div size-gripper></div>' +
    '<div pin="top-left"></div><div pin="top-right"></div><div pin="bottom-right"></div><div pin="bottom-left"></div>');

  $$(div, '[pin]').forEach(function(pin) {
    if (pinnable === 'hide')
      pin.setAttribute('transparent', '');
    pin.onclick = pinClicked;
  });
  $(div, '[size-gripper]').addEventListener('mousedown', startResize, true);
  $(div, '[size-gripper]').addEventListener('mousedown', function() { return false });

  function pinClicked() {
    var pin = this;
    var pinIt = !div.hasAttribute('pinned') || !pin.hasAttribute('active');
    var corner = pin.getAttribute('pin');
    var video = $(div, 'video');
    if (pinIt) {
      $$(div, '[pin][active]').forEach(function(p) { p.removeAttribute('active') });
      pin.setAttribute('active', '');
      if (!div.FYTE.unpinnedStyle) {
        div.FYTE.unpinnedStyle = div.style.cssText;
        var stub = div.cloneNode();
        var img = $(div, 'img').cloneNode();
        img.style.opacity = 1;
        img.style.display = 'block';
        img.title = '';
        stub.appendChild(img);
        stub.onclick = function(e) { $(div, '[pin][active]').onclick(e) };
        stub.style.cssText += 'opacity:0.3!important;';
        stub.setAttribute('stub', '');
        div.FYTE.stub = stub;
        div.parentNode.insertBefore(stub, div);
      }
      var size = constrainPinnedSize(div, localStorage['width#' + location.hostname] || pinnedWidth);
      div.style.cssText = important(
        'position: fixed;' +
        'width: ' + size.w + 'px;' +
        'z-index: 999999999;' +
        'height:' + size.h + 'px;' +
        'top:' + (corner.indexOf('top') >= 0 ? '0' : 'auto') + ';' +
        'bottom:' + (corner.indexOf('bottom') >= 0 ? '0' : 'auto') + ';' +
        'left:' + (corner.indexOf('left') >= 0 ? '0' : 'auto') + ';' +
        'right:' + (corner.indexOf('right') >= 0 ? '0' : 'auto') + ';'
      );
      adjustPinnedOffset(div, div, corner);
      div.setAttribute('pinned', corner);
      if (video && document.body)
        document.body.appendChild(div);
    }
    else { // unpin
      pin.removeAttribute('active');
      div.removeAttribute('pinned');
      div.style.cssText = div.FYTE.unpinnedStyle;
      div.FYTE.unpinnedStyle = '';
      if (div.FYTE.stub) {
        if (video && document.body)
          div.FYTE.stub.parentNode.replaceChild(div, div.FYTE.stub);
        div.FYTE.stub.remove();
        div.FYTE.stub = null;
      }
    }
    if (video && video.paused)
      video.play();
  }

  function startResize(e) {
    var siteSaved = ('width#' + location.hostname) in localStorage;
    var saveAs = siteSaved ? 'site' : 'global';
    var oldSizeCSS = {w: div.style.width, h: div.style.height};
    var oldDraggable = div.draggable;
    div.draggable = false;

    var gripper = this;
    gripper.removeAttribute('tried-exceeding');
    gripper.innerHTML = '<div>' +
      '<div save-as="' + saveAs + '"><b>S</b> = Site mode: <span>' + getSiteOnlyText() + '</span></div>' +
      (!siteSaved ? '' : '<div><b>R</b> = Reset to global size</div>') +
      '<div><b>Esc</b> = Cancel</div>' +
      '</div>';

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', resizeDone);
    document.addEventListener('keydown', resizeKeyDown);
    e.stopImmediatePropagation();
    return false;

    function getSiteOnlyText() {
      return saveAs === 'site' ? 'only ' + location.hostname : 'global';
    }

    function resize(e) {
      var deltaX = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
      if (/right/.test(div.getAttribute('pinned')))
        deltaX = -deltaX;
      var newSize = constrainPinnedSize(div, div.clientWidth + deltaX);
      if (newSize.w !== div.clientWidth) {
        div.style.setProperty('width', newSize.w + 'px', 'important');
        div.style.setProperty('height', newSize.h + 'px', 'important');
        gripper.removeAttribute('tried-exceeding');
      } else if (newSize.triedExceeding) {
        gripper.setAttribute('tried-exceeding', '');
      }
      window.getSelection().removeAllRanges();
      return false;
    }

    function resizeDone() {
      div.draggable = oldDraggable;
      gripper.removeAttribute('tried-exceeding');
      gripper.innerHTML = '';
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', resizeDone);
      document.removeEventListener('keydown', resizeKeyDown);
      switch (saveAs) {
        case 'site':
          localStorage['width#' + location.hostname] = div.clientWidth;
          break;
        case 'global':
          pinnedWidth = div.clientWidth;
          GM_setValue('pinnedWidth', pinnedWidth);
          // fallthrough to remove the locally saved value
        case 'reset':
          localStorage.removeItem('width#' + location.hostname);
          break;
        case '':
          return false;
      }
      gripper.setAttribute('saveAs', saveAs);
      setTimeout(function() { gripper.removeAttribute('saveAs'); }, 250);
      return false;
    }

    function resizeKeyDown(e) {
      switch (e.keyCode) {
        case 27: // Esc
          saveAs = 'cancel';
          div.style.width = oldSizeCSS.w;
          div.style.height = oldSizeCSS.h;
          break;
        case 83: // S
          saveAs = saveAs === 'site' ? 'global' : 'site';
          $(gripper, '[save-as]').setAttribute('save-as', saveAs);
          $(gripper, '[save-as] span').textContent = getSiteOnlyText();
          return false;
        case 82: // R
          if (!siteSaved)
            return;
          saveAs = 'reset';
          var size = constrainPinnedSize(div, pinnedWidth);
          div.style.width = size.w;
          div.style.height = size.h;
          break;
        default:
          return;
      }
      document.dispatchEvent(new MouseEvent('mouseup'));
      return false;
    }
  }
}

function makeDraggable(div) {
  div.draggable = true;
  div.addEventListener('dragstart', function(e) {
    var offsetY = e.offsetY || e.clientY - div.getBoundingClientRect().top;
    if (offsetY > div.clientHeight - 30)
      return e.preventDefault();

    e.dataTransfer.setData('text/plain', '');

    var dropZone = document.createElement('div');
    var dropZoneHeight = 400 / div.FYTE.cache.videoWidth * div.FYTE.cache.videoHeight;
    dropZone.className = 'instant-youtube-dragndrop-placeholder';

    document.body.addEventListener('dragenter', dragHandler);
    document.body.addEventListener('dragover', dragHandler);
    document.body.addEventListener('dragend', dragHandler);
    document.body.addEventListener('drop', dragHandler);
    function dragHandler(e) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      switch (e.type) {
        case 'dragover':
          var playing = div.hasAttribute('playing');
          var stub = e.target.closest('.instant-youtube-container[stub]') === div.FYTE.stub && div.FYTE.stub;
          var gizmo = playing && !stub
                      ? {left:0, top:0, right:innerWidth, bottom:innerHeight}
                      : (stub || div).getBoundingClientRect();
          var x = e.clientX, y = e.clientY;
          var cx = (gizmo.left + gizmo.right) / 2;
          var cy = (gizmo.top + gizmo.bottom) / 2;
          var stay = !!stub || y >= cy-200 && y <= cy+200 && x >= cx-200 && x <= cx+200;
          overrideCSS(dropZone, {
            top: y < cy || stay ? '0' : 'auto',
            bottom: y > cy || stay ? '0' : 'auto',
            left: x < cx || stay ? '0' : 'auto',
            right: x > cx || stay ? '0' : 'auto',
            width: playing && stay && stub ? stub.clientWidth+'px' : '400px',
            height: playing && stay && stub ? stub.clientHeight+'px' : dropZoneHeight + 'px',
            margin: playing && stay ? 'auto' : '0',
            position: !playing && stay || stub ? 'absolute' : 'fixed',
            'background-color': stub ? 'rgba(0,0,255,0.5)' : stay ? 'rgba(255,255,0,0.4)' : 'rgba(0,255,0,0.2)',
          });
          adjustPinnedOffset(dropZone, div);
          (stay && !playing || stub ? (stub || div) : document.body).appendChild(dropZone);
          break;
        case 'dragend':
        case 'drop':
          var corner = calcPinnedCorner(dropZone);
          dropZone.remove();
          dropZone = null;
          document.body.removeEventListener('dragenter', dragHandler);
          document.body.removeEventListener('dragover', dragHandler);
          document.body.removeEventListener('dragend', dragHandler);
          document.body.removeEventListener('drop', dragHandler);
          if (e.type === 'dragend')
            break;
          if (div.hasAttribute('playing'))
            (corner ? $(div, '[pin="' + corner + '"]') : div.FYTE.stub).click();
          else
            startPlaying(div, {pin: corner});
      }
    }
  });
}

function adjustPinnedOffset(el, self, corner) {
  var offset = 0;
  $$('.instant-youtube-container[pinned] [pin="' + (corner || calcPinnedCorner(el)) + '"][active]').forEach(function(pin) {
    var container = pin.closest('[pinned]');
    if (container !== el && container !== self) {
      var bounds = container.getBoundingClientRect();
      offset = Math.max(offset, el.style.top === '0px' ? bounds.bottom : innerHeight - bounds.top);
    }
  });
  if (offset)
    el.style[el.style.top === '0px' ? 'top' : 'bottom'] = offset + 'px';
}

function calcPinnedCorner(el) {
  var t = el.style.top !== 'auto';
  var b = el.style.bottom !== 'auto';
  var l = el.style.left !== 'auto';
  var r = el.style.right !== 'auto';
  return t && b && l && r ? '' : (t ? 'top' : 'bottom') + '-' + (l ? 'left' : 'right');
}

function constrainPinnedSize(div, width) {
  var maxWidth = window.innerWidth - 100 |0;
  var triedExceeding = (width|0) > maxWidth;
  width = Math.max(200, Math.min(maxWidth, width|0));
  return {
    w: width,
    h: width / div.FYTE.cache.videoWidth * div.FYTE.cache.videoHeight,
    triedExceeding: triedExceeding,
  };
}

function showOptions(e) {
  var optionsButton = e.target;
  translateHTML(optionsButton, 'afterend', '\
    <div class="instant-youtube-options">\
      <span>\
        <label tl style="width: 100% !important;">Size:&nbsp;\
          <select data-action="size-mode">\
            <option tl value="Original">Original\
            <option tl value="Fit to width">Fit to width\
            <option>360p\
            <option>480p\
            <option>720p\
            <option>1080p\
            <option tl value="Custom">Custom...\
          </select>\
        </label>&nbsp;\
        <label data-action="size-custom" ' + (resizeMode !== 'Custom' ? 'disabled' : '') + '>\
          <input type="number" min="320" max="9999" tl-placeholder="width" data-action="width" step="1" value="' + (resizeWidth||'') + '">\
          x\
          <input type="number" min="240" max="9999" tl-placeholder="height" data-action="height" step="1" value="' + (resizeHeight||'') + '">\
        </label>\
      </span>\
      <label tl="content,title" title="msgStoryboardTip">\
        <input data-action="storyboard" type="checkbox" ' + (showStoryboard ? 'checked' : '') + '>\
        msgStoryboard\
      </label>\
      <span>\
        <label tl="content,title" title="msgDirectTip">\
          <input data-action="direct" type="checkbox" ' + (playDirectly ? 'checked' : '') + '>\
          msgDirect\
        </label>\
        &nbsp;\
        <label tl="content,title" title="msgDirectTip">\
          <input data-action="direct-shown" type="checkbox" ' + (playDirectlyShown ? 'checked' : '') + '>\
          msgDirectShown\
        </label>\
      </span>\
      <label tl="content,title" title="msgSafeTip">\
        <input data-action="safe" type="checkbox" ' + (skipCustom ? 'checked' : '') + '>\
        msgSafe\
      </label>\
      <table>\
        <tr>\
          <td><label tl="content,title" title="msgPinningTip">msgPinning</label></td>\
          <td>\
            <select data-action="pinnable">\
              <option tl value="on">msgPinningOn\
              <option tl value="hide">msgPinningHover\
              <option tl value="off">msgPinningOff\
            </select>\
          </td>\
        </tr>\
        <tr tl="title" title="msgQualityTip">\
          <td><label tl="content">msgQuality</td>\
          <td>\
            <select data-action="quality">\
              <option value="auto" tl>msgQualityAuto\
              <option value="tiny">144p\
              <option value="small">240p\
              <option value="medium">360p\
              <option value="large">480p\
              <option value="hd720">720p\
              <option value="hd1080">1080p\
              <option value="hd1440">1440p\
              <option value="hd2160">2160p (4K)\
              <option value="hd2880">2880p (5K)\
              <option value="highres">4320p (8K)\
            </select>\
          </td>\
        </tr>\
      </table>\
      <span data-action="buttons">\
        <button tl data-action="ok">OK</button>\
        <button tl data-action="cancel">Cancel</button>\
      </span>\
    </div>\
  ');
  var options = optionsButton.nextElementSibling;

  options.addEventListener('keydown', function(e) {
    if (e.target.localName === 'input' &&
      !e.shiftKey && !e.altKey && !e.metaKey && !e.ctrlKey && e.key.match(/[.,]/))
      return false;
  });

  $(options, '[data-action="size-mode"]').value = resizeMode;
  $(options, '[data-action="size-mode"]').addEventListener('change', function() {
    var v = this.value !== 'Custom';
    var e = $(options, '[data-action="size-custom"]');
    e.children[0].disabled = e.children[1].disabled = v;
    v ? e.setAttribute('disabled', '') : e.removeAttribute('disabled');
  });

  $(options, '[data-action="pinnable"]').value = pinnable;

  $(options, '[data-action="quality"]').value = playQuality;

  $(options, '[data-action="buttons"]').addEventListener('click', function(e) {
    if (e.target.dataset.action !== 'ok') {
      options.remove();
      return;
    }
    var v, shouldAdjust;
    if (resizeMode !== (v = $(options, '[data-action="size-mode"]').value)) {
      GM_setValue('resize', resizeMode = v);
      shouldAdjust = true;
    }
    if (resizeMode === 'Custom') {
      var w = $(options, '[data-action="width"]').value |0;
      var h = $(options, '[data-action="height"]').value |0;
      if (resizeWidth !== w || resizeHeight !== h) {
        updateCustomSize(w, h);
        GM_setValue('width', resizeWidth);
        GM_setValue('height', resizeHeight);
        shouldAdjust = true;
      }
    }
    if (showStoryboard !== (v = $(options, '[data-action="storyboard"]').checked)) {
      GM_setValue('showStoryboard', showStoryboard = v);
      $$('.instant-youtube-container').forEach(updateHoverHandler);
    }
    if (playDirectly !== (v = $(options, '[data-action="direct"]').checked)) {
      GM_setValue('playHTML5', playDirectly = v);
      if (playDirectlyShown) {
        var newAltText = _(playDirectly ? 'Play with Youtube player' : 'Play directly (up to 720p)');
        $$('.instant-youtube-alternative').forEach(function(e) {
          e.textContent = newAltText;
        });
      }
    }
    if (playDirectlyShown !== (v = $(options, '[data-action="direct-shown"]').checked)) {
      GM_setValue('playHTML5', playDirectlyShown = v);
      updateAltPlayerCSS();
    }
    if (skipCustom !== (v = $(options, '[data-action="safe"]').checked)) {
      GM_setValue('skipCustom', skipCustom = v);
    }
    if (pinnable !== (v = $(options, '[data-action="pinnable"]').value)) {
      GM_setValue('pinnable', pinnable = v);
    }
    if (playQuality !== (v = $(options, '[data-action="quality"]').value)) {
      GM_setValue('quality', playQuality = v);
    }

    options.remove();

    if (shouldAdjust)
      adjustNodes(e, e.target.closest('.instant-youtube-container'));
  });
}

function updateCustomSize(w, h) {
  resizeWidth = Math.min(9999, Math.max(320, w|0 || resizeWidth|0));
  resizeHeight = Math.min(9999, Math.max(240, h|0 || resizeHeight|0));
}

function updateAltPlayerCSS() {
  var s = '.instant-youtube-alternative { display:' + (playDirectlyShown ? 'block' : 'none') + '!important}';
  $('style#instant-youtube-styles').textContent += s;
  return s;
}

function important(cssText) {
  return cssText.replace(/;/g, '!important;');
}

function tryCatch(func) {
  try {
    return func();
  } catch(e) {
    console.log(e);
  }
}

function getFunctionComment(fn) {
  return fn.toString().match(/\/\*([\s\S]*?)\*\/\s*}$/)[1];
}

function $(selORnode, sel) {
  return sel ? selORnode.querySelector(sel)
             : document.querySelector(selORnode);
}

function $$(selORnode, sel) {
  return Array.prototype.slice.call(
    sel ? selORnode.querySelectorAll(sel)
        : document.querySelectorAll(selORnode));
}

function $$remove(selORnode, sel) {
  Array.prototype.forEach.call(
    sel ? selORnode.querySelectorAll(sel)
        : document.querySelectorAll(selORnode),
    function(e) { e.remove() }
  );
}

function overrideCSS(e, params) {
  var names = Object.keys(params);
  var style = e.style.cssText.replace(new RegExp('(^|\s|;)(' + names.join('|') + ')(:[^;]+)', 'gi'), '$1');
  e.style.cssText = style.replace(/[^;]\s*$/, '$&;').replace(/^\s*;\s*/, '') +
    names.map(function(n) { return n + ':' + params[n] + '!important' }).join(';') + ';';
}

// fix dumb Firefox bug
function floatPadding(node, style, dir) {
  var padding = style['padding' + dir];
  if (padding.indexOf('%') < 0)
    return parseFloat(padding);
  return parseFloat(padding) * (parseFloat(style.width) || node.clientWidth) / 100;
}

function cleanupCache() {
  for (var k in localStorage) {
    if (k.lastIndexOf('FYTE-cache-', 0) === 0
    && Date.now() - Number((tryJSONparse(localStorage[k]) || {}).lastUsed || 0) > CACHE_STALE_DURATION) {
      delete localStorage[k];
    }
  }
  GM_listValues().forEach(function(k) {
    if (k.lastIndexOf('cache-', 0) === 0) {
      GM_deleteValue(k);
    }
  });
}

function tryJSONparse(s) {
  try { return JSON.parse(s) }
  catch (e) {}
}

function translateHTML(baseElement, place, html) {
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  $$(tmp, '[tl]').forEach(function(node) {
    (node.getAttribute('tl') || 'content').split(',').forEach(function(what) {
      var child, src, tl;
      if (what === 'content') {
        for (var i = node.childNodes.length-1, n; (i>=0) && (n=node.childNodes[i]); i--) {
          if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
            child = n;
            break;
          }
        }
      } else
        child = node.getAttributeNode(what);
      if (!child)
        return;
      src = child.textContent;
      var srcTrimmed = src.trim();
      tl = src.replace(srcTrimmed, _(srcTrimmed));
      if (src !== tl)
        child.textContent = tl;
    });
  });
  baseElement.insertAdjacentHTML(place, tmp.innerHTML);
}

function initTL() {
  var tlSource = {
    'watch on Youtube': {
      'ru': 'открыть на Youtube',
    },
    'Play with Youtube player': {
      'ru': 'Включить плеер Youtube',
    },
    'Play directly (up to 720p)': {
      'ru': 'Включить напрямую (макс. 720p)',
    },
    msgAltPlayerHint: {
      'en': 'Shift-click to use alternative player',
      'ru': 'Shift-клик для смены типа плеера',
    },
    'Options': {
      'ru': 'Опции',
    },
    'Size:': {
      'ru': 'Размер:',
    },
    'Original': {
      'ru': 'Исходный',
    },
    'Fit to width': {
      'ru': 'На всю ширину',
    },
    'Custom...': {
      'ru': 'Настроить...',
    },
    'width': {
      'ru': 'ширина',
    },
    'height': {
      'ru': 'высота',
    },
    msgStoryboard: {
      'en': 'Storyboard thumbnails on hover',
      'ru': 'Раскадровка при наведении курсора',
    },
    msgStoryboardTip: {
      'en': 'Show storyboard preview on mouse hover at the bottom',
      'ru': 'Показывать миникадры при наведении мыши на низ кавер-картинки',
    },
    msgDirect: {
      'en': 'Play directly',
      'ru': 'Встроенный плеер браузера',
    },
    msgDirectTip: {
      'en': 'Note: Shift-click a thumbnail to use alternative player',
      'ru': 'Напоминание: удерживайте клавишу Shift при щелчке на картинке для альтернативного плеера',
    },
    msgDirectShown: {
      'en': 'Show under play button',
      'ru': 'Показывать под кнопкой ►',
    },
    msgSafe: {
      'en': 'Safe (skip videos with enablejsapi=1)',
      'ru': 'Консервативный режим',
    },
    msgSafeTip: {
      'en': 'Do not process customized videos with enablejsapi=1 parameter (requires page reload)',
      'ru': 'Не обрабатывать нестандартные видео с параметром enablejsapi=1 (подействует после обновления страницы)',
    },
    msgPinning: {
      'en': 'Corner pinning',
      'ru': 'Закрепление по углам',
    },
    msgPinningTip: {
      'en': 'Enable corner pinning controls when a video is playing. \nTo restore the video click the active corner pin or the original video placeholder.',
      'ru': 'Включить шпильки по углам для закрепления видео во время просмотра. \nДля отмены можно нажать еще раз на активированный уголЪ или на заглушку, где исходно было видео',
    },
    msgPinningOn: {
      'en': 'On',
      'ru': 'Да',
    },
    msgPinningHover: {
      'en': 'On, hover a corner to show',
      'ru': 'Да, при наведении курсора',
    },
    msgPinningOff: {
      'en': 'Off',
      'ru': 'Нет',
    },
    msgQuality: {
      'en': 'Youtube quality',
      'ru': 'Качество youtube',
    },
    msgQualityTip: {
      'en': 'Youtube player video quality',
      'ru': 'Качество видео в youtube-плеере',
    },
    msgQualityAuto: {
      'en': 'auto',
      'ru': 'не выбрано',
    },
    'OK': {
      'ru': 'ОК',
    },
    'Cancel': {
      'ru': 'Оменить',
    },
  };
  var browserLang = navigator.language || navigator.languages && navigator.languages[0] || '';
  var browserLangMajor = browserLang.replace(/-.+/, '');
  var tl = {};
  Object.keys(tlSource).forEach(function(k) {
    var langs = tlSource[k];
    var text = langs[browserLang] || langs[browserLangMajor];
    if (text)
      tl[k] = text;
  });
  return function(src) { return tl[src] || src };
}

function injectStylesIfNeeded(force) {
  if (!fytedom[0] && !force)
    return;
  var styledom = $('style#instant-youtube-styles');
  if (styledom) {
    // move our rules to the end of HEAD to increase CSS specificity
    if (styledom.nextElementSibling && document.head)
      document.head.insertBefore(styledom, null);
    return;
  }
  styledom = (document.head || document.documentElement).appendChild(document.createElement('style'));
  styledom.id = 'instant-youtube-styles';
  styledom.textContent = important(getFunctionComment(function() { /*
    .instant-youtube-container,
    .instant-youtube-wrapper * {
      transform: translate3D(0,0,0);
    }
    .instant-youtube-container {
      all: unset;
      contain: strict;
      display: block;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      padding: 0;
      margin: auto;
      font: normal 14px/1.0 sans-serif, Arial, Helvetica, Verdana;
      text-align: center;
      background: black;
      break-inside: avoid-column;
    }
    .instant-youtube-container[disabled] {
      background: #888;
    }
    .instant-youtube-container[disabled] .instant-youtube-storyboard {
      display: none;
    }
    .instant-youtube-container[pinned] {
      box-shadow: 0 0 30px black;
    }
    .instant-youtube-container[playing] {
      contain: none;
    }
    .instant-youtube-wrapper {
      width: 100%;
      height: 100%;
    }
    .instant-youtube-play-button {
      display: block;
      position: absolute;
      width: 85px;
      height: 60px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .instant-youtube-loading-spinner {
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 0;
      margin: auto;
      pointer-events: none;
      background: url("data:image/gif;base64,R0lGODlhFAAUAJEDAMzMzLOzs39/f////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgADACwAAAAAFAAUAAACPJyPqcuNItyCUJoQBo0ANIxpXOctYHaQpYkiHfM2cUrCNT0nqr4uudsz/IC5na/2Mh4Hu+HR6YBaplRDAQAh+QQFCgADACwEAAIADAAGAAACFpwdcYupC8BwSogR46xWZHl0l8ZYQwEAIfkEBQoAAwAsCAACAAoACgAAAhccMKl2uHxGCCvO+eTNmishcCCYjWEZFgAh+QQFCgADACwMAAQABgAMAAACFxwweaebhl4K4VE6r61DiOd5SfiN5VAAACH5BAUKAAMALAgACAAKAAoAAAIYnD8AeKqcHIwwhGntEWLkO3CcB4biNEIFACH5BAUKAAMALAQADAAMAAYAAAIWnDSpAHa4GHgohCHbGdbipnBdSHphAQAh+QQFCgADACwCAAgACgAKAAACF5w0qXa4fF6KUoVQ75UaA7Bs3yeNYAkWACH5BAUKAAMALAIABAAGAAwAAAIXnCU2iMfaRghqTmMp1moAoHyfIYIkWAAAOw==");
    }
    .instant-youtube-container:hover .ytp-large-play-button-svg {
      fill: #CC181E;
    }
    .instant-youtube-alternative {
      display: block;
      position: absolute;
      width: 20em;
      height: 20px;
      top: 50%;
      left: 0;
      right: 0;
      margin: 60px auto;
      padding: 0;
      border: none;
      text-align: center;
      text-decoration: none;
      text-shadow: 1px 1px 3px black;
      font-weight: bold;
      color: white;
      z-index: 8;
      font-weight: normal;
      font-size: 12px;
    }
    .instant-youtube-alternative:hover {
      text-decoration: underline;
      color: white;
      background: transparent;
    }
    .instant-youtube-embed {
      z-index: 10;
      background: transparent;
    }
    .instant-youtube-title {
      z-index: 20;
      display: block;
      position: absolute;
      width: auto;
      top: 0;
      left: 0;
      right: 0;
      margin: 0;
      padding: 7px;
      border: none;
      text-shadow: 1px 1px 2px black;
      text-align: center;
      text-decoration: none;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .instant-youtube-title strong {
      font: bold 14px/1.0 sans-serif, Arial, Helvetica, Verdana;
    }
    .instant-youtube-title strong:after {
      content: " - $tl:'watch on Youtube'";
      font-weight: normal;
      margin-right: 1ex;
    }
    .instant-youtube-title span {
      color: white;
    }
    .instant-youtube-title span:before {
      content: "(";
    }
    .instant-youtube-title span:after {
      content: ")";
    }
    .instant-youtube-container .instant-youtube-title i {
      all: unset;
      opacity: .5;
      font-style: normal;
      color: white;
    }
    @-webkit-keyframes instant-youtube-fadein {
      from { opacity: 0 }
      to { opacity: 1 }
    }
    @-moz-keyframes instant-youtube-fadein {
      from { opacity: 0 }
      to { opacity: 1 }
    }
    @keyframes instant-youtube-fadein {
      from { opacity: 0 }
      to { opacity: 1 }
    }
    .instant-youtube-container:not(:hover) .instant-youtube-title[hidden] {
      display: none;
      margin: 0;
    }
    .instant-youtube-title:hover {
      text-decoration: underline;
    }
    .instant-youtube-title strong {
      color: white;
    }
    .instant-youtube-options-button {
      opacity: 0.6;
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 1.5ex 2ex;
      font-size: 11px;
      text-shadow: 1px 1px 2px black;
      color: white;
    }
    .instant-youtube-options-button:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);
    }
    .instant-youtube-options {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 1ex 1ex 2ex 2ex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.5;
      text-align: left;
      opacity: 1;
      color: white;
      background: black;
      z-index: 999;
    }
    .instant-youtube-options * {
      width: auto;
      height: auto;
      margin: 0;
      padding: 0;
      font: inherit;
      font-size: 13px;
      vertical-align: middle;
      text-transform: none;
      text-align: left;
      border-radius: 0;
      text-decoration: none;
      color: white;
      background: black;
    }
    .instant-youtube-options > * {
      margin-top: 1ex;
    }
    .instant-youtube-options table {
      all: unset;
      display: table;
    }
    .instant-youtube-options tr {
      all: unset;
      display: table-row;
    }
    .instant-youtube-options td {
      all: unset;
      display: table-cell;
      padding: 2px;
    }
    .instant-youtube-options label > * {
      display: inline;
    }
    .instant-youtube-options select {
      padding: .5ex .25ex;
      border: 1px solid #444;
      -webkit-appearance: menulist;
    }
    .instant-youtube-options [data-action="size-custom"] input {
      width: 9ex;
      padding: .5ex .5ex .4ex;
      border: 1px solid #666;
    }
    .instant-youtube-options [data-action="buttons"] {
      margin-top: 1em;
    }
    .instant-youtube-options button {
      margin: 0 1ex 0 0;
      padding: .5ex 2ex;
      border: 2px solid gray;
      font-weight: bold;
    }
    .instant-youtube-options button:hover {
      border-color: white;
    }
    .instant-youtube-options label[disabled] {
      opacity: 0.25;
    }
    .instant-youtube-storyboard {
      height: 33%;
      max-height: 90px;
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: visible;
      overflow-x: visible;
      overflow-y: visible;
    }
    .instant-youtube-storyboard:hover {
      background-color: rgba(0,0,0,0.3);
    }
    .instant-youtube-storyboard[disabled] {
      display:none;
    }
    .instant-youtube-storyboard div {
      display: block;
      position: absolute;
      bottom: 0px;
      pointer-events: none;
      border: 3px solid #888;
      box-shadow: 2px 2px 10px black;
      transition: opacity .25s ease;
      background-color: transparent;
      background-origin: content-box;
      opacity: 0;
    }
    .instant-youtube-storyboard:hover div {
      opacity: 1;
    }
    .instant-youtube-container [pin] {
      position: absolute;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;
      top: auto; bottom: auto; left: auto; right: auto;
      border-style: solid;
      transition: opacity 2.5s ease-in, opacity 0.4s ease-out;
      opacity: 0;
      z-index: 100;
    }
    .instant-youtube-container[playing]:hover [pin]:not([transparent]) {
      opacity: 1;
    }
    .instant-youtube-container[playing] [pin]:hover {
      cursor: alias;
      opacity: 1;
      transition: opacity 0s;
    }
    .instant-youtube-container [pin=top-left][active] { border-top-color: green; }
    .instant-youtube-container [pin=top-left]:hover { border-top-color: #fc0; }
    .instant-youtube-container [pin=top-left] {
      top: 0; left: 0;
      border-width: 10px 10px 0 0;
      border-color: red transparent transparent transparent;
    }
    .instant-youtube-container [pin=top-left][transparent] {
      border-width: 10px 10px 0 0;
    }
    .instant-youtube-container [pin=top-right][active] { border-right-color: green; }
    .instant-youtube-container [pin=top-right]:hover { border-right-color: #fc0; }
    .instant-youtube-container [pin=top-right] {
      top: 0; right: 0;
      border-width: 0 10px 10px 0;
      border-color: transparent red transparent transparent;
    }
    .instant-youtube-container [pin=top-right][transparent] {
      border-width: 0 10px 10px 0;
    }
    .instant-youtube-container [pin=bottom-right][active] { border-bottom-color: green; }
    .instant-youtube-container [pin=bottom-right]:hover { border-bottom-color: #fc0; }
    .instant-youtube-container [pin=bottom-right] {
      bottom: 0; right: 0;
      border-width: 0 0 10px 10px;
      border-color: transparent transparent red transparent;
    }
    .instant-youtube-container [pin=bottom-right][transparent] {
      border-width: 0 0 10px 10px;
    }
    .instant-youtube-container [pin=bottom-left][active] { border-left-color: green; }
    .instant-youtube-container [pin=bottom-left]:hover { border-left-color: #fc0; }
    .instant-youtube-container [pin=bottom-left] {
      bottom: 0; left: 0;
      border-width: 10px 0 0 10px;
      border-color: transparent transparent transparent red;
    }
    .instant-youtube-container [pin=bottom-left][transparent] {
      border-width: 10px 0 0 10px;
    }
    .instant-youtube-dragndrop-placeholder {
      z-index: 999999999;
      margin: 0;
      padding: 0;
      background: rgba(0, 255, 0, 0.1);
      border: 2px dotted green;
      box-sizing: border-box;
      pointer-events: none;
    }
    .instant-youtube-container [size-gripper] {
      width: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      cursor: e-resize;
      border-color: rgba(50,100,255,0.5);
      border-width: 12px;
      background: rgba(50,100,255,0.2);
      z-index: 99;
      opacity: 0;
      transition: opacity .1s ease-in-out, border-color .1s ease-in-out;
    }
    .instant-youtube-container[pinned*="right"] [size-gripper] {
      border-style: none none none solid;
      left: -4px;
    }
    .instant-youtube-container[pinned*="left"] [size-gripper] {
      border-style: none solid none none;
      right: -4px;
    }
    .instant-youtube-container [size-gripper]:hover {
      opacity: 1;
    }
    .instant-youtube-container [size-gripper]:active {
      opacity: 1;
      width: auto;
      left: -4px;
      right: -4px;
    }
    .instant-youtube-container [size-gripper][tried-exceeding] {
      border-color: rgba(255,0,0,0.5);
    }
    .instant-youtube-container [size-gripper][saveAs="global"] {
      border-color: rgba(0,255,0,0.5);
    }
    .instant-youtube-container [size-gripper][saveAs="site"] {
      border-color: rgba(0,255,255,0.5);
    }
    .instant-youtube-container [size-gripper][saveAs="reset"] {
      border-color: rgba(255,255,0,0.5);
    }
    .instant-youtube-container [size-gripper][saveAs="cancel"] {
      border-color: rgba(255,0,255,0.25);
    }
    .instant-youtube-container [size-gripper] > div {
      white-space: nowrap;
      color: white;
      font-weight: normal;
      line-height: 1.25;
      text-align: left;
      position: absolute;
      top: 50%;
      padding: 1ex 1em 1ex;
      background-color: rgba(80,150,255,0.5);
    }
    .instant-youtube-container [size-gripper] [save-as="site"] {
      font-weight: bold;
      color: yellow;
    }
    .instant-youtube-container[pinned*="left"] [size-gripper] > div {
      right: 0;
    }
  */}).replace(/\$tl:'(.+?)'/g, function(m, m1) { return _(m1) })
  ) +
  updateAltPlayerCSS();
}
