// ==UserScript==
// @name         Tumblr Accessibility UI Update Toggle
// @version      5.03
// @namespace    https://greasyfork.org/users/65414
// @description  Roll back the accessibility UI update by default, and add a toggle to enable/disable it in the Dashboard settings page
// @match        http://*.tumblr.com/*
// @match        https://*.tumblr.com/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @run-at       document-start
// ==/UserScript==

(function($){

    if (localStorage.getItem('dashboardPlugins-f2') == null) {
        alert('An update to Tumblr means that the Accessibility UI Toggle does not currently work, please wait patiently for the forthcoming update to fix this.');
        localStorage.setItem('dashboardPlugins-f','f2')
    }

    let version = GM_info.script.version, lang = $('html').attr('lang').split('-')[0], url = window.location.href,

        plugin = {

	        cfg: {

		        context: ['.com/settings/dashboard'],

		        func: function(){ let cfg = setInterval(function(){ !$('.dashboardPlugins-cfg').length ? $('.interface .group_content').prepend($('<span>').addClass('dashboardPlugins-cfg')) : $.each(Object.keys(plugin), function(index, id){ if (!$('#user_enable_' + id).length && $('.dashboardPlugins-cfg').length !== plugin.length){ if('str' in plugin[id]){ $('.dashboardPlugins-cfg').append( plugin[id].str[lang].indexOf('|') > -1 ? $('.interface .group_content > div p').closest('.checkbox').clone() : $('.interface .checkbox:last').clone()); $('.interface .dashboardPlugins-cfg .checkbox:last').find('label:last').attr('for', 'user_enable_' + id).text( plugin[id].str[lang].split('|')[0] ); if ($('.interface .dashboardPlugins-cfg .checkbox:last p').length) {$('.interface .dashboardPlugins-cfg .checkbox:last p').text( plugin[id].str[lang].split('|')[1])}; $('.interface .dashboardPlugins-cfg .checkbox:last').find('input').prop('checked', plugin[id].pref.toggle).attr('id', 'user_enable_' + id).attr('name', 'user[enable_' + id + ']').removeAttr('value'); $(document).on('click', '#user_enable_' + id, function(){ plugin[id].pref.toggle = !plugin[id].pref.toggle; localStorage.setItem('dashboardPlugins-' + id, JSON.stringify(plugin[id], function(key, value) { return (typeof value === 'function' ? value.toString() : value ); })); if ('func' in plugin[id]) { plugin[id].func(plugin[id].pref.toggle) } }) } } else { clearInterval(cfg); } }) }, 1); },

		        css: `.flag-dashboardPlugins .settings_group.interface .group_content {
		                 display: flex;
		                 flex-direction: column;
		              }

		             .flag-dashboardPlugins .settings_group.interface .group_content .help_text {
		                 margin: 0 0 10px;
		             }

		             .flag-dashboardPlugins .settings_group.interface .dashboardPlugins-cfg {
		                 display: flex;
		                 flex-direction: column;
		                 order: 999;
		                 margin-top: 10px;
		             }

		             .flag-dashboardPlugins .settings_group.interface .dashboardPlugins-cfg .checkbox:last-of-type p{
		                 margin: 0px;
		             }

		             .flag-dashboardPlugins .settings_group.interface .dashboardPlugins-cfg .checkbox:last-of-type {
		                 margin-bottom: 0px;
		             } `,

	        },

	        eaud: {

		        pref: { toggle: '' },

		        str: { de: "Schakel UI-ontwerp voor toegankelijkheid in",
		               fr: "Activer la conception de l'interface utilisateur d'accessibilité",
		               it: "Abilita la progettazione dell'interfaccia utente di accessibilità",
		               ja: "ユーザー補助UIデザインを有効にする",
		               tr: "Erişilebilirlik UI tasarımını etkinleştir",
		               es: "Habilitar el diseño de la interfaz de usuario de accesibilidad",
		               ru: "Включить дизайн пользовательского интерфейса",
		               pl: "Włącz projektowanie interfejsu użytkownika ułatwień dostępu",
		               pt: "Ativar design de interface do usuário de acessibilidade",
		               nl: "Schakel UI-ontwerp voor toegankelijkheid in",
		               ko: "접근성 UI 디자인 사용",
		               zh: "启用辅助功能UI设计",
		               id: "Aktifkan desain UI aksesibilitas",
		               hi: "अभिगम्यता UI डिज़ाइन सक्षम करें",
		               en: "Enable accessibility UI design",
		        },

		        func: function(){ let eaud = setInterval(function(){ ($('.flag--accessibility-design-update').length != plugin.eaud.pref.toggle) || !$('.flag-dashboardPlugins-eaud').length ? $('body').toggleClass('flag--accessibility-design-update', plugin.eaud.pref.toggle).addClass('flag-dashboardPlugins-eaud') : clearInterval(eaud) }, 1) },

	        }

        },

        init = $('html').addClass('flag-dashboardPlugins'); if (localStorage.getItem('dashboardPlugins-eaud') == null) { $.each(Object.keys(localStorage), function(index,id){ if (id.indexOf('aduiPref') > -1){ plugin.eaud.pref.toggle = JSON.parse(localStorage.getItem(id)); localStorage.removeItem(id); }; }); if (plugin.eaud.pref.toggle !== true){ plugin.eaud.pref.toggle = false; }; localStorage.setItem('dashboardPlugins-eaud', JSON.stringify(plugin.eaud, function(key, value) { return (typeof value === 'function' ? value.toString() : value ); })) } $.each(Object.keys(localStorage), function(index,id){ if (id.indexOf('dashboardPlugins-') > -1) { let shortId = id.split('-')[1]; plugin[shortId] = new Object(JSON.parse(localStorage.getItem(id))) ; } }); $.each(Object.keys(plugin), function(index,id){ if (!('context' in plugin[id]) || plugin[id].context.every(function(i){return url.indexOf(i) > -1})){if ('func' in plugin[id]) {plugin[id].func = eval('(' + plugin[id].func + ')');plugin[id].func();}; if ('css' in plugin[id]){$('head').append($('<style>').attr('type', 'text/css').text(plugin[id].css))};}});

})(jQuery);