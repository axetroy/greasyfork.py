// ==UserScript==
// @name         Amazon Prime Video Expiry Viewer
// @namespace    https://github.com/Kadauchi
// @version      1.0.0
// @description  Makes it obvious which and when videos are going to expire.
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://www.amazon.com/gp/video*
// @include      https://www.amazon.com/Prime-Video/*
// ==/UserScript==

const checked = {}

function checkShelf () {
  for (const el of document.getElementsByClassName(`dv-shelf-item`)) checkIfLeaving(el)
  for (const el of document.getElementsByClassName(`dv-packshot`)) checkIfLeaving(el)
}

async function checkIfLeaving (item) {
  const asin = item.querySelector(`[data-asin]`).dataset.asin
  const leaving = await fetchHover(asin)

  if (leaving) {
    const date = document.createElement(`div`)
    date.textContent = leaving
    date.style = `text-align: center; color: black;`
    date.style.backgroundColor = `yellow`
    item.appendChild(date)
  }
}

function fetchHover (asin) {
  return new Promise(async (resolve) => {
    if (asin && !checked[asin]) {
      const response = await window.fetch(`https://www.amazon.com/gp/video/hover/${asin}?format=json`)
      const text = await response.text()
      const leaving = text.match(/Leaving Prime on ([\w\s,]+)/)
      const isLeaving = leaving ? leaving[1] : false
      checked[asin] = isLeaving
      resolve(isLeaving)
    } else if (checked[asin]) {
      resolve(checked[asin])
    }
  })
}

checkShelf()
