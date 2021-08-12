import users from './users.js'
import kb from './kb.js'
import places from './places.js'
import vacancy from './vacancy.js'
import partners from './partners.js'
import employees from './employees.js'
import settingsSite from './settingsSite'
import categoriesGoods from './categories-goods'
import mainNews from './main-news'
import news from './news'
import pages from './pages'
import blocks from './blocks'
import banners from './banners'
import bannersTypes from './banners-types'
import ourWorks from './our-works'
import menu from './menu'
import menuItem from './menu-item'
import propertiesGoods from './properties-goods'

let systemName = 'AkratoPRIME CMS';

export default {
  users,
  kb,
  places,
  vacancy,
  partners,
  employees,
  settingsSite,
  categoriesGoods,
  mainNews,
  news,
  pages,
  blocks,
  banners,
  bannersTypes,
  ourWorks,
  menu,
  menuItem,
  propertiesGoods,


  selected: {
    allPages: 'Все страницы',
    currentPage: 'Текущая страница',
  },

  month: {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
  },

  login: {
    welcome: 'Добро пожаловать в ' + systemName,
    signIn: 'Вход',
    signUp: 'Регистрация',
    forgot: 'Забыли пароль?',
    labels: {
      email: 'Электронная почта',
      name: 'Имя',
      surname: 'Фамилия',
      password: 'Пароль',
      passwordRepeat: 'Повторите пароль',
      acceptTerms: 'Принимаю условия соглашения',
    }
  },
  forgot: {
    passwordRecovery: 'Восстановление пароля',
    login: 'Вход в систему',
    send: 'Восстановить',
    waitForInstruction: 'На ваш почтовый ящик отправлены инструкции по восстановлению пароля',
  },

  reset: {
    resetPassword: 'Сброс пароля',
    reset: 'Изменить',
    labels: {
      code: 'Код из электронной почты',
      password: 'Пароль',
      passwordRepeat: 'Повторите пароль'
    }
  },

  product: {
    pupils: 'Ученики',
    ofPupils: 'Учеников',
    educators: 'Педагоги',
    ofEducators: 'Педагогов',
    groups: 'Группы',
    ofGroups: 'Групп',
    classes: 'Занятия',
    ofClasses: 'Занятий',
  },

  main: {
    nav: {
      profile: 'Профиль',
      users: 'Пользователи',
      kb: 'БЗ. Статьи',
      kbCategories: 'БЗ. Категории',
      vacancy: 'Вакансии',
      partners: 'Партнеры',
      employees: 'Сотрудники',
      settingsSite: 'Настройки сайта',
      categoriesGoods: 'Категории товаров',
      mainNews: 'Контент. Категории статей',
      news: 'Контент. Статьи',
      pages: 'Контент. Страницы',
      blocks: 'Контент. Блоки контента',
      banners: 'Контент. Баннеры',
      bannersTypes: 'Контент. Типы баннеров',
      ourWorks: 'Галерея',
      menu: 'Меню',
    },

    load_img: 'Выбрать файл для загрузки.',
    seo_title: "SEO title",
    seo_discription: "SEO description",
    seo_keywords: "SEO keywords",
    og_site_name: "OG site name",
    og_title: "OG title",
    og_type: "OG type",
    og_image: "OG image",
    og_url: "OG url",
    og_discription: "OG discription",
    help: 'Помощь',
    selectAll: 'Выбрать все',
    toHome: 'На главную',
    back: 'Назад',
    cancel: 'Отмена',
    close: 'Закрыть',
    save: 'Сохранить',
    search: 'Найти',
    setParams: 'Установить критерии',
    clean: 'Очистить',
    noResults: 'Не найдено',
    noData: 'Нет данных',
    startTyping: 'Начните печатать...',
    pickAValue: 'Выберите значение',
    pickAValueMin: 'Выбрать',
    deselectAValue: 'Удалите значение',
    selectedLabel: 'Выбрано',
    pickAValues: 'Выберите значения',
    searchOrPickAValues: 'Ищите или выберие значения',
    selectLimitText: 'и еще {count}',
    menu: {
      logout: 'Выход',
      users: 'Пользователи',
      profile: 'Профиль',
    },
    sideMenu: {
      lists: {
        main: 'Главная страница',
        doorsTypes: 'Типы дверей',
      }

    },
    meta: {
      clients: 'Главная страница',
      articles: 'БЗ. Статьи',
      categories: 'БЗ. Категории',
      vacancy: 'Вакансии',
      partners: 'Партнеры',
      employees: 'Сотрудники',
      categoriesGoods: 'Категории товаров',
      mainNews: 'Контент. Категории статей',
      pages: 'Контент. Страницы',
      news: 'Контент. Статьи',
      settingsSite: 'Настройки сайта',
      blocks: 'Контент. Блоки контента',
      banners: 'Контент. Баннеры',
      bannersTypes: 'Контент. Виды баннеров',
      ourWorks: 'Галерея',
      menu: 'Меню',
      menuItem: 'Редактирование пункта меню',
      client: 'Профиль',
      login: 'Вход',
      forgot: 'Забыли пароль',
      reset: 'Сброс пароля',
      error: 'Ошибка',
    },
    confirm: {
      title: 'Вы уверены?',
      delete: 'Данные будут удалены без возможности восстановления',
      yes: 'Да',
      no: 'Нет',
    },
    notifications: {
      title: 'Уведомление ' + systemName,
      saved: 'Данные успешно сохранены',
      created: 'Запись успешно добавлена',
      updated: 'Данные успешно изменены',
      deleted: 'Запись успешна удалена',
      passwordChanged: 'Пароль успешно изменен',
      timeout: 'Превышено время ожидания ответа сервера',
      taskQueued: 'Задача поставлена в очередь и будет выполнена в ближайшее время',
    },
    error: {
      serverError: 'Возникла ошибка сервера',
      accessDenied: 'Недостаточно прав для выполнения данного действия',
      occurred: 'Возникла ошибка',
      contactUs: 'Сообщите администратору об ошибке. Спасибо.',
      notFound: 'Страница не найдена',
      noInformation: 'Нет данных',
    },
  },
  table: {
    loading: 'Загрузка ...',
    count: 'Записи с {from} по {to} из {count}|Всего записей: {count}|Одна запись',
    noResults: 'Записи не найдены',
    first: 'Первая',
    last: 'Последняя',
    filter: "Фильтр:",
    filterPlaceholder: "Введите запрос ...",
    limit: "Записей:",
    page: "Страница:",
    filterBy: "Фильтровать по {column}",
    defaultOption: 'Выбрать {column}',
    columns: 'Столбцы'
  },
};