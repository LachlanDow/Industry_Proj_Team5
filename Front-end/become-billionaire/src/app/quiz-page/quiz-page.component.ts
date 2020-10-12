import { Component, OnChanges, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service'

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

  constructor(private quizQuestion: RestService) {
    //NOOP
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(): void {
    //NOOP
  }

  questionCount(e: any) {
    this.getCorrectAnswerIndex();
    if (e == this.correctAnswerIndex) {
      this.IsitCorrect = "Correct Answer! Well Done";
      let icon = this.resultIcons.push(true)
    }
    else {
      this.IsitCorrect = "Wrong Answer! Good luck next time";
      let icon = this.resultIcons.push(false)

    }
    this.currentQuestion = this.currentQuestion + 1;
    this.questionNumber = this.questionNumber + 1;
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
}