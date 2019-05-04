// ==UserScript==
// @name        扇贝单词书发音
// @namespace   undefined
// @include     https://www.shanbay.com/wordlist/*
// @version     1
// @grant       none
// @description en
// ==/UserScript==
function addSound(data)
{
  var strAudio = '<audio src=\'' + data + '\' hidden=\'true\'>';
  $('body').append(strAudio);
}

for (var i = 0; i < $('strong').length; i++) {
  word = $('strong').eq(i).text();
  url = 'https://media.shanbay.com/audio/us/' + word + '.mp3';
  addSound(url);
  $('strong').eq(i).attr("onclick", "$('audio')["+i+"].play();");
}
