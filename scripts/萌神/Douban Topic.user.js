// ==UserScript==
// @name         Douban Topic
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       yetone
// @match        https://www.douban.com/gallery/topic/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const flyingId = 'yetone-flying'
    const flyingSelector = `#${flyingId}`
    const playingSelector = '.video-content'
    const videoSelector = '.video-js'
    const placeholderClass = 'yetone-placeholder'
    const placeholderSelector = `.${placeholderClass}`
    const topicCommentsClass = 'yetone-topic-comments'
    const topicCommentsSelector = `.${topicCommentsClass}`
    const topicCommentsPagerClass = 'yetone-topic-comments-pager'
    const topicCommentsPagerSelector = `.${topicCommentsPagerClass}`

    $('head').append(`<style>
${flyingSelector} {position: fixed; right: 8px; bottom: 8px;}
${flyingSelector} ${videoSelector} { width: 480px; height: 270px;}
${topicCommentsPagerSelector} .disabled,
${topicCommentsPagerSelector} .disabled:hover { color: #aaa; background: #fff; }
${topicCommentsSelector}, ${topicCommentsPagerSelector} { width: auto; padding-top: 0; font-size: 12px; margin-top: 10px; overflow: hidden; }
${topicCommentsSelector} .comment-item { *zoom:1; overflow: hidden; margin-top: 10px }
${topicCommentsSelector} .comment-item h3 { margin-bottom:1ex }
${topicCommentsSelector} .comment-item p { margin-bottom: 10px; word-wrap: break-word }
${topicCommentsSelector} .comment-item .pic { float:left;margin-right:-100em }
${topicCommentsSelector} .comment-item .pic img { width: 30px }
${topicCommentsSelector} .comment-item .content { margin-left: 40px; *zoom: 1 }
${topicCommentsSelector} .comment-item .title { font-size: 14px }
${topicCommentsSelector} .comment-item .text { word-wrap: break-word }
${topicCommentsSelector} .comment-item .author, .comment-item .author a { background: #efe; color: #666; padding: 2px 4px; margin-bottom: 1em }
${topicCommentsSelector} .comment-item .admin-lnks { float: right }
${topicCommentsSelector} .comment-item .admin-lnks a { color: #aaa }
${topicCommentsSelector} .comment-item .admin-lnks a:hover { color: #aaa; background: none }
</style>`);

    const fetchCmtItems = (statusUrl) => {
        return new Promise((resolve, reject) => {
            const xhr = $.get(statusUrl, x => {
                resolve([$(x).find('.comment-item'), xhr.responseURL])
            })
            })
    }

    const $doc = $(document)

    let $playing

    const main = () => {
        const fly = () => {
            if (!$playing) return
            const docTop = $doc.scrollTop()
            const winHeight = window.innerHeight
            if (docTop <= $playing.position().top + $playing.outerHeight() * 2 / 3 && docTop + winHeight > $playing.position().top + $playing.outerHeight() * 1 / 3) {
                landing()
                return
            }
            let $flying = $doc.find(flyingSelector)

            if ($flying.length === 0) {
                $flying = $(`<div id="${flyingId}"></div>`)
                $('body').append($flying)
            }
            if ($flying.find(videoSelector).length > 0) {
                return
            }
            const $video = $playing.find(videoSelector)
            const videoHeight = $video.outerHeight()
            $flying.html('')
            $video.remove()
            $flying.append($video)
            const $placeholder = $(`<div class="${placeholderClass}"></div>`)
            $placeholder.height(videoHeight)
            $playing.prepend($placeholder)
        }

        const landing = () => {
            if (!$playing) return

            let $flying = $doc.find(flyingSelector)

            const $video = $flying.find(videoSelector)

            if ($video.length > 0) {
                $playing.find(placeholderSelector).remove()
                $playing.prepend($video)
                $flying.remove()
            }
        }
        $doc.bind('scroll', function(e) {
            fly()
        })

        document.addEventListener('play', function(e){
            const $flying = $doc.find(flyingSelector)
            const $flyingVideo = $flying.find('video')
            if ($flyingVideo.length && $flyingVideo[0] !== e.target) {
                $flyingVideo[0].pause()
            };
            if ($playing && $playing.find('video')[0] && $playing.find('video')[0] !== e.target) {
                $playing.find('video')[0].pause()
            }

            const $cur = $(e.target).parents(playingSelector)

            if ($cur.length !== 0) {
                landing()
                $playing = $cur
                fly()
            }
        }, true);

        $doc.delegate('.comments-count', 'click', function(e) {
            e.preventDefault()
            e.stopPropagation()
            const $this = $(this)
            const oldText = $this.text()
            const $item = $this.parents('.topic-item')
            let $area = $item.find(topicCommentsSelector)
            if ($area.length > 0) {
                return
            }
            const emojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
            const startLoading = () => {
                let i = 0
                return setInterval(() => {
                    $this.text(emojis[++i % emojis.length])
                }, 300)
            }
            const cancelLoading = (id) => {
                clearInterval(id)
                $this.text(oldText)
            }
            async function render(url, start = 0) {
                $item.find(`${topicCommentsSelector}, ${topicCommentsPagerSelector}`).remove()
                const id = startLoading()
                const [$cmtItems, responseURL] = await fetchCmtItems(url + (url.indexOf('?') >= 0 ? '&' : '?') + `start=${start}`)
                const realURL = responseURL.split('?')[0]
                cancelLoading(id)
                $area = $(`<div class="${topicCommentsClass}"></div>`)
                $item.append($area)
                $area.append($cmtItems)
                const $pager = $(`<div class="${topicCommentsPagerClass}">
<a class="prev ${start === 0 ? 'disabled' : ''}" href="javascript:;">上一页</a>
<a class="next ${$cmtItems.length === 0 ? 'disabled' : ''}" href="javascript:;" style="margin-left: 4px">下一页</a>
</div>`);
                $item.append($pager)
                $pager.find('a').bind('click', function() {
                    const $this = $(this)
                    if ($this.hasClass('disabled')) {
                        return
                    }
                    $this.addClass('disabled')
                    const isPrev = $this.hasClass('prev')
                    const $pager = $(this).parents(topicCommentsPagerSelector)
                    let newStart = start + (isPrev ? -100 : 100);
                    if (newStart < 0) {
                        newStart = 0
                    }
                    $pager.attr('data-start', newStart)
                    const $video = $item.find('.video-root')
                    if ($doc.scrollTop() > $video.position().top + $video.height() / 2) {
                        $doc.scrollTop($item.find('.item-action').position().top)
                    }
                    render(realURL, newStart)
                })
            }
            render($this.attr('href'))
        })
    }
    main()
})();