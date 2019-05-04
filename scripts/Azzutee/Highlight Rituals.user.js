// ==UserScript==
// @name         Highlight Rituals
// @namespace    Azzu
// @version      1.1
// @description  Highlights ritual spells on roll20 if you have the shaped character sheet
// @author       You
// @match        https://app.roll20.net/editor/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const ritualSpells = ['alarm', 'animal messenger', 'augury', 'beast sense', 'ceremony', 'commune',
                          'commune with nature', 'comprehend languages', 'contact other plane',
                          'detect magic', 'detect poison and disease', 'divination',
                          'drawmij\'s instant summons', 'feign death', 'find familiar', 'forbiddance',
                          'gentle repose', 'identify', 'illusory script', 'leomund\'s tiny hut',
                          'locate animals or plants', 'magic mouth', 'meld into stone', 'phantom steed',
                          'purify food and drink', 'rary\'s telepathic bond', 'silence', 'skywrite',
                          'speak with animals', 'tenser\'s floating disk', 'unseen servant',
                          'water breathing', 'water walk'];

    setInterval(() => {
        $('.sheet-spell-name').filter((idx, elem) => {
            return ritualSpells.includes($(elem).text().toLowerCase());
        }).each((idx, elem) => {
            $(elem).css('color', '#396eaa');
        });
    }, 2000);
})();