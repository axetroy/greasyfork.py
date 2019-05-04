// ==UserScript==
// @name        TW Classic Translation RU
// @namespace   Pegioner
// @description Translates the content of the TW Classic version into Russian.
// @include     *classic.the*west.net*
// @exclude     *classic.the-west.net/help.php*
// @exclude     *classic.the-west.net/?page=error*
// @run-at      document-end
// @version     1.03
// @grant       none
// @author      Pegioner
// ==/UserScript==
/////////////////////////
//Thanks stayawayknight//
/////////////////////////
function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
};
TWCT = function () {
    TWCT = {
        initialized: false
    };
    TWCT.locale = 'de';
    TWCT.res = {
        button: {
            left: 'https://media.innogamescdn.com/com_WEST_DE/classic/button/button_left.png',
            middle: 'https://media.innogamescdn.com/com_WEST_DE/classic/button/button_middle.png',
            right: 'https://media.innogamescdn.com/com_WEST_DE/classic/button/button_right.png'
        },
        menu_image: 'https://i.imgur.com/ynhUn6d.png'
        //menu_image: 'https://media.innogamescdn.com/com_WEST_DE/classic/classic_menu_' + TWCT.locale + '.png'
    };
    TWCT.lang = {
        //Attribute names
        attribute_names: {
            strength: 'Сила',
            flexibility: 'Ловкость',
            dexterity: 'Сноровка',
            charisma: 'Шарм'
        },
        //Skill names
        skill_names: {
            aim: 'Меткость',
            animal: 'Обращение с животными',
            appearance: 'Блеф',
            build: 'Строительство',
            dodge: 'Увёртливость',
            endurance: 'Выносливость',
            finger_dexterity: 'Проворство',
            health: 'Здоровье',
            hide: 'Маскировка',
            leadership: 'Руководство',
            pitfall: 'Установка ловушек',
            punch: 'Удар',
            reflex: 'Реакция',
            repair: 'Ремонт',
            ride: 'Верховая езда',
            shot: 'Стрельба',
            swim: 'Плавание',
            tactic: 'Тактика',
            tough: 'Стойкость',
            trade: 'Торговля'
        },
        items: null, //will be loaded dynamically later
        item_slots: {
            head: 'Головной убор',
            neck: 'Шейная повязка',
            left_arm: 'Nebenhand',
            right_arm: 'Дуэльное оружие',
            body: 'Одежда',
            foot: 'Обувь',
            animal: 'Верховая езда',
            yield: 'Продукт'
        },
        //Job names and descriptions
        jobs: [
            {
                name: 'Выпас свиней',
                desc: 'Фермер предлагает тебе выпасти и покормить его свиней.'
            },
            {
                name: 'Присмотр за полем',
                desc: 'Фермер предлагает тебе погонять ворон с его только что засеянного поля.'
            },
            {
                name: 'Расклейка плакатов',
                desc: 'Шериф просит тебя расклеить объявления о поиске особо опасных преступников.'
            },
            {
                name: 'Сбор табака',
                desc: 'В этом году табак уродился как никогда. Работы полно, любая табачная плантация примет тебя с распростёртыми объятиями.'
            },
            {
                name: 'Сбор хлопка',
                desc: 'На хлопковую плантацию требуется рабочая сила.'
            },
            {
                name: 'Сбор сахарного тростника',
                desc: 'Сладкий аромат свежескошенного сахарного тростника витает в воздухе.'
            },
            {
                name: 'Рыбалка',
                desc: 'Косяки рыбы в воде располагают к тому, чтобы забросить удочку.'
            },
            {
                name: 'Жатва',
                desc: 'Жатва — горячая пора, здесь рады любой помощи.'
            },
            {
                name: 'Сбор ягод',
                desc: 'В лесу можно найти много вкусных ягод.'
            },
            {
                name: 'Выпас овец',
                desc: 'Фермер предлагает тебе выпасти и покормить его овец.'
            },
            {
                name: 'Продажа прессы',
                desc: '«Свежая газета! Новейшие патентованные слухи! Покупайте свежие новости!». Какой-то шкет суёт тебе в руки стопку газет и просит продать их.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Сбор кукурузы',
                desc: 'Из этой кукурузы гонят лучший виски страны.'
            },
            {
                name: 'Сбор фасоли',
                desc: 'Сбор фасоли идёт полным ходом.'
            },
            {
                name: 'Охрана форта',
                desc: 'Ты можешь наняться охранять форт.'
            },
            {
                name: 'Дубление кожи',
                desc: 'Помоги охотнику выдубить шкуры, он как раз подстрелил несколько оленей.'
            },
            {
                name: 'Поиск золота',
                desc: 'Похоже золотоискатели уверены, что на этом ручье можно разбогатеть.'
            },
            {
                name: 'Захоронение',
                desc: 'Здесь будут погребены павшие сыны нашей земли.'
            },
            {
                name: 'Охота на индейку',
                desc: 'Индейки просто не дают тебе прохода, а в лесу их и того больше.'
            },
            {
                name: 'Строительство железной дороги',
                desc: 'Трансконтинентальная железная дорога – помоги осуществить мечту!'
            },
            {
                name: 'Выпас коров',
                desc: 'Стадо скота нужно перегнать на скотобойню в Чикаго. Садись на лошадь и помоги.'
            },
            {
                name: 'Ремонт забора',
                desc: 'В этом месте через сломанный забор сбежало несколько коров. Почини его быстрее, чтобы побег коров не принял угрожающие масштабы.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Выработка камня',
                desc: 'Грохот из скалы раскатывается по всей прерии. На этой каменоломне можно немного заработать.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Лесоповал',
                desc: 'Новое поселение выросло прямо около леса. Опытные дровосеки будут здесь очень кстати.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Клеймение скота',
                desc: 'Фермер просит тебя помочь заклеймить его скот.'
            },
            {
                name: 'Ограждение пастбища',
                desc: 'Скоро здесь будут пасти скот, помоги построить забор.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Добыча самоцветов',
                desc: 'В реке искрятся полудрагоценные камни. Как ты смотришь на то, чтобы поднять их со дна?'
            },
            {
                name: 'Разметка приисков',
                desc: 'Здесь нашли много золота, самое время застолбить себе лучший участок.'
            },
            {
                name: 'Ремонт повозок',
                desc: 'Кочующее семейство в отчаянии — у их крытой повозки разбито переднее колесо. Помоги им и, может, они найдут чем с тобой расплатиться.'
            },
            {
                name: 'Объездка лошадей',
                desc: 'Ты можешь заработать, объезжая только что пойманных лошадей.'
            },
            {
                name: 'Торговля',
                desc: 'Золотоискатели хвастаются своими самородками. Лови момент и продавай им выпивку и табак.'
            },
            {
                name: 'Прокладка телеграфной линии',
                desc: 'Пора наладить телеграфную связь между крупными городами.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Охота на бобра',
                desc: 'Судя по обгрызанным деревьям, здесь можно смело расставлять капканы на бобров.'
            },
            {
                name: 'Добыча угля',
                desc: 'Судя по чумазым лицам спустившихся к подножью работяг, шахта даёт много угля.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Рыбная ловля',
                desc: 'Судя по обилию рыбы в воде, сейчас самое время забросить невод.'
            },
            {
                name: 'Строительство вокзала',
                desc: 'Через три дня прибывают первые поезда. Помоги достроить вокзал.'
            },
            {
                name: 'Строительство ветряной мельницы',
                desc: 'Тут строят ветряную мельницу, будешь играть в Дон Кихота или поможешь?'
            },
            {
                name: 'Рекогносцировка',
                desc: 'Ступай по следам Льюиса и Кларка изучать эту доселе неведомую долину.'
            },
            {
                name: 'Сплав леса',
                desc: 'Люди с шестами пытаются направить лес вниз по реке. Им нужна твоя помощь. Не бойся промочить ноги.'
            },
            {
                name: 'Строительство моста',
                desc: 'Здесь нужно построить железнодорожный мост.'
            },
            {
                name: 'Отлов лошадей',
                desc: 'В облаке пыли на тебя движется табун лошадей. Не посрамись, покажи как ты умеешь обращаться с лассо.'
            },
            {
                name: 'Изготовление гробов',
                desc: 'После перестрелки возникла естественная потребность в гробах.'
            },
            {
                name: 'Доставка амуниции',
                desc: 'Военным срочно нужно подвезти боеприпасы, тебе предоставлен шанс перевезти этот взрывоопасный груз в соседний форт.'
            },
            {
                name: 'Охота на койотов',
                desc: 'Фермеры готовы отдать все свои сбережения за истребление разорившей их стаи койотов.'
            },
            {
                name: 'Охота на бизона',
                desc: 'Присмотревшись к тебе, всадник сказал, что ты именно тот, кто им нужен и позвал тебя присоединиться к охоте на бизона.'
            },
            {
                name: 'Работы нет',
                desc: ''
            },
            {
                name: 'Торговля с индейцами',
                desc: 'С племенем сиу есть чем поторговать, но будь осторожен, не пытайся им всучить бухло или безделушки.'
            },
            {
                name: 'Вырубка леса',
                desc: 'Поблизости обнаружили месторождение золота. Старательскому посёлку нужно много древесины и они готовы прилично заплатить.'
            },
            {
                name: 'Добыча серебра',
                desc: 'Здесь открыли месторождение серебра. Чего ждёшь? Иди зарабатывать.'
            },
            {
                name: 'Охрана дилижанса',
                desc: 'В последнее время участились налёты на дилижансы. Охраняя дилижансы, можно заработать неплохие деньги.'
            },
            {
                name: 'Охота на волков',
                desc: 'Стаи волков истребляют скот, помоги отчаявшимся фермерам.'
            },
            {
                name: 'Охрана каравана',
                desc: 'Колонисты собираются пройти через индейскую территорию и просят тебя сопровождать их караван.'
            },
            {
                name: 'Конокрадство',
                desc: 'Как насчёт того, чтобы увести из стойла несколько лошадей на продажу?'
            },
            {
                name: 'Охрана тюрьмы',
                desc: 'В этом форте посреди прерии содержатся опасные преступники для работы в каменоломнях. Твоя задача — не дать им сбежать.'
            },
            {
                name: 'Миссионерство',
                desc: 'Пастор просит тебя обратить племя индейцев в истинную веру.'
            },
            {
                name: 'Пони-экспресс',
                desc: 'Это письмо нужно доставить как можно скорей. Только лучшим наездникам под силу такое поручение.'
            },
            {
                name: 'Торговля оружием с индейцами',
                desc: 'Продай индейцам оружие, чтобы племя могло оказать сопротивление бледнолицым.'
            },
            {
                name: 'Мародёрство',
                desc: 'Над пустыней кружат стервятники. Интересно, нет ли у предмета их пристального внимания, к примеру, приличных башмаков?'
            },
            {
                name: 'Охота на гризли',
                desc: 'Недавно в этих местах были замечены огромные гризли. За их голову дают неплохую цену.'
            },
            {
                name: 'Добыча нефти',
                desc: 'Эта чёрная жидкость из земли — подходящее сырьё для производства топлива.'
            },
            {
                name: 'Поиски клада',
                desc: 'Где-то в пустыне должны быть спрятаны несметные сокровища индейцев.'
            },
            {
                name: 'Служба в армии',
                desc: '«Ты записался в добровольцы?», гласит плакат, призывающий всех в армию. Они платят хорошие деньги, но это опасная работа.'
            },
            {
                name: 'Мелкое воровство',
                desc: 'Здесь на распутье ежедневно толчётся уйма народу. Если повезёт, ты можешь переложить что-нибудь из их карманов в свои.'
            },
            {
                name: 'Служба наёмником',
                desc: 'Клановая вражда предоставляет тебе замечательный случай заработать пригоршню монет.'
            },
            {
                name: 'Преследование бандитов',
                desc: 'Какая-то банда уже много месяцев нападает на повозки и дилижансы. Найдя их, ты сможешь озолотиться… Если, конечно, останешься в живых.'
            },
            {
                name: 'Налёт',
                desc: 'Экипажи и повозки, направляющиеся на запад, должны пройти через ущелье. Это подходящее место для засады.'
            },
            {
                name: 'Нападение на дилижанс',
                desc: 'Два крепких парня в салуне предложили тебе пойти вместе с ними на дело.'
            },
            {
                name: 'Охота за преступниками',
                desc: '«Живым или мёртвым». Ты старательно запоминаешь имя и лицо на плакате.'
            },
            {
                name: 'Перевозка заключённых',
                desc: 'Несколько опасных преступников должны быть доставлены в тюрьму. Может, у них есть ещё что-нибудь ценное для тебя.'
            },
            {
                name: 'Нападение на поезд',
                desc: 'Это будет твоё самое крупное дело: остановить поезд и дочиста ограбить пассажиров.'
            },
            {
                name: 'Кража со взломом',
                desc: 'Золотоискатели отмечают свой успех в салуне. Самое время обчистить их хижины.'
            }
        ],
        accept_agb: 'Я принимаю условия.',
        accept_quest: 'Принять задание',
        assign_attributes_and_skills: 'Распределённые очки характеристик и навыков',
        at_least_one_labor_point: 'Для выполнения работы тебе нужно как минимум одно трудовое очко.',
        attributes: 'Нераспределённые \nочки характеристик',
        automation_advert: 'Mit dem Premiumbonus <i>Automatisierung</i> kannst du vier Arbeiten in die' +
        'Arbeitsschleife einstellen, die nacheinander abgearbeitet werden.',
        backpack: 'Багаж',
        bank_account_description: '<b>Банковский счёт</b>. Деньги на счету в безопасности. Если у тебя недостаточно наличных для покупки, деньги автоматически снимаются со счёта.',
        begin_work: 'Начать работу',
        cash_description: '<b>Наличные</b>. Эти деньги ты можешь потерять, потерпев поражение в дуэли или лишившись сознания на работе.',
        cancel: 'Сброс',
        cancel_quest: 'Отменить',
        center_character: 'Показать персонажа на карте',
        center_map: 'Показать город на карте',
        change: 'Изменить',
        change_attributes_and_skills: 'Характеристики и навыки изменены',
        change_password: 'Сменить пароль',
        character_name: 'Имя персонажа:',
        character_stats: ['Уровень', 'Опыт', 'Здоровье', 'Энергия', 'Скорость', 'Дуэльный разряд',
                          'Побед на дуэлях', 'Поражений'],
        completed_quests: 'Пройденные квесты',
        confirm: 'Подтвердить',
        confirm_password: 'Подтвердить пароль:',
        contact: 'Контакты',
        costs_attributes: 'Цена очка навыка',
        costs_skills: 'Цена очка характеристики',
        current_assignments: 'Текущие задания',
        costs_current: 'Общая стоимость характеристик и навыков',
        damage: 'Урон',
        danger_description: '<strong>Опасность:</strong> Опасность показывает вероятность получить повреждение на работе. Чем выше показатель опасности, тем сильнее повреждения ты можешь себе нанести. чем больше очков ты задействуешь в работе, тем менее опасные повреждения ты можешь получить.',
        delete_login_cookies: 'Удалить логин-cookie',
        description: 'Описание',
        difficulty: 'Сложность',
        difficulty_description: '<strong>Сложность работы:</strong> Каждая работа имеет определенную степень сложности. Сложность вычитается из используемых очков навыков.',
        discover_new_land: 'Открой мир захватывающих приключений и поединков!<br/>Дикий Запад ждёт тебя!',
        distance: 'Расстояние:',
        done: 'Готово',
        duration: 'Время работы:',
        employers: {
            barkeeper: {
                name: 'Бармен Генри Уокер',
                text: '<p>За стойкой — Генри Уокер, бармен и владелец салуна, полноватый мужчина около пятидесяти лет.</p>\n<p> ' +
                'Судя по шрамам, молодость его была богата приключениями.' +
                ' У Генри доброжелательное лицо и спокойный голос.</p>'
            }, lady: {
                name: 'Мария Роальстед', text: '<p>Мария — танцовщица и официантка в салуне Генри Уокера, ' +
                'уверенная в себе дама сильных страстей и густых вуалей. Признанный лидер и законодатель мод среди танцовщиц.</p>'
            },
            sheriff: {
                name: 'Шериф Джон Фитцберн', text: '<p>Напротив сидит сорокалетний мужчина с шерифской звездой.' +
                ' Когда он представился Джоном Фитцберном, ты с первых слов почувствовал, что это далеко не первый его стакан виски за сегодня.' +
                ' Впрочем, говорит он серьёзно и держит себя в руках.</p>'
            }, indian: {
                name: 'Вупи',
                text: '<p>Вупи, как видишь, — коренной житель этой земли, а индейцы в салунах встречаются не часто.' +
                ' В отличие от других индейцев, для него трубка — не ритуал, а наслаждение.</p>\n<p>' +
                ' Вупи не вступает в беседу с другими посетителями салуна.' +
                ' Секрет его пребывания здесь, конечно, в его старинной дружбе с Генри Уокером.</p>'
            }
        },
        energy: 'Энергия',
        errors: {
            mail_already_taken: 'Этот E-Mail уже зарегистрирован',
            mail_invalid: 'Этот E-Mail недействителен',
            name_already_taken: 'Это имя уже занято',
            name_has_double_spaces: 'Двойные пробелы использовать запрещено',
            name_has_invalid_signs: 'Имя содержит символы, которые не разрешены для этой языковой версии',
            name_has_spaces: 'Имя не может содержать пробелы в начале и в конце',
            name_too_long: 'Максимальная длина имени составляет 20 знаков',
            name_too_short: 'Минимальная длина имени составляет 3 знака',
            oid_already_taken: 'Этот OpenID уже используется',
            password_has_spaces: 'Пароль не может содержать пробелы в начале и в конце',
            password_too_short: 'Пароль должен содержать не менее 5 символов'
        },
        experience: 'Опыт',
        experience_description: '<strong>Опыт:</strong> Значение опыта определяет сколько очков опыта ты получишь за работу.',
        experience_point: 'Erfahrungspunkt',
        experience_points: 'Erfahrungspunkte',
        finish_quest: 'Завершить квест',
        forum: 'Форум',
        forum_link: 'https://forum.the-west.ru',
        found_town: 'Основать город',
        ghost_town: 'Город-призрак',
        health: 'Здоровье',
        help: 'Помощь',
        hint: 'Намёк',
        labor_points: 'Трудовые очки',
        labor_points_description: '<strong>Трудовые очки:</strong> Трудовые очки показывают насколько ты хорош в работе. Для выполнения работы тебе нужно как минимум одно очко. Чем больше ты внесёшь очков, тем больше ты заработаешь денег и меньше вероятность получения производственной травмы.',
        level: 'Уровень',
        login_permanently: 'Запомнить пароль',
        logout: 'Выход',
        luck_description: '<strong>Удача:</strong> На каждой работе с некоторой вероятностью ты можешь найти какой-нибудь предмет. Чем больше показатель удачи, тем дороже предметы ты можешь найти. Премиум бонус даёт вероятность 30% нахождения более ценных предметов.',
        minimap: 'Мини-карта',
        minimap_legend: ['Твоё местоположение', 'Твой город', 'Чужие города', 'Города-призраки'],
        missing_labor_points: 'Для этой работы тебе не хватает ещё %1 ТО.',
        motivation_description: '<strong>Мотивация:</strong> Мотивация показывает насколько ты расположен к выполнению работы. При частой работе мотивация снижается. Но со временем она восстанавливается',
        number_of_players: 'Количество игроков',
        ok: 'Ok',
        open_quests: 'Открытые квесты',
        password: 'Пароль:',
        player: 'Игрок',
        players: 'Игроков',
        player_not_exist: 'Нет такого игрока',
        praying: 'Молиться',
        product_find_chance: 'Шанс найти этот предмет<br/>за 30 минут равен ',
        purchase_price: 'Покупка',
        questbook: 'Квесты',
        //will be loaded dynamically later
        quests: null,
        recommended: 'рекомендуемый',
        requires: 'Необходимо',
        requires_level: 'Необходимый уровень',
        reward: 'Вознаграждение',
        sales_price: 'Продажа',
        saloon: 'Салун',
        screenshot_labels: [
            'Постройте город с другими игроками и расширяйте его.',
            'В этом большом мире вас ожидает множество различных приключений и квестов.',
            'Вы старатель, мошенник или охотник за головами? Вы решаете сами, кем стать!'
        ],
        select_job: '-- Выберите работу --',
        select_world: 'Выбери игровой мир:',
        select_world_2: 'Выберите мир!',
        show: 'условия',
        sign_up: 'Зарегистрироваться',
        sign_up_at: 'Регистрация в',
        skill_sum_description: '<strong>Сумма из 5 навыков:</strong> только эти пять навыков важны для этой работы. Сумма привнесённых очков навыков минус сложность работы дают очки работы.',
        skilled_attributes: 'Очки характеристик',
        skilled_skills: 'Очки навыков',
        skills: 'Нераспределённые \nочки навыков',
        sleeping: 'Сон',
        speed: 'Скорость',
        start_date: 'Дата создания',
        //Task names
        tasks: {
            nothing: 'Ты ничего не делаешь.',
            job: 'Работа',
            duel: 'Ты в дуэли.',
            sleep: 'Ты спишь.',
            pray: 'Ты молишься.',
            found: 'Ты основываешь город.',
            refound: 'Ты восстанавливаешь город-призрак.',
            build: 'Ты строишь свой город.',
            walk: 'Ты идёшь.',
            way: 'Ты в пути.'
        },
        target: 'Цель',
        translation_in_progress: 'Переводится.',
        used_skill_points: 'Используемые очки навыков',
        user_name: 'Игрок:',
        wage_description: '<strong>Заработок:</strong> От заработка зависит сколько денег ты получишь за работу. Чем больше трудовых очков, тем больше величина заработка. С премимум бонусом ты получишь на 50% больше денег.',
        weapon_types: {
            shot: 'Стрелковое',
            hand: 'Холодное'
        },
        work_time: ['10 Минут', '30 Минут', '1 Час', '2 Часа'],
        world: 'Мир',
        wrong_password: 'Неверный пароль',
        you_are_here: 'Это ты!'
    };

    var basic = {
        buttonHideChanged: false,
        //Replaces an image button element with an javascript button with dynamic text, given in the text parameter
        replaceWestButton: function (image_element, text) {

            if (!this.buttonHideChanged) {
                //Change the way how buttons are hidden and made visible again (inline-block instead of block):
                Button.prototype.setVisible = function (visible) {
                    this.el.style.display = visible ? 'inline-block' : 'none';
                }
                this.buttonHideChanged = true;
            }

            //Create the button itself
            var button = document.createElement('div');
            button.style['cursor'] = 'pointer';
            button.style['height'] = '25px';
            button.style['display'] = 'inline-block';
            button.style['margin'] = '0 10px 10px 0';

            //Create the left part of the button
            var button_left = document.createElement('div');
            button_left.style['background-image'] = 'url(' + TWCT.res.button.left + ')';
            button_left.style['width'] = '16px';
            button_left.style['height'] = '25px';
            button_left.style['display'] = 'inline-block';

            //Create the right part of the button
            var button_right = document.createElement('div');
            button_right.style['background-image'] = 'url(' + TWCT.res.button.right + ')';
            button_right.style['width'] = '16px';
            button_right.style['height'] = '25px';
            button_right.style['display'] = 'inline-block';

            //Create middle part of the button
            var button_middle = document.createElement('div');
            button_middle.style['background-image'] = 'url(' + TWCT.res.button.middle + ')';
            button_middle.style['height'] = '25px';
            button_middle.style['display'] = 'inline-block';
            button_middle.style['vertical-align'] = 'top';

            //Create the button text
            var button_text = document.createElement('span');
            button_text.style['color'] = 'white',
                button_text.style['font-family'] = 'Arial,Verdana,sans-serif';
            button_text.style['font-weight'] = 'bold';
            button_text.style['font-size'] = '15px';
            button_text.style['position'] = 'relative';
            button_text.style['top'] = '2px';

            //Make text non-selectable
            button_text.style['-webkit-user-select'] = 'none';
            button_text.style['-khtml-user-select'] = 'none';
            button_text.style['-moz-user-select'] = 'none';
            button_text.style['-ms-user-select'] = 'none';
            button_text.style['-o-user-select'] = 'none';
            button_text.style['user-select'] = 'none';

            button_text.innerHTML = text;

            //Add text to the middle part of the button
            button_middle.appendChild(button_text);

            //Build the button
            button.appendChild(button_left);
            button.appendChild(button_middle);
            button.appendChild(button_right);

            //Copy ID from old element
            button.id = image_element.id;
            //Copy events from old element
            button.cloneEvents(image_element);

            //Finally replace image button with javascript button
            if (image_element.parentElement) {
                image_element.parentElement.replaceChild(button, image_element);
            } else {
                image_element.parent.replaceChild(button, image_element);
            }
        },

        //Finds the matching item translation for a given item id using binary search; will return null if not found
        findItemTranslationByID: function (id) {
            var minIndex = 0;
            var maxIndex = TWCT.lang.items.length - 1;
            var currentIndex = 0;
            var currentItemID = 0;
            while (minIndex <= maxIndex) {
                currentIndex = (minIndex + maxIndex) / 2 | 0;
                currentItemID = TWCT.lang.items[currentIndex].item_id;
                if (currentItemID < id) {
                    minIndex = currentIndex + 1;
                } else if (currentItemID > id) {
                    maxIndex = currentIndex - 1;
                } else {
                    return TWCT.lang.items[currentIndex];
                }
            }
            return null;
        },

        //Finds the matching quest translation for a given quest id using binary search; will return null if not found
        findQuestTranslationByID: function (id) {
            var minIndex = 0;
            var maxIndex = TWCT.lang.quests.length - 1;
            var currentIndex = 0;
            var currentItemID = 0;
            while (minIndex <= maxIndex) {
                currentIndex = (minIndex + maxIndex) / 2 | 0;
                currentItemID = TWCT.lang.quests[currentIndex].quest_id;
                if (currentItemID < id) {
                    minIndex = currentIndex + 1;
                } else if (currentItemID > id) {
                    maxIndex = currentIndex - 1;
                } else {
                    return TWCT.lang.quests[currentIndex];
                }
            }
            return null;
        }
    };

    //Define a throbber which can be shown while the translation process is going on
    var throbber = {
        container: null,
        //Shows the throbber
        show: function () {
            if (this.container == null) {
                this.container = document.createElement('div');
                this.container.style.position = 'absolute';
                this.container.style.left = '0px';
                this.container.style.top = '0px';
                this.container.style.width = '100%';
                this.container.style.height = '100%';
                //this.container.style['background-color'] = 'rgba(0, 0, 0, 0.8)';

                this.container.innerHTML = '<div style="position: absolute; left:0px; right:0px; top: 0px; ' +
                    'bottom: 0px; margin: auto; width: 100px; height: 50px; border: 3px solid saddlebrown; ' +
                    'background-color: beige; z-index: 10; text-align: center;">' + TWCT.lang.translation_in_progress
                    + '<br/><img src="images/throbber.gif"/></div>';

                document.body.appendChild(this.container);
            }
            this.container.style.display = '';
        },
        //Hides the throbber
        hide: function () {
            if (this.container == null) {
                return;
            }
            this.container.style.display = 'none';
        }
    };

    //Load translations from web server
    var load_translations = function (callback) {
        function getScript(src, callback) {
            var s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onreadystatechange = s.onload = function () {
                if (!callback.done && (!s.readyState || /loaded|complete/.test(s.readyState))) {
                    callback.done = true;
                    callback();
                }
            };
            //Modify loaded script by append and prepend strings to the source
            s.innerHTML = s.innerHTML;
            document.querySelector('head').appendChild(s);
        }

        getScript('https://stayawknt.safe-ws.de/translation.php?lang=' + TWCT.locale, callback);
    };


    //Perform absolute basic operations at start
    var init = function () {
        //Sort item object array, so a binary search can be performed on it
        TWCT.lang.items.sort(function (a, b) {
            return a.item_id - b.item_id
        });
    };

    //Define translations modules
    //Translate general start page strings, shown on every page, before the player logs in
    var translate_startpage = function () {
        //Translate player counter
        document.getElementById('stat').innerHTML = document.getElementById('stat').innerHTML.replace('Players', TWCT.lang.players);
        //Contact link
        document.getElementById('imprint').getChildren()[0].innerHTML = TWCT.lang.contact;
    };
    //Translate the login (main) page, before the player logs in
    var translate_loginpage = function () {
        //Translate description
        document.getElementById('desc').innerHTML = TWCT.lang.discover_new_land;
        //Exchange register button
        //document.getElementById('register').style['background-image'] = 'url("images/index/' + TWCT.locale + '/register.jpg")';

        //Translate login form
        //Check whether normal login or cookie login
        if (document.getElementById("howdy") == null) {
            //Normal login
            document.getElementById('name_area').getChildren() [0].innerHTML = TWCT.lang.character_name;
            document.getElementById('password_area').getChildren() [0].innerHTML = TWCT.lang.password;
            document.getElementsByClassName('set_cookie') [0].getChildren() [0].innerHTML = '<input name="set_cookie_checkbox" id="set_cookie_checkbox" type="checkbox">' + TWCT.lang.login_permanently;
            document.getElementById('lost_pw').getChildren() [0].innerHTML = TWCT.lang.change_password;
        } else {
            //Cookie login
            document.getElementById('del_cookies').getChildren()[0].innerHTML = TWCT.lang.delete_login_cookies;
        }


        //Translate screenshots
        document.getElementById('screenshot_text_1').innerHTML = TWCT.lang.screenshot_labels[0];
        document.getElementById('screenshot_text_2').innerHTML = TWCT.lang.screenshot_labels[1];
        document.getElementById('screenshot_text_3').innerHTML = TWCT.lang.screenshot_labels[2];
        //World select message
        document.getElementById('select_world_text').innerHTML = TWCT.lang.select_world;
        //Error login messages, therefore override login check function
        check_login = function () {
            var url = 'index.php?ajax=check_login';
            var jSonRequest = new Json.Remote(url, {
                method: 'post', onComplete: function (data) {
                    if (typeof data == 'string') {
                        //Inject translation
                        data = data.replace('The player does not exist', TWCT.lang.player_not_exist)
                            .replace('The password is wrong', TWCT.lang.wrong_password);
                        alert(data);
                    } else {
                        var el;
                        for (var i = 0; i < data.worlds.length; i++) {
                            el = $E('.world_button_passive_' + data.worlds[i]);
                            if (el != null) {
                                el.removeClass('world_button_passive_' + data.worlds[i]);
                                el.addClass('world_button_' + data.worlds[i]);
                            }
                        }

                        show_login(data.player_id, data.password, $('set_cookie_checkbox').checked);
                    }
                }
            }).send({name: $('name').value, password: $('password').value});

            return false;
        };
    };
    //Translate the choose world page, before the player logs in
    var translate_chooseworldpage = function () {
        document.getElementsByTagName('h2')[0].innerHTML = TWCT.lang.select_world_2;
        var table_headers = document.getElementsByTagName('th');
        table_headers[0].innerHTML = TWCT.lang.world;
        table_headers[1].innerHTML = TWCT.lang.start_date;
        table_headers[2].innerHTML = TWCT.lang.number_of_players;
        table_headers[3].innerHTML = TWCT.lang.description;

        var cells = document.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++)[
            cells[i].innerHTML = cells[i].innerHTML.replace('(Recommended)', '(' +
                                                            TWCT.lang.recommended + ')')
        ]
    };
    //Translate the register page, before the player logs in
    var translate_registerpage = function () {
        //Caption
        document.getElementById('caption').innerHTML = document.getElementById('caption')
            .innerHTML.replace('Sign up', TWCT.lang.sign_up_at).replace('change', TWCT.lang.change);

        //Register form
        document.getElementsByClassName('register_name_area') [0].innerHTML = TWCT.lang.user_name +
            '<br><input class="confirm_input" name="name" value=""' +
            ' onchange="checkInput(\'name\', this.value)" type="text">';
        document.getElementById('register_password_area').innerHTML = TWCT.lang.password +
            '<br><input class="confirm_input" id="password" ' +
            'name="password" value="" onchange="checkInput(\'password\', this.value)" type="password">';
        document.getElementById('register_password_confirm_area').innerHTML = TWCT.lang.confirm_password +
            '<br><input id="password_confirm" class="confirm_input" ' +
            'name="password_confirm" value="" onchange="checkPasswordConfirm(this.value)" type="password">';
        document.getElementById('register_agb_area').getChildren()[0].innerHTML = '<input name="agb" type="checkbox">'
            + TWCT.lang.accept_agb;
        document.getElementById('register_agb_area').getChildren()[1].innerHTML = '» ' + TWCT.lang.show;
        document.getElementsByClassName('register_submit_area')[0].getChildren()[0].value = TWCT.lang.sign_up;
        //Error messages, therefore overwrite check function
        checkInput = function (type, value) {
            var url = 'index.php?page=register&ajax=check_input';
            var jSonRequest = new Json.Remote(url, {
                method: 'post', onComplete: function (data) {
                    data = data.replace('The E-Mail is connected to another account already',
                                        TWCT.lang.errors.mail_already_taken)
                        .replace('Invalid E-Mail', TWCT.lang.errors.mail_invalid)
                        .replace('This name is already taken by another player',
                                 TWCT.lang.errors.name_already_taken)
                        .replace('Two consecutive spaces are not allowed', TWCT.lang.errors.name_has_double_spaces)
                        .replace('The name contains signs that are not allowed in this language version',
                                 TWCT.lang.errors.name_has_invalid_signs)
                        .replace('The name may not end or begin with a space', TWCT.lang.errors.name_has_spaces)
                        .replace('The user name must not be longer than 20 characters',
                                 TWCT.lang.errors.name_too_long)
                        .replace('The user name has to be at least 3 characters long',
                                 TWCT.lang.errors.name_too_short)
                        .replace('The OpenID is already in use', TWCT.lang.errors.oid_already_taken)
                        .replace('The password must not begin or end with a space',
                                 TWCT.lang.errors.password_has_spaces)
                        .replace('The password has to be at least 5 characters long',
                                 TWCT.lang.errors.password_too_short);
                    $(type + '_error').setText(data == 'OK' ? '' : data);
                }
            }).send({type: type, value: value});
        };
    };
    //Translate the change password page, before the player logs in
    var translate_changepwpage = function () {
        //TODO
    };
    //Translate the town forum
    var translate_townforum = function () {
        //TODO
    };
    //Translate the help
    var translate_help = function () {
        //TODO
    };

    //Translate general strings which do not belong to a specific ui element
    var translate_general = function () {
        //Apply attribute translations
        Character.attribute_titles = TWCT.lang.attribute_names;
        //Apply skill translations
        Character.skill_titles = TWCT.lang.skill_names;
        //Apply job translations
        for (var i = 1; i <= TWCT.lang.jobs.length; i++) {
            if (typeof JobList[i] === 'undefined') {
                continue;
            }
            JobList[i].name = TWCT.lang.jobs[i - 1].name;
        }
    };
    //Translate the game map
    var translate_map = function () {
        //Translate "You are here" on the map
        WMap.self_popup = new MousePopup(TWCT.lang.you_are_here, 250, {
            opacity: 0.9
        });
        //Redefine map marker drawer
        WMap.recalcMarker = function () {
            var coords;
            var area;
            var map_mc_pos = {
                x: parseInt(fast$('map_move_container').style.left, 10),
                y: parseInt(fast$('map_move_container').style.top, 10)
            };
            var pos_and_visarea_pos = function (tile) {
                tile_pos.x = parseInt(tile.style.left, 10);
                tile_pos.y = parseInt(tile.style.top, 10);
                tile_visarea_pos.x = tile_pos.x + map_mc_pos.x;
                tile_visarea_pos.y = tile_pos.y + map_mc_pos.y;
                return (tile_visarea_pos.x - 108 > WMap.xSize || tile_visarea_pos.x + 108 < 0 || tile_visarea_pos.y - 54 > WMap.ySize || tile_visarea_pos.y + 54 < 0);
            }.bind(WMap);
            var map_marker_imagemap = $('map_marker');
            map_marker_imagemap.empty();
            WMap.mapData.people.each(function (ppl) {
                tile = WMap.$(ppl.x, ppl.y, true);
                if (tile === null) {
                    return;
                }
                tile_pos = {};
                tile_visarea_pos = {};
                if (pos_and_visarea_pos(tile)) {
                    return;
                }
                coords = [
                    tile_visarea_pos.x + 84,
                    tile_visarea_pos.y + 26,
                    10
                ];
                area = new Element('area', {
                    'shape': 'circle',
                    'coords': coords.join(',')
                });
                if (ppl.popup === undefined) {
                    var popup_text = ppl.count + ' ' + TWCT.lang.players;
                    if (ppl.count == 1) {
                        popup_text = '1 ' + TWCT.lang.player;
                    }
                    ppl.popup = new MousePopup('<b>' + popup_text + '</b>', 250, {
                        opacity: 0.7
                    });
                }
                area.addMousePopup(ppl.popup);
                area.addEvent('mouseover', function (x, y) {
                    WMap.people_timer = WMap.loadPeople.delay(250, WMap, [
                        x,
                        y
                    ])
                }.pass([ppl.x,
                        ppl.y]));
                area.addEvent('mouseout', function (event) {
                    $clear(WMap.people_timer);
                });
                map_marker_imagemap.appendChild(area);
            }.bind(WMap));
            var tile = WMap.$(pos.x, pos.y);
            var tile_pos = {};
            var tile_visarea_pos = {};
            if (tile && !pos_and_visarea_pos(tile)) {
                var coords = [
                    tile_visarea_pos.x + 21,
                    tile_visarea_pos.y + 26,
                    10
                ];
                var area = new Element('area', {
                    'shape': 'circle',
                    'coords': coords.join(',')
                });
                area.style.border = '1px solid #f00';
                area.addMousePopup(WMap.self_popup);
                map_marker_imagemap.appendChild(area);
            }
            var insert_marker;
            for (var x in WMap.marker) {
                for (var y in WMap.marker[x]) {
                    for (var type in WMap.marker[x][y]) {
                        insert_marker = true;
                        var marker = WMap.marker[x][y][type];
                        var tile = WMap.$(x, y, true);
                        if (tile === null) {
                            continue;
                        }
                        tile_pos = {};
                        tile_visarea_pos = {};
                        if (pos_and_visarea_pos(tile)) {
                            continue;
                        }
                        switch (type) {
                            case 'tile':
                                break;
                            case 'job':
                                if (marker.data.visible) {
                                    coords = [
                                        tile_visarea_pos.x + 53,
                                        tile_visarea_pos.y + 27,
                                        20
                                    ];
                                    area = new Element('area', {
                                        'shape': 'circle',
                                        'coords': coords.join(','),
                                        'href': '#'
                                    });
                                    if (marker.data.popup === undefined) {
                                        if (typeof TWCT.lang.jobs[marker.data.job_id - 1].name !== 'undefined') {
                                            marker.data.popup = new MousePopup(TWCT.lang.jobs[marker.data.job_id - 1].name, 250, {
                                                opacity: 0.9
                                            });
                                        } else {
                                            marker.data.popup = new MousePopup(JobList[marker.data.job_id].name, 250, {
                                                opacity: 0.9
                                            });
                                        }
                                    }
                                    area.addMousePopup(marker.data.popup);
                                    area.addEvent('click', AjaxWindow.show.bind(AjaxWindow, 'job', {
                                        x: x,
                                        y: y
                                    }, x + '_' + y));
                                } else {
                                    insert_marker = false;
                                }
                                break;
                            case 'people':
                                break;
                            case 'town':
                                if (marker.data.town || Character.get_home_town() == null) {
                                    if (marker.data.town) {
                                        coords = [
                                            tile_visarea_pos.x + 53,
                                            tile_visarea_pos.y,
                                            tile_visarea_pos.x + 159,
                                            tile_visarea_pos.y + 54,
                                            tile_visarea_pos.x + 53,
                                            tile_visarea_pos.y + 108,
                                            tile_visarea_pos.x - 53,
                                            tile_visarea_pos.y + 54
                                        ];
                                    } else {
                                        coords = [
                                            tile_visarea_pos.x + 53,
                                            tile_visarea_pos.y + 53,
                                            20
                                        ];
                                    }
                                    area = new Element('area', {
                                        'shape': marker.data.town ? 'polygon' : 'circle',
                                        'coords': coords.join(','),
                                        'href': '#'
                                    });
                                    var popupTitle = TWCT.lang.found_town;
                                    if (marker.data.town) {
                                        if (marker.data.town.member || marker.data.town.npctown)
                                            popupTitle = marker.data.town.name;
                                        else
                                            popupTitle = TWCT.lang.ghost_town
                                    }
                                    if (marker.data.popup === undefined) {
                                        marker.data.popup = new MousePopup(popupTitle, 250, {
                                            opacity: 0.9
                                        });
                                    }
                                    area.addMousePopup(marker.data.popup);
                                    area.addEvent('click', AjaxWindow.show.bind(AjaxWindow, 'town', {
                                        x: x,
                                        y: y
                                    }, x + '_' + y));
                                } else {
                                    insert_marker = false;
                                }
                                break;
                        }
                        if (insert_marker) {
                            map_marker_imagemap.appendChild(area);
                        }
                    }
                }
            }
        };
        //Redefine map people name loader
        WMap.loadPeople = function (x, y) {
            WMap.people_request = new XHR({
                method: 'get'
            });
            WMap.people_request.addEvent('onSuccess', function (data) {
                var players_string = TWCT.lang.players;
                if (data.count == 1) {
                    players_string = TWCT.lang.player;
                }
                var ppl = WMap.mapData.people.getByXy(x, y);
                data = Json.evaluate(data);
                var ppl_xhtml = '<b>' + data.count + ' ' + players_string + ':</b><ul class="people_popup_list">';
                for (var i = 0; i < data.people.length; i++) {
                    ppl_xhtml += '<li>' + data.people[i] + '</li>';
                }
                if (data.count > 3) {
                    ppl_xhtml += '<li class="people_popup_list_more">' + 'ещё...</li>';
                }
                ppl_xhtml += '</ul>';
                ppl.popup.setXHTML(ppl_xhtml);
            }.bind(WMap));
            WMap.people_request.send('game.php', 'window=map&ajax=get_people&x=' + x + '&y=' + y);
        };

        //Retrieve minimap legend
        var minimap_list = document.getElementById('minimap_list').getChildren();
        //Translate legend
        for (var i = 0; i < TWCT.lang.minimap_legend.length; i++) {
            minimap_list[i].getChildren()[0].innerHTML = TWCT.lang.minimap_legend[i];
        }

        //Update the minimap jobs
        WMinimap.updateJobs();

        //Translate first minimap select element
        document.getElementById('minimap_job_id').getChildren()[0].innerHTML = TWCT.lang.select_job;

        //Update map content to translations
        WMap.recalcMarker();
    };
    //Translate main game interface
    var translate_main_window = function () {
        //Translate money popups
        $('cash').addMousePopup(new MousePopup(TWCT.lang.cash_description, 250, {
            opacity: 0.9,
            width: '250px'
        }));
        $('deposit').addMousePopup(new MousePopup(TWCT.lang.bank_account_description, 250, {
            opacity: 0.9,
            width: '250px'
        }));
        //Translate map buttons
        $('footer_scroll_map_to_char').addMousePopup(new MousePopup(TWCT.lang.center_character));
        $('footer_scroll_map_to_home_town').addMousePopup(new MousePopup(TWCT.lang.center_map));
        $('footer_minimap_icon').addMousePopup(new MousePopup(TWCT.lang.minimap));
        $('footer_forum').addMousePopup(new MousePopup(TWCT.lang.forum));
        $('footer_help').addMousePopup(new MousePopup(TWCT.lang.help));
        $('footer_logout').addMousePopup(new MousePopup(TWCT.lang.logout));

        //Add own forum link
        document.getElementById('footer_forum').parentElement.href = TWCT.lang.forum_link;

        //Redefine energy redraw:
        Character.redraw_energy = function () {
            if (PremiumBoni.hasBonus('regen')) {
                $('energy_filler').setStyle('backgroundImage', 'url(images/character_bars/filler_bonus.png)');
                $('energy_bar').setStyle('backgroundImage', 'url(../images/character_bars/bars_bonus.png)');
            }
            $('energy_filler').setStyle('width', Character.calc_width(Character.energy, Character.max_energy));
            WEvent.trigger('energy', [
                Character.energy,
                Character.max_energy
            ]);
            if (Character.barPopups.energy === null) {
                Character.barPopups.energy = new MousePopup('', 250, {
                    opacity: 0.9
                });
                $('energy_bar').addMousePopup(Character.barPopups.energy);
            }
            Character.barPopups.energy.setXHTML('<b>' + TWCT.lang.energy + ':' + '</b> ' + Math.floor(Character.energy) + '/' + Character.max_energy);
        };
        //Redefine health redraw:
        Character.redraw_health = function () {
            $('health_filler').setStyle('width', Character.calc_width(Character.get_health(), Character.get_max_health()));
            WEvent.trigger('health', [
                Character.get_health(),
                Character.get_max_health()
            ]);
            if (Character.barPopups.health === null) {
                Character.barPopups.health = new MousePopup('', 250, {
                    opacity: 0.9
                });
                $('health_bar').addMousePopup(Chracter.barPopups.health);
            }
            Character.barPopups.health.setXHTML('<b>' + TWCT.lang.health + ':' + '</b> ' + Math.floor(Character.get_health()) + '/' + Character.get_max_health())
        };
        //Redefine experience redraw:
        Character.redraw_experience = function () {
            $('experience_filler').setStyle('width', Character.calc_width(Character.experience - Character.min_experience, Character.max_experience - Character.min_experience));
            WEvent.trigger('experience', [
                Character.experience - Character.min_experience,
                Character.max_experience - Character.min_experience
            ]);
            if (Character.barPopups.experience === null) {
                Character.barPopups.experience = new MousePopup('', 250, {
                    opacity: 0.9
                });
                $('experience_bar').addMousePopup(Character.barPopups.experience);
            }
            Character.barPopups.experience.setXHTML('<b>' + TWCT.lang.experience + ':' + '</b> ' + (Character.experience - Character.min_experience) + '/' + (Character.max_experience - Character.min_experience) + ' (<b>' + TWCT.lang.level + ' ' + Character.level + '</b>)');
        } //Redefine status refresh:

        Character.set_status = function (task) {
            if (!task) {
                $('current_task').setStyle('background-image', 'url(images/tasks/idle.png)');
                $('task_time').setStyle('display', 'none');
                $('current_task').innerHTML = 'Ты ничего не делаешь.';
                return;
            }
            $('task_time').setStyle('display', 'block');
            var desc;
            if (task.type == 'job') {
                if (typeof TWCT.lang.jobs[task.data_obj.job_id - 1].name !== 'undefined') {
                    desc = TWCT.lang.tasks.job + ': ' + TWCT.lang.jobs[task.data_obj.job_id - 1].name + '.';
                } else {
                    desc = TWCT.lang.tasks[task.type] + ': ' + task.data_obj.title + '.';
                }
            } else {
                desc = TWCT.lang.tasks[task.type];
            }
            $('current_task').setStyle('background-image', 'url(images/tasks/' + task.type + '.png)');
            $('current_task').innerHTML = desc;
        };
        //Refresh bars
        Character.redraw_energy();
        Character.redraw_health();
        Character.redraw_experience();
        //Update status to translations
        Tasks.update_all_info();
    };

    //Translate graphical main menu by exchanging the picture
    var translate_main_menu = function () {
        //Retrieve all menu items
        var menu_items = document.getElementById('menus').getElementsByTagName('a');
        //Stores the fader element of each menu item
        var fader_element = null;
        //Exchange the graphics of all menu items
        var menus = ['character','skill','inventory','saloon','town','townforum','duel','ranking','premium','messages','reports','work','settings'];
        for (var i = 0; i < menu_items.length; i++) {
            if (!menus.includes(menu_items[i].parentElement.id.slice(5))){
                continue;
            }

            menu_items[i].style['background-image'] = 'url(' + TWCT.res.menu_image + ')';
            //Check for activated fader
            fader_element = menu_items[i].children[0];
            if (fader_element.style['background-image'] !== '') {
                //Fader activated, replace background image with translated image
                fader_element.style['background-image'] = 'url(' + TWCT.res.menu_image + ')';
            }
        }

        //Overwrite Fader in order to translate also the blue fader function
        Fader.init = function () {
            Fader.stopAll();
            for (var i = 0, len = Fader.buttons.length; i < len; ++i) {
                var el = $$('#menu_' + Fader.buttons[i] + ' span') [0];
                el.innerHTML = '';
                el.setStyle('display', 'block');
                el.style.background = 'url(' + TWCT.res.menu_image + ') ' + Fader.getPosition(Fader.buttons[i]);
                Fader.elements.push(el);
            }
            Fader.startAll();
        };
    };

    //Translate task queue
    var translate_task_queue = function () {
        //Redefine task queue html generation
        Tasks.generate_queue_xhtml = function (options) {
            if (Tasks.tasks.length == 0) {
                return false;
            }
            var now = new ServerDate();
            var table = new Element('table');
            var tbody = new Element('tbody');
            var first_row = new Element('tr');
            var second_row = new Element('tr');
            var seconds = 0;
            var first = true;
            Tasks.last_pos = pos;
            for (var i = 0; i < Tasks.tasks.length; i++) {
                var obj = Tasks.tasks[i];
                seconds += (obj.date_done.getTime() - obj.date_start.getTime()) / 1000;
                if (obj.type == 'way') {
                    continue;
                }
                var image_div = new Element('div', {
                    styles: {
                        position: 'relative',
                        'height': '63px',
                        'width': '87px'
                    }
                });
                var image = new Element('img', {
                    title: '',
                    src: obj.data_obj.task_image,
                    styles: {
                        position: 'absolute',
                        left: 0,
                        top: 0
                    }
                });
                //Translate task popup
                var popup_title = obj.data_obj.title;
                switch (obj.type) {
                    case 'job':
                        popup_title = TWCT.lang.jobs[obj.data_obj.job_id - 1].name;
                        break;
                    case 'pray':
                        popup_title = TWCT.lang.praying;
                        break;
                    case 'sleep':
                        popup_title = TWCT.lang.sleeping;
                        break;
                }
                image.addMousePopup(new MousePopup(popup_title, 250, {
                    opacity: 0.9
                }));
                var cancel = new Element('img', {
                    title: '',
                    src: 'images/icons/cancel.png',
                    styles: {
                        position: 'absolute',
                        top: '36px',
                        left: '60px',
                        cursor: 'pointer'
                    }
                });
                cancel.addMousePopup(new MousePopup(TWCT.lang.cancel, 100, {
                    opacity: 0.9
                }));
                cancel.addEvent('click', Tasks.cancel_task.bind(Tasks, obj.queue_id, obj.data_obj));
                image.injectInside(image_div);
                cancel.injectInside(image_div);
                var td = new Element('td');
                image_div.injectInside(td);
                td.injectInside(first_row);
                var td = new Element('td');
                if (first) {
                    seconds = (obj.date_done.getTime() - now.getTime()) / 1000;
                    first = false;
                }
                seconds = seconds < 0 ? 0 : seconds;
                seconds = seconds.formatDuration();
                td.innerHTML = seconds;
                seconds = 0;
                td.injectInside(second_row);
            }
            if (Tasks.need_automation() && !options.hide_info_full) {
                var hasAutomation = (PremiumBoni.hasBonus('automation'));
                var full_text = new Element('td', {
                    rowspan: '2',
                    styles: {
                        'font-size': '13px',
                        'font-weight': 'bold',
                        'color': 'green',
                        'width': '300px'
                    }
                });
                full_text.innerHTML = TWCT.lang.automation_advert;
                full_text.injectInside(first_row);
            }
            first_row.injectInside(tbody);
            second_row.injectInside(tbody);
            tbody.injectInside(table);
            return table;
        } //Redefine task points calculation

        Tasks.reload_task_points = function (task_skills, malus, window) {
            var popups = [];
            return function () {
                var skills = Character.skills;
                var bonus_total = Character.bonus.skills_total;
                var sum = 0;
                var xhtml;
                for (var i = 0; i < 5; i++) {
                    var skill = task_skills[i];
                    xhtml = Character.skill_titles[skill].bold();
                    var val;
                    if (bonus_total[skill]) {
                        val = skills[skill] + bonus_total[skill];
                        xhtml += ': ' + val;
                        xhtml += ' (' + skills[skill] + ' + <span style="color:#00d;">' + bonus_total[skill] + '</span>)';
                    } else {
                        val = skills[skill];
                        xhtml += ': ' + val;
                    }
                    if (popups[i] == undefined) {
                        popups[i] = new MousePopup(xhtml, 250, {
                            opacity: 0.9
                        });
                        $E('.task_skill_' + i, window).addMousePopup(popups[i]);
                    } else {
                        popups[i].setXHTML(xhtml);
                    }
                    $E('.task_skill_' + i, window).setAttribute('src', skill_box_src(skill, val, bonus_total[skill]));
                    sum += val;
                }
                $E('.task_sum', window).setAttribute('src', 'img.php?type=task_points&subtype=plus&value=' + sum);
                $E('.task_task_points', window).setAttribute('src', 'img.php?type=task_points&subtype=equal&value=' + (sum - malus));
                $E('.task_control', window).setStyle('display', (sum - malus) > 0 ? 'block' : 'none');
                $E('.task_low_points', window).setStyle('display', (sum - malus) > 0 ? 'none' : 'block');
                $E('.missing_task_point_notice', window).innerHTML = s(TWCT.lang.missing_labor_points, Math.abs((sum - malus) - 1));
            };
        }
    };

    var translate_employer_window = function () {
        Saloon.request_employer_update = function (employer) {
            new Ajax('game.php?window=building_saloon&ajax=get_saloon_employer', {
                method: 'post',
                data: {
                    employer: employer
                },
                onComplete: function (data) {
                    data = Json.evaluate(data);

                    var page = document.createElement('div');
                    page.innerHTML = data;

                    //Translate employer name and text
                    page.getElementsByTagName('h2')[0].parentNode.innerHTML = '<h2>' +
                        TWCT.lang.employers[employer].name + '</h2>' + TWCT.lang.employers[employer].text;

                    //Translate table headers
                    var headers = page.getElementsByClassName('questlog_header');

                    //Translate only when exsts
                    for (var i = 0; i < headers.length; i++) {
                        headers[i].innerHTML = headers[i].innerHTML.replace('Open quests', TWCT.lang.open_quests)
                            .replace('Completed quests', TWCT.lang.completed_quests);
                    }

                    //Iterate through all quests and translate them
                    var quest_entries = page.getElementsByClassName('questlog_entrie');

                    for (var i = 0; i < quest_entries.length; i++) {
                        //Get quest link
                        var quest_link = quest_entries[i].getChildren()[0];
                        //Retrieve quest id
                        var quest_id = parseInt((/\{quest_id:(\d+)\}/g).exec(quest_link.href)[1]);
                        //Get quest translation from id
                        //var quest_translation = basic.findQuestTranslationByID(quest_id);
                        var quest_translation = null;
                        //Check whether translation available
                        if (quest_translation == null) {
                            continue;
                        }
                        quest_link.innerHTML = quest_translation.questline + ' (' + quest_translation.name + ')';
                    }


                    $('tab_saloon').innerHTML = page.innerHTML;
                }.bind(this)
            }).request();
        };
    };

    //Translate all game items
    var translate_items = function () {
        //Redefine item popup
        ItemPopup.prototype.getXHTML = function () {
            var item = this.item_obj;
            //Retrieve item translation object for item
            //var item_translation = basic.findItemTranslationByID(item.item_id);
            var item_translation = null;
            //Check whether a translation was found
            if (item_translation == null) {
                //Translation not found, take original strings into translation object
                item_translation = {
                    item_id: item.id,
                    name: item.name,
                    description: item.description
                };
            }
            var xhtml = '<table class="item_popup"><tr>';
            xhtml += '<td style="padding-right:10px;"><div class="';
            var type_class;
            switch (item.type) {
                case 'right_arm':
                case 'left_arm':
                case 'body':
                    type_class = 'item_popup_arms_bg';
                    break;
                case 'head':
                case 'foot':
                case 'animal':
                    type_class = 'item_popup_head';
                    break;
                case 'neck':
                case 'yield':
                    type_class = 'item_popup_yield';
                    break;
                default:
                    throw new Error('no such type');
                    break;
            }
            xhtml += type_class;
            xhtml += '"><img src="' + item.image + '" alt="" />';
            xhtml += '</div></td>';
            xhtml += '<td><span class="item_popup_title">';
            xhtml += item_translation.name;
            xhtml += '</span>';
            xhtml += '<span class="item_popup_type">';
            var item_type_title = TWCT.lang.item_slots;
            var item_sub_title = TWCT.lang.weapon_types;
            xhtml += item_translation.description ? item_translation.description : item_type_title[item.type] + ((item.sub_type !== undefined) ? ' (' + item_sub_title[item.sub_type] + ')' : '');
            xhtml += '</span>';
            if (item.damage) {
                xhtml += '<span class="item_popup_damage">' + item.damage.damage_min + '-' + item.damage.damage_max + ' ' + TWCT.lang.damage + '<br /></span><br />';
            }
            if ($type(item.bonus.attributes) == 'object') {
                xhtml += '<span class="item_popup_bonus_attr">';
                for (var attr in item.bonus.attributes) {
                    var attr_title = Character.attribute_titles[attr];
                    xhtml += (item.bonus.attributes[attr] > 0 ? '+' : '') + item.bonus.attributes[attr] + ' ' + attr_title + '<br />';
                }
                xhtml += '</span><br />';
            }
            if ($type(item.bonus.skills) == 'object') {
                xhtml += '<span class="item_popup_bonus_skill">';
                for (var skill in item.bonus.skills) {
                    var skill_title = Character.skill_titles[skill];
                    xhtml += (item.bonus.skills[skill] > 0 ? '+' : '') + item.bonus.skills[skill] + ' ' + skill_title + '<br />';
                }
                xhtml += '</span><br />';
            }
            if (item.speed) {
                xhtml += '<span class="item_popup_bonus">';
                xhtml += TWCT.lang.speed + ': ' + (item.speed <= 1 ? '+' : '') + Math.round(Character.default_speed / (Character.default_speed * item.speed) * 100 - 100) + '%<br />';
                xhtml += '</span><br />';
            }
            xhtml += '<span class="item_popup_trader_price">' + TWCT.lang.purchase_price + ':' + ' ' + item.price + ' $</span><br />';
            xhtml += '<span class="item_popup_trader_price">' + TWCT.lang.sales_price + ':' + ' ' + item.sell_price + ' $</span>';
            if (item.level)
                xhtml += '<span class="item_popup_level' + (Character.level < item.level ? ' item_popup_level_too_low' : '') + '">' + TWCT.lang.requires_level + ' ' + item.level + '</span>';
            else
                xhtml += '<br />';
            xhtml += '<br /></td></tr></table>';
            return xhtml;
        };
    };

    //Translate the character window
    var translate_character_window = function (params, data) {

        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        var stats = page.getElementsByTagName('th');

        //Translate stats
        for (var i = 0; i < stats.length; i++) {
            stats[i].innerHTML = TWCT.lang.character_stats[i];
        }

        return {
            page: page.innerHTML,
            js: data.js
        };
    };

    //Translate the skill window
    var translate_skill_window = function (params, data) {
        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        //Translate reskill overview
        page.getElementsByClassName('skill_content_reskill_title')[0].innerHTML =
            TWCT.lang.change_attributes_and_skills;
        page.getElementsByClassName('skill_icon_reskill_current')[0].innerHTML =
            TWCT.lang.costs_current + ':';
        page.getElementsByClassName('skill_icon_reskill_attribute')[0].innerHTML =
            TWCT.lang.costs_attributes + ':';
        page.getElementsByClassName('skill_icon_reskill_skill')[0].innerHTML =
            TWCT.lang.costs_skills + ':';

        //Translate skill overview
        page.getElementsByClassName('skill_content_reskill_title')[1].innerHTML =
            TWCT.lang.assign_attributes_and_skills;
        page.getElementsByClassName('skill_icon_reskill_attribute')[1].innerHTML =
            TWCT.lang.skilled_attributes + ':';
        page.getElementsByClassName('skill_icon_reskill_skill')[1].innerHTML =
            TWCT.lang.skilled_skills + ':';

        //Skill button labels
        var label_cells = page.getElementsByTagName('td');
        label_cells[2].innerHTML = TWCT.lang.attributes;
        label_cells[3].innerHTML = TWCT.lang.skills;

        //Buttons
        var all_images = page.getElementsByTagName('img');
        for (var i = all_images.length - 1; i >= 0; i--) {
            if (all_images[i].id == 'skill_reskill_confirm_button') {
                basic.replaceWestButton(all_images[i], TWCT.lang.confirm);
            } else if (all_images[i].id == 'skill_reskill_cancel_button') {
                basic.replaceWestButton(all_images[i], TWCT.lang.cancel);
            }
        }

        //Translate attributes
        var table_cells = page.getElementsByClassName('skill_attribute_skills')[0].getElementsByTagName('td');
        table_cells[1].innerHTML = TWCT.lang.attribute_names['strength'];
        table_cells[3].innerHTML = TWCT.lang.attribute_names['flexibility'];
        table_cells[5].innerHTML = TWCT.lang.attribute_names['dexterity'];
        table_cells[7].innerHTML = TWCT.lang.attribute_names['charisma'];

        return {
            page: page.innerHTML,
            js: data.js
        };
    };

    //Translate the inventory window
    var translate_inventory_window = function (params, data) {
        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        //Translate heading
        page.getElementsByTagName('h2')[0].innerHTML = TWCT.lang.backpack;

        return {
            page: page.innerHTML,
            js: data.js
        };
    };

    //Translate the job window
    var translate_job_window = function (params, data) {

        //Retrieve job id
        var job = WMap.mapData.jobs.obj[params.x][params.y].job_id;

        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        //Job name
        page.getElementsByTagName('h2') [0].innerHTML = TWCT.lang.jobs[job - 1].name;
        //Job description
        page.getElementsByClassName('jobDescription') [0].innerHTML = TWCT.lang.jobs[job - 1].desc;
        //Retrieve skill display headings to translate them afterwards
        var skill_display_headings = page.getElementsByClassName('job_points_div') [0].getElementsByTagName('th');
        //Used skill points
        skill_display_headings[0].innerHTML = TWCT.lang.used_skill_points;
        //Difficulty
        skill_display_headings[1].innerHTML = TWCT.lang.difficulty;
        //Labor points
        skill_display_headings[2].innerHTML = TWCT.lang.labor_points;
        //Current assignments
        page.getElementsByClassName('task_queue_container') [0].children[0].innerHTML = TWCT.lang.current_assignments;
        //Translate notice that labor points are missing
        //Retrieve labor points
        var labor_points = parseInt(page.getElementsByClassName('task_task_points') [0].getAttribute('alt'));
        //Translate job warning (not enough labor points)
        page.getElementsByClassName('missing_task_point_notice') [0].innerHTML = TWCT.lang.missing_labor_points.replace('%1', (labor_points) * ( -1) + 1);
        var small_warning = page.getElementsByClassName('missing_task_point_notice') [0].parentElement;
        small_warning.innerHTML = small_warning.innerHTML.replace('To work on a job you need at least' +
                                                                  ' one labor point.', TWCT.lang.at_least_one_labor_point);
        //Translate job attributes in javascript using regex
        //Wages
        data.js = data.js.replace(/MousePopup\('<strong>Wages:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.wage_description + '\'');
        //Experience
        data.js = data.js.replace(/MousePopup\('<strong>Experience:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.experience_description + '\'');
        //Luck
        data.js = data.js.replace(/MousePopup\('<strong>Luck:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.luck_description + '\'');
        //Danger
        data.js = data.js.replace(/MousePopup\('<strong>Danger:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.danger_description + '\'');
        //Motivation
        data.js = data.js.replace(/MousePopup\('<strong>Motivation:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.motivation_description + '\'');

        //Sum of the 5 Skills
        data.js = data.js.replace(/MousePopup\('<strong>Sum of the 5 Skills:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.skill_sum_description + '\'');
        //Difficulty
        data.js = data.js.replace(/MousePopup\('<strong>Difficulty of the job:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.difficulty_description + '\'');
        //Labor points
        data.js = data.js.replace(/MousePopup\('<strong>Labor points:.*'/g, 'MousePopup(\'' +
                                  TWCT.lang.labor_points_description + '\'');

        //Product find chance
        data.js = data.js.replace(/MousePopup\('The probability to find the item\<br \/\>within 30 minutes of work is\D*/g, 'MousePopup(\'' +
                                  TWCT.lang.product_find_chance);


        //Container for starting job
        var begin_work_elements = page.getElementsByClassName('start_div')[0].getChildren();
        //Begin work
        begin_work_elements[0].innerHTML = TWCT.lang.begin_work;
        //Table elements for starting job
        var begin_work_table_elements = begin_work_elements[3].getElementsByTagName('td');
        //Distance
        begin_work_table_elements[0].innerHTML = TWCT.lang.distance;
        //Duration
        begin_work_table_elements[3].innerHTML = TWCT.lang.duration;

        //Work time
        if (page.getElementsByTagName('select').length > 0) {
            var work_time_options = page.getElementsByTagName('select')[0].getChildren();
            for (var i = 0; i < work_time_options.length; i++) {
                work_time_options[i].innerHTML = TWCT.lang.work_time[i];
                work_time_options[i].label = TWCT.lang.work_time[i];
            }
        }


        //Start button
        var imgs = page.getElementsByTagName('img');
        for (var i = 0; i < imgs.length; i++) {
            //Look for the image with the concerning id
            if (imgs[i].id == 'button_start_task') {
                basic.replaceWestButton(imgs[i], TWCT.lang.ok);
            }
        }

        return {
            page: page.innerHTML,
            js: data.js
        };
    };


    //Translate saloon window
    var translate_saloon_window = function (params, data) {
        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        //Translate side bar
        page.getElementsByTagName('a')[0].innerHTML = TWCT.lang.saloon;
        page.getElementsByTagName('a')[1].innerHTML = TWCT.lang.questbook;

        return {
            page: page.innerHTML,
            js: data.js
        };
    };
    //Translate quest window
    var translate_quest_window = function (params, data) {
        //Fetch and wrap page content
        var page = document.createElement('div');
        page.innerHTML = data.page;

        //Translate buttons
        var images = page.getElementsByTagName('img');
        for (var i = images.length - 1; i >= 0; i--) {
            switch (images[i].id) {
                case 'button_quest_accept':
                    basic.replaceWestButton(images[i], TWCT.lang.accept_quest);
                    break;
                case 'button_quest_finish':
                    basic.replaceWestButton(images[i], TWCT.lang.finish_quest);
                    break;
                case 'button_quest_cancel':
                    basic.replaceWestButton(images[i], TWCT.lang.cancel_quest);
                    break;
            }
        }

        //Look up the regarding quest
        //var quest = basic.findQuestTranslationByID(params.quest_id);
        var quest = null;

        //Check for null (quest not found) - if so, don't change anything

        if (quest == null) {
            return {
                page: page.innerHTML,
                js: data.js
            }
        }

        //Quest found, continue with the translation
        //Retrieve quest content
        var quest_content = page.getElementsByTagName('div')[0];
        //Get employer's image source
        var employer_src = page.getElementsByClassName('shadow_content')[0].getChildren()[0].src;
        //Retrieve employer name
        quest.employer = employer_src.substring(employer_src.lastIndexOf("/") + 1, employer_src.lastIndexOf(".png"));

        //Change title
        page.getElementsByTagName('h3')[0].innerHTML = quest.questline + ' (' + quest.name + ')';
        //Build up quest sring
        var quest_string = '<strong>' + TWCT.lang.employers[quest.employer].name + ':<\/strong> ';
        quest_string += quest.text;
        quest_string += '<br\/><br\/><strong>' + TWCT.lang.target + ':<\/strong> ';
        quest_string += quest.target;

        //Check whether there is a hint
        if (quest.hint != null && quest.hint != '') {
            quest_string += '<br\/><br\/><strong>' + TWCT.lang.hint + ':<\/strong> ';
            quest_string += '<i>' + quest.hint + '</i>';
        }

        quest_string += '<br\/><br\/><strong>' + TWCT.lang.requires + ':';

        //Replace quest text with translation
        quest_content.innerHTML = quest_content.innerHTML.replace(/<strong>(.|\n)*<strong>Requires\:/g, quest_string);

        //Perform further translations:
        quest_content.innerHTML = quest_content.innerHTML.replace('(Done)', '(' + TWCT.lang.done + ')')
            .replace('Reward:', TWCT.lang.reward + ':');

        //Translate finish text
        data.js = data.js.replace(/\.completion_text = \'.+\'\;/g, '.completion_text = \'' + quest.finish_text + '\';');

        return {
            page: page.innerHTML,
            js: data.js
        };
    };


    //Performs AjaxWindow injection for handling AjaxWindow events
    var inject_ajax_window = function (handler_character_window, handler_skill_window, handler_inventory_window, handler_job_window, handler_saloon_window, handler_quest_window) {
        //Called when Ajax window has to be opened. Manages the request and calls a matching user function given as
        //parameter in order to manipulate the html or javascript data for translation purposes
        var inject_handler = function (name, params, data) {
            //data.page contains the html page
            //data.js contains the javascript
            if (typeof data.page === 'undefined') {
                return data;
            }
            switch (name) {
                case 'character':
                    if (handler_character_window == null) {
                        return data;
                    }
                    return handler_character_window(params, data);
                case 'skill':
                    if (handler_skill_window == null) {
                        return data;
                    }
                    return handler_skill_window(params, data);
                case 'inventory':
                    if (handler_inventory_window == null) {
                        return data;
                    }
                    return handler_inventory_window(params, data);
                case 'job':
                    if (handler_job_window == null) {
                        return data;
                    }
                    return handler_job_window(params, data);
                case 'building_saloon':
                    if (handler_saloon_window == null) {
                        return data;
                    }
                    return handler_saloon_window(params, data);
                case 'quest':
                    if (handler_quest_window == null) {
                        return data;
                    }
                    return handler_quest_window(params, data);
                default:
                    return data;
            }
            return data;
        };
        AjaxWindow.show = function (name, params, appendName) {
            var extendeName = name + ($defined(appendName) ? ('_' + appendName) : '');
            var params_str = '';
            if ($defined(params)) {
                for (var param in params) {
                    params_str += '&' + param + '=' + params[param];
                }
            }
            if (!AjaxWindow.windows[extendeName]) {
                var window_div = new Element('div', {
                    'id': 'window_' + extendeName,
                    'class': 'window'
                });
                AjaxWindow.windows[extendeName] = window_div;
                var xhtml = '<div class="window_borders">';
                xhtml += '<h2 id="window_' + extendeName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=' + name + ');"><span>' + extendeName + '</span></h2>';
                xhtml += '<a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a><a href="javascript:AjaxWindow.toggleSize(\'' + extendeName + '\');" class="window_minimize"></a><a href="javascript:AjaxWindow.close(\'' + extendeName + '\');" class="window_close"></a>';
                xhtml += '<div id="window_' + extendeName + '_content" class="window_content"></div>';
                xhtml += '</div>';
                window_div.setHTML(xhtml);
                window_div.bringToTop();
                window_div.injectInside('windows');
                window_div.centerLeft();
                var window_title_div = $('window_' + extendeName + '_title');
                window_title_div.addEvent('dblclick', function () {
                    window_div.centerLeft();
                    window_div.setStyle('top', 133);
                });
                window_div.makeDraggable({
                    handle: window_title_div,
                    onStart: function () {
                    },
                    onComplete: function () {
                    }.bind(this)
                });
                window_div.addEvent('mousedown', window_div.bringToTop.bind(window_div, []));
                window_title_div.addEvent('mousedown', window_div.bringToTop.bind(window_div, []));
            } else {
                AjaxWindow.maximize(extendeName);
                AjaxWindow.windows[extendeName].bringToTop();
            }
            AjaxWindow.setThrobber(extendeName);
            new Ajax('game.php?window=' + name + params_str, {
                method: 'post',
                data: {},
                onComplete: function (data) {
                    data = Json.evaluate(data);
                    var modified = inject_handler(name, params, data);
                    if (modified.page != undefined) {
                        AjaxWindow.setJSHTML($('window_' + extendeName + '_content'), modified.page);
                    }
                    if (modified.js != undefined) {
                        eval(modified.js);
                    }
                }.bind(this)
            }).request();
        }
    };
    //Main function that performs all translations in row
    TWCT.run = function () {

        function translate_outgame() {
            //Check whether in forum
            if (document.location.pathname.indexOf('forum.php') !== -1) {
                //In forum
                translate_townforum();
            } else if (document.location.pathname.indexOf('help.php') !== -1) {
                translate_help();
            }
            else {

                //Not ingame and not in forum, translate general start page strings
                translate_startpage();

                // Check for current page for further translation
                if (document.location.search.indexOf('page=register&mode=choose_world') !== -1) {
                    //Choose world page
                    translate_chooseworldpage();
                }
                else if (document.location.search.indexOf('page=register') !== -1) {
                    //Register page
                    translate_registerpage();
                } else if (document.location.search.indexOf('page=change_password') !== -1) {
                    //Change password page
                    translate_changepwpage();
                }
                else {
                    //Login page
                    translate_loginpage();
                }
            }
        }

        function translate_ingame() {
            //Initialize ingame basics
            init();

            var handler_character_window = translate_character_window;
            var handler_skill_window = translate_skill_window;
            var handler_inventory_window = translate_inventory_window;
            var handler_job_window = translate_job_window;
            var handler_saloon_window = translate_saloon_window;
            var handler_quest_window = translate_quest_window;

            //Perform ajax window inject
            inject_ajax_window(handler_character_window, handler_skill_window, handler_inventory_window, handler_job_window, handler_saloon_window, handler_quest_window);
            //Perform translations
            translate_general();
            translate_map();
            translate_main_window();
            translate_main_menu();
            translate_task_queue();
            translate_employer_window();
            translate_items();
        }


        //Show throbber
        throbber.show();

        //Load translations from web server and wait until everything is loaded, then call back
        load_translations(function () {
            //Check whether ingame
            if (document.location.pathname.indexOf('game.php') == -1) {
                //Not ingame, start translation of start page etc.
                translate_outgame();
            } else {
                //Ingame, start ingame translation
                translate_ingame();
            }

            //Hide throbber
            window.setTimeout(function () {
                throbber.hide()
            }, 1000);
        });
    };
    //Finally execute the whole translation process, execute main function
    TWCT.run();
}
;
//Wait until DOM is ready and inject script
window.onload = function () {
    contentEval(TWCT);
};