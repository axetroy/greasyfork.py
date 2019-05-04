// ==UserScript==
// @name         沪江小D划词翻译[失效]
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  重写沪江小D划词，绕过CSP，支持全部网页...(也许吧)
// @author       mixxiu
// @match        *://*/*
// @connect      hujiang.com
// @connect      yeshj.com
// @connect      hjfile.cn
// @grant        GM_xmlhttpRequest
// ==/UserScript==



//添加监听
window.document.body.addEventListener('mouseup', foo, false);


//1 获取文字(划词)
function foo() {
    const selector = window.getSelection();
    //去除多余的标点符号
    getWord = selector.toString().replace(/[\u0021-\u002F\u003A-\u0040\u005b-\u0060\u007b-\u007e\u3000-\u303F\uff1f\uff0c\f\n\r\t\v\u00a0\u1680\u180e\ufeff]/g, '');


    //条件运算符& node.contains(otherNode) > 检测是否点击在div外，控制翻译div显示/关闭
    //加上box-shadow 为25.2vw
    let e = document.querySelector('#hj_dict').contains(event.target);
    if (getWord !== "") {
        if (!e) {
            search_Unicode(getWord)
        }
    } else if (!e) {
        document.querySelector('#hj_dict').style.transform = "translate(25.2vw,0)"
        document.querySelector('#hj_audio').style.width = '2.4vmax'
        document.querySelector('#hj_audio').style.transform = 'translateX(10vmax)'
       
            
         
    }


    //清空hj_dict内容
    if (!e) {
        document.querySelector('#hj_dict').innerHTML = ''
    }




    //识别选中的字体，用于自动翻译 各语言>中文
    //检测到汉字默认>其他语言(cookie读取)
    //只保留英语、日语、查询
    function search_Unicode(_getLanguage) {
        var language_reg = {
            zh: /[\u4e00-\u9fa5]/, //汉字
            en: /\w/,
            jp: /[\u3040-\u309F\u30A0-\u30FF]/, //片平假

            // fr : /[\u0020-\u007F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F]/,  //拉丁文匹配
            // kr : /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/       

        }

        if (language_reg.jp.test(_getLanguage) && language_reg.zh.test(_getLanguage)) {
            // console.log("我是日语+中文")
            hj_Ajax(_getLanguage, "jpjc");
        }


        else if (language_reg.en.test(_getLanguage)) {
            hj_Ajax(_getLanguage, "en");
            //  console.log("我只是英文")
        }
        else if (language_reg.jp.test(_getLanguage)) {
            hj_Ajax(_getLanguage, "jpjc");
            //  console.log("我只是日语")

        }
        else if (language_reg.zh.test(_getLanguage)) {
            //默认按日语中文 > 日语
            hj_Ajax(_getLanguage, "zh");

        }



    }

}




//2 跨域AJAX
function hj_Ajax(_getTransWord, lgMode) {
    /* 更换为手机版查询接口
     * 英文 https://m.hujiang.com/d/dict_en_api.ashx?w=the&type=en
     * 日版 https://m.hujiang.com/d/dict_jp_api.ashx?w=%E6%BC%AB%E7%94%BB&type=jc

     * en,fr,ko,de,jp,es
     * http://dict.hjenglish.com/w/table
     * 
     */

    let lg = {
        // 查询接口
        sever_web: 'https://m.hujiang.com/d/dict_',
        _en: {
            en: 'en_api.ashx?w=',

        },
        _jp: {
            jp: 'jp_api.ashx?w=',
            jc: '&type=jc',
            cj: '&type=cj'
        } // 日语  
    }

    let reqUrlWeb = {
        _en: lg.sever_web + lg._en.en + encodeURI(_getTransWord),
        _cj: lg.sever_web + lg._jp.jp + encodeURI(_getTransWord) + lg._jp.cj,
        _jc: lg.sever_web + lg._jp.jp + encodeURI(_getTransWord) + lg._jp.jc
    }

    //
    if (lgMode === 'en') {
        GM_get(reqUrlWeb._en);
    } else if (lgMode === 'jpcj') {
        GM_get(reqUrlWeb._cj);
    } else if (lgMode === 'jpjc') {
        GM_get(reqUrlWeb._jc);
    } else if (lgMode === 'zh') {
        //假如是纯中文，循环翻译
        for (var k in reqUrlWeb) {
            if (reqUrlWeb.hasOwnProperty(k)) {
                GM_get(reqUrlWeb[k]);

            }
        }
    }


    // let reqDict = 'http://dict.hjenglish.com/w/'+_getTransWord;

    //绕过CSP策略，允许跨域访问
    function GM_get(_reqUrl) {
        console.log(_reqUrl);
        GM_xmlhttpRequest({
            method: 'GET',
            url: _reqUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"
            },
            onload: function (res) {
                if (res !== "") {
                    hj_JSON(res.responseText);
                }

                //  console.log(res.responseText)
            }
        });
    }

}

//3 处理返回的JSON数据，自动切换模式翻译 (过滤无返回结果)
function hj_JSON(_resText) {
    if (/^\[.*\]/.test(_resText)) {
        hj_Html(JSON.parse(_resText));
    } else if (/^\{.*/.test(_resText)) {
        //en数据只有一个JSON对象
        hj_Html(JSON.parse("[ " + _resText + " ]"));
    } else {
        //处理无结果

    }

}


//4 写入HTML等等 
function hj_Html(word_json) {
    //接收到可处理数据才显示面板-------------------------------------------
    document.querySelector('#hj_dict').style.transform = 'translate(0vw,0)';
    setTimeout(function(){
    document.querySelector('#hj_audio').style.transform = 'translateX(0)'    
    },100)

    let tolg = {
        ec: "EnCn",
        ce: "CnEn",
        jc: "JpCn",
        cj: "CnJp"
    }


    let langType = word_json[0].FromLang + word_json[0].ToLang; //判断翻译方式   


    var E = "", J = "";
    if (langType === tolg.ec || langType === tolg.ce) {
        E = ECCE(langType);
    } else {
        J = JCCJ(langType)
    }

    //过滤J为空的情况 +　添加翻译文本 + 添加基本位移样式
    document.querySelector('#hj_dict').innerHTML += J !== "" ? '<div>' + J + '</div>' + E : E;
    i = -24
    document.querySelector('#hj_dict').childNodes.forEach(function (e) {
        e.style = 'transform: translate(' + (i += 24) + 'vw,0);';
    })
    //添加js动画，控制音频播放
    JSControl()



    //翻译模块————————————————————————————————
    //英文中文模块
    function ECCE(lng) {

        //02 发音TtsUrl
        ttsUk = '<audio><source src="' + word_json[0].TtsUrl.replace(/http:\/\/tts\.yeshj\.com/, 'https://tts.yeshj.com/uk') + '"type="audio/mp3"></audio>'
        ttsUs = '<audio><source src="' + word_json[0].TtsUrl.replace(/http:\/\/tts\.yeshj\.com/, 'https://tts.yeshj.com') + '"type="audio/mp3"></audio>'

        //01 音标
        PUK = word_json[0].PronounceUk !== null ? '<div id = "pronounceUK">英 [ ' + word_json[0].PronounceUk + ' ]' + ttsUk + '</div>' : '<span></span>'
        PUS = word_json[0].Pronounce !== null && word_json[0].Pronounce !== "" ? lng !== tolg.ce ? '<div id = "pronounceUS">美 [ ' + word_json[0].Pronounce + ' ]' + ttsUs + '</div>' : '<div id = "pronounceUS">拼音 [ ' + word_json[0].Pronounce + ' ]' + ttsUs.replace(/http/, 'https') + '</div>' : '<span></span>'


        //03 词形变化
        let regFoVal = { 28: "比较级", 29: "动词过去式", 36: "动词过去分词", 37: "动词现在分词", 38: "动词第三人称单数", Word_Relation_Type_Inflection: "复数" }

        let FormType = '', Fo = '', ExtPhrase = '', Ex = '';

        if (word_json[0].FormType !== null) {
            for (let e of word_json[0].FormType) {
                Fo += '<span>' + e.Code + ': ' + e.Word + '</span><br>'
            }
            FormType = '<div id = "FormType"><span class = "hj_h3">词形变化</span><br>' + Fo.replace(/undefined/, '').replace(/28|29|36|37|38|Word_Relation_Type_Inflection/gi, function (val) {
                return regFoVal[val]
            }) + '</div>'

        }


        //04 常用短语  
        if (word_json[0].ExtPhrase !== null) {
            for (let i of word_json[0].ExtPhrase) {
                Ex += '<span class = "D_span_1">' + i.Comment + '</span><span class = "D_span_2">' + i.PhraseExplain + '</span>';
                ExtPhrase = '<div id = "ExtPhrase"><span class="hj_h4">常用短语</span><br>' + Ex.replace(/undefined/, '') + '</div>'
            }
        }



        //05 拓展例句
        let EC = "", WordSent = "", F = "";

        //获取词形，加粗在扩展例句里的单词变形，去除多余的[]
        function reg_CSES(str) {
            if (word_json[0].FormType !== null) {
                for (let f of word_json[0].FormType) {
                    F += '\\b' + f.Word + '\\b|'
                }
                return str.replace(new RegExp(F + '\\b' + word_json[0].Word + '\\b', 'gi'), function (F) { return '<em>' + F + '</em>' }).replace(/\[|\]/g, '');
            } else {
                return str.replace(new RegExp('\\b' + word_json[0].Word + '\\b', 'gi'), function (F) { return '<em>' + F + '</em>' }).replace(/\[|\]/g, '');
            }

            console.log(F)
        }
        //遍历元素,生成div
        if (word_json[0].WordSent !== null) {

            for (let l of word_json[0].WordSent) {
                //  AudioUrl 音频链接
                AudioDiv = '<audio><source src=' + l.AudioUrl.replace(/http/, 'https').replace(/\\n/, '') + ' type="audio/mp3"></audio>'
                EC += '<span class = "K_span_1">' + reg_CSES(l.EnSent) + AudioDiv + '</span><span class = "K_span_2">' + reg_CSES(l.CnSent) + '</span>';
            }
            WordSent = '<div id = "WordSent"><span class = "hj_h5">拓展例句</span><br>' + EC + '</div>'

        }


        // 06词义辨析
        let Comment_html = "";
        Comment_html = word_json[0].Ay !== null ? '<div id = "Ay"><span class = "hj_h6">词义辨析</span><br>' + word_json[0].Ay.Comment_Html + '</div>' : '<span></span>'


        //07 02简明释义+最后修饰
        encnChild = '<div>' +
            '<div id = "Word">' + word_json[0].Word + '</div>' +
            '<div id = "Pronounce" >' +
            PUK +
            PUS +
            '</div>' +
            '<div id = "Comment" ><span class = "hj_h2">简明释义</span><br>' + word_json[0].Comment.replace(/<\/b>\s<br\/>/gi, '</b>').replace(/\./g, '.&nbsp') + '</div>' +
            FormType +
            ExtPhrase +
            WordSent +
            Comment_html.replace(/target='_blank'/g, '').replace(/href='/g, '').replace(/<\/a>/g, '</a><br>') +
            '</div>'

        // console.log( new RegExp(F+'\\b' +word_json[0].Word+'\\b' )) 
        //排除<>标签字符串         
        //wordsent.replace是为了修饰拓展例句里的单词变形 
        return encnChild;

    }




    //日文翻译模块——————————————————————————————
    function JCCJ(lng) {
       
        

        let jccnChild = "", jComment = "",Jtts =""
        let jArr, jArr_3 = "", j3 = "", j4 = ""

        dot = new RegExp("<img src='//dict.hjenglish.com/images/icon_star.gif' align='absmiddle' style='margin-left:10px;'/>", 'gi')


        for (let j of word_json) {
            
            //—————————————————————————————— 
            if(j.TtsUrl !== null){
             
                Jtts = '<audio><source src="'+ j.TtsUrl.replace(/http/,'https').replace(/https:\/\/d1\.g\.hjfile\.cn/,'http://d1.g.hjfile.cn') +'" type="audio/mp3"></audio>'
            }

            if (j.PronounceJp !== null && j.Pronounce !== null) {
                P_1 = j.PronounceJp.replace(/\[/, '[ ').replace(/\]/, ' ]');
                P_2 = j.Pronounce.replace(/\[/, '[ ').replace(/\]/, ' ]')


                jccnChild += '<div>' +
                    '<div id = "Word_jp" >' + j.Word + '</div>' +
                    '<div id = "Pronounce"> ' + P_1 + P_2 + j.Tone + Jtts + '</div>' +
                    '<div id = "Comment">' + jpForm(j.Comment) + '</div>' +
                    '</div>'

            } else if (j.PronounceJp !== null) {

                P_1 = j.PronounceJp.replace(/\[/, '[ ').replace(/\]/, ' ]');


                jccnChild += '<div>' +
                    '<div id = "Word_jp" >' + j.Word + '</div>' +
                    '<div id = "Pronounce"> ' + P_1 + j.Tone + Jtts +'</div>' +
                    '<div id = "Comment">' + jpForm(j.Comment) + '</div>' +
                    '</div>'

            } else if (j.Pronounce !== null) {
                P_2 = j.Pronounce.replace(/\[/, '[ ').replace(/\]/, ' ]')


                jccnChild += '<div>' +
                    '<div id = "Word_jp" >' + j.Word + '</div>' +
                    '<div id = "Pronounce"> ' + P_2 + j.Tone + Jtts +'</div>' +
                    '<div id = "Comment">' + jpForm(j.Comment) + '</div>' +
                    '</div>'

            }
            else if (j.PinYin !== null) {

                P_3 = j.PinYin.replace(/\[/, '[ ').replace(/\]/, ' ]')

                jccnChild += '<div>' +
                    '<div id = "Word_jp" >' + j.Word + '</div>' +
                    '<div id = "Pronounce"> ' + P_3 + Jtts + '</div>' +
                    '<div id = "Comment">' + jpForm(j.Comment) + '</div>' +
                    '</div>'

            } else {
                jccnChild += '<div>' +
                    '<div id = "Word_jp" >' + j.Word + '</div>' +
                    '<div id = "Comment">' + jpForm(j.Comment) + '</div>' +
                    '</div>'
            }



        }

        //正则表达式匹配修改第一个展示的单词的id
        return jccnChild.replace(/Word_jp/, 'Word');


        /**日语返回数据有几种形式
         * 1 【,（，。
         * 2 【，。
         * 3 （，。
         * 3 
         * 4 循环匹配，然后加入tag，添加css样式
         */
        //日语JSON数据处理
        function jpForm(comment) {
            let jpSign
            dot = "<img src='//dict.hjenglish.com/images/icon_star.gif' align='absmiddle' style='margin-left:10px;'/>"
            jpSign = {
                A: /【/,
                B: /（/,
                C: /<img src='\/\/dict\.hjenglish\.com\/images\/icon_star\.gif'\salign='absmiddle'\sstyle='margin-left:10px;'\/>/
            }


            A = jpSign.A.test(comment);
            B = jpSign.B.test(comment);
            C = jpSign.C.test(comment)

            P = /（\d+）|（\d+\)|\(\d+\）|（３）|\(２）|（１）|（3\)/
            C = /[\uFF0F\u002f]/g
            T = /【/
            U = /\[|\［/g
            N = /[\uFF11-\uFF19]/ //全形数字

            H = /\t | \n | \r | [\u3000\u0020]/


            j1 = comment.replace(new RegExp(dot, 'gi'), '').split(new RegExp('<br/>'))
           // console.log(j1)

            let j2 = "", j3 = "", j4 = "", j5 = "", j6 = ""
            if ((A && B) && C) {

                jp_num = 0;
                for (let i = 0; i < j1.length - 1; i++) {
                    j2 += P.test(j1[i]) ? (jp_num += 1, '<span class = "jp_title">' + j1[i].replace(P, '<span class="jp_seq">' + jp_num + '</span>') + '</span>') :
                        /（/.test(j1[i]) ? (jp_num += 1, '<span class = "jp_title">' + j1[i].replace(P, '<span class="jp_seq">' + jp_num + '</span>') + '</span>') :
                            T.test(j1[i]) ? '<span class = "jp_h">' + j1[i] + '</span>' :
                                U.test(j1[i]) ? (jp_num += 1, '<span class = "jp_title"><span class ="jp_seq">' + jp_num + '</span>' + j1[i] + '</span>') :
                                    /／/.test(j1[i]) ? '<span class = "jp_p">▶' + j1[i].replace(/\s+/, '') + '</span>' :
                                        /\//.test(j1[i]) ? '<span class = "jp_p">▶' + j1[i].replace(/\s+/, '') + '</span>' :
                                            /／/.test(j1[i]) && /（/.test(j1[i]) ? '<span class = "jp_p">▶' + j1[i].replace(/\s+/, '') + '</span>' :
                                                '<span class = "jp_none">▶' + j1[i].replace(/\s+/, '') + '</span>'



                }
               // console.log("2")
                return j2.replace(/<span\sclass\s=\s"jp_p">▶<\/span>/g, '')



            }
            else if ((A && B) || (A && C) || (B && C)) {
                jp_num = 0;

                for (let i = 0; i < j1.length - 1; i++) {

                    j3 += P.test(j1[i]) ? (jp_num += 1, '<span class = "jp_title">' + j1[i].replace(P, '<span class="jp_seq">' + jp_num + '</span>') + '</span>') :
                        T.test(j1[i]) ? '<span class = "jp_h">' + j1[i] + '</span>' :
                            /／/.test(j1[i]) ? '<span class = "jp_p">' + j1[i] + '</span>' :
                                /\//.test(j1[i]) ? '<span class = "jp_p">' + j1[i] + '</span>' :
                                    C.test(j1[i]) ? '<span class = "jp_p">▶' + j1[i].replace(/\s+/, '') + '</span>' :
                                        '<span class="jp_none">' + j1[i] + '</span>'


                }
               // console.log("3")
                return j3.replace(/<span\sclass\s=\s"jp_p">▶<\/span>/g, '')
            }
            else if (A) {
                //console.log("4")
            }
            else if (B) {
                //console.log("5")
                //只有（）

            }
            else if (C) {
                jp_num = 0;
                for (let i = 0; i < j1.length - 1; i++) {
                    j6 += new RegExp('（', 'g').test(j1[i]) ? '<span class="jp_title"><span class = "jp_seq">' + (jp_num += 1) + '</span>' + j1[i] + '</span>' :
                        /\d）/.test(j1[i]) ? '<span class="jp_title"><span class = "jp_seq">' + (jp_num += 1) + '</span>' + j1[i].replace(/\d）/, '') + '</span>' :
                            '<span>' + j1[i] + '</span>'
                }
                //console.log("6")
                return j6
            }

        }
    }

}






//5 写入基本html
writHtml();
function writHtml() {

    //6 svg icon 
    S_1 = '<div class = "hj_S1"> ' +
        '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
        'viewBox="0 0 22 22"  xml:space="preserve">' + '<g id="S_x5F_1">' + '<path d="M17,1.8l-7,5C9.8,6.9,9.6,7,9.4,7H5.3C4.6,7,4,7.6,4,8.3v5.4C4,14.4,4.6,15,5.3,15h4.1c0.2,0,0.4,0.1,0.6,0.2l7,5' + 'c0.4,0.3,1,0,1-0.5V2.4C18,1.8,17.4,1.5,17,1.8z"/></g></svg></div>'
    S_2 = '<div class = "hj_S2">' +
        '<svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
        'viewBox="0 0 22 22"  xml:space="preserve">' + '<g id="S_x5F_2">' +
        '<g id="图层_2">' + '<path d="M11.9,21.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c4.7-4.7,4.7-12.5,0-17.2c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0' + 'c5.5,5.5,5.5,14.5,0,20.1C12.4,21.5,12.2,21.6,11.9,21.6z"/></g>' +
        '<g id="图层_2_x5F_复制">' + '<path d="M7.8,17.4c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c1.2-1.2,1.9-2.8,1.9-4.5S8.2,8,7,6.8c-0.4-0.4-0.4-1,0-1.4' + 's1-0.4,1.4,0c1.6,1.6,2.4,3.7,2.4,5.9s-0.9,4.3-2.4,5.9C8.3,17.3,8,17.4,7.8,17.4z"/></g>' +
        '<g id="图层_2_x5F_复制_2">' + '<path d="M4.6,14.3c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4c0.8-0.8,0.8-2,0-2.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0' + 'c1.5,1.5,1.5,4,0,5.6C5.2,14.2,4.9,14.3,4.6,14.3z"/></g></g></svg></div>'

    let div = document.createElement("div");
    div.id = "hj_dict"
    div.style = 'position : fixed; display : block; z-index: 99999;top:0;right:0vw; width: 24vw; transform:translate(25.2vw,0); min-height: 100%;background-color:rgb(251, 251, 251);'
    div.innerHTML = ""

    let div2 = document.createElement("div");
    div2.id = "hj_audio"
    div2.innerHTML = S_1 + S_2

    let style = document.createElement("style")
    style.id = "hj_css";
    style.className = "hj_css"
    style.type = "text/css"
    style.innerHTML = '#hj_dict div{font-size:1.18vw ;}' +
        '#hj_dict { font-weight:300; font-family: "Helvetica Neue","Microsoft Yahei","Tahoma","Arial",sans-serif; }' +
        '#hj_dict {overflow-y:auto; text-align:left; box-shadow:0px 0px 1.2vw rgba(16, 16, 16, 0.37); border-left:1px solid #e8e8e8;  will-change:transform; transition : 0.2s transform;}' +
        '#hj_dict > div { position:absolute; text-align:left; margin:1.5vw;width: 21vw; will-change:transform; transition : 0.2s transform;}' +
        '#Word { font-weight:500; font-size:2.4vmax!important; height:4vmax;}' +

        '#Comment { margin:1vw 0 1.5vw 0;    border-bottom: 1px solid #e2e2e2; padding-bottom:1vmax}' +
        '#FormType { margin:0 0 1.5vw 0; }' +

        '#ExtPhrase { margin:0 0 1.5vw 0; }' +
        '#ExtPhrase h4{ margin-bottom:0px;  }' +
        '#WordSent { margin:0 0 1.5vw 0; }' +
        '#Ay { margin:0 0 1.5vw 0;}' +
        '#Ay a {color:#0ebd85}' +
        '.D_span_1 { color:#2380d2}' +
        '.D_span_2 {display:block; margin: 0 0 0.5vw 0}' +
        '.K_span_1 {color:#c15454;display:block}' +
        '.K_span_1 em{color:#dd4b39}' +
        '.K_span_2 {display:block; margin: 0 0 1vw 0; }' +
        '.hj_h2,.hj_h3,.hj_h4,.hj_h5,.hj_h6 { color:#fff; padding:0.3vw; line-height:2.4;}' +
        '.jp_h,.jp_title,.jp_p{ display:block;}' +
        '.jp_title{ margin-top:0.5vmax;background-color:#f3f3f3;border-radius:1vmax;}' +
        '.jp_seq{color:#fff; background-color:#2380d2;font-size:0.9vmax;padding:0.2vmax 0.5vmax;border-radius:0.4vmax;margin:0 0.4vmax 0.4vmax 0;}' +
        '.jp_h{ margin-left:-0.6vmax font-weight:400;}' +
        '.jp_p{ padding-left:2vmax; color:grey;margin: 0.5vmax 0;}' +
        '.jp_p:hover{ color:#2380d2}' +
        '.hj_indent { margin-right:3vw }' +
        '.hj_h2{ background-color:#2380d2 }.hj_h3{ background-color:#2380d2}.hj_h4{background-color:#2380d2}.hj_h5{background-color:#c15454}.hj_h6{background-color:#0ebd85}' +
        '::-webkit-scrollbar{ display:none;}' +

        //音频相关
        '#pronounceUK,#pronounceUS,#Pronounce,.K_span_1{}' + //cursor:pointer

        //关闭点击播放语音样式 rgba(191, 191, 191, 0.78)
        //box-sizing属性好用 https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing
        '#hj_audio { box-sizing:border-box; overflow:hidden;   border-radius: 1.2vmax; box-shadow: 0 0 0vmax rgba(199, 203, 208, 0.35);z-index: 999999;position: fixed;width: 2.4vmax;height: 2.29vmax;padding: 0.4vmax;background-color: rgba(205, 209, 212, 0.77);display: block;top: 2vmax;right: 1vmax; transform:translateX(10vmax); transition:0.2s width,0.2s background-color,0.2s box-shadow,0.2s transform;}' +
        //svg设置选项
        '.hj_S1,.hj_S2{position:absolute; }' +
        '#hj_audio path {fill:#f3f8fd}' +
        '.hj_S2 {transform: translateX(3vmax);transition:0.2s transform;}' +
        '.hj_S1 svg,.hj_S2 svg { width:1.4vmax;height:1.4vmax}'


    document.querySelector("body").appendChild(div)
    document.querySelector('body').appendChild(div2)
    document.querySelector('html').appendChild(style)

}



//5 js控制动画，切换，等等

function JSControl() {
    DW = document.documentElement.clientWidth;
    DH = document.documentElement.clientHeight;
    vw = DW / 100;
    vh = DH / 100;

    let D = document.querySelector('#hj_dict')



    document.documentElement.addEventListener('mousemove', tab)
    function tab() {

        //以width来做基准，指定标题hover范围
        h = event.clientY < 4 * vw + 20;
        v = [0, 24, 48]
        if (h) {
            if (D.childNodes && event.clientX < DW - 16 * vw) {

                for (i = 0; i < D.childNodes.length; i++) {
                    D.childNodes[i].style.transform = ' translate(' + (v[i] + 0) + 'vw,0)'
                }



            } else if (D.childNodes[1] && (DW - 16 * vw < event.clientX && event.clientX < DW - 9 * vw)) {

                for (i = 0; i < D.childNodes.length; i++) {
                    D.childNodes[i].style.transform = ' translate(' + (v[i] - 24) + 'vw,0)'
                }


            } else if (D.childNodes[2] && (DW - 9 * vw < event.clientX)) {

                for (i = 0; i < D.childNodes.length; i++) {
                    D.childNodes[i].style.transform = ' translate(' + (v[i] - 48) + 'vw,0)'
                }


            }
        }
    }

    let ADA = function (width, backColor, boxShadow, s2Left) {
        AD = document.querySelector('#hj_audio')
        HJ_S2 = document.querySelector('.hj_S2')

        if (width !== 'none') {
            AD.style.width = width
        }

        if (backColor !== 'none') {
            AD.style.backgroundColor = backColor
        }
        if (boxShadow !== 'none') {
            AD.style.boxShadow = boxShadow
        }
        if (s2Left !== 'none') {
            HJ_S2.style.transform = s2Left
        }

    }
    //音频icon动画————
    document.querySelector('#hj_dict').onmouseover = function (k) {


        if (((k.target.className === "K_span_1" || k.target.id === "pronounceUK") || k.target.id === "pronounceUS")||k.target.id === "Pronounce") {

            ADA('none', 'rgba(4, 104, 191, 0.77)', '0 0 1.8vmax #9aafc1', 'translateX(1.8vmax)') //3.8

        } else if (k.target.tagName === "EM") {
            em_parent = k.target.parentNode
            if (em_parent.className === "K_span_1") {
                ADA('none', 'rgba(4, 104, 191, 0.77)', '0 0 1.8vmax #9aafc1', 'translateX(1.8vmax)')
            } else if (em_parent.parentNode === "K_span_1") {
                ADA('none', 'rgba(4, 104, 191, 0.77)', '0 0 1.8vmax #9aafc1', 'translateX(1.8vmax)')
            }
        } else {

                ADA('none', 'rgba(205, 209, 212, 0.77)', '0 0 0vmax rgba(199, 203, 208, 0.35)', 'none')
        }

    }

    //音频控制————————————————————————————————
    //

    document.querySelector('#hj_dict').onclick = function (e) {

        //控制音频icon动画
        let audiotime = function (el, canPW, endPW) {
            el.play();
            el.oncanplay = ADA(canPW);
            el.addEventListener('ended', function (e) {
                if (e) {                 
                    ADA(endPW, 'rgba(205, 209, 212, 0.77)', '0 0 0vmax rgba(199, 203, 208, 0.35)', 'translateX(3vmax)')
                    removeEventListener(el)
                }
            })

        }
        if (((e.target.className === "K_span_1" || e.target.id === "pronounceUK") || e.target.id === "pronounceUS") || e.target.id === "Pronounce") {

                audiotime(e.target.querySelector('audio'), '3.8vmax', '2.4vmax')

        } else if (e.target.tagName === "EM") {
            em_parent = e.target.parentNode
            if (em_parent.className === "K_span_1") {

                audiotime(em_parent.querySelector('audio'), '3.8vmax', '2.4vmax')

            } else if (em_parent.parentNode === "K_span_1") {

                audiotime(em_parent.parentNode.querySelector('audio'), '3.8vmax', '2.4vmax')

            }
        }

    }


}









