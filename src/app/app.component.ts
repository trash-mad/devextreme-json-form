import { Component } from '@angular/core';

import { FieldType } from 'mini/model/FieldType.enum';
import { IField } from 'mini/model/IField.model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
      <mini-component [fields]="fields" [handler]="handler" [change]="change"></mini-component>
    </div>
  </div>
  `
})
export class AppComponent {

  fields: IField[] = [
    {
      type: FieldType.Group,
      columns: '6',
      fields: [
        {
          type: FieldType.Group,
          fields: [
            {
              type: FieldType.Text,
              name: 'a',
              title: 'Поле "а"',
            },
          ]
        },
        {
          type: FieldType.Text,
          name: 'b',
          title: 'Поле "b"',
        },
      ]
    },
    {
      type: FieldType.Group,
      columns: '6',
      fields: [
        {
          type: FieldType.Text,
          name: 'a',
          title: 'Поле "a"',
        },
        {
          type: FieldType.Text,
          name: 'c',
          title: 'Поле "c"',
        },
      ]
    }
  ];

  handler = () => new Promise((res) => setTimeout(() => res({
    a: 'aaa',
    b: 'bbb',
    c: 'ccc',
  }), 500))

  change = ({a, b, c}) => console.log(`a="${a}" b="${b}" c="${c}"`);

}
