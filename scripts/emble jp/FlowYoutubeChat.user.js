// ==UserScript==
// @name            FlowYoutubeChat
// @namespace       FlowYoutubeChatScript
// @version         0.4.3
// @description     Youtubeのチャットをニコニコ風に画面上へ流すスクリプトです
// @author          Emubure
// @name:en         FlowYoutubeChat
// @description:en  Flow the chat on Youtube
// @match           https://www.youtube.com/watch?v=*
// @grant           none
// ==/UserScript==
(function(){
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

    let isVisible = true
    let commentVisibility = 'visible'

    //プレイヤーが読み込まれるまで待つ
    let retryCount=0
    var waitLoading = setInterval(function(){
        retryCount++
        if(retryCount > 20){
            console.log('【FTC】There is no Chat Section.')
            clearInterval(waitLoading)
        }
        console.log(Body.getChatSection())
        if(Body.getChatSection()!==undefined){
            console.log(Body.getChatSection())
            FTC.initialize()
            //FTC.createReloadButton()
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
        getPlayer: function(){return document.getElementById('movie_player')},
        getChatSection: function(){return document.getElementById('chatframe').contentDocument.getElementsByClassName('style-scope yt-live-chat-item-list-renderer')[4]},
        getComments: function(){return document.getElementsByClassName('ftc_comment')},
        getCommentStyle: function(){return document.getElementById('ftc_style')}
    }

    var Screen = {
        getWidth: function(){return Body.getPlayer().clientWidth},
        getHeight: function(){return Body.getPlayer().clientHeight},
    }

    var FTC = {
        initialize: function(){
            console.log('【FTC】initialize...')
            const PLAYER = Body.getPlayer()
            const SCREEN_WIDTH = Screen.getWidth()//プレイヤーの横幅
            const SCREEN_HEIGHT = Screen.getHeight()//プレイヤーの縦幅
            const SCREEN_WIDTH_LIMIT = 0 - SCREEN_WIDTH * 4//コメントを プレイヤーの横幅-横幅の2.5倍 まで流す
            const COMMENT_SIZE = Math.round(((SIZE-0.2) * (SCREEN_HEIGHT/LANE_DIV))*100)/100

            const COMMENT_CSS = Body.getCommentStyle()
            if(COMMENT_CSS!==null)COMMENT_CSS.parentNode.removeChild(COMMENT_CSS)//既にCSSがあれば消す
            let CSS_html =
                '<style type="text/css" id="ftc_style">'+
                '.ftc_comment{'+
                'line-height: 1;'+
                'z-index: 30;'+
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
                'z-index: 30;'+
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
            //レーンは3週目まで想定。2週目レーンは、1週目のレーンの間から流す
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

            if(document.getElementById('ftc_comment_screen') === null )PLAYER.insertAdjacentHTML('afterbegin', '<div id=ftc_comment_screen></div>')
            if(typeof document.getElementsByClassName('ytp-button ftc-comment-button')[0] === 'undefined' )FTC.createCommentButton()
        },
        //チャット監視
        observeChatSection: function(){
            const CHAT_SECTION_OBSERVER = new MutationObserver(function(mutations){
                mutations.forEach(function(e){
                    let addedNodes = e.addedNodes
                    if(addedNodes.length)FTC.createComment(addedNodes[0])
                })
            })
            CHAT_SECTION_OBSERVER.observe(Body.getChatSection(),{
                childList: true
            })
        },
        //チャットのHTMLCollectionをコメント用のHTMLへ変換
        convertChat: function(chat){
            let html = ''
            let length = 0
            let isMine = false
            let author = null

            let children = Array.from(chat.children)//NodeList→Array
            let text = children[1].children[2].innerText
            html += (text.length >= MAX)? text.substr(0,MAX) : text
            length += text.length

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
                if(CHAT_LENGTH - COMMENT_LENGTH >= 3　&& COMMENT_X > SCREEN_WIDTH * 0.8 && COMMENT_X > 0)commentBoxAdjustment = SCREEN_WIDTH - (COMMENT_X) + 70
                if(CHAT_LENGTH - COMMENT_LENGTH >= 10　&& COMMENT_X > SCREEN_WIDTH * 0.4 && COMMENT_X > 0)commentBoxAdjustment = SCREEN_WIDTH - (COMMENT_X) + 70
                laneBool[COMMENT_LANE] = COMMENT_X + commentBoxAdjustment> SCREEN_WIDTH ? false : true//コメントの右端がスクリーンからはみ出ていたらfalse
            }

            //3
            let laneNum=0
            for(let i = 0; i < LANE_DIV*3-1; i++){
                if(laneBool[i]==true){
                    laneNum=i % (LANE_DIV*3-1)
                    break
                }else if(laneBool[i]==false){
                    laneNum=(i+1) % (LANE_DIV*3-1)
                }
            }

            return laneNum
        },

        //コメント生成
        createComment: function(chat){
            const SCREEN_WIDTH = Screen.getWidth()
            const SCREEN_HEIGHT = Screen.getHeight()

            const CHAT_DATA = FTC.convertChat(chat)
            const CHAT_HTML = CHAT_DATA.html
            const CHAT_LENGTH = CHAT_DATA.length
            const CHAT_IS_MINE = CHAT_DATA.isMine
            const LANE_NUM = FTC.judgeLaneNumber(CHAT_LENGTH)

            //自分のコメントは縁取りする
            let borderStyle = 'none'
            if(CHAT_IS_MINE == true)borderStyle = 'solid'

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

        //コメント表示切り替えボタン追加(実装予定)
        createCommentButton: function(){
            const PL_FLEX = document.getElementsByClassName('ytp-button ytp-settings-button')[0]
            const BUTTON_HTML =
                  '<button class="ytp-button ftc-comment-button" id="ftc_comment_visibility_button" type="button" aria-label="コメント非表示">'+
                    '<svg id="icon_comment_button" height="100%" version="1.1" viewBox="0 0 36 36" width="100%">'+
                      '<path id="comment_button_path" d="M 14 12 L 26 12 Q 30 12 30 16 L 30 22 Q 30 26 26 26 L 26 30 L 22 26 L 14 26 Q 10 26 10 22 L 10 16 Q 10 12 14 12 Z"'+
                      'fill="#fff" fill-opacity="1" stroke="#fff" stroke-width="2"></path>'+
                    '</svg>'+
                  '</button>'
            if(PL_FLEX!==null){
                PL_FLEX.insertAdjacentHTML('afterend', BUTTON_HTML);
            }

            const BUTTON_ELEMENT = document.getElementsByClassName('ytp-button ftc-comment-button')[0]
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
                document.getElementById('ftc_comment_visibility_button').setAttribute('aria-label', 'コメント表示')
                document.getElementById('comment_button_path').setAttribute('fill-opacity', '0')
            }else{
                isVisible=true
                commentVisibility='visible'
                if(COMMENTS.length){
                    for(let m = COMMENTS.length-1; m >= 0; m--){
                        COMMENTS[m].style.visibility = 'visible'
                    }
                }
                document.getElementById('ftc_comment_visibility_button').setAttribute('aria-label', 'コメント非表示')
                document.getElementById('comment_button_path').setAttribute('fill-opacity', '1')
            }
        }
    }
}())