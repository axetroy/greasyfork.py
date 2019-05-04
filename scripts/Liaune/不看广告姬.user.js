// ==UserScript==
// @name         不看广告姬
// @namespace    https://github.com/bangumi/scripts/liaune
// @description   屏蔽无头像用户发表的主题
// @version      1.2
// @author       Liaune
// @include     /^https?://(bgm\.tv|chii\.in|bangumi\.tv)\/.*
// ==/UserScript==

(function() {
    $('.avatarNeue').each(function (index,el){
        if(this.style.backgroundImage.match(/user\/s\/icon/))
            $(this.parentNode.parentNode).hide();
    })
})();