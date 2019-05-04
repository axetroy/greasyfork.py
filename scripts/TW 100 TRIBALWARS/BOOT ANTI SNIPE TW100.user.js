// ==UserScript==
// @name           BOOT ANTI SNIPE TW100
// @author         Marcos V.S. Marques
// @email          tribalwarsbr100@gmail.com
// @namespace      https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg
// @version        2.6 (JUN/2017)
// @grant          Publico
// @description    BOOT ANTI SNIPE  (linguagem: javascript-ECMAscript5;)
// @Realiza        ATAQUES MINUCIOSOS COM MILLESIMOS DE SEGUNDOS COM PERFEIÇÃO MAXIMA. 
// @Opções         OPÇÃO DELAY PARA ATRASAR SEU ATAQUE, OU ADIANTAR SEU ATAQUE OPÇÃO VAI DE ACORDO COM VELOCIDADE DA SUA INTERNET, E OUTROS FATORES
// @Utilização     NA PRAÇA DE REUNIÃO OPÇÃO CONFIRMAR ATAQUE (ULTIMA ETAPA DE UM ATAQUE)
// @include        https://*screen=place&try=confirm*
// @run-at         document-start
// @icon           https://media.innogamescdn.com/com_DS_FR/Quickbar/priest.png
// ==/UserScript==


MestreBoot = {
    confirmButton: null,
    duration: null,
    dateNow: null,
    offset: null,
    init: function() {
        $($('#command-data-form').find('tbody')[0]).append('<tr><td>Chegada:</td><td> <input type="datetime-local" id="CStime" step=".001"> </td></tr><tr> <td>Offset:</td><td> <input type="number" id="CSoffset"> <button type="button" id="CSbutton" class="btn">confirmar</button> </td></tr>');
        this.confirmButton = $('#troop_confirm_go');
        this.duration = $('#command-data-form').find('td:contains("duração:")').next().text().split(':').map(Number);
        this.offset = localStorage.getItem('CS.offset') || -250;
        this.dateNow = this.convertToInput(new Date());
        $('#CSoffset').val(this.offset);
        $('#CStime').val(this.dateNow);
        $('#CSbutton').click(function() {
            var offset = Number($('#CSoffset').val());
            var attackTime = MestreBoot.getAttackTime();
            localStorage.setItem('CS.offset', offset);
            MestreBoot.confirmButton.addClass('btn-disabled');
            setTimeout(function() {
                MestreBoot.confirmButton.click();
            },attackTime-Timing.getCurrentServerTime()+offset);
            this.disabled = true;
        });
    },
    getAttackTime: function() {
        var d = new Date($('#CStime').val().replace('T',' '));
        d.setHours(d.getHours()-this.duration[0]);
        d.setMinutes(d.getMinutes()-this.duration[1]);
        d.setSeconds(d.getSeconds()-this.duration[2]);
        return d;
    },
    convertToInput: function(t) {
        t.setHours(t.getHours()+this.duration[0]);
        t.setMinutes(t.getMinutes()+this.duration[1]);
        t.setSeconds(t.getSeconds()+this.duration[2]);
        var a = {
            y: t.getFullYear(),
            m: t.getMonth() + 1,
            d: t.getDate(),
            time: t.toTimeString().split(' ')[0],
            ms: t.getMilliseconds()
        };
        if (a.m < 10) {
            a.m = '0' + a.m;
        }
        if (a.d < 10) {
            a.d = '0' + a.d;
        }
        if (a.ms < 100) {
            a.ms = '0' + a.ms;
            if (a.ms < 10) {
                a.ms = '0' + a.ms;
            }
        }
        return a.y + '-' + a.m + '-' + a.d + 'T' + a.time + '.' + a.ms;
    },
    addGlobalStyle: function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
};
MestreBoot.addGlobalStyle('#CStime, #CSoffset {font-size: 9pt;font-family: Verdana,Arial;}#CSbutton {float:right;}');
var a = setInterval(function(){
    if (document.getElementById('command-data-form') && jQuery) {
        MestreBoot.init();
        clearInterval(a);
    }
},1); // faster load
document.addEventListener('DOMContentLoaded', function(){
    $('.server_info').prepend('<span style="float:left" >MestreBoot (tribalwarsbr100@gmail.com)</span>');
});