import { Component, OnInit } from '@angular/core';
import { AppPage } from 'e2e/src/app.po';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']

})

export class SettingsComponent implements OnInit {
  // global variables  
  display = false;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit(): void { }

  // on toggle activates SFX
  toggleSFX() {
    this.appComponent.toggleSFX();
  }

  // on toggle plays music
  playMusic() {
    this.appComponent.toggleMusic();
  }

  // on toggle inverts colours
  invertColors() {
    this.appComponent.toggleField();
  }

  /*
  * on press back button hides settings and shows landingpage 
  */
  onPress() {
    this.display = true;
    this.appComponent.displaySettings = false;
  }

}
