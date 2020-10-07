import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatCardModule} from '@angular/material/card';
import { HostSettingComponent } from './host-setting/host-setting.component';
import { SettingsPageComponentComponent } from './settings-page-component/settings-page-component.component'
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HostSettingComponent,
    SettingsPageComponentComponent
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
