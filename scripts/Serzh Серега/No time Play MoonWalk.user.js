// ==UserScript==
// @name        No time Play MoonWalk
// @namespace   name
// @include     http://moonwalk.co/*
// @include     http://moonwalk.cc/*
// @include     http://moonwalk.pw/*
// @include     http://streamguard.cc/*
// @include     http://moonwalk.center/*
// @include     https://moonwalk.co/*
// @include     https://moonwalk.cc/*
// @include     https://moonwalk.pw/*
// @include     https://streamguard.cc/*
// @include     https://moonwalk.center/*
// @version     1.1
// @grant       none
// @description прямой запуск плеера
// ==/UserScript==

var PlayButton = document.getElementsByClassName('play-button');

if(PlayButton.length==0)
{
	PlayButton = document.getElementsByClassName('stubs-image');

}

PlayButton[0].setAttribute('onclick',"showVideo()");
