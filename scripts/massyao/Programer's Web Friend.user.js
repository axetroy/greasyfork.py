// ==UserScript==
// @name         Programer's Web Friend
// @namespace    https://tampermonkey.net/
// @version      3.0.1
// @description  change Programer's Web style to mobile device friendly ,and more readble
// @author       @Amormaid
// @run-at       document-end
// @match        http://*/*
// @include     http://*
// @include     https://*
// @exclude     http://localhost*
// @license     MIT License
// @grant       none
// ==/UserScript==


main()

function main() {
  // var root = document.body;
  // var hostname = /\d+\.\d+\.\d+\.\d+/.test(window.location.hostname) ? "ip": window.location.hostname;
  var hostname = window.location.hostname;

  if (exclude_check(hostname)) {
    return
  }

  // console.clear();

  try {
    console.time("allen_web_time_count");

    // customer change
    let rule = customer_rule(hostname)
    rule && rule.action()
    // main_content_adjust(obj.main_ele);
    var {main_ele} = main_ele_searcher();
    content_purge(main_ele)
    // ele_remover(main_content);
    // full window
    // document.body.style.cssText = "position:absolute; top:0;right:0; bottom:0;left:0;"
    // document.body.style.width = window.innerWidth
    // document.body.style.height = window.innerHeight

    change_style();
    console.timeEnd("allen_web_time_count");
  } catch(err) {
    //console.log(err.name,' ',err.message);
    console.log(err.message);
  }
}

//  white list check
function exclude_check(hostname_param) {
  // 不执行脚本的网站白名单
  let exclude_list = [
      "www.youtube.com",
      "demo.mycodes.net",
      "kiwivm.64clouds.com",
      "www.instagram.com",
      "www.h-ui.net",
      "www.layui.com",
      "www.kixeye.com",
      "pan.baidu.com",
      "www.rishiqing.com",
      "wx.qq.com",
      "mail.126.com",
      "twitter.com",
      "reactjs.org",
      "codepen.io",
      "free.modao.cc",
      "lanhuapp.com",
      "developers.weixin.qq.com",
      "jira.vankeservice.com",
      "www.tapd.cn",
      "modao.cc",
      "element-cn.eleme.io",
      "github.com",
      ""
  ]
  return exclude_list.includes(hostname_param)
}

// 自定义样式调整
function customer_rule(hostname) {
  let rules = [
    {
      rule: "default",
      hostname: "ip",
      regexp: "",
      action: () => {}
    },
    {
      rule: "default",
      hostname: "wc-kx-vip.sjc.kixeye.com",
      regexp: "",
      action: () => {
        _$('#above-game-message', 'remove_one');
        _$('#kxp-footer-bar', 'remove_one');
        _$('#topnavbar_back', 'remove_one');
      }
    },
    {
      rule: "default",
      hostname: ["www.baidu.com", "zhidao.baidu.com"],
      regexp: "",
      action: () => {
        let interval_id = setInterval( () => {
          const right_list_length = 5
          _$("#content_right", 'remove_all');
          var zhidao_body = _$("#body", "return_one");
          var container = _$("#container", "return_one");
          var head = _$("#head", "return_one");
          var pad = _$("#s_tab", "return_one");
          _$("#rs", "remove_all")
          var u = _$("#u", "return_one");
          container.style.cssText = "display:block;width:100%;position:relative;"
          head && (() =>  {
            head.style.position = 'relative';
            head.style.width = window.innerWidth - 100 + 'px';
            head.style['min-width'] = 0;
          })();
          pad && (() =>  {
            pad.style.padding = '0 0 0 121px'
          })();
          u && (() =>  {
            u.style.display = 'none'
          })();
          zhidao_body && (() =>  {
            zhidao_body.style.left = "50px"
          })();

          let origin_length = document.getElementById("content_left").children.length

          if (origin_length > 6) {
            // console.log(content_list)
            let right_list = Array.prototype.slice.call(_$(".result", "return_all"),-1 - right_list_length, -1)
            let container_r = document.createElement("div")
            container_r.style.cssText += "display:block;position:absolute;top:40px;left:740px;width:600px;"
            // let str = Array.prototype.reduce.call(right_list, (html_str, item ,index , right_list) => (item.innerHTML + html_str), '')
            Array.prototype.forEach.call(right_list, item => {
              item.style.cssText += "padding:10px 0;"
              container_r.appendChild(item)
            })
            let container_r_dom = container.appendChild(container_r)
            let page_indic = _$("#page", "return_one")
            page_indic.style.cssText = "position:absolute;top:0px;left:660px;margin:-60px 0 0 0;z-index:300"
          }

        },300)
      }
    },
    {
      rule: "default",
      hostname: ["i.taobao.com", "trade.taobao.com", "rate.taobao.com", "buyertrade.taobao.com"],
      regexp: "",
      action: () => {
        _$(".m-guess-you-like", "remove_one");
        _$(".m-someone-like-you", 'remove_one');
        _$("#p4p_ad", 'remove_one');
        _$(".J_guess-you-like", 'remove_one');
      }
    },
    {
      rule: "default",
      hostname: ["www.cnblogs.com", "blog.csdn.net"],
      regexp: "",
      action: () => {
        _$('.btn-close', 'return_one').click();
        _$('#btn-readmore', 'return_one').click();
        _$('.recommend-box', 'remove_one')
        let main = _$('main', 'return_one')
        document.body.style.backgroundImage = 'none';
        document.body.style.color = '#fff'
        document.body.innerHTML = ''
        // document.body.style.cssText = 'background-image: "none" ;'
        document.body.appendChild(main)
        main.style.cssText = 'width: 900px; float: left; margin: 0 auto 0 120px;'

        console.log('dasdasda is ', _$('p', 'return_all'))
        Array.from(_$('p', 'return_all')).forEach(e => e.style.color = '#fff')

        /*
        setTimeout(() => {
          _$('aside', 'remove_one')
          _$(".adblock", "remove_one");
        },2000)

        var content = _$("#content", "return_one");
        _$("#sidebar", "remove_one");
        _$("#side", 'remove_one');

        content && (() =>  {
          content.style["margin-right"] = "10";
          content.style.width = window.innerWidth - 100 + 'px';
        })();

        let article = _$("#article_content", "return_one");
        article && (() => {
          article.style.height = "100%";
          article.style.overflow = "visible";
        })()
        _$(".recommend-item-box", "remove_all");
        _$(".hide-article-box", "remove_one");
        _$("aside", "remove_one");
        let main = _$("main", "return_one")
        if (main) main.style.float = "left";
        setTimeout(() => {
          _$(".adblock", "remove_one");
        },
        3000)
        _$(".pulllog-box", "remove_one");
        */
      }
    },
    {
      rule: "default",
      hostname: "www.w3school.com.cn",
      regexp: "",
      action: () => {
        _$("#navsecond", 'hide_one');
      }
    },
    {
      rule: "default",
      hostname: "wallstreetcn.com",
      regexp: "",
      action: () => {
        setInterval(() =>  {
          _$('.news-item__cover', 'remove_all');
          _$('.qn-img', 'remove_all');
          //  console.log(new Date() - 0)
          change_style();
        },
        500);

        let main = _$('main', 'return_one');
        document.body.innerHTML = '';
        document.body.appendChild(main);

        _$('.left-bar', 'remove_one');
      }
    },
    {
      rule: "default",
      hostname: "www.merriam-webster.com",
      regexp: "",
      action: () => {
        _$(".right-rail", 'hide_one');
        _$("#recirc-bar-footer", 'hide_one');
        _$(".wgt-related-to.jc-card-box.clearfix", 'hide_one');
      }
    },
    {
      rule: "default",
      hostname: "blog.sina.com.cn",
      regexp: "",
      action: () => {
        _$("#column_1", 'hide_one');
      }
    },
    {
      rule: "default",
      hostname: ["blog.jobbole.com", "web.jobbole.com"],
      regexp: "",
      action: () => {
        _$("#sidebar", 'hide_one');
        var grid = _$(".grid-8", 'return_one');
        grid && (() =>  {
          grid.style.width = "100%"
        })();
      }
    },
    {
      rule: "default",
      hostname: "juejin.im",
      regexp: "",
      action: () => {
        var interval_id = setInterval(() =>  {
          var a = _$(".show-full", 'return_one');
          var b = _$(".show-full-block", 'return_one');
          _$(".show-full-btn", 'remove_one');
          _$('.columen-view-aside', 'hide_one');

          if (a) a.style.height = "auto";
          a && a.setAttribute('style', 'height:auto')
          if (b) {
            clearInterval(interval_id);
            b.setAttribute('style', 'height:auto')
          }
        },
        100);
        setInterval(change_style, 300)
      }
    },
    {
      rule: "default",
      hostname: "www.cnblogs.com",
      regexp: "",
      action: () => {
        _$("#sideBar", 'hide_one');
        _$("#vid", 'hide_one');
        _$("#left", 'hide_one');
        _$("#right_content", 'hide_one');
        _$("#leftcontent", 'hide_one');
        var a = _$("#centercontent", 'return_one');
        if (a) {
          a.style['padding-left'] = 0;
        }
      }
    },
    {
      rule: "default",
      hostname: "github.com",
      regexp: "",
      action: () => {
        document.body.style.minWidth = '100px';
        var github_pad = document.querySelector('.column.three-fourths.codesearch-results.pr-6');
        if (github_pad) {
          github_pad.style.padding = '10px 0 10px 30px';
        }
      }
    },
    {
      rule: "default",
      hostname: "wiki.jikexueyuan.com",
      regexp: "",
      action: () => {
        _$(".detail-left", 'hide_one');
        var a = _$(".detail-main", 'no_option', 'one');
        a.style['margin-left'] = '0px';
        a.style.width = document.body.clientWidth + 'px';
      }
    },
    {
      rule: "default",
      hostname: "www.cssmoban.com",
      regexp: "",
      action: () => {
        var a = _$(".wide-main.col-media-main.clearfix", 'return_one');
        a.style.width = document.body.clientWidth + 'px';
      }
    },
    {
      rule: "default",
      hostname: "www.kancloud.cn",
      regexp: "",
      action: () => {
        var interval_id = setInterval(() =>  {
          var a = _$(".sidebar", 'return_one');
          if (a) {
            _$(".workspace", 'return_one').style.left = "180px";
            a.style.width = '180px';
            change_style(a);
            clearInterval(interval_id);
          }
        },
        100);
      }
    },
    {
      rule: "default",
      hostname: "php.net",
      regexp: "",
      action: () => {
        _$('.layout-menu', 'remove_one');
        if (_$(".sect1", 'return_one')) _$(".sect1", 'return_one').style.width = document.body.clientWidth - 50 + "px";
        if (_$("#usernotes", 'return_one')) _$("#usernotes", 'return_one').style.width = document.body.clientWidth - 50 + "px";
      }
    },
    {
      rule: "default",
      hostname: "www.zhihu.com",
      regexp: "",
      action: () => {
        _$('.Question-sideColumn.Question-sideColumn--sticky', 'remove_one');
        _$('.AdblockBanner-inner', 'remove_one');
        _$('.QuestionHeader-side', 'remove_all');
        _$('.AppHeader-userInfo', 'remove_all');

        var browser_width = document.body.clientWidth - 50 + "px";
        _$('.QuestionHeader-content', 'return_one').style.width = browser_width;

        setInterval(() =>  {
          _$('.HitQrcode', 'remove_one');
        },
        100);
      }
    },
    {
      rule: "default",
      hostname: "www.letscorp.net",
      regexp: "",
      action: () => {
        _$('#commentlist', 'remove_one');
        _$('#sidebar', 'remove_one');
        _$('#header', 'remove_one');

        var browser_width = document.body.clientWidth - 50 + "px";
        _$('#container', 'return_one').style.width = browser_width;
        _$('#main', 'return_one').style.height = "auto";
        var p_ele = _$('p', 'return_all');
        Array.prototype.forEach.call(p_ele,
        function(e) {
          e.style["font-size"] = "16px";
        });
      }
    },
    {
      rule: "default",
      hostname: "segmentfault.com",
      regexp: "",
      action: () => {
        _$("#loginBanner", "remove_one");
      }
    },
    {
      rule: "default",
      hostname: "huziketang.mangojuice.top",
      regexp: "",
      action: () => {
        for (var i = 0; i < 10000; i++) {
          clearInterval(i);
        }-
        _$("div", "return_all").forEach(function(ele) {
          if (ele.id && ele.id !== "wrapper" && ele.id !== "uyan_frame" && ele.id !== "donate-mask") {
            ele.parentNode.removeChild(ele);
          }
        });
      }
    },
    {
      rule: "default",
      hostname: "lvv2.com",
      regexp: "",
      action: () => {
        if (_$(".link.show", "return_all")) {
          _$(".link.show", "return_all").forEach(function(ele) {
            if (ele.querySelector('a.title')) {
              // console.log(ele.querySelector('a.title').innerHTML)
              ele.querySelector('a.title').style.fontSize = '16px'
              var title = ele.querySelector('a.title').innerHTML
              var porn_list = ['日', '勾引', '野外', '肏', '抽插', '公厕', '舔', '茎', '肛', '奴', '约炮', '母狗', '调教', '草', '鸡巴', '小受', '口爆', '野战', 'SM', 'sm', '贱货', '被虐', '淫', '内裤', '屁眼', '蕾丝', '姿势', '体位', '色情', '骚', '屌', '淫荡', '射', '艹', '丝袜', '情色', '调情', '做爱', '操', '捆绑', '挑逗', '绿帽', '潮喷', '援交', 'jj', 'JJ', '潮吹', '3p', '3P', '腰', '臀', '肉棒', '啪啪', '圣水']
              var politic_list = ['中共', '土共', '民主', '法治', '天安门', '老兵', '自由', '殴打', '近平', '奴隶', '道德', '强拆', '法律', '监狱', '城管', '土匪', '毛腊肉', '老毛', '专制', '社会主义', '党中央', '统治', '酷刑', '党员', '人民', '民族', 'P2P', '普京', '英雄', '纳税', '维权', '执法', '警察', '独裁', '政府', '郭文贵', '文革', '武装', '共产', '垬', '毛泽东', '政权', '枪', '举报', '恐怖', '宗教', '卖国', '死', '软禁']
              var key_word_list = porn_list.concat(politic_list)
              var porn_detection = key_word_list.some(function(ele) {
                return title.indexOf(ele) > -1
              })
              porn_detection && ele.parentNode.removeChild(ele)
              // ele.parentNode.removeChild(ele);
            }
          });
        }
      }
    },
    {
      rule: "default",
      hostname: "jandan.net",
      regexp: "",
      action: () => {
          // html 调色
          let _html = _$('html', 'return_one')
          let _body = _$('body', 'return_one')
          _html.style.backgroundColor = '#333'
          _body.style.backgroundColor = '#333'
          // 去掉某些ID的发图
          let title_list = document.querySelectorAll("[title^=防伪码]")
          let block_user_list = ["42c968079f1cc3495692a053f432e105142a3142"]
          Array.prototype.forEach.call(title_list, (titleDOM) => {
              let author_id = titleDOM.title.replace(/[\u4e00-\u9fa5]{3}：/, '') // 装B正则
              if (block_user_list.includes(author_id)) {
                  let remove_div = titleDOM.parentNode.parentNode.parentNode.parentNode
                  remove_div.parentNode.removeChild(remove_div)
              }
          })
      }
    },
    {
      rule: "default",
      hostname: "10.0.74.227",
      regexp: "",
      action: () => {
          setTimeout( _ => {
              let title_list = document.querySelectorAll(".opblock-tag")
              Array.prototype.forEach.call(title_list, (titleDOM) => {
                  titleDOM.click()
              })
          }, 10 * 1000)
      }
    },
  ]


  let matched_rule = rules.filter( rule_item => rule_item.hostname instanceof Array
    ? rule_item.hostname.includes(hostname)
    : rule_item.hostname === hostname
  )[0]

  return matched_rule
}

//window.frames
//Array.prototype.slice.call(ele)

//寻找页面的主要内容
function main_ele_searcher() {
  let article = document.getElementsByTagName('article')
  let main = document.getElementsByTagName('main')
  let content = (article.length && article[0]) || (main.length && main[0]) || false
  if (content) {
    return {
      main_ele: content,
      body_width: content.style.width,
      body_height: content.style.height
    };
  }

  var ele = document.querySelectorAll("*");
  var arr = [];
  //var  arr_index = [];
  var w, h;

  var body_width = document.body.clientWidth;
  var body_height = document.body.clientHeight;

  if (!body_height) {
      var max_width = 0, max_height = 0;
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';

      for (let i = 0, ele_length = ele.length; i < ele_length; i++) {
          w = ele[i].clientWidth;
          h = ele[i].clientHeight;
          if (w > max_width) { max_width = w; }
          if (h > max_height) { max_height = h; }
          w = null;
          h = null;
      }
      body_width = max_width;
      body_height = max_height;
  }


  for (let i = 0, ele_length = ele.length; i < ele_length; i++) {
      w = ele[i].clientWidth;
      h = ele[i].clientHeight;
      //console.log(h);

      if (w && h && w > body_width / 2 && h > body_height / 5 && w < body_width && h < body_height) {
          arr[w * h] = ele[i];
          //console.log(ele[i]);
          //arr_index.push(w * h);
      }
      w = null;
      h = null;
  }
  var main_ele = arr[arr.length - 1] || document.body;
  return {
      main_ele,
      body_width,
      body_height
  };
}


function content_purge(main_ele) {
  let main = main_ele;
  main.style.cssText = 'width: 900px;margin: 40px 0 0 120px;float: left; ';
  // main.parentNode.removeChild(main)
  // Array.from(document.body.children)
  document.body.insertBefore(main, document.body.firstChild);

}

//去除侧边栏这样“狭长”的内容
function ele_remover(obj) {
    var w, h;
    var { main_ele, body_width, body_height } = obj;
    var ele = document.querySelectorAll("*");
    //console.log(main_ele,body_width, body_height )
    for (let i = 0, ele_length = ele.length; i < ele_length; i++) {
        w = ele[i].clientWidth;
        h = ele[i].clientHeight;
        //  main_ele.parentNode.children
        if (!ele[i].contains(main_ele) && !main_ele.contains(ele[i]) && (ele[i] !== main_ele) && w * 1.4 < h && w < body_width / 2 && w > body_width / 10) {
            //content_adjust(ele[i]);
            console.log("---------element   removed ------------");
            console.log(ele[i]);
            console.log("---------element   removed ------------");

            ele[i].parentNode.removeChild(ele[i]);
        }
        w = null;
        h = null;
    }
}

//去除被移除元素的兄弟元素的padding  margin
function content_adjust(ele) {
    var siblings = ele.parentNode.children;
    ele.parentNode.style.position = "relative";
    // console.log(ele);
    for (let i = 0, ele_length = siblings.length; i < ele_length; i++) {
        //console.log(siblings[i]);
        siblings[i].setAttribute('style', 'position:relative;padding:20px;margin:0px;overflow:visible;');
    }
}


//调整主要内容的样式
function main_content_adjust(main_ele) {
    //var a = [{x,y,top,right,bottom,left,width}]=main_ele.getClientRects();
    main_ele.parentNode.style.position = "relative";
    main_ele.style.cssText = "position:absolute; top:0;right:0; bottom:0;left:0;"
    // main_ele.setAttribute('style','position:relative;padding:20px 20px 20px 40px;margin:auto;clear:both;overflow:visible;');
    var ratio = 0.9 * (window.innerWidth) / main_ele.clientWidth;
    var ele = main_ele.querySelectorAll('*');
    // console.log(ele);
    for (let i = 0, ele_length = ele.length; i < ele_length; i++) {
        ele[i].style.width = ele[i].clientWidth * ratio + "px";
        ele[i].style.overflow = 'visible';
        //console.log(i);
    }

}



// body 全屏
function full_body() {
  let root = document.body
  root.style.cssText = "position:absolute; top:0;right:0; bottom:0;left:0;"

}
//背景调色
function change_style(DOM_node = document.body) {
    return
    //  执行速度 ：  for 循环 > forEach > 尾递归 >递归 (迭代)
    let background_base_color = 50;
    let background_offset = 20;
    let font_base_color = 230;
    let font_offset = 20;
    var all = (DOM_node  || document).querySelectorAll('*');
    for (let i = 0, ele_length = all.length; i < ele_length; i++) {
        let item = all[i]
        let item_style = item.style
        let tag_exclude_check = !('script,style,img').includes(item.nodeName.toLowerCase())
        if(tag_exclude_check && !item_style.backgroundColor){
            item_style.backgroundColor =  random_color(background_base_color,background_offset);
            item_style.color =  random_color(font_base_color,font_offset);
        }
    }
    /*
    let background_base_color = 40;
    let background_offset = 20;
    let font_base_color = 200;
    let font_offset = 50;
    let html_str  = DOM_node.innerHTML ;
    //  匹配速度 string.indexOf > string.match
    // let html_str  = DOM_node.innerHTML.replace(/\&/g,'') ;
    // var all = (new DOMParser()).parseFromString(html_str, "text/xml");
    let html_str_arr = html_str.split(">");
    let new_html_str_arr = html_str_arr.map((item, index) => {
        if(item.indexOf('</') > 0) {return item }
        if(!item.match(/\<div|\<form|\<table|\<dl|\<ol|\<ul|\<pre|\<h|\<a|\<p|\<code|\<em|\<span|\<td|\<th|\<input|\<textarea/i)) {return item }
        let font_color_str = ";color:"+random_color(font_base_color,font_offset);
        if(item.indexOf('background-color') > 0) {
            let reg = /background-color\s*\:\s*[\w\,\(\)\#]+/;
            let str = 'background-color:' + random_color(background_base_color,background_offset) + font_color_str;
            return item.replace(reg, str)
        }
        if(item.indexOf('background') > 0) {
            let reg = /\#[^\s]+|rgb[^\)]+\)/;
            let str = random_color(background_base_color,background_offset);
            return item.replace(reg, str).replace(/(style=(["'])[^'"]+)\2/,"$1" + font_color_str + "$2")
        }
        return  `${item} style="background-color:${random_color(background_base_color,background_offset)}${font_color_str}"`;
    })

    DOM_node.innerHTML = new_html_str_arr.join(">")
    DOM_node.style.backgroundColor = random_color(background_base_color,background_offset);
    */
}

function random_color(base_color, offset, ratio=1){
    base_color = (base_color & 255) === (~~base_color) ? ~~base_color : 255;
    offset = ~~offset
    offset = (base_color+offset > 0 && base_color+offset < 256)? offset : 0
    return `rgba(${(base_color + offset*Math.random())&255},${(base_color + offset*Math.random())&255},${(base_color + offset*Math.random())&255},0.8)`;
}


function ele_hide(e) {
    // if (document.body.hasChildNodes(e)) e.style.display = "none";
    document.body.hasChildNodes(e) && e.length !== 0 && e.style.setAttribute('display', "none");
}
function ele_hide_all(all) {
    Array.prototype.forEach.call(all, function (e) { e.style.display = "none"; });
}
function ele_remove(e) {
    // if (document.body.hasChildNodes(e)) e.parentNode.removeChild(e);
    e = e.length ? e[0] : e
    document.body.hasChildNodes(e) && e.length !== 0 && e.parentNode.removeChild(e);
}
function ele_remove_all(all) {
    if (all) {
        all = Array.from(all)
    }
    if (!all.length) {
        return
    }
    Array.prototype.forEach.call(all, function (e) {
        e instanceof Object && e.parentNode.removeChild(e);
    });
}


function _$(selector, operation_code) {
    // operation_code  : return_one return_all remove_one remove_all hide_one hide_all
    function get(selector) {
        if((/^#[^.#]+$/).test(selector)) {
           return [document.getElementById(selector.slice(1, selector.length))]
        }
        if((/^\.[^.#]+$/).test(selector)) {
           return document.getElementsByClassName(selector.slice(1, selector.length))
        }
        if((/^[^.#]+$/).test(selector)) {
           return document.getElementsByTagName(selector)
        }
    }
    switch (operation_code) {
        case 'return_one': //return_one
            // return document.querySelector(selector);
            return get(selector)[0];
        case 'return_all':// return_all
            // return document.querySelectorAll(selector);
            return get(selector);
        case 'remove_one':  //remove_one
            // ele_remove(document.querySelector(selector));
            ele_remove(get(selector));
            break;
        case 'remove_all': //remove_all
            // ele_remove_all(document.querySelectorAll(selector));
            ele_remove_all(get(selector));
            break;
        case 'hide_one': //hide_one
            // ele_hide(document.querySelector(selector));
            ele_hide(get(selector));
            break;
        case 'hide_all':// hide_all
            // ele_hide_all(document.querySelectorAll(selector));
            ele_hide_all(get(selector));
            break;

        default:
            // var result = document.querySelectorAll(selector);
            var result = get(selector);
            return result.length > 1 ? result : result[0];
    }
}


function remove_div_padding_margin(ele) {
    if (ele) {
        ele.setAttribute('style', 'overflow:visible;position:relative;padding:0px;margin:0px;left:0px;');
    }
    if (ele && ele.children.length > 0) {
        Array.prototype.forEach.call(ele.children, (function (e) {
            remove_div_padding_margin(e);
        }));
    }
}

function content_get() {
    var ajax = new XMLHttpRequest();
    ajax.open('get', '/');
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            content_new = ajax.responseText;
            //console.log(content_new);
            content_old = content_old || content_new;
            if (content_new !== content_old) {
                location.reload();
            }
        }
    };

    setTimeout(content_get, 1000);
}
