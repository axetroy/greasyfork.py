// ==UserScript==
// @name         淘宝天猫内部隐藏优惠券 页面一键领取 方便省钱工具 最多可优惠80%!
// @namespace    name_deeeeeoooi
// @version      0.4
// @description  通过淘宝客获取店家隐藏的优惠券(测试版本!)
// @author       deeeeeoooi
// @include      https://*.taobao.com/*
// @include      https://*.tmall.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==


// 2018/6/16   修复了上个版本无法显示优惠券的问题(上个版本甚至没测试!)
// 2018/6/15   加了100行代码
(function () {
    //**注意**代码非常乱
    let urlreg = /^(?:https?:\/\/)?((?:[\w\d_\-]+\.?){1,2}\w+)\/?(?:([\/\w\d]+)(?:([^/]?\.\w+)?\?([^&]?(?:&?[\w\d]+=[\w\d\S]+)+)?)?)?$/,
        qS = document.querySelector.bind(document),
        qSA = document.querySelectorAll.bind(document)

    let cE = (t, v = {}) => Object.assign(document.createElement(t), v)
    let rChild = (v) => (v.parentNode.removeChild(v), rChild)
    let aChild = (a = [], i = 0, h = cE(a[0][i], a[1][i])) => i < a[0].length - 1 && (h.appendChild(aChild(a, ++i)), h) || cE(a[0][i], a[1][i]) //和a.appendChild(b).appendChild(c).appendChild(d)差不多
    //let aChild2=(a=[],e)=>a.length>0?e.appendChild(a.shift()):e

    let debuglog = (s) => 0 && console.log(s)

    class happytb {
        constructor() {
            Object.assign(this, {
                host: 'https://tbyyyh-iii.tk/api',
                items: "",
                stype: 0,
                ur: document.URL.match(urlreg),
                hc: {},
                index: 1,
                e: qS('#happytbp'),
                First: 0
            })

            this.first().url().menu().css().idnf()

            debuglog('0')
        }
        first() {
            if (!GM_getValue("first")) {
                GM_setValue("B", 1)
                GM_setValue("C", 1)
                GM_setValue("R", 1)
                GM_setValue("first", 1)
                this.First = 1
            }
            return this
        }
        idnf() {
            let vvv = this.ur[2] + (this.ur[3] || '')
            this.fp.apply(this, vvv == 'search' ? [1, this.hc.q, +qS('#J_relative .current').innerHTML] :
                vvv == 'item.htm' && [2, this.hc.id] || [])

            if (this.ur[2] + (this.ur[3] || '') == 'search')//检查搜索页面
                setInterval(() => {
                    let v
                    if (this.index != (v = qS('#J_relative .current').innerHTML)) {
                        this.index = v
                        if (v = this.e)
                            rChild(v)
                        this.idnf()
                    }
                }, 500)
        }
        fp(n, v, l = 1, xhr = new XMLHttpRequest) {
            if (n == 1 && !GM_getValue("R") || n == 2 && !GM_getValue("C")) return
            if (n && v && l) {
                xhr.onreadystatechange = (e) => {
                    (function (e, s, t) {
                        if (this.readyState == 4) {
                            if (this.status == 200) {
                                let str
                                if (str = this.responseText)
                                    s.dd(JSON.parse(str), t)
                            } else
                                console.log('数据获取失败! code:', this.status)
                        }
                    }).apply(e.target, [e, this, n])
                }
                xhr.open('post', this.host, 1)
                xhr.send(JSON.stringify({
                    t: n,
                    q: v,
                    l
                }))
            }
        }
        dd(v, t) {
            if (t == 1 && GM_getValue("R")) {
                aChild([
                    ['div'],
                    [{
                        id: 'happytbp'
                    }]
                ], -1, qS('.grid.g-clearfix'))
                this.e = qS('#happytbp')

                for (let i = 0; i < v.length; i++) {
                    let e = qSA('.item.J_MouserOnverReq  ')[10].cloneNode(1) //复制一个
                    e.dataset.index = i

                    //删一些东西
                    rChild(e.querySelector('.pic-link.J_ClickStat.J_ItemPicA'))
                    rChild(e.querySelector('.J_ClickStat'))
                    rChild(e.querySelector('.similars'))
                    rChild(e.querySelector('.shopname.J_MouseEneterLeave.J_ShopInfo'))
                    rChild(e.querySelector('.row.row-4.g-clearfix'))

                    //加一些东西
                    e.querySelector('.pic').appendChild(cE('a', {
                        className: 'pic-link J_ClickStat J_ItemPicA',
                        target: '_blank',
                        href: v[i].click_url
                    })).appendChild(cE('img', {
                        className: 'J_ItemPic1 img',
                        src: v[i].pict_url, //img
                        alt: v[i].title
                    }))

                    e.querySelector('.row.row-2.title').appendChild(cE('a', {
                        className: 'J_ClickStat',
                        herf: v[i].click_url,
                        target: '_blank'
                    }))

                    e.querySelector('.shop').appendChild(cE('a', {
                        className: 'shopname J_MouseEneterLeave J_ShopInfo',
                        href: `//store.taobao.com/shop/view_shop.htm?user_number_id=${v[i].seller_id}`,
                        target: '_blank'
                    })).appendChild(cE('span'))

                    //改一些东西
                    e.querySelector('.report>a').href = `//jubao.taobao.com/index.htm?itemId=${v[i].num_iid}` //举报链接
                    e.querySelector('.price.g_price.g_price-highlight>strong').innerHTML = v[i].reserve_price //价格
                    e.querySelector('.deal-cnt').innerHTML = '有优惠' //付款人数  
                    e.querySelector('.row.row-2.title .J_ClickStat').innerHTML += v[i].title //标题
                    e.querySelector('.shopname.J_MouseEneterLeave.J_ShopInfo>span').innerHTML = v[i].nick //名字
                    e.querySelector('.location').innerHTML = v[i].provcity //位置
                    e.querySelector('.ctx-box.J_MouseEneterLeave.J_IconMoreNew').className = 'ctx-box J_MouseEneterLeave1 J_IconMoreNew' //???

                    this.e.appendChild(e)
                }
            }
            if (t == 2 && GM_getValue("C")) {
                let dlm, divm, ae, jzv
                let cna = this.ur[1] == 'detail.tmall.com' ? ['tm-zk-panel', '', '', '.tm-fcs-panel'] : ['tm-zk-panel', 'tb-coupon', 'J_coupon', '.tb-meta'];
                (divm = cE('div', {
                    style: 'border:2px dashed red;padding:3px;box-sizing:border-box;',
                    innerHTML: `<span style='color:purper;font-weight:bold;'>隐藏优惠券</span>: ${v.i}`,
                    className: cna[1]
                })).appendChild(cE('a', {
                    style: 'margin-left: 5px;border-bottom: 1px dotted #f40;color: #f40;',
                    innerHTML: '领取',
                    href: v.u,
                    className: cna[2]
                }))

                //divm.appendChild(ae)
                divm.innerHTML += `<p>到期时间: ${new Date(v.e).toLocaleDateString()},剩余数量: ${v.c}</p>`
                jzv = divm
                if (this.ur[1] == 'detail.tmall.com') {
                    dlm = document.createElement('dl')
                    dlm.className = cna[0]
                    dlm.appendChild(divm)

                    jzv = dlm
                }

                let em;
                (em = qS(cna[3])).insertBefore(jzv, em.childNodes[0])
            }
        }
        menu() {
            GM_registerMenuCommand('开心淘设置', this.settingw.bind(this)) //改个名
            let tbs = qS('.tb-side ul')
            if (!tbs) return this
            tbs.appendChild(cE('li')).appendChild(cE('a')).appendChild(cE('canvas', {
                id: 'htb-b',
                innerHTML: 'options',
                width: 48,
                height: 48
            }))
            let htb = qS('#htb-b')
            let ctx = htb.getContext('2d')
            ctx.translate(24, 24);

            htb.onmouseover = () => {
                //写设置
                ctx.fillStyle = '#f4f4f4'
                ctx.fillRect(-24, -24, 48, 48)
                ctx.fillStyle = '#969696'
                ctx.font = '20px Arial'
                ctx.textAlign = "center";
                ctx.fillText('设置', 0, 8)
            }
            htb.onmouseout = () => {
                //画设置图标
                ctx.fillStyle = '#f4f4f4'
                if (this.First) ctx.fillStyle = '#fbe134'
                ctx.fillRect(-24, -24, 48, 48)
                ctx.fillStyle = '#969696'
                let point = [
                    [-3, 0],
                    [-3, -12],
                    [3, -12],
                    [3, 0]
                ]
                for (let rad = 0; rad < 6.28; rad += Math.PI / 4) {
                    let cos = Math.cos(rad)
                    let sin = Math.sin(rad)
                    point.forEach(e => {
                        //忘了ctx.rotate
                        let x = e[0] * cos - e[1] * sin
                        let y = e[1] * cos + e[0] * sin
                        ctx.lineTo(x, y)
                    })
                }
                ctx.fill()
                ctx.beginPath()
                ctx.fillStyle = '#f4f4f4'
                ctx.arc(0, 0, 6, 0, Math.PI * 2)
                ctx.fill()
            }
            htb.onclick = this.settingw.bind(this)
            htb.onmouseout()
            return this
        }
        settingw() {
            let div1 = document.createElement('div'),
                div0 = document.createElement('div')
            div1.setAttribute('style', 'z-index:1000000000000000') //max(taobao.z-index)===99999999
            div0.setAttribute('style', 'z-index:0111111111111111')
            div0.addEventListener('click', () => rChild(div0) && rChild(div1))

            document.body.appendChild(div0)
            document.body.appendChild(div1)
            div1.id = 'zzzzzz'
            div0.id = 'bbb';
            this.getMenu().forEach(oo => {
                let mmdiv = document.createElement('div')
                oo.forEach(o => {
                    o = Object.assign({
                        title: '',
                        e: '',
                        html: {},
                        attr: {},
                        Attr: {},
                        event: {}
                    }, o)
                    let zd = document.createElement(o.e)
                    zd.id = Math.random().toString().substr(2).split("").map(e => ((+e + 10).toString(36))).join('') //0-9 +10=10-19=a-k
                    Object.assign(zd, o.html)
                    for (let v of Object.keys(o.attr))
                        zd.setAttribute(v, o.attr[v])
                    for (let v of Object.keys(o.Attr))
                        zd[v] = o.Attr[v]
                    for (let v of Object.keys(o.event))
                        zd.addEventListener(v, o.event[v])
                    o.before && this.GM_addStyle(o.before.replace('$id', zd.id))
                    o.after && this.GM_addStyle(o.after.replace('$id', zd.id))

                    mmdiv.appendChild(zd)
                })
                div1.appendChild(mmdiv)
            })

        }
        css() {
            GM_addStyle(`#zzzzzz{
                width: 70%;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(255, 255, 255, 0.6);
                padding: 2% 2%;
                -webkit-backdrop-filter: blur(15px);
                padding-left:5vw;
                box-shadow: 0 5px 13px 5px #828282a0;
                border-radius: 5px;
                box-sizing: border-box;
            }`)
            GM_addStyle(`#bbb{
                background: rgba(0, 0, 0, 0.4);
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
            }`)
            /*GM_addStyle(`span#htb-b{
                background-color: #f4f4f4;
                border: 1px solid #dadada;
                box-sizing:border-box;
                text-indent:0;
                font-weight: bold;
                text-align:center;
                display:flex;
                align-items:center;
                justify-content:center;
            }`)*/ //给用不了canvas的浏览器用
            GM_addStyle(`canvas#htb-b{
                border: 1px solid #dadada;
                box-sizing:border-box;
                text-indent:0;
                cursor: pointer;
            }`)
            GM_getValue("B") && GM_addStyle(`
            #happytbp{
               border: 2px solid ${GM_getValue('BC')||'red'};
               position: relative;
               overflow: hidden;
               zoom: 1;
               clear: left;
               right: 2px;
               width: 100%;
            }`)
            return this
        }
        getMenu() {
            return [
                [{
                    title: 'title',
                    e: 'p',
                    html: {
                        innerHTML: '-----这是购物插件的设置面板-----'
                    }
                }],
                [{
                    title: 'checkbox',
                    e: 'input',
                    html: {
                        innerHTML: 'checkbox',
                    },
                    attr: {
                        type: 'checkbox',
                        style: "vertical-align:middle;",
                    },
                    Attr: {
                        checked: GM_getValue("C"),
                    },
                    event: {
                        click() {
                            GM_setValue("C", this.checked)
                            console.log(GM_getValue("C"))
                        }
                    }
                }, {
                    title: '隐藏优惠券',
                    html: {
                        innerHTML: '是否显示物品隐藏优惠券?(出现在价格上方)\n',
                    },
                    attr: {
                        style: "display:inline;",
                    },
                    e: 'p',
                }],
                [{
                    title: 'checkbox',
                    e: 'input',
                    html: {
                        innerHTML: 'checkbox',
                    },
                    attr: {
                        type: 'checkbox',
                        style: "vertical-align:middle;display:box;",
                    },
                    Attr: {
                        checked: GM_getValue("R"),
                    },
                    event: {
                        click() {
                            GM_setValue("R", this.checked)
                            console.log(GM_getValue("R"))
                        }
                    }
                }, {
                    title: '格外物品?',
                    html: {
                        innerHTML: '是否显示格外物品(出现在搜索下方)?',
                    },
                    attr: {
                        style: "display:inline;",
                    },
                    e: 'p',
                }],
                [{
                    title: 'checkbox',
                    e: 'input',
                    html: {
                        innerHTML: 'checkbox',
                    },
                    attr: {
                        type: 'checkbox',
                        style: "vertical-align:middle;display:box;",
                    },
                    Attr: {
                        checked: GM_getValue("B"),
                    },
                    event: {
                        click() {
                            GM_setValue("B", this.checked)
                            console.log(GM_getValue("B"))
                        }
                    }
                }, {
                    title: '边框',
                    html: {
                        innerHTML: '是否为格外物品添加边框?',
                    },
                    attr: {
                        style: "display:inline;",
                    },
                    e: 'p',
                }],
                [{
                    title: '选择格外物品的颜色',
                    html: {
                        innerHTML: '选择格外物品的边框颜色',
                    },
                    attr: {
                        style: "display:inline;",
                    },
                    e: 'p',
                }, {
                    title: '格外物品的颜色',
                    html: {
                        innerHTML: `<option value="red">红</option>
                        <option value="green">绿</option>
                        <option value="blue">蓝</option>
                        <option value="none">无</option>`,
                    },
                    attr: {
                        //style: "vertical-align:middle;display:box;",
                    },
                    event: {
                        change() {
                            GM_setValue("BC", this.value)
                            console.log(GM_getValue("BC"))
                        }
                    },
                    e: 'select',
                }]
            ]
        }
        url() {
            this.ur = document.URL.match(urlreg)
            this.ur[4].split('&').forEach(e => (o => this.hc[o[0]] = decodeURI(o[1]))(e.split('='))) //获取参数
            return this
        }
    }
    self == top && (document.body.onload = () => new happytb()) //
})();