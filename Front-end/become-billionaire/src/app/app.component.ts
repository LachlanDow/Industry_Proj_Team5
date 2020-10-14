import { Component, } from '@angular/core';

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
  displayLeaderboard = false;

  displayHost = false;
  
  hostId: string;


  onPress() {
    this.display = true;
    }
  onSettingsPress() {
    this.displaySettings = true;
  }

  onInstructionsPress() {
    this.displayInstructions = true;
  }
  onLeaderboardPress() {
    this.displayLeaderboard = true;
  }
  onHostPress() {
    this.displayHost = true;
  }

  ngAfterViewChecked(){ 
    this.displaySettings = false;
    this.displayInstructions = false;

    this.displayLeaderboard = false;
  }
}
