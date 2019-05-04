// ==UserScript==
// @name         anime1.me收藏番剧
// @namespace    http://tampermonkey.net/
// @version      0.3
// @license      MPL-2.0
// @description  添加番剧收藏功, 快速跳转到收藏的番剧.
// @author       c4r
// @match        *://anime1.me/*
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function () {
    'use strict';

    /**
     * titel :.... url :.....\r\n
     */

    /**
     * 
     */
    function getPlaylist() {
        let strPlaylist = localStorage.getItem('anime1Playlist')

        if (strPlaylist === undefined || strPlaylist === null) {
            strPlaylist = ''
        } else {

        }

        let arryPlaylist = new Array()

        let slotList = strPlaylist.split('\r\n').slice(0, -1)

        slotList.forEach(item => {
            let titlePos = item.indexOf("title :")
            let urlPos = item.indexOf('url :')
            if (titlePos < 0 || urlPos < 0) {

            } else {
                let title = item.slice(7, urlPos - 1)
                let url = item.slice(urlPos + 5)

                arryPlaylist.push({ 'title': title, 'url': url })


            }
        })


        return arryPlaylist
    }

    function delSub(title, url) {
        let strPlaylist = localStorage.getItem('anime1Playlist')
        let str = 'title :' + title + ' url :' + url + '\r\n'

        // console.log(strPlaylist)
        // console.log('---')
        // console.log(str)
        // console.log('include : ', strPlaylist.includes(str))

        if (strPlaylist.includes(str)) {
            strPlaylist = strPlaylist.replace(str, '')
            console.log(strPlaylist)
            localStorage.setItem('anime1Playlist', strPlaylist)
        }


    }


    function addPlaylist(title, url) {
        let strPlaylist = localStorage.getItem('anime1Playlist')
        if (strPlaylist === undefined || strPlaylist === null) {
            strPlaylist = ''
        } else {

        }

        if (strPlaylist.includes('title :' + title + ' url :' + url)) {
            alert('已经收藏')
        } else {

            strPlaylist = strPlaylist + 'title :' + title + ' url :' + url + '\r\n'

            localStorage.setItem('anime1Playlist', strPlaylist)


            // location.reload()
            $('#subscribe > ul').append('<li style="display: flex;">\
                <a unsubscribed url="'+
                url + '" name="' + title + '" title="退订">[x] </a>\
                <a href='+
                url + '> ' + title + '</a>\
                </li>')
            alert('收藏成功')
        }

    }

    function showPlaylist() {
        $('<section id="subscribe" class="widget widget_recent_entries"><h3 class="widget-title">收藏列表</h3><ul></ul></section>').insertBefore(
            $('#recent-posts-6')
        )

        let arrayPlaylist = getPlaylist()

        arrayPlaylist.forEach(item => {
            $('#subscribe > ul').append('<li style="display: flex;">\
            <a unsubscribed url="'+
                item.url + '" name="' + item.title + '" title="取消收藏">[x] </a>\
            <a href='+
                item.url + '> ' + item.title + '</a>\
            </li>')
        })
    }

    $(document).ready(function () {

        if ($('footer span.cat-links').length > 0) {

            // 添加订阅按钮
            $('#primary-menu').append('\
            <li class="menu-item menu-item-type-post_type"> \
                <a  id="menu-subscribe"> 收藏</a></li>')
            $("#menu-subscribe").on("click", () => {
                let title = $('footer span.cat-links:eq(0) > a').text()

                let url = $('footer span.cat-links:eq(0) > a').attr('href')

                // console.log(title, url)
                addPlaylist(title, url)

            });

        }

        showPlaylist()

        $(document).on('click', 'a[unsubscribed]', (event) => {
            // 

            // console.log(event.target)
            let title = $(event.target).attr('name')
            let url = $(event.target).attr('url')

            // console.log('删除 : ', title , url)

            delSub(title, url)
            // location.reload()
            $(event.target).closest('li').remove()
        })

    })


})();