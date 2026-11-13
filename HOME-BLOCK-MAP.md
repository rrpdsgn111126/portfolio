# Главная страница — схема блоков для правок

На опубликованной главной открой **`/?debug=blocks`**. Появятся цветные рамки и подписи вида `#beeline-family-image-1`. Нажатие на подпись копирует ID. В обычном режиме `/` отладка полностью отключена; размеры и внешний вид страницы не меняются.

**Готовая ссылка:** https://finam-case.pages.dev/?debug=blocks

Это тот же инспектор `debug-blocks.js`, который используется в кейсе Finam. Жёлтая рамка — секция, голубая — отдельный элемент. Чтобы указать место исправления, достаточно прислать ID из подписи и описать изменение.

## Общие элементы

| ID | Элемент | Файл |
|---|---|---|
| `#home-header` | Область навигационного символа | `index.html`, `home.css` |
| `#portfolio-home-link` | Символ ✻ и ссылка наверх | `index.html`, `home.css` |
| `#home-intro` | Вводный блок целиком | `index.html`, `home.css` |
| `#home-title` | Заголовок «Hi, i'm Roman» | `index.html`, `home.css` |
| `#home-description` | Вводный абзац | `index.html`, `home.css` |
| `#home-work` | Контейнер карточек всех проектов | `index.html`, `home.css` |

## Карточки проектов

| Префикс ID | Проект |
|---|---|
| `beeline-family` | Beeline Family |
| `alfaforex` | AlfaForex |
| `equilibrium` | Equilibrium |
| `finam` | Finam |

У каждого проекта одинаковый набор адресуемых блоков:

| ID (на примере Beeline Family) | Что обозначает |
|---|---|
| `#beeline-family` | Вся карточка и её подложка |
| `#beeline-family-media` | Контейнер двух скриншотов |
| `#beeline-family-image-1` | Первый скриншот |
| `#beeline-family-image-2` | Второй скриншот |
| `#beeline-family-copy` | Текстовая колонка целиком |
| `#beeline-family-title` | Название проекта |
| `#beeline-family-description` | Текст под названием |
| `#beeline-family-tags` | Группа тегов |

Для других проектов меняется только префикс, например `#finam-image-2` или `#equilibrium-tags`.

**Пример конкретной правки:** «У `#alfaforex-image-2` подними изображение на 12 px, а у `#alfaforex-tags` увеличь верхний отступ на 8 px».

Не добавляй ID отдельным `li` у тегов без запроса: они образуют единую строку/группу. Не меняй `debug-blocks.js` при обычных правках главной — он общий с Finam. Все изменения композиции главной делаются в `home.css`.
