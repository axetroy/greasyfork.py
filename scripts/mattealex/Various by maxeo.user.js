// ==UserScript==
// @name        Various by maxeo
// @description Vari script
// @author Maxeo | maxeo.net
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @include     http://www.lolnexus.com/EUW/search?name=*
// @include     http://192.168.1.1/
// @version     1.1.3
// @icon        https://www.maxeo.net/imgs/icon/android-chrome-192x192.png
// @grant       none
// @namespace https://greasyfork.org/users/88678
// ==/UserScript==
function createScript(scriptname) {
  var script = document.createElement('script');
  script.src = scriptName(scriptname);
  script.type = 'text/javascript';
  document.getElementsByTagName('head') [0].appendChild(script);
}
function scriptName(name) {
  switch (name) {
    case 'jquery':
      return 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js';
      break;
    case 'jquery-cookie':
      return 'https://greasyfork.org/scripts/26454-jquery-cookie/code/jQuery%20Cookie.js?version=169689';
      break;
    default:
      return name;
  }
}
////

if (window.location.hostname == '192.168.1.1') {
  var MaxeoLoginBtn = document.getElementById('loginBtn')
  if (MaxeoLoginBtn != null) {
    document.getElementById('userName').value = 'admin'
    setTimeout(function () {
      MaxeoLoginBtn.click();
    }, 500);
  }
}
//scroll per lolnexus

if (window.location.hostname == 'www.lolnexus.com') {
  createScript('jquery');
  createScript('jquery-cookie');
  $(document).ready(function () {
    var scrolled = false;
    //Autoscroll
    setInterval(function () {
      if (scrolled == false && $('.team-1 table').length) {
        scrolled = true
        if ($('table th.runes').length == 2) {
          $('.cv-upsell').remove();
          $('table th.runes').eq(1).parent().remove()
          $('div.team-two').css('border-top', '14px solid #FFF');
        }
        $('html, body').animate({
          scrollTop: $('.team-1 table').offset().top + 'px'
        }, 3);
        $('.cc_banner-wrapper ').style('display', 'none')
      }
    }, 500);
  })
}
