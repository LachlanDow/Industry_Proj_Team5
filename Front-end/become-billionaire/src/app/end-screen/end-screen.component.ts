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
  // Global variables
  quizId;
  participantList;
  display = false;

  constructor(private quizID: QuizIdService, private http: HttpClient, private appComponent: AppComponent) { }

  // runs on component created.
  ngOnInit(): void {
    this.quizID.currentMessage.subscribe(message => this.quizId = message)
    this.getLeaderboardData();
  }

  /*
  * makes an api call to get score of all the player in the curent game. 
  */
  getLeaderboardData() {
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}`;
    const headers = { 'Content-Type': 'application/json' };
    this.http.get<any>(url, { headers: headers }).subscribe(data => {
      this.participantList = data.participants;
    });
  }

  /*
  * on press back button hides host & join page component and shows landingpage 
  */
  onPress() {
    this.display = true;
    this.appComponent.displayHost = false;
    this.appComponent.displayJoinPage = false;
  }
}
