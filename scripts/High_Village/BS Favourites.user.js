// ==UserScript==
// @name         BS Favourites
// @namespace    https://bs.to
// @version      1.2
// @description  Easy Favourites
// @author       Asu_nyan
// @match        https://bs.to/serie/*
// @grant        none
// @icon         https://bs.to/favicon.ico
// @require      https://greasyfork.org/scripts/375096-bs-library/code/BS_Library.js?version=650400
// ==/UserScript==
// jshint esversion: 6

const BS = window.BS;
const AjaxReload = true; // Lädt die Serienliste in der Navigation neu, wenn eine Aktion ausgeführt wird.
const css = `
.bootstrap-btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 20rem !important;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media screen and (prefers-reduced-motion: reduce) {
  .bootstrap-btn {
    transition: none;
  }
}

.bootstrap-btn:hover, .bootstrap-btn:focus {
  text-decoration: none;
}

.bootstrap-btn:focus, .bootstrap-btn.focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.bootstrap-btn.disabled, .bootstrap-btn:disabled {
  opacity: 0.65;
}

.bootstrap-btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

a.bootstrap-btn.disabled,
fieldset:disabled a.btn {
  pointer-events: none;
}

.btn-info {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
}

.btn-info:focus, .btn-info.focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-info.disabled, .btn-info:disabled {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:not(:disabled):not(.disabled):active, .btn-info:not(:disabled):not(.disabled).active,
.show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #117a8b;
  border-color: #10707f;
}

.btn-info:not(:disabled):not(.disabled):active:focus, .btn-info:not(:disabled):not(.disabled).active:focus,
.show > .btn-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-outline-info {
  color: #17a2b8;
  background-color: transparent;
  background-image: none;
  border-color: #17a2b8;
}

.btn-outline-info:hover {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-outline-info:focus, .btn-outline-info.focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-outline-info.disabled, .btn-outline-info:disabled {
  color: #17a2b8;
  background-color: transparent;
}

.btn-outline-info:not(:disabled):not(.disabled):active, .btn-outline-info:not(:disabled):not(.disabled).active,
.show > .btn-outline-info.dropdown-toggle {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-outline-info:not(:disabled):not(.disabled):active:focus, .btn-outline-info:not(:disabled):not(.disabled).active:focus,
.show > .btn-outline-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
}

.btn-sm, .bootstrap-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
`;

let favshows = [];

const addFav = 'Zu Favoriten hinzufügen';
const remFav = 'Aus Favoriten entfernen';

(function() {
    'use strict';
    check((list) => {
        list = BS.Helper.RemoveDuplicates(list);
        favshows = list;
    });
    setTimeout(setup, 1000);
})();


function setup() {
    BS.Helper.InjectCSS(null, css);
    let a = document.querySelector('#sp_left h2');
    let span = document.createElement('span');
    let btnFav = document.createElement('button');
    let btnClass = (favshows.includes(BS.Series.ID())) ? 'btn-info' : 'btn-outline-info';
    span.id = 'bs-fav-script';
    span.appendChild(btnFav);
    btnFav.classList.add('bootstrap-btn');
    btnFav.classList.add('btn-xs');
    btnFav.classList.add(btnClass);
    btnFav.innerText = (favshows.includes(BS.Series.ID())) ? remFav : addFav;
    btnFav.addEventListener('click', clickEvent);
    a.appendChild(span);
}


function check(callback){
	var http = new XMLHttpRequest();
	http.open("GET", "https://bs.to/settings/series", true);
	http.setRequestHeader("Content-type", "text/html; charset=utf-8");
    http.onload = () => {
        if(http.status == 200) {
            var list =http.responseText.split('<ul class="col" id="series-menu">')[1].split('</ul>')[0].split("\n");
			var AList=new Array(0);
			for(var i=1;i<list.length-1;i++){
				try{
					AList.push(JSON.parse(list[i].split('data-id="')[1].split('">')[0]));
				}catch(e){
					AList.push(list[i].split('data-id="')[1].split('">')[0]);
				}
			}
            if(callback) callback(AList);
        }
    }
	http.send();
}

function clickEvent(e) {
    let b = (e.target.innerText.trim() == addFav) ? true : false;
    if(b) {
        e.target.classList.remove('btn-outline-info');
        e.target.classList.add('btn-info');
        e.target.innerText = remFav;
    } else {
        e.target.classList.remove('btn-info');
        e.target.classList.add('btn-outline-info');
        e.target.innerText = addFav;
    }
    blockAction(e.target, 1000, () => {
        save(b);
    });
}

function blockAction(el, time, callback) {
    el.classList.add('disabled');
    el.setAttribute('disabled', true);
    if(callback) callback();
    setTimeout(() => {
        el.classList.remove('disabled');
        el.removeAttribute('disabled');
    }, time);
}

function save(bool) {
    let params = `token=${BS.Global.SecurityToken()}`;
    let id = BS.Series.ID();
    if(bool) {
        favshows.push(id);
        favshows = BS.Helper.RemoveDuplicates(favshows);
    } else {
        let index = favshows.indexOf(id);
        favshows.splice(index, 1);
    }
    for(let i = 0; i < favshows.length; i++) {
        params += `&series%5B%5D=${favshows[i]}`;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://bs.to/ajax/edit-seriesnav.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    if(AjaxReload) {
        setTimeout(() => {
            BS.Module.Update('#other-series-nav');
        }, 2000);
    }
}