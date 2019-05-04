// ==UserScript==
// @name         2ch.hk Threadshoter
// @namespace    https://github.com/FTOH/Threadshoter-UserScript
// @version      0.30
// @description  Tool for making threadshot on 2ch.hk
// @author       FTOH
// @supportURL   https://github.com/FTOH/Threadshoter-UserScript/issues
// @match        https://2ch.hk/*
// @grant  GM_openInTab
// @require      https://unpkg.com/html2canvas@1.0.0-alpha.12/dist/html2canvas.min.js
// @require      https://cdn.rawgit.com/greggman/dekapng/679590d109e4e0d625c4c4dad7c804b791317542/dist/dekapng.js
// ==/UserScript==


(function() {

    function $(selector, doc) {
        return (doc || document).querySelector(selector)
    }

    function $$(selector, doc) {
        return [].slice.call((doc || document).querySelectorAll(selector))
    }

    function _(html, doc) {
        var div = (doc || document).createElement('div');
        div.innerHTML = html.trim();
        return div.firstChild;
    }

    function show(posts, showed) {
        posts.forEach(function(post) {
            post.hidden = showed ? null : "hidden"
        })
    }

    function wrapWithSpan(document, node) {
        var span = document.createElement('span')
        span.textContent = node.textContent
        node.parentNode.replaceChild(span, node)
    }

    function createStyle(document, css) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }

    // https://html2canvas.hertzen.com/configuration
    var h2cSettings = { onclone: function(document) {
        // fix background
        var thread = $('.thread', document)
        thread.style.background = window.getComputedStyle(document.body, null).getPropertyValue('background')

        // remove unchecked posts
        if($('input[type=checkbox][name=delete]:checked', document) != null) {
            var uncheckedPosts = $$('input[type=checkbox][name=delete]:not(:checked)', document).map(function(checkbox) {
                return checkbox.closest('.post-wrapper, .oppost-wrapper')
            })
            uncheckedPosts.forEach(function(post) {
                post.parentNode.removeChild(post)
            })
            // uncheck all checkboxes
            $$('input[type=checkbox][name=delete]:checked', document).forEach(function(checkbox) {
                checkbox.checked = false
            })
            // remove hidden posts
            $$('.hidden-p-box', document).forEach(function(post) {
                post.parentNode.removeChild(post)
            })
        }

        // show spoilers
        createStyle(document, '.spoiler { color: inherit !important; }')

        // fix background rendering of multiline spoilers
        $$('.spoiler', document).forEach(function(spoiler) {
            var parent = spoiler.parentNode
            var letters = spoiler.textContent.split('')

            letters.forEach(function(letter, index) {
                var clone = spoiler.cloneNode(false)
                clone.textContent = letter
                if(index > 0) {
                    clone.style.marginLeft = '-1px'
                    clone.style.paddingLeft = '1px'
                }

                parent.insertBefore(clone, spoiler)
            })

            parent.removeChild(spoiler)
        })

        // fix text and image rendering
        createStyle(document, '.reply { display: table-cell; }')

        // remove scrolling in posts
        $$('.post-message', document).forEach(function(post) {
            post.style.maxHeight = 'inherit'
        })


        // set padding and fix opPost margin
        thread.style.padding = '1px 5px'
        var opPost = $('.thread > div.oppost-wrapper', thread)
        if(opPost) opPost.style.marginTop = '3px'


        var $this = h2cSettings
        var maxHeight = 32767 / $this.scale

        // split long thread
        if(thread.clientHeight > maxHeight) {
            var posts = $$('.thread > div', thread)

            if(typeof $this.custom === 'undefined') {
                var width = thread.clientWidth * $this.scale
                var height = thread.clientHeight * $this.scale
                $this.custom = {
                    skipPosts: 0,
                    numPosts: posts.length,
                    writer: new window.dekapng.PNGRGBAWriter(width, height)
                }
                console.log('Full size: [' + width + 'x' + height + ']')
            }

            var toSkip = $this.custom.skipPosts
            while(toSkip-- > 0) {
                thread.removeChild(posts.shift())
            }

            var removed = 0
            while(thread.clientHeight > maxHeight) {
                thread.removeChild(posts.pop())
                ++removed
            }

            if($this.custom.skipPosts > 0) { // not first part
                thread.style.paddingTop = '0px'
            }

            if(removed > 0) { // not last part
                var lastPost = posts[posts.length - 1]
                lastPost.style.marginBottom = '3px'
            }

            $this.custom.skipPosts += posts.length

        } else {
            thread.style.width = 'fit-content'
        }

    }, scale: 1.5, logging: false }


    var button = _('<div class="nav-arrows" title="Сделать скришот выбранных постов" id="make-screenshot" style="display: block; top: 52px; right: 63px; background-color: white; width: 32px; height: 32px; "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M39 38H11c-1.7 0-3-1.3-3-3V17c0-1.7 1.3-3 3-3h6c.2 0 .5-.2.6-.3l1.1-2.2c.4-.8 1.4-1.4 2.3-1.4h8c.9 0 1.9.6 2.3 1.4l1.1 2.2c.1.2.4.3.6.3h6c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3zM11 16c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h28c.6 0 1-.4 1-1V17c0-.6-.4-1-1-1h-6c-.9 0-1.9-.6-2.3-1.4l-1.1-2.2c-.1-.2-.4-.4-.6-.4h-8c-.2 0-.5.2-.6.3l-1.1 2.2c-.4.9-1.4 1.5-2.3 1.5h-6z"></path><path d="M25 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"></path><circle cx="35" cy="18" r="1"></circle><path d="M12 12h4v1h-4z"></path><path d="M25 21v-1c-2.8 0-5 2.2-5 5h1c0-2.2 1.8-4 4-4z"></path></svg></div>')

    var scrollUpButton = $('#up-nav-arrow')
    scrollUpButton.parentNode.insertBefore(button, scrollUpButton)

    var processed = false
    button.onclick = function() {
        if(processed) return
        processed = true

        render($('.thread'))
    }

    function render(thread) {
        window.html2canvas(thread, h2cSettings).then(function(canvas) {
            // short thread
            if(typeof h2cSettings.custom === 'undefined') {
                processed = false
                var url = canvas.toDataURL("image/png")
                unsafeWindow.expand(-1, url, url, canvas.width, canvas.height, false)
                GM_openInTab(url, true)
                return
            }

            // long thread
            var skipPosts = h2cSettings.custom.skipPosts
            var numPosts = h2cSettings.custom.numPosts
            var writer = h2cSettings.custom.writer

            console.log('Process ' + skipPosts + ' / ' + numPosts + ' with size: [' + canvas.width + 'x' + canvas.height + ']')

            var ctx = canvas.getContext("2d")
            var chunk = ctx.getImageData(0, 0, canvas.width, canvas.height)

            for (let row = 0; row < canvas.height; ++row) {
                const rowSize = chunk.width * 4;
                const chunkOffset = rowSize * row;
                writer.addPixels(chunk.data, chunkOffset, chunk.width);
            }

            if(skipPosts < numPosts) {
                render(thread)
                return
            } else { // last shot
                processed = false
                h2cSettings.custom = undefined
                var blob = writer.finishAndGetBlob()
                var blobUrl = URL.createObjectURL(blob)
                GM_openInTab(blobUrl, false)
            }
        })
    }


})();