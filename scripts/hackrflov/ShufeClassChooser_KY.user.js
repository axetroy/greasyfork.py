// ==UserScript==
// @name               ShufeClassChooser_KY
// @namespace          https://www.github.com/hackrflov
// @description        tool for choosing classes in sufe.edu.cn
// @include            http://eams.sufe.edu.cn/eams/stdElectCourse!defaultPage.action?electionProfile.id=*
// @version            1.5
// @require 		   http://code.jquery.com/jquery-2.1.4.min.js
// @grant              GM_log
// ==/UserScript==

var ele_ids = ['210735','211152','208659'];
var wtd_ids = ['210754', '213401'];
/* alert(ids.length); */
function doPost() {
	// withdraw
	var ii = 0;
	for (var j = 0; j < wtd_ids.length; j++) {
		setTimeout(function(){
			var tar = 'http://eams.sufe.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=1584&electLessonIds=&withdrawLessonIds='+wtd_ids[ii];
			$.ajax({
				type : 'POST',
				url:tar,
				success:function(data){
					/* 		alert('success'+data); */
					GM_log('choose successful id = ' + wtd_ids[ii]);
					GM_log(data.replace(/\n/,''));
					ii++;
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					/* 		alert('error' + XMLHttpRequest.status); */
					GM_log('choose failed id = ' + wtd_ids[ii]);
					ii++;
				}
			});
		}, j*100);
	}
	// select
	var i = 0;
	for (var j = 0; j < ele_ids.length; j++) {
		setTimeout(function(){
			var tar = 'http://eams.sufe.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=1584&electLessonIds='+ele_ids[i];
			$.ajax({
				type : 'POST',
				url:tar,
				success:function(data){
					/* 		alert('success'+data); */
					GM_log('choose successful id = ' + ele_ids[i]);
					GM_log(data.replace(/\n/,''));
					i++;
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					/* 		alert('error' + XMLHttpRequest.status); */
					GM_log('choose failed id = ' + ele_ids[i]);
					i++;
				}
			});
		}, j*100);
	}
}
var count = 0;
for (var k = 0; k < 10000 ; k++) {
	setTimeout(function() {
		doPost();
	}, k * 1000);
}