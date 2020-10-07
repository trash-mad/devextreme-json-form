# mini-lib

> Component for rendering a 12-column grid using DevExtreme by json template

## Dependencies

For correct work in the project using `mini-lib` you need to install the following dependencies

| Dependency name           | Version       |
| ------------------------- | ------------- |
| deepcopy                  |    ^2.1.0     |
| deepequal                 |    ^0.0.1     |
| lodash                    |   ^4.17.20    |
| reflex                    |    ^2.0.4     |
| devextreme                |     ^20.1     |
| @angular/elements         |    ^10.1.4    |
| elements-zone-strategy    |     ^8.0.0    |

The `deepcopy`, `deepequal` and `lodash` packages are required. The package `reflex` is optional if you rewrite code of the *group* and *expansion* (todo) fields . The package `devextreme` is optional if you going to write your custom fields.

Also `mini-component` supports native html instantiation by using `@angular/elements` and `elements-zone-strategy`. If you change the version of Angular, read the documentation of the last carefully!

P.S. do not forget to include styles by writing to the `angular.json` paths to its css files:

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

## Installation

To use in a new Angular2 project, copy the folder `mini-lib` to the directory `src`, write in the `tsconfig.json` this lines:

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

After that, import as usual [shared module](https://angular.io/guide/sharing-ngmodules). 

## Code example

Json form templates have the following structure:

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
      title: 'Fields:',
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

It is assumed that the input parameters of the `mini-componen` perform the following functions

 - handler: a promise that loads json for output to a form

 - fallback: callback to be called if handler failed to execute

 - fields: json form template

 - change: a callback which is raised on change

## Notes

If DevExtreme for some reason ceases to suit you, put on `mini-component` other input fields. I think [material web components](https://material.io/develop/web/components/sliders) can be applied, an example of usage can be found [here](https://github.com/tripolskypetr/preact-material-typescript-kit/blob/master/src/components/common/slider.tsx).
