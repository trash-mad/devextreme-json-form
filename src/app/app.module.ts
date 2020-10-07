import { BrowserModule } from '@angular/platform-browser';
import { MiniModule } from 'mini/mini.module';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MiniModule,
  ],
  // tslint:disable-next-line: no-string-literal
  providers: [{provide: APP_BASE_HREF, useValue: window['miniBaseHref'] || '/mini-lib-assets/'}],
  entryComponents: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) { }

  /**
   * Если осуществляется develop сборка - на странице будет <app-root>, взятый
   * из шаблона index.html в папке src. В противном случае, по умолчанию ничего
   * не произойдет, но инстанцирование <mini-web-component> будет так же доступно
   */
  ngDoBootstrap() {
    const component: any = createCustomElement(AppComponent, { injector: this.injector });
    if (document.querySelector('app-root')) {
      customElements.define('app-root', component);
    }
  }

}
