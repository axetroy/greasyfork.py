// ==UserScript==
// @name         闲鱼强制PC版页面
// @namespace    https://github.com/lihaoyun6/xianyu2pc
// @version      0.3.1
// @description  访问到移动版闲鱼页面时自动转到对应的PC版页面
// @author       lihaoyun6
// @include      *//2.famecl.com*.detail.*
// @include      *//g.alicdn.com*.detail.*
// @run-at     	 document-start
// @grant        none
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAe1BMVEX/2kT/2kT/2kT/3ESBczncvkGqlT2OfjvkxELuzEO4oD6xmj310UPxzkPKr0C8oz63nj6ciTyYhjuJeTp7bjlzZzhSTTX61kT51UPXuUHTtkDOskDEqj+eizyLezqFdTprYThoXjdjWjdfVzfpyELox0KijjygjTxaUzZjE2mMAAAAAnRSTlPgXT03E50AAACLSURBVBjTfY9XDsMgEAUJrE0AN0xx72n3P2EAKSJSIs/fjPZjH7og/IXT4JGPR2IgnhDavGkbnCWeDCNSSFmD7kejlDIlQSStk7Kbq55OcqKFD7u2cHC+UTuvabgozECr6gALewgL1RT4uMELVuGCWMBRduLBn2IgCLOrJ8/ZLbszhv99ej4G/cx/A162CDvMCge6AAAAAElFTkSuQmCC
// ==/UserScript==
let xianyuMobileObj = {
	init () {
		let curr_href = location.href;
        let cat_arr = /\.detail\.(\d+)\.?/.exec(curr_href);
        if (cat_arr == null) {
			console.log('log: detail info id not found.');
			die();
		}
		let id = cat_arr[1];
		location.href = 'https://2.taobao.com/item.htm?id=' + id; // done !
	}
};

xianyuMobileObj.init();