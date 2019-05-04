// ==UserScript==
// @name            YouTube - Time Remaining Counter
// @description     Display the remaining time while you watch YouTube videos
// @version         1.6.2
// @author          wormboy
// @license         MIT
// @namespace       patchmonkey
// @match           https://www.youtube.com/*
// @run-at          document-idle
// @noframes
// ==/UserScript==

const container = document.createElement('div')
container.style.cssText = `
  display: inline-block;
  margin-left: 4px;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
  color: var(--yt-spec-text-secondary);
`

const string = document.createElement('span')
string.style.cssText = `
  margin-left: 4px;
  color: #e91e63;
`

container.innerText = '\u2022'
container.appendChild(string)

let tick = Date.now()
const interval = 1000

function update(event) {
  const timestamp = Date.now()
  const delta = timestamp - tick
  if (delta > interval) {
    tick = timestamp - (delta % interval)
    draw(event)
  }
}

function draw(event) {
  const { duration, currentTime } = event.target
  string.innerText = isNaN(duration) ? '' : format(duration - currentTime)
}

function format(sec) {
  let hours = Math.floor(sec / 3600)
  let minutes = Math.floor(sec % 3600 / 60)
  let seconds = Math.ceil(sec % 3600 % 60)
  if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds
  return `${hours}:${minutes}:${seconds}`
}

window.addEventListener('yt-player-updated', playerUpdated)
function playerUpdated(event) {
  const video = event.target.querySelector('.video-stream.html5-main-video')
  video.removeEventListener('timeupdate', update)
  video.addEventListener('timeupdate', update)
}

window.addEventListener('yt-page-data-updated', pageDataUpdated)
function pageDataUpdated(event) {
  const info = event.target.querySelector('#info-text')
  info.appendChild(container)
}

{
  const [target, video, info] = [
    document.querySelector('ytd-app'),
    document.querySelector('ytd-app .video-stream.html5-main-video'),
    document.querySelector('ytd-app #info-text')
  ]
  if (video) playerUpdated({ target })
  if (info) pageDataUpdated({ target })
}
