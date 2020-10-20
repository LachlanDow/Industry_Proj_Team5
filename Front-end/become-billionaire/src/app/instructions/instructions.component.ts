import { Component } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent  {
  clicked_back = false;

  constructor() { }

  ngAfterViewChecked(){ 
    this.clicked_back = false;
  }

  onClickBack() {
   this.clicked_back = true;
  }


  changeTextStart(){
    document.getElementById("mainText").innerHTML = "-Press Play on main screen<br><br>-On the host settings page adjust the slider too choose how much time will be given to answer each question, Set the number of questions for the quiz and select a category for the quiz <br><br> -Type in a nickname that other players will see you by and then press create game to create a new game <br><br> - Share your room code with your friends and once everyone has joined press start game to start the quiz!";
  }
  changeTextJoin(){
    document.getElementById("mainText").innerHTML = "-Press join game on the main screen <br><br> -Input your nickname that other players in the game will see you by and then enter your friends Room Code and select Join game <br><br> -Once you have joined the lobby just wait untill the host starts the game and then get ready to start the quiz!  ";
  }
  changeTextHow(){
    document.getElementById("mainText").innerHTML = "-The Question will be displayed at the top of the screen and 4 possible answers below it. On the top right of the screen is a timer, when the timer reaches zero then we move on to the next question <br><br> -Select one of the 4 answers to choose that answer, once chosen you will be shown your results <br><br> - On the results you are told if you answered wrong or right, the time it took you to answer, your current score and your current positon in the leaderboard <br><br> -Once the questions are all finished you are taken to the game leaderboard where you are shown everyone score and more importantly, who won! ";
  }
  changeTextPower(){
    document.getElementById("mainText").innerHTML = "dd";
  }
  changeTextScore(){
    document.getElementById("mainText").innerHTML = "-All players start with a score of 0 <br><br> -The player with the lowest score at the end wins! <br><br> - Answer fast and less points will be added to your score, take too long and more points will be added. <br><br> -Answer inccorectly and the maximum ammount of points will be added to your score";
  }

changeTextSettings(){
  document.getElementById("mainText").innerHTML = "Descriptions for settings on the settings page <br><br> - Toggle the music to add background music to the quiz <br><br> - Toggle sound effects to add different sounds to the quiz <br><br> - Toggle inverted colours to invert all the colours in the game.";
}
}
