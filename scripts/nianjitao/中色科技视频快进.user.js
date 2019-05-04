// ==UserScript==
// @name        中色科技视频快进
// @namespace   xcg
// @version     6
// @grant       none
// @description   可快速看完中色Oa内的视频  可学习并答题(模拟试卷提交后可以学习),可学习并答题知识竞赛
// @author       NianJiTao
// @include       *://tqm.caq.org.cn:8080/*
// @include       *://tqm.caq.org.cn/*
// @match       *://192.1.1.86/*Video.aspx*
// @match       *://192.1.1.86/*VideoList.aspx*
// @match       *://192.1.1.86/*VideoData.aspx*
// @match       *://192.1.1.86/*/Answer/answerlist.aspx*
// @match       *://192.1.1.86/*/Answer/*.aspx*
// @match       *://192.1.1.86/*/Answer/Formal.aspx*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @require      http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js
// @grant       none
// ==/UserScript==
(function () {
  'use strict';
var video = /Video.aspx/i;
var VideoList = /VideoList.aspx/i;
var VideoData = /VideoData.aspx/i;
var caiurl = /answerlist/i;
var caiurl2 = /Practice/i;
var caiurl3 = /Fpaper.aspx/i;
var loginAnswer = /loginAnswer/i;
var caix = 0;
var url = window.location.href;
var Btn1 = '<a id="fastBtn" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">快进</a>';
var Btn2 = '<a id="fastBtn2" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">全部打开</a>';
var Btn3 = '<a id="fastBtn3" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">全部快进</a>';
var 一键看完 = '<button id="一键看完" >一键看完</button>';
var Btn4 = '<a id="fastBtn4" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">学习</a>';
var Btn5 = '<a id="fastBtn5" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">答题</a>';
var Btn7 = '<a id="fastBtn7" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">清除记忆</a>';
var Btn6 = '<td>已学习: <a id="学习数量1"></a></td><td>已答题: <a id="答题数量1"></a></td>';
var Btn9 = '<font face="宋体" size="4">已答题: <a id="答题数量1"></a></font></td>';

var Btn10 = '<a id="fastBtn10" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">答题</a>';
var Btn11 = '<a id="fastBtn11" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">学习</a>';
var Btn12 = '<div><textarea id="fastBtn12"> </textarea></div>';
var Btn13 = '<a id="fastBtn13" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">显示答案</a>';
var Btn14 = '<div><textarea id="fastBtn14"> </textarea></div>';
var Btn15 = '<a id="fastBtn15" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">导入答案</a>';

//模拟考试页面上答案导入导出
var Btn21 = '<div><textarea id="fastBtn21"> </textarea></div>';
var Btn22 = '<a id="fastBtn22" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">显示答案</a>';
var Btn23 = '<div><textarea id="fastBtn23"> </textarea></div>';
var Btn24 = '<a id="fastBtn24" style="cursor:pointer;text-decoration:none;color:red;padding:2 5px;border:1px solid red;">导入答案</a>';
var pp = '<p></p>';
  
  
var I64BIT_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  //哈希算法
function hash3(input){var hash=5381;var i=input.length-1;if(typeof input=='string'){for(;i>-1;i--)hash+=(hash<<5)+input.charCodeAt(i)}else{for(;i>-1;i--)hash+=(hash<<5)+input[i]}var value=hash&2147483647;var retValue='';do{retValue+=I64BIT_TABLE[value&63]}while(value>>=6);return retValue}

  //保存答案
function save2(name,value2){if(window.localStorage){localStorage.setItem(name,value2)}else{$.cookie(name,value2,3)}}
 
  //读取答案
function read2(name){var m2='';if(window.localStorage){if(localStorage.hasOwnProperty(name)){m2=localStorage.getItem(name)}}else{m2=$.cookie(name)}return m2}
  
  //读取所有答案
function readAll(){var m2='';var storage=window.localStorage;var len=0;for(var i=0,len=storage.length;i<len;i++){var key=storage.key(i);var value=storage.getItem(key);m2=m2+key+":"+value+";"}return m2}

 
function 全部打开() {
     var test = $('.Grid').find('a');
    test.each(function() {
        var url4 = $(this).attr('href');
        window.open(url4)
    })
}
  
function 全部快进() {
    var test = $('.Grid').find('a');
    test.each(function() {
        var url4 = $(this).attr('href').replace(/video/i, 'SetFinish');
        window.open(url4)
    })
}
  
  function 添加一键看完() {
     var title = $('.Grid');
    if (title.length !== 0) {
      title.after(Btn3).after(Btn2).after(一键看完);
      css2($('#fastBtn2'));
      css2($('#fastBtn3'));
      css2($('#一键看完'));
    }
}
  
  //美化格式
function css2(name){name.css({'font-size':'30px','margin':'5 5px','color':'red',})}
 
  //在视频播放页面添加快进按钮
if(video.test(url)){var title=$('body');if(title.length!==0){title.after(Btn1);css2($('#fastBtn'))}}
  //在竞赛页面添加答题按钮

  if (loginAnswer.test(url)) {
    var title = $('#trainExamName');
    if (title.length !== 0) {
      title.after(Btn6).after(Btn11).after(Btn10);
      css2($('#fastBtn10'));
      css2($('#fastBtn11'));
    }
    var title = $('#handPaper')
    if (title.length !== 0) {
      title.parent().after(Btn14).after(Btn15).after(Btn12).after(Btn13);
      css2($('#fastBtn15'));
      css2($('#fastBtn13'));
      $('#fastBtn12').css({
        'width': '1100px',
      });
      $('#fastBtn14').css({
        'width': '1100px',
      });
    }
  } 
  //在视频列表页面添加全播放,全快进

  if (VideoList.test(url)) {
    var title = $('.Grid');
    if (title.length !== 0) {
      title.after(Btn3).after(Btn2).after(一键看完);
      css2($('#fastBtn2'));
      css2($('#fastBtn3'));
    }
  } 
  //在视频列表页面添加全播放,全快进

  if (VideoData.test(url)) {
    添加一键看完();
    // setTimeout(添加一键看完,2000);     
   // return false;
    
  } 
  //在模拟答案页面添加学习,答题

  if (caiurl.test(url)) {
    var title = $('#table1').find('[id=\'HyperLink1\']');
    if (title.length !== 0) {
      title.after(Btn6).after(Btn7).after(Btn5).after(Btn4);
      css2($('#fastBtn4'));
      css2($('#fastBtn5'));
      css2($('#fastBtn7'));
    }
  } 
  //在模拟考试页面添加 答题 ,答案导入导出按钮

 if (caiurl2.test(url)) {
    var title =  $(document.body); 
    if (title.length !== 0) {      
       title.prepend(Btn9).prepend(Btn5);      
       
        css2($('#fastBtn5'));
        title.append(Btn24).append(Btn23).append(Btn22).append(Btn21).append(pp);
        css2($('#fastBtn24'));
        css2($('#fastBtn22'));
        $('#fastBtn21').css({
            'width': '1100px',
        });
        $('#fastBtn23').css({
            'width': '1100px',
        })
    }
  
}
  
  //在正式考试页面添加 答题

 if(caiurl3.test(url)){var title=$('#table1').find('[align=\'center\']');if(title.length!==0){title.append(Btn5).append(Btn9);css2($('#fastBtn5'))}}
  
 
  //清除记忆答案

$('#fastBtn7').on('click',function(){localStorage.clear()});
  
  //快进
$('#fastBtn').on('click',function(){var url3=url.replace(/video/i,'SetFinish');window.open(url3)});
  
  //全部打开
 $('#fastBtn2').on('click',
function() {
    全部打开(); 
});
  
  //全部快进
 $('#fastBtn3').on('click',function(){var test=$('.Grid').find('a');test.each(function(){var url4=$(this).attr('href').replace(/video/i,'SetFinish');window.open(url4)})});
  
  $('#一键看完').on('click',
function() {      
  
  //  setTimeout('alert("延迟1s")',1000); 
    setTimeout(全部打开,1000);     
    setTimeout(全部快进,5000);     
    return false;
});
  
  
  //学习
  $('#fastBtn4').on('click',function(){var test=$('#DataList1').find('[id=\'table2\']');test.each(function(){var s10=$(this).find('span').eq(0).text().replace(/[^\u4e00-\u9fa5]+/g,'');var s11=$(this).find('span').eq(1).text();var s12=hash3(s10);var m2=read2(s12);if(m2=='A'||m2=='B'||m2=='C'||m2=='D'){}else{save2(s12,s11);caix=caix+1}document.getElementById('学习数量1').innerHTML=caix})});
  
  
  //答题
$('#fastBtn5').on('click',function(){var x=0;var test=$('#DataList1').find('[id=\'table2\']');test.each(function(){var s10=$(this).find('span').eq(0).text().replace(/[^\u4e00-\u9fa5]+/g,'');var s12=hash3(s10);var m2=read2(s12);var y3=9;if(m2=='A'){y3=0};if(m2=='B'){y3=1};if(m2=='C'){y3=2};if(m2=='D'){y3=3};if(y3<9){$(this).find('[type=\'radio\']').eq(y3).attr('checked',true);x=x+1}});document.getElementById('答题数量1').innerHTML=x});
  
  //知识竞赛答题
  $('#fastBtn10').on('click', function () {
    var x = 0;
    var test = $('#singleSelect').children();
    test.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var m2 = read2(s12);
      var y3 = 9;
      if (m2 == 'A') {
        y3 = 0
      }
      if (m2 == 'B') {
        y3 = 1
      }
      if (m2 == 'C') {
        y3 = 2
      }
      if (m2 == 'D') {
        y3 = 3
      }
      if (y3 < 9) {
        $(this).find('[type=\'radio\']').eq(y3).attr('checked', true);
        x = x + 1;
      }
    })
    var test2 = $('#multipleSelect').children();
    test2.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var m2 = '';
      m2 = read2(s12);
      //  document.getElementById('答题数量1').innerHTML  += m2;
      var y3 = 0;
      if (m2.length !== 0) {
        if (m2.indexOf('A') >= 0) {
          $(this).find('[type=\'checkbox\']').eq(0).attr('checked', true);
        }
        if (m2.indexOf('B') >= 0) {
          $(this).find('[type=\'checkbox\']').eq(1).attr('checked', true);
        }
        if (m2.indexOf('C') >= 0) {
          $(this).find('[type=\'checkbox\']').eq(2).attr('checked', true);
        }
        if (m2.indexOf('D') >= 0) {
          $(this).find('[type=\'checkbox\']').eq(3).attr('checked', true);
        }
        if (m2.indexOf('E') >= 0) {
          $(this).find('[type=\'checkbox\']').eq(4).attr('checked', true);
        }
      }
      if (y3 < 9) {
        x = x + 1;
      }
    })
    document.getElementById('答题数量1').innerHTML = x;
  });
 
  
  //知识竞赛学习
  $('#fastBtn11').on('click', function () {
    var x = 0;
    var test = $('#singleSelect').children();
    test.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var s13 = $(this).find('[type=\'radio\']');
      if (s13.eq(0).attr('checked'))
      {
        x = x + 1;
        save2(s12, 'A');
      }
      if (s13.eq(1).attr('checked'))
      {
        x = x + 1;
        save2(s12, 'B');
      }
      if (s13.eq(2).attr('checked'))
      {
        x = x + 1;
        save2(s12, 'C');
      }
      if (s13.eq(3).attr('checked'))
      {
        x = x + 1;
        save2(s12, 'D');
      }
    })
    var test2 = $('#multipleSelect').children();
    test2.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var m2 = '';
      var s13 = $(this).find('[type=\'checkbox\']');
      if (s13.eq(0).attr('checked'))
      {
        m2 += 'A';
      }
      if (s13.eq(1).attr('checked'))
      {
        m2 += 'B';
      }
      if (s13.eq(2).attr('checked'))
      {
        m2 += 'C';
      }
      if (s13.eq(3).attr('checked'))
      {
        m2 += 'D';
      }
      if (s13.eq(4).attr('checked'))
      {
        m2 += 'E';
      }
      if (m2.length !== 0) {
         x = x + 1;
        save2(s12, m2);
      }
    })
    document.getElementById('学习数量1').innerHTML = x;
  });
  
  
  //显示竞赛学习答案
  $('#fastBtn13').on('click', function () {
    var x = 0;
    var an = '';
    var test = $('#singleSelect').children();
    test.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var s13 = $(this).find('[type=\'radio\']');
      if (s13.eq(0).attr('checked'))
      {
        an += s12 + ':A;';
      }
      if (s13.eq(1).attr('checked'))
      {
        an += s12 + ':B;';
      }
      if (s13.eq(2).attr('checked'))
      {
        an += s12 + ':C;';
      }
      if (s13.eq(3).attr('checked'))
      {
        an += s12 + ':D;';
      }
    })
    var test2 = $('#multipleSelect').children();
    test2.each(function () {
      var s10 = $(this).find('.content_style').text().replace(/[^\u4e00-\u9fa5]+/g, '');
      var s12 = hash3(s10);
      var m2 = '';
      var s13 = $(this).find('[type=\'checkbox\']');
      if (s13.eq(0).attr('checked'))
      {
        m2 += 'A';
      }
      if (s13.eq(1).attr('checked'))
      {
        m2 += 'B';
      }
      if (s13.eq(2).attr('checked'))
      {
        m2 += 'C';
      }
      if (s13.eq(3).attr('checked'))
      {
        m2 += 'D';
      }
      if (s13.eq(4).attr('checked'))
      {
        m2 += 'E';
      }
      if (m2.length !== 0) {
        an = an + s12 + ':' + m2 + ';';
      }
    })
    document.getElementById('fastBtn12').value = an;
  });
 
  
  //导入竞赛学习答案
  $('#fastBtn15').on('click', function () {
    var str = document.getElementById('fastBtn14').value;
    var strs = new Array(); //定义一数组
    var strs2 = new Array();
    strs = str.split(';'); //字符分割
    var i = 0;
    var n = 0;
   
    for (i = 0; i < strs.length; i++)
    {
      var k = strs[i];
      strs2 = k.split(':');
      if (strs2.length === 2)
      {
        var read3 = read2(strs2[0]);
        if (read3 !== strs2[1])
        {
          n += 1;
          save2(strs2[0], strs2[1]);
        }
      }
    }
    var text = '导入:' + strs.length + ' 新:' + n;
    window.alert(text);
  });
 
  
  //显示模拟考试已经学习的答案
  $('#fastBtn22').on('click',function(){document.getElementById('fastBtn21').value=readAll()});
  
 
  //导入模拟考试答案
$('#fastBtn24').on('click',function(){var str=document.getElementById('fastBtn23').value;var strs=new Array();var strs2=new Array();strs=str.split(';');var i=0;var n=0;for(i=0;i<strs.length;i++){var k=strs[i];strs2=k.split(':');if(strs2.length===2){var read3=read2(strs2[0]);if(read3!==strs2[1]){n+=1;save2(strs2[0],strs2[1])}}}var text='导入:'+strs.length+' 新:'+n;window.alert(text)});
  
  
  
  
}) ();
