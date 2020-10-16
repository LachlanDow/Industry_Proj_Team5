import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { HostSettingComponent } from './host-setting/host-setting.component';
import { SettingsComponent } from './settings/settings.component'
import { InstructionsComponent } from './instructions/instructions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {QuizPageComponent} from './quiz-page/quiz-page.component';
import { EndScreenComponent } from './end-screen/end-screen.component';

import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { JoinGameComponent } from './join-game/join-game.component';
import {FormsModule} from '@angular/forms';
import { LobbyComponent } from './lobby/lobby.component';
import { JoinGameLobbyComponent } from './join-game-lobby/join-game-lobby.component';
import { CountdownModule } from 'ngx-countdown';
import { WaitScreenComponent } from './wait-screen/wait-screen.component'





@NgModule({
  declarations: [
    AppComponent,
    HostSettingComponent,
    SettingsComponent,
    LeaderboardComponent,
    InstructionsComponent,
    QuizPageComponent,
    LobbyComponent,
    EndScreenComponent,
    JoinGameComponent,
    LobbyComponent,
    WaitScreenComponent,
    JoinGameLobbyComponent

  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    HttpClientModule,
    FormsModule,
    CountdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
