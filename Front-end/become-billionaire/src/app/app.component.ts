import { Component, Output, EventEmitter } from '@angular/core';

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
  @Output() sendHostIdEvent = new EventEmitter<any>();


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

  receiveHostId($event){
    this.hostId = "";
    this.hostId = $event;
    console.log("host id in parent",this.hostId);
    this.sendHostId();
  }

  sendHostId() {
    this.sendHostIdEvent.emit(this.hostId);
  }
}
