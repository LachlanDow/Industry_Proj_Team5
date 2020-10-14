import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import { HttpClient, HttpErrorResponse, HttpSentEvent } from '@angular/common/http'
import { AppComponent } from '../app.component';

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
  @Output() sendHostIdEvent = new EventEmitter<any>();
  hostId;



  constructor(private http: HttpClient) {
    //NOOP
  }

  ngOnInit(): void {
    //NOOP
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
      "hostName" : this.username,
      "categoryId" : "5f7e2403ac9ce729944e732d", 
      "timeLimit": this.questionTimeLimit, 
      "questionCount": parseInt(this.questionNum)
  };
    this.http.post<any>(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      console.log(data);
      console.log(data.newQuiz.participants[0]._id);
      this.hostId = data.newQuiz.participants[0]._id;
      this.sendHostId();
    });
  }

  sendHostId() {
    this.sendHostIdEvent.emit(this.hostId);
  }

}
export class ButtonToggleAppearance { }

export class matMenu { }