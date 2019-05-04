// ==UserScript==
// @name        FJNU 学工系统 学生互评
// @namespace   1649991905@qq.com
// @author      猎隼丶止戈
// @description 增加是否使用随机选择框
// @description 学工系统 学生互评 自动测评 人人满分
// @description 使用时，请手动打开页面，【学生事务】 —— 【综合测评】 —— 【学生互评】 —— 选择评测学年
// @match       http://xgxt.fjnu.edu.cn/*
// @version     2.0.0
// @grant       none
// ==/UserScript==
//生成测评按钮
var html = '【<a href=\'javascript:void(0);\' id=\'post\'>点此开始学生互评</a>】';
$('<span></span>').appendTo($('#loginNameMain')).html(html);
var post = $('#post').css('color', 'blue').click(function() {
    var yearid = $("input[class=combo-value]").last().val();
    if (yearid == '' || yearid == null) {
        $.messager.alert('操作提示', '请手动打开这一页面：<span style="color:red">学生事务</span> / <span style="color:red">综合测评</span> / <span style="color:red">学生互评</span>，并选择需要评测的这一学年。若学年出错，请尝试刷新页面后重试。');
        return;
    }
    $('#post').text('互评中...');
    var r=confirm("确定使用“人人随机分数”？点击“确定”则使用随机分数，否则人人80分");
    if (r == true) {
        fjnuStudentEvaluation(yearid, true);
    } else {
        fjnuStudentEvaluation(yearid, false);
    }
});

//评议
function fjnuStudentEvaluation(yearid, isRandom = false) {
    var queryUrl = 'http://xgxt.fjnu.edu.cn/studentComprehensiveEvaluation/queryByStuStu2StuComprehensiveEvaluation.do';
    $.post(queryUrl, {
        'page': '1',
        'rows': '100',
        'comprehensiveEvaluationPlan.schoolYear.schoolYearId': yearid,
        'isEvaluation': '0'
    },
    function(jsonStr) {
        if (jsonStr.total <= 0) {
            console.log('失败');
        } else {
            var table = '<div style="height:600px; width:230px; overflow:auto"><table border="1" style="height:550px; width:220px; text-align: center; "><tr><th>名字</th><th>结果</th><th>思政</th><th>文体</th></tr>';
            var resultStr = '';
            for (var index in jsonStr.rows) {
                var r = '<tr><td>' + jsonStr.rows[index].studentName + '</td>'; //名字
                var stuScore = isRandom ? parseInt(Math.random() * 10 + 60, 10) : 80; // 随机则 60 分以上，不随机人人 80 分
                var stuSportsScore = isRandom ? parseInt(Math.random() * 10 + 70, 10) : 80;
                var timeStamp = Date.now();
                var saveUrl = 'http://xgxt.fjnu.edu.cn/studentComprehensiveEvaluation/saveByStuStu2StuComprehensiveEvaluation.do';
               
                $.ajax({
                    url: saveUrl,
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    async: false,
                    data: {
                        paramStr : jsonStr.rows[index].stu2StuComprehensiveEvaluationId + ',' + stuScore + ',' + stuSportsScore + '^',
                        _ : timeStamp
                    },
                    success: function(jsonStr2) {
                        if( jsonStr2.isSuccess) {
                            r = r + '<td style="color:green">成功</td>';
                        } else {
                            r = r + '<td style="color:red">失败</td>';
                        }
                    }
                });
                r = r + '<td>' + stuScore + '</td><td>' + stuSportsScore + '</td></tr>'; //分数
                resultStr = resultStr + r;
            }
            $('#post').text('学生互评已完成');
            table = table + resultStr;
            table = table + '</table></div>';

            $.messager.show({
                title: '测评结果',
                msg: table,
                height: 650,
                timeout: 10000,
                showType: 'slide'
            });
        }
    },
    'json');
}