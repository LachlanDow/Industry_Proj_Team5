import { Component, OnInit, } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient, HttpErrorResponse, HttpSentEvent } from '@angular/common/http'
import { DataService } from '../data.service';
import { QuizIdService } from '../quiz-id.service';

@Component({
  selector: 'app-host-setting',
  templateUrl: './host-setting.component.html',
  styleUrls: ['./host-setting.component.css']
})
export class HostSettingComponent implements OnInit {
  slidervalue = 75;
  questionNum;
  questionTimeLimit;
  username = "username";
  showLobby = false;
  hostId: number;
  quizId: number;
  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService) {
    //NOOP
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.hostId = message)
  }
  createLobby() {
    this.showLobby = true;
    this.createQuiz();
  }

  onInputChange(event: MatSliderChange) {
    this.questionTimeLimit = event.value;
  }

  createQuiz() {

    const url = "http://35.214.82.56:3000/quiz";
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "hostName": this.username,
      "categoryId": "5f7e2403ac9ce729944e732d",
      "timeLimit": this.questionTimeLimit,
      "questionCount": parseInt(this.questionNum)
    };
    this.http.post<any>(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      this.hostId = data.newQuiz.participants[0]._id;
      this.quizId = data.newQuiz._id;
      this.sendHostId();
    });
  }

  sendHostId() {
    this.data.changeMessage(this.hostId);
    this.quizID.changeMessage(this.quizId);
  }

}
export class ButtonToggleAppearance { }

export class matMenu { }