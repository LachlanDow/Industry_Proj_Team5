import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { QuizIdService } from '../services/quiz-id.service';
import { HostSettingComponent } from '../host-setting/host-setting.component'

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  // global variables
  participantID;
  localParticipants;
  quizId
  isHost = true;
  display = false;

  constructor(private data: DataService, private quizID: QuizIdService, private hostComponent: HostSettingComponent) { }

  // runs on component created.
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.participantID = message);
    this.quizID.currentMessage.subscribe(message => this.quizId = message)
    console.log(this.participantID);
    this.getEvent();
  }

  /**
  * Listens to the events from the server to update the questions.
  */
  getEvent() {
    let quizPage = this;
    let serverEvents = new EventSource(`http://35.214.82.56:3000/stream/${this.participantID}`);
    serverEvents.addEventListener('message', function (event) {
      let localData = JSON.parse(event.data);
      console.log(localData.participants);
      quizPage.localParticipants = localData.participants;
    });
  }

  /*
  * on press showis thge landing page
  */
  onPress() {
    this.display = true;
  }

  /*
  * on press hides lobby
  */
  onPressExit() {
    this.hostComponent.showLobby = false;
  }
}
