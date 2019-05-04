  // ==UserScript==
  // @name         搜索引擎跳转
  // @namespace    https://greasyfork.org/zh-CN/scripts/32437-%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E8%B7%B3%E8%BD%AC
  // @version      0.6
  // @description  简单的搜索引擎跳转
  // @author       tgxh
  // @include	http://*
  // @include	https://*
  // @match   *://*/*
  // @grant        none
  // ==/UserScript==

  (function (window, document) {
    'use strict';

    let href = window.location.href,
      css = ''
      , styles = `
      .t_search_list {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }
      
      .t_search_list a {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-right: 10px;
        font-size: 16px;
        color: #666 !important;
        text-decoration: none;
      }
      
      .t_search_list a:hover {
        background-color: #fff !important;
      }
      
      .t_search_list a > img {
        margin-right: 2px;
        width: 16px;
        height: 16px;
      }
.t_search_list a > img._Baidu {
        width: 18px;
        height: 18px;
      }
      body.vasq #hdtbMenus.hdtb-td-o {
        top: 90px !important;
      }
    `

    /*
    * name：显示名字
    * url：页面url匹配正则
    * id：输入框id
    * selector：插入位置选择器，jquery写法
    * link：跳转的搜索链接，用%s代替搜索关键词
    * icon：base64图标，20×20 */
    let siteInfos = [
      {
        name: 'Google',
        url: /^https?:\/\/(www|encrypted)\.google(?:\.\D{1,3}){1,2}\/(webhp|search|#|$|\?)/i,
        id: '[name="q"]',
        selector: '#before-appbar',
        link: 'https://www.google.com/search?hl=zh-CN&safe=off&q=%s',
        icon: 'data:image/png;base64,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'
      },
      {
        name: 'Baidu',
        url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/i,
        id: '#kw',
        selector: '#wrapper_wrapper',
        link: 'https://www.baidu.com/s?wd=%s',
        icon: 'data:image/png;base64,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'
      },
      {
        name: 'Bing',
        url: /^https?:\/\/.*\.bing\.com\/search\?/i,
        id: '#sb_form_q',
        selector: '#b_tween',
        link: 'http://cn.bing.com/search?q=%s',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAY1BMVEUAAAAAg3MAgnQAg3MAhHMAhnAAhHIAh3AAiW8AhXIAhHMAiG8AhHMAg3MAgXcAhnAAgnQAhHMAhXIAhXIAhnEAiW4AhnIAhXIAh3AAhnAAhHQAnV0Aim0AgHYAg3MAgnQAf3ZXmxj4AAAAHnRSTlMAlwnw2ZGJhBPe0zs2MSol+u3Lwri1pZxrakxCBAHnfGw/AAAAf0lEQVQY06XQxw6DQAwEUMNWenqPh///ysgrBZldbvjkeQdrZCJyNkyUTwXgXCAzo95A3onfri6RPLu+wDgDTZiym1cwgPY5aHzPkMKoNNLgjrKtkT4WBQaIQSG9TCL2/YLmlAiX+K8kOVHTLeW9QbLDg9TEm/S+5z8ZWzuq+APjIhCFQMo26AAAAABJRU5ErkJggg=='
      },
      {
        name: 'Zhihu',
        url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
        id: '#q',
        selector: '.zg-wrap.zu-main',
        link: 'https://www.zhihu.com/search?type=content&q=%s',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAyVBMVEUAAAAPiPAPiOsNiewPh+sOiO0PiOwPiesMiu8QiOoNiuwNh+4OiewPhu4PiOwNiO0PiOsQieoPh+wPiOsPh+wQhusOiewPh+wOi+0QiOoQiOoPiOsNie0Nje0Qf+oPiewOiOwQiOoHhPgJiuwOie0Ok+wPduoOjOwTceYQiOsNj+4RiukMlu4OkewLu/INeegQcuoRkuoHgPIMn+4PnOoKmvEFy/cEqOsMiewJxfUPiOsPiesQh+oRguoQhOoTfugPiO0QdusTdeZlefBFAAAAOnRSTlMAEeQ1jHP7fScDg2QuLB/w6eHY1MixcVpL+NHCpId9d2oaFg0H7+HdzczLuLeoj3dnX15XUU9CNjUiGX7+qQAAAORJREFUGNNlzddSwzAQheFjsGwLl8Td6ZXeO6wkB3j/h0KSGQ+ZfDc78492Be2xxoFQNIdxNEBn43Q2QCCll2eeN0DtkeFNAFdcF0RFcclDmrqaSMGl3qYc2gk5ZoghWBqAiwyaTx9m0BESPbY07uLxX7SotOt95MsF8ymvGFsv+8iIJFl+08cgjuNQuEEcrRZ7N1/bZP+mcduOn8zv4l/k6ur85w2YU2Lj0K6pF3yrT8zVMxBElAJYya813tUFZlI0ZUv2Zba7B3B3hqgatWLGqhrR6e4Ghrk3nTgwwvIBvW03fgEtdxsaMJPDZQAAAABJRU5ErkJggg=='
      },
      {
        name: 'Douban',
        url: /^https?:\/\/www\.douban\.com\/search*/i,
        id: 'input[name="q"]:not(#inp-query)',
        selector: '.article',
        link: 'https://www.douban.com/search?q=%s',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAolBMVEUAAAB+v2J6t2dbmE+CwGdXlEt+v2CBwWWCwWVZnFFYm09WlUyAwmKDxGSDxGRoqFVUkElUlkt8vF9/wGF2u16CwmaDwmaBwmSBwmNkolJblUyCwmN5uV5/v2KAwWODw2Vsq1ZrqVZ+v2N1uF9npFN/v2R/vmR6tmd6uGh/v2NPikeAwWF+wF9/w16Bw2KDxGN9v2CN0GiIyWV6u16JzGeJy2YgFv1YAAAAK3RSTlMAnFoOsxz4x7QYJRbv6NaCEwXs5eDQuq6naTEo3tbOnZmXhX18YF9BORYLIxg7yAAAAK1JREFUGNNtyNcSgjAQheFVJBoQKRaKvZeFJYC+/6sJRDKTwe/qnB/s836gOz3BWuSom66bmOrq6Js+6NrwGGru0JhllCmUOW2cpGykTNOxjGIOyu5f3KrogDLrYuoYShdXKCr8qUS2lJEIMW8hEsnoJfi5eGbNjktKPJDcIpBjUxxACQoXanHB5Dc454ZbomXbFnsfX5ybBkSISExQjpiTYFTfCELsCeE66Ll9AeogHP6ZE4gWAAAAAElFTkSuQmCC'
      },
      {
        name: 'Taobao',
        url: /^https?:\/\/s\.taobao.com\/search*/i,
        id: '#q',
        selector: '.grid-total:nth-of-type(3)',
        link: 'https://s.taobao.com/search?q=%s',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAyVBMVEUAAAD/QQD/PwD/QgD/PwD/QgD/QwD/QgD/QwD/QgD/QwD/QQD/PgD/QgD/QQD/QgD/RgD/PQD/QwD/QgD/QQD/QwD/QQD/SgD/QgD/QgD/QwD/PgD/QAD/QwD/QgD/QgD/RQD/QgD/QAD/QwD/QwD/RwD/OgD/RAD/QAD/PwD/UAD/RQD/PwD/OwD/TgD/QgD/QgD/QAD/NQD/PgD/RgD/NQD/QQD/OQD/QwD/NQD/QQD/RAD/LQD/PwD/OgD/QgD/QAD/RQD/PQBcumVlAAAAP3RSTlMA67aIGfbwnHJZRQ8L4NnWzMG7sqCXg2hmYD87LPrl0cGopY56T0k2NCkWAu/j4uHa19KvrJuain96VCYYEwRAliStAAAA5klEQVQY05WQR7LCQBBDezxOOAdwJmf4OWfNcP9D/cEuL1iinVRPqq6mqzSoiOzN4SLLwH5IGlty68Iu910ogHUF+XwrgTEQNW3bjF0GwP9yleMQegcnWFhY9sVcgRiQGdMjZvM0DKe7ieBEhZTvRE8yA2BZbw3DSPG6hpqiNU0QKecBw3YGq1/fxFkm295j0W2X3sapGR4cbntGR87wpzGbfGhkBGS0m6OTRnenFwoQDoFyiozcVyH39CkFAJHw8SoQOVUCscLzeWIVjUffS0A/X+T0r9EVjJvWHo99eOBp+rGjK/QP7eUe3eatJugAAAAASUVORK5CYII='
      }
    ]

    /*
    * id：输入框的id
    * selector：插入位置的选择器，jquery写法
    * type：插入方式appendChild、insertFirst，分别是selector的子元素第一个和最后的位置
    * css：搜索条自定义样式*/
    function createList(id, selector, css, type, before) {
      let word = document.querySelector(id).getAttribute('value')
      // debugger
      let styleEle = document.createElement('style')
      styleEle.innerHTML = styles
      document.querySelector('head').appendChild(styleEle)

      let wrap = document.createElement('div')
      wrap.className = 't_search_wrap'
      wrap.style.cssText += css
      wrap.innerHTML = '<div class="t_search_list"></div>'

      switch (type) { //插入方式，可以自定义
        case 'appendChild':
          document.querySelector(selector).appendChild(wrap)
          break
        case 'insertFirst':
          let p = document.querySelector(selector)
          p.insertBefore(wrap, p.firstChild)
          break
        case 'insertBefore':
          let q = document.querySelector(selector)
          q.insertBefore(wrap, q.querySelector(before))
        default:
          break
      }

      let listele = document.querySelector('.t_search_list')
      listele.innerHTML = `<a href=""></a>`.repeat(siteInfos.length)
      let linklist = listele.querySelectorAll('.t_search_list a')
      linklist.forEach((item, i) => {
        item.innerHTML = `<img src="${siteInfos[i].icon}" class="_${siteInfos[i].name}">${siteInfos[i].name}`
        item.href = siteInfos[i].link.replace(/%s/, word)
      })
    }

    function init() {
      siteInfos.some(item => {
        if (item.url.test(href)) {
          switch (item.name) {
            case 'Google':
              css = 'padding-left: 165px; padding-top: 10px;'
              createList(item.id, item.selector, css, 'appendChild')
              break
            case 'Baidu':
              css = 'padding-left: 121px; padding-top: 10px;'
              createList(item.id, item.selector, css, 'insertFirst')
              break
            case 'Zhihu':
              css = 'margin-top: -15px; margin-bottom: 10px;'
              createList(item.id, item.selector, css, 'insertFirst')
              break
            case 'Bing':
              css = 'margin-top: -18px;margin-bottom: 5px;'
              createList(item.id, item.selector, css, 'insertFirst')
              break
            case 'Douban':
              css = 'margin-top: -20px;margin-bottom: 8px;'
              createList(item.id, item.selector, css, 'insertBefore', '.search-cate')
              break
            case 'Taobao':
              css = 'padding-left: 258px;margin-top: 5px;'
              createList(item.id, item.selector, css, 'insertFirst')
            default:
              break
          }
          return true
        }
      })
    }

    window.addEventListener('load', init, false)
  })(window, document);