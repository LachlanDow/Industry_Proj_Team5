import { Component,Input} from '@angular/core';
import { Howl } from 'howler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'become-billionaire';
  display = false;
  settingsDisplay = false;
  displaySettings = false;
  displayInstructions = false;
  displayLeaderboard = false;
  displayJoinPage = false;
  displayHost = false;
  @Input() sound = new Howl({src: ['https://dmail-my.sharepoint.com/personal/mvrobb_dundee_ac_uk/Documents/Uni/4th%20year/music/MenuMusic.mp3?App=OneDriveWebVideo']});
  @Input() correct = new Howl({src: ['https://dmail-my.sharepoint.com/personal/mvrobb_dundee_ac_uk/Documents/Uni/4th%20Year/correct.mp3?App=OneDriveWebVideo']});
  @Input() wrong = new Howl({src: ['https://dmail-my.sharepoint.com/personal/mvrobb_dundee_ac_uk/Documents/Uni/4th%20Year/wrong.mp3?App=OneDriveWebVideo']});
  @Input() button = new Howl({src: ['https://dmail-my.sharepoint.com/personal/mvrobb_dundee_ac_uk/Documents/Uni/4th%20Year/button.mp3?App=OneDriveWebVideo']});

  classToggled = false;
  highContrast = false;
  playing=false;
  sfx = false;

  
  public toggleField() {
    this.classToggled = !this.classToggled;  
  }
  public toggleHighContrast() {
    this.highContrast = !this.highContrast;  
  }
  public toggleMusic() {
    if(this.playing==false)
    {
      this.sound.play(); 
      this.playing=true;
    }
    else {
      this.sound.pause();
      this.playing=false;
    }
    
  }
  public toggleSFX() {
    if(this.sfx==false)
    {
      this.sfx=true;
    }
    else{
      this.sfx=false;
    }
  }
  public correctSound() {
    if(this.sfx==true){
      this.correct.play();
    }
    
  }
  public wrongSound() {
    if(this.sfx==true){
      this.wrong.play();
    }
    
  }
  public buttonSound(){
    if(this.sfx==true){
      this.button.play();
    }
    
  }
  onPress() {
    this.display = true;
    this.buttonSound();
  }
  playMusic() {
    
    this.sound.play();
  }

  onSettingsPress() {
    this.buttonSound();
    this.displaySettings = true;
    
    

  }

  onInstructionsPress() {
    this.buttonSound();
    this.displayInstructions = true;
    
  }

  onLeaderboardPress() {
    this.buttonSound();
    this.displayLeaderboard = true;
  }

  onJoinPress() {
    this.buttonSound();
    this.displayJoinPage = true;
  }

  onHostPress() {
    this.buttonSound();
    this.displayHost = true;
  }
  


  ngAfterViewChecked() {
    
    this.displaySettings = false;
    this.displayInstructions = false;
    this.displayLeaderboard = false;
    //this.displayJoinPage = false;
    // this.displayHost = false;



}
