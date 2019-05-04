// ==UserScript==
// @name         Taringa! Binary Converter
// @namespace    http://www.taringa.net/redeven
// @version      1.3
// @description  Convierte código binario en texto automáticamente ^_^
// @author       Redeven
// @include      http*://*.taringa.net/*
// @grant        none
// @copyright    2019+, Redeven
// ==/UserScript==

(function() {
    'use strict';

    // Por si alguien quiere afanar código o ver lo que hace, dejo explicado todo... masomenos...
    // Si herni lee esto, contratame, soy ingenioso, soy pobre, no shouteo lolis y cobro poco.

    function convertBinary(){
        // Por cada <div> con la clase 'comment-content' (es... el contenido del comentario...)
        $('.comment-content').each(function() {

            // Guarda todo el HTML del comentario en una variable
            var comment = $(this).html();

            // Placeholder para el comentario
            var commentFinal = comment;

            // Busca todas las veces que se repita un patrón de 0 y 1 ocho veces seguidas (un binario, quién lo diría) y lo guarda en un Array
            var binaries = comment.match(/[0-1]{8}/g);

            // Comprueba que se haya declarado 'binaries' y tenga al menos un resultado
            if (binaries && binaries.length)
            {
                // Dificil de explicar, resumen nivel 5 es que corto en 3 el comentario para reemplazar los espacios (si hubiere) del binario convertido
                var startIndex = comment.indexOf(binaries[0]);
                var endLength = comment.lastIndexOf(binaries[binaries.length-1]) + binaries[binaries.length-1].length - startIndex;
                var binaryFull = comment.substr(startIndex, endLength).replace(/ /g, "");
                var prologue = comment.substr(0, startIndex);
                var epilogue = comment.substr(prologue.length + comment.substr(startIndex, endLength).length);

                // Por cada binario encontrado...
                binaries.forEach(function(entry) {

                    // Convierte el número binario a un caracter
                    var decodedChar = String.fromCharCode(parseInt(entry, 2));

                    // Reemplaza el número binario en el comentario por el caracter convertido
                    binaryFull = binaryFull.replace(entry, decodedChar);
                    commentFinal = prologue + '<span style="background-color:yellow">' + binaryFull + '</span>' + epilogue;
                });
            }

            // Reemplaza todo el HTML dentro del <div> del comentario, con la versión decodificada
            $(this).html(commentFinal);
        });
    }

    // Ejecuta la función en cuanto carga la página
    $(document).load(convertBinary());

    // Ejecuta la función cuando se cargan más comentarios al scrollear
    $(document).ajaxSuccess(function() {
        convertBinary();
    });

})();