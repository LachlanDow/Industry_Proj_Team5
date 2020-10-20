import { Component, OnInit } from '@angular/core';
import { AppPage } from 'e2e/src/app.po';
import { AppComponent } from '../app.component';
import { Howl } from 'howler';



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
 
  playMusic() {
    this.appComponent.toggleMusic();
  }
  
  invertColors(){
    this.appComponent.toggleField();
  }
 
  onPress() {
    this.display = true;
    console.log(this.display);
    
  }

}
