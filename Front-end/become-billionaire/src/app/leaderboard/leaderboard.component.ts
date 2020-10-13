import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  display = false;
  
  userScore = 76;
  userScore1 = 86;
  userScore2 = 82;
  userScore3 = 78;
  userScore4 = 72;
  userScore5 = 68;
  userScore6 = 64;
  constructor() { 
  }

  ngOnInit(): void {
  }
 
  onPress() {
    this.display = true;
  }
}
