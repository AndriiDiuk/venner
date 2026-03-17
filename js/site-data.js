/**
 * site-data.js — единый источник сквозных данных сайта Venner Digital.
 * Все повторяющиеся тексты, контакты, ссылки и блоки правятся ТОЛЬКО здесь.
 */

const SITE = {

  /* ── Базовый путь (авто: /venner/ на GitHub Pages, / — локально и на продакшене) ── */
  basePath: location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'
    : '/venner/',

  /* ── Компания ─────────────────────────────────────────── */
  company: {
    name:      'Venner Digital',
    fullName:  'Venner Digital — веб-студия и маркетинг',
    tagline:   'Разработка сайтов под ключ, SEO-продвижение, Яндекс.Директ, лидогенерация, amoCRM и интеграции.',
    since:     2013,
    domain:    'https://venner.ru',
    city:      'Тюмень',
    address:   'г. Тюмень',
    inn:       '',
    ogrn:      '',
  },

  
  /* ── Контакты ─────────────────────────────────────────── */
  contacts: {
    phone:        '+7 (952) 807-06-01',
    phoneHref:    'tel:+79528070601',
    email:        'info@venner.ru',
    emailHref:    'mailto:info@venner.ru',
    whatsapp:     'https://wa.me/79528070601',
    telegram:     'https://t.me/venner_digital',
    max:          '#',
  },

  /* ── Соцсети / справочники ────────────────────────────── */
  socials: {
    '2gis':       'https://go.2gis.com/5jz0t',
    yandexMaps:   'https://yandex.ru/maps/-/CLFfeFlq',
    googleMaps:   'https://share.google/c7P8pB5455lXr8eku',
    zoon:         'https://zoon.ru/s/MkP9sQ',
    flamp:        'http://flamp.ru/venner',
  },

  /* ── Отзывы ────────────────────────────────────────────── */
  reviews: {
    feedUrl: 'https://feed.myreviews.ru/firm/47664/preview?from=short-link',
    count:   '200+',
  },

  /* ── Главное меню ─────────────────────────────────────── */
  menu: [
    {
      label: 'Создание сайтов',
      href: '/sozdanie-saytov/',
      children: [
        { label: 'Лендинг под ключ',       href: '/sozdanie-saytov/lending-page/' },
        { label: 'Интернет-магазин',        href: '/sozdanie-saytov/internet-magazin/' },
        { label: 'Сайт-квиз',              href: '/sozdanie-saytov/kviz-sayt/' },
        { label: 'Сайт на WordPress',       href: '/sozdanie-saytov/sayt-na-wordpress/' },
        { label: 'Сайт на 1С-Битрикс',     href: '/sozdanie-saytov/sayt-na-1c-bitrix/' },
        { label: 'Сайт на OpenCart',        href: '/sozdanie-saytov/sayt-na-opencart/' },
        { label: 'HTML-сайт',              href: '/sozdanie-saytov/sayt-na-html/' },
        { label: 'Прототип сайта',          href: '/sozdanie-saytov/prototip-sayta/' },
        { label: 'Веб-дизайн',             href: '/sozdanie-saytov/veb-dizayn-sayta/' },
        { label: 'Верстка сайта',           href: '/sozdanie-saytov/verstka-sayta/' },
        { label: 'Редизайн сайта',          href: '/sozdanie-saytov/redizayn-sayta/' },
        { label: 'Аренда сайта',            href: '/sozdanie-saytov/arenda-sayta/' },
        { label: 'Технический аудит',       href: '/sozdanie-saytov/tehnicheskij-audit-sayta/' },
      ],
    },
    {
      label: 'Яндекс.Директ',
      href: '/yandex-direct/',
      children: [
        { label: 'Ведение Директа',        href: '/yandex-direct/vedenie/' },
        { label: 'Аудит Директа',           href: '/yandex-direct/audit/' },
        { label: 'Аренда кампаний',         href: '/yandex-direct/arenda/' },
      ],
    },
    {
      label: 'SEO',
      href: '/seo/',
      children: [
        { label: 'Семантическое ядро',      href: '/seo/semanticheskoe-yadro/' },
        { label: 'Продвижение сайта',       href: '/seo/prodvizhenie-sayta/' },
        { label: 'Оптимизация сайта',       href: '/seo/optimizaciya-sayta/' },
        { label: 'SEO-аудит сайта',         href: '/seo/audit-sayta/' },
        { label: 'SERM и репутация',        href: '/seo/serm-reputaciya/' },
        { label: 'SEO-блог',               href: '/seo/blog/' },
        { label: 'SEO-копирайтинг',        href: '/seo/kopirajting/' },
        { label: 'Topvisor',               href: '/seo/topvisor/' },
      ],
    },
    {
      label: 'CRM и интеграции',
      href: '/crm-integracii/',
      children: [
        { label: 'amoCRM',                 href: '/crm-integracii/amocrm/' },
        { label: 'Bitrix24',               href: '/crm-integracii/bitrix24/' },
        { label: 'Wazzup',                 href: '/crm-integracii/wazzup/' },
        { label: 'Radist.Online',           href: '/crm-integracii/radist-online/' },
        { label: 'ChatApp',                href: '/crm-integracii/chatapp/' },
        { label: 'Мои Звонки',             href: '/crm-integracii/moi-zvonki/' },
      ],
    },
    {
      label: 'Avito',
      href: '/avito/',
      children: [
        { label: 'Оформление и оптимизация', href: '/avito/oformlenie-i-optimizaciya/' },
        { label: 'Продвижение и аналитика',  href: '/avito/prodvizhenie-i-analitika/' },
      ],
    },
    {
      label: 'Лидогенерация',
      href: '/lidogeneraciya/',
      children: [
        { label: 'Marquiz',                href: '/lidogeneraciya/marquiz/' },
        { label: 'MyReviews',              href: '/lidogeneraciya/myreviews/' },
        { label: 'Репутация в справочниках', href: '/lidogeneraciya/servisy-reputacii/' },
      ],
    },
  ],

  /* ── Дополнительное меню ──────────────────────────────── */
  menuExtra: [
    { label: 'Заказ услуги',  href: '/zakaz-uslugi/' },
    { label: 'О компании',    href: '/o-kompanii/' },
    { label: 'Цены',          href: '/ceny/' },
    { label: 'Отзывы',        href: '/otzyvy/' },
    { label: 'Портфолио',     href: '/portfolio/' },
    { label: 'Хостинг',       href: '/hosting/' },
    { label: 'Контакты',      href: '/kontakty/' },
    { label: 'Блог',          href: '/blog/' },
  ],

  /* ── CTA-кнопки (сквозные) ───────────────────────────── */
  cta: {
    calc:    { label: 'Рассчитать стоимость', href: '/zakaz-uslugi/' },
    order:   { label: 'Заказать сайт',        href: '/zakaz-uslugi/' },
    request: { label: 'Оставить заявку',      href: '/zakaz-uslugi/' },
    discuss: { label: 'Обсудить проект',      href: '/kontakty/' },
    call:    { label: 'Позвонить',            href: 'tel:+79528070601' },
  },

  /* ── Юридические ссылки ───────────────────────────────── */
  legal: [
    { label: 'Политика конфиденциальности',              href: '/privacy-policy/' },
    { label: 'Согласие на обработку персональных данных', href: '/consent/' },
    { label: 'Публичная оферта',                         href: '/oferta/' },
    { label: 'Условия соглашения',                       href: '/terms/' },
    { label: 'Отказ от ответственности',                 href: '/disclaimer/' },
    { label: 'Политика cookies',                         href: '/cookies/' },
  ],

  /* ── Мессенджеры (для блока «Связаться с нами») ──────── */
  messengers: [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/79528070601',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M7.5 3.5A9 9 0 1 1 5 19l-1 3 3-1a9 9 0 0 1 .5-17.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    },
    {
      name: 'Telegram',
      href: 'https://t.me/venner_digital',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 5L3 12l7 2 2 7 4-6 5-10Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    },
    {
      name: 'Max',
      href: '#',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h10v10H7z" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9z" stroke="currentColor" stroke-width="2"/></svg>',
    },
  ],

  /* ── Формат работы (FAQ аккордеон) ────────────────────── */
  workFormat: [
    {
      title: '1) Диагностика и цель',
      text:  'Смотрим текущую ситуацию, уточняем вводные и фиксируем цель: заявки, стоимость лида, конверсия, окупаемость.',
    },
    {
      title: '2) План и смета',
      text:  'Предлагаем варианты решения — от быстрого старта до комплексной стратегии. Этапы и сроки — прозрачно и по делу.',
    },
    {
      title: '3) Запуск и докрутка',
      text:  'Реализуем, измеряем и улучшаем. Если нужно — подключаем квиз, CRM-автоматизацию и репутацию, чтобы заявки доходили до сделки.',
    },
  ],

  /* ── КПИ / бейджи на главной ──────────────────────────── */
  kpis: [
    '13+ лет на рынке (с 2013)',
    '10+ лет SEO и перфоманс',
    'Контент и офферы делаем сами',
    'Гипотезы из собственных бизнесов',
    '200+ отзывов на картах и 2ГИС',
  ],

  /* ── Этапы работы «под ключ» ──────────────────────────── */
  steps: [
    { title: 'Разбираем спрос и конкурентов',  text: 'Собираем логику страниц, сценарии заявок и точки доверия.' },
    { title: 'Делаем контент, который продает', text: 'Заголовки, офферы, тексты, CTA, блоки доверия — под вашу целевую аудиторию.' },
    { title: 'Запускаем с аналитикой и целями', text: 'Метрика, цели, события, проверка форм и качества заявок.' },
    { title: 'Подключаем трафик и лидогенерацию', text: 'SEO, Яндекс.Директ, квизы (Marquiz), отзывы (MyReviews) и при необходимости CRM.' },
  ],

  /* ── Текст согласия ПДн (для форм) ───────────────────── */
  consentText: 'Нажимая кнопку, вы соглашаетесь с <a href="/privacy-policy/">политикой конфиденциальности</a> и даёте <a href="/consent/">согласие на обработку персональных данных</a>.',

  /* ── Копирайт ─────────────────────────────────────────── */
  copyright: '© {year} Venner Digital. Все права защищены.',
};
