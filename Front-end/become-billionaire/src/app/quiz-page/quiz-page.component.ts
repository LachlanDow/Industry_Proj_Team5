import { Component, OnChanges, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import { AppComponent } from '../app.component';


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
  @Input() isHost;
  lastPowerUpQNumber;
  powerUpRandomNumber = [] as  any;
  handicapPowerup =false;
  doublePowerup=false;
  fiftyPowerup=false;
  powerupList = ["handicap" , "clear", "double" ];
  powerupListIndex = 0;
  fiftyPowerupActivated=false;


  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;


  constructor(private http: HttpClient, private data: DataService, private quizID: QuizIdService, private appComponent: AppComponent) {
    //NOOP
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.hostId = message);
    this.quizID.currentMessage.subscribe(message => this.quizId = message);
    this.participantID = this.hostId;
    this.getEvent();
    this.appComponent.toggleShow();
    
  }

  ngOnChanges(): void {
    //NOOP
  }
  playCorrect() {
    this.appComponent.correctSound();
  }
  playWrong() {
    this.appComponent.wrongSound();
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
      this.playCorrect();
      this.resultIcons.push(true)
      this.timeDifference = this.lastAnsweredTime - this.lastQuestionRecievedTime;
      this.sendScore();
    }
    else {
      this.IsitCorrect = "Wrong Answer! Good luck next time";
      this.playWrong();
      this.resultIcons.push(false)
      this.timeDifference = (this.quiz.timeLimit * 1000);
      this.sendScore();
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
        quizPage.appComponent.toggleShow();
        quizPage.displayEndScreen = true;
        quizPage.displayButtons = true;

        if (quizPage.resultIcons.length < quizPage.quiz.questionCount) {
          quizPage.resultIcons.push(false)
          quizPage.timeDifference = (quizPage.quiz.timeLimit * 1000);
          quizPage.sendScore();
        }
        return;
      }

      if (!quizPage.quizStarted) {
        quizPage.randomNumber();
        quizPage.lastQuestionNumber = quizPage.quiz.questionNumber
        quizPage.config = {
          leftTime: quizPage.quiz.timeLimit,
          format: "ss"
        };
        quizPage.lastQuestionRecievedTime = new Date().getTime();
        if (quizPage.isHost) {
          quizPage.startQuiz();
        }

        quizPage.quizStarted = true;
        quizPage.countdown.begin();
      }
      else if (quizPage.lastQuestionNumber != quizPage.quiz.questionNumber) {
        console.log("random number", quizPage.powerUpRandomNumber);
        for (let i = 0; i < quizPage.powerUpRandomNumber.length; i++ ){
          if (quizPage.powerUpRandomNumber[i] == quizPage.quiz.questionNumber){
          quizPage.powerUpAvailable();
        }
          
        };
        quizPage.countdown.restart();
        quizPage.lastQuestionNumber = quizPage.quiz.questionNumber
        quizPage.lastQuestionRecievedTime = new Date().getTime();
        quizPage.displayButtons = true;

        if ((quizPage.resultIcons.length + 1) < quizPage.quiz.questionNumber) {
          quizPage.resultIcons.push(false)
          quizPage.timeDifference = (quizPage.quiz.timeLimit * 1000);
          quizPage.sendScore();
        }
      }


    });
  };

  /**
   * Sends score to the server
   */
  sendScore() {
    var correct, incorrect, average;
    var correctList = this.resultIcons.filter(function (value) {
      return value == true;
    });

    correct = correctList.length;
    incorrect = this.resultIcons.length - correct;
    average = this.timeDifference / this.resultIcons.length;

    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/${this.participantID}`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "score": this.timeDifference,
      "correctAnswers": correct,
      "incorrectAnswers": incorrect,
      "averageAnswerTime": average
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

  isItAnswered() {
  }

  //makes the power ups available 
  powerUpAvailable() {
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/${this.participantID}/availablepowerup`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "powerupName": this.powerupList[this.powerupListIndex]
    };
    this.http.patch(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      console.log("powerup patch", data);
    });
    if (this.powerupList[this.powerupListIndex] == "clear"){
      this.fiftyPowerup = true;
    }
    else if (this.powerupList[this.powerupListIndex] == "handicap"){
      this.handicapPowerup == true;
    }
    else if (this.powerupList[this.powerupListIndex] == "double") {
      this.doublePowerup = true;
    }
    this.powerupListIndex++;
  }

  //activates power up
  powerUpActivate(powerup: string) {
    if (powerup == "clear"){
      this.fiftyPowerup = false;
      this.fiftyPowerupActivated = true;
    }
    else if (powerup == "handicap"){
      this.handicapPowerup == false;
    }
    else if (powerup == "double") {
      this.doublePowerup = false;
    };
    console.log("name of pwerup",powerup)
    this.lastPowerUpQNumber = this.quiz.questionNumber;
    const url = `http://35.214.82.56:3000/quiz/${this.quizId}/${this.participantID}/powerup`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "powerupName": powerup
    };
    this.http.patch(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      console.log("powerup patch activate", data);
    });
  }

  //generated array of random numbers to activate power up at random times 
  randomNumber() {
    for ( let i = 0; i<3; i++){ 
    this.powerUpRandomNumber.push(Math.floor(Math.random() * this.quiz.questionCount) + 1);
    }
  }

  activateFiftyPowerup() {
    // if (){}

  }

}

