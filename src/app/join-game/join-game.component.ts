import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DataService } from '../services/data.service';
import  {AppComponent } from '../app.component'

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  displayApp = false;
  displayJoinGameLobby = false;
  participantID;

  constructor(private http: HttpClient, private data: DataService, private appComponent: AppComponent) {
    // NOOP
   }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.participantID = message);
  }

  joinGame(username, partyCode) {
    console.log(this.displayJoinGameLobby);
    const url = `http://35.214.82.56:3000/quiz/${partyCode.value}`;
    const headers = { 'Content-Type': 'application/json' };
    const data = {
      "name": username.value
    };
    this.http.patch(url, JSON.stringify(data), { headers: headers }).subscribe(data => {
      console.log(data);
      this.displayJoinGameLobby = true;
    
      this.participantID = (data as any)._id;
      console.log("join game", this.participantID);
      this.sendHostId();
    });
  }

  sendHostId() {
    this.data.changeMessage(this.participantID);
  }

  onPress() {
    this.displayApp = true;
    this.appComponent.displayJoinPage = false;
  }
}