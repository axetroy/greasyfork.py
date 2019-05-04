// ==UserScript==
// @name         ShurParalelo
// @namespace    
// @version      1.0
// @description  Filtro de hilos para ForoParalelo
// @author       Leg-ion
// @match        http://foroparalelo.com/general*
// @grant        none
// @require 	 http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function() {
    
    var filtropalabras = [];
    var filtropalabrasdestacadas = [];
    var filtroautores = [];
    var filtroautoresdestacados = ['Watermeloncillo'];
    
    
    
    
    
    
    
    
    
    
    
    var hilosocultos = 0;
    $("#above_threadlist").after("<div id='ocultos'></div>");
    var hilos = document.getElementById("threads").getElementsByClassName("threadbit");
    for(var i = 0; i < hilos.length; i++)
    {
        var hilooculto = false;
        var title = hilos[i].getElementsByClassName("threadinfo")[0].title;
        hilos[i].getElementsByClassName("threadinfo")[0].title = ""; //Eliminar hover
        hilos[i].getElementsByClassName("title")[0].title = title; //Pasar title al enlace
        var titulo = hilos[i].getElementsByClassName("title")[0].innerHTML.toLowerCase();
        var nombreautor = hilos[i].getElementsByClassName("username")[0].innerHTML;
        var urlautor = hilos[i].getElementsByClassName("username")[0].href;
        //Palabras
        for (var j = 0; j < filtropalabras.length; j++)
        {
            var pos = titulo.indexOf(filtropalabras[j].toLowerCase());
            if (pos!=-1)
        	{
                hilos[i].style.display = "none";
                $("#ocultos").append("<span><a href='"+hilos[i].querySelector('[id^="thread_title"]')+"'>"+
                                     hilos[i].querySelector('[id^="thread_title"]').innerHTML.substr(0,pos)+"<b><strike>"+
                                     hilos[i].querySelector('[id^="thread_title"]').innerHTML.substr(pos,filtropalabras[j].length)+"</b></strike>"+
                                     hilos[i].querySelector('[id^="thread_title"]').innerHTML.substr(pos+filtropalabras[j].length)+"</a>"+
                                     " - <a class='autor' href='"+urlautor+
                                     "'><i>"+nombreautor+"</i></a></span>");
                hilosocultos++;
                hilooculto = true;
                break;
            }
        }
        if (!hilooculto)
        {
            //Autores
            for (var k = 0; k < filtroautores.length; k++)
            {
                if (nombreautor==filtroautores[k])
                {
                    hilos[i].style.display = "none";
                    $("#ocultos").append("<span><a href='"+hilos[i].querySelector('[id^="thread_title"]')+"'>"+
                                         hilos[i].querySelector('[id^="thread_title"]').innerHTML+"</a>"+
                                         " - <a class='autor' href='"+urlautor+
                                         "'><b><strike><i>"+nombreautor+"</i></strike></b></a></span>");
                    hilosocultos++;
                    break;
                }
            }
            //Autores destacados
            for (var l = 0; l < filtroautoresdestacados.length; l++)
            {
                if (nombreautor==filtroautoresdestacados[l])
                {
                    hilos[i].getElementsByClassName("threadinfo")[0].style.textAlign = "center";
                    break;
                }
            }
            //Palabras destacadas
            for (var m = 0; m < filtropalabrasdestacadas.length; m++)
            {
                var pos2 = titulo.indexOf(filtropalabrasdestacadas[m].toLowerCase());
                if (pos2!=-1)
                {
                    hilos[i].style.textAlign = "center";
                    break;
                }
            }
        }
    }
    var visible = false;
    $("#ocultos").prepend("<div id='titulohilosocultos'><span class='big'>"+hilosocultos+" hilos ocultos</span> <span class='small'>(Click para mostrar)</span></div>");

    $("#titulohilosocultos").click(function(){
        if (!visible)
        {
            //$("#ocultos").children("a").css({"float":"left","display":"block","clear":"both"});
            $("#ocultos").children("span").css({"float":"left","display":"block","clear":"both"});
            visible = true;
            $("#ocultos").children("div").children("span.small").html("(Click para ocultar)");
            $("#ocultos").children("div").css({"border-bottom":"thin solid black"});
        }
        else
        {
            //$("#ocultos").children("a").css({"display":"none"});
            $("#ocultos").children("span").css({"display":"none"});
            visible = false;
            $("#ocultos").children("div").children("span.small").html("(Click para mostrar)");
            $("#ocultos").children("div").css({"border-bottom":"none"});
        }
	});

    //CSS
    document.getElementById("above_threadlist").getElementsByClassName("threadpagenav")[0].style.bottom = "inherit";
    $("#ocultos").css({"border":"2px solid #2c2c2c","min-height":"20px","overflow":"hidden"});
    $("#ocultos").children("div").children("span.big").css({"font-size":"22px","font-weight":"bold"});
    $("#ocultos").children("div").children("span.small").css({"font-size":"10px"});
    $("#ocultos").children("span").css({"display":"none","margin":"2px 10px"});
    $("#ocultos").children("span").children("a.autor").css({"text-decoration":"none","cursor":"pointer"});
    $("#titulohilosocultos").css({"padding":"10px 20px"});

    $("#titulohilosocultos").hover(function(){
  		$("#titulohilosocultos").css("cursor","pointer");
  	});
})();