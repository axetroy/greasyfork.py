// ==UserScript==
// @name         INARA Rus
// @namespace    http://tampermonkey.net/
// @version      0.2.5
// @description  СУДНО
// @author       DrFreez, Sardak (translation), DeadSh0t_l33t (translation)
// @match        http://inara.cz/*
// @match        https://inara.cz/*
// @grant        none
// ==/UserScript==
// Предложения и правки по переводу в Discord (DrFreez#8280) либо в личку на форуме ФД

(function() {
    'use strict';

    var urlPattern = [
        '/cmdr-cargo(/.+)?',
        '/galaxy-engineers/?',
        '/galaxy-engineer/.+',
        '/galaxy-components/?',
        '/galaxy-component/.+',
        '/galaxy-blueprints/?',
        '/galaxy-blueprint/.+',
        '/galaxy-synthesis/?',
        '/galaxy-experimentaleffects/?',
        '/galaxy-techbroker/?',
        '/galaxy-outfitting/?',
    ];
    var l10n = [
        {
            En: "Articulation Motors",
            Ru: "Шарнирные моторы"
        },
        {
            En: "Abnormal Compact Emissions Data",
            Ru: "Аномальные компактные данные об излучении"
        },
        {
            En: "Bio-Mechanical Conduits",
            Ru: "Биомеханические энергопроводники"
        },
        {
            En: "Boron",
            Ru: "Бор"
        },
        {
            En: "Guardian Vessel Blueprint Segment",
            Ru: "Фрагмент чертежа судна защитника"
        },
        {
            En: "Guardian Module Blueprint Segment",
            Ru: "Фрагмент чертежа модуля защитника"
        },
        {
            En: "Guardian Weapon Blueprint Segment",
            Ru: "Фрагмент чертежа оружия защитника"
        },
        {
            En: "Guardian Power Cell",
            Ru: "Энергоячейка защитника"
        },
        {
            En: "Guardian Power Conduit",
            Ru: "Энергопроводники защитника"
        },
        {
            En: "Guardian Sentinel Wreckage Components",
            Ru: "Оболмки кораблекрушений защитника Sentinel"
        },
        {
            En: "Guardian Technology Component",
            Ru: "Компоненты технологий защитника"
        },
        {
            En: "Lead",
            Ru: "Свинец"
        },
        {
            En: "Pattern Alpha Obelisk Data",
            Ru: "Данные с обелиска - Альфа"
        },
        {
            En: "Pattern Beta Obelisk Data",
            Ru: "Данные с обелиска - Бета"
        },
        {
            En: "Pattern Delta Obelisk Data",
            Ru: "Данные с обелиска - Дельта"
        },
        {
            En: "Pattern Epsilon Obelisk Data",
            Ru: "Данные с обелиска - Эпсилон"
        },
        {
            En: "Pattern Gamma Obelisk Data",
            Ru: "Данные с обелиска - Гамма"
        },
        {
            En: "Propulsion Elements",
            Ru: "Реактивные элементы"
        },
        {
            En: "Rhenium",
            Ru: "Рений"
        },
        {
            En: "Sensor Fragment",
            Ru: "Обломок сенсора"
        },
        {
            En: "Ship Flight Data",
            Ru: "Полетные данные коробля"
        },
        {
            En: "Ship Systems Data",
            Ru: "Данные бортовых систем коробля"
        },
        {
            En: "Thargoid Carapace",
            Ru: "Таргоидский панцирь"
        },
        {
            En: "Thargoid Energy Cell",
            Ru: "Таргоидская энергоячейка"
        },
        {
            En: "Thargoid Organic Circuitry",
            Ru: "Таргоидская органическая схема"
        },
        {
            En: "Thargoid Residue Data",
            Ru: "Данные об осадке таргоидского происхождения"
        },
        {
            En: "Thargoid Ship Signature",
            Ru: "Сигнатура таргоидского корабля"
        },
        {
            En: "Thargoid Structural Data",
            Ru: "Данные о структуре таргоидского объекта"
        },
        {
            En: "Thargoid Technological Components",
            Ru: "Компоненты таргоидской техники"
        },
         {
            En: "Thargoid Material Composition Data",
            Ru: "Данные о составе таргоидских материалов"
        },
        {
            En: "Thargoid Wake Data",
            Ru: "Данные следа таргоидского корабля"
        },
        {
            En: "Guardian Sentinel Weapon Parts",
            Ru: "Детали вооружения защитника Sentinel"
        },
        {
            En: "Wreckage Components",
            Ru: "Обломки кораблекрушений"
        },
        {
            En: "Weapon Parts",
            Ru: "Детали вооружения"
        },
        {
            En: "Bromellite",
            Ru: "Бромеллит"
        },
        {
            En: "CMM Composite",
            Ru: "CMM-композит"
        },
        {
            En: "Emergency Power Cells",
            Ru: "Аварийные энергоячейки"
        },
        {
            En: "Energy Grid Assembly",
            Ru: "Электросеть в сборе"
        },
        {
            En: "Exhaust Manifold",
            Ru: "Выпускной коллектор"
        },
        {
            En: "Hardware Diagnostic Sensor",
            Ru: "Сенсор диагностики оборудования"
        },
        {
            En: "Heatsink Interlink",
            Ru: "Радиаторный соединитель"
        },
        {
            En: "HN Shock Mount",
            Ru: "Разрядная установка HN"
        },
        {
            En: "Insulating Membrane",
            Ru: "Изолирующая мембрана"
        },
        {
            En: "Ion Distributor",
            Ru: "Ионный распределитель"
        },
        {
            En: "Magnetic Emitter Coil",
            Ru: "Спираль магнитного излучателя"
        },
        {
            En: "Micro Controllers",
            Ru: "Микроконтроллеры"
        },
        {
            En: "Micro-Weave Cooling Hoses",
            Ru: "Шланги системы охлаждения малых диаметров"
        },
        {
            En: "Modular Terminals",
            Ru: "Модульные терминалы"
        },
        {
            En: "Nanobreakers",
            Ru: "Нанопрерыватели"
        },
        {
            En: "Neofabric Insulation",
            Ru: "Высокотехнологичная изоляция"
        },
        {
            En: "Osmium",
            Ru: "Осмий"
        },
        {
            En: "Platinum",
            Ru: "Платина"
        },
        {
            En: "Power Converter",
            Ru: "Преобразователь энергии"
        },
        {
            En: "Power Transfer Bus",
            Ru: "Энергообменная шина"
        },
        {
            En: "Praseodymium",
            Ru: "Празеодим"
        },
        {
            En: "Radiation Baffle",
            Ru: "Отражатель излучения"
        },
        {
            En: "Reinforced Mounting Plate",
            Ru: "Усиленная монтажная плита"
        },
        {
            En: "Samarium",
            Ru: "Самарий"
        },
        {
            En: "Telemetry Suite",
            Ru: "Телеметрический комплект"
        },
        {
            En: "Aberrant Shield Pattern Analysis",
            Ru: "Анализ аномального поведения щита"
        },
        {
            En: "Abnormal Compact Emission Data",
            Ru: "Аномальные компактные данные об излучении"
        },
        {
            En: "Adaptive Encryptors Capture",
            Ru: "Захват адаптивного шифровальщика"
        },
        {
            En: "Anomalous Bulk Scan Data",
            Ru: "Аномальный массив данных сканирования"
        },
        {
            En: "Anomalous FSD Telemetry",
            Ru: "Аномальная телеметрия FSD"
        },
        {
            En: "Atypical Disrupted Wake Echoes",
            Ru: "Атипичное эхо поврежденного следа"
        },
        {
            En: "Atypical Encryption Archives",
            Ru: "Нетипичные архивы шифрования"
        },
        {
            En: "Classified Scan Databanks",
            Ru: "Засекреченные базы данных сканирования"
        },
        {
            En: "Classified Scan Fragment",
            Ru: "Засекреченные фрагменты данных сканирования"
        },
        {
            En: "Cracked Industrial Firmware",
            Ru: "Взломанные промышленные микропрограммы"
        },
        {
            En: "Datamined Wake Exceptions",
            Ru: "Искл. из глубинного анализа данных следа"
        },
        {
            En: "Decoded Emission Data",
            Ru: "Расшифрованные данные об излучении"
        },
        {
            En: "Distorted Shield Cycle Recordings",
            Ru: "Поврежденные цикличные записи щита"
        },
        {
            En: "Divergent Scan Data",
            Ru: "Неформатные данные сканирования"
        },
        {
            En: "Eccentric Hyperspace Trajectories",
            Ru: "Аномальные траектории в гиперпространстве"
        },
        {
            En: "Exceptional Scrambled Emission Data",
            Ru: "Исключительные зашифрованные данные об изл."
        },
        {
            En: "Inconsistent Shield Soak Analysis",
            Ru: "Неполный анализ поглощения щита"
        },
        {
            En: "Irregular Emission Data",
            Ru: "Нестандартные данные об излучении"
        },
        {
            En: "Modified Consumer Firmware",
            Ru: "Измененные пользовательские микропрограммы"
        },
        {
            En: "Modified Embedded Firmware",
            Ru: "Измененные встроенные микропрограммы"
        },
        {
            En: "Open Symmetric Keys",
            Ru: "Открытые симметричные ключи"
        },
        {
            En: "Peculiar Shield Frequency Data",
            Ru: "Специфические данные о частоте щитов"
        },
        {
            En: "Security Firmware Patch",
            Ru: "Обновление для защитной микропрограммы"
        },
        {
            En: "Specialised Legacy Firmware",
            Ru: "Спец. микропрограммы предыдущего поколения"
        },
        {
            En: "Strange Wake Solutions",
            Ru: "Странные расчеты следа"
        },
        {
            En: "Tagged Encryption Codes",
            Ru: "Меченые шифровальные коды"
        },
        {
            En: "Unexpected Emission Data",
            Ru: "Неожиданные данные об излучении"
        },
        {
            En: "Unidentified Scan Archives",
            Ru: "Неопознанные архивы сканирования"
        },
        {
            En: "Untypical Shield Scans",
            Ru: "Нетипичные данные сканирования щитов"
        },
        {
            En: "Unusual Encrypted Files",
            Ru: "Особые зашифрованные файлы"
        },
        {
            En: "Basic Conductors",
            Ru: "Простые проводники"
        },
        {
            En: "Biotech Conductors",
            Ru: "Биотехнические проводники"
        },
        {
            En: "Chemical Distillery",
            Ru: "Оборудование для перегонки химикатов"
        },
        {
            En: "Chemical Manipulators",
            Ru: "Манипуляторы для работы с химикатами"
        },
        {
            En: "Chemical Processors",
            Ru: "Оборудование для химобработки"
        },
        {
            En: "Chemical Storage Units",
            Ru: "Контейнеры для химикатов"
        },
        {
            En: "Compact Composites",
            Ru: "Спрессованные композиты"
        },
        {
            En: "Compound Shielding",
            Ru: "Многоступенчатая защита"
        },
        {
            En: "Conductive Ceramics",
            Ru: "Проводящая керамика"
        },
        {
            En: "Conductive Components",
            Ru: "Проводящие компоненты"
        },
        {
            En: "Conductive Polymers",
            Ru: "Проводящие полимеры"
        },
        {
            En: "Configurable Components",
            Ru: "Настраиваемые компоненты"
        },
        {
            En: "Core Dynamics Composites",
            Ru: "Композиты Core Dynamics"
        },
        {
            En: "Crystal Shards",
            Ru: "Осколки кристаллов"
        },
        {
            En: "Electrochemical Arrays",
            Ru: "Электрохимические массивы"
        },
        {
            En: "Exquisite Focus Crystals",
            Ru: "Отборные фокусировочные кристаллы"
        },
        {
            En: "Filament Composites",
            Ru: "Волокнистые композиты"
        },
        {
            En: "Flawed Focus Crystals",
            Ru: "Поврежденные фокусировочные кристаллы"
        },
        {
            En: "Focus Crystals",
            Ru: "Фокусировочные кристаллы"
        },
        {
            En: "Galvanising Alloys",
            Ru: "Сплавы для гальванизации"
        },
        {
            En: "Grid Resistors",
            Ru: "Наборные резисторы"
        },
        {
            En: "Heat Conduction Wiring",
            Ru: "Теплопроводящие провода"
        },
        {
            En: "Heat Dispersion Plate",
            Ru: "Теплорассеивающая пластина"
        },
        {
            En: "Heat Exchangers",
            Ru: "Теплообменные агрегаты"
        },
        {
            En: "Heat Resistant Ceramics",
            Ru: "Жаропрочная керамика"
        },
        {
            En: "Heat Vanes",
            Ru: "Тепловые заслонки"
        },
        {
            En: "High Density Composites",
            Ru: "Высокоплотностные композиты"
        },
        {
            En: "Hybrid Capacitors",
            Ru: "Гибридные конденсаторы"
        },
        {
            En: "Imperial Shielding",
            Ru: "Имперская защита"
        },
        {
            En: "Improvised Components",
            Ru: "Кустарные компоненты"
        },
        {
            En: "Mechanical Components",
            Ru: "Механические компоненты"
        },
        {
            En: "Mechanical Equipment",
            Ru: "Механическое оборудование"
        },
        {
            En: "Mechanical Scrap",
            Ru: "Механические отходы"
        },
        {
            En: "Military Grade Alloys",
            Ru: "Сплавы военного назначения"
        },
        {
            En: "Military Supercapacitors",
            Ru: "Военные суперконденсаторы"
        },
        {
            En: "Pharmaceutical Isolators",
            Ru: "Фармацевтические изоляционные материалы"
        },
        {
            En: "Phase Alloys",
            Ru: "Фазовые сплавы"
        },
        {
            En: "Polymer Capacitors",
            Ru: "Полимерные конденсаторы"
        },
        {
            En: "Precipitated Alloys",
            Ru: "Осажденные сплавы"
        },
        {
            En: "Proprietary Composites",
            Ru: "Патентованные композиты"
        },
        {
            En: "Proto Heat Radiators",
            Ru: "Прототипы теплоизлучателей"
        },
        {
            En: "Proto Light Alloys",
            Ru: "Опытные легкие сплавы"
        },
        {
            En: "Proto Radiolic Alloys",
            Ru: "Сплавы для изготовления зондов"
        },
        {
            En: "Refined Focus Crystals",
            Ru: "Обработанные фокусировочные кристаллы"
        },
        {
            En: "Salvaged Alloys",
            Ru: "Захваченные сплавы"
        },
        {
            En: "Shield Emitters",
            Ru: "Щитоизлучатели"
        },
        {
            En: "Shielding Sensors",
            Ru: "Сенсоры системы экранирования"
        },
        {
            En: "Tempered Alloys",
            Ru: "Закаленные сплавы"
        },
        {
            En: "Thermic Alloys",
            Ru: "Термические сплавы"
        },
        {
            En: "Unknown Fragment",
            Ru: "Неизвестный фрагмент"
        },
        {
            En: "Worn Shield Emitters",
            Ru: "Изношенные щитоизлучатели"
        },
        {
            En: "Antimony",
            Ru: "Сурьма"
        },
        {
            En: "Arsenic",
            Ru: "Мышьяк"
        },
        {
            En: "Cadmium",
            Ru: "Кадмий"
        },
        {
            En: "Carbon",
            Ru: "Углерод"
        },
        {
            En: "Chromium",
            Ru: "Хром"
        },
        {
            En: "Germanium",
            Ru: "Германий"
        },
        {
            En: "Iron",
            Ru: "Железо"
        },
        {
            En: "Manganese",
            Ru: "Марганец"
        },
        {
            En: "Mercury",
            Ru: "Ртуть"
        },
        {
            En: "Molybdenum",
            Ru: "Молибден"
        },
        {
            En: "Nickel",
            Ru: "Никель"
        },
        {
            En: "Niobium",
            Ru: "Ниобий"
        },
        {
            En: "Phosphorus",
            Ru: "Фосфор"
        },
        {
            En: "Polonium",
            Ru: "Полоний"
        },
        {
            En: "Ruthenium",
            Ru: "Рутений"
        },
        {
            En: "Selenium",
            Ru: "Селен"
        },
        {
            En: "Sulphur",
            Ru: "Сера"
        },
        {
            En: "Technetium",
            Ru: "Технеций"
        },
        {
            En: "Tellurium",
            Ru: "Теллур"
        },
        {
            En: "Tin",
            Ru: "Олово"
        },
        {
            En: "Tungsten",
            Ru: "Вольфрам"
        },
        {
            En: "Vanadium",
            Ru: "Ванадий"
        },
        {
            En: "Yttrium",
            Ru: "Иттрий"
        },
        {
            En: "Zinc",
            Ru: "Цинк"
        },
        {
            En: "Zirconium",
            Ru: "Цирконий"
        },
        {
            En: "Mission Reward",
            Ru: "Награды за миссии"
        },
        {
            En: "Mining",
            Ru: "Астероидные пояса"
        },
        {
            En: "Ice rings",
            Ru: "Ледяные кольца"
        },
        {
            En: "Markets near",
            Ru: "Рынки возле"
        },
        {
            En: "Markets",
            Ru: "Рынки"
        },
        {
            En: "Ship Scanning",
            Ru: "Сканирование кораблей"
        },
        {
            En: "Ship Salvage",
            Ru: "Уничтожение корабля"
        },
        {
            En: "High Wake Scanning",
            Ru: "Сканирование высокочастотных следов FSD"
        },
        {
            En: "Surface POI",
            Ru: "Точки интереса на планетах"
        },
        {
            En: "Thargoid site",
            Ru: "Базы Таргоидов"
        },
        {
            En: "Ancient/Guardian ruins",
            Ru: "Древние руины Стражей"
        },
        {
            En: "Convoy dispersal pattern",
            Ru: "Рассредоточение конвоя "
        },
        {
            En: "Thargoid ship encounter",
            Ru: "Встреча с кораблем Таргоидов"
        },
        {
            En: "Encoded Emissions",
            Ru: "Закодированный сигнал"
        },
        {
            En: "Combat Aftermath",
            Ru: "Последствия боя"
        },
        {
            En: "Signal Source",
            Ru: "Источники сигнала в космосе"
        },
        {
            En: "Anomaly",
            Ru: "Аномалия"
        },
        {
            En: "Weapons Fire",
            Ru: "Зарегистрирован огонь из орудий"
        },
        {
            En: "Munitions",
            Ru: "Боеприпасы"
        },
        {
            En: "Degraded Emissions",
            Ru: "Слабый источник сигнала"
        },
        {
            En: "AX Remote Flak",
            Ru: "АИ зенитные снаряды с дистанционным подрывом"
        },
        {
            En: "AX Small Calibre",
            Ru: "Мелкокалиберные АИ"
        },
        {
            En: "Surface Data Point",
            Ru: "Наземные точки данных (поселения)"
        },
        {
            En: "Standard",
            Ru: "Стандарт"
        },
        {
            En: "Basic",
            Ru: "Базовый"
        },
        {
            En: "Premium",
            Ru: "Премиум"
        },
        {
            En: "Common",
            Ru: "Распространенный"
        },
        {
            En: "Rare",
            Ru: "Редкий"
        },
        {
            En: "Very rare",
            Ru: "Очень редкий"
        },
        {
            En: "Very common",
            Ru: "Очень распространенный"
        },
        {
            En: "AX Explosive",
            Ru: "АИ Взрывчатые"
        },
        {
            En: "Enzyme Missile Rack",
            Ru: "Энзимная ракететная установка"
        },
        {
            En: "Shock Cannon",
            Ru: "Шоковое орудие"
        },
        {
            En: "Guardian Plasma Charger",
            Ru: "Плазменная пушка Guardians"
        },
        {
            En: "Guardian",
            Ru: "Стражи"
        },
        {
            En: "Dirty",
            Ru: "Грязный"
        },
        {
            En: "Efficient",
            Ru: "эффективный"
        },
        {
            En: "Remote Release Flechette Launcher",
            Ru: "Установка для стрельбы стреловидными снарядами"
        },
        {
            En: "Surface Prospecting",
            Ru: "Поверхность планет"
        },
        {
            En: "Combat ships",
            Ru: "Боевые"
        },
        {
            En: "Transport ships",
            Ru: "Транспорт"
        },
        {
            En: "Military & Authority ships",
            Ru: "Военные и силы правопорядка"
        },
        {
            En: "Destroyed Unknown Artefact",
            Ru: "Уничтожение Unknown Artefact"
        },
        {
            En: "Systems in civil unrest",
            Ru: "Системы с гражданскими беспорядками"
        },
        {
            En: "Systems in war",
            Ru: "Системы с войной"
        },
        {
            En: "Systems in economic boom",
            Ru: "Системы с экономическим бумом"
        },
        {
            En: "anarchy",
            Ru: "Анархия"
        },
        {
            En: "Extraction",
            Ru: "Добыча ископаемых"
        },
        {
            En: "Industrial",
            Ru: "Промышленность"
        },
        {
            En: "Refinery",
            Ru: "Переработка"
        },
        {
            En: "High Tech",
            Ru: "Высокие технологии"
        },
        {
            En: "low security",
            Ru: "Низкий уровень безопасности"
        },
        {
            En: "high security",
            Ru: "Высокий уровень безопасности"
        },
        {
            En: "High Grade emissions",
            Ru: "Высокоуровневое излучение"
        },
        {
            En:"Armour",
            Ru:"Броня"
        },
        {
            En:"Fuel Scoop",
            Ru:"Топливозаборник"
        },
        {
            En:"Collector Limpet Controller",
            Ru:"Контроллер дронов сборщиков"
        },
        {
            En:"Prospector Limpet Controller",
            Ru:"Контроллер дронов геологов"
        },
        {
            En:"Hatch Breaker Limpet Controller",
            Ru:"Контроллер дронов взломщиков"
        },
        {
            En:"Fuel Transfer Limpet Controller",
            Ru:"Контроллер дронов заправщиков"
        },
        {
            En:"Heat Sink Launcher",
            Ru:"Теплоотвод"
        },
        {
            En:"Electronic Countermeasure",
            Ru:"Электронное противодействие"
        },
        {
            En:"Chaff Launcher",
            Ru:"Разброс дипольных отражателей"
        },
        {
            En:"Life Support",
            Ru:"Система жизнеобеспечения"
        },
        {
            En:"Manifest Scanner",
            Ru:"Сканер накладных (aka груза)"
        },
        {
            En:"Kill Warrant Scanner",
            Ru:"Сканер преступников"
        },
        {
            En:"Frame Shift Wake Scanner",
            Ru:"Сканер следа"
        },
        {
            En:"Auto Field-Maintenance Unit",
            Ru:"Модуль автоматической починки"
        },
        {
            En:"Point Defence",
            Ru:"Точечная оборона"
        },
        {
            En:"Armour",
            Ru:"Броня"
        },
        {
            En:"Beam Laser",
            Ru:"Пучковый лазер"
        },
        {
            En:"Burst Laser",
            Ru:"Пульсирующий лазер"
        },
        {
            En:"Cannon",
            Ru:"Орудие"
        },
        {
            En:"Fragment Cannon",
            Ru:"Залповое орудие"
        },
        //{
        //    En:"Frame Shift Drive",
        //    Ru:"ФСД"
        //},
        {
            En:"Frame Shift Drive Interdictor",
            Ru:"Перехватчик FSD"
        },
        {
            En:"Hull Reinforcement Package",
            Ru:"Пакет усилителя корпуса"
        },
        {
            En:"Meta Alloy HULL REINFORCEMENT",
            Ru:"Набор для метасплавного усиления корпуса"
        },
        {
            En:"Meta-Alloys",
            Ru:"Метасплав"
        },
        {
            En:"Corrosion Resistant Cargo Rack",
            Ru:"Коррозийно-устойчивый грузовой стеллаж"
        },
        {
            En:"Guardian Gauss Cannon",
            Ru:"Пушка Гаусса Guardians"
        },
        {
            En:"Mine Launcher",
            Ru:"Минирующее устройство"
        },
        {
            En:"Missile Rack",
            Ru:"Ракетная установка"
        },
        {
            En:"Multi-cannon",
            Ru:"Многоствольное орудие"
        },
        {
            En:"Plasma Accelerator",
            Ru:"Ускоритель плазмы"
        },
        {
            En:"Power Distributor",
            Ru:"Распределитель энергии"
        },
        {
            En:"Power Plant",
            Ru:"Силовая установка"
        },
        {
            En:"Pulse Laser",
            Ru:"Импульсный лазер"
        },
        {
            En:"Rail Gun",
            Ru:"Рельсотрон"
        },
        {
            En:"Shield Booster",
            Ru:"Усилитель щита"
        },
        {
            En:"Shield Cell Bank",
            Ru:"Щитонакопитель"
        },
        {
            En:"Shield Generator",
            Ru:"Генератор щита"
        },
        {
            En:"Thrusters",
            Ru:"Маневровые двигатели"
        },
        {
            En:"Torpedo Pylon",
            Ru:"Торпедная установка"
        },
        {
            En:"Shielded",
            Ru:"Бронированный"
        },
        {
            En:"Reinforced",
            Ru:"Усиленный"
        },
        {
            En:"Ammo Capacity",
            Ru:"Боезапас"
        },
        {
            En:"Lightweight",
            Ru:"Облегченный"
        },
        {
            En:"Torpedo Pylon",
            Ru:"Торпедная установка"
        },
        {
            En:"Efficient Weapon",
            Ru:"Эффективное орудие"
        },
        {
            En:"High Capacity Magazine",
            Ru:"Вместительный магазин"
        },
        {
            En:"Lightweight Mount",
            Ru:"Легкое крепление"
        },
        {
            En:"Overcharged Weapon",
            Ru:"Усиленое орудие"
        },
        {
            En:"Short Range Blaster",
            Ru:"Бластер малого радиуса действия"
        },
        {
            En:"Sturdy Mount",
            Ru:"Прочное крепление"
        },
        {
            En:"Blast Resistant Armour",
            Ru:"Противовзрывная броня"
        },
        {
            En:"Heavy Duty Armour",
            Ru:"Усиленнная броня"
        },
        {
            En:"Kinetic Resistant Armour",
            Ru:"Противокинетическая броня"
        },
        {
            En:"Lightweight Armour",
            Ru:"Облегчённая броня"
        },
        {
            En:"Thermal Resistant Armour",
            Ru:"Противотепловая броня"
        },
        {
            En:"Long Range Weapon",
            Ru:"Увеличенная дальность"
        },
        {
            En:"Double Shot",
            Ru:"Двойной выстрел"
        },
        {
            En:"Faster FSD Boot Sequence",
            Ru:"Ускорение перезапуска FSD"
        },
        {
            En:"Increased FSD Range",
            Ru:"Увеличение дальности FSD"
        },
        {
            En:"Shielded FSD",
            Ru:"Защищённый FSD"
        },
        {
            En:"Expanded FSD Interdictor Capture Arc",
            Ru:"Увеличение угла перехвата"
        },
        {
            En:"Longer Range FSD interdictor",
            Ru:"Увеличение дальности перехвата"
        },
        {
            En:"Blast Resistant Hull Reinforcement",
            Ru:"Противовзрывное усиление корпуса"
        },
        {
            En:"Heavy Duty Hull Reinforcement",
            Ru:"Утяжеление пакета"
        },
        {
            En:"Kinetic Resistant Hull Reinforcement",
            Ru:"Противокинетическое усиление"
        },
        {
            En:"Lightweight Hull Reinforcement",
            Ru:"Облегчение пакета"
        },
        {
            En:"Thermal Resistant Hull Reinforcement",
            Ru:"Противотепловое усиление"
        },
        {
            En:"Rapid Fire Modification",
            Ru:"Увеличение скорострельности"
        },
        {
            En:"Focused Weapon",
            Ru:"Сфокусированное оружие"
        },
        {
            En:"Charge Enhanced Power Distributor",
            Ru:"Быстрозарядный распределитель"
        },
        {
            En:"Engine Focused Power Distributor",
            Ru:"Двигатель-ориентированный распределитель"
        },
        {
            En:"High Charge Capacity Power Distributor",
            Ru:"Высокоёмкий распределитель"
        },
        {
            En:"Shielded Power Distributor",
            Ru:"Защищённый распределитель"
        },
        {
            En:"System Focused Power Distributor",
            Ru:"Системо-ориентированный распределитель"
        },
        {
            En:"Weapon Focused Power Distributor",
            Ru:"Оружие-ориентированный распределитель"
        },
        {
            En:"Armoured Power Plant",
            Ru:"Бронирование силовой установки"
        },
        {
            En:"Low Emissions Power Plant",
            Ru:"Снижение излучения"
        },
        {
            En:"Overcharged Power Plant",
            Ru:"Усиление мощности"
        },
        {
            En:"Blast Resistant Shield Booster",
            Ru:"Противовзрывное усиление"
        },
        {
            En:"Heavy Duty Shield Booster",
            Ru:"Коэффициент усиления"
        },
        {
            En:"Kinetic Resistant Shield Booster",
            Ru:"Противокинетическое усиление"
        },
        {
            En:"Resistance Augmented Shield Booster",
            Ru:"Сбалансированное усиление"
        },
        {
            En:"Thermal Resistant Shield Booster",
            Ru:"Противотепловое усиление"
        },
        {
            En:"Rapid Charge Shield Cell Bank",
            Ru:"Быстрозаряжающий накопитель"
        },
        {
            En:"Specialised Shield Cell Bank",
            Ru:"Специализированный накопитель"
        },
        {
            En:"Enhanced, Low Power Shields",
            Ru:"Энергосберегающий щит"
        },
        {
            En:"Kinetic Resistant Shields",
            Ru:"Противокинетический щит"
        },
        {
            En:"Reinforced Shields",
            Ru:"Усиленный щит"
        },
        {
            En:"Thermal Resistant Shields",
            Ru:"Противотепловой щит"
        },
        {
            En:"Clean Drive Tuning",
            Ru:"«Чистая» донастройка двигателей"
        },
        {
            En:"Dirty Drive Tuning",
            Ru:"«Грязная» донастройка двигателей"
        },
        {
            En:"Drive Strengthening",
            Ru:"Защищённый двигатель"
        },
        {
            En:"Drive Strengthening",
            Ru:"Защищённый двигатель"
        },
        {
            En:"Grade",
            Ru:"Уровень"
        },
        {
            En:"Primary Effects",
            Ru:"Основной эффект"
        },
        {
            En:"Attribute",
            Ru:"Параметр"
        },
        {
            En:"Cost",
            Ru:"Цена"
        },
        {
            En:"Micromaterial",
            Ru:"Материал"
        },
        {
            En:"Material",
            Ru:"Материал"
        },
        {
            En:"Raw Material",
            Ru:"Сырье"
        },
        {
            En:"Manufactured",
            Ru:"Промышл."
        },
        {
            En:"Data",
            Ru:"Данные"
        },
        {
            En:"Insufficient material",
            Ru:"Нехватает материалов"
        },
        {
            En:"Can be crafted",
            Ru:"Можно создать"
        },
        {
            En:"Commodity",
            Ru:"Товар"
        },
        {
            En:"ENGINEERS",
            Ru:"Инженеры"
        },
        {
            En:"EXPLOSIVE RESISTANCE",
            Ru:"Сопротивл. взрывам"
        },
        {
            En:"KINETIC RESISTANCE",
            Ru:"Сопротивл. кинетике"
        },
        {
            En:"THERMAL RESISTANCE",
            Ru:"Сопротивл. нагреву"
        },
        {
            En:"HULL BOOST",
            Ru:"Усиление корпуса"
        },
        {
            En:"MASS",
            Ru:"Масса"
        },
        {
            En:"INTEGRITY",
            Ru:"Целостность"
        },
        {
            En:"DAMAGE PER SECOND",
            Ru:"урон в сек."
        },
        {
            En:"MAXIMUM RANGE",
            Ru:"Макс. дальность"
        },
        {
            En:"DISTRIBUTOR DRAW",
            Ru:"Тяга распределителя"
        },
        {
            En:"POWER DRAW",
            Ru:"Энергопотребление"
        },
        {
            En:"THERMAL LOAD",
            Ru:"Нагрев"
        },
        {
            En:"DAMAGE",
            Ru:"Средний урон"
        },
        {
            En:"ARMOUR PIERCING",
            Ru:"Бронебойность"
        },
        {
            En:"RATE OF FIRE",
            Ru:"Скорострельность"
        },
        {
            En:"JITTER",
            Ru:"Дрожание"
        },
        {
            En:"AMMO CLIP SIZE",
            Ru:"Снарядов в магазине"
        },
        {
            En:"AMMO MAXIMUM",
            Ru:"Общий боезапас"
        },
        {
            En:"RELOAD TIME",
            Ru:"Время перезарядки"
        },
        {
            En:"BOOT TIME",
            Ru:"Время перезапуска"
        },
        {
            En:"OPTIMISED MASS",
            Ru:"Дальность прыжка"
        },
        {
            En:"FACING LIMIT",
            Ru:"Угол захвата"
        },
        {
            En:"RANGE",
            Ru:"Дальность захвата"
        },
        {
            En:"HULL REINFORCEMENT",
            Ru:"Брониров. корпуса"
        },
        {
            En:"WEAPONS RECHARGE",
            Ru:"Зарядка оружия"
        },
        {
            En:"ENGINES RECHARGE",
            Ru:"Зарядка двигателя"
        },
        {
            En:"SYSTEMS RECHARGE",
            Ru:"Зарядка систем"
        },
        {
            En:"WEAPONS CAPACITY",
            Ru:"Ёмкость для оружия"
        },
        {
            En:"ENGINES CAPACITY",
            Ru:"Ёмкость для двигателей"
        },
        {
            En:"SYSTEMS CAPACITY",
            Ru:"Ёмкость для систем"
        },
        {
            En:"HEAT EFFICIENCY",
            Ru:"Теплоэффективность"
        },
        {
            En:"POWER CAPACITY",
            Ru:"Мощность"
        },
        {
            En:"SPIN UP TIME",
            Ru:"Время запуска"
        },
        {
            En:"DURATION",
            Ru:"Время работы"
        },
        {
            En:"SHIELD REINFORCEMENT",
            Ru:"Укрепление щита"
        },
        {
            En:"OPTIMAL HULL MASS",
            Ru:"Оптим. масса корпуса"
        },
        {
            En:"OPTIMAL STRENGTH",
            Ru:"Оптим. сила щита"
        },
        {
            En:"BROKEN REGEN RATE",
            Ru:"Восстан. снятого"
        },
        {
            En:"REGEN RATE",
            Ru:"Восстан. рабочего"
        },
        {
            En:"OPTIMAL MULTIPLIER",
            Ru:"Оптим. коэфф."
        },
        {
            En:"OPTIMAL MASS",
            Ru:"Оптим. масса"
        },
        {
            En:"Blueprint details",
            Ru:"Детали чертежа"
        },
        {
            En:"Blueprints",
            Ru:"Чертежи"
        },
        {
            En:"My favorite blueprints",
            Ru:"Избранные чертежи"
        },
        {
            En:"Favorite blueprints",
            Ru:"Избранные чертежи"
        },
        {
            En:"Components for my blueprints",
            Ru:"Компоненты для чертежей"
        },
        {
            En:"Component",
            Ru:"Компонент"
        },
        {
            En:"Count",
            Ru:"Кол-во"
        },
        {
            En:"Related blueprints",
            Ru:"Похожие чертежи"
        },
        {
            En:"My favorite components",
            Ru:"Избранные компоненты"
        },
        {
            En:"Possible experimental effects",
            Ru:"Возможные эффекты"
        },
        {
            En:"How to discover",
            Ru:"Как открыть"
        },
        {
            En:"Meeting requirements",
            Ru:"Требования для встречи"
        },
        {
            En:"Unlock requirements",
            Ru:"Требования для доступа"
        },
        {
            En:"Reputation gain",
            Ru:"Поднятие репутации"
        },
        {
            En:"Location",
            Ru:"Местожительство"
        },
        {
            En:"Location",
            Ru:"Местожительство"
        },
        {
            En:"Where you can find this component",
            Ru:"Где вы можете найти эти компоненты"
        },
        {
            En:"You have",
            Ru:"У вас есть"
        },
        {
            En:"You have no",
            Ru:"У вас нет"
        },
        {
            En:"unit of",
            Ru:"еденица"
        },
        {
            En:"How much material do you need",
            Ru:"Сколько материалов вам надо"
        },
        {
            En:"How much material do you have",
            Ru:"Сколько материалов у вас есть"
        },
        {
            En:"Cargo update",
            Ru:"Обновить трюм"
        },
        {
            En:"Need",
            Ru:"Надо"
        },
        {
            En:"Have",
            Ru:"Есть"
        },
        {
            En:"Cargo",
            Ru:"Трюм"
        },
        {
            En:"Cargo",
            Ru:"Трюм"
        },
        {
            En:"crafting materials",
            Ru:"материалы для крафта"
        },
        {
            En:"Save cargo",
            Ru:"Сохранить трюм"
        }
        //
        //Where you can find this component:<br>Surface Prospecting, Mining, Mining (Ice rings)<br><br>You have 1 unit of Phosphorus
    ];

    $.fn.replaceText = function(search, replace, text_only) {
        return this.each(function() {
            var node = this.firstChild,
                val,
                new_val,
                remove = [];
            if (node) {
                do {
                    if (node.nodeType === 3) {
                        val = node.nodeValue;
                        new_val = val.replace(search, replace);
                        if (new_val !== val) {
                            if (!text_only && /</.test(new_val)) {
                                $(node).before(new_val);
                                remove.push(node);
                            } else {
                                node.nodeValue = new_val;
                            }
                        }
                    }
                } while (node = node.nextSibling);
            }
            remove.length && $(remove).remove();
        });
    };

    var compareLength = function(a, b) {
        if (a.En.length < b.En.length) { return 1; }
        if (a.En.length > b.En.length) { return -1; }
        return 0;
    };

    var isNeedTranslate = function() {
        if (localStorage['__isNeedTranslate'] === undefined) {
            localStorage['__isNeedTranslate'] = 1;
        }
        return localStorage['__isNeedTranslate'] === '1';
    };

    var isUrlMatch = function (patternList) {
        if (typeof patternList === 'string') {
            patternList = [patternList];
        }

        var result = false;
        $.each(patternList, function(key, item) {
            var re = new RegExp("^" + item + "$", 'i');
            if (re.test(window.location.pathname)) {
                result = true;
            }
        });

        return result;
    };

    var regexpEscape = function(str) {
        return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var $menu = $('<div class="menuitem"><a href="#" class="menu">' + (isNeedTranslate() ? 'En' : 'Ru') + '</a><div class="menunewscounterdummy"></div></div>');
    $('a', $menu).on('click', function(e){
        e.preventDefault();
        localStorage['__isNeedTranslate'] = isNeedTranslate() ? 0 : 1;
        window.location.reload();
    });
    $('div.menu').prepend($menu);

    if(isUrlMatch(urlPattern)) {
        var $body = $('.maincon *');
        var $tooltip = $('[data-tooltiptext]', $body);
        $.each(l10n.sort(compareLength), function(key, item) {
            if (isNeedTranslate()) {
                $body.replaceText(new RegExp('\\b' + regexpEscape(item.En) + '\\b', "gi"), '<span class="translate" title="' + item.En + '">' + item.Ru + '</span>');
            } else {
                $body.replaceText(new RegExp('\\b' + regexpEscape(item.En) + '\\b', "gi"), '<span class="translate" title="' + item.Ru + '">' + item.En + '</span>');
            }

            if (isNeedTranslate()) {
                $tooltip.each(function(){
                    var $el = $('<div>' + $(this).data('tooltiptext') + '</div>');
                    $el.replaceText(new RegExp('\\b' + regexpEscape(item.En) + '\\b', "gi"), '<span class="translate" title="' + item.En + '">' + item.Ru + '</span>');
                    $(this).data('tooltiptext', $el.html());
                });
            }
        });

        $('span.translate').tooltip({
            tooltipClass: 'translate-tooltip',
            hide: false,
            show: false,
            track: true,
            position: {
                my: "center bottom-10",
                collision: "none"
            }
        });

        var sheet = window.document.styleSheets[0];
        sheet.insertRule('.translate-tooltip { width: auto; text-transform: none; background-color: rgba(0,0,0,0.75); color: #fff; padding: 5px; border-radius: 3px; border: none; display:inline-block !important; }', sheet.cssRules.length);

        if (isNeedTranslate()) {
            $('.tablesorter').dataTable({
                destroy: true,
                paging: false,
                ordering: true,
                info: false,
                searching: false
            });

            if (isUrlMatch(urlPattern[0])) {
                $('.flexrightwide h3').css('height', 'auto');

                var $conteiner = $('.inventorymaterialcont');
                var $list = [];
                $('> div', $conteiner).each(function(){
                    var $el = $(this);
                    if($el.hasClass('inventorytitle')){
                        $list.push({
                            title: $el,
                            materials: []
                        });
                    } else if ($el.hasClass('inventorymaterial')) {
                        $list[$list.length - 1].materials.push($el);
                    }
                });

                $conteiner.empty();
                $.each($list, function(key, value){
                    $conteiner.append(value.title);
                    value.materials.sort(function(a,b){
                        a = $('.name span', $(a)).text();
                        b = $('.name span', $(b)).text();

                        if(a > b) {
                            return 1;
                        } else if(a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                    $conteiner.append(value.materials);
                });

                $(".inventorymaterial").hover(function() {
                    $(this).find(".spinner").spinner({min: 0});
                }, function() {
                    $(this).find(".spinner").spinner("destroy");
                });
            }

            if (isUrlMatch(urlPattern[2])) {
                $('.flexmiddle .itemtitle').css('width', 250);
            }

            if (isUrlMatch(urlPattern[3])) {
                $('.containermain').css({
                    marginLeft: 0,
                    marginRight: 0,
                    maxWidth: 'none'
                });
            }
        }
    }
})();