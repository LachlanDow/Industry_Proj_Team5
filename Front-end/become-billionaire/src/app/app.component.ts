import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'become-billionaire';
  display = false;
  settingsDisplay = false;
  displaySettings = false;
  displayInstructions = false;

  onPress() {
    this.display = true;
    console.log(this.display);
  }
  onSettingsPress() {
    this.displaySettings = true;
  }

  onInstructionsPress() {
    this.displayInstructions = true;
  }

  ngAfterViewChecked(){ 
    this.display = false;
    this.displaySettings = false;
    this.displayInstructions = false;
  }
}
