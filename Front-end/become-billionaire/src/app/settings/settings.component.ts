import { Component, OnInit } from '@angular/core';
import { AppPage } from 'e2e/src/app.po';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
  
})

export class SettingsComponent implements OnInit {
  display = false;
 

  constructor(private appComponent: AppComponent) { 
  }

  ngOnInit(): void {
  }
 toggleSFX() {
   this.appComponent.toggleSFX();
 }
  playMusic() {
    this.appComponent.toggleMusic();
  }
  
  invertColors(){
    this.appComponent.toggleField();
  }
 
  onPress() {
    this.display = true;
    console.log(this.display);
    this.appComponent.displaySettings = false;
  }

}
