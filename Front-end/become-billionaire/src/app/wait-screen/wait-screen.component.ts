import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-screen',
  templateUrl: './wait-screen.component.html',
  styleUrls: ['./wait-screen.component.css']
})
export class WaitScreenComponent implements OnInit {
  playerScore = 320;
  responseTime = 10;
  position ="4th";
  waitTime="3"
  constructor() { }

  ngOnInit(): void {
  }

}
