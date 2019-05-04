// ==UserScript==
// @name             Google Apps Script | Editor Plus
// @name:ru          Google Apps Script | Редактор Плюс
// @name:en          Google Apps Script | Editor Plus
// @description      Дополнительные возможности для редактора Google Скриптов.
// @description:ru   Дополнительные возможности для редактора Google Скриптов.
// @description:en   Additional features for the Google Scripts Editor.
// @iconURL          https://ssl.gstatic.com/images/icons/product/script_chrome_only-256.png
// @screenshot       https://ssl.gstatic.com/images/icons/product/script_chrome_only-256.png
// @version          0.3
// @author           +stomaks (sto.maks+tampermonkey.net@gmail.com)
// @developer        +stomaks (sto.maks+tampermonkey.net@gmail.com)
// @domain           script.google.com
// @include          https://script.google.com/*
// @require          https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant            none
// @namespace        https://greasyfork.org/users/189193
// @license          WTFPL; http://www.wtfpl.net/txt/copying
// ==/UserScript==





//+------------------------------------------------------------------------------------------------+
/*
 * Самозапускающаяся анонимная функция, которая определяет. Мы на какой мы странице:
 *   • Панель управления скриптами
 *   • Редактор скрипта
 *   • Веб-приложение
 *
 * @return {function} - Запуск функции кастомизации страницы
 */
(function() {
  'use strict';
  var href = window.location.href,
      reg_href_home = new RegExp('^https:\/\/script\.google\.com\/home*$'),
      reg_href_webapp = new RegExp('^https:\/\/script\.google\.com\/macros\/s\/.*$'),
      reg_href_report = new RegExp('^https:\/\/script\.google\.com\/macros\/reportAbuse.*$');

  // Определяем, мы на странице "Панель управления скриптами"
  if( reg_href_home.test( href ) ) return customizeHome();

  // Определяем, мы на странице "Веб-приложения"?
  if( reg_href_webapp.test( href ) ) return customizeWebApp();

  // Определяем, мы на странице "Сообщить о нарушении"?
  if( reg_href_report.test( href ) ) return customizeReport();

  // На странице "Редактора скриптов"
  return customizeScriptEditor( href );
})();
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * todo: Персонализируем "Панель управления скриптами"
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function customizeHome() {
  return;
}
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Персонализируем "Сообщить о нарушении"
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function customizeReport() {
  return;
}
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Персонализируем "Веб-приложение"
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function customizeWebApp() {
  // Подключаем иконки
  $(`head`).append(`<link material-icons href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`);

  // Устанавливаем стили
  $(`head`).append(`
    <style class="custom">
        #warning.warning-bar.custom,
        #warning.warning-bar.custom .warning-bar-content {
          display: flex;
        }

        #warning.warning-bar.custom {
          position: relative;
          border-bottom: 1px solid #ddd;
        }

        #warning.warning-bar.custom .warning-bar-content {
          width: 100%;
          flex-wrap: wrap;
        }

        #warning.warning-bar.custom .warning-bar-content #warning-text {
          margin-right: auto;
        }

        #warning.warning-bar.custom .warning-bar-content a {
          margin: 0 5px;
        }

        #warning.warning-bar.custom i#toggle-warning {
          font-size: 16px;
          margin: 3px 0;
          padding: 1px 7px;
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          opacity: .5;
          cursor: pointer;
        }

        #warning.warning-bar.custom i#toggle-warning:hover {
          opacity: .75;
        }

        #warning.warning-bar.custom .panel {
          position: absolute;
          top: calc(100% + 1px);
          right: 5px;
          width: 100%;
          min-width: 200px;
          max-width: 240px;
          background: #eee;
          border-radius: 0 0 2px 2px;
          padding-bottom: 5px;
          box-shadow: 0 5px 4px 0 rgba(0, 0, 0, .05), 0px 5px 3px -2px rgba(0, 0, 0, .05), 0 4px 8px 0 rgba(0, 0, 0, .05);
        }

        #warning.warning-bar.custom .panel ul {
          padding: 0;
          list-style-type: none;
        }

        #warning.warning-bar.custom .panel ul li {
          position: relative;
          color: #555;
          padding: 5px 15px;
          border: 0;
          border-style: solid;
          border-color: #e5e5e5;
          cursor: pointer;
        }

        #warning.warning-bar.custom .panel ul li:hover {
          background-color: rgba(0, 0, 0, .05);
        }

        #warning.warning-bar.custom .panel ul li > * {
          vertical-align: middle;
        }

        #warning.warning-bar.custom .panel ul li > i {
          font-size: 18px;
        }

        #warning.warning-bar.custom .panel ul li > span {
          margin-left: 10px;
          font-size: 15px;
        }

        #warning.warning-bar[role="alert"] br {
          display: none;
        }



        .hide {
          display: none !important;
        }

        body[dock=bottom] table#warning-bar-table #warning.warning-bar.custom .panel {
          border-radius: 2px 2px 0 0;
          top: auto;
          bottom: calc(100% + 1px);
        }

        body[dock=bottom] table#warning-bar-table #warning.warning-bar.custom {
          position: relative;
          border-bottom: none;
          border-top: 1px solid #ddd;
        }
    </style>
  `);

  var storage = JSON.parse( localStorage.getItem("storage") ), // Получаем данные из localStorage
      dock_top = 'radio_button_checked',
      dock_bottom = 'radio_button_unchecked',
      dock_fly = 'radio_button_unchecked';

  // Проверка, существуют ли данные в localStorage
  if ( !storage ) {

    // Данные не существуют, создаем
    storage = {
      'dock': "top"
    };

    // Обновляем localStorage
    localStorage.setItem("storage", JSON.stringify(storage) );
  }

  // Проверка, если пользователь выбрал темную тему
  if ( storage.dock == "bottom" ) {
    $(`body`).attr("dock", "bottom");
    var tr_last = $(`table#warning-bar-table tbody tr:last-child`);

    // move up:
    tr_last.prev().insertAfter( tr_last );

    dock_top = 'radio_button_unchecked';
    dock_bottom = 'radio_button_checked';
    dock_fly = 'radio_button_unchecked';
  }

  // Добавляем кнопку для скрытия предупреждения
  var interval = setInterval(function() {
    // Проверка, существует ли предупреждение
    if ( !$(`*`).is(`#warning.warning-bar[role="alert"]`) ) return;

    if ( $(`#warning.warning-bar[role="alert"]`).hasClass("custom") ) return clearInterval( interval );

    $(`#warning.warning-bar[role="alert"]`).addClass("custom");
    $(`#warning.warning-bar[role="alert"]`).append(`
        <i id="toggle-warning" class="material-icons transition">more_vert</i>
        <div class="panel hide">
            <ul>
              <li id="dock-top" alt="Стыковать сверху">
                <i class="material-icons">${ dock_top }</i>
                <span>Стыковать сверху</span>
              </li>

              <li id="dock-bottom" alt="Стыковать снизу">
                <i class="material-icons">${ dock_bottom }</i>
                <span>Стыковать снизу</span>
              </li>

              <li id="dock-fly" class="hide" alt="Плавающий">
                <i class="material-icons">${ dock_fly }</i>
                <span>Плавающий</span>
              </li>

            </ul>
        </div>
    `);

    return;
  }, 500);



  $(`body`)
    // Устанавливаем обработчик, при клике на кнопку "Скрыть|Показать меню"
    .on("click", `#warning.warning-bar.custom #toggle-warning`, function() {
      let el = $(`#warning.warning-bar.custom .panel`),
          flag = el.hasClass("hide");

      if (flag) {
        el.removeClass("hide");
      } else {
        el.addClass("hide")
      }

      return;
    })

    // Устанавливаем обработчик, при клике на кнопку "Состыковать всерху"
    .on("click", `#warning.warning-bar.custom .panel #dock-top`, function() {
      var tr_first = $(`table#warning-bar-table tbody tr:first-child`),
          dock = $(`body`).attr("dock") || "top",
          storage = JSON.parse( localStorage.getItem("storage") ); // Получаем данные из localStorage

      // Выходим если уже применили
      if ( dock == "top") return;

      // move down:
      tr_first.next().insertBefore( tr_first );

      $(`body`).attr("dock", "top");

      changeButton( this );

      // Проверка, существуют ли данные в localStorage
      if ( !storage ) storage = {};

      storage.dock = "top";

      // Обновляем localStorage
      localStorage.setItem("storage", JSON.stringify(storage) );

      return;
    })

    // Устанавливаем обработчик, при клике на кнопку "Состыковать снизу"
    .on("click", `#warning.warning-bar.custom .panel #dock-bottom`, function() {
      var tr_last = $(`table#warning-bar-table tbody tr:last-child`),
          dock = $(`body`).attr("dock") || "top",
          storage = JSON.parse( localStorage.getItem("storage") ); // Получаем данные из localStorage

      // Выходим если уже применили
      if ( dock == "bottom") return;

      // move up:
      tr_last.prev().insertAfter( tr_last );

      $(`body`).attr("dock", "bottom");

      changeButton( this );

      // Проверка, существуют ли данные в localStorage
      if ( !storage ) storage = {};

      storage.dock = "bottom";

      // Обновляем localStorage
      localStorage.setItem("storage", JSON.stringify(storage) );

      return;
    })
  ;

  // Сменить нажатие кнопки во всплывающей панелей
  function changeButton( el ) {
    $(el).parents(`ul`).find(`li i`).text('radio_button_unchecked');
    $(el).find(`i`).text('radio_button_checked');

    return;
  }

  return;
}
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Персонализируем "Редактор Скриптов"
 *
 * @param {string} href - Ссылка (url) текущей страницы
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function customizeScriptEditor( href ) {
  // Устанавливаем стили
  setStylesWebApp();

  // Подключаем иконки
  $(`head`).append(`<link material-icons href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`);

  // Объявление переменных
  var lang = $(`html`).attr(`lang`),
      storage = JSON.parse( localStorage.getItem("storage") ), // Получаем данные из localStorage
      toolbar = $(`#docs-toolbar-wrapper`), // Панель инструментов
      text = {
        'ru': {
          'theme_white': 'Тема: Светлая',
          'theme_dark': 'Тема: Темная',
          'sidebar': 'Боковое меню',
          'documentation_in_Russian': 'Документация (на Русском)',
          'documentation_in_Russian_title': 'Документация (на Русском)',
          'direct_link_generator': 'Генератор прямых ссылок',
          'direct_link_generator_title': 'Генератор прямых ссылок на файлы в Google Диске',
          'line': 'Строка',
          'lines': 'строк',

          'сontainer_bound_scripts_gsuite': 'Скрипт, связанный с контейнером (G Suite)',
          'сontainer_bound_scripts_gsuite_title': 'Подробнее о скриптах, связанных с контейнером',
          'сontainer_bound_scripts_gsuite_url': 'https://g-apps-script.com/skripty-svyazannyye-s-konteynerom',

          'сontainer_bound_scripts': 'Скрипт, связанный с контейнером',
          'сontainer_bound_scripts_title': 'Подробнее о скриптах, связанных с контейнером',
          'сontainer_bound_scripts_url': 'https://g-apps-script.com/skripty-svyazannyye-s-konteynerom',

          'standalone_scripts_gsuite': 'Автономный скрипт (G Suite)',
          'standalone_scripts_gsuite_title': 'Подробнее об автономных скриптах',
          'standalone_scripts_gsuite_url': 'https://g-apps-script.com/avtonomnyye-skripty',

          'standalone_scripts': 'Автономный скрипт',
          'standalone_scripts_title': 'Подробнее об автономных скриптах',
          'standalone_scripts_url': 'https://g-apps-script.com/avtonomnyye-skripty'
        },
        'en': {
          'theme_white': 'Theme: White',
          'theme_dark': 'Theme: Dark',
          'sidebar': 'Sidebar',
          'documentation_in_Russian': 'Documentation (in Russian)',
          'documentation_in_Russian_title': 'Documentation (in Russian)',
          'direct_link_generator': 'Direct link generator',
          'direct_link_generator_title': 'Generator of direct links to files in Google Drive',
          'line': 'Line',
          'lines': 'lines',

          'сontainer_bound_scripts_gsuite': 'Container-bound Scripts (G Suite)',
          'сontainer_bound_scripts_gsuite_title': 'More information about the scripts associated with the container (G Suite)',
          'сontainer_bound_scripts_gsuite_url': 'https://g-apps-script.com/skripty-svyazannyye-s-konteynerom',

          'сontainer_bound_scripts': 'Container-bound Scripts',
          'сontainer_bound_scripts_title': 'Container-bound Scripts',
          'сontainer_bound_scripts_url': 'https://g-apps-script.com/skripty-svyazannyye-s-konteynerom',

          'standalone_scripts_gsuite': 'Standalone Scripts (G Suite)',
          'standalone_scripts_gsuite_title': 'Standalone Scripts (G Suite)',
          'standalone_scripts_gsuite_url': 'https://g-apps-script.com/avtonomnyye-skripty',

          'standalone_scripts': 'Standalone Scripts',
          'standalone_scripts_title': 'Standalone Scripts',
          'standalone_scripts_url': 'https://g-apps-script.com/avtonomnyye-skripty'
        }
      },
      triggerInterval;



  // Устанавливаем язык по умолчанию
  if (lang !== 'ru') lang = 'en';



  // Проверка, существуют ли данные в localStorage
  if ( !storage ) {

    // Данные не существуют, создаем
    storage = {
      theme: 'white',
      menu: 'hide'
    };

    // Обновляем localStorage
    localStorage.setItem("storage", JSON.stringify(storage) );
  }



  // Проверка, если пользователь выбрал темную тему
  if ( storage.theme == 'dark' ) {
    $(`body`).attr("theme", 'dark');
    $(`#theme`).text('hdr_weak').attr("title", text[lang].theme_dark).attr("theme", 'dark');
  }



  // Добавляем новую кнопку во вкладке "Справка"
  $(`<div class="goog-menuitem apps-menuitem" role="menuitem" aria-disabled="false" id="documentation_in_russian" style="user-select: none;" title='${ text[lang].documentation_in_Russian_title }'>
      <div class="goog-menuitem-content" style="user-select: none;">
        <span class="goog-menuitem-label" style="user-select: none;">${ text[lang].documentation_in_Russian }</span>
      </div>
    </div>`).insertAfter(`.goog-menu.goog-menu-vertical:eq(6) > :eq(1)`);



  // Добавляем новую кнопку во вкладке "Ресурсы"
  $(`<div class="goog-menuitem apps-menuitem" role="menuitem" aria-disabled="false" id="generator_pryamykh_ssylok" style="user-select: none;" title='${ text[lang].direct_link_generator_title }'>
      <div class="goog-menuitem-content" style="user-select: none;">
        <span class="goog-menuitem-label" style="user-select: none;">${ text[lang].direct_link_generator }</span>
      </div>
    </div>`).insertAfter( ".goog-menu.goog-menu-vertical:eq(5) > :eq(2)" );



  // Устанавливаем кнопку для меню
  toolbar.prepend(`
    <i id="menu" class="material-icons goog-toolbar-button" title='${ text[lang].sidebar }'>menu</i>
    <div class="goog-toolbar-separator goog-inline-block" aria-disabled="true" role="separator" id=":2c" style="user-select: none;">&nbsp;</div>
  `);



  // Устанавливаем кнопку для смены темы [светлая|темная]
  toolbar.append(`<i id="theme" class="material-icons goog-toolbar-button" theme="white" title='${ text[lang].theme_white }'>hdr_weak</i>`);





  // Устанавливаем обработчик для переключателя темы
  toolbar.on("click", `#theme`, function () {
    var theme = $(this).attr("theme");

    if (theme == 'white') {
      $(`body`).attr("theme", 'dark');
      $(this).attr("title", text[lang].theme_dark).attr("theme", 'dark'); // .text('hdr_strong')

      storage.theme = 'dark';
    }
    else {
      $(`body`).attr("theme", 'white');
      $(this).text('hdr_weak').attr("title", text[lang].theme_white).attr("theme", 'white');

      storage.theme = 'white';
    }

    // Обновляем localStorage
    localStorage.setItem("storage", JSON.stringify(storage) );
    return;
  });



  // Обработка события, нажатие на кнопку "Меню"
  toolbar.on("click", `#menu`, function () {
    var menu = $(`body`).hasClass(`hide-menu`);

    if ( menu ) {
      $(`body`).removeClass(`hide-menu`);
      storage.menu = 'show';
    } else {
      $(`body`).addClass(`hide-menu`);
      storage.menu = 'hide';
    }

    // Обновляем localStorage
    localStorage.setItem("storage", JSON.stringify(storage) );
    return;
  });


  $(`body`)
    // Определяем положение курсора
    .on("mouseup", `.code-area`, function () {return editor_( href, text[lang] ); })

    // Определяем количество строк
    .keyup(function () {return editor_( href, text[lang] ); })

    // Обработка события, нжатие на кнопку "Документация (на русском)" в меню "Справка".
    .on("click", `#documentation_in_russian`, function (e) {
      return window.open("https://g-apps-script.com/dokumentatsiya" + getUser(), "_blank");
    })

    // Обработка события, нжатие на кнопку "Генератор прямых ссылок" в меню "Ресурсы".
    .on("click", `#generator_pryamykh_ssylok`, function (e) {
      return window.open("https://g-apps-script.com/generator-pryamykh-ssylok" + getUser(), "_blank");
    })

    // todo: Обработка события, нжатие на кнопку "todo" в тексте кода.
    .on("click", `.CodeMirror-lines > div > div:last-child pre.todo-line`, function (e) {
      // $(this).trigger($.Event('keypress', { keycode: 8 }));
      // $(this).trigger($.Event('keypress', { keycode: 46 }));
      return;
    })

    // Обработка события нжатия на кнопку "todo" в тексте кода.
    .on("click", `.CodeMirror-lines > div > div:last-child pre.done-line`, function (e) {
      return;
    })

    // Обработка события, нжатие на кнопку "Триггеры" на панеле кнопок.
    .on("click", `#triggersButton`, function () {
      if ( lang == 'ru' ) {
        // Изменить надпись "Изменение" на "Редактирование" в табличных триггерах
        // Начать повторы
        triggerInterval = setInterval(function() {
          $(`.triggers`).parents(`.maestro-dialog`).attr("id", 'triggers-dialog');
          $(`.triggers tr`).find(`select.gwt-ListBox.listbox:eq(2) option:eq(1)`).text('Редактирование');
        }, 500);
      }
      return;
    })

    // Обработка события, нжатие на кнопку "Выход" или "Сохранить" в модальном окне Триггеры.
    .on("mousedown", `#triggers-dialog .dialog-close-image, #triggers-dialog .controls > *`, function () {
      return clearInterval( triggerInterval );
    })
  ;

  return;
}
//+------------------------------------------------------------------------------------------------+





//+--------------------------------------------------------------------------------------------+
/*
 * Обновление данных о коде при изменении кода
 *
 * @param {string} href - Ссылка (url) текущей страницы
 * @param {object} text - Объект с текстом на нужном языке
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function editor_( href, text ) {
  var statusbar = $(`div.status-bar`),
      focused_tab = $(`.CodeMirror-scroll.CodeMirror-focused`).parents(`.CodeMirror`),
      code_panel = focused_tab.find(`.CodeMirror-lines > div > div:last-child`),
      lines = code_panel.find(`pre`),
      num_lines = ($(`.CodeMirror .CodeMirror-scroll.CodeMirror-focused > div`).css("min-height") || '0px').replace('px', ''),
      active_line= parseInt(focused_tab.find(`.CodeMirror-lines .CodeMirror-cursor`).css("top")) / 17,
      type_of_location = getTypeOfLocation( href, text ); // Определяем тип скрипта



  // Определяем количество строк
  if ( num_lines > 0) {
    num_lines = ((parseInt( num_lines ) - 20) / 17);
  } else {
    num_lines = lines.length;
  }



  // Проверка, существует ли статус бар
  if ( !$(`*`).is(`.status-bar #lines.status-item`) ) {
    // Устанавливаем статус бар
    statusbar.append(`
      <div id="type-of-location" class="status-item"> </div>
      <div id="lines" class="status-item">
        <span id="cursor_position"></span>
        <span id="num_lines"></span>
      </div>
    `);
  }


  // Ищем в строке паттерны
  lines.each(function( index ) {
    var text = $( this ).text(),
        el = focused_tab.find(`.CodeMirror-gutter-text pre:eq(${ index }), .CodeMirror-lines > div > div:last-child pre:eq(${ index })`);

    if ( new RegExp(/\/\/!/).test( text ) ) el.addClass('strong-line');

    if ( new RegExp(/\/\/\stodo|\/\/!\stodo/i).test( text ) ) return el.addClass('todo-line');

    if ( new RegExp(/\/\/\sdone|\/\/!\sdone/i).test( text ) ) return el.addClass('done-line');

    if ( new RegExp(/\/\/\snote|\/\/!\snote/i).test( text ) ) return el.addClass('note-line');

    return;
  });

  // Установка классов на строки
  focused_tab.find(`.CodeMirror-gutter-text pre`).removeClass("active-line");
  focused_tab.find(`.CodeMirror-gutter-text pre:eq(${ active_line })`).addClass("active-line");


  // Установка данных в статус баре
  statusbar.find(`#lines #num_lines`).text( `${ num_lines } - ${ text.lines }` );
  statusbar.find(`#lines #cursor_position`).text( `${ text.line } ${ focused_tab.find(`.CodeMirror-gutter-text pre:eq(${ active_line })`).text().replace(`●`, '') }` );

  // Проверка на актуальность данных
  if ( !type_of_location || typeof type_of_location !== 'object' ) return;
  statusbar.find(`#type-of-location`).html( `<a href='${ type_of_location.href + getUser() }' title='${ type_of_location.title }' target="_blank">${ type_of_location.text }</a>` );

  return;
}
//+--------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Определяем пользователя
 *
 * @return {sting} - Строка с параметрами для url
 */
function getUser() {
  var email = $(`.gb_Cb .gb_Ib`).text() || '',
      first_name = $(`.gb_Cb .gb_Fb.gb_Hb`).text().split(` `)[0] || '',
      last_name = $(`.gb_Cb .gb_Fb.gb_Hb`).text().split(` `)[1] || '';

  return `?source=script.google.com&email=${ email }&first_name=${ first_name }&last_name=${ last_name }`;
}
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Определяем тип скрипта и возвращаем объект с данными о ссылке
 *
 * @param {string} href - Ссылка (url) текущей страницы
 * @param {object} text - Объект с текстом на нужном языке
 *
 * @return {object} - Объект с данными о ссылке
 */
function getTypeOfLocation( href, text ) {
  var types = [
    { // Скрипт, связанный с контейнером (G Suite)
      mask: '^https:\/\/script\.google\.com\/a\/.*?\/macros\/d\/.*$',
      text: text.сontainer_bound_scripts_gsuite,
      title: text.сontainer_bound_scripts_gsuite_title,
      href: text.сontainer_bound_scripts_gsuite_url
    },
    { // Скрипт, связанный с контейнером
      mask: '^https:\/\/script\.google\.com\/macros\/d\/.*$',
      text: text.сontainer_bound_scripts,
      title: text.сontainer_bound_scripts_title,
      href: text.сontainer_bound_scripts_url
    },
    {
      mask: '^https:\/\/script\.google\.com\/a\/.*?\/d\/.*$',
      text: text.standalone_scripts_gsuite,
      title: text.standalone_scripts_gsuite_title,
      href: text.standalone_scripts_gsuite_url
    },
    {
      mask: '^https:\/\/script\.google\.com\/d\/.*$',
      text: text.standalone_scripts,
      title: text.standalone_scripts_title,
      href: text.standalone_scripts_url
    },
  ];

  for (var max = types.length - 1, min = 0; max >= min; min += 1) {
    if( new RegExp( types[min].mask ).test(href, 'min') ) return types[min];
  }

  return {
    mask: '.',
    text: '',
    title: '',
    href: '#'
  };
}
//+------------------------------------------------------------------------------------------------+





//+------------------------------------------------------------------------------------------------+
/*
 * Устанавливаем стили для Веб-приложения
 *
 * @return {boolean} false - Ничего не возвращаем
 */
function setStylesWebApp() {
  $(`head`).append(`
    <style class="custom">
            #theme,
      #menu {
        vertical-align: top;
        padding-left: 7px;
        padding-right: 7px;
        margin-top: 4px;
        margin-left: -5px;
        margin-right: -3px;
        border-radius: 2px;
        cursor: pointer;
      }

      #theme {
        float: right;
      }

      .hide-menu #menu {
        -webkit-box-shadow: none;
        box-shadow: inset none;
        background-color: transparent;
        background-image: transparent;
        background-image: transparent;
        border-color: transparent;
      }

      #theme:hover,
      #menu:hover,
      #menu {
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        background-color: #f6f6f6;
        background-image: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#f1f1f1));
        background-image: linear-gradient(top, #f6f6f6, #f1f1f1);
        border-color: #c6c6c6;
      }

      #menu {
        font-size: 18px;
        line-height: 25px;
      }

      .hide-menu .gwt-SplitLayoutPanel > div:nth-child(2):hover {
        z-index: 15;
        -webkit-box-shadow: 3px 0 5px rgba(0, 0, 0, 0.15);
        box-shadow: 3px 0 5px rgba(0, 0, 0, 0.15);
      }

      .hide-menu .gwt-SplitLayoutPanel > div:nth-child(2) .resource-list {
        display: none;
      }

      .hide-menu .gwt-SplitLayoutPanel > div:nth-child(2):hover .resource-list {
        display: block;
      }

      .hide-menu .gwt-SplitLayoutPanel > div:nth-child(3) {
        display: none;
      }

      .hide-menu .gwt-SplitLayoutPanel > div:nth-child(4) {
        left: 9px !important;
      }

      .goog-toolbar-button,
      .editor .code-area .CodeMirror-gutter-text pre,
      .gwt-TabLayoutPanelTab .gwt-Label,
      .project-items-list > * {
        cursor: pointer !important;
      }

      body[theme=dark] {
        color: #bbbbbb;
        background-color: #2b2b2b;
      }

      body[theme=dark] .docs-title-inner {
        color: #ccc;
      }

      body[theme=dark] #gb#gb a.gb_b {
        color: #eee;
      }

      body[theme=dark] #docs-chrome {
        background: #3d3f41;
      }

      body[theme=dark] #docs-toolbar-wrapper {
        border-top: 1px solid #3d3f41;
        border-bottom: 1px solid #242627;
        background-color: #3d3f41;
        background-image: -webkit-linear-gradient(top, #37383a, #3d3f41);
        -webkit-box-shadow: inset 0 1px 0 0 #2b2b2b;
        box-shadow: inset 0 1px 0 0 #2b2b2b;
      }

      body[theme=dark] .docs-menubar .goog-control-hover {
        color: #000
      }

      body[theme=dark] .goog-toolbar-separator.goog-inline-block {
        border-left: 1px solid #242627;
      }

      body[theme=dark] .goog-toolbar-button-hover,
      body[theme=dark] .goog-toolbar-button-active,
      body[theme=dark] .goog-toolbar-button-checked,
      body[theme=dark] .goog-toolbar-button-selected {
        color: #fff;
      }

      body[theme=dark] .goog-toolbar-button-selected,
      body[theme=dark] .goog-toolbar-button-checked,
      body[theme=dark] .goog-toolbar-menu-button-open {
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        background-color: rgba(255, 255, 255, 0.1);
        background-image: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(rgba(255, 255, 255, 0.15)), to(rgba(255, 255, 255, 0.2)));
        background-image: linear-gradient(top, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.2));
        border-color: rgba(255, 255, 255, 0.2);
      }

      body[theme=dark] .goog-toolbar-button,
      body[theme=dark] .goog-toolbar-menu-button,
      body[theme=dark] .project-items-list img {
        -webkit-filter: invert(100%);
        filter: invert(100%);
      }

      .editor .code-area .CodeMirror {
        line-height: 17px !important;
      }

      body[theme=dark] .editor .code-area .CodeMirror {
        background-color: #2B2B2B;
      }

      body[theme=dark] .editor .code-area .CodeMirror pre {
        color: #999;
      }

      body[theme=dark] .editor .code-area .CodeMirror-cursor {
        border-left: 1px solid #fff!important;
      }

      body[theme=dark] .CodeMirror-focused div.CodeMirror-selected {
        background-color: #214283;
      }

      body[theme=dark] div.CodeMirror-selected {
        background-color: #214283;
      }

      body[theme=dark] .autocomplete {
        background-color: #515658;
      }

      body[theme=dark] .autocomplete .selected {
        background-color: #2B2B2B;
        color: #bbbbbb;
      }

      body[theme=dark] .editor .code-area .CodeMirror-gutter {
        background-color: #2B2B2B;
        border-left: 1px solid;
        border-right: 1px solid;
        border-color: #242627;
      }

      body[theme=dark] .editor .code-area .CodeMirror-gutter-text {
        background-color: #2B2B2B;
        -webkit-box-shadow: -1px 0px 0px 0px #242627, 1px 0px 0px 0px #242627;
        box-shadow: -1px 0px 0px 0px #242627, 1px 0px 0px 0px #242627;
      }


      /* Цвета кода */

      body[theme=dark] .cm-s-default span.cm-keyword {
        color: #cc7832;
      }

      body[theme=dark] .cm-s-default span.cm-atom {
        color: #cc7832;
      }

      body[theme=dark] .cm-s-default span.cm-number {
        color: #6897bb;
      }

      body[theme=dark] .cm-s-default span.cm-def {
        color: #ffc66d;
      }

      .cm-s-default span.cm-variable {
        color: #00f;
      }

      body[theme=dark] .cm-s-default span.cm-variable {
        color: #ffc66d;
      }

      body[theme=dark] .cm-s-default span.cm-variable-2 {
        color: #CDD7E0;
      }

      body[theme=dark] .cm-s-default span.cm-variable-3 {
        color: #ffc66d;
      }

      body[theme=dark] .cm-s-default span.cm-property {
        color: #9876aa;
      }

      body[theme=dark] .cm-s-default span.cm-operator {
        color: #bbbbbb;
      }

      .cm-s-default span.cm-comment {
        color: #888888;
      }

      body[theme=dark] .cm-s-default span.cm-comment {
        color: #888888;
      }

      body[theme=dark] .cm-s-default span.cm-string {
        color: #6a8759;
      }

      body[theme=dark] .cm-s-default span.cm-string-2 {
        color: #f50;
      }

      body[theme=dark] .cm-s-default span.cm-meta {
        color: #555;
      }

      body[theme=dark] .cm-s-default span.cm-error {
        color: #FF2E0B;
      }

      body[theme=dark] .cm-s-default span.cm-qualifier {
        color: #FF861E;
      }

      body[theme=dark] .cm-s-default span.cm-builtin {
        color: #FF861E;
      }

      body[theme=dark] .cm-s-default span.cm-bracket {
        color: #997;
      }

      body[theme=dark] .cm-s-default span.cm-tag {
        color: #ffc66d;
      }

      body[theme=dark] .cm-s-default span.cm-attribute {
        color: #A772D0;
      }

      body[theme=dark] .cm-s-default span.cm-header {
        color: #00ECFF;
      }

      body[theme=dark] .cm-s-default span.cm-quote {
        color: #090;
      }

      body[theme=dark] .cm-s-default span.cm-hr {
        color: #999;
      }

      body[theme=dark] .cm-s-default span.cm-link {
        color: #00c;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTabs {
        background-color: #3c3f41;
        border-color: #242627;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTab {
        background-color: #515658;
        border-color: #242627;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTab-selected {
        background-color: #2b2b2b;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTab:hover .name,
      body[theme=dark] .editor .gwt-TabLayoutPanelTab-selected .tab-header .name {
        color: #bbbbbb;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTab-selected:hover {
        background-color: #2B2B2B;
      }

      body[theme=dark] .editor .gwt-TabLayoutPanelTab:hover {
        background-color: #2B2B2B;
      }

      body[theme=dark] .resource-list {
        background-color: #3c3f41;
        color: #bbbbbb;
      }

      body[theme=dark] .resource-list .project-items-list .item {
        border-bottom: 1px solid #242627;
      }

      body[theme=dark] .resource-list .project-items-list .selected,
      body[theme=dark] .resource-list .project-items-list .selected:hover {
        background-color: #4b6eaf;
        color: #bbbbbb;
      }

      body[theme=dark] .resource-list .project-items-list .focused,
      body[theme=dark] .resource-list .project-items-list .item:hover {
        background-color: #0d293e;
        color: #bbbbbb;
      }

      body[theme=dark] .workspace .gwt-SplitLayoutPanel-HDragger {
        background-color: #3c3f41!important;
        border-left: 1px solid #242627!important;
      }

      body[theme=dark] .workspace .gwt-SplitLayoutPanel-VDragger {
        background-color: #3c3f41 !important;
        border-top: 1px solid #242627!important;
      }

      body[theme=dark] .workspace .gwt-SplitLayoutPanel-HDragger:hover,
      body[theme=dark] .workspace .gwt-SplitLayoutPanel-VDragger:hover {
        background-color: #0d293e!important;
      }

      body[theme=dark] .status-bar {
        background-color: #3c3f41;
        border-top: 1px solid #242627;
      }

      body[theme=dark] .workspace .aux-info {
        background-color: #3c3f41;
      }

      body[theme=dark] .workspace .aux-info .debugger-frame-label {
        background-color: #4b6eaf;
      }

      body[theme=dark] .workspace .aux-info .debugger-frame-label-selected {
        background-color: #0d293e;
        color: #bbbbbb;
      }

      body[theme=dark] .workspace .aux-info .debugger-callstack-wrapper {
        border-left: 1px solid #242627;
        border-top: 1px solid #242627;
      }

      body[theme=dark] .workspace .aux-info .treetable-wrapper {
        border-left: 1px solid #242627;
        border-top: 1px solid #242627;
      }

      body[theme=dark] .workspace .aux-info .treetable-wrapper .treetable-wrapper {
        border-left: none;
        border-top: none;
      }

      body[theme=dark] .workspace .aux-info .treetable-background-2 {
        background-color: #3c3f41;
      }

      body[theme=dark] .workspace .aux-info .treetable-background-1 {
        background-color: #49473f;
      }

      body[theme=dark] .CodeMirror-scroll.cm-s-default::-webkit-scrollbar-thumb {
        background-color: rgba(134, 130, 115, 0.45);
      }

      body[theme=dark] .resource-context-menu {
        color: #3c3f41;
      }

      body[theme=dark] .asc_Folder > .asc_titleContainer {
        color: #8a93ab;
      }

      body[theme=dark] .asc_info_popup {
        color: #bbbbbb;
        background: #2B2B2B;
        border-color: #bbbbbb;
      }

      .CodeMirror-lines > div {
        margin-left: 50px !important;
      }

      /* + пространство для скролла после кода */

      .CodeMirror-lines > div > div:last-child > pre:last-child,
      .CodeMirror-scrollbar-inner {
        margin-bottom: 100px !important;
      }

      /* оформляем статус бар */

      div.status-bar,
      div.status-bar #lines {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      div.status-bar {
        padding-left: 58px;
        padding-right: 44px;
      }

      div.status-bar #cursor_position {
        opacity: .75;
      }

      div.status-bar #num_lines {
        padding-left: 15px;
        opacity: .5;
      }

      div.status-bar #type-of-location a {
        font-size: 10px;
        color: #777;
        letter-spacing: 1px;
      }

      /* Маркеры для строк */

      pre.active-line {
        color: #000000 !important;
      }

      body[theme=dark] pre.active-line {
        color: #ffffff !important;
      }

      pre.active-line:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 18px;
        left: 0;
        margin-top: -1px;
        background: rgba(0, 0, 0, 0.05);
      }

      body[theme=dark] pre.active-line:after {
        background: rgba(255, 255, 255, 0.05);
      }



      /* note line */

      pre.note-line:before {
        color: #999;
      }

      pre.note-line {}

      .CodeMirror-lines > div > div:last-child pre.note-line:before {
        content: '”';
        position: absolute;
        left: -15px;
        margin-top: 5px;
        font-size: 24px;
      }

      .CodeMirror-lines > div > div:last-child pre.note-line {}

      .CodeMirror-lines > div > div:last-child pre.note-line span {}

      .CodeMirror-gutter-text pre.note-line:before {}

      .CodeMirror-gutter-text pre.note-line {}



      /* todo line */

      pre.todo-line:before {
        color: #999;
      }

      pre.todo-line {}

      .CodeMirror-lines > div > div:last-child pre.todo-line:before {
        content: "";
        position: absolute;
        left: -15px;
        width: 10px;
        margin-top: 3px;
        border-radius: 2px;
        height: 10px;
        border: 1px solid;
        font-size: 24px;
        /* cursor: pointer; */
        pointer-events: all;
      }

      .CodeMirror-lines > div > div:last-child pre.todo-line {
        pointer-events: none;
      }

      .CodeMirror-lines > div > div:last-child pre.todo-line span {}

      .CodeMirror-gutter-text pre.todo-line:before {}

      .CodeMirror-gutter-text pre.todo-line {}



      /* done line */

      pre.done-line:before,
      pre.done-line:after {
        color: #999;
      }

      pre.done-line {}

      .CodeMirror-lines > div > div:last-child pre.done-line:after {
        content: "✓";
        position: absolute;
        left: -14px;
        font-size: 24px;
        margin-top: -2px;
      }

      .CodeMirror-lines > div > div:last-child pre.done-line:before {
        content: "";
        position: absolute;
        left: -15px;
        width: 10px;
        height: 10px;
        margin-top: 3px;
        border-radius: 2px;
        border: 1px solid;
        /* cursor: pointer; */
        pointer-events: all;
      }

      .CodeMirror-lines > div > div:last-child pre.done-line {
        pointer-events: none;
      }

      .CodeMirror-lines > div > div:last-child pre.done-line span {
        text-decoration: line-through;
      }

      .CodeMirror-gutter-text pre.done-line:before {}

      .CodeMirror-gutter-text pre.done-line {}



      /* strong line */

      pre.strong-line {
        font-weight: 900;
        /* filter: contrast(2); */
      }

      #documentation_in_russian:hover,
      #generator_pryamykh_ssylok:hover {
        background: #eee;
      }



      /* Высплывающие окна */

      .modal-dialog.docs-dialog .script-logging-dialog-content,
      .maestro-dialog > div > table .revisions-box table {
        line-height: 20px;
      }

      .revisions-box .stack .gwt-StackPanelItem {
        letter-spacing: .3px;
      }



      .hide {
        display: none !important;
      }
    </style>
  `);

  return;
}