import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

import { createCustomElement } from '@angular/elements';
import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiniComponent } from './mini.component';
import { MiniWebComponent } from './mini-web.component';
import { MiniGroupComponent } from './mini-group.component';
import { MiniExpansionComponent } from './mini-expansion.component';

import { TextFieldComponent } from './fields/text-field.component';

@NgModule({
  declarations: [
    MiniComponent,
    MiniWebComponent,
    MiniGroupComponent,
    MiniExpansionComponent,
    TextFieldComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MiniComponent,
    MiniGroupComponent,
    MiniExpansionComponent,
    TextFieldComponent,
  ],
  entryComponents: [
    MiniWebComponent,
  ]
})
export class MiniModule {

  /**
   * Если точка входа из нативного html окажется не нужна, удалите этот метод,
   * его вызов из конструктора, elements-zone-strategy и @angular/elements из
   * приложения
   */
  createWidget(component: any, injector: Injector, id = '') {
    const strategyFactory = new ElementZoneStrategyFactory(component as any, injector);
    const webComponent = createCustomElement(component as any, {injector, strategyFactory});
    customElements.define(id, webComponent);
  }

  /**
   * Использование:
   * <mini-web-component miniKey="someMiniConfig"></mini-web-component>
   * <script>
   *   window.someMiniConfig = {
   *     handler: ... ,
   *     fallback: ... ,
   *     change: ... ,
   *     fields: [ ... ],
   *   };
   * </script>
   */
  constructor(injector: Injector) {
    this.createWidget(MiniWebComponent, injector, 'mini-web-component');
  }

}