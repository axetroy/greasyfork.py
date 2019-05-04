// ==UserScript==
// @name            NeverFate Copy Replace
// @namespace       neverfate
// @include         http://neverfate.ru/*
// @exclude         http://neverfate.ru/
// @exclude         http://neverfate.ru/index.php
// @description     Заменяет кривой механизм копирования текста через флешку на встроенный в браузеры.
// @version         1.0
// @grant           none
// ==/UserScript==


if ( ZeroClipboard && ZeroClipboard.Client ) {
	ZeroClipboard.Client = function () {
		return {
			addEventListener: function () {
			},
			destroy: function () {
			},
			glue: function (id) {
				var el = document.getElementById(id);
				el.addEventListener('click', function ( event ) {
					var login = el.getAttribute('rel');
					try {
						var ta = document.createElement('input');
						ta.setAttribute('type', 'text');
						ta.setAttribute('value', login);
						ta.setAttribute('style', 'width:0;height:0;border:0;');
						el.appendChild(ta);
						ta.select();
						document.execCommand('copy');
						cMenu();
					} catch ( e ) {
						// console.error(e)
					}
					
				});
				
			},
		};
	};
}

