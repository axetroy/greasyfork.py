
暴力猴
已安装的脚本
设置
关于
 

搜索脚本...

























脚本编辑器
代码 设置
How to edit with your favorite editor?

1
// ==UserScript==
2
// @name        TM Name CN
3
// @namespace   trophymanager.cn
4
// @description 球员姓名汉化
5
// @include     *trophymanager.com*
6
// @exclude     *trophymanager.com/training*
7
// @exclude     *trophymanager.com/sponsors*
8
// @exclude     *trophymanager.com/players/
9
// @exclude     *trophymanager.com/players/#/a/true/b//
10
// @exclude     *trophymanager.com/players/#/a/true/b/true/
11
// @exclude     *trophymanager.com/players/#/a//b/true/
12
// @version     2018050103
13
// @grant       none
14
​
15
16
// ==/UserScript==
17
​
18
​
19
var htmlstr=document.getElementsByTagName('html')[0].innerHTML;
20
htmlstr=htmlstr.replace(/(111(?=))|(111$)/g,"111");
21
//河北华夏幸福
22
htmlstr=htmlstr.replace(/Dimitar Topuzakov/g,"迪米塔·托普扎科夫");
23
htmlstr=htmlstr.replace(/Zhong YaLong/g,"钟亚龙");
24
htmlstr=htmlstr.replace(/Xie XueJun/g,"谢学军"); 
25
htmlstr=htmlstr.replace(/Lin ShiAn/g,"林世安");
26
htmlstr=htmlstr.replace(/Hao XiangJie/g,"郝祥杰");
27
htmlstr=htmlstr.replace(/Mu YongZhe/g,"穆永哲");
28
htmlstr=htmlstr.replace(/Jalal Alshomrani/g,"贾拉勒 阿尔沙穆兰尼");
29
htmlstr=htmlstr.replace(/Ji MingJun/g,"姬明俊");
30
htmlstr=htmlstr.replace(/William Petiot/g,"威廉 佩蒂奥");
31
htmlstr=htmlstr.replace(/Tayyar Atalay/g,"泰亚 阿塔莱");
32
htmlstr=htmlstr.replace(/Zhai DaLei/g,"翟大雷");
33
htmlstr=htmlstr.replace(/Ernest Fiedoruk/g,"埃内斯特 费尔多鲁克");
34
htmlstr=htmlstr.replace(/Marco Kamper/g,"马尔科 坎贝尔");
35
htmlstr=htmlstr.replace(/Lai YingTao/g,"赖英涛");
36
htmlstr=htmlstr.replace(/Arnold Trinkl/g,"阿诺德 特林克尔");
37
htmlstr=htmlstr.replace(/Shao DaWei/g,"邵大伟");
38
htmlstr=htmlstr.replace(/Hu ShiMao/g,"胡世茂");
39
htmlstr=htmlstr.replace(/Boris Poliak/g,"鲍里斯 博利阿克");
40
htmlstr=htmlstr.replace(/Ye HuiFeng/g,"叶辉丰");
41
htmlstr=htmlstr.replace(/Mu JunNing/g,"穆俊宁");
42
htmlstr=htmlstr.replace(/Shang YiXuan/g,"尚艺轩");
43
htmlstr=htmlstr.replace(/Zhou SenXiang/g,"周森祥");
44
htmlstr=htmlstr.replace(/Huang GuoQin/g,"黄国勤");
45
htmlstr=htmlstr.replace(/Peng GuangJie/g,"彭广杰");
46
htmlstr=htmlstr.replace(/Xu KeJian/g,"徐克俭");
47
htmlstr=htmlstr.replace(/Tai ChunBin/g,"邰春斌");
48
htmlstr=htmlstr.replace(/Pan DongYang/g,"潘东阳");
49
htmlstr=htmlstr.replace(/Ke SongHu/g,"柯松虎"); 
50
​
51
//屯屯屯
保存 保存并关闭 关闭