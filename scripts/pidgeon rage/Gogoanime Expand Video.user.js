// ==UserScript==
// @name         Gogoanime Expand Video
// @namespace    http://javalatte.xyz/
// @version      0.1.12
// @description  gogoanime Expand main div to make video bigger without  the need to be fullscreen
// @author       JavaLatte
// @include      /^https?:\/\/(w+.?\.)?gogoanime\.io\//
// @include      /^https?:\/\/(w+.?\.)?gogoanime\.tv\//
// @include      /^https?:\/\/(w+.?\.)?gogoanime\.in\//
// @include      /^https?:\/\/(w+.?\.)?gogoanime\.se\//
// @include      /^https?:\/\/(w+.?\.)?gogoanime\.sh\//
// @include      /^https?:\/\/(w+.?\.)?gogoanimes\.co\//
// @include      /^https?:\/\/(w+.?\.)?gogoanimes\.tv\//
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    var wStatus = '0';

   console.log('Gogoanime Expand Video');

    // style button
    addStyle (`
         #wButton {
              background: #ffc119;
              color: #FFFFFF;
              display: inline-block;
              line-height: 16px;
              height: 25px;
              padding-left: 10px;
              padding-right: 10px;
              border: unset;
              font-size: 12px;
          }
         #wButton:hover {
              cursor: pointer;
         }
         .wFull{
              width:100% !important;
         }
         .div-wide{
              width: 1280px !important;
         }
         @media screen and (max-width: 1366px) {
              .div-wide{
                  width: 1088px !important;
              }
         }
         @media only screen and (max-width: 1087px){
              .div-wide{
                  width: 100% !important;
              }
         }
      `);

    //init button
    var btn = document.createElement( 'button' );
        btn.setAttribute( 'id', 'wButton' );
        btn.innerHTML = '<i class="fa fa-expand"></i>&nbsp;&nbsp;&nbsp;Expand Video';

    var wDiv = document.createElement( 'div' );
        wDiv.setAttribute( 'id', 'wdiv' );
        wDiv.setAttribute( 'class', 'favorites_book' );
        wDiv.appendChild( btn );

    // make Button
    var eleDA = document.getElementsByClassName( 'download-anime' )[ 0 ];
    if(eleDA){
        eleDA.appendChild( wDiv );
        // activate the newly added button.
        document.getElementById ("wButton").addEventListener (
            "click", wButtonClickAction, false
        );
    }

    //function makewide
    function wButtonClickAction(){
        if(wStatus==0){
            document.getElementsByClassName('content_left')[0].classList.add ("wFull");
            document.getElementById('wrapper_inside').classList.add ("div-wide");
            document.getElementById('wrapper').classList.add ("div-wide");
            wStatus = 1;
        } else {
            document.getElementsByClassName('content_left')[0].classList.remove ("wFull");
            document.getElementById('wrapper_inside').classList.remove ("div-wide");
            document.getElementById('wrapper').classList.add ("div-wide");
            wStatus = 0;
        }
    }

    function addStyle(css) {
      var style = document.createElement('style');
      style.textContent = css;
      document.documentElement.appendChild(style);
      return style;
    };

})();