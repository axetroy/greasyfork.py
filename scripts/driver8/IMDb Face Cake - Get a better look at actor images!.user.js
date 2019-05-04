// ==UserScript==
// @name        IMDb Face Cake - Get a better look at actor images!
// @namespace   driver8.net
// @description Make people's faces larger when you hover over their names on IMDb movie pages
// @match       *://*.imdb.com/title/tt*/reference*
// @match       *://*.imdb.com/title/tt*/
// @match       *://*.imdb.com/title/tt*/?*
// @match       *://*.imdb.com/name/nm*
// @match       *://*.imdb.com/title/tt*/fullcredits*
// @match       *://*.imdb.com/title/tt*/combined*
// @version     0.4.5
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==

var MULT = 8;
var IMG_WIDTH = 23 * MULT;
var BORDER = 2;
var OFFSET = 2;
var IMDB_WIDTH = 640;
var IMDB_HEIGHT = 720;
var DO_THUMBS = true;
var AND_BUTTS = false;

AND_BUTTS && $('#tn15title > h1 > span:first').before($('<h1> and Butts </h1>').css({'display': 'inline'}));

var rowDivs = [];
var thumbDivs = [];
var curPopup;

var $rows = $('table.cast, table.cast_list').find('tr.odd, tr.even');
var $thumbs = $('.media_strip_thumb img, .mediastrip img, .mediastrip_big img, #primary-poster, .photo img, .poster img');

function setUpRows() {
    $rows.each(function(idx, $el) {
				console.log(idx, $el, $(this));
        makePopup(idx, $(this));
    });
}

function makePopup(idx, $el) {
    var $hsImg = $el.find('td.hs img, td.primary_photo img');
		if (! $hsImg.size() > 0) { return; }
    var thumbSrc = $hsImg.attr('src');
    if ($hsImg.hasClass('loadlate') && thumbSrc.match(/\/imdb\/images\/nopicture\//)) {
        thumbSrc = $hsImg.attr('loadlate');
    }
    thumbSrc = thumbSrc.replace(/(https?:\/\/(?:ia\.media-imdb\.com|.+?\.ssl-images-amazon\.com|.+?\.media-amazon\.com))\/images\/([a-zA-Z0-9@]\/[a-zA-Z0-9@]+)\._V[0-9].+\.jpg/,
        '$1/images/$2._UX' + IMG_WIDTH + '_.jpg');
    var $hovaImg = $('<img>').attr('src', thumbSrc);
    var $hovaDiv = $('<div>').attr('id', 'hova' + idx).addClass('hovaImg').append($hovaImg);

    $hovaDiv.hide();
    $('body').append($hovaDiv);
    rowDivs[idx] = { 'div': $hovaDiv, 'base': $el };

    $hovaImg.load(function() {
        adjustPos(rowDivs[idx], false);
    });
}

function setUpThumbs() {
    $thumbs.each(function(idx) {
        var $el = $(this);
        var thumbSrc = $el.attr('src');
        if ($el.hasClass('loadlate') && thumbSrc.match(/\/imdb\/images\/nopicture\//)) {
            thumbSrc = $el.attr('loadlate');
        }
        thumbSrc = thumbSrc.replace(/(https?:\/\/(?:ia\.media-imdb\.com|.+?\.ssl-images-amazon\.com|.+?\.media-amazon\.com))\/images\/([a-zA-Z0-9@]\/[a-zA-Z0-9@]+)\._V[0-9].+\.jpg/,
            '$1/images/$2._V1_SX' + IMDB_WIDTH + '_SY' + IMDB_HEIGHT + '_.jpg');
        //thumbSrc = thumbSrc.replace(/(http:\/\/(?:ia\.media-imdb\.com|.+?\.ssl-images-amazon\.com|.+?\.media-amazon\.com))\/images\/([a-zA-Z0-9@]\/[a-zA-Z0-9@]+)\._V[0-9].+\.jpg/,
        //    '$1/images/$2._V1_UY' + IMDB_HEIGHT + '_UX' + IMDB_WIDTH + '_.jpg');
        var $hovaImg = $('<img>').attr('src', thumbSrc);
        var $hovaDiv = $('<div>').attr('id', 'hovat' + idx).addClass('hovaThumb').append($hovaImg);

        $hovaDiv.hide();
        $('body').append($hovaDiv);
        thumbDivs[idx] = { 'div': $hovaDiv, 'base': $el };

        $hovaImg.load(function() {
            adjustPos(thumbDivs[idx], true);
        });
    });
}

function adjustPos(obj, big) {
    var win = $(window);
    var pos = obj.base.offset();

    // make sure pop-up is not larger than window
    if (big) {
        var both = obj.div.children().addBack();
        both.css('max-width', (win.width() - BORDER * 2) + 'px');
        both.css('max-height', (win.height() - BORDER * 2) + 'px');
    }

    // center pop-up
    if (big) {
        pos = { 'top': pos.top + obj.base.outerHeight() + OFFSET, 'left': pos.left + ((obj.base.outerWidth() - obj.div.outerWidth()) / 2) };
    } else {
        pos = {'top': pos.top + ((obj.base.outerHeight() - obj.div.outerHeight()) / 2), 'left': pos.left - obj.div.outerWidth() - OFFSET};
    }

    // check for pop-up extending outside window
    pos.top = Math.min(pos.top + obj.div.outerHeight(), win.scrollTop() + win.height()) - obj.div.outerHeight(); // bottom
    pos.left = Math.min(pos.left + obj.div.outerWidth(), win.scrollLeft() + win.width()) - obj.div.outerWidth(); // right
    pos.top = Math.max(pos.top, win.scrollTop()); // left
    pos.left = Math.max(pos.left, win.scrollLeft()); // top
    obj.div.offset(pos);
}

function setupHide(obj) {
    var base = obj.base,
        pos = base.offset(),
        right = pos.left + base.outerWidth(),
        bottom = pos.top + base.outerHeight();
    $('body').on('mousemove mouseover', null, function that(event) {
        var x = event.pageX,
            y = event.pageY;
        if (x < pos.left - 1 || x > right + 1 || y < pos.top - 1 || y > bottom + 1) {
            $('body').off('mousemove mouseover', null, that);
            base.removeClass('trHova');
            obj.div.hide();
        }
    });
}

$rows.each(function(idx) {
    var $el = $(this);
    $el.mouseenter(function() {
        $el.addClass('trHova');
        if (!rowDivs[idx]) {
            setUpRows();
        }
        curPopup && curPopup.div.hide()
        curPopup = rowDivs[idx];
        rowDivs[idx].div.show();
        adjustPos(rowDivs[idx], false);
        setupHide(rowDivs[idx]);
    });
});

DO_THUMBS && $thumbs.each(function(idx) {
    var $el = $(this);
    $el.mouseenter(function() {
        if (!thumbDivs[idx]) {
            setUpThumbs();
        }
        curPopup && curPopup.div.hide()
        curPopup = rowDivs[idx];
        thumbDivs[idx].div.show();
        adjustPos(thumbDivs[idx], true);
        setupHide(thumbDivs[idx]);
    });
});

var userStyles =
    ".hovaImg, .hovaThumb { " +
    "position: absolute;" +
    "padding: 0px;" +
    "border-style: solid;" +
    "border-width: " + BORDER + "px;" +
    "border-color: #AAAAFF;" +
    "z-index: 999999999;" +
    "}" +
    ".hovaImg img {" +
    "width: " + IMG_WIDTH + "px;" +
    "display: block;" +
    "}" +
    ".hovaThumb img {" +
    "   display: block;" +
    //"   width: 100%;" +
    //"   height: 100%;" +
    "}" +
    "tr.trHova {" +
    "background-color: #AAAAFF !important;" +
    "}" +
    "div#tn15content div.info div.info-content.block {" +
    //"width: 90% !important;" +
    "}" +
    "";

GM_addStyle(userStyles);