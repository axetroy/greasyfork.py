// ==UserScript==
// @name         腾讯翻译君同时显示Google翻译+彩云小译后的结果，三种人工智能翻译对比
// @namespace    http://tampermonkey.net/
// @version      0.6.1
// @description  腾讯翻译君同时显示Google翻译+彩云小译后的结果，三种人工智能翻译对比!
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTElEQVQ4Ec2S30tTYRjHP+85205zOJeJOlNIEYRIQ1dRCRVCNyIoYqlXUcEuozsvhKLIoG4CoZuSQJOYVFYXy35YdNF2Y7vQG4N+UCwKsW2R5Jmn7TxxBsqwP6Be3ovv83zf7/N94PvCvz5qfYE7yDkFxwXq8vA9By9OosIO39jYeMM0zQ6lVIWu618qKysjc3NzlxyuMOBBk8Q1rxxwKtsC24ScCSVp9W2+Z2rqUfLKWY8qQdO0dT/8fn88Go226/cb5LKrVAY1A9Y+g3JBfhnsHFhbVOn2+V1vnzUNbfVaVQHTNPF6vaTTaZRSdd3d3R5N6fQ5ztmPcOSxonkYjr5W1B5T5FOCbtHfUXUmqrs1ent7SSQShMNhMpkMi4uLfZrkqcmvgW8n5FZAucHlg59JQfNBDrydSxeXDh7aT3NzCyMjIzibuN1ustlsjSYW6VwaArvBKAcjoBALlp8CeuHK+PsL/j2t+5idfU4wGCQWi2EYBrqup1WkQsY0Q07nUmAEYS0Jvr2wknAGKEpMnpzvLKtSyR2tHsODZVnrYurr68cKKUQCksIl5ZIHBOwVwABjVa1m+t9cu/7pxLAhpYXMlFKIiOOeisfjFYVcBn6obbapImKpvBMjHmXZv1WsD+Uri1y9Xe6vigli2baNbdv56urqiCPeyLQYjGPLJNJV3HPw3ch0VygUks39v+oJZGACkUlDpu/VSudMu3SeOjw03RZqk9HR0cHNgo2vXEzcQhoEbi4y2/KOV3xlYaGi51d45uHLD8Xv/g/8B58z5RssBTPrAAAAAElFTkSuQmCC
// @author       pendave
// @match        https://fanyi.qq.com/
// @require      https://cdn.jsdelivr.net/clipboard.js/1.5.13/clipboard.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    //解码Html
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    //彩云翻译
    function caiyun(r,tranT) {
        var data = {
            "source": r.split("\n"),
            "trans_type": tranT,
            "request_id": "web_fanyi",
            "media": "text",
            "os_type": "web",
            "dict": true,
            "cached": true,
            "replaced": true
        };
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://api.interpreter.caiyunai.com/v1/translator",
            headers: {
                "accept": "application/json",
                "content-type": "application/json; charset=UTF-8",
                "X-Authorization": "token:cy4fgbil24jucmh8jfr5"
            },
            data: JSON.stringify(data),
            onload: function onload(response) {
                var result = JSON.parse(response.responseText);
                console.log('★彩云★' + result.target.join("\n")); // 执行回调，在回调中拼接
                document.querySelector('#caiyunTrans').value = result.target.join("\n").replace(/。\s/g, '。');
            }
        });
    }
    //Google翻译
    function google(r,tarLan) {
        var data = {
            "q": r,
            "client": "webapp",
            "sl": "auto",
            "tl": tarLan,
            "hl": tarLan,
            "dt": "t",
            "otf": 1,
            "pc": 1,
            "ssel": 0,
            "tsel": 0,
            "kc": 5,
            "tk": tk(r)
        };
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://translate.google.cn/translate_a/single",
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data: serialize(data),
            onload: function onload(response) {
                var result = JSON.parse(response.responseText),
                    arr = [];
                result[0].forEach(function (t) {
                    t && arr.push(t[0]);
                });
                console.log('★谷歌★' + arr.join("")); // 执行回调，在回调中拼接
                document.querySelector('#googleTrans').value = arr.join("");
            }
        });
    }
    function serialize(obj) {
        return Object.keys(obj).map(function (k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]).replace("%20", "+");
        }).join("&");
    }
    function tk(a) {
        var tkk = "429175.1243284773",
            Jo = null,
            b,
            c,
            d;

        function Ho(a) {
            return function () {
                return a;
            };
        }

        function Io(a, b) {
            for (var c = 0; c < b.length - 2; c += 3) {
                var d = b.charAt(c + 2);
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
                a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d;
            }

            return a;
        }

        if (null !== Jo) b = Jo; else {
            b = Ho(String.fromCharCode(84));
            c = Ho(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (Jo = tkk || "") || "";
        }
        d = Ho(String.fromCharCode(116));
        c = Ho(String.fromCharCode(107));
        d = [d(), d()];
        d[1] = c();
        d = b.split(".");
        b = Number(d[0]) || 0;

        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var k = a.charCodeAt(g);
            128 > k ? e[f++] = k : (2048 > k ? e[f++] = k >> 6 | 192 : (55296 == (k & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (k = 65536 + ((k & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = k >> 18 | 240, e[f++] = k >> 12 & 63 | 128) : e[f++] = k >> 12 | 224, e[f++] = k >> 6 & 63 | 128), e[f++] = k & 63 | 128);
        }

        a = b;

        for (f = 0; f < e.length; f++) {
            a += e[f], a = Io(a, "+-a^+6");
        }

        a = Io(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return a.toString() + "." + (a ^ b);
    }
    //创建按钮
    var clipboard = new Clipboard('.googlebtn', {
        text: function() {
            return document.querySelector('#googleTrans').value;
        }
    });

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });

    var caiyunclipboard = new Clipboard('.caiyunbtn', {
        text: function() {
            return document.querySelector('#caiyunTrans').value;
        }
    });

    caiyunclipboard.on('success', function(e) {
        console.log(e);
    });

    caiyunclipboard.on('error', function(e) {
        console.log(e);
    });

    //添加Google翻译结果
    if (document.querySelector('div.dict') != null){
        var googleWidth = document.querySelector('div.textpanel-target').clientWidth;
        var googleHeight = document.querySelector('div.textpanel-target').clientHeight;
        //var element = document.querySelector('div.textpanel-target-textblock');
        //var elementHeight = element.offsetHeight;
        //var computedLineHeight = window.getComputedStyle(element, null).getPropertyValue('line-height');
        //computedLineHeight = parseInt(computedLineHeight);
        var myArray = ["https://www.medicaldupeng.com/zh/","https://medicaldupeng.com/zh/tag/%E5%8C%BB%E5%AD%A6%E6%8F%92%E7%94%BB%E5%B8%88", "https://medicaldupeng.com/zh/%E7%B2%BE%E5%BD%A9%E6%95%99%E7%A8%8B/%E7%8B%AC%E5%AE%B6%E8%AF%BE%E7%A8%8B%E3%80%90%E7%94%9F%E7%89%A9%E5%8C%BB%E5%AD%A6%E7%A7%91%E5%AD%A6%E6%8F%92%E7%94%BB%E5%9F%B9%E8%AE%AD-%E7%9F%A2%E9%87%8F%E5%9B%BE-%E9%AB%98%E8%83%BD%E7%BB%98%E5%9B%BE.html"];
        var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
        document.querySelector('div.dict').innerHTML = '<div id="googleResult" class="textpanel-target" style="float:left; width: ' + googleWidth + 'px; height: ' + googleHeight + 'px; z-index: 2147483647;"><button style="margin:0 10px; padding:6px; border-style: none; border-radius: 6px; background-color: #4D8DF6; color: #fff;" class="googlebtn" onclick="toggleGoogleBtn();">拷出</button>谷歌<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4EYWSS2iWRxSGnzMz3yW/f2h+kxpMLXjBFordRCGgQRR1YdS6kLYiIrUrXVi3boVu6kZFiII07UJRAoI3UBBsFLzQZiNIFxFCixFvVZvExGS+b2ZkvlRwoXbgnGHO8L7nvOccAdjaG46WdiILIiG+8eC8S9O0+Vj/HrlRxd7jzNbe0CvCLqUzIroyAW00TtEK9LwHW4VNaSdy0Rne2QocXUUSQKe1tR8Cxz/zpuwImirgVQk+QC0BbYvkxHV/oeeLJ6O2RLz3FZ9zThqNxnS9Xt9pol4Exqfh+y7HpqUOEegbMJy7WzL01/ONqxdaarOacc4RQiBJEsqyZGxsfNpEvPPQvcDT/bln/ZGUmKjJgJLA7Yd1tjy9R4sL1GpNFEUJIVRE1tpUxdILB52fBq7cVbwqhIt7LGd2WzYv8UyUmqHHTfjScv63W2RpgiiFiEQLKkrQAoN/K9Z96clNYNmBjBcTwvA/Qt0I/YOW05cHeP7vGD/+3M/BUxd49OwFWilUlGAUXBsWrv2puPSD5c6+aW4NKQZHBK0ctraY2c11tm9YTVOi2ftND3PbGjjvMbHjcW71FH79XdN7U1fv2IMYi00bt1CYBew/fpKN3V1YaysZcSSKEGRm8JBraGTQyCHTM42K/IkE/hip09HawvCDR5i4ZM5VpkhnTaFN3BrQCaITUPFOQRkQhSjhvpvPt2u6mTenlbMDtyv9sQKJbvPh0FdMjuZBdExYneDL8FGStz8bGV4bguPpSzj0Hcz/pEZROvI8j1PoqwjegN51f7Xjanjw8CW7t7WwvKsNrXU1wizL4jL9Yt4FejvW3r7oxvLOkRUrV7QiolH/7UCSGPK8Zv+X4LNF5qdVS9OvJyenipg9EkTpxuS2o+PjXa8BqOsPEBIuw3YAAAAASUVORK5CYII="><p style="float: right; padding: 5px; color: #4285f4;">可以对照编辑修改！</p><textarea id="googleTrans" style="color: #6699F6; font-size:1.2em; width: ' + (googleWidth-6) + 'px; height: ' + googleHeight + 'px;"></textarea></div>'+ '<div id="caiyunResult" class="textpanel-target" style="width: ' + googleWidth + 'px; height: ' + googleHeight + 'px; z-index: 2147483647;"><button style="margin:0 10px; padding:6px; border-style: none; border-radius: 6px; background-color: #03995C; color: #fff;" class="caiyunbtn" onclick="toggleCaiyunBtn();">拷出</button>彩云<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABZ0lEQVQ4EZ2SS0uCQRSGn09LSUNKRTBCCLpBUIKLfkP7NkGraNuuRQX9lv5BRAupli1qE4Eg5CKyRISELt4+r/NNjFE62mfZwDAzh/d9z5xzXkNKKRluKbzaDkUbGY7bRhuA2u3VVvl6/OO0/iyQqGa5Ljz05nD8KmBJSSaf4+z+lo27OGazqon09eCtViT1+kQyn+YkkyCeS4LpYHkpitfnRVjCXqAlBf7LLZBhqElojILbB9JJ0OUmjaWR1UMroSGa4PKD081eKAqiTGrtgM3JCMFxH+K79x0dTQDD+ByQYbG7sg6G4Ch5wan5zE32kUyrTq9rjG4jmaKO92oHhB8qJWh5oFIBswXFMlRqWIfHHRP8aCRDgqy2syNK7IdjrAbmmA9EWJya0ciqkJ4pKPI757PbxIILBMYmOsXa3LQSqqLOS73AtCdkA+8PKwE1WL2Z/Ti7iKX9wA41KN6dWbfYIBYdR30AsJaF1nwuo94AAAAASUVORK5CYII="><p style="float: right; padding: 5px; color: #03995C;">可以对照编辑修改！</p><textarea id="caiyunTrans" style="color: #2AC08F; font-size:1.2em; width: ' + (googleWidth-6) + 'px; height: ' + googleHeight + 'px;"></textarea></div><br><div><iframe style="border: 0px; padding: 54px 0 16px 2px;" src="' + randomItem + '" width="99%" height="456"></iframe></div>'+ document.querySelector('div.dict').innerHTML;
        //窗口尺寸保持一致
        $(window).on('mousemove mouseout mouseover', function (){
            googleWidth = document.querySelector('div.textpanel-target').clientWidth;
            googleHeight = document.querySelector('div.textpanel-target').clientHeight;
            //googleHeight = document.querySelector('div.textpanel-target-textblock').offsetHeight;
            $("#googleResult").css({"width":googleWidth,"height":googleHeight});
            $("#googleTrans").css({"width":googleWidth-6,"height":googleHeight});
            $("#caiyunResult").css({"width":googleWidth,"height":googleHeight});
            $("#caiyunTrans").css({"width":googleWidth-6,"height":googleHeight});
        });
        $(window).resize(function() {
            googleWidth = document.querySelector('div.textpanel-target').clientWidth;
            googleHeight = document.querySelector('div.textpanel-target').clientHeight;
            //googleHeight = document.querySelector('div.textpanel-target-textblock').offsetHeight;
            $("#googleResult").css({"width":googleWidth,"height":googleHeight});
            $("#googleTrans").css({"width":googleWidth-6,"height":googleHeight});
            $("#caiyunResult").css({"width":googleWidth,"height":googleHeight});
            $("#caiyunTrans").css({"width":googleWidth-6,"height":googleHeight});
        });
        //输入文字时执行
        $('.textinput').on("change keyup paste", function(){
            //dosomething();
            var inputContent = document.querySelector('textarea.textinput').value;
            //var googleTransUrl = $('#language-button-group-source > .language-button').text().match("中文") ? "https://translate.google.cn/m?tl=en&sl=auto&q=" : "https://translate.google.cn/m?tl=zh-CN&sl=auto&q=";
            var googleTargetLanguage = $('#language-button-group-source > .language-button').text().match("中文") ? "en" : "zh-CN";
            var caiyunTransType = $('#language-button-group-source > .language-button').text().match("中文") ? "zh2en" : "en2zh";
            //var currentPostUrl = googleTransUrl + encodeURIComponent(inputContent);
            //var reg=new RegExp("\n","g");
            google(inputContent, googleTargetLanguage);
            caiyun(inputContent, caiyunTransType);
        })
    }
    //rgbToHex
    function rgbToHex(col)
    {
        if(col.charAt(0)=='r')
        {
            col=col.replace('rgb(','').replace(')','').split(',');
            var r=parseInt(col[0], 10).toString(16);
            var g=parseInt(col[1], 10).toString(16);
            var b=parseInt(col[2], 10).toString(16);
            r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
            var colHex='#'+r+g+b;
            return colHex;
        }
    }
    //按钮颜色
    unsafeWindow.toggleGoogleBtn = function() {
        var colorGoogleBtn = document.querySelector('#googleResult > button');
        var tempGoogleColor = colorGoogleBtn.style.backgroundColor;
        //console.log(tempGoogleColor);
        console.log(rgbToHex(tempGoogleColor).toUpperCase());
        colorGoogleBtn.style.backgroundColor = rgbToHex(tempGoogleColor).toUpperCase() === "#AA44FD" ? "#4D8DF6" : "#AA44FD";
    };
    unsafeWindow.toggleCaiyunBtn = function() {
        var colorCaiyunBtn = document.querySelector('#caiyunResult > button');
        var tempCaiyunColor = colorCaiyunBtn.style.backgroundColor;
        //console.log(tempCaiyunColor);
        console.log(rgbToHex(tempCaiyunColor).toUpperCase());
        colorCaiyunBtn.style.backgroundColor = rgbToHex(tempCaiyunColor).toUpperCase() === "#AA44FD" ? "#00985D" : "#AA44FD";
    };
    //var newWindow = unsafeWindow.open('http://www.medicaldupeng.com/zh','_blank');
    // Your code here...
})();