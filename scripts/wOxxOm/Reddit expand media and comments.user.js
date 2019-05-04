// ==UserScript==
// @name           Reddit expand media and comments
// @description    Shows pictures and some videos right after the link, loads and expands comment threads.

// @version        0.2.3

// @author         wOxxOm
// @namespace      wOxxOm.scripts
// @license        MIT License

// @match          *://*.reddit.com/*

// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest

// @connect        imgur.com
// @connect        gfycat.com
// @connect        streamable.com
// @connect        instagram.com
// @connect        ibb.co
// @connect        prntscr.com
// @connect        prnt.sc
// ==/UserScript==

const CLASS = 'reddit-inline-media';
const CLASS_ALBUM = CLASS + '-album';
const OVERFLOW_ATTR = 'data-overflow';
const MORE_SELECTOR = '[id^="moreComments-"] p, .morecomments a';
const REQUEST_THROTTLE_MS = location.hostname.startsWith('old.') ? 500 : 100;

const RULES = [{
  r: /^https?:\/\/(i\.)?imgur\.com\/(?:a|gallery)\/(\w+)$/i,
  s: 'https://imgur.com/ajaxalbums/getimages/$2/hit.json?all=true',
  q: json =>
    Array.from(((json || {}).data || {}).images || [])
      .map(img => img && `https://i.imgur.com/${img.hash}${img.ext}`),
}, {
  r: /^https?:\/\/(i\.)?imgur\.com\/\w+$/i,
  q: 'link[rel="image_src"], meta[name="twitter:player:stream"]',
}, {
  r: /^https?:\/\/streamable\.com\/.+/i,
  q: 'video',
}, {
  r: /^https?:\/\/gfycat\.com\/.+/i,
  q: 'source[src*=".webm"]',
}, {
  r: /^https?:\/\/(www\.)?instagram\.com\/p\/[^/]+\/?$/i,
  q: 'meta[property="og:image"]',
}, {
  r: /^https?:\/\/ibb\.co\/\w+$/i,
  q: 'meta[property="og:image"]',
}, {
  r: /^https?:\/\/prntscr\.com\/(\w+)$/i,
  s: 'https://prnt.sc/$1',
  q: 'meta[property="og:image"]',
  xhr: true,
}, {
  r: /^https?:\/\/prnt\.sc\/(\w+)$/i,
  q: 'meta[property="og:image"]',
  xhr: true,
}, {
  r: /\.gifv(\?.*)?$/i,
  s: '.mp4',
}, {
  // keep this one at the end of the list
  r: /\.(jpe?g|png|gif|webm|mp4)(\?.*)?$/i,
}];

// language=CSS
GM_addStyle(`
  .${CLASS} {
    max-width: 100%;
    display: block;
  }
  .${CLASS}[data-src] {
    padding-top: 400px;
  }
  .${CLASS}:hover {
    outline: 2px solid #3bbb62;
  }
  .${CLASS_ALBUM} {
    overflow-y: auto;
    max-height: calc(100vh - 100px);
    margin: .5em 0;
  }
  .${CLASS_ALBUM}[${OVERFLOW_ATTR}] {
    -webkit-mask-image: linear-gradient(white 75%, transparent);
    mask-image: linear-gradient(white 75%, transparent);
  }
  .${CLASS_ALBUM}[${OVERFLOW_ATTR}]:hover {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .${CLASS_ALBUM} > :nth-child(n + 2) {
    margin-top: 1em;
  }
`);

const isChrome = navigator.userAgent.includes('Chrom');
const more = [];

let scrollObserver = lazyCreateObserver(onScroll, {rootMargin: '200% 0px'},
  obs => scrollObserver = obs);

let albumObserver = lazyCreateObserver(onScroll, {rootMargin: '200px 0px'},
  obs => albumObserver = obs);

new MutationObserver(onMutation)
  .observe(document.body, {subtree: true, childList: true});

onMutation([{
  addedNodes: [document.body]
}]);

function onMutation(mutations) {
  var items = [];
  var someElementsAdded = false;
  for (var i = 0, m; (m = mutations[i++]);) {
    for (var j = 0, added = m.addedNodes, node; (node = added[j++]);) {
      if (!node.localName)
        continue;
      someElementsAdded = true;
      if (node.localName === 'a') {
        var rule = findMatchingRule(node);
        if (rule)
          items.push(rule);
        continue;
      }
      if (!node.firstElementChild)
        continue;
      var aa = node.getElementsByTagName('a');
      for (var k = 0, a; (a = aa[k++]);) {
        const data = findMatchingRule(a);
        if (data)
          items.push(data);
      }
    }
  }
  if (someElementsAdded)
    debounce(observeShowMore);
  if (items.length)
    setTimeout(maybeExpand, 0, items);
}

function onScroll(entries, observer) {
  for (const e of entries) {
    let el = e.target;
    if (el.localName === 'ins') {
      toggleAttribute(el.parentNode, OVERFLOW_ATTR, !e.isIntersecting);
      continue;
    }
    if (!e.isIntersecting) {
      const rect = e.boundingClientRect;
      if ((rect.bottom < -200 || rect.top > innerHeight + 200) &&
          el.src && !el.dataset.src && el[GM_info.script.name]) {
        delete el[GM_info.script.name];
        el.dataset.src = el.src;
        el.removeAttribute('src');
        el.removeEventListener('load', unobserveOnLoad);
      }
      continue;
    }
    const isImage = el.localName === 'img';
    if (isImage && el.dataset.src || el.localName === 'video') {
      el.src = el.dataset.src;
      el[GM_info.script.name] = {observer};
      el.addEventListener(isImage ? 'load' : 'loadedmetadata', unobserveOnLoad);
      delete el.dataset.src;
      continue;
    }
    if (el.localName === 'a') {
      // switch to an unfocusable element to prevent the link
      // from stealing focus and scrolling the view
      const el2 = document.createElement('span');
      el2.setAttribute('onclick', el.getAttribute('onclick'));
      el2.setAttribute('id', el.id);
      el.parentNode.replaceChild(el2, el);
      el = el2;
    }
    expandNextComment(el);
  }
}

function findMatchingRule(a) {
  var url = a.href;
  for (var i = 0; i < RULES.length; i++) {
    var rule = RULES[i];
    var r = rule.r;
    if (typeof r === 'string') {
      if (!url.includes(r))
        continue;
    } else {
      if (!r.test(url))
        continue;
      var s = rule.s;
      if (s)
        url = url.replace(r, s);
    }
    return {
      a,
      url,
      q: rule.q,
      xhr: rule.xhr,
    };
  }
}

function maybeExpand(items) {
  for (const item of items) {
    const {a, q} = item;
    const {href} = a;
    const text = a.textContent.trim();
    if (
      text &&
      !a.getElementsByTagName('img')[0] &&
      (
        !text.startsWith('http') ||
        !text.endsWith('...') ||
        !/^https?:\/\/\S+?\.{3}$/.test(text)
      ) &&
      !a.closest(
        '.scrollerItem,' +
        '[contenteditable="true"],' +
        `a[href="${href}"] + * a[href="${href}"],` +
        `img[src="${href}"] + * a[href="${href}"]`) &&
      (
        // don't process insides of a post except for its text
        !a.closest('[data-test-id="post-content"]') ||
        a.closest('[data-click-id="text"]')
      )
    ) {
      try {
        (q ? expandRemote : expand)(item);
      } catch (e) {
        // console.debug(e, item);
      }
    }
  }
}

function expand({a, url = a.href, isAlbum}, observer = scrollObserver) {
  const isVideo = /(webm|gifv|mp4)(\?.*)?$/i.test(url);
  const el = document.createElement(isVideo ? 'video' : 'img');
  el.dataset.src = url;
  el.className = CLASS;
  a.insertAdjacentElement(isAlbum ? 'beforeEnd' : 'afterEnd', el);
  if (isVideo) {
    el.controls = true;
    el.preload = 'metadata';
    if (isChrome)
      el.addEventListener('click', playOnClick);
  }
  observer.observe(el);
  return !isAlbum && el;
}

async function expandRemote(item) {
  const {url, q} = item;
  const r = await download(url);
  const isJSON = /^content-type:.*?json\s*$/mi.test(r.responseHeaders);
  const doc = isJSON ?
    tryJSONparse(r.response) :
    new DOMParser().parseFromString(r.response, 'text/html');
  switch (typeof q) {
    case 'string': {
      if (!isJSON)
        expandRemoteFromSelector(doc, item);
      return;
    }
    case 'function': {
      let urls = await q(doc, r.response);
      if (urls && urls.length) {
        urls = Array.isArray(urls) ? urls : [urls];
        expandFromUrls(urls, item);
      }
      return;
    }
  }
}

async function expandRemoteFromSelector(doc, {q, xhr, url, a}) {
  if (!doc)
    return;
  const el = doc.querySelector(q);
  if (!el)
    return;
  let imageUrl = el.href || el.src || el.content;
  if (!imageUrl)
    return;
  if (xhr)
    imageUrl = await downloadAsBase64({imageUrl, url});
  if (imageUrl)
    expand({a, url: imageUrl});
}

function expandFromUrls(urls, {a, url}) {
  let observer;
  const isAlbum = urls.length > 1;
  if (isAlbum) {
    observer = albumObserver;
    a = a.insertAdjacentElement('afterEnd', document.createElement('div'));
    a.className = CLASS_ALBUM;
  }
  for (const url of urls) {
    if (url)
      a = expand({a, url, isAlbum}, observer) || a;
  }
  if (isAlbum) {
    new IntersectionObserver(onScroll, {root: a})
      .observe(a.appendChild(document.createElement('ins')));
  }
}

function expandNextComment(el) {
  if (el)
    more.push(el);
  else
    more.shift();
  if (more.length === 1 || !el && more.length) {
    more[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
    setTimeout(expandNextComment, REQUEST_THROTTLE_MS);
  }
}

function observeShowMore() {
  if (document.querySelector(MORE_SELECTOR)) {
    for (const el of document.querySelectorAll(MORE_SELECTOR)) {
      scrollObserver.observe(el);
    }
  }
}

function playOnClick(event, el, wasPaused) {
  if (!el) {
    setTimeout(playOnClick, 0, event, this, this.paused);
  } else if (el.paused === wasPaused) {
    wasPaused ? el.play() : el.pause();
  }
}

function debounce(fn, timeout = 0, ...args) {
  clearTimeout(fn.__timeout);
  fn.__timeout = setTimeout(fn, timeout, ...args);
}

function tryJSONparse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
}

function download(options) {
  if (typeof options === 'string')
    options = {url: options};
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest(Object.assign({
      method: 'GET',
      onload: resolve,
      onerror: reject,
    }, options));
  });
}

async function downloadAsBase64({imageUrl, url}) {
  let blob = (await download({
    url: imageUrl,
    headers: {
      'Referer': url,
    },
    responseType: 'blob',
  })).response;

  if (blob.type !== getMimeType(imageUrl))
    blob = blob.slice(0, blob.size, getMimeType(imageUrl));

  return new Promise(resolve => {
    Object.assign(new FileReader(), {
      onload: e => resolve(e.target.result)
    }).readAsDataURL(blob);
  });
}

function getMimeType(url) {
  const ext = (url.match(/\.(\w+)(\?.*)?$|$/)[1] || '').toLowerCase();
  return 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
}

function toggleAttribute(el, name, state) {
  if (state && !el.hasAttribute(name))
    el.setAttribute(name, '');
  else
    el.removeAttribute(name);
}

function lazyCreateObserver(onIntersect, options, onCreate) {
  return new Proxy({}, {
    get(_target, k) {
      const observer = new IntersectionObserver(onIntersect, options);
      onCreate(observer);
      const v = observer[k];
      return typeof v === 'function' ? v.bind(observer) : v;
    },
  });
}

function unobserveOnLoad() {
  this.removeEventListener('load', unobserveOnLoad);
  const {observer} = this[GM_info.script.name] || {};
  if (observer)
    observer.unobserve(this);
  delete this[GM_info.script.name];
}
