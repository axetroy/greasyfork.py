// ==UserScript==
// @name                التطوير التلقائي
// @namespace           @@marcosvinicius.santosmarques
// @icon                http://sowargif.com/wp-content/uploads/2017/08/sa1%20(11).gif
// @website             https://tribalwarsbr100.wixsite.com/tw100
// @email               tribalwarsbr100@gmail.com
// @description 	    script construtor para game tribalwars, realiza upagem “Upar” dos edifícios do game, script realiza a atividade em formato inicial resolvendo as Quest do game, e após o término das Quest o script realiza upagem de acordo com perfil pré definido pelo autor do script. (mas pode ser modificado a alteração de como e feito a upagem, pelo próprio usuário.
// @codigo              Conteudo feito em linguagem javascript com base em EcmaScript totalmente Opensource
// @author		        Marcos v.s Marques
// @include             https://*screen=main*
// @version     	    0.0.1
// @supportURL          https://github.com/tribalwarsbr100/Upador-Tribal-Wars/issues
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// @intruções           https://docs.google.com/document/d/1jKXijn_H8QJjFJoVQEBpJ54w583P88OVV23czW3mFBo
// ==/UserScript==


/*##############################################

Initial Logic of Programming obtained through a tutorial
       Named "The First 5 Days - Rookie Mode"
               Images of the Same
                  Authors: senson

https://forum.tribalwars.com.br/index.php?threads/os-5-primeiros-dias-modo-novato.334845/#post-3677800

##############################################*/


//*************************** التهيئة ***************************//
// اختر الحد الأدنى والحد الأقصى للمهلة بين الإجراءات (بالمللي ثانية)
const Min_Time_Wait= 780000;
const Max_Time_Wait = 900000;

// Step_1: Upar The bot automatically in Series Buildings
const Step = "Step_1";

// Choose whether you want the bot to queue buildings in the order they are set (= true) or
// once a building is available for the build queue (= false)

const Construction_Buildings_Order = false;


//*************************** /التهيئة ***************************//

// Constants (NOT TO BE CHANGED)
const General_Preview = "OVERVIEW_VIEW";
const Main_building = "HEADQUARTERS_VIEW";

(function() {
    'use strict';

    console.log("-- Tribal Wars script activated --");

    if (Step == "Step_1"){
        runStep1();
    }

})();

    // Step 1: Construction البناء
function runStep1(){
    let Evolve_villages = getEvolve_villages();
    console.log(Evolve_villages);
    if (Evolve_villages == Main_building){
        setInterval(function(){
    // build any cost-bearing building, if possible
            Next_Construction();
        }, 1000);
    }
    else if (Evolve_villages == General_Preview){
    // General View PG
        document.getElementById("l_main").children[0].children[0].click();
    }

}



    let delay = Math.floor(Math.random() * (Max_Time_Wait - Max_Time_Wait) + Min_Time_Wait);

	// Action of the case
    let Evolve_villages = getEvolve_villages();
    console.log(Evolve_villages);
    setTimeout(function(){
        if (Evolve_villages == Main_building){

	// build any cost-bearing building, if possible
            Next_Construction();

        }
        else if (Evolve_villages == General_Preview){
            // General View Profile
            document.getElementById("l_main").children[0].children[0].click();

        }
    }, delay);

function getEvolve_villages(){
    let currentUrl = window.location.href;
    if (currentUrl.endsWith('View Profile')){
        return General_Preview;
    }
    else if (currentUrl.endsWith('main')){
        return Main_building;
    }
}

function Next_Construction(){
    let Construction_next_building = getConstruction_next_building();
    if (Construction_next_building !== undefined){
        Construction_next_building.click();
        console.log("Clicked on " + Construction_next_building);
    }
}

function getConstruction_next_building() {
    let Click_Up_Buildings = document.getElementsByClassName("btn btn-build");
    let Building_of_Series_Buildings = getBuilding_of_Series_Buildings();
    let instituir;
    while(instituir === undefined && Building_of_Series_Buildings.length > 0){
        var next_b = Building_of_Series_Buildings.shift();
        if (Click_Up_Buildings.hasOwnProperty(next_b)){
            let next_building = document.getElementById(next_b);
            var Visivel = next_building.offsetWidth > 0 || next_building.offsetHeight > 0;
            if (Visivel){
                instituir = next_building;
            }
            if (Construction_Buildings_Order){
                break;
            }
        }
    }
    return instituir;
}

function getBuilding_of_Series_Buildings() {
    var Sequence_Construction = [];

    // المباني الرئيسية كما هو مبين: https://i.imgur.com/jPuHuHN.png

//*************************** QUEST ***************************//
    // تطوير الخشاب  1
    Sequence_Construction.push("main_buildlink_wood_1");
    // تطوير حفرة الطمي 1
    Sequence_Construction.push("main_buildlink_stone_1");
    // تطوير منجم الحديد 1
    Sequence_Construction.push("main_buildlink_iron_1");
    // تطوير الخشاب  2
    Sequence_Construction.push("main_buildlink_wood_2");
    // تطوير حفرة الطمي 2
    Sequence_Construction.push("main_buildlink_stone_2");
    // تطوير المبنى الرئيسي 2
    Sequence_Construction.push("main_buildlink_main_2");
    // تطوير المبنى الرئيسي 3
    Sequence_Construction.push("main_buildlink_main_3");
    // تطوير الثكنات 1
    Sequence_Construction.push("main_buildlink_barracks_1");
    // تطوير الخشاب  3
    Sequence_Construction.push("main_buildlink_wood_3");
    // تطوير حفرة الطمي 3
    Sequence_Construction.push("main_buildlink_stone_3");
    // تطوير الثكنات 2
    Sequence_Construction.push("main_buildlink_barracks_2");

//------------- الهجوم على القرى البربرية ------------------//

    // تطوير المخازن 2
    Sequence_Construction.push("main_buildlink_storage_2");
    // تطوير منجم الحديد 2
    Sequence_Construction.push("main_buildlink_iron_2");
    // تطوير المخازن 3
    Sequence_Construction.push("main_buildlink_storage_3");

//---------------- تجنيد أبو رمح -----------------//

    // تطوير الثكنات 3
    Sequence_Construction.push("main_buildlink_barracks_3");
    // تطوير النصب التذكاري 1
    Sequence_Construction.push("main_buildlink_statue_1");
    // تطوير المزارع 2
    Sequence_Construction.push("main_buildlink_farm_2");
    // تطوير منجم الحديد 3
    Sequence_Construction.push("main_buildlink_iron_3");
    // تطوير المبنى الرئيسي 4
    Sequence_Construction.push("main_buildlink_main_4");
    // تطوير المبنى الرئيسي 5
    Sequence_Construction.push("main_buildlink_main_5");
    // تطوير الحداد 1
    Sequence_Construction.push("main_buildlink_smith_1");
    // تطوير الخشاب  4
    Sequence_Construction.push("main_buildlink_wood_4");
    // تطوير حفرة الطمي 4
    Sequence_Construction.push("main_buildlink_stone_4");

    //---------------- Recruit Paladin - Select Flag  وضع العلم ------------------//

    // تطوير الحائط 1
    Sequence_Construction.push("main_buildlink_wall_1");
    // تطوير المخابئ  2
    Sequence_Construction.push("main_buildlink_hide_2");
    // تطوير المخابئ  3
    Sequence_Construction.push("main_buildlink_hide_3");
     // تطوير الخشاب  5
    Sequence_Construction.push("main_buildlink_wood_5");
    // تطوير حفرة الطمي 5
    Sequence_Construction.push("main_buildlink_stone_5");

	 //---------------- المبنى الرئيسي ------------------//
	// تطوير المبنى الرئيسي 6
    Sequence_Construction.push("main_buildlink_main_6");
    // تطوير المبنى الرئيسي 7
    Sequence_Construction.push("main_buildlink_main_7");
    // تطوير الثكنات 4
    Sequence_Construction.push("main_buildlink_barracks_4");
    // تطوير الثكنات 5
    Sequence_Construction.push("main_buildlink_barracks_5");


   // تطوير السوق 1
    Sequence_Construction.push("main_buildlink_market_1");
    // تطوير الخشاب  6
    Sequence_Construction.push("main_buildlink_wood_6");
    // تطوير حفرة الطمي 6
    Sequence_Construction.push("main_buildlink_stone_6");
    // تطوير الخشاب  7
    Sequence_Construction.push("main_buildlink_wood_7");
    // تطوير حفرة الطمي 7
    Sequence_Construction.push("main_buildlink_stone_7");
    // تطوير منجم الحديد 4
    Sequence_Construction.push("main_buildlink_iron_4");
    // تطوير منجم الحديد 5
    Sequence_Construction.push("main_buildlink_iron_5");
    // تطوير منجم الحديد 6
    Sequence_Construction.push("main_buildlink_iron_6");
    // تطوير الخشاب  8
    Sequence_Construction.push("main_buildlink_wood_8");
    // تطوير حفرة الطمي 8
    Sequence_Construction.push("main_buildlink_stone_8");
    // تطوير منجم الحديد 7
    Sequence_Construction.push("main_buildlink_iron_7");
     // تطوير الخشاب  9
    Sequence_Construction.push("main_buildlink_wood_9");
    // تطوير حفرة الطمي 9
    Sequence_Construction.push("main_buildlink_stone_9");
       // تطوير الخشاب  10
    Sequence_Construction.push("main_buildlink_wood_10");
    // تطوير حفرة الطمي 10
    Sequence_Construction.push("main_buildlink_stone_10");

//---------------- https://image.prntscr.com/image/oMwaEPpCR2_1XaHzlMaobg.png -  -----------------//

     // تطوير الخشاب  11
    Sequence_Construction.push("main_buildlink_wood_11");
    // تطوير حفرة الطمي 11
    Sequence_Construction.push("main_buildlink_stone_11");
     // تطوير الخشاب  12
    Sequence_Construction.push("main_buildlink_wood_12");
    // تطوير حفرة الطمي 12
    Sequence_Construction.push("main_buildlink_stone_12");
    // تطوير المخازن 7
    Sequence_Construction.push("main_buildlink_storage_7");
    // تطوير منجم الحديد 8
    Sequence_Construction.push("main_buildlink_iron_8");
     // تطوير المخازن 8
    Sequence_Construction.push("main_buildlink_storage_8");
    // تطوير منجم الحديد 9
    Sequence_Construction.push("main_buildlink_iron_9");
    // تطوير منجم الحديد 10
    Sequence_Construction.push("main_buildlink_iron_10");

//---------------- https://image.prntscr.com/image/n6tBlPGORAq9RmqSVccTKg.png -  -----------------//

     // تطوير الخشاب  13
    Sequence_Construction.push("main_buildlink_wood_13");
    // تطوير حفرة الطمي 13
    Sequence_Construction.push("main_buildlink_stone_13");
    // تطوير منجم الحديد 11
    Sequence_Construction.push("main_buildlink_iron_11");
    // تطوير المخازن 9
    Sequence_Construction.push("main_buildlink_storage_9");
    // تطوير المخازن 10
    Sequence_Construction.push("main_buildlink_storage_10");
    // تطوير المزارع 3
    Sequence_Construction.push("main_buildlink_farm_3");
    // تطوير المزارع 4
    Sequence_Construction.push("main_buildlink_farm_4");
    // تطوير المزارع 5
    Sequence_Construction.push("main_buildlink_farm_5");
    // تطوير منجم الحديد 12
    Sequence_Construction.push("main_buildlink_iron_12");

//---------------- https://image.prntscr.com/image/ERCLrS5cT32ntSv1IevLUg.png -  -----------------//


    // تطوير المزارع 6
    Sequence_Construction.push("main_buildlink_farm_6");
    // تطوير المزارع 7
    Sequence_Construction.push("main_buildlink_farm_7");
    // تطوير الحائط 2
    Sequence_Construction.push("main_buildlink_wall_2");
    // تطوير الحائط 3
    Sequence_Construction.push("main_buildlink_wall_3");
    // تطوير الحائط 4
    Sequence_Construction.push("main_buildlink_wall_4");
    // تطوير الحائط 5
    Sequence_Construction.push("main_buildlink_wall_5");
    // تطوير منجم الحديد 13
    Sequence_Construction.push("main_buildlink_iron_13");
    // تطوير منجم الحديد 14
    Sequence_Construction.push("main_buildlink_iron_14");

//---------------- https://image.prntscr.com/image/V15bxH7KSFa5gu3d02yYIQ.png -  -----------------//

    // تطوير المزارع 8
    Sequence_Construction.push("main_buildlink_farm_8");
    // تطوير المزارع 9
    Sequence_Construction.push("main_buildlink_farm_9");

//---------------- https://image.prntscr.com/image/3pioalUXRK6AH9wNYnRxyQ.png -  -----------------//



    // تطوير الحداد 2
    Sequence_Construction.push("main_buildlink_smith_2");
    // تطوير الحداد 3
    Sequence_Construction.push("main_buildlink_smith_3");
    // تطوير الحداد 4
    Sequence_Construction.push("main_buildlink_smith_4");
    // تطوير الحداد 5
    Sequence_Construction.push("main_buildlink_smith_5");
    // تطوير السوق 2
    Sequence_Construction.push("main_buildlink_market_2");
    // تطوير السوق 3
    Sequence_Construction.push("main_buildlink_market_3");
    // تطوير المبنى الرئيسي 8
    Sequence_Construction.push("main_buildlink_main_8");
    // تطوير المبنى الرئيسي 9
    Sequence_Construction.push("main_buildlink_main_9");
    // تطوير المبنى الرئيسي 10
    Sequence_Construction.push("main_buildlink_main_10");
    // تطوير Estabulo 1
    Sequence_Construction.push("main_buildlink_stable_1");
    // تطوير Estabulo 2
    Sequence_Construction.push("main_buildlink_stable_2");
    // تطوير Estabulo 3
    Sequence_Construction.push("main_buildlink_stable_3");
    // تطوير المخازن 11
    Sequence_Construction.push("main_buildlink_storage_11");
    // تطوير المزارع 10
    Sequence_Construction.push("main_buildlink_farm_10");
    // تطوير المزارع 11
    Sequence_Construction.push("main_buildlink_farm_11");
    // تطوير المزارع 12
    Sequence_Construction.push("main_buildlink_farm_12");
    // تطوير المخازن 12
    Sequence_Construction.push("main_buildlink_storage_12");
     // تطوير الخشاب  14
    Sequence_Construction.push("main_buildlink_wood_14");
    // تطوير حفرة الطمي 14
    Sequence_Construction.push("main_buildlink_stone_14");
     // تطوير الخشاب  15
    Sequence_Construction.push("main_buildlink_wood_15");
    // تطوير حفرة الطمي 15
    Sequence_Construction.push("main_buildlink_stone_15");
    // تطوير المخازن 13
    Sequence_Construction.push("main_buildlink_storage_13");
    // تطوير المبنى الرئيسي 11
    Sequence_Construction.push("main_buildlink_main_11");
    // تطوير الحائط 6
    Sequence_Construction.push("main_buildlink_wall_6");
    // تطوير الحائط 7
    Sequence_Construction.push("main_buildlink_wall_7");
    // تطوير الحائط 8
    Sequence_Construction.push("main_buildlink_wall_8");
    // تطوير الحائط 9
    Sequence_Construction.push("main_buildlink_wall_9");
    // تطوير المخازن 14
    Sequence_Construction.push("main_buildlink_storage_14");
    // تطوير الثكنات 6
    Sequence_Construction.push("main_buildlink_barracks_6");
    // تطوير الثكنات 7
    Sequence_Construction.push("main_buildlink_barracks_7");
    // تطوير الثكنات 8
    Sequence_Construction.push("main_buildlink_barracks_8");
    // تطوير الثكنات 9
    Sequence_Construction.push("main_buildlink_barracks_9");
    // تطوير المخازن 15
    Sequence_Construction.push("main_buildlink_storage_15");
    // تطوير الحداد 6
    Sequence_Construction.push("main_buildlink_smith_6");
    // تطوير الحداد 7
    Sequence_Construction.push("main_buildlink_smith_7");
    // تطوير الحداد 8
    Sequence_Construction.push("main_buildlink_smith_8");
    // تطوير المبنى الرئيسي 12
    Sequence_Construction.push("main_buildlink_main_12");
    // تطوير المخازن 16
    Sequence_Construction.push("main_buildlink_storage_16");
    // تطوير المخازن 17
    Sequence_Construction.push("main_buildlink_storage_17");
    // تطوير المبنى الرئيسي 13
    Sequence_Construction.push("main_buildlink_main_13");
    // تطوير المزارع 13
    Sequence_Construction.push("main_buildlink_farm_13");
    // تطوير المزارع 14
    Sequence_Construction.push("main_buildlink_farm_14");
    // تطوير السوق 4
    Sequence_Construction.push("main_buildlink_market_4");
    // تطوير السوق 5
    Sequence_Construction.push("main_buildlink_market_5");
    // تطوير السوق 6
    Sequence_Construction.push("main_buildlink_market_6");
    // تطوير المبنى الرئيسي 14
    Sequence_Construction.push("main_buildlink_main_14");
    // تطوير الخشاب  16
    Sequence_Construction.push("main_buildlink_wood_16");
    // تطوير حفرة الطمي 16
    Sequence_Construction.push("main_buildlink_stone_16");
    // تطوير المبنى الرئيسي 15
    Sequence_Construction.push("main_buildlink_main_15");
    // تطوير الخشاب  17
    Sequence_Construction.push("main_buildlink_wood_17");
    // تطوير حفرة الطمي 17
    Sequence_Construction.push("main_buildlink_stone_17");
    // تطوير المبنى الرئيسي 16
    Sequence_Construction.push("main_buildlink_main_16");
    // تطوير الثكنات 10
    Sequence_Construction.push("main_buildlink_barracks_10");
    // تطوير الحداد 9
    Sequence_Construction.push("main_buildlink_smith_9");
    // تطوير الحداد 10
    Sequence_Construction.push("main_buildlink_smith_10");
    // تطوير الورشه 1
    Sequence_Construction.push("main_buildlink_garage_1");
    // تطوير الورشه 2
    Sequence_Construction.push("main_buildlink_garage_2");
    // تطوير الورشه 3
    Sequence_Construction.push("main_buildlink_garage_3");
    // تطوير Estabulo 4
    Sequence_Construction.push("main_buildlink_stable_4");
    // تطوير Estabulo 4
    Sequence_Construction.push("main_buildlink_stable_5");
    // تطوير Estabulo 4
    Sequence_Construction.push("main_buildlink_stable_6");
    // تطوير Estabulo 4
    Sequence_Construction.push("main_buildlink_stable_7");
    // تطوير المخازن 18
    Sequence_Construction.push("main_buildlink_storage_18");
    // تطوير المخازن 19
    Sequence_Construction.push("main_buildlink_storage_19");
    // تطوير الثكنات 11
    Sequence_Construction.push("main_buildlink_barracks_11");
    // تطوير الثكنات 12
    Sequence_Construction.push("main_buildlink_barracks_12");
    // تطوير منجم الحديد 15
    Sequence_Construction.push("main_buildlink_iron_15");
    // تطوير منجم الحديد 16
    Sequence_Construction.push("main_buildlink_iron_16");
    // تطوير المزارع 15
    Sequence_Construction.push("main_buildlink_farm_15");
    // تطوير المزارع 16
    Sequence_Construction.push("main_buildlink_farm_16");
    // تطوير الحائط 10
    Sequence_Construction.push("main_buildlink_wall_10");
    // تطوير المزارع 17
    Sequence_Construction.push("main_buildlink_farm_17");
    // تطوير الحداد 11
    Sequence_Construction.push("main_buildlink_smith_11");
    // تطوير الحائط 11
    Sequence_Construction.push("main_buildlink_wall_11");
    // تطوير المزارع 18
    Sequence_Construction.push("main_buildlink_farm_18");
    // تطوير الحائط 12
    Sequence_Construction.push("main_buildlink_wall_12");
    // تطوير السوق 7
    Sequence_Construction.push("main_buildlink_market_7");
    // تطوير السوق 8
    Sequence_Construction.push("main_buildlink_market_8");
    // تطوير السوق 9
    Sequence_Construction.push("main_buildlink_market_9");
    // تطوير الحداد 12
    Sequence_Construction.push("main_buildlink_smith_12");
    // تطوير السوق 10
    Sequence_Construction.push("main_buildlink_market_10");
     // تطوير الخشاب  18
    Sequence_Construction.push("main_buildlink_wood_18");
    // تطوير حفرة الطمي 18
    Sequence_Construction.push("main_buildlink_stone_18");
    // تطوير الحداد 13
    Sequence_Construction.push("main_buildlink_smith_13");
     // تطوير الخشاب  19
    Sequence_Construction.push("main_buildlink_wood_19");
    // تطوير حفرة الطمي 19
    Sequence_Construction.push("main_buildlink_stone_19");
    // تطوير المزارع 19
    Sequence_Construction.push("main_buildlink_farm_19");
    // تطوير الحداد 14
    Sequence_Construction.push("main_buildlink_smith_14");
    // تطوير الحائط 13
    Sequence_Construction.push("main_buildlink_wall_13");
    // تطوير منجم الحديد 16
    Sequence_Construction.push("main_buildlink_iron_16");
    // تطوير منجم الحديد 17
    Sequence_Construction.push("main_buildlink_iron_17");
    // تطوير الحداد 15
    Sequence_Construction.push("main_buildlink_smith_15");
    // تطوير المبنى الرئيسي 17
    Sequence_Construction.push("main_buildlink_main_17");
    // تطوير المبنى الرئيسي 18
    Sequence_Construction.push("main_buildlink_main_18");
    // تطوير المبنى الرئيسي 19
    Sequence_Construction.push("main_buildlink_main_19");
    // تطوير المبنى الرئيسي 20
    Sequence_Construction.push("main_buildlink_main_20");
    // تطوير المخازن 20
    Sequence_Construction.push("main_buildlink_storage_20");
    // تطوير المخازن 21
    Sequence_Construction.push("main_buildlink_storage_21");
    // تطوير المخازن 22
    Sequence_Construction.push("main_buildlink_storage_22");
    // تطوير المخازن 23
    Sequence_Construction.push("main_buildlink_storage_23");
    // تطوير الخشاب  20
    Sequence_Construction.push("main_buildlink_wood_20");
    // تطوير حفرة الطمي 20
    Sequence_Construction.push("main_buildlink_stone_20");
    // تطوير الحداد 16
    Sequence_Construction.push("main_buildlink_smith_16");
    // تطوير الحداد 17
    Sequence_Construction.push("main_buildlink_smith_17");
    // تطوير منجم الحديد 18
    Sequence_Construction.push("main_buildlink_iron_18");
     // تطوير الخشاب  20
    Sequence_Construction.push("main_buildlink_wood_21");
    // تطوير حفرة الطمي 20
    Sequence_Construction.push("main_buildlink_stone_21");
    // تطوير الثكنات 13
    Sequence_Construction.push("main_buildlink_barracks_13");
    // تطوير الثكنات 14
    Sequence_Construction.push("main_buildlink_barracks_14");
    // تطوير الورشه 4
    Sequence_Construction.push("main_buildlink_garage_4");
    // تطوير Estabulo 8
    Sequence_Construction.push("main_buildlink_stable_8");
    // تطوير الورشه 5
    Sequence_Construction.push("main_buildlink_garage_5");
    // تطوير Estabulo 9
    Sequence_Construction.push("main_buildlink_stable_9");
    // تطوير المزارع 20
    Sequence_Construction.push("main_buildlink_farm_20");
    // تطوير الحائط 14
    Sequence_Construction.push("main_buildlink_wall_14");
    // تطوير الحائط 15
    Sequence_Construction.push("main_buildlink_wall_15");
    // تطوير المزارع 21
    Sequence_Construction.push("main_buildlink_farm_21");
    // تطوير المخازن 24
    Sequence_Construction.push("main_buildlink_storage_24");
    // تطوير منجم الحديد 19
    Sequence_Construction.push("main_buildlink_iron_19");
    // تطوير الخشاب  21
    Sequence_Construction.push("main_buildlink_wood_21");
    // تطوير حفرة الطمي 21
    Sequence_Construction.push("main_buildlink_stone_21");
    // تطوير الخشاب  22
    Sequence_Construction.push("main_buildlink_wood_22");
    // تطوير حفرة الطمي 22
    Sequence_Construction.push("main_buildlink_stone_22");
    // تطوير المخازن 25
    Sequence_Construction.push("main_buildlink_storage_25");
    // تطوير الخشاب  23
    Sequence_Construction.push("main_buildlink_wood_23");
    // تطوير حفرة الطمي 23
    Sequence_Construction.push("main_buildlink_stone_23");
    // تطوير منجم الحديد 20
    Sequence_Construction.push("main_buildlink_iron_20");
    // تطوير منجم الحديد 21
    Sequence_Construction.push("main_buildlink_iron_21");
    // تطوير منجم الحديد 22
    Sequence_Construction.push("main_buildlink_iron_22");
    // تطوير الحداد 18
    Sequence_Construction.push("main_buildlink_smith_18");
    // تطوير الحداد 19
    Sequence_Construction.push("main_buildlink_smith_19");
    // تطوير الحداد 20
    Sequence_Construction.push("main_buildlink_smith_20");
    // تطوير Academia
    Sequence_Construction.push("main_buildlink_snob_1");
    // تطوير الورشه 6
    Sequence_Construction.push("main_buildlink_garage_6");
    // تطوير Estabulo 10
    Sequence_Construction.push("main_buildlink_stable_10");
    // تطوير Estabulo 11
    Sequence_Construction.push("main_buildlink_stable_11");
    // تطوير الثكنات 15
    Sequence_Construction.push("main_buildlink_barracks_15");
    // تطوير الثكنات 16
    Sequence_Construction.push("main_buildlink_barracks_16");
    // تطوير المزارع 22
    Sequence_Construction.push("main_buildlink_farm_22");
    // تطوير الخشاب  24
    Sequence_Construction.push("main_buildlink_wood_24");
    // تطوير حفرة الطمي 24
    Sequence_Construction.push("main_buildlink_stone_24");
    // تطوير منجم الحديد 23
    Sequence_Construction.push("main_buildlink_iron_23");
    // تطوير الخشاب  24
    Sequence_Construction.push("main_buildlink_wood_25");
    // تطوير حفرة الطمي 24
    Sequence_Construction.push("main_buildlink_stone_25");
    // تطوير منجم الحديد 22
    Sequence_Construction.push("main_buildlink_iron_24");
    // تطوير الحائط 16
    Sequence_Construction.push("main_buildlink_wall_16");
    // تطوير الحائط 17
    Sequence_Construction.push("main_buildlink_wall_17");
    // تطوير الحائط 18
    Sequence_Construction.push("main_buildlink_wall_18");
    // تطوير المزارع 23
    Sequence_Construction.push("main_buildlink_farm_23");
    // تطوير المزارع 24
    Sequence_Construction.push("main_buildlink_farm_24");
    // تطوير المزارع 25
    Sequence_Construction.push("main_buildlink_farm_25");
    // تطوير السوق 11
    Sequence_Construction.push("main_buildlink_market_11");
    // تطوير السوق 12
    Sequence_Construction.push("main_buildlink_market_12");
    // تطوير السوق 13
    Sequence_Construction.push("main_buildlink_market_13");
    // تطوير السوق 14
    Sequence_Construction.push("main_buildlink_market_14");
    // تطوير المخازن 26
    Sequence_Construction.push("main_buildlink_storage_26");
    // تطوير الحائط 19
    Sequence_Construction.push("main_buildlink_wall_19");
    // تطوير المخازن 27
    Sequence_Construction.push("main_buildlink_storage_27");
    // تطوير المخازن 28
    Sequence_Construction.push("main_buildlink_storage_28");
    // تطوير الحائط 20
    Sequence_Construction.push("main_buildlink_wall_20");
    // تطوير الخشاب  26
    Sequence_Construction.push("main_buildlink_wood_26");
    // تطوير حفرة الطمي 26
    Sequence_Construction.push("main_buildlink_stone_26");
    // تطوير منجم الحديد 25
    Sequence_Construction.push("main_buildlink_iron_25");
    // تطوير المخازن 29
    Sequence_Construction.push("main_buildlink_storage_29");
    // تطوير المخازن 30
    Sequence_Construction.push("main_buildlink_storage_30");
    // تطوير المزارع 26
    Sequence_Construction.push("main_buildlink_farm_26");
    // تطوير المزارع 27
    Sequence_Construction.push("main_buildlink_farm_27");
    // تطوير المزارع 28
    Sequence_Construction.push("main_buildlink_farm_28");
    // تطوير المزارع 29
    Sequence_Construction.push("main_buildlink_farm_29");
    // تطوير المزارع 30
    Sequence_Construction.push("main_buildlink_farm_30");
    // تطوير الورشه 7
    Sequence_Construction.push("main_buildlink_garage_7");
    // تطوير Estabulo 12
    Sequence_Construction.push("main_buildlink_stable_12");
    // تطوير الورشه 8
    Sequence_Construction.push("main_buildlink_garage_8");
    // تطوير Estabulo 13
    Sequence_Construction.push("main_buildlink_stable_13");
    // تطوير المبنى الرئيسي 21
    Sequence_Construction.push("main_buildlink_main_21");
    // تطوير الورشه 9
    Sequence_Construction.push("main_buildlink_garage_9");
    // تطوير Estabulo 14
    Sequence_Construction.push("main_buildlink_stable_14");
    // تطوير المبنى الرئيسي 22
    Sequence_Construction.push("main_buildlink_main_22");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_10");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_15");
    // تطوير الثكنات 17
    Sequence_Construction.push("main_buildlink_barracks_17");
    // تطوير الثكنات 18
    Sequence_Construction.push("main_buildlink_barracks_18");
    // تطوير الثكنات 19
    Sequence_Construction.push("main_buildlink_barracks_19");
    // تطوير الثكنات 20
    Sequence_Construction.push("main_buildlink_barracks_20");
    // تطوير الخشاب  27
    Sequence_Construction.push("main_buildlink_wood_27");
    // تطوير حفرة الطمي 27
    Sequence_Construction.push("main_buildlink_stone_27");
    // تطوير منجم الحديد 26
    Sequence_Construction.push("main_buildlink_iron_26");
    // تطوير الخشاب  28
    Sequence_Construction.push("main_buildlink_wood_28");
    // تطوير حفرة الطمي 28
    Sequence_Construction.push("main_buildlink_stone_28");
    // تطوير الثكنات 21
    Sequence_Construction.push("main_buildlink_barracks_21");
    // تطوير منجم الحديد 27
    Sequence_Construction.push("main_buildlink_iron_27");
    // تطوير الخشاب  29
    Sequence_Construction.push("main_buildlink_wood_29");
    // تطوير حفرة الطمي 29
    Sequence_Construction.push("main_buildlink_stone_29");
    // تطوير الثكنات 22
    Sequence_Construction.push("main_buildlink_barracks_22");
    // تطوير منجم الحديد 28
    Sequence_Construction.push("main_buildlink_iron_28");
    // تطوير الخشاب  30
    Sequence_Construction.push("main_buildlink_wood_30");
    // تطوير حفرة الطمي 30
    Sequence_Construction.push("main_buildlink_stone_30");
    // تطوير الثكنات 23
    Sequence_Construction.push("main_buildlink_barracks_23");
    // تطوير منجم الحديد 29
    Sequence_Construction.push("main_buildlink_iron_29");
    // تطوير منجم الحديد 30
    Sequence_Construction.push("main_buildlink_iron_30");
    // تطوير السوق 15
    Sequence_Construction.push("main_buildlink_market_15");
    // تطوير السوق 16
    Sequence_Construction.push("main_buildlink_market_16");
    // تطوير الثكنات 24
    Sequence_Construction.push("main_buildlink_barracks_24");
    // تطوير السوق 17
    Sequence_Construction.push("main_buildlink_market_17");
    // تطوير الثكنات 25
    Sequence_Construction.push("main_buildlink_barracks_25");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_11");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_16");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_12");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_17");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_13");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_18");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_14");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_19");
    // تطوير الورشه 10
    Sequence_Construction.push("main_buildlink_garage_15");
    // تطوير Estabulo 15
    Sequence_Construction.push("main_buildlink_stable_20");
    // تطوير المبنى الرئيسي 23
    Sequence_Construction.push("main_buildlink_main_23");
    // تطوير المبنى الرئيسي 24
    Sequence_Construction.push("main_buildlink_main_24");
    // تطوير المبنى الرئيسي 25
    Sequence_Construction.push("main_buildlink_main_25");
    // تطوير المبنى الرئيسي 26
    Sequence_Construction.push("main_buildlink_main_26");
    // تطوير المبنى الرئيسي 27
    Sequence_Construction.push("main_buildlink_main_27");
    // تطوير المبنى الرئيسي 28
    Sequence_Construction.push("main_buildlink_main_28");
    // تطوير المبنى الرئيسي 29
    Sequence_Construction.push("main_buildlink_main_29");
    // تطوير المبنى الرئيسي 30
    Sequence_Construction.push("main_buildlink_main_30");
    // تطوير السوق 18
    Sequence_Construction.push("main_buildlink_market_18");
    // تطوير السوق 19
    Sequence_Construction.push("main_buildlink_market_19");
    // تطوير السوق 20
    Sequence_Construction.push("main_buildlink_market_20");
    // تطوير السوق 21
    Sequence_Construction.push("main_buildlink_market_21");
    // تطوير السوق 22
    Sequence_Construction.push("main_buildlink_market_22");
    // تطوير المخابئ  4
    Sequence_Construction.push("main_buildlink_hide_4");
    // تطوير السوق 23
    Sequence_Construction.push("main_buildlink_market_23");
    // تطوير المخابئ  5
    Sequence_Construction.push("main_buildlink_hide_5");
    // تطوير السوق 24
    Sequence_Construction.push("main_buildlink_market_24");
    // تطوير السوق 25
    Sequence_Construction.push("main_buildlink_market_25");
    // تطوير المخابئ  3
    Sequence_Construction.push("main_buildlink_hide_6");
    // تطوير المخابئ  3
    Sequence_Construction.push("main_buildlink_hide_7");
    // تطوير المخابئ  8
    Sequence_Construction.push("main_buildlink_hide_8");
    // تطوير المخابئ  9
    Sequence_Construction.push("main_buildlink_hide_9");
    // تطوير المخابئ  10
    Sequence_Construction.push("main_buildlink_hide_10");

    return Sequence_Construction;

}

// Future Commands to be entered
//javascript: document.getElementsByClassName('order_feature btn btn-btr btn-instant-free')[0].click();
//javascript: document.getElementsByClassName('btn btn-confirm-yes')[0].click()




