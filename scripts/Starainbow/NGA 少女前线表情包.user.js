// ==UserScript==
// @name         NGA 少女前线表情包
// @version      1.0.0.1
// @icon         http://bbs.nga.cn/favicon.ico
// @description  将쮸운制作的Sop2表情和苏初雨制作的官方表情及若干GIF加入表情选择列表
// @author       原作者:AgLandy,本文件由Starainbow魔改
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn|ngabbs\.com)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// @namespace https://greasyfork.org/users/238764
// ==/UserScript==

//原仓鼠表情脚本的发布地址：https://nga.178.com/read.php?tid=11430750
//SOP2表情的发布地址：http://m.dcinside.com/board/gfl2/362213
//此脚本的发布地址：http://nga.178.com/read.php?tid=16127479

(function(){

    function init($){

        let b = commonui.GFIcon = {
            data: [
                './mon_201901/11/-klbw3Q5-gq1dKaT8S2s-2s.gif',
                './mon_201901/22/-klbw3Q5-jq7cZtToS2s-2s.gif',
                './mon_201901/11/-klbw3Q5-4j3kK7T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-6fo2KdT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-7ogmK4T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-5y0pKjToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-kcziK3T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-erjzK3T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-daxdKiToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-aam7KdT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-7jg3K4T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-k393K4T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-fulsKfT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-1g1KaT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-5nn2K3T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-b8asKfT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-hf97KbT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-24c5KcT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-daqcK4T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-j0p5KbT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-3b6jKgT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-8wxkKhT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-4sedK2T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-aej0KeT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-fz52KdT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-oi5K8T8S2s-2s.jpg',
                './mon_201901/11/-klbw3Q5-97uKbT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-bk5xKbT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-h5jqKfT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-1qhyKeT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-d3drKjToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-ioolKaT8S2s-2s.png',
                './mon_201901/11/-klbw3Q5-2w10KlToS2s-2s.jpg',//以上为sop2的表情，总计33个
                './mon_201901/11/-klbw3Q5-7nk8KmToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-dkj1KoToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-1humKzToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-3yg3KlToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-jjdbKpToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-drqtKnToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-7vj9KpToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-1zvjKrToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-hmbxKoToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-bscbKrToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-4rgkKmToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-jzojKnToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-dwiyKmToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-7xmgKlToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-269lKnToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-hv11KlToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-c4zuKnToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-65bfKoToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-329KmToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-fo16KqToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-9sjhKnToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-3xchKqToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-fzpcKlToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-9wszKmToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-43h2KpToS2s-2s.png',
                './mon_201901/11/-klbw3Q5-jm7nKoToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-dtfxK14ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-7nxaK12ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-1cdaKwToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-gvf2K17ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-7aflKyToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-gkwaK12ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-a6btK16ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-4eqkK11ToS2s-2s.png',
                './mon_201901/24/-klbw3Q5-k09jK17ToS2s-2s.png',//以上为sop2的表情，总计33+25=68个
                './mon_201901/24/-klbw3Q5-i8mnKqToS2g-2s.gif',
                './mon_201901/24/-klbw3Q5-hc3cK9T8S2g-2s.gif',
                './mon_201901/24/-klbw3Q5-bnofKsToS2g-2s.gif',
                './mon_201901/24/-klbw3Q5-5tghKsToS2m-2s.gif',
                './mon_201901/24/-klbw3Q5-ka7xKaT8S2g-2s.gif',
                './mon_201901/24/-klbw3Q5-c43iK6T8S2g-2s.gif',
                './mon_201901/24/-klbw3Q5-6jl8K8T8S2g-2s.gif',
                './mon_201901/24/-klbw3Q5-8etpK1jToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-fhsK2eToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-2wtvZfToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-3douZfToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-ftcuKhToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-4zqfKxToS2s-2s.gif',
                './mon_201901/24/-klbw3Q5-e4q5ZuToS2s-2s.gif',
            ],
            f: function(e){
                let n = $(e.target).next(),
                    t;
                if(n.children()[0])
                    return;
                if(e.target.name == 'GFIconSop')
                    t = b.data.slice(0, 33);
                else if(e.target.name == 'GFIconOffical')
                    t = b.data.slice(33, 68);
                else
                    t = b.data.slice(68, b.data.length);
               $.each(t, function(i, v){
                    n.append('<img height="100px" src="https://img.nga.178.com/attachments/' + v + '" onclick="postfunc.addText(\'[img]' + v + '[/img]\');postfunc.dialog.w._.hide()" />');
                });
            },
            r: function(){
                $('[title="插入表情"]:not([GFIcon])').attr('GFIcon', 1).bind('click.GFIconAddBtn', function(){
                    setTimeout(function(){
                        $('.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name^="GFIcon"]))').append('<button name="GFIconSop">Sop2</button><div></div><button name="GFIconOffical">少前官方</button><div></div><button name="GFIconOthers">少前其他</button><div></div>').find('[name^="GFIcon"]').bind('click.GFIconBtn', b.f);
                    },100);
                });
            },
            mo: new MutationObserver(function(){
                b.r();
            })
        };

        b.r();

        b.mo.observe($('body')[0], {
            childList: true,
            subtree: true,
        });

    }

    (function check(){
        try{
            init(commonui.userScriptLoader.$);
        }
        catch(e){
            setTimeout(check, 50);
        }
    })();

})();