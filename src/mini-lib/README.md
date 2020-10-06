# mini-lib

> Компонент для рендеринга 12-колоночной сетки с применением компонентов DevExtreame из json шаблона

## Зависимости

Для корректной работы в проект, использующий `mini-lib` нужно установить следующие зависимости

| Наименование зависимости  | Версия пакета |
| ------------------------- | ------------- |
| deepcopy                  |    ^2.1.0     |
| deepequal                 |    ^0.0.1     |
| lodash                    |   ^4.17.20    |
| reflex                    |    ^2.0.4     |
| devextreme                |     ^20.1     |
| devextreme-angular        |     ^20.1     |
| @angular/elements         |    ^10.1.4    |
| elements-zone-strategy    |     ^8.0.0    |

Пакеты deepcopy, deepequal и lodash являются обязательными. Пакет `reflex` опционален, если обновить верстку полей `group` и `expansion`. Пакеты `devextreme` и `devextreme-angular` опциональны, если переверстать остальные поля ввода.

Кроме того, `mini-component` поддерживает инстанцирование в нативный html, используя `@angular/elements` и `elements-zone-strategy`. Если будете менять версию Angular, внимательно прочитайте документацию последнего!

P.S. не забудьте подключить bootstrap, прописав в `angular.json` путь к его css стилям:

```
"styles": [
  ...
  "node_modules/bootstrap/dist/css/bootstrap-grid.min.css",
  ...
]
```

## Установка

Для применения в новом проекте скопируйте папку `mini-lib` в директорию `src`, пропишите в `tsconfig.json` маппинг импорта:

```
{
  "compilerOptions": {
    ...
    "allowSyntheticDefaultImports": true,
    "paths": {
      "mini": [ "src/mini-lib" ],
      "mini/*": [ "src/mini-lib/*" ],
    }
    ...
  },
  ...
}
```

После, подключение осуществляется по аналогии с обычным [shared module](https://angular.io/guide/sharing-ngmodules). 

## Пример кода

Json шаблоны форм имеют следующую структуру: 

```
@Component({
  selector: 'app-root',
  template: `<mini-component
    [fields]="fields" 
    [handler]="handler"
    [fallback]="fallback"
    [change]="change"
  ></mini-component>
  `,
})
export class AppComponent {

  fields: IField[] = [
    {
      type: FieldType.Group,
      fields: [
        {
          type: FieldType.Line,
          title: 'Общая информация',
        },
        {
          name: 'firstName',
          type: FieldType.String,
          title: 'Имя',
          description: 'Felton',
        },
        {
          name: 'lastName',
          type: FieldType.String,
          title: 'Фамилия',
          description: 'Cruickshank',
        },
        {
          name: 'age',
          type: FieldType.String,
          title: 'Возраст',
          description: '42',
          isInvalid: (obj) => {
            const value = Number(obj.age);
            if (!Number.isInteger(value)) {
              return 'Возраст должен быть числом';
            } else if (value < 1) {
              return 'Возраст должен быть больше 1';
            } else {
              return null;
            }
          },
        },
        {
          type: FieldType.Expansion,
          title: 'Подписка',
          description: 'Подписка на уведомления',
          fields: [
            {
              type: FieldType.Group,
              fields: [
                {
                  type: FieldType.Switch,
                  name: 'subscribed',
                  title: 'Разрешить рассылку',
                },
                {
                  name: 'email',
                  type: FieldType.String,
                  isDisabled: (obj) => !obj.subscribed,
                  title: 'Почта',
                  description: 'tripolskypetr@gmail.com',
                },
              ]
            },
          ],
        },
        {
          type: FieldType.Group,
          fields: [
            {
              type: FieldType.Group,
              columns: '6',
              fields: [
                {
                  type: FieldType.Line,
                  title: 'Работа',
                },
                {
                  name: 'jobTitle',
                  type: FieldType.String,
                  title: 'Должность',
                },
                {
                  name: 'jobArea',
                  type: FieldType.String,
                  title: 'Место работы',
                },
              ]
            },
            {
              type: FieldType.Group,
              columns: '6',
              fields: [
                {
                  type: FieldType.Line,
                  title: 'Домашний адрес',
                },
                {
                  name: 'country',
                  type: FieldType.String,
                  title: 'Страна',
                },
                {
                  name: 'city',
                  type: FieldType.String,
                  title: 'Город',
                },
                {
                  name: 'state',
                  type: FieldType.String,
                  title: 'Область',
                },
                {
                  name: 'address',
                  type: FieldType.String,
                  title: 'Адрес',
                },
              ]
            },
          ],
        },
      ],
    }
  ];

  ...

```

Подразумевается, что входные параметры mini компонента осуществляют следующие функции

 - handler: промис, подгружающий json для вывода на форму

 - fallback: коллбек, вызываемый если handler не удалось исполнить

 - fields: json шаблон формы

 - change: коллбек, возвращающий 
