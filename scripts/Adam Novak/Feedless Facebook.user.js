// ==UserScript==
// @name       Feedless Facebook
// @author     Adam Novak
// @version    1.3
// @description Remove the news feed from Facebook to prevent distraction
// @include    /https?:\/\/www.facebook.com\/*/
// @noframes
// @run-at     document-end
// @grant      none
// @namespace https://greasyfork.org/users/22981
// ==/UserScript==

// (C) 2018 Adam Novak
// MIT license
// Inspired by the Chrome extension "Feedless Facebook":
// https://github.com/owocki/feedlessfacebook

let hackPage = function() {
  let facebook = document.getElementById('facebook')
  if (facebook !== null) {
    // This is a real main Facebook page

    // Find the newsfeed
    let newsfeed = facebook.querySelector('#stream_pagelet')

    // Find the composer
    let composer = facebook.querySelector('#pagelet_composer')

    if (newsfeed && composer && newsfeed.parentElement != composer.parentElement) {
      // This is a real main page that we haven't hacked yet

      // Promote the composer above the news feed
      newsfeed.parentElement.appendChild(composer)

      // Create a way to show and re-hide the news feed
      let button = document.createElement('button')
      newsfeed.parentElement.appendChild(button)

      // Define a way to show and hide the news feed
      var feedShown = true
      let toggleFeed = function() {
        if (feedShown) {
          // Hide
          newsfeed.style.display='none'
          button.innerText = '[+] Show Newsfeed'
          feedShown = false
        } else {
          // Show
          newsfeed.style.display='block'
          button.innerText = '[-] Hide Newsfeed'
          feedShown = true
        }
      }

      // Toggle the feed when the button is clicked
      button.addEventListener('click', toggleFeed)


      // Make the actual newsfeed last
      newsfeed.parentElement.appendChild(newsfeed)


      // Actually hide the feed
      toggleFeed()

    }
  }
}

hackPage()

// Deal with Facebook just making more pages in the same page
setInterval(hackPage, 1000)


