import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MintingPanelComponent } from './components/minting-panel/minting-panel.component';
import { MintingPromptComponent } from './components/minting-prompt/minting-prompt.component';
import { ImxUtilsService } from './components/services/imx-utils-service';

@NgModule({
  declarations: [
    AppComponent,
    MintingPanelComponent,
    MintingPromptComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    ImxUtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
