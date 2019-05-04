// ==UserScript==
// @name        todasAbas
// @namespace   petzworld.com
// @include     http://*-porto.olx.pt/*
// @include     http://pacosdeferreira.olx.pt/cachorra-encontrada*
// @include     http://vilanovadegaia.olx.pt/*
// @version     4.6
// @grant       none
// @description para fazer coisas em tuga
// ==/UserScript==

document.getElementById("create_adv_text").innerHTML="PPetz Rulazzz";

var count=30;
var counter;

var urlsToLoad  = [
    'http://gondomar-porto.olx.pt/barack-iid-456880119',
    'http://gondomar-porto.olx.pt/becas-iid-456593653',
    'http://gondomar-porto.olx.pt/bernardo-iid-456594211',
    'http://gondomar-porto.olx.pt/bia-gatinha-de-rua-mas-meiga-iid-456822081',
    'http://gondomar-porto.olx.pt/black-iid-456711821',
    'http://vilanovadegaia.olx.pt/bolinhas-iid-457932507',
    'http://gondomar-porto.olx.pt/boneca-iid-456820863',
    'http://gondomar-porto.olx.pt/boneca-iid-456821823',
    'http://gondomar-porto.olx.pt/bonzolas-iid-456777121',
    'http://gondomar-porto.olx.pt/bugy-cachorro-com-doenca-grave-no-coracao-iid-456821597',
    'http://gondomar-porto.olx.pt/busy-cadela-encontrada-no-alto-da-maia-iid-457606431',
    'http://gondomar-porto.olx.pt/cachorra-encontrada-a-deambular-em-lamego-iid-456837897',
    'http://gondomar-porto.olx.pt/cachorra-encontrada-em-lamego-iid-456837871',
    'http://pacosdeferreira.olx.pt/cachorra-encontrada-na-estrada-em-lamego-iid-456837839',
    'http://gondomar-porto.olx.pt/cadela-com-6-meses-para-adopa-a-o-iid-456758169',
    'http://gondomar-porto.olx.pt/cadela-medio-pequeno-iid-457321041',
    'http://gondomar-porto.olx.pt/carol-iid-456595877',
    'http://gondomar-porto.olx.pt/charlie-iid-456598507',
    'http://gondomar-porto.olx.pt/chica-iid-456821095',
    'http://gondomar-porto.olx.pt/daisy-iid-456599549',
    'http://gondomar-porto.olx.pt/ca-o-douro-iid-456712225',
    'http://gondomar-porto.olx.pt/eddie-iid-456597671',
    'http://gondomar-porto.olx.pt/estrela-iid-456714241',
    'http://gondomar-porto.olx.pt/faisca-iid-456600091',
    'http://gondomar-porto.olx.pt/fany-iid-456819859',
    'http://gondomar-porto.olx.pt/foxy-iid-456878343',
    'http://gondomar-porto.olx.pt/freddie-iid-456880345',
    'http://gondomar-porto.olx.pt/gatos-da-batalha-iid-456759515',
    'http://gondomar-porto.olx.pt/gatinhos-da-se-iid-456774877',
    'http://gondomar-porto.olx.pt/gatinhos-2-5-meses-para-adopcao-iid-457398907',
    'http://gondomar-porto.olx.pt/grace-iid-456598725',
    'http://gondomar-porto.olx.pt/joy-resgatado-de-uma-colonia-iid-456878623',
    'http://gondomar-porto.olx.pt/ju-menina-com-muita-vida-iid-457259185',
    'http://gondomar-porto.olx.pt/julieta-caniche-de-20kg-iid-456599935',
    'http://gondomar-porto.olx.pt/leao-iid-456880457',
    'http://gondomar-porto.olx.pt/lenny-devolvido-iid-456712845',
    'http://gondomar-porto.olx.pt/martinho-dos-olhos-azuis-iid-456595475',
    'http://gondomar-porto.olx.pt/matilde-iid-456594849',
    'http://gondomar-porto.olx.pt/max-e-as-piscinas-iid-456598217',
    'http://gondomar-porto.olx.pt/menina-iid-456819223',
    'http://gondomar-porto.olx.pt/micas-iid-456597933',
    'http://gondomar-porto.olx.pt/migas-iid-456878275',
    'http://gondomar-porto.olx.pt/milu-meiga-e-simpatica-iid-456713989',
    'http://gondomar-porto.olx.pt/molly-11anos-iid-456838631',
    'http://gondomar-porto.olx.pt/nadal-iid-456712459',
    'http://gondomar-porto.olx.pt/nana-menina-linda-iid-456838655',
    'http://gondomar-porto.olx.pt/nani-iid-456838697',
    'http://vilanovadegaia.olx.pt/nilo-iid-457907607',
    'http://gondomar-porto.olx.pt/nike-o-brincalhao-iid-456636181',
    'http://gondomar-porto.olx.pt/nina-iid-456599163',
    'http://gondomar-porto.olx.pt/preta-iid-456776575',
    'http://gondomar-porto.olx.pt/princesa-iid-456597347',
    'http://gondomar-porto.olx.pt/quira-iid-456599767',
    'http://gondomar-porto.olx.pt/rafa-iid-456596499',
    'http://vilanovadegaia.olx.pt/rex-cao-iid-456880247',
    'http://gondomar-porto.olx.pt/snoopy-iid-456757127',
    'http://gondomar-porto.olx.pt/speed-encontrado-quase-morto-iid-456820297',
    'http://gondomar-porto.olx.pt/tixa-encontrada-em-ermesinde-iid-457259303',
    'http://gondomar-porto.olx.pt/velhote-iid-456777505',
    'http://gondomar-porto.olx.pt/violeta-iid-456713603'
];

function inicia(){
    setTimeout(FireTimer,1000);
}

window.addEventListener ("load", inicia, false);

window.addEventListener ("hashchange", inicia,  false);


//document.onreadystatechange = function () {
//if(document.readyState === "complete"){
//  setTimeout(FireTimer,1000);
//}
//}

function timerClick(){
    count=count-1;
    
    if (count < 0){
        clearInterval(counter);
        return;
    }
    
    document.getElementById("create_adv_text").innerHTML="Click: "+count + " segundos";
}

function timerNext(){
    count=count-1;
    
    if (count < 0){
        clearInterval(counter);
        return;
    }
    
    document.getElementById("create_adv_text").innerHTML="Next: "+count + " segundos";
}

function Tempo(sec,op){
    count=sec;
    if(op == 1){
        counter=setInterval(timerClick, 1000);
    }else{
        counter=setInterval(timerNext, 1000);
    }
}

function FireTimer () {
    var x=document.getElementsByTagName('b').length;
    
    if(x != 21){
        Tempo(1,1);
        setTimeout(GotoClica, 500);
    }
    
    var str = location.href;
    
    var nres = str.search("vt=1");
    
    while(nres != -1){
        str = str.replace("/?vt=1","");
        str = str.replace("?vt=1","");
        nres = str.search("vt=1");
    }
    
    
    var numUrls     = urlsToLoad.length;
    var urlIdx      = urlsToLoad.indexOf (str)+1;
    
    
    document.getElementById("reply_form_btn").innerHTML=urlIdx+"/"+numUrls+" patudos "+x;
    
    
    if(str=='http://gondomar-porto.olx.pt/violeta-iid-456713603'){
        Tempo(3600,2);
        setTimeout (GotoNextURL, 3600000); // 5000 == 5 seconds
        #setTimeout (eaza, 2000); // 5000 == 5 seconds
    }else{
        if(x == 21 || x == 22){
            if(urlIdx%2 == 0){
                Tempo(2,2);
                setTimeout (GotoNextURL, 1600); // 5000 == 5 seconds
            }else{
                Tempo(3,2);
                setTimeout (GotoNextURL, 2700); // 5000 == 5 seconds
            }
        }
    }
}

function eaza() {
    location.href   = "http://aljezur.olx.pt/lucky-dave-cao-para-adopcao-na-aeza-iid-456596095";
}

function GotoClica () {    
    if(document.getElementById("dogs_button")){
        document.getElementById("dogs_button").click();
    }
    
    if(document.getElementById("cats_button")){
        document.getElementById("cats_button").click();
    }
}

function GotoNextURL () {
    var numUrls     = urlsToLoad.length;
    
    
    var str = location.href;
    
    var nres = str.search("vt=1");
    
    while(nres != -1){
        str = str.replace("/?vt=1","");
        str = str.replace("?vt=1","");
        nres = str.search("vt=1");
    }
    
    
    var urlIdx      = urlsToLoad.indexOf (str);
    urlIdx++;
    if (urlIdx >= numUrls)
        urlIdx = 0;
    
    //var urlIdx = Math.floor((Math.random() * numUrls));
    
    
    location.href   = urlsToLoad[urlIdx];
}