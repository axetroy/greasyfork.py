// ==UserScript==
// @name         知乎回答按赞同数排序
// @namespace    zhihu.com
// @version      0.2
// @description  four score and seven years ago...
// @author       何从
// @match        https://www.zhihu.com/question/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // bindMyEvent()
  // window.addEventListener('popstate', bindMyEvent)

  var binded = false
  var loop = setInterval(bindMyEvent, 1000)

  function bindMyEvent() {
    if (binded) {
      clearInterval(loop)
      return
    }
    var e = document.querySelectorAll('div.List-headerOptions div.Popover')[0]
    if (e === undefined) { return }
    binded = true
    e.addEventListener('click', function () {
      setTimeout(function () {
        var sorts = document.querySelector('div.Select-list.Answers-select')
        var butt = document.createElement('button')
        butt.className = 'Select-option'
        butt.innerText = '按赞同排序'
        butt.addEventListener('click', sortByLikes)
        sorts.appendChild(butt)

        function sortByLikes() {
          var answers = document.querySelectorAll('div.List-item')
          if (answers.length === 0) {
            return
          }
          var parent = answers[0].parentElement
          var likes = []
          for (var i = 0; i < answers.length; i++) {
            var temp = answers[i].getElementsByClassName('Voters')[0]
            var n = temp ? temp.innerText : '0'
            n = parseInt(n.split(' ')[0])
            likes.push([n, i])
          }
          likes = likes.sort(descendByFirst)
          for (i = 0; i < likes.length; i++) {
            parent.appendChild(answers[likes[i][1]])
          }
        }

        function descendByFirst(x, y) {
          return y[0] - x[0]
        }
      }, 0)
    })
  }
})()
