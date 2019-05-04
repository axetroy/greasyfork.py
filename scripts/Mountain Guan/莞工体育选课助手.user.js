// ==UserScript==
// @name         莞工体育选课助手
// @namespace    http://your.homepage/
// @version      1.0
// @description  助你快速选课
// @author       mountainguan
// @match        http://tyxk.dgut.edu.cn/index.php?m=Home&c=Student&a=index
// @match        http://tyxk.dgut.edu.cn/index.php?m=&c=Student&a=index
// @grant        none
// ==/UserScript==
//============插入窗口============
document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + "<div style='top:0px;position:fixed;width:220px;right:0;top:30px'><div class='panel panel-info'><div class='panel-heading'><h6 class='panel-title text-center text-danger'>体育选课助手</h6></div><div class='panel-body'><div class='well'><form role='form' class='text-center'><div class='form-group'><label class='control-label' for='tyxkId'>课程编号</label><input class='form-control input-sm' id='tyxkId' type='text'></div><input type='button' class='btn btn-default btn-xs' id='select' value='选课'>         <input type='button' class='btn btn-default btn-xs' id='retreat' value='退选'></form></div><span class='badge' style='float:right'>Version 1.0</span></div></div></div>";
//=============功能===============
document.getElementById("select").onclick = function() {
    var TYcourseID = document.getElementById('tyxkId').value;
    selectCourseDoing(TYcourseID,'sel');
}
document.getElementById("retreat").onclick = function() {
    var TYcourseID = document.getElementById('tyxkId').value;
    selectCourseDoing(TYcourseID,'quit');
}