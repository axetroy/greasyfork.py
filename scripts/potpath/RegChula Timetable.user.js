// ==UserScript==
// @name        RegChula Timetable
// @description auto select ทวิภาค, auto submit, disable waiting alert message
// @include     https://www.reg.chula.ac.th/servlet/com.dtm.chula.cs.servlet.QueryCourseScheduleNew.*
// @version     2
// @grant       none
// @namespace https://greasyfork.org/users/4947
// ==/UserScript==

try{
	studyProgram.selectedIndex=1;
}
finally{
	try{
		courseno.addEventListener('input', function(){
			courseno.value.length==7 && document.forms[0].submit();
		},true);
	}
	finally{
		window.verify=function(){return true;}; // disable waiting
	}
}
