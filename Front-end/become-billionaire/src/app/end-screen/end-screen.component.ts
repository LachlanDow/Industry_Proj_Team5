import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {

  //Data for current player
  userName = "bestPlayer"; 
  userScore = 20;
  userCorrect = 9;
  userIncorrect = 1;
  userAvg = 10;


  //data for the players in game,
  //currently players need to be put into the array in the correct order, as the first item in array will come at the top of the leaderboard i.e. dave will be No1, jimmy No2
  playerName = ["dave","jimmy","quiz boy"];
  playerScore = ["20", "15","10"];
  playerCorrect = ["20","15","5"];
  playerIncorrect = ["5","10","25"];
  playerAvg = ["10","9","5"];

  // can add code later to auto sort players into the array if necessary 


  constructor() { }

  ngOnInit(): void {
  }

   display = false;

  onPress() {
    this.display = true;
  }

}




