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
  lastQuestionNumber = 0;
  timeSetForQuestion = false;
  displayEndScreen = false;
  displayButtons = true;
  timeDifference = 0;


  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;


  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService) {
    //NOOP
  }

  ngOnInit(): void {
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
    this.displayButtons = false;
    this.getCorrectAnswerIndex();
    this.lastAnsweredTime = new Date().getTime();
    if (e == this.correctAnswerIndex) {
      this.IsitCorrect = "Correct Answer! Well Done";
      this.resultIcons.push(true)
      this.timeDifference = this.lastAnsweredTime - this.lastQuestionRecievedTime;
      this.currentScore = this.currentScore + this.timeDifference;
      this.sendScore();
    }
    else {
      this.IsitCorrect = "Wrong Answer! Good luck next time";
      this.resultIcons.push(false)
      this.currentScore = this.currentScore + (this.quiz.timeLimit * 1000);
      this.timeDifference = this.lastAnsweredTime - this.lastQuestionRecievedTime;
    }
  }

  public questionCount() {
    if (this.quiz.questionNumber == 0) {
      this.currentQuestion = this.quiz.questionNumber;
    }
    else if (this.quiz.questionNumber > 0) {
      this.currentQuestion = this.quiz.questionNumber - 1;
    }

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
      quizPage.questionCount();
      if (quizPage.quiz.questionNumber == -1) {
        quizPage.displayEndScreen = true;
        quizPage.displayButtons = true;
        return;
      }

      if (!quizPage.quizStarted) {
        quizPage.lastQuestionNumber = quizPage.quiz.questionNumber
        quizPage.config = {
          leftTime: quizPage.quiz.timeLimit,
          format: "ss"
        };
        quizPage.lastQuestionRecievedTime = new Date().getTime();
        quizPage.startQuiz();
        quizPage.quizStarted = true;
        quizPage.countdown.begin();
      }
      else if (quizPage.lastQuestionNumber != quizPage.quiz.questionNumber) {
        quizPage.countdown.restart();
        quizPage.lastQuestionNumber = quizPage.quiz.questionNumber
        quizPage.lastQuestionRecievedTime = new Date().getTime();
        quizPage.displayButtons = true;
        if ((quizPage.resultIcons.length +1) < quizPage.quiz.questionNumber){
          quizPage.resultIcons.push(false)
        }
      }

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
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/start`;
    const headers = { 'Content-Type': 'application/json' };
    this.http.post<any>(url, { headers: headers }).subscribe(data => {
    });
  }

  handleEvent(event) {
  }

  isItAnswered(){

  }
}

