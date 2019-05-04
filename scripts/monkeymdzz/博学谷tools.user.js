// ==UserScript==
// @name        博学谷tools
// @namespace    https://github.com/liicos/bxgtools
// @version      0.1.3
// @description  try to take over the world!
// @author       You
// @match        http://*.boxuegu.com/view/index.html
// @grant        none
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    var hosts1 = location.host.split('.')[0];     //内网外网地址检测  即检测是sdual还是nsdual
    var tools = $('.i-info');
    var fkurl = 'http://'+hosts1+'.boxuegu.com/studyTarget/studyTargetList?status=0&pageSize=10&pageNumber=1';   //反馈url
    var fkOptionsUrl = 'http://'+hosts1+'.boxuegu.com/studyTarget/getStudyTargetQuestionInfos';        //反馈选项接口
    var fkSubmitUrl = 'http://'+hosts1+'.boxuegu.com/studyTarget/saveStudyTargetQuestion';             //反馈提交页面
    var examUrl = 'http://'+hosts1+'.boxuegu.com/snexam/findCurrentStudentExamList?pageSize=10&pageNum=1';    //考试接口
    /**--------------------------------检查反馈状态---------------------------------------------*/
    $.get(fkurl,'',function(result){
        if(result.resultObject.items.length !== 0){
            showFk(result.resultObject.items[0].targetId);    //反馈选项接口所需参数
            return false;
        }
    },'json');
    /**--------------------------------检查考试状态---------------------------------------------*/
    $.get(examUrl,'',function(result){
        if(result.resultObject.items.length !== 0){
            showAnswer(result.resultObject.items[0].publishExampaperId);
            return false;
        }
    });
    /**--------------------------------反馈---------------------------------------------*/
    function showFk(targetId){
        /**--------------------------------界面输出---------------------------------------------*/
        var form = '<h3>反馈选项( 多选为随机 ) </h3>' +
            '<div style="margin-top:5px;" class="options">' +
            '<label for="A">A</label> <input type="checkbox" data-id="3" id="A" checked="true">&nbsp;'+
            '<label for="B">B</label> <input type="checkbox" data-id="2" id="B" checked="true">&nbsp;'+
            '<label for="C">C</label> <input type="checkbox" data-id="1" id="C">&nbsp;'+
            '<label for="D">D</label> <input type="checkbox" data-id="0" id="D">&nbsp;'+
            '</div>'+
            '<h3 style="margin-top:10px">反馈内容</h3>'+
            '<div style="margin-top:5px;">'+
            '<textarea>good !</textarea>'+
            '</div>'+
            '<input type="submit" value="一键提交" style="margin-top:10px;" id="submit">';

        tools.css({
            'width':'296px',
            'height':'223px',
            'box-sizing': 'border-box',
            'border':'5px solid #F10215'
        });
        tools.find('.announce , .noticeMore').remove();
        tools.find('.notice').css('color','#f00').html('<p><i class="iconfont red bs">&#xe636;</i>检测到有反馈未提交  !</p>');
        tools.append(form);
        /**--------------------------------提交事件---------------------------------------------*/
        tools.on('click','#submit',function(){
            var inputs = $('.options input');
            var userOptions = [];
            if($('.i-info input:checked').length === 0){
                alert('至少选择一个选项 ! ');  return false;
            }
            //用户设置的选项
            for(var i=0;i<inputs.length;i++){
                if(inputs.eq(i).prop('checked')===true){
                    userOptions.push(inputs.eq(i).data('id'));
                }
            }
            textarea = $('textarea').val();
            if(textarea===''){
                alert('反馈内容不能为空!');return false;
            }
            /**--------------------------------反馈选项列表---------------------------------------------*/
            $.post(fkOptionsUrl,'targetId='+targetId,function(data){
                var optionLists = data.resultObject.sigleChoose;
                var json = {};
                json.feedback_content = textarea;
                json.targetId = targetId;
                var paper_answers = '';
                $.each(optionLists,function(i,item){
                    paper_answers+= item.target_paper_id + ','+ userOptions[Math.floor(Math.random()*userOptions.length)]+';';
                    //console.log(item);
                });
                //console.log(json);
                json.paper_answers = paper_answers.slice(0,-1);

                /**--------------------------------反馈提交---------------------------------------------*/
                $.post(fkSubmitUrl,json,function(msg){
                    if(msg.success===true){
                        tools.html('<h3 style="font-size:30px;text-align:center;line-height:173px;">提交成功!</h3>');
                    }else{
                        tools.html('<h3 style="font-size:25px;text-align:center;line-height:173px;">提交失败,多喝热水 !</h3>');
                    }
                },'json');
            },'json');
        });
    }
    /**--------------------------------考试答案---------------------------------------------*/
    function showAnswer(exampId){
        tools.css({
            'width':'296px',
            'height':'223px',
            'box-sizing': 'border-box',
            'border':'5px solid #F10215'
        });
        tools.find('.notice').css('color','#f00').html('<p><i class="iconfont red bs">&#xe636;</i>检测到有阶段考试  !</p>');
        tools.find('.announce').html('<h3 style="font-size:25px;text-align:center;line-height:110px; class=\'examp\'">点击打开考试参考页 !</h3>');
        tools.on('click','h3',function(){
            window.open('http://'+hosts1+'.boxuegu.com/view/nexam/exampage.html?exampaperid='+exampId+'&examstatus=2');
        });
    }
})();