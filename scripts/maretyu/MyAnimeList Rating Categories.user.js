// ==UserScript==
// @name         MyAnimeList Rating Categories
// @namespace    http://tampermonkey.net/mal-rating
// @version      1.0
// @description  when there just isn't enough wiggle room for little details in a 10 point rating.
// @author       Maretyu
// @match        https://myanimelist.net/ownlist/anime/*/edit?hideLayout
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==


(function() {
    'use strict';
        let value={
            "characters":0,
            "story":0,
            "worldbuilding":0,
            "artstyle":0,
            "animation":0,
            "protagonist":0,
            "pacing":0,
            "action":0,
            "comedy":0,
            "impression":0,
    };
    let storageID= "#add_anime_tags"
    let biasKey="rating-bias";
    let template=[
        '<tr>',
        '<td class="borderClass">Bias</td>',
        '<td class="borderClass"><input type="number" min="0" max="1" step="0.05" name="bias" id="bias" class="inputtext"></td>',
        '<td class="borderClass">Characters</td>',
        '<td class="borderClass">',
        '<select id="character-score" name="character-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass">Calculated Score</td>',
        '<td class="borderClass"><input name="score" id="score" class="inputtext" readonly></td>',
        '<td class="borderClass">Story</td>',
        '<td class="borderClass">',
        '<select id="story-score" name="story-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass">Sum</td>',
        '<td class="borderClass"><input name="sum" id="sum" class="inputtext" readonly></td>',
        '<td class="borderClass">Wordbuilding</td>',
        '<td class="borderClass">',
        '<select id="wb-score" name="wb-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass">Active Criteria</td>',
        '<td class="borderClass"><input name="criteria" id="criteria" class="inputtext" readonly></td>',
        '<td class="borderClass">Artstyle</td>',
        '<td class="borderClass">',
        '<select id="artstyle-score" name="artstyle-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Animation</td>',
        '<td class="borderClass">',
        '<select id="animation-score" name="animation-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Protagonist</td>',
        '<td class="borderClass">',
        '<select id="protagonist-score" name="protagonist-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Pacing</td>',
        '<td class="borderClass">',
        '<select id="pacing-score" name="pacing-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Action</td>',
        '<td class="borderClass">',
        '<select id="action-score" name="action-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Comedy</td>',
        '<td class="borderClass">',
        '<select id="comedy-score" name="comedy-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '<option value="ignore">ignore</option>',
        '</select>',
        '</td>',
        '</tr>',
        '<tr>',
        '<td class="borderClass"></td>',
        '<td class="borderClass"></td>',
        '<td class="borderClass">Impression</td>',
        '<td class="borderClass">',
        '<select id="impression-score" name="impression-score" class="inputtext">',
        '<option value="3">(3) Great</option>',
        '<option value="2">(2) Good</option>',
        '<option value="1">(1) Fine</option>',
        '<option value="0" selected>(0) Meh</option>',
        '<option value="-1">(-1) Bad</option>',
        '<option value="-2">(-2) Very Bad</option>',
        '<option value="-3">(-3) Terrible</option>',
        '</select>',
        '</td>',
        '</tr>',
    ].join("\n");
    let bias=0.2;


    function modUI(){
        $("#main-form > table:nth-child(1) > tbody > tr:nth-child(5)").css("display","none");
        $("#main-form > table:nth-child(1) > tbody > tr:nth-child(6)").css("display","none");
        $("#main-form > table:nth-child(1) > tbody > tr:nth-child(4)").after(template);

        $(storageID).css("color","grey");
    }
        function calculateScore(){
        let active=0;
        let sum=0;
        for(let key in value){
            if(value[key]!== 'ignore'){
                sum += parseInt(value[key]);
                active++;
            }
        }
        let score=(sum +(active*3))/(active*0.6);
        let rScore=Math.round(score+parseFloat(bias));
            console.log("active: ",active);
            console.log("sum: ",sum);
            console.log("score: ",score);
            console.log("bias: ", bias);
            console.log("rScore: ",rScore);
        $("#criteria").val(active);
        $("#sum").val(sum);
        $("#score").val(score);
        $("#add_anime_score").val(rScore);
    };
    function save(){
        $(storageID).text(JSON.stringify(value));
        localStorage.setItem(biasKey,bias);
    };
    function load(){
        if($(storageID).text()===""){
            save();
        }else{
            let loadstuff=JSON.parse($(storageID).text())
            value= Object.assign(value,loadstuff);
            $("#character-score").val(value.characters);
            $("#story-score").val(value.story);
            $("#wb-score").val(value.worldbuilding);
            $("#artstyle-score").val(value.artstyle);
            $("#animation-score").val(value.animation);
            $("#protagonist-score").val(value.protagonist);
            $("#pacing-score").val(value.pacing);
            $("#action-score").val(value.action);
            $("#comedy-score").val(value.comedy);
            $("#impression-score").val(value.impression);
        }
        let x=localStorage.getItem(biasKey);
        if(x){
           bias=parseFloat(x)
        }else{
            bias=0.2;
            localStorage.setItem(biasKey,0.2);
        }
        $("#bias").val(bias);
        calculateScore();
    };

    function updateValue(){
        value.characters=$("#character-score").val();
        value.story=$("#story-score").val();
        value.worldbuilding=$("#wb-score").val();
        value.artstyle=$("#artstyle-score").val();
        value.animation=$("#animation-score").val();
        value.protagonist=$("#protagonist-score").val();
        value.pacing=$("#pacing-score").val();
        value.action=$("#action-score").val();
        value.comedy=$("#comedy-score").val();
        value.impression=$("#impression-score").val();
        bias=parseFloat($("#bias").val());
        calculateScore();
        save();
    }
    function registerHandler(){
        $("#character-score").change(updateValue);
        $("#story-score").change(updateValue);
        $("#wb-score").change(updateValue);
        $("#artstyle-score").change(updateValue);
        $("#animation-score").change(updateValue);
        $("#protagonist-score").change(updateValue);
        $("#pacing-score").change(updateValue);
        $("#action-score").change(updateValue);
        $("#comedy-score").change(updateValue);
        $("#impression-score").change(updateValue);
        $("#bias").change(updateValue);

    }
    modUI();
    load();
    registerHandler();
})();