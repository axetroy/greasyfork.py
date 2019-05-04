// ==UserScript==
// @name        TM Name CN new
// @namespace   trophymanager.cn
// @description 球员姓名汉化
// @include     *trophymanager.com*
// @exclude     *trophymanager.com/training*
// @exclude     *trophymanager.com/sponsors*
// @exclude     *trophymanager.com/players/
// @exclude     *trophymanager.com/players/#/a/true/b//
// @exclude     *trophymanager.com/players/#/a/true/b/true/
// @exclude     *trophymanager.com/players/#/a//b/true/
// @version     20190429001
// @grant       none

// ==/UserScript==

var htmlstr=document.getElementsByTagName('html')[0].innerHTML;
htmlstr=htmlstr.replace(/(111(?=))|(111$)/g,"111");

//No.1
//北京零点
htmlstr=htmlstr.replace(/Ling MuYuan/g,"凌穆辕");  
htmlstr=htmlstr.replace(/Li JinYu/g,"李金羽");  

//No.2
//义乌创达集团有限公司 
htmlstr=htmlstr.replace(/Wang YanFei/g,"王延飞"); 
htmlstr=htmlstr.replace(/Xie XueZheng/g,"谢学征"); 
htmlstr=htmlstr.replace(/Mo AiMin/g,"莫艾闵");
htmlstr=htmlstr.replace(/Zhu ZhongYou/g,"朱忠友");
htmlstr=htmlstr.replace(/Ye ShuRen/g,"叶庶仁"); 
htmlstr=htmlstr.replace(/Tie JiuZhou/g,"铁久洲");
htmlstr=htmlstr.replace(/Li YiKang/g,"李益康");


//No.3
//太原FC
htmlstr=htmlstr.replace(/Bi Xiao/g,"毕萧");
htmlstr=htmlstr.replace(/Bi ZhongTian/g,"毕中天");
htmlstr=htmlstr.replace(/Cao MiaoRui/g,"曹妙瑞");
htmlstr=htmlstr.replace(/Gao GuangZhong/g,"高光忠");
htmlstr=htmlstr.replace(/Gao XinYue/g,"高欣越");
htmlstr=htmlstr.replace(/Gong ChaoYuan/g,"宫朝原");
htmlstr=htmlstr.replace(/Guan Chun/g,"关淳");
htmlstr=htmlstr.replace(/Guo KangCheng/g,"郭康成");
htmlstr=htmlstr.replace(/Han MingYi/g,"韩明义");
htmlstr=htmlstr.replace(/He ShengYi/g,"何圣依");
htmlstr=htmlstr.replace(/He Zhi/g,"何志");
htmlstr=htmlstr.replace(/Hong DongBing/g,"洪东兵");
htmlstr=htmlstr.replace(/Hong WeiQiang/g,"洪伟强");
htmlstr=htmlstr.replace(/Hu JinPing/g,"胡金平");
htmlstr=htmlstr.replace(/Huang XiaoMing/g,"黄晓明");
htmlstr=htmlstr.replace(/Huang ZhiXuan/g,"黄智炫");
htmlstr=htmlstr.replace(/HuangFu PengHan/g,"皇甫澎瀚");
htmlstr=htmlstr.replace(/Jia DeChao/g,"贾德超");
htmlstr=htmlstr.replace(/Kong ZhenSheng/g,"孔振生");
htmlstr=htmlstr.replace(/Li DeNan|Li '小李飞刀' DeNan/g,"李德南");
htmlstr=htmlstr.replace(/Li FangZhuo/g,"李方卓");
htmlstr=htmlstr.replace(/Li KaiRen/g,"李开仁");
htmlstr=htmlstr.replace(/Li QiXian/g,"李齐贤");
htmlstr=htmlstr.replace(/Li RuiQiang/g,"李瑞强");
htmlstr=htmlstr.replace(/Liang JianChun/g,"梁建春");
htmlstr=htmlstr.replace(/Liang Liang/g,"梁良");
htmlstr=htmlstr.replace(/Liu Lu/g,"刘陆");
htmlstr=htmlstr.replace(/Lu XueFei/g,"陆学飞");
htmlstr=htmlstr.replace(/Ma LiQiang/g,"马立强");
htmlstr=htmlstr.replace(/Ma NingYuan/g,"马宁远");
htmlstr=htmlstr.replace(/Mi SanQiang/g,"米三强");
htmlstr=htmlstr.replace(/Niu XinKai/g,"牛新凯");
htmlstr=htmlstr.replace(/Ou ZhenHua/g,"欧振华");
htmlstr=htmlstr.replace(/Pan FengYi/g,"潘峰怡");
htmlstr=htmlstr.replace(/Qian HaiCheng/g,"钱海澄");
htmlstr=htmlstr.replace(/Qian PengCheng/g,"钱鹏程");
htmlstr=htmlstr.replace(/She JiHua/g,"佘继华");
htmlstr=htmlstr.replace(/Shen RuiLin/g,"沈瑞琳");
htmlstr=htmlstr.replace(/Shi JiangHua/g,"石江华");
htmlstr=htmlstr.replace(/Shi ZhiNing/g,"石志宁");
htmlstr=htmlstr.replace(/Si ZhengPeng/g,"司正鹏");
htmlstr=htmlstr.replace(/Sun Lei/g,"孙磊");
htmlstr=htmlstr.replace(/Wan Qiang/g,"万强");
htmlstr=htmlstr.replace(/Wang TieSheng/g,"王铁生");
htmlstr=htmlstr.replace(/XianYu RunTao/g,"鲜于润涛");
htmlstr=htmlstr.replace(/Xiang QiuMing/g,"项秋明");
htmlstr=htmlstr.replace(/Xie YiFan/g,"谢一凡");
htmlstr=htmlstr.replace(/Xiong JianQiang/g,"熊建强");
htmlstr=htmlstr.replace(/Yan FengSheng/g,"闫丰胜");
htmlstr=htmlstr.replace(/Ye DeNan/g,"叶德楠");
htmlstr=htmlstr.replace(/Yi HaiDong|Yi '一嗨咚' HaiDong/g,"易海东");
htmlstr=htmlstr.replace(/Zhai YueFei/g,"翟跃飞");
htmlstr=htmlstr.replace(/Zhang ChenXi/g,"张晨曦");
htmlstr=htmlstr.replace(/Zhang DaWei/g,"张达维");
htmlstr=htmlstr.replace(/Zhang YuanHang/g,"张远航");
htmlstr=htmlstr.replace(/Zhao BinJia/g,"赵彬嘉");
htmlstr=htmlstr.replace(/Zhen XiangNan/g,"甄向楠");
htmlstr=htmlstr.replace(/Zhou PengZhi/g,"周鹏志");
htmlstr=htmlstr.replace(/Zhou TaoFu/g,"周涛福");
htmlstr=htmlstr.replace(/Zhou Zheng/g,"周正");
htmlstr=htmlstr.replace(/ZhuGe BinYi/g,"诸葛滨懿");
htmlstr=htmlstr.replace(/Zhuang Han/g,"庄寒");
htmlstr=htmlstr.replace(/Zhuang LongYuan/g,"庄龙渊");
htmlstr=htmlstr.replace(/Zu JiangHua/g,"祖江华");



//No.4
//纽约市市委办公室 
htmlstr=htmlstr.replace(/Alessandro Fari/g,"亚历山德罗·法里"); 
htmlstr=htmlstr.replace(/Bernard Manina/g,"伯纳德·马尼纳"); 
htmlstr=htmlstr.replace(/Cheng YiBo/g,"程一博"); 
htmlstr=htmlstr.replace(/Daniel O'Keefe/g,"丹尼尔·奥基夫"); 
htmlstr=htmlstr.replace(/Federico Martin Contreras/g,"费德里克·马丁·孔特雷拉斯"); 
htmlstr=htmlstr.replace(/He ZeJia/g,"何泽佳");
htmlstr=htmlstr.replace(/Ibrahim Baasch/g,"易卜拉欣·巴什"); 
htmlstr=htmlstr.replace(/Iulian Craciun/g,"尤利安·克拉申"); 
htmlstr=htmlstr.replace(/Jay Bertin/g,"杰伊·贝尔汀"); 
htmlstr=htmlstr.replace(/Ji MuZong/g,"季木宗"); 
htmlstr=htmlstr.replace(/Karol Sydor/g,"卡罗尔·希多"); 
htmlstr=htmlstr.replace(/Kostas Anastasiadis/g,"科斯塔斯·安纳斯塔迪亚斯"); 
htmlstr=htmlstr.replace(/Ksawery Szych/g,"克什里"); 
htmlstr=htmlstr.replace(/Leng RenTian/g,"冷仁天"); 
htmlstr=htmlstr.replace(/Li HanShuo/g,"李寒朔"); 
htmlstr=htmlstr.replace(/Li XuanDe/g,"李轩徳"); 
htmlstr=htmlstr.replace(/Lu YingQuan/g,"陆英权"); 
htmlstr=htmlstr.replace(/Lus Arévalos/g,"卢斯·阿旺索"); 
htmlstr=htmlstr.replace(/Ma XingHan/g,"马兴汉"); 
htmlstr=htmlstr.replace(/Niu QingLin/g,"牛青林"); 
htmlstr=htmlstr.replace(/Norbert Tóth/g,"诺伯特·托斯"); 
htmlstr=htmlstr.replace(/Qiu GuoWen/g,"邱国稳"); 
htmlstr=htmlstr.replace(/Rao AiGuo/g,"饶爱国"); 
htmlstr=htmlstr.replace(/Shi ChuGe/g,"石楚阁"); 
htmlstr=htmlstr.replace(/Xu MengDa/g,"徐萌大"); 
htmlstr=htmlstr.replace(/Ye YingQuan/g,"叶英权"); 
htmlstr=htmlstr.replace(/Yin ZeHong/g,"尹泽弘"); 
htmlstr=htmlstr.replace(/Yu WenJun/g,"余文君"); 
htmlstr=htmlstr.replace(/Zeng WenYong/g,"曾稳勇"); 
htmlstr=htmlstr.replace(/Zhang FengChui/g,"张风吹"); 


//No.5
//川沙辅川 
htmlstr=htmlstr.replace(/Ao GuangYang/g,"岙广鞅"); 
htmlstr=htmlstr.replace(/Ao JiHai/g,"岙冀海"); 
htmlstr=htmlstr.replace(/Bony Abdullah/g,"邦尼·阿卜杜拉"); 
htmlstr=htmlstr.replace(/Cai PinGuan/g,"蔡品冠"); 
htmlstr=htmlstr.replace(/Chao Le/g,"晁乐"); 
htmlstr=htmlstr.replace(/Chen ChengQi/g,"陈成琪"); 
htmlstr=htmlstr.replace(/Chen TianYuan/g,"陈天远"); 
htmlstr=htmlstr.replace(/Dai JiuZhou/g,"代九州"); 
htmlstr=htmlstr.replace(/Hu JiaYu/g,"胡驾域");
htmlstr=htmlstr.replace(/Huang JinChao/g,"黄晋朝 "); 
htmlstr=htmlstr.replace(/Ji YiMin/g,"季以旻"); 
htmlstr=htmlstr.replace(/Jonathan Breydel/g,"乔纳森·布雷迪尔"); 
htmlstr=htmlstr.replace(/Liang JiaShu/g,"梁稼述"); 
htmlstr=htmlstr.replace(/Liang RuiWen/g,"梁睿文"); 
htmlstr=htmlstr.replace(/Lin HongLe/g,"林弘乐"); 
htmlstr=htmlstr.replace(/Liu KeRui/g,"刘克睿");
htmlstr=htmlstr.replace(/Lu XiaoFan/g,"路孝凡"); 
htmlstr=htmlstr.replace(/Luke Stevens/g,"鲁科·斯蒂文思");
htmlstr=htmlstr.replace(/Lv FuCheng/g,"吕辅承"); 
htmlstr=htmlstr.replace(/Maxim Sokov/g,"马格兹木·苏克文"); 
htmlstr=htmlstr.replace(/Nasuhi Ata/g,"纳苏黑·阿塔"); 
htmlstr=htmlstr.replace(/Qi RuoFu/g,"齐若孚"); 
htmlstr=htmlstr.replace(/Qiu MingFei/g,"邱明斐"); 
htmlstr=htmlstr.replace(/Tao ZiHe/g,"陶资和"); 
htmlstr=htmlstr.replace(/Tian JunYu/g,"田均雨"); 
htmlstr=htmlstr.replace(/Valeriy Osyanin/g,"瓦列里·奥塞宁"); 
htmlstr=htmlstr.replace(/Wang XingGuang/g,"王兴广"); 
htmlstr=htmlstr.replace(/Xiao Shangde/g,"萧尚德"); 
htmlstr=htmlstr.replace(/Yao BoFan/g,"姚博帆");
htmlstr=htmlstr.replace(/Yun Jie/g,"恽介"); 
htmlstr=htmlstr.replace(/Zhang YongYong/g,"张永雍");
htmlstr=htmlstr.replace(/ZhangLiang YueCheng/g,"张梁越丞"); 
htmlstr=htmlstr.replace(/Zheng Bei/g,"郑北"); 
htmlstr=htmlstr.replace(/Zheng ZiLong/g,"郑子隆"); 
htmlstr=htmlstr.replace(/Zhong TianYu/g,"钟田羽"); 
htmlstr=htmlstr.replace(/Zhou QiHan/g,"周祁寒"); 


//Bayer 04 Leverkusen 
//No.6
htmlstr=htmlstr.replace(/Anas Nafti/g,"阿纳斯·纳法蒂"); 
htmlstr=htmlstr.replace(/Bai GuoHao/g,"白国豪"); 
htmlstr=htmlstr.replace(/Bu GaiJie/g,"卜垓杰"); 
htmlstr=htmlstr.replace(/Cecyliusz Gotowicki/g,"塞西柳丝·格托维斯基"); 
htmlstr=htmlstr.replace(/Chi HengZhi/g,"迟恒之"); 
htmlstr=htmlstr.replace(/Fan FengChui/g,"樊风吹"); 
htmlstr=htmlstr.replace(/Fang JiaMin/g,"方佳敏"); 
htmlstr=htmlstr.replace(/Fei ZiRan/g,"妃子冉"); 
htmlstr=htmlstr.replace(/Fu WenTao/g,"付文韬"); 
htmlstr=htmlstr.replace(/Hu LiangYu/g,"胡良宇"); 
htmlstr=htmlstr.replace(/Hu XueDong/g,"胡学冬"); 
htmlstr=htmlstr.replace(/Hua ZhongYi/g,"华中一"); 
htmlstr=htmlstr.replace(/Huang WuShuang/g,"皇无双"); 
htmlstr=htmlstr.replace(/Huang ZhuoJun/g,"黄卓君"); 
htmlstr=htmlstr.replace(/Isaac Weijgertze/g,"伊萨克·维嘉格雷泽"); 
htmlstr=htmlstr.replace(/Jae-Sun Mok/g,"孙缄默"); 
htmlstr=htmlstr.replace(/Jia MingHu/g,"贾明虎"); 
htmlstr=htmlstr.replace(/Jian HongJun/g,"建红军"); 
htmlstr=htmlstr.replace(/Kanaan Al Qanawati/g,"卡纳安·埃卡那瓦迪"); 
htmlstr=htmlstr.replace(/Lai RuiLin/g,"莱瑞林"); 
htmlstr=htmlstr.replace(/Li JianFeng/g,"李剑锋"); 
htmlstr=htmlstr.replace(/Lin BeiHai/g,"林北海");
htmlstr=htmlstr.replace(/Lin HaoRan/g,"林浩然"); 
htmlstr=htmlstr.replace(/Lin ShuangBang/g,"林双邦"); 
htmlstr=htmlstr.replace(/Liu JiaXian/g,"柳嘉仙"); 
htmlstr=htmlstr.replace(/Ma ZhongShi/g,"马中士"); 
htmlstr=htmlstr.replace(/Marko Arkko/g,"马尔科·阿珂"); 
htmlstr=htmlstr.replace(/Nie AnRong/g,"聂安荣"); 
htmlstr=htmlstr.replace(/Nong ZiYun/g,"农子云"); 
htmlstr=htmlstr.replace(/Pan YinLong/g,"潘银龙"); 
htmlstr=htmlstr.replace(/Peng YuXi/g,"彭玉玺"); 
htmlstr=htmlstr.replace(/Shang BoXuan/g,"尚博轩"); 
htmlstr=htmlstr.replace(/Shao YanQiu/g,"邵彦丘"); 
htmlstr=htmlstr.replace(/Tan ZiYi/g,"谭子仪"); 
htmlstr=htmlstr.replace(/Tong GouSheng/g,"童狗剩"); 
htmlstr=htmlstr.replace(/Wu YiXin/g,"吴一心"); 
htmlstr=htmlstr.replace(/Yang DengKe/g,"杨登科"); 
htmlstr=htmlstr.replace(/Yang ShaoQiu/g,"杨少秋"); 
htmlstr=htmlstr.replace(/You YuanHang/g,"游远航"); 
htmlstr=htmlstr.replace(/Yu GuoJian/g,"俞国坚"); 
htmlstr=htmlstr.replace(/Yu RongJi/g,"于荣吉"); 
htmlstr=htmlstr.replace(/Zhao YaWen/g,"赵亚文"); 
htmlstr=htmlstr.replace(/Zhi JinJie/g,"智金杰"); 
htmlstr=htmlstr.replace(/Zou ShouCheng/g,"邹守城"); 

//NO.7
//赤龙 
htmlstr=htmlstr.replace(/Ai ZhuoYi/g,"艾卓依"); 
htmlstr=htmlstr.replace(/Bai '白泽' HaoRong|Bai HaoRong/g,"白昊戎");
htmlstr=htmlstr.replace(/Bi YiDe/g,"毕毅德");
htmlstr=htmlstr.replace(/Cai ChenYang/g,"蔡晨阳"); 
htmlstr=htmlstr.replace(/Cao XuWei/g,"曹旭威");
htmlstr=htmlstr.replace(/Chen '幼麟' ZhiYi|Chen ZhiYi/g,"陈志毅"); 
htmlstr=htmlstr.replace(/Chen AnRong/g,"陈安荣");
htmlstr=htmlstr.replace(/Cui ChuGui/g,"崔楚贵");
htmlstr=htmlstr.replace(/Deng CunRui/g,"邓存瑞"); 
htmlstr=htmlstr.replace(/Ding '叮咚龙' DongLong|Ding DongLong/g,"丁冬隆");
htmlstr=htmlstr.replace(/Gan XiangFu/g,"甘祥福");
htmlstr=htmlstr.replace(/Guo BoXiang/g,"郭伯祥");
htmlstr=htmlstr.replace(/Guo ZhuangFei/g,"郭壮飞");
htmlstr=htmlstr.replace(/Han ChaoChao/g,"韩超超");
htmlstr=htmlstr.replace(/He '睚眦' YunGuo|He YunGuo/g,"何赟国"); 
htmlstr=htmlstr.replace(/Hong '螭吻' ChengYe|Hong ChengYe/g,"洪承烨"); 
htmlstr=htmlstr.replace(/Hou YunChang/g,"侯云长");
htmlstr=htmlstr.replace(/HuangFu '狴犴' DongHui|HuangFu DongHui/g,"皇甫东辉"); 
htmlstr=htmlstr.replace(/Ji '亢金龙' YanSheng|Ji YanSheng/g,"季炎升"); 
htmlstr=htmlstr.replace(/Ji '狻猊' BoXiang|Ji BoXiang/g,"纪博翔"); 
htmlstr=htmlstr.replace(/Kong Su/g,"孔肃"); 
htmlstr=htmlstr.replace(/Li YiFan/g,"李亦凡");
htmlstr=htmlstr.replace(/Li YingLong/g,"黎应龙");
htmlstr=htmlstr.replace(/Lin '房日兔' SanZhen|Lin SanZhen/g,"林三震"); 
htmlstr=htmlstr.replace(/Liu JianLei/g,"柳建磊");
htmlstr=htmlstr.replace(/Liu XuLin/g,"刘旭麟");
htmlstr=htmlstr.replace(/Lu QiDi/g,"陆琪谛");
htmlstr=htmlstr.replace(/Lu WeiSheng/g,"卢威胜");
htmlstr=htmlstr.replace(/Lu ZongYue/g,"陆宗越");
htmlstr=htmlstr.replace(/Luo MingMing/g,"罗明明");
htmlstr=htmlstr.replace(/Min XiRong/g,"闵希戎"); 
htmlstr=htmlstr.replace(/Nan HuiTang/g,"南慧堂");
htmlstr=htmlstr.replace(/Peng '尾火虎' JiaQin|Peng JiaQin/g,"彭嘉钦"); 
htmlstr=htmlstr.replace(/Peng ChengGong/g,"彭成功");
htmlstr=htmlstr.replace(/Peng HaiFan/g,"彭海凡");
htmlstr=htmlstr.replace(/Qiu '蒲牢' YiHao|Qiu YiHao/g,"邱一豪"); 
htmlstr=htmlstr.replace(/Sang '逆鳞' ZhiXing|Sang ZhiXing/g,"桑之星"); 
htmlstr=htmlstr.replace(/Shi ZiCheng/g,"石自成");
htmlstr=htmlstr.replace(/Shui GuanJun/g,"谁冠军");
htmlstr=htmlstr.replace(/Sun YiJun/g,"孙毅钧");
htmlstr=htmlstr.replace(/Tang '箕水豹' XinJiang|Tang XinJiang/g,"唐新江"); 
htmlstr=htmlstr.replace(/Tao HuaGuo/g,"陶华国");
htmlstr=htmlstr.replace(/Tian RongKai/g,"田荣凯");
htmlstr=htmlstr.replace(/Tu DongJian/g,"涂东健"); 
htmlstr=htmlstr.replace(/Tu DunJian/g,"屠敦坚");
htmlstr=htmlstr.replace(/Wei YongZhen/g,"魏永真");
htmlstr=htmlstr.replace(/Xie JunPeng/g,"谢君鹏");
htmlstr=htmlstr.replace(/Xu LiSan/g,"徐立三"); 
htmlstr=htmlstr.replace(/Yang Xiao/g,"杨逍"); 
htmlstr=htmlstr.replace(/Ye SongYi/g,"叶松益");
htmlstr=htmlstr.replace(/Yin PengXiang/g,"殷鹏翔");
htmlstr=htmlstr.replace(/Yu Cong/g,"余聪");
htmlstr=htmlstr.replace(/Yu YingLong/g,"余应龙");
htmlstr=htmlstr.replace(/Zhang RuiKai/g,"张瑞凯"); 
htmlstr=htmlstr.replace(/Zhang TianYang/g,"张天扬");
htmlstr=htmlstr.replace(/Zhao Pu/g,"赵普");
htmlstr=htmlstr.replace(/Zheng WenJun/g,"郑文君");

//No.8
//江西秋水
htmlstr=htmlstr.replace(/Chao HaiJie/g,"晁海杰"); 
htmlstr=htmlstr.replace(/Chu Run/g,"楚润"); 
htmlstr=htmlstr.replace(/Ding TianLe/g,"丁天乐"); 
htmlstr=htmlstr.replace(/Fang XinZhi/g,"方鑫志"); 
htmlstr=htmlstr.replace(/Guo HongLe/g,"郭鸿乐"); 
htmlstr=htmlstr.replace(/Guo LiQun/g,"郭漓群"); 
htmlstr=htmlstr.replace(/Guo LongPing/g,"郭龙平"); 
htmlstr=htmlstr.replace(/Guo YongYi/g,"郭咏懿"); 
htmlstr=htmlstr.replace(/He CanHong/g,"禾璨泓"); 
htmlstr=htmlstr.replace(/Hu YiHang/g,"胡毅航"); 
htmlstr=htmlstr.replace(/Huang TingFeng/g,"黄霆锋"); 
htmlstr=htmlstr.replace(/Hyrulnizam Sahher /g,"海卢莱扎·萨赫"); 
htmlstr=htmlstr.replace(/Jin KaiZe/g,"金楷泽"); 
htmlstr=htmlstr.replace(/Ke JiHong/g,"柯疾鸿"); 
htmlstr=htmlstr.replace(/Krzysztof Stasica/g,"克日什托夫·斯塔西卡"); 
htmlstr=htmlstr.replace(/Li BoXiang/g,"丽泊乡"); 
htmlstr=htmlstr.replace(/Lian JiaYou/g,"连佳游"); 
htmlstr=htmlstr.replace(/Lin QiXuan/g,"林器轩"); 
htmlstr=htmlstr.replace(/Lu MingMing/g,"路明铭"); 
htmlstr=htmlstr.replace(/Ma ZhenDong/g,"马振东"); 
htmlstr=htmlstr.replace(/Mart Broekhuis /g,"马特·布罗伊奎斯"); 
htmlstr=htmlstr.replace(/Meng BinYi/g,"孟滨翼"); 
htmlstr=htmlstr.replace(/Mi HaoYu/g,"糜昊语"); 
htmlstr=htmlstr.replace(/Nong ZhiZhao/g,"农知钊"); 
htmlstr=htmlstr.replace(/Qi ChenRong/g,"戚辰荣"); 
htmlstr=htmlstr.replace(/Qian YongHao/g,"钱勇浩"); 
htmlstr=htmlstr.replace(/Qiu Dan/g,"邱丹"); 
htmlstr=htmlstr.replace(/She PengCheng /g,"佘鹏程"); 
htmlstr=htmlstr.replace(/Shi ShiZhuang/g,"时世庄"); 
htmlstr=htmlstr.replace(/Shu PengQiang/g,"舒芃强"); 
htmlstr=htmlstr.replace(/Song HaoLin/g,"宋皓霖");
htmlstr=htmlstr.replace(/Tang XinJie/g,"汤歆捷"); 
htmlstr=htmlstr.replace(/Tang Zhu/g,"唐珠"); 
htmlstr=htmlstr.replace(/Wan LeLe/g,"万乐乐"); 
htmlstr=htmlstr.replace(/Wang BinJia/g,"王斌佳"); 
htmlstr=htmlstr.replace(/Wang JingJia/g,"汪敬佳"); 
htmlstr=htmlstr.replace(/Wen ZeFeng/g,"温泽风"); 
htmlstr=htmlstr.replace(/Wu XinYi/g,"吴昕逸"); 
htmlstr=htmlstr.replace(/Xiao DaWei/g,"肖达维"); 
htmlstr=htmlstr.replace(/Xu Feng/g,"徐枫"); 
htmlstr=htmlstr.replace(/Yan YunHao/g,"燕云灏"); 
htmlstr=htmlstr.replace(/Yang HuaTian/g,"杨华天"); 
htmlstr=htmlstr.replace(/Ye WenCheng/g,"叶文成"); 
htmlstr=htmlstr.replace(/Zheng XiaoYi/g,"郑孝义"); 
htmlstr=htmlstr.replace(/Zhou ChenXi/g,"周晨曦"); 
htmlstr=htmlstr.replace(/Zhou LiHan/g,"舟漓涵"); 
htmlstr=htmlstr.replace(/Zhou QingHe/g,"舟卿荷"); 
htmlstr=htmlstr.replace(/Zhou YueHan/g,"皱悦翰"); 
htmlstr=htmlstr.replace(/Zhuang ZuYao/g,"庄祖耀"); 

//No.9
//梅桥岭FC
htmlstr=htmlstr.replace(/Ao ZhiHua/g,"敖志华"); 
htmlstr=htmlstr.replace(/Arne Van Rossem/g,"阿恩·范·罗斯") 
htmlstr=htmlstr.replace(/Bei HanYun/g,"北汉云"); 
htmlstr=htmlstr.replace(/Bob Sant Biswas/g,"鲍勃·桑特比斯"); 
htmlstr=htmlstr.replace(/Cai XinYi/g,"蔡新一"); 
htmlstr=htmlstr.replace(/Calvino Damasco/g,"卡尔文·大马士革"); 
htmlstr=htmlstr.replace(/Chao HaiYu/g,"晁海虞"); 
htmlstr=htmlstr.replace(/Chen QianShi/g,"陈乾世") 
htmlstr=htmlstr.replace(/Chu Liangde/g,"褚良德"); 
htmlstr=htmlstr.replace(/Chu ZhuZi/g,"楚朱子"); 
htmlstr=htmlstr.replace(/Dang GuoYu/g,"党国玉") 
htmlstr=htmlstr.replace(/Dennis Peeters/g,"丹尼斯·皮特斯"); 
htmlstr=htmlstr.replace(/Eino Ruuskanen/g,"埃诺·卢卡南"); 
htmlstr=htmlstr.replace(/Fei WeiCheng/g,"费卫城"); 
htmlstr=htmlstr.replace(/Gabriel De Beul/g,"加布里埃尔·德·比尔"); 
htmlstr=htmlstr.replace(/Gan ShouZhi/g,"甘守志"); 
htmlstr=htmlstr.replace(/Hadrien Leplat/g,"哈德里恩·莱普拉"); 
htmlstr=htmlstr.replace(/He WenYong/g,"何文勇"); 
htmlstr=htmlstr.replace(/Hong GuoQiang/g,"洪国强"); 
htmlstr=htmlstr.replace(/Hong ShuoCheng/g,"洪硕成"); 
htmlstr=htmlstr.replace(/Hu JunBo/g,"胡俊波"); 
htmlstr=htmlstr.replace(/Hu LiXing/g,"胡立兴"); 
htmlstr=htmlstr.replace(/Hu ZiHe/g,"胡子和"); 
htmlstr=htmlstr.replace(/HuangShu JiaHe/g,"皇叔嘉禾"); 
htmlstr=htmlstr.replace(/Ion Oancea/g,"艾恩·欧安思"); 
htmlstr=htmlstr.replace(/Irakli Makashvili/g,"伊拉克里·玛卡"); 
htmlstr=htmlstr.replace(/Jiao KangWen/g,"焦亢文"); 
htmlstr=htmlstr.replace(/Kang XuePeng/g,"康学鹏"); 
htmlstr=htmlstr.replace(/Kang YaLong/g,"康亚龙"); 
htmlstr=htmlstr.replace(/Kedar Alshomrani/g,"凯达尔·阿尔索拉尼"); 
htmlstr=htmlstr.replace(/Kong ZhiXing/g,"孔智星"); 
htmlstr=htmlstr.replace(/Li BingJie/g,"李冰杰"); 
htmlstr=htmlstr.replace(/Li BoHan/g,"李博涵"); 
htmlstr=htmlstr.replace(/Li JinWei/g,"李金伟"); 
htmlstr=htmlstr.replace(/Liang JiBin/g,"梁纪斌"); 
htmlstr=htmlstr.replace(/Lin YanMing/g,"林彦明"); 
htmlstr=htmlstr.replace(/Lin ZhaoTian/g,"林昭天"); 
htmlstr=htmlstr.replace(/Liu ShangKun/g,"刘尚坤"); 
htmlstr=htmlstr.replace(/Lu WenAn/g,"卢文安"); 
htmlstr=htmlstr.replace(/Lv Ye/g,"吕爷"); 
htmlstr=htmlstr.replace(/Mao FengFeng/g,"毛凤凤"); 
htmlstr=htmlstr.replace(/Niu LianZhi/g,"牛连志"); 
htmlstr=htmlstr.replace(/Peng XuHao/g,"彭旭豪"); 
htmlstr=htmlstr.replace(/Qiao Bei/g,"乔北"); 
htmlstr=htmlstr.replace(/Rukia Naganuma/g,"露琪亚·长沼"); 
htmlstr=htmlstr.replace(/Shi GuoQing/g,"石国庆"); 
htmlstr=htmlstr.replace(/Shi XianLu/g,"石仙陆"); 
htmlstr=htmlstr.replace(/Shu YueWu/g,"舒跃武"); 
htmlstr=htmlstr.replace(/Si ChenYe/g,"斯陈爷"); 
htmlstr=htmlstr.replace(/Song FengFeng/g,"宋丰丰"); 
htmlstr=htmlstr.replace(/Sun GuangRi/g,"孙广日"); 
htmlstr=htmlstr.replace(/Wang YunDing/g,"王赟定"); 
htmlstr=htmlstr.replace(/Wang ZeYong/g,"王泽勇"); 
htmlstr=htmlstr.replace(/Wei ShiZhuang/g,"魏世庄"); 
htmlstr=htmlstr.replace(/Wei YiHu/g,"魏一虎"); 
htmlstr=htmlstr.replace(/Wu QiPeng/g,"武齐鹏"); 
htmlstr=htmlstr.replace(/Wu XuChu/g,"吴旭初"); 
htmlstr=htmlstr.replace(/Xian LuCao/g,"仙露草"); 
htmlstr=htmlstr.replace(/Xie YanWei/g,"谢严伟"); 
htmlstr=htmlstr.replace(/Xu HongGang/g,"徐洪刚"); 
htmlstr=htmlstr.replace(/Xu ShengRui/g,"徐晟锐");
htmlstr=htmlstr.replace(/Xu Xiao/g,"徐骁"); 
htmlstr=htmlstr.replace(/Xue YangYang/g,"薛洋洋"); 
htmlstr=htmlstr.replace(/Yani Chonov/g,"亚尼·科诺夫"); 
htmlstr=htmlstr.replace(/Ye JiKuan/g,"叶季宽"); 
htmlstr=htmlstr.replace(/Ye YuXi/g,"叶禹锡"); 
htmlstr=htmlstr.replace(/Yi WeiTing/g,"易伟霆"); 
htmlstr=htmlstr.replace(/Youssef Flores/g,"尤瑟夫·弗洛雷斯"); 
htmlstr=htmlstr.replace(/Yu LongXiang/g,"于龙翔"); 
htmlstr=htmlstr.replace(/Yuan AnNie/g,"袁安聂"); 
htmlstr=htmlstr.replace(/Yuan QingHe/g,"袁清河"); 
htmlstr=htmlstr.replace(/Yue YuJing/g,"岳玉京"); 
htmlstr=htmlstr.replace(/Zhangsun BangWei/g,"长孙邦威"); 
htmlstr=htmlstr.replace(/Zhao XiHe/g,"赵锡禾"); 
htmlstr=htmlstr.replace(/Zhong HeXuan/g,"钟贺轩"); 
htmlstr=htmlstr.replace(/Zhu Qun/g,"朱群"); 
htmlstr=htmlstr.replace(/Zhu YaDong/g,"朱亚东"); 
htmlstr=htmlstr.replace(/Zhuang LingPu/g,"庄灵浦"); 
htmlstr=htmlstr.replace(/Zou YiTai/g,"邹伊泰"); 

//No.10
//俄城雷霆
htmlstr=htmlstr.replace(/Ai JiaMin/g,"艾嘉敏"); 
htmlstr=htmlstr.replace(/Bao QiPeng/g,"包祁鹏"); 
htmlstr=htmlstr.replace(/Cai '鑫豪' XinHao|Cai XinHao/g,"偲鑫豪"); 
htmlstr=htmlstr.replace(/Cao YuMo/g,"曹宇墨"); 
htmlstr=htmlstr.replace(/Chi FeiQin/g,"赤飞禽"); 
htmlstr=htmlstr.replace(/Da '国王' GuangNan|Da GuangNan/g,"达光南"); 
htmlstr=htmlstr.replace(/Da GuangNan/g,"达光楠"); 
htmlstr=htmlstr.replace(/Deng MingHu/g,"邓明虎"); 
htmlstr=htmlstr.replace(/Ding JunSheng/g,"丁俊生"); 
htmlstr=htmlstr.replace(/Ding YouSu/g,"丁游溯"); 
htmlstr=htmlstr.replace(/Dong JunTao/g,"董峻涛");
htmlstr=htmlstr.replace(/DongFang HaiMing/g,"东方海明"); 
htmlstr=htmlstr.replace(/Fan HongXuan/g,"范鸿轩"); 
htmlstr=htmlstr.replace(/Fan LuoGen/g,"范罗艮"); 
htmlstr=htmlstr.replace(/Fei WenZhuo/g,"斐文卓"); 
htmlstr=htmlstr.replace(/Gao HongBing/g,"高鸿秉");
htmlstr=htmlstr.replace(/Hao HuXiang/g,"郝湖湘"); 
htmlstr=htmlstr.replace(/Hao Run/g,"郝润"); 
htmlstr=htmlstr.replace(/Bai '黑澤明' ZeMin|Bai ZeMin/g,"黑泽民"); 
htmlstr=htmlstr.replace(/Hou SuZheng/g,"侯肃政"); 
htmlstr=htmlstr.replace(/Hua Chou/g,"花丑"); 
htmlstr=htmlstr.replace(/Hua YeCheng/g,"花烨成"); 
htmlstr=htmlstr.replace(/Huang DeKai/g,"黄德凯"); 
htmlstr=htmlstr.replace(/Ji YiShan/g,"季一山"); 
htmlstr=htmlstr.replace(/Jian JuJi/g,"简巨基"); 
htmlstr=htmlstr.replace(/Jin ZiHang/g,"金子航"); 
htmlstr=htmlstr.replace(/Li FengChui/g,"李丰炊"); 
htmlstr=htmlstr.replace(/Li GuangMing/g,"李广明");
htmlstr=htmlstr.replace(/Meng '门长明' ChangMin|Meng ChangMin/g,"孟昶闵"); 
htmlstr=htmlstr.replace(/Niu PengYi/g,"牛彭毅"); 
htmlstr=htmlstr.replace(/Pan LiQiang/g,"潘礼强"); 
htmlstr=htmlstr.replace(/Peng Tie/g,"彭铁");
htmlstr=htmlstr.replace(/Qian SuZheng/g,"钱肃正"); 
htmlstr=htmlstr.replace(/Qiu ZhuoXi/g,"邱卓溪"); 
htmlstr=htmlstr.replace(/Rao LingFu/g,"饶令符");
htmlstr=htmlstr.replace(/Shi ZhiHao/g,"时志豪"); 
htmlstr=htmlstr.replace(/Shu Xia/g,"舒夏"); 
htmlstr=htmlstr.replace(/Si KaiWen/g,"司凯文"); 
htmlstr=htmlstr.replace(/Sun SanQiang/g,"隼三强"); 
htmlstr=htmlstr.replace(/Tian ZhiPing/g,"田志平");
htmlstr=htmlstr.replace(/Wang HaiYu/g,"王海宇"); 
htmlstr=htmlstr.replace(/Wang Hang/g,"王航");
htmlstr=htmlstr.replace(/Wei '喂！星辰' XinChen|Wei XinChen/g,"魏心辰"); 
htmlstr=htmlstr.replace(/Wei ZeZhou/g,"魏泽州"); 
htmlstr=htmlstr.replace(/Xiong DengKe/g,"熊登科");
htmlstr=htmlstr.replace(/Yu QianShi/g,"于乾释");
htmlstr=htmlstr.replace(/Zhang ZiHan/g,"张梓涵"); 
htmlstr=htmlstr.replace(/Zhao DeRong/g,"赵德荣");
htmlstr=htmlstr.replace(/Zhao JieXian/g,"赵杰宪"); 
htmlstr=htmlstr.replace(/Zhao YunJie/g,"杜云杰");
htmlstr=htmlstr.replace(/Zhen HanYun/g,"甄汉云");
htmlstr=htmlstr.replace(/Zheng XiuQuan/g,"郑秀全"); 
htmlstr=htmlstr.replace(/Zhong JianFu/g,"钟健孚"); 
htmlstr=htmlstr.replace(/Zhou LongTeng/g,"周龙腾"); 
htmlstr=htmlstr.replace(/Zhou YongWang/g,"周永王"); 

//No.11
//唐风
htmlstr=htmlstr.replace(/Cai ZhiFei/g,"蔡志飞");
htmlstr=htmlstr.replace(/Cui Hui/g,"崔晖");
htmlstr=htmlstr.replace(/Dang ZhiYong/g,"党志勇");
htmlstr=htmlstr.replace(/Du MingWen/g,"杜明文");
htmlstr=htmlstr.replace(/Dávid Patkó/g,"达维德·保特科"); 
htmlstr=htmlstr.replace(/Fan YiHu/g,"范一虎");
htmlstr=htmlstr.replace(/Fu Dong/g,"傅东");	
htmlstr=htmlstr.replace(/Gabriele Mazzucchelli/g,"加布里埃勒·马祖凯利");
htmlstr=htmlstr.replace(/Gong RongSheng/g,"宫荣升");
htmlstr=htmlstr.replace(/Guan JinTao/g,"关锦涛");
htmlstr=htmlstr.replace(/Guo YongHao/g,"郭永好");
htmlstr=htmlstr.replace(/Han DaPing/g,"韩大平");
htmlstr=htmlstr.replace(/Hua SuZheng/g,"华苏征");
htmlstr=htmlstr.replace(/Huang HanLiang/g,"黄汉良");
htmlstr=htmlstr.replace(/Huang XiangNan/g,"黄翔南");
htmlstr=htmlstr.replace(/Huo Zhou/g,"霍舟");
htmlstr=htmlstr.replace(/Jan Geluk/g,"扬格鲁克");
htmlstr=htmlstr.replace(/Jian You/g,"简友");
htmlstr=htmlstr.replace(/Jin XuFen/g,"金许分");
htmlstr=htmlstr.replace(/Ke YaKe/g,"柯亚科");
htmlstr=htmlstr.replace(/Lai KaiBin/g,"赖楷斌");
htmlstr=htmlstr.replace(/Li DongJian/g,"李冬健");
htmlstr=htmlstr.replace(/Li LiRong/g,"李立荣");
htmlstr=htmlstr.replace(/Lian Ting/g,"廉挺");
htmlstr=htmlstr.replace(/Liang HaiLiang/g,"梁海亮");
htmlstr=htmlstr.replace(/Liang MingYan/g,"梁茗砚");
htmlstr=htmlstr.replace(/Lin ChengJun/g,"林承君");
htmlstr=htmlstr.replace(/Lin JianYong/g,"林建勇");
htmlstr=htmlstr.replace(/Lu HaiLiang/g,"卢海亮");
htmlstr=htmlstr.replace(/Ma ChengJian/g,"马成建");
htmlstr=htmlstr.replace(/Mao ShiLin/g,"毛时林");
htmlstr=htmlstr.replace(/Peng ShunKai/g,"彭顺凯"); 
htmlstr=htmlstr.replace(/Qin HuiJun/g,"秦晖钧");
htmlstr=htmlstr.replace(/Qin YouAn/g,"秦友安");
htmlstr=htmlstr.replace(/Ran ZhuoYi/g,"冉卓易");
htmlstr=htmlstr.replace(/Shu Jia/g,"舒佳");
htmlstr=htmlstr.replace(/Shuji Otsuka/g,"大津贺崇时");
htmlstr=htmlstr.replace(/Sun ChaoCe/g,"孙晁策");
htmlstr=htmlstr.replace(/Tan HuXiang/g,"谭浒翔");
htmlstr=htmlstr.replace(/Wang GuangMin/g,"王光闵"); 
htmlstr=htmlstr.replace(/Wang JiMi/g,"王吉米");
htmlstr=htmlstr.replace(/Wang KangWen/g,"王亢文");
htmlstr=htmlstr.replace(/Wang SongYan/g,"王松岩");
htmlstr=htmlstr.replace(/Wen Yong/g,"温勇");
htmlstr=htmlstr.replace(/Xing KeWei/g,"刑克伟");
htmlstr=htmlstr.replace(/Xu LiJi/g,"徐里继");
htmlstr=htmlstr.replace(/Yu DongLong/g,"于东龙");
htmlstr=htmlstr.replace(/Yun JinYuan/g,"云津源");
htmlstr=htmlstr.replace(/Zhang WenChou/g,"张文丑");
htmlstr=htmlstr.replace(/Zheng Pu/g,"郑普");
htmlstr=htmlstr.replace(/Zhou ChengHao/g,"周成好");
htmlstr=htmlstr.replace(/Zhou XinHao/g,"周心昊");
htmlstr=htmlstr.replace(/Zhu ZeXuan/g,"朱泽轩");
htmlstr=htmlstr.replace(/Zhuang WeiGuo/g,"庄卫国");
htmlstr=htmlstr.replace(/Zhuang ZhuCheng/g,"庄诸成");
htmlstr=htmlstr.replace(/Zu ChenJun/g,"祖晨钧");

//FC.北京布丁 
//No.12
htmlstr=htmlstr.replace(/Cao HongWu/g,"曹洪武"); 
htmlstr=htmlstr.replace(/He DongYa/g,"何东亚"); 
htmlstr=htmlstr.replace(/Jia YueBo/g,"贾越波"); 
htmlstr=htmlstr.replace(/Jin ZiXuan/g,"金子轩"); 
htmlstr=htmlstr.replace(/Mu ZiJie/g,"穆子杰"); 
htmlstr=htmlstr.replace(/Qian ChengZhong/g,"钱承中"); 
htmlstr=htmlstr.replace(/Qiu Huo/g,"丘豁");
htmlstr=htmlstr.replace(/Qiu WeiJun/g,"丘伟军"); 
htmlstr=htmlstr.replace(/Wei Miao/g,"维淼"); 
htmlstr=htmlstr.replace(/Xiong JingHua/g,"熊京华"); 
htmlstr=htmlstr.replace(/Xiong JingHua/g,"熊京华"); 
htmlstr=htmlstr.replace(/Xu HengZhi/g,"徐恒智"); 
htmlstr=htmlstr.replace(/Xue ZhaoJun/g,"薛昭君"); 
htmlstr=htmlstr.replace(/Ye Gan/g,"叶敢"); 
htmlstr=htmlstr.replace(/Zhang ZhongYou/g,"张忠友"); 

//No.13
//重庆麻辣火锅
htmlstr=htmlstr.replace(/Bian WeiJie/g,"边伟杰"); 
htmlstr=htmlstr.replace(/Cai Liang/g,"蔡凉");
htmlstr=htmlstr.replace(/Cao YuanYuan/g,"曹渊源"); 
htmlstr=htmlstr.replace(/Cen ChunJi/g,"岑春季"); 
htmlstr=htmlstr.replace(/Cheng Ying/g,"承影"); 
htmlstr=htmlstr.replace(/Du YinXian/g,"杜尹先"); 
htmlstr=htmlstr.replace(/Feng FengXin/g,"冯封心"); 
htmlstr=htmlstr.replace(/Gan ZeQi/g,"甘泽奇");
htmlstr=htmlstr.replace(/Gao ShiLei/g,"高石磊");
htmlstr=htmlstr.replace(/Gao WenBo/g,"高稳波");
htmlstr=htmlstr.replace(/Ge XiangTao/g,"葛祥韬");
htmlstr=htmlstr.replace(/GongSun XingHui/g,"公孙星辉"); 
htmlstr=htmlstr.replace(/Guo JingGe/g,"郭惊歌");
htmlstr=htmlstr.replace(/Ha TanChao/g,"哈谭超"); 
htmlstr=htmlstr.replace(/Han HongLi/g,"韩弘历"); 
htmlstr=htmlstr.replace(/Hu Bu/g,"虎步"); 
htmlstr=htmlstr.replace(/Huang ShengLi/g,"黄胜利"); 
htmlstr=htmlstr.replace(/Hubert Gębura/g,"休伯特·乔布拉");
htmlstr=htmlstr.replace(/Jack Sutherland/g,"杰克·萨瑟兰");
htmlstr=htmlstr.replace(/Jia MingChang/g,"贾铭昶"); 
htmlstr=htmlstr.replace(/Koji Nakatsuka/g,"中冢浩二");
htmlstr=htmlstr.replace(/Li Dun/g,"李盾"); 
htmlstr=htmlstr.replace(/Li YaJian/g,"黎亚坚"); 
htmlstr=htmlstr.replace(/Liang ChangLin/g,"梁长麟");
htmlstr=htmlstr.replace(/Lin ZhenYang/g,"林振阳");
htmlstr=htmlstr.replace(/Lu DeXin/g,"卢德兴");
htmlstr=htmlstr.replace(/Lu LingTing/g,"卢凌霆"); 
htmlstr=htmlstr.replace(/Lu ZhangYi/g,"卢长义"); 
htmlstr=htmlstr.replace(/Man MuYao/g,"满目妖");
htmlstr=htmlstr.replace(/Mao Xiang/g,"毛翔"); 
htmlstr=htmlstr.replace(/Meng LiHan/g,"孟笠汉"); 
htmlstr=htmlstr.replace(/Modesto Agudo/g,"莫德斯托·阿圭多"); 
htmlstr=htmlstr.replace(/Mu ShiJie/g,"穆世杰"); 
htmlstr=htmlstr.replace(/Ou HaiJian/g,"欧海建"); 
htmlstr=htmlstr.replace(/Ou Peng/g,"欧鹏"); 
htmlstr=htmlstr.replace(/Pan GuangZhong/g,"潘广中"); 
htmlstr=htmlstr.replace(/Pan LiQin/g,"潘励勤");  
htmlstr=htmlstr.replace(/Pan YongQi/g,"潘永奇"); 
htmlstr=htmlstr.replace(/Pan ZeXi/g,"潘泽西");
htmlstr=htmlstr.replace(/Qian Da/g,"钱大"); 
htmlstr=htmlstr.replace(/Qu ShaoQuan/g,"曲绍泉"); 
htmlstr=htmlstr.replace(/Shan HaiYang/g,"山海阳");
htmlstr=htmlstr.replace(/Shi GuangHu/g,"石光虎"); 
htmlstr=htmlstr.replace(/Shi JieXian/g,"史杰贤"); 
htmlstr=htmlstr.replace(/Shi YanHan/g,"史炎寒"); 
htmlstr=htmlstr.replace(/Shu Donghua/g,"舒栋华"); 
htmlstr=htmlstr.replace(/Somanshu Ilyas/g,"苏曼殊·伊利亚斯"); 
htmlstr=htmlstr.replace(/Song XingGuang/g,"宋星光"); 
htmlstr=htmlstr.replace(/Tian FengTao/g,"田奉韬"); 
htmlstr=htmlstr.replace(/Tupuri Achu/g,"图布里·阿苏");
htmlstr=htmlstr.replace(/Vasile Blanaru/g,"瓦西里·布勒纳鲁"); 
htmlstr=htmlstr.replace(/Wang ChangRui/g,"王长瑞"); 
htmlstr=htmlstr.replace(/Wang YongHuai/g,"王永怀"); 
htmlstr=htmlstr.replace(/Xie XianPing/g,"谢仙屏"); 
htmlstr=htmlstr.replace(/Xie XueMing/g,"谢学铭");
htmlstr=htmlstr.replace(/Yang MingAn/g,"杨铭安"); 
htmlstr=htmlstr.replace(/You BeiHai/g,"游北海"); 
htmlstr=htmlstr.replace(/Yuriy Tsilevich/g,"尤里·特斯列维奇");
htmlstr=htmlstr.replace(/Zhang HanWen/g,"张瀚文");
htmlstr=htmlstr.replace(/Zhang ShengYuan/g,"张圣元"); 
htmlstr=htmlstr.replace(/Zheng LinHu/g,"郑麟虎");

//No.14
//范迪克
htmlstr=htmlstr.replace(/Cai DongPeng/g,"蔡东鹏");
htmlstr=htmlstr.replace(/Chi Wei/g,"池威");
htmlstr=htmlstr.replace(/Cui ZhongLong/g,"崔忠龙");
htmlstr=htmlstr.replace(/Da JinSha/g,"达金莎");
htmlstr=htmlstr.replace(/Ding ZeBo/g,"丁泽波");
htmlstr=htmlstr.replace(/Hu JiaXin/g,"胡佳鑫");
htmlstr=htmlstr.replace(/Kong PengWang/g,"孔鹏旺");
htmlstr=htmlstr.replace(/Lai ZhenDong/g,"来振东");
htmlstr=htmlstr.replace(/Liu WeiQiang/g,"刘伟强");
htmlstr=htmlstr.replace(/Luo YuanChao/g,"罗源超");
htmlstr=htmlstr.replace(/Qiang TingFeng/g,"强廷峰");
htmlstr=htmlstr.replace(/Qu XueYou/g,"曲学友");
htmlstr=htmlstr.replace(/She BuBai/g,"佘步柏");
htmlstr=htmlstr.replace(/Shi ChaoSheng/g,"史超晟");
htmlstr=htmlstr.replace(/Tang QiChen/g,"唐齐晨");
htmlstr=htmlstr.replace(/Yang YangYang/g,"羊羊羊");


//No.15
//河北华夏幸福
htmlstr=htmlstr.replace(/Chang ShiJu/g,"常世驹"); 
htmlstr=htmlstr.replace(/Chen BaiLin/g,"陈百林"); 
htmlstr=htmlstr.replace(/Dong ZhaoZhong/g,"董兆中"); 
htmlstr=htmlstr.replace(/Frank Allison/g,"弗兰克·阿里森"); 
htmlstr=htmlstr.replace(/Hao XiangJie/g,"郝相杰"); 
htmlstr=htmlstr.replace(/Ji MingJun/g,"姬明俊"); 
htmlstr=htmlstr.replace(/Jiang HaoYuan/g,"姜浩源"); 
htmlstr=htmlstr.replace(/Jonatan Acosta/g,"乔纳丹·阿科斯塔"); 
htmlstr=htmlstr.replace(/Ke Fa/g,"柯发"); 
htmlstr=htmlstr.replace(/Lin ShiAn/g,"林世安"); 
htmlstr=htmlstr.replace(/Luo RongJi/g,"罗荣基"); 
htmlstr=htmlstr.replace(/Oleg Trefiolov/g,"奥雷格·特雷费奥罗夫"); 
htmlstr=htmlstr.replace(/Otello Crescenzo/g,"奥特罗·卡雷斯科恩佐"); 
htmlstr=htmlstr.replace(/Pang JiSun/g,"庞吉顺"); 
htmlstr=htmlstr.replace(/Pravoslav Jakubko/g,"普拉沃斯拉夫·雅库布科");
htmlstr=htmlstr.replace(/Shao DaWei/g,"邵大伟"); 
htmlstr=htmlstr.replace(/Sheng WuBa/g,"盛无霸"); 
htmlstr=htmlstr.replace(/Shui XiaoHui/g,"水小辉");
htmlstr=htmlstr.replace(/Sun ZhiJiong/g,"孙志炯"); 
htmlstr=htmlstr.replace(/Tai ChunBin/g,"邰春斌"); 
htmlstr=htmlstr.replace(/Vadim Chernekov/g,"瓦蒂姆·切尔尼科夫"); 
htmlstr=htmlstr.replace(/Xin BoWei/g,"辛博伟"); 
htmlstr=htmlstr.replace(/Xu LeYuan/g,"徐乐元"); 
htmlstr=htmlstr.replace(/Zhong YaLong/g,"钟亚龙"); 
htmlstr=htmlstr.replace(/Zhou HaiHang/g,"周海航"); 


//No.16
//龙子湖竞技
htmlstr=htmlstr.replace(/An JinXi/g,"安进喜");
htmlstr=htmlstr.replace(/Bu Rui/g,"步瑞");
htmlstr=htmlstr.replace(/Cai TingYao/g,"蔡亭尧");
htmlstr=htmlstr.replace(/Cai WeiChao/g,"蔡伟超");
htmlstr=htmlstr.replace(/Chen ZiYuan/g,"陈子元");
htmlstr=htmlstr.replace(/Du ZhouZhe/g,"杜周哲");
htmlstr=htmlstr.replace(/Duan BuBai/g,"段不败");
htmlstr=htmlstr.replace(/Gan QuanZhang/g,"甘全章");
htmlstr=htmlstr.replace(/Geng LongLong/g,"耿龙龙");
htmlstr=htmlstr.replace(/Guan JianFeng/g,"关剑锋");
htmlstr=htmlstr.replace(/Gui LongXiang/g,"桂龙翔");
htmlstr=htmlstr.replace(/Guo JiangHua/g,"郭江华");
htmlstr=htmlstr.replace(/Han ZiXuan/g,"韩子轩");
htmlstr=htmlstr.replace(/He JunPeng/g,"何俊鹏");
htmlstr=htmlstr.replace(/Hu DeGang/g,"胡德刚");
htmlstr=htmlstr.replace(/Hua XuanDe/g,"华玄德");
htmlstr=htmlstr.replace(/Lei ZhiZhao/g,"雷志昭");
htmlstr=htmlstr.replace(/Leng XiRui/g,"冷希瑞");
htmlstr=htmlstr.replace(/Liang JingHao/g,"梁景皓");
htmlstr=htmlstr.replace(/Lin HongGang/g,"林宏刚");
htmlstr=htmlstr.replace(/Lin RuiQi/g,"林瑞琪");
htmlstr=htmlstr.replace(/Lu JingWen/g,"卢靖文");
htmlstr=htmlstr.replace(/Mu YaoYang/g,"穆耀阳");
htmlstr=htmlstr.replace(/Ning Ce/g,"宁策");
htmlstr=htmlstr.replace(/Nong Ke/g,"农科");
htmlstr=htmlstr.replace(/Peng WenCheng/g,"彭文成");
htmlstr=htmlstr.replace(/Peng ZiXin/g,"彭子鑫");
htmlstr=htmlstr.replace(/Qin ZiMo/g,"秦子墨");
htmlstr=htmlstr.replace(/Ran JinJian/g,"冉金健");
htmlstr=htmlstr.replace(/Rao ChengYe/g,"饶成业");
htmlstr=htmlstr.replace(/Tan XiangMin/g,"谭湘闵");
htmlstr=htmlstr.replace(/Tang JinXi/g,"唐进喜");
htmlstr=htmlstr.replace(/TuoBa HongLi/g,"拓跋弘历");
htmlstr=htmlstr.replace(/Xin ZiMing/g,"辛子明");
htmlstr=htmlstr.replace(/Xu ChaoYuan/g,"徐超元");
htmlstr=htmlstr.replace(/Xu XiaoFeng/g,"徐晓峰");
htmlstr=htmlstr.replace(/Yao ZiJie/g,"姚子杰");
htmlstr=htmlstr.replace(/Ye ChunJie/g,"叶春杰");
htmlstr=htmlstr.replace(/Ye WenJun/g,"叶文俊");
htmlstr=htmlstr.replace(/Yin MinWei/g,"尹敏伟");
htmlstr=htmlstr.replace(/Zhang RenJie/g,"张仁杰");
htmlstr=htmlstr.replace(/Zhou YeXuan/g,"周叶轩");
htmlstr=htmlstr.replace(/Zhu WeiFei/g,"朱伟飞");

//No.17
//公馆FC
htmlstr=htmlstr.replace(/Hou LeLe/g,"侯乐乐");
htmlstr=htmlstr.replace(/Li Chi/g,"利齿");
htmlstr=htmlstr.replace(/Luo ZhiYu/g,"罗志宇");
htmlstr=htmlstr.replace(/Xu YaZhao/g,"徐亚昭");
htmlstr=htmlstr.replace(/Yue ShaoHua/g,"岳少滑");
htmlstr=htmlstr.replace(/Zhuo TingYan/g,"卓挺严");

//No.18
//青岛教师联队
htmlstr=htmlstr.replace(/Cai KaiZe/g,"蔡开泽"); 
htmlstr=htmlstr.replace(/Dai Kun/g,"戴琨"); 
htmlstr=htmlstr.replace(/Fan HaoWen/g,"范浩文"); 
htmlstr=htmlstr.replace(/Feng DaLei/g,"冯大雷"); 
htmlstr=htmlstr.replace(/Gao Tie/g,"高铁"); 
htmlstr=htmlstr.replace(/Hong DaZhan/g,"洪大展"); 
htmlstr=htmlstr.replace(/Jiang GuoQiang/g,"姜国强"); 
htmlstr=htmlstr.replace(/Lv ZhuoJun/g,"吕卓君"); 
htmlstr=htmlstr.replace(/Ma KunPeng/g,"马坤鹏"); 
htmlstr=htmlstr.replace(/Mao WeiJie/g,"毛伟杰"); 
htmlstr=htmlstr.replace(/Peng ShiLin/g,"彭世林"); 
htmlstr=htmlstr.replace(/Pi YuQing/g,"皮玉清"); 
htmlstr=htmlstr.replace(/Qian Biao/g,"钱彪"); 
htmlstr=htmlstr.replace(/Shi ShangZhe/g,"石尚哲"); 
htmlstr=htmlstr.replace(/Tao HongLi/g,"陶宏历"); 
htmlstr=htmlstr.replace(/Xi YanKai/g,"席延凯"); 
htmlstr=htmlstr.replace(/Xia YaZhao/g,"夏雅照"); 
htmlstr=htmlstr.replace(/Xian He/g,"贤鹤"); 
htmlstr=htmlstr.replace(/Xue Jia/g,"薛佳"); 
htmlstr=htmlstr.replace(/You ZeDong/g,"尤泽东"); 
htmlstr=htmlstr.replace(/Zhang Ju/g,"张举"); 
htmlstr=htmlstr.replace(/Zhi JunRu/g,"智俊如"); 
htmlstr=htmlstr.replace(/Zhou YuShuai/g,"周玉帅"); 
htmlstr=htmlstr.replace(/Zhu XuanWu/g,"朱玄武"); 
htmlstr=htmlstr.replace(/Zu YunDing/g,"祖云定"); 

//No.19
//AKB48
htmlstr=htmlstr.replace(/Bai ShiJu/g,"白世居"); 
htmlstr=htmlstr.replace(/Chen GuoSheng/g,"陈国胜"); 
htmlstr=htmlstr.replace(/Chen JiXiang/g,"陈吉祥"); 
htmlstr=htmlstr.replace(/Cheng LeLe/g,"程乐乐"); 
htmlstr=htmlstr.replace(/Ding YuanHang/g,"丁远航"); 
htmlstr=htmlstr.replace(/Dong JiaJian/g,"董嘉健");
htmlstr=htmlstr.replace(/Duan JinPeng/g,"段金鹏"); 
htmlstr=htmlstr.replace(/Gao HongYuan/g,"高洪渊"); 
htmlstr=htmlstr.replace(/Gou QianShuo/g,"句千硕"); 
htmlstr=htmlstr.replace(/Hua ZiQian/g,"花子谦"); 
htmlstr=htmlstr.replace(/Jian MingFei/g,"简明非"); 
htmlstr=htmlstr.replace(/Lei GaoPeng/g,"雷高鹏"); 
htmlstr=htmlstr.replace(/Li JianGang/g,"李建刚"); 
htmlstr=htmlstr.replace(/Li MingFei/g,"李铭飞"); 
htmlstr=htmlstr.replace(/Li YouAn/g,"李幼安"); 
htmlstr=htmlstr.replace(/Lian XiaoMing/g,"连晓明"); 
htmlstr=htmlstr.replace(/Lin '刘能' YunSheng|Lin YunSheng/g,"林云升");
htmlstr=htmlstr.replace(/Lin KaiNing/g,"林凯宁"); 
htmlstr=htmlstr.replace(/Lu AnYi/g,"卢安义"); 
htmlstr=htmlstr.replace(/Min WenKai/g,"闵闻凯"); 
htmlstr=htmlstr.replace(/Min XiaoQian/g,"闵啸乾"); 
htmlstr=htmlstr.replace(/Pan TanChao/g,"潘谭超"); 
htmlstr=htmlstr.replace(/Qian XiRong/g,"千禧荣"); 
htmlstr=htmlstr.replace(/Qian XueLin/g,"钱雪麟"); 
htmlstr=htmlstr.replace(/Qiang WenJian/g,"强文剑");
htmlstr=htmlstr.replace(/Qiu DianZuo/g,"邱殿座"); 
htmlstr=htmlstr.replace(/Shi PeiZhao/g,"石沛昭"); 
htmlstr=htmlstr.replace(/Shi TianMing/g,"施天鸣"); 
htmlstr=htmlstr.replace(/Tian XiaoNan/g,"田笑南"); 
htmlstr=htmlstr.replace(/Wang Gan/g,"王感"); 
htmlstr=htmlstr.replace(/Wang YueFei/g,"王跃飞"); 
htmlstr=htmlstr.replace(/Wei HongYang/g,"魏宏阳"); 
htmlstr=htmlstr.replace(/Weng ZeHong/g,"翁泽鸿"); 
htmlstr=htmlstr.replace(/Xiao WenJun/g,"萧文君"); 
htmlstr=htmlstr.replace(/Xiao YingJie/g,"肖英杰"); 
htmlstr=htmlstr.replace(/Xu Tao/g,"徐韬"); 
htmlstr=htmlstr.replace(/Xue DeQun/g,"薛德群"); 
htmlstr=htmlstr.replace(/Yang GuanXi/g,"杨冠希"); 
htmlstr=htmlstr.replace(/Ye ShuFeng/g,"叶庶峰"); 
htmlstr=htmlstr.replace(/Yu YaDong/g,"于亚东"); 
htmlstr=htmlstr.replace(/Zeng XingLiang/g,"曾兴亮"); 
htmlstr=htmlstr.replace(/Zhai Ming/g,"翟明"); 
htmlstr=htmlstr.replace(/Zhao BiDe/g,"赵璧德");
htmlstr=htmlstr.replace(/Zhao ChenHui/g,"赵辰晖"); 
htmlstr=htmlstr.replace(/Zhao YuDao/g,"赵宇道");
htmlstr=htmlstr.replace(/Zhao YunDao/g,"赵云到"); 
htmlstr=htmlstr.replace(/Zheng HanYu/g,"郑涵余");
htmlstr=htmlstr.replace(/Zheng XiJie/g,"郑希杰");
htmlstr=htmlstr.replace(/Zheng YunQi/g,"郑允奇"); 
htmlstr=htmlstr.replace(/Zhong ZhiYi/g,"钟志毅"); 
htmlstr=htmlstr.replace(/Zhou HuiKang/g,"周惠康"); 


//No.20
//飞翔鸟
htmlstr=htmlstr.replace(/Shu HuaiDe/g,"舒怀德"); 
htmlstr=htmlstr.replace(/Fu JiaoShou/g,"伏叫兽");
htmlstr=htmlstr.replace(/Li XiaoPing/g,"李小平");
htmlstr=htmlstr.replace(/Liao YuHao/g,"廖禹豪");
htmlstr=htmlstr.replace(/Cui JunJie/g,"崔俊杰");
htmlstr=htmlstr.replace(/Wang MingZe/g,"王明泽");
htmlstr=htmlstr.replace(/She BangWei/g,"佘邦威");
htmlstr=htmlstr.replace(/Du ZhenZhong/g,"杜震忠");
htmlstr=htmlstr.replace(/Qiao YiDa/g,"乔益达");
htmlstr=htmlstr.replace(/Chen Dun/g,"陈盾");
htmlstr=htmlstr.replace(/Meng XiaoMa/g,"孟小马");
htmlstr=htmlstr.replace(/Bian LiQin/g,"边立勤");
htmlstr=htmlstr.replace(/Li YuXi/g,"李玉溪");
htmlstr=htmlstr.replace(/Lai PengQiang/g,"赖鹏强");
htmlstr=htmlstr.replace(/Liu XueJun/g,"刘学军");
htmlstr=htmlstr.replace(/Zhou LeiLei/g,"周雷雷");
htmlstr=htmlstr.replace(/Guo XiRui/g,"郭喜瑞");
htmlstr=htmlstr.replace(/Zhou LinKai/g,"周林楷");
htmlstr=htmlstr.replace(/Wang YaoDong/g,"王耀东");
htmlstr=htmlstr.replace(/Mao RongZe/g,"毛荣泽");
htmlstr=htmlstr.replace(/Niu XiaoFu/g,"牛小福");
htmlstr=htmlstr.replace(/Liang GuoPin/g,"梁国品");
htmlstr=htmlstr.replace(/Song GuoNing/g,"宋国宁");
htmlstr=htmlstr.replace(/Jian MuSheng/g,"简沐笙");
htmlstr=htmlstr.replace(/Ye LiMing/g,"夜里明");
htmlstr=htmlstr.replace(/Zhong ChiMing/g,"钟驰明");
htmlstr=htmlstr.replace(/Che HongZhi/g,"车鸿志");
htmlstr=htmlstr.replace(/Zhou JinQian/g,"周金钱");

//No.21
//喜洋洋
htmlstr=htmlstr.replace(/Bao RuiHua/g,"包瑞华");
htmlstr=htmlstr.replace(/Bao ShiJie/g,"保时捷");
htmlstr=htmlstr.replace(/Cheng ChangFeng/g,"程常锋");
htmlstr=htmlstr.replace(/Du WeiJie/g,"杜韦杰");
htmlstr=htmlstr.replace(/Gao MingGang/g,"高明刚");
htmlstr=htmlstr.replace(/GongSun AiMin/g,"公孙艾闵");
htmlstr=htmlstr.replace(/He WenChao/g,"何文超");
htmlstr=htmlstr.replace(/Jiang ZhiMing/g,"江智明");
htmlstr=htmlstr.replace(/Kang ChaoBo/g,"康朝博");
htmlstr=htmlstr.replace(/Lu GuoJie/g,"陆国杰");
htmlstr=htmlstr.replace(/Mu YiHu/g,"穆一虎");
htmlstr=htmlstr.replace(/Song Huo/g,"怂货");
htmlstr=htmlstr.replace(/Tang YouXun/g,"唐佑逊");
htmlstr=htmlstr.replace(/Zhan JinTong/g,"战金童");
htmlstr=htmlstr.replace(/Zhang LinPeng/g,"张琳芃");

//No.22
//悠悠小仙姑
htmlstr=htmlstr.replace(/Fu WenWei/g,"符文卫");
htmlstr=htmlstr.replace(/Guo HuWei/g,"郭虎威");
htmlstr=htmlstr.replace(/Qiu QiPeng/g,"裘奇蓬");

//No.23
//Super-inter
htmlstr=htmlstr.replace(/Chu XiongWei/g,"楚雄伟");
htmlstr=htmlstr.replace(/Liang ShuSheng/g,"梁舒声");
htmlstr=htmlstr.replace(/Ou BoQiang/g,"欧博强");
htmlstr=htmlstr.replace(/Wang BaoRen/g,"王宝仁");
htmlstr=htmlstr.replace(/Wu XiRui/g,"吴溪睿");
htmlstr=htmlstr.replace(/Xie XuanQi/g,"谢炫七");
htmlstr=htmlstr.replace(/Yue ChangQing/g,"岳长青");
htmlstr=htmlstr.replace(/Yun YuanHang/g,"云源航");
htmlstr=htmlstr.replace(/Zhang BingJie/g,"张兵杰");
htmlstr=htmlstr.replace(/Zhang ShouCheng/g,"张守诚");
htmlstr=htmlstr.replace(/ZhuGe WeiSheng/g,"诸葛伟胜");

//No.24 
//Blood Raiders
//ID：4187485

htmlstr=htmlstr.replace(/Bian ChenGuang/g,"卞晨光");
htmlstr=htmlstr.replace(/Chu JinSong/g,"楚晋松");
htmlstr=htmlstr.replace(/Du XinMing/g,"杜心明");
htmlstr=htmlstr.replace(/Fu FeiFei/g,"傅非飞");
htmlstr=htmlstr.replace(/Gao HaoRan/g,"高浩然");
htmlstr=htmlstr.replace(/Hao MinBo/g,"郝珉博");
htmlstr=htmlstr.replace(/Huang DiFan/g,"黄狄凡");
htmlstr=htmlstr.replace(/Ji LuoGen/g,"季罗根");
htmlstr=htmlstr.replace(/Ke JinQing/g,"柯晋卿");
htmlstr=htmlstr.replace(/Li ShiLei/g,"黎世磊");
htmlstr=htmlstr.replace(/Long YuWei/g,"龙禹威");
htmlstr=htmlstr.replace(/Lu NingYuan/g,"陆宁远");
htmlstr=htmlstr.replace(/Mao HongGang/g,"毛洪刚");
htmlstr=htmlstr.replace(/Niu ChengRui/g,"牛承瑞");
htmlstr=htmlstr.replace(/Pang FengFeng/g,"庞丰锋");
htmlstr=htmlstr.replace(/Qiu DaYu/g,"邱大鱼"); 
htmlstr=htmlstr.replace(/Qu HongXuan/g,"曲鸿轩");
htmlstr=htmlstr.replace(/Ran ZhuoXi/g,"冉卓溪");
htmlstr=htmlstr.replace(/Tan GuoYao/g,"谭国耀");
htmlstr=htmlstr.replace(/Wu Bing/g,"武冰");
htmlstr=htmlstr.replace(/Xi HongPing/g,"奚洪平");
htmlstr=htmlstr.replace(/Xu KaiRen/g,"徐凯仁");
htmlstr=htmlstr.replace(/Xuan GuangXin/g,"轩光信");
htmlstr=htmlstr.replace(/Yan ShouWu/g,"严寿武");
htmlstr=htmlstr.replace(/Yan ZiZhou/g,"燕子洲");
htmlstr=htmlstr.replace(/Yu ZhiZhi/g,"于致志");
htmlstr=htmlstr.replace(/Zhang ChuiChui/g,"张吹炊");
htmlstr=htmlstr.replace(/Zhong YingHui/g,"钟颍辉");


//No.25
//蝎子足球-潘公子
//ID：2748735

htmlstr=htmlstr.replace(/Cao '艹欲宫' YuGong|Cao YuGong/g,"曹御恭");
htmlstr=htmlstr.replace(/Christoffer 'C罗' Fuglesang|Christoffer Fuglesang/g,"Christoffer Fuglesang");
htmlstr=htmlstr.replace(/Fang '放羊羊' YangYang|Fang YangYang/g,"方洋洋");
htmlstr=htmlstr.replace(/Gavin '拉姆塞' Gascoigne|Gavin Gascoigne/g,"Gavin Gascoigne");
htmlstr=htmlstr.replace(/Luo '罗桂山' GuiShan|Luo GuiShan/g,"罗桂山");
htmlstr=htmlstr.replace(/Pei '伞队' Wei|Pei Wei/g,"裴威");
htmlstr=htmlstr.replace(/Ruaridh '达格利什' Dunwoodie|Ruaridh Dunwoodie/g,"Ruaridh Dunwoodie");
htmlstr=htmlstr.replace(/Sulkhan '萨内' Dadesheli|Sulkhan Dadesheli/g,"Sulkhan Dadesheli");
htmlstr=htmlstr.replace(/Thomas '托马斯' Svan|Thomas Svan/g,"Thomas Svan");
htmlstr=htmlstr.replace(/Wang '王贱凯' JianKai|Wang JianKai/g,"王健凯");
htmlstr=htmlstr.replace(/Yu '梅克斯' YueHan|Yu YueHan/g,"于越涵");
htmlstr=htmlstr.replace(/Yu '梅克斯' YueHan|Yu YueHan/g,"于越涵");
htmlstr=htmlstr.replace(/Zheng '潇洒哥' XuWei|Zheng XuWei/g,"郑旭威");
htmlstr=htmlstr.replace(/Zhuo '神舟' ShenZhou|Zhuo ShenZhou/g,"卓神舟");

//No.26
//梅麓星空
//ID：4202000
htmlstr=htmlstr.replace(/Cao MingYue/g,"曹明乐");
htmlstr=htmlstr.replace(/Ge ZhenMing/g,"葛振明");
htmlstr=htmlstr.replace(/GongSun GuoJian/g,"公孙国健");
htmlstr=htmlstr.replace(/Lang ShiZhang/g,"郎仕璋");
htmlstr=htmlstr.replace(/Li HuiSheng/g,"李晖晟"); 
htmlstr=htmlstr.replace(/LiYang LiangLiang/g,"溧阳凉凉");
htmlstr=htmlstr.replace(/Lian JianChun/g,"练建春"); 
htmlstr=htmlstr.replace(/Pu XianZhi/g,"濮宪志");
htmlstr=htmlstr.replace(/Shi Ling/g,"石翎"); 
htmlstr=htmlstr.replace(/Xu MingQuan/g,"许明权");
htmlstr=htmlstr.replace(/Zhao XiaoYu/g,"赵晓宇"); 
htmlstr=htmlstr.replace(/Zhou YanZhe/g,"周彦哲");

//No.27
//福建中天FC
//ID:
htmlstr=htmlstr.replace(/Dai YiHu/g,"戴伊虎");
htmlstr=htmlstr.replace(/Du ShiZhao/g,"杜石昭");
htmlstr=htmlstr.replace(/Fei JingRen/g,"费景仁");
htmlstr=htmlstr.replace(/Fu XiangXian/g,"傅祥贤");
htmlstr=htmlstr.replace(/Hong DaYu/g,"洪大羽");
htmlstr=htmlstr.replace(/Jian YingJie/g,"简英杰");
htmlstr=htmlstr.replace(/Jiang JiaQiang/g,"蒋嘉强");
htmlstr=htmlstr.replace(/Li ZhiNing/g,"李志宁"); 
htmlstr=htmlstr.replace(/Lv GuangLin/g,"吕广林");
htmlstr=htmlstr.replace(/Ma JiongWen/g,"马炅文");
htmlstr=htmlstr.replace(/Shi YaTao/g,"石亚涛");
htmlstr=htmlstr.replace(/Tan DongYa/g,"谭东亚");
htmlstr=htmlstr.replace(/Wan ZaiYu/g,"万载羽");
htmlstr=htmlstr.replace(/Weng YuJie/g,"翁羽杰");
htmlstr=htmlstr.replace(/Ye Qi/g,"叶齐");
htmlstr=htmlstr.replace(/Ying ChangLe/g,"赢长乐");
htmlstr=htmlstr.replace(/Zeng TengLong/g,"曾腾龙");
htmlstr=htmlstr.replace(/Zhang QiongZhong/g,"章琼忠");
htmlstr=htmlstr.replace(/Zhi XingYan/g,"智兴岩"); 
htmlstr=htmlstr.replace(/Zong DaMing/g,"宗达名");
htmlstr=htmlstr.replace(/Zou JiuZhang/g,"邹玖章");

//28
//根宝足球训练基地
htmlstr=htmlstr.replace(/An WeiWei/g,"安韦玮");

//No.29
//SnowyTown
htmlstr=htmlstr.replace(/Bu YiGuang/g,"卜一光");
htmlstr=htmlstr.replace(/Chao HouLin/g,"晁后邻");
htmlstr=htmlstr.replace(/Chu LiZe/g,"褚利泽");
htmlstr=htmlstr.replace(/Dong MeiYu/g,"董美玉");
htmlstr=htmlstr.replace(/Du PinQuan/g,"杜品荃");
htmlstr=htmlstr.replace(/Gao Gang/g,"高岗");
htmlstr=htmlstr.replace(/Ge ZhiLu/g,"葛志璐");
htmlstr=htmlstr.replace(/GongSun ZhaoShun/g,"公孙昭顺");
htmlstr=htmlstr.replace(/Gui YunFeng/g,"桂云峰");
htmlstr=htmlstr.replace(/He ZhongYou/g,"贺忠友");
htmlstr=htmlstr.replace(/Hong JianYe/g,"洪建业");
htmlstr=htmlstr.replace(/Hou JiuTao/g,"侯久涛");
htmlstr=htmlstr.replace(/Huo MengGu/g,"霍猛故"); 
htmlstr=htmlstr.replace(/Jia JingYang/g,"贾京阳");
htmlstr=htmlstr.replace(/Jian EnHua/g,"简恩华");
htmlstr=htmlstr.replace(/Lai GuangNan/g,"赖光楠");
htmlstr=htmlstr.replace(/Li BoRui/g,"李柏瑞");
htmlstr=htmlstr.replace(/LiYang De/g,"李阳德");
htmlstr=htmlstr.replace(/Liang ZiHeng/g,"梁子恒");
htmlstr=htmlstr.replace(/Liao XiangTao/g,"廖祥涛");
htmlstr=htmlstr.replace(/Luo YanKai/g,"罗颜开");
htmlstr=htmlstr.replace(/Nong An/g,"农安");
htmlstr=htmlstr.replace(/Ou Cheng/g,"欧城");
htmlstr=htmlstr.replace(/Ou JunNan/g,"欧俊男");
htmlstr=htmlstr.replace(/Qian TingRui/g,"钱庭瑞");
htmlstr=htmlstr.replace(/Qiao Da/g,"乔大");
htmlstr=htmlstr.replace(/Shao HanWen/g,"邵汉文");
htmlstr=htmlstr.replace(/Shen GuangQi/g,"沈光奇");
htmlstr=htmlstr.replace(/Shu GuangZhong/g,"舒光忠");
htmlstr=htmlstr.replace(/Shui ShengYuan/g,"水生源");
htmlstr=htmlstr.replace(/Si ZhaoYao/g,"司照耀");
htmlstr=htmlstr.replace(/Sun ShiDuo/g,"孙士多");
htmlstr=htmlstr.replace(/Tang YongBo/g,"汤勇博");
htmlstr=htmlstr.replace(/Wan JinShan/g,"万金山");
htmlstr=htmlstr.replace(/Wang DongLiang/g,"王栋梁");
htmlstr=htmlstr.replace(/Wang XueRui/g,"王雪芮");
htmlstr=htmlstr.replace(/Wei JiaJu/g,"魏家驹");
htmlstr=htmlstr.replace(/Wu Yue/g,"吴越");
htmlstr=htmlstr.replace(/Xu YongHuai/g,"徐勇怀");
htmlstr=htmlstr.replace(/Yang DongJie/g,"杨东杰");
htmlstr=htmlstr.replace(/Ye XiaoPeng/g,"叶霄鹏");
htmlstr=htmlstr.replace(/You HaiQing/g,"游海清");
htmlstr=htmlstr.replace(/Yu Guang/g,"余光");
htmlstr=htmlstr.replace(/Zhai Xun/g,"翟寻");
htmlstr=htmlstr.replace(/Zhang GengYang/g,"张耿阳");
htmlstr=htmlstr.replace(/Zhang XinJie/g,"张新杰");
htmlstr=htmlstr.replace(/Zhang ZhenYang/g,"张震杨");
htmlstr=htmlstr.replace(/Zhang ZhiNing/g,"张志宁");
htmlstr=htmlstr.replace(/Zou QiChen/g,"邹启晨");
htmlstr=htmlstr.replace(/Zou YingChun/g,"邹迎春");


//No.30 
//蓝调火花 
htmlstr=htmlstr.replace(/Adelgardo Dell'Asino/g,"阿德瓜多·戴尔阿斯诺"); 
htmlstr=htmlstr.replace(/Chang XiangWei/g,"常相伟"); 
htmlstr=htmlstr.replace(/Chen YaWei/g,"陈亚维");
htmlstr=htmlstr.replace(/Fu XinXin/g,"付欣欣"); 
htmlstr=htmlstr.replace(/Fábio Da Silva/g,"法比奥·达·席尔瓦"); 
htmlstr=htmlstr.replace(/Huang Rui/g,"黄瑞"); 
htmlstr=htmlstr.replace(/Pavel Kuchukian/g,"帕维尔·库楚坎"); 
htmlstr=htmlstr.replace(/Ren QiuMing /g,"任秋明");
htmlstr=htmlstr.replace(/Wang Hai/g,"王海"); 
htmlstr=htmlstr.replace(/Wen Bai/g,"闻白"); 
htmlstr=htmlstr.replace(/Xiong TianYou/g,"熊天佑"); 
htmlstr=htmlstr.replace(/Yang HuiPing/g,"杨慧平"); 
htmlstr=htmlstr.replace(/Ye DiFan/g,"叶迪凡"); 
htmlstr=htmlstr.replace(/Yin JunLin/g,"尹俊琳"); 
htmlstr=htmlstr.replace(/You YunPeng/g,"游云鹏"); 
htmlstr=htmlstr.replace(/Yuan ZhongShi /g,"元忠实");
htmlstr=htmlstr.replace(/Zhou ChaoChao/g,"周超超"); 
htmlstr=htmlstr.replace(/Zhou MingFei/g,"周明飞");
htmlstr=htmlstr.replace(/Zhou Zu/g,"周祖"); 

//No.31 
//福州泰然 
htmlstr=htmlstr.replace(/Bian JiaKang/g,"卞加康"); 
htmlstr=htmlstr.replace(/Ding XiaoXin/g,"丁晓昕"); 
htmlstr=htmlstr.replace(/Fei YuanDong/g,"费源东"); 
htmlstr=htmlstr.replace(/Gan ChangQing/g,"甘长青"); 
htmlstr=htmlstr.replace(/Gao ZiTeng/g,"高梓腾"); 
htmlstr=htmlstr.replace(/Geng ShenZhou/g,"耿胜周"); 
htmlstr=htmlstr.replace(/Hua GuiYan/g,"华归雁"); 
htmlstr=htmlstr.replace(/Jia XiaoTian/g,"贾晓天"); 
htmlstr=htmlstr.replace(/Jiao DongDong/g,"胶东东"); 
htmlstr=htmlstr.replace(/Li XingHui/g,"李星辉"); 
htmlstr=htmlstr.replace(/Luo JunLing/g,"洛筠凌"); 
htmlstr=htmlstr.replace(/Peng ZiLong/g,"鹏子龙"); 
htmlstr=htmlstr.replace(/Qi YaoTong/g,"齐遥桐"); 
htmlstr=htmlstr.replace(/Tong TianLe/g,"同天乐"); 
htmlstr=htmlstr.replace(/Tu Bai/g,"涂拜"); 
htmlstr=htmlstr.replace(/Weng GenGen/g,"翁根根"); 
htmlstr=htmlstr.replace(/Xian MeiYan/g,"冼梅雁"); 
htmlstr=htmlstr.replace(/Zhan YueSheng/g,"占越胜"); 
htmlstr=htmlstr.replace(/Zhang WenKai/g,"张文凯"); 
htmlstr=htmlstr.replace(/ZhangLiang XiYan/g,"张梁西彦"); 
htmlstr=htmlstr.replace(/Zhao ZuoLin/g,"赵作霖"); 
htmlstr=htmlstr.replace(/Zheng HengShan/g,"正恒山"); 
htmlstr=htmlstr.replace(/Zheng XiGuang/g,"郑熙广"); 
htmlstr=htmlstr.replace(/Zhou JingRen/g,"周惊人"); 
htmlstr=htmlstr.replace(/Zhou JingRen/g,"周景仁"); 

//No.32
//泉州智衡
htmlstr=htmlstr.replace(/Ai TianYin/g,"艾天茵");
htmlstr=htmlstr.replace(/Chao DongBing/g,"晁东兵");
htmlstr=htmlstr.replace(/Chen JiaHe/g,"陈家贺");
htmlstr=htmlstr.replace(/DuGu XuLin/g,"独孤旭林");
htmlstr=htmlstr.replace(/Fu BaoRen/g,"傅保仁");
htmlstr=htmlstr.replace(/Gabriel Mazilu/g,"加布里埃尔·马奇路");
htmlstr=htmlstr.replace(/Huang WeiSheng/g,"黄伟晟");
htmlstr=htmlstr.replace(/Huo HeXuan/g,"霍赫宣");
htmlstr=htmlstr.replace(/Huo JiChao/g,"霍继超");
htmlstr=htmlstr.replace(/Jiang ZeXi/g,"江泽溪");
htmlstr=htmlstr.replace(/Jiao YiXiang/g,"金一翔");
htmlstr=htmlstr.replace(/Kaiji Momose/g,"百濑宏林");
htmlstr=htmlstr.replace(/Lei PengFei/g,"雷鹏飞");
htmlstr=htmlstr.replace(/Leng XiaoGuang/g,"冷潇广");
htmlstr=htmlstr.replace(/Li JunFeng/g,"李俊峰");
htmlstr=htmlstr.replace(/Lin HanShuo/g,"林涵硕");
htmlstr=htmlstr.replace(/Ma WenYi/g,"马文一");
htmlstr=htmlstr.replace(/Marek Gazda/g,"马尔科·加扎德");
htmlstr=htmlstr.replace(/Mattia Pezzi/g,"马蒂亚·拜齐");
htmlstr=htmlstr.replace(/Pan CiFu/g,"潘次赴");
htmlstr=htmlstr.replace(/Sun ZhengTu/g,"孙正途");
htmlstr=htmlstr.replace(/Xi Shang/g,"习尚");
htmlstr=htmlstr.replace(/Xiao De/g,"肖德");
htmlstr=htmlstr.replace(/Xu ZhiYu/g,"徐致予");
htmlstr=htmlstr.replace(/Zhang JinShang/g,"张进上");
htmlstr=htmlstr.replace(/Zhao Hang/g,"赵航");
htmlstr=htmlstr.replace(/Zheng JiaCheng/g,"郑嘉城");

//No.33
//青岛黄海
htmlstr=htmlstr.replace(/Shu ShuangBang/g,"舒双邦");
htmlstr=htmlstr.replace(/Xu XiangChuang/g,"徐向闯");
htmlstr=htmlstr.replace(/Musgu Bigo/g,"玛斯古·宾狗");
htmlstr=htmlstr.replace(/Nie ZhuoRan/g,"聂卓然");
htmlstr=htmlstr.replace(/Luan JunSheng/g,"栾俊生");

//No.34
//迷途小球童
htmlstr=htmlstr.replace(/Cao XinZhi/g,"曹馨之"); 
htmlstr=htmlstr.replace(/De'ron Powell/g,"德朗·鲍威尔"); 
htmlstr=htmlstr.replace(/Günther Selinger/g,"甘瑟·塞林格"); 
htmlstr=htmlstr.replace(/Hu YaZhao/g,"胡亚朝"); 
htmlstr=htmlstr.replace(/Li ZeTao/g,"李泽涛"); 
htmlstr=htmlstr.replace(/Lin Shou/g,"林寿"); 
htmlstr=htmlstr.replace(/Liu LiMing/g,"刘利明"); 
htmlstr=htmlstr.replace(/Liu YaoDong/g,"刘耀东"); 
htmlstr=htmlstr.replace(/Lu JiaChen/g,"卢佳辰");
htmlstr=htmlstr.replace(/Luo PengXiang/g,"罗鹏翔"); 
htmlstr=htmlstr.replace(/Mohamed Hamdoud/g,"穆罕默德·哈姆杜德"); 
htmlstr=htmlstr.replace(/Niu ShaoNan/g,"牛少楠"); 
htmlstr=htmlstr.replace(/Paul Banica/g,"保罗·巴尼卡"); 
htmlstr=htmlstr.replace(/Ren ChengDe/g,"任成德"); 
htmlstr=htmlstr.replace(/Shan ZhuoYi/g,"单卓义"); 
htmlstr=htmlstr.replace(/Shi GongQing/g,"石功青"); 
htmlstr=htmlstr.replace(/Shu YiJi/g,"书一击"); 
htmlstr=htmlstr.replace(/Shu YueFeng/g,"舒岳峰"); 
htmlstr=htmlstr.replace(/Tian TaoMao/g,"田涛茂"); 
htmlstr=htmlstr.replace(/Wang ShuXiao/g,"王书晓"); 
htmlstr=htmlstr.replace(/Wen JinHuang/g,"文金黄"); 
htmlstr=htmlstr.replace(/Wu JiangHui/g,"吴江辉"); 
htmlstr=htmlstr.replace(/Zhao ShiKai/g,"赵世开"); 
htmlstr=htmlstr.replace(/Zheng ZhiWei/g,"郑智威"); 
htmlstr=htmlstr.replace(/Zhuang XiaoPing/g,"庄小平"); 
htmlstr=htmlstr.replace(/Zu YuanAn/g,"祖元安"); 

//No.35 福建中天 
htmlstr=htmlstr.replace(/Gong ShiKai/g,"龚世凯"); 
htmlstr=htmlstr.replace(/Jiang YiFeng/g,"江逸风"); 
htmlstr=htmlstr.replace(/Wu SuZheng/g,"吴苏正"); 
htmlstr=htmlstr.replace(/Xie JianJun/g,"谢剑钧"); 
htmlstr=htmlstr.replace(/Ye EnHua/g,"叶恩华"); 
htmlstr=htmlstr.replace(/Zhao ZhiKang/g,"赵志康"); 
htmlstr=htmlstr.replace(/Zhu YunLong/g,"朱云龙");

//No.36
//天龙谷
htmlstr=htmlstr.replace(/Chen NiuNiu/g,"陈牛牛");
htmlstr=htmlstr.replace(/Fei XiXian/g,"费熙贤");
htmlstr=htmlstr.replace(/Hu ChunXi/g,"胡淳熙");
htmlstr=htmlstr.replace(/Ke ChunJi/g,"柯春记");
htmlstr=htmlstr.replace(/Li HengCheng/g,"李恒诚");
htmlstr=htmlstr.replace(/Li ShiWei/g,"李士为");
htmlstr=htmlstr.replace(/Lin HongXuan/g,"林凤轩");
htmlstr=htmlstr.replace(/Miao BaoRong/g,"苗宝荣");
htmlstr=htmlstr.replace(/Ou GeZhuo/g,"欧歌卓");
htmlstr=htmlstr.replace(/Qian ChenHao/g,"钱尘昊");
htmlstr=htmlstr.replace(/Su WenQiang/g,"苏文强");
htmlstr=htmlstr.replace(/Wan HuiDong/g,"万惠东");
htmlstr=htmlstr.replace(/Wu ZhiPing/g,"武志平");
htmlstr=htmlstr.replace(/Xiang Man/g,"香曼");
htmlstr=htmlstr.replace(/Xiong HouYong/g,"熊侯勇");
htmlstr=htmlstr.replace(/Xiong XiLai/g,"熊熙来");
htmlstr=htmlstr.replace(/Xu MuYuan/g,"徐牧原");
htmlstr=htmlstr.replace(/Yang YuShu/g,"杨玉树");
htmlstr=htmlstr.replace(/Zhen CheLie/g,"甄车烈");
htmlstr=htmlstr.replace(/Zheng YuWei/g,"郑鱼维");
	
//No.37
//东莞FC
htmlstr=htmlstr.replace(/An XiSha/g,"安西沙");
htmlstr=htmlstr.replace(/Cui RunZhong/g,"崔润中");
htmlstr=htmlstr.replace(/Dang ShiMing/g,"党世铭");
htmlstr=htmlstr.replace(/Du LinJiang/g,"杜林江");
htmlstr=htmlstr.replace(/Feng JiLin/g,"冯吉林");
htmlstr=htmlstr.replace(/He YuHang/g,"何宇航");
htmlstr=htmlstr.replace(/Huang JianWei/g,"黄建伟");
htmlstr=htmlstr.replace(/Jia Kun/g,"贾坤");
htmlstr=htmlstr.replace(/Jiao ZhenXun/g,"焦振勋");
htmlstr=htmlstr.replace(/Kong BingQuan/g,"孔冰泉");
htmlstr=htmlstr.replace(/Li FangJie/g,"栗方杰");
htmlstr=htmlstr.replace(/Li GuanXi/g,"李冠希");
htmlstr=htmlstr.replace(/Liu Chou/g,"刘稠");
htmlstr=htmlstr.replace(/Liu YueYing/g,"刘岳英");
htmlstr=htmlstr.replace(/Man YingTao/g,"满英涛");
htmlstr=htmlstr.replace(/Nong YiMing/g,"农一鸣");
htmlstr=htmlstr.replace(/Qian ShouTing/g,"钱寿庭");
htmlstr=htmlstr.replace(/Shi YongSheng/g,"石永胜");
htmlstr=htmlstr.replace(/Wu ShaoHua/g,"吴绍华");
htmlstr=htmlstr.replace(/Xu JinFei/g,"许劲飞");
htmlstr=htmlstr.replace(/Xuan ChenYao/g,"宣辰耀");
htmlstr=htmlstr.replace(/You ShaoQuan/g,"游绍权");
htmlstr=htmlstr.replace(/Yuan RuiJie/g,"袁锐捷");
htmlstr=htmlstr.replace(/Yuan WenJie/g,"袁文杰");
htmlstr=htmlstr.replace(/Zhao LiHong/g,"赵力宏");
htmlstr=htmlstr.replace(/Zheng ZhiWei/g,"郑志伟");

//No.38 严良贤的私人足球队
htmlstr=htmlstr.replace(/Xie ShengLong/g,"谢申龙"); 
htmlstr=htmlstr.replace(/Lei YuanPei/g,"雷元鹏");

//No.38 
//宁波包子队
htmlstr=htmlstr.replace(/Kang GaoJun/g,"康高俊");
htmlstr=htmlstr.replace(/Wu YaJun/g,"吴亚军");
htmlstr=htmlstr.replace(/Sun SanSha/g,"孙三沙");
htmlstr=htmlstr.replace(/Guo YongQi/g,"郭永奇");
htmlstr=htmlstr.replace(/Zhang YuChuan/g,"张玉川");
htmlstr=htmlstr.replace(/Li WenZhai/g,"李文斋");
htmlstr=htmlstr.replace(/Sheng ChengXuan/g,"盛成轩");
htmlstr=htmlstr.replace(/Xu HongPing/g,"徐洪平");
htmlstr=htmlstr.replace(/Kang BinYi/g,"康秉义");
htmlstr=htmlstr.replace(/Zheng XianJi/g,"郑宪基");
htmlstr=htmlstr.replace(/Lan AiMin/g,"兰爱民");
htmlstr=htmlstr.replace(/Pang Tai/g,"庞泰");
htmlstr=htmlstr.replace(/Qian KaiHong/g,"钱开宏");
htmlstr=htmlstr.replace(/Chi JianHua/g,"迟建华");
htmlstr=htmlstr.replace(/Du KeCheng/g,"杜克成");
htmlstr=htmlstr.replace(/Wang JianXin/g,"王建新");
htmlstr=htmlstr.replace(/Wang WenLong/g,"王文龙");
htmlstr=htmlstr.replace(/Min HongLve/g,"闵洪略");
htmlstr=htmlstr.replace(/XiaHou YaoKun/g,"夏侯耀坤");
htmlstr=htmlstr.replace(/Zhao ShuaiGang/g,"赵帅刚");
htmlstr=htmlstr.replace(/Cai SenXiang/g,"蔡森祥");
htmlstr=htmlstr.replace(/Huo YuanChao/g,"霍元超");
htmlstr=htmlstr.replace(/Zhang HouLei/g,"张厚雷");
htmlstr=htmlstr.replace(/Yang HuWei/g,"杨虎威");

	
//特殊名字
htmlstr=htmlstr.replace(/Li MAZiJun/g,"李马訾俊");
htmlstr=htmlstr.replace(/Liu DeHua/g,"刘德华");
htmlstr=htmlstr.replace(/Qi WuSheng/g,"戚务生");
htmlstr=htmlstr.replace(/Sun Ke/g,"孙可");
htmlstr=htmlstr.replace(/Zhang YiMou/g,"张艺谋");
htmlstr=htmlstr.replace(/Zhao MAZiJun/g,"赵马梓君");

//NT
htmlstr=htmlstr.replace(/Chen ZheQian/g,"陈哲乾");
htmlstr=htmlstr.replace(/Cheng YaKe/g,"程亚柯");
htmlstr=htmlstr.replace(/DuGu '独孤九剑' WenCi|DuGu WenCi/g,"独孤文辞");
htmlstr=htmlstr.replace(/Gao WenYong/g,"高稳勇");
htmlstr=htmlstr.replace(/Guan JiangRui/g,"关江瑞");
htmlstr=htmlstr.replace(/Guo '锅盖' HeJing|Guo HeJing/g,"郭和靖");
htmlstr=htmlstr.replace(/He Zhu/g,"何著");
htmlstr=htmlstr.replace(/Huo KeZhen|Huo '甄子丹' KeZhen/g,"霍克珍");
htmlstr=htmlstr.replace(/Huo ZhiLei/g,"霍志磊");
htmlstr=htmlstr.replace(/LingHu HongGang/g,"令狐宏刚");
htmlstr=htmlstr.replace(/Liu '刘子杰' ZiJie|Liu ZiJie/g,"刘子杰");
htmlstr=htmlstr.replace(/Lu FuSheng/g,"卢福胜");
htmlstr=htmlstr.replace(/Ma WenYuan/g,"马文远");
htmlstr=htmlstr.replace(/Mao TianTa/g,"毛天塔");
htmlstr=htmlstr.replace(/Nan HuiChen/g,"南惠晨");
htmlstr=htmlstr.replace(/Shen ZhengRong/g,"沈峥嵘");
htmlstr=htmlstr.replace(/Song RuiKai/g,"宋瑞凯");
htmlstr=htmlstr.replace(/Tie '李铁' GuoLi|Tie GuoLi/g,"铁国立");
htmlstr=htmlstr.replace(/Tu 'Shi Ke' Fa|Tu Fa/g,"涂珐");
htmlstr=htmlstr.replace(/Wang '王瑞仑' RuiLun|Wang RuiLun/g,"王瑞伦");
htmlstr=htmlstr.replace(/Xu Ya/g,"徐亚");
htmlstr=htmlstr.replace(/Zhang ChangQing/g,"张长卿");
htmlstr=htmlstr.replace(/Zhang Yi Na/g,"那张毅");
htmlstr=htmlstr.replace(/Zhao '赵四' YanLin|Zhao YanLin/g,"赵炎麟");


//二字
htmlstr=htmlstr.replace(/Fan Heng/g,"范衡");
htmlstr=htmlstr.replace(/Guo Kun/g,"郭坤"); 
htmlstr=htmlstr.replace(/Hua Qiang/g,"华强"); 
htmlstr=htmlstr.replace(/Huang Wei/g,"黄威"); 
htmlstr=htmlstr.replace(/Huo Lie/g,"霍烈"); 
htmlstr=htmlstr.replace(/Qian Xi/g,"千禧");
htmlstr=htmlstr.replace(/Ruan Qi/g,"阮奇");
htmlstr=htmlstr.replace(/Wang Guo/g,"王国");
htmlstr=htmlstr.replace(/Zheng Yin/g,"郑印");
htmlstr=htmlstr.replace(/Zhuang Kuo/g,"装阔"); 

document.getElementsByTagName('html')[0].innerHTML=htmlstr;
//////////////////////////////////////////////////////////////////////////////////

function nametip(){
var htmlstr=document.getElementById("tooltip").innerHTML;


//No.1
//北京零点
htmlstr=htmlstr.replace(/Ling MuYuan/g,"凌穆辕");  
htmlstr=htmlstr.replace(/Li JinYu/g,"李金羽");  

//No.2
//义乌创达集团有限公司 
htmlstr=htmlstr.replace(/Wang YanFei/g,"王延飞"); 
htmlstr=htmlstr.replace(/Xie XueZheng/g,"谢学征"); 
htmlstr=htmlstr.replace(/Mo AiMin/g,"莫艾闵");
htmlstr=htmlstr.replace(/Zhu ZhongYou/g,"朱忠友");
htmlstr=htmlstr.replace(/Ye ShuRen/g,"叶庶仁"); 
htmlstr=htmlstr.replace(/Tie JiuZhou/g,"铁久洲");
htmlstr=htmlstr.replace(/Li YiKang/g,"李益康");

//No.3
//太原FC
htmlstr=htmlstr.replace(/Bi Xiao/g,"毕萧");
htmlstr=htmlstr.replace(/Bi ZhongTian/g,"毕中天");
htmlstr=htmlstr.replace(/Cao MiaoRui/g,"曹妙瑞");
htmlstr=htmlstr.replace(/Gao GuangZhong/g,"高光忠");
htmlstr=htmlstr.replace(/Gao XinYue/g,"高欣越");
htmlstr=htmlstr.replace(/Gong ChaoYuan/g,"宫朝原");
htmlstr=htmlstr.replace(/Guan Chun/g,"关淳");
htmlstr=htmlstr.replace(/Guo KangCheng/g,"郭康成");
htmlstr=htmlstr.replace(/Han MingYi/g,"韩明义");
htmlstr=htmlstr.replace(/He ShengYi/g,"何圣依");
htmlstr=htmlstr.replace(/He Zhi/g,"何志");
htmlstr=htmlstr.replace(/Hong DongBing/g,"洪东兵");
htmlstr=htmlstr.replace(/Hong WeiQiang/g,"洪伟强");
htmlstr=htmlstr.replace(/Hu JinPing/g,"胡金平");
htmlstr=htmlstr.replace(/Huang XiaoMing/g,"黄晓明");
htmlstr=htmlstr.replace(/Huang ZhiXuan/g,"黄智炫");
htmlstr=htmlstr.replace(/HuangFu PengHan/g,"皇甫澎瀚");
htmlstr=htmlstr.replace(/Jia DeChao/g,"贾德超");
htmlstr=htmlstr.replace(/Kong ZhenSheng/g,"孔振生");
htmlstr=htmlstr.replace(/Li DeNan|Li '小李飞刀' DeNan/g,"李德南");
htmlstr=htmlstr.replace(/Li FangZhuo/g,"李方卓");
htmlstr=htmlstr.replace(/Li KaiRen/g,"李开仁");
htmlstr=htmlstr.replace(/Li QiXian/g,"李齐贤");
htmlstr=htmlstr.replace(/Li RuiQiang/g,"李瑞强");
htmlstr=htmlstr.replace(/Liang JianChun/g,"梁建春");
htmlstr=htmlstr.replace(/Liang Liang/g,"梁良");
htmlstr=htmlstr.replace(/Liu Lu/g,"刘陆");
htmlstr=htmlstr.replace(/Lu XueFei/g,"陆学飞");
htmlstr=htmlstr.replace(/Ma LiQiang/g,"马立强");
htmlstr=htmlstr.replace(/Ma NingYuan/g,"马宁远");
htmlstr=htmlstr.replace(/Mi SanQiang/g,"米三强");
htmlstr=htmlstr.replace(/Niu XinKai/g,"牛新凯");
htmlstr=htmlstr.replace(/Ou ZhenHua/g,"欧振华");
htmlstr=htmlstr.replace(/Pan FengYi/g,"潘峰怡");
htmlstr=htmlstr.replace(/Qian HaiCheng/g,"钱海澄");
htmlstr=htmlstr.replace(/Qian PengCheng/g,"钱鹏程");
htmlstr=htmlstr.replace(/She JiHua/g,"佘继华");
htmlstr=htmlstr.replace(/Shen RuiLin/g,"沈瑞琳");
htmlstr=htmlstr.replace(/Shi JiangHua/g,"石江华");
htmlstr=htmlstr.replace(/Shi ZhiNing/g,"石志宁");
htmlstr=htmlstr.replace(/Si ZhengPeng/g,"司正鹏");
htmlstr=htmlstr.replace(/Sun Lei/g,"孙磊");
htmlstr=htmlstr.replace(/Wan Qiang/g,"万强");
htmlstr=htmlstr.replace(/Wang TieSheng/g,"王铁生");
htmlstr=htmlstr.replace(/XianYu RunTao/g,"鲜于润涛");
htmlstr=htmlstr.replace(/Xiang QiuMing/g,"项秋明");
htmlstr=htmlstr.replace(/Xie YiFan/g,"谢一凡");
htmlstr=htmlstr.replace(/Xiong JianQiang/g,"熊建强");
htmlstr=htmlstr.replace(/Yan FengSheng/g,"闫丰胜");
htmlstr=htmlstr.replace(/Ye DeNan/g,"叶德楠");
htmlstr=htmlstr.replace(/Yi HaiDong|Yi '一嗨咚' HaiDong/g,"易海东");
htmlstr=htmlstr.replace(/Zhai YueFei/g,"翟跃飞");
htmlstr=htmlstr.replace(/Zhang ChenXi/g,"张晨曦");
htmlstr=htmlstr.replace(/Zhang DaWei/g,"张达维");
htmlstr=htmlstr.replace(/Zhang YuanHang/g,"张远航");
htmlstr=htmlstr.replace(/Zhao BinJia/g,"赵彬嘉");
htmlstr=htmlstr.replace(/Zhao Yong/g,"赵勇");
htmlstr=htmlstr.replace(/Zhen XiangNan/g,"甄向楠");
htmlstr=htmlstr.replace(/Zhou PengZhi/g,"周鹏志");
htmlstr=htmlstr.replace(/Zhou TaoFu/g,"周涛福");
htmlstr=htmlstr.replace(/Zhou Zheng/g,"周正");
htmlstr=htmlstr.replace(/ZhuGe BinYi/g,"诸葛滨懿");
htmlstr=htmlstr.replace(/Zhuang Han/g,"庄寒");
htmlstr=htmlstr.replace(/Zhuang LongYuan/g,"庄龙渊");
htmlstr=htmlstr.replace(/Zu JiangHua/g,"祖江华");

//No.4
//纽约市市委办公室 
htmlstr=htmlstr.replace(/Alessandro Fari/g,"亚历山德罗·法里"); 
htmlstr=htmlstr.replace(/Bernard Manina/g,"伯纳德·马尼纳"); 
htmlstr=htmlstr.replace(/Cheng YiBo/g,"程一博"); 
htmlstr=htmlstr.replace(/Daniel O'Keefe/g,"丹尼尔·奥基夫"); 
htmlstr=htmlstr.replace(/Federico Martin Contreras/g,"费德里克·马丁·孔特雷拉斯"); 
htmlstr=htmlstr.replace(/He ZeJia/g,"何泽佳");
htmlstr=htmlstr.replace(/Ibrahim Baasch/g,"易卜拉欣·巴什"); 
htmlstr=htmlstr.replace(/Iulian Craciun/g,"尤利安·克拉申"); 
htmlstr=htmlstr.replace(/Jay Bertin/g,"杰伊·贝尔汀"); 
htmlstr=htmlstr.replace(/Ji MuZong/g,"季木宗"); 
htmlstr=htmlstr.replace(/Karol Sydor/g,"卡罗尔·希多"); 
htmlstr=htmlstr.replace(/Kostas Anastasiadis/g,"科斯塔斯·安纳斯塔迪亚斯"); 
htmlstr=htmlstr.replace(/Ksawery Szych/g,"克什里"); 
htmlstr=htmlstr.replace(/Leng RenTian/g,"冷仁天"); 
htmlstr=htmlstr.replace(/Li HanShuo/g,"李寒朔"); 
htmlstr=htmlstr.replace(/Li XuanDe/g,"李轩徳"); 
htmlstr=htmlstr.replace(/Lu YingQuan/g,"陆英权"); 
htmlstr=htmlstr.replace(/Lus Arévalos/g,"卢斯·阿旺索"); 
htmlstr=htmlstr.replace(/Ma XingHan/g,"马兴汉"); 
htmlstr=htmlstr.replace(/Niu QingLin/g,"牛青林"); 
htmlstr=htmlstr.replace(/Norbert Tóth/g,"诺伯特·托斯"); 
htmlstr=htmlstr.replace(/Qiu GuoWen/g,"邱国稳"); 
htmlstr=htmlstr.replace(/Rao AiGuo/g,"饶爱国"); 
htmlstr=htmlstr.replace(/Shi ChuGe/g,"石楚阁"); 
htmlstr=htmlstr.replace(/Xu MengDa/g,"徐萌大"); 
htmlstr=htmlstr.replace(/Ye YingQuan/g,"叶英权"); 
htmlstr=htmlstr.replace(/Yin ZeHong/g,"尹泽弘"); 
htmlstr=htmlstr.replace(/Yu WenJun/g,"余文君"); 
htmlstr=htmlstr.replace(/Zeng WenYong/g,"曾稳勇"); 
htmlstr=htmlstr.replace(/Zhang FengChui/g,"张风吹"); 


//No.5
//川沙辅川 
htmlstr=htmlstr.replace(/Ao GuangYang/g,"岙广鞅"); 
htmlstr=htmlstr.replace(/Ao JiHai/g,"岙冀海"); 
htmlstr=htmlstr.replace(/Bony Abdullah/g,"邦尼·阿卜杜拉"); 
htmlstr=htmlstr.replace(/Cai PinGuan/g,"蔡品冠"); 
htmlstr=htmlstr.replace(/Chao Le/g,"晁乐"); 
htmlstr=htmlstr.replace(/Chen ChengQi/g,"陈成琪"); 
htmlstr=htmlstr.replace(/Chen TianYuan/g,"陈天远"); 
htmlstr=htmlstr.replace(/Dai JiuZhou/g,"代九州"); 
htmlstr=htmlstr.replace(/Hu JiaYu/g,"胡驾域");
htmlstr=htmlstr.replace(/Huang JinChao/g,"黄晋朝 "); 
htmlstr=htmlstr.replace(/Ji YiMin/g,"季以旻"); 
htmlstr=htmlstr.replace(/Jonathan Breydel/g,"乔纳森·布雷迪尔"); 
htmlstr=htmlstr.replace(/Liang JiaShu/g,"梁稼述"); 
htmlstr=htmlstr.replace(/Liang RuiWen/g,"梁睿文"); 
htmlstr=htmlstr.replace(/Lin HongLe/g,"林弘乐"); 
htmlstr=htmlstr.replace(/Liu KeRui/g,"刘克睿");
htmlstr=htmlstr.replace(/Lu XiaoFan/g,"路孝凡"); 
htmlstr=htmlstr.replace(/Luke Stevens/g,"鲁科·斯蒂文思");
htmlstr=htmlstr.replace(/Lv FuCheng/g,"吕辅承"); 
htmlstr=htmlstr.replace(/Maxim Sokov/g,"马格兹木·苏克文"); 
htmlstr=htmlstr.replace(/Nasuhi Ata/g,"纳苏黑·阿塔"); 
htmlstr=htmlstr.replace(/Qi RuoFu/g,"齐若孚"); 
htmlstr=htmlstr.replace(/Qiu MingFei/g,"邱明斐"); 
htmlstr=htmlstr.replace(/Tao ZiHe/g,"陶资和"); 
htmlstr=htmlstr.replace(/Tian JunYu/g,"田均雨"); 
htmlstr=htmlstr.replace(/Valeriy Osyanin/g,"瓦列里·奥塞宁"); 
htmlstr=htmlstr.replace(/Wang XingGuang/g,"王兴广"); 
htmlstr=htmlstr.replace(/Xiao Shangde/g,"萧尚德"); 
htmlstr=htmlstr.replace(/Yao BoFan/g,"姚博帆");
htmlstr=htmlstr.replace(/Yun Jie/g,"恽介"); 
htmlstr=htmlstr.replace(/Zhang YongYong/g,"张永雍");
htmlstr=htmlstr.replace(/ZhangLiang YueCheng/g,"张梁越丞"); 
htmlstr=htmlstr.replace(/Zheng Bei/g,"郑北"); 
htmlstr=htmlstr.replace(/Zheng ZiLong/g,"郑子隆"); 
htmlstr=htmlstr.replace(/Zhong TianYu/g,"钟田羽"); 
htmlstr=htmlstr.replace(/Zhou QiHan/g,"周祁寒"); 

//Bayer 04 Leverkusen 
//No.6
htmlstr=htmlstr.replace(/Anas Nafti/g,"阿纳斯·纳法蒂"); 
htmlstr=htmlstr.replace(/Bai GuoHao/g,"白国豪"); 
htmlstr=htmlstr.replace(/Bu GaiJie/g,"卜垓杰"); 
htmlstr=htmlstr.replace(/Cecyliusz Gotowicki/g,"塞西柳丝·格托维斯基"); 
htmlstr=htmlstr.replace(/Chi HengZhi/g,"迟恒之"); 
htmlstr=htmlstr.replace(/Fan FengChui/g,"樊风吹"); 
htmlstr=htmlstr.replace(/Fang JiaMin/g,"方佳敏"); 
htmlstr=htmlstr.replace(/Fei ZiRan/g,"妃子冉"); 
htmlstr=htmlstr.replace(/Fu WenTao/g,"付文韬"); 
htmlstr=htmlstr.replace(/Hu LiangYu/g,"胡良宇"); 
htmlstr=htmlstr.replace(/Hu XueDong/g,"胡学冬"); 
htmlstr=htmlstr.replace(/Hua ZhongYi/g,"华中一"); 
htmlstr=htmlstr.replace(/Huang WuShuang/g,"皇无双"); 
htmlstr=htmlstr.replace(/Huang ZhuoJun/g,"黄卓君"); 
htmlstr=htmlstr.replace(/Isaac Weijgertze/g,"伊萨克·维嘉格雷泽"); 
htmlstr=htmlstr.replace(/Jae-Sun Mok/g,"孙缄默"); 
htmlstr=htmlstr.replace(/Jia MingHu/g,"贾明虎"); 
htmlstr=htmlstr.replace(/Jian HongJun/g,"建红军"); 
htmlstr=htmlstr.replace(/Kanaan Al Qanawati/g,"卡纳安·埃卡那瓦迪"); 
htmlstr=htmlstr.replace(/Lai RuiLin/g,"莱瑞林"); 
htmlstr=htmlstr.replace(/Li JianFeng/g,"李剑锋"); 
htmlstr=htmlstr.replace(/Lin BeiHai/g,"林北海");
htmlstr=htmlstr.replace(/Lin HaoRan/g,"林浩然"); 
htmlstr=htmlstr.replace(/Lin ShuangBang/g,"林双邦"); 
htmlstr=htmlstr.replace(/Liu JiaXian/g,"柳嘉仙"); 
htmlstr=htmlstr.replace(/Ma ZhongShi/g,"马中士"); 
htmlstr=htmlstr.replace(/Marko Arkko/g,"马尔科·阿珂"); 
htmlstr=htmlstr.replace(/Nie AnRong/g,"聂安荣"); 
htmlstr=htmlstr.replace(/Nong ZiYun/g,"农子云"); 
htmlstr=htmlstr.replace(/Pan YinLong/g,"潘银龙"); 
htmlstr=htmlstr.replace(/Peng YuXi/g,"彭玉玺"); 
htmlstr=htmlstr.replace(/Shang BoXuan/g,"尚博轩"); 
htmlstr=htmlstr.replace(/Shao YanQiu/g,"邵彦丘"); 
htmlstr=htmlstr.replace(/Tan ZiYi/g,"谭子仪"); 
htmlstr=htmlstr.replace(/Tong GouSheng/g,"童狗剩"); 
htmlstr=htmlstr.replace(/Wu YiXin/g,"吴一心"); 
htmlstr=htmlstr.replace(/Yang DengKe/g,"杨登科"); 
htmlstr=htmlstr.replace(/Yang ShaoQiu/g,"杨少秋"); 
htmlstr=htmlstr.replace(/You YuanHang/g,"游远航"); 
htmlstr=htmlstr.replace(/Yu GuoJian/g,"俞国坚"); 
htmlstr=htmlstr.replace(/Yu RongJi/g,"于荣吉"); 
htmlstr=htmlstr.replace(/Zhao YaWen/g,"赵亚文"); 
htmlstr=htmlstr.replace(/Zhi JinJie/g,"智金杰"); 
htmlstr=htmlstr.replace(/Zou ShouCheng/g,"邹守城"); 

//NO.7
//赤龙 
htmlstr=htmlstr.replace(/Ai ZhuoYi/g,"艾卓依"); 
htmlstr=htmlstr.replace(/Bai '白泽' HaoRong|Bai HaoRong/g,"白昊戎");
htmlstr=htmlstr.replace(/Bi YiDe/g,"毕毅德");
htmlstr=htmlstr.replace(/Cai ChenYang/g,"蔡晨阳"); 
htmlstr=htmlstr.replace(/Cao XuWei/g,"曹旭威");
htmlstr=htmlstr.replace(/Chen '幼麟' ZhiYi|Chen ZhiYi/g,"陈志毅"); 
htmlstr=htmlstr.replace(/Chen AnRong/g,"陈安荣");
htmlstr=htmlstr.replace(/Cui ChuGui/g,"崔楚贵");
htmlstr=htmlstr.replace(/Deng CunRui/g,"邓存瑞"); 
htmlstr=htmlstr.replace(/Ding '叮咚龙' DongLong|Ding DongLong/g,"丁冬隆");
htmlstr=htmlstr.replace(/Gan XiangFu/g,"甘祥福");
htmlstr=htmlstr.replace(/Guo BoXiang/g,"郭伯祥");
htmlstr=htmlstr.replace(/Guo ZhuangFei/g,"郭壮飞");
htmlstr=htmlstr.replace(/Han ChaoChao/g,"韩超超");
htmlstr=htmlstr.replace(/He '睚眦' YunGuo|He YunGuo/g,"何赟国"); 
htmlstr=htmlstr.replace(/Hong '螭吻' ChengYe|Hong ChengYe/g,"洪承烨"); 
htmlstr=htmlstr.replace(/Hou YunChang/g,"侯云长");
htmlstr=htmlstr.replace(/HuangFu '狴犴' DongHui|HuangFu DongHui/g,"皇甫东辉"); 
htmlstr=htmlstr.replace(/Ji '亢金龙' YanSheng|Ji YanSheng/g,"季炎升"); 
htmlstr=htmlstr.replace(/Ji '狻猊' BoXiang|Ji BoXiang/g,"纪博翔"); 
htmlstr=htmlstr.replace(/Kong Su/g,"孔肃"); 
htmlstr=htmlstr.replace(/Li YiFan/g,"李亦凡");
htmlstr=htmlstr.replace(/Li YingLong/g,"黎应龙");
htmlstr=htmlstr.replace(/Lin '房日兔' SanZhen|Lin SanZhen/g,"林三震"); 
htmlstr=htmlstr.replace(/Liu JianLei/g,"柳建磊");
htmlstr=htmlstr.replace(/Liu XuLin/g,"刘旭麟");
htmlstr=htmlstr.replace(/Lu QiDi/g,"陆琪谛");
htmlstr=htmlstr.replace(/Lu WeiSheng/g,"卢威胜");
htmlstr=htmlstr.replace(/Lu ZongYue/g,"陆宗越");
htmlstr=htmlstr.replace(/Luo MingMing/g,"罗明明");
htmlstr=htmlstr.replace(/Min XiRong/g,"闵希戎"); 
htmlstr=htmlstr.replace(/Nan HuiTang/g,"南慧堂");
htmlstr=htmlstr.replace(/Peng '尾火虎' JiaQin|Peng JiaQin/g,"彭嘉钦"); 
htmlstr=htmlstr.replace(/Peng ChengGong/g,"彭成功");
htmlstr=htmlstr.replace(/Peng HaiFan/g,"彭海凡");
htmlstr=htmlstr.replace(/Qiu '蒲牢' YiHao|Qiu YiHao/g,"邱一豪"); 
htmlstr=htmlstr.replace(/Sang '逆鳞' ZhiXing|Sang ZhiXing/g,"桑之星"); 
htmlstr=htmlstr.replace(/Shi ZiCheng/g,"石自成");
htmlstr=htmlstr.replace(/Shui GuanJun/g,"谁冠军");
htmlstr=htmlstr.replace(/Sun YiJun/g,"孙毅钧");
htmlstr=htmlstr.replace(/Tang '箕水豹' XinJiang|Tang XinJiang/g,"唐新江"); 
htmlstr=htmlstr.replace(/Tao HuaGuo/g,"陶华国");
htmlstr=htmlstr.replace(/Tian RongKai/g,"田荣凯");
htmlstr=htmlstr.replace(/Tu DongJian/g,"涂东健"); 
htmlstr=htmlstr.replace(/Tu DunJian/g,"屠敦坚");
htmlstr=htmlstr.replace(/Wei YongZhen/g,"魏永真");
htmlstr=htmlstr.replace(/Xie JunPeng/g,"谢君鹏");
htmlstr=htmlstr.replace(/Xu LiSan/g,"徐立三"); 
htmlstr=htmlstr.replace(/Yang Xiao/g,"杨逍"); 
htmlstr=htmlstr.replace(/Ye SongYi/g,"叶松益");
htmlstr=htmlstr.replace(/Yin PengXiang/g,"殷鹏翔");
htmlstr=htmlstr.replace(/Yu Cong/g,"余聪");
htmlstr=htmlstr.replace(/Yu YingLong/g,"余应龙");
htmlstr=htmlstr.replace(/Zhang RuiKai/g,"张瑞凯"); 
htmlstr=htmlstr.replace(/Zhang TianYang/g,"张天扬");
htmlstr=htmlstr.replace(/Zhao Pu/g,"赵普");
htmlstr=htmlstr.replace(/Zheng WenJun/g,"郑文君");

//No.8
//江西秋水
htmlstr=htmlstr.replace(/Chao HaiJie/g,"晁海杰"); 
htmlstr=htmlstr.replace(/Chu Run/g,"楚润"); 
htmlstr=htmlstr.replace(/Ding TianLe/g,"丁天乐"); 
htmlstr=htmlstr.replace(/Fang XinZhi/g,"方鑫志"); 
htmlstr=htmlstr.replace(/Guo HongLe/g,"郭鸿乐"); 
htmlstr=htmlstr.replace(/Guo LiQun/g,"郭漓群"); 
htmlstr=htmlstr.replace(/Guo LongPing/g,"郭龙平"); 
htmlstr=htmlstr.replace(/Guo YongYi/g,"郭咏懿"); 
htmlstr=htmlstr.replace(/He CanHong/g,"禾璨泓"); 
htmlstr=htmlstr.replace(/Hu YiHang/g,"胡毅航"); 
htmlstr=htmlstr.replace(/Huang TingFeng/g,"黄霆锋"); 
htmlstr=htmlstr.replace(/Hyrulnizam Sahher /g,"海卢莱扎·萨赫"); 
htmlstr=htmlstr.replace(/Jin KaiZe/g,"金楷泽"); 
htmlstr=htmlstr.replace(/Ke JiHong/g,"柯疾鸿"); 
htmlstr=htmlstr.replace(/Krzysztof Stasica/g,"克日什托夫·斯塔西卡"); 
htmlstr=htmlstr.replace(/Li BoXiang/g,"丽泊乡"); 
htmlstr=htmlstr.replace(/Lian JiaYou/g,"连佳游"); 
htmlstr=htmlstr.replace(/Lin QiXuan/g,"林器轩"); 
htmlstr=htmlstr.replace(/Lu MingMing/g,"路明铭"); 
htmlstr=htmlstr.replace(/Ma ZhenDong/g,"马振东"); 
htmlstr=htmlstr.replace(/Mart Broekhuis /g,"马特·布罗伊奎斯"); 
htmlstr=htmlstr.replace(/Meng BinYi/g,"孟滨翼"); 
htmlstr=htmlstr.replace(/Mi HaoYu/g,"糜昊语"); 
htmlstr=htmlstr.replace(/Nong ZhiZhao/g,"农知钊"); 
htmlstr=htmlstr.replace(/Qi ChenRong/g,"戚辰荣"); 
htmlstr=htmlstr.replace(/Qian YongHao/g,"钱勇浩"); 
htmlstr=htmlstr.replace(/Qiu Dan/g,"邱丹"); 
htmlstr=htmlstr.replace(/She PengCheng /g,"佘鹏程"); 
htmlstr=htmlstr.replace(/Shi ShiZhuang/g,"时世庄"); 
htmlstr=htmlstr.replace(/Shu PengQiang/g,"舒芃强"); 
htmlstr=htmlstr.replace(/Song HaoLin/g,"宋皓霖");
htmlstr=htmlstr.replace(/Tang XinJie/g,"汤歆捷"); 
htmlstr=htmlstr.replace(/Tang Zhu/g,"唐珠"); 
htmlstr=htmlstr.replace(/Wan LeLe/g,"万乐乐"); 
htmlstr=htmlstr.replace(/Wang BinJia/g,"王斌佳"); 
htmlstr=htmlstr.replace(/Wang JingJia/g,"汪敬佳"); 
htmlstr=htmlstr.replace(/Wen ZeFeng/g,"温泽风"); 
htmlstr=htmlstr.replace(/Wu XinYi/g,"吴昕逸"); 
htmlstr=htmlstr.replace(/Xiao DaWei/g,"肖达维"); 
htmlstr=htmlstr.replace(/Xu Feng/g,"徐枫"); 
htmlstr=htmlstr.replace(/Yan YunHao/g,"燕云灏"); 
htmlstr=htmlstr.replace(/Yang HuaTian/g,"杨华天"); 
htmlstr=htmlstr.replace(/Ye WenCheng/g,"叶文成"); 
htmlstr=htmlstr.replace(/Zheng XiaoYi/g,"郑孝义"); 
htmlstr=htmlstr.replace(/Zhou ChenXi/g,"周晨曦"); 
htmlstr=htmlstr.replace(/Zhou LiHan/g,"舟漓涵"); 
htmlstr=htmlstr.replace(/Zhou QingHe/g,"舟卿荷"); 
htmlstr=htmlstr.replace(/Zhou YueHan/g,"皱悦翰"); 
htmlstr=htmlstr.replace(/Zhuang ZuYao/g,"庄祖耀");  

//No.9
//梅桥岭FC
htmlstr=htmlstr.replace(/Ao ZhiHua/g,"敖志华"); 
htmlstr=htmlstr.replace(/Arne Van Rossem/g,"阿恩·范·罗斯") 
htmlstr=htmlstr.replace(/Bei HanYun/g,"北汉云"); 
htmlstr=htmlstr.replace(/Bob Sant Biswas/g,"鲍勃·桑特比斯"); 
htmlstr=htmlstr.replace(/Cai XinYi/g,"蔡新一"); 
htmlstr=htmlstr.replace(/Calvino Damasco/g,"卡尔文·大马士革"); 
htmlstr=htmlstr.replace(/Chao HaiYu/g,"晁海虞"); 
htmlstr=htmlstr.replace(/Chen QianShi/g,"陈乾世") 
htmlstr=htmlstr.replace(/Chu Liangde/g,"褚良德"); 
htmlstr=htmlstr.replace(/Chu ZhuZi/g,"楚朱子"); 
htmlstr=htmlstr.replace(/Dang GuoYu/g,"党国玉") 
htmlstr=htmlstr.replace(/Dennis Peeters/g,"丹尼斯·皮特斯"); 
htmlstr=htmlstr.replace(/Eino Ruuskanen/g,"埃诺·卢卡南"); 
htmlstr=htmlstr.replace(/Fei WeiCheng/g,"费卫城"); 
htmlstr=htmlstr.replace(/Gabriel De Beul/g,"加布里埃尔·德·比尔"); 
htmlstr=htmlstr.replace(/Gan ShouZhi/g,"甘守志"); 
htmlstr=htmlstr.replace(/Hadrien Leplat/g,"哈德里恩·莱普拉"); 
htmlstr=htmlstr.replace(/He WenYong/g,"何文勇"); 
htmlstr=htmlstr.replace(/Hong GuoQiang/g,"洪国强"); 
htmlstr=htmlstr.replace(/Hong ShuoCheng/g,"洪硕成"); 
htmlstr=htmlstr.replace(/Hu JunBo/g,"胡俊波"); 
htmlstr=htmlstr.replace(/Hu LiXing/g,"胡立兴"); 
htmlstr=htmlstr.replace(/Hu ZiHe/g,"胡子和"); 
htmlstr=htmlstr.replace(/HuangShu JiaHe/g,"皇叔嘉禾"); 
htmlstr=htmlstr.replace(/Ion Oancea/g,"艾恩·欧安思"); 
htmlstr=htmlstr.replace(/Irakli Makashvili/g,"伊拉克里·玛卡"); 
htmlstr=htmlstr.replace(/Jiao KangWen/g,"焦亢文"); 
htmlstr=htmlstr.replace(/Kang XuePeng/g,"康学鹏"); 
htmlstr=htmlstr.replace(/Kang YaLong/g,"康亚龙"); 
htmlstr=htmlstr.replace(/Kedar Alshomrani/g,"凯达尔·阿尔索拉尼"); 
htmlstr=htmlstr.replace(/Kong ZhiXing/g,"孔智星"); 
htmlstr=htmlstr.replace(/Li BingJie/g,"李冰杰"); 
htmlstr=htmlstr.replace(/Li BoHan/g,"李博涵"); 
htmlstr=htmlstr.replace(/Li JinWei/g,"李金伟"); 
htmlstr=htmlstr.replace(/Liang JiBin/g,"梁纪斌"); 
htmlstr=htmlstr.replace(/Lin YanMing/g,"林彦明"); 
htmlstr=htmlstr.replace(/Lin ZhaoTian/g,"林昭天"); 
htmlstr=htmlstr.replace(/Liu ShangKun/g,"刘尚坤"); 
htmlstr=htmlstr.replace(/Lu WenAn/g,"卢文安"); 
htmlstr=htmlstr.replace(/Lv Ye/g,"吕爷"); 
htmlstr=htmlstr.replace(/Mao FengFeng/g,"毛凤凤"); 
htmlstr=htmlstr.replace(/Niu LianZhi/g,"牛连志"); 
htmlstr=htmlstr.replace(/Peng XuHao/g,"彭旭豪"); 
htmlstr=htmlstr.replace(/Qiao Bei/g,"乔北"); 
htmlstr=htmlstr.replace(/Rukia Naganuma/g,"露琪亚·长沼"); 
htmlstr=htmlstr.replace(/Shi GuoQing/g,"石国庆"); 
htmlstr=htmlstr.replace(/Shi XianLu/g,"石仙陆"); 
htmlstr=htmlstr.replace(/Shu YueWu/g,"舒跃武"); 
htmlstr=htmlstr.replace(/Si ChenYe/g,"斯陈爷"); 
htmlstr=htmlstr.replace(/Song FengFeng/g,"宋丰丰"); 
htmlstr=htmlstr.replace(/Sun GuangRi/g,"孙广日"); 
htmlstr=htmlstr.replace(/Wang YunDing/g,"王赟定"); 
htmlstr=htmlstr.replace(/Wang ZeYong/g,"王泽勇"); 
htmlstr=htmlstr.replace(/Wei ShiZhuang/g,"魏世庄"); 
htmlstr=htmlstr.replace(/Wei YiHu/g,"魏一虎"); 
htmlstr=htmlstr.replace(/Wu QiPeng/g,"武齐鹏"); 
htmlstr=htmlstr.replace(/Wu XuChu/g,"吴旭初"); 
htmlstr=htmlstr.replace(/Xian LuCao/g,"仙露草"); 
htmlstr=htmlstr.replace(/Xie YanWei/g,"谢严伟"); 
htmlstr=htmlstr.replace(/Xu HongGang/g,"徐洪刚"); 
htmlstr=htmlstr.replace(/Xu ShengRui/g,"徐晟锐");
htmlstr=htmlstr.replace(/Xu Xiao/g,"徐骁"); 
htmlstr=htmlstr.replace(/Xue YangYang/g,"薛洋洋"); 
htmlstr=htmlstr.replace(/Yani Chonov/g,"亚尼·科诺夫"); 
htmlstr=htmlstr.replace(/Ye JiKuan/g,"叶季宽"); 
htmlstr=htmlstr.replace(/Ye YuXi/g,"叶禹锡"); 
htmlstr=htmlstr.replace(/Yi WeiTing/g,"易伟霆"); 
htmlstr=htmlstr.replace(/Youssef Flores/g,"尤瑟夫·弗洛雷斯"); 
htmlstr=htmlstr.replace(/Yu LongXiang/g,"于龙翔"); 
htmlstr=htmlstr.replace(/Yuan AnNie/g,"袁安聂"); 
htmlstr=htmlstr.replace(/Yuan QingHe/g,"袁清河"); 
htmlstr=htmlstr.replace(/Yue YuJing/g,"岳玉京"); 
htmlstr=htmlstr.replace(/Zhangsun BangWei/g,"长孙邦威"); 
htmlstr=htmlstr.replace(/Zhao XiHe/g,"赵锡禾"); 
htmlstr=htmlstr.replace(/Zhong HeXuan/g,"钟贺轩"); 
htmlstr=htmlstr.replace(/Zhu Qun/g,"朱群"); 
htmlstr=htmlstr.replace(/Zhu YaDong/g,"朱亚东"); 
htmlstr=htmlstr.replace(/Zhuang LingPu/g,"庄灵浦"); 
htmlstr=htmlstr.replace(/Zou YiTai/g,"邹伊泰"); 

//No.10
//俄城雷霆
htmlstr=htmlstr.replace(/Ai JiaMin/g,"艾嘉敏"); 
htmlstr=htmlstr.replace(/Bao QiPeng/g,"包祁鹏"); 
htmlstr=htmlstr.replace(/Cai '鑫豪' XinHao|Cai XinHao/g,"偲鑫豪"); 
htmlstr=htmlstr.replace(/Cao YuMo/g,"曹宇墨"); 
htmlstr=htmlstr.replace(/Chi FeiQin/g,"赤飞禽"); 
htmlstr=htmlstr.replace(/Da '国王' GuangNan|Da GuangNan/g,"达光南"); 
htmlstr=htmlstr.replace(/Da GuangNan/g,"达光楠"); 
htmlstr=htmlstr.replace(/Deng MingHu/g,"邓明虎"); 
htmlstr=htmlstr.replace(/Ding JunSheng/g,"丁俊生"); 
htmlstr=htmlstr.replace(/Ding YouSu/g,"丁游溯"); 
htmlstr=htmlstr.replace(/Dong JunTao/g,"董峻涛");
htmlstr=htmlstr.replace(/DongFang HaiMing/g,"东方海明"); 
htmlstr=htmlstr.replace(/Fan HongXuan/g,"范鸿轩"); 
htmlstr=htmlstr.replace(/Fan LuoGen/g,"范罗艮"); 
htmlstr=htmlstr.replace(/Fei WenZhuo/g,"斐文卓"); 
htmlstr=htmlstr.replace(/Gao HongBing/g,"高鸿秉");
htmlstr=htmlstr.replace(/Hao HuXiang/g,"郝湖湘"); 
htmlstr=htmlstr.replace(/Hao Run/g,"郝润"); 
htmlstr=htmlstr.replace(/Bai '黑澤明' ZeMin|Bai ZeMin/g,"黑泽民"); 
htmlstr=htmlstr.replace(/Hou SuZheng/g,"侯肃政"); 
htmlstr=htmlstr.replace(/Hua Chou/g,"花丑"); 
htmlstr=htmlstr.replace(/Hua YeCheng/g,"花烨成"); 
htmlstr=htmlstr.replace(/Huang DeKai/g,"黄德凯"); 
htmlstr=htmlstr.replace(/Ji YiShan/g,"季一山"); 
htmlstr=htmlstr.replace(/Jian JuJi/g,"简巨基"); 
htmlstr=htmlstr.replace(/Jin ZiHang/g,"金子航"); 
htmlstr=htmlstr.replace(/Li FengChui/g,"李丰炊"); 
htmlstr=htmlstr.replace(/Li GuangMing/g,"李广明");
htmlstr=htmlstr.replace(/Meng '门长明' ChangMin|Meng ChangMin/g,"孟昶闵"); 
htmlstr=htmlstr.replace(/Niu PengYi/g,"牛彭毅"); 
htmlstr=htmlstr.replace(/Pan LiQiang/g,"潘礼强"); 
htmlstr=htmlstr.replace(/Peng Tie/g,"彭铁");
htmlstr=htmlstr.replace(/Qian SuZheng/g,"钱肃正"); 
htmlstr=htmlstr.replace(/Qiu ZhuoXi/g,"邱卓溪"); 
htmlstr=htmlstr.replace(/Rao LingFu/g,"饶令符");
htmlstr=htmlstr.replace(/Shi ZhiHao/g,"时志豪"); 
htmlstr=htmlstr.replace(/Shu Xia/g,"舒夏"); 
htmlstr=htmlstr.replace(/Si KaiWen/g,"司凯文"); 
htmlstr=htmlstr.replace(/Sun SanQiang/g,"隼三强"); 
htmlstr=htmlstr.replace(/Tian ZhiPing/g,"田志平");
htmlstr=htmlstr.replace(/Wang HaiYu/g,"王海宇"); 
htmlstr=htmlstr.replace(/Wang Hang/g,"王航");
htmlstr=htmlstr.replace(/Wei '喂！星辰' XinChen|Wei XinChen/g,"魏心辰"); 
htmlstr=htmlstr.replace(/Wei ZeZhou/g,"魏泽州"); 
htmlstr=htmlstr.replace(/Xiong DengKe/g,"熊登科");
htmlstr=htmlstr.replace(/Yu QianShi/g,"于乾释");
htmlstr=htmlstr.replace(/Zhang ZiHan/g,"张梓涵"); 
htmlstr=htmlstr.replace(/Zhao DeRong/g,"赵德荣");
htmlstr=htmlstr.replace(/Zhao JieXian/g,"赵杰宪"); 
htmlstr=htmlstr.replace(/Zhao YunJie/g,"杜云杰");
htmlstr=htmlstr.replace(/Zhen HanYun/g,"甄汉云");
htmlstr=htmlstr.replace(/Zheng XiuQuan/g,"郑秀全"); 
htmlstr=htmlstr.replace(/Zhong JianFu/g,"钟健孚"); 
htmlstr=htmlstr.replace(/Zhou LongTeng/g,"周龙腾"); 
htmlstr=htmlstr.replace(/Zhou YongWang/g,"周永王"); 

//No.11
//唐风
htmlstr=htmlstr.replace(/Cai ZhiFei/g,"蔡志飞");
htmlstr=htmlstr.replace(/Cui Hui/g,"崔晖");
htmlstr=htmlstr.replace(/Dang ZhiYong/g,"党志勇");
htmlstr=htmlstr.replace(/Du MingWen/g,"杜明文");
htmlstr=htmlstr.replace(/Dávid Patkó/g,"达维德·保特科"); 
htmlstr=htmlstr.replace(/Fan YiHu/g,"范一虎");
htmlstr=htmlstr.replace(/Fu Dong/g,"傅东");	
htmlstr=htmlstr.replace(/Gabriele Mazzucchelli/g,"加布里埃勒·马祖凯利");
htmlstr=htmlstr.replace(/Gong RongSheng/g,"宫荣升");
htmlstr=htmlstr.replace(/Guan JinTao/g,"关锦涛");
htmlstr=htmlstr.replace(/Guo YongHao/g,"郭永好");
htmlstr=htmlstr.replace(/Han DaPing/g,"韩大平");
htmlstr=htmlstr.replace(/Hua SuZheng/g,"华苏征");
htmlstr=htmlstr.replace(/Huang HanLiang/g,"黄汉良");
htmlstr=htmlstr.replace(/Huang XiangNan/g,"黄翔南");
htmlstr=htmlstr.replace(/Huo Zhou/g,"霍舟");
htmlstr=htmlstr.replace(/Jan Geluk/g,"扬格鲁克");
htmlstr=htmlstr.replace(/Jian You/g,"简友");
htmlstr=htmlstr.replace(/Jin XuFen/g,"金许分");
htmlstr=htmlstr.replace(/Ke YaKe/g,"柯亚科");
htmlstr=htmlstr.replace(/Lai KaiBin/g,"赖楷斌");
htmlstr=htmlstr.replace(/Li DongJian/g,"李冬健");
htmlstr=htmlstr.replace(/Li LiRong/g,"李立荣");
htmlstr=htmlstr.replace(/Lian Ting/g,"廉挺");
htmlstr=htmlstr.replace(/Liang HaiLiang/g,"梁海亮");
htmlstr=htmlstr.replace(/Liang MingYan/g,"梁茗砚");
htmlstr=htmlstr.replace(/Lin ChengJun/g,"林承君");
htmlstr=htmlstr.replace(/Lin JianYong/g,"林建勇");
htmlstr=htmlstr.replace(/Lu HaiLiang/g,"卢海亮");
htmlstr=htmlstr.replace(/Ma ChengJian/g,"马成建");
htmlstr=htmlstr.replace(/Mao ShiLin/g,"毛时林");
htmlstr=htmlstr.replace(/Peng ShunKai/g,"彭顺凯"); 
htmlstr=htmlstr.replace(/Qin HuiJun/g,"秦晖钧");
htmlstr=htmlstr.replace(/Qin YouAn/g,"秦友安");
htmlstr=htmlstr.replace(/Ran ZhuoYi/g,"冉卓易");
htmlstr=htmlstr.replace(/Shu Jia/g,"舒佳");
htmlstr=htmlstr.replace(/Shuji Otsuka/g,"大津贺崇时");
htmlstr=htmlstr.replace(/Sun ChaoCe/g,"孙晁策");
htmlstr=htmlstr.replace(/Tan HuXiang/g,"谭浒翔");
htmlstr=htmlstr.replace(/Wang GuangMin/g,"王光闵"); 
htmlstr=htmlstr.replace(/Wang JiMi/g,"王吉米");
htmlstr=htmlstr.replace(/Wang KangWen/g,"王亢文");
htmlstr=htmlstr.replace(/Wang SongYan/g,"王松岩");
htmlstr=htmlstr.replace(/Wen Yong/g,"温勇");
htmlstr=htmlstr.replace(/Xing KeWei/g,"刑克伟");
htmlstr=htmlstr.replace(/Xu LiJi/g,"徐里继");
htmlstr=htmlstr.replace(/Yu DongLong/g,"于东龙");
htmlstr=htmlstr.replace(/Yun JinYuan/g,"云津源");
htmlstr=htmlstr.replace(/Zhang WenChou/g,"张文丑");
htmlstr=htmlstr.replace(/Zheng Pu/g,"郑普");
htmlstr=htmlstr.replace(/Zhou ChengHao/g,"周成好");
htmlstr=htmlstr.replace(/Zhou XinHao/g,"周心昊");
htmlstr=htmlstr.replace(/Zhu ZeXuan/g,"朱泽轩");
htmlstr=htmlstr.replace(/Zhuang WeiGuo/g,"庄卫国");
htmlstr=htmlstr.replace(/Zhuang ZhuCheng/g,"庄诸成");
htmlstr=htmlstr.replace(/Zu ChenJun/g,"祖晨钧");


//FC.北京布丁 
//No.12
htmlstr=htmlstr.replace(/Cao HongWu/g,"曹洪武"); 
htmlstr=htmlstr.replace(/He DongYa/g,"何东亚"); 
htmlstr=htmlstr.replace(/Jia YueBo/g,"贾越波"); 
htmlstr=htmlstr.replace(/Jin ZiXuan/g,"金子轩"); 
htmlstr=htmlstr.replace(/Mu ZiJie/g,"穆子杰"); 
htmlstr=htmlstr.replace(/Qian ChengZhong/g,"钱承中"); 
htmlstr=htmlstr.replace(/Qiu Huo/g,"丘豁");
htmlstr=htmlstr.replace(/Qiu WeiJun/g,"丘伟军"); 
htmlstr=htmlstr.replace(/Wei Miao/g,"维淼"); 
htmlstr=htmlstr.replace(/Xiong JingHua/g,"熊京华"); 
htmlstr=htmlstr.replace(/Xiong JingHua/g,"熊京华"); 
htmlstr=htmlstr.replace(/Xu HengZhi/g,"徐恒智"); 
htmlstr=htmlstr.replace(/Xue ZhaoJun/g,"薛昭君"); 
htmlstr=htmlstr.replace(/Ye Gan/g,"叶敢"); 
htmlstr=htmlstr.replace(/Zhang ZhongYou/g,"张忠友"); 

//No.13
//重庆麻辣火锅
htmlstr=htmlstr.replace(/Bian WeiJie/g,"边伟杰"); 
htmlstr=htmlstr.replace(/Cai Liang/g,"蔡凉");
htmlstr=htmlstr.replace(/Cao YuanYuan/g,"曹渊源"); 
htmlstr=htmlstr.replace(/Cen ChunJi/g,"岑春季"); 
htmlstr=htmlstr.replace(/Cheng Ying/g,"承影"); 
htmlstr=htmlstr.replace(/Du YinXian/g,"杜尹先"); 
htmlstr=htmlstr.replace(/Feng FengXin/g,"冯封心"); 
htmlstr=htmlstr.replace(/Gan ZeQi/g,"甘泽奇");
htmlstr=htmlstr.replace(/Gao ShiLei/g,"高石磊");
htmlstr=htmlstr.replace(/Gao WenBo/g,"高稳波");
htmlstr=htmlstr.replace(/Ge XiangTao/g,"葛祥韬");
htmlstr=htmlstr.replace(/GongSun XingHui/g,"公孙星辉"); 
htmlstr=htmlstr.replace(/Guo JingGe/g,"郭惊歌");
htmlstr=htmlstr.replace(/Ha TanChao/g,"哈谭超"); 
htmlstr=htmlstr.replace(/Han HongLi/g,"韩弘历"); 
htmlstr=htmlstr.replace(/Hu Bu/g,"虎步"); 
htmlstr=htmlstr.replace(/Huang ShengLi/g,"黄胜利"); 
htmlstr=htmlstr.replace(/Hubert Gębura/g,"休伯特·乔布拉");
htmlstr=htmlstr.replace(/Jack Sutherland/g,"杰克·萨瑟兰");
htmlstr=htmlstr.replace(/Jia MingChang/g,"贾铭昶"); 
htmlstr=htmlstr.replace(/Koji Nakatsuka/g,"中冢浩二");
htmlstr=htmlstr.replace(/Li Dun/g,"李盾"); 
htmlstr=htmlstr.replace(/Li YaJian/g,"黎亚坚"); 
htmlstr=htmlstr.replace(/Liang ChangLin/g,"梁长麟");
htmlstr=htmlstr.replace(/Lin ZhenYang/g,"林振阳");
htmlstr=htmlstr.replace(/Lu DeXin/g,"卢德兴");
htmlstr=htmlstr.replace(/Lu LingTing/g,"卢凌霆"); 
htmlstr=htmlstr.replace(/Lu ZhangYi/g,"卢长义"); 
htmlstr=htmlstr.replace(/Man MuYao/g,"满目妖");
htmlstr=htmlstr.replace(/Mao Xiang/g,"毛翔"); 
htmlstr=htmlstr.replace(/Meng LiHan/g,"孟笠汉"); 
htmlstr=htmlstr.replace(/Modesto Agudo/g,"莫德斯托·阿圭多"); 
htmlstr=htmlstr.replace(/Mu ShiJie/g,"穆世杰"); 
htmlstr=htmlstr.replace(/Ou HaiJian/g,"欧海建"); 
htmlstr=htmlstr.replace(/Ou Peng/g,"欧鹏"); 
htmlstr=htmlstr.replace(/Pan GuangZhong/g,"潘广中"); 
htmlstr=htmlstr.replace(/Pan LiQin/g,"潘励勤");  
htmlstr=htmlstr.replace(/Pan YongQi/g,"潘永奇"); 
htmlstr=htmlstr.replace(/Pan ZeXi/g,"潘泽西");
htmlstr=htmlstr.replace(/Qian Da/g,"钱大"); 
htmlstr=htmlstr.replace(/Qu ShaoQuan/g,"曲绍泉"); 
htmlstr=htmlstr.replace(/Shan HaiYang/g,"山海阳");
htmlstr=htmlstr.replace(/Shi GuangHu/g,"石光虎"); 
htmlstr=htmlstr.replace(/Shi JieXian/g,"史杰贤"); 
htmlstr=htmlstr.replace(/Shi YanHan/g,"史炎寒"); 
htmlstr=htmlstr.replace(/Shu Donghua/g,"舒栋华"); 
htmlstr=htmlstr.replace(/Somanshu Ilyas/g,"苏曼殊·伊利亚斯"); 
htmlstr=htmlstr.replace(/Song XingGuang/g,"宋星光"); 
htmlstr=htmlstr.replace(/Tian FengTao/g,"田奉韬"); 
htmlstr=htmlstr.replace(/Tupuri Achu/g,"图布里·阿苏");
htmlstr=htmlstr.replace(/Vasile Blanaru/g,"瓦西里·布勒纳鲁"); 
htmlstr=htmlstr.replace(/Wang ChangRui/g,"王长瑞"); 
htmlstr=htmlstr.replace(/Wang YongHuai/g,"王永怀"); 
htmlstr=htmlstr.replace(/Xie XianPing/g,"谢仙屏"); 
htmlstr=htmlstr.replace(/Xie XueMing/g,"谢学铭");
htmlstr=htmlstr.replace(/Yang MingAn/g,"杨铭安"); 
htmlstr=htmlstr.replace(/You BeiHai/g,"游北海"); 
htmlstr=htmlstr.replace(/Yuriy Tsilevich/g,"尤里·特斯列维奇");
htmlstr=htmlstr.replace(/Zhang HanWen/g,"张瀚文");
htmlstr=htmlstr.replace(/Zhang ShengYuan/g,"张圣元"); 
htmlstr=htmlstr.replace(/Zheng LinHu/g,"郑麟虎");

//No.14
//范迪克
htmlstr=htmlstr.replace(/Cai DongPeng/g,"蔡东鹏");
htmlstr=htmlstr.replace(/Chi Wei/g,"池威");
htmlstr=htmlstr.replace(/Cui ZhongLong/g,"崔忠龙");
htmlstr=htmlstr.replace(/Da JinSha/g,"达金莎");
htmlstr=htmlstr.replace(/Ding ZeBo/g,"丁泽波");
htmlstr=htmlstr.replace(/Hu JiaXin/g,"胡佳鑫");
htmlstr=htmlstr.replace(/Kong PengWang/g,"孔鹏旺");
htmlstr=htmlstr.replace(/Lai ZhenDong/g,"来振东");
htmlstr=htmlstr.replace(/Liu WeiQiang/g,"刘伟强");
htmlstr=htmlstr.replace(/Luo YuanChao/g,"罗源超");
htmlstr=htmlstr.replace(/Qiang TingFeng/g,"强廷峰");
htmlstr=htmlstr.replace(/Qu XueYou/g,"曲学友");
htmlstr=htmlstr.replace(/She BuBai/g,"佘步柏");
htmlstr=htmlstr.replace(/Shi ChaoSheng/g,"史超晟");
htmlstr=htmlstr.replace(/Tang QiChen/g,"唐齐晨");
htmlstr=htmlstr.replace(/Yang YangYang/g,"羊羊羊");


//No.15
//河北华夏幸福
htmlstr=htmlstr.replace(/Chang ShiJu/g,"常世驹"); 
htmlstr=htmlstr.replace(/Chen BaiLin/g,"陈百林"); 
htmlstr=htmlstr.replace(/Dong ZhaoZhong/g,"董兆中"); 
htmlstr=htmlstr.replace(/Frank Allison/g,"弗兰克·阿里森"); 
htmlstr=htmlstr.replace(/Hao XiangJie/g,"郝相杰"); 
htmlstr=htmlstr.replace(/Ji MingJun/g,"姬明俊"); 
htmlstr=htmlstr.replace(/Jiang HaoYuan/g,"姜浩源"); 
htmlstr=htmlstr.replace(/Jonatan Acosta/g,"乔纳丹·阿科斯塔"); 
htmlstr=htmlstr.replace(/Ke Fa/g,"柯发"); 
htmlstr=htmlstr.replace(/Lin ShiAn/g,"林世安"); 
htmlstr=htmlstr.replace(/Luo RongJi/g,"罗荣基"); 
htmlstr=htmlstr.replace(/Oleg Trefiolov/g,"奥雷格·特雷费奥罗夫"); 
htmlstr=htmlstr.replace(/Otello Crescenzo/g,"奥特罗·卡雷斯科恩佐"); 
htmlstr=htmlstr.replace(/Pang JiSun/g,"庞吉顺"); 
htmlstr=htmlstr.replace(/Pravoslav Jakubko/g,"普拉沃斯拉夫·雅库布科");
htmlstr=htmlstr.replace(/Shao DaWei/g,"邵大伟"); 
htmlstr=htmlstr.replace(/Sheng WuBa/g,"盛无霸"); 
htmlstr=htmlstr.replace(/Shui XiaoHui/g,"水小辉");
htmlstr=htmlstr.replace(/Sun ZhiJiong/g,"孙志炯"); 
htmlstr=htmlstr.replace(/Tai ChunBin/g,"邰春斌"); 
htmlstr=htmlstr.replace(/Vadim Chernekov/g,"瓦蒂姆·切尔尼科夫"); 
htmlstr=htmlstr.replace(/Xin BoWei/g,"辛博伟"); 
htmlstr=htmlstr.replace(/Xu LeYuan/g,"徐乐元"); 
htmlstr=htmlstr.replace(/Zhong YaLong/g,"钟亚龙"); 
htmlstr=htmlstr.replace(/Zhou HaiHang/g,"周海航"); 

//No.16
//龙子湖竞技
htmlstr=htmlstr.replace(/An JinXi/g,"安进喜");
htmlstr=htmlstr.replace(/Bu Rui/g,"步瑞");
htmlstr=htmlstr.replace(/Cai TingYao/g,"蔡亭尧");
htmlstr=htmlstr.replace(/Cai WeiChao/g,"蔡伟超");
htmlstr=htmlstr.replace(/Chen ZiYuan/g,"陈子元");
htmlstr=htmlstr.replace(/Du ZhouZhe/g,"杜周哲");
htmlstr=htmlstr.replace(/Duan BuBai/g,"段不败");
htmlstr=htmlstr.replace(/Gan QuanZhang/g,"甘全章");
htmlstr=htmlstr.replace(/Geng LongLong/g,"耿龙龙");
htmlstr=htmlstr.replace(/Guan JianFeng/g,"关剑锋");
htmlstr=htmlstr.replace(/Gui LongXiang/g,"桂龙翔");
htmlstr=htmlstr.replace(/Guo JiangHua/g,"郭江华");
htmlstr=htmlstr.replace(/Han ZiXuan/g,"韩子轩");
htmlstr=htmlstr.replace(/He JunPeng/g,"何俊鹏");
htmlstr=htmlstr.replace(/Hu DeGang/g,"胡德刚");
htmlstr=htmlstr.replace(/Hua XuanDe/g,"华玄德");
htmlstr=htmlstr.replace(/Lei ZhiZhao/g,"雷志昭");
htmlstr=htmlstr.replace(/Leng XiRui/g,"冷希瑞");
htmlstr=htmlstr.replace(/Liang JingHao/g,"梁景皓");
htmlstr=htmlstr.replace(/Lin HongGang/g,"林宏刚");
htmlstr=htmlstr.replace(/Lin RuiQi/g,"林瑞琪");
htmlstr=htmlstr.replace(/Lu JingWen/g,"卢靖文");
htmlstr=htmlstr.replace(/Mu YaoYang/g,"穆耀阳");
htmlstr=htmlstr.replace(/Ning Ce/g,"宁策");
htmlstr=htmlstr.replace(/Nong Ke/g,"农科");
htmlstr=htmlstr.replace(/Peng WenCheng/g,"彭文成");
htmlstr=htmlstr.replace(/Peng ZiXin/g,"彭子鑫");
htmlstr=htmlstr.replace(/Qin ZiMo/g,"秦子墨");
htmlstr=htmlstr.replace(/Ran JinJian/g,"冉金健");
htmlstr=htmlstr.replace(/Rao ChengYe/g,"饶成业");
htmlstr=htmlstr.replace(/Tan XiangMin/g,"谭湘闵");
htmlstr=htmlstr.replace(/Tang JinXi/g,"唐进喜");
htmlstr=htmlstr.replace(/TuoBa HongLi/g,"拓跋弘历");
htmlstr=htmlstr.replace(/Xin ZiMing/g,"辛子明");
htmlstr=htmlstr.replace(/Xu ChaoYuan/g,"徐超元");
htmlstr=htmlstr.replace(/Xu XiaoFeng/g,"徐晓峰");
htmlstr=htmlstr.replace(/Yao ZiJie/g,"姚子杰");
htmlstr=htmlstr.replace(/Ye ChunJie/g,"叶春杰");
htmlstr=htmlstr.replace(/Ye WenJun/g,"叶文俊");
htmlstr=htmlstr.replace(/Yin MinWei/g,"尹敏伟");
htmlstr=htmlstr.replace(/Zhang RenJie/g,"张仁杰");
htmlstr=htmlstr.replace(/Zhou YeXuan/g,"周叶轩");
htmlstr=htmlstr.replace(/Zhu WeiFei/g,"朱伟飞");

//No.17
//公馆FC
htmlstr=htmlstr.replace(/Hou LeLe/g,"侯乐乐");
htmlstr=htmlstr.replace(/Li Chi/g,"利齿");
htmlstr=htmlstr.replace(/Luo ZhiYu/g,"罗志宇");
htmlstr=htmlstr.replace(/Xu YaZhao/g,"徐亚昭");
htmlstr=htmlstr.replace(/Yue ShaoHua/g,"岳少滑");
htmlstr=htmlstr.replace(/Zhuo TingYan/g,"卓挺严");


//No.18
//青岛教师联队 
htmlstr=htmlstr.replace(/Cai KaiZe/g,"蔡开泽"); 
htmlstr=htmlstr.replace(/Dai Kun/g,"戴琨"); 
htmlstr=htmlstr.replace(/Fan HaoWen/g,"范浩文"); 
htmlstr=htmlstr.replace(/Feng DaLei/g,"冯大雷"); 
htmlstr=htmlstr.replace(/Gao Tie/g,"高铁"); 
htmlstr=htmlstr.replace(/Hong DaZhan/g,"洪大展"); 
htmlstr=htmlstr.replace(/Jiang GuoQiang/g,"姜国强"); 
htmlstr=htmlstr.replace(/Lv ZhuoJun/g,"吕卓君"); 
htmlstr=htmlstr.replace(/Ma KunPeng/g,"马坤鹏"); 
htmlstr=htmlstr.replace(/Mao WeiJie/g,"毛伟杰"); 
htmlstr=htmlstr.replace(/Peng ShiLin/g,"彭世林"); 
htmlstr=htmlstr.replace(/Pi YuQing/g,"皮玉清"); 
htmlstr=htmlstr.replace(/Qian Biao/g,"钱彪"); 
htmlstr=htmlstr.replace(/Shi ShangZhe/g,"石尚哲"); 
htmlstr=htmlstr.replace(/Tao HongLi/g,"陶宏历"); 
htmlstr=htmlstr.replace(/Xi YanKai/g,"席延凯"); 
htmlstr=htmlstr.replace(/Xia YaZhao/g,"夏雅照"); 
htmlstr=htmlstr.replace(/Xian He/g,"贤鹤"); 
htmlstr=htmlstr.replace(/Xue Jia/g,"薛佳"); 
htmlstr=htmlstr.replace(/You ZeDong/g,"尤泽东"); 
htmlstr=htmlstr.replace(/Zhang Ju/g,"张举"); 
htmlstr=htmlstr.replace(/Zhi JunRu/g,"智俊如"); 
htmlstr=htmlstr.replace(/Zhou YuShuai/g,"周玉帅"); 
htmlstr=htmlstr.replace(/Zhu XuanWu/g,"朱玄武"); 
htmlstr=htmlstr.replace(/Zu YunDing/g,"祖云定"); 

//AKB48
//No.19
htmlstr=htmlstr.replace(/Bai ShiJu/g,"白世居"); 
htmlstr=htmlstr.replace(/Chen GuoSheng/g,"陈国胜"); 
htmlstr=htmlstr.replace(/Chen JiXiang/g,"陈吉祥"); 
htmlstr=htmlstr.replace(/Cheng LeLe/g,"程乐乐"); 
htmlstr=htmlstr.replace(/Ding YuanHang/g,"丁远航"); 
htmlstr=htmlstr.replace(/Dong JiaJian/g,"董嘉健");
htmlstr=htmlstr.replace(/Duan JinPeng/g,"段金鹏"); 
htmlstr=htmlstr.replace(/Gao HongYuan/g,"高洪渊"); 
htmlstr=htmlstr.replace(/Gou QianShuo/g,"句千硕"); 
htmlstr=htmlstr.replace(/Hua ZiQian/g,"花子谦"); 
htmlstr=htmlstr.replace(/Jian MingFei/g,"简明非"); 
htmlstr=htmlstr.replace(/Lei GaoPeng/g,"雷高鹏"); 
htmlstr=htmlstr.replace(/Li JianGang/g,"李建刚"); 
htmlstr=htmlstr.replace(/Li MingFei/g,"李铭飞"); 
htmlstr=htmlstr.replace(/Li YouAn/g,"李幼安"); 
htmlstr=htmlstr.replace(/Lian XiaoMing/g,"连晓明"); 
htmlstr=htmlstr.replace(/Lin '刘能' YunSheng|Lin YunSheng/g,"林云升");
htmlstr=htmlstr.replace(/Lin KaiNing/g,"林凯宁"); 
htmlstr=htmlstr.replace(/Lu AnYi/g,"卢安义"); 
htmlstr=htmlstr.replace(/Min WenKai/g,"闵闻凯"); 
htmlstr=htmlstr.replace(/Min XiaoQian/g,"闵啸乾"); 
htmlstr=htmlstr.replace(/Pan TanChao/g,"潘谭超"); 
htmlstr=htmlstr.replace(/Qian XiRong/g,"千禧荣"); 
htmlstr=htmlstr.replace(/Qian XueLin/g,"钱雪麟"); 
htmlstr=htmlstr.replace(/Qiang WenJian/g,"强文剑");
htmlstr=htmlstr.replace(/Qiu DianZuo/g,"邱殿座"); 
htmlstr=htmlstr.replace(/Shi PeiZhao/g,"石沛昭"); 
htmlstr=htmlstr.replace(/Shi TianMing/g,"施天鸣"); 
htmlstr=htmlstr.replace(/Tian XiaoNan/g,"田笑南"); 
htmlstr=htmlstr.replace(/Wang Gan/g,"王感"); 
htmlstr=htmlstr.replace(/Wang YueFei/g,"王跃飞"); 
htmlstr=htmlstr.replace(/Wei HongYang/g,"魏宏阳"); 
htmlstr=htmlstr.replace(/Weng ZeHong/g,"翁泽鸿"); 
htmlstr=htmlstr.replace(/Xiao WenJun/g,"萧文君"); 
htmlstr=htmlstr.replace(/Xiao YingJie/g,"肖英杰"); 
htmlstr=htmlstr.replace(/Xu Tao/g,"徐韬"); 
htmlstr=htmlstr.replace(/Xue DeQun/g,"薛德群"); 
htmlstr=htmlstr.replace(/Yang GuanXi/g,"杨冠希"); 
htmlstr=htmlstr.replace(/Ye ShuFeng/g,"叶庶峰"); 
htmlstr=htmlstr.replace(/Yu YaDong/g,"于亚东"); 
htmlstr=htmlstr.replace(/Zeng XingLiang/g,"曾兴亮"); 
htmlstr=htmlstr.replace(/Zhai Ming/g,"翟明"); 
htmlstr=htmlstr.replace(/Zhao BiDe/g,"赵璧德");
htmlstr=htmlstr.replace(/Zhao ChenHui/g,"赵辰晖"); 
htmlstr=htmlstr.replace(/Zhao YuDao/g,"赵宇道");
htmlstr=htmlstr.replace(/Zhao YunDao/g,"赵云到"); 
htmlstr=htmlstr.replace(/Zheng HanYu/g,"郑涵余");
htmlstr=htmlstr.replace(/Zheng XiJie/g,"郑希杰");
htmlstr=htmlstr.replace(/Zheng YunQi/g,"郑允奇"); 
htmlstr=htmlstr.replace(/Zhong ZhiYi/g,"钟志毅"); 
htmlstr=htmlstr.replace(/Zhou HuiKang/g,"周惠康"); 

//No.20
//飞翔鸟
htmlstr=htmlstr.replace(/Bian LiQin/g,"边立勤");
htmlstr=htmlstr.replace(/Che HongZhi/g,"车鸿志");
htmlstr=htmlstr.replace(/Chen Dun/g,"陈盾");
htmlstr=htmlstr.replace(/Cui JunJie/g,"崔俊杰");
htmlstr=htmlstr.replace(/Du ZhenZhong/g,"杜震忠");
htmlstr=htmlstr.replace(/Fu JiaoShou/g,"伏叫兽");
htmlstr=htmlstr.replace(/Guo XiRui/g,"郭喜瑞");
htmlstr=htmlstr.replace(/Jian MuSheng/g,"简沐笙");
htmlstr=htmlstr.replace(/Lai PengQiang/g,"赖鹏强");
htmlstr=htmlstr.replace(/Li XiaoPing/g,"李小平");
htmlstr=htmlstr.replace(/Li YuXi/g,"李玉溪");
htmlstr=htmlstr.replace(/Liang GuoPin/g,"梁国品");
htmlstr=htmlstr.replace(/Liao YuHao/g,"廖禹豪");
htmlstr=htmlstr.replace(/Liu XueJun/g,"刘学军");
htmlstr=htmlstr.replace(/Mao RongZe/g,"毛荣泽");
htmlstr=htmlstr.replace(/Meng XiaoMa/g,"孟小马");
htmlstr=htmlstr.replace(/Niu XiaoFu/g,"牛小福");
htmlstr=htmlstr.replace(/Qiao YiDa/g,"乔益达");
htmlstr=htmlstr.replace(/She BangWei/g,"佘邦威");
htmlstr=htmlstr.replace(/Shu HuaiDe/g,"舒怀德"); 
htmlstr=htmlstr.replace(/Song GuoNing/g,"宋国宁");
htmlstr=htmlstr.replace(/Wang MingZe/g,"王明泽");
htmlstr=htmlstr.replace(/Wang YaoDong/g,"王耀东");
htmlstr=htmlstr.replace(/Ye LiMing/g,"夜里明");
htmlstr=htmlstr.replace(/Zhong ChiMing/g,"钟驰明");
htmlstr=htmlstr.replace(/Zhou JinQian/g,"周金钱");
htmlstr=htmlstr.replace(/Zhou LeiLei/g,"周雷雷");
htmlstr=htmlstr.replace(/Zhou LinKai/g,"周林楷");

//No.21
//喜洋洋
htmlstr=htmlstr.replace(/Bao RuiHua/g,"包瑞华");
htmlstr=htmlstr.replace(/Bao ShiJie/g,"保时捷");
htmlstr=htmlstr.replace(/Cheng ChangFeng/g,"程常锋");
htmlstr=htmlstr.replace(/Du WeiJie/g,"杜韦杰");
htmlstr=htmlstr.replace(/Gao MingGang/g,"高明刚");
htmlstr=htmlstr.replace(/GongSun AiMin/g,"公孙艾闵");
htmlstr=htmlstr.replace(/He WenChao/g,"何文超");
htmlstr=htmlstr.replace(/Jiang ZhiMing/g,"江智明");
htmlstr=htmlstr.replace(/Kang ChaoBo/g,"康朝博");
htmlstr=htmlstr.replace(/Lu GuoJie/g,"陆国杰");
htmlstr=htmlstr.replace(/Mu YiHu/g,"穆一虎");
htmlstr=htmlstr.replace(/Song Huo/g,"怂货");
htmlstr=htmlstr.replace(/Tang YouXun/g,"唐佑逊");
htmlstr=htmlstr.replace(/Zhan JinTong/g,"战金童");
htmlstr=htmlstr.replace(/Zhang LinPeng/g,"张琳芃");

//No.22
//悠悠小仙姑
htmlstr=htmlstr.replace(/Fu WenWei/g,"符文卫");
htmlstr=htmlstr.replace(/Guo HuWei/g,"郭虎威");
htmlstr=htmlstr.replace(/Qiu QiPeng/g,"裘奇蓬");

//No.23
//Super-inter
htmlstr=htmlstr.replace(/Chu XiongWei/g,"楚雄伟");
htmlstr=htmlstr.replace(/Liang ShuSheng/g,"梁舒声");
htmlstr=htmlstr.replace(/Ou BoQiang/g,"欧博强");
htmlstr=htmlstr.replace(/Wang BaoRen/g,"王宝仁");
htmlstr=htmlstr.replace(/Wu XiRui/g,"吴溪睿");
htmlstr=htmlstr.replace(/Xie XuanQi/g,"谢炫七");
htmlstr=htmlstr.replace(/Yue ChangQing/g,"岳长青");
htmlstr=htmlstr.replace(/Yun YuanHang/g,"云源航");
htmlstr=htmlstr.replace(/Zhang BingJie/g,"张兵杰");
htmlstr=htmlstr.replace(/Zhang ShouCheng/g,"张守诚");
htmlstr=htmlstr.replace(/ZhuGe WeiSheng/g,"诸葛伟胜");

//Blood Raiders  
//ID：4187485
//No.24 
htmlstr=htmlstr.replace(/Bian ChenGuang/g,"卞晨光");
htmlstr=htmlstr.replace(/Chu JinSong/g,"楚晋松");
htmlstr=htmlstr.replace(/Du XinMing/g,"杜心明");
htmlstr=htmlstr.replace(/Fu FeiFei/g,"傅非飞");
htmlstr=htmlstr.replace(/Gao HaoRan/g,"高浩然");
htmlstr=htmlstr.replace(/Hao MinBo/g,"郝珉博");
htmlstr=htmlstr.replace(/Huang DiFan/g,"黄狄凡");
htmlstr=htmlstr.replace(/Ji LuoGen/g,"季罗根");
htmlstr=htmlstr.replace(/Ke JinQing/g,"柯晋卿");
htmlstr=htmlstr.replace(/Li ShiLei/g,"黎世磊");
htmlstr=htmlstr.replace(/Long YuWei/g,"龙禹威");
htmlstr=htmlstr.replace(/Lu NingYuan/g,"陆宁远");
htmlstr=htmlstr.replace(/Mao HongGang/g,"毛洪刚");
htmlstr=htmlstr.replace(/Niu ChengRui/g,"牛承瑞");
htmlstr=htmlstr.replace(/Pang FengFeng/g,"庞丰锋");
htmlstr=htmlstr.replace(/Qiu DaYu/g,"邱大鱼"); 
htmlstr=htmlstr.replace(/Qu HongXuan/g,"曲鸿轩");
htmlstr=htmlstr.replace(/Ran ZhuoXi/g,"冉卓溪");
htmlstr=htmlstr.replace(/Tan GuoYao/g,"谭国耀");
htmlstr=htmlstr.replace(/Wu Bing/g,"武冰");
htmlstr=htmlstr.replace(/Xi HongPing/g,"奚洪平");
htmlstr=htmlstr.replace(/Xu KaiRen/g,"徐凯仁");
htmlstr=htmlstr.replace(/Xuan GuangXin/g,"轩光信");
htmlstr=htmlstr.replace(/Yan ShouWu/g,"严寿武");
htmlstr=htmlstr.replace(/Yan ZiZhou/g,"燕子洲");
htmlstr=htmlstr.replace(/Yu ZhiZhi/g,"于致志");
htmlstr=htmlstr.replace(/Zhang ChuiChui/g,"张吹炊");
htmlstr=htmlstr.replace(/Zhong YingHui/g,"钟颍辉");

//No.25
//蝎子足球-潘公子
//ID：2748735

htmlstr=htmlstr.replace(/Cao '艹欲宫' YuGong|Cao YuGong/g,"曹御恭");
htmlstr=htmlstr.replace(/Christoffer 'C罗' Fuglesang|Christoffer Fuglesang/g,"Christoffer Fuglesang");
htmlstr=htmlstr.replace(/Fang '放羊羊' YangYang|Fang YangYang/g,"方洋洋");
htmlstr=htmlstr.replace(/Gavin '拉姆塞' Gascoigne|Gavin Gascoigne/g,"Gavin Gascoigne");
htmlstr=htmlstr.replace(/Luo '罗桂山' GuiShan|Luo GuiShan/g,"罗桂山");
htmlstr=htmlstr.replace(/Pei '伞队' Wei|Pei Wei/g,"裴威");
htmlstr=htmlstr.replace(/Ruaridh '达格利什' Dunwoodie|Ruaridh Dunwoodie/g,"Ruaridh Dunwoodie");
htmlstr=htmlstr.replace(/Sulkhan '萨内' Dadesheli|Sulkhan Dadesheli/g,"Sulkhan Dadesheli");
htmlstr=htmlstr.replace(/Thomas '托马斯' Svan|Thomas Svan/g,"Thomas Svan");
htmlstr=htmlstr.replace(/Wang '王贱凯' JianKai|Wang JianKai/g,"王健凯");
htmlstr=htmlstr.replace(/Yu '梅克斯' YueHan|Yu YueHan/g,"于越涵");
htmlstr=htmlstr.replace(/Yu '梅克斯' YueHan|Yu YueHan/g,"于越涵");
htmlstr=htmlstr.replace(/Zheng '潇洒哥' XuWei|Zheng XuWei/g,"郑旭威");
htmlstr=htmlstr.replace(/Zhuo '神舟' ShenZhou|Zhuo ShenZhou/g,"卓神舟");

//No.26
//梅麓星空
//ID：4202000
htmlstr=htmlstr.replace(/Cao MingYue/g,"曹明乐");
htmlstr=htmlstr.replace(/Ge ZhenMing/g,"葛振明");
htmlstr=htmlstr.replace(/GongSun GuoJian/g,"公孙国健");
htmlstr=htmlstr.replace(/Lang ShiZhang/g,"郎仕璋");
htmlstr=htmlstr.replace(/Li HuiSheng/g,"李晖晟"); 
htmlstr=htmlstr.replace(/LiYang LiangLiang/g,"溧阳凉凉");
htmlstr=htmlstr.replace(/Lian JianChun/g,"练建春"); 
htmlstr=htmlstr.replace(/Pu XianZhi/g,"濮宪志");
htmlstr=htmlstr.replace(/Shi Ling/g,"石翎"); 
htmlstr=htmlstr.replace(/Xu MingQuan/g,"许明权");
htmlstr=htmlstr.replace(/Zhao XiaoYu/g,"赵晓宇"); 
htmlstr=htmlstr.replace(/Zhou YanZhe/g,"周彦哲");

//No.27
//福建中天FC
//ID:
htmlstr=htmlstr.replace(/Dai YiHu/g,"戴伊虎");
htmlstr=htmlstr.replace(/Du ShiZhao/g,"杜石昭");
htmlstr=htmlstr.replace(/Fei JingRen/g,"费景仁");
htmlstr=htmlstr.replace(/Fu XiangXian/g,"傅祥贤");
htmlstr=htmlstr.replace(/Hong DaYu/g,"洪大羽");
htmlstr=htmlstr.replace(/Jian YingJie/g,"简英杰");
htmlstr=htmlstr.replace(/Jiang JiaQiang/g,"蒋嘉强");
htmlstr=htmlstr.replace(/Li ZhiNing/g,"李志宁"); 
htmlstr=htmlstr.replace(/Lv GuangLin/g,"吕广林");
htmlstr=htmlstr.replace(/Ma JiongWen/g,"马炅文");
htmlstr=htmlstr.replace(/Shi YaTao/g,"石亚涛");
htmlstr=htmlstr.replace(/Tan DongYa/g,"谭东亚");
htmlstr=htmlstr.replace(/Wan ZaiYu/g,"万载羽");
htmlstr=htmlstr.replace(/Weng YuJie/g,"翁羽杰");
htmlstr=htmlstr.replace(/Ye Qi/g,"叶齐");
htmlstr=htmlstr.replace(/Ying ChangLe/g,"赢长乐");
htmlstr=htmlstr.replace(/Zeng TengLong/g,"曾腾龙");
htmlstr=htmlstr.replace(/Zhang QiongZhong/g,"章琼忠");
htmlstr=htmlstr.replace(/Zhi XingYan/g,"智兴岩"); 
htmlstr=htmlstr.replace(/Zong DaMing/g,"宗达名");
htmlstr=htmlstr.replace(/Zou JiuZhang/g,"邹玖章");

//28
//根宝足球训练基地
htmlstr=htmlstr.replace(/An WeiWei/g,"安韦玮");

//No.29
//SnowyTown
htmlstr=htmlstr.replace(/Bu YiGuang/g,"卜一光");
htmlstr=htmlstr.replace(/Chao HouLin/g,"晁后邻");
htmlstr=htmlstr.replace(/Chu LiZe/g,"褚利泽");
htmlstr=htmlstr.replace(/Dong MeiYu/g,"董美玉");
htmlstr=htmlstr.replace(/Du PinQuan/g,"杜品荃");
htmlstr=htmlstr.replace(/Gao Gang/g,"高岗");
htmlstr=htmlstr.replace(/Ge ZhiLu/g,"葛志璐");
htmlstr=htmlstr.replace(/GongSun ZhaoShun/g,"公孙昭顺");
htmlstr=htmlstr.replace(/Gui YunFeng/g,"桂云峰");
htmlstr=htmlstr.replace(/He ZhongYou/g,"贺忠友");
htmlstr=htmlstr.replace(/Hong JianYe/g,"洪建业");
htmlstr=htmlstr.replace(/Hou JiuTao/g,"侯久涛");
htmlstr=htmlstr.replace(/Huo MengGu/g,"霍猛故"); 
htmlstr=htmlstr.replace(/Jia JingYang/g,"贾京阳");
htmlstr=htmlstr.replace(/Jian EnHua/g,"简恩华");
htmlstr=htmlstr.replace(/Lai GuangNan/g,"赖光楠");
htmlstr=htmlstr.replace(/Li BoRui/g,"李柏瑞");
htmlstr=htmlstr.replace(/LiYang De/g,"李阳德");
htmlstr=htmlstr.replace(/Liang ZiHeng/g,"梁子恒");
htmlstr=htmlstr.replace(/Liao XiangTao/g,"廖祥涛");
htmlstr=htmlstr.replace(/Luo YanKai/g,"罗颜开");
htmlstr=htmlstr.replace(/Nong An/g,"农安");
htmlstr=htmlstr.replace(/Ou Cheng/g,"欧城");
htmlstr=htmlstr.replace(/Ou JunNan/g,"欧俊男");
htmlstr=htmlstr.replace(/Qian TingRui/g,"钱庭瑞");
htmlstr=htmlstr.replace(/Qiao Da/g,"乔大");
htmlstr=htmlstr.replace(/Shao HanWen/g,"邵汉文");
htmlstr=htmlstr.replace(/Shen GuangQi/g,"沈光奇");
htmlstr=htmlstr.replace(/Shu GuangZhong/g,"舒光忠");
htmlstr=htmlstr.replace(/Shui ShengYuan/g,"水生源");
htmlstr=htmlstr.replace(/Si ZhaoYao/g,"司照耀");
htmlstr=htmlstr.replace(/Sun ShiDuo/g,"孙士多");
htmlstr=htmlstr.replace(/Tang YongBo/g,"汤勇博");
htmlstr=htmlstr.replace(/Wan JinShan/g,"万金山");
htmlstr=htmlstr.replace(/Wang DongLiang/g,"王栋梁");
htmlstr=htmlstr.replace(/Wang XueRui/g,"王雪芮");
htmlstr=htmlstr.replace(/Wei JiaJu/g,"魏家驹");
htmlstr=htmlstr.replace(/Wu Yue/g,"吴越");
htmlstr=htmlstr.replace(/Xu YongHuai/g,"徐勇怀");
htmlstr=htmlstr.replace(/Yang DongJie/g,"杨东杰");
htmlstr=htmlstr.replace(/Ye XiaoPeng/g,"叶霄鹏");
htmlstr=htmlstr.replace(/You HaiQing/g,"游海清");
htmlstr=htmlstr.replace(/Yu Guang/g,"余光");
htmlstr=htmlstr.replace(/Zhai Xun/g,"翟寻");
htmlstr=htmlstr.replace(/Zhang GengYang/g,"张耿阳");
htmlstr=htmlstr.replace(/Zhang XinJie/g,"张新杰");
htmlstr=htmlstr.replace(/Zhang ZhenYang/g,"张震杨");
htmlstr=htmlstr.replace(/Zhang ZhiNing/g,"张志宁");
htmlstr=htmlstr.replace(/Zou QiChen/g,"邹启晨");
htmlstr=htmlstr.replace(/Zou YingChun/g,"邹迎春");


//No.30 
//蓝调火花 
htmlstr=htmlstr.replace(/Adelgardo Dell'Asino/g,"阿德瓜多·戴尔阿斯诺"); 
htmlstr=htmlstr.replace(/Chang XiangWei/g,"常相伟"); 
htmlstr=htmlstr.replace(/Chen YaWei/g,"陈亚维");
htmlstr=htmlstr.replace(/Fu XinXin/g,"付欣欣"); 
htmlstr=htmlstr.replace(/Fábio Da Silva/g,"法比奥·达·席尔瓦"); 
htmlstr=htmlstr.replace(/Huang Rui/g,"黄瑞"); 
htmlstr=htmlstr.replace(/Pavel Kuchukian/g,"帕维尔·库楚坎"); 
htmlstr=htmlstr.replace(/Ren QiuMing /g,"任秋明");
htmlstr=htmlstr.replace(/Wang Hai/g,"王海"); 
htmlstr=htmlstr.replace(/Wen Bai/g,"闻白"); 
htmlstr=htmlstr.replace(/Xiong TianYou/g,"熊天佑"); 
htmlstr=htmlstr.replace(/Yang HuiPing/g,"杨慧平"); 
htmlstr=htmlstr.replace(/Ye DiFan/g,"叶迪凡"); 
htmlstr=htmlstr.replace(/Yin JunLin/g,"尹俊琳"); 
htmlstr=htmlstr.replace(/You YunPeng/g,"游云鹏"); 
htmlstr=htmlstr.replace(/Yuan ZhongShi /g,"元忠实");
htmlstr=htmlstr.replace(/Zhou ChaoChao/g,"周超超"); 
htmlstr=htmlstr.replace(/Zhou MingFei/g,"周明飞");
htmlstr=htmlstr.replace(/Zhou Zu/g,"周祖"); 

//No.31 
//福州泰然 
htmlstr=htmlstr.replace(/Bian JiaKang/g,"卞加康"); 
htmlstr=htmlstr.replace(/Ding XiaoXin/g,"丁晓昕"); 
htmlstr=htmlstr.replace(/Fei YuanDong/g,"费源东"); 
htmlstr=htmlstr.replace(/Gan ChangQing/g,"甘长青"); 
htmlstr=htmlstr.replace(/Gao ZiTeng/g,"高梓腾"); 
htmlstr=htmlstr.replace(/Geng ShenZhou/g,"耿胜周"); 
htmlstr=htmlstr.replace(/Hua GuiYan/g,"华归雁"); 
htmlstr=htmlstr.replace(/Jia XiaoTian/g,"贾晓天"); 
htmlstr=htmlstr.replace(/Jiao DongDong/g,"胶东东"); 
htmlstr=htmlstr.replace(/Li XingHui/g,"李星辉"); 
htmlstr=htmlstr.replace(/Luo JunLing/g,"洛筠凌"); 
htmlstr=htmlstr.replace(/Peng ZiLong/g,"鹏子龙"); 
htmlstr=htmlstr.replace(/Qi YaoTong/g,"齐遥桐"); 
htmlstr=htmlstr.replace(/Tong TianLe/g,"同天乐"); 
htmlstr=htmlstr.replace(/Tu Bai/g,"涂拜"); 
htmlstr=htmlstr.replace(/Weng GenGen/g,"翁根根"); 
htmlstr=htmlstr.replace(/Xian MeiYan/g,"冼梅雁"); 
htmlstr=htmlstr.replace(/Zhan YueSheng/g,"占越胜"); 
htmlstr=htmlstr.replace(/Zhang WenKai/g,"张文凯"); 
htmlstr=htmlstr.replace(/ZhangLiang XiYan/g,"张梁西彦"); 
htmlstr=htmlstr.replace(/Zhao ZuoLin/g,"赵作霖"); 
htmlstr=htmlstr.replace(/Zheng HengShan/g,"正恒山"); 
htmlstr=htmlstr.replace(/Zheng XiGuang/g,"郑熙广"); 
htmlstr=htmlstr.replace(/Zhou JingRen/g,"周惊人"); 
htmlstr=htmlstr.replace(/Zhou JingRen/g,"周景仁"); 

//No.32
//泉州智衡
htmlstr=htmlstr.replace(/Ai TianYin/g,"艾天茵");
htmlstr=htmlstr.replace(/Chao DongBing/g,"晁东兵");
htmlstr=htmlstr.replace(/Chen JiaHe/g,"陈家贺");
htmlstr=htmlstr.replace(/DuGu XuLin/g,"独孤旭林");
htmlstr=htmlstr.replace(/Fu BaoRen/g,"傅保仁");
htmlstr=htmlstr.replace(/Gabriel Mazilu/g,"加布里埃尔·马奇路");
htmlstr=htmlstr.replace(/Huang WeiSheng/g,"黄伟晟");
htmlstr=htmlstr.replace(/Huo HeXuan/g,"霍赫宣");
htmlstr=htmlstr.replace(/Huo JiChao/g,"霍继超");
htmlstr=htmlstr.replace(/Jiang ZeXi/g,"江泽溪");
htmlstr=htmlstr.replace(/Jiao YiXiang/g,"金一翔");
htmlstr=htmlstr.replace(/Kaiji Momose/g,"百濑宏林");
htmlstr=htmlstr.replace(/Lei PengFei/g,"雷鹏飞");
htmlstr=htmlstr.replace(/Leng XiaoGuang/g,"冷潇广");
htmlstr=htmlstr.replace(/Li JunFeng/g,"李俊峰");
htmlstr=htmlstr.replace(/Lin HanShuo/g,"林涵硕");
htmlstr=htmlstr.replace(/Ma WenYi/g,"马文一");
htmlstr=htmlstr.replace(/Marek Gazda/g,"马尔科·加扎德");
htmlstr=htmlstr.replace(/Mattia Pezzi/g,"马蒂亚·拜齐");
htmlstr=htmlstr.replace(/Pan CiFu/g,"潘次赴");
htmlstr=htmlstr.replace(/Sun ZhengTu/g,"孙正途");
htmlstr=htmlstr.replace(/Xi Shang/g,"习尚");
htmlstr=htmlstr.replace(/Xiao De/g,"肖德");
htmlstr=htmlstr.replace(/Xu ZhiYu/g,"徐致予");
htmlstr=htmlstr.replace(/Zhang JinShang/g,"张进上");
htmlstr=htmlstr.replace(/Zhao Hang/g,"赵航");
htmlstr=htmlstr.replace(/Zheng JiaCheng/g,"郑嘉城");

//No.33
//青岛黄海
htmlstr=htmlstr.replace(/Shu ShuangBang/g,"舒双邦");
htmlstr=htmlstr.replace(/Xu XiangChuang/g,"徐向闯");
htmlstr=htmlstr.replace(/Musgu Bigo/g,"玛斯古·宾狗");
htmlstr=htmlstr.replace(/Nie ZhuoRan/g,"聂卓然");
htmlstr=htmlstr.replace(/Luan JunSheng/g,"栾俊生");

//No.34
//迷途小球童
htmlstr=htmlstr.replace(/Cao XinZhi/g,"曹馨之"); 
htmlstr=htmlstr.replace(/De'ron Powell/g,"德朗·鲍威尔"); 
htmlstr=htmlstr.replace(/Günther Selinger/g,"甘瑟·塞林格"); 
htmlstr=htmlstr.replace(/Hu YaZhao/g,"胡亚朝"); 
htmlstr=htmlstr.replace(/Li ZeTao/g,"李泽涛"); 
htmlstr=htmlstr.replace(/Lin Shou/g,"林寿"); 
htmlstr=htmlstr.replace(/Liu LiMing/g,"刘利明"); 
htmlstr=htmlstr.replace(/Liu YaoDong/g,"刘耀东"); 
htmlstr=htmlstr.replace(/Lu JiaChen/g,"卢佳辰");
htmlstr=htmlstr.replace(/Luo PengXiang/g,"罗鹏翔"); 
htmlstr=htmlstr.replace(/Mohamed Hamdoud/g,"穆罕默德·哈姆杜德"); 
htmlstr=htmlstr.replace(/Niu ShaoNan/g,"牛少楠"); 
htmlstr=htmlstr.replace(/Paul Banica/g,"保罗·巴尼卡"); 
htmlstr=htmlstr.replace(/Ren ChengDe/g,"任成德"); 
htmlstr=htmlstr.replace(/Shan ZhuoYi/g,"单卓义"); 
htmlstr=htmlstr.replace(/Shi GongQing/g,"石功青"); 
htmlstr=htmlstr.replace(/Shu YiJi/g,"书一击"); 
htmlstr=htmlstr.replace(/Shu YueFeng/g,"舒岳峰"); 
htmlstr=htmlstr.replace(/Tian TaoMao/g,"田涛茂"); 
htmlstr=htmlstr.replace(/Wang ShuXiao/g,"王书晓"); 
htmlstr=htmlstr.replace(/Wen JinHuang/g,"文金黄"); 
htmlstr=htmlstr.replace(/Wu JiangHui/g,"吴江辉"); 
htmlstr=htmlstr.replace(/Zhao ShiKai/g,"赵世开"); 
htmlstr=htmlstr.replace(/Zheng ZhiWei/g,"郑智威"); 
htmlstr=htmlstr.replace(/Zhuang XiaoPing/g,"庄小平"); 
htmlstr=htmlstr.replace(/Zu YuanAn/g,"祖元安"); 

//No.35 福建中天 
htmlstr=htmlstr.replace(/Gong ShiKai/g,"龚世凯"); 
htmlstr=htmlstr.replace(/Jiang YiFeng/g,"江逸风"); 
htmlstr=htmlstr.replace(/Wu SuZheng/g,"吴苏正"); 
htmlstr=htmlstr.replace(/Xie JianJun/g,"谢剑钧"); 
htmlstr=htmlstr.replace(/Ye EnHua/g,"叶恩华"); 
htmlstr=htmlstr.replace(/Zhao ZhiKang/g,"赵志康"); 
htmlstr=htmlstr.replace(/Zhu YunLong/g,"朱云龙");

//No.36
//天龙谷
htmlstr=htmlstr.replace(/Chen NiuNiu/g,"陈牛牛");
htmlstr=htmlstr.replace(/Fei XiXian/g,"费熙贤");
htmlstr=htmlstr.replace(/Hu ChunXi/g,"胡淳熙");
htmlstr=htmlstr.replace(/Ke ChunJi/g,"柯春记");
htmlstr=htmlstr.replace(/Li HengCheng/g,"李恒诚");
htmlstr=htmlstr.replace(/Li ShiWei/g,"李士为");
htmlstr=htmlstr.replace(/Lin HongXuan/g,"林凤轩");
htmlstr=htmlstr.replace(/Miao BaoRong/g,"苗宝荣");
htmlstr=htmlstr.replace(/Ou GeZhuo/g,"欧歌卓");
htmlstr=htmlstr.replace(/Qian ChenHao/g,"钱尘昊");
htmlstr=htmlstr.replace(/Su WenQiang/g,"苏文强");
htmlstr=htmlstr.replace(/Wan HuiDong/g,"万惠东");
htmlstr=htmlstr.replace(/Wu ZhiPing/g,"武志平");
htmlstr=htmlstr.replace(/Xiang Man/g,"香曼");
htmlstr=htmlstr.replace(/Xiong HouYong/g,"熊侯勇");
htmlstr=htmlstr.replace(/Xiong XiLai/g,"熊熙来");
htmlstr=htmlstr.replace(/Xu MuYuan/g,"徐牧原");
htmlstr=htmlstr.replace(/Yang YuShu/g,"杨玉树");
htmlstr=htmlstr.replace(/Zhen CheLie/g,"甄车烈");
htmlstr=htmlstr.replace(/Zheng YuWei/g,"郑鱼维");

//No.37
//东莞FC
htmlstr=htmlstr.replace(/An XiSha/g,"安西沙");
htmlstr=htmlstr.replace(/Cui RunZhong/g,"崔润中");
htmlstr=htmlstr.replace(/Dang ShiMing/g,"党世铭");
htmlstr=htmlstr.replace(/Du LinJiang/g,"杜林江");
htmlstr=htmlstr.replace(/Feng JiLin/g,"冯吉林");
htmlstr=htmlstr.replace(/He YuHang/g,"何宇航");
htmlstr=htmlstr.replace(/Huang JianWei/g,"黄建伟");
htmlstr=htmlstr.replace(/Jia Kun/g,"贾坤");
htmlstr=htmlstr.replace(/Jiao ZhenXun/g,"焦振勋");
htmlstr=htmlstr.replace(/Kong BingQuan/g,"孔冰泉");
htmlstr=htmlstr.replace(/Li FangJie/g,"栗方杰");
htmlstr=htmlstr.replace(/Li GuanXi/g,"李冠希");
htmlstr=htmlstr.replace(/Liu Chou/g,"刘稠");
htmlstr=htmlstr.replace(/Liu YueYing/g,"刘岳英");
htmlstr=htmlstr.replace(/Man YingTao/g,"满英涛");
htmlstr=htmlstr.replace(/Nong YiMing/g,"农一鸣");
htmlstr=htmlstr.replace(/Qian ShouTing/g,"钱寿庭");
htmlstr=htmlstr.replace(/Shi YongSheng/g,"石永胜");
htmlstr=htmlstr.replace(/Wu ShaoHua/g,"吴绍华");
htmlstr=htmlstr.replace(/Xu JinFei/g,"许劲飞");
htmlstr=htmlstr.replace(/Xuan ChenYao/g,"宣辰耀");
htmlstr=htmlstr.replace(/You ShaoQuan/g,"游绍权");
htmlstr=htmlstr.replace(/Yuan RuiJie/g,"袁锐捷");
htmlstr=htmlstr.replace(/Yuan WenJie/g,"袁文杰");
htmlstr=htmlstr.replace(/Zhao LiHong/g,"赵力宏");
htmlstr=htmlstr.replace(/Zheng ZhiWei/g,"郑志伟");

//No.38 严良贤的私人足球队
htmlstr=htmlstr.replace(/Xie ShengLong/g,"谢申龙"); 
htmlstr=htmlstr.replace(/Lei YuanPei/g,"雷元鹏");

//No.39 
//宁波包子队
htmlstr=htmlstr.replace(/Cai SenXiang/g,"蔡森祥");
htmlstr=htmlstr.replace(/Chi JianHua/g,"迟建华");
htmlstr=htmlstr.replace(/Du KeCheng/g,"杜克成");
htmlstr=htmlstr.replace(/Guo YongQi/g,"郭永奇");
htmlstr=htmlstr.replace(/Huo YuanChao/g,"霍元超");
htmlstr=htmlstr.replace(/Kang BinYi/g,"康秉义");
htmlstr=htmlstr.replace(/Kang GaoJun/g,"康高俊");
htmlstr=htmlstr.replace(/Lan AiMin/g,"兰爱民");
htmlstr=htmlstr.replace(/Li WenZhai/g,"李文斋");
htmlstr=htmlstr.replace(/Min HongLve/g,"闵洪略");
htmlstr=htmlstr.replace(/Pang Tai/g,"庞泰");
htmlstr=htmlstr.replace(/Qian KaiHong/g,"钱开宏");
htmlstr=htmlstr.replace(/Sheng ChengXuan/g,"盛成轩");
htmlstr=htmlstr.replace(/Sun SanSha/g,"孙三沙");
htmlstr=htmlstr.replace(/Wang JianXin/g,"王建新");
htmlstr=htmlstr.replace(/Wang WenLong/g,"王文龙");
htmlstr=htmlstr.replace(/Wu YaJun/g,"吴亚军");
htmlstr=htmlstr.replace(/XiaHou YaoKun/g,"夏侯耀坤");
htmlstr=htmlstr.replace(/Xu HongPing/g,"徐洪平");
htmlstr=htmlstr.replace(/Yang HuWei/g,"杨虎威");
htmlstr=htmlstr.replace(/Zhang HouLei/g,"张厚雷");
htmlstr=htmlstr.replace(/Zhang YuChuan/g,"张玉川");
htmlstr=htmlstr.replace(/Zhao ShuaiGang/g,"赵帅刚");
htmlstr=htmlstr.replace(/Zheng XianJi/g,"郑宪基");


//特殊名字
htmlstr=htmlstr.replace(/Li MAZiJun/g,"李马訾俊");
htmlstr=htmlstr.replace(/Liu DeHua/g,"刘德华");
htmlstr=htmlstr.replace(/Qi WuSheng/g,"戚务生");
htmlstr=htmlstr.replace(/Sun Ke/g,"孙可");
htmlstr=htmlstr.replace(/Zhang YiMou/g,"张艺谋");
htmlstr=htmlstr.replace(/Zhao MAZiJun/g,"赵马梓君");

//NT
htmlstr=htmlstr.replace(/Chen ZheQian/g,"陈哲乾");
htmlstr=htmlstr.replace(/Cheng YaKe/g,"程亚柯");
htmlstr=htmlstr.replace(/DuGu '独孤九剑' WenCi|DuGu WenCi/g,"独孤文辞");
htmlstr=htmlstr.replace(/Gao WenYong/g,"高稳勇");
htmlstr=htmlstr.replace(/Guan JiangRui/g,"关江瑞");
htmlstr=htmlstr.replace(/Guo '锅盖' HeJing|Guo HeJing/g,"郭和靖");
htmlstr=htmlstr.replace(/He Zhu/g,"何著");
htmlstr=htmlstr.replace(/Huo KeZhen|Huo '甄子丹' KeZhen/g,"霍克珍");
htmlstr=htmlstr.replace(/Huo ZhiLei/g,"霍志磊");
htmlstr=htmlstr.replace(/LingHu HongGang/g,"令狐宏刚");
htmlstr=htmlstr.replace(/Liu '刘子杰' ZiJie|Liu ZiJie/g,"刘子杰");
htmlstr=htmlstr.replace(/Lu FuSheng/g,"卢福胜");
htmlstr=htmlstr.replace(/Ma WenYuan/g,"马文远");
htmlstr=htmlstr.replace(/Mao TianTa/g,"毛天塔");
htmlstr=htmlstr.replace(/Nan HuiChen/g,"南惠晨");
htmlstr=htmlstr.replace(/Shen ZhengRong/g,"沈峥嵘");
htmlstr=htmlstr.replace(/Song RuiKai/g,"宋瑞凯");
htmlstr=htmlstr.replace(/Tie '李铁' GuoLi|Tie GuoLi/g,"铁国立");
htmlstr=htmlstr.replace(/Tu 'Shi Ke' Fa|Tu Fa/g,"涂珐");
htmlstr=htmlstr.replace(/Wang '王瑞仑' RuiLun|Wang RuiLun/g,"王瑞伦");
htmlstr=htmlstr.replace(/Xu Ya/g,"徐亚");
htmlstr=htmlstr.replace(/Zhang ChangQing/g,"张长卿");
htmlstr=htmlstr.replace(/Zhang Yi Na/g,"那张毅");
htmlstr=htmlstr.replace(/Zhao '赵四' YanLin|Zhao YanLin/g,"赵炎麟");

//二字

htmlstr=htmlstr.replace(/Fan Heng/g,"范衡");
htmlstr=htmlstr.replace(/Guo Kun/g,"郭坤"); 
htmlstr=htmlstr.replace(/Hua Qiang/g,"华强"); 
htmlstr=htmlstr.replace(/Huang Wei/g,"黄威"); 
htmlstr=htmlstr.replace(/Huo Lie/g,"霍烈"); 
htmlstr=htmlstr.replace(/Qian Xi/g,"千禧");
htmlstr=htmlstr.replace(/Ruan Qi/g,"阮奇");
htmlstr=htmlstr.replace(/Wang Guo/g,"王国");
htmlstr=htmlstr.replace(/Zheng Yin/g,"郑印");
htmlstr=htmlstr.replace(/Zhuang Kuo/g,"装阔"); 

document.getElementById("tooltip").innerHTML=htmlstr;
}
setInterval(nametip,500); //每3秒钟执行一次test()


//alert(document.getElementById("tooltip").innerHTML);