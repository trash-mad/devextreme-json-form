import { Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import SelectBox from 'devextreme/ui/select_box';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-selectbox-field',
  template: `
    <ng-container>
      <div #ref style="min-height: 35px;"></div>
    </ng-container>
  `,
})
export class SelectboxFieldComponent extends ManagedField implements OnDestroy {

  private selectBox: SelectBox = null;

  @ViewChild('ref', {static: true}) ref: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone) { super(); }

  mfOnInit = () => this.ngZone.runOutsideAngular(() => {
    const {nativeElement} = this.ref;
    const items = (this.items || []) as string[];
    const value = (this.value || []) as string[];
    this.selectBox = new SelectBox(nativeElement, {
      onValueChanged: ({component: c}) => {
        const v = c.option('value');
        this.onChangeNow(v);
      },
      items, value
    });
  })

  ngOnDestroy = () => {
    if (this.selectBox !== null) {
      this.selectBox.dispose();
    }
  }

}
