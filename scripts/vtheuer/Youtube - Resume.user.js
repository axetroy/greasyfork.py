// ==UserScript==
// @description     When playing a Youtube video, this script update the URL, adding a `&t=xx` at the current time (minus ten seconds) query param so that when the page is refreshed (be-it after reopening the browser or manual refresh), the video resumes from where it stopped.
// @language        English
// @name            Youtube - Resume
// @namespace       https://www.youtube.com/watch
// @include         https://www.youtube.com/watch*
// @version         1
// @grant           none
// ==/UserScript==

const {max, floor} = Math;

const interval = 10e3;
const rewind = 10;

setInterval(() => {
  const {protocol, host, pathname, search} = location;
  const timeParam = `&t=${max(0, floor(document.querySelector('#movie_player video').currentTime) - rewind)}`;
  
  history.replaceState({}, document.title, `${protocol}//${host}${pathname}${search.replace(/&t=[^&]+|$/, timeParam)}`);
}, interval);