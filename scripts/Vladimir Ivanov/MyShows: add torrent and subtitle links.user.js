// ==UserScript==
// @name         MyShows: add torrent and subtitle links
// @namespace    none
// @version      0.6
// @description  Add The Pirate Bay and Subscene sites for each TV series links into the download menu
// @author       vike
// @include      https://myshows.me/profile/
// @grant        none
// ==/UserScript==

$(function(){
    var showNameBlocks = $("h2[class^='showHeader fsHeader marginAntiTopHalfBase']");
    for (idx = 0; idx < showNameBlocks.size(); idx++) {
        var data = showNameBlocks.eq(idx);
        var idShow = data.attr('id').replace(/\D/g, '');
        var showName = data.find('span').eq(0).find('span').text() || data.find('span').eq(0).find('a').text();

        var showBlocks = $("div[data-show-id='" + idShow + "'] tr");
        for (ydx = 0; ydx < showBlocks.size(); ydx++) {
            var tds = showBlocks.eq(ydx).find('td');

            var sxe = tds.eq(0).text().split("x");
            var season = sxe[0].length < 2 ? "0" + sxe[0] : sxe[0];
            var episode = sxe[1].length < 2 ? "0" + sxe[1] : sxe[1];

            var searchStr = showName + ' S' + season + 'E' + episode;
            var searchEncStr = searchStr.replace(/ /g, '%20');

            var downBlock = tds.eq(5);
            var isNew = downBlock.find('div').length === 0;
            if (isNew) {
                downBlock.append('<div class="buttonPopup _download _compact"><ul></ul></div>');
            }

            var downList = downBlock.find('ul').eq(0);
            downList.prepend('<li><a rel="nofollow external" href="http://subscene.com/subtitles/release?q=' + searchEncStr + '" target="_blank">поиск субтитров на сайте subscene.com</a></li>');
            downList.prepend('<li><a rel="nofollow external" href="https://torrents.me/search/' + searchEncStr + '/" target="_blank">поиск видио на сайте torrents.me</a></li>');

            if (isNew) {
                downBlock.find('div').eq(0).on('click', function (e) {
                    e.stopPropagation();
                    $(this).toggleClass('_hover');
                });
            }
        }
    }
});
