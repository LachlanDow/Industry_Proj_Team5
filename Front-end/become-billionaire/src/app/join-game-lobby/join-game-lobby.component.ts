import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-join-game-lobby',
  templateUrl: './join-game-lobby.component.html',
  styleUrls: ['./join-game-lobby.component.css']
})
export class JoinGameLobbyComponent implements OnInit {
  participantID;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    console.log("joing game lobby");
    this.data.currentMessage.subscribe(message => this.participantID = message);
    this.getEvent();
  }

  /**
  * Listens to the events from the server to update the questions.
  */
  getEvent() {
    let localQuiz;
    let quizPage = this;
    console.log("sdfsdkfhj",this.participantID)
    let serverEvents = new EventSource(`http://35.214.82.56:3000/stream/${this.participantID}`);
    serverEvents.addEventListener('message', function (event) {
      console.log("event.data");
      console.log(event.data);
    });

  }
}
