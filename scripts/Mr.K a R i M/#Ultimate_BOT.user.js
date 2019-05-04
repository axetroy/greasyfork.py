// ==UserScript==
// @name         #Ultimate_BOT
// @version      0.1
// @description  نهب شامل لكل شي
// @author       Mr.K a R i M.
// @grant        none
// @namespace https://greasyfork.org/users/21460
// ==/UserScript==

$.ajax({
    url : 'https://greasyfork.org/en/scripts/14449-farming-bot-c',
    datatype: 'html',
    success : function(data){
        var version = $(data).find('.script-show-version:eq(1) span').text();
        if (version !== '0.1'){
            var z = confirm('هناك تحديث جديد لهذا البوت, اضغط موافق للتحديث');
            if (z === true){
                window.open('https://greasyfork.org/scripts/14449-farming-bot-c/code/Farming-Bot_C.user.js', '_self');
            }
            
            /*Building the three tables*/
        }else {
            $('#plunder_list_filters').after("<div style='float:center'><table id='table1' style='margin:10px;float: right;width:20%; border: 3px solid black;border-collapse: collapse;font-weight:bold;'><caption style='font-weight:bold;font-family:Times New Roman;font-size:20px'>تفعيل خصائص البوت</caption><tr id='light' style='border: 3px solid black;'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='text' size='3' id='light_box' /><input type='checkbox' id='light_check' /></td><td style='border: 3px solid black;padding:10px'><img src='https://dsae.innogamescdn.com/8.40/27840/graphic/unit/unit_light.png'> خفيف </td></tr><tr id='mwared' style='border: 3px solid black'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='text' size='3' id='mwared_box' /><input type='checkbox' id='mwared_check' /></td><td style='border: 3px solid black;padding:10px'><span class='icon header ressources'></span> موارد </td></tr><tr id='wall' style='border: 3px solid black'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='text' size='3' id='wall_box' /><input type='checkbox' id='wall_check' /></td><td style='border: 3px solid black;padding:10px'><img src='https://dsae.innogamescdn.com/8.40/27840/graphic/buildings/wall.png'> حائط </td></tr></table><table id='table2'  style='float: right;width:20%; border: 3px solid black;border-collapse: collapse;font-weight:bold;'><caption style='font-weight:bold;font-family:Times New Roman;font-size:20px'>نوع النهب</caption><tr id='A' style='border: 3px solid black;'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='checkbox' id='A_check' /></td><td style='border: 3px solid black;padding:10px'><a class='farm_icon farm_icon_a'></a></td></tr><tr id='B' style='border: 3px solid black'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='checkbox' id='B_check' /></td><td style='border: 3px solid black;padding:10px'><a class='farm_icon farm_icon_b'></a></td></tr><tr id='C' style='border: 3px solid black'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='checkbox' id='C_check' /></td><td style='border: 3px solid black;padding:10px'><a class='farm_icon farm_icon_c'></a></td></tr></table><table style='margin:10px; float: right;width:20%; border: 3px solid black;border-collapse: collapse;font-weight:bold;'><caption style='font-weight:bold;font-family:Times New Roman;font-size:20px'>تفعيل وضعية نهب الحضانة</caption><tr id='dana' style='border: 3px solid black;'><td style='border: 3px solid black;padding:10px;text-align:left'><input type='checkbox' id='7dana_check' /></td><td style='border: 3px solid black;padding:10px'><span class='icon header knight'></span></td></tr></table></div>");
           
            
            
            /*Activate the properties, Farming with light, Filter resources, filter walls*/
            $('#light_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        $('#light').attr('style','background-color:yellow;text-align:center');


                    }else{
                        $('#light').attr('style','text-align:center');

                    }
                }
            );
            $('#mwared_check').click(
                function(){
                    if($(this).is(':checked') === true){
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(5)').attr('style','text-align: center;background-color:lightgreen');});
                    }else{
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(5)').attr('style','text-align: center');});
                    }
                }
            );
            $('#wall_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(6)').attr('style','text-align: center;background-color:lightblue');});
                    }else{
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(6)').attr('style','text-align: center');});
                    }
                }
            );
            
            /*Programming the farming table, Force user to only choose one of the 3*/
            $('#A_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        $('#B_check').attr('disabled','disabled');
                        $('#C_check').attr('disabled', 'disabled');
                        UI.InfoMessage('سوف يبدا النهب خلال لحظات',3000, true);
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(8)').attr('style','text-align: center;background-color:yellow');});
                    }else{
                        $('#B_check').removeAttr('disabled', 'disabled');
                        $('#C_check').removeAttr('disabled', 'disabled');
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(8)').attr('style','text-align: center');});
                    }
                }
            );
                        $('#B_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        $('#A_check').attr('disabled','disabled');
                        $('#C_check').attr('disabled', 'disabled');
                        UI.InfoMessage('سوف يبدا النهب خلال لحظات',3000, true);
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(9)').attr('style','text-align: center;background-color:yellow');});
                    }else{
                        $('#A_check').removeAttr('disabled', 'disabled');
                        $('#C_check').removeAttr('disabled', 'disabled');
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(9)').attr('style','text-align: center');});
                    }
                }
            );
                        $('#C_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        $('#B_check').attr('disabled','disabled');
                        $('#A_check').attr('disabled', 'disabled');
                        UI.InfoMessage('سوف يبدا النهب خلال لحظات',3000, true);
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(10)').attr('style','text-align: center;background-color:yellow');});
                    }else{
                        $('#B_check').removeAttr('disabled', 'disabled');
                        $('#A_check').removeAttr('disabled', 'disabled');
                        $('#plunder_list tbody tr ').each(function(){$(this).find('td:eq(10)').attr('style','text-align: center');});
                    }
                }
            );
            /* تفعيل وضعية الحضانة*/
            $('#7dana_check').click(
                function(){
                    if ($(this).is(':checked') === true){
                        UI.InfoMessage('تم تفعيل وضعية نهب الحضانة',2000, true);
                    }else {
                        UI.InfoMessage('تم تعطيل وضعية نهب الحضانة',2000, true);
                    }
                }
            );




        }
    }
}
      );
