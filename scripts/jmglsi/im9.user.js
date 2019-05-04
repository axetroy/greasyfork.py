// ==UserScript==
// @name         im9
// @namespace    http://tampermonkey.net/
// @version      0.261
// @description  B站兴趣圈群发脚本 B站 id:你的眼睛会笑呢(8029639)
// @author       啪皮
// @match        http://www.im9.com/index.html
// @grant        none
// ==/UserScript==
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function get_captcha(){

    var c = new XMLHttpRequest();
    c.open("GET", "http://www.im9.com/web/captcha.do", false);
    c.send();
    data = c.responseText;
    l = data.indexOf("'");
    r =  data.indexOf(";");
    data = data.substring(l + 1,r - 1);
    return data;
}
var captcha = get_captcha();

function show_confirm(){
    var result = confirm('是否要群发?');
    if(result){
        dajiahao();
    }
}

function join(id){
    var j = new XMLHttpRequest();
    j.open("POST", "http://www.im9.com/api/join.community.do", false);
    j.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    j.send("community_id=" + id + "&captcha=" + captcha + "&ts=1461213815000");
    return j.responseText.length;
}

function publish(id,title,text){
    var p = new XMLHttpRequest();
    p.open("POST", "http://www.im9.com/api/publish.post.do", false);
    p.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    p.send("community_id=" + id + "&post_context=" + text + "&post_title=" + title + "&captcha=" + captcha + "&ts=1461213815000");
    return p.responseText;
}


function query(ci){
    var q = new XMLHttpRequest();
    q.open("GET", "http://www.im9.com/api/query.detail.community.do?community_id=" + ci + "&captcha=" + captcha + "&ts=1461287235000", false);
    q.send();
    var data_1 = q.responseText;
    if(data_1.length != 54 && data_1.length != 53){
        var jsonObj_1 = JSON.parse(data_1);
        var pc = jsonObj_1.data.post_count;
        var mc = jsonObj_1.data.member_count;
        if(mc > 50000 || pc > 3000){
            console.log("兴趣圈 >>> " + ci + " >>> member_count:" + mc + " >>> post_count:" + pc + " >>> 那么多人怕被打死还是不发了!");
            return 0;
        }else{
            return 1;
        }
    }
}

function dajiahao(){
    for(var i = 0; i < 15000; i++){
        var title = ['(｡･ω･｡)标题不见了',
                     '0 0 看不到窝 看不到窝',
                     '若隐若现才是艺术！',
                     //回复句子，有需要还可以自己添加。
                    ];
        var default_title = title[Math.floor(Math.random()*title.length)];

        var text = ['(=・ω・=)我的腿让我停下，可是心却不允许我那么做。',
                    '(｀・ω・´)比起悲伤来说，无法分享快乐这件事，要更加的寂寞吧。',
                    '(｡･ω･｡)和哥哥的便当比起来夜空的薯片就像大便一样！只会给我大便的大便夜空是笨蛋～笨蛋～',
                    '你还是这么冷漠啊。不过，仅此而已的话，我是不会泄气的。(｀・ω・´)',
                    '只要能努力，就应当去努力；只要还能前进，就要向前走去。(=・ω・=)',
                    '(=・ω・=)因为我喜欢你，喜欢得想吃掉你啊！',
                    '呐，我们好像是，被宇宙和地球拆散的恋人似的。(=・ω・=)',
                    //回复句子，有需要还可以自己添加。
                   ];
        var default_text = text[Math.floor(Math.random()*text.length)];
        sleep(2500);
        if(query(i) == 1){
            join(i);
            console.log("已经关注兴趣圈 >>> " + i + " >>> 并发表了标题为:" + default_title + " >>> 内容为:" + default_text + " 的帖子 >>> 结果:" + publish(i,default_title,default_text));
        }
    }
}

show_confirm();
