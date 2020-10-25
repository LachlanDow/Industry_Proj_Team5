import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';

@Component({
  selector: 'app-join-game-lobby',
  templateUrl: './join-game-lobby.component.html',
  styleUrls: ['./join-game-lobby.component.css']
})
export class JoinGameLobbyComponent implements OnInit {
  //global variables
  participantID;
  localParticipants;
  quizID;
  showQuizPage = false;

  constructor(private data: DataService, private quizId: QuizIdService) { }

  // runs on component created.
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.participantID = message);
    this.getEvent();
    this.quizId.currentMessage.subscribe(message => this.quizID = message)
  }

  /**
  * Listens to the events from the server to update the questions.
  */
  getEvent() {
    let localQuiz;
    let quizPage = this;
    console.log(this.participantID);
    let serverEvents = new EventSource(`http://35.214.82.56:3000/stream/${this.participantID}`);
    serverEvents.addEventListener('message', function (event) {
      console.log(event.data);
      let quiz = JSON.parse(event.data);
      quizPage.quizID = quiz._id;
      quizPage.localParticipants = quiz.participants;
      quizPage.setQuizID();
      if (quiz.questionNumber != 0) {
        quizPage.showQuizPage = true;
      }
    });
  }

  //updates the value of quiz id on the angular service
  setQuizID() {
    this.quizId.changeMessage(this.quizID);
    console.log(this.quizId);
  }
}
