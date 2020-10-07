# DevextremeJsonFormGenerator

> Component for rendering a 12-column grid using DevExtreme by json template

![screencast.gif](./screencast.gif)

## Compiled distro

To save your time there is online demo and compiled distro

## Developer Guide

 - Running a local web server for development. For example, adding new components to the standard set of fields. Minimal experience with Angular2 is required

  ```
  npm start # check /src/mini-lib/fields
  ```

 - Assembling a web component to be placed on separate html pages

  ```
  npm build:mini-lib # check dist/mini-lib
  ```

## Usage

This tool can be easily applied in third party applications by using using [customElements](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) (see code below). Also if you want to apply it in Angular2 application, check `app.component.ts`.

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
            type: 'group',
            columns: '6',
            fields: [
              {
                type: 'label',
                title: 'TagBox',
                columns: '6',
              },
              {
                type: 'tag-box',
                name: 'arr',
                items: ['a', 'b', 'c'],
                defaultValue: ['b'],
                columns: '6',
              },
              {
                type: 'label',
                title: 'SelectBox',
                columns: '6',
              },
              {
                type: 'select-box',
                name: 'arr1',
                items: ['a', 'b', 'c'],
                columns: '6',
              },
            ]
          },
          {
            type: 'group',
            columns: '6',
            fields: [
              {
                type: 'label',
                title: 'TextBox',
                columns: '6',
              },
              {
                type: 'text-box',
                name: 'text',
                columns: '6',
              },
              {
                type: 'label',
                title: 'CheckBox',
                columns: '6',
              },
              {
                type: 'check-box',
                name: 'omg',
                columns: '6',
              },
            ]
          }
        ]
      }
    ],
    handler: () => fetch('api/v1/users').then(d => d.json()),
    change: (data) => console.log(data),
  }
</script>
```
