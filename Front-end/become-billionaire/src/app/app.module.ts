import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { HostSettingComponent } from './host-setting/host-setting.component';
import { SettingsComponent } from './settings/settings.component'
import { InstructionsComponent } from './instructions/instructions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {QuizPageComponent} from './quiz-page/quiz-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HostSettingComponent,
    SettingsComponent,
    LeaderboardComponent,
    InstructionsComponent,
    QuizPageComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
