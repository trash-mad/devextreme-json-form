import { Component } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-label-field',
  template: `
    <div class="dx-field-label">{{title}}</div>
  `,
})
export class LabelFieldComponent extends ManagedField { }
