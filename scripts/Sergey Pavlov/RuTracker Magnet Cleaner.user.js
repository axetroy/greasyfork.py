// ==UserScript==
// @name              RuTracker Magnet Cleaner
// @version           1.2
// @description       Clears magnets, leaves only hashes (removes names etc.).
// @description:ru    Очищает magnet-ссылки раздач, оставляет только hash (удаляет имя и т.д.).
// @homepage          https://github.com/qiwichupa/userscripts/blob/master/RuTracker_Magnet_Cleaner
// @namespace         https://github.com/qiwichupa/userscripts/
// @author            qiwichupa
// @license           GNU General Public License v2.0 or later
// @match             *://rutracker.org/forum/viewtopic.php?t=*
// @run-at            document-end
// ==/UserScript==

window.addEventListener('load', function() {
$('a[href^="magnet:"]').each(function() {
    var $button = $(this);
    var href = $button.attr('href');
    if (href)
        $button.attr('href', href.replace(/&.*$/, ''));
});
});

