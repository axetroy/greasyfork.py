// ==UserScript==
// @name         屏蔽指定网站广告(csdn等)
// @description  屏蔽csdn,w3school,runoob,iteye,liaoxuefeng等网站广告
// @namespace    ad_mask
// @version      2.0
// @author       vizo
// @require      https://cdn.staticfile.org/jquery/3.3.1/jquery.min.js
// @include      *://blog.csdn.net/*
// @include      *://bbs.csdn.net/*
// @include      *://*iteye.com/*
// @include      *://*runoob.com/*
// @include      *://*dytt8.net/*
// @include      *://*liaoxuefeng*
// @include      *://*w3school.com.cn/*
// @include      *://*iconfont.cn/*
// @include      *://*gitee.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// @noframes
// ==/UserScript==

let domainAry = [
  {
    name: 'csdn',
    ym: 'blog.csdn.net',
  },
  {
    name: 'csdn',
    ym: 'bbs.csdn.net',
  },
  {
    name: 'iteye',
    ym: 'iteye.com',
  },
  {
    name: 'runoob',
    ym: 'runoob.com',
  },
  {
    name: 'dytt',
    ym: 'dytt8.net',
  },
  {
    name: 'liaoxuefeng',
    ym: 'liaoxuefeng',
  },
  {
    name: 'w3school',
    ym: 'w3school.com.cn',
  },
  {
    name: 'iconfont',
    ym: 'iconfont.cn',
  },
  {
    name: 'gitee',
    ym: 'gitee.com',
  },
]

GM_addStyle(`
    .csdn iframe,
    .csdn aside,
    .csdn #adContent,
    .csdn div[id^=layer],
    .csdn div[id*=dmp_ad],
    .csdn div[id*=kp_box],
    .csdn div[class*=course_target],
    .csdn div[class*=type_hot_word],
    .csdn .recommend-ad-box,
    .csdn .mediav_ad,
    .csdn .blog-expert-recommend-box,
    .csdn .recommend-fixed-box,
    .csdn .pulllog-box,
    .csdn .fourth_column,
    .csdn .login-mark,
    
    .dytt iframe,
    .dytt body>a,
    .dytt div[id^=cs_DIV],
    
    .iteye #layerd,
    .iconfont #pop_ad,
    
    .liaoxuefeng #x-sponsor-a,
    .liaoxuefeng #x-sponsor-b,
    
    .gitee body > .float-left-box,
    

    
    .w3school iframe
    
    {display:none !important;}
`)

domainAry.forEach(v => {
  if (~location.host.indexOf(v.ym)) {
    document.documentElement.classList.add(v.name)
    init()
  }
})

function init() {
  $(function() {
    setTimeout(() => {
      $('html iframe').each(function() {
        $(this).remove()
      })
      let csdn = $('html').hasClass('csdn')
      if (csdn) {
        let el = $('#btn-readmore')
        if (el) {
          el[0].click()
        }
      }
    }, 500)
  })
}

$(function() {
  function del(ele) {
    $('html')
      .find(ele)
      .remove()
  }
  function empty(ele) {
    $('html')
      .find(ele)
      .parent()
      .empty()
  }

  $(document).on('scroll', function() {
    del('.csdn .recommend-ad-box')
  })
})
