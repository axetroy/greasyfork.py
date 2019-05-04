// ==UserScript==
// @name           Reddit - Load 'Continue this thread' inline
// @description    Changes 'Continue this thread' links to insert the linked comments into the current page
// @author         James Skinner <spiralx@gmail.com> (http://github.com/spiralx)
// @namespace      http://spiralx.org/
// @version        1.9.5
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiAAABYgAWToQQYAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNWWFMmUAAAF3SURBVDhP1ZI/SAJhGMZN3WpKOAgsKGiIoKWg0K2LXIJWj6DAhpAgKMiW7irBqziHbhYE12sLGtWGKHBx0kHcQrBJXNIz9e35vvsQoj841g9+fHy8z/PyHZzrXzANNbgKF2ASHsOhOYGTUIb3cBSq4hyKa3Ey2GsMeMRvvzALd+AVvIPbcAb+yAq8hBehUOgxnU5TtVol27ap3W5TpVKhVCpFsiw/IHMusstwgOHxeDZM07T7/T5Rr0vUfacBvR7uHWIzwzBayK+zDm8KktFo9FXEifaXiHbnxAXEZKKtqcHSSCTygs6nBYuWZfEhR1eIzjbFBdzsYcma8xKQyWQInXmn6jCeSCQ6fDoEqqqyzxhzqgK/368Xi0UeKJfLpGka5fN5yuVyrEClUonPCoUCSZLE/oMvjGBwqut6q16vU6PRoGw2yxc0m02q1WoUj8fffD5fjGWdyvdMeL3ew2AweKsoynM4HH4KBAKW2+0+wExyIn8Hl+sDt5ENCrpr91QAAAAASUVORK5CYII=
// @icon64         data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2029%2025%22%3E%3Cg%20transform=%22translate(1%201)%22%20stroke-width=%221.1%22%20fill-rule=%22evenodd%22%20fill=%22none%22%3E%3Ccircle%20stroke=%22#000%22%20cx=%222.7%22%20r=%222.7%22%20cy=%2210.7%22%20fill=%22#fff%22/%3E%3Ccircle%20stroke=%22#000%22%20cx=%2224.7%22%20r=%222.7%22%20cy=%2210.7%22%20fill=%22#fff%22/%3E%3Cpath%20stroke-linejoin=%22round%22%20stroke=%22#000%22%20stroke-linecap=%22round%22%20d=%22M21.23%201.35L15.83.08l-2%207.28%22/%3E%3Ccircle%20stroke=%22#000%22%20cx=%2223.13%22%20r=%222.13%22%20cy=%222.13%22%20fill=%22#fff%22/%3E%3Cellipse%20cy=%2214.99%22%20rx=%2212.24%22%20ry=%227.99%22%20stroke=%22#000%22%20cx=%2213.24%22%20fill=%22#fff%22/%3E%3Cg%20transform=%22translate(8%2012)%22%3E%3Ccircle%20stroke=%22#FF4500%22%20cx=%221%22%20r=%221.43%22%20cy=%221.43%22%20fill=%22#FF4500%22/%3E%3Ccircle%20stroke=%22#FF4500%22%20cx=%2210%22%20r=%221.43%22%20cy=%221.43%22%20fill=%22#FF4500%22/%3E%3Cpath%20stroke=%22#000%22%20d=%22M1.5%206.23C2.58%207.3%204.3%207.5%205.73%207.5m4.24-1.27C8.9%207.3%207.17%207.5%205.77%207.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E
// @match          *://*.reddit.com/r/*/comments/*
// @grant          none
// @run-at         document-end
// @require        https://unpkg.com/jquery@3/dist/jquery.min.js
// @require        https://greasyfork.org/scripts/7602-mutation-observer/code/mutation-observer.js
// ==/UserScript==

/* jshint asi: true, es6: true, laxbreak: true */
/* global jQuery, MutationSummary */

/*
==== 1.9.5 (2018.07.11) ====
* Updated jQuery to v3 and source from unpkg.com
* Add downloadURL to update from Gist
==== 1.9.4 (2018.02.11) ====
* Added @icon field in metadata as SVG wasn't displaying on the installed userscript page
==== 1.9.3 (2017.12.03) ====
* Changed base-64 encoded PNG icons to an SVG icon
==== 1.9.2 (2017.10.11) ====
* Gets correct comment ID for links
* Changed location in comment HTML to use as its root
* Get children of first comment when it is already on the page
==== 1.9.1 (2017.10.11) ====
* Fix broken $target selector
==== 1.9.0 ====
* Catch failed loads, log them to the console and then restore original load link
*/

; (function userScript($) {
  'use strict'

  const NORMAL = 'font-weight: normal; text-decoration: none; color: black'
  const ERROR = 'font-weight: bold; color: #f4f'
  const LINK = [ 'color: #05f; text-decoration: underline', NORMAL ]
  const BOLD = [ 'font-weight: bold', NORMAL ]
  const BLUE = [ 'color: #05f', NORMAL ]
  const RED = [ 'color: #e32636', NORMAL ]

  const EXPAND_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADZklEQVR42tVXv08TURyvIdbYjg0DCQuaLjA4Y5rQ61lo0jASHIQFEnUQ/BGDkqJiAj00YkuPa0Fw4S8gYYDgxEYTdHaDgAMDDQUGBunz+7m79t6112srFPEln6Tpfd/3+3nfX+/7HI7/bQmCcDsQCNwnjIqBwEcAv/EfvtXFaCgUahQFYSwgCD/bu/tZa7/EWh4vseahZRUtj5bU//ANMpAN+XyNF2H4BpR1dIZPvINJ5n6/wxzTjDk+F2FaxyfG3OM7zDuQZNijEiEdf2VcFMVb5NYfbX2TzBnNaIZiOuIWiJkJOSczDHuhA7pqjfMdQQztNz1fMwzDyIyOhAXy33gy5JGmZ2vML3btQ2fVJxdog+d12jCeNyprcE3tMc/YpgkuaddMJmZ4wzOSVklU9ERPT4+Tkuh74eRxzvgsQQFy7OHwS/Ztfd2E4RcjrGHmVCOZ4LzBeQK6YaP86SlpEDeTcZkznmTsWirHJElixUuWZXY9ntXkZvV9M+ZwtD2YYLBhnfFUNshcp5Qx3J43ToYdKcIcEZi3IZDIanJJfR8fDj0xO+6FTyxLFMxQaoXTJ4qMzxO+EIEFGwJyVpNLMcMTCXMovAOKtRfQQNQ650+vmI07FonAog0BJavJzXEkZLMX3O921GZV0l7bu/ssTp+jmJ+R2wkLhK/A7/IEkoeaHOSxTzkjPbkSL8CWqSLQx9FK+dO7Puyp2T5FxoqxsrJSQgCVYCULHS5pz0SgtS8KAr08gVH0dp6A502arZPS8y7o8IyljTAQAdwdsGkkIN1ozcPLZgJv60SA8qD5yTKDzatD4J+HwDIJp3bV9ionEiWwIraxsWEpO0Q6XNFd+yRESViVYYN8St3tiBoMQSGkgMOyZXgz/kuTgzz2xY+0+6FSGV5uI9oubUR6K454B5XLasURy8vI3xk+VqefOl5G/mD42FduXtSu44l6X8eRKgaS1YoDCSqBR8WB5Olq5YEEKxgMtmB88rzatB/JqE8UQHVuP5JtqiMZdNcwlHbtFzxxrqF0tbahlO8NFK8t5IQzelDdWB7jx/KDfMy3qj65VU4gaZC5KFH3+Lb9wwR1TjIoNezB3ooxr2ahbKAMDeQudTG00uKnWRv9h2/60yziu4inWdnQUB8vfpyKfn9vzS+gq7D+AAlDQCI1XwNKAAAAAElFTkSuQmCC'
  
  // --------------------------------------------------------------------

  const units = (v, s) => `${v}${s}`
  
  const pluralise = (w, n) => w + (n !== 1 ? 's' : '')
  
  const capitalise = s => typeof s === 'string' && s && s.split(/\s+/g).map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
  
  function* flatten (arr) {
    for (let x of arr) {
      if (Array.isArray(x)) {
        yield* (flatten(x))
      }
      else {
        yield x
      }
    }
  }

  // --------------------------------------------------------------------
  
  $.fn.extend({
    spinner (options) {
      options = Object.assign({}, $.fn.spinner.defaults, options)

      const $spinner = $('<div class="pulsar-horizontal"></div>')
        .css({
          padding: units(options.size * 0.25, 'px'),
          height: units(options.size, 'px')
        })

      const total_duration = (options.steps + 1) * options.step_duration

      for (let i = 0; i < options.steps; i++) {
        const delay = i * options.step_duration

        $('<div></div>')
          .css({
            width: units(options.size, 'px'),
            height: units(options.size, 'px'),
            backgroundColor: options.colour,
            animationDuration: units(total_duration, 's'),
            animationDelay: units(delay, 's')
          })
          .appendTo($spinner)
      }

      if (options.replace) {
        this.empty()
      }

      return options.mode === 'prepend'
        ? this.prepend($spinner) 
        : this.append($spinner)
    },
    
    log (name, ...extras) {
      const title = [ `%c${name || '$'}%c : %c${this.length}%c ${pluralise('item', this.length)}`, ...BOLD, ...BLUE ]
      
      if (this.length > 0 || extras.length > 0) {
        console.group.apply(console, title)

        if (this.length > 0) {
          console.info(this)
        }
        extras.forEach(extra => {
          console.log(extra)
        })

        console.groupEnd()
      }
      else {
        console.info.apply(console, title)
      }
      
      return this
    }
  })

  $.fn.spinner.defaults = {
    replace: true,
    mode: 'append',
    steps: 3,
    size: 24,
    colour: '#28f',
    step_duration: 0.25
  }

  // --------------------------------------------------------------------

  async function getCommentPage (id) {
    const url = postUrl + id

    const data = await $.get(url)

    const $listing = $('.nestedlisting', data)

    console.groupCollapsed(`getCommentPage(%c${id}%c, %c${url}%c)`, ...RED, ...LINK)
    // console.log(data)
    console.log($listing.get(0).outerHTML)
    console.groupEnd()

    return $listing
  }

  // --------------------------------------------------------------------

  function addComments($target, $comments) {
    $target
      .empty()
      .append($comments)
      .find('.usertext.border .usertext-body')
        .css('animation', 'fadenewpost 4s ease-out 4s both')
  }

  // --------------------------------------------------------------------

  function loadComments ($span, $target, ids) {
    let insertChildren = false

    if (!Array.isArray(ids)) {
      ids = [ ids ]
      insertChildren = true
    }

    const urls = ids.map(id => postUrl + id)

    /*
    console.group(`%cloadComments%c(${ids.length} ${ids.length > 1 ? 'ids' : 'id'}: ${ids.join(', ')})`, ...BOLD)
    console.info($span[0].outerHTML)
    console.log(`%c${urls.join('\n')}%c`, ...LINK)
    console.groupEnd()
    */
    
    const original = $span.parent().html()

    $span.spinner({
      colour: '#28f',
      size: 24,
      step_duration: 0.25,
      replace: true
    })

    const pageRequests = urls.map(url => {
      return $.get(url)
        .then(
          // data => $('.nestedlisting > .thing', data).next().andSelf().get(),
          data => $('.nestedlisting', data).get(),
          (xhr, textStatus, errorThrown) => {
            console.warn(`%c${capitalise(textStatus)}: ${xhr.status} ${xhr.statusText}%c %c${url}%c`, ERROR, NORMAL, LINK, NORMAL)
          }
        )
    })

    $.when(...pageRequests)
      .then((...children) => {
        let $children = $([...flatten(children)])
        // $children.log('$children')

        if (insertChildren) {
          $children = $children.find('> .thing > .child > .sitetable')

          $children
            .find('> .entry > .usertext.border')
            .removeClass('border')
        }

        $target
          .empty()
          .append($children)
          .find('.usertext.border .usertext-body')
            .css('animation', 'fadenewpost 4s ease-out 4s both')
      })
      .fail((xhr, textStatus, errorThrown) => {
        $span.parent().html(original)
      })
  }

  // --------------------------------------------------------------------

  function getCommentId (linkElem) {
    const m = linkElem.pathname.match(/\/([a-z0-9]+)\/?$/)
    if (!m) {
      throw new Error(`No comment ID parsed from link URL "${linkElem.href}"`)
    }
    return m[1]
  }

  // --------------------------------------------------------------------

  function processDeepThreadSpans (deepThreadSpans) {
    const $deepThreadSpans = $(deepThreadSpans)
      .filter(':not([data-comment-ids])')

    // console.info(`processDeepThreadSpans: processing ${$deepThreadSpans.length}/${deepThreadSpans.length} deep thread spans`)

    $deepThreadSpans.each(function() {
      const $span = $(this),
            $target = $span.closest('.child'),
            $a = $span.children('a'),
            cid = getCommentId($a[0])

      // $span.log('$span')
      // $target.log('$target')

      $span
        .attr('data-comment-ids', cid)
        .addClass('expand-inline')

      async function load () {
        $span.spinner()

        const $listing = await getCommentPage(cid)
        const $children = $listing.find('> .thing > .child > .sitetable')

        addComments($target, $children)
      }

      $a.one('click', event => {
        load()

        return false
      })
    })
  }

  // --------------------------------------------------------------------
  
  function processMoreCommentsSpans(moreCommentsSpans) {
    const $moreCommentsSpans = $(moreCommentsSpans)
      .filter(':not([data-comment-ids])')
    
    // console.info(`processMoreCommentsSpans: processing ${$moreCommentsSpans.length}/${moreCommentsSpans.length} more comment spans`)
    
    $moreCommentsSpans.each(function() {
      const $span = $(this),
            $target = $span.closest('.child'),
            $a = $span.children('a'),
            onclick = $a.attr('onclick'),
            cids = onclick.split(', ')[3].slice(1, -1).split(',')
      
      $span
        .attr('data-comment-ids', cids.join(','))
        .addClass('expand-inline')

      async function load () {
        $span.spinner()

        const $listings = $(await Promise.all(cids.map(getCommentPage)))

        addComments($target, $listings)
      }

      $a
        .removeAttr('onclick')
        .attr('data-onclick', onclick)
        .one('click', event => {
          // loadComments($span, $target, ...cids)
          load()

          return false
        })
    })
  }

  function processMoreCommentsSpans2 (moreCommentsSpans) {
    $(moreCommentsSpans).addClass('expand-inline')
  }

  // --------------------------------------------------------------------
  
  const rootUrl = `https://${location.hostname}/`
  const postUrl = $('.thing.link > .entry a.comments').prop('href')
  
  // console.info(`%cSite:%c %c${rootUrl}%c\n%cPost:%c %c${postUrl}%c`, ...BOLD, ...LINK, ...BOLD, ...LINK)

  // --------------------------------------------------------------------

  const observer = new MutationSummary({
    callback(summaries) {
      const deepThreadSpans = summaries.shift().added,
            moreCommentsSpans = summaries.shift().added

      // console.log(`Added ${deepThreadSpans.length} deep thread spans and ${moreCommentsSpans.length} more comment spans`)

      processDeepThreadSpans(deepThreadSpans)
      processMoreCommentsSpans2(moreCommentsSpans)
    },
    rootNode: document.body,
    queries: [
      { element: 'span.deepthread' },
      { element: 'span.morecomments' }
    ]
  })

  // To process spans in the HTML source
  processDeepThreadSpans($('span.deepthread'))
  processMoreCommentsSpans2($('span.morecomments'))

  // --------------------------------------------------------------------
  
  $(document.body).append(`<style type="text/css">
    .expand-inline {
      display: block;
      padding: 0;
    }
    .expand-inline:after {
      display: none !important;
    }
    .expand-inline a {
      display: block;
      background: transparent url(${EXPAND_ICON}) no-repeat center left;
      padding-left: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 1.4rem !important;
      font-weight: normal !important;
      vertical-align: middle;
      text-align: left;
    }
    .expand-inline a:hover {
      background-color: rgba(0, 105, 255, 0.05);
      text-decoration: none;
    }
    .pulsar-horizontal {
      display: inline-block;
    }
    .pulsar-horizontal > div {
      display: inline-block;
      border-radius: 100%;
      animation-name: pulsing;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }
    @keyframes pulsing {
      0%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      50% {
        transform: scale(1);
        opacity: 1;
      }
    }
    @keyframes fadenewpost {
      0% {
        background-color: #ffc;
        padding-left: 5px;
      }
      100% {
        background-color: transparent;
        padding-left: 0;
      }
    }
  </style>`)

})(jQuery)

jQuery.noConflict(true)
