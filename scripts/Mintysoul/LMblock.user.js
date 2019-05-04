// ==UserScript==
// @name LMblock
// @description nesvarbu
// @version 0.0.1.20150324214159
// @namespace https://greasyfork.org/users/9938
// ==/UserScript==
var LMRetards = (function () {
    function LMRetards() {
        this.storageKey = 'lmretards';
    }
    LMRetards.prototype.LoadRetards = function () {
        this.Retards = new Array();
        var storedRetards = localStorage.getItem(this.storageKey);
        if (storedRetards) {
            try {
                var deserializedRetards = JSON.parse(storedRetards);
                if (!Array.isArray(deserializedRetards))
                    throw 'lel';
                this.Retards = deserializedRetards;
            }
            catch (ex) {
                //oh well, corrupted, c'est la vie, overwrite
                this.SaveRetards();
            }
        }
    };
    LMRetards.prototype.SaveRetards = function () {
        localStorage.setItem(this.storageKey, JSON.stringify(this.Retards));
    };
    LMRetards.prototype.AddRetard = function (name) {
        if (!this.IsRetarded(name)) {
            this.Retards.push(name);
            this.SaveRetards();
        }
    };
    LMRetards.prototype.RemoveRetard = function (name) {
        if (this.IsRetarded(name)) {
            var index = this.Retards.indexOf(name);
            this.Retards.splice(index, 1);
            this.SaveRetards();
        }
    };
    LMRetards.prototype.IsRetarded = function (name) {
        return this.Retards.indexOf(name) !== -1;
    };
    LMRetards.prototype.RenderRetardButtons = function () {
        var posts = document.querySelectorAll('div[id^="post_"]');
        for (var i = 0; i < posts.length; i++) {
            var postUserEl = posts[i].querySelector('a[href^="userdetails.php"');
            if (postUserEl && postUserEl.innerText !== this.ownName) {
                var retardBtn = document.createElement('a');
                retardBtn.href = '#';
                retardBtn.innerHTML = '[Ignoruoti]';
                retardBtn.setAttribute('data-retard', postUserEl.innerText);
                retardBtn.addEventListener('click', function (evt) {
                    if (confirm('Ar tikrai ' + evt.target.getAttribute('data-retard') + ' yra retardas?')) {
                        retards.AddRetard(evt.target.getAttribute('data-retard'));
                        retards.ObliterateRetards();
                    }
                    evt.preventDefault();
                });
                postUserEl.parentNode.parentNode.insertBefore(retardBtn, postUserEl.parentNode.nextSibling);
            }
        }
    };
    LMRetards.prototype.RemoveForumPosts = function () {
        var posts = document.querySelectorAll('div[id^="post_"]');
        for (var i = 0; i < posts.length; i++) {
            var postUserEl = posts[i].querySelector('a[href^="userdetails.php"');
            if (postUserEl && this.IsRetarded(postUserEl.innerText)) {
                posts[i].remove();
            }
        }
    };
    LMRetards.prototype.RemoveForumQuotes = function () {
        var quotes = document.querySelectorAll('td.forumpost p.sub');
        for (var i = 0; i < quotes.length; i++) {
            if (quotes[i] && quotes[i].nextSibling && quotes[i].childNodes.length === 1) {
                var whoWrote = quotes[i].childNodes[0].innerText.split(' ');
                if (whoWrote.length > 1 && this.IsRetarded(whoWrote[0])) {
                    var contentEl = quotes[i].nextSibling.querySelector('tbody > tr > td');
                    if (contentEl) {
                        contentEl.innerText = 'ima retard lel';
                    }
                }
            }
        }
    };
    LMRetards.prototype.RenderRetardCtrl = function () {
        var _this = this;
        var settingsForm = document.querySelector('form[action="takeprofedit.php"]');
        if (settingsForm) {
            var lastRows = settingsForm.querySelectorAll('table > tbody > tr');
            if (lastRows && lastRows.length > 0) {
                var lastRow = lastRows[lastRows.length - 1];
                var tr = document.createElement('tr');
                var tdText = document.createElement('td');
                tdText.setAttribute('class', 'rowhead');
                tdText.setAttribute('valign', 'top');
                tdText.setAttribute('alignt', 'right');
                tdText.innerText = 'Retardai';
                tr.appendChild(tdText);
                var valEl, removeBtn;
                if (this.Retards.length !== 0) {
                    valEl = document.createElement('select');
                    valEl.setAttribute('size', this.Retards.length.toString());
                    valEl.setAttribute('id', 'retardList');
                    this.Retards.forEach(function (retard) {
                        var opt = document.createElement('option');
                        opt.innerText = retard;
                        opt.setAttribute('data-retard', retard);
                        valEl.appendChild(opt);
                    });
                    removeBtn = document.createElement('button');
                    removeBtn.innerText = 'Pašalinti';
                    if (this.Retards.length > 1) {
                        removeBtn.addEventListener('click', function (evt) {
                            var retardList = document.getElementById('retardList');
                            if (retardList.value) {
                                _this.RemoveRetard(retardList.value);
                                retardList.querySelector('option[data-retard="' + retardList.value + '"]').remove();
                            }
                        });
                    }
                    else {
                        removeBtn.addEventListener('click', function () {
                            _this.RemoveRetard(_this.Retards[0]);
                        });
                    }
                }
                else {
                    valEl = document.createElement('span');
                    valEl.innerText = 'no retards yet ;)';
                }
                var tdVal = document.createElement('td');
                tdVal.setAttribute('valign', 'top');
                tdVal.setAttribute('align', 'left');
                tdVal.appendChild(valEl);
                if (removeBtn) {
                    tdVal.appendChild(document.createElement('br'));
                    tdVal.appendChild(document.createElement('br'));
                    tdVal.appendChild(removeBtn);
                }
                tr.appendChild(tdVal);
                lastRow.parentNode.insertBefore(tr, tr.nextSibling);
            }
        }
    };
    LMRetards.prototype.ObliterateRetards = function () {
        this.RemoveForumPosts();
        this.RemoveForumQuotes();
    };
    LMRetards.prototype.Init = function () {
        this.ownName = document.querySelector('#username > a[href^="userdetails.php"]').innerText;
        this.LoadRetards();
        this.ObliterateRetards();
        this.RenderRetardButtons();
        this.RenderRetardCtrl();
    };
    return LMRetards;
})();
var retards = new LMRetards();
retards.Init();