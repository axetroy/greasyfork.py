// ==UserScript==
// @name        RARBG - magnet links, human dates, cell rarity classification
// @namespace   br.xaxim
// @version     2019.2.12.23.51
// @description Adds a column with magnet links, colors cells to classify them, convert absolute datetimes to relative datetimes
// @author      darkred
// @contributor sxe
// @contributor xaxim
// @license     MIT
// @include     /^(https?:)?\/\/(www\.)?(rarbg(\.(bypassed|unblockall|unblocked))?|rarbgaccess|rarbgget|rarbgmirror|rarbgproxy|rarbgproxied|rarbgprx|rarbgs|rarbgto|rarbgunblock|proxyrarbg|unblocktorrent)\.(to|com|org|is|xyz|lol|vc|link)\/(rarbg-proxy-unblock\/)?(torrents\.php.*|catalog\/.*|top10)$/
// @grant       none
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.6/moment-timezone-with-data-2010-2020.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.6/jstz.min.js
// ==/UserScript==

/* global jstz, moment */

// Customize the strings in the locale to display "1 minute ago" instead of "a minute ago" (https://github.com/moment/moment/issues/3764#issuecomment-279928245)
moment.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past:   '%s ago',
        s:  'seconds',
        m:  '1 minute',
        mm: '%d minutes',
        h:  '1 hour',
        hh: '%d hours',
        d:  '1 day',
        dd: '%d days',
        M:  '1 month',
        MM: '%d months',
        y:  '1 year',
        yy: '%d years'
    }
});

function convertToLocalTimezone(timestamps) {
    const localTimezone = jstz.determine().name();
    const serverTimezone = 'Europe/Berlin';		// GMT+1
    for (let i = 0; i < timestamps.length; i++) {
        const initialTimestamp = timestamps[i].textContent;
        if (moment(initialTimestamp, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {		// As of moment.js v2.3.0, you may specify a boolean for the last argument to make Moment use strict parsing. Strict parsing requires that the format and input match exactly, including delimeters.
            const convertedToLocalTimezone = moment.tz(initialTimestamp, serverTimezone).tz(localTimezone);
            timestamps[i].textContent = convertedToLocalTimezone.fromNow();
            const format = 'YYYY-MM-DD HH:mm:ss';
            timestamps[i].title = convertedToLocalTimezone.format(format);
            const diffInDays = moment().diff(convertedToLocalTimezone, 'days');
            timestamps[i].setAttribute("style", getColorByRarity(getRarityByDateDiff(diffInDays)));
        }
    }

    // recalculate the relative times every 10 sec
    (function(){
        for (let i = 0; i < timestamps.length; i++) {
            timestamps[i].textContent = moment(timestamps[i].title).fromNow();
        }
        setTimeout(arguments.callee, 1 * 60 * 1000);
    })();

}

function getRarityByDateDiff(diffInDays) {
    if(diffInDays < 1) {
        return 'Legendary';
    }
    if(diffInDays < 7) {
        return 'Epic';
    }
    if(diffInDays < 30) {
        return 'Rare';
    }
    if(diffInDays < 90) {
        return 'Uncommon';
    }
    return 'Common';
}

function appendColumn(title) {

    var entries = document.querySelectorAll('.lista2t > tbody > tr > td:nth-child(2) '); // the initial column 'Files' after of which the extra column will be appended

    for (let i = 0; i < entries.length; i++) { // creation of the extra column
        entries[i].insertAdjacentHTML('afterend', `<td>` + title + `</td>`);
    }

    var header = document.querySelector('.lista2t > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3)'); // the first cell (the header cell) of the new column
    header.innerHTML = title;
    header.setAttribute('class', 'header6');
    header.setAttribute('align', 'center');

    var cells = document.querySelectorAll('.lista2t > tbody > tr[class="lista2"] > td:nth-child(3)'); // the rest cells of the new column
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('class', 'lista');
        cells[i].setAttribute('width', '60px');
        cells[i].setAttribute('align', 'center');
    }

    var newColumn = document.querySelectorAll('.lista2t > tbody > tr[class="lista2"] > td:nth-child(3)'); // new column
    var oldColumn = document.querySelectorAll('.lista2t > tbody > tr[class="lista2"] > td:nth-child(2)'); // old column

    var sizes = document.querySelectorAll('.lista2t > tbody > tr[class="lista2"] > td:nth-child(5)'); // the column 'Size'
    var maxFileSize = -1
    for (let i = 0; i < sizes.length; i++) {
        var fileSize = getFileSize(sizes[i].innerText);
        if (maxFileSize == -1) {
            maxFileSize = fileSize;
        } else if (fileSize > maxFileSize) {
            maxFileSize = fileSize;
        }
    }

    var seeds = document.querySelectorAll('.lista2t > tbody > tr[class="lista2"] > td:nth-child(6)'); // the column 'Seeds'
    var maxSeeds = -1;
    for (let i = 0; i < seeds.length; i++) {
        var seedAmount = Number(seeds[i].innerText);
        if (maxSeeds == -1) {
            maxSeeds = seedAmount;
        } else if (seedAmount > maxSeeds) {
            maxSeeds = seedAmount;
        }
    }


    for (let i = 0; i < newColumn.length; i++) {

        let href = oldColumn[i].firstChild.href;

        newColumn[i].innerHTML = '<a class="xhrMagnetLink" data-href="' + href + '" href="#"><img src="https://dyncdn.me/static/20/img/magnet.gif""></>';
        newColumn[i].lastChild.title = 'ML via XHR';

        const seedPercentageComparedToMax = Math.round((Number(seeds[i].innerText) / maxSeeds) * 100);
        seeds[i].innerHTML = `${seeds[i].textContent} (${seedPercentageComparedToMax}%)`;
        seeds[i].setAttribute("style",getCellColorsStyle(seedPercentageComparedToMax));

        const fileSizePercentageComparedToMax = Math.round((getFileSize(sizes[i].innerText) / maxFileSize) * 100);
        sizes[i].innerHTML = `${sizes[i].textContent} (${fileSizePercentageComparedToMax}%)`;
        sizes[i].setAttribute("style",getCellColorsStyle(fileSizePercentageComparedToMax));

        if (fileSizePercentageComparedToMax == 100) {
            newColumn[i].innerHTML += `<br />Largest file`;
            newColumn[i].setAttribute("style", getColorByRarity('Rare'));
        }
        if (seedPercentageComparedToMax == 100) {
            newColumn[i].innerHTML += `<br />Most seeds`;
            newColumn[i].setAttribute("style", getColorByRarity('Epic'));
        }
        if (seedPercentageComparedToMax == 100 && fileSizePercentageComparedToMax == 100) {
            newColumn[i].setAttribute("style", getColorByRarity('Legendary'));
        }
    }
}

function getCellColorsStyle(percentage) {
    if(percentage == 100) {
        return getColorByRarity('Legendary');
    }
    if(percentage >= 75) {
        return getColorByRarity('Epic');
    }
    if(percentage >= 50) {
        return getColorByRarity('Rare');
    }
    if(percentage >= 25) {
        return getColorByRarity('Uncommon');
    }
    return getColorByRarity('Common');
}

function getColorByRarity(rarity) {
    if(rarity === 'Legendary') {
        return "background-color: #ffc107;"; // material amber 500
    }
    if(rarity === 'Epic') {
        return "color: white; background-color: #9c27b0;"; // material purple 500
    }
    if(rarity === 'Rare') {
        return "color: white; background-color: #3f51b5;"; // material indigo 500
    }
    if(rarity === 'Uncommon') {
        return "background-color: #4caf50;"; // material green 500
    }
    if(rarity === 'Common') {
        return "color: #546e7a; background-color: #eeeeee;"
    }
    return "";
}

function getFileSize(text) {
    let fileSize = text.replace(" ", "");
    if (fileSize.indexOf("MB") != -1) {
        fileSize = fileSize.replace("MB", "");
        fileSize = Number(fileSize);
        fileSize *= 1000000;
    } else if (fileSize.indexOf("GB") != -1) {
        fileSize = fileSize.replace("GB", "");
        fileSize = Number(fileSize);
        fileSize *= 1000000000;
    } else {
        fileSize = 0;
    }
    return fileSize;
}

function addMouseoverListeners(links, type) {

    for (let i = 0; i < links.length; i++) {

        links[i].addEventListener('mouseover', function (event) {

            event.preventDefault();
            let href = this.getAttribute('href');
            if (href === '#') {
                let tLink = this.getAttribute('data-href');

                var xhr = new XMLHttpRequest();
                xhr.open('GET', tLink, true);	// XMLHttpRequest.open(method, url, async)
                xhr.onload = function () {

                    let container = document.implementation.createHTMLDocument().documentElement;
                    container.innerHTML = xhr.responseText;

                    let retrievedLink;
                    if (type === 'dl') {
                        retrievedLink = container.querySelector('a[href^="/download.php"]');		// the 'magnet link' element in the retrieved page
                    } else {
                        retrievedLink = container.querySelector('a[href^="magnet:"]');		// the 'magnet link' element in the retrieved page
                    }

                    if (retrievedLink) {
                        links[i].setAttribute('href', retrievedLink.href);
                    }

                };
                xhr.send();

            }

        }, false);

    }

}

const timestamps = document.querySelectorAll('td[width="150px"]');
convertToLocalTimezone(timestamps);
appendColumn('Magnet Link');
var xhrMagnetLinks = document.querySelectorAll('.xhrMagnetLink');
addMouseoverListeners(xhrMagnetLinks, 'ml');
