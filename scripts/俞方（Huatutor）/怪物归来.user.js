// ==UserScript==
// @name         怪物归来
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  The monster come back,you'll game over!
// @author       Jack
// @match        http://*.gwgl.xh456.com/index.aspx
/* @require      https://greasyfork.org/scripts/367762-jquery-timer-js/code/jquerytimerjs.js?version=596413 */
// @require      https://greasyfork.org/scripts/3465-jquery-timers/code/jQuerytimers.js?version=10415
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   var mpid = 27; //30级
   var lasthxs = 0;
     // 移除daoguang


      $('#div_boss_fight_aciton_container').remove()
      $('#div_role_fight_aciton_container').remove();

//list
    var html = '<select id="mp" style="display:none">';
   var html2 =html + '<option value="7">15-1</option><option value="11">20-2</option><option value="15">25-3</option><option value="47">65-11</option>';
   var html1 =html2 + '<option value="19">30-4</option><option value="23">35-5</option><option value="27">40-6</option><option value="31">45-7</option><option value="35">50-8</option><option value="39">55-9</option><option value="43">60-10</option><option value="47">65-11</option><option value="51">70-12</option>';
       html1 += '<option selected>--------</option><option value="55">75-14</option><option value="59">80-16</option><option value="63">85-18</option><option value="67">90-20</option><option value="71">95-22</option><option value="75">100-24/1</option><option value="79">100-26/2</option><option value="83">101-28/3</option><option value="87">102-30/4</option><option value="91">103-33/5</option><option value="95">104-36/6</option><option value="99">105-39/7</option><option value="103">106-42/8</option>';
       html1 += '<option>---------</option> <option value="107">107-26</option> <option value="111">111-27</option> <option value="115">115-28</option> <option value="119">119-29</option> <option value="123">123-30</option> <option value="127">127-31</option>  <option value="131">131-32</option> <option value="135">135-33</option> <option value="139">139-34</option>  <option value="143">143-35</option> <option value="147">147-36</option>  <option value="151">151-37</option> <option value="153">153-38</option> <option value="158">158-39</option>';
 
    html = html1 + '</select> <a href="#" id="showqa">show<a> &nbsp;  <a href="#" id="qdao">签到</a>  &nbsp; <a href="#" id="huanjing">幻境扫荡</a>';
//<a  href="javascript:void(0)" class="start">开始</a>  &nbsp;
    $('.div_img_chongzhi').parent().append(html)
    $('.div_img_chongzhi').parent().parent().parent().css('width','250px');

 //
    $(".start").click(function(){

       var gid = $('#mp').val();
      //  stopit();
            $('body').oneTime('5ds',function(){
                    qiangzhi_tuichu_monster_fight_check();
                   console.log("----------停止战斗----------");
                });
            $('body').oneTime('10ds',function(){
                  return_monster_fight_check();
                console.log('退出fight');
            });
             $('body').oneTime('20ds',function(){
                   mpid = gid;
                   //$('.div_img_chongzhi').click();
                  create_monster_fight_check(mpid);///77
                    console.log('开始挂机');
                  $('body').stopTime('B');
                  $('body').oneTime('8ds',function(){show_div_map_npc_check('剑灵')});
                  $('body').oneTime('1s',function(){checkbag(mpid);});
                  $('body').everyTime('60s','B',function(){checkbag(mpid);});
             });
    })

    var qa ='<div id="quick" style="display:none"> <a href="#" class="dirct" data="7">15-1</a>  <a href="#" class="dirct" data="11">20-2</a>  <a href="#" class="dirct" data="15">25-3</a>  <a href="#" class="dirct" data="19">30-4</a>  <a href="#" class="dirct" data="23">35-5</a>  <a href="#" class="dirct" data="27">40-6</a>  <a href="#" class="dirct" data="31">45-7</a>  <a href="#" class="dirct" data="35">50-8</a>  <a href="#" class="dirct" data="39">55-9</a>  <a href="#" class="dirct" data="43">60-10</a>  <a href="#" class="dirct" data="47" >65-11</a>  <a href="#" class="dirct" data="51">70-12</a>  <a href="#" class="dirct" data="55">75-14</a> <a href="#" class="dirct" data="59">80-16</a> <a href="#" class="dirct" data="63">85-18</a> <a href="#" class="dirct" data="67">90-20</a> <a href="#" class="dirct" data="71">95-22</a> <a href="#" class="dirct" data="75">100-24/1</a> <a href="#" class="dirct" data="79">100-26/2</a> <a href="#" class="dirct" data="83">101-28/3</a> <a href="#" class="dirct" data="87">102-30/4</a> <a href="#" class="dirct" data="91">103-33/5</a> <a href="#" class="dirct" data="95">104-36/6</a> <a href="#" class="dirct" data="99">105-39/7</a> <a href="#" class="dirct" data="103">106-42/8</a> </div> ';
    $('#div_daguai_lianji .div_main_title_flow2').parent().append(qa);

    $('#qdao').click(function(){ //qiandao
       //获取当前挂机图
        var mp = $('#span_role_boss_nick_name_monster_fight').text();
        console.log(mp);
        var lv = mp.split('.');
        mp = lv[0].split('(');
        lv[1] = lv[1].replace('\)','');
        var id = 4;
        if(lv[1]<111){ id = 3;}
        stopit();
        $('body').oneTime('10ds',function(){wancheng_qiandao_check();console.log('已签到');});//qiandao

        $('body').oneTime('15ds',function(){biwudahui_baoming_check();console.log('武林大会已报名');$('#div_system_channel').append('<div style="color:yellow;font-weight:bold;padding:5px;">***** 武林大会报名成功 ******</div>')});//guozhan
        $('body').oneTime('15ds',function(){
             show_div_map_npc_check('炼造坊')
            lanzhuang_liangang_equipment_all_check();
            $('#div_lianzaofang').hide();
        });
        $('body').oneTime('18ds',function(){show_daguai_lianji_boss_list_container(id,'Map'+id);});
        $('body').oneTime('30ds',function(){
           $('#div_daguai_lianji_boss_list div').each(function(){
             if($(this).html().indexOf(mp[0])>0){
             $(this).find('img').click();
            }
          })
        });
    })

    $('#huanjing').click(function(){
       var mp = $('#span_role_boss_nick_name_monster_fight').text();
      show_div_map_npc_check('幻境冒险');
      $('body').oneTime('5ds',function(){
        var ii;
          $('#div_huanjing_maoxian_boss_list button').each(function(i,el){
              if($(this).text() == '扫荡'){
                  ii = i;
              }
          });
          $('#div_huanjing_maoxian_boss_list button').eq(ii).click()
          var cs = $('#span_huanjing_maoxian_cishu_vip').text()*1+100;
          $('#ipt_huanjing_saodang_cishu').val(cs);
      })
    })

    $('#showqa').click(function(){
      $('#quick').show();
    })

   $('.dirct').click(function(){
      mpid = $(this).attr('data');
      create_monster_fight_check(mpid);///77
       
   })//dirct

  /*  if($('#span_role_player_shengming_monster_fight').is(":visible")){
      $.getScript('http://jianfeile.com:91/Public/js/jquery.timer.js',function(){
              ex.Timer.play();
            })

    }
    */

$('.div_img_chongzhi').removeAttr('onclick').html('挂机').click(function(){
     $('body').oneTime('5ds',function(){
                    qiangzhi_tuichu_monster_fight_check();

                });
            $('body').oneTime('10ds',function(){
                  return_monster_fight_check();
            });
            $('body').oneTime('20ds',function(){
                    create_monster_fight_check(mpid);///77
                    console.log('开始挂机');
                    $('body').stopTime('B');
                     $('body').oneTime('1s',function(){checkbag(mpid);});
              	    $('body').everyTime('60s','B',function(){checkbag(mpid);});
             });
})





// check bag, if the bag is full then sell
function checkbag(mpid){

	$('body').oneTime('1ds',function(){
		show_flow_renwu_shuxing_check();
        $('#div_renwu_shuxing').hide();
	});
    $('body').oneTime('3ds',function(){
	   show_material_list_renwu_shuxing_check2();
	});
    $('body').oneTime('8ds',function(){
      var hxs = $('#div_baoguo_list_flow_renwu_shuxing div').eq(0).text().trim();
      var tar = $('#span_need_huanxianshi_jianling').text()*1;
      var s = hxs.replace(/[^0-9]/ig,"");
      var xs = lasthxs == 0 ? 0 :  s - lasthxs ;
      tar = tar - s;
      lasthxs = s;
	   console.log( hxs+ " ↑" +xs +' →'+tar);
       console.log("大约需要："+parseInt(tar/xs)+' min');
	});
	$('body').oneTime('10ds',function(){
		var t = $('#span_equipment_num_limit_system_state').text().split('/');
		console.log("包裹: "+t[0]+'/'+t[1]);
		if(t[1]-t[0]<20){
			stopit();
		    $('body').oneTime('15ds',function(){
			         ronglian_equipment_all_jianling_check();
			         console.log('兑换：'+t[0]);
			    });
	    	$('body').oneTime('20ds',function(){
			         create_monster_fight_check(mpid);
			    }); //

		}
	});
	var s = 0;
	$('body').stopTime('SS');
	$('body').everyTime('1s','SS',function(){
	    s++;
	    $('#Button1').html('查看 '+ s +'s');
		})


}
//stop fight
function stopit(){
   qiangzhi_tuichu_monster_fight_check();
    $('body').oneTime('6ds',function(){
                  return_monster_fight_check();
        console.log('stopme战斗');
      });
}

})();