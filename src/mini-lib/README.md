# mini-lib

> Компонент для рендеринга 12-колоночной сетки с применением компонентов DevExtreme из json шаблона

## Зависимости

Для корректной работы в проект, использующий `mini-lib` нужно установить следующие зависимости

| Наименование зависимости  | Версия пакета |
| ------------------------- | ------------- |
| deepcopy                  |    ^2.1.0     |
| deepequal                 |    ^0.0.1     |
| lodash                    |   ^4.17.20    |
| reflex                    |    ^2.0.4     |
| devextreme                |     ^20.1     |
| @angular/elements         |    ^10.1.4    |
| elements-zone-strategy    |     ^8.0.0    |

Пакеты deepcopy, deepequal и lodash являются обязательными. Пакет `reflex` опционален, если обновить верстку полей `group` и `expansion` (todo). Пакет `devextreme` опционален, если переверстать остальные поля ввода.

Кроме того, `mini-component` поддерживает инстанцирование в нативный html, используя `@angular/elements` и `elements-zone-strategy`. Если будете менять версию Angular, внимательно прочитайте документацию последнего!

P.S. не забудьте подключить стили, прописав в `angular.json` путь к его css стилям:

```
"styles": [
  ...
  "node_modules/devextreme/dist/css/dx.light.css",
  "node_modules/devextreme/dist/css/dx.common.css",
  "3rdparty/reflex@2.0.4/reflex.css",
  "3rdparty/typeface-roboto@0.0.75/typeface-roboto.css",
  "3rdparty/material-design-icons@3.0.1/material-icons.css"
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
      columns: '12',
      title: 'Поля ввода:',
      fields: [
        {
          type: FieldType.Label,
          title: 'TagBox',
          columns: '4',
        },
        {
          type: FieldType.TagBox,
          name: 'arr',
          items: ['a', 'b', 'c'],
          defaultValue: ['b'],
          columns: '8',
        },
        {
          type: FieldType.Label,
          title: 'SelectBox',
          columns: '4',
        },
        {
          type: FieldType.SelectBox,
          name: 'arr1',
          items: ['a', 'b', 'c'],
          columns: '8',
        },
        {
          type: FieldType.Label,
          title: 'TextBox',
          columns: '4',
        },
        {
          type: FieldType.TextBox,
          name: 'text',
          columns: '8',
        },
        {
          type: FieldType.Label,
          title: 'CheckBox',
          columns: '4',
        },
        {
          type: FieldType.CheckBox,
          name: 'omg',
          columns: '8',
        },
      ]
    },
  ];

  ...

```

Подразумевается, что входные параметры mini компонента осуществляют следующие функции

 - handler: промис, подгружающий json для вывода на форму

 - fallback: коллбек, вызываемый если handler не удалось исполнить

 - fields: json шаблон формы

 - change: коллбек, возвращающий 

## Важно

Если DevExtreme по каким-либо причинам перестанет вас устраивать, поставьте на `mini-component` другие поля ввода. Например, подойдут [веб-компоненты material](https://material.io/develop/web/components/sliders), пример генерации верстки на основе входных параметров можно посмотреть [тут](https://github.com/tripolskypetr/preact-material-typescript-kit/blob/master/src/components/common/slider.tsx).
