// ==UserScript==
// @name         SoldOut 2 文本替换
// @namespace    https://game.granbluefantasy.jp/
// @version      0.5
// @description  替换文本方式汉化UI，肯定有bug，我什么都不会做的
// @author       丘某
// @match        https://so2.mutoys.com/
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    const i18n = new Map([
      ['ホーム', '主页'],
      ['お店', '店面'],
      ['仕入れ','市场'],
      ['ポイント', '点数'],
      ['はじめに', '介绍'],
      ['お知らせ', '通知'],
      ['注文', '预定'],
      ['レシピ', '配方'],
      ['ステータス', '状态'],
      ['ランキング', '排行'],
        ['レポート', '报告'],
        ['预定レポ', '订单Repo'],
        ['ミュート', '黑名单'],
        ['イベント', '活动'],
        ['プレミアム', '赞助'],
        ['ヘルプ', '帮助'],
        ['アカウント', '账户'],
        ['ログアウト', '注销'],
        ['メモ', '备忘录'],
        ['チュートリアル', '教程'],
        ['バージョン', '版本'],
        ['ショップ', '店'],
        ['オーナー番号', '店主编号（id）'],
        ['キャッチコピー', '广告标语'],
        ['基本ステータス', '基本状态'],
        ['やりなおし劵', '重做劵'],
        ['キャンセル', '取消'],
        ['外部サイト', '外部网站'],
        ['クイックポーション', '快速药水'],
        ['明るさ切替', '亮暗主题切换'],
        ['再同期', '再同步'],
        ['道路に近いとお客さんが立ち寄りやすいよ', '当道路在附近时，客户很容易进入'],
        ['エメラルド街', 'エメラルド街-翡翠街'],
        ['ルビー街', 'ルビー街-红宝石街'],
        ['サファイア街', 'サファイア街-蓝宝石街'],
        ['アメジスト街', 'アメジスト街-紫水晶街'],
        ['ガーネット街', 'ガーネット街-石榴石街'],
        ['トパーズ街', 'トパーズ街-黄玉街'],
        ['トパーズ郊外', 'トパーズ郊外-黄玉郊外'],
        ['トパーズ村', 'トパーズ村-黄玉村'],
        ['パール街', 'パール街-珍珠街'],
        ['ブルー街', 'ブルー街-蓝街'],
        ['レッド街', 'レッド街-红街'],
        ['バトル街', 'バトル街-战斗街'],
        ['ミミ星人街', 'ミミ星人街-咪咪星人街'],
        ['アジト跡地', 'アジト跡地-藏身处'],
        ['メリー街', 'メリー街-玛丽街'],
        ['イメージ', '图像'],
        ['メッセージ', '消息'],
        ['マップ', '地图'],
        ['店面が増えるともっと楽しくなるよ！紹介してね！', '如果添加更多商店会更有趣！请介绍！'],
        ['ストーリーを選んでみんなに SOLD OUT 2 を紹介しよう！', '选择一个故事并向每个人介绍SOLD OUT 2！'],
        ['ストーリーを選ぶ', '选择一个故事'],
        ['PVもあるよ！', '还有PV！'],
        ['初心者向けの主页を表示する', '显示面向初学者的主页'],
        ['ホーム', '主页'],
        ['ベースキャンプ', 'ベースキャンプ（营地）'],
        ['アトリエ', 'アトリエ'],
        ['テナント', 'テナント'],
        ['ログハウス', 'ログハウス（木屋）'],
        ['ショップ', 'ショップ（店）'],
        ['ファクトリー', 'ファクトリー（工厂）'],
        ['マーケット', 'マーケット（超市）'],
        ['可能な限り演出を簡略化します（動作が遅い時にどうぞ）', '我们将尽可能简化演出（请在速度慢的时候使用）'],
        ['メインカラー切替', '主要颜色切换'],
        ['アクセントカラー切替', '强调色切换'],
        ['ボタン左右入替', '按钮左右交换'],
        ['テキストコピー可能', '文本可选择'],
        ['アプリ版省エネ', 'APP版省电模式'],
        ['メニュー', '菜单'],
        ['ポップアップ', '弹出消息'],
        ['ブラウザ', '浏览器'],
        ['サウンド', '声音'],
        ['プライバシー', '隐私'],
        ['いにしえの呪文をとなえよ。さすれば門は開かれるであろう。', '赞美牧师的咒语。然后门将被打开。'],
        ['他にもどこかでなにかが起こるかも', '某处会发生某些事情……'],
        ['同作業をもう一度', '同作業再次進行'],
        ['なにも販売していません', '我沒有在賣任何東西'],
        ['配方はありません', '沒有配方'],
        ['なにも見つかりませんでした…', '什麼都沒發現......'],
        ['なにも作業していません', '沒有正在進行的作業。'],
        ['ゲームサーバーへ接続中', '連接到遊戲服務器'],
        ['オーナーが入店しました', '店主已進入'],
        ['コンパクト', '緊湊'],
        ['お手伝い妖精呼び出し', '援助仙女召喚'],
        ['呼び出し', '召喚'],
        ['ゲームデータ更新を非通知', '遊戲數據更新不通知'],
        ['カスタマイズ', '定制'],
        ['既に出店している方はこちら', '如果您已經在這裡開店'],
        ['まだ店面を持っていない方はこちら', '如果您還沒有店面'],
        ['ボタンサイズ', '按鈕大小'],
        ['ボタン', '按鈕'],
        ['ヘッダ', '頂部'],
        ['ワイド', '寬廣'],
        ['タップ', '點按'],
        ['リスト', '列表'],
        ['なし', '無'],
        ['ゲームデータの準備中だよ', '游戏数据准备中'],
        ['続きをプレイする', '继续游玩'],
        ['Google账户でプレイ', '用Google账户玩'],
        ['Twitter账户でプレイ', '用Twitter账户玩'],
        ['Yahoo! JAPAN IDでプレイ', '用Yahoo! JAPAN ID玩'],
        ['新しく始める', '新的开始'],
        ['とにかくプレイしてみる', '无论如何先试玩一下'],
        ['ちょっと待ってね', '请稍等片刻'],
        ['なにも輸送していません', '沒有東西正在輸送'],
        ['実行する', '執行'],
        ['閉じる', '关闭'],
        ['範囲内のみ', '仅在范围内'],
        ['图像スタイル', '图像样式'],
        ['ロイヤリティ', '专利费'],
        ['経験値バーパーセント表示', '経験値百分比显示'],
        ['夜はこない', '无夜晚效果'],
        ['ずっとBGM', 'BGM后台播放'],
        ['スタイル', '风格'],
        ['オススメの進め方', '推荐的游戏进行方式'],
        ['へようこそ', '欢迎您'],
        ['「作業」の手順を覚える', '学习「作業」的流程'],
        ['「販売」の手順を覚える', '学习「販売」的流程'],
        ['「市场」の手順を覚える', '学习「市场」的流程'],
        ['困った時は', '遇到问题时'],
        ['で先輩プレイヤーに聞く', '的国际友人和群里的大佬会热心帮助你，详询Q群422877047'],
        ['それぞれの手順は', '请务必记住'],
        ['で覚えてね', '的每个步骤'],
        ['読まずに直感で進めてもいいよ', '你完全可以在没有阅读的情况下继续靠直觉前进'],
        ['全部無視して好きにやっちゃってもOK', '甚至可能忽略了所有这些并且做得一样好'],
        ['とりあえず「店面」と「市场」でなんとかなるから', '目前，我将管理“店面”和“市场”。'],
        ['急いで進めたい時は', '当着急前进时，找到旁边的'],
        ['アイコン', '图标'],
        ['を押すと', '按一下，用'],
        ['を使って短縮できるよ', '以缩短时间'],
        ['じわじわと面白くなっていくからのんびり進めてみてね！（4～5日目くらいから面白くなる人が多いみたい）', '游戏会逐渐变得有趣，所以让我们继续前进！ （似乎有很多人从第4天到第5天感兴趣）'],
        ['詳しいことはここにも書かれているよ', '进一步的细节写在这里'],
        ['初心者向け主页', '初心者向主页'],
        ['今見ているこの画面は初心者向けに簡素化された主页画面です', '我们现在看到的这个页面是一个面向新手的简化主页'],
        ['資金が1,000G以上になると通常の主页画面に変わります', '当资金达到1,000 G或更高时，它将变为正常的主页面'],
        ['ゲームデータの更新があります', '有游戏数据的更新'], 
        ['新しいゲームデータが見つかりました。更新しましょう。', '发现了新的游戏数据。我们来更新吧。'], 
        ['まだ読んでいない更新案内があります。', '有尚未阅读的更新通知。'], 
        ['更新案内が届きました', '更新指南来了哦'], 
        ['街に売り物が少ないと お客さんはヨソに引っ越しちゃうかも', '如果街道上销售的东西很少，客户可能会搬到另一个街道。'], 
        ['お店の売り物が高いと お客さんはそのうち引っ越しちゃうかも', '如果店里东西卖的贵，客人可能会搬走。'], 
        ['小さい子が多い街は未来が明るくていいよね！', '小孩子多的街道未来是光明的。'], 
        ['どんな人が住み着いてくれるかは お店の品揃え にかかってるよ', '什么样的人会住在哪里取决于商店的分类'], 
        ['[移動販売]っていう店舗は 引っ越し費用がかからないよ', '[移動販売]搬迁不需费用。'], 
        ['おもわずつぶやいちゃうお客さんがいたら 脈ありだよ', '…………喵'], 
        ['なにも売れずお客さんもこない時は 引っ越した方がいいかも', '无论卖什么都没有客人时，搬家可能会更好。'], 
        ['人口が多い街の方がお金持ちのお客さんが多いよ', '人口多的地方有钱人也多。'], 
        ['1日1万Gの利益がでたら十分なんじゃないかな', '我想知道每天10,000 G的利润是否足够。'], 
        ['倉庫や保管庫の表示は設定で小さくコンパクトにできるよ', '仓库和保管库的显示可以设置得小而紧凑。'], 
        ['倉庫や保管庫の並び順はソートボタンでいつでも変えられるよ', '您可以使用排序按钮随时更改仓库和保管库的顺序。'], 
        ['欲しいものが売られてなかったら 注文 を出してみてね', '如果您想要的东西没有出售，请下订单。'], 
        ['加工品は手間がかかるけど その分お客さんに注目されやすいよ', '加工物品需要花费时间和精力，但客人更容易注意它。'], 
        ['経験を積むと 少しずつだけど上手になるから頑張って', '如果你获得了经验, 你会做得更好一点。'], 
        ['アクセスしない期間が長くなるとお店消滅だよ ヘルプ見ておいてね', '长期不访问，商店就倒闭了，请多关注。'], 
        ['作業は一度に50回まで指示できるよ', '您一次最多可以进行50回作业。'], 
        ['キャッチコピーは[申請書]を使うと変えられるよ', '您可以使用[申请表]更改广告语'], 
        ['引っ越しには[店舗設計図]と[家財道具]と[費用]が必要だよ', '搬家需要[店舗設計図]和[家財道具]以及[費用]。'], 
        ['周りにお店が多いとお客さんも多くなるけど 高いと売れないよ', '如果周围有很多商店，会有更多的顾客，但如果价格昂贵则不好出售'], 
        ['周りにお店が少ないとお客さんも少ないけど 多少高くても買ってくれるかも', '如果周围的商店很少，即使价格昂贵，也很少有顾客会购买'], 
        ['お店の周りの地形で採れるモノや量が 全然 違うよ', '可以在商店周围的地形中采取的事物和数量是完全不同的'], 
        ['お店が建ってる地形からはなにも採れないよ', '我不能从商店建造的地形上采集任何东西'], 
        ['採取は お店の周りの土地 から行われるよ', '采集是从商店周围的土地完成的'], 
        ['採取する範囲は そんなに広くはないけど そんなに狭くもないよ', '采集的范围并不是那么广泛，但也并不是那么狭窄'], 
        ['採取は いつも同じ場所から するわけでもないよ', '采集并不总是从同一个地点'], 
        ['お隣さんが引っ越してきても 採取にはそんなに影響ないから安心してね', '即使您的邻居搬家，采集也不会受到太大影响，所以不要担心'], 
        ['何度トライしても採れなくなってしまったら 引っ越しを考えた方がいいかもね', '如果你尝试多少次都采集不到东西，那么考虑搬家可能会更好'], 
        ['道路に近いとお客さんが立ち寄りやすいよ', '当道路在附近时，客户很容易进入'], 
        ['機種変更や再インストール・アップデート・キャッシュクリアで設定が消えてしまいましたか', '由于机种更改或重新安装/更新/缓存清除，设置是否消失'], 
        ['設定を復元しますか', '要恢复设置吗？'], 
        ['から復元できる場合がありますのでお試しください', '您可以从中恢复，所以请尝试一下'], 
        ['この通知は更新案内を閲覧すると消えます', '查看更新案内时，此通知将消失'], 
        ['賞品が届いています', '奖品来了哦'], 
        ['倉庫が一杯の場合でも受け取ることができます。賞品には受取期限がありますので早めの受け取りをお願いします。', '即使仓库已满，也可以收到。 奖品的收取有截止日期，所以请提前收取奖品。'], 
        ['受け取りにいく', '接收'], 
        ['まとめ売り', '打包出售'], 
        ['全部まとめて購入してもらいますまとめ売り', '客人须全部购买才卖出'], 
        ['なにか売れる物がないか探してみます', '我会搜索可以出售的东西'], 
        ['近くの水辺から水を汲んできます', '我会从附近的水边取水'], 
        ['忘れる前に書き留めておきましょう', '让我们在忘记之前把它写下来'], 
        ['冒険に備えて準備しましょう', '让我们为冒险做准备'], 
        ['リサイクルは大事', '回收很重要'], 
        ['噂に聞いた山の情報を提供しましょう', '让我们听听有关山区信息的情报'], 
        ['いろんな材料が調達できるかもしれません', '可以采集各种材料'], 
        ['文明の証であるペンを作ります', '我会用笔来证明文明'], 
        ['色石を砕いて顔料にします', '将色石粉碎成颜料'], 
        ['その辺の石ですりつぶしてみます', '我会尝试用附近的石头磨它'], 
        ['乳鉢で色草を丁寧にすりつぶして顔料にします', '用研钵仔细研磨色草，使其成为色素'], 
        ['ファンシーステッキを作成します', '创造一个花哨的拐杖'], 
        ['コンパクトなはたきでいつもきれいに', '始终清洁和紧凑掸子'], 
        ['カラフルソードを作成します', '创造五彩剑'], 
        ['革細工の作り方を勉強し、本にしようと思います', '我将学习如何制作皮革，把它写作一本书'], 
        ['皮をなめすのに適した道具を作ります', '我会制作适合晒黑皮肤的工具'], 
        ['皮を革にします', '皮革是经脱毛和鞣制等物理、化学加工所得到的已经变性不易腐烂的动物皮'], 
        ['革の盾を作成します', '我会创造一个皮盾'], 
        ['革の胸当てを作成します', '我会制作一个皮革护胸'], 
        ['木を切り倒せるくらいの斧を作ります', '我会制作一把可以砍伐树木的斧头'], 
        ['いろんな材料が調達できるかもしれません', '可以采集各种材料'], 
        ['材料が調達できるかもしれません', '材料可以采集'], 
        ['木工の作り方を勉強し、本にしようと思います', '我将学习如何制作木制品，我会把它变成一本书'], 
        ['簡単な槌を作ります', '做一个简单的锤子'], 
        ['かゆくないほうのノミを作ります', '我会做一个刨子（不知道ノミ是不是这个啊）'], 
        ['木刀を作成します', '我会创造一把木剑'], 
        ['木の杖を作成します', '我会创造一个木制手杖'], 
        ['木の盾を作成します', '我会创造一个木制的盾牌'], 
        ['噂に聞いた鉱山の情報を提供しましょう', '让我们提供从情报中听到的矿山的信息'], 
        ['秘伝の方法で鉄をカッパーマトックにします', '以秘传之法，用铁制造カッパーマトック'], 
        ['わりとなんでも溶かす炉を作ります', '我们将制造一个熔化炉'], 
        ['鍛冶屋の魂とも言える道具を作ります', '我将制作一个可以说是铁匠灵魂的工具'], 
        ['鍛冶屋の技術を勉強し、身につけようと思います', '我将研究铁匠的技术并学习它'], 
        ['剣の鍛え方を勉強し、本にしようと思います', '我研究如何打造剑，我会把它变成一本书'], 
        ['盾の構造を勉強し、本にしようと思います', '我研究盾牌的结构，我会把它变成一本书'], 
        ['鎧の構造を勉強し、本にしようと思います', '我研究盔甲的结构，我会把它变成一本书'], 
        ['天然物の砥石を作ります', '制作天然石轮'], 
        ['魔法の基礎について勉強し、身につけようと思います', '我研究并了解魔法的基本原理'], 
        ['杖の構造を勉強し、本にしようと思います', '我研究手杖的结构，我将把它作为一本书来试试'], 
        ['いろんな鉱物が調達できるかもしれません', '可以采集各种矿物'], 
        ['原石から鉄を取り出して塊にします', '我从矿石中取出铁并制成块状'], 
        ['鉄の剣を鍛えてみましょう', '让我们锻造铁剑'], 
        ['オーソドックスな鉄の杖を作成してみましょう', '让我们创造一个正统的铁杖'], 
        ['鉄の盾を作成してみましょう', '让我们创造一个铁盾'], 
        ['オーソドックスな鉄の鎧を作成してみましょう', '让我们创造正统的铁甲'], 
        ['原石からミスリルを取り出して塊にします', '我从矿石中取出秘银并制成块状'], 
        ['上級冒険者の御用達、ミスリルの剣を鍛えてみましょう', '让我们锻造高级冒险家专用的秘银剑'], 
        ['上級冒険者の御用達、ミスリルの杖を作成してみましょう', '让我们锻造高级冒险家专用的秘银杖'], 
        ['ミスリルの鎧を作成してみましょう', '让我们锻造秘银铠甲'], 
        ['原石からオリハルコンを取り出して塊にします', '我从矿石中取出奥利哈尔钢并制成块状'], 
        ['めったに手に入らない、オリハルコンの剣を鍛えてみましょう', '让我们锻造很少有的Orichalcum剑'], 
        ['めったに手に入らない、オリハルコンの杖を作成してみましょ', '让我们锻造很少有的Orichalcum杖'], 
        ['めったに手に入らない、オリハルコンの盾を作成してみましょう', '让我们锻造很少有的Orichalcum盾'], 
        ['めったに手に入らない、オリハルコンの鎧を作成してみましょう', '让我们锻造很少有的Orichalcum鎧'], 
        ['原石からブラッディウムを取り出して塊にします', '我从矿石中取出Bloodyium并制成块状'], 
        ['製造は困難と言われるブラッディウムソードを鍛えてみましょう', '让我们制作Bloodyium剑，据说很难制造'], 
        ['製造は困難と言われるブラッディウムロッドを作成してみましょう', '让我们创造一个据说很难制造的Bloodyium棒'], 
        ['製造は困難と言われるブラッディウムシールドを作成してみましょう', '让我们创造一个据说难以制造的Bloodyium盾牌'], 
        ['製造は困難と言われるブラッディウムプレートを作成してみましょう', '让我们创造一个据说很难制造的血腥U盘wwwww'], 
        ['切れ味抜群、ボーンなブレイドを作ってみましょう', '让我们制作最锋利的骨刀片'], 
        ['とっても振り回しやすい、ボーンワンドを作ってみましょう', '容易摆动，让我们制作骨棒'], 
        ['ボーンシールドを作成します', '我会创造一个骨盾'], 
        ['ボーンメイルを作成します', '我将创建一个骨骼盔甲'], 
        ['アダマンチウム原石を探します', '我会寻找adamantium宝石'], 
        ['原石からアダマンチウムを取り出して塊にします', '将宝石中的adamantium炼成块'], 
        ['製造は困難と言われるアダマンチウムの剣を作成してみましょう', '让我们创造一把难以制造的adamantium之剑'], 
        ['製造は困難と言われるアダマンチウムの杖を作成してみましょう', '让我们创建一个据说难以制造的adamantium杖'], 
        ['製造は困難と言われるアダマンチウムの盾を作成してみましょう', '让我们创造一个据说难以制造的adamantium盾牌'], 
        ['製造は困難と言われるアダマンチウムの鎧を作成してみましょう', '让我们创造一个据说很难制造的adamantium装甲'], 
        ['分解することに命を懸けてみませんか', '你为什么不分解生命'], 
        ['伝説の聖剣をこの手で鍛えてみましょう', '让我们用这只手锻造传说中的圣剑'], 
        ['剣を仕入に行きます', '我会去找一把剑'], 
        ['噂に聞いた剣市の情報を提供しましょう', '让我们来传说剑城的信息'], 
        ['薬の作り方を勉強し、本にしようと思います', '我将研究如何制作药物，我将把它作为一本书来尝试'], 
        ['すりつぶしたいものがありますか', '你有什么想磨的吗'], 
        ['ポーションを作成しまくります', '我会制作药水'], 
        ['エーテルを作成しまくります', '我会做醚'], 
        ['ハイポーションを作成しまくります', '我将创造一个高药水'], 
        ['ハイエーテルを作成しまくります', '我会创造一个高醚'], 
        ['エリ草を作成しまくります', '我将创造Elli植物'], 
        ['キュアポーションを作成しまくります', '我会创造一种治疗药水'], 
        ['マインドポーションを作成しまくります', '我会创造一种心灵药水'], 
        ['レジストポーションを作成しまくります', '我会创造一种抗拒药水'], 
        ['パワーポーションを作成しまくります', '我会创造一种力量药水'], 
        ['噂に聞いたモンスターの情報を提供しましょう', '让我们提供有关从谣言中听到的怪物的信息'], 
        ['手がかりを元に巣のありかを突き止めましょう', '让我们根据线索跟踪巢穴'], 
        ['噂に聞いたミノタウロス♀の巣の情報を提供しましょう', '让我们从谣言中提供关于牛头怪♀巢的信息'], 
        ['を追い払って住民の安全を確保しましょう', '驱逐作战，确保居民的安全'], 
        ['ヴァンパイアを追い払ってブラッディウムまみれを阻止しましょう', '让我们停止血腥乌姆浸泡，驱逐吸血鬼'], 
        ['こんにちはこんにちは', '你好你好'], 
        ['スカルドラゴンにいいものをあげよう', '让我们给Skull Dragon一些好处'],
        ['強いと評判のサイクロプスに挑んでみましょう', '让我们挑战具有良好声誉的独眼巨人'], 
        ['ミノタウロス♀はつよい', '牛头怪♀很强'], 
        ['宝物を発見できるかもしれません', '或许可以找到宝藏'], 
        ['ミミ星人のくしゃみにも耐えるワークコートを仕立てます', '我们将制作一件能承受ミミ星人喷嚏的工作服'], 
        ['ミミ星人の好物です', 'ミミ星人的最爱'], 
        ['ミミ星人のたまごを探します', '我会寻找ミミ星人的蛋'], 
        ['ミミ星人のたまごを孵します', '我孵化了ミミ星人的蛋'], 
        ['ミミ星人に砂糖水を与えます', '我把糖水给咪咪星人'], 
        ['みんなで楽しく演奏出来る曲を提供しましょう', '让我们提供每个人都可以愉快地享受的歌曲'], 
        ['やさしく繊細で全てを包み込むような音色の笛を作ります', '我们制作一种善良细腻的笛子，包裹着一切'], 
        ['柔らかだけど芯の通った綺麗な音を奏でる木琴を作ります', '我将通过核心使木琴演奏柔和而美妙的声音'], 
        ['コードもリズムもメロディもこなす貴族御用達のギターを作ります', '我将为贵族见证制作吉他，他们将编码，节奏和旋律'], 
        ['タイトで締まった重低音を響かせる太鼓を作ります', '我会做一个鼓来回应紧密而紧凑的深沉低音'], 
        ['それではお聞き下さい、ミミ狂騒曲第18番「砂糖水よこせ」', '那么，请听Mimi Fantasy No. 18“Sugar Water”'], 
        ['ミノ頭突きにも耐えるオーバーオールを仕立てます', '我会准备工作服来抵挡Mino头屁股'], 
        ['ミノさんから乳を搾ります', '我会从Mino挤牛奶'], 
        ['ミノさんからハードに乳を搾ります', '从Mino手中挤出牛奶'], 
        ['謎めいた金魚を釣る', '钓一条神秘的金鱼'], 
        ['金魚に餌を与えてみます', '我会尝试喂金鱼'], 
        ['野生のハチを探します', '我会找一只野蜂'], 
        ['ハチが住みやすそうな箱を作ります', '我会做一个蜜蜂住的盒子'], 
        ['巣箱からハチミツを奪います', '我从巢箱里取一个蜂蜜'], 
        ['魔術でお手伝いゴーレムを作ります', '我会用魔法制作一个魔像'], 
        ['いでよ、スノーマン', '来吧，雪人'], 
        ['ゴーレムに薪割りを手伝ってもらいます', '魔像将帮助您将丸太切割为薪'], 
        ['ゴーレムに肥料作りを手伝ってもらいます', '傀儡会帮助制作肥料'], 
        ['スノーマンが水から氷を錬成します', '雪人从水中追踪冰'], 
        ['アップ', 'UP'], 
           ['特定の場所へ近いほど', '接近特定的地方'], 
        ['アイテム', '道具'], 
         ['セット', '堆叠'],
        ['トップ', 'TOP'], 
        ['安値', '低价'], 
        ['TOP5全ての販売品が表示されているとは限りません', 'TOP 5并非所有销售项目都显示'], 
        ['ありません', '没有'], 
        ['全部まとめて購入してもらいます', '全部买下才出售'],
        ['お客さまの声', '客户的声音'], 
        ['この商品をどうしますか', '对这个商品要做什么'], 
        ['売上', '收益'], 
        ['残り', '剩余'], 
        ['を過ぎると返金されません', '过后无法撤销'], 
        ['売却可のみ', '仅限可销售的'], 
        ['カテゴリ', '类别'], 
        ['は見つかりませんでした。', '找不到'], 
        ['商品名の一部で検索できます', '您可以输入商品名称的一部分进行模糊搜索'], 
        ['決算まで', '距离决算'], 
        ['お気に', '喜爱的'], 
        ['一足違いで在庫が少なくなっていても剩余を全て購入する', '在库数量不足时，有多少买多少'],
        ['栄誉ある総合点数での排行です。この日に最も活躍した店舗はこちら', '这是一个光荣的点数排行。 请于此处查看当天最活跃的商店'], 
        ['アクセサリ', '饰品'],
        ['買い取り済み', '已经收购'], 
        ['買い取り実施中', '收购实施中'], 
        ['预定を出しますか', '你想下訂單嗎'], 
        ['自分の街のみ調査', '仅在我所在的街进行调查'], 
        ['预定を取り下げますか', '要撤下预定吗'], 
        ['これまでに買い取ったものがあれば輸送が開始されます', '如果已经收购到商品，那么运输将开始'], 
        ['決算を過ぎた為', '由于决算时间已过'], 
        ['返金されません', '不予退还'], 
        ['返金されなくても预定を取り下げる', '即使没有退还，也要撤回预定'], 
        ['買い取れなかった分の差額は', '无法购买的差额将'], 
    ['作業が完了しました', '工作完成'], 
    ['獲得したもの', '得到了什么'], 
    ['販売を開始しました', '销售开始了'], 
    ['失ったもの', '失去了'], 
    ['倉庫から販売棚に移動しました', '从仓库搬到了贩卖棚'], 
    ['含まない', '不包含'], 
    ['含む', '包含'], 
    ['作業を開始しました', '工作开始了'], 
    ['MUTOYSから本日の支給品', '今天的MUTOYS供应品'], 
    ['倉庫が一杯の場合でも受け取ることができます', '即使仓库已满也可以收到'], 
    ['この支給品を受け取ることができるのは次のAM5時までです', '供应品直到第二天AM5时都能收取'], 
    ['支給品の中身は受け取るまで分かりません', '在收到货之前我不知道所供货的内容'],
    ['が売り出されました', '正在出售'], 
    ['日目から使えるよ', '天后才能使用'],  
    ['作業中断はできないよ', '我无法打断工作'], 
    ['実行した瞬間に効果があるよ', '它会在按下实行时立即生效'], 
    ['店面の名前で後悔していますか？この券を使えばタダで改名できます', '你是否想更换店名？ 如果您使用此票证，则可以免费重命名'], 
    ['この券を使って「駆け出し店舗」へ改装します', '我们将使用此票据进行翻新至「駆け出し店舗」'], 
    ['店面はリ堆叠されません', '商店表面没有重新发布'], 
    ['改装は一瞬で終わりますが後片付けに時間がかかります', '改装店铺会在瞬间完工，但作业槽会占用至作业时间结束'],  
    ['この券を使って移転＆「駆け出し店舗」へ改装します', '我们将使用此票搬家并改装为「駆け出し店舗」'], 
    ['移転先を選択', '选择目的地'], 
    ['時間短縮はできないよ', '不能缩短时间'], 
    ['まで作業完了時に特別報酬を貰えるかもしれません', '在完成工作後，您可能會獲得特殊獎勵'], 
    ['同時輸送上限に達しています', '已達到同時運輸限制'], 
    ['ギルド街', 'ギルド街-公会街'], 
    ['チョッコレイトに繋がる仕事だね！ありがとう！引換券あげる！', '這是一個導致巧克力的工作！ 謝謝！ 我會給你引換券！'], 
        ['本日の支給品を受け取りました', '收到了今天的支給品'], 
        ['賞品を受け取りました', '收到了獎品'], 
        ['輸送物を受け取りました', '收到了輸送物'], 
        ['レベルUP', '等级提升'], 
        ['おつかれさまでした', '辛苦了！'], 
        ['商品を補充および收益を回収しますか', '要补充商品并收取收入吗'], 
        ['次回から確認せず執行', '下次不需确认就执行'], 
        ['輸送を一括で受け取りますか', '你马上接受所有输送的商品吗'], 
        ['しない', '取消'], 
        ['TOP5全ての预定が表示されているとは限りません', 'TOP 5并非所有订单都显示'], 
        ['ブックマーク', '书签'], 
        ['現在の条件を記憶', '记住当前条件'], 
        ['これはいいものだ', 'This is a nice thing'], 
        ['買い付け人', '来买东西的人'], 
        ['お使い妖精さん', '被使唤的妖精'], 
        ['を見ながら', '看到了'], 
        ['とつぶやきました', '这样嘀咕着（买不起）'], 
        ['おばあさん', '一位老太太'], 
        ['でお買い上げ', '买下了'], 
        ['おねえさん', '一位大姐姐'], 
        ['しょうじょ', '一位少女'], 
        ['おじょうちゃん', '一位小女孩'], 
        ['おにいさん', '一位大哥哥'], 
        ['おばあさん', '一位欧巴桑'], 
        ['作業にかかる時間を短縮しますか', '你想减少工作所需的时间吗'], 
        ['短縮できる合計時間', '可以缩短的总时间'], 
        ['作業予約にて時間短縮不可の作業が含まれる場合、その作業の時間は短縮されません', '当工作预约包含“不能缩短时间”的工作时，工作时间不会缩短'], 
        ['その時間分の時間短縮道具が消費されることも没有', '时间缩短道具也不会在那段时间内消耗掉'], 
        ['同じ作業を追加', '添加相同的工作'], 
        ['まとめ倉庫', '仓库摘要'], 
        ['10個まで', '最多10个'], 
        ['選択してください', '请选择'], 
        ['2種類以上の道具・材料を追加してください', '请添加2种以上的道具/材料'], 
        ['補充しました', '商品補充'], 
        ['收益を回収しました', '收益回収'], 
        ['販売を完了しました', '販売结束'], 
        ['熟練者でも難しい', '对于熟练者也很难'], 
        ['難しい', '难'], 
        ['取り扱い業種', '操作業種'], 
        ['取り扱い職種', '操作職種'], 
        ['数え単位', '计数单位'], 
        ['設計待ち', '等待设计'], 
        ['承諾事項を確認する', '確認承諾事項'], 
        ['1つのみ', '只有一个'], 
        ['配方の掟に同意して商品開発を行う', '我同意自制配方的规则并进行产品开发'], 
        ['白紙に戻す', '变回白纸'],
        ['差し引き', '税后'], 
        ['ソート', '分类'], 
        ['承諾事項を閉じる', '关闭承諾事項'], 
        ['配方の掟を浏览器で見る', '在浏览器中看自制配方的规则'], 
        ['まもなく配方消滅', '配方快要消失了'], 
        ['画面全体の明るさを切り替えます', '切换整个画面的亮度'], 
        ['テキストをコピーできるようになります', '您将能够复制文本'], 
        ['できない場合もあります', '有时可能不能复制'], 
        ['作業実行按鈕等の左右位置を入れ替えます', '替换按钮的左右位置，如作業、実行按鈕等'], 
        ['優待期間中に画面上部の広告を消去します', '在優待期間清除屏幕顶部的广告'],      ['アプリのバッテリー消耗を抑えます（ゲーム内情報のタイムラグや通知抜けが多くなります：自動的に再起動します）※Android8にて本設定をOFFにするとアプリ停止する場合があります。停止した場合はログイン画面で設定をONにしてください。', '减少应用程序的电池消耗（游戏信息中的时间延迟和通知丢失将增加：它会自动重启）*如果您在Android 8上关闭此设置，应用程序可能会停止。 如果您停止，请打开登录屏幕上的设置。'], 
        ['店面に変化があったときに呼んでくれます', '当店面发生变化时，它将被调用'], 
        ['常に表示する菜单を選択します', '选择要始终显示的菜单'],  



    ])

    replaceText(document.body)
//   |
//  ₘₙⁿ
// ▏n
// █▏　､⺍             所以，不要停下來啊（指加入词条
// █▏ ⺰ʷʷｨ
// █◣▄██◣
// ◥██████▋
// 　◥████ █▎
// 　　███▉ █▎
// 　◢████◣⌠ₘ℩
// 　　██◥█◣\≫
// 　　██　◥█◣
// 　　█▉　　█▊
// 　　█▊　　█▊
// 　　█▊　　█▋
// 　　 █▏　　█▙
// 　　 █ ​
    const bodyObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addedNode => replaceText(addedNode))
      })
    })
    bodyObserver.observe(document.body, { childList: true, subtree: true })

    function replaceText(node) {
      nodeForEach(node).forEach(htmlnode => {
        i18n.forEach((value, index) => {
          // includes可直接使用 === 以提高匹配精度
          const textReg = new RegExp(index, 'g')
          if (htmlnode instanceof Text && htmlnode.nodeValue.includes(index))
            htmlnode.nodeValue = htmlnode.nodeValue.replace(textReg, value)
          else if (htmlnode instanceof HTMLInputElement && htmlnode.value.includes(index))
            htmlnode.value = htmlnode.value.replace(textReg, value)
        })
      })
    }

    function nodeForEach(node) {
      const list = []
      if (node.childNodes.length === 0) list.push(node)
      else {
        node.childNodes.forEach(child => {
          if (child.childNodes.length === 0) list.push(child)
          else list.push(...nodeForEach(child))
        })
      }
      return list
    }
})();