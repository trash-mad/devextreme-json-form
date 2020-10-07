# DevextremeAngularFormGenerator

> Компонент для рендеринга 12-колоночной сетки с применением компонентов DevExtreame из json шаблона

## Руководство разработика

 - Запуск локального веб-сервера для разработки

  ```
  npm start # см /src/mini-lib/fields
  ```

 - Сборка веб-компонента для размещения на отдельных страницах 

  ```
  npm build:mini-lib # в dist/mini-lib
  ```

## Использование

Компонент `mini-lib` может размещаться как в сторонних приложениях, так и на веб-странице, используя [customElements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements). Для первого случая пример кода можно посмотреть `app.component.ts`, для второго пример кода я разместил ниже:

```
<mini-web-component data-miniKey="someComponent"></mini-web-component>
<script>
  window.someComponent = {
    fields: [
      {
        type: 'group',
        columns: '12',
        title: 'Input fields:',
        fields: [
          {
            type: 'label',
            title: 'TagBox',
            columns: '4',
          },
          ...
    ],
    handler: () => fetch('api/v1/users').then(d => d.json()),
    change: (data) => console.log(data),
  }
</script>
```
