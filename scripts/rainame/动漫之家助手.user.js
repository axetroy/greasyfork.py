// ==UserScript==
// @name        动漫之家助手
// @namespace   https://manhua.dmzj.com/
// @version     2.1.4
// @description 获取动漫之家被屏蔽的漫画目录及章节，脚本于Tampermonkey中测试通过。
// @author      rainame
// @license     MIT
// @match       http*://manhua.dmzj.com/*
// @match       http*://i.dmzj.com/subscribe*
// @grant       GM_xmlhttpRequest
// @require     https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require     https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require     https://cdn.bootcss.com/jquery_lazyload/1.9.7/jquery.lazyload.min.js
// @run-at      document-end
// @noframes
// ==/UserScript==

(function(window, $) {

    'use strict';

    if (!window.$) { window.$ = $; }

    window.helper = {
        pages: [],
        img_zoom_flag: false,
        placeholder: "https://static.dmzj.com/ocomic/images/mh-last/lazyload.gif",
        nextChapterMsgBox: function () {
            $('#transit_div').css('height', $(window.document).height());
            var transit_div = $('#transit_div');
            var internal_div = $('#internal_div');
            transit_div.show();
            internal_div.show();
            internal_div.css('margin-top', $(window.document).scrollTop() + 150 + 'px');
            $(window).scroll(function () {
                if (internal_div) {
                    internal_div.css('margin-top', $(window.document).scrollTop() + 150 + 'px');
                }
            });
            $('#close_btn').unbind("click");
            $('#close_btn').bind("click", function () {
                $("#transit_div").hide();
                $("#internal_div").hide();
            });
            $('#next_btn').unbind("click");
            $('#next_btn').bind("click", function () {
                $("#transit_div").hide();
                $("#internal_div").hide();
                window.location.href = $('#next_chapter').attr('href');
            });
            $('#go_sns_view_input').unbind("click");
            $('#go_sns_view_input').bind("click", function () {
                $("#transit_div").hide();
                $("#internal_div").hide();
            });
            $('#next_btn').focus();
        },
        getImg: function (arr_pages) {
            var prevChapter = $("#prev_chapter").length > 0 ? '<a class="btm_chapter_btn fl" href="' + $("#prev_chapter").attr("href") + '">上一章节</a>' : '';
            var nextChapter = $("#next_chapter").length > 0 ? '<a class="btm_chapter_btn fr" href="' + $("#next_chapter").attr("href") + '">下一章节</a>' : '';
            var htmlStr = '';
            for (var i = 0; i < arr_pages.length; i++) {
                htmlStr += '<div class="inner_img"  style="margin-top:40px">';
                htmlStr += '<a style="cursor:pointer" name="page=' + (i + 1) + '" index="' + (i + 1) + '" >';
                htmlStr += '<img id=img_' + (i + 1) + ' style="border:1px solid #ccc; padding:1px" data-idx="' + i + '" data-original="' + window.helper.placeholder + '" ori-src="' + arr_pages[i] + '">';
                htmlStr += '</a><p class="curr_page">' + parseInt(i + 1) + '/' + arr_pages.length + '</p></DIV>';
                htmlStr += '</div>';
            }
            var btnBntHtml = '<div class="btmBtnBox">';
            btnBntHtml += prevChapter;
            btnBntHtml += nextChapter;
            btnBntHtml += '</div>';
            $("#center_box").html(htmlStr).after(btnBntHtml);
            if ($(".btm_chapter_btn").length == 1) {
                $(".btmBtnBox").width(200);
            }
        },
        getImg_land: function (arr_pages) {
            var his_img;
            if (window.location.hash == false) {
                window.location.hash = '@page=1';
                his_img = 1;
            } else {
                his_img = window.location.hash.split("=")[1];
            }
            var prevChapter = $("#prev_chapter").length > 0 ? '<a class="btm_chapter_btn fl" href="' + $("#prev_chapter").attr("href") + '">上一章节</a>' : '';
            var nextChapter = $("#next_chapter").length > 0 ? '<a class="btm_chapter_btn fr" href="' + $("#next_chapter").attr("href") + '">下一章节</a>' : '';
            var idx = his_img - 1, img_src = arr_pages[idx];
            window.helper.loadImg(img_src, idx, function (src) {
                $("#center_box").append('<img name="page_' + his_img + '" ori-src="' + img_src + '" src="' + src + '"/>');
                window.helper.imgload_size();
            });
            var select_option = '';
            for (var i = 0; i < arr_pages.length; i++) {
                select_option += '<option value="' + arr_pages[i] + '">第' + (i + 1) + '页</option>';
            }
            var select_h = '<select name="select" id="page_select" onchange="window.helper.select_page()">' + select_option + '</select>';
            $("#center_box").css("position", "relative");
            $("#center_box").append('<a class="img_land_prev" onclick="window.helper.prev_img()"></a><a class="img_land_next" onclick="window.helper.next_img()"></a>');
            $("#center_box").after('<div class="btmBtnBox">' + prevChapter + select_h + nextChapter + '</div>');
            $("#page_select").val(arr_pages[his_img - 1]);
            if ($('#next_chapter').length == 0) {
                $(".btmBtnBox").css("width", "256px");
            }
        },
        select_page: function () {
            var img_src = $("#page_select").val();
            var _index = $("#page_select option:selected").index() + 1;
            window.helper.loadImg(img_src, _index - 1, function (src) {
                $("#center_box img")
                    .removeAttr('style')
                    .attr('name', 'page_' + _index)
                    .attr('ori-src', img_src)
                    .attr('src', src);
                window.location.hash = '@page=' + _index;
                $("html,body").animate({
                    "scrollTop": $("#center_box").offset().top
                }, 0);
            });
        },
        prev_img: function () {
            var obj_img_src = $("#center_box img").attr("ori-src"),
                arr_pages = window.arr_pages, prev_img, idx;
            for (var i = 0; i < arr_pages.length; i++) {
                var img_src = arr_pages[i];
                if (obj_img_src == img_src) {
                    if (typeof arr_pages[i - 1] != "undefined") {
                        idx = i - 1;
                        prev_img = arr_pages[idx];
                    } else {
                        if ($("#prev_chapter").length > 0) {
                            if (confirm("已经是此章节第1页了，要打开上一个章节吗？") == true) {
                                window.location.href = $("#prev_chapter").attr("href");
                            }
                        } else {
                            alert("已经是第一个章节了！");
                        }
                    }
                    break;
                }
            }
            if (!!prev_img) {
                window.helper.loadImg(prev_img, idx, function (src) {
                    var page = idx + 1;
                    $("#center_box img")
                        .removeAttr('style')
                        .attr('name', 'page_' + page)
                        .attr('ori-src', prev_img)
                        .attr('src', src);
                    if ($('.zoompic_chk').is(':checked')) {
                        window.helper.imgload_size();
                    }
                    $(".turnPage").html(page + "/" + window.arr_pages.length);
                    $("#page_select").val(prev_img);
                    window.location.hash = '@page=' + page;
                    $("html,body").animate({
                        "scrollTop": $("#center_box").offset().top
                    }, 0);
                });
            }
        },
        next_img: function () {
            var obj_img_src = $("#center_box img").attr("ori-src"),
                arr_pages = window.arr_pages, next_img, idx;
            for (var i = 0; i < arr_pages.length; i++) {
                var img_src = arr_pages[i];
                if (obj_img_src == img_src) {
                    if (typeof arr_pages[i + 1] != "undefined") {
                        idx = i + 1;
                        next_img = arr_pages[idx];
                    } else {
                        if ($('#next_chapter').length > 0) {
                            this.nextChapterMsgBox();
                        } else {
                            window.location.href = window.final_page_url;
                            $(".btmBtnBox").css("width", "256px");
                        }
                    }
                    break;
                }
            }
            if (!!next_img) {
                window.helper.loadImg(next_img, idx, function (src) {
                    var page = idx + 1;
                    $("#center_box img")
                        .removeAttr('style')
                        .attr('name', 'page_' + page)
                        .attr('ori-src', next_img)
                        .attr('src', src);
                    if ($('.zoompic_chk').is(':checked')) {
                        window.helper.imgload_size();
                    }
                    $(".turnPage").html(page + "/" + window.arr_pages.length);
                    $("#page_select").val(next_img);
                    window.location.hash = '@page=' + page;
                    $("html,body").animate({
                        "scrollTop": $("#center_box").offset().top
                    }, 0);
                });
            }
        },
        imgload_size: function () {
            $("#center_box img").on('load', function () {
                var w = $(window).width();
                var img_w = $(this).width();//图片宽度
                var img_h = $(this).height();
                if (img_w > w) {//如果图片宽度超出容器宽度--要撑破了
                    var height = (w * img_h) / img_w; //高度等比缩放
                    $(this).css({"width": w - 4, "height": height});//设置缩放后的宽度和高度
                }
            });
        },
        qiehuan: function () {
            if ($.cookie('display_mode') == 0) {
                $.cookie('display_mode', 1, {expires: 999999, path: '/'});
            } else {
                $.cookie('display_mode', 0, {expires: 999999, path: '/'});
            }
            window.location.reload();
        },
        setWidth: function () {
            var w = $(window).width();//容器宽度
            $("#center_box img").each(function () {
                var img_w = $(this).width();//图片宽度
                var img_h = $(this).height();//图片高度
                if (img_w > w) {//如果图片宽度超出容器宽度--要撑破了
                    var height = (w * img_h) / img_w; //高度等比缩放
                    $(this).css({"width": w - 4, "height": height});//设置缩放后的宽度和高度
                }
            });
        },
        resizeImg: function (flag, obj) {
            this.img_orgin_width = obj.naturalWidth;
            this.img_orgin_height = obj.naturalHeight;
            if (!$('.zoompic_chk').length) { return false; }
            var target_img = $(obj), zoom_img_height, zoom_img_width;
            if (flag) {
                var body_width = $(window).width();
                body_width -= 4;
                var ratio = body_width / this.img_orgin_width;
                if (ratio >= 1) { return; }
                zoom_img_height = this.img_orgin_height * ratio;
                zoom_img_width = this.img_orgin_width * ratio;
                target_img.height(zoom_img_height + "px");
                target_img.width(zoom_img_width + "px");
                return;
            } else {
                target_img.height('');
                target_img.width('');
                return;
            }
        },
        loadImg: function (src, idx, callback) {
            if (typeof this.pages[idx] != 'undefined') {
                callback(this.pages[idx]);
                return;
            }
            GM_xmlhttpRequest({
                method: 'GET',
                url: src,
                headers: {'Referer': 'http://images.dmzj.com/'},
                responseType: 'blob',
                onload: function(res) {
                    if (res.status !== 200) { return; }
                    var url = window.URL || window.webkitURL;
                    if (typeof callback == 'function') {
                        var blob = url.createObjectURL(res.response);
                        window.helper.pages[idx] = blob;
                        callback(blob);
                    }
                }
            });
        },
        filterImg: function (is_c) {
            if (is_c < 1) {
                $("#center_box").addClass("filterimg");
                $("#center_box img").addClass("filterimg");
                $("#filter_chk").attr("checked", true);
            } else {
                if ($("#filter_chk").prop("checked")) {
                    $("#center_box").addClass("filterimg");
                    $("#center_box img").addClass("filterimg");
                    $.cookie("img_filter", 1);
                } else {
                    $("#center_box").removeClass("filterimg");
                    $("#center_box img").removeClass("filterimg");
                    $.cookie("img_filter", 0);
                }
            }
        },
        init: function(head, body, comic_id, chapter_id) {
            $('head').html(head);
            $('body').html(body).fadeIn('fast', function () {
                if ($.cookie('display_mode') == null || $.cookie('display_mode') == 0) {
                    window.helper.getImg_land(window.arr_pages);
                    $("#qiehuan_txt").html("切换到上下滚动阅读");
                    $.cookie('display_mode', 0, {expires: 999999, path: '/'});
                    $("body").keydown(function (event) {
                        if (event.keyCode == 37) {
                            window.helper.prev_img(".img_land_prev");
                        } else if (event.keyCode == 39) {
                            window.helper.next_img(".img_land_next");
                        }
                    });
                } else {
                    $("#qiehuan_txt").html("切换到左右翻页阅读");
                    window.helper.getImg(window.arr_pages);
                    $(".inner_img a").click(function () {
                        var _index = $(this).attr("index");
                        if (_index < window.arr_pages.length) {
                            window.location.href = "#page=" + (parseInt(_index) + parseInt(1));
                        } else {
                            if ($('#next_chapter').length > 0) {
                                window.helper.nextChapterMsgBox();
                            } else {
                                window.location.href = window.final_page_url;
                            }
                        }
                    });

                    $("#center_box img").on('load', function () {
                        window.helper.resizeImg($('.zoompic_chk').prop('checked'), this);
                    }).lazyload({
                        placeholder: window.helper.placeholder,
                        effect: "fadeIn",
                        threshold: 2000,
                        load: function () {
                            var $this = $(this), idx = $this.attr('data-idx'), src = $this.attr('ori-src');
                            window.helper.loadImg(src, idx, function (src) {
                                $this.attr("src", src);
                            });
                        }
                    });

                    $("body").keydown(function (event) {
                        if (event.keyCode == 37) {
                            if ($("#prev_chapter").length > 0) {
                                if (confirm("要打开上一个章节吗？") == true) {
                                    window.location.href = $("#prev_chapter").attr("href");
                                }
                            } else {
                                alert("已经是第一个章节了");
                            }
                        } else if (event.keyCode == 39) {
                            if ($("#next_chapter").length > 0) {
                                window.helper.nextChapterMsgBox();
                            } else {
                                window.location.href = window.final_page_url;
                            }
                        }
                    });
                }
                $(window.document).bind("contextmenu", function () {
                    return false;
                });
                if ($(".btm_chapter_btn").length == 1) {
                    $(".btmBtnBox").css("width", "256px");
                }
                $('.zoompic_chk').click(function () {
                    $('.zoompic_chk').attr('checked', $(this).prop('checked'));
                    if ($('.zoompic_chk').is(':checked')) {
                        window.helper.setWidth();
                        window.helper.img_zoom_flag = false;
                    } else {
                        $("#center_box img").each(function () {
                            window.helper.resizeImg(window.helper.img_zoom_flag, this);
                        });
                        window.helper.img_zoom_flag = true;
                    }
                });

                //吐槽
                window.point.init(comic_id, chapter_id);
            });
        }
    };

    window.point = {
        url: 'https://user.dmzj.com/',
        pointHtml: '<div class="getcookie"></div><div class="comic_gd_con"><p class="allN">共有0人发表了吐槽</p><ul class="comic_gd_li"></ul></div>',
        pointLink: ' <link rel="stylesheet" href="https://static.dmzj.com/module/css/pointView.css"/>',
        comicUrl: "https://interface.dmzj.com",
        comic_id: 0,
        chapter_id: 0,
        Percent: function (num1,num2) {
            var num = Math.round((num1 / num2) * 100);
            num += "%";
            return num;
        },
        getPoint: function () {
            let that = this;
            GM_xmlhttpRequest({
                method: 'GET',
                url: that.comicUrl + '/viewpoint/0/' + that.comic_id % 300 + '/' + that.comic_id + '/' + that.chapter_id + '.js?callback=success_jsonpCallback_201508281117&_=' + (new Date()).getTime(),
                onload: function (res) {
                    if (res.status !== 200) {
                        return;
                    }
                    if (!res.responseText) {
                        return;
                    }
                    var json = JSON.parse($.trim(res.responseText).replace(/\/\*\*\/success_jsonpCallback_201508281117\(/, '').replace(/\);/, ''));
                    var repoint = "";
                    if (json.result == 1000) {
                        for (var i = 0; i < json.data.list.length && i < 10; i++) {
                            if (json.data.total != "0") {
                                repoint += '<li><a href="javascript:;" class="c' + i + '" title="共有' + json.data.list[i].num + '赞同此吐槽(' + that.Percent(json.data.list[i].num, json.data.total) + ')" vote_id="' + json.data.list[i].id + '" >' + json.data.list[i].title + '</a></li>';
                            }
                        }
                        $(".allN").html("共有" + json.data.total + "人发表了吐槽，给喜欢的吐槽点个赞：");
                        $(".comic_gd_li").html(repoint);
                        $(".getcookie").append('<input name="length" type="hidden" value="' + json.data.list.length + '"/>');
                        if (json.data.list.length > 10) {
                            var moreHtml = '<li><input type="button" href="javascript:;" class="moreli" id="moreLi" value="更多" onclick="window.point.huPoint()"></li>';
                            $(".comic_gd_li").append(moreHtml);
                        }
                    } else {
                        $(".allN").html("共有0人发表了吐槽，给喜欢的吐槽点个赞：");
                        $(".comic_gd_li").html('<p id="tc">暂无吐槽，还不快来一发？</p>');
                    }
                }
            });
        },
        huPoint: function () {
            let that = this;
            GM_xmlhttpRequest({
                method: 'GET',
                url: that.comicUrl + '/api/viewpoint/getViewpoint?callback=success_jsonpCallback_201508281118&type=0&type_id=' + that.comic_id + '&chapter_id=' + that.chapter_id + '&more=1&_=' + (new Date()).getTime(),
                onload: function (res) {
                    if (res.status !== 200) {
                        return;
                    }
                    if (!res.responseText) {
                        return;
                    }
                    var JSONText = $.trim(res.responseText).replace(/success_jsonpCallback_201508281118\(/, '');
                    var json = JSON.parse(JSONText.substr(0, JSONText.length -1));
                    var html = '';
                    var j = 0;
                    if (json.result == 1000) {
                        for (var i = 0; i < json.data.list.length; i++) {
                            j = i > 9 ? 9 : i;
                            html += '<li><a href="javascript:;" class="c' + j + '" title="共有' + json.data.list[i].num + '赞同此吐槽(' + that.Percent(json.data.list[i].num, json.data.total) + ')" vote_id="' + json.data.list[i].id + '">' + json.data.list[i].title + '</a></li>';
                        }
                        $(".comic_gd_li").html(html);
                    } else {
                        alert("获取互动吐槽失败");
                    }
                }
            });
        },
        init: function (comic_id, chapter_id) {
            this.comic_id = comic_id;
            this.chapter_id = chapter_id;
            $("head").append(this.pointLink);
            $("#hd").html(this.pointHtml);
            this.getPoint();
        }
    };

    window.ajax_myScribe_json = function() {
        var url = "https://interface.dmzj.com/api/subscribe/getSubscribe";
        window.$.ajax({
            type: 'get',
            url: url,
            cache: false,
            dataType: 'jsonp',
            data: "type_id=0",
            timeout: 30000,
            success: function (res) {
                var html = '';
                if (!res) {
                    html = '<div class="no_content">你还没有订阅过作品哦</div>';
                    window.$("#scribe_more").hide();
                }
                else {
                    window.$("#scribe_more").show();
                    var json = res.slice(0, 8);
                    for (let i = 0; i < json.length; i++) {
                        var is_read = json[i].sub_readed === 0 ? '<span class="subcribe_new"></span>' : '';
                        html += '<li><span class="tip"></span>';
                        html += '<a class="book_title wid" title="' + json[i].sub_name + '" onclick="mark_read(' + json[i].sub_id + ",'" + json[i].sub_type + '\')" href="' + json[i].sub_id_url + '" target="_blank">' + json[i].sub_name + '</a>';
                        html += '';
                        html += '<a class="book_num" title="' + json[i].sub_update + '" onclick="mark_read(' + json[i].sub_id + ",'" + json[i].sub_type + '\')" href="' + json[i].sub_url + '?cid=' + json[i].sub_id + '" target="_blank">' + json[i].sub_update + '</a>';
                        html += is_read + '</li>';
                    }
                }
                window.$("#my_scribe_con").html(html);
            }
        });
    };

    window.insertInfo = function (userName) {//解决浏览器CORB机制所造成的script标签访问阻断
        var local_host = window.location.host;
        var local_domain = "http://" + window.document.domain + "/";
        var local_href = window.document.location.href;
        var mybookTxt = ((local_host == "donghua.dmzj.com") ? '我的动画' : '我的书架');
        var news_num = 0;
        var sub_num = 0;
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://user.dmzj.com/passport/message',
            onload: function (res) {
                if (res.status !== 200) {
                    return;
                }
                if (!res.responseText) {
                    return;
                }
                window.___json___ = JSON.parse($.trim(res.responseText).replace(/var ___json___=/, '').replace(/;/, ''));
                if (window.___json___.result == true) {
                    var data = window.___json___.data;
                    var message = data.total;
                    var subscribe = data.subscribe;
                    var i_url = window.i_url;
                    var reply = data.commentNotice != 0 ? '<li onclick="h_href()"><span>' + data.commentNotice + '</span>回复我的</li>' : '';
                    var messageStr = message != 0 ? '<li onclick="s_href()"><span>' + message + '</span>私信</li>' : '';
                    var systemNotice = data.systemNotice != 0 ? '<li onclick="sys_href()"><span>' + data.systemNotice + '</span>系统通知</li>' : '';
                    var icon_htm = '';
                    if (local_host == "www.dmzj.com" || local_host == "manhua.dmzj.com") {
                        if (data.cartoon > 0) {
                            icon_htm = '<span class="span_icon"></span>';
                        }
                    }
                    if (local_host == "donghua.dmzj.com") {
                        if (data.anim > 0) {
                            icon_htm = '<span class="span_icon"></span>';
                        }
                    }
                    if (local_host == "xs.dmzj.com") {
                        if (data.fiction > 0) {
                            icon_htm = '<span class="span_icon"></span>';
                        }
                    }
                    news_num = parseInt(message) + parseInt(data.commentNotice) + parseInt(data.systemNotice);
                    sub_num = subscribe;
                    var loginHtml = '<ul class="mainNav_dl" id="mainNavDl">';
                    loginHtml += '<li><span class="usr_im"></span><a target="_blank" href="' + i_url + '" title="" class="c_1">' + window.sS(userName, 4) + '</a>|</li>';
                    loginHtml += '<li id="quit"><a href="javascript:;" target="_self" onclick="userSubmit();" >退出</a>|</li>';
                    loginHtml += '<li class="position">';
                    if (news_num > 0) {
                        loginHtml += '<div class="messageLay lyshow">';
                    } else {
                        loginHtml += '<div class="messageLay">';
                    }
                    loginHtml += '<div class="top"></div><ul><span class="layclose" onclick="layClose()"></span>' + reply + messageStr + systemNotice + '</ul></div>';
                    loginHtml += '<a target="_blank" href="' + i_url + 'allMessage">消息<em class="c_2" id="u_mes">(' + news_num + ')</em></a>|';
                    loginHtml += '</li> <li><a target="_blank" href="' + i_url + 'subscribe">订阅<em class="c_2" id="u_crn">(' + sub_num + ')</em></a>|</li>';
                    loginHtml += '<li><a target="_blank" href="' + i_url + '">个人中心</a>|</li>';
                    loginHtml += '<li id="myBook">' + icon_htm + '<a target="_self" href="javaScript:;" class="c_1">' + mybookTxt + '</a></li></ul>';
                    $("#mainNav_in_r").html(loginHtml);
                    $("body").append(window.reauestHistory_html());
                    if (local_host == "www.dmzj.com" || local_host == "manhua.dmzj.com") {
                        if (local_domain == local_href) {
                            if (data.cartoon > 0) {
                                window.mybook_show();
                            }
                            window.clear_timeout = setTimeout(function(){window.bookopen_hide();}, 10000);
                        }
                    }
                    if (local_host == "donghua.dmzj.com") {
                        if (local_domain == local_href) {
                            if (data.anim > 0) {
                                window.mybook_show();
                            }
                            window.clear_timeout = setTimeout(function(){window.bookopen_hide();}, 10000);
                        }
                    }
                    if (local_host == "xs.dmzj.com") {
                        if (local_domain == local_href) {
                            if (data.fiction > 0) {
                                window.mybook_show();
                            }
                            window.clear_timeout = setTimeout(function(){window.bookopen_hide();}, 10000);
                        }
                    }
                }
            }
        });
    };

    let timer = setInterval(function () {
        if ($('#mainNav_in_r').length === 0) {
            return;
        }
        timer = window.clearInterval(timer);
        if ($('#mainNavDl').length > 0) {
            return;
        }
        window.UserCookie();
    }, 500);

    var params = '?channel=Android&version=2.6.004';

    if (window.location.host === 'i.dmzj.com') {
        let addCid = function () {
            if (window.location.hash === '#dh' || window.location.hash === '#xs') {
                return;
            }
            let int = setInterval(function () {
                if ($('div.dy_content_li').length === 0) {
                    return;
                }
                int = window.clearInterval(int);
                $('em.c_space a').each(function (i) {
                    let comic_id = $('a.qx:eq(' + i + ')').attr('value');
                    if (!!comic_id) {
                        this.href += ('?cid=' + comic_id);
                    }
                });
            }, 500);
            let inter = setInterval(function () {
                if ($('#page_id a').length === 0) {
                    return;
                }
                inter = window.clearInterval(inter);
                $('#page_id a').each(function () {
                    $(this).click(addCid);
                });
            }, 500);
        };
        $('.sub_type_id').click(addCid);
        $('#letter_id a').each(function () {
            $(this).click(addCid);
        });
        addCid();
        return;
    }

    if ((/^\/[^\/]+\/*$/).test(window.location.pathname)) {

        if (!window.g_comic_id) { return; }

        if ($('img[src="/css/img/4004.gif"]').length === 0) {
            $('div.cartoon_online_border li a,div.cartoon_online_border_other li a').each(function() {
                this.href += ('?cid=' + window.g_comic_id);
            });
            return;
        }

        $('div.middleright div.middleright_mr:eq(0) ul.cartoon_online_button').remove();
        $('div.middleright div.middleright_mr:eq(0) div.cartoon_online_border').remove();

        var pagenum = 160;

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://v2.api.dmzj.com/comic/' + window.g_comic_id + '.json' + params,
            onload: function(res) {

                if (res.status !== 200) { return; }

                var data = JSON.parse($.trim(res.responseText));

                if (!data || !data.chapters) { return; }

                var part = [];
                for (let x = 0; x < data.chapters.length; x++) {
                    var list = data.chapters[x].data.reverse(), ary = [], chapter, prefix;
                    for (let i = 0; i < list.length; i++) {
                        chapter = list[i];
                        prefix = ((x === 0 && (/^\d/).test(chapter.chapter_title)) ? '第' : '');
                        ary.push('<li><a title="' + window.g_comic_name + '-' + prefix + chapter.chapter_title + '" href="/' + window.g_comic_url + chapter.chapter_id + '.shtml?cid=' + window.g_comic_id + '"' + ((i === list.length - 1) ? ' class="color_red"' : '') + '>' + prefix + chapter.chapter_title + '</a></li>');
                    }

                    var border = [];
                    if (x === 0) {
                        var h2 = $('div.middleright div.middleright_mr:eq(0) div.photo_part:eq(0) h2:eq(0)');
                        h2.text(h2.text() + '全集');

                        var maxpage = Math.ceil(list.length / pagenum), button = [];
                        for (let i = 1; i <= maxpage; i++) {
                            button.push('<li class="t1 ' + ((i === maxpage) ? 'b1' : 'b2') + '" style="cursor: pointer;">第' + i + '页</li>');
                            border.push('<div class="cartoon_online_border"' + ((i === maxpage) ? '' : ' style="display:none"') + '><ul>' + ary.splice(0, pagenum).join('') + '</ul><div class="clearfix"></div></div>');
                        }

                        var $button = $('<ul class="cartoon_online_button margin_top_10px">' + button.join('') + '</ul>');
                        $button.children('li').each(function(i) {
                            $(this).click(function() {
                                $('.t1').addClass('b2');
                                $(this).removeClass('b2');
                                $(this).addClass('b1');
                                $(".cartoon_online_border").hide();
                                $(".cartoon_online_border").eq(i).show();
                            });
                        });

                        part.unshift($button);
                    }
                    else {
                        var photo_part = '<div class="photo_part" style="margin-top: 20px;"><div class="h2_title2"><span class="h2_icon h2_icon22"></span><h2>' + window.g_comic_name + ' 漫画其它版本：' + data.chapters[x].title + '</h2></div></div>';
                        border.push('<div class="cartoon_online_border_other" style="border-top: 1px dashed #0187c5;"><ul>' + ary.join('') + '</ul><div class="clearfix"></div></div>');
                        part.unshift(photo_part);
                    }

                    part.unshift(border.join(''));
                }

                for (let x = 0; x < part.length; x++) {
                    $('#last_read_history').after(part[x]);
                }
            }
        });
    }
    else if ((/^\/[^\/]+\/\d+\.shtml$/).test(window.location.pathname)) {

        if (!(/\?cid=[\d+]/).test(window.location.search)) { return; }

        if ($('title').text() !== '404 Not Found' && $('a.error-btn').length === 0) {
            let comic_id = window.location.search.match(/\d+/)[0],
                $prev = $('#prev_chapter'), $next = $('#next_chapter');
            if ($prev.length > 0) {
                $prev.get(0).href += ('?cid=' + comic_id);
            }
            if ($next.length > 0) {
                $next.get(0).href += ('?cid=' + comic_id);
            }
            return;
        }

        window.stop();

        $('head').empty();
        $('body').empty().hide();

        var option = {
            comic_id   : window.location.search.match(/\d+/)[0],
            chapter_id : window.location.pathname.match(/^\/[^\/]+\/(\d+)\.shtml$/)[1],
            comic_url  : window.location.pathname.split('/')[1]
        };

        if (!option.comic_id || !option.chapter_id || !option.comic_url) { return; }

        window.final_page_url = '/' + option.comic_url + '/jump.shtml?' + option.comic_id + '_' + option.chapter_id;

        var fin = 0,
            head = '<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>{{comic_name}}{{chapter_name}}-{{comic_name}}漫画-动漫之家漫画网</title><link href="/css/uploadstyle.css" type="text/css" rel="stylesheet"/><link href="/css/base.css" rel="stylesheet" type="text/css"/><link href="/css/display2010.css?tt=201309131753" rel="stylesheet" type="text/css"/><style>html, body, div, h1, h2, h3, h4, h5, h6, p, form, ul, li, dl, dt, dd, ol, table { font-family: "微软雅黑" }.filterimg { webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: grayscale(100%); filter: gray; }</style></head>',
            body = '<body><div class="display_graybg funcdiv" style="margin:0 auto;width:980px;margin:0 auto;height:30px;line-height:30px;border-bottom:1px #ccc solid;"><div><span class="red1_font12" style="float:left">&nbsp;功能选项：</span><span class="icon20" style="float:left"></span><a style="float:left; margin-right:15px; cursor:pointer" onclick="window.helper.qiehuan(this)"  target="_blank" class="red1_font12" id="qiehuan_txt">切换到上下滚动阅读</a><span style="font-size:14px;padding-left:5px; float:left" title="开启此功能后，超出浏览器宽度的图片将自动适应到浏览器宽度"><input type="checkbox" class="zoompic_chk" id="zoompic_chk1" style="float:left; margin:9px 5px 0 5px" checked="checked" value="zoom"/><label class="zoompic_label" style="cursor:pointer;" for="zoompic_chk1">大图自动缩小</label></span><span style="font-size:13px;" title="开启后彩色图片将过滤成黑白,暂不支持firefox浏览器,推荐使用chrome和360极速模式观看"><input type="checkbox" style="float:left; margin:9px 5px 0 5px" class="filter_chk" id="filter_chk" onclick="window.helper.filterImg(1)" value="filter"/><label class="filter_chk" style="cursor:pointer; float:left" for="filter_chk">黑白滤镜</label></span><span class="icon20" style="float:left"></span><a style="float:left" href="http://i.dmzj.com/subscribe#mh" target="_blank">管理我的订阅</a><a style="float:right; margin-right:5px;" href="http://bbs.dmzj.com/thread-946162-1-1.html" target="_blank" class="red1_font12">动漫之家漫画网使用说明</a></div></div><div class="clearfix"></div><div class="display_graybg"><div class="display_left">{{prev_chapter}}</div><div class="display_middle"><h1 class="hotrmtexth1"><a href="/{{comic_url}}/" title="{{comic_name}}" class="redhotl">{{comic_name}}</a></h1><span class="redhotl">{{chapter_name}}</span></div><div class="display_right">{{next_chapter}}</div></div><div class="clearfix"></div><div id="center_box" style="text-align:center"></div><div style="width:958px;margin:10px auto;text-align:left;border:1px solid #e6e6e6;padding:10px;font-family:\'微软雅黑\';" id="hd"></div><div class="clearfix"></div><div class="footer"><div class="mask_panel" id="transit_div" style="display:none "><div class="pop_grade"><div class="pop_bbsadmin" id="internal_div" style="display:none"><div class="pop_bbsadmin_top">提示信息</div><div class="pop_bbsadmin_mend"><div class="pop_bbsadmin_mend_back"><div class="pop_bbsadmin_choice2"><strong class="pop_grade_clew-icon"></strong><span style="color:#F3742F;">本章节已经浏览完毕，您可以：</span></div><div style="text-align:center"><input type="button" value="留在本页" style="margin-right:20px;" id="close_btn" class="part_collection_bnt"/><input type="button" value="浏览下一章节" style="margin-right:20px;" id="next_btn" class="part_collection_bnt"/><br/><div style="padding-top:10px;"><b><a href="#sns_cite_vote_list" id="go_sns_view_input">我要对本章节吐槽>></a></b></div></div></div></div><div class="pop_bbsadmin_foot"></div></div></div></div></div></body>';

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://v2.api.dmzj.com/comic/' + option.comic_id + '.json' + params,
            onload: function(res) {
                try {
                    if (res.status !== 200) { throw 'error'; }
                    if (res.responseText === '"Locked!"') { throw 'error'; }
                    var data = JSON.parse($.trim(res.responseText));
                    if (!data || !data.chapters) { throw 'error'; }
                    var reg_exp = new RegExp('{{comic_name}}', "g");
                    head = head.replace(reg_exp, data.title);
                    body = body.replace(reg_exp, data.title);
                    var prev = '', next = '', flag = 0;
                    for (let x = 0; x < data.chapters.length; x++) {
                        var list = data.chapters[x].data, len = list.length - 1;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].chapter_id == option.chapter_id) {
                                if (i > 0) {
                                    let nextItem = list[i-1];
                                    next = '下一话：<a id="next_chapter" href="' + nextItem.chapter_id + '.shtml?cid=' + option.comic_id + '">第' + nextItem.chapter_title + '</a>';
                                }
                                if (i < len) {
                                    let prevItem = list[i+1];
                                    prev = '上一话：<a id="prev_chapter" href="' + prevItem.chapter_id + '.shtml?cid=' + option.comic_id + '">第' + prevItem.chapter_title + '</a>';
                                }
                                body = body.replace('{{prev_chapter}}', prev);
                                body = body.replace('{{next_chapter}}', next);
                                flag = 1;
                                break;
                            }
                        }
                        if (flag == 1) { break; }
                    }
                    if (fin == 1) { window.helper.init(head, body, option.comic_id, option.chapter_id); }
                    fin = 1;
                } catch (e) {
                    if (fin == 1) { window.helper.init(head, body, option.comic_id, option.chapter_id); }
                    fin = 1;
                }
            }
        });

        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://v2.api.dmzj.com/chapter/' + option.comic_id + '/' + option.chapter_id + '.json' + params,
            onload: function(res) {
                try {
                    if (res.status !== 200) { return; }
                    if (res.responseText === '章节不存在') { return; }
                    var data = JSON.parse($.trim(res.responseText));
                    if (!data || !data.page_url) { return; }
                    option.chapter_name = data.title;
                    window.arr_pages = JSON.parse(JSON.stringify(data.page_url));
                    for (let x in option) {
                        let reg_exp = new RegExp('{{' + x + '}}', "g");
                        head = head.replace(reg_exp, option[x]);
                        body = body.replace(reg_exp, option[x]);
                    }
                    if (fin == 1) { window.helper.init(head, body, option.comic_id, option.chapter_id); }
                    fin = 1;
                } catch (e) {
                    if (fin == 1) { window.helper.init(head, body, option.comic_id, option.chapter_id); }
                    fin = 1;
                }
            }
        });
    }
})(window.unsafeWindow, window.$);