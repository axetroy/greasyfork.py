// ==UserScript==
// @author            krapnik
// @name              京东订单评价助手
// @description       京东商城商品自动评价脚本
// @match             *//club.jd.com/myJdcomments/myJdcomments.action?sort=0
// @include           *//club.jd.com/myJdcomments/myJdcomments.action?sort=0
// @version           0.3
// @connect-src       www.jd.com
// @namespace https://greasyfork.org/users/151668
// ==/UserScript==

(function() {
    'use strict';
    if(top.location.hostname=='club.jd.com'){
        var t1,
            contentArr = ['商品质量很好，很满意，配送速度快啊，而且配送员态度也非常好。',
                      '挺好的，非常实用。京东的物流很快哟~希望以后会更快╭(╯3╰)╮',
                      '多快好省，京东给力，下次还是要选择京东商城，没错，非常满意',
                      '非常好，一起买的，价格便宜，快递又快，京东商城还是非常的专业和贴心，可以显示快递的位置，随时掌握快递进度，很先进！',
                      '活动期间买的很实惠，京东自营，值得信赖。',
                      '便宜好用，值得推荐买买买，同事都说好用。下次继续买买买，哈哈哈…',
                      '京东物流就是一个字快，昨晚10点多，11点前下的单今天早上就收到，包装得很好。',
                      '京东购物使我们的生活更便捷了！京东商品丰富，无所不有，自营商品更是价格优惠，童叟无欺。快递给力，包装实在。体验足不出户购物的感觉，就在京东！购物就上京东，有京东，足够！',
                      '一直上京东商城网购，东西非常不错，价格便宜，物流快，是正品',
                      '质量很好，性价比高，值得购买，送货速度快！！',
                      '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）'
                      ];
        t1 = setInterval(function (){
            var i =parseInt(10*Math.random());
            if($('.comt-plist').length==0){
                clearInterval(t1);
                alert('暂无更多评价商品，已停止评价！');
            }
            //关闭提示窗口
            var close=$('.fail-close');
                if(close.length>0){
                close.click();
            }
            //评价第一个商品
            var assess=$('.btn-9').eq(0);
            if(assess!=null){
                assess.click();
                setTimeout(function(){
                    var area=$('.area01');
                    area.val(contentArr[i]);
                    area.attr('id','id0');
                    $('#id0').blur();
                    //五星好评
                    var star=$('.star5');
                    star.click();
                },5000);
                //提交内容
                setTimeout(function(){
                    var submit=$('.btn-5');
                    submit.click();
                },8000);
            }
        },12000);
    }
})();