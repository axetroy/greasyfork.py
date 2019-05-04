// ==UserScript==
// @name         Gooder Pandora Layout
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Make Pandora compact and gooder looking!
// @author       Robert Rioja
// @include     http://*pandora.com/*
// @include     https://*pandora.com/*
// ==/UserScript==

document.getElementsByClassName('contentnav')[0].style.display = 'none';
document.getElementsByClassName('top')[0].style.display = 'none';
document.getElementsByClassName('leftcolumn')[0].style.display = 'none';
document.getElementById('footer').style.display = 'none';
document.getElementById('mainContainer').style.height = '0px';
document.getElementById('adLayout').style.margin = '0px';
document.getElementsByClassName('leftcolumn')[1].style.margin = '0px';
document.getElementsByClassName('leftcolumn')[1].style.padding = '0px';
document.getElementsByClassName('leftcolumn')[1].style.position = 'absolute';
document.getElementsByClassName('leftcolumn')[1].style.top = '-30px';
document.getElementById('brandingBar').style.zIndex = '0';
document.getElementsByClassName('searchSubText')[0].style.top = '6px';
document.getElementById('searchPopupNavPosition').style.top = '27px';
document.getElementById('searchPopupNavPosition').style.left = '7px';
document.getElementsByClassName('rightcolumn')[0].style.right = '0px';
document.getElementsByClassName('rightcolumn')[0].style.left = '300px';
document.getElementsByClassName('progress')[0].style.margin = '0px';
document.getElementsByClassName('buttons')[0].style.margin = '0px';
document.getElementsByClassName('buttons')[0].style.marginLeft = '70px';
document.getElementsByClassName('buttons')[0].style.width = 'auto';
document.getElementsByClassName('rightcolumn')[1].style.position = 'absolute';
document.getElementsByClassName('rightcolumn')[1].style.left = '405px';
document.getElementById('promobox').style.display = 'none';
document.getElementById('main').style.top = '95px';
document.getElementById('adLayout').style.setProperty ('width', 'auto', 'important');
document.getElementById('user_menu_dd').style.top = '0px';
document.getElementById('user_menu_dd').style.height = '180px';
document.getElementById('track_menu_dd').style.display = 'none';
document.getElementById('flag_menu_dd').style.display = 'none';
document.getElementsByClassName('welcome')[0].style.minHeight = '0px';
document.getElementsByClassName('contextual_help_container')[0].style.top = '-506px';
document.getElementById('station_menu_dd').style.marginTop = '40px';
document.getElementById('station_menu_dd').style.width = '260px';
document.getElementById('station_menu_dd').style.marginLeft = '-38px';
document.getElementById('body').appendChild(document.getElementById('user_menu_dd'));
document.getElementById('user_menu_dd').style.height = '189px';
document.getElementById('user_menu_dd').style.zIndex = '10000';
document.getElementById('user_menu_dd').style.left = '395px';
document.getElementById('user_menu_dd').style.width = '205px';
document.getElementById('user_menu_dd').style.boxShadow = 'none';
document.getElementById('user_menu_dd').style.backgroundColor = 'transparent';
document.querySelector('.dd_container ul').style.margin = '67px 0px 0px 0px';
document.getElementsByClassName('button btn_bg autoshareButton')[0].style.display = 'none';
document.getElementById('mainContentContainer').style.setProperty ('width', '665px', 'important');
document.getElementById('mainContentContainer').style.setProperty ('float', 'left', 'important');
document.getElementsByClassName('button')[0].style.display = 'none';
document.getElementsByClassName('stationContent')[0].style.height = 'auto';
document.getElementById('mainContent').style.minHeight = '0px';
document.getElementById('body').style.height = 'auto';
document.getElementsByClassName('home')[1].style.minHeight = '0px';
document.getElementById('stationSortButtons').style.clear = 'both';
document.getElementsByClassName('home')[1].appendChild(document.getElementById('stationSortButtons'));

var parent1 = document.getElementById('brandingBar');
var child1 = document.getElementsByClassName('middlecolumn')[0];
parent1.removeChild(child1);

var parent2 = document.getElementsByClassName('stationContent')[0];
var child2 = parent2.getElementsByClassName('view-3')[0];
parent2.removeChild(child2);

var parent3 = document.getElementsByClassName('clearfix')[1];
var child3 = parent3.getElementsByClassName('register')[0];
parent3.removeChild(child3);

var parent4 = document.getElementsByClassName('buttons')[1];
var child4 = parent4.getElementsByClassName('button')[0];
parent4.removeChild(child4);