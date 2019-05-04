// ==UserScript==
// @name         Diep.io Dark Theme ver.Mixaz017
// @version      1.7.1
// @description  Change the setting of Diep.io to the original setting of Mixaz017.
// @author       Mixaz017
// @match        diep.io/
// @namespace    https://greasyfork.org/users/158176
// ==/UserScript==
var setColor=setInterval(()=>{
    if(document.getElementById("loading").innerText===""){
        input.execute("net_replace_color 0 12040119");
        input.execute("net_replace_color 1 6710886");
        input.execute("net_replace_color 2 16731422");
        input.execute("net_replace_color 13 16748867");
        input.execute("net_replace_color 14 14540253");
        input.execute("net_replace_color 15 15856113");
        input.execute("net_replace_color 16 8273014");
        input.set_convar("ren_background_color",3289650);
        input.set_convar("ren_bar_background_color",16777215);
        input.set_convar("ren_border_color",8421504);
        input.set_convar("ren_grid_color",16777215);
        input.set_convar("ren_health_background_color",2829099);
        input.set_convar("ren_health_fill_color",16769917);
        input.set_convar("ren_minimap_background_color",3289650);
        input.set_convar("ren_minimap_border_color",11184810);
        input.set_convar("ren_score_bar_fill_color",16748867);
        input.set_convar("ren_stroke_soft_color_intensity",0.500000);
        input.set_convar("ren_xp_bar_fill_color",16720195);
        clearInterval(setColor);
    }
},1000);