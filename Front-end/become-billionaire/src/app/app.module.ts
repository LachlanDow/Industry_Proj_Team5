import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { HostSettingComponent } from './host-setting/host-setting.component';
import { SettingsComponent } from './settings/settings.component'
import { InstructionsComponent } from './instructions/instructions.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HostSettingComponent,
    SettingsComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    // BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
