// ==UserScript==
// @name        Kinopoisk+
// @namespace   https://greasyfork.org/en/users/899-lain-inverse
// @description Adds links to torrent and other search engines
// @include     https://kinopoisk.ru/film/*
// @include     https://www.kinopoisk.ru/film/*
// @include     https://kino-teatr.ru/kino/movie/*
// @include     https://www.kino-teatr.ru/kino/movie/*
// @version     3.8
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// ==/UserScript==
// Script based on script with the same name by https://greasyfork.org/users/3348-xant1k
// Updated to work with CSP and without omdbapi.com which now requires API key
(function(){
    'use strict';

    let favicons = [
        'https://plus.google.com/_/favicon?domain=',
        'https://favicon.yandex.net/favicon/'
    ];
    if (location.hostname.endsWith('kinopoisk.ru')) {
        let f = favicons[0];
        favicons[0] = favicons[1];
        favicons[1] = f;
    }

    // get movie name
    let movie, year;
    let en_title_selector, ru_title_selector;
    if (location.hostname.endsWith('kinopoisk.ru')) {
        en_title_selector = 'span[itemprop="alternativeHeadline"]';
        ru_title_selector = '.moviename-big[itemprop="name"]';
    }
    if (location.hostname.endsWith('kino-teatr.ru')) {
        en_title_selector = '.info_table_data > strong[itemprop="name"]';
        ru_title_selector = '#page_name > h1[itemprop="name"]';
    }

    let movie_name_block = document.querySelector(en_title_selector);
    if (!movie_name_block || movie_name_block.textContent === '')
        movie_name_block = document.querySelector(ru_title_selector);
    if (movie_name_block)
        movie = movie_name_block.textContent;
    if (movie === '' || !movie) {
        console.warn('[K+] Unable to locate movie title.');
        return;
    }

    // drop unneccessary parts from the movie title
    movie = movie.replace(/\s\([^)]+\)$/, '').replace(/, The$/, '');

    // get year
    if (location.hostname.endsWith('kinopoisk.ru'))
        year = document.querySelector('.info a').textContent;
    if (location.hostname.endsWith('kino-teatr.ru')) {
        let params = document.querySelectorAll('.film_top .info_table_param');
        let values = document.querySelectorAll('.film_top .info_table_data');
        for (let [id, val] of params.entries())
            if (val.textContent === 'Год')
                year = values[id].textContent;
    }
    console.log('Movie:', movie, 'Year:', year);

    let movie_enc = encodeURIComponent(movie);
    let links = [
        //RUSSIAN
        'https://rutracker.org/forum/tracker.php?nm=',
        'http://kinozal.tv/browse.php?s=',
        'http://rutor.info/search/',
        'https://nnmclub.to/forum/tracker.php?nm=',
        'http://teamhd.org/browse.php?search=',
        'http://bluebird-hd.org/browse.php?search=',
        //TV SHOW
        'https://broadcasthe.net/torrents.php?searchstr=',
        'https://www.tvchaosuk.com/all=/browse.php?keywords=',
        'https://www.morethan.tv/browse.php?search=',
        'http://www.bitmetv.org/browse.php?search=',
        'https://tv-vault.me/all=torrents.php?searchstr=',
        'https://freshon.tv/browse.php?search=',
        //ASIAN
        'https://hdchina.club/browse.php?search=',
        'https://asiandvdclub.org/all=/browse.php?search=',
        'https://hdcorea.me/browse.php?search=',
        'https://tp.m-team.cc/browse.php?search=',
        'https://totheglory.im/browse.php?search=',
        //HD
        'https://hdbits.org/all=/browse.php?incldead=0&search=',
        'https://scenehd.org/browse.php?search=',
        'https://awesome-hd.me/torrents.php?searchstr=',
        'https://pixelhd.me/browse.php?search=',
        'https://hdme.eu/browse.php?search=',
        'https://privatehd.to/browse.php?search=',
        'https://uhdbits.org/browse.php?search=',
        'https://www.hdarea.co/browse.php?search=',
        'https://www.hd-bits.com/browse.php?search=',
        'https://hdsky.me/browse.php?search=',
        'https://hd-space.org/browse.php?search=',
        'https://hdcenter.cc/browse.php?search=',
        'http://ultrahdclub.org/browse.php?search=',
        'https://hd-torrents.org/browse.php?search=',
        'https://beyondhd.xyz/browse.php?search=',
        'https://world-in-hd.net/browse.php?search=',
        'https://www.bit-hdtv.com/torrents.php?search=',
        'https://www.hd-spain.com/browse.php?',
        'https://chdbits.co/torrents.php?search=',
        //DVD/VHS
        'http://www.dvdseed.eu/browse.php?search=',
        //SCENE, 0-day
        'https://www.torrentday.com/browse.php?search=',
        'https://www.thegft.org/browse.php?search=',
        'https://sceneaccess.org/browse.php?search=',
        'http://piratethe.net/browse.php?search=',
        'https://iptorrents.com/all=/t?q=',
        'https://tls.passthepopcorn.me/torrents.php?searchstr=',
        'https://revolutiontt.me/browse.php?search=',
        //OTHER
        'https://cinemageddon.net/all=/browse.php?search=',
        'https://karagarga.in/all=/browse.php?incldead=1&search=',
        'http://www.bitmetv.org/browse.php?search=',
        'https://cinematik.net/all=/browse.php?incldead=0&director=0&search=',
        'https://x264.me/browse.php?search=',
        'https://polishsource.cz/browse.php?search=',
        'https://hon3yhd.com/browse.php?search=',
        'https://torrentvault.org/browse.php?search=',
        'https://torrentshack.me/browse.php?search=',
        'https://torrentbytes.net/browse.php?search=',
        'https://www.nordicbits.eu/browse.php?search=',
        'https://bithumen.be/browse.php?search=',
        'https://avistaz.to/browse.php?search=',
        'http://www.iloveclassics.com/browse.php?search=',
        'http://www.gormogon.com/browse.php?search=',
        'http://www.bithq.org/all=/search.php?search=',
        'https://tehconnection.eu/browse.php?search=',
        'https://horrorcharnel.org/browse.php?search=',
        'https://cinemaz.to/browse.php?search=',
        'https://danishbits.org/browse.php?search=',
        'https://norbits.net/browse.php?search=',
        'https://polishtracker.net/browse.php?search=',
        'https://privatehd.to/all=/index.php?page=torrents&search=',
        //CARTOONS, COMICS
        'http://www.cartoonchaos.org/browse.php?search=',
        'https://32pag.es/browse.php?search=',
        //SUBTITLES
        'https://www.opensubtitles.org/browse.php?search=',
        'https://subscene.com/browse.php?search=',
        'http://www.subtitleseeker.com/browse.php?search=',
        //WEB
        'http://www.blu-ray.com/search/?quicksearch=1&quicksearch_country=all&section=bluraymovies&quicksearch_keyword=',
        'https://www.youtube.com/results?search_query=',
        'https://www.kinopoisk.ru/index.php?kp_query=',
        { action: 'https://www.kino-teatr.ru/search/', method: 'post', inputs: { 'text': '$MOVIE $YEAR'} },
        { action: 'https://www.imdb.com/search/title', method: 'post', inputs: {
            'title': '$MOVIE',
            'release_date-min': '$YEAR',
            'release_date-max': '$YEAR' }
        }
    ];

    function submitAsForm(o, movie, year) {
        let form = document.createElement('form');
        form.target = '_blank';
        for (let name in o)
            if (o !== 'inputs') form[name] = o[name];
        let input;
        for (let name in o.inputs) {
            input = document.createElement('input');
            input.name = name;
            if (typeof o.inputs[name] === 'string')
                input.value = o.inputs[name].replace('$MOVIE', movie).replace('$YEAR', year);
            else input.value = o.inputs[name];
            form.appendChild(input);
        }
        document.head.appendChild(form);
        form.submit();
        document.head.removeChild(form);
    }

    let xhr;
    try {
        xhr = GM.xmlHttpRequest;
    } catch(ignore) {};
    if (!xhr)
        xhr = GM_xmlhttpRequest || (() => console.log('[K+] Escalated XHR is not supported.'));
    function reloadFaviconIfBroken(e, domain) {
        let img = e.target;
        if (img.clientWidth > 5) // probably loaded fine
            return; // usually Yandex returns 1x1 image for missing favicons
        xhr({
            method: 'GET',
            url: `${favicons[1]}${domain}`,
            responseType: 'blob',
            onload: res => {
                if (res.status !== 200)
                    return;
                let reader = new FileReader();
                reader.onload = e => {
                    img.src = e.target.result.replace('data:;','data:image/png;');
                };
                reader.readAsDataURL(res.response);
            }
        });
    };

    let post = document.createElement('div');
    post.className = 'torrents';
    for (let link of links) {
        let formConf = null;
        if (link.action) {
            formConf = link;
            link = link.action;
        }
        let domain = link.match(/:\/\/([^/]+)\//)[1];
        let eA = post.appendChild(document.createElement('a'));
        eA.target = '_blank';
        eA.title = domain.replace(/^www\./,'');
        eA.href = `${link}${formConf ? '' : `${movie_enc}%20${year}`}`;
        let eIMG = eA.appendChild(document.createElement('img'));
        eIMG.src = `${favicons[0]}${domain}`;
        eIMG.onload = e => reloadFaviconIfBroken(e, domain, 1);
        eIMG.onerror = e => reloadFaviconIfBroken(e, domain, 0);
        if (formConf)
            eA.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
                submitAsForm(formConf, movie, year);
            }, true);
    }

    // insert links block
    if (location.hostname.endsWith('kinopoisk.ru')) {
        let mustsee = document.querySelector('#div_mustsee_main');
        if (!mustsee) {
            console.warn('[K+] Unable to locate "Must See" block.');
            return;
        }
        mustsee.parentNode.insertBefore(post, mustsee);
    }
    if (location.hostname.endsWith('kino-teatr.ru')) {
        let right_col = document.querySelector('.content_block ~ .right_col');
        if (!right_col) {
            console.warn('[K+] Unable to locate right column.');
            return;
        }
        right_col.insertBefore(post, right_col.children[0]);
    }

    // apply styles to links block
    let style = document.head.appendChild(document.createElement('style'));
    style.sheet.insertRule('.torrents a img { border: 0 }', 0);
    style.sheet.insertRule(`.torrents a { display: inline-block; width: 16px; height: 16px; vertical-align: top; margin-top: 3px; margin-bottom: 3px }`, 0);

    if (location.hostname.endsWith('kinopoisk.ru')) {
        let originalPoster = !!document.querySelector('#photoBlock.originalPoster');
        style.sheet.insertRule(`.torrents { ${originalPoster ? 'padding-left: 15px;' : ''} margin-top: -20px; margin-bottom: 10px; background-color: #f2f2f2; width: 180px }`, 0);
        style.sheet.insertRule(`.torrents a { margin: ${originalPoster ? '4' : '7'}px; }`, 0);
    }
    if (location.hostname.endsWith('kino-teatr.ru')) {
        style.sheet.insertRule(`.torrents a { margin: 4px }`, 0);
        style.sheet.insertRule(`.torrents { background-color: #dedede; border: calc(1rem - 4px) solid #dedede }`, 0);
    }
})();