import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-expansion',
  template: `
    <mini-group [columns]="columns" [phoneColumns]="phoneColumns" [tabletColumns]="tabletColumns" [desktopColumns]="desktopColumns">
      <ng-content></ng-content>
    </mini-group>
  `
})
export class MiniExpansionComponent {

  @Input() columns = '';
  @Input() phoneColumns = '';
  @Input() tabletColumns = '';
  @Input() desktopColumns = '';

}
