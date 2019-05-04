// ==UserScript==
// @name         Enlarge Pixiv images and remove sidebar
// @namespace    PixivCenterIsBetter
// @version      0.1
// @description  Removes the right side bar to center the image and change the max width of the image container
// @author       Samu
// @match        https://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  var css = `

    /*SideBar*/
    #root ._3mgRzAF ._2e0p8Qb {
      display: none;
    }

    /*SideBar presentation*/
    #root ._3NOStiW > div > div > [role='presentation'] {
      display: none;
    }

    /*content*/
    #root ._3mgRzAF .CAqyN6E {
      width: 1080px;
    }

  `;

  GM_addStyle(css);

})();