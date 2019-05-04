/* global $ _ helper requests sidebar */
'use strict';
// ==UserScript==
// @name         MusicBrainz edit: Display acoustIDs and merge recordings with common acoustID
// @namespace    mbz-loujine
// @author       loujine
// @version      2018.1.8
// @supportURL   https://bitbucket.org/loujine/musicbrainz-scripts
// @icon         https://bitbucket.org/loujine/musicbrainz-scripts/raw/default/icon.png
// @description  musicbrainz.org: display acoustIDs and merge recordings with common acoustID
// @compatible   firefox+tampermonkey
// @license      MIT
// @require      https://greasyfork.org/scripts/13747-mbz-loujine-common/code/mbz-loujine-common.js?version=241520
// @include      http*://*musicbrainz.org/work/*
// @include      http*://*musicbrainz.org/artist/*/relationships
// @include      http*://*musicbrainz.org/artist/*/recordings
// @include      http*://*musicbrainz.org/artist/*/recordings?page=*
// @exclude      http*://*musicbrainz.org/work/*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

function showAcoustids() {
    var $recordings = $('table a[href*="/recording/"]');
    var recording_mbids = $recordings.map(function() {
        return this.href.split('/')[4]; // eslint-disable-line no-invalid-this
    }).get();
    var url = '//api.acoustid.org/v2/track/list_by_mbid';
    var application_api_key = 'P9e1TIJs7g';
    var params = 'client=' + application_api_key;
    params += '&mbid=' + recording_mbids.join('&mbid=');
    params += '&batch=1&disabled=0';

    $('thead > tr').append('<th>AcoustID</th>');
    if ($('.subh > th').length > 1) {
        $('.subh > th')[1].colSpan += 1;
    }
    $('table.tbl > tbody > tr:not(".subh")').append('<td>');

    requests.POST(url, params, function success(xhr) {
        var resp_mbids = JSON.parse(xhr.responseText).mbids;
        $recordings.each(function (idx, recording) {
            var acids = resp_mbids[idx].tracks.map(function (track) {
                return track.id;
            });
            $(recording).parents('tr').find('td:last').append(
                acids.map(function (acid) {
                    return $('<a>', {
                        'href': '//acoustid.org/track/' + acid,
                        'target': '_blank'
                    }).append(
                        $('<code>', {
                            'text': acid.slice(0, 6),
                            'data-acid': acid,
                            'data-recid': helper.mbidFromURL(recording.href),
                            'class': 'acoustID'
                        })
                    ).prepend($('<br />'))
                })
            );
        });
        var nodes = document.getElementsByClassName('acoustID');
        var ids = {};
        for (var node of nodes) {
            var acid = node.getAttribute('data-acid');
            if (!Object.keys(ids).includes(acid)) {
                ids[acid] = [];
            }
            ids[acid].push(node.getAttribute('data-recid'));
        }
        var duplicate_ids = Object.keys(ids).filter(
            // true if distinct recordings use the same acoustID
            acid => _.uniq(ids[acid]).length > 1
        );
        duplicate_ids.forEach(function (acid) {
            $('#acidForMerge').append(
                '<option value="' + acid + '">' + acid.slice(0, 6) +
                '</option>'
            );
        });
        duplicate_ids = duplicate_ids.map(function (acid) {
            return acid.slice(0, 6);
        });
        $(nodes).each(function (idx, node) {
            if (duplicate_ids.includes(node.textContent)) {
                $(node).css('background-color', '#' + node.textContent);
            }
        });
    });
}


function mergeFromAcoustID() {
    var acid = $('#acidForMerge')[0].value;
    var url = '//api.acoustid.org/v2/lookup';
    var application_api_key = 'P9e1TIJs7g';
    var params = 'client=' + application_api_key;
    params += '&meta=recordingids';
    params += '&trackid=' + acid;
    requests.POST(url, params, function success(xhr) {
        var recordings = JSON.parse(xhr.responseText).results[0].recordings;
        var ids = [];
        recordings.forEach(function (recording) {
            var url = '/ws/js/entity/' + recording.id;
            requests.GET(url, function (resp) {
                ids.push(JSON.parse(resp).id);
            });
        });
        setTimeout(function () {
            var url = '/recording/merge_queue?add-to-merge=' +
                      ids.join('&add-to-merge=');
            console.log('Merge URL is ' + url);
            window.open(url);
        }, 1000);
    });
}


(function displaySidebar() {
    sidebar.container().insertAdjacentHTML('beforeend', `
        <h3>Show acoustIDs</h3>
        <input type="button" id="showAcoustids" value="Show acoustIDs">
        <h3>Merge from acoustID</h3>
        <select id="acidForMerge"><option value="">acoustID</option></select>
        <input type="button" id="merge" value="Merge">
    `);
})();

$(document).ready(function() {
    document.getElementById('showAcoustids').addEventListener(
        'click', showAcoustids);
    document.getElementById('merge').addEventListener(
        'click', mergeFromAcoustID);
    return false;
});
