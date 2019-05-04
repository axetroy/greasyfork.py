// ==UserScript==
// @name        Slicer Arrow Key Traversal
// @namespace   http://classcoder.com
// @description Traverse through Slicer using your arrow keys!
// @include     http://slicer.io/scenes/*
// @include     https://slicer.io/scenes/*
// @version     1.2
// ==/UserScript==

(function(){
  var back = document.querySelector('button[muid=".0.1.0.3.1.1.1.0.2.0"]')
  var next = document.querySelector('button[muid=".0.1.0.3.1.1.1.0.2.1"]')
  
  document.onkeydown = function(e) {
    if (e.code === 'ArrowLeft') {
      back.click()
    } else if (e.code === 'ArrowRight') {
      next.click()
    }
  }
})()