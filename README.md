# Products-SPA

Products-SPA - приложение на Next/TypeScript, Tailwind/ShadcnUI с Context для
просмотра списка продуктов, деталей и действий с товарами. Данные загружаются из
публичного API DummyJSON, пользовательские товары создаются локально и хранятся
в Context.

Демо (GitHub Pages):

## ✨ Функционал

| Страница                            | Возможности                                                                                                                                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Products** `/`                    | Для пользовательских товаров показываются иконки редактирования и удаления, для всех товаров также есть лайки, фильтр All/Favorites/Created, вомзожность поиска, пагинация в конце страницы, переход по клику на страницу product-card/id. |
| **Product-card** `/product-card/id` | Подробности товара, возможность добавить в favorites, кнопка Back to Products.                                                                                                                                                             |
| **Created** `/create-card`          | Форма с валидацией, сохранение в Context, возврат на Products.                                                                                                                                                                             |
| **Edit** `/create-card`             | Для пользовательских товаров переход с иконки (редактировать) на форму редактирования с уже заполненными полями, возврат к Products.                                                                                                       |
| **Not-found**                       | Кастомная страница 404, которую next загружает самостоятельно при необходимости.                                                                                                                                                           |
| **Loading**                         | Кастомная загрузка страниц с помощью Skeleton и анимации.                                                                                                                                                                                  |

## Стек

| Технология            | Особенность                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| **Next + TypeScript** | SSR / ISR, Server Components, файловая марщрутизация и строгая типизация                              |
| **Context**           | Передача данных через дерево компонентов без пропсов, Provider, обновление.                           |
| **Tailwind CSS**      | Cтилизация компонентов.                                                                               |
| **React hook form**   | Управление формами в React с максимальной производительностью и минимальным количеством перерисовок.  |
| **Shadcn UI**         | готовые компоненты (Card, Button, Skeleton, Input, filterTabs, Label, paginator, serchBar, textarea). |
| **lucide-react**      | Предоставление иконок как React компонентов (лайки, удаление, стрелки).                               |
| **ESLint**            | Единые правила кода                                                                                   |

## Требования

- Node.js
- npm

## Запуск проекта

```bash
npm install
npm run dev
```

## 📁 Структура проекта

```
src/
  app/                # Created-card, Product-card/[id], layout.tsx, not-found.tsx, page.tsx
  components/         # (common - header/footer),(ui-Card/Button/Skeleton/Input/paginator..)
  constants/          # seo-constants
  context/            # ProductsContext
  hooks/              # useFavorite, useLocalStorage, useProduct, useProductCardActions...
  lib/                # utils
  pages/              # CreatesProductPage, ProductDetailClient, ProductsPage
  service/            # api, localProducts
  types/              # products-types
```

## 🚢 Деплой

- GitHub Pages: → `build`, `deploy`, `dist`.
