import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { HostSettingComponent } from './host-setting/host-setting.component';
import { SettingsComponent } from './settings/settings.component'
import { InstructionsComponent } from './instructions/instructions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {QuizPageComponent} from './quiz-page/quiz-page.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';


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
    MatSlideToggleModule,
    MatSliderModule,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
<<<<<<< Updated upstream
=======
    MatSelectModule,

    MatProgressBarModule,
   
    HttpClientModule

>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
