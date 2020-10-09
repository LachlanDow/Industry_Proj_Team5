import { Component, OnInit } from '@angular/core';
import { QuizPageQuizobject } from '../models/quiz-page.quizobject'
import { Questions } from '../models/questions';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  questions;
  currentQuestion = 0;
  quiz: QuizPageQuizobject[] = [];
  IsitCorrect;
  correctAnswerIndex;
  resultIcons = [] as boolean[];
  questionNumber = 1;

  constructor() {
    
  }


  ngOnInit(): void {
    this.questions = Questions.newQuiz.questions;
    
  }

  // sortQuestions() {
  //   this.questions.forEach(question => {
  //     this.quiz.push(new QuizPageQuizobject(question.questionID, question.question, question.answers, question.correctAnswer));
  //   });
  //   console.log(this.quiz);
  //   return this.quiz;
  // }

  questionCount(e: any) {
    this.getCorrectAnswerIndex();
    if (e == this.correctAnswerIndex) {
      this.IsitCorrect = "Correct Answer! Well Done";
      let icon = this.resultIcons.push(true)
      console.log(this.resultIcons);
    }
    else {
      this.IsitCorrect = "Wrong Answer! Good luck next time";
      // this.resultIcons.push(false);
      console.log(this.resultIcons);
      let icon = this.resultIcons.push(false)

    }
    this.currentQuestion = this.currentQuestion + 1;
    this.questionNumber = this.questionNumber + 1;
  }

  getCorrectAnswerIndex() {
    this.correctAnswerIndex = this.questions[this.currentQuestion].choices.findIndex(x =>x == this.questions[this.currentQuestion].answer);
    this.correctAnswerIndex = this.correctAnswerIndex+1;
  }

}
