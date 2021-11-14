import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';

import { AppComponent } from './app.component';
import { MintingPanelComponent } from './components/minting-panel/minting-panel.component';
import { MintingPromptComponent } from './components/minting-prompt/minting-prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    MintingPanelComponent,
    MintingPromptComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
