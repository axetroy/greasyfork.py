// ==UserScript==
// @name         The Verge Parental Control
// @namespace    https://theverge.com
// @version      0.3.13
// @description  Removes stories from The Verge's based on keywords, modify it to suit your needs. Defaults to removing "monkey business" stories. Source, issues, PR's etc available on Gitlab. https://gitlab.com/gingersareawesome/the-verge-parental-control 
// @author       GingersAreAwesome
// @license      MIT
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js
// @match        https://www.theverge.com/*
// @run-at document-start
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
  /* jshint ignore:end */
  /* jshint esnext: false */
  /* jshint esversion: 6 */

  // Blacklist
  let ban = [ // MUST BE LOWER CASE
    /rape/,
    /molest/,
    /sex/,
    /male/,
    /harass/,
    /allegation/,
    /believed/,
    /#metoo/,
    /seduce/,
    /walkout/,
    /gender/,
    /misconduct/,
    
    /aziz ansari/,
    /woody allen/,
    /degrasse/,
    /ndgt/,
    
    /mass shooting/,
    /suicid/,
    
    /d you push that button/
  ]

  // DO NOT TOUCH
  // TODO: bubble up to element with entry in class, remove it.
  let removeArticle = (no) => {
    no.style.opacity = 0.0
    let article = no
    do {
      article = article.parentNode
      if (article === document.documentElement) { return }
      if (! article) { return }
    } while (article && ! article.className.match(/c-entry-box--compact /))
    
    if (
        article
        && article.parentNode
        && article.parentNode.className.match(/c-compact-river__entry /) 
    ) {
      article.parentNode.remove()
    } else if ( article ){
      article.remove()
    }
  }

  window.addEventListener('DOMContentLoaded', function() {

    console.log('TVBK TamperMonkey script deployed.')

    _.set(document.querySelector('.c-masthead__dateline'), 'style.display', 'none')
    _.set(document.querySelector('.c-rock-list'), 'style.display', 'none')
    _.set(document.querySelector('.main-social'), 'style.display', 'none')
    _.set(document.querySelector('.c-rock-newsletter'), 'style.display', 'none')
    _.set(document.querySelector('.c-tab-bar'), 'style.display', 'none')
    _.set(document.querySelector('.c-related-list .c-video-embed'), 'style.display', 'none')

    let links = document.querySelectorAll('a')
    console.log('TVBK: Found ' + links.length + ' links.')
    ban.forEach(word => {
      links.forEach(link => {
        if(link.text.toLowerCase().match(word)){
          console.log(`badword discovered in link: ${link.text}`)
          removeArticle(link)
        }
      })
    })
    window.document.documentElement.style.visibility = 'visible'
  }, true)
/* jshint ignore:start */
]]></>).toString();
// dom is not completely populated yet, but body element should be
window.document.documentElement.style.visibility = 'hidden'

var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
