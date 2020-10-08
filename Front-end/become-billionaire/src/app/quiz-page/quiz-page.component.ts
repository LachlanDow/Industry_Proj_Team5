import { Component, OnInit } from '@angular/core';
import { QuizPageQuizobject } from '../models/quiz-page.quizobject'

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  questions: QuizPageQuizobject[];
  currentQuestion = 0;
  quiz: QuizPageQuizobject[] = [];
  IsitCorrect;

  constructor() {
    this.questions = [
      {
        "questionID": 1,
        "question": "Eighteen thousandths, written as a decimal, is:",
        "answers": [
          "0.0018",
          "0.018",
          "0.18",
          "1.80"
        ],
        "correctAnswer": 1
      },
      {
        "questionID": 2,
        "question": "The next number in the sequence <b>1, 3, 6, 10, </b> is:",
        "answers": [
          "12",
          "13",
          "14",
          "15"
        ],
        "correctAnswer": 4
      },
      {
        "questionID": 2,
        "question": "The next number in the sequence <b>1, 3, 6, 10, </b> is:",
        "answers": [
          "12",
          "13",
          "14",
          "15"
        ],
        "correctAnswer": 4
      },
      {
        "questionID": 2,
        "question": "The next number in the sequence <b>1, 3, 6, 10, </b> is:",
        "answers": [
          "12",
          "13",
          "14",
          "15"
        ],
        "correctAnswer": 4
      },
      {
        "questionID": 2,
        "question": "The next number in the sequence <b>1, 3, 6, 10, </b> is:",
        "answers": [
          "12",
          "13",
          "14",
          "15"
        ],
        "correctAnswer": 4
      },
      {
        "questionID": 2,
        "question": "The next number in the sequence <b>1, 3, 6, 10, </b> is:",
        "answers": [
          "12",
          "13",
          "14",
          "15"
        ],
        "correctAnswer": 4
      }
    ]
  }


  ngOnInit(): void {
  }

  // sortQuestions() {
  //   this.questions.forEach(question => {
  //     this.quiz.push(new QuizPageQuizobject(question.questionID, question.question, question.answers, question.correctAnswer));
  //   });
  //   console.log(this.quiz);
  //   return this.quiz;
  // }

  questionCount(e: any){
    console.log(e);
    if (e == this.questions[this.currentQuestion].correctAnswer) {
      this.IsitCorrect = "Correct Answer! Well Done"
      console.log("Correct Answer! Well Done");
    }
    else {
      console.log("Wrong Answer! Good luck next time");
      this.IsitCorrect = "Wrong Answer! Good luck next time"
    }
    this.currentQuestion = this.currentQuestion+1;
  }

}
