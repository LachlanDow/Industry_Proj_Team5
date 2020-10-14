import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {


  //Need a way to adjust the amount of spaces on the top players list for how many players are in the game
  //not sure how to do yet
  numOfPlayers = 1;

  //Data for current player
  userName = "bestPlayer"; 
  userScore = 20;
  userCorrect = 9;
  userIncorrect = 1;
  userAvg = 10;

  //Data for top match players
  //No1 scoring player in match
  player1Name = "quiz boy";
  player1Score = 20;
  player1Correct = 9;
  player1Incorrect = 1;
  player1Avg = 10;

  //No2 scoring player in match
  player2Name = "player name";
  player2Score = 20;
  player2Correct = 91;
  player2Incorrect = 11;
  player2Avg = 10;

  //No3 scoring player in match etc. 
  player3Name = "joe bloggs";
  player3Score = 20;
  player3Correct = 9;
  player3Incorrect = 1;
  player3Avg = 10;

  player4Name = "joe bloggs 2";
  player4Score = 20;
  player4Correct = 9;
  player4Incorrect = 1;
  player4Avg = 10;

  constructor() { }

  ngOnInit(): void {
  }

   display = false;

  onPress() {
    this.display = true;
  }

}
