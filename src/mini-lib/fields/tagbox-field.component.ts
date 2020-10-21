import { Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import TagBox from 'devextreme/ui/tag_box';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-tagbox-field',
  template: `
    <ng-container>
      <div #ref style="min-height: 35px;"></div>
    </ng-container>
  `,
})
export class TagboxFieldComponent extends ManagedField implements OnDestroy {

  private tagBox: TagBox = null;

  @ViewChild('ref', {static: true}) ref: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone) { super(); }

  mfOnInit = () => this.ngZone.runOutsideAngular(() => {
    const {nativeElement} = this.ref;
    const items = (this.items || []) as string[];
    const value = (this.value || []) as string[];
    this.tagBox = new TagBox(nativeElement, {
      onValueChanged: ({component: c}) => {
        const v = c.option('value');
        this.onChangeNow(v);
      },
      items, value
    });
  })

  ngOnDestroy = () => {
    if (this.tagBox !== null) {
      this.tagBox.dispose();
    }
  }

}
