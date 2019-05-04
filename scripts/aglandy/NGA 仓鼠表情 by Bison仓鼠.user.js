// ==UserScript==
// @name         NGA 仓鼠表情 by Bison仓鼠
// @namespace    https://greasyfork.org/zh-CN/scripts/29072-nga-%E4%BB%93%E9%BC%A0%E8%A1%A8%E6%83%85-by-bison%E4%BB%93%E9%BC%A0
// @version      1.1.0.20180312
// @icon         http://bbs.nga.cn/favicon.ico
// @description  将 Bison仓鼠 制作的仓鼠表情加入到表情列表中
// @author       AgLandy
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js
// ==/UserScript==

//原作者微博：http://weibo.com/bisonbison
//原作者pixiv：https://www.pixiv.net/member.php?id=333556
//此脚本发布地址：http://bbs.ngacn.cc/read.php?tid=11430750

(function(){

    function init($){

        let b = commonui.bisonHamster = {
            data: [
                './mon_201704/18/-371yQ2g-knq8K2S1o-1o.png',
                './mon_201704/18/-371yQ2g-ezomK2S1o-1o.png',
                './mon_201704/18/-371yQ2g-9eecK2S1o-1o.png',
                './mon_201704/18/-371yQ2g-3s7fK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-je1aK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-dxc9K5T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-8dtsK2S1o-1o.png',
                './mon_201704/18/-371yQ2g-2tg4K4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-iuj5K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-cfv5K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-6tkuK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-1cawK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-hctdK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-byg4K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-6j3xK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-ziyK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-gzrpK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-bh6hK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-5xulK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-gh2K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-gdpxK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-avbnK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-5fvmK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-l6y6K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-fqtqK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-aa2qK2S1o-1o.png',
                './mon_201704/18/-371yQ2g-4tlgK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-kqdaK4S1o-1o.png',
                './mon_201704/18/-371yQ2g-f8bhK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-8ncaK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-32t1K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-ix6vK5T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-deamK4S1o-1o.png',
                './mon_201704/18/-371yQ2g-7xpzK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-2bvnK2S1o-1o.png',
                './mon_201704/18/-371yQ2g-ibecK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-cwd3K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-77c9K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-1fu7K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-hfdjK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-bv6kK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-6cyoK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-obnK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-gljoK5T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-ay70K4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-5bu7K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-l920K4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-fgcmK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-9xz1K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-3gm2K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-jav6K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-dnwtK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-8264K4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-2mcmK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-imt6K4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-d77jK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-7rwuK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-24psK4T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-hx0uK5T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-cdh9K5T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-6wg8K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-idu7K2S1o-1o.png',
                './mon_201704/18/-371yQ2g-cxczK6T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-733iK6T8S1o-1o.png',
                './mon_201704/18/-371yQ2g-1iw7K3S1o-1o.png',
                './mon_201704/18/-371yQ2g-hflqK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-bzdwK3S1o-1o.png',
                './mon_201704/18/-371yQ2g-6k2qK3S1o-1o.png',
            ],
            f: function(e){
                let n = $(e.target).next(),
                    t;
                if(n.children()[0])
                    return;
                if(e.target.name == 'bisonHamster1')
                    t = b.data.slice(0, Math.ceil(b.data.length / 2));
                else
                    t = b.data.slice(Math.ceil(b.data.length / 2));
                $.each(t, function(i, v){
                    n.append('<img height="60px" src="http://img.ngacn.cc/attachments/' + v + '" onclick="postfunc.addText(\'[img]' + v + '[/img]\');postfunc.dialog.w._.hide()" />');
                });
            },
            r: function(){
                $('[title="插入表情"]:not([bisonHamster])').attr('bisonHamster', 1).bind('click.bisonHamsterAddBtn', function(){
                    setTimeout(function(){
                        $('.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name^="bisonHamster"]))').append('<button name="bisonHamster1">仓鼠1</button><div></div><button name="bisonHamster2">仓鼠2</button><div></div>').find('[name^="bisonHamster"]').bind('click.bisonHamsterBtn', b.f);
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





