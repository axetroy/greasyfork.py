// ==UserScript==
// @name         His footprint
// @namespace    -
// @version      0.1.2
// @description  As title.
// @author       LianSheng
// @match        https://forum.gamer.com.tw/*
// @require      https://greasyfork.org/scripts/377302-general-source-code-injection-tool/code/General%20Source%20Code%20Injection%20Tool.js?version=667827
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // -----------[ SET ]------------- //

    let bsn = 60076;
    let author = "LianSheng142";
    let range = 500;

    // ---------[ PROGRAM ]----------- //
    addHTML(`<check>false</check>`, "html");
    console.log(`Hint: document.querySelector("check").innerText = "true"`);
    let running = false;
    let check_delay = 50;
    let run_delay = 50;
    let maxsn = 0;
    let minsn = 0;
    let id;
    let count = 0;

    // control start.
    setInterval(()=>{
        let tmp = document.querySelector("check").innerText;
        if ( tmp == "true" ) {
            if( !running ) {
                run();
            }
            running = true;
        } else if ( tmp == parseInt(tmp) ){
            if( !running ) {
                if( !running ) {
                    run(tmp);
                }
                running = true;
                document.querySelector("check").innerText = true;
            } else {
                console.log("Invalid operation: program is running.");
                document.querySelector("check").innerText = true;
            }
        } else {
            stop();
            running = false;
        }
    }, check_delay);


    function run(tmp=0) {
        let init = Date.now();
        maxsn = (tmp == 0) ? get_max() : tmp;
        minsn = (maxsn - range > 0) ? (maxsn - range) : 1;
        let step1 = Date.now();
        console.log(`parse completed.\n(${minsn} ~ ${maxsn}) [${step1 - init} ms]`);

        id = setInterval(() => {
            count++;
            if ( get(`https://forum.gamer.com.tw/C.php?bsn=${bsn}&snA=${minsn + count}&s_author=${author}`).length > 10000) {
                console.log(`Found:\nhttps://forum.gamer.com.tw/C.php?bsn=${bsn}&snA=${minsn + count}&s_author=${author}`);
            }

            if(count <= parseInt(count/(range/100))*(range/100)) {
                console.log(`${count} / ${range}`);
            }

            if(count >= range){
                stop();
                running = false;
                document.querySelector("check").innerText = "";
            }
        }, run_delay);
    }

    function stop() {
        clearInterval(id);
    }

    // Get now maximum snA
    function get_max() {
        let maxsnA = 0;
        let tmpsn = 0;

        get(`https://forum.gamer.com.tw/B.php?bsn=${bsn}&subbsn=0`)
            .replaceAll(/\n/, "")
            .match(/<tr class=\"b-list__row\"><td class=\"b-list__summary\">.+?<\/td>/g)
            .forEach((e) => {
            tmpsn = e.match(/<a name=\"([0-9]{1,7})\"><\/a>/)[1];
            if(tmpsn > maxsnA) {
                maxsnA = tmpsn;
            }
        })
        return maxsnA;
    }

    // XHR GET
    function get(url, set=false) {
        let temp;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                temp = xhr.responseText;
            }
        }
        xhr.open('GET', url, set);
        xhr.send(null);

        return temp;
    }
})();