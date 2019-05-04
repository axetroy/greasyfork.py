// ==UserScript==
// @name         HWM: переход на рынок из артефакта
// @version      1.0.8
// @author       qwerty
// @include      https://www.heroeswm.ru/art_info.php?id=*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @description  Переход из артефакта в раздел рынка с этим артефактом.
// @namespace https://greasyfork.org/users/237404
// ==/UserScript==

(function (undefined) {

var artId = document.location.href.split('?id=')[1].split('&')[0];

$('<div><br></div><span>Рынок </span>').appendTo('table.wb td.wblight:last');

var sel = $('<select id=toAucFromArtinfoSelect><option value=""></option><option value="weapon#surv_halberdzg">Алебарда сурвилурга</option><option value="necklace#8amul_inf">Амулет бесконечности</option><option value="necklace#wzzamulet16">Амулет битвы</option><option value="necklace#quest_pendant1">Амулет буйвола</option><option value="necklace#gm_amul">Амулет великого охотника</option><option value="thief#thief_neckl">Амулет вора</option><option value="necklace#tj_magam2">Амулет времён</option><option value="necklace#9amu_let">Амулет девятилетия</option><option value="relict#druid_amulet">Амулет друида</option><option value="necklace#mmzamulet16">Амулет духа</option><option value="necklace#smamul17">Амулет единения</option><option value="necklace#sh_amulet2">Амулет зверобоя</option><option value="necklace#neut_amulet">Амулет леса</option><option value="necklace#hunter_amulet1">Амулет мастера-охотника</option><option value="thief#tm_amulet">Амулет налётчика</option><option value="relict#necr_amulet">Амулет некроманта-ученика</option><option value="necklace#p_amulet2">Амулет пирата</option><option value="necklace#p_amulet1">Амулет пирата-капитана</option><option value="necklace#dun_amul2">Амулет подземелий</option><option value="necklace#surv_wamuletik">Амулет сурвилурга</option><option value="necklace#bafamulet15">Амулет трёх стихий</option><option value="necklace#trinitypendant">Амулет троицы</option><option value="necklace#amulet_of_luck">Амулет удачи</option><option value="necklace#samul14">Амулет фортуны</option><option value="relict#elfamulet">Амулет эльфа-скаута</option><option value="necklace#wzzamulet13">Амулет ярости</option><option value="thief#thief_arb">Арбалет вора</option><option value="thief#tm_arb">Арбалет налётчика</option><option value="relict#paladin_bow">Арбалет паладина</option><option value="weapon#sunart2">Арбалет солнца</option><option value="relict#sv_arb">Арбалет степного варвара</option><option value="weapon#surv_crossbowsurv">Арбалет сурвилурга</option><option value="helm#piratehat3">Бандана пирата</option><option value="shield#large_shield">Башенный щит</option><option value="cuirass#hauberk">Боевая кольчуга</option><option value="tactic#tact1w1_wamulet">Боевой кулон тактика</option><option value="weapon#staff">Боевой посох </option><option value="boots#boots2">Боевые сапоги</option><option value="cuirass#gm_arm">Броня великого охотника</option><option value="cuirass#sh_armor">Броня зверобоя</option><option value="cuirass#hunter_armor1">Броня мастера-охотника</option><option value="cuirass#rarmor1">Броня разбойника</option><option value="cuirass#tmarmor1">Великая роба времён</option><option value="boots#tj_mtuf1">Великие туфли времён</option><option value="necklace#dun_amul1">Великий амулет подземелий</option><option value="cuirass#dun_armor1">Великий доспех подземелий</option><option value="weapon#vbow1">Великий лук времён</option><option value="helm#mhelmv1">Великий магический шлем времён</option><option value="weapon#vtmsword1">Великий меч времён</option><option value="cloack#vtjcloak1">Великий плащ времён</option><option value="weapon#staff_v1">Великий посох времён</option><option value="weapon#vscroll-1">Великий свиток времён</option><option value="weapon#vtmaxe1">Великий топор времён</option><option value="helm#hm2">Великий шлем подземелий</option><option value="shield#dun_shield1">Великий щит подземелий</option><option value="ring#vmring1">Великое магическое кольцо времён</option><option value="relict#darkelfkaska">Венец слуги тьмы</option><option value="necklace#sharik">Волшебный шар</option><option value="other#thief_paper">Воровское приглашение</option><option value="weapon#sword18">Гладий предвестия</option><option value="ring#warring13">Глаз дракона</option><option value="weapon#wood_sword">Деревянный меч</option><option value="weapon#long_bow">Длинный лук</option><option value="relict#amf_body">Доспех амфибии</option><option value="verb#v_1armor">Доспех вербовщика</option><option value="cuirass#tjarmor2">Доспех времён</option><option value="relict#gnomearmor">Доспех гнома-воина</option><option value="relict#gnomem_armor">Доспех гнома-мастера</option><option value="cuirass#magneticarmor">Доспех магнитного голема</option><option value="relict#nv_body">Доспех непокорного варвара</option><option value="cuirass#armor15">Доспех пламени</option><option value="cuirass#dun_armor2">Доспех подземелий</option><option value="relict#kn_body">Доспех рыцаря солнца</option><option value="relict#sv_body">Доспех степного варвара</option><option value="cuirass#surv_armorsu">Доспех сурвилурга</option><option value="tactic#tactcv1_armor">Доспех тактика</option><option value="thief#thief_goodarmor">Доспехи вора</option><option value="thief#tm_armor">Доспехи налётчика</option><option value="cuirass#marmor17">Доспехи сумерек</option><option value="backpack#dragonstone">Драконий камень</option><option value="weapon#dubina">Дубина огра</option><option value="weapon#ogre_bum">Дубина огра-ветерана</option><option value="relict#sv_weap">Дубина степного варвара</option><option value="ring#gm_rring">Заколдованное кольцо в. охотника</option><option value="necklace#5years_star">Звезда пятилетия</option><option value="other#potion07">Зелье воина</option><option value="other#potion04">Зелье заклинаний</option><option value="other#potion02">Зелье защиты</option><option value="other#potion05">Зелье знаний</option><option value="other#potion08">Зелье искусства</option><option value="other#potion03">Зелье ловкости</option><option value="other#potion01">Зелье силы</option><option value="other#potion06">Зелье стража</option><option value="backpack#mirror">Зеркало перемен</option><option value="ring#surv_wring2o">Золотое кольцо сурвилурга</option><option value="backpack#ankh1">Золотой анх</option><option value="necklace#zub">Зуб дракона</option><option value="medals#bwar2">Имперская медаль 2-й степени</option><option value="medals#kwar2">Имперская медаль 2ой степени</option><option value="medals#bwar3">Имперская медаль 3-й степени</option><option value="medals#kwar3">Имперская медаль 3ей степени</option><option value="medals#bwar4">Имперская медаль 4-й степени</option><option value="medals#kwar4">Имперская медаль 4ой степени</option><option value="medals#bwar5">Имперская медаль 5-й степени</option><option value="medals#kwar5">Имперская медаль 5ой степени</option><option value="medals#bwar6">Имперская медаль 6-й степени</option><option value="medals#kwar6">Имперская медаль 6ой степени</option><option value="medals#bwar7">Имперская медаль 7-й степени</option><option value="cuirass#pir_armor1">Камзол пирата-капитана</option><option value="weapon#gm_kastet">Кастет великого охотника</option><option value="thief#thief_ml_dagger">Кинжал вора</option><option value="weapon#vrdagger2">Кинжал времён</option><option value="weapon#forest_dagger">Кинжал леса</option><option value="weapon#dagger_dex">Кинжал ловкости</option><option value="weapon#hunterdagger">Кинжал мастера-охотника</option><option value="relict#merc_dagger">Кинжал наёмника-воина</option><option value="thief#tm_knife">Кинжал налётчика</option><option value="weapon#p_dag2">Кинжал пирата</option><option value="weapon#p_dag1">Кинжал пирата-капитана</option><option value="weapon#super_dagger">Кинжал пламени</option><option value="weapon#surv_daggermd">Кинжал сурвилурга</option><option value="tactic#tactsm0_dagger">Кинжал тактика</option><option value="cuirass#sarmor16">Кираса благородства</option><option value="cuirass#polk_armor2">Кираса полководца</option><option value="cuirass#armor17">Кираса рассвета</option><option value="weapon#tunnel_kirka">Кирка шахтёра</option><option value="weapon#bludgeon">Кистень степных воинов</option><option value="necklace#clover_amul">Клевер фортуны</option><option value="weapon#windsword">Клинок ветров</option><option value="weapon#p_sword3">Клинок пирата</option><option value="weapon#dagger20">Клинок сумерек</option><option value="weapon#surv_sword2sd">Клинок сурвилурга</option><option value="weapon#dagger16">Клинок феникса</option><option value="backpack#kniga">Книга знаний</option><option value="backpack#skill_book11">Книга умений</option><option value="cuirass#leather_shiled">Кожаная броня</option><option value="helm#leatherhat">Кожаная шляпа</option><option value="boots#leatherboots">Кожаные ботинки</option><option value="cuirass#leatherplate">Кожаные доспехи</option><option value="boots#hunter_boots">Кожаные сапоги</option><option value="helm#leather_helm">Кожаный шлем</option><option value="thief#tm_mring">Колдовское кольцо налётчика</option><option value="helm#wizard_cap">Колпак мага</option><option value="ring#ring19">Кольцо бесстрашия</option><option value="ring#wwwring16">Кольцо боли</option><option value="ring#dring5">Кольцо веры</option><option value="ring#warriorring">Кольцо воина</option><option value="thief#ring_of_thief">Кольцо вора</option><option value="ring#v-ring2">Кольцо времён</option><option value="ring#gring">Кольцо генерала</option><option value="ring#ring2013">Кольцо года Змеи</option><option value="ring#mmmring16">Кольцо звёзд</option><option value="ring#gm_sring">Кольцо ловкости в. охотника</option><option value="ring#sh_ring1">Кольцо ловкости зверобоя</option><option value="ring#hunter_ring2">Кольцо ловкости мастера-охотника</option><option value="relict#r_warring">Кольцо ловкости рейнджера</option><option value="ring#smring10">Кольцо молнии</option><option value="ring#surv_mring2fpg">Кольцо мудрости сурвилурга</option><option value="tactic#tactspw_mring">Кольцо мудрости тактика</option><option value="ring#dring18">Кольцо надежды</option><option value="thief#tm_wring">Кольцо налётчика</option><option value="ring#mring19">Кольцо непрестанности</option><option value="ring#circ_ring">Кольцо отречения</option><option value="ring#pn_ring2">Кольцо пирата</option><option value="ring#pn_ring1">Кольцо пирата-капитана</option><option value="ring#dring15">Кольцо пламенного взора</option><option value="relict#dering">Кольцо подземелий</option><option value="ring#hunter_ring1">Кольцо полёта мастера-охотника</option><option value="ring#powerring">Кольцо пророка</option><option value="ring#bring14">Кольцо противоречий</option><option value="ring#ttring">Кольцо равновесия</option><option value="ring#sring4">Кольцо силы</option><option value="ring#sh_ring2">Кольцо силы зверобоя</option><option value="ring#surv_wring1my">Кольцо силы сурвилурга</option><option value="tactic#tactwww_wring">Кольцо силы тактика</option><option value="ring#sun_ring">Кольцо солнца</option><option value="ring#doubt_ring">Кольцо сомнений</option><option value="ring#dring21">Кольцо сопряжения</option><option value="ring#rashness_ring">Кольцо стремительности</option><option value="ring#darkring">Кольцо теней</option><option value="ring#sring17">Кольцо хватки дракона</option><option value="ring#coldring_n">Кольцо холода</option><option value="ring#blackring">Кольцо черного рыцаря</option><option value="cuirass#student_armor">Кольчуга новобранца</option><option value="helm#chain_coif">Кольчужный шлем</option><option value="backpack#p_compas2">Компас пирата</option><option value="backpack#p_compas1">Компас пирата-капитана</option><option value="weapon#trogloditkop">Копьё Троглодита</option><option value="weapon#kopie">Копьё гномов</option><option value="weapon#sh_spear">Копьё зверобоя</option><option value="weapon#pika">Копьё тёмного всадника</option><option value="weapon#pegaskop">Копье всадника пегаса</option><option value="relict#gmage_crown">Корона великого мага</option><option value="helm#dragon_crown">Корона из зубов дракона</option><option value="helm#necrohelm2">Корона лича</option><option value="helm#xymhelmet15">Корона пламенного чародея</option><option value="helm#mhelmetzh13">Корона чернокнижника</option><option value="weapon#shortbow">Короткий лук</option><option value="weapon#dem_kosa">Коса рогатого жнеца</option><option value="helm#hunter_roga1">Костяной шлем мастера-охотника</option><option value="backpack#pouch">Кошелёк разбойника</option><option value="shield#round_shiled">Круглый щит</option><option value="backpack#cubed">Куб прочности</option><option value="backpack#bal_cube">Куб равноправия</option><option value="backpack#cubes">Куб силы</option><option value="backpack#cubeg">Куб судьбы</option><option value="necklace#warrior_pendant">Кулон воина</option><option value="necklace#tjam2">Кулон времён</option><option value="necklace#mamulet19">Кулон непостижимости</option><option value="necklace#power_pendant">Кулон отчаяния</option><option value="necklace#hunter_pendant1">Кулон охотника</option><option value="necklace#amulet19">Кулон рвения</option><option value="cuirass#polk_armor3">Лёгкая кираса полководца</option><option value="cuirass#mif_light">Лёгкая мифриловая кираса</option><option value="cuirass#tmarmor3">Лёгкая роба времён</option><option value="weapon#huntersword2">Лёгкая сабля мастера-охотника</option><option value="boots#mif_lboots">Лёгкие мифриловые сапоги</option><option value="boots#hunter_boots3">Лёгкие сапоги мастера-охотника</option><option value="boots#tj_mtuf3">Лёгкие туфли времён</option><option value="cuirass#tjarmor3">Лёгкий доспех времён</option><option value="weapon#vrdagger3">Лёгкий кинжал времён</option><option value="helm#mhelmv3">Лёгкий магический шлем времён</option><option value="weapon#vtmsword3">Лёгкий меч времён</option><option value="helm#mif_lhelmet">Лёгкий мифриловый шлем</option><option value="weapon#vtmaxe3">Лёгкий топор времён</option><option value="helm#tj_helmet3">Лёгкий шлем времён</option><option value="shield#tj-shield3">Лёгкий щит времён</option><option value="shield#bshield3">Лёгкий щит предводителя</option><option value="cuirass#rarmor2">Легкая броня разбойника</option><option value="boots#rboots2">Легкие сапоги разбойника</option><option value="cuirass#dun_armor3">Легкий доспех подземелий</option><option value="weapon#vbow3">Легкий лук времён</option><option value="cloack#vtjcloak3">Легкий плащ времён</option><option value="weapon#staff_v3">Легкий посох времён</option><option value="weapon#gnome_hammer">Легкий топорик</option><option value="helm#rhelm2">Легкий шлем разбойника</option><option value="shield#dun_shield3">Легкий щит подземелий</option><option value="cloack#les_cl">Лесной плащ</option><option value="weapon#gm_abow">Лук великого охотника</option><option value="weapon#vbow2">Лук времён</option><option value="weapon#goblin_bow">Лук гоблина</option><option value="weapon#sh_bow">Лук зверобоя</option><option value="weapon#centaurbow">Лук кентавра</option><option value="weapon#forest_bow">Лук леса</option><option value="weapon#hunter_bow2">Лук мастера-охотника</option><option value="weapon#hunter_bow1">Лук охотника</option><option value="weapon#bow14">Лук полуночи</option><option value="weapon#rbow1">Лук разбойника</option><option value="weapon#bow17">Лук рассвета</option><option value="weapon#lbow">Лук света</option><option value="relict#sniperbow">Лук снайпера</option><option value="tactic#tact765_bow">Лук тактика</option><option value="boots#surv_mbootsbb">Магические сапоги сурвилурга</option><option value="necklace#magic_amulet">Магический амулет</option><option value="necklace#surv_mamulka">Магический амулет сурвилурга</option><option value="tactic#tactms1_mamulet">Магический амулет тактика</option><option value="cuirass#surv_marmoroz">Магический доспех сурвилурга</option><option value="helm#mhelmv2">Магический шлем времён</option><option value="helm#surv_mhelmetcv">Магический шлем сурвилурга</option><option value="ring#vmring2">Магическое кольцо времён</option><option value="ring#surv_mring1fd">Магическое кольцо сурвилурга</option><option value="ring#v-ring3">Малое кольцо времён</option><option value="ring#pn_ring3">Малое кольцо пирата</option><option value="necklace#tjam3">Малый кулон времён</option><option value="ring#vbolt3">Малый перстень времён</option><option value="weapon#vscroll-3">Малый свиток времён</option><option value="cloack#cloack17">Мантия вечности</option><option value="cloack#cloackwz15">Мантия пламенного чародея</option><option value="cloack#surv_mcloacksv">Мантия сурвилурга</option><option value="backpack#10scroll">Манускрипт истории</option><option value="weapon#scroll18">Манускрипт концентрации</option><option value="thief#thief_msk">Маска вора</option><option value="thief#tm_msk">Маска налётчика</option><option value="cloack#scloack8">Маскировочный плащ</option><option value="cloack#gm_protect">Маскхалат великого охотника</option><option value="cloack#sh_cloak">Маскхалат зверобоя</option><option value="cloack#hunter_mask1">Маскхалат мастера-охотника</option><option value="medals#bwar_splo">Медаль за сплоченность</option><option value="medals#bwar_stoj">Медаль за стойкость</option><option value="medals#kwar_takt">Медаль за тактику</option><option value="necklace#bravery_medal">Медаль отваги</option><option value="weapon#gm_sword">Меч великого охотника</option><option value="verb#verb11_sword">Меч вербовщика</option><option value="weapon#power_sword">Меч власти</option><option value="weapon#sunart3">Меч воздаяния</option><option value="weapon#requital_sword">Меч возмездия</option><option value="weapon#firsword15">Меч возрождения</option><option value="weapon#vtmsword2">Меч времён</option><option value="weapon#ssword16">Меч гармонии</option><option value="weapon#ssword8">Меч жесткости</option><option value="weapon#sh_sword">Меч зверобоя</option><option value="weapon#ssword10">Меч отваги</option><option value="weapon#sunart4">Меч откровения</option><option value="relict#paladin_sword">Меч паладина</option><option value="weapon#dem_dmech">Меч пещерного демона</option><option value="weapon#broad_sword">Меч равновесия</option><option value="weapon#def_sword">Меч расправы</option><option value="relict#r_bigsword">Меч рейнджера</option><option value="relict#knightsword">Меч рыцаря-воина</option><option value="weapon#surv_sword_surv">Меч сурвилурга</option><option value="weapon#slayersword">Меч убийцы</option><option value="weapon#cold_sword2014">Меч холода</option><option value="relict#welfsword">Меч эльфа-воина</option><option value="necklace#mmzamulet13">Мистический амулет</option><option value="cuirass#sarmor9">Мифриловая кольчуга</option><option value="ring#dring12">Мифриловая печать</option><option value="ring#v-ring1">Мифриловое кольцо времён</option><option value="cuirass#miff_plate">Мифриловые доспехи</option><option value="necklace#tj_magam1">Мифриловый амулет времён</option><option value="weapon#dagger_myf">Мифриловый кинжал</option><option value="weapon#vrdagger1">Мифриловый кинжал времён</option><option value="necklace#tjam1">Мифриловый кулон времён</option><option value="weapon#mif_sword">Мифриловый меч</option><option value="ring#vbolt1">Мифриловый перстень времён</option><option value="weapon#mif_staff">Мифриловый посох</option><option value="relict#gnomem_hammer">Молот гнома-мастера</option><option value="weapon#molot_tan">Молот тана</option><option value="relict#amf_cl">Накидка амфибии</option><option value="cloack#soul_cape">Накидка духов</option><option value="cloack#wiz_cape">Накидка чародея</option><option value="backpack#obereg">Оберег</option><option value="cuirass#sarmor13">Обсидиановая броня</option><option value="boots#boots13">Обсидиановые сапоги</option><option value="weapon#ssword13">Обсидиановый меч</option><option value="weapon#mstaff13">Обсидиановый посох</option><option value="helm#zxhelmet13">Обсидиановый шлем</option><option value="shield#shield13">Обсидиановый щит</option><option value="cuirass#mage_armor">Одеяние мага</option><option value="necklace#order_griffin">Орден Грифона</option><option value="necklace#order_manticore">Орден Мантикоры</option><option value="necklace#ord_light">Орден Света</option><option value="necklace#ord_dark">Орден Тьмы</option><option value="necklace#castle_orden">Орден бесстрашия</option><option value="medals#magewar3">Орден мира 3ей степени</option><option value="medals#magewar4">Орден мира 4ой степени</option><option value="necklace#samul17">Оскал дракона</option><option value="necklace#smamul14">Осколок тьмы</option><option value="ring#verve_ring">Перстень вдохновения</option><option value="ring#vbolt2">Перстень времён</option><option value="ring#gringd">Перстень генерала</option><option value="ring#piring2">Перстень пирата</option><option value="ring#piring1">Перстень пирата-капитана</option><option value="ring#dring9">Перстень хранителя</option><option value="other#hunter_gloves1">Перчатка охотника</option><option value="backpack#sandglass">Песочные часы</option><option value="ring#smring17">Печать единения</option><option value="ring#magring13">Печать заклинателя</option><option value="cuirass#pir_armor2">Пиратский сюртук</option><option value="weapon#p_pistol2">Пистолет пирата</option><option value="weapon#p_pistol1">Пистолет пирата-капитана</option><option value="cloack#battlem_cape">Плащ боевого мага</option><option value="thief#thief_cape">Плащ вора</option><option value="cloack#vtjcloak2">Плащ времён</option><option value="cloack#scloack16">Плащ драконьего покрова</option><option value="relict#druid_cloack">Плащ друида</option><option value="relict#inq_cl">Плащ инквизитора</option><option value="cloack#stalkercl">Плащ ловчего</option><option value="relict#mage_cape">Плащ мага-ученика</option><option value="cloack#powercape">Плащ магической силы</option><option value="thief#tm_cape">Плащ налётчика</option><option value="cloack#p_cloak2">Плащ пирата</option><option value="cloack#p_cloak1">Плащ пирата-капитана</option><option value="cloack#scoutcloack">Плащ разведчика</option><option value="relict#darkelfcloack">Плащ слуги тьмы</option><option value="cloack#finecl">Плащ солнца</option><option value="cloack#surv_cloacksrv">Плащ сурвилурга</option><option value="tactic#tactpow_cloack">Плащ тактика</option><option value="necklace#7ka">Подвеска семилетия</option><option value="backpack#crystal">Подземный кристалл</option><option value="relict#amf_boot">Поножи амфибии</option><option value="relict#amf_weap">Посох амфибии</option><option value="relict#gmage_staff">Посох великого мага</option><option value="weapon#mstaff8">Посох весны</option><option value="weapon#staff_v2">Посох времён</option><option value="relict#druid_staff">Посох друида</option><option value="weapon#smstaff16">Посох забвения</option><option value="weapon#staff18">Посох затмения</option><option value="weapon#sor_staff">Посох могущества</option><option value="weapon#ffstaff15">Посох повелителя огня</option><option value="relict#darkelfstaff">Посох слуги тьмы</option><option value="weapon#surv_staffik">Посох сурвилурга</option><option value="tactic#tactmag_staff">Посох тактика</option><option value="weapon#mstaff10">Посох теней</option><option value="ring#vmring3">Простое магическое кольцо времён</option><option value="necklace#p_amulet3">Простой амулет пирата</option><option value="necklace#dun_amul3">Простой амулет подземелий</option><option value="weapon#p_dag3">Простой кинжал пирата</option><option value="backpack#p_compas3">Простой компас пирата</option><option value="weapon#rbow2">Простой лук разбойника</option><option value="ring#piring3">Простой перстень пирата</option><option value="weapon#p_pistol3">Простой пистолет пирата</option><option value="relict#gmage_armor">Роба великого мага</option><option value="cuirass#tmarmor2">Роба времён</option><option value="relict#druid_armor">Роба друида</option><option value="relict#mage_robe">Роба мага-ученика</option><option value="cuirass#robewz15">Роба пламенного чародея</option><option value="cuirass#wiz_robe">Роба чародея</option><option value="cuirass#hunter_jacket1">Рубаха охотника</option><option value="relict#elfshirt">Рубаха эльфа-скаута</option><option value="boots#sboots12">Рубиновые сапоги</option><option value="weapon#mm_sword">Рубиновый меч</option><option value="weapon#mm_staff">Рубиновый посох</option><option value="helm#shelm12">Рубиновый шлем</option><option value="backpack#runkam">Рунный камень</option><option value="weapon#hunterdsword">Сабля мастера-охотника</option><option value="weapon#p_sword2">Сабля пирата</option><option value="boots#sboots16">Сапоги благородства</option><option value="relict#barb_boots">Сапоги варвара-воина</option><option value="relict#gmage_boots">Сапоги великого мага</option><option value="boots#gm_spdb">Сапоги великого охотника</option><option value="verb#verbboots">Сапоги вербовщика</option><option value="thief#thief_fastboots">Сапоги вора</option><option value="boots#tj_vboots2">Сапоги времён</option><option value="relict#druid_boots">Сапоги друида</option><option value="boots#sh_boots">Сапоги зверобоя</option><option value="relict#inq_boot">Сапоги инквизитора</option><option value="boots#hunter_boots2">Сапоги мастера-охотника</option><option value="thief#tm_boots">Сапоги налётчика</option><option value="boots#hunter_boots1">Сапоги охотника</option><option value="relict#paladin_boots">Сапоги паладина</option><option value="boots#p_boots2">Сапоги пирата</option><option value="boots#p_boots1">Сапоги пирата-капитана</option><option value="boots#boots15">Сапоги пламени</option><option value="boots#rboots1">Сапоги разбойника</option><option value="boots#boots17">Сапоги рассвета</option><option value="relict#r_bootsmb">Сапоги рейнджера</option><option value="relict#sv_boot">Сапоги степного варвара</option><option value="boots#mboots17">Сапоги сумерек</option><option value="boots#surv_bootsurv">Сапоги сурвилурга</option><option value="tactic#tactzl4_boots">Сапоги тактика</option><option value="boots#torg_boots">Сапоги торговца</option><option value="boots#mboots14">Сапоги чернокнижника</option><option value="relict#elfboots">Сапоги эльфа-скаута</option><option value="relict#amf_scroll">Свиток амфибии</option><option value="weapon#vscroll-2">Свиток времён</option><option value="relict#r_goodscroll">Свиток рейнджера</option><option value="weapon#surv_scrollcd">Свиток сурвилурга</option><option value="weapon#energy_scroll">Свиток энергии</option><option value="backpack#ankh2">Серебрянный анх</option><option value="boots#sboots9">Солдатские сапоги </option><option value="weapon#composite_bow">Составной лук</option><option value="cuirass#ciras">Стальная кираса</option><option value="weapon#steel_blade">Стальной клинок</option><option value="helm#steel_helmet">Стальной шлем</option><option value="shield#s_shield">Стальной щит</option><option value="cuirass#full_plate">Стальные доспехи</option><option value="boots#steel_boots">Стальные сапоги</option><option value="relict#dem_bootshields">Стальные щитки демона-воина</option><option value="other#compass">Старинный компас</option><option value="shield#ru_statue">Статуэтка Рунета 2009</option><option value="other#gm_3arrows">Стрелы великого охотника</option><option value="other#sh_4arrows">Стрелы зверобоя</option><option value="other#hunter_arrows1">Стрелы мастера-охотника</option><option value="backpack#sumka">Сумка разбойника</option><option value="backpack#msphere">Сфера тайн</option><option value="necklace#samul8">Счастливая подкова</option><option value="backpack#znak5">Талисман Варваров</option><option value="backpack#znak8">Талисман Гномов</option><option value="backpack#znak7">Талисман Демонов</option><option value="backpack#znak3">Талисман Магов</option><option value="backpack#znak2">Талисман Некромантов</option><option value="backpack#znak1">Талисман Рыцарей</option><option value="backpack#znak9">Талисман Степных варваров</option><option value="backpack#znak6">Талисман Тёмных эльфов</option><option value="backpack#znak4">Талисман Эльфов</option><option value="necklace#3year_art">Талисман трёхлетия</option><option value="ring#sring10">Терновое кольцо</option><option value="weapon#hunter_sword1">Тесак охотника</option><option value="weapon#vtmaxe2">Топор времён</option><option value="relict#dem_axe">Топор демона-воина</option><option value="weapon#topor_drov">Топор дровосека</option><option value="weapon#dem_dtopor">Топор дьявола</option><option value="weapon#taskaxe">Топор надсмотрщика</option><option value="weapon#orc_axe">Топор орка-тирана</option><option value="tactic#tactaz_axe">Топор тактика</option><option value="weapon#topor_skelet">Топорик скелета</option><option value="weapon#sea_trident">Трезубец сирен</option><option value="boots#tj_mtuf2">Туфли времён</option><option value="boots#shoe_of_initiative">Туфли стремления</option><option value="boots#wiz_boots">Туфли чародея</option><option value="cuirass#polk_armor1">Тяжёлая кираса полководца</option><option value="boots#mif_hboots">Тяжёлые мифриловые сапоги</option><option value="boots#tj_vboots1">Тяжёлые сапоги времён</option><option value="boots#polkboots1">Тяжёлые сапоги полководца</option><option value="cuirass#tjarmor1">Тяжёлый доспех времён</option><option value="helm#mif_hhelmet">Тяжёлый мифриловый шлем</option><option value="helm#tj_helmet1">Тяжёлый шлем времён</option><option value="helm#polk__helm1">Тяжёлый шлем полководца</option><option value="shield#tj-shield1">Тяжёлый щит времён</option><option value="shield#bshield1">Тяжёлый щит предводителя</option><option value="necklace#dudka">Флейта сатира</option><option value="backpack#flyaga">Фляга здоровья</option><option value="cloack#antiair_cape">Халат ветров</option><option value="cloack#antimagic_cape">Халат магической защиты</option><option value="relict#necr_robe">Халат некроманта-ученика</option><option value="cloack#antifire_cape">Халат пламени</option><option value="ring#6ring">Шестигранный перстень</option><option value="relict#amf_helm">Шлем амфибии</option><option value="helm#shelm16">Шлем благородства</option><option value="verb#ve_helm">Шлем вербовщика</option><option value="helm#tj_helmet2">Шлем времён</option><option value="relict#gnomehelmet">Шлем гнома-воина</option><option value="helm#sh_helmet">Шлем зверобоя</option><option value="helm#mage_helm">Шлем мага</option><option value="helm#hunter_helm">Шлем мастера-охотника</option><option value="relict#nv_helm">Шлем непокорного варвара</option><option value="helm#ogre_helm">Шлем огра-ветерана</option><option value="helm#shelm8">Шлем отваги</option><option value="relict#paladin_helmet">Шлем паладина</option><option value="helm#myhelmet15">Шлем пламени</option><option value="helm#hm1">Шлем подземелий</option><option value="helm#polk__helm2">Шлем полководца</option><option value="helm#rhelm1">Шлем разбойника</option><option value="helm#helmet17">Шлем рассвета</option><option value="relict#r_helmb">Шлем рейнджера</option><option value="helm#necrohelm3">Шлем рыцаря тьмы</option><option value="helm#necrohelm1">Шлем скелета-воина</option><option value="helm#mhelmet17">Шлем сумерек</option><option value="helm#surv_helmetpi">Шлем сурвилурга</option><option value="tactic#tacthapp_helmet">Шлем тактика</option><option value="helm#knowledge_hat">Шляпа знаний</option><option value="helm#hunter_hat1">Шляпа охотника</option><option value="helm#piratehat2">Шляпа пирата</option><option value="helm#piratehat1">Шляпа пирата-капитана</option><option value="weapon#p_sword1">Шпага пирата-капитана</option><option value="shield#gm_defence">Щит великого охотника</option><option value="verb#vrb_shild">Щит вербовщика</option><option value="shield#wshield">Щит ветров</option><option value="shield#tj-shield2">Щит времён</option><option value="relict#gnomem_shield">Щит гнома-мастера</option><option value="shield#dragon_shield">Щит драконов</option><option value="shield#sh_shield">Щит зверобоя</option><option value="shield#gargoshield">Щит из крыла горгульи</option><option value="shield#huntershield2">Щит мастера-охотника</option><option value="relict#nv_shield">Щит непокорного варвара</option><option value="shield#hunter_shield1">Щит охотника</option><option value="shield#shield16">Щит пламени</option><option value="shield#sshield17">Щит подавления</option><option value="shield#dun_shield2">Щит подземелий</option><option value="shield#bshield2">Щит предводителя</option><option value="shield#shield19">Щит рассвета</option><option value="relict#kn_shield">Щит рыцаря солнца</option><option value="relict#knightshield">Щит рыцаря-воина</option><option value="shield#sshield5">Щит славы</option><option value="shield#sshield11">Щит сокола</option><option value="relict#sv_shield">Щит степного варвара</option><option value="shield#surv_shieldvv">Щит сурвилурга</option><option value="tactic#tactdff_shield">Щит тактика</option><option value="shield#defender_shield">Щит хранителя</option><option value="shield#sshield14">Щит чешуи дракона</option><option value="relict#welfshield">Щит эльфа-воина</option><option value="relict#elfdagger">Эльфийский кинжал</option></select>').appendTo('table.wb td.wblight:last');
var btn = $('<button id=toAucFromArtinfoButton>Перейти</button>').appendTo('table.wb td.wblight:last');

$('select#toAucFromArtinfoSelect option').each(function(i,v){
    if( $(v).val().split('#')[1] == artId ){
        $(v).attr('selected', true);
    }
});

$('#toAucFromArtinfoButton').click(function(){
    var artType = $('#toAucFromArtinfoSelect option:selected').val().split('#')[0];
    document.location.href = 'https://www.heroeswm.ru/auction.php?cat='+artType+'&sort=0&art_type='+artId;
});

}());