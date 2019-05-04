// ==UserScript==
// @name          兔区/闲情-屏蔽词,白名单高亮,防刷屏,记忆楼层,快捷举报,修改配色,屏蔽广告等
// @description   大机摸鱼自用，有其他需求或建议可以联系我修改~
// @namespace     http://tampermonkey.net/
// @version       1.1.1
// @require       http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @grant         GM_addStyle
// @include       http://bbs.jjwxc.tld/board.php?board=*
// @include       http://bbs.jjwxc.tld/showmsg.php?board=*&id=*
// @include       http://bbs.jjwxc.tld/search.php?*
// @include       http://ceorabbit.zz11.43ns.com/ReportCenter/2.php?id=*
// @icon          // debug
// @run-at        document-start
// @author        岚浅浅
// ==/UserScript==

'use strict';

const IS_BOARD_PAGE = location.href.indexOf('board.php') > 0;
const IS_POST_PAGE = location.href.indexOf('showmsg.php') > 0;
const IS_SEARCH_PAGE = location.href.indexOf('search.php') > 0;
const IS_REPORT_PAGE = location.href.indexOf('ReportCenter') > 0;
const BOARD_ID = IS_BOARD_PAGE || IS_POST_PAGE ? getParamValue('board') : '';
const POST_ID = IS_POST_PAGE || IS_REPORT_PAGE ? getParamValue('id') : '';
const PAGE_ID = IS_POST_PAGE ? getParamValue('page') || '0' : '';
const SKIN_COUNT = 2;

var Style = {
    initBeforeLoading() {
        Style.addSkin();
        Style.addMyStyle();
    },
    init() {
        Style.shieldAd();
    },
    addSkin() {
        let skinId = localStorage.getItem('SkinId') || '1';
        if (skinId === '1') {
            GM_addStyle(`
                /* 背景颜色 */
                body, td, input, textarea {
                    background-color: #2F393C !important;
                }
                /* 字体颜色 */
                * {
                    color: #616161;
                }
                #msgsubject, #topic, .replybodyinner, a, span, input, textarea {
                    color: #A8C023 !important;
                }
                /* 边框颜色 */
                input, table[border="4"] {
                    border: solid 1px;
                }
                /* 修改头像 */
                .image1, .image2, .image6, .image7, .image8, .image9, .image10, .image12, .image13, .image14, .image15, .image16 {
                    background-image: url(https://i.loli.net/2018/08/28/5b84af69b2b16.png) !important;
                }
                .image17, .image18, .image19, .image20, .image21, .image22, .image23, .image24 {
                    background-image: url(https://i.loli.net/2018/08/28/5b84af682e7eb.png) !important;
                }
            `);
        }
        if (skinId !== '0') {
            if (IS_BOARD_PAGE) {
                document.title = BOARD_ID;
            }
        }
    },
    addMyStyle() {
        GM_addStyle(`
            .clickable {
                z-index: 999999;
                position: fixed;
                right: 10px;
                width: 180px;
                display: flex;
                flex-direction:column;
                opacity: 0.6;
                border: 1px solid #a38a54;
                border-radius: 3px;
            }
            .clickable div {
                margin: 2px auto;
            }
            .clickable a {
                margin: auto;
                cursor: pointer;
            }
            #toolbar {
                top: 10px;
            }
            #toolbar input {
                padding-left: 3px;
                width: 120px;
                height: 20px;
                font-size: 10px;
            }
            #spam-keywords-wrap, #white-keywords-wrap {
                display: none;
            }
            #spam-keywords-wicket, #white-keywords-wicket {
                top: 180px;
            }
            .report-btn {
                font-size: small;
            }
        `);
    },
    shieldAd() {
        if (IS_BOARD_PAGE) {
            $('body > table:nth-child(4) > tbody > tr:nth-child(4), body > table:nth-child(5) > tbody > tr:nth-child(4)').hide();
        } else if (IS_POST_PAGE) {
            $('#imgurl, .textbook').hide();
        } else if (IS_SEARCH_PAGE) {
            $('body > table:nth-child(4) > tbody > tr:nth-child(4)').hide();
        }
    },
    switchSkin() {
        let oldSkinId = parseInt(localStorage.getItem('SkinId') || '1');
        let newSkinId =(oldSkinId + 1) % SKIN_COUNT;
        localStorage.setItem('SkinId', newSkinId);
        location.reload();
    }
}

function getParamValue(key, url) {
    let query = url ? url.split('?')[1] : location.search.substring(1);
    let params = query.split('&');
    for (let param of params) {
       let pair = param.split('=');
       if (pair[0] === key) {
           return pair[1];
       }
    }
    return('');
}

function scrollTo(height) {
    $('html, body').animate({ scrollTop: height }, 1000);
}

if (IS_BOARD_PAGE || IS_POST_PAGE || IS_SEARCH_PAGE) {
    Style.initBeforeLoading();
}

$(function() {
    let matches = IS_POST_PAGE ?  $('#msgsubject').text().match(/主题：(.*)\[(\d+)\]/) : '';
    const PREFIX = IS_POST_PAGE ? BOARD_ID + '_' + POST_ID + '_' + matches[1] : '';
    const REPLY_COUNT = IS_POST_PAGE ? matches[2] : '';

    var Toolbar = {
        init() {
            if (IS_BOARD_PAGE) {
                Toolbar.addBoardToolbar();
            } else if (IS_POST_PAGE) {
                Toolbar.addPostToolbar();
            }
            Toolbar.eventRegister();
        },
        addBoardToolbar() {
            $('body').append(`
                <div id="toolbar" class="clickable">
                    <div>
                        <a id="skin-switch">切换皮肤</a>
                    </div>
                    <div>
                        <a id="go-top-btn">到顶部</a>
                        <a id="go-bottom-btn">到底部</a>
                    </div>
                    <div>
                        <input id="add-white-keywords-input" placeholder="添加白名单,空格隔开">
                        <a id="add-white-keywords-btn">确定</a>
                    </div>
                    <div>
                        <input id="add-spam-keywords-input" placeholder="添加屏蔽词,空格隔开">
                        <a id="add-spam-keywords-btn">确定</a>
                    </div>
                    <div>
                        <a id="show-white-keywords-btn">查看白名单</a>
                        <a id="show-spam-keywords-btn">查看屏蔽词</a>
                    </div>
                </div>
                <div id="white-keywords-wrap">
                    <div id="white-keywords-wicket" class="clickable"></div>
                </div>
                <div id="spam-keywords-wrap">
                    <div id="spam-keywords-wicket" class="clickable"></div>
                </div>
            `);
        },
        addPostToolbar() {
            $('body').append(`
                <div id="toolbar" class="clickable">
                    <div id="report-btn-wrap">
                        <a id="report-btn">举报该贴</a>
                    </div>
                    <div>
                        <a id="imgs-hidden-switch">隐藏该贴图片</a>
                    </div>
                    <div>
                        <a id="go-top-btn">到顶部</a>
                        <a id="go-bottom-btn">到底部</a>
                    </div>
                    <div>
                        <input id="add-white-keywords-input" placeholder="添加白名单,空格隔开">
                        <a id="add-white-keywords-btn">确定</a>
                    </div>
                    <div>
                        <a id="show-white-keywords-btn">查看白名单</a>
                    </div>
                    <div>
                        <a id="keywords-highlighted-switch">贴内高亮</a>
                        <a id="pre-highlight-keyword-btn">前一个</a>
                        <a id="next-highlight-keyword-btn">后一个</a>
                    </div>
                </div>
                <div id="white-keywords-wrap">
                    <div id="white-keywords-wicket" class="clickable">
                </div>
            `);
            if (BOARD_ID !== '2') {
                $('#report-btn-wrap').hide();
            }
        },
        eventRegister() {
            $(document).on('click', '#skin-switch', function() {
                Style.switchSkin();
            });

            $(document).on('click', '#go-top-btn', function() {
                scrollTo(0);
            });
            $(document).on('click', '#go-bottom-btn', function() {
                scrollTo($(document).height());
            });

            $(document).on('keypress', '#add-white-keywords-input', function(event) {
                if (event.keyCode == 13) {
                    Keyword.addWhiteKeywords();
                }
            })
            $(document).on('click', '#add-white-keywords-btn', function() {
                Keyword.addWhiteKeywords();
            });

            $(document).on('keypress', '#add-spam-keywords-input', function(event) {
                if (event.keyCode == 13) {
                    Keyword.addSpamKeywords();
                }
            })
            $(document).on('click', '#add-spam-keywords-btn', function() {
                Keyword.addSpamKeywords();
            });

            $(document).on('click', '#show-white-keywords-btn', function() {
                Keyword.showWhiteKeywords();
            });
            $(document).on('click', '#show-spam-keywords-btn', function() {
                Keyword.showSpamKeywords();
            });

            $(document).on('click', '#report-btn', function() {
                window.open("http://ceorabbit.zz11.43ns.com/ReportCenter/2.php?id=" + POST_ID);
            });

            $(document).on('click', '#imgs-hidden-switch', function() {
                Img.switchImgsHidden();
            });

            $(document).on('click', '#keywords-highlighted-switch', function() {
                Keyword.switchKeywordsHighlighted();
            });
            $(document).on('click', '#pre-highlight-keyword-btn', function() {
                Keyword.preHighlightKeyword();
            });
            $(document).on('click', '#next-highlight-keyword-btn', function() {
                Keyword.nextHighlightKeyword();
            });
        }
    }

    var Img = {
        init() {
            if (localStorage.getItem(PREFIX + '_ImgsHidden')) {
                Img.switchImgsHidden();
            }
        },
        switchImgsHidden() {
            if ($('#imgs-hidden-switch').text() === '隐藏该贴图片') {
                $('img').hide();
                $('#imgs-hidden-switch').text('显示该贴图片');
                localStorage.setItem(PREFIX + '_ImgsHidden', true);
            } else {
                $('img').show();
                $('#imgs-hidden-switch').text('隐藏该贴图片');
                localStorage.removeItem(PREFIX + '_ImgsHidden');
            }
        }
    }

    var Floor = {
        init() {
            if (localStorage.getItem(PREFIX + '_ImgsHidden')) {
                Floor.goSavedFloor();
            } else {
                window.onload = function() {
                    Floor.goSavedFloor();
                }
            }
            Floor.eventRegister();
        },
        getCurrentFloor() {
            let scrollTop = $(document).scrollTop();
            let nodes = $('.authorname').toArray();
            for (let node of nodes) {
                let nodeTop = $(node).parent().prev().prev().offset().top;
                if (nodeTop > scrollTop) {
                    return parseInt($(node).find('font')[0].innerText.substring(1));
                }
            }
            return parseInt($(nodes.pop()).find('font')[0].innerText.substring(1));
        },
        goSavedFloor() {
            let floor = localStorage.getItem(PREFIX + '_Floor');
            if (floor) {
                let pageId = parseInt((floor - 1) / 300);
                if (pageId === parseInt(PAGE_ID)) {
                    let node = $('.authorname').toArray().filter(e => $(e).find('font')[0].innerText.substring(1) === floor);
                    scrollTo($(node).parent().prev().prev().offset().top);
                    localStorage.removeItem(PREFIX + '_Floor');
                } else {
                    window.open(`http://bbs.jjwxc.net/showmsg.php?board=${BOARD_ID}&id=${POST_ID}&page=${pageId}`);
                }
            }
        },
        eventRegister() {
            $(document).on('click', 'a[class^="quotereply"]', function() {
                localStorage.setItem(PREFIX + '_Floor', $(this).parent().prev().find('font')[0].innerText.substring(1));
            });
        }
    }

    var Keyword = {
        hasRenderWhiteKeywordsWicket: false,
        hasRenderSpamKeywordsWicket: false,
        hasRenderHighlightKeywordsPosition: false,
        init() {
            if (IS_BOARD_PAGE) {
                Keyword.highlightAndShieldBoardKeywords();
            } else if (IS_POST_PAGE) {
                if (localStorage.getItem(PREFIX + '_KeywordsHighlighted')) {
                    Keyword.switchKeywordsHighlighted();
                }
            }
            Keyword.eventRegister();
        },
        highlightAndShieldBoardKeywords() {
            let whiteKeywords = localStorage['WhiteKeywords'] || '';
            let spamKeywords = localStorage['SpamKeywords'] || '';
            let nodes = $('#msglist').children().children().toArray();
            nodes.shift();
            for (let node of nodes) {
                let reportNode = $(node).find('td')[1];
                let titleNode = $(node).find('td')[3];
                if (BOARD_ID === '2') {
                    let url = $(titleNode).children().attr('href');
                    let id = getParamValue('id', url);
                    $(reportNode).append(`<a class="report-btn" href="http://ceorabbit.zz11.43ns.com/ReportCenter/2.php?id=${id}" target="_blank">举报</a>`);
                }
                let title = titleNode.innerText;
                let needHighlight = false;
                if (whiteKeywords != '') {
                    for (let whiteKeyword of whiteKeywords.split(' ')) {
                        if (title.indexOf(whiteKeyword) >= 0) {
                            $(node).css('opacity', '0.75');
                            needHighlight = true;
                            break;
                        }
                    }
                }
                if (!needHighlight && spamKeywords !== '') {
                    for (let spamKeyword of spamKeywords.split(' ')) {
                        if (title.indexOf(spamKeyword) >= 0) {
                            $(node).remove();
                            console.log('已过滤：' + title);
                            break;
                        }
                    }
                }
            }
        },
        switchKeywordsHighlighted() {
            if ($('#keywords-highlighted-switch').text() == '贴内高亮') {
                if (!Keyword.hasRenderHighlightKeywordsPosition) {
                    Keyword.renderHighlightKeywordsPosition();
                }
                $('.highlight-keyword').css('cssText', 'color: #BC3F3C !important');
                $('#keywords-highlighted-switch').text('取消高亮');
                localStorage.setItem(PREFIX + '_KeywordsHighlighted', true);
            } else {
                $('.highlight-keyword').css('cssText', 'color: ;');
                $('#keywords-highlighted-switch').text('贴内高亮');
                localStorage.removeItem(PREFIX + '_KeywordsHighlighted');
            }
        },
        renderWhiteKeywordsWicket() {
            let whiteKeywords = localStorage.getItem('WhiteKeywords') || '';
            if (whiteKeywords === '') {
                return;
            }
            let html = whiteKeywords.split(' ').map(whiteKeyword => {
                return `
                    <div>
                        <label>${whiteKeyword}</label>
                        <a class='delete-white-keyword-btn'>删除</a>
                    </div>
                `
            }).join('');
            $('#white-keywords-wicket').html(html);
            Keyword.hasRenderWhiteKeywordsWicket = true;
        },
        renderSpamKeywordsWicket() {
            let spamKeywords = localStorage.getItem('SpamKeywords') || '';
            if (spamKeywords === '') {
                return;
            }
            let html = spamKeywords.split(' ').map(spamKeyword => {
                return `
                    <div>
                        <label>${spamKeyword}</label>
                        <a class='delete-spam-keyword-btn'>删除</a>
                    </div>
                `
            }).join('');
            $('#spam-keywords-wicket').html(html);
            Keyword.hasRenderSpamKeywordsWicket = true;
        },
        renderHighlightKeywordsPosition() {
            let whiteKeywords = localStorage.getItem('WhiteKeywords') || '';
            let nodes = $('#topic, .quotebodyinner, .replybodyinner').toArray();
            for (let node of nodes) {
                for (let whiteKeyword of whiteKeywords.split(' ')) {
                    $(node).html($(node).html().replace(new RegExp(whiteKeyword, 'g'), `<span class="highlight-keyword">${whiteKeyword}</span>`));
                }
            }
            Keyword.hasRenderHighlightKeywordsPosition = true;
        },
        addWhiteKeywords() {
            let newWhiteKeywords = $('#add-white-keywords-input').val().trim().replace(/\s+/g, ' ');
            if (newWhiteKeywords === '') {
                alert('请输入要添加的白名单关键词！');
                return;
            }
            let oldWhiteKeywords = localStorage.getItem('WhiteKeywords') ? localStorage.getItem('WhiteKeywords') + ' ' : '';
            localStorage.setItem('WhiteKeywords', oldWhiteKeywords + newWhiteKeywords);
            $('#add-white-keywords-input').val('');
            Keyword.hasRenderWhiteKeywordsWicket = false;
            Keyword.hasRenderHighlightKeywordsPosition = false;
            Keyword.showWhiteKeywords();
        },
        addSpamKeywords() {
            let newSpamKeywords = $('#add-spam-keywords-input').val().trim().replace(/\s+/g, ' ');
            if (newSpamKeywords === '') {
                alert('请输入要添加的待屏蔽关键词！');
                return;
            }
            let oldSpamKeywords = localStorage.getItem('SpamKeywords') ? localStorage.getItem('SpamKeywords') + ' ' : '';
            localStorage.setItem('SpamKeywords', oldSpamKeywords + newSpamKeywords);
            $('#add-spam-keywords-input').val('')
            Keyword.hasRenderSpamKeywordsWicket = false;
            Keyword.showSpamKeywords();
        },
        deleteWhiteKeyword(node) {
            let whiteKeyword = $(node).prev().text();
            $(node).parent().remove();
            localStorage.setItem('WhiteKeywords', localStorage.getItem('WhiteKeywords').replace(whiteKeyword, '').trim().replace('  ', ' '));
            Keyword.hasRenderWhiteKeywordsWicket = false;
            Keyword.hasRenderHighlightKeywordsPosition = false;
        },
        deleteSpamKeyword(node) {
            let spamKeyword = $(node).prev().text();
            $(node).parent().remove();
            localStorage.setItem('SpamKeywords', localStorage.getItem('SpamKeywords').replace(spamKeyword, '').trim().replace('  ', ' '));
            Keyword.hasRenderSpamKeywordsWicket = false;
        },
        showWhiteKeywords() {
            if ($('#show-white-keywords-btn').text() === '查看白名单') {
                if (!Keyword.hasRenderWhiteKeywordsWicket) {
                    Keyword.renderWhiteKeywordsWicket();
                }
                $('#spam-keywords-wrap').hide();
                $('#show-spam-keywords-btn').text('查看屏蔽词');
                $('#white-keywords-wrap').show();
                $('#show-white-keywords-btn').text('隐藏白名单');
            } else {
                $('#white-keywords-wrap').hide();
                $('#show-white-keywords-btn').text('查看白名单');
            }
        },
        showSpamKeywords() {
            if ($('#show-spam-keywords-btn').text() === '查看屏蔽词') {
                if (!Keyword.hasRenderSpamKeywordsWicket) {
                    Keyword.renderSpamKeywordsWicket();
                }
                $('#white-keywords-wrap').hide();
                $('#show-white-keywords-btn').text('查看白名单');
                $('#spam-keywords-wrap').show();
                $('#show-spam-keywords-btn').text('隐藏屏蔽词');
            } else {
                $('#spam-keywords-wrap').hide();
                $('#show-spam-keywords-btn').text('查看屏蔽词');
            }
        },
        preHighlightKeyword() {
            if ($('#keywords-highlighted-switch').text() == '贴内高亮') {
                Keyword.switchKeywordsHighlighted();
            }
            let scrollTop = $(document).scrollTop();
            let nodes = $('.highlight-keyword').toArray();
            for (let i = nodes.length - 1; i >= 0; i--) {
                let node = nodes[i];
                let nodeTop = $(node).parents('tr').parents('tr').prev().offset().top;
                if (nodeTop < scrollTop) {
                    scrollTo(nodeTop);
                    return;
                }
            }
        },
        nextHighlightKeyword() {
            if ($('#keywords-highlighted-switch').text() == '贴内高亮') {
                $('#keywords-highlighted-switch').click();
            }
            let scrollTop = $(document).scrollTop();
            let nodes = $('.highlight-keyword').toArray();
            for (let node of nodes) {
                let nodeTop = $(node).parents('tr').parents('tr').prev().offset().top;
                if (nodeTop - scrollTop > window.innerHeight) {
                    $('html, body').animate({ scrollTop: nodeTop }, 1000);
                    return;
                }
            }
        },
        eventRegister() {
            $(document).on('click', '.delete-white-keyword-btn', function() {
                Keyword.deleteWhiteKeyword(this);
            });
            $(document).on('click', '.delete-spam-keyword-btn', function() {
                Keyword.deleteSpamKeyword(this);
            })
        }
    }

    var Reply = {
        init() {
            Reply.autoFill();
            Reply.eventRegister();
        },
        autoFill() {
            $('input[name="username"]').val('= =');
            $('textarea[name="body"]').val(localStorage.getItem(PREFIX + '_Reply') || '');
        },
        eventRegister() {
            $('textarea[name="body"]').bind('input propertychange', function() {
                let replyBody = $('textarea[name="body"]').val();
                let replyQuote = $('textarea[name="quote"]').val();
                replyBody = replyBody.replace(/<img\ssrc="(.*?)"\s(.*?=".*?")*?\s{0,1}\/{0,1}>/g, '<img src="$1">').replace(/<font color="#999999">(.*?)<\/font>/g, '$1');
                replyQuote = replyQuote.replace(/<img\ssrc="(.*?)"\s(.*?=".*?")*?\s{0,1}\/{0,1}>/g, '<img src="$1">').replace(/<font color="#999999">(.*?)<\/font>/g, '$1');
                $('textarea[name="body"]').val(replyBody);
                $('textarea[name="quote"]').val(replyQuote);
            });
            $(document).on('click', 'input[name="button1"]', function() {
                localStorage.removeItem(PREFIX + '_Reply');
            });
        }
    }

    var Report = {
        init() {
            Report.autoFill();
        },
        autoFill() {
            $('input[name="post_id"]').val(POST_ID);
            $('input[name="report_item[]"]:first').attr('checked', 'checked');
            $('input[name="report_floor"]').val('0');
            $('#reg_7').attr('checked', 'checked');
            $('textarea[name="report_proof"]').focus();
        }
    }

    window.onbeforeunload = function() {
        if (!localStorage.getItem(PREFIX + '_Floor')) {
            let currentFloor = Floor.getCurrentFloor();
            if (currentFloor > 10 && (REPLY_COUNT - currentFloor < 10 || (currentFloor - 1) % 300 < 290)) {
                localStorage.setItem(PREFIX + '_Floor', currentFloor);
            }
        }
        localStorage.getItem(PREFIX + '_Reply', $('textarea[name="body"]').val());
    }

    if (IS_BOARD_PAGE) {
        Style.init();
        Toolbar.init();
        Keyword.init();
    } else if (IS_POST_PAGE) {
        Style.init();
        Toolbar.init();
        Img.init();
        Floor.init();
        Keyword.init();
        Reply.init();
    } else if (IS_SEARCH_PAGE) {
        Style.init();
    } else if (IS_REPORT_PAGE) {
        Report.init();
    }
});
