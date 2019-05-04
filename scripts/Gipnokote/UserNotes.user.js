// ==UserScript==
// @name          UserNotes
// @author        Gipnokote
// @version       1.9
// @namespace     https://leprosorium.ru/*
// @include       https://*leprosorium.ru/*
// @description   Скрипт для Лепры, позволяющий видеть, добавлять и изменять заметки прямо в посте и на глагне
// run-at         document-end
// ==/UserScript==



unsafeWindow.getNote = function(user_id, user_login){
    var userLinks = $$('div.ddi a.c_user[data-user_id='+user_id+']');
    var userNotes = $$('div.ddi span.usernote_'+user_id);
    userNotes.destroy();
    var noteRequest = new futuAjaxNew({
            type : 'GET',
            button : document.createElement('div'),
            url : router.generate('user_note'),
            data : 'user_login=' + encodeURIComponent(user_login) + '&author_login=' + encodeURIComponent(globals.user.login),
            onLoadFunction : function (response) {
                if (response.user_notes && response.user_notes[0]) {
                    userLinks.map(function injectNotes(userLink) {
                        var userNote = new Element('span', {class: 'usernote_'+user_id, html: ', [<span style="color:green;cursor:pointer;" onClick="setUserNote('+response.user_notes[0].id+', \''+user_id+'\', \''+user_login+'\', \''+response.user_notes[0].body.replace(/"/g,'&quot;')+'\'); return false;">'+response.user_notes[0].body+'</span>]'});
                        userNote.inject(userLink, 'after');
                    });
                } else {
                    userLinks.map(function injectNotes(userLink) {
                        var userNote = new Element('span', {class: 'usernote_'+user_id, html: ', [<span style="color:green;cursor:pointer;" onClick="setUserNote(null, \''+user_id+'\', \''+user_login+'\', \'\');">+</span>]'});
                        userNote.inject(userLink, 'after');
                    });
                }
            }
        });
};

unsafeWindow.setNote = function (id, user_id, user_login, note) {
    var type;
    var url;
    
    if (id) {
        type = 'PUT';
        url = router.generate('user_note_set', {
            note_id : id
        });
    } else {
        type = 'POST';
        url = router.generate('user_note');
    }

    var noteRequest = new futuAjaxNew ({
        button: document.createElement("div"),
        type: type,
        url: url,
        headerContentType: 'application/json',
        data: JSON.stringify({user_login: user_login, body: note}),
        onLoadFunction : function (response) {
            getNote(user_id, user_login);
        }
    });
};

unsafeWindow.setUserNote = function (id, user_id, user_login, currentNote){
    var z = prompt('Введите заметку:',currentNote);
    if (z!==null) {
        setNote(id, user_id, user_login, z);
    }
};

function eliminateDuplicates(arr) {
	var hashTable = {};

	return arr.filter(function (el) {
		var key = JSON.stringify(el);
		var match = Boolean(hashTable[key]);

		return (match ? false : hashTable[key] = true);
	});
}

var uids = eliminateDuplicates($$('div.ddi a.c_user').getProperties('data-user_id', 'data-user_login'));
uids.map(function process(uid){
    getNote(uid['data-user_id'], uid['data-user_login']);
});
