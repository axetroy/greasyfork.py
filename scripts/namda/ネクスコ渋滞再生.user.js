// ==UserScript==
// @name         ネクスコ渋滞再生
// @namespace    https://www.drivetraffic.jp/
// @version      0.1
// @description  drivetraffic play.
// @author       namda
// @match        https://www.drivetraffic.jp/*
// @grant        none
// ==/UserScript==

(function() {
    function userfunc(){
        let greattimer = setInterval(()=>{
            let debugStr = '';
            debugStr += $('.year').val();
            debugStr += $('.month').val();
            debugStr += $('.date').val();
            debugStr += $('.hour').val();
            let exedate = new Date($('.year').val(), $('.month').val(), $('.date').val(), $('.hour').val(), 0);
            let celldate = moment($('.year').val() +'/'+ $('.month').val()+'/'+ $('.date').val()+' '+ $('.hour').val()+':00');
            celldate.add('h', 1);

            $('.year').val(celldate.format('YYYY'));
            $('.month').val(celldate.format('MM'));
            $('.date').val(celldate.format('DD'));
            $('.hour').val(celldate.format('HH'));
            console.log(celldate.format('YYYY-MM-DD HH:mm:ss'));
            $('#disp_MAP > form > div > div.time-inputs > a > i').click();
        },(1000 * 1 * 2));
        return greattimer;
    };

    $('#header > div > div.gNav2.nav03 > div > ul > li:nth-child(1) > a').on('click',() => {
        if($('#header > div > h2 > span').length == 0){
            stopint = userfunc();
           $('header h2 a').after('<span id="ttl_trjm_play" date-run-toggle="run" onclick="clearInterval(stopint);$(this).remove();">ストップ</span>');
        }
    });
})();