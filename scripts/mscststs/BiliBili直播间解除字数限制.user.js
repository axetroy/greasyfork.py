// ==UserScript==
// @name         BiliBili直播间解除字数限制
// @namespace    mscststs
// @version      0.36
// @description  直播间解除字数限制，自动分条发送
// @author       mscststs
// @include        /https?:\/\/live\.bilibili\.com\/\d/
// @require      https://cdn.bootcss.com/axios/0.17.1/axios.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	class Api{
		/*
			api部分
		*/
		constructor(){
			this.msg_sendURL = "msg/send";
			this.room_initURL="room/v1/Room/room_init";
		}
		async _api(url,data,method="post") {
			return axios({
				url,
				baseURL: 'https://api.live.bilibili.com/',
				method,
				data: data,
				transformRequest: [function (data) {
					// Do whatever you want to transform the data
					let ret = '';
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
					}
					return ret;
				}],
				withCredentials: true,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function (res) {
				return res.data;
			});
		}
		async SendDanmaku(msg,roomid){
			let data = {
                        color:16777215,
                        fontsize:25,
                        mode:1,
                        msg:msg,
                        rnd:Date.parse(new Date())/1000,
                        roomid,
                    };
			let res = await this._api(this.msg_sendURL,data);
			return res;
		}
		async Roominit(shortID){
			let res  = await this._api(`${this.room_initURL}?id=${shortID}`,{},"get");
			return res;
		}
	}


	function sleep(miliseconds){
		return new Promise(resolve=>{
			setTimeout(()=>{resolve();},miliseconds);
		});
	}
	async function Step(selector,callback){
		while($(selector).length===0){
			await sleep(100);
		}
		await sleep();
		callback(selector);
	}
	function Wait(selector){
		return new Promise(resolve=>{
			Step(selector,function(selector){resolve($(selector));});
		});
	}


	$().ready(()=>{
		let api = new Api();
		let roomid = 0;
		let MSG =""; //当前弹幕
		let inProgress = 0;
		let outerDiv= [];
		let input = [];
		let SendBtn =[];

		function CheckBtnStatus(){
			//用于检查设置按钮的disabled状态
			$("#chat-control-panel-vm > div > div.chat-input-ctnr.p-relative > div > span").text(`${MSG.length}/${getLimit()}`);//修改Character Count

			if(MSG.length && !inProgress) SendBtn.removeAttr("disabled"); //切换Btn的效果
			else SendBtn.attr("disabled","disabled");
		}


		function SetMSG(s,add=false){
			if(add){
				MSG+=s;
			}else{
				MSG = s;
			}
			input.val(MSG);
			CheckBtnStatus();
		}
		function GetMSG(){
			let s = MSG;
			MSG="";
			input.val("");
			CheckBtnStatus();
			return s;
		}

		function getLimit(){  //获取字符上限
			let l = $("#chat-control-panel-vm > div > div.chat-input-ctnr.p-relative > div > span").text();
			let i = l.indexOf("/");
			return parseInt(l.substr(i+1,100));
		}

		async function getRoomid(){
			if(roomid){
				return roomid;
			}else{
				//获取短网址并返回长网址
				let shortid = parseInt((window.location.pathname+"").substr(1,100));
				let data = await api.Roominit(shortid);
				//console.log(data);
				roomid = data.data.room_id;
				return data.data.room_id;
			}
		}

		async function StartSend(){
			inProgress = 1;
			input.attr("disabled","disabled");
			let myDanmaku = GetMSG();
			let Limit = getLimit();
			//分段发送逻辑

			//let Roomid = await getRoomid();//获取真实roomid

			let al = myDanmaku.split("");
			let s="";
			let DanmakuList=[];
			for(let i=0;i<al.length;i++){
				s+=al[i];
				if((i && (i+1)%Limit==0 )|| i==al.length-1){
					DanmakuList.push(s);
					s="";
				}
			}//按照用户上限完成字符串分割
			//console.log(DanmakuList);

			for(let i=0;i<DanmakuList.length;i++){
				// let res =await  api.SendDanmaku(DanmakuList[i],Roomid); 使用弹幕逻辑
				input.val(DanmakuList[i]);
				let e = new Event('input');
				e.myself = true;
				input[0].dispatchEvent(e); // 把弹幕喂给v-model

				let c = new Event("click");
				c.myself = true;
				SendBtn[0].dispatchEvent(c);
				if(i!=DanmakuList.length-1){
					await sleep(1200);
				}else{
					await sleep(100);
				}
			}

			input.removeAttr("disabled");
			input.focus();
			inProgress = 0;
			CheckBtnStatus();
		}


		async function removeVueBind(){
			outerDiv = await Wait("#chat-control-panel-vm > div > div.chat-input-ctnr.p-relative > div ");
			input =await Wait("#chat-control-panel-vm > div > div.chat-input-ctnr.p-relative > div > textarea");
			SendBtn = await Wait("#chat-control-panel-vm div.control-panel-ctnr.border-box div.right-action button.bl-button");
			console.log("###绑定！");
			outerDiv[0].addEventListener("keyup",(e)=>{
				if(e.keyCode===13){ //回车发送事件
					SendBtn.click();
				}
			},true);
			outerDiv[0].addEventListener("input",(e)=>{
				if(e.myself){
					return true;
				}
				e.preventDefault();
				e.stopPropagation();
				SetMSG(input.val());
				 //console.log(MSG);
				return false;
			},true);
			SendBtn[0].addEventListener("propertychange",function(){$(this).removeAttr("disabled");},true);//解除Btn的v-class
			SendBtn[0].addEventListener("click",function(e){
				if(e.myself){
					return true;
				}
				e.preventDefault();
				e.stopPropagation();
				StartSend();
				return false;
			},true);
			//SendBtn.removeAttr("disabled");

			$("#chat-control-panel-vm")[0].addEventListener("click",function(e){
				//console.log(e.target);
				if($(e.target).hasClass("yan-item") && $(e.target).parent().parent().find(".yan-ctnr span").length ||
				  $(e.target).hasClass("hot-word-item") && $(e.target).parent().parent().find(".hot-word-ctnr span").length){
/* 					用于解决颜文字和热词的输入
					 */
					//console.log("????");
					e.preventDefault();
					e.stopPropagation();
					if(inProgress){return false;}//潜在的溢出风险
					//console.log($(e.target).text());
					SetMSG($(e.target).text(),true);
					$("#chat-control-panel-vm > div > div.control-panel-icon-row.p-relative > div.icon-left-part .active").click();
					setTimeout(()=>{input.val(MSG);},100);
					return false;
				}
			},true);

		}


		function Main(){
			removeVueBind();
		}

		Main();

	});
})();