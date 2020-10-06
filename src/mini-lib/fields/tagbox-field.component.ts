import { ApplicationRef, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ManagedField } from '../ManagedField.class';

import TagBox from 'devextreme/ui/tag_box';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-tagbox-field',
  template: `
    <ng-container>
      <p>{{title}}</p>
      <small>{{description}}</small>
      <div #ref style="height: 75px;"></div>
    </ng-container>
  `,
})
export class TagboxFieldComponent extends ManagedField implements OnDestroy {

  private tagBox: TagBox = null;

  @ViewChild('ref', {static: true}) ref: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone, private appRef: ApplicationRef) {
    super();
    this.mfOnInit = this.mfOnInit.bind(this);
  }

  mfOnInit = () => this.ngZone.runOutsideAngular(() => {
    const {nativeElement} = this.ref;
    const items = (this.items || []) as string[];
    const value = (this.value || []) as string[];
    this.tagBox = new TagBox(nativeElement, {
      onValueChanged: ({component: c}) => {
        const v = c.option('value');
        this.onChange(v);
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
