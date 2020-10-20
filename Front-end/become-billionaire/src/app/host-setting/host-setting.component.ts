import {FormControl} from '@angular/forms';
import { Component, OnInit, } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { HttpClient, HttpErrorResponse, HttpSentEvent } from '@angular/common/http'
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';
import  {AppComponent } from '../app.component'

@Component({
  selector: 'app-host-setting',
  templateUrl: './host-setting.component.html',
  styleUrls: ['./host-setting.component.css']
  
})
export class HostSettingComponent implements OnInit {
  slidervalue = 75;
  questionNum;
  questionTimeLimit = 10;
  username = "username";
  showLobby = false;
  hostId: number;
  quizId: number;
  display = false;
  categories= []; 
  selectedCategory = "44ded658a5454fecb4c885c44b8cfd13"; 

  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService, private appComponent: AppComponent) {
    //NOOP
  }
  gohome() {
    this.display = true;
    this.appComponent.displayHost = false;
  }
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.hostId = message)
    this.getCategories();
  }
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
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
      "categoryId": this.selectedCategory,
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
    this.showLobby = true;
  }

  getCategories() {
    const url = "http://35.214.82.56:3000/categories";
    const headers = { 'Content-Type': 'application/json' };
    this.http.get<any>(url, { headers: headers }).subscribe(data => {
      let localCategories = data;
      this.categories = localCategories;
    });
  }

  setCategory(categoryID) { 
    this.selectedCategory = categoryID;
  }


}

