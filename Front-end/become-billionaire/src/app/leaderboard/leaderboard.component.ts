import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  display = false;
  

  constructor() { 
  }

  ngOnInit(): void {
  }
 
  onPress() {
    this.display = true;
    console.log(this.display);
  }
}
