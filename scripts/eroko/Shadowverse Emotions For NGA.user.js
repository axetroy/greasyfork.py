// ==UserScript==
// @name         Shadowverse Emotions For NGA
// @version      1.04
// @icon         http://bbs.nga.cn/favicon.ico
// @description  Add Shadowverse Emotions For NGA 为NGA论坛增加影之诗的表情
// @author       Eroko,Base on AgLandy's Emotion Script
// @include      /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn|ngabbs\.com)/.+/
// @grant        none
// @require      https://greasyfork.org/scripts/39014-nga-user-script-loader/code/NGA%20User%20Script%20Loader.js

// @namespace https://greasyfork.org/users/170904
// ==/UserScript==

//发布地址：https://bbs.nga.cn/read.php?tid=16399488
//以上地址依然接受新表情提交

(function(){

    function init($){

        let b = commonui.SVIcon = {
            data: [
                './mon_201902/14/-4vc3nQ5-6s83K26ToS6e-64.png',
                './mon_201902/14/-4vc3nQ5-c6uK1cToS6b-5e.png',
                './mon_201902/14/-7Q5-f228K5T8S37-47.jpg',
                './mon_201902/14/-7Q5-iaj1KgT8S2z-31.jpg',
                './mon_201902/14/-7Q5-ixnmK8ToS68-68.jpg',
                './mon_201902/14/-7Q5-5gl8K1cToS6m-4w.png',
                './mon_201902/14/-7Q5-5iu5KyToS60-56.png',
                './mon_201902/14/-7Q5-8t7uK2iT1kS6m-59.png',
                './mon_201902/14/-7Q5-enxeK9ToS4w-4w.jpg',
                './mon_201902/14/-7Q5-d7rpK19ToS6k-6p.jpg',
                './mon_201902/14/-7Q5-zr0ZtT1kS42-3g.gif',
                './mon_201902/14/-4vc3nQ5-k5o6KoToS3y-46.jpg',
                './mon_201902/14/-7Q5-efv3K8ToS3y-44.jpg',
                './mon_201902/14/-7Q5-1nr6KbToS4b-50.jpg',
                './mon_201902/14/-7Q5-1wb0K9ToS3y-44.jpg',
                './mon_201902/14/-7Q5-gokxK15ToS3y-44.jpg',
                './mon_201810/18/-4vc3nQ5-krlrKoToS7z-4a.jpg',
                './mon_201902/14/-7Q5-9ihqKnToS4r-4a.jpg',
                './mon_201902/14/-4vc3nQ5-hopnKxToS8w-82.jpg',
                './mon_201902/14/-4vc3nQ5-2youKtToS5g-77.jpg',
                './mon_201902/14/-4vc3nQ5-5hyaK1uT1kS95-9w.jpg',
                './mon_201902/14/-7Q5-30jtK8ToS63-5a.jpg',
                './mon_201902/14/-7Q5-2cqjK3ToS5i-40.jpg',
                './mon_201902/14/-4vc3nQ5-h8aoKvToS5m-5a.jpg',
                './mon_201902/14/-4vc3nQ5-1u9rK14ToS74-5c.jpg',
                './mon_201902/14/-4vc3nQ5-g2daK2kT1kSao-cg.jpg',
                './mon_201902/14/-4vc3nQ5-4we0KpToS5i-4n.jpg',
                './mon_201902/14/-4vc3nQ5-az04KpToS8c-6z.jpg',
                './mon_201902/14/-4vc3nQ5-eg7rZ10T1kSdo-e0.jpg',
                './mon_201902/14/-7Q5-9pgaK7ToS40-3a.jpg',
                './mon_201902/14/-7Q5-b3tyK18ToS4d-44.png',
                './mon_201902/14/-7Q5-9qhrKdToS4u-4o.jpg',
                './mon_201902/14/-7Q5-ekgzK11ToS6g-5w.gif',
                './mon_201902/14/-7Q5-4hkfK3T8S2l-2t.jpg',
                './mon_201902/14/-7Q5-7tzkK8T8S3k-4i.jpg',
                './mon_201902/14/-4vc3nQ5-fiqxZ1lT3cSb4-8b.gif',
                './mon_201902/14/-7Q5-l0dcK1cToS6o-6o.jpg',
                './mon_201902/14/-7Q5-33hyK9ToS5c-5c.jpg',
                './mon_201902/14/-7Q5-4913K5ToS42-3u.jpg',
                './mon_201902/14/-7Q5-5fbqKhToS6t-92.jpg',
                './mon_201902/14/-7Q5-8iwxKfToS5i-5h.jpg',
                './mon_201902/14/-7Q5-180oK5T8S3l-3l.jpg',
                './mon_201902/15/-4vc3nQ5-kvniKiToS59-5u.jpg',
                //Add 13 new emotions
                './mon_201902/15/-7Q5-a48kK5ToS5h-5e.jpg',
                './mon_201902/15/-7Q5-928tZnT1kS4s-3y.gif',
                './mon_201902/15/-7Q5-429mKeToS4y-6j.jpg',
                './mon_201902/15/-4vc3nQ5-cc0hZ12T3cSdw-a1.gif',
                './mon_201902/17/-4vc3nQ5-1f2cK2cT1kS7q-63.png',
                './mon_201902/16/-7Q5-3basKaToS4p-5c.jpg',
                './mon_201902/17/-4vc3nQ5-f8awK17ToS5k-4w.jpg',
                './mon_201902/16/-7Q5-18puKdToS5z-56.jpg',
                './mon_201902/16/-7Q5-17f0KdToS5y-5h.jpg',
                './mon_201902/16/-7Q5-1g9xKiToS6j-60.jpg',
                './mon_201902/16/-7Q5-1i6gKfToS69-5q.jpg',
                './mon_201902/16/-7Q5-1v81KjToS65-5n.jpg',
                './mon_201902/16/-7Q5-39tiKiToS6m-63.jpg',
            ],
            f: function(e){
                let n = $(e.target).next(),
                    t;
                if(n.children()[0])
                    return;
                if(e.target.name == 'SVIconStd')
                    t = b.data.slice(0, b.data.length);
                $.each(t, function(i, v){
                    n.append('<img height="100px" src="https://img.nga.178.com/attachments/' + v + '" onclick="postfunc.addText(\'[img]' + v + '[/img]\');postfunc.dialog.w._.hide()" />');
                });
            },
            r: function(){
                $('[title="插入表情"]:not([SVIcon])').attr('SVIcon', 1).bind('click.SVIconAddBtn', function(){
                    setTimeout(function(){
                        $('.single_ttip2 div.div3:has(button[name="0"]):not(:has(button[name^="SVIcon"]))').append('<button name="SVIconStd">Shadowverse</button><div></div>').find('[name^="SVIcon"]').bind('click.SVconBtn', b.f);
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