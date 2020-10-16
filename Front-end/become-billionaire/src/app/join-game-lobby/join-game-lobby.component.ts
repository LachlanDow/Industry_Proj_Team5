import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-join-game-lobby',
  templateUrl: './join-game-lobby.component.html',
  styleUrls: ['./join-game-lobby.component.css']
})
export class JoinGameLobbyComponent implements OnInit {
  display= false;
  participantID ;
  localParticipants = [
    {
        "_id": "5f897b13985d7e4748970110",
        "name": "username",
        "score": 0
    },
    {
        "_id": "5f897b35985d7e474897013b",
        "name": "Tim",
        "score": 0
    },
    {
        "_id": "5f897bb9985d7e474897013d",
        "name": "Rob",
        "score": 0
    },
    {
        "_id": "5f897bbd985d7e474897013f",
        "name": "Matt",
        "score": 0
    },
    {
        "_id": "5f897bc9985d7e4748970141",
        "name": "Mikhail",
        "score": 0
    },
    {
        "_id": "5f897bd2985d7e4748970143",
        "name": "Bob",
        "score": 0
    }
];

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.participantID = message);
   /**  this.getEvent(); */
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
      console.log(event.data);
    });

  }
}
