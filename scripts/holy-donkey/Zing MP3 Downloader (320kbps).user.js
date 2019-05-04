// ==UserScript==
// @name         Zing MP3 Downloader (320kbps)
// @namespace    https://holy-donkey.github.io/
// @description  Download nhạc nhất lượng cao 320kbps tại mp3.zing.vn
// @version      4.0.1
// @icon         http://i.imgur.com/PnF4UN2.png
// @author       The Holy Donkey (Thánh Lư Đại Nhân)
// @license      MIT
// @match        http://mp3.zing.vn/bai-hat/*.html*
// @match        http://mp3.zing.vn/album/*.html*
// @match        http://mp3.zing.vn/playlist/*.html*
// @match        http://mp3.zing.vn/nghe-si/*
// @match        http://mp3.zing.vn/tim-kiem/bai-hat.html?q=*
// @require      https://cdn.jsdelivr.net/jquery/2.2.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/filesaver.js/1.3.3/FileSaver.min.js
// @noframes
// @connect      self
// @connect      zdn.vn
// @supportURL   https://github.com/holy-donkey/UserScripts/issues
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_download
// ==/UserScript==

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\W+/g, ' ');
    str = str.replace(/\s/g, '-');
    return str;
}

function downloadSong(songId, progress, complete, error) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo?requestdata={"id":"' + songId + '"}',
        onload: function (data) {
            data = $.parseJSON(data.response);

            if (!data.song_id || !data.source[320]) {
                console.error(data);
                error();
                return;
            }

            var songSource = data.source[320],
                songName = bodauTiengViet(data.title + '_' + data.artist) + '.mp3';
            if (typeof GM_download !== 'undefined') {
                progress('');
                GM_download({
                    url: songSource,
                    name: songName,
                    saveAs: false,
                    onload: function () {
                        complete('GM_download', songName);
                    },
                    onerror: function (e) {
                        console.log(e);
                        error();
                    }
                });
            } else {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: songSource,
                    responseType: 'blob',
                    onload: function (source) {
                        complete(source.response, songName);
                    },
                    onprogress: function (e) {
                        if (e.total) {
                            progress(Math.floor(e.loaded * 100 / e.total) + '%');
                        } else {
                            progress('');
                        }
                    },
                    onerror: function (e) {
                        console.error(e);
                        error();
                    }
                });
            }
        },
        onerror: function (e) {
            console.error(e);
            error();
        }
    });
}

GM_addStyle('.bv-icon{background-image:url(http://static.mp3.zdn.vn/skins/zmp3-v4.1/images/icon.png)!important;background-repeat:no-repeat!important;background-position:-25px -2459px!important;}.bv-download{background-color:#721799!important;border-color:#721799!important;}.bv-download span{color:#fff!important;margin-left:8px!important;}.bv-disable,.bv-download:hover{background-color:#2c3e50!important;border-color:#2c3e50!important;}.bv-text{background-image:none!important;color:#fff!important;text-align:center!important;font-size:smaller!important;line-height:25px!important;}.bv-waiting{cursor:wait!important;background-color:#2980b9!important;border-color:#2980b9!important;}.bv-complete{background-color:#27ae60!important;border-color:#27ae60!important;}.bv-error{background-color:#c0392b!important;border-color:#c0392b!important;}.bv-disable{cursor:wait!important;opacity:0.4!important;}');

window.URL = window.URL || window.webkitURL;

if (location.pathname.indexOf('/bai-hat/') === 0) {

    var $btn = $('<a>', {
            'class': 'button-style-1 pull-left bv-download',
            href: '#download',
            html: '<i class="zicon icon-dl"></i>'
        }),
        $txt = $('<span>', {
            text: 'Tải nhạc 320kbps'
        }),
        disableClick;

    $('#tabService').replaceWith($btn.append($txt));

    $btn.on('click', function (e) {
        e.preventDefault();

        if (disableClick) return;
        disableClick = true;

        $btn.addClass('bv-waiting');
        $txt.text('Chờ một chút...');

        downloadSong($('#tabAdd').data('id'), function (percent) {
            $txt.text('Đang tải... ' + percent);
        }, function (blob, fileName) {

            if (blob !== 'GM_download') {
                $btn.attr({
                    href: window.URL.createObjectURL(blob),
                    download: fileName
                }).off('click');
                saveAs(blob, fileName);
            } else {
                disableClick = false;
            }

            $btn.removeClass('bv-waiting').addClass('bv-complete');
            $txt.text('Nhấn để tải nhạc');

        }, function () {
            $btn.removeClass('bv-waiting').addClass('bv-error');
            $txt.text('Lỗi! Không tải được');
        });
    });

} else {

    var disableClick = [];

    $('.fn-dlsong').replaceWith(function () {
        var songId = $(this).data('item').slice(5);
        disableClick[songId] = false;
        return '<a title="Tải nhạc 320kbps" class="bv-download bv-icon" href="#download" data-id="' + songId + '"></a>';
    });

    $('.bv-download').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            songId = $this.data('id');

        if (disableClick[songId]) return;
        disableClick[songId] = true;

        $this.addClass('bv-waiting bv-text').text('...');

        downloadSong(songId, function (percent) {
            if (percent !== '') {
                $this.text(percent);
            }
        }, function (blob, fileName) {

            if (blob !== 'GM_download') {
                $this.attr({
                    href: window.URL.createObjectURL(blob),
                    download: fileName
                }).off('click');
                saveAs(blob, fileName);
            } else {
                disableClick = false;
            }

            $this.removeClass('bv-waiting bv-text').addClass('bv-complete').text('');
        }, function () {
            $this.removeClass('bv-waiting bv-text').addClass('bv-error').text('');
        });
    });

}
