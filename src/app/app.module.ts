import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
