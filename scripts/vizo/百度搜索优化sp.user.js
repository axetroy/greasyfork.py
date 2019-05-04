// ==UserScript==
// @name         百度搜索优化sp
// @namespace    bdso_sp
// @description  Tampermonkey脚本,屏蔽百度推广和各种广告+页面样式美化+url重定向
// @author       vizo
// @version      2.7
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @include      *://www.baidu.com/*
// @resource     bdsoCss http://ma6.top/css/bdso.css?v=1000
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

'use strict'

//导入CSS
function importCSS() {
  let css = GM_getResourceText('bdsoCss')
  let sty = $(document).find('head style')
  
  GM_addStyle(css)
  
  // 删除多余添加的样式, 防止卡顿
  sty.each(function() {
    let tis = $(this)
    let id = tis.attr('id')
    let test = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(id)
    if (test) {
      tis.remove()
    }
  })
}
importCSS()

$(function() {
  init()

  try {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let observer = new MutationObserver(mutationfunc)
    let wrapper = document.querySelector('#wrapper')
    //动态监视DOM树的变化
    observer.observe(wrapper, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  } catch (e) {}

  // 动态加载函数
  function mutationfunc() {
    init()
  }

  function init() {
    importCSS()
    removeADS()
    cdxUrl()
    appendElem()
    setPNStatus()
  }

  // 设置a标签真实地址
  function cdxUrl() {
    // 忽略解析的域名列表
    let ignore_list = ['segmentfault.com']
    
    $('#content_left .c-container .t > a').each(function() {
      let that = $(this)
      let url = that.attr('href')
      let u_txt = that.closest('.result').find('.f13 > .c-showurl').text()
      let dms = u_txt.match(/\b[\w]+\.[a-z]+(?=\/|$)/)+''
      let cdx = that.hasClass('cdx_ed')

      if (!cdx && !ignore_list.includes(dms)) {
        GM_xmlhttpRequest({
          url: url,
          method: 'head',
          onload: function(xhr) {
            try {
              that.attr('href', xhr.finalUrl).addClass('cdx_ed')
            } catch (e) {}
          },
        })
      }
    })
  }

  // 上一页下一页按钮
  function appendElem() {
    let len = $('body').find('.bdpage-l').length
    if (!len) {
      $('body').append('<div class="bdpage-l"></div><div class="bdpage-r"></div>')
    }
  }

  // 设置上下页状态
  function setPNStatus() {
    let fkl = true
    let fkr = true
    $('#page .n').each(function() {
      let that = $(this)
      let text = that.text()
      if (~text.indexOf('上一页')) {
        fkl = false
      }
      if (~text.indexOf('下一页')) {
        fkr = false
      }
    })
    if (fkl) {
      $('body')
        .find('.bdpage-l')
        .addClass('disa')
    } else {
      $('body')
        .find('.bdpage-l')
        .removeClass('disa')
    }
    if (fkr) {
      $('body')
        .find('.bdpage-r')
        .addClass('disa')
    } else {
      $('body')
        .find('.bdpage-r')
        .removeClass('disa')
    }
  }

  //屏蔽广告和推广
  function removeADS() {
    let $ads = ['#content_left>div[style*="display:block !important"]', '#content_left>div:not([id])', '#content_left>#clone']
    let $selctor = $($ads.join())
    $selctor.remove()

    $('#content_left .result[id=1]').each(function() {
      let tis = $(this)
      let txt = tis.find('.f13 .m').text()
      if (txt == '广告') {
        tis.remove()
      }
    })
  }

  // 空格键按下快速搜索
  $(document).on('keydown', function(e) {
    let isFocus = $('#kw').is(':focus')
    if (!isFocus && e.which === 32) {
      $('#kw')
        .focus()
        .select()
      return false
    }
  })
  $('body').on('click', '.bdpage-l', function() {
    $('#page .n').each(function() {
      let that = $(this)
      let text = that.text()
      if (~text.indexOf('上一页')) {
        that[0].click()
      }
    })
  })
  $('body').on('click', '.bdpage-r', function() {
    $('#page .n').each(function() {
      let that = $(this)
      let text = that.text()
      if (~text.indexOf('下一页')) {
        that[0].click()
      }
    })
  })
})
