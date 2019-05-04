// ==UserScript==
// @name         Diep2.io Light Theme for Diep.io (BETA)
// @version      0.1.1
// @description  Will change the color of Diep.io like Diep2.io!
// @author       Mixaz017
// @match        diep.io/
// @namespace https://greasyfork.org/users/158176
// ==/UserScript==
var setColor=setInterval(()=>{
    if(document.getElementById("loading").innerText===""){
        input.execute("net_replace_color 0 4737096");
        input.execute("net_replace_color 1 10987439");
        input.execute("net_replace_color 2 3974347");
        input.execute("net_replace_color 3 3974347");
        input.execute("net_replace_color 4 14761537");
        input.execute("net_replace_color 5 13461149");
        input.execute("net_replace_color 6 9092159");
        input.execute("net_replace_color 8 15714123");
        input.execute("net_replace_color 9 15173997");
        input.execute("net_replace_color 10 9267935");
        input.execute("net_replace_color 11 15702467");
        input.execute("net_replace_color 13 9092159");
        input.execute("net_replace_color 14 10987439");
        input.execute("net_replace_color 15 14696001");
        input.execute("ui_replace_colors 3974347 12183678 14696001 16642944");
        input.set_convar("ren_background_color",14408667);
        input.set_convar("ren_bar_background_color",10987439);
        input.set_convar("ren_grid_base_alpha",1);
        input.set_convar("ren_grid_color",10987439);
        input.set_convar("ren_health_background_color",4737096);
        input.set_convar("ren_health_fill_color",12183678);
        input.set_convar("ren_minimap_background_color",12499903);
        input.set_convar("ren_minimap_border_color",4737096);
        input.set_convar("ren_score_bar_fill_color",9092159);
        input.set_convar("ren_xp_bar_fill_color",15714123);
        clearInterval(setColor);
    }
},1000);