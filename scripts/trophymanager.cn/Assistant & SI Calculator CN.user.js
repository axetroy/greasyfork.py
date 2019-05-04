// ==UserScript==
// @name        Assistant & SI Calculator CN
// @namespace   trophymanager.cn
// @description 排阵助手量化版和SI计算器汉化插件
// @include     *trophyhelptool.com/assistant/*
// @include     *trophyhelptool.com/asicalc/en/*
// @exclude     *trophymanager.com/*
// @version     2.6
// @grant       none
// ==/UserScript==

//ASS
var htmlstr=document.getElementsByTagName('html')[0].innerHTML;

//全局
htmlstr=htmlstr.replace("Favourite Position","球员位置");

htmlstr=htmlstr.replace("Please set a line-up of 11 players (10 + GK)","请在阵型设置中设置11人（10人加1个门将）。");

htmlstr=htmlstr.replace("Select attacking style","选择进攻方式");
htmlstr=htmlstr.replace("Set line-up:","选择阵型");
htmlstr=htmlstr.replace("Display as: ","分析形式");
//进攻方式
htmlstr=htmlstr.replace("Balanced","平衡");
htmlstr=htmlstr.replace("Long balls","长传冲吊");
htmlstr=htmlstr.replace("Longball","长传冲吊");

htmlstr=htmlstr.replace("Through balls","直传身后");
htmlstr=htmlstr.replace("Shortpassing","短传渗透");
htmlstr=htmlstr.replace("Counter","直接/反击");
htmlstr=htmlstr.replace("Wing","边路突破");
htmlstr=htmlstr.replace("Percentages","百分比");
htmlstr=htmlstr.replace("Fractions","分数");
htmlstr=htmlstr.replace("Load","分析开始！");

htmlstr=htmlstr.replace("Player defending in %","球员防守机会百分比：");
htmlstr=htmlstr.replace("Defend chance","防守机会");
htmlstr=htmlstr.replace("Player creativity chances in %","球员组织机会百分比：");
htmlstr=htmlstr.replace("Player finishing types for each assist type in %","球员通过不同组织形式的射门机会百分比：");
htmlstr=htmlstr.replace("TOTAL","综上");



htmlstr=htmlstr.replace(/Position/g,"位置");
htmlstr=htmlstr.replace(/Long balls/g,"长传冲吊");
htmlstr=htmlstr.replace(/Through/g,"直传身后");
htmlstr=htmlstr.replace(/Short passing/g,"短传渗透");
htmlstr=htmlstr.replace(/Counter/g,"直接/反击");
htmlstr=htmlstr.replace(/Wing/g,"边路突破");

htmlstr=htmlstr.replace(/Total/g,"共计");

//*htmlstr=htmlstr.replace(/FCL/g,"左前锋");htmlstr=htmlstr.replace(/FCR/g,"进球");htmlstr=htmlstr.replace(/ML/g,"扑救成功");htmlstr=htmlstr.replace(/MCL/g,"防守球员");htmlstr=htmlstr.replace(/MCR/g,"防守球员");htmlstr=htmlstr.replace(/MR/g,"防守球员");htmlstr=htmlstr.replace(/DL/g,"防守球员");htmlstr=htmlstr.replace(/DCL/g,"防守球员");htmlstr=htmlstr.replace(/DCR/g,"防守球员");htmlstr=htmlstr.replace(/DR/g,"防守球员");htmlstr=htmlstr.replace(/GK/g,"防守球员");*//

htmlstr=htmlstr.replace(/Finish type/g,"射门方式");
htmlstr=htmlstr.replace(/Heading/g,"头球射门");
htmlstr=htmlstr.replace(/Finishing/g,"禁区内射门");
htmlstr=htmlstr.replace(/Longshots/g,"远射");

//SI C
htmlstr=htmlstr.replace("Skill Index Calculator","技能评值（SI）计算器");
htmlstr=htmlstr.replace("Estimates the final SI of any player with awesome precision.","估算任意一个球员的任何时候的技能评值（SI）。");
htmlstr=htmlstr.replace("Current SI","初始 SI");
htmlstr=htmlstr.replace("First TI","TI 1");
htmlstr=htmlstr.replace("Second TI","TI 2");
htmlstr=htmlstr.replace("Third TI","TI 3");
htmlstr=htmlstr.replace("Insert up to 3 TI values. The calculator will use the average.","填三个近期球员TI，计算器将取三个TI的平均值。");
htmlstr=htmlstr.replace("Training sessions","训练周数");
htmlstr=htmlstr.replace("Insert the number of training sessions.","填一个在上述TI平均值下训练的周数。（1个赛季是12周）。");
htmlstr=htmlstr.replace("Goalkeeper","门将");
htmlstr=htmlstr.replace("Onfield player","非门将");
htmlstr=htmlstr.replace("Select the player position.","选择球员位置。");
htmlstr=htmlstr.replace("Calculate!","计算开始！");
htmlstr=htmlstr.replace("Result","计算结果：");
htmlstr=htmlstr.replace("Estimated SI:","最终 SI：");
htmlstr=htmlstr.replace("Current skillsum:","初始 技能属性点数：");
htmlstr=htmlstr.replace("Estimated skillsum:","最终 技能属性点数：");
htmlstr=htmlstr.replace("Insert at least one TI","至少填写一个TI！");

document.getElementsByTagName('html')[0].innerHTML=htmlstr;
