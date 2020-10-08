import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  display = false;
  

  constructor() { 
  }

  ngOnInit(): void {
  }
 
  onPress() {
    this.display = true;
    console.log(this.display);
  }
}
