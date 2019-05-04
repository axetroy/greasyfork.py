// ==UserScript==
// @name         百度blur搜索框
// @version      2.3.2
// @description  百度搜索框背景模糊
// @author       L
// @include      *://*baidu.com/s?*
// @include      *://*baidu.com/*wd*
// @include      *://*baidu.com/search/*
// @grant        none
// @namespace http://tampermonkey.net/
// ==/UserScript==

(function() {
    'use strict';
    $("head").append("<style> #page .fk,a .fk{display:none}  body,#head{background:#eee}  #s_tab{height:47px} .c-container:hover{box-shadow: 5px 5px 7px #ccc;} .c-container>div{margin:10px 0} .c-container{background:#fafafa;padding:20px;border-radius: 5px;box-shadow: 5px 5px 7px #ddd;transition:all 0.3s} em{    color: #ce4343;} .c-container a,.c-container em,#u a{text-decoration:none!important;} a{color:#4879BD} #rs{background:none;padding:20px} #rs a{text-decoration:none} #page a, #page strong{height:auto;background:none;border:none} #page .pc,#page .n{border: 1px solid #eee;} #s_tab{background:none} .wrapper_s .s_ipt_wr,.s_ipt_wr.bg{background:white} .c-border{border: none;    box-shadow: none;} #foot,#help{background:none}</style>");

    $(window).load(function(){


    var updata =1;
    var subHeight =  $('#head').outerHeight();
    var fg = 0;
    var right = localStorage.getItem('blur-right');
    if(right == undefined){
        right = 0
        localStorage.setItem('blur-right',0);
    }


      
        if(subHeight < 75){
            $("head").append("<style>#u{margin-top:30px} #head{padding: 15px 0;top:0} </style>");
            subHeight =  $('#head').outerHeight();
            fg = 1;
        }

        if($('#u').css('margin-top') == '21px'){$('#u').css('margin-top','0')}


    $("#result_logo img").attr('src','data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAxIDMzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDEgMzM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNDg3OUJEO30KCS5zdDF7ZmlsbDojREQ0NDM2O30KCS5zdDJ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTUwLjQsMTUuM2MtMy44LDAuMy00LDIuNi01LjcsNC43Yy0xLjgsMi4yLTUuNSw0LjEtNiw2LjdjLTAuNiwzLjMsMS4zLDUuMSwzLDUuN2MxLjksMC42LDYuMi0wLjUsOC40LTAuNWgwLjIKCWgwLjJjMi4yLDAsNi40LDEuMSw4LjQsMC41YzEuOC0wLjYsMy41LTMuMiwzLTUuN2MtMC40LTIuMS00LjQtNC41LTYuMi02LjdDNTQuMiwxOCw1NC4zLDE1LjYsNTAuNCwxNS4zeiBNMzcsMTQuOAoJYzAsMi40LDEuNiw0LjMsMy40LDQuM2MxLjksMCwzLjQtMS45LDMuNC00LjNjMC0yLjQtMS42LTQuMy0zLjQtNC4zUzM3LDEyLjUsMzcsMTQuOHogTTQzLjksOC42YzAsMi41LDEuNSw0LjUsMy4zLDQuNQoJYzEuOCwwLDMuMy0yLjEsMy4zLTQuNVM0OSw0LjEsNDcuMSw0LjFDNDUuMyw0LDQzLjksNiw0My45LDguNnogTTUyLjIsOC41YzAsMi4zLDEuNCw0LjMsMy4yLDQuM3MzLjItMS45LDMuMi00LjNzLTEuNC00LjMtMy4yLTQuMwoJUzUyLjIsNi4yLDUyLjIsOC41eiBNNTcuNSwxNS45YzAsMi4zLDEuNSw0LjMsMy4zLDQuM2MxLjgsMCwzLjMtMS45LDMuMy00LjNzLTEuNS00LjMtMy4zLTQuM0M1OC45LDExLjYsNTcuNSwxMy42LDU3LjUsMTUuOXoiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTQsMzAuNHYtNS4xaDYuNGMxLjYsMCwxLjYsMC4zLDEuNiwydjEuNGMwLDEuNi0yLjMsMS44LTMuOSwxLjhMNCwzMC40TDQsMzAuNHogTTQsMjN2LTQuOGg0LjEKCWMxLjYsMCwzLjksMCwzLjksMi4xdjAuMWMwLDEuNC0wLjUsMi42LTEuOCwyLjZDMTAuMywyMyw0LDIzLDQsMjN6IE0xLjcsMTZ2MTYuM2g2LjRjMywwLDYuMiwwLDYuMi0zLjZ2LTEuMWMwLTEuNi0wLjEtMi43LTEuMS0zLjUKCWMxLTAuOCwxLjEtMi4zLDEuMS0zLjZsMCwwYzAtNC41LTMuMi00LjUtNi4yLTQuNUwxLjcsMTZMMS43LDE2eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUsMjguOWMtMS4xLDEuMS0zLjMsMS4zLTMuNSwxLjNjLTEuMywwLTIuNy0wLjUtMi43LTIuMWMwLTEuNCwwLjUtMi4zLDIuMS0yLjNjMS4zLDAsMi44LDAuMSw0LjEsMC42VjI4Ljl6CgkgTTIxLjQsMzIuM2MwLjQsMCwyLjMtMC4xLDMuNy0wLjlsMC4yLDAuN2gyLjF2LTguOWMwLTMuNi0yLjMtNS01LjctNWMtMS44LDAtNC4zLDAuNy00LjcsMC45bDAuNCwyLjNjMS42LTAuNiwzLTAuNiw0LjItMC42CgljMS44LDAsMy4zLDAuNiwzLjMsMi42VjI0Yy0xLTAuNC0yLjQtMC42LTQuMS0wLjZjLTMsMC00LjUsMS42LTQuNSw0LjdDMTYuNCwzMS44LDE5LjYsMzIuMywyMS40LDMyLjN6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zMC4yLDE2LjFjMCwwLjYsMC42LDEuMiwxLjMsMS4yYzAuOCwwLDEuMy0wLjYsMS4zLTEuMmMwLTAuNy0wLjYtMS4zLTEuMy0xLjNDMzAuOCwxNC44LDMwLjIsMTUuMywzMC4yLDE2LjF6CgkgTTMwLjMsMzIuMWgyLjRWMTguNWgtMi40VjMyLjF6Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03MS4yLDIyLjFoOC40YzAuNCwwLjEsMC42LDAuMywwLjYsMC43djIuNmgtOS43di0yLjZDNzAuNiwyMi40LDcwLjgsMjIuMiw3MS4yLDIyLjF6IE03MS4yLDMwLjUKCWMtMC40LDAtMC42LTAuMy0wLjctMC44di0yLjZoOS43djIuNmMwLDAuNC0wLjIsMC43LTAuNiwwLjdINzEuMnogTTczLjYsMThjLTAuMSwwLjQtMC4xLDAuOS0wLjQsMS43Yy0wLjEsMC4zLTAuMSwwLjUtMC4xLDAuNwoJaC0yLjZjLTEuMywwLjEtMS45LDAuOC0yLDJ2Ny45YzAuMSwxLjEsMC44LDEuOCwyLDEuOWgxMGMxLjItMC4xLDEuOC0wLjcsMS45LTEuOHYtNy45Yy0wLjEtMS4zLTAuNy0xLjktMS45LTIuMWgtNQoJYzAuMS0wLjMsMC4xLTAuOCwwLjMtMS40YzAuMS0wLjQsMC4xLTAuNywwLjEtMC45aDcuMnYtMS44SDY3LjRWMThMNzMuNiwxOEw3My42LDE4eiIvPgo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOTMuNywyMi43Yy0wLjQtMC4xLTAuNS0wLjItMC41LTAuNXYtMC42aDMuMnYwLjZjLTAuMSwwLjMtMC4yLDAuNC0wLjUsMC41SDkzLjd6IE05Ni42LDI0LjEKCWMxLjEtMC4xLDEuNi0wLjUsMS42LTEuNHYtMWgyLjN2LTEuNWgtMi4zdi0xLjFoLTEuOHYxLjFoLTMuMnYtMS4xaC0xLjh2MS4xaC0yLjN2MS41aDIuM3YxYzAuMSwwLjksMC42LDEuNCwxLjYsMS40SDk2LjZ6CgkgTTk0LjgsMzAuNGMxLjYsMC44LDMuNCwxLjMsNS40LDEuOGwwLjktMS43Yy0xLjQtMC4yLTIuOS0wLjYtNC40LTEuMWMxLjEtMC44LDItMS42LDIuNy0yLjVjMC4zLTAuNCwwLjQtMC45LDAuMi0xLjMKCWMtMC4zLTAuNi0wLjgtMC45LTEuNC0wLjloLTl2MS41aDcuN2MwLjIsMCwwLjQsMC4xLDAuNCwwLjFzMCwwLjEtMC4xLDAuM2MtMC42LDAuNi0xLjQsMS4zLTIuMywxLjhjLTEuMi0wLjctMi4xLTEuMy0yLjQtMS44aC0yLjIKCWMwLjksMSwxLjgsMS45LDIuOSwyLjdjLTEuNiwwLjYtMy4zLDEuMS00LjksMS4zbDAuOSwxLjZDOTEuMywzMS44LDkzLjIsMzEuMSw5NC44LDMwLjR6IE04OC4zLDI1LjJ2LTZjMC4xLTAuNiwwLjMtMC45LDAuOC0wLjkKCWgxMS44di0xLjZIOTVjLTAuMS0wLjEtMi4yLTAuMS0yLjIsMGgtNC43Yy0xLjEsMC4xLTEuNywwLjktMS44LDIuMlYyNWMwLjEsMi4xLTAuNCw0LjQtMS4xLDYuN2wxLjksMC42CglDODcuOSwyOS45LDg4LjMsMjcuNiw4OC4zLDI1LjJ6Ii8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00Ni4zLDI0LjJjMC42LDAsMS4yLDAuMSwxLjcsMC40djMuNGMwLDAuMy0wLjYsMS0xLjksMWMtMS41LDAtMS44LTAuNi0xLjgtMi4xdi0wLjYKCUM0NC4yLDI0LjgsNDQuNywyNC4yLDQ2LjMsMjQuMnogTTQ5LjIsMjAuN0g0OHYyLjVDNDcuNiwyMy4xLDQ3LDIzLDQ2LjMsMjNjLTIuNywwLTMuMywxLTMuMywzLjV2MC4zYzAsMi40LDAuOSwzLjMsMy4yLDMuMwoJYzAuOCwwLDEuMy0wLjEsMS44LTAuNWwwLjEsMC42aDEuMUw0OS4yLDIwLjdMNDkuMiwyMC43eiIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNTYuNywyM2gtMS4ydjUuMmMtMC42LDAuNC0xLjcsMC42LTIuNCwwLjZjLTAuOCwwLTEtMC40LTEtMS4zdi00LjZoLTEuMXY0LjhjMCwxLjYsMC41LDIuMywyLjEsMi4zCgljMSwwLDIuMS0wLjMsMi42LTAuNmwwLjEsMC42aDEuMVYyM3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTkyLjcsMTUuN2MwLTAuNywwLjYtMS4zLDEuMi0xLjNjMC42LDAsMS4yLDAuNiwxLjIsMS4zUzk0LjUsMTcsOTMuOSwxN0M5My4zLDE2LjksOTIuNywxNi4zLDkyLjcsMTUuN3oiLz4KPC9zdmc+Cg==');
        $("#result_logo").click(function(){location.href = "www.baidu.com"})
    function navBgStart(){
        $('#content_left>div:not(.c-container):not(#super_se_tip)').remove();
        $("#con-ar").next().remove();
        $(".t>a").click(function(){ window.open($(this).attr('href')); return false; })
        //$("#content_right").remove();
        var top = -$(window).scrollTop();

        //top+=subHeight/7;
        var headBgDiv = '<div style="height:'+subHeight+'px;width:100%;overflow:hidden;position: absolute;top:0" id="headBgDiv"><div style="position: absolute;top: '+top+'px;left: 0;width:100%;filter: blur(15px);z-index: -1" id="navBulrBg"></div>';

        //$("head").append("<style> #content_right,#page .fk,a .fk{display:none} #u{margin-top:33px} body,#head{background:#eee} #head{padding: 15px 0;top:0} #s_tab{height:47px} .c-container{background:#fafafa;padding:25px;border-radius: 10px;box-shadow: 5px 5px 10px #ccc;} em{    color: #ce4343;} .c-container a,.c-container em,#u a{text-decoration:none!important;} a{color:#4879BD} #rs{background:none;padding:25px} #rs a{text-decoration:none} #page a, #page strong{height:auto;background:none;border:none} #page .pc,#page .n{border: 1px solid #eee;} #s_tab{background:none} .wrapper_s .s_ipt_wr,.s_ipt_wr.bg{background:white} .c-border{border: none;    box-shadow: none;} #foot,#help{background:none}</style>");
        $("head").append("<style>#page .fk,a .fk{display:none}  body,#head{background:#eee}  #s_tab{height:47px} .c-container:hover{box-shadow: 5px 5px 7px #ccc;} .c-container>div{margin:10px 0} .c-container{background:#fafafa;padding:20px;border-radius: 5px;box-shadow: 5px 5px 7px #ddd;transition:all 0.3s} em{    color: #ce4343;} .c-container a,.c-container em,#u a{text-decoration:none!important;} a{color:#4879BD} #rs{background:none;padding:20px} #rs a{text-decoration:none} #page a, #page strong{height:auto;background:none;border:none} #page .pc,#page .n{border: 1px solid #eee;} #s_tab{background:none} .wrapper_s .s_ipt_wr,.s_ipt_wr.bg{background:white} .c-border{border: none;    box-shadow: none;} #foot,#help{background:none}</style>");
        if(fg == 1){
            $("head").append("<style>#u{margin-top:30px} #head{padding: 15px 0;top:0} </style>");
            //subHeight =  $('#head').outerHeight();
        }

        if($('.blur-right').length == 0){

            var option = '<span class=" c-gap-left"><label><input type="checkbox" class="blur-right" style="margin-top:3px" >显示右侧</label></span>';
            $(".search_tool_conter").append(option)
            setTimeout(function(){
                if(right == 0){
                    $("head").append("<style class='bright'>#content_right{display:none} </style>");
                    //$("#content_right").hide();
                }
                else{
                    $('.blur-right')[0].checked = true
                    $('.blur-right')[1].checked = true
                    $(".bright").remove();
                }

                $('.blur-right').change(function(){
                    if(this.checked){
                        $(".bright").remove();
                        localStorage.setItem('blur-right',1);
                        right = 1;
                    }
                    else{
                        $("head").append("<style class='bright'>#content_right{display:none} </style>");
                        localStorage.setItem('blur-right',0);
                        right = 0;
                    }
                })
            },500)
        }

        if($('#u').css('margin-top') == '21px'){$('#u').css('margin-top','0')}

        $("#s_tab").css('padding-top',subHeight+"px")

        $('#head').prepend(headBgDiv);


        $("#navBulrBg").append($('#s_tab').clone());
        $("#navBulrBg").append($('#wrapper_wrapper').clone());
        $("#headBgDiv #c-tips-container").remove();

         updata = 0;
    }

    $(window).scroll(function() {
        var top = $(window).scrollTop()//-subHeight/7;
        $("#navBulrBg").css('top',-top+"px");
    });

    $(document).ajaxStart(function() {
         $("#headBgDiv").remove();
    });

    $(document).ajaxSuccess(function() {
       if(updata == 0){
            updata = 1;
            $("#headBgDiv").remove();
            //setTimeout(function(){
                navBgStart();
            //},1000)
        }
    });

    navBgStart();




})

    // Your code here...
})();