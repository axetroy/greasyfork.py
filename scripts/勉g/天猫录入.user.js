// ==UserScript==
// @name         天猫录入
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  天猫录入(报名商家录入模板之用)
// @author       single
// @match        http://localhost/acloud/luru/haha/demo2.html
// @match        http://localhost/acloud/luru/test.html
// @match        https://mk.ju.taobao.com/play/external_index.htm*
// @match        https://tmc.tmall.com/campaign/submitBaomingApplyForm.htm?*
// @require      https://cdn.jsdelivr.net/jquery/1.7.2/jquery.min.js
// @require      https://cdn.bootcss.com/clipboard.js/1.5.10/clipboard.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var Rule = {
		//不同界面输入规则的选择
		ruleOne:function(content){
			Func.textInput('店铺名称标题',content[8]);
			Func.textInput('宝贝链接',content[0]);
			Func.textInput('店铺利益点',content[3]);
			Func.textInput('商品短标题',content[4]);
			Func.imageInput('宝贝透明图',content[6]);
			Func.imageInput('品牌LOGO(140x70)',content[7]);
			Func.textInput('店铺承接页链接',content[1]);
			Func.textInput('商品长标题',content[2]);
		},

		ruleTwo:function(content){
			Func.textInput('宝贝链接/ID',content[0]);
			Func.imageInput('宝贝透明图',content[4]);
			Func.textInput('商品利益点（10个字）',content[5]);
			Func.imageInput('品牌LOGO',content[6]);
			Func.textInput('宝贝ID',content[0]);
			Func.textInput('前n件活动价',content[1]);
			Func.textInput('前n件优惠库存',content[2]);
			Func.textInput('买家优惠限购数',content[3]);
		},
    };

    //当前使用的模板
    var nowRule = Rule.ruleTwo;




    var Func = {
    	set_input_pos:function(obj, spos){
		    var tobj = obj;
		    if(spos<0)
		            spos = tobj.value.length;
		    if(tobj.setSelectionRange){ //兼容火狐,谷歌
		            setTimeout(function(){
		                tobj.setSelectionRange(spos, spos);
		                tobj.focus();}
		                ,0);
		    }else if(tobj.createTextRange){ //兼容IE
		            var rng = tobj.createTextRange();
		            rng.move('character', spos);
		            rng.select();
		    }
		},
    	//显示输入框
		showInputDiv:function(){
			var elem = `<div id="luru" style="width: 50%;
										    height: 15%;
										    position: fixed;
										    z-index: 100000;
										    top: 64px;
										    right: 20px;">
						  	<textarea style="width:100%;height: 80%;"></textarea>
						  	<button class="luru-cancal" style="margin: auto;height: 20%;width: 50px;display: block;float: right;">关闭</button>
							<button class="luru-ok" style="margin: auto;height: 20%;width: 50px;display: block;">确定</button>
						  </div>`;
			$('body').prepend(elem);
			if(localStorage.getItem('single_text') !== null && typeof(localStorage.getItem('single_text')) !== 'undefined'){
				$('#luru textarea').val(localStorage.getItem('single_text'));
			}
		},
		//注册事件
		registerEvent:function(){
			$('body').on('click','#luru button.luru-cancal',function(){
				$('#luru').remove();
			});
			$('body').on('click','#luru button.luru-ok',{nowRule:nowRule},Func.registerData);
			$('body').on('paste','#luru textarea',{nowRule:nowRule},Func.registerData);
		},

		//事件行为
		registerData:function(ev){
			var text = $('#luru textarea').val();
			localStorage.setItem('single_text',text);
			var content = text.split('	');
			//不同的界面有参数对应不同的位置
			ev.data.nowRule(content);
			$('#luru textarea').css('background','lightcyan');
		},

		//文本输入
		textInput:function(label,content){
			var elem = $('ul.sui-form-bd .sui-form-row :contains('+label+')').parents('.sui-form-row').find('.sui-form-right input[type=text]');
			// if(elem.val() == ""){
			Func.textCopy(elem,content);
				// elem.val(content);
			// }

			elem = $('#sellerSettingForm .next-form-item :contains('+label+')').parents('.next-form-item').find('input[type=text]');
			// if(elem.val() == ""){
			Func.textCopy(elem,content);
				// elem.val(content);
			// }
		},

		//文本复制
		textCopy:function(elem,content){
			if(elem.html() === null){
				return;
			}
			elem.off('focus.abc');

			elem[0].focus();
			elem.attr('value',content);
			elem.val(content);
			elem.blur();

			elem.attr('content',content);
			elem.on('focus.abc',{Func:this},function(ev){
				$(ev.target).val($(ev.target).attr('content'));
				ev.data.Func.set_input_pos($(ev.target)[0],-1);
				console.log('456');
			});
			// var clipboard = new Clipboard('input[content]', {
		 //    // 通过target指定要复印的节点
		 //         text: function(ev) {
			//          return $(ev).attr('content');
			//      }
		 //    });
		},

		//图片输入
		imageInput:function(label,url){
			var image_div = $('ul.sui-form-bd .sui-form-row :contains('+label+')').parents('.sui-form-row').find('.sui-form-right input[type=file]');
			if(image_div.siblings('.uploadrs').is(':hidden') === false){
				return;
			}

			image_div.attr('url',url);
			var clipboard = new Clipboard('input[url]', {
		    // 通过target指定要复印的节点
		         text: function(ev) {
			         return $(ev).attr('url');
			     }
		    });
		},
	};


    Func.showInputDiv();
    Func.registerEvent();
})();
