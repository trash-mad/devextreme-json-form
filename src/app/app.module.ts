import { BrowserModule } from '@angular/platform-browser';
import { MiniModule } from 'mini/mini.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MiniModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
