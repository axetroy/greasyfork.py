// ==UserScript==
// @name           ok then 2
// @namespace      https://greasyfork.org/users/171308
// @version        ╳F╳Δ╳Z╳Σ╳
// @description    【 ČESKY 】 ➜ 〖 MĚNĚNÍ ČEPICE + KUPOVÁNÍ 〗〖 MĚNIČ ČEPIC 〗〖 LEPŠÍ MINIMAPA 〗〖 ODSTRANĚNÍ ZBYTEČNOSTÍ 〗〖 DALŠÍ VYLEPŠENÍ 〗ㅤ【 ENGLISH 】 ➜〖 CHANGE HAT + BUYING 〗〖 CHANGER HATS 〗〖 BETTER MINIMAP 〗〖 REMOVING NEEDLESSNESS 〗〖 OTHER IMPROVEMENTS 〗
// @author         ?FΣΓΔΠΨZΣΓΛΓ?
// @match          *.moomoo.io/*
// @match          *://45.77.0.61/*
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// @icon           http://i.imgur.com/EVgFAYg.png
// ==/UserScript==

var Zf=[12,"Booster Hat"],tN=[[12,"Booster Hat"],[16,"Bushido Armor"],[31,"Flipper Hat"],[13,"Medic Gear"],[15,"Winter Cap"],[22,"Emp Helmet"],[26,"Barbarian Armor"],[20,"Samurai Armor"],[40,"Tank Gear"],[7,"Bull Helmet"],[28,"Moo Head"],[29,"Pig Head"],[30,"Fluff Head"],[36,"Pandou Head"],[37,"Bear Head"],[38,"Monkey Head"],[44,"Polar Head"],[35,"Fez Hat"],[42,"Enigma Hat"],[43,"Blitz Hat"],[49,"Bob XIII Hat"],[8,"Bummle Hat"],[2,"Straw Hat"],[5,"Cowboy Hat"],[4,"Ranger Hat"],[18,"Explorer Hat"],[1,"Marksman Cap"],[10,"Bush Gear"],[48,"Halo"],[6,"Soldier Helmet"],[23,"Anti Venom Gear"],[9,"Miners Helmet"],[32,"Musketeer Hat"],[21,"Plague Mask"],[46,"Bull Mask"],[14,"Windmill Hat"],[11,"Spike Gear"],[27,"Scavenger Gear"]];function Rt(sE){if(Zf[0]===0){storeEquip(tN[sE][0]);document.title=tN[sE][1];Zf[1]=90;revertTitle();}else{storeBuy(tN[sE][0]);Zf[0]=0;Zf[1]=180;document.title="Can'tBuy┃NelzeKoupit";revertTitle();}}document.addEventListener('keydown',function(kfc){if(!$(':focus').length){switch(kfc.keyCode){case 226:Zf[0]=1;Zf[1]=300;document.title="Kupování....";kfc.preventDefault();break;case 113:Zf[0]=1;Zf[1]=300;document.title="Kupování....";kfc.preventDefault();break;case 255:if(Zf[0]===1){Zf[1]=120;document.title="Nekupování....";}Zf[0]=0;kfc.preventDefault();break;case 96:storeEquip(45);kfc.preventDefault();break;case 16:Rt(0);kfc.preventDefault();break;case 66:Rt(1);kfc.preventDefault();break;case 86:Rt(2);kfc.preventDefault();break;case 85:Rt(3);kfc.preventDefault();break;case 20:Rt(4);kfc.preventDefault();break;case 89:Rt(5);kfc.preventDefault();break;case 192:Rt(6);kfc.preventDefault();break;case 70:Rt(7);kfc.preventDefault();break;case 17:Rt(8);kfc.preventDefault();break;case 18:Rt(9);kfc.preventDefault();break;case 97:Rt(10);kfc.preventDefault();break;case 99:Rt(11);kfc.preventDefault();break;case 98:Rt(12);kfc.preventDefault();break;case 219:Rt(13);kfc.preventDefault();break;case 80:Rt(14);kfc.preventDefault();break;case 221:Rt(15);kfc.preventDefault();break;case 79:Rt(16);kfc.preventDefault();break;case 100:Rt(17);kfc.preventDefault();break;case 102:Rt(18);kfc.preventDefault();break;case 76:Rt(19);kfc.preventDefault();break;case 220:Rt(20);kfc.preventDefault();break;case 222:Rt(21);kfc.preventDefault();break;case 103:Rt(22);kfc.preventDefault();break;case 104:Rt(23);kfc.preventDefault();break;case 105:Rt(24);kfc.preventDefault();break;case 101:Rt(25);kfc.preventDefault();break;case 72:Rt(26);kfc.preventDefault();break;case 190:Rt(27);kfc.preventDefault();break;case 189:Rt(28);kfc.preventDefault();break;case 77:Rt(29);kfc.preventDefault();break;case 78:Rt(30);kfc.preventDefault();break;case 188:Rt(31);kfc.preventDefault();break;case 74:Rt(32);kfc.preventDefault();break;case 71:Rt(33);kfc.preventDefault();break;case 186:Rt(34);kfc.preventDefault();break;case 75:Rt(35);kfc.preventDefault();break;case 90:Rt(36);kfc.preventDefault();break;case 73:Rt(37);kfc.preventDefault();break;}}});(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var můjVar5;var můjVar6;var můjVar7;var změna=true;var ID_FΔZΣ=45;var ID_Moo_Head=28;var ID_Pig_Head=29;var ID_Fluff_Head=30;var ID_Pandou_Head=36;var ID_Bear_Head=37;var ID_Monkey_Head=38;var ID_Polar_Head=44;document.addEventListener('keydown',function(e){if(e.keyCode==116){e.preventDefault();if(změna){storeEquip(ID_Moo_Head);můjVar=setTimeout(function(){h1();},270);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);clearTimeout(můjVar5);clearTimeout(můjVar6);clearTimeout(můjVar7);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Moo_Head);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},270);}function h2(){storeEquip(ID_Pig_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},270);}function h3(){storeEquip(ID_Fluff_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},270);}function h4(){storeEquip(ID_Pandou_Head);clearTimeout(můjVar4);můjVar5=setTimeout(function(){h5();},270);}function h5(){storeEquip(ID_Bear_Head);clearTimeout(můjVar5);můjVar6=setTimeout(function(){h6();},270);}function h6(){storeEquip(ID_Monkey_Head);clearTimeout(můjVar6);můjVar7=setTimeout(function(){h7();},270);}function h7(){storeEquip(ID_Polar_Head);clearTimeout(můjVar7);můjVar=setTimeout(function(){h1();},270);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var změna=true;var ID_FΔZΣ=45;var ID_Pandou_Head=36;var ID_Bear_Head=37;var ID_Monkey_Head=38;var ID_Polar_Head=44;document.addEventListener('keydown',function(e){if(e.keyCode==120){e.preventDefault();if(změna){storeEquip(ID_Pandou_Head);můjVar=setTimeout(function(){h1();},270);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Pandou_Head);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},270);}function h2(){storeEquip(ID_Bear_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},270);}function h3(){storeEquip(ID_Monkey_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},270);}function h4(){storeEquip(ID_Polar_Head);clearTimeout(můjVar4);můjVar=setTimeout(function(){h1();},270);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var změna=true;var ID_FΔZΣ=45;var ID_Moo_Head=28;var ID_Pig_Head=29;var ID_Fluff_Head=30;var ID_Bull_Mask=46;document.addEventListener('keydown',function(e){if(e.keyCode==121){e.preventDefault();if(změna){storeEquip(ID_Moo_Head);můjVar=setTimeout(function(){h1();},270);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Moo_Head);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},270);}function h2(){storeEquip(ID_Pig_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},270);}function h3(){storeEquip(ID_Fluff_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},270);}function h4(){storeEquip(ID_Bull_Mask);clearTimeout(můjVar4);můjVar=setTimeout(function(){h1();},270);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var můjVar5;var můjVar6;var můjVar7;var můjVar8;var můjVar9;var můjVar10;var můjVar11;var změna=true;var ID_FΔZΣ=45;var ID_Moo_Head=28;var ID_Pig_Head=29;var ID_Fluff_Head=30;var ID_Pandou_Head=36;var ID_Bear_Head=37;var ID_Monkey_Head=38;var ID_Polar_Head=44;var ID_Fez_Hat=35;var ID_Enigma_Hat=42;var ID_Blitz_Hat=43;var ID_Bob_XIII_Hat=49;document.addEventListener('keydown',function(e){if(e.keyCode==9){e.preventDefault();if(změna){storeEquip(ID_Moo_Head);můjVar=setTimeout(function(){h1();},180);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);clearTimeout(můjVar5);clearTimeout(můjVar6);clearTimeout(můjVar7);clearTimeout(můjVar8);clearTimeout(můjVar9);clearTimeout(můjVar10);clearTimeout(můjVar11);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Moo_Head);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},180);}function h2(){storeEquip(ID_Pig_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},180);}function h3(){storeEquip(ID_Fluff_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},180);}function h4(){storeEquip(ID_Pandou_Head);clearTimeout(můjVar4);můjVar5=setTimeout(function(){h5();},180);}function h5(){storeEquip(ID_Bear_Head);clearTimeout(můjVar5);můjVar6=setTimeout(function(){h6();},180);}function h6(){storeEquip(ID_Monkey_Head);clearTimeout(můjVar6);můjVar7=setTimeout(function(){h7();},180);}function h7(){storeEquip(ID_Polar_Head);clearTimeout(můjVar7);můjVar8=setTimeout(function(){h8();},180);}function h8(){storeEquip(ID_Fez_Hat);clearTimeout(můjVar8);můjVar9=setTimeout(function(){h9();},180);}function h9(){storeEquip(ID_Enigma_Hat);clearTimeout(můjVar9);můjVar10=setTimeout(function(){h10();},180);}function h10(){storeEquip(ID_Blitz_Hat);clearTimeout(můjVar10);můjVar11=setTimeout(function(){h11();},180);}function h11(){storeEquip(ID_Bob_XIII_Hat);clearTimeout(můjVar11);můjVar=setTimeout(function(){h1();},180);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var můjVar5;var můjVar6;var můjVar7;var můjVar8;var můjVar9;var změna=true;var ID_FΔZΣ=45;var ID_Moo_Head=28;var ID_Pig_Head=29;var ID_Fluff_Head=30;var ID_Pandou_Head=36;var ID_Bear_Head=37;var ID_Monkey_Head=38;var ID_Polar_Head=44;var ID_Flipper_Hat=31;var ID_Bull_Mask=46;document.addEventListener('keydown',function(e){if(e.keyCode==117){e.preventDefault();if(změna){storeEquip(ID_Moo_Head);můjVar=setTimeout(function(){h1();},270);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);clearTimeout(můjVar5);clearTimeout(můjVar6);clearTimeout(můjVar7);clearTimeout(můjVar8);clearTimeout(můjVar9);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Moo_Head);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},270);}function h2(){storeEquip(ID_Pig_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},270);}function h3(){storeEquip(ID_Fluff_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},270);}function h4(){storeEquip(ID_Pandou_Head);clearTimeout(můjVar4);můjVar5=setTimeout(function(){h5();},270);}function h5(){storeEquip(ID_Bear_Head);clearTimeout(můjVar5);můjVar6=setTimeout(function(){h6();},270);}function h6(){storeEquip(ID_Monkey_Head);clearTimeout(můjVar6);můjVar7=setTimeout(function(){h7();},270);}function h7(){storeEquip(ID_Polar_Head);clearTimeout(můjVar7);můjVar8=setTimeout(function(){h8();},270);}function h8(){storeEquip(ID_Flipper_Hat);clearTimeout(můjVar8);můjVar9=setTimeout(function(){h9();},270);}function h9(){storeEquip(ID_Bull_Mask);clearTimeout(můjVar9);můjVar=setTimeout(function(){h1();},270);}})();(function(){var můjVar;var můjVar2;var změna=true;var ID_Bummle_Hat=8;var ID_FΔZΣ=45;var ID_Winter_Cap=15;document.addEventListener('keydown',function(e){if(e.keyCode==112){e.preventDefault();if(změna){storeEquip(ID_Bummle_Hat);můjVar=setTimeout(function(){h1();},125);}else{clearTimeout(můjVar);clearTimeout(můjVar2);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_Bummle_Hat);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},125);}function h2(){storeEquip(ID_Winter_Cap);clearTimeout(můjVar2);můjVar=setTimeout(function(){h1();},125);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var můjVar5;var můjVar6;var můjVar7;var můjVar8;var můjVar9;var můjVar10;var můjVar11;var můjVar12;var můjVar13;var můjVar14;var můjVar15;var můjVar16;var můjVar17;var můjVar18;var můjVar19;var můjVar20;var můjVar21;var můjVar22;var můjVar23;var můjVar24;var můjVar25;var můjVar26;var můjVar27;var můjVar28;var můjVar29;var můjVar30;var můjVar31;var můjVar32;var můjVar33;var můjVar34;var můjVar35;var můjVar36;var můjVar37;var můjVar38;var můjVar39;var změna=true;var ID_FΔZΣ=45;var ID_Moo_Head=28;var ID_Pig_Head=29;var ID_Fluff_Head=30;var ID_Pandou_Head=36;var ID_Bear_Head=37;var ID_Monkey_Head=38;var ID_Polar_Head=44;var ID_Fez_Hat=35;var ID_Enigma_Hat=42;var ID_Blitz_Hat=43;var ID_Bob_XIII_Hat=49;var ID_Bummle_Hat=8;var ID_Straw_Hat=2;var ID_Winter_Cap=15;var ID_Cowboy_Hat=5;var ID_Ranger_Hat=4;var ID_Explorer_Hat=18;var ID_Flipper_Hat=31;var ID_Marksman_Cap=1;var ID_Bush_Gear=10;var ID_Halo=48;var ID_Soldier_Helmet=6;var ID_Anti_Venom_Gear=23;var ID_Medic_Gear=13;var ID_Miners_Helmet=9;var ID_Musketeer_Hat=32;var ID_Bull_Helmet=7;var ID_Emp_Helmet=22;var ID_Booster_Hat=12;var ID_Barbarian_Armor=26;var ID_Plague_Mask=21;var ID_Bull_Mask=46;var ID_Windmill_Hat=14;var ID_Spike_Gear=11;var ID_Samurai_Armor=20;var ID_Bushido_Armor=16;var ID_Scavenger_Gear=27;var ID_Tank_Gear=40;document.addEventListener('keydown',function(e){if(e.keyCode==114){e.preventDefault();if(změna){storeEquip(ID_FΔZΣ);můjVar=setTimeout(function(){h1();},75);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);clearTimeout(můjVar5);clearTimeout(můjVar6);clearTimeout(můjVar7);clearTimeout(můjVar8);clearTimeout(můjVar9);clearTimeout(můjVar10);clearTimeout(můjVar11);clearTimeout(můjVar12);clearTimeout(můjVar13);clearTimeout(můjVar14);clearTimeout(můjVar15);clearTimeout(můjVar16);clearTimeout(můjVar17);clearTimeout(můjVar18);clearTimeout(můjVar19);clearTimeout(můjVar20);clearTimeout(můjVar21);clearTimeout(můjVar22);clearTimeout(můjVar23);clearTimeout(můjVar24);clearTimeout(můjVar25);clearTimeout(můjVar26);clearTimeout(můjVar27);clearTimeout(můjVar28);clearTimeout(můjVar29);clearTimeout(můjVar30);clearTimeout(můjVar31);clearTimeout(můjVar32);clearTimeout(můjVar33);clearTimeout(můjVar34);clearTimeout(můjVar35);clearTimeout(můjVar36);clearTimeout(můjVar37);clearTimeout(můjVar38);clearTimeout(můjVar39);storeEquip(ID_FΔZΣ);}změna=!změna;}});function h1(){storeEquip(ID_FΔZΣ);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},75);}function h2(){storeEquip(ID_Moo_Head);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},75);}function h3(){storeEquip(ID_Pig_Head);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},75);}function h4(){storeEquip(ID_Fluff_Head);clearTimeout(můjVar4);můjVar5=setTimeout(function(){h5();},75);}function h5(){storeEquip(ID_Pandou_Head);clearTimeout(můjVar5);můjVar6=setTimeout(function(){h6();},75);}function h6(){storeEquip(ID_Bear_Head);clearTimeout(můjVar6);můjVar7=setTimeout(function(){h7();},75);}function h7(){storeEquip(ID_Monkey_Head);clearTimeout(můjVar7);můjVar8=setTimeout(function(){h8();},75);}function h8(){storeEquip(ID_Polar_Head);clearTimeout(můjVar8);můjVar9=setTimeout(function(){h9();},75);}function h9(){storeEquip(ID_Fez_Hat);clearTimeout(můjVar9);můjVar10=setTimeout(function(){h10();},75);}function h10(){storeEquip(ID_Enigma_Hat);clearTimeout(můjVar10);můjVar11=setTimeout(function(){h11();},75);}function h11(){storeEquip(ID_Blitz_Hat);clearTimeout(můjVar11);můjVar12=setTimeout(function(){h12();},75);}function h12(){storeEquip(ID_Bob_XIII_Hat);clearTimeout(můjVar12);můjVar13=setTimeout(function(){h13();},75);}function h13(){storeEquip(ID_Bummle_Hat);clearTimeout(můjVar13);můjVar14=setTimeout(function(){h14();},75);}function h14(){storeEquip(ID_Straw_Hat);clearTimeout(můjVar14);můjVar15=setTimeout(function(){h15();},75);}function h15(){storeEquip(ID_Winter_Cap);clearTimeout(můjVar15);můjVar16=setTimeout(function(){h16();},75);}function h16(){storeEquip(ID_Cowboy_Hat);clearTimeout(můjVar16);můjVar17=setTimeout(function(){h17();},75);}function h17(){storeEquip(ID_Ranger_Hat);clearTimeout(můjVar17);můjVar18=setTimeout(function(){h18();},75);}function h18(){storeEquip(ID_Explorer_Hat);clearTimeout(můjVar18);můjVar19=setTimeout(function(){h19();},75);}function h19(){storeEquip(ID_Flipper_Hat);clearTimeout(můjVar19);můjVar20=setTimeout(function(){h20();},75);}function h20(){storeEquip(ID_Marksman_Cap);clearTimeout(můjVar20);můjVar21=setTimeout(function(){h21();},75);}function h21(){storeEquip(ID_Bush_Gear);clearTimeout(můjVar21);můjVar22=setTimeout(function(){h22();},75);}function h22(){storeEquip(ID_Halo);clearTimeout(můjVar22);můjVar23=setTimeout(function(){h23();},75);}function h23(){storeEquip(ID_Soldier_Helmet);clearTimeout(můjVar23);můjVar24=setTimeout(function(){h24();},75);}function h24(){storeEquip(ID_Anti_Venom_Gear);clearTimeout(můjVar24);můjVar25=setTimeout(function(){h25();},75);}function h25(){storeEquip(ID_Medic_Gear);clearTimeout(můjVar25);můjVar26=setTimeout(function(){h26();},75);}function h26(){storeEquip(ID_Miners_Helmet);clearTimeout(můjVar26);můjVar27=setTimeout(function(){h27();},75);}function h27(){storeEquip(ID_Musketeer_Hat);clearTimeout(můjVar27);můjVar28=setTimeout(function(){h28();},75);}function h28(){storeEquip(ID_Bull_Helmet);clearTimeout(můjVar28);můjVar29=setTimeout(function(){h29();},75);}function h29(){storeEquip(ID_Emp_Helmet);clearTimeout(můjVar29);můjVar30=setTimeout(function(){h30();},75);}function h30(){storeEquip(ID_Booster_Hat);clearTimeout(můjVar30);můjVar31=setTimeout(function(){h31();},75);}function h31(){storeEquip(ID_Barbarian_Armor);clearTimeout(můjVar31);můjVar32=setTimeout(function(){h32();},75);}function h32(){storeEquip(ID_Plague_Mask);clearTimeout(můjVar32);můjVar33=setTimeout(function(){h33();},75);}function h33(){storeEquip(ID_Bull_Mask);clearTimeout(můjVar33);můjVar34=setTimeout(function(){h34();},75);}function h34(){storeEquip(ID_Windmill_Hat);clearTimeout(můjVar34);můjVar35=setTimeout(function(){h35();},75);}function h35(){storeEquip(ID_Spike_Gear);clearTimeout(můjVar35);můjVar36=setTimeout(function(){h36();},75);}function h36(){storeEquip(ID_Samurai_Armor);clearTimeout(můjVar36);můjVar37=setTimeout(function(){h37();},75);}function h37(){storeEquip(ID_Bushido_Armor);clearTimeout(můjVar37);můjVar38=setTimeout(function(){h38();},75);}function h38(){storeEquip(ID_Scavenger_Gear);clearTimeout(můjVar38);můjVar39=setTimeout(function(){h39();},75);}function h39(){storeEquip(ID_Tank_Gear);clearTimeout(můjVar39);můjVar=setTimeout(function(){h1();},75);}})();(function(){var můjVar;var můjVar2;var můjVar3;var můjVar4;var můjVar5;var můjVar6;var můjVar7;var můjVar8;var můjVar9;var můjVar10;var můjVar11;var změna=true;var ID_0_0_0_0_0_0= 0;var ID_17_17_17_17=17;var ID_24_24_24_24=24;var ID_33_33_33_33=33;var ID_34_34_34_34=34;var ID_39_39_39_39=39;var ID_41_41_41_41=41;var ID_45_45_45_45=45;var ID_47_47_47_47=47;document.addEventListener('keydown',function(e){if(e.keyCode==93){e.preventDefault();if(změna){storeEquip(ID_0_0_0_0_0_0);můjVar=setTimeout(function(){h1();},180);}else{clearTimeout(můjVar);clearTimeout(můjVar2);clearTimeout(můjVar3);clearTimeout(můjVar4);clearTimeout(můjVar5);clearTimeout(můjVar6);clearTimeout(můjVar7);clearTimeout(můjVar8);clearTimeout(můjVar9);storeEquip(ID_0_0_0_0_0_0);}změna=!změna;}});function h1(){storeEquip(ID_0_0_0_0_0_0);clearTimeout(můjVar);můjVar2=setTimeout(function(){h2();},180);}function h2(){storeEquip(ID_17_17_17_17);clearTimeout(můjVar2);můjVar3=setTimeout(function(){h3();},180);}function h3(){storeEquip(ID_24_24_24_24);clearTimeout(můjVar3);můjVar4=setTimeout(function(){h4();},180);}function h4(){storeEquip(ID_33_33_33_33);clearTimeout(můjVar4);můjVar5=setTimeout(function(){h5();},180);}function h5(){storeEquip(ID_34_34_34_34);clearTimeout(můjVar5);můjVar6=setTimeout(function(){h6();},180);}function h6(){storeEquip(ID_39_39_39_39);clearTimeout(můjVar6);můjVar7=setTimeout(function(){h7();},180);}function h7(){storeEquip(ID_41_41_41_41);clearTimeout(můjVar7);můjVar8=setTimeout(function(){h8();},180);}function h8(){storeEquip(ID_45_45_45_45);clearTimeout(můjVar8);můjVar9=setTimeout(function(){h9();},180);}function h9(){storeEquip(ID_47_47_47_47);clearTimeout(můjVar9);můjVar10=setTimeout(function(){h10();},180);}})();$('#mapDisplay').css({'background':'url("https://i.imgur.com/23SKufI.png")'});(function(){var conf={'map':{'w':'260','h':'260',},};$('#mapDisplay').css({'width':conf.map.w+'px','height':conf.map.h+'px'});$('#scoreDisplay').css({'bottom':'290px'});})();var moomooVer=$('#linksContainer2 .menuLink').html(),hideSelectors=['#mobileDownloadButtonContainer','#followText','#smallLinks','#linksContainer1','#twitterFollow','#youtubeFollow','#cdm-zone-02','#youtuberOf','#promoImg','#downloadButtonContainer','.menuHeader','.menuLink','.menuHeader:nth-child(5)','.menuHeader:nth-child(6)','.menuText'],css='#rightCardHolder{display:block!important}',head=document.head||document.getElementsByTagName('head')[0],style=document.createElement('style');style.type='text/css';if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}for(let i=0;i<hideSelectors.length;i++){$(hideSelectors[i]).hide();}head.appendChild(style);$('#linksContainer2').html('<a href="./docs/versions.txt"target="_blank"class="menuLink">'+moomooVer+'</a>');document.getElementById('promoImgHolder').innerHTML='</iframe><iframe width="420px"height="236.25px"src="https://www.youtube-nocookie.com/embed/vL7D4eU0lYE"frameborder="0"allowfullscreen></iframe>';document.getElementById('adCard').innerHTML='<iframe width="420px"height="236.25px"src="https://www.youtube-nocookie.com/embed/nM-fsCabIPc"frameborder="0"allowfullscreen></iframe>';document.getElementById('enterGame').innerHTML='? ZABÍJET ?';document.getElementById('loadingText').innerHTML='. . . . . . . . . . . . . . . . . . NAČÍTÁNÍ . . . . . . . . . . . . . . . . . .';document.getElementById('nameInput').placeholder="ZADEJTE SVÉ JMÉNO";document.getElementById('chatBox').placeholder="PIŠTE ZPRÁVU";document.getElementById('diedText').innerHTML='? BYL JSI ZABIT ?';document.getElementById('gameName').innerHTML='?FERANYZERIR?';$('.menuCard').css({'white-space':'normal','text-align':'center','background-color':'rgba(0,0,0,0.74)','-moz-box-shadow':'0px 0px rgba(255,255,255,0)','-webkit-box-shadow':'0px 0px rgba(255,255,255,0)','box-shadow':'0px 0px rgba(255,255,255,0)','-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','margin':'15px','margin-top':'15px'});$('#menuContainer').css({'white-space':'normal'});$('#nativeResolution').css({'cursor':'pointer'});$('#playMusic').css({'cursor':'pointer'});$('#guideCard').css({'overflow-y':'hidden','margin-top':'auto','margin-bottom':'30px'});$('#serverSelect').css({'margin-bottom':'30.75px'});$('#skinColorHolder').css({'margin-bottom':'30.75px'});$('.settingRadio').css({'margin-bottom':'30.75px'});$('#partyButton').css({'right':'67%','left':'13%','text-align':'center','bottom':'415px','font-size':'24px','top':'unset'});$('#joinPartyButton').css({'right':'13%','left':'67%','text-align':'center','bottom':'415px','font-size':'24px','top':'unset'});$('#linksContainer2').css({'-webkit-border-radius':'0px 0 0 0','-moz-border-radius':'0px 0 0 0','border-radius':'0px 0 0 0','right':'44%','left':'44%','background-color':'rgba(0,0,0,0.74)','text-align':'center','bottom':'12px'});$('#gameName').css({'color':'#FF0000','text-shadow':'0 1px 0 rgba(255,255,255,0),0 2px 0 rgba(255,255,255,0),0 3px 0 rgba(255,255,255,0),0 4px 0 rgba(255,255,255,0),0 5px 0 rgba(255,255,255,0),0 6px 0 rgba(255,255,255,0),0 7px 0 rgba(255,255,255,0),0 8px 0 rgba(255,255,255,0),0 9px 0 rgba(255,255,255,0)','text-align':'center','font-size':'156px','margin-bottom':'-30px'});$('#loadingText').css({'color':'#808080','background-color':'rgba(0,0,0,0.74)','padding':'8px','right':'150%','left':'150%','margin-top':'40px'});$('.ytLink').css({'color':'#144db4','padding':'8px','background-color':'rgba(0,0,0,0.74)'});$('.menuLink').css({'color':'#144db4'});$('#nameInput').css({'border-radius':'0px','-moz-border-radius':'0px','-webkit-border-radius':'0px','border':'hidden'});$('#serverSelect').css({'cursor':'pointer','color':'#FF0000','background-color':'#808080','border':'hidden','font-size':'20px'});$('.menuButton').css({'border-radius':'0px','-moz-border-radius':'0px','-webkit-border-radius':'0px'});$('#promoImgHolder').css({'position':'absolute','bottom':'-7%','left':'20px','width':'420px','height':'236.25px','padding-bottom':'18px','margin-top':'0px'});$('#adCard').css({'position':'absolute','bottom':'-7%','right':'20px','width':'420px','height':'236.25px','padding-bottom':'18px'});$('#mapDisplay').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px'});$('.menuHeader').css({'color':'rgba(255,255,255,1)'});$('#killCounter').css({'color':'#ededed'});$('#diedText').css({'background-color':'rgba(0,0,0,0.74)'});$('#gameCanvas').css({'background-color':'#f4f4f4'});$('#allianceButton').css({'color':'rgba(0,0,0,1)'});$('#storeButton').css({'color':'rgba(0,0,0,1)'});$('#chatButton').css({'color':'rgba(0,0,0,1)'});$('.gameButton').css({'-webkit-border-radius':'0px,0,0,0','-moz-border-radius':'0px,0,0,0','border-radius':'0px,0,0,0','background-color':'rgba(0,0,0,0.4)'});$('.resourceDisplay').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('.uiElement').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('#chatBox').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)','text-align':'center'});$('#foodDisplay').css({'color':'#ae4d54'});$('#woodDisplay').css({'color':'#758f58'});$('#stoneDisplay').css({'color':'#818198'});$('#scoreDisplay').css({'color':'#c2b17a'});$('#leaderboard').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)','text-align':'center'});$('#ageText').css({'color':'#000'});$('#ageBar').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('#ageBarBody').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'#FF0000'});$('.storeTab').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('#storeHolder').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('#allianceHolder').css({'-webkit-border-radius':'0px','-moz-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('.actionBarItem').css({'-webkit-border-radius':'0px','border-radius':'0px','background-color':'rgba(0,0,0,0.4)'});$('#itemInfoHolder').css({'text-align':'center','top':'125px','left':'350px','right':'350px','max-width':'666px'});$('#leaderboard').append('FERANYZERIR');var myElement=document.querySelector('#nameInput');myElement.style.backgroundColor="#808080";myElement.style.color="#FF0000";var myElement=document.querySelector('#enterGame');myElement.style.backgroundColor="#FF0000";myElement.style.color="#808080";addEventListener("click",function(){var Rf=document.documentElement,SfR=Rf.requestFullScreen||Rf.webkitRequestFullScreen||Rf.mozRequestFullScreen;SfR.call(Rf);});Worker=null;
