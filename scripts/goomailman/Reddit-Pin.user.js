// ==UserScript==
// @name        Reddit-Pin
// @namespace   Reddit-Pin
// @author      goomailman
// @description 保存したサブミッションを注目ページにピン留めします。Pin up your saved submission to subreddit's hot page.
// @include     http://www.reddit.com*
// @include     https://www.reddit.com*
// @version     1.32
// @grant       none
// ==/UserScript==
(function () {
  var url = location.href; //ページのURL

  // 保存ボタンがある可能性があるページをチェック
  $('.linklisting > .thing').each(function(i) {
    $(this).find('.save-button').on('click',
      function () {  //保存アクションがあったときにタイマーリセット
      sessionStorage.setItem('RedditPin_date' , null); 
    });
  });

  //Subredditでのみ動作
  if (!(url.indexOf('http://www.reddit.com/r/')  === 0 || url.indexOf('https://www.reddit.com/r/')  === 0)) return;
  
  //ユーザーが変わったらキャッシュを消す
  var user = $('.user').find('a').attr('href').split('/') [4];
  if (  sessionStorage.getItem('RedditPin_user') != user){
    sessionStorage.removeItem('RedditPin_date');
    sessionStorage.removeItem('RedditPin_data');
    console.log('cache clear');
  }

  if (url.split('/')[5]) return;　//注目タブのみ動作
  //言語変換------------------------------------------------------------------
  var lang = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0, 2) == 'ja' ? 'ja' : 'en';
  //lang="en";
  var TXT = {
    'comment_ja': '個のコメント', 'comment_en': ' comments',
    'day_ja': '日', 'day_en': 'day',
    'hour_ja': '時間', 'hour_en': 'hour',
    'minute_ja': '分', 'minute_en': 'minute',
    'second_ja': '秒', 'second_en': 'second',
    'posted_ja': '', 'posted_en': ' posted ',
    'postedago_ja': '前に投稿', 'postedago_en': ' ago',
    'ga_ja': 'が', 'ga_en': ' ',
    'upvote_ja': '賛成投票', 'upvote_en': 'upvote',
    'downvote_ja': '反対投票', 'downvote_en': 'downvote',
    'savedpost_ja': '保存済', 'savedpost_en': 'saved post',
    'unsave_ja': '保存解除', 'unsave_en': 'unsave',
    'reload_ja': '更新', 'reload_en': 'reload',
    'updated_ja': 'キャッシュ日時 ', 'updated_en': 'cached date '
  };
  //日付変換------------------------------------------------------------------
  function postTime(cTime) {
    var now = new Date();
    var elapsed = ((now.getTime() / 1000) - cTime);
    var time = '';
    var days = Math.floor(elapsed / (60 * 60 * 24));
    var hours = Math.floor(elapsed / (60 * 60));
    var min = Math.floor(elapsed / 60);
    var sec = Math.ceil(elapsed);
    if (days > 0) {
      time = days + TXT['day_' + lang] + (lang == 'en' && days > 1 ? 's' : '');
    } else if (hours > 0) {
      time = hours + TXT['hour_' + lang] + (lang == 'en' && hours > 1 ? 's' : '');
    } else if (min > 0) {
      time = min + TXT['minute_' + lang] + (lang == 'en' && min > 1 ? 's' : '');
    } else if (sec > 0) {
      time = sec + TXT['second_' + lang] + (lang == 'en' && sec > 1 ? 's' : '');
    }
    return time;
  }
  //ピンエレメント生成------------------------------------------------------------------
  function createPin(ddc) {
    $('#siteTable').prepend($('<div/>',{'id':'Pinned', 'class':'Pinned entry'})
                            .css({'width':'auto', 'display':'block', 'padding': '0 auto' }) );
    for (var i = 0; i < ddc.length; i++) {
      if (url.split('/') [4] == ddc[i].data.subreddit) { //表示中のサブレのみ対象
        if (!ddc[i].data.parent_id) {　//親IDを持つ子データ（コメント保存）は対象外
          var id =ddc[i].data.id;
          $('#Pinned').append($('<div/>',{'id':'thing-'+ id ,'class':'thing id-' + ddc[i].data.name + ' linkflair linkflair-default saved link ','data-fullname':ddc[i].data.id})
                              .css({'float': 'left','width': '45%'}) );
          $('#thing-' + id).append($('<span/>',{'class':'rank',html:''}));
          $('#thing-' + id).append($('<div/>',{'id':'midcol-' + id ,'class':'midcol ' + ((ddc[i].data.likes == true) ? 'likes': (ddc[i].data.likes == false) ?'dislikes':'unvoted')})
                           .css({'height': '7em' }));
          $('#midcol-' + id).append($('<div/>',{'class':'arrow ' + ((ddc[i].data.likes == true) ? 'upmod':'up') + ' login-required','role':'button','aria-label':TXT['upvote_' + lang],'tabindex':'0'})
                                    .css({'cursor': 'default'}) );
          $('#midcol-' + id).append($('<div/>',{'class':'score dislikes',html:ddc[i].data.score-1}));
          $('#midcol-' + id).append($('<div/>',{'class':'score unvoted',html:ddc[i].data.score}));
          $('#midcol-' + id).append($('<div/>',{'class':'score likes',html:ddc[i].data.score+1}));
          $('#midcol-' + id).append($('<div/>',{'class':'arrow ' + ((ddc[i].data.likes == false) ? 'downmod':'down') + ' login-required','role':'button','aria-label':TXT['downvote_' + lang],'tabindex':'0'})
                                    .css({'cursor': 'default'}) );
          $('#thing-' + id).append($('<a/>',{'id':'thumbnail-' + id, 'class':'thumbnail ' + ddc[i].data.thumbnail + ' may-blank loggedin','href':ddc[i].data.permalink}));
          if (ddc[i].data.thumbnail != 'self') {
            $('#thumbnail-' + id).append($('<img/>',{'src':ddc[i].data.thumbnail,'alt':'','height':'39','width':'70'}));
          }
          $('#thing-' + id).append($('<div/>',{'id':'entry-'+ id,'class':'entry unvoted'})
                           .css({'width': 'auto', 'height': '5.3em'}));
          $('#entry-' + id).append($('<p/>',{'id':'title-'+ id,'class':'title' }));
          $('#title-' + id).append($('<a/>',{'class':'title may-blank loggedin','href':ddc[i].data.url,'tabindex':'1',html:ddc[i].data.title}));
          $('#title-' + id).append($('<span/>',{'id':'domain-'+id, 'class':'domain','href':ddc[i].data.url,'tabindex':'1'}) );
          $('#domain-' + id).append($('<a/>',{'href':url.split('/')[0] + ((ddc[i].data.is_self)?'//www.reddit.com/r/' + ddc[i].data.subreddit:'//www.reddit.com/domain/' + ddc[i].data.domain),html:'(' + ddc[i].data.domain + ')'}));

          $('#thing-' + id).append($('<p/>',{'id':'tagline-' + id,'class':'tagline'})
                           .css({'width': 'auto', 'height': 'auto'}));
          $('#tagline-' + id).append($('<a/>',{'href':url.split('/')[0] + '//www.reddit.com/u/'+ddc[i].data.author,'class':'author may-blank',html:ddc[i].data.author}));
          if (ddc[i].data.author_flair_css_class != null) {
            $('#tagline-' + id).append($('<span/>',{'title':ddc[i].data.author_flair_text,'class':'flair',html:ddc[i].data.author_flair_text}));
          }
          var dd = new Date(0);
          dd.setUTCSeconds(ddc[i].data.created_utc);
          if (ddc[i].data.created_utc) {
            $('#tagline-' + id).append($('<time/>',{'title':dd,'datetime':dd,'class':'live-timestamp',
                                html:TXT['ga_' + lang] + TXT['posted_' + lang] + postTime(ddc[i].data.created_utc) + TXT['postedago_' + lang]}));
          }

          $('#tagline-' + id).append($('<span/>',{'title':TXT['savedpost_' + lang],'class':'stickied-tagline',html:' - '+ TXT['savedpost_' + lang] }));
          if (ddc[i].data.link_flair_css_class != null) {
            $('#tagline-' + id).append($('<span/>',{'class':'linkflairlabel',html:ddc[i].data.link_flair_text})
                           .css({'float':'left'}));
          }

          $('#tagline-' + id).append($('<ul/>',{'id':'flat-list-'+id,'class':'flat-list buttons'}));
          $('#flat-list-' + id).append($('<li/>',{'id':'li1-'+id,'class':'first'}));
          $('#li1-' + id).append($('<a/>',{'href':ddc[i].data.permalink,'class':'comments may-blank',html:ddc[i].data.num_comments + TXT['comment_' + lang]}));
          $('#flat-list-' + id).append($('<li/>',{'id':'li2-'+id,'class':'link-unsave-button save-button'}).on('click',function () {
            sessionStorage .setItem('RedditPin_date' , null);//保存アクションがあったときはタイマーリセット
          })); 
          
          $('#li2-' + id).append($('<a/>',{'href':'#',html:TXT['unsave_' + lang]}));

        }
      }
    }
    return;
  }
  //主処理------------------------------------------------------------------
  var now = new Date();
  now.getTime();
  var saveddate = new Date(sessionStorage .getItem('RedditPin_date'));
  if (sessionStorage.getItem('RedditPin_date')){　
    if ((now - saveddate)/1000 < 60*10)  //最新コメント数の為にキャッシュは10分経過したらリフレッシュ
    {
      var ddc = JSON.parse(sessionStorage .getItem('RedditPin_data'));
      if (ddc) {
        createPin(ddc);
        //キャッシュ更新情報
        $('#Pinned').append($('<div/>',{'class':'Pinn-reload'})
                     .css({'text-align':'right','width':'100%','background':'transparent'})
                     .append($('<button/>',{'class':'Pinn-reload','title':TXT['reload_'+lang],html:TXT['updated_'+lang]+saveddate})
                     .css({'font-size':'9px','color':'#a0a0a0','padding': '1','border': 'none','text-decoration': 'none','background':'transparent'})
                     .click(function (){ //手動タイマーリセット
                        sessionStorage.setItem('RedditPin_date' , null); 
                        location.reload();
                      })
                   )
        );
      }
      return; //キャッシュで描いたら終了
    }
  }
  //ユーザーの保存したsubreditを取得する
  $.getJSON(url.split('/')[0] + '//www.reddit.com/user/' + user + '/saved/.json?limit=50&after=', function (data) {
    var ddc = data.data.children;
    createPin(ddc);
    sessionStorage.setItem('RedditPin_data' , JSON.stringify(ddc));　//キャッシュ
    sessionStorage.setItem('RedditPin_date' , now);
    sessionStorage.setItem('RedditPin_user' , user);
  });
    
}) ();
