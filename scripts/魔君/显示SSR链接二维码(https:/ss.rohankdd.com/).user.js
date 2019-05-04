// ==UserScript==
// @name         显示SSR链接二维码(https://ss.rohankdd.com/)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  用于https://ss.rohankdd.com/生成对应的SS链接二维码，便于直接使用
// @author       You
// @match        https://ss.rohankdd.com/
// @match        https://ss.weirch.com/
// @match        http://mirror.rohankdd.com/
// @match        http://mirror.weirch.com/
// @match        https://free-ss.site/
// @grant        none
// @require      http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js
// @require      http://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js
// @require      https://cdn.bootcss.com/Base64/1.0.1/base64.js
// @require      https://cdn.bootcss.com/layer/3.0.3/layer.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $(".container").attr("style","max-width:2000px");
    $(".main").attr("style","max-width:100%").attr("align","center");

    var Base64 = {
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" ,

        encode: function( string )
        {
            var characters = Base64.characters;
            var result     = '';

            var i = 0;
            do {
                var a = string.charCodeAt(i++);
                var b = string.charCodeAt(i++);
                var c = string.charCodeAt(i++);

                a = a ? a : 0;
                b = b ? b : 0;
                c = c ? c : 0;

                var b1 = ( a >> 2 ) & 0x3F;
                var b2 = ( ( a & 0x3 ) << 4 ) | ( ( b >> 4 ) & 0xF );
                var b3 = ( ( b & 0xF ) << 2 ) | ( ( c >> 6 ) & 0x3 );
                var b4 = c & 0x3F;

                if( ! b ) {
                    b3 = b4 = 64;
                } else if( ! c ) {
                    b4 = 64;
                }

                result += Base64.characters.charAt( b1 ) + Base64.characters.charAt( b2 ) + Base64.characters.charAt( b3 ) + Base64.characters.charAt( b4 );

            } while ( i < string.length );

            return result;
        } ,

        decode: function( string )
        {
            var characters = Base64.characters;
            var result     = '';

            var i = 0;
            do {
                var b1 = Base64.characters.indexOf( string.charAt(i++) );
                var b2 = Base64.characters.indexOf( string.charAt(i++) );
                var b3 = Base64.characters.indexOf( string.charAt(i++) );
                var b4 = Base64.characters.indexOf( string.charAt(i++) );

                var a = ( ( b1 & 0x3F ) << 2 ) | ( ( b2 >> 4 ) & 0x3 );
                var b = ( ( b2 & 0xF  ) << 4 ) | ( ( b3 >> 2 ) & 0xF );
                var c = ( ( b3 & 0x3  ) << 6 ) | ( b4 & 0x3F );

                result += String.fromCharCode(a) + (b?String.fromCharCode(b):'') + (c?String.fromCharCode(c):'');

            } while( i < string.length );

            return result;
        }
    };

    var header = $('head');
    var script = '<link href="https://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">';
    var script1 = '<script src="https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>';
    var script2 = '<script src="https://cdn.bootcss.com/layer/3.0.3/layer.min.js"></script>';
    header.append(script).append(script1).append(script2);

    var table = $("<table class='table table-striped table-bordered' style='width:100%'></table>");
    $('#ss_wrapper').append(table).append('<div style="display:none" id="qrcode">');
    $('#ss').attr('style','display:none');

    var timestamp=new Date().getTime();
    $.ajax({
        url: 'ss.php?_='+timestamp,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var jsondata = data.data;
            var array = [];
            for (var i = 0; i < jsondata.length; i++) {
                var tmp = jsondata[i];
                var str = tmp[4]+':'+tmp[3]+'@'+tmp[1]+':'+tmp[2];
                var url = 'ss://'+Base64.encode(str);
                var tmp1 = {
                    health:tmp[0],
                    ip:tmp[1],
                    port:tmp[2],
                    password:tmp[3],
                    method:tmp[4],
                    verified:tmp[5],
                    geo:tmp[6],
                    url:url
                };
                array.push(tmp1);
            }
            array.sort(function(a,b) {return b.health-a.health;});
            table.bootstrapTable({
                columns: [{
                    field: 'health',
                    title: 'Health',
                    align:'center',
                    order:'desc',
                    sortable:true,
                    titleTooltip:'点击可排序'
                }, {
                    field: 'ip',
                    title: 'Ip',
                    align:'center'
                }, {
                    field: 'port',
                    title: 'Port',
                    align:'center'
                }, {
                    field: 'password',
                    title: 'Password',
                    align:'center'
                }, {
                    field: 'method',
                    title: 'Method',
                    align:'center'
                }, {
                    field: 'verified',
                    title: 'Verified',
                    align:'center'
                }, {
                    field: 'geo',
                    title: 'Geo',
                    align:'center'
                },{
                    title:'点击显示二维码',
                    field:'url',
                    align:'center',
                    formatter:function(value,row,index){
                        return '<a class="show"><i class="glyphicon glyphicon-search"></i></a>';
                    },
                    events:{
                        'click .show':function(event,value,row,index){
                            var qrcode = $('#qrcode');
                            qrcode.children('canvas').remove();
                            qrcode.qrcode(value);
                            layer.open({
                                type: 1,
                                title: false,
                                closeBtn: 0,
                                area: '256px',
                                skin: 'layui-layer-nobg', //没有背景色
                                shadeClose: true,
                                content: qrcode
                            });
                        }
                    }
                }]
            });
            table.bootstrapTable('load',array);
            $('.fixed-table-loading').attr('style','display:none');
        }
    });
})();