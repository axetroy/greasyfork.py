// ==UserScript==
// @name CSDN优化
// @description CSDN阅读优化 
// @namespace Violentmonkey Scripts
// @match *://*.blog.csdn.net/*/article/details/*
// @grant none
// @version 1.1
// ==/UserScript==
function hide(dom) {
  if (!dom) {
    return
  }
  if (dom instanceof NodeList) {
    dom.forEach(function(item, index) {
      item.style.display = 'none'
    })
  }
  if (dom instanceof Node) {
    dom.style.display = 'none'
  }
}

// 自动展开
hide(document.querySelector('main>.hide-article-box'))
document.querySelector('main>.blog-content-box>article>div').style.height = 'auto'

// 底栏
hide(document.querySelector('.pulllog-box'))

// 去除广告
hide(document.querySelectorAll('.recommend-ad-box'))
hide(document.querySelector('#adContent'))
hide(document.querySelector('._360_interactive'))
hide(document.querySelector('.fourth_column'))
document.querySelectorAll('main>*').forEach(function(item, index) {
  var idStr = item.getAttribute('id') || ''
  if (idStr.indexOf('_ad') != -1) {
    hide(item)
  }
})
document.querySelectorAll('aside>*').forEach(function(item, index) {
  var classStr = item.className || ''
  var idStr = item.getAttribute('id') || ''
  if (classStr.indexOf('csdn-tracking-statistics') != -1) {
    hide(item)
  } else if (idStr == 'asideFooter') {
    if (item.children.length == 2) {
      hide(item.children[0])
    }
  }
})
