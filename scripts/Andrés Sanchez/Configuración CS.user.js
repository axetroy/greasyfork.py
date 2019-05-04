// ==UserScript==
// @name         Configuración CS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://toolprojectcs.colombiasoftware.net/index.php?page=Requerimiento.Helpdesk.VisorHelpdesk
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    if(window.location.href == 'https://toolprojectcs.colombiasoftware.net/index.php?page=Requerimiento.Helpdesk.VisorHelpdesk'){
        /* OCULTAR CASOS ESPERANDO RESPUESTA CLIENTE, ESPERANDO CONFIRMACIÓN */
        setTimeout(function(){
            var tds = document.getElementsByTagName("td");
            for (var i=0; i<tds.length; i++){

                if( (tds[i].style.backgroundColor == 'rgb(153, 204, 51)')  ||
                    (tds[i].style.backgroundColor == 'rgb(255, 255, 102)') ||
                    (tds[i].style.backgroundColor == 'rgb(247, 74, 22)')
                  ){
                    tds[i].parentElement.style.display = 'none';

                    var tabla = tds[i].parentElement.parentElement.parentElement;



                    for (var j = 0; j < tabla.rows.length; j++) {
                        tabla.rows[j].cells[2].style.display = 'none';
                        tabla.rows[j].cells[3].style.display = 'none';
                        tabla.rows[j].cells[4].style.display = 'none';
                        tabla.rows[j].cells[9].style.display = 'none';
                        tabla.rows[j].cells[11].style.display = 'none';
                    }
                }
            }
        }, 10000);

        /* RECARGAR EL VISOR CADA 10 MINUTOS */
        setTimeout(function(){
            location.reload(true)
        }, 600000);
    }
 });