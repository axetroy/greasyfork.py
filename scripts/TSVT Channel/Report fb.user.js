// ==UserScript==
// @name         Report fb
// @namespace    https://greasyfork.org/scripts/37908-report-fb/code/Report%20fb.user.js
// @version      1.0.5
// @description  Script report facebook lũ vô văn hoá chửi team bạn
// @author       You
// @match        *://*.facebook.com/cap.xiubo*
// @run-at       document-start
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require      https://greasyfork.org/scripts/37907-arrive-js/code/arrivejs.js?version=246397
// @grant        none
// ==/UserScript==

var THOI_GIAN_REPORT = 1; //phút <= thay số 30 thành số khác để chỉnh thời gian



var intv;
var intv2;
//reports personal accounts
if(/cap.xiubo/i.test(window.location.href)){
    console.log('ok');
    $(document).arrive('._1yzl', function(){
        intv = setInterval(function(){$('._1yzl').click();},500);
        $(document).unbindArrive('._1yzl');
    });

    $(document).arrive('._54nc[href^="/ajax/nfx/start_dialog?story_location=profile_someone_else&reportable"] ._54nh', function(){
        clearInterval(intv);
        $('._54nc[href^="/ajax/nfx/start_dialog?story_location=profile_someone_else&reportable"] ._54nh').click();
        $(document).unbindArrive('._54nc[href^="/ajax/nfx/start_dialog?story_location=profile_someone_else&reportable"] ._54nh');
    });
    $(document).arrive('#nfxQuestionNamedaccount > label._55sh._5ww6._5p_b.uiInputLabelInput > span', function(){
        $('#nfxQuestionNamedaccount > label._55sh._5ww6._5p_b.uiInputLabelInput > span').click();
        $('._42ft._4jy0.layerConfirm').click();
        $(document).unbindArrive('#nfxQuestionNamedaccount > label._55sh._5ww6._5p_b.uiInputLabelInput > span');
    });

    $(document).arrive('#nfxQuestionNamedfake > label._55sh._5ww6._5p_b.uiInputLabelInput > span', function(){
        $('#nfxQuestionNamedfake > label._55sh._5ww6._5p_b.uiInputLabelInput > span').click();
        $('._42ft._4jy0.layerConfirm').click();
        $(document).arrive('._16gh[ajaxify^="/ajax/feed/filter_action/nfx_action_execute?action_name=REPORT"] span', function(){
            intv2 = setInterval(function(){$('._16gh[ajaxify^="/ajax/feed/filter_action/nfx_action_execute?action_name=REPORT"] span').click();},500);
            setTimeout(function(){clearInterval(intv2);},2600);
            $(document).unbindArrive('._16gh[ajaxify^="/ajax/feed/filter_action/nfx_action_execute?action_name=REPORT"] span');
        });
        $(document).unbindArrive('#nfxQuestionNamedfake > label._55sh._5ww6._5p_b.uiInputLabelInput > span');
    });
}

setTimeout(function(){location.reload();},1000*60*THOI_GIAN_REPORT);