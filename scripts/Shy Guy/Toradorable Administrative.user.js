// ==UserScript==
// @name         Toradorable Administrative
// @namespace    http://tampermonkey.net/
// @version      1.2.6
// @description  This was the script I (ProbablyAFK) used to change everyone's skin, swap skins with people, and alter my name in chat (pretend to be someone else) a while back. I no longer use the site or maintain this script. It may no longer work or be in a broken state. I'm sorry, I will not help you. 
// @author       Toradorable
// @match        http://alis.io/*
// @grant        none
// ==/UserScript==
// @require https://greasyfork.org/scripts/24844-toradorable-skin-list/code/Toradorable%20Skin%20List.js?version=157894

var animator = (function () {
	var AnimationContainer = {
		animationIndex: 0,
		animationTimeout: null,
		startOnFirstFrame: false,
		// Name of the animation
		title: function(){  },
		setAnimation: function(n){
			this.animationIndex = n;
			if (this.animationIndex >= this.animations.length) this.animationIndex = 0;
			if (this.animationIndex < 0) this.animationIndex = this.animations.length - 1;
			return this.animations[this.animationIndex];
		},
		nextAnimation: function(n=1){
			this.animationIndex += n;
			if (this.animationIndex >= this.animations.length) this.animationIndex = 0;
			return this.animations[this.animationIndex];
		},
		prevAnimation: function(n=1){
			this.animationIndex -= n;
			if (this.animationIndex < 0) this.animationIndex = this.animations.length - 1;
			return this.animations[this.animationIndex];
		},
		pauseAnimation: function(){
			if (this.animationTimeout) {
		        clearTimeout(this.animationTimeout);
		    }
		},
		playAnimation: function(isFirstFrame=true){
			var animation = this.currentAnimation();
			if (isFirstFrame) {
				if (this.startOnFirstFrame) this.frameIndex = 0;
			} else {
				this.nextFrame();
			}
			this.site.updateFrame( );
			var time = animation.currentDisplayTime();
			if (time > 0) {
				this.pauseAnimation();
				this.animationTimeout=setTimeout(function() { AnimationContainer.playAnimation(false); }, time);
			}
		},
		refreshFrame: function(){
			var animation = this.currentAnimation();
			this.site.updateFrame( );
		},
		// Frames
		defaultDisplayTime: 1000,
		speedMultiplier: 1,
		frameIndex: 0,
		init: function() {
			this.site.initialize();
		},
		setFrameIndex: function(n) {
			return this.currentAnimation().setFrameIndex(n);
		},
		nextFrame: function(n=1){
			return this.currentAnimation().nextFrame(n);
		},
		prevFrame: function(n=1){
			return this.currentAnimation().prevFrame(n);
		},
		
		// For re-transmitting when player-update
		currentAnimation: function() {
			if (this.animationIndex >= this.animations.length) this.animationIndex = 0;
			return this.animations[this.animationIndex];
		},
		currentFrame: function(){ 
			return this.currentAnimation().currentFrame();
		},
		currentFrameDisplayTime: function() {
			return this.currentAnimation().currentDisplayTime();
		},

		// Agar Networks allows you to change your nick
		currentFrameNick: function(){  
			return this.currentAnimation().currentNick();
		},
		currentFrameSkin: function(){  
			return this.currentAnimation().currentSkin();
		},
		addAnimation: function(animation){
			var a = Object.assign({},this.animationTemplate,animation);
			this.animations.push(a);
			return a;
		},
		addAnimations: function() {
			for (var i = 0; i < arguments.length; i++) {
				this.addAnimation(arguments[i]);
			}
			return this.animations;
		},
		importSkinListAsAnimation(skinList,attributes={}) {
			var animation = this.addAnimation(attributes);
			for (var i = 0; i < skinList.length; i++) {
				animation.frames[i] = {url: skinList[i]};
			}
			return animation;
		},
		/*removeAnimation: function(animation){ 
			var a = Object.assign({},this.animationTemplate,animation);
			this.animation.push(a);
			return a;
		},*/
		site: {
			nick: null,
			elements: {
				nick: null,
				skinurl: null,
			},
			initialize: function() {
				this.elements.nick = document.getElementById('nick');
				this.elements.skinurl = document.getElementById('skinurl');
			},
			getNick: function() {
				return this.elements.nick.value;
			},
			setNick: function(newNick) {
				return this.elements.nick.value = newNick;
			},
			getSkin: function() {
			},
			setSkin: function(skin) {
			},
			//changeNickTo: function () {   },
			//changeSkinTo: function () {   },
			refreshCurrentFrame: function() {   },
			updateFrame: function(nick=AnimationContainer.currentFrameNick(), skin=AnimationContainer.currentFrameSkin(), time=AnimationContainer.currentFrameDisplayTime(), displaylocal=true) {
			    this.elements.skinurl.value = skin;
			    //setNick(nick,team,skin,partytoken);
			    //setNick(document.getElementById('nick').value);
			    var player=playerDetailsByIdentifier[nodeList[0][1] + nodeList[0][6]];
			    socket.emit("playerUpdated", {
			        "action": "update",
			        "displayName": player.displayName,
			        "socketRoom": player.socketRoom,
			        "identifier": player.identifier,
			        "url": skin,
			        "nick": player.nick,
			        "team": player.team,
			        "token": player.token
			    });
			    nodeList[0][5]=skin;
			    if (displaylocal) {
			    	player.url=skin;
			    }
			}
		},
		animationTemplate: {
			/*addFrame: function(frame,showTime) {
			},*/
			/*fixFrameIndex: function() {
				if (AnimationContainer.frameIndex >= this.frames.length) AnimationContainer.frameIndex = 0;
			},*/
			currentFrame: function() {
				if (AnimationContainer.frameIndex >= this.frames.length) AnimationContainer.frameIndex = 0;
				return  this.frames[AnimationContainer.frameIndex];
			},
			setFrameIndex: function(n) {
				AnimationContainer.frameIndex = n;
				if (AnimationContainer.frameIndex >= this.frames.length) AnimationContainer.frameIndex = 0;
				if (AnimationContainer.frameIndex < 0) AnimationContainer.frameIndex = this.frames.length - 1;
				return  this.frames[AnimationContainer.frameIndex];
			},
			nextFrame: function(n=1) {
				AnimationContainer.frameIndex += n;
				if (AnimationContainer.frameIndex >= this.frames.length) AnimationContainer.frameIndex = 0;
				return  this.frames[AnimationContainer.frameIndex];
			},
			prevFrame: function(n=1) {
				AnimationContainer.frameIndex -= n;
				if (AnimationContainer.frameIndex < 0) AnimationContainer.frameIndex = this.frames.length - 1;
				return  this.frames[AnimationContainer.frameIndex];
			},
			currentNick: function() {
				var frame = this.currentFrame();
				return ('nick' in frame) ? frame.nick : AnimationContainer.site.getNick();
			},
			currentSkin: function() {
				var frame = this.currentFrame();
				return ('url' in frame) ? frame.url : AnimationContainer.site.getSkin();
			},
			currentDisplayTime: function() {
				var frame = this.currentFrame();
				if ('time' in frame) {
					return Math.floor(frame.time / AnimationContainer.speedMultiplier + 1);
				} else {
					return Math.floor( this.getDefaultDisplayTime() / AnimationContainer.speedMultiplier + 1);
				}
			},
			getDefaultDisplayTime() {
				if ('defaultDisplayTime' in this) {
					return this.defaultDisplayTime;
				} else {
					return AnimationContainer.defaultDisplayTime;
				}
			},
			initialize: function() {   },
			title: "Unnamed Animation",
			frames: [
				{
					nick: null,
					time: 0,
					url: "",
				}
			],
		},
		animations: [],
	};
	AnimationContainer.init();
	return AnimationContainer;
})();
window.animator=animator;

var defaultspeed=100;
//var skinList = (typeof skinList === 'object') ? skinList : [];
//window.skinList=skinList;
animator.addAnimations(
    {title:"Toradorable",
     frames: [
         {time: 500, url: "https://s22.postimg.org/jha3867up/image.png"},
         {time: 500, url: "https://s22.postimg.org/jrhlrimgx/image.png"},
         {time: 500, url: "https://s22.postimg.org/6xjjy691d/image.png"},
         {time: 500, url: "https://s22.postimg.org/idpyw7n7l/Ra2.png"},
         {time: 500, url: "https://s22.postimg.org/inxhfk1tt/exclam.png"},
         {time: 2000, url: "https://s18.postimg.org/tl8xraeux/Taiga_square.png"}
     ]},
    {title:"Chuunibyou",
    defaultDisplayTime: 100,
    frames:[
        {time: 125, url: "https://s12.postimg.org/6vwrv8z5p/frame_0_delay_0_25s.gif"},
        {url: "https://s12.postimg.org/fs7jz6prx/frame_1_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/68xv5q29p/frame_2_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/furfm0tfh/frame_3_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/axdv0wrgd/frame_4_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/r9nwqn5rx/frame_5_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/7ggebohrx/frame_6_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/iu2xmvsal/frame_7_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/4ox4l2j99/frame_8_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/89t04anst/frame_9_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/4rh07wmwt/frame_10_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/4fzjv56gt/frame_11_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/ai76lmuwt/frame_12_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/ktjjeamm5/frame_13_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/qvr64sb25/frame_14_delay_0_1s.gif"},
        {time: 125, url: "https://s12.postimg.org/xaq71ghrx/frame_15_delay_0_25s.gif"},
        {url: "https://s12.postimg.org/5c0moc5j1/frame_16_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/yfoukktml/frame_17_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/8y6g0zbwd/frame_18_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/ar9cpax31/frame_19_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/6jekgjvnh/frame_20_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/imjw446pp/frame_21_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/l55l4ssfx/frame_22_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/f5hu157nh/frame_23_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/e4hlc0qnx/frame_24_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/a9e79g7i5/frame_25_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/73y6wze9p/frame_26_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/qzu6civb1/frame_27_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/lcxtf1ssd/frame_28_delay_0_1s.gif"},
        {url: "https://s12.postimg.org/537nc5i4d/frame_29_delay_0_1s.gif"}
    ]},
    {title:"Neon Cat",
    	frames: [
        {time: 030, url: "https://s18.postimg.org/h1w6ml4s9/frame_0_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/o6dzvmc1l/frame_1_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/fcn3eip2x/frame_2_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/wr7bmsm7t/frame_3_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/4sd5vxkl5/frame_4_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/auksmf915/frame_5_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/3smv085fd/frame_6_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/khoaw520p/frame_7_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/bb608uws9/frame_8_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/kx462wdbt/frame_9_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/z4turjq0p/frame_10_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ytcees9kp/frame_11_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/4d6hgno1l/frame_12_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/5gqlsm8op/frame_13_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ago20kebd/frame_14_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/7b3gacvp5/frame_15_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/vsvjy8y9l/frame_16_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/6bd5engjd/frame_17_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/xzzsm63jt/frame_18_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/fltuvxgmx/frame_19_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/fn3spcigp/frame_20_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/jxigkxnjt/frame_21_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/uydlpyfsp/frame_22_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/wrgiea0zd/frame_23_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/bj2twumih/frame_24_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ks506yveh/frame_25_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/j1lz5hdvd/frame_26_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ba596x9q1/frame_27_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/hp4a3lgft/frame_28_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/6e67syyyh/frame_29_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/qmtleoy9l/frame_30_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/foibwi9o9/frame_31_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/s4f1q9309/frame_32_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/548edx56h/frame_33_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/3qgrim5x5/frame_34_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/3rqpc17qx/frame_35_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/aw8il2f09/frame_36_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/td2xbvuyh/frame_37_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/ndf688a61/frame_38_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/dhiombtrt/frame_39_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/km0hvd115/frame_40_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/4p1pyn8mx/frame_41_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/u94052u0p/frame_42_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/4rlllhcah/frame_43_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/tm53fjx4p/frame_44_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/4he324xo9/frame_45_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/j1v5wysmx/frame_46_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/baefyeohl/frame_47_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/ndjrlyzjt/frame_48_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/3kc970bjt/frame_49_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/b1lgm812x/frame_50_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/g1iwu66pl/frame_51_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/i7d7ooa61/frame_52_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/5u0dhrkhl/frame_53_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/8cm2ig67t/frame_54_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/5jsuyf5vd/frame_55_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/yapoohbp5/frame_56_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/q6hkjqpa1/frame_57_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/dgdc6nhbt/frame_58_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/anoq0d6d5/frame_59_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ctj0uv9tl/frame_60_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/jy0u3wh2x/frame_61_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/w165rgs55/frame_62_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/nk6ngjng9/frame_63_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/tz5od7u61/frame_64_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/3s4hh9bw9/frame_65_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/j24cog7eh/frame_66_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/tq83nahdl/frame_67_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/uh0tt2jqx/frame_68_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/ou929c6m1/frame_69_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/3ymry3aex/frame_70_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/y4l6cvhbt/frame_71_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/dyhodzlo9/frame_72_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/4f7zkiy61/frame_73_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/4t9bk4i9l/frame_74_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/b88cgsozd/frame_75_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/58kld546x/frame_76_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ptzd51lrt/frame_77_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/lm4kwakc9/frame_78_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/govlox7qx/frame_79_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/ysym9k5fd/frame_80_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/c5jd3epvd/frame_81_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/53lfh7m9l/frame_82_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/kqcoul01l/frame_83_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/h80oy6z5l/frame_84_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/tb60lra7t/frame_85_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/w6j3sme7t/frame_86_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/fk1jjjla1/frame_87_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/7ftfesyux/frame_88_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/d5e9cuuex/frame_89_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/jkda9j14p/frame_90_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/rr5a13r7d/frame_91_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/5t8t7bc6x/frame_92_delay_0_03s.gif"},
        {time: 030, url: "https://s18.postimg.org/9qw2wpz09/frame_93_delay_0_03s.gif"},
        {time: 070, url: "https://s18.postimg.org/ylfkqsjuh/frame_94_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/xx6q7ul4p/frame_95_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/e3umf57qx/frame_96_delay_0_07s.gif"},
        {time: 070, url: "https://s18.postimg.org/fk64xaant/frame_97_delay_0_07s.gif"},
        {time: 030, url: "https://s18.postimg.org/z3aq6n9fd/frame_98_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/orgqbzq37/frame_99_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/zfkhau02b/frame_100_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/n2c8hnzrn/frame_101_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/j78uf3glv/frame_102_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/ms4pybl5f/frame_103_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/succot9lf/frame_104_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/nwys3p7mb/frame_105_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/ffz9ss2xf/frame_106_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/6yzrhuy8j/frame_107_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/vgrv5r0sz/frame_108_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/sb79fji6r/frame_109_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/galtetas3/frame_110_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/3xdklnahf/frame_111_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/qalb8gbf7/frame_112_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/ok2a6ytw3/frame_113_delay_0_03s.gif"},
        {time: 070, url: "https://s3.postimg.org/6ij595zv7/frame_114_delay_0_07s.gif"},
        {time: 070, url: "https://s3.postimg.org/5uaaq815f/frame_115_delay_0_07s.gif"},
        {time: 030, url: "https://s3.postimg.org/5vk8jn2z7/frame_116_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/syarit4gj/frame_117_delay_0_03s.gif"},
        {time: 070, url: "https://s3.postimg.org/3tjr5e503/frame_118_delay_0_07s.gif"},
        {time: 070, url: "https://s3.postimg.org/59v9nj7wz/frame_119_delay_0_07s.gif"},
        {time: 070, url: "https://s3.postimg.org/72y6but3n/frame_120_delay_0_07s.gif"},
        {time: 070, url: "https://s3.postimg.org/3kqrt7hlf/frame_121_delay_0_07s.gif"},
        {time: 030, url: "https://s3.postimg.org/xdxs1t68j/frame_122_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/aqiivnqoj/frame_123_delay_0_03s.gif"},
        {time: 070, url: "https://s3.postimg.org/53m5y6o5v/frame_124_delay_0_07s.gif"},
        {time: 070, url: "https://s3.postimg.org/54w3rlpzn/frame_125_delay_0_07s.gif"},
        {time: 030, url: "https://s3.postimg.org/nyhwolo7n/frame_126_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/5wyrqsu6r/frame_127_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/qidjipbrn/frame_128_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/yce543jkj/frame_129_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/3w885yy1f/frame_130_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/3kvd6y6z7/frame_131_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/j7mmkbkr7/frame_132_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/6u9sdev2r/frame_133_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/m49nklqkz/frame_134_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/ub1nc6gnn/frame_135_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/lhaqv2toz/frame_136_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/qh8730zbn/frame_137_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/6b4p453o3/frame_138_delay_0_03s.gif"},
        {time: 030, url: "https://s3.postimg.org/iea0rpeqb/frame_139_delay_0_03s.gif"}
        ]},
        {name:"Dancing Cat",
        	frames: [
        		{time: 500, url: "https://s11.postimg.org/51bh2tc6r/frame_0_delay_0_5s.gif"},
        		{time: 500, url: "https://s11.postimg.org/uy55fffub/frame_1_delay_0_5s.gif"},
        		{time: 800, url: "https://s11.postimg.org/po06o4vlf/frame_2_delay_0_8s.gif"},
        		{time: 200, url: "https://s11.postimg.org/8or88vkdv/frame_3_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/nyr3g2fw3/frame_4_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/6zi50t4oj/frame_5_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/coydl4aur/frame_6_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/dsihx2vhv/frame_7_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/6dxrifz03/frame_8_delay_0_2s.gif"},
        		{time: 200, url: "https://s11.postimg.org/74qho81df/frame_9_delay_0_2s.gif"},
        		{time: 500, url: "https://s11.postimg.org/p8ti8uz1v/frame_10_delay_0_5s.gif"}
		]},
		{title:"Dino",
			frames:[
				{time: 40, url: "https://s9.postimg.org/j058kibqn/frame_0_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/uqj61w4j3/frame_1_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/bzh8rq9yn/frame_2_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/os5crnlkf/frame_3_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/v78z22hnz/frame_4_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/xpuo2r3e7/frame_5_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/xed7pzmy7/frame_6_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/vnu6oi5f3/frame_7_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/6vukh9o8f/frame_8_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/bvs0p7tv3/frame_9_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/aurs03cvj/frame_10_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/3studw99r/frame_11_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/jfl3r9n1r/frame_12_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/9wbexszjj/frame_13_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/49jne2men/frame_14_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/oi70zslpr/frame_15_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/gdywv1zan/frame_16_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/u8x7ditpr/frame_17_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/njqnxi8dr/frame_18_delay_0_04s.gif"},
				{time: 40, url: "https://s9.postimg.org/4fxch5vjj/frame_19_delay_0_04s.gif"}
		]}
);
animator.importSkinListAsAnimation(
    ["http://i.imgur.com/1JQqUzR.png",
     "http://i.imgur.com/VKcEy4k.png",
     "http://i.imgur.com/FKsf0PC.png",
     "http://i.imgur.com/zg6Oxzo.png",
     "http://i.imgur.com/EPawa6H.png",
     "http://i.imgur.com/NyKl8tG.png"
],"Candy");

// indexes
var skinidx=0;
var currentskinidx=0;
var lagout_i=0;
// Activation Status
var skinChangerWanted = false;
var skinChanger = false;

var FakeSkinWanted=false;
var DoStealSkin=false;
var DoShareSkin=false;
// Auto Join Games when Dead
//var autoJoinGame = true;
window.autoJoinGame=true;
var refreshSkinTimeout;
var defaultspeed=100;
var lagout_speed=30;
var FakeSkinPredictable = false;

var LastXY=[0,0];
var testHasRestarted=0;
var FailCount=0;

var TargetsLastSkin;
var CurrentSkin;
var SharedSkin;

var EVERYONE={};

/*
 * Setup Custome Web Elements
 */

var overlays2=document.getElementById("overlays2");
var mipmapNode = document.getElementById("mipmapNode");
var chatboxInput=document.getElementById("input_box2");
var StealSkinBox = chatboxInput.cloneNode(true);
StealSkinBox.name="Steal Skin From:";
StealSkinBox.id="StealSkinElm";
StealSkinBox.value="";
StealSkinBox.placeholder="Steal Skin From:";
StealSkinBox.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
StealSkinBox.style.width="200px";
StealSkinBox.style.right="9px";
StealSkinBox.style.bottom="218px";
StealSkinBox.style.position="absolute";
StealSkinBox.onchange=function(){ UpdateStealSkinSelect(GetFakeSkinId()); };
var SkinTargetType = StealSkinBox.cloneNode(true);
SkinTargetType.name="Skin Target Type:";
SkinTargetType.id="SkinTargetType";
SkinTargetType.value="Standby"; // Theft, Swap, Push
SkinTargetType.placeholder="Skin Target Type:";
SkinTargetType.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
SkinTargetType.style.width="200px";
SkinTargetType.style.right="9px";
SkinTargetType.style.bottom="258px";
SkinTargetType.style.position="absolute";
overlays2.insertBefore(SkinTargetType, overlays2.lastChild);
overlays2.insertBefore(StealSkinBox, overlays2.lastChild);

var SkinListBox = document.createElement("select"); //StealSkinBox.cloneNode(true);
SkinListBox.name="Selected Skin:";
SkinListBox.id="SelectedSkinElm";
SkinListBox.value="Standby"; // Theft, Swap, Push
SkinListBox.placeholder="No Animation Selected";
SkinListBox.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
SkinListBox.style.width="200px";
SkinListBox.style.right="9px";
SkinListBox.style.bottom="338px";
SkinListBox.style.position="absolute";


//tmpElm.media = "screen,print";
overlays2.insertBefore(SkinListBox, StealSkinBox);

for (var i = 0; i < animator.animations.length; i++) {
    var option = document.createElement("option");

    option.value = i;
    option.text = animator.animations[i].title;

    SkinListBox.appendChild(option);
}

SkinListBox.onchange=function(event){ animator.setAnimation(event.target.value); haveUsedSkin=false; };


var StealSkinSelect = StealSkinBox.cloneNode(true); //StealSkinBox.cloneNode(true);
StealSkinSelect.name="StealSkinSelect";
StealSkinSelect.id="StealSkinSelectElm";
StealSkinSelect.setAttribute("list","StealSkinOptionList");
StealSkinSelect.value=""; // Theft, Swap, Push
StealSkinSelect.placeholder="No Skin To Steal";
//StealSkinSelect.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
StealSkinSelect.style.overflow="scroll";
StealSkinSelect.size=10;
//StealSkinSelect.style.height="400px";
StealSkinSelect.style.width="200px";
StealSkinSelect.style.right="9px";
StealSkinSelect.style.bottom="298px";
StealSkinSelect.style.position="absolute";
overlays2.insertBefore(StealSkinSelect, SkinListBox);

var StealSkinOptionList = document.createElement("datalist"); //StealSkinBox.cloneNode(true);
StealSkinOptionList.name="StealSkinOptionList";
StealSkinOptionList.id="StealSkinOptionList";
//StealSkinSelect.autocomplete="off";
//StealSkinOptionList.autocomplete="off";
overlays2.insertBefore(StealSkinOptionList, StealSkinSelect);
var StealSkinFromId;
function UpdateStealSkinSelect(skinList) {
    //console.log(skinList);
    var StealSkinOptionList=document.getElementById("StealSkinOptionList");
    var StealSkinSelect=document.getElementById("StealSkinSelectElm");
    while (StealSkinOptionList.firstChild) {
        StealSkinOptionList.removeChild(StealSkinOptionList.firstChild);
    }
    var first = true;
    for (var i in skinList) {
        var option = document.createElement("option");
        if (first) {
            first=false;
            FakeSkinId=i;
            option.selected=true;
            StealSkinSelect.value=i;
        }
        //option.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
        option.value = i;
        option.text = i;
        StealSkinOptionList.appendChild(option);
    }
}
StealSkinSelect.onchange=function(event){ FakeSkinId=event.target.value ; };
var LieAs = chatboxInput.cloneNode(true);
LieAs.name="LieAs";
LieAs.id="LieAsElm";
LieAs.value="";
LieAs.placeholder="Not Lying";
LieAs.style.cssText = document.defaultView.getComputedStyle(chatboxInput, "").cssText;
//LieAs.
var chatAreaElem=document.getElementById("chatboxArea2");
chatAreaElem.insertBefore(LieAs, chatAreaElem.firstChild);

var EMPTY_SKINS={};
/*
 * Setup Hotkeys
 */
var hotKeyTable = document.getElementById("hotkey_table");
var hotkeyMappingREV={};
var tmphotkeyMapping=JSON.parse(getLocalStorage("hotkeyMapping"));
for (var prop in tmphotkeyMapping) {
	hotkeyMappingREV[tmphotkeyMapping[prop]]=prop;
}

function AddHotKey(hk) {
	var hkdefault = {
	    id: "hk_change_my_hotkey_id",
	    defaultHotkey: "",
	    key: null,
	    description: "Change My Description",
	    keyDown: null,
	    keyUp: null,
	    type: "NORMAL"
	};
	hk = Object.assign(hkdefault,hk);
	if (! hk.key || hk.key === null) hk.key = hotkeyMappingREV[hk.id];
	if (! hk.key || hk.key === null) hk.key = hk.defaultHotkey;
	var hk_element = hotKeyTable.lastChild.cloneNode(true);
	hk_element.children[0].dataset.hotkeyid = hk.id;
	hk_element.children[0].innerHTML=hk.key;
	hk_element.children[1].innerHTML=hk.description;
	hk_element.children[2].innerHTML="/";
	console.log("Adding Hotkey: " + hk);
	hotKeyTable.appendChild(hk_element);
	
	hotkeyConfig[hk.id]= {
	    defaultHotkey: hk.defaultHotkey,
	    name: hk.description,
	    keyDown: hk.keyDown,
	    type: hk.type
	};
	hotkeyMapping[hk.key] = hk.id;
	return hk_element;
}
chatRoom.doTellLie=false;
var hk_TellLie = AddHotKey({
id: "hk_TellLie",
defaultHotkey: "CTRL_ENTER",
description: "Open Chatbox and send message as another player",
keyDown: function() {
    if (chatRoom["isFocus"]()) {
        TellLie($("#input_box2")["val"]());
        $("#input_box2")["val"]("");
        $("#input_box2")["blur"]();
        $("#chatboxArea2")["hide"]();
    } else {
        chatRoom["focus"]();
    }
}
});

var hk_StealNearbySkin = AddHotKey({
id: "hk_StealNearbySkin",
defaultHotkey: "N",
description: "Grab Skin of Nearby Player",
keyDown: function() {
    var playerId = GetNearestSkinnedCellId();
    if (playerId) updateSkinBox("#" + GetNearestSkinnedCellId());
    else updateSkinBox("~");
}
});

var hk_StealNearbyName = AddHotKey({
id: "hk_StealNearbyName",
defaultHotkey: "",
description: "Grab Name of Nearby Player",
keyDown: function() {
    LieAs.value=GetNearestCell()[1];
}
});

var hk_ToggleStolenSkin = AddHotKey({
id: "hk_ToggleStolenSkin",
defaultHotkey: "M",
description: "Use/Stop Using Stolen Skin",
keyDown: function() {
    //skinChanger=false;
    Print("Will Steal Skin");
    if (FakeSkinWanted && !DoStealSkin) {
    	Print("FakeSkinWanted && !DoStealSkin");
        RefreshSkin(0,true);
        //LagOnce();
    } else if(FakeSkinWanted) {
    	Print("FakeSkinWanted");
        FakeSkinWanted=false;
        DoStealSkin=false;
    } else {
    	Print("STARTING FAKE SKIN CALL");
        FakeSkinWanted=true;
        DoStealSkin=true;
        FakeSkin();
    }
    UpdateTargetBox();
}
});
function UpdateTargetBox() {
    
    if (skinChanger && DoShareSkin && DoStealSkin) {
        SkinTargetType.value="SwappingSkins";
    }
    else if (DoShareSkin && DoStealSkin) {
        SkinTargetType.value="SwappingSkins(NoAnimate)";
    }
    else if (skinChanger && DoShareSkin) {
        SkinTargetType.value="SharingSkin";
    }
    else if (DoShareSkin) {
        SkinTargetType.value="SharingSkin(NoAnimate)";
    }
    else if (DoStealSkin) {
        SkinTargetType.value="StealingSkin";
    }
    else if (skinChanger) {
        SkinTargetType.value="AnimatedSkin";
    }
    else {
        SkinTargetType.value="Standby";
    }
}
var hk_ToggleShareSkin = AddHotKey({
	id: "hk_ToggleShareSkin",
	defaultHotkey: "S",
	description: "Share/Stop Sharing Skin",
	keyDown: function() {
        DoShareSkin = !DoShareSkin;
        UpdateTargetBox();
        //ShareSkin();
	}
	});
/*
var hk_AutoStealNearbySkin = AddHotKey({
id: "hk_AutoStealNearbySkin",
defaultHotkey: "M",
description: "Start/Stop Auto-Stealing Nearby Skin",
keyDown: function() {    }
});
*/
var hk_ReconnectToServer = AddHotKey({
id: "hk_ReconnectToServer",
defaultHotkey: "L",
description: "Reconnect to Server",
keyDown: function() {
    connect(myApp.getCurrentPartyCode());
}
});
function NextSkin() {
    animator.nextFrame();
}
function PrevSkin() {
    animator.prevFrame();
}
var haveUsedSkin=false;
var hk_CycleSkinRotator = AddHotKey({
id: "hk_CycleSkinRotator",
defaultHotkey: "C",
description: "Cycle Skin Rotator",
keyDown: function() { 
    if (skinChangerWanted && !skinChanger) {
        //animator.playAnimation();
        //RefreshSkin(0,true);
        //LagOnce();
    } else if(skinChangerWanted) {
        skinChangerWanted=false;
        skinChanger=false;
        animator.pauseAnimation();
        animator.nextAnimation();
    } else {
        skinChangerWanted=true;
        skinChanger=true;
        //if (haveUsedSkin) NextSkin();
        animator.playAnimation();
    }
    UpdateTargetBox();
}
});
//myApp.refreshHotkeySettingPage();

//myApp.restoreSetting();

myApp.setUpHotKeyConfigPage();

/*********************
 * Generic Functions *
 *********************/


function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Print(msg) {
	console.log(msg);
}

function DistanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );
    return c;
}

/*
 * CompareArray(array1, array2)
 * Shallow Check if array1 and array2 contain the same elements. 
 */
function CompareArr(a,b) {
	if (a.length === 0) return false;
	if (!(a.length === b.length)) {
		Print( a.length + " is not as long as " + b.length);
		return false;
	}
	Print( a.length + " is as long as " + b.length);
	for (var i=0; i<a.length; i++) {
		if (!( a[i].url === b[i].url) ) {
            Print(a[i].url + " does not equal " + b[i].url);
            return false;
        }
		Print(a[i].url + " == " + b[i].url);
		Print(a[i].url === b[i].url);
	}
	return true;
}

/******************
 * Global Overrides
 ******************/
//Function override. Allow sending messages when dead
myApp["onDead"] = function() {
    isJoinedGame = false;
    $(".btn-spectate")["prop"]("disabled", false);
    $("#nick")["prop"]("disabled", false);
    $(".nav")["show"]();
    if (window.autoJoinGame) setNick(document.getElementById('nick').value);
    //conn["leaveRoom"](myApp["getRoom"]())
}
/*
 * Event Taps
 */
socket.on("playerUpdated", function(node) {
	if (node.action === "join") {// Skin was changed
        if (DoStealSkin) {
		if (node.identifier === GetFakeSkinId() ) {
            //if (node.url !== FakeSkinHistory[FakeSkinHistory.length - 1].url ) FakeSkinHistoryRecorder(node.url);
            //FakeSkinHistoryRecorder(node.url);
        	TargetsLastSkin=node.url;
        	
        		Print("Stealing updated skin");
        		ChangeSkinTo(node.url);
        	}
        }
		if (DoShareSkin) {
			Print("Resharing Skin");
			ReShareSkin();
            setTimeout(ReShareSkin,10);
		}
    }
	/*else if ("update") {
		if (node.identifier === GetFakeSkinId() ) {
            //if (node.url !== FakeSkinHistory[FakeSkinHistory.length - 1].url ) FakeSkinHistoryRecorder(node.url);
            //FakeSkinHistoryRecorder(node.url);
        	if (DoStealSkin && TargetsLastSkin != node.url) {
        		TargetsLastSkin=node.url;
        		Print("Stealing updated skin via update");
        		ChangeSkinTo(node.url);
        	}
        }
	}*/
});

/*****************
** Custom Hot Keys
******************/

const keycodes={
    backspace:8,    tab:9,         enter:13,
    shift:16,       ctrl:17,       alt:18,
    pause_break:19, capslock:20,   escape:27,
    space:32,       pageup:33,     pagedown:34,
    end:35,         home:36,       leftarrow:37,
    uparrow:38,     rightarrow:39, downarrow:40,
    insert:45,      delete:46,
    0:48,   1:49,   2:50,   3:51,
    4:52,   5:53,   6:54,   7:55,
    8:56,   9:57,   a:65,   b:66,
    c:67,   d:68,   e:69,   f:70,
    g:71,   h:72,   i:73,   j:74,
    k:75,   l:76,   m:77,   n:78,
    o:79,   p:80,   q:81,   r:82,
    s:83,   t:84,   u:85,   v:86,
    w:87,   x:88,   y:89,   z:90
};

window.addEventListener('keydown', keydown);
function keydown(e) {
    var chatArea=$("#chatboxArea2");
    var chatIsFocused=$("#input_box2").is(':focus') || $("#LieAsElm").is(':focus') || $("#StealSkinElm").is(':focus');
   /*if(e.keyCode === keycodes.c && !(chatIsFocused)) {
        if (skinChangerWanted && !skinChanger) {
            RefreshSkin(0,true);
            //LagOnce();
        } else if(skinChangerWanted) {
            skinChangerWanted=false;
            skinChanger=false;
        } else {
            skinChangerWanted=true;
            skinChanger=true;
            skinidx++;
            if(skinidx >= skinList.length) {skinidx = 0;}
            AutoChangeSkin();
        }
    }
    else */ if(e.keyCode === 27) {
        skinChanger = false;
        DoStealSkin=false;
        amfakedead=false;
        DoShareSkin=false;
        //temporary workaround to StealSkin/FakeSkin/ HotKey "M" Problem 
        $("#overlays")["show"]();
    }
    /*else if(e.keyCode === keycodes.l && !(chatIsFocused)) {
        //naservers();
        connect(myApp.getCurrentPartyCode());
    }*/
    else if(e.keyCode === keycodes.q && !(chatIsFocused)) {
        Lagloop(50);
    }
    /*else if(e.keyCode === keycodes.m && !(chatIsFocused)) {
        skinChanger=false;
        if (FakeSkinWanted && !DoStealSkin) {
            RefreshSkin(0,true);
            //LagOnce();
        } else if(FakeSkinWanted) {
            FakeSkinWanted=false;
            DoStealSkin=false;
        } else {
            FakeSkinWanted=true;
            DoStealSkin=true;
            FakeSkin();
        }
    }*/
    /*else if (e.keyCode === keycodes.n && !chatIsFocused) {
        LieAs.value=GetNearestCell()[1];
        StealSkinBox.value=GetNearestSkinnedCell()[1];
    }*/
    /*else if((e.keyCode === keycodes.space || e.keyCode === keycodes.t) && !IsDoingFireork && !($("#chatboxArea2").is(":focus"))) {
        fireworkidx=0;
        Firework();
    }*/
}

//$('.content').append('<input style="border:1px solid grey;" placeholder="Time between skin change (milliseconds)" id="skin_change_inputSpeed" value="500" type="number" min="300"/>');


// getLB: GetLeaderBoard. Returns an array of cells with id and name. id always is set to 0, name is there name
// this could be used to team troll, as you can easlily get odd chars used in the name this way.
function CalculateScore(cells) {
    var totoalsize=0;
    // Get total score by
    for (var i=0; i < cells.length; i++) {
        totalsize+=cells[i].size;
    }
    return (totalsize*totalsize)/100;
    // or get score via getHighestScore (which returns current score, dispite its name)
    //var totoalscore=getHighestScore()/100;
}
function FakeDead() {
    var curskin="https://s17.postimg.org/xh2ltpbgv/Dead.png";
    document.getElementById('skinurl').value = curskin;
    //setNick(skinList[i+2]);
    setNick(document.getElementById('nick').value);
    amfakedead=true;
}



function HasRestarted() {
    if (testHasRestarted >=5) {
        testHasRestarted=0;
    } else {
        testHasRestarted++;
        return false;
    }
    var myCell;
    try {
        if(typeof getCell != 'function') throw "GetCell is NotAFunc";
        myCell=getCell();
        if(myCell === undefined) throw "GetCell Returned null";
        if(myCell[0] === undefined) throw "CellDataEmpty";
        if(myCell[0].x === undefined) throw "Cell has no X";
        FailCount=0;
    }
    catch(err) {
        console.log(err," ",FailCount);
        myCell=null;
        FailCount++;
    }
    finally {
        if (FailCount >= 5) return true;
        else if (FailCount !== 0) return false;
        myCell=myCell[0];
    }
    if (LastXY[0] != myCell.x || LastXY[1] != myCell.y) {
        LastXY=[myCell.x,myCell.y];
        return false;
    }
    var LB = getLB();
    if (LB.length != 9) return false;
    for (var i=0; i < 8; i++) { // Leaderboard 1-8 should be named RESTART
        if (LB[i].name != "RESTART") return false;
    }
    // Leaderboard 9 should be named ALIS.IO
    if (LB[8].name != "ALIS.IO") return false;
    return true;
}


/*************************
 * Skin Changing Functions
 *************************/

/*
 * Object Overrides
 */

/*
 * Change Others Skin
 */

/*
 * nick=Name of person whos skin you want to change
 * skin = skin you want to set it to.
 * displaylocal = Show the skin you forced appon them localy, or only on everyone else's screen.
 */
function SetOthersSkinById(playerID,skin,displaylocal=true) {
    socket.emit("playerUpdated", {
        "action": "update",
        "displayName": playerDetailsByIdentifier[playerID].displayName,
        "socketRoom": playerDetailsByIdentifier[playerID].socketRoom,
        "identifier": playerDetailsByIdentifier[playerID].identifier,
        "url": skin,
        "nick": playerDetailsByIdentifier[playerID].nick,
        "team": playerDetailsByIdentifier[playerID].team,
        "token": playerDetailsByIdentifier[playerID].token
    });
    if (displaylocal) {
        playerDetailsByIdentifier[playerID].url=skin;
    }
}
function SetOthersSkinByName(nick,skin,displaylocal=true) {
    playerID=playerDetailsByNick[nick].identifier;
    SetOthersSkinById(playerID);
}
function SetAllOthersSkin(skin,displaylocal=true) {
    for (var playerId in playerDetailsByIdentifier) {
        SetOthersSkinById(playerId, skin);
    }
}
var NoSkinList={};
function SetAllOthersEmptySkin(skin,displaylocal=true) {
    console.log("Setting Empty Player Skins SKin");
    DetectPlayerId: for (var playerId in playerDetailsByIdentifier) {
        if (playerId in NoSkinList && NoSkinList[playerId] === 1) {
            SetOthersSkinById(playerId, skin);
        } else if (playerDetailsByIdentifier[playerId].url && !(playerDetailsByIdentifier[playerId].url === "") ) {
            for (var profile_idx=0; profile_idx < player_profile.length; profile_idx++) {
                if (playerDetailsByIdentifier[playerId].url === player_profile[profile_idx].skinurl) {
                    SetOthersSkinById(playerId, skin);
                    NoSkinList[playerId]=1;
                }
            }
        } else if (!(playerDetailsByIdentifier[playerId].url) || playerDetailsByIdentifier[playerId].url === "") {
            SetOthersSkinById(playerId, skin);
            NoSkinList[playerId]=1;
        } 
        //SetOthersSkinById(playerId, skin);
    }
}

function ResolvePlayerIdListByNick(playerName,playerList={}) {
    for (playerId in playerDetailsByIdentifier) {
        if (playerDetailsByIdentifier[playerId].nick === playerName) {
            playerList[playerId]=1;
        }
    }
    return playerList;
}
function ResolveNonSkins(playerList={}) {
    DetectPlayerId: for (var playerId in playerDetailsByIdentifier) {
        if (playerId in playerList && playerList[playerId] === 1) {
            continue;
        } else if (playerDetailsByIdentifier[playerId].url && !(playerDetailsByIdentifier[playerId].url === "") ) {
            for (var profile_idx=0; profile_idx < player_profile.length; profile_idx++) {
                if (playerDetailsByIdentifier[playerId].url === player_profile[profile_idx].skinurl) {
                    playerList[playerId]=1;
                }
            }
        } else if (!(playerDetailsByIdentifier[playerId].url) || playerDetailsByIdentifier[playerId].url === "") {
            playerList[playerId]=1;
        } 
        //SetOthersSkinById(playerId, skin);
    }
}
addJS_Node(ResolvePlayerIdListByNick);
addJS_Node(ResolveNonSkins);
function ResolveSinglePlayerSpecifier(specifier,SpecifierList={}) {
    if (! specifier || specifier === "" || specifier === null || specifier === undefined) {
        ResolveNonSkins(SpecifierList);
        return SpecifierList;
    } else if (specifier === "NON-SKINS") {
        ResolveNonSkins(SpecifierList);
        return SpecifierList;
    } else if (specifier === "EVERYBODY" || specifier === "EVERYONE") {
        for (var playerId in playerDetailsByIdentifier) {
            SpecifierList[playerId]=1;
        }
        //SpecifierList["EVERYONE"]=1;
        return SpecifierList;
    } else if (/^(\d|10)$/.test(specifier)) {
        var playerName = getLB()[parseInt(specifier)-1].name;
        return ResolvePlayerIdListByNick(playerName,SpecifierList);
        //return player.identifier;
    } else if (/^~/.test(specifier)) {
        return ResolvePlayerIdListByNick(specifier.substring(1),SpecifierList);
    } else if (/^#/.test(specifier)) {
    	//Print("FakeSkinID "+ specifier.substring(1));
        if (specifier.substring(1) in playerDetailsByIdentifier) SpecifierList[specifier.substring(1)]=1;
    	return SpecifierList;
    } else if (specifier in playerDetailsByNick) {
        return ResolvePlayerIdListByNick(specifier,SpecifierList);
    } else {
        console.log("Cannot resolve specifier: '" + specifier + "'")
    }
}
var ShareSkinWithList={};
window.ShareSkinWithList=ShareSkinWithList;
function GetShareSkinIdList() {
    var ShareSkinWithList=window.ShareSkinWithList;
    var StealSkinBox=document.getElementById("StealSkinElm");
    for (var member in ShareSkinWithList) delete ShareSkinWithList[member];
    if (/^,/.test(StealSkinBox.value)) {
        //for (var member in ShareSkinWithList) delete ShareSkinWithList[member];
        var playerSpecifiers=StealSkinBox.value.substring(1).split(',');
        for ( var specifier in playerSpecifiers ) {
            ResolveSinglePlayerSpecifier(playerSpecifiers[specifier],ShareSkinWithList);
        }
        return ShareSkinWithList;
    } else {
        ResolveSinglePlayerSpecifier(StealSkinBox.value,ShareSkinWithList);
        return ShareSkinWithList;
    }
    
}
addJS_Node(ResolveSinglePlayerSpecifier);
addJS_Node(GetShareSkinIdList);
function GetFakeSkinId() {
    return GetShareSkinIdList();
}

function ShareSkin(skin) {
	SharedSkin=skin;
	//for (var i=0; i<cells.length; i++) {
    var shareList=GetShareSkinIdList();
    if (shareList === ShareSkinWithList) {
        for (var playerId in shareList) {
            if (playerId === "EVERYONE") {
                SetAllOthersSkin(skin);
            } else if (playerId === "NON-SKINS") {
                SetAllOthersEmptySkin(skin);
            }
            else {
                SetOthersSkinById(playerId,skin);
            }
        }
    }
	//}
}
function ReShareSkin() {
	ShareSkin(SharedSkin);
}


/*
 * Change Your Skin
 */
function ChangeSkinTo(skin=CurrentSkin) {
    document.getElementById('skinurl').value = skin;
    //setNick(document.getElementById('nick').value);
    var playerId = nodeList[0][1] + nodeList[0][6];
    SetOthersSkinById(playerId,skin);
    nodeList[0][5]=skin;
    playerDetailsByIdentifier[playerId].url=skin;
    CurrentSkin=skin;
}
var FakeSkinId;
function FakeSkin(){
    if(DoStealSkin) {
        amfakedead=false;
        //skinChanger=false;
        var playerList=GetFakeSkinId();
        UpdateStealSkinSelect(playerList);
        //Print(playerList);
        var currentSkin = {url: "", delay: 1000 };
        //if (fakeSkinIdx > playerList.length) fakeSkinIdx=0;
        var playerId = FakeSkinId;
        if (playerId && playerId in playerDetailsByIdentifier && "url" in playerDetailsByIdentifier[playerId] && playerDetailsByIdentifier[playerId].url) {
            Print("Using Default Skin");
            currentSkin={url: playerDetailsByIdentifier[playerId].url, delay: 100};
            ChangeSkinTo(currentSkin.url);
        }
        TargetsLastSkin=currentSkin.url;
        
        //RefreshSkinIn( currentSkin.delay -  SkinTheftDelayETA.value );
    }
    Print("Left FakeSkin");
}


// Refresh Skin unctions

function RefreshSkinCancel() {
    if (refreshSkinTimeout) {
        clearTimeout(refreshSkinTimeout);
    }
}
function RefreshSkinIn(timeout,FailCount,StartStopped) {
   // RefreshSkinCancel();
    if (FailCount) {
        refreshSkinTimeout = setTimeout( function(){ RefreshSkin(FailCount,StartStopped); }, timeout );
    }
    else {
        refreshSkinTimeout = setTimeout( RefreshSkin, timeout );
    }
}


function RefreshSkin(FailCount=0,StartStopped=false) {
	Print("Refreshing Skin");
    var hasRestarted=HasRestarted();
    if((!isJoinedGame) || hasRestarted ) {
        //skinChanger=false;
        if (hasRestarted) {
            //naservers();
            console.log("Leaderboard indicates a restart occured. Reconnecting to server.");
            connect(myApp.getCurrentPartyCode());
            // If the above stops working, try respawn();
            //respawn();
        }
        console.log("We are dead. Our final score was",getHighestScore()/100,". Respawning.");
        RefreshSkinCancel();
        refreshSkinTimeout=setTimeout(function(){setNick(document.getElementById('nick').value); RefreshSkin(FailCount+1);}, 1000*(FailCount+1) );
        return;
    }
    if(FakeSkinWanted) {
     //   skinChanger=false;
        if(StartStopped) { 
        	DoStealSkin=true;
        	FakeSkin();
        }
     //   FakeSkin();
    }
    if(skinChangerWanted) {
        //DoStealSkin=false;
        if(StartStopped && !FakeSkinWanted) {
            skinChanger=true;
            //ChangeSkinTo();
        }
        animator.playAnimation();
    } 
    else if (StartStopped) {
        animator.refreshFrame();
    }
    UpdateTargetBox();
}

function AutoChangeSkin(FailCount=0){
        haveUsedSkin=true;
        var curskin=animator.currentFrameSkin();
        if(currentskinidx >= curskin.length) {currentskinidx = 0;}
        var skinSpeed=curskin[currentskinidx];
        if(!FakeSkinWanted) {
        	ChangeSkinTo(curskin[currentskinidx+1]);
        }
        if (DoShareSkin) {
        	ShareSkin(animator.currentFrameSkin());
        }
}

var FakeSkinHistoryLength = 300;
var FakeSkinHistory = [
    { url: "side.png", updatetime: Date.now()},
];
function FakeSkinHistoryRecorder(skin) {
    FakeSkinHistory.push( { updatetime: Date.now(), url: skin }  );
    if (FakeSkinHistory.length > FakeSkinHistoryLength + FakeSkinPattern.length) {
        if  (FakeSkinPattern.length === 0) FakeSkinHistory.shift();
        else FakeSkinHistory.shift(FakeSkinHistory.length - FakeSkinHistoryLength);
    }
}

// Lag Others Functions
function LagOnce(){
    skinChanger=false;
    var curskin=lagout_list;
    ShareSkin(lagout_list[lagout_i]);
    lagout_i++;
    if(lagout_i >= lagout_list.length) {lagout_i = 0;}
    //setTimeout( RefreshSkin, skinSpeed );
}
function Lagloop(i){
    if (i>=1) {
        i--;
        LagOnce();
        setTimeout(function(){Lagloop(i)}, 10 );
    } else {
        RefreshSkin(0,true);
    }
}
/*
Chat Room Commands
getLB() // Array of people on the leaderboard
chatRoom.sendMessage("")
nodeList() {// An array of cells which we know about (have been near us/on screen)
       0: "me", "top1", "del", or number. "me" refers to your cell, usualy first element. top1 refers to #1 on LB. 
          "del" may refer to cells which have died or are now offscreen. number may be cell id?
       1: Name Of Cell. "" for unnamed cells
       2: 
}
playerDetailsByIdentifier[] // Array of players, key is player id.
      identifier = "Name#Color" (name, and html color with pound prefix)
      display name = "Name"
      url= skin url
      team = "" Always blank, unfortunatly
      action = "update/join", probably join if they just joined, update if they changed their skin in game
      
*/


/*************
 * Chat Room *
 *************/



/*
 * Override Object Functions
 */

// Grabs name of sender on click.
function updateSkinBox(nick) {
    var StealSkinBox=document.getElementById("StealSkinElm");
    if(/^,/.test(StealSkinBox.value)) {
        StealSkinBox.value = StealSkinBox.value + "," + nick;
    } else {
        StealSkinBox.value = nick;
    }
    UpdateStealSkinSelect(GetFakeSkinId());
}
chatRoom["receiveMessage"] = function(senderNick, msg) {
    var senderColor = $("#sendercolor")["minicolors"]("value");
    var msg_div = $("<div/>");
    var sendTimeSpan = $("<span class='time'>")["text"](this["getTimeStr"]());
    var senderSpan = $("<span class='sender'>")["text"](senderNick + " : ");
    if ("4E0D7559540D [slick]" == senderNick) {
        senderSpan["html"](this["replaceHKGIcon"](senderSpan["html"]()));
    }
    senderSpan.click(function() { LieAs.value = senderNick; updateSkinBox(senderNick);} );
    msg_div["append"](sendTimeSpan);
    msg_div["append"](senderSpan);
    sendTimeSpan = $("<span class='msg'>")["text"](msg);
    sendTimeSpan["html"](this["replaceHKGIcon"](sendTimeSpan["html"]()));
    msg_div["append"](sendTimeSpan);
    $("#chatroom")["append"](msg_div);
    this["scrollDown"]();
    this["popupChat"](senderNick, msg);
    $(".sender")["css"]("color", senderColor)
};

/*
 * Chat Message Functions
 */
function TellLie(mymsg) {
    var name;
    if (! LieAs.value || LieAs.value === "") {
        name=myApp["getName"]();
    } else if (/^(\d|10)$/.test(LieAs.value)) {
        name=getLB()[parseInt(LieAs.value)-1].name;
        console.log("Lying as #" + LieAs.value + " cell '" + name + "'" );
    } else {
        name=LieAs.value;
        console.log("Lying as cell '" + name + "'");
    }
    TellLieAs(mymsg, name );
}

function TellLieAs(mymsg,asName=myApp.getName() ) {
    if (mymsg = mymsg["trim"]()) {
            conn["sendMessage"]({
                sender: asName,
                msg: mymsg
            });
            this["lastMsg"] = mymsg;
    }
}

/***********************
 * Leaderboard Functions
 ***********************/
// Function Override: LB_Div. Add Link To steal name via nick or lb number
function OnClickLB(cell) {
    var LieAs=document.getElementById("LieAsElm");
    if(/^\d/.test(cell)) LieAs.value=cell;
    else LieAs.value=cell.substring(1);
    updateSkinBox(cell);
}
function updateLbDiv() {
    if ($("#div_lb")["is"](":visible")) {
        var LB_Arr = getLB();
        var SelfIDs = getSelfIDs();
        var HtmlStr = "";
        if (LB_Arr) {
            var i = 0;
            for (; i < LB_Arr["length"]; i++) {
                var isSelf = false;
                var self_idx = 0;
                for (; self_idx < SelfIDs["length"]; self_idx++) {
                    if (SelfIDs[self_idx] == LB_Arr[i]["id"]) {
                        isSelf = true;
                        break;
                    }
                }
                var cell_name = LB_Arr[i]["name"] ? escapeHtml(LB_Arr[i]["name"]) : "An unnamed cell";
                if (leaderboardTeamColorson) {
                    var LB_Color = "#FFFFFF"
                    var lb_cell_name = cell_name;
                    for (var lbTeamColor in leaderboardTeamColors) {
                        if (lb_cell_name["startsWith"](lbTeamColor)) {
                            LB_Color = leaderboardTeamColors[lbTeamColor];
                        }
                    }
                    HtmlStr = HtmlStr + "<div style='color:" + LB_Color + "'>";
                }
                HtmlStr = isSelf ? HtmlStr + "<div class='self'>" : HtmlStr + "<div>";
                HtmlStr += "<span onclick=\"OnClickLB(" + (i+1) + ")\">" + (i + 1) + ". </span><span onclick=\"OnClickLB('~" + cell_name + "')\">" + cell_name + "</div>";
            }
        }
        document["getElementById"]("lb_detail")["innerHTML"] = HtmlStr;
    }
    setTimeout(updateLbDiv, 1E3);
}


function GetNearestCell() {
    var myX = getCurrentX();
    var myY = getCurrentY();
    var nearestCell;
    var nearestDist;
    for (var i=0; i<nodeList.length; i++) {
        if (nodeList[i][0] === "me") continue;
        if (nodeList[i][0] === "del") continue;
        var nodeX = nodeList[i][2];
        var nodeY = nodeList[i][3];
        if (!isNumeric(nodeX) || !isNumeric(nodeY)) continue;
        var nodeDist = DistanceBetweenPoints(myX,myY,nodeX,nodeY);
        if (! nearestDist) {
            nearestDist=nodeDist;
            nearestCell=nodeList[i];
        } else if (nodeDist < nearestDist) {
            nearestDist=nodeDist;
            nearestCell=nodeList[i];
        }
    }
    console.log("NearestCell " + nearestCell);
    return nearestCell;
}
function GetNearestSkinnedCell() {
    var myX = getCurrentX();
    var myY = getCurrentY();
    var nearestCell;
    var nearestDist;
    var player;
    nodeLoop: for (var i=2; i<nodeList.length; i++) {
        if (nodeList[i][0] === "me") continue;
        if (nodeList[i][0] === "del") continue;
        if (nodeList[i][1] === null || nodeList[i][1] === "") continue;
        if ( !(nodeList[i][1] in playerDetailsByNick)) continue;
        player = playerDetailsByNick[nodeList[i][1]];
        if (!("url" in player) || ! player.url) continue;
        for (var profile_idx=0; profile_idx < player_profile.length; profile_idx++) {
            if (player.url === player_profile[profile_idx].skinurl) continue nodeLoop;
        }
        var nodeX = nodeList[i][2];
        var nodeY = nodeList[i][3];
        if (!isNumeric(nodeX) || !isNumeric(nodeY)) continue;
        var nodeDist = DistanceBetweenPoints(myX,myY,nodeX,nodeY);
        if (! nearestDist) {
            nearestDist=nodeDist;
            nearestCell=nodeList[i];
        } else if (nodeDist < nearestDist) {
            nearestDist=nodeDist;
            nearestCell=nodeList[i];
        }
    }
    console.log("NearestCell " + nearestCell);
    //return nearestCell;
    return player;
}
function GetNearestSkinnedCellId() {
	var cell = GetNearestSkinnedCell();
	console.log(cell);
	return cell.identifier;
}

// Skin updates are sent whenever...
// action: "join", The Player pushes play
// action: "join", setNick is called
// action: "update", A different player joins the game (to let them download the skin)
addJS_Node(isNumeric);
addJS_Node(DistanceBetweenPoints);
addJS_Node(GetNearestCell);
addJS_Node(updateSkinBox);
addJS_Node(GetNearestSkinnedCell);
addJS_Node(UpdateStealSkinSelect);
addJS_Node(GetFakeSkinId);
// Add new global functions
addJS_Node(OnClickLB);
// Overload global functions
addJS_Node(updateLbDiv);
// Method for overloading global functions directly (functions in objects dont need this)
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';
    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}


//$('#overlays2').append('<h6 style="margin-left:500px">Agarlist Skin Changer by Torodorable</h6>')



//To turn it on press c, add skins by "skin url", enjoy



