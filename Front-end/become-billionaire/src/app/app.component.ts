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
  @Input() sound = new Howl({src: ['assets/MenuMusic.mp3']});
  @Input() correct = new Howl({src: ['assets/correct.mp3']});
  @Input() wrong = new Howl({src: ['assets/wrong.mp3']});
  @Input() button = new Howl({src: ['assets/button.mp3']});

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
  
}
