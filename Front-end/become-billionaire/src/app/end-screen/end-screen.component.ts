import { Component, OnInit } from '@angular/core';
import  {AppComponent } from '../app.component'
import { QuizIdService } from '../services/quiz-id.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.css']
})
export class EndScreenComponent implements OnInit {

  quizId;
  participantList;
  display = false;


  constructor(private quizID: QuizIdService, private http: HttpClient, private appComponent: AppComponent) { }
  ngOnInit(): void {
    this.quizID.currentMessage.subscribe(message => this.quizId = message)
    this.getLeaderboardData();
  }

  getLeaderboardData() {
    console.log("from end screen quiz id",this.quizId)
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}`;
    const headers = { 'Content-Type': 'application/json' };
    this.http.get<any>(url, { headers: headers }).subscribe(data => {
      this.participantList = data.participants;
    });
  }


  onPress() {
    this.display = true;
    this.appComponent.displayHost = false;
    this.appComponent.displayJoinPage = false;
  }
}








