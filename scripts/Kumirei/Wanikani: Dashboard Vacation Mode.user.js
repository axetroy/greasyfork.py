// ==UserScript==
// @name         Wanikani: Dashboard Vacation Mode
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Adds a vacation mode shortcut button to the dashboard.
// @author       kumirei (& rfindley)
// @include      https://www.wanikani.com*
// @grant        none
// ==/UserScript==

(function() {
		$.ajax('/settings/account')
				.then(extract_vacation_form)
				.then(function(form) {
				    var btn = $(form.btn)[0];
				    btn.onclick = function() {$.post(form.url, form.data); window.location.reload();};
				    $('#search > .container > .row > .span12').append(btn);
		});

		function extract_vacation_form(html){
				var form = $(html).find('#edit_user_vacation');
				var url = form.attr('action');
				var data = {};
				form.find('input').toArray().forEach(function(i){
						var name = $(i).attr('name');
						var value = $(i).attr('value');
						data[name] = value;
				});
				var btn = $(html).find('#vacation-btn')[0].outerHTML;
				return ({btn:btn, url:url, data:data});
		}
})();