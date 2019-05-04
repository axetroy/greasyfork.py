// ==UserScript==
// @name        accessibility_知乎键盘访问优化
// @namespace    https://www.zhihu.com/people/yin-xiao-bo-11
// @version      0.6
// @description  针对知乎的屏幕阅读器可访问性优化
// @author       Veg
// @include        https://*.zhihu.com/*
// @exclude        https://zticket.in.zhihu.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function () {
`use strict`;
let accessToken;
// function prohibitScroll(e) {e.stopPropagation();}

function middlewareFunction() {
let token = window.location.href.substring(20).split('/');
let search = token[1].split('?');
if (token[1] == 'follow' || token[1] == 'hot' || token[1] == '') {
var follow = document.querySelectorAll(`a[href="/follow"]`);
for (var i = 0, l = follow.length; i < l; i++) {
if (follow[i] !== null && l == 2) {
var parent = follow[0].parentNode.parentNode.parentNode.parentNode;
var parents = parent.parentNode;
parents.removeChild(parent);
}
}
}
if (token[1] == 'topic') {
var follow = document.querySelectorAll('button.FollowButton');
for (var i = 0, l = follow.length; i < l; i++) {
if (follow[i] !== null && l == 2) {
var parent = follow[0].parentNode.parentNode.parentNode;
var parents = parent.parentNode;
parents.removeChild(parent);
}
}
}
if (token[1] == 'question') {
amo(queryTitle);
}
if (token[1] == 'people' || token[1] == 'org') {
var div = document.querySelectorAll("div.ProfileMain-header");
for (var i = 0, l = div.length; i < l; i++) {
if (div[i] !== null && l == 2) {
var parents = div[0].parentNode;
var delDiv = parents.querySelector("div.ProfileMain-header");
parents.removeChild(delDiv);
}
}
}
}

(function () {
setTimeout(function () {
proc(document);
insdel(document);
amo(insdel);
amo(proc);
amo(globalShortcutKey);
middlewareFunction();
amo(middlewareFunction);
}, 10);
})();

function amo(processFunction) {
var mCallback = function (records) {
records.filter(function (record) {
if (record.type == 'childList' && record.addedNodes.length >= 1) {
var newNodes = record.addedNodes;
for (var i = 0, len = newNodes.length; i < len; i++) {
if (newNodes[i].nodeType == 1) {
processFunction(newNodes[i]);
mo.takeRecords();
}
}
}
});
};
var mo = new MutationObserver(mCallback);
mo.observe(document.body, {
'childList': true,
'subtree': true
});
}

//问题页
//隐藏问题页重复标题
function queryTitle() {
var title = document.querySelector('h1.QuestionHeader-title');
if (title !== null) {
title.setAttribute('aria-hidden', 'true');
}
}
//内容快捷键


function globalShortcutKey() {
// var timeline = document.querySelectorAll('div.TopstoryItem, div.List-item,div.QuestionAnswer-content');
var timeline = document.querySelectorAll(`div.TopstoryItem, div.QuestionAnswer-content, div.List-item`);
for (var i = 0, l = timeline.length; i < l; i++) {
if (timeline[i] !== null && timeline[i].hasAttribute(`tabindex`)) {
if (!timeline[i].classList.contains(`kjj`)) {
timeline[i].classList.add(`kjj`);
var p = document.createElement("p");
p.innerHTML = i + 1;
timeline[i].insertBefore(p, timeline[i].firstChild);
//timeline[i].addEventListener("keydown", shortcutKey, null);
}
}

}
}
//细节优化

function proc(d) {
//搜索
var search = d.querySelector('div.SearchBar-input');
if (search !== null) {
search.querySelector('input[placeholder]').setAttribute('aria-label', '搜索');
}
//给图片增加 alt 属性
var img = document.querySelectorAll(`img[src]`);
for (var i = 0, l = img.length; i < l; i++) {
if (img[i] !== null && !img[i].hasAttribute(`alt`)) {
img[i].setAttribute(`alt`, i + 1 + '图片');
}
}

//补货通知
if (d.querySelector(`div.Notification-textSection`) !== null) {
//var noticeText = notice.innerText;
voiceTTS(d.querySelector(`div.Notification-textSection`).innerText);
}
/*
var notices = d.querySelector('div.GlobalAlert'); {
if (notices !== null) {
var noticeText = notices.innerText;
voiceTTS(noticeText);
}
}
*/
//选项卡
var tab = d.querySelectorAll('[role="tab"], [role="tablist"]');
for (var i = 0, l = tab.length; i < l; i++) {
if (tab[i] !== null) {
tab[i].removeAttribute('role', '*');
}
}
//公共编辑理由、写想法、反对理由、问题编辑理由、上传视频、上传文档
var ly = d.querySelectorAll('button.Select-option, div.VoteDownReasonMenu-reason, div.QuestionEdit-reason, span.TopstoryHeader-navItemPin, div.Editable-docModal-uploader-text, div.Editable-videoModal-uploader-text');
for (var i = 0, l = ly.length; i < l; i++) {
if (ly[i] !== null) {
ly[i].setAttribute('role', 'button');
ly[i].setAttribute('tabindex', '0');
ly[i].classList.add('zhihu-click');
}
}
//社交帐号登录
var social = d.querySelectorAll('button.Login-socialButton');
for (var i = 0, l = social.length; i < l; i++) {
if (social[i] !== null) {
social[0].innerHTML = '微信登录';
social[1].innerHTML = '微博登录';
social[2].innerHTML = 'QQ 登录';
}
}
//登录和注册的切换按钮


if (document.title == '知乎 - 有问题上知乎') {
var dl = d.querySelectorAll('span');
for (var i = 0; i < dl.length; i++) {
var name = dl[i].innerText;
if (name == '注册' || name == '登录') {
dl[i].setAttribute('tabindex', '0');
dl[i].setAttribute('role', 'button');
dl[i].onkeydown = function (k) {
if (k.keyCode == 32 || k.keyCode == 13) {
this.click();
}
}
}
}
}
//工具栏提示
var toolbar = d.querySelectorAll('[data-tooltip]');
for (var i = 0, l = toolbar.length; i < l; i++) {
if (toolbar[i] !== null) {
var text = toolbar[i].getAttribute("data-tooltip");
toolbar[i].setAttribute("aria-label", text);
if (text == "不感兴趣") {
toolbar[i].setAttribute("tabindex", "-1");
}
}
}

//优化一些菜单项
var hdxx = d.querySelectorAll('button[aria-expanded], button[aria-owns]');
for (var i = 0, l = hdxx.length; i < l; i++) {
if (hdxx[i] !== null) {
//优化排序菜单
if (hdxx[i].classList.contains("Select-button")) {
hdxx[i].removeAttribute("role", "combobox");
}
hdxx[i].removeAttribute("aria-expanded", "*");
hdxx[i].removeAttribute("aria-haspopup", "*");
hdxx[i].removeAttribute('aria-owns', '*');
}
}

//给消息、私信、我增加名称
var name = d.querySelectorAll("button.PushNotifications-icon,button.Messages-icon,button.AppHeader-profileEntry");
for (var i = 0, l = name.length; i < l; i++) {
if (name[i] !== null) {
var ad = name[i].lastChild;
if (ad.tagName == "DIV")
break;
if (name[0].classList.contains("PushNotifications-icon")) {
var div = document.createElement("div");
div.innerHTML = " 消息";
name[0].appendChild(div);
}
if (name[1].classList.contains("Messages-icon")) {
var div = document.createElement("div");
div.innerHTML = " 私信";
name[1].appendChild(div);
}
name[2].setAttribute("aria-label", "我");
}
}
//隐藏一句话介绍
var grText = d.querySelectorAll('div.AuthorInfo-badgeText, span.Footer-dot');
for (var i = 0, l = grText.length; i < l; i++) {
if (grText[i] !== null) {
grText[i].setAttribute("aria-hidden", "true");
}
}

//优化对话框访问
(function () {
setTimeout(function () {
var dhk = d.querySelectorAll("div.Modal");
for (var i = 0; i < dhk.length; i++) {
if (dhk[i] !== null) {
dhk[i].setAttribute("role", "dialog");
dhk[i].setAttribute("aria-labelledby", ":1");
var dhks = dhk[i].querySelectorAll("h3.Modal-title,div.Topbar-title,.CommentTopbar-title");
for (var g = 0; g < dhks.length; g++) {
dhks[g].setAttribute("id", ":1");
}
}
}
}, 80);
})();

//给移除按钮增加名称
var yc = d.querySelectorAll("button.Tag-remove");
for (var i = 0, l = yc.length; i < l; i++) {
if (yc[i] !== null) {
yc[i].setAttribute("aria-label", "移除");
}
}

//删除选择语言
var delInput = d.querySelectorAll('input[placeholder="选择语言"]');
for (var i = 0; i < delInput.length; i++) {
if (delInput[i] !== null) {
var qn = delInput[i].parentNode;
var sc = qn.querySelector('input[placeholder="选择语言"]');
qn.removeChild(sc);
}
}

//删除头像
var tx = d.querySelectorAll('a.UserLink-link');
for (var i = 0, l = tx.length; i < l; i++) {
if (tx[i] !== null) {
var qn = tx[i].parentNode;
var sc = qn.querySelector('a.UserLink-link');
var img = sc.querySelector('img');
if (img !== null) {
qn.removeChild(sc);
}
}
}

//给匿名用户文本增加焦点
var users = d.querySelectorAll('span.UserLink');
for (var i = 0; i < users.length; i++) {
if (users[i] !== null) {
var names = users[i].innerText;
if (names == '匿名用户') {
users[i].setAttribute('tabindex', '0');
users[i].setAttribute('role', 'link');
}
}
}

//删除匿名用户头像
var tx = d.querySelectorAll('img[alt="匿名用户"]');
for (var i = 0, l = tx.length; i < l; i++) {
if (tx[i] !== null) {
var qn = tx[i].parentNode;
var sc = qn.querySelector('img[alt="匿名用户"]');
qn.removeChild(sc);
}
}

//处理评论
var plButton = d.querySelectorAll('div.CommentItem-footer,div.CommentItemV2-footer');
for (var g = 0, l = plButton.length; g < l; g++) {
if (plButton[g] !== null) {
plButton[g].setAttribute('tabindex', '-1');
plButton[g].setAttribute('role', 'link');
}
}


//优化展开阅读全文后的键盘焦点
var zk = d.querySelectorAll("button.ContentItem-more,button.ContentItem-rightButton");
for (var i = 0, l = zk.length; i < l; i++) {
if (zk[i] !== null) {
zk[i].addEventListener("click", focusA, null);
}
}


//优化收起后的键盘焦点
var sq = d.querySelectorAll("button.ContentItem-action");
for (var i = 0, l = sq.length; i < l; i++) {
if (sq[i] !== null) {
sq[i].addEventListener("click", focusB, null);
}
}


//优化选中提示
var ts = d.querySelectorAll("button.AnswerItem-selectMenuItem,button.TopstoryItem-uninterestTag");
for (var i = 0, l = ts.length; i < l; i++) {
if (ts[i] !== null) {
ts[i].setAttribute("role", "menuitemcheckbox");
if (ts[i].classList.contains("is-selected") || ts[i].classList.contains("is-active")) {
ts[i].setAttribute("aria-checked", "true");
}
}
}



//优化赞同按钮
var zt = d.querySelectorAll("button.VoteButton--up");
for (var i = 0, l = zt.length; i < l; i++) {
if (zt[i] !== null) {
zt[i].removeAttribute("aria-label", "*");
}
}

//优化反对按钮
var fd = d.querySelectorAll("button.VoteButton--down");
for (var i = 0, l = fd.length; i < l; i++) {
if (fd[i] !== null) {
fd[i].removeAttribute("aria-label", "*");
fd[i].removeAttribute('aria-owns', '*');
var ad = fd[i].querySelector('div');
if (ad == null) {
var span = document.createElement("div");
if (fd[i].classList.contains("is-active")) {
span.innerHTML = "已反对";
fd[i].appendChild(span);
} else {
span.innerHTML = "未反对";
fd[i].appendChild(span);
}
}
}
}


//优化赞按钮
var zan = d.querySelectorAll("button.LikeButton,button.CommentItem-likeBtn,button.PostIndex-voteButton,button.CommentItemV2-likeBtn");
for (var i = 0, l = zan.length; i < l; i++) {
if (zan[i] !== null) {
zan[i].removeAttribute('aria-label', '*');
var zanName = zan[i].innerText;
var ad = zan[i].querySelector('span');
if (ad == null) {
var span = document.createElement("span");
if (zan[i].classList.contains("is-active") || zan[i].classList.contains("is-liked") || zan[i].classList.contains("Button--primary")) {
span.innerHTML = " 取消赞";
zan[i].appendChild(span);
} else {
if (zanName !== "赞") {
span.innerHTML = " 赞";
}
zan[i].appendChild(span);
}
}
}
}

//鼓掌
var gz = d.querySelectorAll("button.PinIndex-reactionButton,button.ReactionButton");
for (var i = 0, l = gz.length; i < l; i++) {
if (gz[i] !== null) {
gz[i].removeAttribute("aria-label", "*");
var ad = gz[i].querySelector('span');
if (ad == null) {
var span = document.createElement("span");
if (gz[i].classList.contains("Button--primary") || gz[i].classList.contains("is-active")) {
span.innerHTML = " 已鼓掌";
gz[i].appendChild(span);
} else {
span.innerHTML = " 鼓掌";
gz[i].appendChild(span);
}
}
}
}

}


//阅读全文的事件函数
function focusA() {
var x = this.parentNode.parentNode.parentNode.children;
for (var i = 0; i < x.length; i++) {
x[i].querySelector("a").focus();
}
}

function focusB() {
var x = this.parentNode.parentNode.parentNode.parentNode.children;
for (var i = 0; i < x.length; i++) {
x[i].querySelector("a").focus();
}
}


//点击的事件委托
document.addEventListener("click", function (event) {
var t = event.target;
var span = t.lastChild;
//反对按钮
if (t.classList.contains("VoteButton--down")) {
if (t.classList.contains("is-active")) {
span.innerHTML = "已反对";
} else {
span.innerHTML = "未反对";
}
}
//赞按钮
if (t.classList.contains("LikeButton") || t.classList.contains("CommentItem-likeBtn") || t.classList.contains("PostIndex-voteButton") || t.classList.contains('CommentItemV2-likeBtn')) {
if (t.classList.contains("is-active") || t.classList.contains("is-liked") || t.classList.contains("Button--primary")) {
(function () {
setTimeout(function () {
span.innerHTML = " 取消赞";
t.removeAttribute('aria-label', '*');
}, 20);
})();
} else {
(function () {
setTimeout(function () {
span.innerHTML = " 赞";
t.removeAttribute('aria-label', '*');
}, 20);
})();
}
}
//鼓掌
if (t.classList.contains("PinIndex-reactionButton") || t.classList.contains("ReactionButton")) {
if (t.classList.contains("Button--primary") || t.classList.contains("is-active")) {
span.innerHTML = " 已鼓掌";
(function () {
setTimeout(function () {
t.removeAttribute('aria-label', '*');
}, 300);
})();
} else {
span.innerHTML = " 鼓掌";
(function () {
setTimeout(function () {
t.removeAttribute('aria-label', '*');
}, 300);
})();
}
}

//选中提示
if (t.classList.contains("TopstoryItem-uninterestTag")) {
if (t.classList.contains("is-active")) {
t.setAttribute("aria-checked", "true");
} else {
t.setAttribute("aria-checked", "false");
}
}
//查看对话
if (t.classList.contains("CommentItem-talkBtn")) {
t.classList.add("focus-viewDialogue");
}
if (t.classList.contains("CommentTopbar-back")) {
var viewDialogue = document.querySelector(".focus-viewDialogue"); {
viewDialogue.classList.remove("focus-viewDialogue");
viewDialogue.focus();
}
}
}, null);

//导航快捷键在非内容区的功能
document.body.addEventListener("keydown", function (k) {
if (k.shiftKey) return false;
shareShortcutKey(k);
var content = document.querySelectorAll('div.kjj');
for (var i = 0, l = content.length; i < l; i++) {
if (k.altKey && k.keyCode == 65) {
content[0].focus();
}
if (k.altKey && k.keyCode == 90) {
content[l - 1].focus();
}
}

var downReason = document.querySelectorAll('div.VoteDownReasonMenu-reason');
for (var i = 0; i < downReason.length; i++) {
if (k.keyCode == 49) {
downReason[0].click();
}
if (k.keyCode == 50) {
downReason[1].click();
}
if (k.keyCode == 51) {
downReason[2].click();
}
if (k.keyCode == 52) {
downReason[3].click();
}
}
//键盘点击
var t = k.target;
if (t.classList.contains('kjj')) {
if (k.keyCode == 13) {
navigator.clipboard.writeText(t.innerText);
}

if (k.keyCode == 86) {
t.querySelector('button.VoteButton--up').click();
t.querySelector('button.VoteButton--up').focus();
}
if (k.keyCode == 68) {
t.querySelector('button.VoteButton--down').click();
t.querySelector('button.VoteButton--down').focus();
}
}

if (t.classList.contains('zhihu-click')) {
if (k.keyCode == 13 || k.keyCode == 32) {
t.click();
}
}
}, null);
//全局快捷键函数
function shareShortcutKey(k) {
if (k.altKey && k.keyCode == 82) {
document.querySelector('button[aria-label="更多"]').focus();
}
if (k.keyCode == 113) {
let Comment = document.querySelector('div.CommentItemV2');
if (Comment !== null) {
Comment.setAttribute('tabindex', '-1');
Comment.focus();
} else {
let pinComment = document.querySelector('div.CommentItem');
if (pinComment !== null)
pinComment.setAttribute('tabindex', '-1');
pinComment.focus();
}
}
if (k.altKey && k.keyCode == 81) {
var gb = document.querySelectorAll("button.ContentItem-action");
for (var i = 0; i < gb.length; i++) {
var gbName = gb[i].innerText;
var gbNames = gbName.substring(2, 6);
if (gbName == '​收起评论' || gbNames == '收起评论') {
gb[i].click();
gb[i].focus();
}
}
}
if (k.altKey && k.keyCode == 49) {
var f = document.querySelectorAll('a.QuestionMainAction,a.NumberBoard-item,a[href="/lives"],button.follow-button,button.NumberBoard-itemWrapper');
for (var i = 0; i < f.length; i++) {
//a.zg-btn-white,
f[0].focus();
}
}
if (k.altKey && k.keyCode == 50) {
document.querySelector("button.PaginationButton-prev").focus();
}
if (k.altKey && k.keyCode == 51) {
document.querySelector("button.PaginationButton-next").focus();
}
if (k.altKey && k.keyCode == 52) {
var more = document.querySelector('a.zu-button-more'); {
more.setAttribute('tabindex', '0');
more.focus();
}
}
if (k.ctrlKey && k.keyCode == 81) {
document.querySelector('a[href="/community"]').focus();
}

if (k.altKey && k.keyCode == 88) {
if (document.querySelector('button.QuestionHeader-edit') !== null) {
document.querySelector('button.QuestionHeader-edit').focus();
} else {
document.querySelector('button.NumberBoard-item').focus();
}
}

}

//举报
document.addEventListener("keydown", function (k) {
if (k.altKey && k.keyCode == 86) {
var an = document.querySelectorAll('button.Button--withLabel');
for (var i = 0, l = an.length; i < l; i++) {
var name = an[i].innerText;
var name2 = name.substring(2);
//alert(l);
//console.log(name);
if (name == '​举报' || name2 == '举报') {
an[i].focus();
an[i].addEventListener("click", function () {

(function () {
setTimeout(function () {
var button = document.querySelectorAll('button.ReportMenu-item');
for (var i = 0; i < button.length; i++) {
var span = button[i].querySelectorAll('span');
for (var g = 0; g < span.length; g++) {
var name = span[g].innerText;
if (name == '低质问题') {
button[i].click();
}
}
}
}, 20);

setTimeout(function () {
//document.querySelector('input[id="superstition"]').click();
document.querySelector('input[id="provoke"]').click();
}, 50);
setTimeout(function () {
document.querySelector('button.ReportMenu-button').click();
}, 80);

})();
}, null);

}
}
}
if (k.altKey && k.keyCode == 87) {
var x = document.querySelector('div.QuestionStatus-bar-inner');
x.setAttribute('tabindex', '-1');
x.focus();
}

}, null);



var audio = new Audio("https://veg.ink/music/sound.mp3");
audio.volume = 0.15;
audio.play();


function insdel(doc) {
var ins = doc.querySelectorAll("ins");
for (var i = 0, l = ins.length; i < l; i++) {
var ac = ins[i].parentNode;
var ad = ins[i].querySelector("span");
if (ad == null) {
var ab = document.createElement("div");
ab.innerHTML = "「已插入：";
ac.insertBefore(ab, ins[i]);
ab.appendChild(ins[i]);
var aa = document.createElement("span");
aa.innerHTML = "：插入结束」";
ins[i].appendChild(aa);
}
}


var del = doc.querySelectorAll("del");
for (var i = 0, l = del.length; i < l; i++) {
var ac = del[i].parentNode;
var ad = del[i].querySelector("span");
if (ad == null) {
var ab = document.createElement("div");
ab.innerHTML = "「已删除：";
ac.insertBefore(ab, del[i]);
ab.appendChild(del[i]);
var aa = document.createElement("span");
aa.innerHTML = "：删除结束」";
del[i].appendChild(aa);
}
}

var fh = doc.querySelectorAll('span.zg-bull');
for (var i = 0, l = fh.length; i < l; i++) {
if (fh[i] !== null) {
var name = fh[i].innerText;
if (name == '•') {
fh[i].innerHTML = "";
}
}
}
var gly = doc.querySelectorAll('a');
for (var i = 0; i < gly.length; i++) {
var name = gly[i].innerText;
if (name == '知乎管理员') {
gly[i].setAttribute('href', 'javascript:;');
}
}
}

(function () {
GM_xmlhttpRequest({
method: "GET",
headers: {
"Accept": "Content-Type:application/json"
},
url: "https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=DmRzeWmTGgwPuPrFyHPhxLFH&client_secret=iYUz9bmANfuDBhlpacObRCq4qutDHfSe",
onload: function (response) {
var data = response.responseText;
var datas = JSON.parse(data);
accessToken = datas.access_token;
}
});

var audio = document.createElement('audio');
audio.className = 'audio-notice';
audio.src = "";
audio.volume = 0.7;
document.body.appendChild(audio);
})();
/*
function voiceTTS(TTStext) {
var zhText = encodeURI(TTStext);
var parameter = "&vol=7&per=0&spd=9&pit=7";
var voicebbUrl = "https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=xiaobo&tok=" + accessToken + "&tex=" + zhText + parameter;
var audio = document.querySelector('audio.audio-notice'); {
if (audio !== null) {
audio.src = voicebbUrl;
audio.playbackRate = 1.5;
audio.play();
}
}
}
*/

function voiceTTS(TTStext) {
if (window.speechSynthesis) {
var utterTTS = new window.SpeechSynthesisUtterance();
utterTTS.text = TTStext;
utterTTS.lang = '"zh-cn"';
utterTTS.volume = 2;
utterTTS.rate = 50;
utterTTS.pitch = 1;
//speechSynthesis
speechSynthesis.speak(utterTTS)
speechSynthesis.onend = function () {
alert('ok');
this.stop();
}
} else {
alert("Your browser doesn't support speech api!")
}
}
let allElement = [];
//存储焦点元素的数组下标
let focusElementIndex;

function shortcutKey(k) {
if (k.keyCode !== 65 &&
k.keyCode !== 90) {
return false;
} else {
//获取页面所有元素，转成数组
let all = document.all;
if (all.length !== allElement.length) {
allElement = Array.prototype.slice.call(all);
}
//获取焦点元素的数组下标
focusElementIndex = allElement.indexOf(document.activeElement);

accesskey(k);
}
}
document.addEventListener('keydown', function (k) {
shortcutKey(k);
}, null);


function previousTarget(target, subscriptArray) {
for (let i = 0, l = target.length || subscriptArray.length; i < l; i++) {
if (focusElementIndex > subscriptArray[l - 1] || focusElementIndex <= subscriptArray[0]) {
target[l - 1].focus();
break;
} else if (focusElementIndex <= subscriptArray[i]) {
let xv = target.indexOf(target[i]);
target[xv - 1].focus();
break;
}
}
return false;
}

function nextTarget(target, subscriptArray) {
for (let i = 0, l = target.length || subscriptArray.length; i < l; i++) {
if (focusElementIndex < subscriptArray[i]) {
let xv = target.indexOf(target[i]);
target[xv].focus();
break;
} else if (focusElementIndex < subscriptArray[0] || focusElementIndex >= subscriptArray[l - 1]) {
target[0].focus();
break;
}
}
return false;
}


function accesskey(k) {
let Xscript = [];
var xAcc = allElement.filter(function (t) {
if (t.classList.contains('kjj')) {
Xscript.push(allElement.indexOf(t));
return t;
}
});

var focusElement = document.activeElement;
var role = focusElement.getAttribute('role');
var input = focusElement.tagName;
if (k.ctrlKey || k.shiftKey || k.altKey ||
role == 'textbox' || role == 'combobox' ||
input == 'INPUT' || input == 'TEXTAREA')
return false;
if (k.keyCode == 65) {
nextTarget(xAcc, Xscript)
}
if (k.keyCode == 90) {
previousTarget(xAcc, Xscript);
}

}
})();