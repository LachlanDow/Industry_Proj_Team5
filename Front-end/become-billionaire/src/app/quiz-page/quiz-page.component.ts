import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';


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
  counter = 0;
  currentScore = 0;
  participantID;
  hostId;
  quizId;
  quizStarted = false;
  interval = 1000; // ms
  expected; 
  config: CountdownConfig; 
  displayButtons = true;


  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;


  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService) {
    //NOOP
  }

  ngOnInit(): void {
    console.log("quiz page ng onint")
    this.data.currentMessage.subscribe(message => this.hostId = message);
    this.quizID.currentMessage.subscribe(message => this.quizId = message);
    this.participantID = this.hostId;
    this.getEvent();
  }

  ngOnChanges(): void {
    //NOOP
  }

  /**
   * Check if the clicked answer is the correct one 
   *  - if it's correct it calculates the score and sends it the server
   * @param e 
   */
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
    this.displayButtons = false; //Hide buttons and show wait screen
  }

  public questionCount() {
    this.currentQuestion = this.quiz.questionNumber;
    this.currentQuestion--;
  }

  /**
   * gets the index of the correct answer
   */
  getCorrectAnswerIndex() {
    this.correctAnswerIndex = this.quiz.questions[this.currentQuestion].choices.findIndex(x => x == this.quiz.questions[this.currentQuestion].answer);
    this.correctAnswerIndex = this.correctAnswerIndex + 1;
  }

  /**
   * Listens to the events from the server to update the questions.
   */
  getEvent() {
    let localQuiz;
    let quizPage = this;
    let serverEvents = new EventSource(`http://35.214.82.56:3000/stream/${this.participantID}`);
    
    serverEvents.addEventListener('message', function (event) {
      quizPage.quiz = JSON.parse(event.data)
      console.log("quiz", quizPage.quiz);
      quizPage.questionCount();
      quizPage.lastQuestionRecievedTime = new Date().getTime();
      quizPage.config = { leftTime: quizPage.quiz.timeLimit };
      
      if (!quizPage.quizStarted){
      quizPage.startQuiz();
      quizPage.quizStarted = true;
      quizPage.countdown.begin();
      }
      else {
        quizPage.countdown.restart();
        
      }
      quizPage.displayButtons = true;
      
    });
    
  };

  /**
   * Sends score to the server
   */
  sendScore() {
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/${this.participantID}`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "score": this.currentScore
    };
    this.http.patch(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
    });
  }

  /**
   * Starts the quiz
   */
  startQuiz() {
    console.log("Quiz started")
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/start`;
    const headers = { 'Content-Type': 'application/json' };
    this.http.post<any>(url, { headers: headers }).subscribe(data => {
    });
  }

  handleEvent(event) { 
    console.log(event);
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

