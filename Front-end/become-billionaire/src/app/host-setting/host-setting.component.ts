import {FormControl} from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient, HttpErrorResponse, HttpSentEvent } from '@angular/common/http'
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';

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
  display = false;
  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService) {
    //NOOP
  }
  gohome() {
    this.display = true;
    
  }
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.hostId = message)
  }
  createLobby() {
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
      "categoryId": "44ded658a5454fecb4c885c44b8cfd13",
      "timeLimit": this.questionTimeLimit,
      "questionCount": parseInt(this.questionNum)
    };
    this.http.post<any>(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      this.hostId = data.newQuiz.participants[0]._id;
      this.quizId = data.newQuiz._id;
      console.log("quiz id",data.newQuiz._id);
      this.sendHostId();
    });
  }

  sendHostId() {
    console.log(this.hostId);
    this.data.changeMessage(this.hostId);
    this.quizID.changeMessage(this.quizId);
    this.showLobby = true;
  }


}
export class SelectCustomTriggerExample {
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
}

