// ==UserScript==
// @name         Duolingo mods
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Duolingo keyboard shortcuts
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://www.duolingo.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[

// constants
const home_class = '_2QyU5'
const strengthen_class = '_1_mnP _3QG2_ _1vaUe _3IS_q'
const practice_class = '_6Hq2p _3FQrh _1AthD B1eV7 _1lig4 _3IS_q _2cWmF'
const discuss_class = '_11g-P _1os6E _3cu46'
const untimed_class = '_1pp2C _1MQOP _3qSMp _3cu46 T6NVk _27uC9'
const start_lesson_class = 'TZE8O'

const textarea_class = '_7q434 _1qCW5 _2fPEB _3_NyK _1Juqt _3WbPm'

const replay_audio_class = '_2GN1p _1ZlfW _2cIrv'
const choice_class = 'iNLw3'
const mouseover_character_class = '_1gjlS'

const asdfg_arr = ['a','s','d','f','g']
const qwert_arr = ['q','w','e','r','t']
const hjkl_arr  = ['h','j','k','l',';']

// variables
let last_selected_index = -1
let mouseover_active = false

// helpers
const getEls = class_name => document.getElementsByClassName(class_name)

function clickIndex(class_name, idx) {
  const els = getEls(class_name)
  if (els.length > idx) {
    els[idx].click()
    return true
  }
  return false
}

const clickFirst = class_name => clickIndex(class_name, 0)

function mouseoverCharacter(idx) {
  const mouseover_els = getEls(mouseover_character_class)
  if (idx < 0) {
    idx = mouseover_els.length - 1
  } else if (idx >= mouseover_els.length) {
    idx = 0
  }

  for (let i = 0; i < mouseover_els.length; ++i) {
    const el = mouseover_els[i]
    if (el.className == mouseover_character_class || i == idx) {
      el.click()
    }
  }

  mouseover_active = (idx !== last_selected_index)
  last_selected_index = idx
}

// core functionality
function onKey(e) {
  console.warn(e)
  const key = e.key.toLowerCase()
  if (key == '`') {
    clickFirst(textarea_class)
  } else if (key == ' ' && e.ctrlKey && !e.shiftKey) {
    clickFirst(replay_audio_class)
  } else if (key == 's') {
    clickFirst(strengthen_class) || clickFirst(practice_class) || clickFirst(untimed_class)
  } else if (key == 'd') {
    clickIndex(discuss_class, 1)
  } else if (key == 'r' && e.altKey) {
    clickFirst(home_class)
  } else if (key == 'tab') {
    if (e.shiftKey) {
      mouseoverCharacter(last_selected_index - 1)
    } else {
      mouseoverCharacter(last_selected_index + 1)
    }
    e.preventDefault()
  } else if (key == 'escape') {
    mouseoverCharacter(last_selected_index)
  } else if (e.keyCode >= 112 && e.keyCode <= 121) { // Fn
    const idx = e.keyCode - 112
    mouseoverCharacter(idx)
    e.preventDefault()
  } else if (e.keyCode >= 49 && e.keyCode <= 53) {
    const idx = (Number(key) + 10 - 1) % 10
    clickIndex(start_lesson_class, idx) || clickIndex(choice_class, idx)
  } else if (asdfg_arr.indexOf(key) != -1) {
    clickIndex(choice_class, asdfg_arr.indexOf(key))
  } else if (qwert_arr.indexOf(key) != -1) {
    clickIndex(choice_class, qwert_arr.indexOf(key) + 5)
  } else if (hjkl_arr.indexOf(key) != -1) {
    clickIndex(choice_class, hjkl_arr.indexOf(key) + 5)
  } else {
      if (mouseover_active) {
        mouseoverCharacter(last_selected_index)
      }
  }
}

function startUntimed() {
  if (!clickFirst(untimed_class)) {
    setTimeout(startUntimed, 100)
  }
}

function prepareStrengthen() {
  const els = getEls(strengthen_class)
  const els2 = getEls(practice_class)
  if (els.length > 0) {
    els[0].addEventListener('click', startUntimed)
  } else if (els2.length > 0) {
    els2[0].addEventListener('click', startUntimed)
  }
}

function onNavigate() {
  last_selected_index = -1;
  prepareStrengthen()
}

let current_url = window.location.href
function checkNavigate() {
  if (current_url != window.location.href) {
    current_url = window.location.href
    onNavigate()
  }
}

setInterval(checkNavigate, 100)
document.addEventListener('keydown', onKey)
onNavigate()



]]></>).toString()
var c = Babel.transform(inline_src, { presets: [ 'es2015', 'es2016' ] })
eval(c.code)
/* jshint ignore:end */