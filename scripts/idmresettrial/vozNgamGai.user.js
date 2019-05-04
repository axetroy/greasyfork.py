// ==UserScript==
// @name         vozNgamGai
// @version      2018.06.29.01
// @description  Tính năng: Hỗ trợ ngắm gái.
// @namespace    idmresettrial
// @author       idmresettrial
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/packery/2.1.1/packery.pkgd.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-lazyload-any/0.3.0/jquery.lazyload-any.min.js
// @resource     play http://emn178.github.io/jquery-lazyload-any/samples/youtube/play.png
// @resource     play-hover http://emn178.github.io/jquery-lazyload-any/samples/youtube/play-hover.png
// @resource     iconURL https://cdn2.iconfinder.com/data/icons/ballicons-2-vol-2/100/picture-48.png
// @icon         http://i.imgur.com/nULQwUJ.png
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        unsafeWindow
// @grant        GM_getValue
// @grant        GM_setValue
// @include      /^https?://forums\.voz\.vn/.*$/
// @run-at       document-start
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
// Do not run on frames or iframes
if (window.top !== window.self) {
    return;
}


document.addEventListener('DOMContentLoaded', function () {
    ngamgai();
    render('youtube');
    render('webm');
    render('mp4');
});
/*
/









/
Scroll down to see the functions.
/









/
*/
// Functions --->

function ngamgai() {

    var findIMG = $('td[id^="td_post_"] img:not([src^="images/"]):not([src^="/images/"]):not([src^="http://forums.voz.vn/images/"]):not([src^="https://forums.voz.vn/images/"])');
    var inpage_gallery = [], inpage_gallery_post = [];
    var pagenav = {};

    findIMG.each(function () {
        var img = $(this).attr('src');
        var post = $(this).closest('td[id^="td_post_"]').attr('id').replace('td_post_', '');
        var size = {nw: $(this).prop("naturalWidth"), nh: $(this).prop("naturalHeight") };

        if (size.nw > 100) {
            if (inpage_gallery.indexOf(img) === -1) {
                inpage_gallery.push(img);
                inpage_gallery_post.push(post);
            } else {
                $(this).attr("data-vozNgamGai-ignore", "existed");
            }
        } else {
            $(this).attr("data-vozNgamGai-ignore", "small");
        }
    });

    if (inpage_gallery.length) {

        $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css" type="text/css" media="screen" />');
        $('head').append('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" media="screen" />');
        $('head').append('<style>a#vozNgamGai, a.vozNgamGai.single {color: #ffffff; cursor: pointer;} a#vozNgamGai {display:block; bottom:5px; right:5px; position: fixed; opacity:0.5; transition: opacity 0.5s;} a#vozNgamGai:hover {opacity:1;} </style>');
        $('head').append('<style>.vozNgamGai-gallery-wrapper {display:none; width:100%; height:100%; position:fixed; top:44px; left:0; margin:0px; padding:0 50px; box-sizing:border-box; overflow-x:hidden; overflow-y:auto; background: rgba(0,0,0,0.9);} .vozNgamGai-gallery-wrapper.light {background: #F3F5F6;} .vozNgamGai-gallery{overflow:hidden; width:100%;} .vozNgamGai-item{width:auto;height:auto;max-height:250px;max-width:300px}</script>');
        $("head").append('<style class="ngGallery-zoom">.vozNgamGai-item {max-width:{mw}px; max-height:{mh}px;}</style>'.replace('{mw}',300*GM_getValue("zoom_ratio", 1)).replace('{mh}',250*GM_getValue("zoom_ratio", 1)));
        $('head').append('<style>.fancybox-infobar {top:auto; bottom:0;} .fancybox-infobar button{visibility:hidden;} .fancybox-toolbar{top:0; left:0; padding:0 10px; line-height:44px;} .fancybox-toolbar{padding:0 10px; width:100%; background: rgba(30,30,30,.9); box-shadow:0 0 0 1px #222, 0 5px 5px rgba(0,0,0,.5);} .fancybox-toolbar ::selection {background:none;} a.vozNgamGai.fancybox-button {font-size:15px; text-decoration:none; width:auto; padding-right:10px; text-align:center; line-height:inherit; vertical-align:middle;} .fancybox-button:not([disabled]):hover {background:rgba(233, 30, 99, 0.5)} .fancybox-button.clicking, .fancybox-button.clicking:hover {background:rgba(189, 189, 189, 0.25);} a.vozNgamGai.fancybox-button[disabled] {color: #696969;} a.vozNgamGai.fancybox-button i {margin-right:5px;} a.vozNgamGai.fancybox-button.logo {float:right; font-weight:900; font-size:20px;} a.vozNgamGai.fancybox-button.label, a.vozNgamGai.fancybox-button.label:hover{background:none; color:#ddd; cursor:default;} div.vozNgamGai.fancybox-button.space {width:20px; display:inline-block;}</style>');
        $('body').append('<a id="vozNgamGai" accesskey="a" title="Phím tắt:\n Chrome: Alt+A \n Firefox: Alt+Shift+A"><img src="' + GM_getResourceURL('iconURL') + '" /></a>');

        var fb_tpl = {
            gotoPost: '<a class="vozNgamGai fancybox-button" data-goto-type="post" title="Đến bài viết"><i class="fa fa-location-arrow" aria-hidden="true"></i>vOz</a>',
            gotoSource: '<a class="vozNgamGai fancybox-button" data-goto-type="source"></a>',
            slideShow: '<a class="vozNgamGai fancybox-button" data-fancybox-action="SlideShow"><i class="fa fa-play" aria-hidden="true"></i>Slide show</a>',
            fullScreen: '<a class="vozNgamGai fancybox-button" data-fancybox-action="FullScreen"><i class="fa fa-television" aria-hidden="true"></i>Toàn màn hình</a>',
            loadmoreBack: '<a class="vozNgamGai fancybox-button" data-loadmore-type="back"></a>',
            loadmoreNext: '<a class="vozNgamGai fancybox-button" data-loadmore-type="next"></a>',
            close: '<a class="vozNgamGai fancybox-button" style="float:left" data-fancybox-close><i class="fa fa-times-circle" aria-hidden="true"></i>Tắt</a>',
            logo: '<a class="vozNgamGai fancybox-button label logo">vozNgamGai<img style="float:right;height:44px;" src="http://i.imgur.com/nULQwUJ.png" /></a>',
            space: '<div class="vozNgamGai fancybox-button space" disabled></div>',
            zoomOut: '<a class="vozNgamGai fancybox-button" data-zoom-type="out"><i class="fa fa-search-minus" aria-hidden="true"></i>Thu nhỏ</a>',
            zoomIn: '<a class="vozNgamGai fancybox-button" data-zoom-type="in"><i class="fa fa-search-plus" aria-hidden="true"></i>Phóng to</a>',
            lightMode: '<a class="vozNgamGai fancybox-button" data-lightMode></a>'
        };

        // click vào ảnh trên trang --->

        $(findIMG.not('[data-vozNgamGai-ignore="small"]')).on("click", function(e) {
            $.fancybox.open(
                inpage_gallery.map(i => { return {src: i}; }),
                {
                    // fancybox options
                    loop: true,
                    infobar: true,
                    buttons: ["close", "space", "slideShow", "fullScreen", "space", "gotoPost", "gotoSource", "space", "logo"],
                    btnTpl : fb_tpl,
                    beforeShow: function(fb, item) {
                        set_gotoLink(fb, item);
                    }
                },
                inpage_gallery.indexOf($(this).attr("src"))
            );
        });
        //  <--- click vào ảnh trên trang



        // Xem ảnh nhanh --->
        var waiting_images = [], gallery = [], gallery_post = [], gallery_exclude = [];
        var ngGallery, loading;

        $("body").append('<div class="vozNgamGai-gallery-wrapper"><div class="vozNgamGai-gallery"></div></div>');

        $('body').on('click', 'a#vozNgamGai', function () {

            if (ngGallery === undefined) {

                ngGallery = $('.vozNgamGai-gallery').packery({
                    percentPosition: true,
                    itemSelector: '.vozNgamGai-item',
                    gutter: 5
                }); // create gallery

                if ($('div.pagenav').length) {
                    pagenav.nav = $('div.pagenav');
                    pagenav.back = Number(pagenav.nav.find('strong:not(:contains("«")):not(:contains("»"))').html());
                    pagenav.next = pagenav.back-1;
                    pagenav.url = pagenav.nav.find('a:first').attr('href') + '&page=';
                    pagenav.end = Number(pagenav.nav.find('td:first').text().match(/of (\d+)/)[1]);
                } else {
                    pagenav.nav = null;
                    pagenav.back = 1;
                    pagenav.next = pagenav.back-1;
                    pagenav.url = window.location.href + '&page=';
                    pagenav.end = 1;
                }
            }

            $.fancybox.open($(".vozNgamGai-gallery-wrapper"),{
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-stage"></div><div class="vozNgamGai fancybox-toolbar">{{BUTTONS}}</div></div>',
                smallBtn: false,
                buttons: ["close", "space", "loadmoreBack", "loadmoreNext", "space", "zoomOut", "zoomIn", "space", "lightMode", "space", "logo"],
                idleTime: Infinity,
                btnTpl: fb_tpl,
                beforeShow: function() {

                    $("a.fancybox-button[data-loadmore-type]").each(function() {
                        var type = $(this).attr("data-loadmore-type");
                        var html = '<i class="fa fa-chevron-circle-' + (type=="next"? "right" : "left") +'" aria-hidden="true"></i>Trang ' + (pagenav[type] + (type=="back"? -1 : 1));
                        if (type == "next" && pagenav[type] == pagenav.end) $(this).attr("disabled", true);
                        else if (type == "back" && pagenav[type] == 1) $(this).attr("disabled", true);
                        $(this).html(html);
                    });

                    var lightMode = GM_getValue("lightMode", false);
                    if (lightMode) $(".vozNgamGai-gallery-wrapper").addClass("light");
                    else $(".vozNgamGai-gallery-wrapper").removeClass("light");
                    $("a.vozNgamGai.fancybox-button[data-lightMode]").attr("data-lightMode", lightMode)
                        .html('<i class="fa fa-desktop" aria-hidden="true"></i>{lm_title}'
                              .replace("{lm_title}",lightMode? "Theme tối" : "Theme sáng"));

                    if (!gallery.length) {
                        loadmorePrepare('next');
                    }
                }
            });
        });

        // tính năng cho toolbar buttons

        // nút tải thêm ảnh
        $("body").on("click", "a.fancybox-button[data-loadmore-type]:not(disabled)", function(e) {
            var type = $(e.target).data("loadmore-type");
            loadmorePrepare(type);
        });
        // phóng to, thu nhỏ
        $("body").on("click", "a.fancybox-button[data-zoom-type]", function(e) {
            var zoom_ratio  = GM_getValue("zoom_ratio", 1);
            var type = $(e.target).data("zoom-type");
            zoom_ratio = zoom_ratio + 0.25*(type==="in"? 1 : -1);
            GM_setValue("zoom_ratio", zoom_ratio  );

            $("style.ngGallery-zoom").remove();
            $("head").append('<style class="ngGallery-zoom">.vozNgamGai-item {max-width:{mw}px; max-height:{mh}px;}</style>'.replace('{mw}',300*zoom_ratio).replace('{mh}',250*zoom_ratio));
            ngGallery.packery();
        });
        // theme
        $("body").on("click", "a.fancybox-button[data-lightMode]", function(e) {
            var lightMode = GM_getValue("lightMode", false);

            lightMode = !lightMode;
            GM_setValue("lightMode", lightMode);

            if (lightMode) $(".vozNgamGai-gallery-wrapper").addClass("light");
            else $(".vozNgamGai-gallery-wrapper").removeClass("light");

            $("a.vozNgamGai.fancybox-button[data-lightMode]").attr("data-lightMode", lightMode)
                .html('<i class="fa fa-desktop" aria-hidden="true"></i>{lm_title}'
                      .replace("{lm_title}",lightMode? "Theme tối" : "Theme sáng"));
        });
        // slideshow, fullscreen
        $("body").on("click", "a.fancybox-button[data-fancybox-action]", function(e) {
            var fb = $.fancybox.getInstance();
            fb[$(this).attr("data-fancybox-action")].toggle();
            fb.$refs.toolbar.find($(this)).toggleClass("clicking");
        });

        // cuộn để tải thêm ảnh
        $(".vozNgamGai-gallery-wrapper").on("scroll", function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
                var type = $('a.fancybox-button[data-loadmore-type]:not([disabled])').last();
                if (type.length) loadmorePrepare(type.attr("data-loadmore-type"));
            }
        });

        // click ảnh trong gallery
        $("body").on("click", ".vozNgamGai-item", function() {
            var tmp_gallery = gallery.filter(x => gallery_exclude.indexOf(x)===-1);
            $.fancybox.open(
                tmp_gallery.map(s => { return {src: s}; }),
                {
                    // fancybox options
                    loop: true,
                    infobar: true,
                    buttons: ["close", "space", "slideShow", "fullScreen", "space", "gotoPost", "gotoSource", "space", "logo"],
                    btnTpl : fb_tpl,
                    beforeShow: function(fb, item) {
                        set_gotoLink(fb, item);
                    }
                },
                tmp_gallery.indexOf($(this).attr("src"))
            );
        });

        // Mở link gốc
        $("body").on("click", ".vozNgamGai.fancybox-button[data-goto-type]", function() {
            window.open($.fancybox.getInstance().current.vozNgamGai_gotoLink[$(this).attr("data-goto-type")]);
        });

    } // <--- xem ảnh nhanh

    // link gốc
    function set_gotoLink(fb, item) {
        var link = {source: null, post: null};

        var provider = [/fbcdn.*\/\d*_(\d*)_/, /flickr.com\/\d+\/(\d+)/];
        var provider_original = ["https://facebook.com/", "https://flickr.com/photo.gne?id="];
        var provider_label = ["facebook", "flickr"];
        var provider_icon = ["fa-facebook-official", "fa-flickr"];

        for (var i=0; i<provider.length; i++) {
            link.source = item.src.match(provider[i]);
            if (link.source) {
                link.source = provider_original[i] + link.source[1];
                fb.$refs.toolbar.find('.vozNgamGai[data-goto-type="source"]')
                    .html('<i class="fa ' + provider_icon[i] + '" aria-hidden="true"></i>' + provider_label[i]).removeAttr("disabled");
                break;
            } else if (i == provider.length-1) {
                fb.$refs.toolbar.find('.vozNgamGai[data-goto-type="source"]').html("").attr("disabled", true);
            }
        }

        link.post = "/showpost.php?p=" + ( gallery.length? gallery_post[gallery.indexOf(item.src)] : inpage_gallery_post[inpage_gallery.indexOf(item.src)] );
        fb.current.vozNgamGai_gotoLink = link;

    }

    function loadmorePrepare(type) {
        if ((type == "back" && pagenav.back > 1) || (type == "next" && pagenav.next < pagenav.end)) {
            if (loading) { return; }
            loading = true;
            pagenav[type] += (type=="back"? -1 : 1);

            if (( type == "next" && pagenav[type] == pagenav.end) || (type == "back" && pagenav[type] == 1) ) {
                $('a.fancybox-button[data-loadmore-type="' +type+ '"]')
                    .attr("disabled", true);
            }

            var html = '<i class="fa fa-chevron-circle-' + (type=="next"? "right" : "left") +'" aria-hidden="true"></i>Trang ' + (pagenav[type] + (type=="back"? -1 : 1));
            $('a.fancybox-button[data-loadmore-type="' +type+ '"]:not(disabled)').html(html);

            loadMore(pagenav.url + pagenav[type], type);
        }
    }

    function push_images(html, type) {
        html.find('td[id^="td_post_"] img:not([src^="images/"]):not([src^="/images/"]):not([src^="http://forums.voz.vn/images/"]):not([src^="https://forums.voz.vn/images/"])').each(function () {
            var img = $(this).attr('src');
            var post = $(this).closest('td[id^="td_post_"]').attr('id').replace('td_post_', '');

            if (gallery.indexOf(img) === - 1 && gallery_exclude.indexOf(img) === - 1) {
                gallery.push(img);
                gallery_post.push(post);
                waiting_images.push({type: type, post: post, src: img});
            }
        });

        if (waiting_images.length)
            update_gallery();
        else {
            clearLoading();
            loadmorePrepare(type);
        }
    }

    function update_gallery() {

        loading = 1; $.fancybox.getInstance().showLoading();
        if (waiting_images.length === 0 ) {
            clearLoading();
            return;
        }

        var img = new Image("img");
        img.onload = function() {
            if (this.naturalWidth > 100) {
                ngGallery.append(img).packery("appended", img).packery();
            } else {
                if (gallery_exclude.indexOf($(img).attr("src")) === -1) gallery_exclude.push($(img).attr("src"));
            }
            waiting_images.shift();
            update_gallery();
        };
        img.onerror = function() {
            if (gallery_exclude.indexOf($(img).attr("src")) === -1) gallery_exclude.push($(img).attr("src"));
            waiting_images.shift();
            update_gallery();
        };
        $(img).attr("src", waiting_images[0].src)
            .attr("data-post", waiting_images[0].post)
            .attr("class", "vozNgamGai-item");
    }

    function loadMore(url, type) {
        $.ajax({
            type: 'GET',
            async: type !== 'download',
            url: url,
            success: function (html) {
                push_images($(html), type);
            },
            error: function() {
                clearLoading();
            }
        });
    }

    function clearLoading() {
        loading = false; $.fancybox.getInstance().hideLoading();
    }

    function download(from, to) {
        page.download = {
            nav: $('div.pagenav:first'),
            url: window.location.href
        };
        page.download.url = (page.download.nav.length) ? page.download.nav.find('a:first').attr('href') + '&page=' : page.download.url;
        $('html').html('<div class="vozNgamGai download"><h2>Đang tạo link ảnh...</h2><img src="https://1.bp.blogspot.com/-hdHnzbTmU-4/U7l9JZVybkI/AAAAAAAAAuM/u5c9SgVF730/s1600/4.png"></div>');
        for (i = from; i <= to; i++) {
            loadMore(page.download.url + i, 'download');
        }
        var download_link = '';
        for (i = 0; i < gallery.download.length; i++) {
            download_link += '<li><a target="_blank" href="' + gallery.download[i] + '">' + gallery.download[i] + '</a></li>';
        }
        setTimeout(function () {
            $('html').html('<div class="vozNgamGai download"><h2>Xong! Dùng IDM hoặc app tương tự để down.<br>Tổng cộng: ' + gallery.download.length + ' ảnh</h2><ul>' + download_link + '</ul></div>');
        }, 2000);
    }
}
function render(what) {
    var data = {
        'youtube': {
            'selector': 'a[href*="youtube.com"], a[href*="youtu.be"]',
            'tpl': '<div class="vozNgamGai youtube" style="width:560px; height:315px; margin:5px auto; text-align:center; position:relative;">' +
            '<div class="lazyload-thumbnail"><!--<div style="with:100%; height:100%; background-image:url(http://img.youtube.com/vi/{yid}/0.jpg); background-repeat:no-repeat; background-attachment:scroll; background-position:center;"></div><span class="play"></span>--></div>' +
            '<!--<div class="vozNgamGai youtube" style="margin:5px; text-align:center; position:relative;"><iframe width="560" height="315" src="https://www.youtube.com/embed/{yid}?autoplay=1" frameborder="0" allowfullscreen></iframe></div>-->' +
            '</div><center>{yurl}</center>',
            'out': function (str, url) {
                url = url.replace(/&.*$/, '');
                var yid = url.replace(/^.+((watch\?v=)|(youtu.be\/))/i, '');
                var isIgnored = (/(\.com|\.be)(\/|testtube|html5|user\/.*|channel\/.*|tv){0,2}$/i).test(url);
                var embed = str.replace('{yid}', yid).replace('{yid}', yid);
                url = '<a href="' + url + '" target="blank">' + url + '</a>';
                embed = embed.replace('{yurl}', url);
                return isIgnored ? url : embed;
            },
            'afterOut': function () {
                function load(img) {
                    img.fadeOut(0, function () {
                        img.fadeIn(1000);
                    });
                }
                //eval(GM_getResourceText('lazyload-any'));
                $('.lazyload-thumbnail').lazyload({
                    load: load
                });
                $('.vozNgamGai.youtube').lazyload({
                    trigger: 'click'
                });
                $('head').append('<style>.vozNgamGai .play {position: absolute; width: 64px; height: 64px; top: 50%; left: 50%; margin: -32px 0 0 -32px; ' +
                                 'background-image: url(' + GM_getResourceURL('play') + '); -moz-opacity: 0.70; opacity: 0.70; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha"(Opacity=70);}' +
                                 '.vozNgamGai.youtube:hover .play {background-image: url(' + GM_getResourceURL('play-hover') + '); -moz-opacity: 1; opacity: 1; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha"(Opacity=100);}' +
                                 '</style>');
            }
        },
        'webm': {
            'selector': 'a[href*=".webm"]',
            'tpl': '<div class="vozNgamGai html5"><div style="cursor:default; font-weight:bold; font-size:25px; color:#2c3e50; margin:5px;">web<div style="display:inline; color:#2980b9;">▶</div>m<div style="display:inline-block; color:#7f8c8d; font-size:10px; margin-left:5px;">hover <br>to play</div></div><!--<video style="display:block; max-width:900px; max-height:600px; margin:5px auto;" src="{url}" controls></video><center><a href="{url}" target="blank">{url}</a></center>--></div>',
            'out': function (str, url) {
                return str.replace(/{url}/g, url);
            },
            'afterOut': function () {
                //eval(GM_getResourceText('lazyload-any'));
                $('.vozNgamGai.html5').lazyload({
                    trigger: 'mouseenter'
                });
            }
        },
        'mp4': {
            'selector': 'a[href$=".mp4"]',
            'tpl': '<div class="vozNgamGai html5"><div style="cursor:default; font-weight:bold; font-size:25px; color:#2c3e50; margin:5px;">mp4<div style="display:inline; color:#2980b9;">▶</div><div style="display:inline-block; color:#7f8c8d; font-size:10px; margin-left:5px;">hover <br>to play</div></div><!--<video style="display:block; max-width:900px; max-height:600px; margin:5px auto;" src="{url}" controls autoplay></video><center><a href="{url}" target="blank">{url}</a></center>--></div>',
            'out': function (str, url) {
                return str.replace(/{url}/g, url);
            },
            'afterOut': function () {
                //eval(GM_getResourceText('lazyload-any'));
                $('.vozNgamGai.html5').lazyload({
                    trigger: 'mouseenter'
                });
            }
        }
    };
    function rr(url) {
        url = unescape(url);
        var redirect = /[?=]http/i;
        if (redirect.test(url)) {
            url = url.replace(/^.+[?=]http/i, 'http');
        }
        return url;
    }
    $(data[what].selector).each(function (i) {
        var url = rr($(this).attr('href'));
        $(this) [0].outerHTML = data[what].out(data[what].tpl, url);
    });
    if (Object.keys(data[what]).indexOf('afterOut') !== - 1) data[what].afterOut();
}
// the end