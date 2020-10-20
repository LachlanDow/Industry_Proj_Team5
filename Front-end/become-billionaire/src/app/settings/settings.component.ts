import { Component, OnInit } from '@angular/core';
import  {AppComponent } from '../app.component'

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
 
  onPress() {
    this.appComponent.displaySettings = false;
  }
}
