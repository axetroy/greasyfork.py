// ==UserScript==
// @name         feederチャット - アナログ時計
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.364364
// @description  アナログ時計の表示
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // カスタマイズ領域
    // 時計の背景を時間経過によって切り替えるための時間(単位：秒)(数秒以内だと正常に動作しない)
    const time = 5;
    // 時計の背景にしたい画像のURLを改行で区切って指定
    const URLs = `
https://pbs.twimg.com/media/DdJytGBUQAEe2Jj.jpg
http://d2dcan0armyq93.cloudfront.net/photo/odai/600/5a226c2532dfe3625a18fc9d9d3c1f53_600.jpg
https://iwiz-chie.c.yimg.jp/im_sigg5eiVxu1_vv3NvFe9njIaYg---x320-y320-exp5m-n1/d/iwiz-chie/que-10185707560
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR5X1PWeId15YOaUUbQiX6kdFMXbbPzpdT2v-fs8GvEd0-Zt5tw
http://livedoor.blogimg.jp/psycologic/imgs/8/e/8e2e90f1.jpg
https://scontent.cdninstagram.com/vp/e3863fd4f1fc3837642484e59fc41b74/5D6BE5F6/t51.2885-15/e35/37974475_1107258616105061_5520178095245492224_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com
https://infotreasure.net/wp-content/uploads/2018/08/WS000521.jpg
https://iwiz-chie.c.yimg.jp/im_sigghHn.hvtLlHpQK0RW4efWiQ---x320-y320-exp5m-n1/d/iwiz-chie/que-10146429975
https://wikiwiki.jp/boudai/?plugin=attach&refer=%E9%87%8E%E7%8D%A3%E5%85%88%E8%BC%A9%E3%81%AB%E8%A6%8B%E3%81%88%E3%82%8B%E7%94%BB%E5%83%8F%E4%B8%80%E8%A6%A7&openfile=%E9%87%8E%E7%8D%A3%E5%85%88%E8%BC%A9%E6%A5%BD%E5%A4%A9%E3%82%AB%E3%83%BC%E3%83%89.jpg
https://cdn-ak.f.st-hatena.com/images/fotolife/n/nyacoron/20180504/20180504221427.jpg
https://iwiz-chie.c.yimg.jp/im_siggvjyTYR6ikGLNdrfKC4U0NQ---x320-y320-exp5m-n1/d/iwiz-chie/que-14190558549
http://tn.smilevideo.jp/smile?i=31377777.L
http://livedoor.blogimg.jp/soda234/imgs/e/8/e8a8c687.jpg
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpLSWsEFbBK-9tfLxtb4k-I7UYXgcUkJStjB_Lrm880XlOLd1
https://production.mtm-cdn.com/filmer/archives/92/387/866.jpg
http://livedoor.blogimg.jp/matomecrowd-nanj_yakyuu/imgs/e/7/e7079935.jpg
`;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const img_obj = (()=>{
        const array = URLs.split('\n').filter(v=>v);
        const activ_img = new Image();
        const setRandom = () => {
            activ_img.src = array[Math.floor(Math.random()*array.length)];
        };
        setRandom();
        return {img:activ_img,func:setRandom}
    })();
    const digital_watch_flag = true; // デジタル時計の設置
    const setMouseMoveEvent = (elm, x, y) => {
        $(elm).css("position", "fixed");
        $(elm).offset({ top: y, left: x });
        let dragging = false;
        const onDown = () => {dragging = true};
        elm.addEventListener('mousedown', onDown, false);
        const onMove = (e) => {
            if(!dragging) return;
            const x = e.clientX - $(elm).width() / 2 + scrollX;
            const y = e.clientY - $(elm).height() / 2 + scrollY;
            $(elm).offset({ top: y, left: x });
        };
        const onUp = () => {dragging = false};
        elm.addEventListener('mousemove', onMove, false);
        elm.addEventListener('mouseup', onUp, false);
    };
    const CLOCK_WIDTH = 300;
    const draw = (() => {
        const cv = $("<canvas>").get(0);
        $(cv).css("border-radius", 45.45 + "%");
        cv.width = CLOCK_WIDTH;
        cv.height = CLOCK_WIDTH;
        $("body").append(cv);
        setMouseMoveEvent(cv, $(window).width() - CLOCK_WIDTH, $(window).height() - CLOCK_WIDTH);
        const ctx = cv.getContext("2d");
        const half = CLOCK_WIDTH / 2;
        const CircleCoordinates = (degree, r) => {
            const radian = degree * ( Math.PI / 180 ) ;
            const x = half + r * Math.cos(radian);
            const y = half + r * Math.sin(radian);
            return {x:x, y:y};
        };
        const drawClockHand = (degree, r, color, width) => {
            const deg = degree - 90;
            ctx.beginPath(); // パスをリセット
            const result = CircleCoordinates(deg, r);
            ctx.moveTo( result.x, result.y );
            const result2 = CircleCoordinates(deg, -r * 0.1);
            ctx.lineTo( result2.x, result2.y )
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.stroke();
        };
        const shape = (num) => {
            return ('0' + num).slice(-2);
        };
        return () => {
            ctx.clearRect(0, 0, CLOCK_WIDTH, CLOCK_WIDTH);
            const img = img_obj.img;
            if(img) {
                const w = img.width, h = img.height;
                let rate, w2, h2;
                if(w < h) {
                    w2 = CLOCK_WIDTH;
                    h2 = (h/w)*CLOCK_WIDTH;
                }
                else {
                    h2 = CLOCK_WIDTH;
                    w2 = (w/h)*CLOCK_WIDTH;
                }
                ctx.drawImage(img_obj.img, (CLOCK_WIDTH-w2)/2, (CLOCK_WIDTH-h2)/2, w2, h2);
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(0,0,0,0.5)" ; // 塗りつぶしの色
            ctx.fillRect(0, 0, half*2, half*2); // 矩形の描画
            ctx.font = "30px 'ＭＳ Ｐゴシック'";
            ctx.fillStyle = "orange";
            for(let i = 0; i < 12; i++){
                const degree = i * 30 - 60;
                const result = CircleCoordinates(degree, half - 10);
                ctx.fillText(String(i + 1), result.x - 10, result.y + 10);
            }
            const now = getTime();
            drawClockHand(now.h * 30 + now.m * 0.5, half*0.5, "white", 8);
            drawClockHand(now.m * 6 + now.s * 0.1, half*0.7, "white", 5);
            drawClockHand(now.s * 6, half*0.8, "orange", 3);
            if(digital_watch_flag){
                const h = shape(now.h);
                const m = shape(now.m);
                const s = shape(now.s);
                ctx.fillText(h+':'+m+':'+s, half - 50, half + 70);
            }
        };
    })();
    const getTime = () => {
        const t = new Date();
        return {
            h: t.getHours(),
            m: t.getMinutes(),
            s: t.getSeconds()
        };
    };
    setInterval(draw, 1000);
    setInterval(img_obj.func, time*1000);
})();