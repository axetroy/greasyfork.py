// ==UserScript==
// @name        Gmail Filters Filter
// @description A filter of Gmail Filters
// @namespace   https://github.com/FlandreDaisuki
// @include     https://mail.google.com/mail/u/0/*
// @version     2016.07.26
// @author      FlandreDaisuki
// @grant       none
// @noframes
// ==/UserScript==
/* jshint esnext: true */

const ff = document.createElement('input');
ff.id = 'GFF';

const fflabel = document.createElement('label');
fflabel.innerHTML = 'Filters filter: ';
fflabel.htmlFor = 'GFF';

function main(ftable) {
    if (!ftable.offsetParent || ff.offsetParent) {
        return;
    }
    const trs = Array.from(ftable.querySelectorAll('tr.r7')).filter(x => x.childElementCount === 3);
    ff.onkeyup = function() {
        const valstr = this.value;
        trs.forEach(x => {
            x.style.display = '';
            if (valstr && x.children[1].innerText.indexOf(valstr) < 0) {
                x.style.display = 'none';
            }
        });
    };

    const fParent = ftable.parentNode.parentNode.parentNode.children[4].firstElementChild;
    fParent.insertBefore(ff, fParent.firstElementChild);
    fParent.insertBefore(fflabel, ff);
}

const observer = new MutationObserver(function(mutations) {
    const ftableMR = mutations
        .filter(x => x.addedNodes.length)
        .filter(x => x.addedNodes[0].tagName === 'TABLE')[0];

    if (ftableMR) {
        main(ftableMR.addedNodes[0]);
    }
});

document.addEventListener('readystatechange', function() {
    const config = {
        childList: true,
        characterData: true,
        subtree: true
    };
    observer.observe(document.body, config);
});
