import { Component, OnChanges, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service'
import { HttpClient, HttpErrorResponse, HttpSentEvent } from '@angular/common/http'
import { catchError, } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit, OnChanges {
  questions;
  currentQuestion = 0;
  IsitCorrect;
  correctAnswerIndex;
  resultIcons = [] as boolean[];
  questionNumber = 1;
  quiz;
  lastQuestionRecievedTime;
  lastAnsweredTime;
  counter;
  currentScore = 0;
  participantID = "5f860a2e7df4ca0ee145f4a1";

  constructor(private quizQuestion: RestService, private http: HttpClient) {
    //NOOP
  }

  ngOnInit(): void {
    this.getData();
    this.getEvent();
  }

  ngOnChanges(): void {
    //NOOP
  }

  answerCheck(e: any) {
    this.getCorrectAnswerIndex();
    if (e == this.correctAnswerIndex) {
      this.IsitCorrect = "Correct Answer! Well Done";
      let icon = this.resultIcons.push(true)
      this.lastAnsweredTime = new Date().getTime();
      let timeDifference = this.lastAnsweredTime - this.lastQuestionRecievedTime;
      this.currentScore = this.currentScore + timeDifference;
      this.sendScore();
    }
    else {
      this.IsitCorrect = "Wrong Answer! Good luck next time";
      let icon = this.resultIcons.push(false)

    }
  }

  public questionCount() {
    this.currentQuestion = this.quiz.questionNumber;
    this.currentQuestion--;
  }

  getCorrectAnswerIndex() {
    this.correctAnswerIndex = this.quiz.questions[this.currentQuestion].choices.findIndex(x => x == this.quiz.questions[this.currentQuestion].answer);
    this.correctAnswerIndex = this.correctAnswerIndex + 1;
  }

  getData() {
    this.quizQuestion.getData().subscribe(data => {
      this.quiz = data;
    });
  }

  getEvent() {
    let localQuiz;
    let quizPage = this;
    let serverEvents = new EventSource(`http://35.214.82.56:3000/stream/${this.participantID}`);
    serverEvents.addEventListener('message', function (event) {
      quizPage.quiz = JSON.parse(event.data);
      quizPage.questionCount();
      quizPage.lastQuestionRecievedTime = new Date().getTime();
    });
  };

  sendScore() {
    const url = `http://35.214.82.56:3000/quiz/${this.quiz._id}/${this.participantID}`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "score": this.currentScore
    };
    this.http.patch(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
    });
  }

  // startCountdown() {
  //   console.log("seconds",this.quiz.timeLimit)
  //   this.counter = this.quiz.timeLimit;


  //   const interval = setInterval(() => {
  //     console.log(this.counter);
  //     this.counter--;

  //     if (this.counter < 0 ) {
  //       clearInterval(interval);
  //       console.log('Ding!');
  //     }
  //   }, 1000);
  // }
}