import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mini-group',
  template: `
    <fieldset>
      <legend>
        Группа {{title ? '"' + title + '"' : ''}} xs="{{xs}}" sm="{{sm}}" md="{{md}}" lg="{{lg}}" xl="{{xl}}"</legend>
      <ng-content></ng-content>
    </fieldset>
  `
})
export class MiniGroupComponent {

  @Input() title = '';

  @Input() columns = '';
  @Input() phoneColumns = '';
  @Input() tabletColumns = '';
  @Input() desktopColumns = '';

  get xs() { return this.columns ? this.columns : this.phoneColumns ? this.phoneColumns : '12'; }
  get sm() { return this.columns ? this.columns : this.phoneColumns ? this.phoneColumns : '12'; }
  // tslint:disable-next-line: max-line-length
  get md() { return this.columns ? this.columns : (this.phoneColumns || this.tabletColumns) ? (this.phoneColumns || this.tabletColumns) : '12'; }
  // tslint:disable-next-line: max-line-length
  get lg() { return this.columns ? this.columns : (this.tabletColumns || this.desktopColumns) ? (this.tabletColumns || this.desktopColumns) : '12'; }
  get xl() { return this.columns ? this.columns : this.desktopColumns ? this.desktopColumns : '12'; }

}
