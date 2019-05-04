// ==UserScript==
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNTlBOEI1NDc1REExMUU2OTM4MkI1QjIwMkY4Nzg2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMEQ2QzQwMURCRjQxMUU4QUEwMkUxQkU3Q0REQTE2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMEQ2QzQwMERCRjQxMUU4QUEwMkUxQkU3Q0REQTE2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI2ODI5YTYzLWNmYTMtYWM0ZS04ZjBhLWIzMjJkOGJmMGZjMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTlBOEI1NDc1REExMUU2OTM4MkI1QjIwMkY4Nzg2MyIvPiA8L3Jk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
// @name         ZFDev-最强百度网盘-生成文件树
// @namespace    https://zfdev.com/
// @version      0.5
// @description  百度网盘中生成所在目录的文件树txt文件, 并保存到网盘.
// @author       greendev
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @run-at       document-idle
// @grant        GM_addStyle
// @noframes
// ==/UserScript==




!function() {
    "use strict";
    String.prototype.MD5 = function(A) {
        function e(A, e) {
            return A << e | A >>> 32 - e;
        }
        function t(A, e) {
            var t, i, n, a, l;
            if (n = 2147483648 & A, a = 2147483648 & e, l = (1073741823 & A) + (1073741823 & e), 
            (t = 1073741824 & A) & (i = 1073741824 & e)) {
                return 2147483648 ^ l ^ n ^ a;
            }
            return t | i ? 1073741824 & l ? 3221225472 ^ l ^ n ^ a : 1073741824 ^ l ^ n ^ a : l ^ n ^ a;
        }
        function i(A, e, t) {
            return A & e | ~A & t;
        }
        function n(A, e, t) {
            return A & t | e & ~t;
        }
        function a(A, e, t) {
            return A ^ e ^ t;
        }
        function l(A, e, t) {
            return e ^ (A | ~t);
        }
        function r(A, n, a, l, r, o, s) {
            return t(e(A = t(A, t(t(i(n, a, l), r), s)), o), n);
        }
        function o(A, i, a, l, r, o, s) {
            return t(e(A = t(A, t(t(n(i, a, l), r), s)), o), i);
        }
        function s(A, i, n, l, r, o, s) {
            return t(e(A = t(A, t(t(a(i, n, l), r), s)), o), i);
        }
        function d(A, i, n, a, r, o, s) {
            return t(e(A = t(A, t(t(l(i, n, a), r), s)), o), i);
        }
        function c(A) {
            var e, t = "", i = "";
            for (e = 0; e <= 3; e++) {
                t += (i = "0" + (A >>> 8 * e & 255).toString(16)).substr(i.length - 2, 2);
            }
            return t;
        }
        var u, f, p, b, g, h, m, v, y, B = Array(), w = 7, x = 12, Q = 17, z = 22, k = 5, G = 9, C = 14, _ = 20, U = 4, I = 11, E = 16, Z = 23, M = 6, Y = 10, H = 15, D = 21;
        for (B = function R(A) {
            for (var e, t = A.length, i = t + 8, n = 16 * ((i - i % 64) / 64 + 1), a = Array(n - 1), l = 0, r = 0; r < t; ) {
                l = r % 4 * 8, a[e = (r - r % 4) / 4] = a[e] | A.charCodeAt(r) << l, r++;
            }
            return l = r % 4 * 8, a[e = (r - r % 4) / 4] = a[e] | 128 << l, a[n - 2] = t << 3, 
            a[n - 1] = t >>> 29, a;
        }(this), h = 1732584193, m = 4023233417, v = 2562383102, y = 271733878, u = 0; u < B.length; u += 16) {
            f = h, p = m, b = v, g = y, m = d(m = d(m = d(m = d(m = s(m = s(m = s(m = s(m = o(m = o(m = o(m = o(m = r(m = r(m = r(m = r(m, v = r(v, y = r(y, h = r(h, m, v, y, B[u + 0], w, 3614090360), m, v, B[u + 1], x, 3905402710), h, m, B[u + 2], Q, 606105819), y, h, B[u + 3], z, 3250441966), v = r(v, y = r(y, h = r(h, m, v, y, B[u + 4], w, 4118548399), m, v, B[u + 5], x, 1200080426), h, m, B[u + 6], Q, 2821735955), y, h, B[u + 7], z, 4249261313), v = r(v, y = r(y, h = r(h, m, v, y, B[u + 8], w, 1770035416), m, v, B[u + 9], x, 2336552879), h, m, B[u + 10], Q, 4294925233), y, h, B[u + 11], z, 2304563134), v = r(v, y = r(y, h = r(h, m, v, y, B[u + 12], w, 1804603682), m, v, B[u + 13], x, 4254626195), h, m, B[u + 14], Q, 2792965006), y, h, B[u + 15], z, 1236535329), v = o(v, y = o(y, h = o(h, m, v, y, B[u + 1], k, 4129170786), m, v, B[u + 6], G, 3225465664), h, m, B[u + 11], C, 643717713), y, h, B[u + 0], _, 3921069994), v = o(v, y = o(y, h = o(h, m, v, y, B[u + 5], k, 3593408605), m, v, B[u + 10], G, 38016083), h, m, B[u + 15], C, 3634488961), y, h, B[u + 4], _, 3889429448), v = o(v, y = o(y, h = o(h, m, v, y, B[u + 9], k, 568446438), m, v, B[u + 14], G, 3275163606), h, m, B[u + 3], C, 4107603335), y, h, B[u + 8], _, 1163531501), v = o(v, y = o(y, h = o(h, m, v, y, B[u + 13], k, 2850285829), m, v, B[u + 2], G, 4243563512), h, m, B[u + 7], C, 1735328473), y, h, B[u + 12], _, 2368359562), v = s(v, y = s(y, h = s(h, m, v, y, B[u + 5], U, 4294588738), m, v, B[u + 8], I, 2272392833), h, m, B[u + 11], E, 1839030562), y, h, B[u + 14], Z, 4259657740), v = s(v, y = s(y, h = s(h, m, v, y, B[u + 1], U, 2763975236), m, v, B[u + 4], I, 1272893353), h, m, B[u + 7], E, 4139469664), y, h, B[u + 10], Z, 3200236656), v = s(v, y = s(y, h = s(h, m, v, y, B[u + 13], U, 681279174), m, v, B[u + 0], I, 3936430074), h, m, B[u + 3], E, 3572445317), y, h, B[u + 6], Z, 76029189), v = s(v, y = s(y, h = s(h, m, v, y, B[u + 9], U, 3654602809), m, v, B[u + 12], I, 3873151461), h, m, B[u + 15], E, 530742520), y, h, B[u + 2], Z, 3299628645), v = d(v, y = d(y, h = d(h, m, v, y, B[u + 0], M, 4096336452), m, v, B[u + 7], Y, 1126891415), h, m, B[u + 14], H, 2878612391), y, h, B[u + 5], D, 4237533241), v = d(v, y = d(y, h = d(h, m, v, y, B[u + 12], M, 1700485571), m, v, B[u + 3], Y, 2399980690), h, m, B[u + 10], H, 4293915773), y, h, B[u + 1], D, 2240044497), v = d(v, y = d(y, h = d(h, m, v, y, B[u + 8], M, 1873313359), m, v, B[u + 15], Y, 4264355552), h, m, B[u + 6], H, 2734768916), y, h, B[u + 13], D, 1309151649), v = d(v, y = d(y, h = d(h, m, v, y, B[u + 4], M, 4149444226), m, v, B[u + 11], Y, 3174756917), h, m, B[u + 2], H, 718787259), y, h, B[u + 9], D, 3951481745), 
            h = t(h, f), m = t(m, p), v = t(v, b), y = t(y, g);
        }
        return 32 == A ? c(h) + c(m) + c(v) + c(y) : c(m) + c(v);
    };
    let A = {
        css: '@font-face{font-family:"iconfont-zfdev-filetree";src:url(data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fUhsAAABfAAAAFZjbWFws/QcPQAAAeQAAAGcZ2x5ZqQfxqgAAAOMAAABjGhlYWQTLAKJAAAA4AAAADZoaGVhB94DhQAAALwAAAAkaG10eBAAAAAAAAHUAAAAEGxvY2EBAgCUAAADgAAAAAptYXhwARcARQAAARgAAAAgbmFtZYx+aQAAAAUYAAADIXBvc3QPWfb4AAAIPAAAAEoAAQAAA4D/gABcBAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAQAAQAAAAEAAEEtmIxfDzz1AAsEAAAAAADYBl9GAAAAANgGX0YAAP+ABAADgAAAAAgAAgAAAAAAAAABAAAABAA5AAkAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQQAAZAABQAIAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5gfmegOA/4AAXAOAAIAAAAABAAAAAAAABAAAAAQAAAAEAAAABAAAAAAAAAUAAAADAAAALAAAAAQAAAFoAAEAAAAAAGIAAwABAAAALAADAAoAAAFoAAQANgAAAAgACAACAADmB+Yx5nr//wAA5gfmMeZ6//8AAAAAAAAAAQAIAAgACAAAAAMAAQACAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAA0AAAAAAAAAAMAAOYHAADmBwAAAAMAAOYxAADmMQAAAAEAAOZ6AADmegAAAAIAAAAAADwAlADGAAAAAgAA/4wD9AN0AAsAHgAAAQYABxYAFzYANyYAEwEHBiIvAiY0NjIfAQE2MhYUAgDU/uUFBQEb1NQBGwUF/uU+/rYEChsKA6QJExoKkQE3ChoTA3QF/uXU1P7lBQUBG9TUARv+of62BAoKBKQKGhMJkQE3ChQaAAAACQAA/5QD1gM8ABUAGgAeACMAJwAsADAANAA4AAABFSM1MzUjNSMRIRUzNSMVIzUzFTM1Ex0BITUHITUhBR0BITUHITUhBR0BITUHITUhARUhNQchNSEB1urq6iQBDgIC6uoCEQHsJP5cAaT+OAHsJP5cAaT+OAHsJP5cAaT8cQHSOf6eAWIBDyvMJJ/9WCt7LNArewEMNmSaajrMNmSaajrANmSaajoDPdLSrIkAAAACAAD/gAQAA4AACwAXAAABHgEXDgEHLgEnPgE3BgAHFgAXNgA3JgACAL79BQX9vr79BQX9vtr+3wUFASHa2gEhBQX+3wNABf2+vv0FBf2+vv1FBf7f2tr+3wUFASHa2gEhAAAAAAASAN4AAQAAAAAAAAAVAAAAAQAAAAAAAQAXABUAAQAAAAAAAgAHACwAAQAAAAAAAwAXADMAAQAAAAAABAAXAEoAAQAAAAAABQALAGEAAQAAAAAABgAXAGwAAQAAAAAACgArAIMAAQAAAAAACwATAK4AAwABBAkAAAAqAMEAAwABBAkAAQAuAOsAAwABBAkAAgAOARkAAwABBAkAAwAuAScAAwABBAkABAAuAVUAAwABBAkABQAWAYMAAwABBAkABgAuAZkAAwABBAkACgBWAccAAwABBAkACwAmAh0KQ3JlYXRlZCBieSBpY29uZm9udAppY29uZm9udC16ZmRldi1maWxldHJlZVJlZ3VsYXJpY29uZm9udC16ZmRldi1maWxldHJlZWljb25mb250LXpmZGV2LWZpbGV0cmVlVmVyc2lvbiAxLjBpY29uZm9udC16ZmRldi1maWxldHJlZUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAGkAYwBvAG4AZgBvAG4AdAAtAHoAZgBkAGUAdgAtAGYAaQBsAGUAdAByAGUAZQBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHoAZgBkAGUAdgAtAGYAaQBsAGUAdAByAGUAZQBpAGMAbwBuAGYAbwBuAHQALQB6AGYAZABlAHYALQBmAGkAbABlAHQAcgBlAGUAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHoAZgBkAGUAdgAtAGYAaQBsAGUAdAByAGUAZQBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQIBAwEEAQUACXh1YW56aG9uZwdzaHV4aW5nCnVuc2VsZWN0ZWQAAAAA) format("truetype");font-weight:normal;font-style:normal;}.iconfont-zfdev-filetree{font-family:"iconfont-zfdev-filetree" !important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;}.icon-shuxing:before{content:"\\e67a";}.icon-xuanzhong:before{content:"\\e631";}.icon-unselected:before{content:"\\e607";}.dialog-zfdev_dialog_file_tree table td:nth-child(1){width:30%;text-align:right;}.dialog-zfdev_dialog_file_tree table td:nth-child(2){width:70%;display:flex;padding:10px;}.dialog-zfdev_dialog_file_tree span[id^="zfdev-file-tree-"]{height:17px;padding:2px;width:17px;display:block;cursor:pointer;}.dialog-zfdev_dialog_file_tree span[id^="zfdev-file-tree-"] i{position:fixed;display:flex;font-size:19px;color:#3b8cff;}.dialog-zfdev_dialog_file_tree input#zfdev-file-tree-level{padding:3px;height:23px;border:1px solid #c6c6c6;background-color:#fff;box-shadow:0 0 3px #c6c6c6;-moz-box-shadow:0 0 3px #c6c6c6;-webkit-box-shadow:0 0 3px #c6c6c6;border:1px solid #7faddc;border-radius:4px;max-width:50px;}',
        empty: "",
        a: "zfdev_tree.txt",
        b: "b35c365",
        c: "disk-system:widget/plugin/uploader/uploadUtil/webUploader.js",
        d: "system-core:system/uiService/tip/tip.js",
        e: "disk-system:widget/plugin/uploader/dialog/dialog.js",
        e2: "base:widget/clipboard/myClipboard.js",
        f: "system-core:system/uiService/dialog/dialog.js",
        g: "system-core:system/uiService/list/list.js",
        h: "[",
        i: "┃┣━┗",
        j: "]",
        k: "g",
        l: " ",
        m: "text/plain",
        n: "/",
        o: "#web-uploader",
        p: "none",
        q: "(?:^|\\?|#|&)",
        q2: "(?:^|\\?|#|&|/)",
        r: "=([^&#]*)(?:$|&|#)",
        s: "i",
        t: "B",
        u: "K",
        v: "M",
        w: "G",
        x: ".",
        y: "0",
        z: "KB",
        aa: "T",
        ab: "path",
        ac: "/api/list?order=name&desc=0&showempty=0&web=1&page=1&num=2000&dir=",
        ad: "get",
        ae: "目录：", // 如果不想开头显示, 可以改为 ""
        af: "\r\n",
        ag: "┃",
        ah: "┣━━",
        ai: "┗━━",
        aj: "#zfdev_file_tree_btn",
        aj2: "#share-zfdev-filetree-btn",
        ak: "g-disabled",
        al: "loading",
        am: "生成成功！正在保存到网盘&hellip;",
        am2: "生成成功！",
        an: "获取失败",
        ao: "failure",
        ap: "初始化失败，请刷新后稍等片刻!",
        aq: "当前目录为空!",
        ar: "正在生成文件树，请勿刷新&hellip;",
        as: "#zfdev-file-tree-queue",
        at: "true",
        au: '<a id="zfdev_file_tree_btn" class="g-button g-button-file-tree"href="javascript:;" title="生成文件树" style="display: inline-block;"><span class="g-button-right"><em class="iconfont-zfdev-filetree icon-shuxing" title="生成文件树"></em><span class="text" style="width: auto;">生成文件树</span></span></a>',
        au2: '<a class="g-button" data-button-id="zfdev-filetree" id="share-zfdev-filetree-btn" data-button-index="2" href="javascript:;" title="生成文件树"><span class="g-button-right"><em class="iconfont-zfdev-filetree icon-shuxing" title="生成文件树"></em><span class="text" style="width: auto;">生成文件树</span></span></a>',
        av: '.tcuLAu a[title="新建文件夹"]',
        aw: ".OFaPaO",
        ax: "999",
        ay: "zfdev_dialog_file_tree",
        az: "确认生成文件树",
        ba: "460px",
        bb: '<div style="padding:40px 22px 22px 22px;"><div style="border:1px solid #0000ff21;border-radius:15px;padding:20px 10px;border-collapse:unset;"><table style="width:100%;"><thead style=""><tr><td style="font-size:18px;"><b>选择模式</b></td></tr></thead><tbody><tr><td>默认</td><td><span value="true" id="zfdev-file-tree-queue"><i style="display: block;" class="iconfont-zfdev-filetree icon-xuanzhong"></i><i class="iconfont-zfdev-filetree icon-unselected" style="display: none;"></i></span>（推荐）</td></tr><tr><td>快速</td><td><span value="false" id="zfdev-file-tree-unlimited"><i style="display: none;" class="iconfont-zfdev-filetree icon-xuanzhong"></i><i class="iconfont-zfdev-filetree icon-unselected" style="display: block;"></i></span>（请勿频繁使用）</td></tr></tbody></table><table style="width:100%;"><thead style=""><tr><td style="font-size:18px;"><b>其他选项</b></td></tr></thead><tbody><tr><td>显示文件大小</td><td><span value="true" id="zfdev-file-tree-show-size"><i style="" class="iconfont-zfdev-filetree icon-xuanzhong"></i><i class="iconfont-zfdev-filetree icon-unselected" style="display:block;"></i></span></td></tr><tr><td>生成目录层次</td><td><input type="text" id="zfdev-file-tree-level" value="0" onkeyup="value=value.replace(/[^\\d]/g,\'\')"><span style="padding-left:10px;">（0：获取全部）</span></td></tr></tbody></table></div><br>注：此操作可能需要较长时间</div>',
        bc: "center",
        bd: "confirm",
        be: "确定",
        bf: "big",
        bg: "blue",
        bh: "50px",
        bi: "cancel",
        bj: "取消",
        bk: "block",
        bl: "none",
        bm: "zfdev-file-tree-queue",
        bn: "zfdev-file-tree-unlimited",
        bo: "#",
        bp: ",",
        bq: "#/all",
        br: "#layoutMain #zfdev_file_tree_btn",
        bs: "inline-block",
        bt: "none",
        bu: "DOMNodeInserted",
        bv: "dialog-web-uploader",
        bw: "/api/dirsize",
        bx: "/api/taskquery?taskid=",
        by: "running",
        bz: "pending",
        ca: "success",
        cb: " [",
        cc: "]",
        cd: "#zfdev-file-tree-level",
        cf: "生成层数输入错误！",
        cg: "#zfdev-file-tree-show-size",
        ch: "false",
        ci: '<div style="padding: 0 20px 0 0;"><textarea id="dialog-zfdev_dialog_file_tree_result_textarea" readonly style="min-height: 350px;line-height: 15px;padding: 4px 10px 4px 14px;overflow-wrap: normal;white-space: pre;overflow: scroll;min-width: 580px;max-width: 580px;margin: 0px;"></textarea></div>',
        cj: "ZFDev - 目录树",
        ck: "复制",
        cl: "复制成功",
        cm: "600px",
        cn: "dialog-zfdev_dialog_file_tree_result_textarea",
        co: "关闭",
        cp: "copy",
        cq: "error",
        cr: "caution",
        cs: "您的浏览器不支持自动复制，请选中后点击右键进行复制。",
        ct: "zfdev_dialog_file_tree_result",
        cu: "未能判断当前页面类型",
        cv: "|",
        cw: '#zfdev_dialog_file_tree_result .g-button[title="复制"]',
        cx: "#bd-main .module-share-header .slide-show-right .x-button-box",
        cy: "/disk/home",
        cz: "/s/",
        post: "POST",
        get: "GET"
    };
    GM_addStyle(A.css);
    let e, t, i = function() {}, n = 0, a = {}, l = !1, r = document.querySelector.bind(document), o = {};
    const s = new RegExp().compile(/(^[\d]*)/), d = A.a, c = A.b;
    function u(e, t) {
        if (e.isdir === t.isdir) {
            let i = e.name.match(s)[1], n = t.name.match(s)[1];
            return i === A.empty ? (e.name + A.empty).localeCompare(t.name + A.empty) : parseInt(i) - parseInt(n);
        }
        return e.isdir ? -1 : 1;
    }
    function f() {
        try {
            return (a = {
                webupload: require(A.c),
                tip: require(A.d),
                d: require(A.e),
                dl: require(A.f),
                list: require(A.g)
            }).uploader = new a.webupload(), a.uploader.initUploaderCore(), a.list.prototype.zfdev_tree_cc = a.list.prototype.checkedChanged, 
            a.list.prototype.checkedChanged = function() {
                this.zfdev_tree_cc();
                try {
                    E();
                } catch (A) {}
            }, l = !0, !0;
        } catch (A) {
            return l = !1, !1;
        }
    }
    function p() {
        try {
            return a = {
                tip: require(A.d),
                c: require(A.e2),
                dl: require(A.f)
            }, l = !0, !0;
        } catch (A) {
            return l = !1, !1;
        }
    }
    let b;
    function g(e) {
        let i = !1;
        t || (t = new a.dl({
            id: A.ct,
            title: A.cj,
            width: A.cm,
            body: A.ci,
            draggable: !0,
            position: {
                xy: A.bc
            },
            buttons: [ {
                buttonId: A.cp,
                name: A.bd,
                title: A.ck,
                type: A.bf,
                color: A.bg,
                padding: [ A.bh, A.bh ],
                click: function() {
                    i = !1;
                }
            }, {
                name: A.bi,
                title: A.co,
                type: A.bf,
                padding: [ A.bh, A.bh ],
                click: function() {
                    t.hide();
                }
            } ],
            afterHide: function() {}
        })), function n() {
            b || (b = new a.c($(A.cw))), b.setText(e), b.on(A.ca, function() {
                i || (i = !0, a.tip.show({
                    mode: A.ca,
                    msg: A.cl,
                    autoClose: !1,
                    hasClose: !0
                }));
            }), b.on(A.cq, function() {
                i || a.tip.show({
                    mode: A.cr,
                    msg: A.cs,
                    autoClose: !1,
                    hasClose: !0
                });
            });
        }(), $(A.bo + A.cn).val(e), t.show();
    }
    function h(e, t, i) {
        return new Promise(function() {
            e.MD5().indexOf(c) < 0 && (i = i.replace(new RegExp(A.h + A.i + A.j, A.k), A.l.repeat(2)));
            let n = new Blob([ i ], {
                type: A.m
            }), l = new File([ n ], e, {
                type: A.m
            });
            l.path = t + A.n + e, l.server_path = t, l.status = -1, a.uploader.uploaderCore.fileQueue.length = 0, 
            a.uploader.uploaderCore.uploadIndex = 0, a.uploader.uploaderCore.fileQueue.push(l), 
            a.uploader.onAddFiles(l, [ l ]), a.d.get().clearQueue(), document.querySelector(A.o).style.display = A.p, 
            setTimeout(function() {
                a.d.get().systemRefresh();
            }, 1e3);
        });
    }
    function m(e, t, i) {
        return new Promise(function() {
            e.MD5().indexOf(c) < 0 && (i = i.replace(new RegExp(A.h + A.i + A.j, A.k), A.l.repeat(2))), 
            g(i);
        });
    }
    let v = function(e, t) {
        let i;
        switch (n) {
          case 2:
            i = new RegExp(A.q2 + e + A.r, A.s);
            break;

          case 1:
          default:
            i = new RegExp(A.q + e + A.r, A.s);
        }
        let a = i.exec(t || location.href);
        return a ? encodeURI(a[1]) : A.empty;
    };
    function y(e) {
        let t = A.empty, i = 1, n = (t = e < Math.pow(1024, 1) ? e.toFixed(i) + A.t : e < Math.pow(1024, 2) ? (e / Math.pow(1024, 1)).toFixed(i) + A.u : e < Math.pow(1024, 3) ? (e / Math.pow(1024, 2)).toFixed(i) + A.v : (e / Math.pow(1024, 3)).toFixed(i) + A.w) + A.empty, a = n.indexOf(A.x);
        if (n.substr(a + 1, i) === A.y) {
            return n.substring(0, a) + n.substr(a + i + 1, 2);
        }
        return n;
    }
    let B = function(e) {
        return new Promise(function(t, i) {
            let a = A.empty;
            switch (n) {
              case 2:
                e = encodeURIComponent(e), a = `/share/list?uk=${yunData.SHARE_UK}&shareid=${yunData.SHARE_ID}&page=1&num=1000&dir=${e}`;
                break;

              case 1:
                a = A.ac + encodeURIComponent(e);
                break;

              default:
                return void i(!1);
            }
            $.ajax({
                type: A.ad,
                url: a,
                cache: !1,
                async: !0,
                success: function(A) {
                    t(A);
                },
                failure: function() {
                    i(!1);
                },
                error: function() {
                    i(!1);
                }
            });
        });
    };
    function w(A) {
        let e = 0;
        for (let t = 0; t < A.length; t++) {
            A[t].isdir && A[t].list ? e += w(A[t].list) : e += A[t].size;
        }
        return e;
    }
    let x = function(e, t, i = [], n = A.empty, a) {
        let l = A.empty;
        if (!t || 0 === t.length) {
            return A.empty;
        }
        return 1 === t[0].level && (l += A.ae + e.substring(e.lastIndexOf(A.n)) + (a && n ? A.cb + n + A.cc : A.empty) + A.af), 
        t.forEach(function(r, o) {
            if (l += A.l.repeat(6), i.forEach(function(e) {
                l += e ? A.l.repeat(6) : A.ag + A.l.repeat(4);
            }), r.level && (o < t.length - 1 ? l += A.ah : l += A.ai), l += r.name, a && r.isdir && r.list) {
                let e = w(r.list);
                l += A.cb + y(e) + A.cc;
            }
            if (l += A.af, r.isdir) {
                let s = i.slice();
                s.push(o === t.length - 1), l += x(e + A.n + r.name, r.list, s, n, a);
            }
        }), l;
    };
    function Q(e, t, i = A.empty, l, s) {
        let c, u, f;
        switch (n) {
          case 2:
            c = A.aj2, u = A.am2, f = A.ca;
            break;

          case 1:
            c = A.aj, u = A.am, f = A.al;
            break;

          default:
            c = A.aj, u = A.am2, f = A.ca;
        }
        r(c).classList.remove(A.ak);
        let p = x(t, e, [], i, l);
        switch (a.tip.show({
            mode: f,
            msg: u,
            autoClose: !0
        }), n) {
          case 2:
            m(d, 0, p);
            break;

          case 1:
            h(d, t, p);
            break;

          default:
            throw A.cu;
        }
        let b = t + A.cv + s;
        o.hasOwnProperty(b) || (o[b] = e);
    }
    function z(e, t, i, n) {
        let a = A.empty;
        if (i) {
            a = y(w(e));
        }
        Q(e, t, a, i, n);
    }
    let k = 0, G = function(e, t, i) {
        return new Promise(function() {
            for (let n = 0; n < e.length; n++) {
                e[n].isdir && (0 === t || e[n].level < t) ? (k++, B(e[n].path).then(a => {
                    let l;
                    0 === a.errno ? (k++, l = a.list.map(function(A) {
                        return {
                            path: A.path,
                            name: A.server_filename,
                            isdir: A.isdir,
                            size: A.size,
                            level: e[n].level + 1
                        };
                    }).sort(u), G(l, t, i)) : l = [ {
                        path: A.an,
                        isdir: !1,
                        size: 0,
                        level: e[n].level + 1
                    } ], e[n].list = l, k--;
                }).catch(() => {
                    k--;
                })) : !e[n].isdir && i && (e[n].name += A.cb + y(e[n].size) + A.cc);
            }
            k--;
        });
    };
    function C(A, e, t, i) {
        k = 1, G(A, t, i);
        let n = setInterval(function() {
            k <= 0 && (clearInterval(n), z(A, e, i, t));
        }, 1e3);
    }
    let _ = function(e, t, n) {
        return new Promise(function(a) {
            if (0 === e.length) {
                return void a(!0);
            }
            let l = e.shift();
            return l.isdir && (0 === t || l.level < t) ? void B(l.path).then(r => {
                let o;
                return o = r && 0 === r.errno ? r.list.map(function(A) {
                    let t = {
                        path: A.path,
                        name: A.server_filename,
                        isdir: A.isdir,
                        size: A.size,
                        level: l.level + 1
                    };
                    return e.push(t), t;
                }).sort(u) : [ {
                    path: A.an,
                    isdir: !1,
                    size: 0,
                    level: l.level + 1
                } ], l.list = o, i("queueFetch", 1), void _(e, t, n).then(() => {
                    a(!0);
                });
            }).catch(() => (i("queueFetch", 2), void _(e, t, n).then(() => {
                a(!0);
            }))) : (!l.isdir && n && (l.name += A.cb + y(l.size) + A.cc), i("queueFetch", 3), 
            void _(e, t, n).then(() => {
                a(!0);
            }));
        });
    }, U = function() {
        l || sysInit() || a.tip.show({
            mode: A.ao,
            msg: A.ap,
            autoClose: !1,
            hasClose: !0
        });
        let e = decodeURIComponent(decodeURIComponent(v(A.ab)));
        e += e.substring(0, 1) != A.n ? A.n : A.empty;
        let t, i = cache.list.data[e].list.map(function(e) {
            return {
                path: e.path.substring(0, 1) != A.n ? e.path + A.n : e.path,
                name: e.server_filename,
                isdir: e.isdir,
                size: e.size,
                level: 1
            };
        }).sort(u);
        if (!i || 0 === i.length) {
            return void a.tip.show({
                mode: A.ao,
                msg: A.aq,
                autoClose: !0,
                hasClose: !1
            });
        }
        switch (a.tip.show({
            mode: A.al,
            msg: A.ar,
            autoClose: !1
        }), n) {
          case 2:
            t = A.aj2;
            break;

          case 1:
          default:
            t = A.aj;
        }
        r(t).classList.add(A.ak);
        let s = 0;
        try {
            let e = r(A.cd).value;
            if (/\D/.test(e)) {
                throw 0;
            }
            s = parseInt(e);
        } catch (e) {
            return void a.tip.show({
                mode: A.ao,
                msg: A.cf,
                autoClose: !0,
                hasClose: !1
            });
        }
        let d = !0;
        try {
            d = r(A.cg).attributes.value.value == A.at;
        } catch (A) {}
        let c = e + A.cv + s;
        if (o.hasOwnProperty(c)) {
            return void z(i = o[c], e, d, s);
        }
        if (r(A.as).attributes.value.value == A.at) {
            if (d) {
                for (let e = 0; e < i.length; e++) {
                    i[e].isdir || (i[e].name += A.cb + y(i[e].size) + A.cc);
                }
            }
            _(i.filter(function(A) {
                return A.isdir;
            }), s, d).then(() => {
                z(i, e, d, s);
            });
        } else {
            C(i, e, s, d);
        }
    };
    function I() {
        let t;
        switch (n) {
          case 2:
            t = $(A.au2), $(A.cx).prepend(t);
            break;

          case 1:
            t = $(A.au), $(A.av).after(t), $(A.aw).css({
                "z-index": A.ax
            }), E();
            break;

          default:
            return void i(A.cu);
        }
        t.click(function() {
            e.show();
        }), e = new a.dl({
            id: A.ay,
            title: A.az,
            width: A.ba,
            body: A.bb,
            draggable: !0,
            position: {
                xy: A.bc
            },
            buttons: [ {
                name: A.bd,
                title: A.be,
                type: A.bf,
                color: A.bg,
                padding: [ A.bh, A.bh ],
                click: function(A) {
                    i(A), e.hide(), U();
                }
            }, {
                name: A.bi,
                title: A.bj,
                type: A.bf,
                padding: [ A.bh, A.bh ],
                click: function() {
                    e.hide();
                }
            } ],
            afterHide: function() {}
        });
        let l = function(e, t) {
            t ? (e.children[0].style.display = A.bk, e.children[1].style.display = A.bl, e.attributes.value.value = !0) : (e.children[0].style.display = A.bl, 
            e.children[1].style.display = A.bk, e.attributes.value.value = !1);
        };
        $(A.bo + A.bm + A.bp + A.bo + A.bn).click(function(e) {
            let t, i;
            i = !(t = e.currentTarget.id === A.bm);
            let n = r(A.bo + A.bm), a = r(A.bo + A.bn);
            l(n, t), l(a, i);
        }), $(A.cg).click(function(e) {
            l(e.currentTarget, e.currentTarget.attributes.value.value == A.ch);
        });
    }
    let E = function() {
        document.querySelector(A.br).style.display = window.location.hash.substring(0, 5) === A.bq ? A.bs : A.bt;
    };
    !function Z() {
        let e = location.pathname;
        switch (e === A.cy ? n = 1 : e.substring(0, 3) === A.cz && (n = 2), n) {
          case 2:
            $(document).ready(() => {
                p(), I();
            });
            break;

          case 1:
            document.addEventListener(A.bu, function(e) {
                if (!l) {
                    try {
                        e.target.className.indexOf(A.bv) > 0 && (l = !0, setTimeout(function() {
                            i("初始化"), f() && I();
                        }, 3e3));
                    } catch (e) {}
                }
            });
        }
    }();
}();