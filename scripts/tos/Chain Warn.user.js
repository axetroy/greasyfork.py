// ==UserScript==
// @name         Chain Warn
// @namespace    namespace
// @version      0.5.1
// @description  description
// @author       tos
// @match        *.torn.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

const alert_time = 100 //seconds
const min_chain = 10

GM_addStyle(`
.cw_overlay {
  position: fixed;
  pointer-events: none;
  height: 100%;
  width: 100%;
  z-index: 20000;
  will-change: background-color;
}

.cw_warn {
  animation-name: cw_warn;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}

@keyframes cw_warn {
  0% {
    background-color: #FF000000;
  }
  50% {
    background-color: #FF000055;
  }
  100 {
    background-color: #FF000000;
  }
}
`)

document.querySelector('body').insertAdjacentHTML('afterbegin', `<div class="cw_overlay"></div>`)
const warn_overlay = document.querySelector('.cw_overlay')
const cc_class = document.querySelector('[class^=chain-bar] [class^=bar-value]').className
const chain_value = () => parseInt(document.getElementsByClassName(cc_class)[0].innerText.replace(',', '').split('/')[0])

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    try {
      if (mutation.target.parentElement.className.includes('bar-timeleft')) {
        //const a = performance.now()
        const t = mutation.target.data.split(':')
        const s = parseInt(t[0]) * 60 + parseInt(t[1])
        if (0 < s && s < alert_time && t.length < 3 && min_chain <= chain_value()) warn_overlay.classList.add('cw_warn')
        else warn_overlay.classList.remove('cw_warn')
        //const b = performance.now()
        //console.log(b-a)
      }
    } catch (err) { console.log(err) }
  }
})
const chain_bar = document.querySelector('[class^=chain-bar] [class^=bar-stats]')
console.log(chain_bar)
if (chain_bar) observer.observe(chain_bar, { subtree: true, characterData: true })
