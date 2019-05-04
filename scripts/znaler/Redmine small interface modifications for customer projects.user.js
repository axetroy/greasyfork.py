// ==UserScript==
// @name           Redmine small interface modifications for customer projects
// @namespace      RM
// @description    Header color and favicon changing depends on project name you work with; header, sidebar and task theme locking to the top of the browser, so it won’t disappear while scrolling; change left days representation to datetime in a task; сhoosing all history or only messages to show in the task
// @author         znaler
// @include        * 
// @version        2.0
// @name:ru        Небольшие изменения интерфейса redmine для проектов заказчика и не только
// @description:ru Скрипт меняет цвет шапки страницы в зависимости от названия проекта; меняет иконку; оставляет в видимой области панель закладок, тему задачи и боковую панель; меняет отображение времени на точное; добавляет выбор показа всей истории по задаче или только комментариев
// @grant none
// @require        http://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==

var _ = jQuery.noConflict();

var desc = document.getElementsByTagName('meta');
if (desc[0]) {
    l = desc.length;
    while (l--) {
        if ((desc[l].getAttribute('name') == 'description') && (desc[l].getAttribute('content') == 'Redmine')) {
            // Remaining time to process task | Отображение времени для обработки задач в указанных запросах
            // Processing hours for stored custom queries | Часы на обработку задач для сохранённых запросов
            var PROCESS_SETTINGS = '{"savedQuerySettings":[{"savedQueryName":"Поддержка 2018","processTimes":[{"trackerName":"Запрос","time":24},{"trackerName":"Ошибка","time":1}]},{"savedQueryName":"Сопровождение 2018","processTimes":[{"cetegoryName":"Верстка","time":23},{"cetegoryName":"Прочее","time":7}]}, {"savedQueryName":"Задачи со сроками","processTimes":[{"cetegoryName":"Поддержка Заказчика","time":4},{"cetegoryName":"ПА: Настройка системы","time":2},{"cetegoryName":"ПА: Мониторинг","time":4},{"cetegoryName":"ПА: Остановочные пункты","time":24},{"cetegoryName":"ПА: Метрополитен и МЦК","time":4},{"cetegoryName":"ПА: Временные маршруты","time":48},{"cetegoryName":"ПА: ДТ инфраструктура","time":4},{"cetegoryName":"ПА: Управление слоями","time":48},{"cetegoryName":"Адаптационное сопровождение","time":48},{"cetegoryName":"СА: Доступность ВИС","time":48},{"cetegoryName":"СА: Доступность Системы","time":48},{"cetegoryName":"СА: Обновление ПО","time":48},{"cetegoryName":"СА: Производительность","time":48},{"cetegoryName":"СА: Резервное копирование","time":48},{"cetegoryName":"СА: Функц. тестирование","time":48}]}]}';

            // Custormer project names | Названия проектов заказчика
            var CUSTOMER_PROJECT_NAMES = [ // Customer project names | Название проекта заказчика
                'аказчик','ustomer'
            ];
            // New customer header color | Новый цвет шапки страницы
            var CUSTOMER_HEADER_COLOR = '#C61111';
            // Customer icon | Иконка для внешних проектов
            var CUSTOMER_ICON = 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAANT6jAP39/gBib8UA7/H3AKGmzQDk5fAAgYjIABsszwDn6PAAAhKuAE1Z0wDV1+cA6+vwAP3+/AB+i9EAh4vAAMLG3gAiL6YAHCekAEFLsQACE6wAVl69AEFQvABPWbsAHSvLAP3+/QAGHcIABxSZAIiP1wBUXLsAAhSqAISJvwC/xugA4OPwAOHj8ACfpM0A4uPwAE5ZvAAbK8wA/P7+AP3+/gDw8vcA/v7+AOnq9QDEyegA7O7yAGZy0ADq7fUABh3DAAwgsgB7gcYAcHm8AEhUywCnqs0ASVTLAPz8/ADi5O4AoqXLAL3C5AD+/v8AQ1HMAOzu8wDt7vMAeoHHAHuBxwCDickA6uruAPX1+ADa3eoA6OnxADM9ogDq7PEA5efvADpH2QAGHsIA+vr7AElWvwDO0eQA9/j5AGx2xwBOWtUAvMDbAP///gCKj8oA8/P3ADpH2gDZ2+kAAxKrAExVywBhbdEAdH28AAcTmAB1fL8AHizNAP///wACE6kACyC+AA0isABIUrMADyS7APz9/QD9/f0A8PH2AP79/QDj5e8ABRzCAH2EwgADE6oAgo3SAImR1wC5vuMAAxKtAOzu9wD29vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF9TU19fKysrKyspKSkpAAYlI2crXysrKysrKSoiIzkSYGxCK18rKysrK2ZUYFgTYx8VQCtfKysrKysCB3AKFGscRzorXysrKysrZjYBXF0NLi0PDl8rKysrK2ZtIT9DZU0xYTArKysrK2gEZEsXOCtQajJSKSsrKysaEWIbAytfDDRXbiwrKSkpcR1FW04rX19GWQg9aSgoCTVeN0krX19fTx4nJjsLUW8WGRhyPF9fXytEEEgvVkpaPiBVK19fX19fKys4BUEzJEwrX19fX19fX19fKysrKytfX19fX19fX19fX19fX19fX19fX19fAF9fX19fX19fX19fX19fAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAA=';
            // Стандартная иконка redmine
            var REGULAR_ICON = 'data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAC4oHAAAAAAALKMRwD19PMAxKVkAMmlWwDr49MApHwzALmnhQDOvJYAzadYAMqnYQCofjAAqX4wALqTSgDPqlgAvqmCALqUTQC8lUcAuJVQAKyCMwCtgjMA0K5kAM+vZwDQr2cAv66RANCwagDRsGoA07NqAJtzKwDUs2oAnHMrANa0bQDGoVAA6eDLANnMtADJp2IAzqlWAKh+MQDDqnQA0KpZAO/p3QD+/f0ArII0AK2CNADTrlwAu5lUAM+wawDUsGIA07FlAOHazAC5nWkA1LNrAMKdVwDItYwAn3YsALSNQwDFol0AtY1DAMaiXQDNuIwAtI5GAMimYAC3kkkAqH0vAOrm3gDNq2YArIEyAM6tYwDPrWMAxa1+AM+uZgDu7u0AsIY4ALGGOADSs2wAxLOQAJ52LQCfdi0AxKFbAMWhWwDTy7wAto9BAPj39gDUu4QAuJFHAKd9MADOqVgA1r6NAMyqZADNrGEAq4EzAM2tZAC9lk0Azq1kAM+tZADg18UAvppQANKwZAC+m1MA7u7uALCGOQCedSsA2LVqALOLPwDXtm0As4xCAMShXADl39QAx6VfALaRSACqgDEAq4AxALqWTgDOrGIA0q1cANKuXwDOrmgAxq99AK6FNwCvhTcA07BlAMOwiQDJsIAAwJxXAMeyhgCedSwAsotAALGMQwDEoFoAsoxDAMmkVADIpWAAx6ZjAM2oVwDKqGAAyqljAMKqeAC7qooA0axaAL2XSQDRrV0AzMGqAK+ENQCuhTgA0rFpAMKcTwDXs2YAs4k7ANrJpwCyi0EAzLqWAMynVQC7lU0A0a1eAMateQDPrWcA////ANGuYQC+mVAA0a9kAK6ENgDSsGcAwJtWAMGdUwDUx6sA1bNnAJt0KwCcdCsAnXQrAMOfWQDEoVYAxqFWAMaiWQDComIAxqRfAN7PsQDKp18A+vr6ANO9jgC5lEsAqX8xALqUSwDNql8Az6tZANGsXADNrGUA3tXDALyYTgDQr2UAwJpLAK6ENwC+r5IAyq93AL+aVACthj0AwJpUANSzaADEnk4A1bNoAMGeVwCxiT0AxJ9RAJ10LADVybIAyKJRAOrgyQDHo10A0rmDAMilWgDLplQAyKdgAPr5+ADJqGMAqX4vAM2qYADMq2MAqIE4AKmBOAD+/v4ArYM1AK2EOADQsGkA0rBpAMKwjQCthj4AsYg7ANazaQDh3dMAwZ9bAMOgVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAacdqH6oqTfLqKhmHx+pAU5WQA1wDLVDQyZvcA3WQE0HFFsrj9y/SpDdv6EsLBUH2nh3ZZTJfzo4apZo4mVJ2cPiCIoAVQ5dmRG2M8AZAuGCUuRkzJ/ENXyjwpdkSD2AP4wjbAmqUM87a4F7YDISbnGSLhBR5YQLPq85juATvrRjrARTspuIWYgkrgOywca8yAWxlTxMhZxC1XpGsMohYU/X2Lq7naUniTYqQa2DzaRtRUffVCl21Nt9BlgKmNLm06AYHCAb0M4is7e5V4Ylq4dioh5pNB7jeZ6acygPD9FfnjHHZ8WmkzB0jS2Li7haAd51Gksv3pEXXlwWckS9AYABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAA=';

            var LANG_LABELS = '{"const":[{"id":1,"val":[{"l":"en","t":"Updated"},{"l":"ru","t":"Обновлено"}]},{"id":2,"val":[{"l":"en","t":"To control"},{"l":"ru","t":"До контроля"}]},{"id":3,"val":[{"l":"en","t":"History"},{"l":"ru","t":"История"}]},{"id":4,"val":[{"l":"en","t":"Messages"},{"l":"ru","t":"Сообщения"}]}]}';

            var sLng = langDetect(); 

            // Lock top menu | Закрепляем меню на странице
            var topMenu = document.getElementById('top-menu');
            if (topMenu) {
                topMenu.style.marginLeft = '10px';
            }


            var header = document.getElementById('header');
            if (header) {
                header.style.position = 'sticky';
                header.style.zIndex = 10;
                header.style.top = '0px';
                header.style.borderBottom = '4px solid #EEEEEE';
                header.style.marginLeft = '10px';
                header.style.paddingBottom = '0px';
              	header.style.height = '60px';

                // Change header color and icon | Меняем цвет шапки и иконку, если проект заказчика
                var projectName = document.getElementById('header').getElementsByTagName('h1'),
                    i = projectName.length;
                while (i--) {
                    if (existInArray(projectName[i].innerHTML, CUSTOMER_PROJECT_NAMES)) {
                        changeHeaderColor(CUSTOMER_HEADER_COLOR);
                        changeFavicon(CUSTOMER_ICON);
                    } else {
                        changeHeaderColor('#666666'); //default redmine color '#507AAA'
                        changeFavicon(REGULAR_ICON);
                    }
                }
            }

            var main = document.getElementById('main');
            if (main) {
                main.style.marginTop = '4px';    
            }

            var pageUrl = window.location.href;
            if (pageUrl.indexOf('settings') == -1) {
                var clr = document.getElementById('content').children,
                    i = clr.length;
                while (i--) {
                    var clrString = clr[i].outerHTML.replace(/ /g, '');
                    if (clrString.indexOf('<divstyle="clear:both;">') === 0) {
                        clr[i].parentNode.removeChild(clr[i]);
                    }
                }
            }

            var otherFormats = document.getElementById('content').getElementsByClassName('other-formats');
            if (otherFormats[0]) {
                otherFormats[0].style.clear = 'both';
            }

            // Lock sidebar | Закрепляем сайдбар на странице
            var sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.style.position = 'sticky';
                sidebar.style.top = '60px';
                sidebar.style.minHeight = '10px';
            }

            // Lock issue theme | Закрепляем тему задачи
            var pageUrl = window.location.href;
            if (pageUrl.indexOf('issues/') + 1) {

                if (document.getElementById('content')) {
                    var subject = 0;
                    if (document.getElementById('content').getElementsByClassName('subject')[0]) {
                      subject = _('#content .subject:first');
                    } else if (document.getElementById('content').getElementsByTagName('h3')[0]) {
                      	subject = _('#content h3:first');
                    }
                  
                    if (subject) {
                      
                      	var styles = {
                          position : "sticky",
                          top: "68px",
                          backgroundColor: "#FFFFDD",
                          minHeight: "25px",
                          paddingTop: "4px",
                          lineHeight: "19px"
                          
                        };
                        subject.css( styles );
                        subject.find("h3").css( styles );
                    }
                }

              var issue_attributes = 0;
              if (document.getElementById('issue_descr_fields')) {
                  issue_attributes = document.getElementById('issue_descr_fields');
              } else if (document.getElementById('all_attributes')) {
                  issue_attributes = document.getElementById('all_attributes');
              }

              if (issue_attributes) {      
                  var issue_attributes_label = issue_attributes.getElementsByTagName('label'),
                      i = issue_attributes_label.length;

                  while (i--){
                    if (issue_attributes_label[i].getAttribute('for') == 'issue_description') {
                      issue_attributes_label[i].style.marginLeft = 0;
                      issue_attributes_label[i].style.paddingRight = '5px'; 
                      issue_attributes_label[i].parentElement.style.paddingLeft = 0;
                    }     
                  }
              }
              
              
              // Add class to history elements | Добавить класс элементам истории
              var cls = "comment";
              
              _("#history .journal").children("ul").addClass(cls);
              _("#history .journal").find(".details").addClass(cls);
              
              var notes = _("#history .has-notes");
                           
              if (notes.length) {
                _("#history .journal").not(".has-notes").addClass(cls);
              }
              else {
                var journal = _("#history .journal").find(".wiki").parent();
                _("#history .journal").not(journal).addClass(cls);
              }
              
              //Change history label to link | Заменяем заголовок история на ссылку
              var story = _("#history").children("h3");
              
              story = story.text("");
              story = _("<a>").attr("href", "##").attr("id", "comment-header").prependTo(story);
              
                
              //Link text depends on local storage value | Меняем текст ссылки в зависимости от значения в локальном хранилище
              if (localStorage.history == getLbl(sLng, 3)) {
                  story.text(getLbl(sLng, 3));
              }
              //If local storage unavailable or empty Comments is default value | Значение по умолчачнию Комментарии, если локальное хранилище пустое или недоступно
              else {
                  _("." + cls).hide();
                  story.text(getLbl(sLng, 4));
              }
                
              //Hide or show history by clicking on link | Показываем или скрываем историю по нажатию на ссылку
              story.click(function() {
                  
                if (story.text() == getLbl(sLng, 3)) {
                  
                  _("." + cls).hide();
                  story.text(getLbl(sLng, 4));
                  localStorage.history = getLbl(sLng, 4);
                  
                }
                else {
                  
                  _("." + cls).show();
                  story.text(getLbl(sLng, 3));
                  localStorage.history = getLbl(sLng, 3);
                  
                }
              });
            }


            // Change date count on real date | Меняем отображение времени изменения на дату вместо отсчёта дней
            var actionDate = document.getElementsByTagName('a'),
                i = actionDate.length;
            while (i--) {
                  if ((actionDate[i].href.indexOf('activity') + 1)&&(actionDate[i].getAttribute('title'))) {
                    var dt = actionDate[i].getAttribute('title');
                    var cuntDt = actionDate[i].innerHTML;
                    actionDate[i].setAttribute('title', cuntDt);
                    if (dt.length > 20) {
                      actionDate[i].innerHTML = dt.slice(0,-9);
                    }
                    else {
                      actionDate[i].innerHTML = dt;
                    }
                    actionDate[i].nextSibling.data = actionDate[i].nextSibling.data.replace(' назад', '');
                    actionDate[i].nextSibling.data = actionDate[i].nextSibling.data.replace(' ago', '');
                }
            }

            addProcessTimes();

            // Check substring in array | Проверка вхождения подстроки в массив строк
            function existInArray(value, array) {
                for (var i = 0; i < array.length; i++) {
                    if (value.indexOf(array[i]) + 1) return true;
                }
                return false;
            }

            // Change header color | Замена цвета шапки
            function changeHeaderColor(newColor) {
                var hdr = document.getElementById('header');
                hdr.style.backgroundColor = newColor;
                // Change tabs color | замена цвета не выделенных элементов верхнего меню
                var mm = document.getElementById('main-menu').getElementsByTagName('a'),
                    i = mm.length;
                while (i--) {
                    if (!mm[i].classList.contains('selected')) {
                        mm[i].style.backgroundColor = newColor;
                    }
                }
            }

            // Cahnge | Замена favicon
            function changeFavicon(faviconPath) {
                var head = document.getElementsByTagName('head')[0];
                // Del old favicon | Найти и удалить старую иконку из тега HEAD
                var links = head.getElementsByTagName('link'),
                    i = links.length;
                while (i--) {
                    if (links[i].rel == 'shortcut icon') {
                        head.removeChild(links[i]);
                    }
                }

                // Add new favicon | Добавить новую иконку
                var link = document.createElement('link');
                link.setAttribute('href', faviconPath);
                link.setAttribute('type', 'image/x-icon');
                link.setAttribute('rel', 'shortcut icon');
                head.appendChild(link);
            }

            // Change column Update values to ProcessTimes | Отображение часов, оставшихся для обработки вместо колонки Обновлено
            function addProcessTimes() {
              var choosenTab = document.getElementById('main-menu').getElementsByClassName('issues selected');
              var savedQuery = document.getElementById('content').getElementsByTagName('h2');

              var settings = JSON.parse(PROCESS_SETTINGS);
              if (['Задачи', 'Issues'].indexOf(choosenTab[0].text) + 1) {

                l = settings.savedQuerySettings.length;
                while (l--) {

                  if (savedQuery[0].innerHTML == settings.savedQuerySettings[l].savedQueryName) {

                    // Add function addProcessTimes() to ajax | Добавляем вызов функции замены в ajax запрос перехода по страницам
                    pg = document.querySelectorAll('.pagination > a'), 
                    i = pg.length;
                    while (i--) {
                        pg[i].setAttribute('onclick', pg[i].getAttributeNode('onclick').value.replace('return false;', 'addProcessTimes();return false;'));
                    } 

                    taskTable = document.getElementsByClassName('list issues'), 
                    i = taskTable.length;
                    while (i--) {

                      var now = new Date();
                      var thd = taskTable[i].querySelectorAll('thead > tr > th > a'), j = thd.length;
                      while (j--) {

                        if ((getLbl(sLng, 1).indexOf(thd[j].text)+ 1) && 
                            (thd[j].text.trim() !== '')) {

                          thd[j].text = getLbl(sLng, 2);
                        }
                      }


                      var tRow = taskTable[i].querySelectorAll('tbody > tr'), j = tRow.length;
                      while (j--) {

                        var trac = tRow[j].querySelector('td.tracker');
                        var cat = tRow[j].querySelector('td.category');
                        var upd = tRow[j].querySelector('td.updated_on');
                        lt = settings.savedQuerySettings[l].processTimes.length;
                        while (lt--) {

                          var tr = 0, ct = 0;

                          if (trac){
                            tr = settings.savedQuerySettings[l].processTimes[lt].trackerName == trac.innerHTML;
                          }
                          if (cat){
                            ct = settings.savedQuerySettings[l].processTimes[lt].cetegoryName == cat.innerHTML;
                          }

                          if (tr || ct){

                            var msUTC = 0;
                            var offset = 0;
                            if (sLng == 'ru') {
                                msUTC = Date.parse(convertDate(upd.innerHTML));
                                offset = getOffset(upd.innerHTML);
                            } else {
                                msUTC = Date.parse(upd.innerHTML);
                            }

                            var tm = settings.savedQuerySettings[l].processTimes[lt].time * 3600000;

                            restTime = tm - (now - msUTC) - offset;
                            if (restTime < 0) {

                              upd.innerHTML = 'AAAA!!1!';
                              upd.style.fontWeight = 'bold';
                              upd.style.color = '#000';
                            } else if (restTime < 3600000) {

                              upd.style.fontWeight = 'bold';
                              upd.style.color = '#900';
                              upd.innerHTML = getDateDif(restTime);
                            } else {

                              upd.innerHTML = getDateDif(restTime);
                            }            
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            // Convert milliseconds to day hour min format | Перевод милисекунд в формат дней часов минут
            function getDateDif(milsec) {
                var seconds = (milsec / 1000) | 0;
                milsec -= seconds * 1000;

                var minutes = (seconds / 60) | 0;
                seconds -= minutes * 60;

                var hours = (minutes / 60) | 0;
                minutes -= hours * 60;

                var days = (hours / 24) | 0;
                hours -= days * 24;

                dhm = (sLng == 'ru') ? (days + 'д. ' + hours + 'ч. ' + minutes + 'мин'): (days + 'd. ' + hours + 'h. ' + minutes + 'min'); 

                return dhm;
            }

            // Detect lang | Определение языка системы
            function langDetect() {
                var lng = 'NaN';
                var logOut = document.getElementById('account').querySelector('ul > li > a.logout');
                if (logOut.text == 'Выйти') {
                    lng = 'ru';
                }
                else {
                    lng = 'en';
                }
                return lng;
            }

            // Parse ru date format | Конвертирование даты из формата ru в en
            function convertDate(dateString) {
                var dt = dateString.split(" ");
                var m = '';
                switch(dt[2]) {
                    case 'янв.': m = '01';break;
                    case 'февр.': m = '02';break;
                    case "марта": m = '03';break;
                    case 'апр.': m = '04';break;
                    case 'мая': m = '05';break;
                    case 'июня': m = '06';break;
                    case 'июля': m = '07';break;
                    case 'авг.': m = '08';break;
                    case 'сент.': m = '09';break;
                    case 'окт.': m = '10';break;
                    case 'нояб.': m = '11';break;
                    case 'дек.': m = '12';break;
                            }	  	

                var t = m +'/'+ dt[1] +'/'+ dt[3].replace(',','') + ' ' + dt[4];
                return t; 
            }

            function getOffset(dateString) {
                var dt = dateString.split(" ");
                ofst = 0;
                systemOffset = (dt[5][1] + dt[5][2])*60 + (dt[5][3] + dt[5][4])*1;
                clientOffset = new Date().getTimezoneOffset();
                if (systemOffset != -clientOffset) {

                  ofst = (clientOffset + systemOffset) * 60000;
                }
                return ofst;
            }

            // Get const label | Получение текста константы
            function getLbl(sLng, id){
              if (LANG_LABELS){

                var labels = JSON.parse(LANG_LABELS), i = labels.const.length;
                while (i--){
                  if (labels.const[i].id == id){
                    var j = labels.const[i].val.length;
                    while (j--){
                      if (labels.const[i].val[j].l == sLng){
                        return labels.const[i].val[j].t;
                      }
                    }         
                  }
                }
                }
            }
        }
    }
}