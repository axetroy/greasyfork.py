// ==UserScript==
// @name         Student-Comment-Improver
// @namespace    maxlevs
// @version      1.0
// @description  Нормальные поля для комментариев студентов
// @author       Максим (MaxLevs) Ливень
// @match        https://student.knastu.ru/account
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	//Защита от повторного запуска
	if(document.getElementById("maxlevs-edited"))
		return false;

	let norm_styles = document.createElement("style");
	norm_styles.innerHTML = "textarea.form-control{height: 200px; font-size: 16px;}";
	norm_styles.setAttribute("id", "maxlevs-edited"); //Защита от повторного запуска
	let head = document.getElementsByTagName("head")[0];
	head.append(norm_styles);
	return true;
})();