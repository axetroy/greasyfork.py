// ==UserScript==
// @name         Edenya-Script-fonctions
// @description  Addon Edenya
// @author       Valkazaar
// @version 0.0.1.20180721143755
// @namespace https://greasyfork.org/users/7223
// ==/UserScript==

function checkMessages(){
    $.ajax({
        type: 'GET',
        url: 'https://www.edenya.net/index2.php?loca=communiquer/forum/messages',
        //data: datas,
        success: function(data) {
            var i = (data.split("#AA2020")).length - 1;
            if(i>0){
                $('#ValkHidden').html('<a href="https://www.edenya.net/index2.php?loca=communiquer/forum/messages">'+i + (i > 1 ? ' messages non lus':' message non lu')+'</a>');
            }
        }});
    }
function Valk_Del(item){
    var z = localStorage.getItem('EdenyaShortcut');
    z = JSON.parse(z);
    delete z[item];
    localStorage.setItem('EdenyaShortcut',JSON.stringify(z));
    Valk_Refresh();
}
function Valk_Refresh(){
    var first = true;
    var z = localStorage.getItem('EdenyaShortcut');
    z = JSON.parse(z);
    var menuToAdd = document.getElementById('menuValk');
    menuToAdd.innerText='';
    for (var item in z) {
        var linkToUp = document.createElement('img');
        linkToUp.setAttribute('src', '../images/arrow-up.gif');
        linkToUp.setAttribute('onclick', 'Valk_Up(\"' + item + '\");');
        var linkToDown = document.createElement('img');
        linkToDown.setAttribute('src', '../images/arrow-down.gif');
        linkToDown.setAttribute('onclick', 'Valk_Down(\"' + item + '\");');
        var linkToModify = document.createElement('img');
        linkToModify.setAttribute('src', '../images/edit.png');
        linkToModify.setAttribute('onclick', 'Valk_Rename(\"' + item + '\");');
        var linkToDelete = document.createElement('img');
        linkToDelete.setAttribute('src', '../images/bad.gif');
        linkToDelete.setAttribute('onclick', 'Valk_Del(\"' + item + '\");');
        var ligneShortcut = document.createElement('li');
        var linkShortcut = document.createElement('a');
        linkShortcut.setAttribute('href', z[item]);
        linkShortcut.innerText = item;
        first == false ? ligneShortcut.appendChild(linkToUp): first = false;
        ligneShortcut.appendChild(linkToDown);
        ligneShortcut.appendChild(linkToModify);
        ligneShortcut.appendChild(linkToDelete);
        ligneShortcut.appendChild(linkShortcut);
        menuToAdd.appendChild(ligneShortcut);
    }
    //test();

}

function Valk_Add(){
    var nom=prompt('Nom du shortcut ?');
    if (nom!==null){
        var z = localStorage.getItem('EdenyaShortcut');
        z = JSON.parse(z);
        z[nom]=document.URL;
        localStorage.setItem('EdenyaShortcut',JSON.stringify(z));
        Valk_Refresh();
    }
}

function Valk_Up(itemIn){
    var previous = null;var y={};
    var z = localStorage.getItem('EdenyaShortcut');
    z = JSON.parse(z);
    for (let item in z) {
        if (previous != null){
            if (item == itemIn){
                y[item]=z[item];
            }
            for (bidule in previous){
                if (bidule != itemIn){
                    y[bidule]=previous[bidule];
                }
            }
        };
        previous={};
        previous[item]=z[item]
        ;
    }
    for (var bidule in previous) {
        if (bidule != itemIn){
            y[bidule]=previous[bidule];
        }
    }
    localStorage.setItem('EdenyaShortcut',JSON.stringify(y));Valk_Refresh();
}

function Valk_Down(itemIn) {
    var next = null;
    var y = {};
    var z = localStorage.getItem('EdenyaShortcut');
    z = JSON.parse(z);
    for (var item in z) {
        if (item != itemIn) {
            y[item] = z[item];
            if (next != null) {
                for (var bidule in next) {
                    y[bidule] = next[bidule];
                }
                next = null;
            }
        }else {
            next = {};
            next[item] = z[item];
        }
    }
    localStorage.setItem('EdenyaShortcut', JSON.stringify(y));
    Valk_Refresh();
}
function Valk_Rename(itemIn){
    var nom=prompt('A renommer en ?');
    if (nom!==null){
        var y = {};
        var z = localStorage.getItem('EdenyaShortcut');
        z = JSON.parse(z);
        for (var item in z) {
            if(item == itemIn){
                y[nom]=z[item];
            }else{
                y[item]=z[item];
            }
        };
        localStorage.setItem('EdenyaShortcut',JSON.stringify(y));
        Valk_Refresh();
    }
}