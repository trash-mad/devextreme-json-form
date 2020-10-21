import { Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import CheckBox from 'devextreme/ui/check_box';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-checkbox-field',
  template: `
    <ng-container>
      <div #ref style="min-height: 35px; display: flex; align-items: center;"></div>
    </ng-container>
  `,
})
export class CheckboxFieldComponent extends ManagedField implements OnDestroy {

  private checkBox: CheckBox = null;

  @ViewChild('ref', {static: true}) ref: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone) { super(); }

  mfOnInit = () => this.ngZone.runOutsideAngular(() => {
    const {nativeElement} = this.ref;
    this.checkBox = new CheckBox(nativeElement, {
      onValueChanged: ({component: c}) => {
        const v = c.option('value');
        this.onChangeNow(v);
      },
      value: this.value || this.defaultValue || false,
    });
  })

  ngOnDestroy = () => {
    if (this.checkBox !== null) {
      this.checkBox.dispose();
    }
  }

}
