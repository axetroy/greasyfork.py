// ==UserScript==
// @name 「ぽぷぽぷぽっぷん」でクリア分かりやすくする。
// @description 右側にクリアランプ順に表示するボタンを追加した。
// @namespace http://shioneko.sakura.ne.jp/
// @version 1.60
// @include http://popupopupopnp.com/alldata/?level*
// @include http://popupopupopnp.com/clear_log/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js
// ==/UserScript==

// 未クリアのグラーデーションは　濃 > 薄
// クリアしてるものは 薄 のから 濃 にしてます。

$(document).ready(function () {

	// 右の欄について
	$("body").append("<p id='noplay'>プレーなし</p>");
	$("#noplay").css({
		"position":"fixed",
		"bottom":"10px",
		"right":"10px",
		"width":"100px",
		"background-color":"#eeeeee"
	});

	$("#noplay").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","none");
        	});
			$("#C" + i).attr("checked", false);

        	if (i == 0){
        		$(".C_0").css("display","");
            	$("#C0").attr("checked", true);
        	}
        }
	});

	// 右の欄について
	$("body").append("<p id='notC'>未クリア</p>");
	$("#notC").css({
		"position":"fixed",
		"bottom":"40px",
		"right":"10px",
		"width":"100px",
		"background-color":"#b2b2b2"
	});

	$("#notC").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","none");
        	});
			$("#C" + i).attr("checked", false);

        	if (i == 1){
        		$(".C_1").css("display","");
            	$("#C1").attr("checked", true);
        	}else if (i == 2){
        		$(".C_2").css("display","");
            	$("#C2").attr("checked", true);
        	}else if (i == 3){
        		$(".C_3").css("display","");
            	$("#C3").attr("checked", true);
        	}
        }
	});

	// クリアのみ
	$("body").append("<p id='play'>通常クリアのみ</p>");
	$("#play").css({
		"position":"fixed",
		"bottom":"70px",
		"right":"10px",
		"width":"100px",
		"background-color":"#ffe8e0"
	});

	$("#play").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","none");
        	});
        	$("#C" + i).attr("checked", false);

        	if (i == 4){
        		$(".C_4").css("display","");
            	$("#C4").attr("checked", true);
        	} else if (i == 5){
        		$(".C_5").css("display","");
            	$("#C5").attr("checked", true);
        	} else if (i == 6){
        		$(".C_6").css("display","");
            	$("#C6").attr("checked", true);
        	}
        }
	});

	// フルコンのみ
	$("body").append("<p id='FullC'>フルコンのみ</p>");
	$("#FullC").css({
		"position":"fixed",
		"bottom":"100px",
		"right":"10px",
		"width":"100px",
		"background-color":"#e0f7ff"
	});

	$("#FullC").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","none");
        	});
			$("#C" + i).attr("checked", false);

        	if (i == 7){
            	$(".C_7").css("display","");
            	$("#C7").attr("checked", true);
        	} else if (i == 8){
            	$(".C_8").css("display","");
            	$("#C8").attr("checked", true);
        	} else if (i == 9){
            	$(".C_9").css("display","");
            	$("#C9").attr("checked", true);
        	}
        }
	});

	// パーフェクトのみ
	$("body").append("<p id='Parfect'>パーフェクト</p>");
	$("#Parfect").css({
		"position":"fixed",
		"bottom":"130px",
		"right":"10px",
		"width":"100px",
		"background-color":"#ffecad"
	});

	$("#Parfect").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","none");
        	});
			$("#C" + i).attr("checked", false);

        	if (i == 10){
        		$(".C_10").css("display","");
            	$("#C10").attr("checked", true);
        	} 
        }
	});

// リセット
	$("body").append("<p id='Reset'>リセット</p>");
	$("#Reset").css({
		"position":"fixed",
		"bottom":"160px",
		"right":"10px",
		"width":"100px",
		"background-color":"#4c6"
	});

	$("#Reset").click(function(){
		for (var i = 0 ; i < 11 ; i++){

			$(".C_"+ i).each(function(){
            	$(".C_"+ i).css("display","");
        	});
			$("#C" + i).attr("checked", true);
        }
	});

	// No play (タグのみ)
	$("tr td:empty").each(function(){
		$(this).parent().attr('class','C_0')
	});

	// 未クリアの場合 （灰色）
	$("img[src*='1.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_1 ')
		$(this).parent().parent().css({'background':'#b2b2b2'});
	});

	// もう少しでクリアの場合 （灰色）
	$("img[src*='2.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_2')
		$(this).parent().parent().css({'background':'#bfbfbf'});
	});

	// かなり惜しい場合 （灰色）
	$("img[src*='3.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_3')
		$(this).parent().parent().css({'background':'#cbcbcb'});
	});

	// 通常クリアの場合　（橙色）
	$("img[src*='4.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_4')
		$(this).parent().parent().css({'background':'#ffe8e0'});
	});

	// 罰20以下クリアの場合　（橙色）
	$("img[src*='5.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_5')
		$(this).parent().parent().css({'background':'#ffd5c7'});
	});

	// 罰5以下クリアの場合　（橙色）
	$("img[src*='6.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_6')
		$(this).parent().parent().css({'background':'#ffc2ad'});
	});

	// フルコンの場合　（水色）
	$("img[src*='7.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_7')
		$(this).parent().parent().css({'background':'#e0f7ff'});
	});

	// フルコンでなおかつGood 20以下（水色）
	$("img[src*='8.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_8')
		$(this).parent().parent().css({'background':'#c7f0ff'});
	});

	// フルコンでなおかつGood 5以下（水色）
	$("img[src*='9.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_9')
		$(this).parent().parent().css({'background':'#adeaff'});
	});

	// パフェ（黄色）
	$("img[src*='10.gif']").each(function(){
		// メダルの要素の背景に色を付けてわかりやすくする。
		$(this).parent().parent().attr('class','C_10')
		$(this).parent().parent().css({'background':'#ffecad'});
	});
	
	// チェックボックスフォーラムを作る。
	$('form').eq(1).after('<div style="width:100%; margin:5px;  margin-left:-13px;" id="Mf"></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/1.gif">No Clear : <input type="checkbox" checked="checked" id="C1" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/2.gif">No Clear : <input type="checkbox" checked="checked" id="C2" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/3.gif">No Clear : <input type="checkbox" checked="checked" id="C3" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/4.gif">Clear : <input type="checkbox" checked="checked" id="C4" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/5.gif">Clear : <input type="checkbox" checked="checked" id="C5" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/6.gif">Clear : <input type="checkbox" checked="checked" id="C6" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/7.gif">Clear : <input type="checkbox" checked="checked" id="C7" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/8.gif">Clear : <input type="checkbox" checked="checked" id="C8" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/9.gif">Clear : <input type="checkbox" checked="checked" id="C9" /></div>');
	$('#Mf').append('<div class="Ccss"><img src="/img/mark/10.gif">Parfect : <input type="checkbox" checked="checked" id="C10" /></div>');
	$('#Mf').append('<div class="Ccss">No Play : <input type="checkbox" checked="checked" id="C0" /></div>');

	$('.Ccss').css({'width':'110px','display':'inline-block','text-align':'right'});
	//$('#Mf').append('No Clear : <input type="checkbox" checked="checked" id="NoClear" />　');
	

	// チェックボックスのシステム部分
	$('#C0').click(function(){
        $(".C_0").each(function(){
            $(this).toggle();
        });
    });
	$('#C1').click(function(){
        $(".C_1").each(function(){
            $(this).toggle();
        });
    });
    $('#C2').click(function(){
        $(".C_2").each(function(){
            $(this).toggle();
        });
    });
    $('#C3').click(function(){
        $(".C_3").each(function(){
            $(this).toggle();
        });
    });
	$('#C4').click(function(){
        $(".C_4").each(function(){
            $(this).toggle();
        });
    });
    $('#C5').click(function(){
        $(".C_5").each(function(){
            $(this).toggle();
        });
    });
    $('#C6').click(function(){
        $(".C_6").each(function(){
            $(this).toggle();
        });
    });
    $('#C7').click(function(){
        $(".C_7").each(function(){
            $(this).toggle();
        });
    });
    $('#C8').click(function(){
        $(".C_8").each(function(){
            $(this).toggle();
        });
    });
    $('#C9').click(function(){
        $(".C_9").each(function(){
            $(this).toggle();
        });
    });

    $('#C10').click(function(){
        $(".C_10").each(function(){
            $(this).toggle();
        });
    });
});