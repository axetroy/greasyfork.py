// ==UserScript==
// @name        Youtube - Copy short URL to clipboard
// @namespace   lleaff
// @supportURL  https://gist.github.com/lleaff/48db35c180ab1b684a0f2c7d9c493244#comments
// @match       https://www.youtube.com/*
// @version     1
// @run-at      document-end
// @grant       GM_setClipboard
// @noframes
// @description Copy short URL to clipboard on video title click
// ==/UserScript==

const TEXT = {
    CLICK_TO_COPY_VID_URL_TO_CLIPBOARD: 'Click to copy short URL',
};


function setupYTTooltip({ element: el, text }) {
    el.classList.add('yt-uix-tooltip');
    el.dataset.tooltipText = text;
    return el;
}

function getResetable({ callbackIn, callbackOut, timeout }) {
    let timeoutId;
    return () => {
      callbackIn();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callbackOut();
        timeoutId = null;
      }, timeout);
    };
}

const extractYoutubeVidId = url => {
  const match = url.match(/v=([^&]+)/);
  return match && match[1];
};
const getShortVidUrl = (url) => `https://youtu.be/${extractYoutubeVidId(url.search || url)}`;

function setupClickToPushToClipboardElement({ element: el, text }) {
  const color = {
        initial: el.style.color || null,
        active:  '#069'
  };
  const opacity = {
        initial: el.style.opacity || null,
        active:  '0.9'
  };

  function setActiveStyle() {
      el.style.color = color.active;
      el.style.opacity = opacity.active;
  }
  function setInactiveStyle() {
      el.style.color = color.initial;
      el.style.opacity = opacity.initial;
  }

  const animate = getResetable({ callbackIn:  setActiveStyle,
                                 callbackOut: setInactiveStyle,
                                 timeout:     0.5e3
                               });

  el.addEventListener('click', ev => {
    GM_setClipboard(text);
    animate();
    ev.preventDefault();
  });

  setupYTTooltip({ element: el,
                   text: TEXT.CLICK_TO_COPY_VID_URL_TO_CLIPBOARD });

  return el;
}

/**
 * Click on video title to copy short url to clipboard
 */
function setupClickToCopyVidTitle(url) {
  const innerTitleEl = document.getElementsByClassName('watch-title')[0];
  if (innerTitleEl) {
    setupClickToPushToClipboardElement({ element: innerTitleEl,
                                         text:    getShortVidUrl(url),
                                       });
  }
}

/**
 * Executed on every new page load
 */
function main() {
  /* Watching video */
  if (location.href.match(/\/watch\?/)) {
    setupClickToCopyVidTitle(location);
  }
}


main();
/* Structured Page Fragment api, Youtube's lib to avoid full-page refreshes*/
document.addEventListener("spfdone", main);