// ==UserScript==
// @name         Memrise Cantonese for HSK
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds cantonese text-to-speech and traditional characters to the definitions on BenWhately's HSK courses
// @author       fta
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://bowercdn.net/c/jquery-s2t-0.1.0/jquery.s2t.js
// @match        http://www.memrise.com/course/*/hsk-level*/garden/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: false */
/* jshint esversion: 6 */

    console.log('Loaded memrise user script');
    let currentUtterance = null;
    let loop = () => {
        let textNode = $('.row-label').filter((i, x) => x.innerHTML === 'Chinese Character');
        if (textNode.length) {
          let existingAudio = $('.first-audio .primary-value .custom-audio');
          if (!existingAudio.length) {
            textNode = textNode.parent().find('.primary-value');
            let text = textNode.text().trim();

            // Add cantonese audio
            console.log('Added audio for', text);
            let playAudio = () => {
              window.speechSynthesis.cancel(currentUtterance);
              currentUtterance = new SpeechSynthesisUtterance(text);
              currentUtterance.lang = 'zh-HK';
              currentUtterance.rate = 1;
              window.speechSynthesis.speak(currentUtterance);
            };
            $('<a class="audio-player audio-player-hover custom-audio">')
                .css({
                  fontSize: '16',
                  textAlign: 'center',
                  color: '#444'
                })
                .text('粵')
                .on('click mouseenter', playAudio)
                .prependTo('.first-audio .primary-value');

            // Add traditional
            let traditional = $.s2t(text);
            if (text !== traditional) {
              console.log('Added traditional characters', traditional);
              textNode.append(' / ' + traditional);
            }
          }
        }
        requestAnimationFrame(loop);
    };
    loop();

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
