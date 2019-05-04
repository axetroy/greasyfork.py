// ==UserScript==
// @name            YouTube - Comment Snub
// @description     Block annoying user comments
// @version         1.2.1
// @author          wormboy
// @license         MIT
// @namespace       patchmonkey
// @include         https://www.youtube.com/*
// @run-at          document-idle
// @grant           GM.setValue
// @grant           GM.getValue
// @noframes
// ==/UserScript==

function observeComments(thread) {
  tagComments(thread.children)
  commentObserver.observe(thread, { childList: true })
}

function updateCommentTags(targets) {
  for (const target of targets) {
    linkMap.get(target).dataset.snub = target.getAttribute('href')
  }
}

function tagComments(nodes) {
  const targets = []
  for (const node of nodes) {
    addButton(node)
    const target = node.querySelector('#author-thumbnail a')
    linkMap.set(target, node)
    targets.push(target)
    linkObserver.observe(target, { attributeFilter: ['href'] })
  }
  updateCommentTags(targets)
}

function updateSnubIds(list) {
  let style = document.head.querySelector('#snub-id-list')
  if (!style) {
    style = document.head.appendChild(document.createElement('style'))
    style.id = 'snub-id-list'
  }
  const rules = list.length ? list.map(i => `[data-snub="${i}"]`).join(',\n') : ''
  style.textContent = rules && snubSelector(rules)
}

function loadBlacklist() {
  GM.getValue('blacklist', []).then(updateSnubIds)
}

function quarantineUser(event) {
  const { snub } = buttonMap.get(event.currentTarget).dataset
  GM.getValue('blacklist', []).then(list => {
    list = new Set(list)
    list.add(snub)
    list = Array.from(list)
    updateSnubIds(list)
    return list
  }).then(list => GM.setValue('blacklist', list))
}

function addButton(node) {
  if (node.querySelector('#toolbar #snub-button')) return
  const el = document.createElement('div')
  el.id = 'snub-button'
  el.style.cssText = buttonCss
  el.innerHTML = buttonTemplate('snub this user', 'Snub')
  el.querySelector('.yt-icon-button').style.cssText = iconButtonCss
  el.addEventListener('click', quarantineUser)
  const icon = el.querySelector('.ytd-toggle-button-renderer')
  icon.innerHTML = svgIcon(36, 36, iconVectors.shutup)
  const toolbar = node.querySelector('#toolbar')
  toolbar.insertBefore(el, toolbar.firstElementChild)
  buttonMap.set(el, node)
}

function reusable(strs) {
  return function(...vals) {
    return strs.map((s, i) => `${s}${vals[i] || ''}`).join('')
  }
}

const linkMap = new WeakMap()
const buttonMap = new WeakMap()

const linkObserver = new MutationObserver(function(records) {
  const targets = []
  for (const { target } of records) {
    targets.push(target)
  }
  updateCommentTags(targets)
})

const commentObserver = new MutationObserver(function(records) {
  const targets = []
  for (const { addedNodes } of records) {
    targets.push(...addedNodes)
  }
  tagComments(targets)
})

const buttonTemplate = reusable`
  <button id="button" class="style-scope yt-icon-button" aria-label="${'aria'}">
    <div id="icon" class="style-scope ytd-toggle-button-renderer"></div>
  </button>
  <paper-tooltip>${'tooltip'}</paper-tooltip>
`

const buttonCss = `
  --yt-button-icon-size: var(--ytd-comment-thumb-dimension);
  margin: 0 8px 0 -8px;
`

const iconButtonCss = `
  padding: var(--yt-button-icon-padding, 8px);
  width: var(--yt-button-icon-size, var(--yt-icon-width, 40px));
  height: var(--yt-button-icon-size, var(--yt-icon-height, 40px));
`

const svgIcon = reusable`
  <svg viewBox="0 0 ${'width'} ${'height'}" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: block; width: 100%; height: 100%;">
    <g class="style-scope yt-icon">${'vector'}</g>
  </svg>
`

const iconVectors = {
  shutup: `
    <circle fill="#FFCC4D" cx="18" cy="18" r="18"/>
    <path fill="#664500" d="M14.034 14.499c0 1.934-1.119 3.5-2.5 3.5s-2.5-1.566-2.5-3.5c0-1.933 1.119-3.5 2.5-3.5s2.5 1.567 2.5 3.5m13 0c0 1.934-1.119 3.5-2.5 3.5s-2.5-1.566-2.5-3.5c0-1.933 1.119-3.5 2.5-3.5s2.5 1.567 2.5 3.5m-2.033 12.505H10c-1 0-1-1-1-1v-1s0-1.003 1-1.003l15.001.003v3z"/>
    <path fill="#99AAB5" d="M35.255 26.084l-7.713-2.121c-.72-.197-1.049.287-1.171.547l-1.64-.784L24 25.255v-2.254h-2v2h-2v-2h-2.001v2H16v-2h-2v2h-2v-2h-2v3h2v2h2v-2h1.999v2h2v-2H20v2h2v-2h1.643l-.58 1.212 1.648.788-.099.207s-.248.737.373 1.275c.621.537 5.285 4.735 5.285 4.735s.899.866 1.769.079c.738-.67 3.649-6.02 3.914-6.983.266-.964-.698-1.23-.698-1.23zm-3.772 6.071l-2.644-2.248 1.614-3.069 3.338 1.132-2.308 4.185z"/>
  `
}

const snubSelector = reusable`
  ${'list'} {
    display: none !important;
  }
`

window.addEventListener('yt-comments-loaded', function(event) {
  observeComments(event.target.querySelector('#contents'))
})

window.addEventListener('yt-expander-more-tapped', function(event) {
  if (event.target.matches('#comments ytd-expander')) {
    observeComments(event.target.querySelector('#loaded-comments,#loaded-replies'))
  }
})

window.addEventListener('yt-navigate-start', loadBlacklist)

loadBlacklist()
