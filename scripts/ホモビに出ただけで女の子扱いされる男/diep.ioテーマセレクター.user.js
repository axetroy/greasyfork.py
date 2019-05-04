// ==UserScript==
// @name         diep.ioテーマセレクター
// @author       ゲームハック研究所共同開発
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      1.41421356237
// @description  diep.ioのテーマを変えられる。　①[v]で初期化　②[b]でネオン　③[n]でダーク
// @match        http://diep.io/
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    function Reset_Theme(){//コンソールの初期化
        input.execute("ui_replace_colors 0x66EAE6 0x92EA66 0xEA6666 0xE7D063 0x6690EA 0x9566EA 0xE666EA 0xE8B18A");
        input.execute("net_replace_color 0 0x555555");
        input.execute("net_replace_color 1 0x999999");
        input.execute("net_replace_color 2 0x00B2E1");
        input.execute("net_replace_color 3 0x00B1DE");
        input.execute("net_replace_color 4 0xF14E54");
        input.execute("net_replace_color 5 0xBE7FF5");
        input.execute("net_replace_color 6 0x00F46C");
        input.execute("net_replace_color 7 0x8AFF69");
        input.execute("net_replace_color 8 0xFFE869");
        input.execute("net_replace_color 9 0xFC7677");
        input.execute("net_replace_color 10 0x768BFC");
        input.execute("net_replace_color 11 0xFF77DC");
        input.execute("net_replace_color 12 0xFFE869");
        input.execute("net_replace_color 13 0x44FFA0");
        input.execute("net_replace_color 14 0xBBBBBB");
        input.execute("net_replace_color 15 0xF14E54");
        input.execute("net_replace_color 16 0xfcc276");
        input.execute("net_replace_color 17 0xC0C0C0");
        input.set_convar("ren_background_color",13487565);
        input.set_convar("ren_bar_background_color", 0);
        input.set_convar("ren_border_color",0);
        input.set_convar("ren_border_color_alpha",0.100000);
        input.set_convar("ren_cache_grid",true);
        input.set_convar("ren_changelog",true);
        input.set_convar("ren_fps",false);
        input.set_convar("ren_grid_base_alpha", 0.100000);
        input.set_convar("ren_grid_color",0);
        input.set_convar("ren_health_background_color",5592405);
        input.set_convar("ren_health_bars", true);
        input.set_convar("ren_health_fill_color",0x85E37D);
        input.set_convar("ren_health_color",  8774525);
        input.set_convar("ren_minimap_background_color",0xCDCDCD);
        input.set_convar("ren_minimap_border_color",0x555555);
        input.set_convar("ren_minimap_viewport",false);
        input.set_convar("ren_pattern_grid",true);
        input.set_convar("ren_raw_health_values",false);
        input.set_convar("ren_score_bar_fill_color", 4456337);
        input.set_convar("ren_scoreboard", true);
        input.set_convar("ren_scoreboard_names", true);
        input.set_convar("ren_solid_background", false);
        input.set_convar("ren_stats", true);
        input.set_convar("ren_stroke_soft_color ", true);
        input.set_convar("ren_stroke_soft_color_intensity",0.250000);
        input.set_convar("ren_stroke_solid_color",5592405);
        input.set_convar("ren_ui", true);
        input.set_convar("ren_ui_scale",1.000000);
        input.set_convar("ren_upgrades" ,true);
        input.set_convar("ren_xp_bar_fill_color",16768579);
    };
    window.addEventListener("keydown",function(event) {//W,A,S,D,E,C,Y,M,U,H,L,O,1,2,3,4,5,6,7,8,\,:,SPACEはdiep.ioで使用
  switch (event.key) {
    case "v"://コンソールの初期化
        Reset_Theme();
    break;
    case "b"://ネオンのテーマ
         Reset_Theme();
        input.execute("net_replace_colors 986895 986895 4375 4375 1310720 590867 4634 857344 1315840 1508870 3350 1443095 1315840 28496 1315860 1310720 1445891 855309 0");
        input.execute("ui_replace_colors 0x1B5B52 0x385D22 0x6B2626 0x6A5F2E 0x2E3B6A 0x4E2F6A 0x7C3463 0x775334");
        input.set_convar("ren_stroke_soft_color_intensity",-10);
        input.set_convar("ren_border_color_alpha",0.5);
        input.set_convar("ren_background_color",0);
        input.set_convar("ren_pattern_grid",false);
        input.set_convar("ren_grid_color",1118481);
        input.set_convar("ren_grid_base_alpha",2);
        input.set_convar("ren_minimap_background_color",3289650);
        input.set_convar("ren_border_color",986895);
        input.set_convar("ren_score_bar_fill_color",28496);
        input.set_convar("ren_xp_bar_fill_color",5854988);
    break;
    case "n"://ダークテーマ
          Reset_Theme();
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
        input.set_convar("ren_fps",true);
        input.set_convar("ren_grid_color",16777215);
        input.set_convar("ren_health_background_color",2829099);
        input.set_convar("ren_health_fill_color",16769917);
        input.set_convar("ren_minimap_background_color",3289650);
        input.set_convar("ren_minimap_border_color",11184810);
        input.set_convar("ren_minimap_viewport",true);
        input.set_convar("ren_score_bar_fill_color",16748867);
        input.set_convar("ren_stroke_soft_color_intensity",0.500000);
        input.set_convar("ren_xp_bar_fill_color",16720195);
    break;
    case "spare"://予備
          Reset_Theme();
          //ここに書く
    break;
    }
    });
})();