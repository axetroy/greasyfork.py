// ==UserScript==
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNTlBOEI1NDc1REExMUU2OTM4MkI1QjIwMkY4Nzg2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMEQ2QzQwMURCRjQxMUU4QUEwMkUxQkU3Q0REQTE2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMEQ2QzQwMERCRjQxMUU4QUEwMkUxQkU3Q0REQTE2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI2ODI5YTYzLWNmYTMtYWM0ZS04ZjBhLWIzMjJkOGJmMGZjMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTlBOEI1NDc1REExMUU2OTM4MkI1QjIwMkY4Nzg2MyIvPiA8L3Jk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
// @name         ZFDev-百度网盘 - 批量分享（独立链接）
// @namespace    https://zfdev.com/
// @version      0.1
// @description  选中多个文件，生成独立的链接。可设置自定义密码或随机密码。
// @author       greendev
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @grant        GM_addStyle
// ==/UserScript==

!function(t, e) {
    "use strict";
    let n = function() {
        //console.log.apply(console, arguments);
    };
    document.querySelector.bind(document);
    let a = e("system-core:context/context.js").instanceForSystem;
    document.addEventListener("DOMNodeInserted", function(o) {
        if ("create-link" == o.target.className) {
            GM_addStyle(`\n#batch-privatePasswordInput{\n    padding: 3px;\n    width: 40px;\n    height: 23px;\n    border: 1px solid #c6c6c6;\n    background-color: #fff;\n    box-shadow: 0 0 3px #c6c6c6;\n    -moz-box-shadow: 0 0 3px #c6c6c6;\n    -webkit-box-shadow: 0 0 3px #c6c6c6;\n    border: 1px solid #7faddc;\n    border-radius: 4px;\n    font-family: Consolas,Monaco,monospace;\n    font-size: 14px;\n\n}\n`);
            let o = '<li class="share-batch" _idx="3"><em class="icon icon-share-link"></em>\u5355\u72ec\u5206\u4eab</li>';
            t("#share .dialog-body .tab").append(o);
            let f = `\n<li class="share-batch" style="display: none;height: 300px;">\n\t<div class="create-link">\n\t\t<table class="validity-section" style="display: block;">\n\t\t\t<tbody>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class="first-child">\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\u5206\u4eab\u5f62\u5f0f\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<div class="share-method-line">\n\t\t\t\t\t\t\t<input type="radio" id="batch-share-method-random" name="batch-share-method" value="random"\n\t\t\t\t\t\t\tchecked="checked">\n\t\t\t\t\t\t\t<span class="icon radio-icon icon-radio-checked">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<label for="batch-share-method-random" style="color: rgb(139, 144, 158);">\n\t\t\t\t\t\t\t\t<b>\n\t\t\t\t\t\t\t\t\t\u968f\u673a\u63d0\u53d6\u7801\n\t\t\t\t\t\t\t\t</b>\n\t\t\t\t\t\t\t\t<div style="display:inline-block;position:relative;margin-right:10px;">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\u6bcf\u4e2a\u6587\u4ef6\u968f\u673a\u751f\u6210\u63d0\u53d6\u7801\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="share-method-line">\n\t\t\t\t\t\t\t<input type="radio" id="batch-share-method-fixed" name="batch-share-method" value="fixed"\n\t\t\t\t\t\t\tchecked="false">\n\t\t\t\t\t\t\t<span class="icon radio-icon icon-radio-non">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<label for="batch-share-method-fixed" style="color: rgb(139, 144, 158);">\n\t\t\t\t\t\t\t\t<b>\n\t\t\t\t\t\t\t\t\t\u56fa\u5b9a\u63d0\u53d6\u7801\n\t\t\t\t\t\t\t\t</b>\n\t\t\t\t\t\t\t\t<div style="display:inline-block;position:relative;margin-right:10px;">\n\t\t\t\t\t\t\t\t\t<input type="text" maxlength="4" id="batch-privatePasswordInput" spellcheck="false">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\u5168\u90e8\u4f7f\u7528\u540c\u4e00\u63d0\u53d6\u7801\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="share-method-line" style="color: rgb(139, 144, 158);">\n\t\t\t\t\t\t\t<input type="radio" id="batch-share-method-public" name="batch-share-method" value="public">\n\t\t\t\t\t\t\t<span class="icon icon-radio-non radio-icon">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<label for="batch-share-method-public">\n\t\t\t\t\t\t\t\t<b style="color: rgb(66, 78, 103);">\n\t\t\t\t\t\t\t\t\t\u65e0\u63d0\u53d6\u7801\n\t\t\t\t\t\t\t\t</b>\n\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\u65e0\u9700\u63d0\u53d6\u7801\uff0c\u4ec5\u62e5\u6709\u94fe\u63a5\u7684\u7528\u6237\u53ef\u4ee5\u67e5\u770b\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t<span class="share-public-tip" style="display: none;">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td class="first-child">\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\u6709\u6548\u671f\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td class="choose-panel">\n\t\t\t\t\t\t<button class="g-button g-button-large-gray choose-value">\n\t\t\t\t\t\t\t<span class="text">\n\t\t\t\t\t\t\t\t\u6c38\u4e45\u6709\u6548\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<em class="icon icon-dropdown-select">\n\t\t\t\t\t\t\t</em>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<ul class="choose-list" style="display: none;">\n\t\t\t\t\t\t\t<li class="choose-checked" value="0">\n\t\t\t\t\t\t\t\t<em>\n\t\t\t\t\t\t\t\t\t\u6c38\u4e45\u6709\u6548\n\t\t\t\t\t\t\t\t</em>\n\t\t\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t\t\t\ue932\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li value="7">\n\t\t\t\t\t\t\t\t<em>\n\t\t\t\t\t\t\t\t\t7\u5929\n\t\t\t\t\t\t\t\t</em>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li value="1">\n\t\t\t\t\t\t\t\t<em>\n\t\t\t\t\t\t\t\t\t1\u5929\n\t\t\t\t\t\t\t\t</em>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class="batch-share-list" style="\n\t\tdisplay: none;\n\t\tborder: 1px solid #cfcfd0;\n\t\tpadding: 3px 10px;\n\t\toverflow-y: scroll;\n\t\theight: 160px;\n        width: 200px;\n\t\t">\n\t\t\t<div class="left-side">\n\t\t\t\t<div class="contact-box">\n\t\t\t\t\t<div class="" style="display: block;">\n\t\t\t\t\t\t<ul class="tree-list" style="\n\t\t\t\t\t\t">\n\t\t\t\t\t\t\t<li data-customtag="mboxOfFriend" class="mboxOfFriend step-0 open">\n\t\t\t\t\t\t\t\t<ul style="display: block;">\n\t\t\t\t\t\t\t\t\t<li id="treeList-batch-share" class="step-1" style="cursor: unset;">\n\t\t\t\t\t\t\t\t\t\t<div class="label label-on">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="uinfo" title="pjpwork" style="padding-left: 0px;">\n\t\t\t\t\t\t\t\t\t\t\tpjpwork\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n    <div class="batch-share-textarea" style="display: inline;border: none;padding: 0;height: 166px;width: 250px;float: right;position: absolute;top: 10px;right: 20px;">\n\t    <textarea style="width: 100%;height: 100%;border: 1px solid rgb(207, 207, 208);"\n\t    readonly="">\n\t    </textarea>\n    </div>\n\t</div>\n</li>\n`;
            t("#share .dialog-body .content-bd .content-bd-left .content").append(f);
            let u = '<a href="javascript:;" class="g-button g-button-large g-button-blue-large create-batch" style="display: none;float: right; margin-left: 10px;"><span class="g-button-right"><span class="text">\u521b\u5efa\u94fe\u63a5</span></span></a>';
            function s() {
                t(".batch-share-list .tree-list > li > ul").html("");
                let e = a.getList().getCheckedItems();
                for (let a = 0; a < e.length; a++) {
                    let o = `\n<li id="treeList-${(n = e[a]).fs_id}" class="step-1" style="cursor: unset;">\n    <div class="label">\n    </div>\n    <div class="uinfo" title="${n.server_filename}" style="padding-left: 0px;">\n        ${n.server_filename}\n    </div>\n</li>\n`;
                    t(".batch-share-list .tree-list > li > ul").append(o);
                }
                var n;
            }
            function d() {
                return a.getList().getCheckedItems().length > 1;
            }
            function c(e) {
                t("#share .dialog-body .tab .share-batch").css("display", e ? "inline-block" : "none");
            }
            function l() {
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-list").css("display", "none"), 
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea").css("display", "none"), 
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section").css("display", "block"), 
                t("#share .dialog-body .content-bd .content-bd-left .footer .create-batch").css("display", "none"), 
                t("#batch-privatePasswordInput").val("zfzf"), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea textarea").val(""), 
                s(), c(d());
            }
            t("#share .dialog-body .content-bd .content-bd-left .footer").append(u), l();
            let g = !1;
            function i(e) {
                if (t("#share .dialog-body .tab li.current").removeClass("current"), e.addClass("current"), 
                e.hasClass("share-batch")) {
                    if (g) {
                        return;
                    }
                    g = !0, t("#share .dialog-body .content-bd .content > li").css("display", "none"), 
                    t("#share .dialog-body .content-bd .content > li").eq(parseInt(e.attr("_idx"))).css("display", "block"), 
                    t("#share .dialog-body .content-bd .footer > *").css("display", "none"), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-list").css("display", "none"), 
                    t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea").css("display", "none"), 
                    t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section").css("display", "block"), 
                    t("#share .dialog-body .content-bd .content-bd-left .footer .create-batch").css("display", "block"), 
                    t("#share .dialog-body .content-bd .content-bd-left .footer .close").css("display", "block"), 
                    t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea textarea").val(""), 
                    s(), c(d());
                } else {
                    l(), g && (t("#share .dialog-body .content-bd .content > li").css("display", "none"), 
                    t("#share .dialog-body .content-bd .content > li").eq(parseInt(e.attr("_idx"))).css("display", "block"), 
                    e.hasClass("share-link") ? t("#share .dialog-body div.content-bd-left > div.footer > a.create, #share .dialog-body div.content-bd-left > div.footer > a.close").css("display", "block") : t("#share .dialog-body div.content-bd-left > div.footer #share-verify, #share .dialog-body div.content-bd-left > div.footer .submit, #share .dialog-body div.content-bd-left > div.footer > a.close").css("display", "block")), 
                    g = !1;
                }
            }
            t("#share .dialog-body .tab li").click(function(e) {
                i(t(e.currentTarget)), n(e);
            }), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .share-method-line").click(function(e) {
                let n = t(e.currentTarget);
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .share-method-line .icon-radio-checked").removeClass("icon-radio-checked").addClass("icon-radio-non"), 
                t('#share .dialog-body .content-bd .content-bd-left .content .share-batch .share-method-line input[checked="checked"]').attr("checked", !1), 
                n.find(".radio-icon").removeClass("icon-radio-non").addClass("icon-radio-checked"), 
                n.find("input").attr("checked", !0);
            }), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel .choose-value").click(function() {
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel .choose-list").css("display", "block");
            }), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel li").click(function(e) {
                let n = t(e.currentTarget);
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel .choose-list .choose-checked").removeClass("choose-checked"), 
                n.addClass("choose-checked");
                let a = n.find("em").text();
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel .choose-value .text").text(a), 
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel .choose-list").css("display", "none");
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel li span.icon").remove(), 
                n.append('<span class="icon">&#xe932;</span>');
            });
            var r = function() {
                var t = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], e = function(t, e) {
                    return Math.round((e - t) * Math.random() + t);
                };
                return function(n) {
                    for (var a = [], o = 1; n >= o; o++) {
                        a.push(t[e(0, t.length - 1)]);
                    }
                    return a.join("");
                }(4);
            };
            function h() {
                let e = t('#share .dialog-body .content-bd .content-bd-left .content .share-batch .share-method-line input[checked="checked"]').val();
                return n("mode:", e), "random" === e ? r() : "fixed" === e ? t("#batch-privatePasswordInput").val() : "";
            }
            function b(e, n, a, o) {
                return new Promise(function(s, d) {
                    let c, l;
                    n ? (c = "/share/set", l = "schannel=4&channel_list=%5B%5D&period=" + a + "&pwd=" + n + "&fid_list=%5B" + e.fs_id + "%5D") : (c = "/share/pset", 
                    l = "schannel=0&channel_list=%5B%5D&period=" + a + "&path_list=" + encodeURIComponent('["' + e.path + '"]')), 
                    t.ajax({
                        type: "POST",
                        url: c,
                        data: l
                    }).then(t => {
                        t && 0 === t.errno ? s({
                            res: t,
                            item: e,
                            pwd: n,
                            period: a,
                            index: o
                        }) : d({
                            res: t,
                            item: e,
                            pwd: n,
                            period: a,
                            index: o
                        });
                    }, t => {
                        d({
                            res: t,
                            item: e,
                            pwd: n,
                            period: a,
                            index: o
                        });
                    });
                });
            }
            function p(e) {
                let n = "";
                e.sort((t, e) => t.index - e.index);
                for (let t = 0; t < e.length; t++) {
                    n += e[t].item.server_filename + "\n", e[t].success ? (n += e[t].res.link, e[t].pwd && (n += " \u63d0\u53d6\u7801: " + e[t].pwd), 
                    n += "\n") : n += "\u5206\u4eab\u5931\u8d25\n", n += "\n";
                }
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea textarea").val(n);
            }
            t("#share .dialog-body .content-bd .content-bd-left .footer .create-batch").click(function() {
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section").css("display", "none"), 
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-list").css("display", "block"), 
                t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-textarea").css("display", "block"), 
                t("#share .dialog-body .content-bd .content-bd-left .footer .create-batch").css("display", "none");
                let e = a.getList().getCheckedItems(), n = 0, o = [];
                for (let a = 0; a < e.length; a++) {
                    b(e[a], h(), t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .validity-section .choose-panel li.choose-checked").attr("value"), a).then(function(a) {
                        n++;
                        let s = a.res, d = a.item;
                        t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-list").find("#treeList-" + d.fs_id).find(".label").addClass("label-on"), 
                        o.push({
                            success: !0,
                            item: d,
                            res: s,
                            pwd: a.pwd,
                            period: a.period,
                            index: a.index
                        }), n === e.length && p(o);
                    }, function(a) {
                        n++;
                        let s = a.res, d = a.item;
                        t("#share .dialog-body .content-bd .content-bd-left .content .share-batch .batch-share-list").find("#treeList-" + d.fs_id).find(".label").addClass("label-dis"), 
                        o.push({
                            success: !1,
                            item: d,
                            res: s,
                            pwd: a.pwd,
                            period: a.period
                        }), n === e.length && p(o);
                    });
                }
            });
            var y = e("function-widget-1:share/util/shareFriend/createLinkShare.js");
            y.prototype.oldinitValidityBatchShare = y.prototype.initValidity, y.prototype.initValidity = function() {
                this.oldinitValidityBatchShare(), l(), i(t("#share .dialog-body .tab .share-link"));
            };
        }
    });
}($, require);