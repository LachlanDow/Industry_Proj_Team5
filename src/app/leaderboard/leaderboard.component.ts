import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import  {AppComponent } from '../app.component'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  participantList;
  display = false;

  constructor(private http: HttpClient, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.getLeaderboardData();
  }

  onPress() {
    this.display = true;
    this.appComponent.displayLeaderboard = false;
  }

  getLeaderboardData() {


    const url = "http://35.214.82.56:3000/leaderboards/main";
    const headers = { 'Content-Type': 'application/json' };
    this.http.get<any>(url, { headers: headers }).subscribe(data => {
      console.log(data);
      this.participantList = data[0].participants;
      console.log(this.participantList);
    });

  }
}
