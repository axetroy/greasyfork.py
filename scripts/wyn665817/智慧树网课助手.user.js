// ==UserScript==
// @name         智慧树网课助手
// @namespace    wyn665817@163.com
// @version      1.2.1
// @description  自动挂机看知到MOOC，支持屏蔽弹窗题目、自动切换视频，在线搜索题目答案，支持自动倍速播放、线路选择、默认静音
// @author       wyn665817
// @match        *://*.zhihuishu.com/*
// @connect      forestpolice.org
// @run-at       document-end
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @supportURL   https://greasyfork.org/zh-CN/scripts/380506/feedback
// @license      MIT
// ==/UserScript==

// 设置修改后，需要刷新或重新打开网课页面才会生效
var setting = {
    // 5E3 == 5000，科学记数法，表示毫秒数
    time: 5E3 // 默认响应速度为5秒，不建议小于3秒
    ,token: '' // 捐助用户可以使用上传选项功能，更精准的匹配答案，此处填写捐助后获取的识别码

    // 1代表开启，0代表关闭
    ,video: 1 // 视频支持课程、见面课，默认开启
    ,work: 1 // 自动答题功能，支持章测试、考试，高准确率，默认开启
    ,jump: 1 // 自动切换视频，支持课程、见面课，默认开启

    // 仅开启video时，修改此处才会生效
    ,line: '流畅' // 视频播放的默认线路，可选参数：['高清', '流畅', '校内']，默认'流畅'
    ,vol: 0 // 默认音量的百分数，设定范围：0 ~ 100，0为静音，默认0
    ,rate: 1.5 // 默认播放速率，可选参数：[1.0, 1.25, 1.5]，默认1.5
    // 上方参数支持在页面改动，下方参数仅支持代码处修改
    ,que: 1 // 屏蔽视频时间点对应的节试题，取消屏蔽则自动切换为模拟点击关闭弹题，默认开启
    ,pic: 1 // 屏蔽视频时间点对应的节图，默认开启
    ,danmu: 0 // 见面课弹幕，关闭后在网页中无法手动开启，默认关闭

    // 仅开启work时，修改此处才会生效
    ,none: 0 // 无匹配答案时执行默认操作，默认关闭
    ,limit: 1 // 解除选择、右键、复制、剪切、粘贴的限制，用于在答题页面复制题目和选项，默认开启
},
_self = unsafeWindow,
url = location.pathname,
$ = _self.jQuery;

if (!$) {
} else if (url.match('/learning/videoList')) {
    setting.video && hookVideo(_self.vjsComponent, 1);
    setting.jump && setInterval(checkToNext, setting.time, 0);
} else if (url.match('/live/vod_room.html')) {
    setting.video && hookVideo(_self.vjsComponent, 0);
    setting.jump && setInterval(checkToNext, setting.time, 1);
} else if (url.match('/learning/lessonPopupExam')) {
    setting.que || setInterval(doTest, setting.time);
} else if (location.hash.match(/(dohomework|doexamination)/)) {
    setting.work && beforeFind();
}

function hookVideo(Hooks, tip) {
    tip && $.ajaxPrefilter(function(options) {
        if (options.url.indexOf('loadVideoPointerInfo') < 0) return;
        var oldSuccess = options.success;
        options.success = function() {
            var dto = arguments[0].lessonDtoMap;
            setting.que && (dto.lessonTestQuestionDtos = null);
            setting.pic && (dto.popupPictureDtos = {});
            // dto.videoThemeDtos = null;
            // dto.knowledgeCardDtos = null;
            return oldSuccess.apply(this, arguments);
        };
    });
    _self.vjsComponent = function() {
        var config = arguments[0],
        line = $.map(config.options.sourceSrc.lines, function(value) {
            return value.lineName.replace('标准', '高清');
        });
        config.options.autostart = true;
        config.options.rate = $.inArray(setting.rate, [1.0, 1.25, 1.5]) < 0 ? config.options.rate : setting.rate;
        tip && config.callback.playbackRate(config.options.rate);
        config.options.chooseLine = $.inArray(setting.line, line) + 1 || config.options.chooseLine + 1;
        config.options.src = config.options.sourceSrc.lines[--config.options.chooseLine].lineUrl || config.options.src;
        if (setting.vol > 100) {
            config.options.volume = 1;
        } else if (setting.vol < 0) {
            config.options.volume = 0;
        } else if (Number(setting.vol) >= 0) {
            config.options.volume = Math.round(setting.vol) / 100;
        }
        if (!setting.danmu) {
            config.defOptions.control.danmuBtn = false;
            delete config.options.control.danmuBtn;
        }
        Hooks.apply(this, arguments);
        config.player.on('loadstart', function() {
            this.loop(true);
            this.play();
        });
    };
    $(document).on('click', '.definiLines b', function() {
        setting.line = {'xiaonei': '校内', 'line1gq': '高清', 'line1bq': '流畅'}[this.classList[0]];
    }).on('mouseup click', function() {
        setting.vol = _self.ablePlayerX($('.able-player-container').attr('id')).obj.player.volume() * 100;
    }).on('click', '.speedList div', function() {
        setting.rate = Number($(this).attr('rate'));
    });
}

function checkToNext(tip) {
    if (tip) {
        $('.current_player:contains("100%") + li').click();
        // $('.finish_tishi').hasClass('disNo') || console.log('签到已完成');
    } else if ($('.current_play .progressbar')[0].style.width == '100%') {
        _self.ablePlayerX($('.able-player-container').attr('id')).obj.callback.playerNext();
    }
}

function doTest() {
    if ($('.answerOption :checked').length) {
        $('.popboxes_btn span', parent.document).click();
        // _self.ablePlayerX($('.able-player-container').attr('id')).obj.player.play();
    } else {
        var $input = $(':radio, :checkbox', '.answerOption');
        ($input[Math.floor(Math.random() * $input.length)] || $()).click();
    }
}

function beforeFind() {
    setting.div = $(
        '<div style="border: 2px dashed rgb(0, 85, 68); width: 330px; position: fixed; top: 0; left: 0; z-index: 99999; background-color: rgba(70, 196, 38, 0.6); overflow-x: auto;">' +
            '<span style="font-size: medium;"></span>' +
            '<div style="font-size: medium;">正在搜索答案...</div>' +
            '<button style="margin-right: 10px;">暂停答题</button>' +
            '<button style="margin-right: 10px;">重新查询</button>' +
            '<button style="margin-right: 10px;">折叠面板</button>' +
            '<button style="display: none;">未作答题目</button>' +
            '<div style="max-height: 300px; overflow-y: auto;">' +
                '<table border="1" style="font-size: 12px;">' +
                    '<thead>' +
                        '<tr>' +
                            '<th style="width: 30px; min-width: 30px; font-weight: bold; text-align: center;">题号</th>' +
                            '<th style="width: 60%; min-width: 130px; font-weight: bold; text-align: center;">题目（点击可复制）</th>' +
                            '<th style="min-width: 130px; font-weight: bold; text-align: center;">答案（点击可复制）</th>' +
                        '</tr>' +
                    '</thead>' +
                    '<tfoot style="display: none;">' +
                        '<tr>' +
                            '<th colspan="3" style="font-weight: bold; text-align: center;">答案提示框 已折叠</th>' +
                        '</tr>' +
                    '</tfoot>' +
                    '<tbody>' +
                        '<tr>' +
                            '<td colspan="3" style="display: none;"></td>' +
                        '</tr>' +
                    '</tbody>' +
                '</table>' +
            '</div>' +
        '</div>'
    ).appendTo('body').on('click', 'button:visible, td', function() {
        var len = $(this).prevAll('button').length;
        if (this.tagName == 'TD') {
            $(this).prev().length && GM_setClipboard($(this).text());
        } else if (len == 0) {
            if (setting.loop) {
                clearInterval(setting.loop);
                delete setting.loop;
                setting.div.children('div:eq(0)').text('已暂停搜索');
                $(this).text('继续答题');
            } else {
                setting.loop = setInterval(findAnswer, setting.time);
                setting.div.children('div:eq(0)').text('正在搜索答案...');
                $(this).text('暂停答题');
            }
        } else if (len == 1) {
            location.reload();
        } else if (len == 2) {
            setting.div.find('tbody, tfoot').toggle();
        } else if (len == 3) {
            var $white = $('.el-scrollbar__wrap .white');
            $white.length ? $white.eq(0).click() : $(this).hide();
        }
    });
    setting.lose = setting.num = 0;
    setting.loop = setInterval(findAnswer, setting.time);
}

function findAnswer() {
    if (!setting.num) {
        setting.curs = $('.infoList span').map(function(index) {
            return $(this).text().trim();
        }).get();
        if (!setting.curs.length) {
            return;
        } else if (setting.limit) {
            var doc = document;
            doc.oncontextmenu = doc.onpaste = doc.oncopy = doc.oncut = doc.onselectstart = null;
        }
    } else if (setting.num >= $('.examPaper_subject').length) {
        clearInterval(setting.loop);
        setting.div.children('button:eq(0)').hide();
        setting.div.children('button:eq(3)').toggle(!!setting.lose);
        var text = setting.lose ? '共有 <font color="red">' + setting.lose + '</font> 道题目待完善（已深色标注）' : '答题已完成';
        return setting.div.children('div:eq(0)').html(text);
    }
    var $TiMu = $('.examPaper_subject').eq(setting.num),
    question = $TiMu.find('.subject_describe').map(function() {
        return $(this).find('img').length ? $(this).html() : $(this).text().trim();
    })[0] || '',
    type = $TiMu.find('.subject_type').text().trim().match(/【(.+)】/),
    option = setting.token && $TiMu.find('.node_detail').map(function() {
        return $(this).text().trim();
    }).filter(function() {
        return this.length;
    }).get().join('#');
    type = type ? {'单选题': 1, '多选题': 2, '判断题': 14}[type[1]] || 0 : -1;
    option = $.inArray(type, [1, 2]) + 1 ? option : '';
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://mooc.forestpolice.org/zhs/' + (setting.token || 0) + '/' + encodeURIComponent(question),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: 'course=' + encodeURIComponent(setting.curs[0]) + '&chapter=' + encodeURIComponent(setting.curs[1]) + '&type=' + type + '&option=' + encodeURIComponent(option),
        timeout: setting.time,
        onload: function(xhr) {
            if (!setting.loop) {
            } else if (xhr.status == 200) {
                var obj = $.parseJSON(xhr.responseText);
                if (obj.code) {
                    setting.div.children('div:eq(0)').text('正在搜索答案...');
                    $(
                        '<tr>' +
                            '<td style="text-align: center;">' + $TiMu.find('.subject_num').text().trim() + '</td>' +
                            '<td title="点击可复制">' + question + '</td>' +
                            '<td title="点击可复制">' + obj.data + '</td>' +
                        '</tr>'
                    ).appendTo(setting.div.find('tbody')).css('background-color', fillAnswer($TiMu, obj, type) ? '' : 'rgba(0, 150, 136, 0.6)');
                    setting.num++;
                } else {
                    setting.div.children('div:eq(0)').text(obj.data || '服务器繁忙，正在重试...');
                }
                setting.div.children('span').html(obj.msg || '');
            } else if (xhr.status == 403) {
                setting.div.children('button').eq(0).click();
                setting.div.children('div:eq(0)').text('请求过于频繁，建议稍后再试');
            } else {
                setting.div.children('div:eq(0)').text('服务器异常，正在重试...');
            }
        },
        ontimeout: function() {
            setting.loop && setting.div.children('div:eq(0)').text('服务器超时，正在重试...');
        }
    });
}

function fillAnswer($TiMu, obj, type) {
    var $div = $TiMu.find('.nodeLab'),
    data = String(obj.data).split('#'),
    state = setting.lose;
    // $div.find(':radio:checked').prop('checked', false);
    obj.code == 1 && $div.each(function() {
        var $input = $(this).find('input')[0] || $(),
        tip = $(this).find('.node_detail').text().trim() || new Date();
        Boolean($.inArray(tip, data) + 1 || (type == 2 && String(obj.data).indexOf(tip) + 1)) == $input.checked || $input.click();
    });
    if (/^(1|2|14)$/.test(type)) {
        var $input = $div.find('input');
        $input.filter(':checked').length || (setting.none ? ($div.find('input')[Math.floor(Math.random() * $input.length)] || $()).click() : setting.lose++);
    } else if (!$div.length) {
        (obj.code == 1 && data.length == $div.length) || setting.none || setting.lose++;
        data[0] = state == setting.lose ? (obj.code == 1 && data[0]) || '不会' : '';
        _self.UE.getEditor('editor' + $TiMu.find('.subject_node input:hidden').val()).setContent(data[0]);
    } else {
        setting.none || setting.lose++;
    }
    return state == setting.lose;
}