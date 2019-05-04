// Pilih file yang akan dibuka (yang bentuk ekstensi kml ya..):



// =======================================================
// dibawah ini adalah script untuk ===>>> Padang Sidempan.kml
// created on server :: hardian_n(4)
// =======================================================

// ==UserScript==
// @name Kota Padang Sidempan
// @namespace
// @description Polygon Kecamatan di Padang Sidempan.kml
// @include https://www.waze.com/editor/*
// @include https://www.waze.com/*/editor/*
// @include https://editor-beta.waze.com/*
// @version 1.5.1
// @grant none
// @copyright 2015 hardian_n(4)
// @namespace https://greasyfork.org/users/8638
// ==/UserScript==

//---------------------------------------------------------------------------------------
function bootstrap_MapOverlay()
{
var bGreasemonkeyServiceDefined = false;

try {
bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === 'object');
}
catch (err) { /* Ignore */ }

if (typeof unsafeWindow === 'undefined' || ! bGreasemonkeyServiceDefined) {
unsafeWindow = ( function () {
var dummyElem = document.createElement('p');
dummyElem.setAttribute('onclick', 'return window;');
return dummyElem.onclick();
}) ();
}

/* begin running the code! */
setTimeout(InitMapOverlay, 1000);
}

function AddMapPoligon(mapLayer,kabPoints,kabColor,kabNumber){

var mro_Map = unsafeWindow.Waze.map;
var mro_OL = unsafeWindow.OpenLayers;
var mapGroupLabel = '' + kabNumber;
var mapName = 'mapGroup' + kabNumber;

var style = {
strokeColor: kabColor,
strokeOpacity: '.8',
strokeWidth: 3,
fillColor: kabColor,
fillOpacity: 0.15,
label: mapGroupLabel,
labelOutlineColor: 'black',
labelOutlineWidth: 3,
fontSize: 14,
fontColor: kabColor,
fontOpacity: '.85',
fontWeight: 'bold' 
};

var attributes = {
name: mapName,
number: kabNumber
};

var pnt= [];
for(i=0;i<kabPoints.length;i++){
convPoint = new OpenLayers.Geometry.Point(kabPoints[i].lon,kabPoints[i].lat).transform(new OpenLayers.Projection('EPSG:4326'), mro_Map.getProjectionObject());
pnt.push(convPoint);
}

var ring = new mro_OL.Geometry.LinearRing(pnt);
var polygon = new mro_OL.Geometry.Polygon([ring]);

var feature = new mro_OL.Feature.Vector(polygon,attributes,style);
mapLayer.addFeatures([feature]);

}

function CurrentMapLocation(kab_mapLayer){
var mro_Map = unsafeWindow.Waze.map;

for(i=0;i < kab_mapLayer.features.length;i++){
var kabMapCenter = mro_Map.getCenter();
var mapCenterPoint = new OpenLayers.Geometry.Point(kabMapCenter.lon,kabMapCenter.lat);
var mpCenterCheck = kab_mapLayer.features[i].geometry.components[0].containsPoint(mapCenterPoint);
//console.log('MapRaid: ' + kab_mapLayer.features[i].attributes.number + ': ' + mpCenterCheck);
if(mpCenterCheck === true){
var mapLocationLabel = ('.WazeControlLocationInfo').text();
setTimeout(function(){$('.WazeControlLocationInfo').text(mapLocationLabel)},200);
}
}
}

function InitMapOverlay(){

var mro_Map = unsafeWindow.Waze.map;
var mro_OL = unsafeWindow.OpenLayers;

if (mro_Map === null) return;
if (mro_OL === null) return;

var mro_mapLayers = mro_Map.getLayersBy('uniqueName','__MapkabGroups');

var kab_mapLayer = new mro_OL.Layer.Vector('Kota Padang Sidempan', {
displayInLayerSwitcher: true,
uniqueName: '__MapkabGroups'
});

I18n.translations.en.layers.name['__MapkabGroups'] = 'Kota Padang Sidempan';
mro_Map.addLayer(kab_mapLayer);
kab_mapLayer.setVisibility(true);

var padangsidimpuan0 = [{lon:'99.2264754870',lat:'1.4201453830'},{lon:'99.2264806880',lat:'1.4204416780'},{lon:'99.2265257770',lat:'1.4230104460'},{lon:'99.2265259400',lat:'1.4246824740'},{lon:'99.2264061980',lat:'1.4291353660'},{lon:'99.2262293450',lat:'1.4333756080'},{lon:'99.2260103910',lat:'1.4379636170'},{lon:'99.2259061230',lat:'1.4401485050'},{lon:'99.2256596690',lat:'1.4453127990'},{lon:'99.2254914340',lat:'1.4488380520'},{lon:'99.2254017080',lat:'1.4502528610'},{lon:'99.2252174740',lat:'1.4531578910'},{lon:'99.2257615900',lat:'1.4556566970'},{lon:'99.2276390830',lat:'1.4592499350'},{lon:'99.2292501480',lat:'1.4616865720'},{lon:'99.2312511580',lat:'1.4642885610'},{lon:'99.2342679650',lat:'1.4665804330'},{lon:'99.2367099140',lat:'1.4680052460'},{lon:'99.2399524740',lat:'1.4691613820'},{lon:'99.2441383670',lat:'1.4701727950'},{lon:'99.2464914010',lat:'1.4702174880'},{lon:'99.2464015220',lat:'1.4703239940'},{lon:'99.2473808120',lat:'1.4702343520'},{lon:'99.2477759470',lat:'1.4702046650'},{lon:'99.2506822150',lat:'1.4699863160'},{lon:'99.2506827770',lat:'1.4699861740'},{lon:'99.2506855870',lat:'1.4699861740'},{lon:'99.2506867100',lat:'1.4699860320'},{lon:'99.2600156370',lat:'1.4694175000'},{lon:'99.2610701820',lat:'1.4693532300'},{lon:'99.2610707440',lat:'1.4693532300'},{lon:'99.2610713060',lat:'1.4693530890'},{lon:'99.2611621030',lat:'1.4693459410'},{lon:'99.2668869530',lat:'1.4688952330'},{lon:'99.2710585240',lat:'1.4685130210'},{lon:'99.2722199630',lat:'1.4684066050'},{lon:'99.2723280320',lat:'1.4683754670'},{lon:'99.2815426450',lat:'1.4678575260'},{lon:'99.2869475680',lat:'1.4674945190'},{lon:'99.2920979730',lat:'1.4671441730'},{lon:'99.2936638410',lat:'1.4670373330'},{lon:'99.2987631170',lat:'1.4666746270'},{lon:'99.2987668440',lat:'1.4666308220'},{lon:'99.2989051080',lat:'1.4650059250'},{lon:'99.2990671650',lat:'1.4631013940'},{lon:'99.2993873890',lat:'1.4586466290'},{lon:'99.2995148760',lat:'1.4568078650'},{lon:'99.2996918910',lat:'1.4542547710'},{lon:'99.2999964360',lat:'1.4501935590'},{lon:'99.3003319040',lat:'1.4462898180'},{lon:'99.3003414400',lat:'1.4461720630'},{lon:'99.3004243530',lat:'1.4451257500'},{lon:'99.3004733580',lat:'1.4445073310'},{lon:'99.3004805460',lat:'1.4444166180'},{lon:'99.3013279960',lat:'1.4416128850'},{lon:'99.3020262660',lat:'1.4408765810'},{lon:'99.3020756380',lat:'1.4403410980'},{lon:'99.3020092460',lat:'1.4396215770'},{lon:'99.3018967380',lat:'1.4385577060'},{lon:'99.3026225090',lat:'1.4376004510'},{lon:'99.3057890520',lat:'1.4334916410'},{lon:'99.3069934600',lat:'1.4319363460'},{lon:'99.3091903940',lat:'1.4290993680'},{lon:'99.3103707830',lat:'1.4275993110'},{lon:'99.3124979230',lat:'1.4248961060'},{lon:'99.3157771350',lat:'1.4205908640'},{lon:'99.3158930530',lat:'1.4204440330'},{lon:'99.3188932790',lat:'1.4165525100'},{lon:'99.3220240530',lat:'1.4126074750'},{lon:'99.3221541550',lat:'1.4124435350'},{lon:'99.3247888170',lat:'1.4100506290'},{lon:'99.3249455110',lat:'1.4096413660'},{lon:'99.3250574200',lat:'1.4092004430'},{lon:'99.3251173380',lat:'1.4089643640'},{lon:'99.3251487260',lat:'1.4084291660'},{lon:'99.3251348370',lat:'1.4081589390'},{lon:'99.3251171780',lat:'1.4078153800'},{lon:'99.3251666310',lat:'1.4074761450'},{lon:'99.3251951990',lat:'1.4072801760'},{lon:'99.3252274810',lat:'1.4070741580'},{lon:'99.3252470300',lat:'1.4069494010'},{lon:'99.3252889420',lat:'1.4066819230'},{lon:'99.3252731210',lat:'1.4060366120'},{lon:'99.3250387920',lat:'1.4057060010'},{lon:'99.3251011160',lat:'1.4054227040'},{lon:'99.3254921150',lat:'1.4051707440'},{lon:'99.3256173730',lat:'1.4049503440'},{lon:'99.3258672740',lat:'1.4041318280'},{lon:'99.3257576390',lat:'1.4035651270'},{lon:'99.3251866760',lat:'1.4025263440'},{lon:'99.3233331710',lat:'1.4023219110'},{lon:'99.3220193590',lat:'1.4004647490'},{lon:'99.3207523630',lat:'1.3999454210'},{lon:'99.3203933570',lat:'1.3999696440'},{lon:'99.3202596560',lat:'1.4000734210'},{lon:'99.3203372230',lat:'1.4003322430'},{lon:'99.3203731810',lat:'1.4003364790'},{lon:'99.3203597020',lat:'1.4003704070'},{lon:'99.3203597090',lat:'1.4004229940'},{lon:'99.3203799410',lat:'1.4004690750'},{lon:'99.3203799510',lat:'1.4005438550'},{lon:'99.3203338900',lat:'1.4006107250'},{lon:'99.3202996210',lat:'1.4006298130'},{lon:'99.3202754680',lat:'1.4006664290'},{lon:'99.3202552480',lat:'1.4007094060'},{lon:'99.3202502120',lat:'1.4008627830'},{lon:'99.3201940590',lat:'1.4010850110'},{lon:'99.3201940820',lat:'1.4012550680'},{lon:'99.3202458050',lat:'1.4015056950'},{lon:'99.3202177270',lat:'1.4016095990'},{lon:'99.3201615530',lat:'1.4016710990'},{lon:'99.3200390820',lat:'1.4017326080'},{lon:'99.3199784220',lat:'1.4018649300'},{lon:'99.3198750830',lat:'1.4021390440'},{lon:'99.3197385850',lat:'1.4023376750'},{lon:'99.3196869100',lat:'1.4024369180'},{lon:'99.3196751240',lat:'1.4025280980'},{lon:'99.3196970410',lat:'1.4025679580'},{lon:'99.3197650320',lat:'1.4026363680'},{lon:'99.3197931250',lat:'1.4026529030'},{lon:'99.3198442630',lat:'1.4027381370'},{lon:'99.3198476400',lat:'1.4027795550'},{lon:'99.3198611310',lat:'1.4028334120'},{lon:'99.3198650730',lat:'1.4029021130'},{lon:'99.3198504730',lat:'1.4029514500'},{lon:'99.3198319390',lat:'1.4030006460'},{lon:'99.3197813810',lat:'1.4030516850'},{lon:'99.3195645270',lat:'1.4031423270'},{lon:'99.3194190200',lat:'1.4031932370'},{lon:'99.3192718280',lat:'1.4032537600'},{lon:'99.3191532900',lat:'1.4033103210'},{lon:'99.3190937400',lat:'1.4033397320'},{lon:'99.3190555410',lat:'1.4033794600'},{lon:'99.3190347590',lat:'1.4034256880'},{lon:'99.3190033530',lat:'1.4038410110'},{lon:'99.3189843020',lat:'1.4042180240'},{lon:'99.3189798590',lat:'1.4045982870'},{lon:'99.3189877730',lat:'1.4049579090'},{lon:'99.3190192510',lat:'1.4050708520'},{lon:'99.3190321870',lat:'1.4051695200'},{lon:'99.3191159650',lat:'1.4056516920'},{lon:'99.3190828330',lat:'1.4057693090'},{lon:'99.3190221600',lat:'1.4058057880'},{lon:'99.3189749660',lat:'1.4058076330'},{lon:'99.3189137250',lat:'1.4057901120'},{lon:'99.3188946200',lat:'1.4057741410'},{lon:'99.3188344940',lat:'1.4056993690'},{lon:'99.3187839180',lat:'1.4056199310'},{lon:'99.3186900310',lat:'1.4051675880'},{lon:'99.3185753960',lat:'1.4050034830'},{lon:'99.3184725700',lat:'1.4049244770'},{lon:'99.3183214320',lat:'1.4048819480'},{lon:'99.3179230890',lat:'1.4048455310'},{lon:'99.3177596000',lat:'1.4048759460'},{lon:'99.3175725150',lat:'1.4049063640'},{lon:'99.3174635260',lat:'1.4049565620'},{lon:'99.3173848770',lat:'1.4050090180'},{lon:'99.3173466810',lat:'1.4050695260'},{lon:'99.3173405150',lat:'1.4051793650'},{lon:'99.3173686160',lat:'1.4052477800'},{lon:'99.3174399870',lat:'1.4053805080'},{lon:'99.3175787880',lat:'1.4055932380'},{lon:'99.3175855370',lat:'1.4056455400'},{lon:'99.3176029580',lat:'1.4056783340'},{lon:'99.3175917310',lat:'1.4057505710'},{lon:'99.3175681380',lat:'1.4057823810'},{lon:'99.3175288170',lat:'1.4058317210'},{lon:'99.3174878060',lat:'1.4058523650'},{lon:'99.3174231960',lat:'1.4058583110'},{lon:'99.3173939820',lat:'1.4058651010'},{lon:'99.3173406050',lat:'1.4058426320'},{lon:'99.3172709280',lat:'1.4057695570'},{lon:'99.3172226010',lat:'1.4057027000'},{lon:'99.3171439250',lat:'1.4055568260'},{lon:'99.3170635580',lat:'1.4053671300'},{lon:'99.3169388160',lat:'1.4052526450'},{lon:'99.3168416130',lat:'1.4052043120'},{lon:'99.3167820580',lat:'1.4052016350'},{lon:'99.3167399220',lat:'1.4052096980'},{lon:'99.3167140790',lat:'1.4052191730'},{lon:'99.3166876790',lat:'1.4052637050'},{lon:'99.3166685860',lat:'1.4053274620'},{lon:'99.3166320760',lat:'1.4054005500'},{lon:'99.3165405340',lat:'1.4056695730'},{lon:'99.3164770640',lat:'1.4057936970'},{lon:'99.3164298770',lat:'1.4058445940'},{lon:'99.3163428030',lat:'1.4059145790'},{lon:'99.3161956120',lat:'1.4059845730'},{lon:'99.3161534800',lat:'1.4060196370'},{lon:'99.3160838110',lat:'1.4060069240'},{lon:'99.3160186360',lat:'1.4059878490'},{lon:'99.3159298530',lat:'1.4058852320'},{lon:'99.3158399470',lat:'1.4057874230'},{lon:'99.3157056470',lat:'1.4056203520'},{lon:'99.3155921450',lat:'1.4055359750'},{lon:'99.3154370600',lat:'1.4053864360'},{lon:'99.3152173620',lat:'1.4052227690'},{lon:'99.3149757500',lat:'1.4050404460'},{lon:'99.3148667400',lat:'1.4049310470'},{lon:'99.3147667350',lat:'1.4049345950'},{lon:'99.3147161840',lat:'1.4050380780'},{lon:'99.3147280060',lat:'1.4052106780'},{lon:'99.3147460160',lat:'1.4054485870'},{lon:'99.3147538950',lat:'1.4055472560'},{lon:'99.3147679570',lat:'1.4056698140'},{lon:'99.3147589870',lat:'1.4058161250'},{lon:'99.3147443840',lat:'1.4058479330'},{lon:'99.3147174190',lat:'1.4058670200'},{lon:'99.3146814630',lat:'1.4058797480'},{lon:'99.3146623630',lat:'1.4058957240'},{lon:'99.3146449470',lat:'1.4058994020'},{lon:'99.3146292170',lat:'1.4059117020'},{lon:'99.3145280860',lat:'1.4058988520'},{lon:'99.3144348210',lat:'1.4058942000'},{lon:'99.3143511070',lat:'1.4058814890'},{lon:'99.3143050360',lat:'1.4058782440'},{lon:'99.3142589620',lat:'1.4058512500'},{lon:'99.3141673800',lat:'1.4058258170'},{lon:'99.3140583650',lat:'1.4056745750'},{lon:'99.3140122910',lat:'1.4056444720'},{lon:'99.3139493620',lat:'1.4056173390'},{lon:'99.3138718290',lat:'1.4056173490'},{lon:'99.3138229530',lat:'1.4056364400'},{lon:'99.3137898080',lat:'1.4056651410'},{lon:'99.3136190150',lat:'1.4056890540'},{lon:'99.3135442920',lat:'1.4056921740'},{lon:'99.3134830500',lat:'1.4056746530'},{lon:'99.3133925940',lat:'1.4056667490'},{lon:'99.3133324760',lat:'1.4056492290'},{lon:'99.3132459540',lat:'1.4056509370'},{lon:'99.3131650520',lat:'1.4056667800'},{lon:'99.3130768450',lat:'1.4056667920'},{lon:'99.3130341420',lat:'1.4056386670'},{lon:'99.3130133500',lat:'1.4056062980'},{lon:'99.3129914360',lat:'1.4055920230'},{lon:'99.3129453680',lat:'1.4056016420'},{lon:'99.3129071650',lat:'1.4056190350'},{lon:'99.3128582880',lat:'1.4056334600'},{lon:'99.3128094090',lat:'1.4056341730'},{lon:'99.3127683940',lat:'1.4056254150'},{lon:'99.3127459190',lat:'1.4056111400'},{lon:'99.3127082710',lat:'1.4055745330'},{lon:'99.3126857910',lat:'1.4055220910'},{lon:'99.3126543260',lat:'1.4055013150'},{lon:'99.3125925230',lat:'1.4054918520'},{lon:'99.3125138650',lat:'1.4054775850'},{lon:'99.3124149780',lat:'1.4054419750'},{lon:'99.3121851800',lat:'1.4053751420'},{lon:'99.3119076290',lat:'1.4053265510'},{lon:'99.3116840250',lat:'1.4053630530'},{lon:'99.3115087400',lat:'1.4054117040'},{lon:'99.3114452550',lat:'1.4054251420'},{lon:'99.3113587450',lat:'1.4055171800'},{lon:'99.3113070650',lat:'1.4055827790'},{lon:'99.3112435920',lat:'1.4056909290'},{lon:'99.3112155050',lat:'1.4057227390'},{lon:'99.3111744950',lat:'1.4057466340'},{lon:'99.3110784240',lat:'1.4057624790'},{lon:'99.3109801090',lat:'1.4058087180'},{lon:'99.3109199970',lat:'1.4058341710'},{lon:'99.3108458420',lat:'1.4058914320'},{lon:'99.3107716850',lat:'1.4059249450'},{lon:'99.3106969620',lat:'1.4059280650'},{lon:'99.3105834770',lat:'1.4059646920'},{lon:'99.3105503330',lat:'1.4059980580'},{lon:'99.3104267370',lat:'1.4060523580'},{lon:'99.3102385340',lat:'1.4061254660'},{lon:'99.3101913370',lat:'1.4061079440'},{lon:'99.3100711080',lat:'1.4061254890'},{lon:'99.3100171780',lat:'1.4061748310'},{lon:'99.3099750440',lat:'1.4061960410'},{lon:'99.3099110020',lat:'1.4062484950'},{lon:'99.3097795380',lat:'1.4062803180'},{lon:'99.3094716780',lat:'1.4064658260'},{lon:'99.3093239300',lat:'1.4065664950'},{lon:'99.3091924700',lat:'1.4066353550'},{lon:'99.3090503370',lat:'1.4067095890'},{lon:'99.3089239320',lat:'1.4067678470'},{lon:'99.3087907830',lat:'1.4068019320'},{lon:'99.3086396560',lat:'1.4068473290'},{lon:'99.3085452740',lat:'1.4068951220'},{lon:'99.3084806660',lat:'1.4069116700'},{lon:'99.3084239240',lat:'1.4069321750'},{lon:'99.3083778560',lat:'1.4069531030'},{lon:'99.3082609960',lat:'1.4069586310'},{lon:'99.3081868330',lat:'1.4069531280'},{lon:'99.3080744590',lat:'1.4068941950'},{lon:'99.3080160220',lat:'1.4068402030'},{lon:'99.3079862420',lat:'1.4068211230'},{lon:'99.3079654530',lat:'1.4068084030'},{lon:'99.3079480290',lat:'1.4067542640'},{lon:'99.3079322860',lat:'1.4066683190'},{lon:'99.3079862060',lat:'1.4065457510'},{lon:'99.3080547350',lat:'1.4064394380'},{lon:'99.3081873050',lat:'1.4062631430'},{lon:'99.3083204320',lat:'1.4060564550'},{lon:'99.3084108720',lat:'1.4059474530'},{lon:'99.3084805270',lat:'1.4058508940'},{lon:'99.3085642200',lat:'1.4057007580'},{lon:'99.3086119660',lat:'1.4056259710'},{lon:'99.3086737520',lat:'1.4055099050'},{lon:'99.3087096920',lat:'1.4053809790'},{lon:'99.3087164270',lat:'1.4053300880'},{lon:'99.3087034980',lat:'1.4052728380'},{lon:'99.3086798980',lat:'1.4052505060'},{lon:'99.3085894390',lat:'1.4052154610'},{lon:'99.3085169600',lat:'1.4051963860'},{lon:'99.3084192010',lat:'1.4051917350'},{lon:'99.3082388450',lat:'1.4051308320'},{lon:'99.3080410750',lat:'1.4050931150'},{lon:'99.3077888110',lat:'1.4050778810'},{lon:'99.3073960950',lat:'1.4051144040'},{lon:'99.3071578940',lat:'1.4052316240'},{lon:'99.3070314880',lat:'1.4052740490'},{lon:'99.3069579000',lat:'1.4053641060'},{lon:'99.3068680110',lat:'1.4054011550'},{lon:'99.3067921760',lat:'1.4054913540'},{lon:'99.3066955580',lat:'1.4056250940'},{lon:'99.3065567990',lat:'1.4057284480'},{lon:'99.3063635590',lat:'1.4059594580'},{lon:'99.3062321160',lat:'1.4061549780'},{lon:'99.3060680730',lat:'1.4062453290'},{lon:'99.3059798690',lat:'1.4062697970'},{lon:'99.3059096450',lat:'1.4063092460'},{lon:'99.3058568440',lat:'1.4063933630'},{lon:'99.3055976910',lat:'1.4052521860'},{lon:'99.3054566530',lat:'1.4051105610'},{lon:'99.3053942730',lat:'1.4049846160'},{lon:'99.3053003470',lat:'1.4042133600'},{lon:'99.3062935320',lat:'1.4031900560'},{lon:'99.3064339080',lat:'1.4025604140'},{lon:'99.3065119730',lat:'1.4023400210'},{lon:'99.3064966830',lat:'1.4014112790'},{lon:'99.3063083000',lat:'1.4001048420'},{lon:'99.3062071320',lat:'1.3998057340'},{lon:'99.3058939380',lat:'1.3978381660'},{lon:'99.3065664130',lat:'1.3975704800'},{lon:'99.3067540770',lat:'1.3976648850'},{lon:'99.3069102650',lat:'1.3976648650'},{lon:'99.3071450960',lat:'1.3975545720'},{lon:'99.3072703570',lat:'1.3973500050'},{lon:'99.3072854900',lat:'1.3970665740'},{lon:'99.3072988320',lat:'1.3969210000'},{lon:'99.3073561800',lat:'1.3962952970'},{lon:'99.3074808650',lat:'1.3959804690'},{lon:'99.3077246750',lat:'1.3957932740'},{lon:'99.3079302750',lat:'1.3955693310'},{lon:'99.3080836050',lat:'1.3951915930'},{lon:'99.3081380800',lat:'1.3950201140'},{lon:'99.3084195180',lat:'1.3947210980'},{lon:'99.3088728690',lat:'1.3943747030'},{lon:'99.3092015100',lat:'1.3941542770'},{lon:'99.3093576320',lat:'1.3936505860'},{lon:'99.3094514040',lat:'1.3932413320'},{lon:'99.3095844690',lat:'1.3925643350'},{lon:'99.3099906710',lat:'1.3925642810'},{lon:'99.3103507660',lat:'1.3922809450'},{lon:'99.3105541060',lat:'1.3919661070'},{lon:'99.3107259830',lat:'1.3916355810'},{lon:'99.3109759800',lat:'1.3915095950'},{lon:'99.3110697700',lat:'1.3912419860'},{lon:'99.3112731080',lat:'1.3909113140'},{lon:'99.3113202520',lat:'1.3905335910'},{lon:'99.3111477440',lat:'1.3903289220'},{lon:'99.3111095330',lat:'1.3902787440'},{lon:'99.3108943580',lat:'1.3903131230'},{lon:'99.3108241210',lat:'1.3902503680'},{lon:'99.3107263510',lat:'1.3901601930'},{lon:'99.3106527420',lat:'1.3900818880'},{lon:'99.3105628360',lat:'1.3899760210'},{lon:'99.3105015800',lat:'1.3898537510'},{lon:'99.3105139330',lat:'1.3897956500'},{lon:'99.3105201050',lat:'1.3897368430'},{lon:'99.3105863890',lat:'1.3896466450'},{lon:'99.3105807620',lat:'1.3895795000'},{lon:'99.3105015350',lat:'1.3895031750'},{lon:'99.3104150040',lat:'1.3894350500'},{lon:'99.3102082380',lat:'1.3893331560'},{lon:'99.3099615870',lat:'1.3892634970'},{lon:'99.3097773080',lat:'1.3892688930'},{lon:'99.3097053930',lat:'1.3892544840'},{lon:'99.3096115610',lat:'1.3892072820'},{lon:'99.3095413260',lat:'1.3891564010'},{lon:'99.3094469380',lat:'1.3891509000'},{lon:'99.3093946870',lat:'1.3891400220'},{lon:'99.3093373780',lat:'1.3891188260'},{lon:'99.3092868130',lat:'1.3891127540'},{lon:'99.3091929800',lat:'1.3890583420'},{lon:'99.3090699220',lat:'1.3889220860'},{lon:'99.3089614680',lat:'1.3887568490'},{lon:'99.3086855670',lat:'1.3884153560'},{lon:'99.3086097120',lat:'1.3883517530'},{lon:'99.3085529560',lat:'1.3882618550'},{lon:'99.3084832780',lat:'1.3881756330'},{lon:'99.3084759690',lat:'1.3881356290'},{lon:'99.3084416900',lat:'1.3880775340'},{lon:'99.3084023480',lat:'1.3879667120'},{lon:'99.3083371560',lat:'1.3878129190'},{lon:'99.3082922020',lat:'1.3877542600'},{lon:'99.3082556730',lat:'1.3876779300'},{lon:'99.3082556690',lat:'1.3876471130'},{lon:'99.3082680230',lat:'1.3875972110'},{lon:'99.3084242130',lat:'1.3876117510'},{lon:'99.3091955740',lat:'1.3874025760'},{lon:'99.3096066820',lat:'1.3862522640'},{lon:'99.3096065190',lat:'1.3849928760'},{lon:'99.3100131710',lat:'1.3841428160'},{lon:'99.3105137210',lat:'1.3838594620'},{lon:'99.3108320190',lat:'1.3834140970'},{lon:'99.3112647460',lat:'1.3828086240'},{lon:'99.3117703390',lat:'1.3824216520'},{lon:'99.3118011670',lat:'1.3818653910'},{lon:'99.3117533420',lat:'1.3813328890'},{lon:'99.3118999270',lat:'1.3809393200'},{lon:'99.3121442920',lat:'1.3807179150'},{lon:'99.3128285150',lat:'1.3801029030'},{lon:'99.3131216980',lat:'1.3794142930'},{lon:'99.3131764590',lat:'1.3787501390'},{lon:'99.3132434630',lat:'1.3782582240'},{lon:'99.3146729910',lat:'1.3758476830'},{lon:'99.3192627870',lat:'1.3693105250'},{lon:'99.3192835710',lat:'1.3692809770'},{lon:'99.3193992840',lat:'1.3691164170'},{lon:'99.3212870610',lat:'1.3652995520'},{lon:'99.3237385970',lat:'1.3605907130'},{lon:'99.3248492150',lat:'1.3584574710'},{lon:'99.3272535170',lat:'1.3543186590'},{lon:'99.3273703520',lat:'1.3541823030'},{lon:'99.3273712100',lat:'1.3541827910'},{lon:'99.3281139270',lat:'1.3529226850'},{lon:'99.3294910270',lat:'1.3505862750'},{lon:'99.3328101430',lat:'1.3455969540'},{lon:'99.3329606650',lat:'1.3453716950'},{lon:'99.3368089110',lat:'1.3398617590'},{lon:'99.3369584630',lat:'1.3396186960'},{lon:'99.3384331820',lat:'1.3372218840'},{lon:'99.3406076120',lat:'1.3336878540'},{lon:'99.3409008100',lat:'1.3331958770'},{lon:'99.3410080110',lat:'1.3330542260'},{lon:'99.3416827110',lat:'1.3321627020'},{lon:'99.3424646560',lat:'1.3314494270'},{lon:'99.3427333990',lat:'1.3311614160'},{lon:'99.3445659760',lat:'1.3284238660'},{lon:'99.3458488860',lat:'1.3265052770'},{lon:'99.3460196700',lat:'1.3264560590'},{lon:'99.3463128770',lat:'1.3260378720'},{lon:'99.3463375490',lat:'1.3256935140'},{lon:'99.3463616420',lat:'1.3252261710'},{lon:'99.3464345990',lat:'1.3246605760'},{lon:'99.3465811120',lat:'1.3237996670'},{lon:'99.3466787710',lat:'1.3231109430'},{lon:'99.3470696480',lat:'1.3220779640'},{lon:'99.3479424720',lat:'1.3204345210'},{lon:'99.3480104330',lat:'1.3203068620'},{lon:'99.3490855300',lat:'1.3188310440'},{lon:'99.3494274700',lat:'1.3173799260'},{lon:'99.3496521710',lat:'1.3167113470'},{lon:'99.3499570290',lat:'1.3157581600'},{lon:'99.3499283580',lat:'1.3156251430'},{lon:'99.3498137290',lat:'1.3154740450'},{lon:'99.3497608980',lat:'1.3153230790'},{lon:'99.3497339070',lat:'1.3151542980'},{lon:'99.3496810580',lat:'1.3148701700'},{lon:'99.3496282170',lat:'1.3146480990'},{lon:'99.3495882400',lat:'1.3140085880'},{lon:'99.3495972100',lat:'1.3138752840'},{lon:'99.3496061730',lat:'1.3136886860'},{lon:'99.3495418370',lat:'1.3134530550'},{lon:'99.3494825230',lat:'1.3133156520'},{lon:'99.3494470970',lat:'1.3130848150'},{lon:'99.3494560600',lat:'1.3128982170'},{lon:'99.3495796210',lat:'1.3126317340'},{lon:'99.3494908330',lat:'1.3124718680'},{lon:'99.3495969780',lat:'1.3122053870'},{lon:'99.3494469450',lat:'1.3119833310'},{lon:'99.3493761030',lat:'1.3115924780'},{lon:'99.3491333800',lat:'1.3114326330'},{lon:'99.3489125990',lat:'1.3115037680'},{lon:'99.3480743850',lat:'1.3115216970'},{lon:'99.3471258290',lat:'1.3115139820'},{lon:'99.3469979600',lat:'1.3115129420'},{lon:'99.3455192870',lat:'1.3115397230'},{lon:'99.3448839080',lat:'1.3117264080'},{lon:'99.3443811130',lat:'1.3118952630'},{lon:'99.3435956070',lat:'1.3111758440'},{lon:'99.3435837760',lat:'1.3111864210'},{lon:'99.3434332510',lat:'1.3112233640'},{lon:'99.3421495470',lat:'1.3114179120'},{lon:'99.3419888700',lat:'1.3114179340'},{lon:'99.3419354960',lat:'1.3114026740'},{lon:'99.3418360530',lat:'1.3113795050'},{lon:'99.3416523460',lat:'1.3114103470'},{lon:'99.3416235200',lat:'1.3114282190'},{lon:'99.3413697470',lat:'1.3113347580'},{lon:'99.3410798410',lat:'1.3112419230'},{lon:'99.3408051050',lat:'1.3111492280'},{lon:'99.3405225040',lat:'1.3110678430'},{lon:'99.3402325990',lat:'1.3109750080'},{lon:'99.3399240730',lat:'1.3108762110'},{lon:'99.3396527880',lat:'1.3107893390'},{lon:'99.3393786120',lat:'1.3106850520'},{lon:'99.3388594770',lat:'1.3104993740'},{lon:'99.3386077710',lat:'1.3103837750'},{lon:'99.3381498740',lat:'1.3102098220'},{lon:'99.3378981710',lat:'1.3101056730'},{lon:'99.3373869040',lat:'1.3099431770'},{lon:'99.3369750830',lat:'1.3098270340'},{lon:'99.3365402330',lat:'1.3097452450'},{lon:'99.3361508920',lat:'1.3096869150'},{lon:'99.3356935760',lat:'1.3096513540'},{lon:'99.3352205340',lat:'1.3096502870'},{lon:'99.3348772660',lat:'1.3096264430'},{lon:'99.3346025420',lat:'1.3096257730'},{lon:'99.3342665810',lat:'1.3096249700'},{lon:'99.3339918610',lat:'1.3096589330'},{lon:'99.3335266960',lat:'1.3097498910'},{lon:'99.3331452380',lat:'1.3098182200'},{lon:'99.3327941180',lat:'1.3098981350'},{lon:'99.3324811970',lat:'1.3099435540'},{lon:'99.3320390600',lat:'1.3099885660'},{lon:'99.3316958030',lat:'1.3100452980'},{lon:'99.3314283870',lat:'1.3100794010'},{lon:'99.3307418670',lat:'1.3101585130'},{lon:'99.3303148950',lat:'1.3101690310'},{lon:'99.3299407300',lat:'1.3101680910'},{lon:'99.3296204990',lat:'1.3101675680'},{lon:'99.3292997040',lat:'1.3101437200'},{lon:'99.3288266530',lat:'1.3100851180'},{lon:'99.3284609100',lat:'1.3100380930'},{lon:'99.3281097710',lat:'1.3099681650'},{lon:'99.3277738020',lat:'1.3099098280'},{lon:'99.3274687320',lat:'1.3098513440'},{lon:'99.3270338760',lat:'1.3097237520'},{lon:'99.3267366660',lat:'1.3096194670'},{lon:'99.3264237180',lat:'1.3094573660'},{lon:'99.3261186290',lat:'1.3092493220'},{lon:'99.3257371340',lat:'1.3090411470'},{lon:'99.3254623880',lat:'1.3088675920'},{lon:'99.3252337130',lat:'1.3087173540'},{lon:'99.3249814440',lat:'1.3085898790'},{lon:'99.3245696030',lat:'1.3083125820'},{lon:'99.3241959740',lat:'1.3081042640'},{lon:'99.3237684110',lat:'1.3078959530'},{lon:'99.3234251260',lat:'1.3077337150'},{lon:'99.3230818430',lat:'1.3075948020'},{lon:'99.3227082220',lat:'1.3074441590'},{lon:'99.3224413530',lat:'1.3073629110'},{lon:'99.3220520000',lat:'1.3072122700'},{lon:'99.3217087180',lat:'1.3070732150'},{lon:'99.3214418400',lat:'1.3069197310'},{lon:'99.3214030490',lat:'1.3067194270'},{lon:'99.3213176450',lat:'1.3066429610'},{lon:'99.3211940410',lat:'1.3065950560'},{lon:'99.3210181950',lat:'1.3065950780'},{lon:'99.3207805470',lat:'1.3065664120'},{lon:'99.3206951520',lat:'1.3065664230'},{lon:'99.3207614170',lat:'1.3063463150'},{lon:'99.3208850030',lat:'1.3062505980'},{lon:'99.3209422830',lat:'1.3060591870'},{lon:'99.3210371840',lat:'1.3057050650'},{lon:'99.3211893900',lat:'1.3053605480'},{lon:'99.3212556580',lat:'1.3051596650'},{lon:'99.3213224800',lat:'1.3049012480'},{lon:'99.3213696560',lat:'1.3047768440'},{lon:'99.3213982910',lat:'1.3046428300'},{lon:'99.3213791730',lat:'1.3045088220'},{lon:'99.3214645410',lat:'1.3042983240'},{lon:'99.3214216100',lat:'1.3042800340'},{lon:'99.3213746470',lat:'1.3042600260'},{lon:'99.3210133820',lat:'1.3040782820'},{lon:'99.3208802260',lat:'1.3040209060'},{lon:'99.3207184220',lat:'1.3039922310'},{lon:'99.3205757210',lat:'1.3039826370'},{lon:'99.3205375280',lat:'1.3040591180'},{lon:'99.3203571860',lat:'1.3040400570'},{lon:'99.3201667260',lat:'1.3039826890'},{lon:'99.3201144910',lat:'1.3040880100'},{lon:'99.3199341510',lat:'1.3040880330'},{lon:'99.3197341500',lat:'1.3041071420'},{lon:'99.3195633540',lat:'1.3040592430'},{lon:'99.3194729040',lat:'1.3040688670'},{lon:'99.3194633670',lat:'1.3041741820'},{lon:'99.3191875240',lat:'1.3042125260'},{lon:'99.3191779940',lat:'1.3043750930'},{lon:'99.3180560610',lat:'1.3043465400'},{lon:'99.3178661740',lat:'1.3043848730'},{lon:'99.3162116720',lat:'1.3045574020'},{lon:'99.3161352680',lat:'1.3045668830'},{lon:'99.3160689840',lat:'1.3046435090'},{lon:'99.3158689820',lat:'1.3046531470'},{lon:'99.3156313360',lat:'1.3046435640'},{lon:'99.3153841350',lat:'1.3046052870'},{lon:'99.3154127630',lat:'1.3044044080'},{lon:'99.3147661110',lat:'1.3043182590'},{lon:'99.3145093520',lat:'1.3042131190'},{lon:'99.3141958580',lat:'1.3041748490'},{lon:'99.3139486600',lat:'1.3041461840'},{lon:'99.3139104640',lat:'1.3042035820'},{lon:'99.3138531750',lat:'1.3043279870'},{lon:'99.3136205830',lat:'1.3042993200'},{lon:'99.3134779020',lat:'1.3044524320'},{lon:'99.3132969960',lat:'1.3044141460'},{lon:'99.3129930450',lat:'1.3043090110'},{lon:'99.3129261720',lat:'1.3041653960'},{lon:'99.3129452360',lat:'1.3038686760'},{lon:'99.3129075660',lat:'1.3036294970'},{lon:'99.3126412670',lat:'1.3036104470'},{lon:'99.3124890160',lat:'1.3036008530'},{lon:'99.3123940550',lat:'1.3034764670'},{lon:'99.3121558610',lat:'1.3035818110'},{lon:'99.3117901370',lat:'1.3036870290'},{lon:'99.3116570090',lat:'1.3038497530'},{lon:'99.3114952090',lat:'1.3038593860'},{lon:'99.3112193480',lat:'1.3037444930'},{lon:'99.3106631730',lat:'1.3038659920'},{lon:'99.3104738470',lat:'1.3038978220'},{lon:'99.3101266730',lat:'1.3040884200'},{lon:'99.3099379370',lat:'1.3043424700'},{lon:'99.3096537090',lat:'1.3047234740'},{lon:'99.3094015190',lat:'1.3052315590'},{lon:'99.3091173060',lat:'1.3057396470'},{lon:'99.3085814140',lat:'1.3063430440'},{lon:'99.3082941220',lat:'1.3065083910'},{lon:'99.3074992190',lat:'1.3071201800'},{lon:'99.3073331890',lat:'1.3072767490'},{lon:'99.3071660890',lat:'1.3075662640'},{lon:'99.3069946650',lat:'1.3077757810'},{lon:'99.3066625960',lat:'1.3084399190'},{lon:'99.3063348930',lat:'1.3090085470'},{lon:'99.3059839510',lat:'1.3094296780'},{lon:'99.3055486520',lat:'1.3103728260'},{lon:'99.3054038080',lat:'1.3106241580'},{lon:'99.3052851680',lat:'1.3107885580'},{lon:'99.3048542850',lat:'1.3109049660'},{lon:'99.3042062960',lat:'1.3110947780'},{lon:'99.3039471070',lat:'1.3112252510'},{lon:'99.3037554070',lat:'1.3114773470'},{lon:'99.3034994330',lat:'1.3115929130'},{lon:'99.3033816340',lat:'1.3117708020'},{lon:'99.3031933000',lat:'1.3132531120'},{lon:'99.3022131380',lat:'1.3158602050'},{lon:'99.3016591370',lat:'1.3173337700'},{lon:'99.3016150100',lat:'1.3174511410'},{lon:'99.2996006990',lat:'1.3209851590'},{lon:'99.2995920060',lat:'1.3210005720'},{lon:'99.2977842050',lat:'1.3242061270'},{lon:'99.2969351550',lat:'1.3250088070'},{lon:'99.2959252750',lat:'1.3259542310'},{lon:'99.2957839450',lat:'1.3264167210'},{lon:'99.2955719480',lat:'1.3271045280'},{lon:'99.2953129150',lat:'1.3285631310'},{lon:'99.2935339620',lat:'1.3298203240'},{lon:'99.2929449710',lat:'1.3308046340'},{lon:'99.2929803610',lat:'1.3311722370'},{lon:'99.2930089400',lat:'1.3323091570'},{lon:'99.2929569530',lat:'1.3325003700'},{lon:'99.2928341330',lat:'1.3326145030'},{lon:'99.2928038020',lat:'1.3326426880'},{lon:'99.2920033990',lat:'1.3341906900'},{lon:'99.2905657010',lat:'1.3369712370'},{lon:'99.2900327100',lat:'1.3379005450'},{lon:'99.2897912800',lat:'1.3383214950'},{lon:'99.2890104590',lat:'1.3396829120'},{lon:'99.2873858130',lat:'1.3425276110'},{lon:'99.2868657180',lat:'1.3434382810'},{lon:'99.2836196990',lat:'1.3491219280'},{lon:'99.2829312730',lat:'1.3503347810'},{lon:'99.2828649340',lat:'1.3503985280'},{lon:'99.2822427820',lat:'1.3509963740'},{lon:'99.2817889930',lat:'1.3513429330'},{lon:'99.2805685780',lat:'1.3533276120'},{lon:'99.2799739910',lat:'1.3540679450'},{lon:'99.2792072730',lat:'1.3549185500'},{lon:'99.2787847890',lat:'1.3553281060'},{lon:'99.2782058810',lat:'1.3563361920'},{lon:'99.2780652380',lat:'1.3581002420'},{lon:'99.2768290070',lat:'1.3586673950'},{lon:'99.2763908420',lat:'1.3588091980'},{lon:'99.2755144980',lat:'1.3589668020'},{lon:'99.2752121740',lat:'1.3589902430'},{lon:'99.2737931320',lat:'1.3594867590'},{lon:'99.2733080060',lat:'1.3595183150'},{lon:'99.2725098760',lat:'1.3593924030'},{lon:'99.2720090940',lat:'1.3593609590'},{lon:'99.2712451040',lat:'1.3594488670'},{lon:'99.2697399610',lat:'1.3595344690'},{lon:'99.2688636310',lat:'1.3598338230'},{lon:'99.2684880610',lat:'1.3599598680'},{lon:'99.2674709100',lat:'1.3604639910'},{lon:'99.2666728890',lat:'1.3613303470'},{lon:'99.2655931490',lat:'1.3619289790'},{lon:'99.2644501010',lat:'1.3618966990'},{lon:'99.2622598270',lat:'1.3618348440'},{lon:'99.2586976660',lat:'1.3618515650'},{lon:'99.2553897610',lat:'1.3618670870'},{lon:'99.2520862430',lat:'1.3618815520'},{lon:'99.2480189110',lat:'1.3618993620'},{lon:'99.2472051840',lat:'1.3622932050'},{lon:'99.2465949140',lat:'1.3628445290'},{lon:'99.2457499760',lat:'1.3641046430'},{lon:'99.2453119060',lat:'1.3652229620'},{lon:'99.2458128470',lat:'1.3667979440'},{lon:'99.2460164080',lat:'1.3679634480'},{lon:'99.2457676920',lat:'1.3691060900'},{lon:'99.2454511670',lat:'1.3705602570'},{lon:'99.2445147640',lat:'1.3748622490'},{lon:'99.2446402370',lat:'1.3775870440'},{lon:'99.2451568120',lat:'1.3789730200'},{lon:'99.2446092970',lat:'1.3810993720'},{lon:'99.2432634990',lat:'1.3816822730'},{lon:'99.2421837480',lat:'1.3823281480'},{lon:'99.2402590320',lat:'1.3840608820'},{lon:'99.2399773650',lat:'1.3842971660'},{lon:'99.2391011000',lat:'1.3853840280'},{lon:'99.2389394070',lat:'1.3859182020'},{lon:'99.2389255260',lat:'1.3859640590'},{lon:'99.2388877380',lat:'1.3860888960'},{lon:'99.2387223510',lat:'1.3866352720'},{lon:'99.2368479140',lat:'1.3888808320'},{lon:'99.2347353800',lat:'1.3904718290'},{lon:'99.2333739260',lat:'1.3910704780'},{lon:'99.2323410900',lat:'1.3914485890'},{lon:'99.2316368810',lat:'1.3916691630'},{lon:'99.2314111550',lat:'1.3919765860'},{lon:'99.2305728490',lat:'1.3931183000'},{lon:'99.2298530630',lat:'1.3940948920'},{lon:'99.2288516110',lat:'1.3953707690'},{lon:'99.2288203610',lat:'1.3958747830'},{lon:'99.2288673480',lat:'1.3962685370'},{lon:'99.2291492210',lat:'1.3981270510'},{lon:'99.2282995290',lat:'1.3994415590'},{lon:'99.2277879750',lat:'1.4009464970'},{lon:'99.2277880510',lat:'1.4017340150'},{lon:'99.2275957810',lat:'1.4040889420'},{lon:'99.2275279360',lat:'1.4046259190'},{lon:'99.2272149600',lat:'1.4048149530'},{lon:'99.2269802400',lat:'1.4050669820'},{lon:'99.2266829090',lat:'1.4052087640'},{lon:'99.2264951250',lat:'1.4053347850'},{lon:'99.2264795010',lat:'1.4056025430'},{lon:'99.2266360230',lat:'1.4058545330'},{lon:'99.2266673420',lat:'1.4060592850'},{lon:'99.2265108510',lat:'1.4061223010'},{lon:'99.2264482700',lat:'1.4063113120'},{lon:'99.2264639350',lat:'1.4064688140'},{lon:'99.2263231030',lat:'1.4066263310'},{lon:'99.2259475180',lat:'1.4067051190'},{lon:'99.2256559260',lat:'1.4070535010'},{lon:'99.2254780650',lat:'1.4070989240'},{lon:'99.2250085290',lat:'1.4066264590'},{lon:'99.2247738030',lat:'1.4068312360'},{lon:'99.2247581760',lat:'1.4070674930'},{lon:'99.2247581930',lat:'1.4072407470'},{lon:'99.2245234620',lat:'1.4073982730'},{lon:'99.2242887140',lat:'1.4073667950'},{lon:'99.2238349000',lat:'1.4076503450'},{lon:'99.2230054710',lat:'1.4077134270'},{lon:'99.2230211560',lat:'1.4080756830'},{lon:'99.2228002050',lat:'1.4083545140'},{lon:'99.2224890950',lat:'1.4083907420'},{lon:'99.2222699890',lat:'1.4082805100'},{lon:'99.2220665680',lat:'1.4085482860'},{lon:'99.2219637280',lat:'1.4087874630'},{lon:'99.2219414210',lat:'1.4090838100'},{lon:'99.2217536740',lat:'1.4096035900'},{lon:'99.2217538140',lat:'1.4110841230'},{lon:'99.2222743180',lat:'1.4116247690'},{lon:'99.2227241930',lat:'1.4120920530'},{lon:'99.2232563240',lat:'1.4125172610'},{lon:'99.2234910820',lat:'1.4126432410'},{lon:'99.2244614370',lat:'1.4133834130'},{lon:'99.2249153100',lat:'1.4136983760'},{lon:'99.2249935860',lat:'1.4139818750'},{lon:'99.2249310060',lat:'1.4141866360'},{lon:'99.2247339730',lat:'1.4143065860'},{lon:'99.2247457870',lat:'1.4146267600'},{lon:'99.2253113840',lat:'1.4149587390'},{lon:'99.2256530810',lat:'1.4149705640'},{lon:'99.2258298040',lat:'1.4147926710'},{lon:'99.2260418920',lat:'1.4148045090'},{lon:'99.2262893580',lat:'1.4151246600'},{lon:'99.2265014240',lat:'1.4149111890'},{lon:'99.2267253030',lat:'1.4150060340'},{lon:'99.2270080820',lat:'1.4149704310'},{lon:'99.2272555450',lat:'1.4152550070'},{lon:'99.2270906600',lat:'1.4159902420'},{lon:'99.2269846670',lat:'1.4165120200'},{lon:'99.2269611650',lat:'1.4171642320'},{lon:'99.2269022690',lat:'1.4173421130'},{lon:'99.2266195220',lat:'1.4177097500'},{lon:'99.2267491680',lat:'1.4180892050'},{lon:'99.2268434610',lat:'1.4184212300'},{lon:'99.2267610010',lat:'1.4186109720'},{lon:'99.2268552840',lat:'1.4188362710'},{lon:'99.2268553120',lat:'1.4191208720'},{lon:'99.2269613910',lat:'1.4194766120'},{lon:'99.2264754870',lat:'1.4201453830'}];

AddMapPoligon(kab_mapLayer,padangsidimpuan0,'#FF0000','Padang Sidempuan');

setTimeout(function(){CurrentMapLocation(kab_mapLayer)},3000);
mro_Map.events.register('moveend', Waze.map, function(){CurrentMapLocation(kab_mapLayer)});
mro_Map.events.register('zoomend', Waze.map, function(){CurrentMapLocation(kab_mapLayer)});

}

bootstrap_MapOverlay(); 