// ==UserScript==
// @name         移除csdn
// @version      0.6
// @description  自动从搜索结果中移除csdn, 目前支持 google, bing, baidu(回车或点击按钮触发). 有任何问题请提交反馈
// @author       zhyl
// @grant        none
// @run-at       document-start

// @include https://www.google.*/*
// @include https://*.bing.com/*
// @include https://www.baidu.com/*
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
  const host = location.host
  const url = new URL(location.href)
  const searchParams = url.searchParams
  const paramsIt = searchParams.keys()

  let search = '?'

  if (~host.indexOf('google')) {
    removeFromGoogle()
  } else if (~host.indexOf('bing')) {
    removeFromBing()
  } else if (~host.indexOf('baidu')) {
    removeFromBaidu()
  }

  function removeFromBaidu() {
    let res = generateSearch('wd')
    if (res.redirect) {
      location.search = res.search
    }

    window.onload = () => {
      let searchInput = document.getElementById('kw')
      let searchSubmit = document.getElementById('su')
      const extraKeyword = '-csdn'

      searchInput.value = searchInput.value.replace(extraKeyword, '').trim()
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          _modifyQuery()
        }
      }, true)
      searchSubmit.addEventListener('click', () => {
        _modifyQuery()
      })

      function _modifyQuery() {
        searchInput.value += ` ${extraKeyword}`
        setTimeout(() => {
          searchInput.value = searchInput.value.replace(extraKeyword, '').trim()
        }, 100)
      }
    }
  }

  function removeFromBing() {
    const extraKeyword = 'NOT csdn'
    let res = generateSearch('q', extraKeyword)
    if (res.redirect) {
      location.search = res.search
    }

    window.onload = () => {
      let searchInput = document.getElementById('sb_form_q')
      let searchForm = document.getElementById('sb_form')

      let originFunc = Element.prototype.appendChild
      Element.prototype.appendChild = function(n) {
        originFunc.apply(this, arguments)
        if (n.name === 'pq') {
          n.value += ` ${extraKeyword}`
        }
      }

      try {
        searchInput.value = searchInput.value.replace(extraKeyword, '').trim()
        searchForm.addEventListener('submit', () => {
          searchInput.value += ` ${extraKeyword}`
        }, true)
      } catch (e) {
        // DON'T HANDLER
      }
    }
  }

  function removeFromGoogle() {
    let res = generateSearch(['q', 'oq'])

    if (res.redirect) {
      location.search = res.search
    }
    window.onload = () => {
      let searchInput = document.getElementsByClassName('gLFyf')[0]
      let searchForm = document.getElementsByClassName('tsf')[0]
      let searchBtn = document.getElementsByClassName('Tg7LZd')[0]

      const extraKeyword = '-csdn'
      searchInput.value = searchInput.value.replace(extraKeyword, '').trim()

      searchForm.addEventListener('submit', () => {
        _restore()
      }, true)
      searchBtn.addEventListener('click', () => {
        _restore()
      }, true)

      function _restore() {
        searchInput.value += ` ${extraKeyword}`
        let hiddenInput = document.querySelector('[name=oq]')
        if (hiddenInput && !~hiddenInput.value.indexOf(extraKeyword)) {
          hiddenInput.value += ` ${extraKeyword}`
        }
        let originFunc = window.s__we
        window.s__we = (a, b) => {
          originFunc(a, b)
          hiddenInput = document.querySelector('[name=oq]')
          if (!~hiddenInput.value.indexOf(extraKeyword)) {
            hiddenInput.value += ` ${extraKeyword}`
          }
        }
      }
    }
  }

  function generateSearch(keyNameArray = [''], extraParam = '-csdn') {
    if (!(keyNameArray instanceof Array)) {
      keyNameArray = [keyNameArray]
    }

    let result = paramsIt.next()
    let removeFlag = false
    while(!result.done) {
      let key = result.value, value = searchParams.get(key)
      if (!~value.indexOf(extraParam) && ~keyNameArray.indexOf(key)) {
          value += ` ${extraParam}`
          removeFlag = true
      }
      search += `${key}=${value}&`
      result = paramsIt.next()
    }
    if (removeFlag) {
      search = search.substr(0, search.length - 1)
      return { redirect: true, search }
    }
    return { redirect: false }
  }

})()