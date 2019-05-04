// ==UserScript==
// @name      Nekto.me - Быстрый переход к новому диалогу
// @namespace    http://nekto.me
// @version      0.2
// @description   Nekto.me: добавляет кнопки для быстрого перехода к новому диалогу
// @author       Krita
// @match        http://nekto.me/chat
// @match        https://nekto.me/chat
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @require  https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/js/bootstrap.min.js

// ==/UserScript==

GM_addStyle ( `
.checkbox, .checkbox input[type="checkbox"]{
margin: 0
}
.checkbox label{
padding: 0;
margin-left: 20px
}
`);

checkContainer();

function checkContainer() {
    if ($('.talk_over').length > 0) {
        nektoScript();
    } else {
        setTimeout(checkContainer, 50);
    }
}

function nektoScript() {

    $(".main_chat_but").append(`
<div class="btn-group">
<button type="button" data-toggle="dropdown" class="btn btn-md btn-my1">Начать новый <span class="caret"></span></button>
<ul class="dropdown-menu dropdown-menu-right">
<li><a id="newDialog" href="#">Новый диалог</a></li>
<li><a id="newDialogPhrase" href="#">С той же фразы</a></li>
<li><a id="newDialogSettings" href="#">Открыть настройки</a></li>
<li class="divider"></li>
<li>
<div class="checkbox" style="display: inline-flex; margin: 0px 6px; align-items: center">
<input id="autoDialog" type="checkbox" >
<label class="checkbox">
Автоматически выполнять действие
</label>
</div>
</li>
</ul>
</div>
`);
    var lastaction = $('#newDialog');
    var lastphrase = "";
    $(document).on('click', '.btn-group', function (e) {
        e.stopPropagation();
    });

    // Выполнение автоматическго действия

    var observer_auto = new MutationObserver(function (e) {
        //console.log("observer_auto");
        if ($("#autoDialog").prop('checked')
                && $(".talk_over_text:visible").text().indexOf('Собеседник') != -1) {
            this.disconnect();
            lastaction.click();
        }
    });

    // Каждый раз привязываемся к новому элементу .talk_over, который пересоздаётся каждый диалог
    var observer_add = new MutationObserver(function (mutations) {

        //  console.log("observer_add");
        mutations.forEach(function (mutation) {
            var overButtons = $(mutation.addedNodes).find('.talk_over');
            if (overButtons.length) {

                observer_auto.disconnect();
                observer_auto.observe(overButtons[0], {
                    attributes: true
                });
            }
        });

    });

    observer_add.observe($(".chat-box")[0], {
        childList: true,
        subtree: true
    });


    // Общий метод для всех кнопок 
    function stopDialog(action) {

        //Событие появления изменения содержимого окна ввода сообщения
        var observer_message = new MutationObserver(function (e) {

            if ($('.emojionearea:not(.emojionearea-disable)').length) {
                this.disconnect();
                $('.emojionearea-editor').text(lastphrase);
                $('.sendMessageBtn').click();
            }
        });


        //Появление кнопок окончания диалога
        var func_over = function (e) {
            if (($('.talk_over:visible').length)) {

                if (this instanceof MutationObserver)
                    this.disconnect();

                $('.talk_over').attr("visibility", "hidden");

                if (action === 'settings')
                    $('.talk_over_button_block > button')[1].click();
                else
                    $('.talk_over_button_block > button')[0].click();

                observer_message.observe($(".chat-box")[0], {
                    childList: true,
                    subtree: true
                });
            }
        };

        var observer_over = new MutationObserver(func_over);

        if (($('.talk_over:visible').length)) {
            func_over();
            return;
        }

        //Подавление предупреждения закрытия диалога
        var observer_modal = new MutationObserver(function (e) {



            if ($('.swal2-container').length) {
                this.disconnect();
                $('.swal2-container').attr("visibility", "hidden");
                $('.swal2-actions > button')[1].click();

                observer_over.observe($(".talk_over")[0], {
                    attributes: true
                });
            }
        });
        observer_modal.observe(document.body, {
            attributes: true,
        });
        // Нажатие на кнопку "Отключиться"
        $('.main_chat_but > button')[0].click();
    }

    $('#newDialog').click(
            function (e) {
                e.preventDefault();
                lastaction = this;
                lastphrase = "";
                stopDialog();
            });
    $('#newDialogPhrase').click(
            function (e) {
                e.preventDefault();
                lastaction = this;
                lastphrase = $('.self .window_chat_dialog_text').first().text();
                stopDialog();
            });
    $('#newDialogSettings').click(
            function (e) {
                e.preventDefault();
                stopDialog("settings");
                $("#autoDialog").prop('checked', false);
            });
}

