// ==UserScript==
// @author            qs1210
// @name              京东订单评价填写助手
// @description       只用来学习使用, 其他原因使用出现的问题概不负责. 出了问题不要联系我...
// @match             *//club.jd.com/myJdcomments/myJdcomment.action?sort=0
// @include           *//club.jd.com/myJdcomments/orderVoucher.action*
// @version           0.1.1.3
// @connect-src       www.jd.com
// @namespace https://greasyfork.org/users/186407
// ==/UserScript==

(function () {
    'use strict';
    if (top.location.hostname == 'club.jd.com') {
        var t1,
             //引用了 krapnik 中的内容, 因为他的脚本不能用了, 估计是jd更新了. 所以自己重新写了下.
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
                '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）',
                '我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较垃圾的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。',
                '我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品',
                '非常感谢京东商城给予的优质的服务，从仓储管理、物流配送等各方面都是做的非常好的。送货及时，配送员也非常的热情，有时候不方便收件的时候，也安排时间另行配送。同时京东商城在售后管理上也非常好的，以解客户忧患，排除万难。给予我们非常好的购物体验。顺商祺！ Thank you very much for the excellent service provided by Jingdong mall, and it is very good to do in warehouse management, logistics, distribution and so on. Delivery in a timely manner, distribution staff is also very enthusiastic, and sometimes inconvenient to receive the time, but also arranged for time to be delivered. At the same time in the mall management Jingdong customer service is also very good, to solve customer suffering, overcome all difficulties. Give us a very good shopping experience. Shun Kei kei!',
            ];
        t1 = setInterval(function () {
            window.clearInterval(t1);
            var i = parseInt(10 * Math.random());
            //给星好评, 不一定都是 5 分
            $('.star5:visible').each(function (i, v) {
                console.log(i);
                Math.random(0, 1) > 0.5 ? $(this).click() : $(this).siblings('.star4').click();
            });
            var lena = $('.m-multi-tag:visible a') && $('.m-multi-tag:visible a').length;
            if (lena) {
                for (var index = 0; index < 3; index++) {
                    $('.m-multi-tag:visible a')[Math.floor(lena * Math.random())].click()
                }
            }

            // 填写内容
            var tLen = $('textarea:visible').length;
            if (tLen){
                for (var ti = 0; ti < tLen; ti++) {
                    $('textarea:visible').eq(ti).text(contentArr[Math.floor(contentArr.length * Math.random())]);
                }
            }

            window.setTimeout(function () {
                if(confirm("确定提交")) {
                    $('.btn-submit') && $('.btn-submit').click();
                }
            }, 500);
        
        }, 300);
    }
})();