// ==UserScript==
// @id             exhen32@live.com
// @name           ptp增加豆瓣评分
// @description    douban rating at passthepopcorn |ptp增加豆瓣评分
// @author         Exhen
// @connect        douban.com
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @require        http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require        https://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min.js
// @include        https://passthepopcorn.me
// @match          https://passthepopcorn.me/torrents.php*
// @version        20171230


// @namespace https://greasyfork.org/users/164956
// ==/UserScript==
$(document).ready(function () {
    var getDoc, getJSON, parseURL, postDoc;
    getDoc = function (url, meta, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': window.navigator.userAgent,
                'Content-type': null
            },
            onload: function (responseDetail) {
                var doc;
                doc = '';
                if (responseDetail.status == 200) {
                    doc = (new DOMParser).parseFromString(responseDetail.responseText, 'text/html');
                    if (doc == undefined) {
                        doc = document.implementation.createHTMLDocument('');
                        doc.querySelector('html').innerHTML = responseText;
                    }
                }
                callback(doc, responseDetail, meta);
            }
        });
    };
    postDoc = function (url, data, meta, callback) {
        GM_xmlhttpRequest({
            anonymous: true,
            method: 'POST',
            url: url,
            headers: {
                'User-agent': window.navigator.userAgent,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: data,
            onload: function (responseDetail) {
                callback(responseDetail.responseText, responseDetail, meta);
            }
        });
    };
    getJSON = function (url, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json'
            },
            onload: function (response) {
                if (response.status >= 200 && response.status < 400) {
                    callback(JSON.parse(response.responseText), url);
                } else {
                    console.log('Error getting ' + url + ': ' + response.statusText);
                }
            }
        });
    };
    parseURL = function (url) {
        var a;
        a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var i, len, ret, s, seg;
                ret = {};
                seg = a.search.replace(/^\?/, '').split('&');
                len = seg.length;
                i = 0;
                s = void 0;
                while (i < len) {
                    if (!seg[i]) {
                        i++;
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                    i++;
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    };



    $('.basic-movie-list__movie__ratings-and-tags').each(function () {
        var imdb;
        var tags=$(this);
        imdb = tags.children().find('.basic-movie-list__movie__rating__title a').first().attr('href').slice(26, -1);
        console.log(imdb);
        var douban_rating, douban_url;
        getJSON("http://api.douban.com/v2/movie/search?q=" + imdb, function (temp, url) {
            douban_rating = temp.subjects[0].rating.average;
            console.log("rating111", douban_rating);
            douban_url = temp.subjects[0].alt;
            tags.prepend($('.basic-movie-list__movie__rating-container').first().clone());
            var douban = tags.find('.basic-movie-list__movie__rating-container').first();
            console.log("url", douban_url);
            douban.find('.basic-movie-list__movie__rating__title a').attr("href", douban_url);
            douban.find('.basic-movie-list__movie__rating__title a').text("豆瓣");
            console.log("rating", douban_rating);
            douban.find('.basic-movie-list__movie__rating__rating').text(douban_rating);
        });

    });

});