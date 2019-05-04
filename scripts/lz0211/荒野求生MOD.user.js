// ==UserScript==
// @name         荒野求生MOD
// @namespace    https://greasyfork.org/zh-CN/users/208194-lz0211
// @version      1.4
// @description  荒野求生H5游戏作弊脚本
// @author       Liezhang
// @match        http://hyqs.dayukeji.com/publish/*
// @match        http://hyqs2.dayukeji.com/publish/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    function each(object,func){for(var k in object){func.call(object,k,object[k],object)}}
    function mod() {
        console.log('======开始加载MOD脚本=====')
        with (profile_config) {
            //10倍贝壳，2倍成就点，2倍属性加成
            console.log('10倍贝壳，2倍成就点，2倍属性加成')
            each(achieve_profile,function(k,item){
                item.COINPOINT = item.COINPOINT.map(function(x){return 10*x})
                item.POINT = item.POINT.map(function(x){return 2*x})
                if (item.EFFECT && item.EFFECT.value) {
                    item.EFFECT.value = item.EFFECT.value.map(function(x){return 2*x})
                }
            })
            //10倍活动奖励贝壳
            console.log('10倍活动奖励贝壳')
            each(activities_profile,function(k,item){
                if(!Array.isArray(item.ACTION)) return
                item.ACTION.forEach(function(action){
                    if (!action.COIN) return
                    action.COIN = action.COIN + 't'
                })
            })
            //生产时间减半，产量翻倍
            console.log('建筑生产时间减半')
            each(buff_profile,function(x,item){
                if ('ITEMS' in item) {
                    item.H_TIME = item.H_TIME / 2
                    each(item.ITEMS,function(k,v,o){
                        o[k] = 2 * v
                    })
                }
            })
            //产量翻倍
            console.log('建筑生产产量翻倍')
            each(build_product_profile,function(x,item){
                if(!item.PRODUCT) return
                each(item.PRODUCT,function(k,item){
                    if(item.AUDIO !== 'sleep'){
                        item.P_TIME = item.P_TIME/2
                    }
                    if(item.BUFF){
                        each(item.ITEMS,function(k,v,o){
                            o[k] = 2 * v
                        })
                        each(item.DESC,function(k,v,o){
                            o[k] = v.replace(/(\d+)/g,function($,$1){return 2*$1})
                        })
                        each(item.GETTEXT,function(k,v,o){
                            o[k] = v.replace(/(\d+)/g,function($,$1){return 2*$1})
                        })
                    }else if(x == 3002 || x == 3004){
                        var count = Object.keys(item.P_COST).map(function(k){return item.P_COST[k]}).reduce(function(x,y){return x+y},0)
                        each(item.ITEMS,function(k,v,o){
                            o[k] = v + Math.ceil(1.2*Math.log(count))
                        })
                    }else if(x != 3003){
                        each(item.ITEMS,function(k,v,o){
                            if(v > 5){
                                o[k] = 2 * v
                            }
                        })
                    }
                })
            })
            //2倍建筑耐久，建筑及维修时间减半
            console.log('2倍建筑耐久，建筑及维修时间减半')
            each(build_profile,function(x,items){
                each(items,function(k,item){
                    if (typeof item.DURATION === 'number') {
                        item.DURATION = 2 * item.DURATION
                    }
                    if(item.P_TIME){
                        item.P_TIME = .5 * item.P_TIME
                    }
                    if(item.R_TIME){
                        item.R_TIME = .5 * item.R_TIME
                    }
                })
            })
            //两倍掉率
            console.log('两倍掉率')
            each(drop_profile,function(x,items){
                var outlist = ['4048','4061','4062','4063','4064','4065','4066','4067','4075','4067','4078','4079']
                each(items,function(k,item){
                    if(outlist.indexOf(k)>=0) return
                    var min = item.MIN
                    var max = item.MAX
                    if (min === max) {
                        item.MIN = max
                        item.MAX = 2 * max
                    } else {
                        item.MIN = 2 * min
                        item.MAX = 2 * max
                    }
                })
            })
            //钓鱼宝箱
            console.log('钓鱼宝箱')
            drop_profile[7005]={4000:{MIN:2,MAX:6,RATIO:45},4001:{MIN:2,MAX:6,RATIO:45},4002:{MIN:2,MAX:6,RATIO:45},4003:{MIN:2,MAX:6,RATIO:45},4004:{MIN:2,MAX:6,RATIO:100},4005:{MIN:2,MAX:6,RATIO:45},4007:{MIN:1,MAX:6,RATIO:45},4011:{MIN:1,MAX:6,RATIO:45},4012:{MIN:2,MAX:6,RATIO:45},4013:{MIN:2,MAX:6,RATIO:45},4020:{MIN:2,MAX:6,RATIO:45},4021:{MIN:2,MAX:6,RATIO:45},4022:{MIN:2,MAX:6,RATIO:45},4036:{MIN:2,MAX:6,RATIO:45},4044:{MIN:2,MAX:6,RATIO:45},4089:{MIN:1,MAX:6,RATIO:45}}
            drop_profile[7006]={4015:{MIN:1,MAX:2,RATIO:35},4027:{MIN:1,MAX:2,RATIO:35},4028:{MIN:1,MAX:2,RATIO:35},4029:{MIN:1,MAX:2,RATIO:35},4030:{MIN:1,MAX:2,RATIO:35},4031:{MIN:1,MAX:2,RATIO:35},4032:{MIN:1,MAX:2,RATIO:35},4033:{MIN:1,MAX:2,RATIO:35},4034:{MIN:1,MAX:2,RATIO:35},4035:{MIN:1,MAX:2,RATIO:35},4037:{MIN:1,MAX:5,RATIO:35},4038:{MIN:1,MAX:2,RATIO:35},4039:{MIN:1,MAX:2,RATIO:35},4071:{MIN:1,MAX:2,RATIO:35},4072:{MIN:1,MAX:2,RATIO:35},4400:{MIN:1,MAX:2,RATIO:35}}
            drop_profile[7007]={4068:{MIN:1,MAX:1,RATIO:25},4073:{MIN:1,MAX:2,RATIO:25},4074:{MIN:1,MAX:2,RATIO:25},4076:{MIN:1,MAX:2,RATIO:25},4077:{MIN:1,MAX:2,RATIO:25},4087:{MIN:1,MAX:5,RATIO:25},4103:{MIN:1,MAX:1,RATIO:25},4115:{MIN:1,MAX:1,RATIO:25},4116:{MIN:1,MAX:1,RATIO:25},4117:{MIN:1,MAX:1,RATIO:25},4118:{MIN:1,MAX:1,RATIO:25},4125:{MIN:1,MAX:1,RATIO:25},4126:{MIN:10,MAX:20,RATIO:25},4403:{MIN:1,MAX:1,RATIO:25}}
            drop_profile[7008]={4016:{MIN:1,MAX:2,RATIO:35},4017:{MIN:1,MAX:2,RATIO:35},4018:{MIN:1,MAX:2,RATIO:35},4019:{MIN:1,MAX:2,RATIO:35},4024:{MIN:1,MAX:2,RATIO:35},4025:{MIN:1,MAX:2,RATIO:35},4026:{MIN:1,MAX:2,RATIO:35},4040:{MIN:1,MAX:2,RATIO:35},4041:{MIN:1,MAX:2,RATIO:35},4042:{MIN:1,MAX:2,RATIO:35},4043:{MIN:1,MAX:2,RATIO:35},4083:{MIN:1,MAX:3,RATIO:35},4084:{MIN:1,MAX:3,RATIO:35},4085:{MIN:1,MAX:3,RATIO:35},4086:{MIN:1,MAX:3,RATIO:35},4087:{MIN:1,MAX:3,RATIO:35}}
            fish_box_profile[5037] = {ID:"5037",NAME:{cn:"神秘的箱子"},PIC:"Texture/Monster/1211",OPEN_WAYS:["0","4100#4100_1","4112#4112_1#4127#4129"],DROP_ID:7006,DESC:{cn:"你感觉鱼钩好像钩住什么重物，费了不小的劲儿拉出一个神秘的木箱"},DESC1:{cn:"努力开启中..."},DESC2:{cn:"你成功开启了箱子"}}
            fish_box_profile[5038] = {ID:"5038",NAME:{cn:"海盗的宝箱"},PIC:"Texture/Monster/1211",OPEN_WAYS:["0","4100#4100_1","4112#4112_1#4127#4129"],DROP_ID:7007,DESC:{cn:"你感觉鱼钩好像钩住什么重物，费了不小的劲儿拉出一个海盗的宝箱"},DESC1:{cn:"努力开启中..."},DESC2:{cn:"你成功开启了箱子"}}
            fish_box_profile[5039] = {ID:"5039",NAME:{cn:"补给箱"},PIC:"Texture/Monster/1211",OPEN_WAYS:["0","4100#4100_1","4112#4112_1#4127#4129"],DROP_ID:7008,DESC:{cn:"你感觉鱼钩好像钩住什么重物，费了不小的劲儿拉出一个补给箱"},DESC1:{cn:"努力开启中..."},DESC2:{cn:"你成功开启了箱子"}}
            fish_profile[0].WEIGHT = 0
            fish_profile[36].WEIGHT = 40
            fish_profile[37] = {NAME:{cn:"神秘的箱子"},EVENT:"5037",WEIGHT:20,TYPE:"box",COND:{}}
            fish_profile[38] = {NAME:{cn:"海盗的宝箱"},EVENT:"5038",WEIGHT:10,TYPE:"box",COND:{}}
            fish_profile[39] = {NAME:{cn:"补给箱"},EVENT:"5039",WEIGHT:30,TYPE:"box",COND:{}}
            //物品减重+5倍伤害
            console.log('物品减重+5倍伤害')
            each(item_profile,function(k,item){
                if('WEIGHT' in item){
                    item.WEIGHT = ''+ Math.floor(item.WEIGHT/2)
                }
                if ('E_ATTRS' in item) {
                    item.E_ATTRS.ATK = item.E_ATTRS.ATK * 10
                    item.E_ATTRS.DIS = item.E_ATTRS.ATK * 2
                    item.E_ATTRS.SPD = item.E_ATTRS.SPD * 2
                    item.E_ATTRS.HIT = 100
                }
            })
            //人物属性调整
            console.log('人物属性调整')
            /*
                7000 精神
                7001 失眠
                7002 生命上限
                7003 当前生命
                7004 受伤
                7005 感染
                7006 饥饿
                7007 速度
                7012 防御
                7013 徒手攻击
                7014 移动速度
                7016 近战攻击
                7017 远程攻击
                7018 闪避
                7019 攻击速度
                7032 未知
                7040 负重
                7041 有船
                7042 有骆驼
                7044 精神上限
                7045 失眠上限
                7046 受伤上限
                7047 感染上限
                7048 饥饿上限
                7051 万人迷
                7054 有鞋子
                7055 有背包
            */
            //罗兰
            console.log('调整罗兰人物属性')
            with(role_profile[1000]){
                BASE[7048] = 120
                BASE[7040] = 50
            }
            //朱莉
            console.log('调整朱莉人物属性')
            with(role_profile[1001]){
                BASE[7017] = 120
                BASE[7007] = 2
                BASE[7019] = 2
                BASE[7018] = 25
            }
            //老贝
            console.log('调整老贝人物属性')
            with(role_profile[1002]){
                BASE[7014] = 5
                BASE[7013] = 35
                BASE[7018] = 30
                BASE[7040] = 60
                BASE[7047] = 120
            }
            //小哥
            console.log('调整小哥人物属性')
            with(role_profile[1003]){
                BASE[7000] = 120
                BASE[7044] = 120
                BASE[7045] = 120
                BASE[7040] = 50
            }
            //基德
            console.log('调整基德人物属性')
            with(role_profile[1003]){
                BASE[7016] = 120
                BASE[7046] = 120
                BASE[7047] = 110
                BASE[7040] = 50
            }
            //探索点资源上限翻倍
            console.log('探索点资源翻倍')
            each(pot_profile,function(k,item){
                if(!item.STAGE) return
                each(item.STAGE,function(k,v,o){
                    if(v.WAY && v.WAY.en !== 'Hunt' && v.CIRCLE){
                        v.RAW_CNT = v.MAX_CNT
                        v.MAX_CNT = 2 * v.MAX_CNT
                    }
                })
            })
            //陷阱10倍耐久，概率100%
            console.log('陷阱10倍耐久，100%概率')
            each(trap_profile,function(k,item){
                item.RATIO = 100
                item.DURATION = 10 * item.DURATION
            })
            //荒野大礼包
            console.log('荒野大礼包')
            var gift = {
                ID: "208",
                INCLUDE: ["1", "2", "3", "4", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "100", "101", "102", "103", "104", "105", "106", "107"],
                NAME: {
                    cn: "荒野大礼包"
                },
                ITEMS: {
                    4016: 7,
                    4017: 7,
                    4024: 3,
                    4038: 10,
                    4076: 2,
                    4103: 1,
                    4106: 1,
                    4107: 40
                },
                ICON: "Texture/Item/limit208",
                ICON_SCALE: 1.2,
                DISC_DESC: "福利",
                PRICE_FAKE: {
                    cn: "1298"
                },
                PRICE: "satt",
                COIN_PRICE: "satt",
                DESC: {
                    cn: "立即解锁所有角色，所有天赋，所有图纸以及靴子和背包。\n获得后永久有效。"
                },
                IS_LOCKED: false,
                IS_PURCHASED: false,
                RECOMMEND: "1",
                SHOPNAME: {
                    cn: "荒野大礼包"
                },
                SHOPDESC: {
                    cn: "解锁所有角色、天赋、图纸以及靴子和背包。"
                }
            }
            each(shop_profile.FOR_LIMIT,function(k,item,o){
                if(item.ID == 208){
                    o[k] = gift
                }
            })
            if(shop_profile.SHOP_OUT.selList.indexOf(208) === -1){
                shop_profile.SHOP_OUT.selList.unshift(208)
            }
            if(shop_profile.SHOP_IN.supList.indexOf(208) === -1){
                shop_profile.SHOP_IN.supList.unshift(208)
            }
            each(shop_high_profile.FOR_LIMIT,function(k,item,o){
                if(item.ID == 208){
                    o[k] = gift
                }
            })
            if(shop_high_profile.SHOP_OUT.selList.indexOf(208) === -1){
                shop_high_profile.SHOP_OUT.selList.unshift(208)
            }
            if(shop_high_profile.SHOP_IN.supList.indexOf(208) === -1){
                shop_high_profile.SHOP_IN.supList.unshift(208)
            }
        }
        console.log('======MOD脚本加载完成======')
    }
    setTimeout(mod, 5000)
})()