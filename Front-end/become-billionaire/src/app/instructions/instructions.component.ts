import { Component } from '@angular/core';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  clicked_back = false;

  constructor(private appComponent: AppComponent) { }

  /*
  * on press back button hides instructiones component and shows landingpage 
  */
  onClickBack() {
    this.clicked_back = true;
    this.appComponent.displayInstructions = false;
  }

  /*
  * on press shows instructiones how to start quiz 
  */
  changeTextStart() {
    document.getElementById("mainText").innerHTML = "-Press Play on main screen<br><br>-On the host settings page adjust the slider too choose how much time will be given to answer each question, Set the number of questions for the quiz and select a category for the quiz <br><br> -Type in a nickname that other players will see you by and then press create game to create a new game <br><br> - Share your room code with your friends and once everyone has joined press start game to start the quiz!";
  }

  /*
  * on press shows instructiones how to join a quiz 
  */
  changeTextJoin() {
    document.getElementById("mainText").innerHTML = "-Press join game on the main screen <br><br> -Input your nickname that other players in the game will see you by and then enter your friends Room Code and select Join game <br><br> -Once you have joined the lobby just wait untill the host starts the game and then get ready to start the quiz!  ";
  }
  /*
  * on press shows instructiones how to play 
  */
  changeTextHow() {
    document.getElementById("mainText").innerHTML = "-The Question will be displayed at the top of the screen and 4 possible answers below it. On the top right of the screen is a timer, when the timer reaches zero then we move on to the next question <br><br> -Select one of the 4 answers to choose that answer, once chosen you will be shown your results <br><br> - On the results you are told if you answered wrong or right, the time it took you to answer, your current score and your current positon in the leaderboard <br><br> -Once the questions are all finished you are taken to the game leaderboard where you are shown everyone score and more importantly, who won! ";
  }
  /*
  * on press shows instructiones how to power up work 
  */
  changeTextPower() {
    document.getElementById("mainText").innerHTML = "-Powerups are used to give you the advantage on a question <br><br> -Powerups are given out at random throughout the quiz, with every player getting a chance at each one. Once you have a powerup, you keep it untill you use it <br><br>-To use a powerup, click the powerup you would like to use before answering your question. The effect will then be applied <br><br> -Descriptions for each powerup <br><br> -50/50 : Use 50/50 to take away two of the wrong answers and make things a little easier <br><br> -Double Down: Feeling confident? Use double down to half your score on a correct answer, but be careful, incorrect answers score you double points! <br><br> Handicap: Use handicap to double every other players score for this question, if two or more players use handicap on the same round then those users recieve no doubling.    ";
  }
  /*
  * on press shows instructiones how score system works
  */
  changeTextScore() {
    document.getElementById("mainText").innerHTML = "-All players start with a score of 0 <br><br> -The player with the lowest score at the end wins! <br><br> - Answer fast and less points will be added to your score, take too long and more points will be added. <br><br> -Answer inccorectly and the maximum ammount of points will be added to your score";
  }
  /*
  * on press shows instructiones about settings
  */
  changeTextSettings() {
    document.getElementById("mainText").innerHTML = "Descriptions for settings on the settings page <br><br> - Toggle the music to add background music to the quiz <br><br> - Toggle sound effects to add different sounds to the quiz <br><br> - Toggle inverted colours to invert all the colours in the game.";
  }
}
