// ==UserScript==
// @name            FlowTwitchChat
// @namespace       FlowTwitchChatScript
// @version         3.7.4
// @description     Twitchのチャットをニコニコ風に画面上へ流すスクリプトです
// @author          Emubure
// @name:en         FlowTwitchChat
// @description:en  Flow the chat on Twitch
// @match           https://www.twitch.tv/*
// @grant           none
// ==/UserScript==
(function(){
    const USER_ID = 'ここにTwitchIDを入力してください'
                      //'Type your Twitch ID here.'

   //---ユーザー設定(括弧内はデフォルトの数値)---
    //---User Settings (Default Value)---
    const OPACITY = 1 //コメの透明度(1)　　　　　(透明)0～1(透過なし)　お好みで
    　　　　　　　　　　//Opacity of comments(1)　 (invisible)0～1(visible)

    const SIZE = 1 　　 //コメのサイズ(1)
    　　　　　　　 　　 //Size of comments(1)

    const WEIGHT = 730　//コメの太さ(730)
    　　　　　　　　　　//Thickness of comments(730)

    const LIMIT = 25　　//コメの最大表示数(25)　　　　　 環境に合わせて設定してください
    　　　　　　　　　  //Max number of comments shown(25)　Please modify this value to suit your environment.

    const SPEED = 20 　 //コメの速度(20)
    　　　　　　　　 　 //Speed of comments(20)

    const MAX = 100 　　//コメの最大文字数(100)　　　　　110文字以上だとコメントが画面からはみ出ます
    　　　　　　　　　　//Max number of characters(100)　If over 110, comments will go into the screen.

    const LANE_DIV = 12 //コメの行数(12)
    　　　　　　　　　　//Number of lines(12)
    //---------------------------------------------

    let commentVisibility = 'visible'
    let isVisible = true
    let isStreaming = (location.pathname.indexOf('videos') !== -1)? false : true

    //チャット監視インスタンス
    const CHAT_SECTION_OBSERVER = new MutationObserver(function(mutations){
        mutations.forEach(function(e){
            let addedNodes = e.addedNodes
            if(addedNodes.length)FTC.createComment(addedNodes[0])
        })
    })

    //プレイヤーが読み込まれるまで待つ
    let retryCount=0
    var waitLoading = setInterval(function(){
        retryCount++
        if(retryCount > 10){
            console.log('【FTC】There is no Chat Section.')
            clearInterval(waitLoading)
        }
        if(Body.getChatSection()!==undefined){
            FTC.initialize()
            FTC.createReloadButton()
            FTC.observeChatSection()
            clearInterval(waitLoading)
        }
    }, 1000)

    let d_timer = 0;
    window.onresize = function(){
        if(d_timer > 0){//発火防止
            clearTimeout(d_timer);
        }
        d_timer = setTimeout(function(){
            FTC.deleteAllComments()
            FTC.initialize()
            d_timer = 0
        }, 200);
    }

    var Body = {
        getPlayer: function(){return document.getElementsByClassName('video-player__container player theme--dark')[0]},
        getChatSection: function(){return (document.getElementById('root').getAttribute('data-a-page-loaded-name')==='ChannelPage')?document.getElementsByClassName('tw-flex-grow-1 tw-full-height tw-pd-b-1')[0]:document.getElementsByClassName('tw-align-items-end tw-flex tw-flex-wrap tw-full-width')[0]},
        getComments: function(){return document.getElementsByClassName('ftc_comment')},
        getCommentStyle: function(){return document.getElementById('ftc_style')}
    }

    var Screen = {
        getWidth: function(){return Body.getPlayer().clientWidth},
        getHeight: function(){return Body.getPlayer().clientHeight}
    }

    var FTC = {
        initialize: function(){
            console.log('【FTC】initialize...')
            const PLAYER = Body.getPlayer()
            const SCREEN_WIDTH = Screen.getWidth()//プレイヤーの横幅
            const SCREEN_HEIGHT = Screen.getHeight()//プレイヤーの縦幅
            const SCREEN_WIDTH_LIMIT = 0 - SCREEN_WIDTH * 4//コメントを プレイヤーの横幅-横幅の2.5倍 まで流す
            const COMMENT_SIZE = Math.round(((SIZE-0.2) * (SCREEN_HEIGHT/LANE_DIV))*100)/100

            let CSS_STYLE = Body.getCommentStyle()
            if(CSS_STYLE!==null)CSS_STYLE.parentNode.removeChild(CSS_STYLE)//既にCSSがあれば消す
            let CSS_html =
                '<style type="text/css" id="ftc_style">'+
                '.ftc_comment{'+
                'line-height: 1;'+
                'position: absolute;'+
                'display: inline-block;'+
                'font-size: '+COMMENT_SIZE+'px;'+
                'font-weight: '+WEIGHT+';' +
                'user-select: none;'+
                'white-space: nowrap;'+
                'border-color: yellow;'+
                'border-width: thin;'+
                'opacity: '+OPACITY+';'+
                '-moz-opacity: '+OPACITY+';'+
                'text-shadow: -1px -1px #000, 1px -1px #000,	-1px 1px #000, 1px 1px #000;'+
                'display: inline-block;'+
                'animation-timing-function: linear;'+
                'animation-fill-mode: forwards;'+
                '}'+
                '#ftc_comment_screen{'+
                'z-index: 2;'+
                '}'+
                '.ftc-comment-button{'+
                'background: none;'+
                'border: none;'+
                'cursor: pointer;'+
                'float: left;'+
                'font-size: 1em;'+
                'height: 4em;'+
                'outline: none;'+
                'overflow: visible;'+
                'padding: 0 0 1em;'+
                'position: relative;'+
                'width: 3em;'+
                '}\n'
            //レーンは2週目まで想定。2週目レーンは、1週目のレーンの間から流す
            //追記:関さんのアーカイブ見てたら2週じゃ足りて無くて草生えたので3週にします
            //実行するのは読み込んだ時とリサイズした時ぐらいなので普段配信見る分には不自由しないはず…
            let laneHeight = new Array()
            for(let i = 0; i < LANE_DIV * 3 - 1; i++){
                laneHeight[i] = SCREEN_HEIGHT * (i/LANE_DIV) + 4//文字が見切れるので4足してる
                if(i>LANE_DIV-1)laneHeight[i] = SCREEN_HEIGHT * ((i%LANE_DIV)/LANE_DIV + 1/(LANE_DIV*2))
                laneHeight[i] = Math.round(laneHeight[i] * 100) / 100//少数第2位まで
                CSS_html +=
                    '@keyframes lane'+i+' {'+
                    'from{ transform: translate('+SCREEN_WIDTH+'px, '+laneHeight[i]+'px); }'+
                    'to{ transform: translate('+SCREEN_WIDTH_LIMIT+'px, '+laneHeight[i]+'px); }'+
                    '}\n'
            }
            CSS_html += '</style>'
            document.body.insertAdjacentHTML('beforeend', CSS_html)

            if(document.getElementById('ftc_comment_screen') === null )document.getElementsByClassName('player-video')[0].insertAdjacentHTML('afterend', '<div id=ftc_comment_screen></div>')//コメント描画用の場所
            if(typeof document.getElementsByClassName('player-button ftc-comment-button')[0] === 'undefined' )FTC.createCommentButton()
        },
        //チャット監視
        observeChatSection: function(){
            CHAT_SECTION_OBSERVER.observe(Body.getChatSection(),{
                childList: true
            })
        },
        //チャットのHTMLCollectionをコメント用のHTMLへ変換
        convertChat: function(chat){
            let html = ''
            let length = 0
            let author = null
            let isMine = false
            let children = chat.children
            //ffzを使ってる場合
            if(chat.lastChild.className === 'message'){
                children = chat.lastChild.children
                author = chat.getElementsByClassName('chat-author__display-name')[0].innerText
            }
            //アーカイブの場合
            if(isStreaming === false){
                //念の為
                let tw_inline_video_chat__message = chat.getElementsByClassName('tw-inline video-chat__message')[0] || undefined
                if(tw_inline_video_chat__message!==undefined){
                    children = tw_inline_video_chat__message.lastChild.children
                }
            }
            //上から順に子要素を見ていく
            children = Array.from(children)//NodeList→Array
            children.some(_chat =>{
                let childType = _chat.getAttribute('data-a-target')
                let childClass = _chat.className
                //テキストorメンションorリンクの場合
                if(childType === 'chat-message-text' ||
                   childType === 'chat-message-mention' ||
                   childClass === 'link-fragment' ||
                   childClass === 'ffz-tooltip' ||
                   childClass === 'chat-line__message-mention ffz--mention-me'){
                    let text = _chat.innerText
                    html += (text.length >= MAX)? text.substr(0,MAX) : text//最大文字以上なら切り捨てる
                    length += text.length
                }
                //エモートの場合
                if(childType === 'emote-name' || _chat.getAttribute('data-test-selector') === 'emote-button'){//Chrome || Firefox
                    let emote = _chat.lastChild.lastChild || _chat.lastChild
                    let size = Math.round(((SIZE-0.2) * (Screen.getHeight()/LANE_DIV))*100)/100
                    html += '<img src="'+emote.getAttribute('src')+'" width="'+size * (emote.naturalWidth / emote.naturalHeight)+'px" height="'+size+'px" alt="'+emote.getAttribute('alt')+'">'
                    length++
                }
                //チアーの場合
                if(childClass === 'tw-nowrap'){
                    let cheer = _chat.firstChild.firstChild
                    if(cheer !== undefined){
                        let cheerAmount = _chat.getElementsByClassName('chat-line__message-amount')[0]
                        let size = Math.round(((SIZE-0.2) * (Screen.getHeight()/LANE_DIV))*100)/100
                        html += '<img src="'+cheer.getAttribute('src')+'" width="'+size * (cheer.naturalWidth / cheer.naturalHeight)+'px" height="'+size+'px" alt="'+cheer.getAttribute('alt')+'">'
                        html += '<strong style="'+cheerAmount.getAttribute('style')+'">'+cheerAmount.innerText+'</strong>'
                        length += 1 + cheerAmount.innerText.length
                    }
                }
                //チアー(ffz用)
                if(childClass === 'ffz-cheer ffz-tooltip'){
                    html += _chat.outerHTML
                    length += 1 + _chat.getAttribute('data-amount').length
                }
                //自分のチャットならtrue
                if(childClass === 'chat-author__display-name'){
                    isMine = (_chat.innerText === USER_ID)? true: false
                }
                //自分のチャットならtrue(ffz用)
                if(author!==null && author === USER_ID){
                    isMine = true
                }
                //最大文字になったら抜ける
                if(length >= MAX)return true
            })

            let convertedComment={
                html: html,
                length: length,
                isMine: isMine
            }
            return convertedComment
        },
        //---------------------------レーン処理-------------------------------
        //1. 描画されてるコメントを全部見る
        //2. コメントの右端がスクリーンからはみ出てたらそのコメントのdata-lane属性のレーン番号をfalseにする　そうでないならtrue
        //(2.5). 一つ前のコメントとの文字数差が10文字以上だったら、コメントの判定ボックスを伸ばして強制的に次のレーンへ流す(追い越してコメントが被るのを防ぐため)
        //3. レーンの真偽を頭から順番に見て、falseだったら次の見て、trueだったらそのレーンに設定してbreak
        judgeLaneNumber: function(CHAT_LENGTH){
            const COMMENTS = Body.getComments()
            const SCREEN_WIDTH = Screen.getWidth()
            const SCREEN_HEIGHT = Screen.getHeight()

            let laneBool = new Array(LANE_DIV*2-1)

            //念の為全部true
            for(let i = 0; i < LANE_DIV*2-1; i++){
                laneBool[i] = true
            }

            //1と2
            for(let i = 0; i <= COMMENTS.length - 1; i++){
                const COMMENT_LANE = COMMENTS[i].getAttribute('data-lane')
                const COMMENT_RECT = COMMENTS[i].getBoundingClientRect()
                const COMMENT_X = COMMENT_RECT.x + COMMENT_RECT.width//コメントの右端のx座標
                const COMMENT_LENGTH = COMMENTS[i].innerText.length
                //2.5(なんともアナログな調整法だけど)
                let commentBoxAdjustment = 0
                if(CHAT_LENGTH - COMMENT_LENGTH >= 5　&& COMMENT_X > SCREEN_WIDTH * 0.8 && COMMENT_X > 0)commentBoxAdjustment = SCREEN_WIDTH - (COMMENT_X) + 70
                if(CHAT_LENGTH - COMMENT_LENGTH >= 13　&& COMMENT_X > SCREEN_WIDTH * 0.4 && COMMENT_X > 0)commentBoxAdjustment = SCREEN_WIDTH - (COMMENT_X) + 70
                laneBool[COMMENT_LANE] = COMMENT_X + commentBoxAdjustment> SCREEN_WIDTH ? false : true//コメントの右端がスクリーンからはみ出ていたらfalse
            }

            //3
            let laneNum=0
            for(let i = 0; i < LANE_DIV*3-1; i++){
                if(laneBool[i]==true){
                    laneNum=i % (LANE_DIV*3 - 1)
                    break
                }else if(laneBool[i]==false){
                    laneNum=(i+1) % (LANE_DIV*3 - 1)
                }
            }

            return laneNum
        },

        //コメント生成
        createComment: function(chat){
            const SCREEN_WIDTH = Screen.getWidth()
            const SCREEN_HEIGHT = Screen.getHeight()

            const CONVERTED_CHAT = FTC.convertChat(chat)
            const CHAT_HTML = CONVERTED_CHAT.html
            const CHAT_LENGTH = CONVERTED_CHAT.length
            const CHAT_IS_MINE = CONVERTED_CHAT.isMine
            const LANE_NUM = FTC.judgeLaneNumber(CHAT_LENGTH)

            let borderStyle = 'none'
            if(CHAT_IS_MINE == true)borderStyle = 'solid'//自分のコメントは縁取りする

            let animDuration = 720/(CHAT_LENGTH+30)
            if(CHAT_LENGTH >= MAX)animDuration = 720/(MAX+30)//最高文字数以上では速さ固定
            if(animDuration < 720/(MAX+30))animDuration = 720/(MAX+30)//最大速度以上では速さ固定
            animDuration = animDuration * (20/SPEED)//スピード適用
            //コメント追加
            document.getElementById('ftc_comment_screen').insertAdjacentHTML('beforeend',
                                                                             '<span class="ftc_comment" data-lane="'+LANE_NUM+'" style="'+
                                                                             'visibility: '+commentVisibility+';'+
                                                                             'border-style: '+borderStyle+';'+
                                                                             'animation-name: lane'+LANE_NUM+';'+
                                                                             'animation-duration: '+animDuration+'s;'+
                                                                             '">'+
                                                                             CHAT_HTML+
                                                                             '</span>')
            FTC.deleteCommentsOutOfScreen(SCREEN_WIDTH)
            FTC.deleteOldComments()
        },

        deleteCommentsOutOfScreen: function(SCREEN_WIDTH){
            const COMMENTS = Body.getComments()
            const SCREEN_MAX_DRAWING_LIMIT = 0 - SCREEN_WIDTH * 4
            for(let i = COMMENTS.length-1; i >= 0; i--){
                if(COMMENTS[i].getBoundingClientRect().x-70 <= SCREEN_MAX_DRAWING_LIMIT){//なんかしらんけど70足りねえから足してる
                    COMMENTS[i].parentNode.removeChild(COMMENTS[i])
                }
            }
        },
        deleteOldComments: function(){
            const COMMENTS = Body.getComments()
            if(COMMENTS.length<=LIMIT)return;
            while(COMMENTS.length>LIMIT){
                COMMENTS[0].parentNode.removeChild(COMMENTS[0])
            }
        },
        deleteAllComments: function(){
            const COMMENTS = Body.getComments()
            for(let i = COMMENTS.length-1; i >= 0; i--){
                COMMENTS[i].parentNode.removeChild(COMMENTS[i])
            }
        },

        //コメント表示切り替えボタン追加
        createCommentButton: function(){
            const PL_FLEX = document.getElementsByClassName('pl-flex')[2]
            const BUTTON_HTML =
                  '<button class="player-button ftc-comment-button" type="button">'+
                  '<span>'+
                  '<span class="player-tip player-tip--comment-invisible-mode" data-tip="コメント非表示"></span>'+
                  '<span class>'+
                  '<svg id="icon_comment_button" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">'+
                  '<path id="comment_button_path" d="M 10.5 9 L 19.5 9 Q 22.5 9 22.5 12 L 22.5 16.5 Q 22.5 19.5 19.5 19.5 L 19.5 22.5 L 16.5 19.5 L 10.5 19.5 Q 7.5 19.5 7.5 16.5 L 7.5 12.0 Q 7.5 9 10.5 9 Z"'+
                  'fill-rule="nonzero" fill="#fff" fill-opacity="1" stroke="#fff" stroke-width="2"></path>'+
                  '</svg>'
            '</span>'
            '</button>'
            if(PL_FLEX!==null){
                PL_FLEX.insertAdjacentHTML('afterend', BUTTON_HTML);
            }

            const BUTTON_ELEMENT = document.getElementsByClassName('player-button ftc-comment-button')[0]
            BUTTON_ELEMENT.onmouseover = function(){
                FTC.changeColor("#b19dd8")
            }
            BUTTON_ELEMENT.onmouseout = function(){
                FTC.changeColor("#fff")
            }
            BUTTON_ELEMENT.onclick = function(){
                FTC.changeCommentVisible()
            }
        },
        changeColor: function(COLOR){
            document.getElementById('comment_button_path').setAttribute('fill', COLOR)
            document.getElementById('comment_button_path').setAttribute('stroke', COLOR)
        },
        changeCommentVisible: function(){
            const COMMENTS = Body.getComments()
            if(isVisible){
                isVisible=false
                commentVisibility='hidden'
                if(COMMENTS.length){
                    for(let i = COMMENTS.length-1; i >= 0; i--){
                        COMMENTS[i].style.visibility = 'hidden'
                    }
                }
                document.getElementsByClassName('player-tip player-tip--comment-invisible-mode')[0].setAttribute('data-tip', 'コメント表示')
                document.getElementById('comment_button_path').setAttribute('fill-opacity', '0')
            }else{
                isVisible=true
                commentVisibility='visible'
                if(COMMENTS.length){
                    for(let m = COMMENTS.length-1; m >= 0; m--){
                        COMMENTS[m].style.visibility = 'visible'
                    }
                }
                document.getElementsByClassName('player-tip player-tip--comment-invisible-mode')[0].setAttribute('data-tip', 'コメント非表示')
                document.getElementById('comment_button_path').setAttribute('fill-opacity', '1')
            }
        },
        //リロードボタン()
        createReloadButton: function(){
            const ELEMENT = document.getElementsByClassName('tw-align-items-start tw-flex tw-flex-wrap tw-justify-content-between tw-mg-t-05')[0]||document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-row tw-flex-shrink-0 tw-full-height tw-pd-1')[0]//tw-c-text-alt-2 tw-flex tw-font-size-5')
            const U_ELEMENT = ELEMENT.getElementsByClassName('tw-mg-x-1')[0]||ELEMENT.getElementsByClassName('tw-flex tw-pd-x-1')[0]
            const HTML =
                  '<div class="tw-relative">'+
                    '<button class="tw-interactive tw-button tw-button--text" id="ftc_reload_button">'+
                      '<span class="tw-button__text">コメント再読込</span>'+
                    '</button>'+
                  '</div>'

            U_ELEMENT.insertAdjacentHTML('afterend', HTML)

            const BUTTON_ELEMENT = document.getElementById('ftc_reload_button')
            BUTTON_ELEMENT.onclick = function(){
                console.log(Body.getChatSection())
                document.getElementById('ftc_comment_screen').parentNode.removeChild(document.getElementById('ftc_comment_screen'))
                document.getElementsByClassName('player-button ftc-comment-button')[0].parentNode.removeChild(document.getElementsByClassName('player-button ftc-comment-button')[0])

                FTC.initialize()
                CHAT_SECTION_OBSERVER.disconnect()
                FTC.observeChatSection()
            }
        }
    }
}())