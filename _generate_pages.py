#!/usr/bin/env python3
"""Generate service pages for Venner Digital from source HTML files."""

import re
import os

BASE = "/Users/andrii/Git Hub/info"
OUT = f"{BASE}/venner-digital"

PAGES = [
    # (source_file, output_path, title, description, parent_name, parent_path, breadcrumb_name, slug)
    # === 1. Создание сайтов ===
    ("1-Разработка сайтов/0-sozdanie-saytov.html", "sozdanie-saytov/index.html",
     "Создание сайтов под ключ", "Разработка сайтов под ключ: лендинги, интернет-магазины, WordPress, 1С-Битрикс, OpenCart. Упор на заявки, аналитику и рост.",
     None, None, "Создание сайтов", "sozdanie-saytov"),
    ("1-Разработка сайтов/1-lending-page.html", "sozdanie-saytov/lending-page/index.html",
     "Разработка Landing Page под ключ", "Создание лендинга под ключ: структура, контент, дизайн, верстка, аналитика.",
     "Создание сайтов", "/sozdanie-saytov/", "Landing Page", "lending-page"),
    ("1-Разработка сайтов/2-internet-magazin.html", "sozdanie-saytov/internet-magazin/index.html",
     "Интернет-магазин под ключ", "Разработка интернет-магазина: каталог, корзина, оплата, доставка, SEO-основа.",
     "Создание сайтов", "/sozdanie-saytov/", "Интернет-магазин", "internet-magazin"),
    ("1-Разработка сайтов/3-kviz-sayt.html", "sozdanie-saytov/kviz-sayt/index.html",
     "Сайт-квиз под ключ", "Создание сайта-квиза: сценарий, вопросы, дизайн, аналитика, интеграции.",
     "Создание сайтов", "/sozdanie-saytov/", "Сайт-квиз", "kviz-sayt"),
    ("1-Разработка сайтов/4-sayt-na-wordpress.html", "sozdanie-saytov/sayt-na-wordpress/index.html",
     "Разработка сайта на WordPress под ключ", "Создание сайта на WordPress: админка, плагины, SEO, безопасность.",
     "Создание сайтов", "/sozdanie-saytov/", "Сайт на WordPress", "sayt-na-wordpress"),
    ("1-Разработка сайтов/5-sayt-na-1c-bitrix.html", "sozdanie-saytov/sayt-na-1c-bitrix/index.html",
     "Разработка сайта на 1С-Битрикс под ключ", "Создание сайта на 1С-Битрикс: корпоративные порталы, интернет-магазины, интеграции с 1С.",
     "Создание сайтов", "/sozdanie-saytov/", "Сайт на 1С-Битрикс", "sayt-na-1c-bitrix"),
    ("1-Разработка сайтов/6-sayt-na-opencart.html", "sozdanie-saytov/sayt-na-opencart/index.html",
     "Разработка интернет-магазина на OpenCart под ключ", "Интернет-магазин на OpenCart: каталог, оплата, доставка, CRM-интеграции.",
     "Создание сайтов", "/sozdanie-saytov/", "Сайт на OpenCart", "sayt-na-opencart"),
    ("1-Разработка сайтов/7-sayt-na-html.html", "sozdanie-saytov/sayt-na-html/index.html",
     "Разработка сайта на чистом HTML под ключ", "Сайт на чистом HTML/CSS/JS: максимальная скорость, гибкость, безопасность.",
     "Создание сайтов", "/sozdanie-saytov/", "Сайт на HTML", "sayt-na-html"),
    ("1-Разработка сайтов/8-prototip-sayta.html", "sozdanie-saytov/prototip-sayta/index.html",
     "Прототипирование сайта под ключ", "Прототип сайта: структура, логика, UX, согласование до дизайна.",
     "Создание сайтов", "/sozdanie-saytov/", "Прототип сайта", "prototip-sayta"),
    ("1-Разработка сайтов/9-veb-dizayn-sayta.html", "sozdanie-saytov/veb-dizayn-sayta/index.html",
     "Веб-дизайн сайта", "Веб-дизайн сайта: UX-логика, визуал, Figma, подготовка к верстке.",
     "Создание сайтов", "/sozdanie-saytov/", "Веб-дизайн", "veb-dizayn-sayta"),
    ("1-Разработка сайтов/10-verstka-sayta.html", "sozdanie-saytov/verstka-sayta/index.html",
     "Верстка сайтов", "Верстка сайтов: адаптив, скорость, SEO-метаданные, анимации, интеграции.",
     "Создание сайтов", "/sozdanie-saytov/", "Верстка сайта", "verstka-sayta"),
    ("1-Разработка сайтов/11-redizayn-sayta.html", "sozdanie-saytov/redizayn-sayta/index.html",
     "Редизайн сайта под ключ", "Редизайн сайта: обновление дизайна, UX, контента и техчасти. Сохранение SEO.",
     "Создание сайтов", "/sozdanie-saytov/", "Редизайн сайта", "redizayn-sayta"),
    ("1-Разработка сайтов/12-arenda-sayta.html", "sozdanie-saytov/arenda-sayta/index.html",
     "Аренда готового сайта", "Аренда готового сайта: быстрый старт без больших вложений. Домен, хостинг, поддержка включены.",
     "Создание сайтов", "/sozdanie-saytov/", "Аренда сайта", "arenda-sayta"),
    ("1-Разработка сайтов/13-tekhnicheskij-audit-sayta.html", "sozdanie-saytov/tehnicheskij-audit-sayta/index.html",
     "Технический аудит сайта", "Технический аудит сайта: скорость, SEO, безопасность, ошибки CMS. Отчет и план работ.",
     "Создание сайтов", "/sozdanie-saytov/", "Технический аудит", "tehnicheskij-audit-sayta"),
    # === 2. Яндекс.Директ ===
    ("2-Контекстная реклама/0-yandex-direct.html", "yandex-direct/index.html",
     "Настройка и ведение Яндекс.Директ", "Настройка и ведение Яндекс.Директ под ключ: аудит, запуск, оптимизация, отчеты.",
     None, None, "Яндекс.Директ", "yandex-direct"),
    ("2-Контекстная реклама/1-vedenie.html", "yandex-direct/vedenie/index.html",
     "Ведение Яндекс.Директ", "Ведение рекламных кампаний в Яндекс.Директ: оптимизация, тесты, отчеты, рост конверсии.",
     "Яндекс.Директ", "/yandex-direct/", "Ведение", "vedenie"),
    ("2-Контекстная реклама/2-audit.html", "yandex-direct/audit/index.html",
     "Аудит Яндекс.Директ", "Аудит рекламных кампаний в Яндекс.Директ: ошибки, потери бюджета, точки роста.",
     "Яндекс.Директ", "/yandex-direct/", "Аудит", "audit-yandex-direct"),
    ("2-Контекстная реклама/3-arenda.html", "yandex-direct/arenda/index.html",
     "Аренда рекламного кабинета Яндекс.Директ", "Аренда настроенного рекламного кабинета Яндекс.Директ: быстрый старт.",
     "Яндекс.Директ", "/yandex-direct/", "Аренда кабинета", "arenda-yandex-direct"),
    # === 3. SEO ===
    ("3-SEO/0-seo.html", "seo/index.html",
     "SEO-продвижение сайтов", "SEO-продвижение сайтов: аудит, семантика, оптимизация, контент, рост видимости.",
     None, None, "SEO", "seo"),
    ("3-SEO/1-semanticheskoe-yadro.html", "seo/semanticheskoe-yadro/index.html",
     "Сбор семантического ядра", "Сбор семантического ядра для сайта: кластеризация, структура, посадочные страницы.",
     "SEO", "/seo/", "Семантическое ядро", "semanticheskoe-yadro"),
    ("3-SEO/2-prodvizhenie-sayta.html", "seo/prodvizhenie-sayta/index.html",
     "Продвижение сайта в поисковых системах", "SEO-продвижение сайта: рост видимости, трафик из поиска, улучшение позиций.",
     "SEO", "/seo/", "Продвижение сайта", "prodvizhenie-sayta"),
    ("3-SEO/3-optimizaciya-sayta.html", "seo/optimizaciya-sayta/index.html",
     "SEO-оптимизация сайта", "Внутренняя и техническая SEO-оптимизация сайта: скорость, метаданные, структура.",
     "SEO", "/seo/", "Оптимизация сайта", "optimizaciya-sayta"),
    ("3-SEO/4-audit-sayta.html", "seo/audit-sayta/index.html",
     "SEO-аудит сайта", "SEO-аудит сайта: техническая проверка, анализ контента, ссылочный профиль.",
     "SEO", "/seo/", "SEO-аудит", "audit-sayta"),
    ("3-SEO/5-serm-reputaciya.html", "seo/serm-reputaciya/index.html",
     "SERM — управление репутацией в поиске", "SERM: мониторинг упоминаний, работа с отзывами, вытеснение негатива.",
     "SEO", "/seo/", "SERM и репутация", "serm-reputaciya"),
    ("3-SEO/6-blog.html", "seo/blog/index.html",
     "Ведение блога для SEO", "Ведение блога для SEO: контент-план, статьи под запросы, рост органического трафика.",
     "SEO", "/seo/", "Блог", "seo-blog"),
    ("3-SEO/7-kopirajting.html", "seo/kopirajting/index.html",
     "SEO-копирайтинг", "SEO-копирайтинг: тексты для сайтов и блогов, оптимизация под поисковые запросы.",
     "SEO", "/seo/", "Копирайтинг", "kopirajting"),
    ("3-SEO/8-topvisor.html", "seo/topvisor/index.html",
     "Мониторинг позиций в Topvisor", "Topvisor: мониторинг позиций сайта в поиске, отслеживание динамики, отчеты.",
     "SEO", "/seo/", "Topvisor", "topvisor"),
    # === 4. CRM и Интеграции ===
    ("4-CRM и Интеграции/0-crm-integracii.html", "crm-integracii/index.html",
     "CRM и интеграции", "Внедрение CRM и интеграции: amoCRM, Bitrix24, мессенджеры, телефония.",
     None, None, "CRM и интеграции", "crm-integracii"),
    ("4-CRM и Интеграции/1-amocrm.html", "crm-integracii/amocrm/index.html",
     "Внедрение и настройка amoCRM", "Настройка amoCRM под ключ: воронки продаж, автоматизация, интеграции.",
     "CRM и интеграции", "/crm-integracii/", "amoCRM", "amocrm"),
    ("4-CRM и Интеграции/2-bitrix24.html", "crm-integracii/bitrix24/index.html",
     "Внедрение и настройка Битрикс24", "Настройка Битрикс24 под ключ: CRM, задачи, коммуникации, интеграции.",
     "CRM и интеграции", "/crm-integracii/", "Битрикс24", "bitrix24"),
    ("4-CRM и Интеграции/3-wazzup.html", "crm-integracii/wazzup/index.html",
     "Интеграция Wazzup с CRM", "Wazzup: подключение WhatsApp и Telegram к CRM.",
     "CRM и интеграции", "/crm-integracii/", "Wazzup", "wazzup"),
    ("4-CRM и Интеграции/4-radist-online.html", "crm-integracii/radist-online/index.html",
     "Интеграция Radist.Online с CRM", "Radist.Online: мессенджеры и чат-боты в CRM.",
     "CRM и интеграции", "/crm-integracii/", "Radist.Online", "radist-online"),
    ("4-CRM и Интеграции/5-chatapp.html", "crm-integracii/chatapp/index.html",
     "Интеграция ChatApp с CRM", "ChatApp: подключение WhatsApp к CRM, массовые рассылки.",
     "CRM и интеграции", "/crm-integracii/", "ChatApp", "chatapp"),
    ("4-CRM и Интеграции/6-moi-zvonki.html", "crm-integracii/moi-zvonki/index.html",
     "Интеграция Мои Звонки с CRM", "Мои Звонки: фиксация звонков в CRM, запись разговоров, аналитика.",
     "CRM и интеграции", "/crm-integracii/", "Мои Звонки", "moi-zvonki"),
    # === 5. Avito ===
    ("5-Avito/0-avito.html", "avito/index.html",
     "Продвижение на Авито", "Продвижение на Авито: оформление, оптимизация объявлений, аналитика.",
     None, None, "Авито", "avito"),
    ("5-Avito/1-oformlenie-i-optimizaciya.html", "avito/oformlenie-i-optimizaciya/index.html",
     "Оформление и оптимизация объявлений на Авито", "Оформление и оптимизация объявлений на Авито: тексты, фото, ключевые слова.",
     "Авито", "/avito/", "Оформление и оптимизация", "oformlenie-i-optimizaciya"),
    ("5-Avito/2-prodvizhenie-i-analitika.html", "avito/prodvizhenie-i-analitika/index.html",
     "Продвижение и аналитика на Авито", "Продвижение и аналитика на Авито: стратегия, тарифы, отчеты.",
     "Авито", "/avito/", "Продвижение и аналитика", "prodvizhenie-i-analitika"),
    # === 6. Лидогенерация ===
    ("6-Лидогенерация/0-lidogeneraciya.html", "lidogeneraciya/index.html",
     "Лидогенерация для бизнеса", "Лидогенерация: квизы, виджеты отзывов, управление репутацией.",
     None, None, "Лидогенерация", "lidogeneraciya"),
    ("6-Лидогенерация/1-marquiz.html", "lidogeneraciya/marquiz/index.html",
     "Marquiz — квизы для лидогенерации", "Marquiz: создание и настройка квизов для сбора заявок.",
     "Лидогенерация", "/lidogeneraciya/", "Marquiz", "marquiz"),
    ("6-Лидогенерация/2-myreviews.html", "lidogeneraciya/myreviews/index.html",
     "MyReviews — виджет отзывов для сайта", "MyReviews: подключение виджета отзывов на сайт, сбор и управление отзывами.",
     "Лидогенерация", "/lidogeneraciya/", "MyReviews", "myreviews"),
    ("6-Лидогенерация/3-servisy-reputacii.html", "lidogeneraciya/servisy-reputacii/index.html",
     "Сервисы управления репутацией", "Сервисы управления репутацией: мониторинг отзывов, работа с площадками.",
     "Лидогенерация", "/lidogeneraciya/", "Сервисы репутации", "servisy-reputacii"),
]


def extract_body_content(html_text):
    text = re.sub(r'<style[\s\S]*?</style>', '', html_text, flags=re.IGNORECASE)
    text = re.sub(r'<script[\s\S]*?</script>', '', text, flags=re.IGNORECASE)

    main_match = re.search(r'<main[^>]*>([\s\S]*?)</main>', text, re.IGNORECASE)
    if main_match:
        content = main_match.group(1)
    else:
        body_match = re.search(r'<body[^>]*>([\s\S]*?)</body>', text, re.IGNORECASE)
        if body_match:
            content = body_match.group(1)
        else:
            content = text

    content = re.sub(r'<header[\s\S]*?</header>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<footer[\s\S]*?</footer>', '', content, flags=re.IGNORECASE)
    # Remove topbar blocks
    content = re.sub(r'<div\s+class="topbar"[\s\S]*?(?:</div>\s*){2,3}', '', content, flags=re.IGNORECASE)
    content = re.sub(r'\n{3,}', '\n\n', content)
    return content.strip()


def extract_sections(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
    except FileNotFoundError:
        return "    <p>Content coming soon.</p>"

    content = extract_body_content(html)

    # Remove wrapper divs
    content = re.sub(r'^\s*<div class="page">\s*', '', content)
    # Remove trailing wrapper close
    content = re.sub(r'\s*</div>\s*$', '', content)

    # Remove source breadcrumbs
    content = re.sub(r'<div class="crumbs[\s\S]*?</div>\s*</div>', '', content)
    content = re.sub(r'<div class="breadcrumbs[\s\S]*?</div>', '', content)
    content = re.sub(r'<div class="crumbs"[\s\S]*?</div>\s*</div>\s*</div>', '', content)

    # Remove sticky CTA bars
    content = re.sub(r'<div class="sticky-cta[\s\S]*?</div>\s*</div>', '', content, flags=re.IGNORECASE)

    # Remove skvozny placeholder blocks
    content = re.sub(r'<section[^>]*>\s*<div class="container">\s*<h2[^>]*>Сквозные блоки[\s\S]*?</section>', '', content, flags=re.IGNORECASE)

    return content.strip() if content.strip() else "    <p>Content coming soon.</p>"


def get_rel(output_path):
    depth = output_path.count('/')
    return "../" if depth <= 1 else "../../"


def get_canon(output_path):
    return output_path.replace('/index.html', '/')


def make_breadcrumbs(parent_name, parent_path, bc_name):
    lines = [
        '<nav class="breadcrumb" aria-label="Навигация">',
        '      <ol>',
        '        <li><a href="/venner/">Главная</a></li>',
    ]
    if parent_name and parent_path:
        lines.append(f'        <li><a href="{parent_path}">{parent_name}</a></li>')
    lines.append(f'        <li>{bc_name}</li>')
    lines.append('      </ol>')
    lines.append('    </nav>')
    return '\n'.join(lines)


def make_jsonld(title, desc, url):
    return f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{title}",
  "description": "{desc}",
  "url": "{url}",
  "provider": {{
    "@type": "Organization",
    "name": "Venner Digital",
    "url": "https://venner.ru/",
    "telephone": "+7 (952) 807-06-01",
    "address": {{
      "@type": "PostalAddress",
      "addressCountry": "RU"
    }}
  }}
}}
</script>'''


def gen_page(src, out_path, title, desc, pname, ppath, bcname, slug):
    rel = get_rel(out_path)
    canon = f"https://venner.ru/{get_canon(out_path)}"
    src_path = f"{BASE}/{src}"
    content = extract_sections(src_path)
    bc = make_breadcrumbs(pname, ppath, bcname)
    jld = make_jsonld(title, desc, canon)

    return f'''<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Venner Digital</title>
  <meta name="description" content="{desc}">
  <link rel="canonical" href="{canon}">
  <meta property="og:title" content="{title} | Venner Digital">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{canon}">
  <meta property="og:image" content="https://venner.ru/img/og/{slug}.webp">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:site_name" content="Venner Digital">
  <link rel="stylesheet" href="{rel}css/style.css">
</head>
<body>

  <div data-include="{rel}include/header.html"></div>

  <main>

    {bc}

    {content}

  </main>

  <div data-include="{rel}include/cta-contact.html"></div>
  <div data-include="{rel}include/footer.html"></div>
  <div data-include="{rel}include/cookie-banner.html"></div>

  <script src="{rel}js/site-data.js" defer></script>
  <script src="{rel}js/main.js" defer></script>

  {jld}

</body>
</html>
'''


def main():
    count = 0
    for p in PAGES:
        src, out_path, title, desc, pname, ppath, bcname, slug = p
        full_out = f"{OUT}/{out_path}"
        html = gen_page(src, out_path, title, desc, pname, ppath, bcname, slug)
        os.makedirs(os.path.dirname(full_out), exist_ok=True)
        with open(full_out, 'w', encoding='utf-8') as f:
            f.write(html)
        count += 1
        print(f"  [{count:2d}/{len(PAGES)}] {out_path}")
    print(f"\nDone! Generated {count} pages.")


if __name__ == '__main__':
    main()
