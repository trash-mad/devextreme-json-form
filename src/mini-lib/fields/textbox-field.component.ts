import { Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import TextBox from 'devextreme/ui/text_box';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-textbox-field',
  template: `
    <ng-container>
      <div #ref style="min-height: 35px;"></div>
    </ng-container>
  `,
})
export class TextboxFieldComponent extends ManagedField implements OnDestroy {

  private textBox: TextBox = null;

  @ViewChild('ref', {static: true}) ref: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone) { super(); }

  mfOnInit = () => this.ngZone.runOutsideAngular(() => {
    const {nativeElement} = this.ref;
    this.textBox = new TextBox(nativeElement, {
      onValueChanged: ({component: c}) => {
        const v = c.option('value');
        this.onChangeNow(v);
      },
      value: this.value || this.defaultValue || '',
    });
  })

  ngOnDestroy = () => {
    if (this.textBox !== null) {
      this.textBox.dispose();
    }
  }

}
