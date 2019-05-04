// ==UserScript==
// @name        SIForge
// @namespace   InGame
// @description http://www.dreadcast.net/Main
// @include http://www.dreadcast.net/Main
// @include     https://www.dreadcast.eu/Main
// @version     1.072
// @grant       none
// ==/UserScript==

function initialisePub(idElementToAddPub)
{
    var element = $('#'+idElementToAddPub)[0];
    
    
    $('#'+idElementToAddPub).css('background-image','url("http://static.wixstatic.com/media/1361d6c8c7b64e41b4815876f0cd3172.png_srb_p_67_51_75_22_0.50_1.20_0.00_png_srb"').css('background-color','#3D4146');
   
    var idElement = idElementToAddPub.replace(/\W+/g, "");
     if(!document.getElementById("pubDescLieu"+idElement))
     {
             var pubDescLieu = document.createElement('div');
             pubDescLieu.id = "pubDescLieu"+idElement;
             element.appendChild(pubDescLieu);
             $('#pubDescLieu'+idElement).css('max-height','470px').css('overflow','auto');
        
             pubDescLieu.innerHTML = "<center><br/><img width='400px' src='http://static.wixstatic.com/media/59c34b_7e2d81ea2e154692ab61f1842d07ee41.png_srz_p_982_136_75_22_0.50_1.20_0.00_png_srz'/></center>";
             pubDescLieu.innerHTML += "<div style='color:#575757; text-align:center; font-size:14px; padding-top:20px;'>Bienvenue à SIF, Succursale Infomatique de la Forge.</div>";
             pubDescLieu.innerHTML += "<div style='color:#FFF; text-align:center; font-size:10px; padding-top:5px; padding-bottom :20px;'>Achète via cette interface les mises à jour proposées par notre firme.</div>";
             
             var parici = document.createElement('a');
             parici.id = "parici"+idElement;
             pubDescLieu.appendChild(parici);
             $('#parici'+idElement).css('color','#FFF').css('background-color','#8AC007').css('font-weight','bold').css('text-align','center').css('font-size','14px').css('margin-left','40%').css('padding','3px 10px 4px').css('margin-bottom','5px').css('border','1px solid #8AC007').css('border-radius','5px').css('white-space','nowrap').text("Par ici!");
             $('#parici'+idElement).click(function(){
                 displayCatalogue("pubDescLieu"+idElement);
             });                        
     }
}

function checkSalle(){
    var x = engine.getMap().getOffsetX();
    var y = engine.getMap().getOffsetY();
    console.log(x+" "+y);
    if($('#lieu_actuel .titre2').text()  == "420 Rue Hoblet")
    {
        if(y == -11 && (x == -11 || x==-12 || x==-13))
        {
            if(!document.getElementById("db_panneau_214831"))
            {
              $.ajaxSetup({async: false});
              engine.updateBuildingInfos("meuble", "meuble_214831", "#carte #cadre_position");
              $.ajaxSetup({async: true});    
              $('#db_panneau_214831 .content').html('');
              
              $("#db_panneau_214831").css('width','600px');
              $("#db_panneau_214831 .content").css('height','');
              $("#db_panneau_214831 .content div").css('height',''); 
                
              initialisePub('db_panneau_214831 .content');        
            }
        }
       
        initialisePub('zone_informations_lieu');        
    }
    else if(document.getElementById("pubDescLieuzone_informations_lieu"))
        document.getElementById("pubDescLieuzone_informations_lieu").remove();    
}

function displayCatalogue(idPub)
{
    var pub = document.getElementById(idPub);
    if(pub)
    {
        pub.innerHTML = "";
        var sommaire = document.createElement('div');
        sommaire.id = "sommaire"+idPub;
        pub.appendChild(sommaire);
        
        sommaire.innerHTML = "<div style='color:#575757; text-align:center; font-size:20px; padding-top:20px;padding-bottom:20px;'>Catalogue</div>";
        sommaire.innerHTML += "<table";

        for(var i = 0; i < majs.majs.length; i++)
        {
            var maj = document.createElement('div');
            maj.id = 'page_'+i+idPub;

            var auth = localStorage.getItem('SIF_'+majs.majs[i][0]);
            if(auth!=null && auth=="on") 
            {  
                maj.innerHTML = "<span id='maj_"+i+"_nom"+idPub+"' style='color:#575757; font-size:12px;  text-decoration: underline;'>"+majs.majs[i][0]+"</span> <span style='position: absolute; left:50%; color:#575757; font-size:12px;'><span id='maj_"+i+"_tarif"+idPub+"' style='color:#575757; font-size:12px;'>1</span> Cr</span> <span id='maj_"+i+"_buy"+idPub+"' class='link' style='position: absolute; left:70%; color:#575757; font-size:12px;'>Possédé</span> <span id='maj_"+i+"_details"+idPub+"' class='link'  style='position: absolute; left:85%; color:#575757; font-size:12px;'>Détails</span></span>";
                maj.style = 'color:#575757; font-size:12px; padding-top:15px; ';
                sommaire.appendChild(maj);
            }
            else
            {
               maj.innerHTML = "<span id='maj_"+i+"_nom"+idPub+"' style='color:#FFF; font-size:12px;  text-decoration: underline;'>"+majs.majs[i][0]+"</span> <span style='position: absolute; left:50%; color:#FFF; font-size:12px;'><span id='maj_"+i+"_tarif"+idPub+"' style='color:#FFF; font-size:12px;'>"+majs.majs[i][1]+"</span> Cr</span> <span id='maj_"+i+"_buy"+idPub+"' class='link' style='position: absolute; left:70%; color:#FFF; font-size:12px;'>Acheter</span> <span id='maj_"+i+"_details"+idPub+"' class='link'  style='position: absolute; left:85%; color:#FFF; font-size:12px;'>Détails</span></span>";
               maj.style = 'color:#FFF; font-size:12px; padding-top:15px; ';
               sommaire.appendChild(maj);
            }
           
            maj.innerHTML += "<div id='maj_"+i+"_detailsText"+idPub+"' style='display : none; font-size:10px; margin : 10px 10%; color : #FFF;'>"+ majs.majs[i][3] +" </div>";
            
               var buy = document.getElementById('maj_'+i+'_buy'+idPub);
                buy.onclick= function(arg) {
                   return function() {
                      transfert(arg);
                   }
                }(i);
            var detail = document.getElementById('maj_'+i+'_details'+idPub);
            detail.onclick= function(arg) {
               return function() {
                   
                   if(majs.majs[arg][3].indexOf('meuble_') == 0) {
                       $.ajaxSetup({async: false});
                       engine.updateBuildingInfos("meuble", majs.majs[arg][3], "#carte #cadre_position");
                       $.ajaxSetup({async: true});

                       var idmeuble = majs.majs[arg][3];
                       idmeuble = idmeuble.substring((majs.majs[arg][3]).lastIndexOf("_")+1);
                       $("#db_panneau_"+idmeuble).css('width','');
                       $("#db_panneau_"+idmeuble+ " .content").css('height','');
                       $("#db_panneau_"+idmeuble+ " .content div").css('height','');
                   }
                   else
                   {
                       $('#maj_'+arg+'_detailsText'+idPub).toggle();    
                       if($('#maj_'+arg+'_detailsText'+idPub).css('display') == "block")
                           $('#maj_'+arg+'_details'+idPub).css('color','#AF5D00');
                       else
                           $('#maj_'+arg+'_details'+idPub).css('color','#575757');
                   }
               }
            }(i);            
        }
    }
}

function sell(majNum)
{
    var nomMAJ = majs.majs[majNum][0];
    prompt('Merci pour votre confiance et votre achat de : ' + nomMAJ+'\n\n'+'Voici le lien de votre maj, conservez le : ' + majs.majs[majNum][2] + '\n (Le lien va s\'ouvrir automatiquement une fois que tu as cliqué sur ok mais parfois le site d\'hébergement du script bug donc sauvegarde le lien quelques part pour retenter plus tard le cas échant.) \n Si c\'est le premier script que tu installes, consulte avant de cliquer sur ok ceci : http://www.dreadcast.net/Forum/2-19414-irc-links-et-script?15#283', majs.majs[majNum][2]);

    localStorage.setItem('SIF_'+nomMAJ,'on');    
    
    window.open(majs.majs[majNum][2]);
}


function transfert(majNum)
{
    var montantATransferer = majs.majs[majNum][1];
    var auth = localStorage.getItem('SIF_'+majs.majs[majNum][0]);
    if(auth!=null && auth=="on") 
        montantATransferer=1;
    
    var nomMAJ = majs.majs[majNum][0];
    if(montantATransferer == 0)
        sell(majNum);
    else
    {
        $.post('https://www.dreadcast.eu/Group/Transfert', {
            montant: montantATransferer,
            id: -1,
            type: 3
        }, function (xml) {
            if (xml_result(xml)) {
                engine.useAjaxReturn(xml);
                sell(majNum);
            } else {
                engine.useAjaxReturn(xml);
            }
        }); 
    }
}

(function() {         
    if(typeof localStorage!='undefined') {
        getMajs();
       var myVar = setInterval(function(){checkSalle()},10000);
    }
    else 
        alert("Désolé vous ne pouvez vous procurez vos mises à jour via cette borne (script), votre deck (navigateur) n'est pas compatible. Veuillez contacter Odul.");
})();


function getMajs()
{
    $.ajax({
        type: 'GET',
        url: "https://docs.google.com/uc?export=download&id=0B4Igp0h82K3yTnU5Um9oZDIxMlU",
        async: false,
        jsonpCallback: 'jsonCallbackMajs_0',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            majs = json;
        },
        error: function(e) {
           console.log(e.message);
        }
    });
}