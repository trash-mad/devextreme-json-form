import { Component } from '@angular/core';

import { FieldType } from 'mini/model/FieldType.enum';
import { IField } from 'mini/model/IField.model';

@Component({
  selector: 'app-root',
  template: `
    <div class="reflex-container">
      <mini-component
        [handler]="handler"
        [fields]="fields"
        [change]="change"
      ></mini-component>
    </div>
  `
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
      ]
    },
  ];

  handler = () => new Promise((res) => setTimeout(() => res({
    a: 'aaa',
    b: 'bbb',
    c: 'ccc',
    arr: ['a'],
    arr1: [],
    text: '',
  }), 500))

  change = ({a, b, c, arr}) => console.log(`a="${a}" b="${b}" c="${c}" arr="${arr}"`);

}
