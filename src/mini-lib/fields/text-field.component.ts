import { Component, Input, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import { IEntity } from 'mini/model/IEntity.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-text-field',
  template: `
    <p>{{title}}</p>
    <input type="text" [value]="value" (change)="onChange($event.target.value)">
  `,
})
export class TextFieldComponent extends ManagedField { }
