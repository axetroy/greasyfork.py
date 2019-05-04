// ==UserScript==
// @id             vagrant-box-download-helper@senhtry
// @name           Vagrant Box Download Helper
// @version        1.0
// @author         senhtry
// @description    Add a download button in app.vagrantup.com
// @include       https://app.vagrantup.com/*
// @run-at         document-end
// @namespace https://greasyfork.org/users/81130
// ==/UserScript==

main();

function main() {

    var elementList = document.querySelectorAll(".media-list .list-group-item");

    for (var i = 0; i < elementList.length; i++) {
        addDownloadButton(elementList[i]);
    }
}

function addDownloadButton(element) {
    var versionHref = element.href;

    var div = document.createElement('div');
    div.className ='btn-group btn-group-xs"';
    div.style.cssText= 'margin-top: 10px;';

    var btn = document.createElement('button');
    btn.className = 'btn btn-default dropdown-toggle';
    btn.setAttribute("type","button");

    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("data-toggle", "dropdown");

    btn.innerHTML = 'download<span class="caret"></span>';


    var ul = document.createElement('ul');
    ul.className = 'dropdown-menu';


    var proList = element.querySelectorAll(".col-md-3 span.label-inline");
    var version =  element.querySelector(".col-md-5 small").innerHTML.trim().replace(/\s+/g, '').replace(/<.*$/g, '');

    for (var i = 0; i < proList.length; i++) {
        var pro = proList[i].innerHTML.trim().replace(/\s+/g, '').replace(/<.*$/g, '');
        var url =  versionHref +"/versions/" + version + '/providers/' + pro + '.box';

        var li = document.createElement('li');
        var a = document.createElement('a');

        a.setAttribute('href', url);
        a.innerHTML = pro;
        li.appendChild(a);
        ul.appendChild(li);
    }

    div.appendChild(btn);
    div.appendChild(ul);

    element.appendChild(div);
}