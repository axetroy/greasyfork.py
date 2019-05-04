// ==UserScript==
// @name        Tony淘宝&天猫一键好评
// @description Tony淘宝&天猫评价页面添加一键好评按钮
// @version     1.0.1
// @author       Tony Liu
// @namespace    https://www.abmbio.xin/
// @include     http://rate.taobao.com/*
// @include     https://rate.taobao.com/*
// @include     http://ratewrite.tmall.com/*
// @include     https://ratewrite.tmall.com/*
// @icon         https://www.abmbio.xin/favicon.ico
// ==/UserScript==

var host = window.location.host;
var isTB = host === 'rate.taobao.com';
var isTM = host === 'ratewrite.tmall.com';
if (isTB) {
    taobaoFun();
} else if (isTM) {
    var timer = setInterval(detection, 1000);
    detection();
}
tj();
// 淘宝一键好评
function taobaoFun() {
    var tbParentElem = document.querySelector('.submitbox');
    var tbSubmitBtn = document.querySelector('.J_submit_rate');
    var tbNewDir = document.createElement('button');
    tbNewDir.innerHTML = '一键好评';
    tbNewDir.className = 'tb-rate-btn type-primary tb-rate-btn haoping';
    tbNewDir.style.marginLeft = '50px';
    tbNewDir.onclick = function() {
        var tbRateMsg = document.querySelectorAll('.rate-msg');
        for (var i = 0, a; a = tbRateMsg[i++];) {
            a.value = "质量非常好，与卖家描述的完全一致，非常满意，真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物。掌柜好人，一生平安。"
        }

        var tbGoodRate = document.querySelectorAll('.good-rate');
        for (var k = 0, b; b = tbGoodRate[k++];) {
            b.click();
        }

        var tbStar = document.querySelectorAll('.ks-simplestar img');
        tbStar[4].click();
        tbStar[9].click();
        tbStar[14].click();

        tbSubmitBtn.click();
    };

    tbParentElem.appendChild(tbNewDir);

    setTimeout(function(){
        tbNewDir.onclick();
    },1000);
    setTimeout(function(){
        //window.close();
    },2800);
}
// 天猫一键好评
function tmallFun() {
    var tmParentElem = document.querySelector('.compose-btn');
    var tmSubmitBtn = document.querySelector('.compose-btn [type="submit"]');
    var tmNewDir = document.createElement('button');
    tmNewDir.innerHTML = '一键好评';
    tmNewDir.className = 'tb-rate-btn type-primary tb-rate-btn haoping';
    tmNewDir.style.background = 'white';
    tmNewDir.style.color = '#c40000';
    tmNewDir.style.border = 'inset 1px #c40000';
    tmNewDir.onclick = function() {
        document.querySelector('.J_textInput').shadowRoot.querySelector('#textEditor').shadowRoot.querySelector('#textEl').value = getReview();
        var tmStar = document.querySelectorAll('[data-star-value="5"]');
        for (var i = 0, a; a = tmStar[i++];) {
            a.click();
        }
        tmSubmitBtn.click();
    };
    console.log(tmParentElem);
    console.log(tmNewDir);
    tmParentElem.appendChild(tmNewDir);
}
function getReview(){
    var contentArr = ['商品质量很好，很满意，配送速度快啊，而且配送员态度也非常好。',
                      '挺好的，非常实用。配送很快哟~希望以后会更快╭(╯3╰)╮',
                      '淘宝购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较差的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。',
                      '当大家看到我的这一篇评价时，表示我对产品是认可的，尽管我此刻的评论是复制黏贴的。这一方面是为了肯定商家的服务，另一方面是为了节省自己的时间，因为差评我会直接说为什么的。所以大家就当作是产品质量合格的意思来看就行了。最后祝京东越做越好，大家幸福平安，中华民族繁荣昌盛。',
                      '质量非常好,与卖家描述的完全一致, 真的很喜欢,完全超出期望值,发货速 度非常快,包装非常仔细、严实,物流公司服务态度很好,运送速度很快,很满意的一次购物质量很好, 希望更多的朋友信赖. 店主态度特好, 我会再次光顾的好卖家 赞，发货迅速，态度很好，很满意！很好很好！网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉， 很热情的卖家，下次还来希望下次还有机会合作祝你生意兴隆质量非常好，出乎我的意料包装非常仔细。下次有机会再找你，店家人蛮好的，东东很不错,淘到心意的宝贝是一件让人很开心的事',
                      '多快好省，商品给力，下次还是要选择该店铺，没错，非常满意',
                      '经常网购有大量包裹要收。感觉每次写评论都要花费我大量的时间和精力。所以在一段时间里，我总觉得，不想去写评论，或者是随便写写。但是我又于心不忍。有些对不住那些，热情的客服，送货的送货员，还有仓库管理员等等。于是我写下了一小段话。给予那些我觉得可以获得好五星好评的宝贝评价里面，以示感激和尊敬。宝贝的性价比很高。',
                      '我为什么喜欢在京东买东西，因为今天买明天就可以送到。我为什么每个商品的评价都一样，因为在京东买的东西太多太多了，导致积累了很多未评价的订单，所以我统一用段话作为评价内容。京东购物这么久，有买到很好的产品，也有买到比较坑的产品，如果我用这段话来评价，说明这款产品没问题，至少85分以上，而比较差的产品，我绝对不会偷懒到复制粘贴评价，我绝对会用心的差评，这样其他消费者在购买的时候会作为参考，会影响该商品销量，而商家也会因此改进商品质量。',
                      '宝贝是性价比很高的,我每次都会先试用再评价的,虽然宝贝不一定是最好的,但在同等的价位里面绝对是表现最棒的。希望卖家能再接再厉，做得更大更强，提供更多更好的东西给大家。为本店的商品和服务点赞。。',
                      '非常好，一起买的，价格便宜，快递又快，卖家客服还是非常的专业和贴心，可以显示快递的位置，随时掌握快递进度，很先进！',
                      '活动期间买的很实惠，东西很好，值得信赖。',
                      '便宜好用，值得推荐买买买，同事都说好用。下次继续买买买，哈哈哈…',
                      '质量很好，性价比高，值得购买，送货速度快！！',
                      '怒赞！（此评论虽仅有两个字，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足可见评论人扎实的文字功底和信手拈来的写作技巧，再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，把评论人的感情表达得淋漓尽致，有浑然天成之感，实乃评论中之极品，祝福中之绝笔也）',
                      '质量非常好，与卖家描述的完全一致，非常满意，真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，物流公司服务态度很好，运送速度很快，很满意的一次购物。掌柜好人，一生平安。'
                     ];
    var content = contentArr[Math.floor(Math.random() * contentArr.length)] + ',很愉快的一次购物。';
    return content;
}
function tj(){
    var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?7f9964d6e2815216bcb376aa3325f971";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
}
function detection() {
    var haoping = document.querySelector('.haoping');
    if (!haoping) {
        tmallFun();
    } else {
        clearInterval(timer);
    }
}