// ==UserScript==
// @name        MAL Autocomplete
// @namespace   Doomcat55
// @description Username autocompleter for MyAnimeList.net
// @include     https://myanimelist.net/*
// @version     1.3
// @grant       none
// ==/UserScript==
// allow pasting in Firefox

const usernames = [...document.querySelectorAll('a[href^="/profile/"]')].map(elm => {
  return elm.pathname.substr(9)
}).sort()

function autoComplete(event) {
  if (event.keyCode === 8) return
  const elm = event.target
  const input = elm.value,
    startPos = elm.selectionStart,
    endPos = elm.selectionEnd,
    lastAtSym = input.lastIndexOf('@', startPos),
    prompt = input.substring(lastAtSym + 1, startPos)
  if (lastAtSym !== -1 && prompt && startPos == endPos) {
    const suggestion = usernames.filter(username => {
      return prompt.toLowerCase() == username.slice(0, prompt.length).toLowerCase()
    })[0]
    if (suggestion) {
      const priorText = input.substring(0, lastAtSym + 1),
            postText = input.substring(lastAtSym + 1 + prompt.length)
      elm.value = priorText + suggestion + postText
      elm.setSelectionRange(lastAtSym + 1 + prompt.length, lastAtSym + 1 + suggestion.length)
    }
  }
}

const textareas = [...document.getElementsByClassName('textarea')]
textareas.forEach(textarea => {
  textarea.onkeyup = autoComplete
})
