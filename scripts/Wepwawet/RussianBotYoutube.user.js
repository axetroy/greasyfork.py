// ==UserScript==
// @name         RussianBotYoutube
// @namespace    sc
// @include      https://www.youtube.com/watch?v=*
// @version      5
// @description  Let's make some delusions real
// @author Wepwawet
// @grant        none
// ==/UserScript==

function code()
{
    var subscribed_button = document.querySelector('html body ytd-app div#content.style-scope.ytd-app ytd-page-manager#page-manager.style-scope.ytd-app ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton div#columns.style-scope.ytd-watch-flexy div#primary.style-scope.ytd-watch-flexy div#primary-inner.style-scope.ytd-watch-flexy div#meta.style-scope.ytd-watch-flexy div#meta-contents.style-scope.ytd-watch-flexy ytd-video-secondary-info-renderer.style-scope.ytd-watch-flexy div#container.style-scope.ytd-video-secondary-info-renderer div#top-row.style-scope.ytd-video-secondary-info-renderer div#subscribe-button.style-scope.ytd-video-secondary-info-renderer ytd-subscribe-button-renderer.style-scope.ytd-video-secondary-info-renderer paper-button.style-scope.ytd-subscribe-button-renderer yt-formatted-string.style-scope.ytd-subscribe-button-renderer');

  if(!subscribed_button)
  {
    console.log("No subscribed button found");
    return;
  }
  
    if (subscribed_button.textContent.startsWith('Subscribed')) {
        console.log("subscribed");
    } else {
        console.log("not subbed");
        return;
    }


    var selected_button = document.querySelector('ytd-toggle-button-renderer.ytd-menu-renderer:nth-child(1)');
  if(!selected_button) return;
    var check_state = document.querySelector('yt-icon-button.style-default-active');
    if (!check_state) selected_button.click();
}

// runs when the page loads the first time
setTimeout(function() {
  code();
  $('body').on('transitionend', code);
  }, 10000)

window.addEventListener('yt-page-data-updated', function(e) {code();});
window.addEventListener("yt-navigate-start", function(e) {code();});
window.addEventListener("yt-navigate-finish", function(e) {code();});
window.addEventListener("spfdone", function(e) {code();});
window.addEventListener("spfclick", function(e) { code(); });
window.addEventListener("spfprocess", function(e) { code(); });