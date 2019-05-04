// ==UserScript==
// @name         TGFC ban troll
// @namespace    http://club.tgfcer.com/20060602
// @version      0.62
// @description  让讨厌的苍蝇走开！屏蔽指定用户的主帖和回帖，感谢原作者 taxidriver、jun4rui
// @author       20060602
// @supportURL	 housekeeper1997@gmail.com
// @include      http://*.tgfcer.com/*
// @include      http://*.tgfcer.net/*
// @include      https://*.tgfcer.com/*
// @include      https://*.tgfcer.net/*
// @grant        none
// ==/UserScript==

//  console.log('Hello Tgfcer from "tgfc-ban-troll.js".');

//	global datas for storage
var BanList, BanListArray, ShowBanTip, checked, BanTip, BanNegJisao, JisaoMin;

// URL prefixes
var wapURLPrefix1 = 'http://club.tgfcer.com/wap/';
var wapURLPrefix2 = 'http://wap.tgfcer.com/';
var wapURLPrefix3 = 'http://club.tgfcer.net/wap/';
var wapURLPrefix4 = 'http://wap.tgfcer.net/';
var wapURLPrefix5 = 'https://club.tgfcer.com/wap/';
var wapURLPrefix6 = 'https://wap.tgfcer.com/';
var wapURLPrefix7 = 'https://club.tgfcer.net/wap/';
var wapURLPrefix8 = 'https://wap.tgfcer.net/';

var webURLPrefix = 'http://club.tgfcer.com/';
var webURLPrefixNet = 'http://club.tgfcer.net/';
var webURLPrefixS = 'https://club.tgfcer.com/';
var webURLPrefixNetS = 'https://club.tgfcer.net/';

var webURLPrefixBbs = 'http://bbs.tgfcer.com/';
var webURLPrefixBbsNet = 'http://bbs.tgfcer.net/';
var webURLPrefixBbsS = 'https://bbs.tgfcer.com/';
var webURLPrefixBbsNetS = 'https://bbs.tgfcer.net/';

// console.log('The Begin of logic.');

Array.prototype.contains = contains;
loadData();
//console.log('Data loaded.');
if (underURL(wapURLPrefix1, wapURLPrefix2, wapURLPrefix3, wapURLPrefix4, wapURLPrefix5, wapURLPrefix6, wapURLPrefix7, wapURLPrefix8)){
    processWap();
}else if (underURL(webURLPrefix, webURLPrefixNet, webURLPrefixS, webURLPrefixNetS,webURLPrefixBbs,webURLPrefixBbsNet,webURLPrefixBbsS,webURLPrefixBbsNetS)){
    // console.log('gonna execute processWeb.');
    processWeb();
}

//console.log('The End of logic.');


function initLocalStorage(name, defaultValue){
    if (typeof(localStorage[name])==='undefined'){
        localStorage[name] = defaultValue;
        // console.log(name + ' initialed with:' + defaultValue);
    }
}

function loadData(){
    //先判断有没有localStorage保存的设置数据，没有则新建
    initLocalStorage('BanList', '');
    initLocalStorage('ShowBanTip', true);
    initLocalStorage('BanTip', 'Blocked!!!!!');

    initLocalStorage('BanNegJisao', false);
    initLocalStorage('JisaoMin', 0);

    BanList = localStorage.BanList;
    BanListArray = BanList.split(',');
    ShowBanTip = localStorage.ShowBanTip === 'true';
    checked = ShowBanTip ? "checked" : "";
    BanTip = localStorage.BanTip;
    BanNegJisao = localStorage.BanNegJisao === 'true';
    JisaoMin = parseInt(localStorage.JisaoMin);

    //console.log(localStorage);
}

function saveData(banList,showTip, banTip, banNegJisao, jisaoMin){
    BanList = banList;
    ShowBanTip = showTip;
    BanListArray = BanList.split(',');
    localStorage.BanList = BanList;
    localStorage.ShowBanTip = ShowBanTip;
    localStorage.BanTip = banTip;

    if( banNegJisao !== undefined){
        localStorage.BanNegJisao = banNegJisao;
    }

    if( jisaoMin !== undefined){
        localStorage.JisaoMin = jisaoMin;
    }

    BanTip = localStorage.BanTip;
}


function processWap(){
    //不让图片尺寸超过屏幕的最大宽度，有时候图片太大了看起来好累
    addGlobalStyle('div.message>img {max-width:100%;}');
    //让顶部导航栏浮动固定
    addGlobalStyle('#scroller>.navbar {position:fixed;height:28px;line-height:28px;width:100%;top:0;left:0;box-shadow: 5px 1px 5px #888888;} body {padding-top:36px;}');
    addGlobalStyle('#scroller>.navigation {position:fixed;height:28px;line-height:28px;width:100%;top:0;left:0;box-shadow: 5px 1px 5px #888888;} body {padding-top:36px;}');

    addWapLink();

    //在原生导航栏中加入设置模块
    //console.log($('a[href="#bottom"]').parent().parent());
    var hookPoint = $('div.navbar');
    if(hookPoint.length === 0) {
        hookPoint = $('a[href="#bottom"]').parent().parent();
        hookPoint.append('<li><a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a></li>');
    }else{
        hookPoint.append('&nbsp;|&nbsp;<a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a>');
    }
    //$('div.navbar').append('&nbsp;|&nbsp;<a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a>');
    //$('a[href=#bottom]').parent().after('<li><a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a></li>');
    //$('div.navigation').append('&nbsp;|&nbsp;<a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a>');
    //点击模块的处理
    $('#scroller').delegate('#tgbs-btn', 'click', function(){
        if ($('#tgbs').css('display')=='none'){
            loadData();
            $('#tgbs').css({'display':''});
            $('#tgbs').css('top',$('#tgbs-btn').position().top+20);
            $('#tgbs').css('left',2);
            $('#tgbs textarea').focus();
            $('#ban-tip').val(BanTip);
            //添加"加入到ban"按钮
            $('#scroller .infobar').each(function(){
                $(this).find('a').eq(1).after('<button class="add-to-ban" value="'+$(this).find('a').eq(1).text()+'">+屏蔽</button>');
            });
        }else{
            //关闭设置菜单时，清除所有"加入到ban"按钮并关闭设置面板
            $('.add-to-ban').remove();
            $('#tgbs').css({'display':'none'});
            // 保存数据到localStorage
            localStorage.BanList = $('#banlist-textarea').val();
            localStorage.ShowBanTip = document.getElementById("showBanTip").checked;
            localStorage.BanTip = $('#ban-tip').val();
            BanList = localStorage.BanList;
            BanListArray = BanList.split(',');
            ShowBanTip = localStorage.ShowBanTip === 'true';
            checked = ShowBanTip ? "checked" : "";
            BanTip = $('#ban-tip').val();
        }
    });
    //处理点击'.add-to-ban'按钮
    $('.infobar').delegate('.add-to-ban', 'click', function(){
        $('#banlist-textarea').val($('#banlist-textarea').val()+','+$(this).attr('value'));
    });
    //在原生导航栏下面加入设置表单
    //$('div.navbar')
    hookPoint.append('<div id="tgbs" class="list_item_top" style="z-index: 9500;color:#FFF; width:400px;padding:.5em;position:fixed; display:none; overflow:hidden;box-shadow: rgb(51, 51, 51) 1px 1px 19px;background-color: #436193;">屏蔽ID列表:'
                     + '<br/><textarea id=\"banlist-textarea\" style="width:100%;height:160px;">'+BanList+'</textarea>'
                     +'<form><input id="showBanTip" type="checkbox" name="showBanTip" '+checked+' />显示屏蔽提示&nbsp;|&nbsp;'
                     +'提示信息&nbsp;<input id="ban-tip" style="font-size : 1em; padding : 0px; margin : 0px; margin-top: 5px; width : 200px;"/></form></div>');

    //点击屏蔽区将展开屏蔽内容
    $('#scroller').delegate('.list-ban-section', 'click', function(){
        if ($(this).css('height')=='21px'){
            $(this).css({'height':'auto'});
        }else{
            $(this).css({'height':'21px'});
        }
    });

    //列表页面
    var ForumPagePart = 'index.php?action=forum';
    //帖子内文页面
    var ThreadPagePart = 'index.php?action=thread';

    //如果当前页面是列表页面的处理
    if (hasURLPart(ForumPagePart)){
        //console.log('当前在列表页面');
        $('.dTitle').each(function(){
            var author = $(this).find('span.author').text();
            for (var i in BanListArray){
                //判断发帖人是否在屏蔽列表中
                if (author.indexOf(BanListArray[i])==1){
                    //console.log(BanListArray[i]);
                    if(!ShowBanTip){
                        $(this).css({display:'none'});
                        continue;
                    }
                    //console.log(author.indexOf(BanListArray[i]),BanListArray[i]);
                    $(this).addClass('list-ban-section');
                    $(this).prepend('<div style="width:auto;text-align:center;border:1px dashed #AAAAAA;color:#AAAAAA; line-height:19px;"><strong><s> '+BanListArray[i]+' </s></strong>'+BanTip+'</div>');
                    $(this).css({'height':'21px','overflow':'hidden'});
                }
            }
        });
    }


    $('#scroller').delegate('.info-ban-section', 'click', function(){
        if ($(this).next().css('display')=='none'){
            $(this).next().css({'display':'inherit'});
            $(this).next().next().css({'display':'inherit'});
            $(this).next().next().next().css({'display':'inherit'});
            $(this).next().next().next().next().css({'display':'inherit'});
            $(this).next().next().next().next().next().css({'display':'inherit'});
        }else{
            $(this).next().css({'display':'none'});
            $(this).next().next().css({'display':'none'});
            $(this).next().next().next().css({'display':'none'});
            $(this).next().next().next().next().css({'display':'none'});
            $(this).next().next().next().next().next().css({'display':'none'});
        }
    });

    //如果当前页面是内容页的处理
    if (hasURLPart(ThreadPagePart)){
        markJiSao();
        $('.infobar').each(function(){
            var author = $(this).find('a').eq(1).text();
            for (var i in BanListArray){
                //判断发帖人是否在屏蔽列表中
                if (author==BanListArray[i]){
                    console.log(author.indexOf(BanListArray[i]),BanListArray[i]);
                    $(this).css({'display':'none'});
                    if(ShowBanTip){
                        $(this).before('<div class="info-ban-section" style="cursor:pointer;width:auto;text-align:center;border:1px dashed #DEDEDE;color:#DEDEDE; line-height:19px;"><strong><s>'+BanListArray[i]+'</s></strong>'+BanTip+'</div>');
                    }
                    //$(this).addClass('ban-section');
                    //依次连续隐藏5个（含自己）元素
                    $(this).next().css({'display':'none'});
                    $(this).next().next().css({'display':'none'});
                    $(this).next().next().next().css({'display':'none'});
                    $(this).next().next().next().next().css({'display':'none'});
                }
            }
        });
    }
}

function processWeb(){
    console.log('processWeb begin');
    //   调整 “最后发表” 列的宽度，避免部分较长的 ID 导致此栏换行
    addGlobalStyle('.threadlist td.lastpost {width:160px;}');


    closeLeftAdv();
    console.log('processWeb end');
    jisaoEditable();

    //在原生导航栏中加入设置模块
    var newSpan = document.createElement('span');
    newSpan.innerHTML = '<a href="#" class="nav_link" id="tgbs-btn" title="让TGFCER更美好的设置，由 taxidriver、jun4rui 两位坛友原创">TGGM</a>&nbsp;|&nbsp;';
    //  console.log(newSpan);
    var hookPoint = document.getElementById('my').parentNode.parentNode;
    //  console.log(hookPoint);
    hookPoint.appendChild(newSpan);
    //  console.log(navP);
    var btn = document.getElementById('tgbs-btn');
    //  console.log(btn);


    var floatDiv = createFloatDiv();
    newSpan.appendChild(floatDiv);

    var banlistTextarea = document.getElementById('ban-list');
    var showCheckbox = document.getElementById('show-ban-info');
    var banTip = document.getElementById('ban-tip');

    var banNegJisaoCheckbox = document.getElementById('ban-neg-jisao');
    var jisaoMin = document.getElementById('jisao-min');

    //console.log(floatDiv);

    btn.onclick = function (){
        //  console.log('showCheckbox.checked:' + showCheckbox.checked + '    ShowBanTip:' + ShowBanTip);
        if(floatDiv.style.display==='none'){
            loadData();
            floatDiv.style.display='';
            floatDiv.style.top = getElementTop(newSpan) + 20 + 'px';
            floatDiv.style.left = getElementLeft(newSpan) - 365 +'px';
            showCheckbox.checked = ShowBanTip;
            banlistTextarea.value = BanList;
            banlistTextarea.focus();
        }else{
            floatDiv.style.display='none';
            saveData(banlistTextarea.value, showCheckbox.checked, banTip.value, banNegJisaoCheckbox.checked, jisaoMin.value);
        }
    };

    filterBlackList(
        function(){return document.getElementsByTagName('tbody');},
        2,
        function (author, reason){
            return '<tr><td style="background-color:#e5e5e5" class="folder"></td><td style="background-color:#e5e5e5" class="icon"></td><th class=""><label></label><span><s>' + 
                author +
                '</s> '+ BanTip +
                reason +
                '</span></th><td style="background-color:#e5e5e5;text-align:center" class="author"></td><td class="nums"></td><td style="background-color:#e5e5e5" class="lastpost"></td></tr>';
        },
        '<tr><td style="background-color:#e5e5e5" class="folder"></td><td style="background-color:#e5e5e5" class="icon"></td><th class=""><label></label><span><s>',
        '</s> '+BanTip+'</span></th><td style="background-color:#e5e5e5;text-align:center" class="author"></td><td class="nums"></td><td style="background-color:#e5e5e5" class="lastpost"></td></tr>'
    );

    filterBlackList(
        function(){return document.getElementsByClassName('viewthread');},
        1,
        function (author, reason){
            return '<div class="mainbox viewthread"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="postauthor"></td><td class="postcontent"><s>' + 
                author +
                '</s> '+ BanTip +
                reason +
                '</td></tr></tbody></table></div>';
        },
        '<div class="mainbox viewthread"><table cellspacing="0" cellpadding="0"><tbody><tr><td class="postauthor"></td><td class="postcontent"><s>',
        '</s> '+BanTip+'</td></tr></tbody></table></div>'
    );

}

//添加全局CSS样式的方法
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function markJiSao(){
    //正激骚
    addGlobalStyle('a.positive-sao {color:#f00;}');
    //负激骚
    addGlobalStyle('a.negative-sao {color:#00bb00;}');

    var regex = /^骚\((-?\d+)\)$/g;
    $('a').each(function(){
        var atag = $(this);
        var match = regex.exec(atag.text());
        if(match && match[1] != '0'){
            //console.log(match[1]);
            if(match[1].indexOf('-')===0){
                atag.addClass("negative-sao");
            }else{
                atag.addClass("positive-sao");
            }
        }
    });
}


function addWapLink(){
    var webLink = /^http:\/\/club\.tgfcer\.com\/thread-([\d]+)-.+html/ig;
    var webLinkNet = /^http:\/\/club\.tgfcer\.net\/thread-([\d]+)-.+html/ig;
    var tidStr = 'http://wap.tgfcer.com/index.php?action=thread&tid=TidDummy&sid=&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=&verify=&fontsize=0';
    var tidStrNet = 'http://club.tgfcer.net/wap/index.php?action=thread&tid=TidDummy&sid=&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=&verify=&fontsize=0';

    var webLinkS = /^https:\/\/club\.tgfcer\.com\/thread-([\d]+)-.+html/ig;
    var webLinkNetS = /^https:\/\/club\.tgfcer\.net\/thread-([\d]+)-.+html/ig;
    var tidStrS = 'https://wap.tgfcer.com/index.php?action=thread&tid=TidDummy&sid=&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=&verify=&fontsize=0';
    var tidStrNetS = 'https://club.tgfcer.net/wap/index.php?action=thread&tid=TidDummy&sid=&vt=1&tp=100&pp=100&sc=0&vf=0&sm=0&iam=&css=&verify=&fontsize=0';

    var tags = document.getElementsByTagName('a');
    for(var i=0; i<tags.length; ++i){
        var tag = tags[i];
        tryConvert(tag, webLink, tidStr);
        tryConvert(tag, webLinkNet, tidStrNet);

        tryConvert(tag, webLinkS, tidStrS);
        tryConvert(tag, webLinkNetS, tidStrNetS);
        continue;
        var href = tag.href;
        var execResult = webLink.exec(href);
        if(execResult){
            var threadId = execResult[1];
            var wapLink = tidStr.replace('TidDummy',threadId);
            //console.log(wapLink);
            var newSpan = document.createElement('span');
            newSpan.innerHTML = '&nbsp;&nbsp;<a href="'+wapLink+'" title="">(wap点我)</a>&nbsp;';
            tag.parentNode.insertBefore(newSpan ,tag.nextSibling);
        }
    }
}

function tryConvert(aTag, regex, targetPattern){
    var href = aTag.href;
    var execResult = regex.exec(href);
    if(execResult){
        var threadId = execResult[1];
        var wapLink = targetPattern.replace('TidDummy',threadId);
        //console.log(wapLink);
        var newSpan = document.createElement('span');
        newSpan.innerHTML = '&nbsp;&nbsp;<a href="'+wapLink+'" title="">(wap点我)</a>&nbsp;';
        aTag.parentNode.insertBefore(newSpan ,aTag.nextSibling);
    }
}

function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

function createFloatDiv(){
    var floatDiv = document.createElement('div');
    floatDiv.setAttribute('id', 'tgbs');
    floatDiv.setAttribute('style', 'color:#FFF; width:400px;padding:.5em;position:fixed; display:none; overflow:hidden;box-shadow: rgb(51, 51, 51) 1px 1px 19px;background-color: #00b23d;text-align:left;');
    var titleText = document.createElement('div');
    titleText.innerHTML = '屏蔽ID列表:';
    floatDiv.appendChild(titleText);
    var banlistTextarea = document.createElement('textarea');
    banlistTextarea.setAttribute('id', 'ban-list');
    banlistTextarea.style.width = '99%';
    banlistTextarea.style.height = '160px';
    banlistTextarea.style.marginBottom = '4px';
    floatDiv.appendChild(banlistTextarea);


    var form = document.createElement('form');
    floatDiv.appendChild(form);
    var showCheckbox = document.createElement('input');
    form.appendChild(showCheckbox);
    showCheckbox.setAttribute('type','checkbox');
    showCheckbox.setAttribute('id', 'show-ban-info');
    showCheckbox.checked = ShowBanTip;

    var checkText = document.createElement('span');
    checkText.innerHTML = '显示屏蔽提示&nbsp;&nbsp;|&nbsp;&nbsp;提示信息&nbsp;';
    form.appendChild(checkText);

    var banTip = document.createElement('input');
    form.appendChild(banTip);
    banTip.setAttribute('type','text');
    banTip.setAttribute('id', 'ban-tip');
    banTip.style.fontSize = '1em';
    banTip.style.padding = '0px 5px';
    banTip.style.margin = '0px';
    banTip.style.width = '200px';
    //  banTip.style.color = '#cc0000';
    banTip.value = BanTip;

    var lineBreak = document.createElement('hr');
    form.appendChild(lineBreak);

    showCheckbox = document.createElement('input');
    form.appendChild(showCheckbox);
    showCheckbox.setAttribute('type','checkbox');
    showCheckbox.setAttribute('id', 'ban-neg-jisao');
    showCheckbox.checked = BanNegJisao;

    var checkTextBanNegJiSao = document.createElement('span');
    checkTextBanNegJiSao.innerHTML = '屏蔽，如果该用户激骚小于&nbsp;';
    form.appendChild(checkTextBanNegJiSao);

    banTip = document.createElement('input');
    form.appendChild(banTip);
    banTip.setAttribute('type','number');
    banTip.setAttribute('id', 'jisao-min');
    banTip.style.fontSize = '1em';
    banTip.style.padding = '0px 5px';
    banTip.style.margin = '0px';
    banTip.style.width = '112px';
    //  banTip.style.color = '#cc0000';
    banTip.value = JisaoMin;

    lineBreak = document.createElement('hr');
    form.appendChild(lineBreak);

    var btnJisaoEdit = document.createElement('BUTTON');
    var t = document.createTextNode('让“激骚理由”可编辑'); // Create a text node
    btnJisaoEdit.appendChild(t); // Append the text to <button>
    form.appendChild(btnJisaoEdit);
    btnJisaoEdit.onclick = jisaoEditable;


    return floatDiv;
}

function jisaoNoPM(event){
    var taReason = document.getElementsByName('sendreasonpm');
    //console.log(taReason);
    if(taReason){
        for (var i = 0, len = taReason.length; i < len; i++) {
            var ta = taReason[i];
            ta.removeAttribute('disabled');
        }
    }

    //event.preventDefault();
    return false;
}

function jisaoEditable(event){
    var taReason = document.getElementsByName('reason');
    //console.log(taReason);
    if(taReason){
        for (var i = 0, len = taReason.length; i < len; i++) {
            var ta = taReason[i];
            ta.removeAttribute('readonly');
        }
    }

    jisaoNoPM();

    return false;
}

function banReason(node, cite, author){
    if(cite[0].getElementsByTagName('a')[0] == null){
        return null;
    }

    author = cite[0].getElementsByTagName('a')[0].innerHTML;
    if (BanListArray.contains(author)){
        return '';
    }

    if(BanNegJisao){
        var dl = node.getElementsByTagName('dl');
        if(dl){
            dl = dl[0];
            var dds = dl.getElementsByTagName('dd');
            var jisaoText = dds[3].innerText;
            var jisao = parseInt(jisaoText);
            //                     console.log(jisao);
            if(jisao < JisaoMin){
                return ' 激骚值：' + jisao;
            }
        }
    }

    return null;
}

function filterBlackList(nodeFunc, citeCount, tipFunc, preT, postT){
    var allTextareas,cite, author;
    allTextareas = nodeFunc();
    //     console.log(allTextareas.length);
    if (!allTextareas.length) {
        return;
    }

    for (var index = 0; index < allTextareas.length; index++) {
        var node = allTextareas[index];
        cite = node.getElementsByTagName('cite');
        if (cite.length < citeCount){
            continue;
        }

        author = cite[0].getElementsByTagName('a')[0].innerHTML;
        //console.log(author);
        var reason = banReason(node, cite, author);
        if (reason !== null) {
            //  console.log("kill " + author);
            //  console.log("ShowBanTip("+typeof(ShowBanTip)+") " + ShowBanTip);
            if(ShowBanTip){
                node.innerHTML = tipFunc(author, reason);
            }
            else{
                node.style.display = 'none';
            }
        }

    }
}

function underURL(){
    //console.log('underURL begin')
    var PageCurrent = window.location.href;

    var result = false;
    for (var i = 0; i < arguments.length; i++) {
        var prefix = arguments[i];
        if(PageCurrent.indexOf(prefix)===0){
            result = true;
            break;
            //return true;
        }
    }

    //console.log('underURL returned with: ' + result);
    return result;
}

function hasURLPart(part){
    var PageCurrent = window.location.href;
    return PageCurrent.indexOf(part) >= 0;
}

function contains(obj) {
    var index = this.length;
    while (index--) {
        if (this[index] === obj) {
            return true;
        }
    }
    return false;
}


function closeLeftAdv(){
    return;
    console.log('closeLeftAdv begin');
    writeCookie('leftadv1','1',700);
    document.getElementById('leftadv').style.display='none';
    document.getElementById('content_main').style.margin='0 0 0 0';
    console.log('closeLeftAdv end');
}