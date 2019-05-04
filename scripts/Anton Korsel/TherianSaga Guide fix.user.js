// ==UserScript==
// @name         TherianSaga Guide fix
// @namespace    http://www.theriansaga.com/guide
// @version      0.2
// @description  TherianSaga Guide fix for main page
// @match        http://www.theriansaga.com/guide/*
// @copyright    2016+, RichDad
// @author       RichDad
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var innerContent = '<div class="sectionBoxRow">' +
        '<div class="sectionBoxCell">' +
        '<div class="sectionBox">' +
        '<div class="title">' +
        '<span>Other</span>' +
        '</div>' +
        '<div class="items">' +
        '<a href="/guide/skills/skill.aspx?id=671c9e5f-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://statics.theriansaga.com/gameassets/Images/00300/00337.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>General / Build</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '<a href="/guide/skills/skill.aspx?id=2f1c9e5f-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://statics.theriansaga.com/gameassets/Images/00400/00482.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Archeology</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '<a href="/guide/items/item.aspx?id=a3d2fe5e-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://statics.theriansaga.com/gameassets/Images/01200/01223.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Foggy Pearl</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        ''+
        '<div class="sectionBoxCell">' +
        '<div class="sectionBox" style="background-size: 100% 100%; height: 150px;">' +
        '<div class="title">' +
        '<span>Territories</span>' +
        '</div>' +
        '<div class="items">' +
        '<a href="/guide/territories/territory.aspx?id=e5ac0a5c-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://www.theriansaga.com/images/v5/guide/gameguide/icons/24x24/region.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Hawkoria</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '<a href="/guide/territories/territory.aspx?id=3ead0a5c-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://www.theriansaga.com/images/v5/guide/gameguide/icons/24x24/region.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Lanfar</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '<a href="/guide/regions/region.aspx?id=80af0a5c-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://statics.theriansaga.com/gameassets/Images/00000/00058.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Den</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '<a href="/guide/territories/territory.aspx?id=41af0a5c-b4b6-e211-be8c-782bcb902040">' +
            '<div class="item">' +
                '<div class="innerRow">' +
                    '<div class="picture">' +
                        '<img src="http://statics.theriansaga.com/gameassets/Images/00000/00059.png">' +
                    '</div>' +
                    '<div class="text">' +
                        '<span>Norstria</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('.sectionBoxRow').first().parent().append(innerContent);
    $('.fc-button-how-to-play').parent().parent().hide();
    $('section').first().hide();
    $('.fc-top-section').hide();
})();