// ==UserScript==
// @name               ShufeClassChooser
// @namespace          https://www.github.com/hackrflov
// @description        tool for choosing classes in sufe.edu.cn
// @include            http://eams.sufe.edu.cn/eams/stdElectCourse!defaultPage.action?electionProfile.id=*
// @version            0.3.8
// @require 		   http://code.jquery.com/jquery-2.1.4.min.js
// @grant              GM_log
// ==/UserScript==

var ids = ['211825', '210810', '208652'];
function doPost() {
	var i = 0;
	for (var j = 0; j < ids.length; j++) {
		setTimeout(function(){
			var tar = 'http://eams.sufe.edu.cn/eams/stdElectCourse!batchOperator.action?profileId=1584&electLessonIds='+ids[i];
			$.ajax({
				type : 'POST',
				url:tar,
				success:function(data){
					GM_log('choose successful id = ' + ids[i]);
					GM_log(data.replace(/\n/,''));
					i++;
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					GM_log('choose failed id = ' + ids[i]);
					i++;
				}
			});
		}, j*100);
	}
}
for (var k = 0; k < 60000 ; k++) {
	setTimeout(function() {
		doPost();
	}, k * 500);
}